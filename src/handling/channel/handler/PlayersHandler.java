package handling.channel.handler;

import client.skills.Skill;
import client.skills.SkillFactory;
import client.*;
import client.anticheat.CheatTracker;
import client.anticheat.CheatingOffense;
import client.anticheat.ReportType;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.MapleRing;
import client.status.MonsterStatus;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.skills.*;
import handling.world.WorldBroadcastService;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import scripting.reactor.ReactorScriptManager;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.MapleStatEffect;
import server.Randomizer;
import server.events.MapleCoconut;
import server.events.MapleCoconut.MapleCoconuts;
import server.events.MapleEventType;
import server.maps.*;
import server.quest.MapleQuest;
import tools.*;
import tools.data.input.LittleEndianAccessor;
import tools.packet.EffectPacket;
import tools.packet.UIPacket;

public class PlayersHandler {

    public static void Note(LittleEndianAccessor slea, MapleCharacter chr) {
        byte type = slea.readByte();
        switch (type) {
            case 0:
                String name = slea.readMapleAsciiString();
                String msg = slea.readMapleAsciiString();
                boolean fame = slea.readByte() > 0;
                slea.readInt(); //0?
                Item itemz = chr.getCashInventory().findByCashId((int) slea.readLong());
                if (itemz == null || !itemz.getGiftFrom().equalsIgnoreCase(name) || !chr.getCashInventory().canSendNote(itemz.getUniqueId())) {
                    return;
                }
                try {
                    chr.sendNote(name, msg, fame ? 1 : 0);
                    chr.getCashInventory().sendedNote(itemz.getUniqueId());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            case 1: //删除
                /*
                 * Send NOTE_ACTION [00DB] (14)
                 * DB 00
                 * 01 - 删除
                 * 02 00 - 2条信息
                 * 01 - 人气
                 * 01 00 00 00 - 消息的SQLid
                 * 02 00 00 00 - 消息的SQLid
                 */
                int num = slea.readShort();
                slea.readByte(); //未知
                for (int i = 0; i < num; i++) {
                    int id = slea.readInt();
                    int giveFame = slea.readByte();
                    chr.deleteNote(id, giveFame);
                }
                break;
            default:
                System.out.println("Unhandled note action, " + type + "");
        }
    }

    public static void GiveFame(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int who = slea.readInt();
        int mode = slea.readByte();
        int famechange = mode == 0 ? -1 : 1;
        MapleCharacter target = chr.getMap().getCharacterById(who);
        if (target == null || target == chr) { // faming self
            chr.getCheatTracker().registerOffense(CheatingOffense.FAMING_SELF, "不能对自身操作.");
            return;
        } else if (chr.getLevel() < 15) {
            chr.getCheatTracker().registerOffense(CheatingOffense.FAMING_UNDER_15, "等级小于15级.");
            return;
        }
        switch (chr.canGiveFame(target)) {
            case OK:
                if (Math.abs(target.getFame() + famechange) <= 99999) {
                    target.addFame(famechange);
                    target.updateSingleStat(MapleStat.人气, target.getFame());
                }
                if (!chr.isGM()) {
                    chr.hasGivenFame(target);
                }
                c.getSession().write(MaplePacketCreator.giveFameResponse(mode, target.getName(), target.getFame()));
                target.getClient().getSession().write(MaplePacketCreator.receiveFame(mode, chr.getName()));
                break;
            case NOT_TODAY:
                c.getSession().write(MaplePacketCreator.giveFameErrorResponse(3));
                break;
            case NOT_THIS_MONTH:
                c.getSession().write(MaplePacketCreator.giveFameErrorResponse(4));
                break;
        }
    }

    public static void UseDoor(LittleEndianAccessor slea, MapleCharacter chr) {
        int oid = slea.readInt();
        boolean mode = slea.readByte() == 0; // specifies if backwarp or not, 1 town to target, 0 target to town
        for (MapleMapObject obj : chr.getMap().getAllDoorsThreadsafe()) {
            MapleDoor door = (MapleDoor) obj;
            if (door.getOwnerId() == oid) {
                door.warp(chr, mode);
                break;
            }
        }
    }

    public static void UseMechDoor(LittleEndianAccessor slea, MapleCharacter chr) {
        int oid = slea.readInt();
        Point pos = slea.readPos();
        int mode = slea.readByte(); // specifies if backwarp or not, 1 town to target, 0 target to town
        if (chr != null) {
            chr.getClient().getSession().write(MaplePacketCreator.enableActions());
            for (MapleMapObject obj : chr.getMap().getAllMechDoorsThreadsafe()) {
                MechDoor door = (MechDoor) obj;
                if (door == null) {
                    continue;
                }
                if (door.getOwnerId() == oid && door.getId() == mode) {
                    chr.checkFollow();
                    chr.getMap().movePlayer(chr, pos);
                    break;
                }
            }
        }
    }

    /*
     * 使用神圣源泉
     */
    public static void UseHolyFountain(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        int mode = slea.readByte(); //0x02 为恢复Hp
        int oid = slea.readInt();
        int skillId = slea.readInt();
        Point position = slea.readPos();
        MapleMist mist = c.getPlayer().getMap().getMistByOid(oid);
        if (mist == null || !mist.isHolyFountain()) {
            return;
        }
        if (mist.getHealCount() > 0 && mist.getBox().contains(position)) {
            MapleCharacter owner = chr.getMap().getCharacterById(mist.getOwnerId());
            if (mist.getOwnerId() == chr.getId() || (owner != null && owner.getParty() != null && chr.getParty() != null && owner.getParty().getPartyId() == chr.getParty().getPartyId())) {
                int healHp = (int) (chr.getStat().getCurrentMaxHp() * (mist.getSource().getX() / 100.0));
                chr.addHP(healHp);
                mist.setHealCount(mist.getHealCount() - 1);
                if (chr.isAdmin()) {
                    chr.dropMessage(5, "使用神圣源泉 - 恢复血量: " + healHp + " 百分比: " + (mist.getSource().getX() / 100.0) + " 剩余次数: " + mist.getHealCount());
                }
                c.getSession().write(EffectPacket.showOwnBuffEffect(skillId, 3, chr.getLevel(), mist.getSkillLevel()));
                chr.getMap().broadcastMessage(chr, EffectPacket.showBuffeffect(chr.getId(), skillId, 3, chr.getLevel(), mist.getSkillLevel()), false);
            }
        } else if (chr.isAdmin()) {
            chr.dropMessage(5, "使用神圣源泉出现错误 - 源泉恢复的剩余次数: " + mist.getHealCount() + " 模式: " + mode + " 是否在范围内: " + mist.getBox().contains(position));
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void TransformPlayer(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        chr.updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        String target = slea.readMapleAsciiString();
        Item toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        switch (itemId) {
            case 2212000: //圣诞节组队药水
                MapleCharacter search_chr = chr.getMap().getCharacterByName(target);
                if (search_chr != null) {
                    MapleItemInformationProvider.getInstance().getItemEffect(2210023).applyTo(search_chr);
                    search_chr.dropMessage(6, chr.getName() + " has played a prank on you!");
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                } else {
                    chr.dropMessage(1, "在当前地图中未找到 '" + target + "' 的玩家.");
                }
                break;
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void HitReactor(LittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();
        int charPos = slea.readInt();
        short stance = slea.readShort();
        MapleReactor reactor = c.getPlayer().getMap().getReactorByOid(oid);
        if (reactor == null || !reactor.isAlive()) {
            return;
        }
        reactor.hitReactor(charPos, stance, c);
    }

    public static void TouchReactor(LittleEndianAccessor slea, MapleClient c) {
        int oid = slea.readInt();
        boolean touched = slea.available() == 0 || slea.readByte() > 0; //the byte is probably the state to set it to
        MapleReactor reactor = c.getPlayer().getMap().getReactorByOid(oid);
        if (!touched || reactor == null || !reactor.isAlive() || reactor.getTouch() == 0) {
            //System.out.println("点击反应堆出现错误 - !touched: " + !touched + " !isAlive: " + !reactor.isAlive() + " Touch: " + reactor.getTouch());
            return;
        }
        if (c.getPlayer().isAdmin()) {
            c.getPlayer().dropMessage(5, "反应堆信息 - oid: " + oid + " Touch: " + reactor.getTouch() + " isTimerActive: " + reactor.isTimerActive() + " ReactorType: " + reactor.getReactorType());
        }
        if (reactor.getTouch() == 2) {
            ReactorScriptManager.getInstance().act(c, reactor); //not sure how touched boolean comes into play
        } else if (reactor.getTouch() == 1 && !reactor.isTimerActive()) {
            if (reactor.getReactorType() == 100) {
                int itemid = GameConstants.getCustomReactItem(reactor.getReactorId(), reactor.getReactItem().getLeft());
                if (c.getPlayer().haveItem(itemid, reactor.getReactItem().getRight())) {
                    if (reactor.getArea().contains(c.getPlayer().getTruePosition())) {
                        MapleInventoryManipulator.removeById(c, ItemConstants.getInventoryType(itemid), itemid, reactor.getReactItem().getRight(), true, false);
                        reactor.hitReactor(c);
                    } else {
                        c.getPlayer().dropMessage(5, "距离太远。请靠近后重新尝试。");
                    }
                } else {
                    c.getPlayer().dropMessage(5, "You don't have the item required.");
                }
            } else {
                reactor.hitReactor(c); //just hit it
            }
        }
    }

    public static void hitCoconut(LittleEndianAccessor slea, MapleClient c) {
        /*
         * CB 00 A6 00 06 01 A6 00 = coconut id 06 01 = ?
         */
        int id = slea.readShort();
//        String co = "coconut";
        MapleCoconut map = (MapleCoconut) c.getChannelServer().getEvent(MapleEventType.Coconut);
        if (map == null || !map.isRunning()) {
            map = (MapleCoconut) c.getChannelServer().getEvent(MapleEventType.CokePlay);
//            co = "coke cap";
            if (map == null || !map.isRunning()) {
                return;
            }
        }
        //System.out.println("Coconut1");
        MapleCoconuts nut = map.getCoconut(id);
        if (nut == null || !nut.isHittable()) {
            return;
        }
        if (System.currentTimeMillis() < nut.getHitTime()) {
            return;
        }
        //System.out.println("Coconut2");
        if (nut.getHits() > 2 && Math.random() < 0.4 && !nut.isStopped()) {
            //System.out.println("Coconut3-1");
            nut.setHittable(false);
            if (Math.random() < 0.01 && map.getStopped() > 0) {
                nut.setStopped(true);
                map.stopCoconut();
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 1));
                return;
            }
            nut.resetHits(); // For next event (without restarts)
            //System.out.println("Coconut4");
            if (Math.random() < 0.05 && map.getBombings() > 0) {
                //System.out.println("Coconut5-1");
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 2));
                map.bombCoconut();
            } else if (map.getFalling() > 0) {
                //System.out.println("Coconut5-2");
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 3));
                map.fallCoconut();
                if (c.getPlayer().getTeam() == 0) {
                    map.addMapleScore();
                    //c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(5, c.getPlayer().getName() + " of Team Maple knocks down a " + co + "."));
                } else {
                    map.addStoryScore();
                    //c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.serverNotice(5, c.getPlayer().getName() + " of Team Story knocks down a " + co + "."));
                }
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.coconutScore(map.getCoconutScore()));
            }
        } else {
            //System.out.println("Coconut3-2");
            nut.hit();
            c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.hitCoconut(false, id, 1));
        }
    }

    public static void TouchRune(LittleEndianAccessor slea, MapleCharacter chr) {
        chr.updateTick(slea.readInt());
        int type = slea.readInt();
        List<MapleRune> runes = chr.getMap().getAllRune();
        MapleRune rune = chr.getMap().getAllRune().get(0);
        if (rune != null && rune.getRuneType() == type) {
            if (chr.getKeyValue("LastTouchedRune") != null && chr.getRuneTimeStamp() > System.currentTimeMillis()) {
                chr.getClient().getSession().write(MaplePacketCreator.RuneAction(2, (int) (chr.getRuneTimeStamp() - System.currentTimeMillis())));
                chr.getClient().getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            chr.setTouchedRune(type);
            chr.getClient().getSession().write(MaplePacketCreator.RuneAction(5, 0));
        }
        chr.getClient().getSession().write(MaplePacketCreator.enableActions());
    }

    public static void UseRune(LittleEndianAccessor slea, MapleCharacter chr) {
        byte result = slea.readByte();
        final MapleRune rune = chr.getMap().getAllRune().get(0);
        MapleStatEffect effect;
        if (result == 1) {
            switch (chr.getTouchedRune()) {
                case 0: //疾速之輪
                    effect = SkillFactory.getSkill(80001427).getEffect(1);
                    effect.applyTo(chr);
                    break;
                case 1: //再生之輪
                    effect = SkillFactory.getSkill(80001428).getEffect(1);
                    effect.applyTo(chr);
                    break;
                case 2: //崩壞之輪
                    effect = SkillFactory.getSkill(80001430).getEffect(1);
                    effect.applyTo(chr);
                    break;
                case 3: //破滅之輪
                    effect = SkillFactory.getSkill(80001432).getEffect(1);
                    effect.applyTo(chr);
                    break;
            }
            chr.getMap().broadcastMessage(MaplePacketCreator.removeRune(rune, chr));
            chr.getMap().broadcastMessage(MaplePacketCreator.showRuneEffect(chr.getTouchedRune()));
            chr.getMap().removeMapObject(rune);
            chr.setRuneTimeStamp(System.currentTimeMillis() + 20 * 60 * 1000);
        } else {
            chr.setRuneTimeStamp(System.currentTimeMillis() + 10000);
        }
    }

    public static void FollowRequest(LittleEndianAccessor slea, MapleClient c) {
        MapleCharacter tt = c.getPlayer().getMap().getCharacterById(slea.readInt());
        if (slea.readByte() > 0) {
            //1 when changing map
            tt = c.getPlayer().getMap().getCharacterById(c.getPlayer().getFollowId());
            if (tt != null && tt.getFollowId() == c.getPlayer().getId()) {
                tt.setFollowOn(true);
                c.getPlayer().setFollowOn(true);
            } else {
                c.getPlayer().checkFollow();
            }
            return;
        }
        if (slea.readByte() > 0) { //cancelling follow
            tt = c.getPlayer().getMap().getCharacterById(c.getPlayer().getFollowId());
            if (tt != null && tt.getFollowId() == c.getPlayer().getId() && c.getPlayer().isFollowOn()) {
                c.getPlayer().checkFollow();
            }
            return;
        }
        if (tt != null && tt.getPosition().distanceSq(c.getPlayer().getPosition()) < 10000 && tt.getFollowId() == 0 && c.getPlayer().getFollowId() == 0 && tt.getId() != c.getPlayer().getId()) { //estimate, should less
            tt.setFollowId(c.getPlayer().getId());
            tt.setFollowOn(false);
            tt.setFollowInitiator(false);
            c.getPlayer().setFollowOn(false);
            c.getPlayer().setFollowInitiator(false);
            tt.getClient().getSession().write(MaplePacketCreator.followRequest(c.getPlayer().getId()));
        } else {
            c.getSession().write(MaplePacketCreator.serverNotice(1, "距离太远。"));
        }
    }

    public static void FollowReply(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().getFollowId() > 0 && c.getPlayer().getFollowId() == slea.readInt()) {
            MapleCharacter tt = c.getPlayer().getMap().getCharacterById(c.getPlayer().getFollowId());
            if (tt != null && tt.getPosition().distanceSq(c.getPlayer().getPosition()) < 10000 && tt.getFollowId() == 0 && tt.getId() != c.getPlayer().getId()) { //estimate, should less
                boolean accepted = slea.readByte() > 0;
                if (accepted) {
                    tt.setFollowId(c.getPlayer().getId());
                    tt.setFollowOn(true);
                    tt.setFollowInitiator(false);
                    c.getPlayer().setFollowOn(true);
                    c.getPlayer().setFollowInitiator(true);
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.followEffect(tt.getId(), c.getPlayer().getId(), null));
                } else {
                    c.getPlayer().setFollowId(0);
                    tt.setFollowId(0);
                    tt.getClient().getSession().write(MaplePacketCreator.getFollowMsg(5));
                }
            } else {
                if (tt != null) {
                    tt.setFollowId(0);
                    c.getPlayer().setFollowId(0);
                }
                c.getSession().write(MaplePacketCreator.serverNotice(1, "距离太远."));
            }
        } else {
            c.getPlayer().setFollowId(0);
        }
    }

    /*
     * 1112300 - 月长石戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112301 - 月长石戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112302 - 月长石戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112303 - 闪耀新星戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112304 - 闪耀新星戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112305 - 闪耀新星戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112306 - 金心戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112307 - 金心戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112308 - 金心戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112309 - 银翼戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112310 - 银翼戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112311 - 银翼戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
     * 1112315 - 恩爱夫妻结婚戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
     * 1112316 - 恩爱夫妻结婚戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
     * 1112317 - 恩爱夫妻结婚戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
     * 1112318 - 鸳鸯夫妻结婚戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
     * 1112319 - 鸳鸯夫妻结婚戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
     * 1112320 - 鸳鸯夫妻结婚戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
     *
     * 2240004 - 月长石戒指 - 用月亮的石头和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240005 - 月长石戒指2克拉 - 用月亮的石头和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240006 - 月长石戒指3克拉 - 用月亮的石头和23克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240007 - 闪耀新星戒指 - 用星星的石头和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240008 - 闪耀新星戒指2克拉 - 用星星的石头和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240009 - 闪耀新星戒指3克拉 - 用星星的石头和3克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240010 - 金心戒指 - 用黄金和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240011 - 金心戒指2克拉 - 用黄金和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240012 - 金心戒指3克拉 - 用黄金和3克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240013 - 银翼戒指 - 用银和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240014 - 银翼戒指2克拉 - 用银和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     * 2240015 - 银翼戒指3克拉 - 用银和3克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
     */
    public static void DoRing(MapleClient c, String name, int itemid) {
        int newItemId = getMarriageNewItemId(itemid);
        MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(name);
        /*
         * MarriageId 判断是否结婚
         * MarriageItemId 判断求婚状态
         */
        int errcode = 0x00;
        if (JobConstants.is神之子(c.getPlayer().getJob())) { //该道具不能用于神之子
            errcode = 0x15;
        } else if (c.getPlayer().getMarriageId() > 0) { //您已经是结婚的状态.
            errcode = 0x1D;
        } else if (c.getPlayer().getMarriageItemId() > 0) { //您已经是订婚的状态.
            errcode = 0x1B;
        } else if (!c.getPlayer().haveItem(itemid, 1) || itemid < 2240004 || itemid > 2240015) { //订婚失败
            errcode = 0x0F;
        } else if (chr == null) { //当前频道、地图找不到该角色或角色名错误.
            errcode = 0x16;
        } else if (JobConstants.is神之子(chr.getJob())) { //对方不在同一地图.
            errcode = 0x15;
        } else if (chr.getMapId() != c.getPlayer().getMapId()) { //对方不在同一地图.
            errcode = 0x17;
        } else if (chr.getGender() == c.getPlayer().getGender()) { //同性不能结婚.
            errcode = 0x1A;
        } else if (chr.getMarriageId() > 0) { //对方已经是结婚的状态.
            errcode = 0x1E;
        } else if (chr.getMarriageItemId() > 0) { //对方已经是订婚的状态.
            errcode = 0x1C;
        } else if (!MapleInventoryManipulator.checkSpace(c, newItemId, 1, "")) { //道具栏已满.请整理其他窗口.
            errcode = 0x18;
            //System.err.println("自己是否有位置: " + !MapleInventoryManipulator.checkSpace(c, newItemId, 1, ""));
        } else if (!MapleInventoryManipulator.checkSpace(chr.getClient(), newItemId, 1, "")) { //对方的道具栏已满.
            errcode = 0x19;
            //System.err.println("对方是否有位置: " + !MapleInventoryManipulator.checkSpace(c, newItemId, 1, ""));
        }
        if (errcode > 0) {
            c.getSession().write(MaplePacketCreator.sendEngagement((byte) errcode, 0, null, null));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().setMarriageItemId(itemid);
        chr.getClient().getSession().write(MaplePacketCreator.sendEngagementRequest(c.getPlayer().getName(), c.getPlayer().getId()));
    }

    public static void RingAction(LittleEndianAccessor slea, MapleClient c) {
        byte mode = slea.readByte();
        if (mode == 0) {
            DoRing(c, slea.readMapleAsciiString(), slea.readInt());
        } else if (mode == 1) {
            c.getPlayer().setMarriageItemId(0);
        } else if (mode == 2) { //accept/deny proposal
            boolean accepted = slea.readByte() > 0;
            String name = slea.readMapleAsciiString();
            int id = slea.readInt();
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(name);
            if (c.getPlayer().getMarriageId() > 0 || chr == null || chr.getId() != id || chr.getMarriageItemId() <= 0 || !chr.haveItem(chr.getMarriageItemId(), 1) || chr.getMarriageId() > 0 || !chr.isAlive() || chr.getEventInstance() != null || !c.getPlayer().isAlive() || c.getPlayer().getEventInstance() != null) {
                c.getSession().write(MaplePacketCreator.sendEngagement((byte) 0x1F, 0, null, null)); //对方处于无法接受求婚的状态.
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (accepted) {
                int itemid = chr.getMarriageItemId();
                int newItemId = getMarriageNewItemId(itemid);
                if (!MapleInventoryManipulator.checkSpace(c, newItemId, 1, "") || !MapleInventoryManipulator.checkSpace(chr.getClient(), newItemId, 1, "")) {
                    c.getSession().write(MaplePacketCreator.sendEngagement((byte) 0x15, 0, null, null));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                try {
                    int[] ringID = MapleRing.makeRing(newItemId, c.getPlayer(), chr);
                    Equip eq = (Equip) MapleItemInformationProvider.getInstance().getEquipById(newItemId, ringID[1]);
                    MapleRing ring = MapleRing.loadFromDb(ringID[1]);
                    if (ring != null) {
                        eq.setRing(ring);
                    }
                    MapleInventoryManipulator.addbyItem(c, eq);
                    eq = (Equip) MapleItemInformationProvider.getInstance().getEquipById(newItemId, ringID[0]);
                    ring = MapleRing.loadFromDb(ringID[0]);
                    if (ring != null) {
                        eq.setRing(ring);
                    }
                    MapleInventoryManipulator.addbyItem(chr.getClient(), eq);
                    MapleInventoryManipulator.removeById(chr.getClient(), MapleInventoryType.USE, chr.getMarriageItemId(), 1, false, false);
                    chr.getClient().getSession().write(MaplePacketCreator.sendEngagement((byte) 0x0D, newItemId, chr, c.getPlayer())); //恭喜你订婚成功.
                    chr.setMarriageId(c.getPlayer().getId());
                    c.getPlayer().setMarriageId(chr.getId());
                    chr.fakeRelog();
                    c.getPlayer().fakeRelog();
                    WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.yellowChat("[系统公告] 恭喜：" + c.getPlayer().getName() + " 和 " + chr.getName() + "结为夫妻。 希望你们在 " + chr.getClient().getChannelServer().getServerName() + " 游戏中玩的愉快!"));
                } catch (Exception e) {
                    FileoutputUtil.outputFileError(FileoutputUtil.PacketEx_Log, e);
                }
            } else {
                chr.getClient().getSession().write(MaplePacketCreator.sendEngagement((byte) 0x20, 0, null, null));
            }
            c.getSession().write(MaplePacketCreator.enableActions());
            chr.setMarriageItemId(0);
        } else if (mode == 3) { //drop, only works for ETC
            int itemId = slea.readInt();
            MapleInventoryType type = ItemConstants.getInventoryType(itemId);
            Item item = c.getPlayer().getInventory(type).findById(itemId);
            if (item != null && type == MapleInventoryType.ETC && itemId / 10000 == 421) {
                MapleInventoryManipulator.drop(c, type, item.getPosition(), item.getQuantity());
            }
        }
    }

    private static int getMarriageNewItemId(int itemId) {
        int newItemId;
        if (itemId == 2240004) { //月长石戒指 - 用月亮的石头和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112300; //月长石戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240005) { //月长石戒指2克拉 - 用月亮的石头和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112301; //月长石戒指2克拉 -  爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240006) { //月长石戒指3克拉 - 用月亮的石头和23克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚
            newItemId = 1112302; //月长石戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240007) { //闪耀新星戒指 - 用星星的石头和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112303; //闪耀新星戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240008) { //闪耀新星戒指2克拉 - 用星星的石头和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112304; //闪耀新星戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240009) { //闪耀新星戒指3克拉 - 用星星的石头和3克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112305; //闪耀新星戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240010) { //金心戒指 - 用黄金和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112306; //金心戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240011) { //金心戒指2克拉 - 用黄金和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112307; //金心戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240012) { //金心戒指3克拉 - 用黄金和3克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112308; //金心戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240013) { //银翼戒指 - 用银和钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112309; //银翼戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240014) { //银翼戒指2克拉 - 用银和2克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112310; //银翼戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else if (itemId == 2240015) { //银翼戒指3克拉 - 用银和3克拉的钻石加工而成的求婚戒指。可以用来向心爱的异性求婚。
            newItemId = 1112311; //银翼戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
        } else {
            throw new RuntimeException("Invalid Item Maker id");
        }
        return newItemId;
    }

    public static void Solomon(LittleEndianAccessor slea, MapleClient c) {
        c.getSession().write(MaplePacketCreator.enableActions());
        c.getPlayer().updateTick(slea.readInt());
        Item item = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slea.readShort());
        if (item == null || item.getItemId() != slea.readInt() || item.getQuantity() <= 0 || c.getPlayer().getGachExp() > 0 || c.getPlayer().getLevel() > 50 || MapleItemInformationProvider.getInstance().getItemEffect(item.getItemId()).getEXP() <= 0) {
            return;
        }
        c.getPlayer().setGachExp(c.getPlayer().getGachExp() + MapleItemInformationProvider.getInstance().getItemEffect(item.getItemId()).getEXP());
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, item.getPosition(), (short) 1, false);
        c.getPlayer().updateSingleStat(MapleStat.GACHAPONEXP, c.getPlayer().getGachExp());
    }

    public static void GachExp(LittleEndianAccessor slea, MapleClient c) {
        c.getSession().write(MaplePacketCreator.enableActions());
        c.getPlayer().updateTick(slea.readInt());
        if (c.getPlayer().getGachExp() <= 0) {
            return;
        }
        c.getPlayer().gainExp(c.getPlayer().getGachExp() * GameConstants.getExpRate_Quest(c.getPlayer().getLevel()), true, true, false);
        c.getPlayer().setGachExp(0);
        c.getPlayer().updateSingleStat(MapleStat.GACHAPONEXP, 0);
    }

    public static void Report(LittleEndianAccessor slea, MapleClient c) {
        //0 = success 1 = unable to locate 2 = once a day 3 = you've been reported 4+ = unknown reason
        MapleCharacter other;
        ReportType type;
        type = ReportType.getById(slea.readByte());
        other = c.getPlayer().getMap().getCharacterByName(slea.readMapleAsciiString());
        //then,byte(?) and string(reason)
        if (other == null || type == null || other.isIntern()) {
            //c.getSession().write(MaplePacketCreator.report(4));
            c.getPlayer().dropMessage(1, "举报错误.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleQuestStatus stat = c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.REPORT_QUEST));
        if (stat.getCustomData() == null) {
            stat.setCustomData("0");
        }
        long currentTime = System.currentTimeMillis();
        long theTime = Long.parseLong(stat.getCustomData());
        if (theTime + 7200000 > currentTime && !c.getPlayer().isIntern()) {
            c.getPlayer().dropMessage(5, "每2小时才能举报1次.");
        } else {
            stat.setCustomData(String.valueOf(currentTime));
            other.addReport(type);
            //c.getSession().write(MaplePacketCreator.report(GameConstants.GMS ? 2 : 0));
            c.getPlayer().dropMessage(1, "举报完成.");
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void MonsterBookInfoRequest(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
            return;
        }
        slea.readInt();
        MapleCharacter player = c.getPlayer().getMap().getCharacterById(slea.readInt());
        c.getSession().write(MaplePacketCreator.enableActions());
        if (player != null) {
            if (!player.isGM() || c.getPlayer().isGM()) {
                c.getSession().write(MaplePacketCreator.getMonsterBookInfo(player));
            }
        }
    }

    public static void ChangeSet(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
            return;
        }
        int set = slea.readInt();
        if (chr.getMonsterBook().changeSet(set)) {
            chr.getMonsterBook().applyBook(chr, false);
            chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.CURRENT_SET)).setCustomData(String.valueOf(set));
            c.getSession().write(MaplePacketCreator.changeCardSet(set));
        }
    }

    public static void EnterPVP(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null || c.getPlayer().getMapId() != 960000000) {
            c.getSession().write(MaplePacketCreator.partyBlocked(1));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (c.getPlayer().getParty() != null) {
            c.getSession().write(MaplePacketCreator.partyBlocked(9));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        slea.skip(1);
        int type = slea.readByte(), lvl = slea.readByte();
        boolean passed = false;
        switch (lvl) {
            case 0:
                passed = c.getPlayer().getLevel() >= 30 && c.getPlayer().getLevel() < 70;
                break;
            case 1:
                passed = c.getPlayer().getLevel() >= 70;
                break;
            case 2:
                passed = c.getPlayer().getLevel() >= 120;
                break;
            case 3:
                passed = c.getPlayer().getLevel() >= 180;
                break;
        }
        EventManager em = c.getChannelServer().getEventSM().getEventManager("PVP");
        if (!passed || em == null) {
            c.getSession().write(MaplePacketCreator.partyBlocked(1));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        List<Integer> maps = new ArrayList<>();
        switch (type) {
            case 0:
                maps.add(960010100);
                maps.add(960010101);
                maps.add(960010102);
                break;
            case 1:
                maps.add(960020100);
                maps.add(960020101);
                maps.add(960020102);
                maps.add(960020103);
                break;
            case 2:
                maps.add(960030100);
                break;
            case 3:
                maps.add(689000000);
                maps.add(689000010);
                break;
            default:
                passed = false;
                break;
        }
        if (!passed) {
            c.getSession().write(MaplePacketCreator.partyBlocked(1));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().getStat().heal(c.getPlayer());
        c.getPlayer().cancelAllBuffs();
        c.getPlayer().dispelDebuffs();
        c.getPlayer().changeRemoval();
        c.getPlayer().clearAllCooldowns();
        c.getPlayer().unequipAllSpawnPets();
        StringBuilder key = new StringBuilder().append(lvl).append(" ").append(type).append(" ");
        //check if any of the maps are available
        for (int i : maps) {
            EventInstanceManager eim = em.getInstance(new StringBuilder("PVP").append(key.toString()).append(i).toString().replace(" ", "").replace(" ", ""));
            if (eim != null && (eim.getProperty("started").equals("0") || eim.getPlayerCount() < 10)) {
                eim.registerPlayer(c.getPlayer());
                return;
            }
        }
        //make one
        em.startInstance_Solo(key.append(maps.get(Randomizer.nextInt(maps.size()))).toString(), c.getPlayer());
    }

    public static void RespawnPVP(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null || !c.getPlayer().inPVP() || c.getPlayer().isAlive()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int type = Integer.parseInt(c.getPlayer().getEventInstance().getProperty("type"));
        c.getPlayer().getStat().heal_noUpdate(c.getPlayer());
        c.getPlayer().updateSingleStat(MapleStat.MP, c.getPlayer().getStat().getMp());
        c.getPlayer().getEventInstance().schedule("broadcastType", 500);
        c.getPlayer().getEventInstance().schedule("updateScoreboard", 500);
        c.getPlayer().changeMap(c.getPlayer().getMap(), c.getPlayer().getMap().getPortal(type == 0 ? 0 : (type == 3 ? (c.getPlayer().getTeam() == 0 ? 3 : 1) : (c.getPlayer().getTeam() == 0 ? 2 : 3))));
        c.getSession().write(MaplePacketCreator.getPVPScore(Integer.parseInt(c.getPlayer().getEventInstance().getProperty(String.valueOf(c.getPlayer().getId()))), false));
    }

    public static void LeavePVP(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null || !c.getPlayer().inPVP()) {
            c.getSession().write(MaplePacketCreator.partyBlocked(6));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int x = Integer.parseInt(c.getPlayer().getEventInstance().getProperty(String.valueOf(c.getPlayer().getId())));
        int lv = Integer.parseInt(c.getPlayer().getEventInstance().getProperty("lvl"));
        if (lv < 2 && c.getPlayer().getLevel() >= 120) { //gladiator, level 120+
            x /= 2;
        }
        c.getPlayer().setTotalBattleExp(c.getPlayer().getTotalBattleExp() + ((x / 10) * 3 / 2));
        c.getPlayer().setBattlePoints(c.getPlayer().getBattlePoints() + ((x / 10) * 3 / 2)); //PVP 1.5 EVENT!
        c.getPlayer().cancelAllBuffs();
        c.getPlayer().changeRemoval();
        c.getPlayer().dispelDebuffs();
        c.getPlayer().clearAllCooldowns();
        c.getPlayer().updateTick(slea.readInt());
        c.getSession().write(UIPacket.clearMidMsg());
        c.getPlayer().changeMap(c.getChannelServer().getMapFactory().getMap(960000000));
        c.getPlayer().getStat().recalcLocalStats(c.getPlayer());
        c.getPlayer().getStat().heal(c.getPlayer());
    }

    public static void AttackPVP(LittleEndianAccessor slea, MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        int trueSkill = slea.readInt();
        int skillid = trueSkill;
        if (chr == null || chr.isHidden() || !chr.isAlive() || chr.hasBlockedInventory() || chr.getMap() == null || !chr.inPVP() || !chr.getEventInstance().getProperty("started").equals("1") || skillid >= 90000000) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int lvl = Integer.parseInt(chr.getEventInstance().getProperty("lvl"));
        int type = Integer.parseInt(chr.getEventInstance().getProperty("type"));
        int ice = Integer.parseInt(chr.getEventInstance().getProperty("ice"));
        int ourScore = Integer.parseInt(chr.getEventInstance().getProperty(String.valueOf(chr.getId())));
        int addedScore = 0, skillLevel = 0, trueSkillLevel = 0, animation = -1, attackCount = 1, mobCount = 1, fakeMastery = chr.getStat().passive_mastery(), ignoreDEF = chr.getStat().percent_ignore_mob_def_rate, critRate = chr.getStat().passive_sharpeye_rate(), skillDamage = 100;
        boolean magic = false, move = false, pull = false, push = false;

        double maxdamage = lvl == 3 ? chr.getStat().getCurrentMaxBasePVPDamageL() : chr.getStat().getCurrentMaxBasePVPDamage();
        MapleStatEffect effect = null;
        chr.checkFollow();
        Rectangle box = null;

        Item weapon = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
        Item shield = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        boolean katara = shield != null && shield.getItemId() / 10000 == 134;
        boolean aran = weapon != null && weapon.getItemId() / 10000 == 144 && JobConstants.is战神(chr.getJob());
        slea.skip(1); //skill level
        int chargeTime = 0;
        if (GameConstants.isMagicChargeSkill(skillid)) {
            chargeTime = slea.readInt();
        } else {
            slea.skip(4);
        }
        boolean facingLeft = slea.readByte() > 0;
        if (skillid > 0) {
            Skill skil = SkillFactory.getSkill(skillid);
            if (skil == null || skil.isPVPDisabled()) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            magic = skil.isMagic();
            move = skil.isMovement();
            push = skil.isPush();
            pull = skil.isPull();
            if (chr.getTotalSkillLevel(GameConstants.getLinkedAttackSkill(skillid)) <= 0) {
                if (!GameConstants.isIceKnightSkill(skillid) && chr.getTotalSkillLevel(GameConstants.getLinkedAttackSkill(skillid)) <= 0) {
                    chr.getClient().disconnect(true, false);
                    c.getSession().close(true);
                    return;
                }
                if (GameConstants.isIceKnightSkill(skillid) && chr.getBuffSource(MapleBuffStat.变身效果) % 10000 != 1105) {
                    return;
                }
            }
            animation = skil.getAnimation();
            if (animation == -1 && !skil.isMagic()) {
                String after = aran ? "aran" : (katara ? "katara" : (weapon == null ? "barehands" : MapleItemInformationProvider.getInstance().getAfterImage(weapon.getItemId())));
                if (after != null) {
                    List<Triple<String, Point, Point>> p = MapleItemInformationProvider.getInstance().getAfterImage(after); //hack
                    if (p != null) {
                        while (animation == -1) {
                            Triple<String, Point, Point> ep = p.get(Randomizer.nextInt(p.size()));
                            if (!ep.left.contains("stab")) { //&& (skillid == 飞侠.诅咒术 || skillid == 夜行者.诅咒术)disorder hack
                                continue;
                            } else if (ep.left.contains("stab") && weapon != null && weapon.getItemId() / 10000 == 144) {
                                continue;
                            }
                            if (SkillFactory.getDelay(ep.left) != null) {
                                animation = SkillFactory.getDelay(ep.left);
                            }
                        }
                    }
                }
            } else if (animation == -1 && skil.isMagic()) {
                animation = SkillFactory.getDelay(Randomizer.nextBoolean() ? "dash" : "dash2");
            }
            if (skil.isMagic()) {
                fakeMastery = 0; //whoosh still comes if you put this higher than 0
            }
            skillLevel = chr.getTotalSkillLevel(GameConstants.getLinkedAttackSkill(skillid));
            trueSkillLevel = chr.getTotalSkillLevel(GameConstants.getLinkedAttackSkill(trueSkill));
            effect = skil.getPVPEffect(skillLevel);
            ignoreDEF += effect.getIgnoreMob();
            critRate += effect.getCritical();

            skillDamage = (effect.getDamage() + chr.getStat().getDamageIncrease(skillid));
            box = effect.calculateBoundingBox(chr.getTruePosition(), facingLeft, chr.getStat().defRange);
            attackCount = Math.max(effect.getBulletCount(chr), effect.getAttackCount(chr));
            mobCount = Math.max(1, effect.getMobCount());
            if (effect.getCooldown(chr) > 0 && !chr.isGM()) {
                if (chr.skillisCooling(skillid)) {
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
            }
            switch (chr.getJob()) {
                case 111:
                case 112:
                case 1111:
                case 1112:
                case 2411: //幻影复制后有这个
                case 2412:
                    if (PlayerHandler.isFinisher(skillid) > 0) { // finisher
                        if (chr.getBuffedValue(MapleBuffStat.斗气集中) == null || chr.getBuffedValue(MapleBuffStat.斗气集中) <= 2) {
                            return;
                        }
                        skillDamage *= (chr.getBuffedValue(MapleBuffStat.斗气集中) - 1) / 2;
                        chr.handleOrbconsume(PlayerHandler.isFinisher(skillid));
                    }
                    break;
            }
        } else {
            attackCount = (katara ? 2 : 1);
            Point lt = null, rb = null;
            String after = aran ? "aran" : (katara ? "katara" : (weapon == null ? "barehands" : MapleItemInformationProvider.getInstance().getAfterImage(weapon.getItemId())));
            if (after != null) {
                List<Triple<String, Point, Point>> p = MapleItemInformationProvider.getInstance().getAfterImage(after);
                if (p != null) {
                    while (animation == -1) {
                        Triple<String, Point, Point> ep = p.get(Randomizer.nextInt(p.size()));
                        if (!ep.left.contains("stab")) { //&& (skillid == 飞侠.诅咒术 || skillid == 夜行者.诅咒术)disorder hack
                            continue;
                        } else if (ep.left.contains("stab") && weapon != null && weapon.getItemId() / 10000 == 147) {
                            continue;
                        }
                        if (SkillFactory.getDelay(ep.left) != null) {
                            animation = SkillFactory.getDelay(ep.left);
                            lt = ep.mid;
                            rb = ep.right;
                        }
                    }
                }
            }
            box = MapleStatEffect.calculateBoundingBox(chr.getTruePosition(), facingLeft, lt, rb, chr.getStat().defRange);
        }
        chr.getCheatTracker().checkPVPAttack(skillid);
        MapleStatEffect shad = chr.getStatForBuff(MapleBuffStat.影分身);
        int originalAttackCount = attackCount;
        attackCount *= (shad != null ? 2 : 1);

        slea.skip(4); //?idk
        int speed = slea.readByte();
        int slot = slea.readShort();
        int csstar = slea.readShort();
        int visProjectile = 0;
        if (chr.getJob() >= 3500 && chr.getJob() <= 3512) {
            visProjectile = 2333000;
        } else if (JobConstants.is火炮手(chr.getJob())) {
            visProjectile = 2333001;
        } else if (!JobConstants.is双弩精灵(chr.getJob()) && chr.getBuffedValue(MapleBuffStat.无形箭弩) == null && slot > 0) {
            Item ipp = chr.getInventory(MapleInventoryType.USE).getItem((short) slot);
            if (ipp == null) {
                return;
            }
            if (csstar > 0) {
                ipp = chr.getInventory(MapleInventoryType.CASH).getItem((short) csstar);
                if (ipp == null) {
                    return;
                }
            }
            visProjectile = ipp.getItemId();
        }
        maxdamage *= skillDamage / 100.0;
        maxdamage *= chr.getStat().getDamageRate() / 100.0;
        List<AttackPair> ourAttacks = new ArrayList<>(mobCount);
        boolean area = inArea(chr);
        boolean didAttack = false, killed = false;
        if (!area) {
            List<Pair<Integer, Boolean>> attacks;
            for (MapleCharacter attacked : chr.getMap().getCharactersIntersect(box)) {
                if (attacked.getId() != chr.getId() && attacked.isAlive() && !attacked.isHidden() && (type == 0 || attacked.getTeam() != chr.getTeam())) {
                    double rawDamage = maxdamage / Math.max(1, ((magic ? attacked.getStat().mdef : attacked.getStat().wdef) * Math.max(1.0, 100.0 - ignoreDEF) / 100.0) * (type == 3 ? 0.2 : 0.5));
                    if (attacked.getBuffedValue(MapleBuffStat.INVINCIBILITY) != null || inArea(attacked)) {
                        rawDamage = 0;
                    }
                    rawDamage *= attacked.getStat().mesoGuard / 100.0;
                    rawDamage += (rawDamage * chr.getDamageIncrease(attacked.getId()) / 100.0);
                    rawDamage = attacked.modifyDamageTaken(rawDamage, attacked).left;
                    double min = (rawDamage * chr.getStat().trueMastery / 100.0);
                    attacks = new ArrayList<>(attackCount);
                    int totalMPLoss = 0, totalHPLoss = 0;
                    for (int i = 0; i < attackCount; i++) {
                        boolean critical_ = false;
                        int mploss = 0;
                        double ourDamage = Randomizer.nextInt((int) Math.abs(Math.round(rawDamage - min)) + 2) + min;
                        if (attacked.getStat().dodgeChance > 0 && Randomizer.nextInt(100) < attacked.getStat().dodgeChance) {
                            ourDamage = 0;
                        } else if (attacked.hasDisease(MapleDisease.黑暗) && Randomizer.nextInt(100) < 50) {
                            ourDamage = 0;
                            //i dont think level actually matters or it'd be too op
                            //} else if (attacked.getLevel() > chr.getLevel() && Randomizer.nextInt(100) < (attacked.getLevel() - chr.getLevel())) {
                            //	ourDamage = 0;
                        } else if (attacked.getJob() == 122 && attacked.getTotalSkillLevel(圣骑士.守护之神) > 0 && attacked.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10) != null) {
                            MapleStatEffect eff = SkillFactory.getSkill(圣骑士.守护之神).getEffect(attacked.getTotalSkillLevel(圣骑士.守护之神));
                            if (eff.makeChanceResult()) {
                                ourDamage = 0;
                            }
                        } else if (attacked.getJob() == 412 && attacked.getTotalSkillLevel(隐士.假动作) > 0) {
                            MapleStatEffect eff = SkillFactory.getSkill(隐士.假动作).getEffect(attacked.getTotalSkillLevel(隐士.假动作));
                            if (eff.makeChanceResult()) {
                                ourDamage = 0;
                            }
                        } else if (attacked.getJob() == 422 && attacked.getTotalSkillLevel(侠盗.假动作) > 0) {
                            MapleStatEffect eff = SkillFactory.getSkill(侠盗.假动作).getEffect(attacked.getTotalSkillLevel(侠盗.假动作));
                            if (eff.makeChanceResult()) {
                                ourDamage = 0;
                            }
                        } else if (shad != null && i >= originalAttackCount) {
                            ourDamage *= shad.getX() / 100.0;
                        }
                        if (ourDamage > 0 && skillid != 侠盗.金钱炸弹 && (skillid == 侠盗.暗杀 || skillid == 箭神.一击要害箭 || skillid == 双弩.闪电刀刃 || skillid == 双刀.暗影飞跃斩 || skillid == 双刀.地狱锁链 || skillid == 战神.巨熊咆哮 || Randomizer.nextInt(100) < critRate)) {
                            ourDamage *= (100.0 + (Randomizer.nextInt(Math.max(2, chr.getStat().passive_sharpeye_percent() - chr.getStat().passive_sharpeye_min_percent())) + chr.getStat().passive_sharpeye_min_percent())) / 100.0;
                            critical_ = true;
                        }
                        if (attacked.getBuffedValue(MapleBuffStat.魔法盾) != null) {
                            mploss = (int) Math.min(attacked.getStat().getMp(), (ourDamage * attacked.getBuffedValue(MapleBuffStat.魔法盾).doubleValue() / 100.0));
                        }
                        ourDamage -= mploss;
                        if (attacked.getBuffedValue(MapleBuffStat.终极无限) != null) {
                            mploss = 0;
                        }
                        attacks.add(new Pair<>((int) Math.floor(ourDamage), critical_));

                        totalHPLoss += Math.floor(ourDamage);
                        totalMPLoss += mploss;
                    }
                    addedScore += Math.min(attacked.getStat().getHp() / 100, (totalHPLoss / 100) + (totalMPLoss / 100)); //ive NO idea
                    attacked.addMPHP(-totalHPLoss, -totalMPLoss);
                    ourAttacks.add(new AttackPair(attacked.getId(), attacked.getPosition(), attacks));
                    chr.onAttack(attacked.getStat().getCurrentMaxHp(), attacked.getStat().getCurrentMaxMp(attacked.getJob()), skillid, attacked.getObjectId(), totalHPLoss);
                    attacked.getCheatTracker().setAttacksWithoutHit(false);
                    if (totalHPLoss > 0) {
                        didAttack = true;
                    }
                    if (attacked.getStat().getHPPercent() <= 20) {
                        SkillFactory.getSkill(PlayerStats.getSkillByJob(93, attacked.getJob())).getEffect(1).applyTo(attacked);
                    }
                    if (effect != null) {
                        if (effect.getMonsterStati().size() > 0 && effect.makeChanceResult()) {
                            for (Map.Entry<MonsterStatus, Integer> z : effect.getMonsterStati().entrySet()) {
                                MapleDisease d = MonsterStatus.getLinkedDisease(z.getKey());
                                if (d != null) {
                                    attacked.giveDebuff(d, z.getValue(), effect.getDuration(), d.getDisease(), 1);
                                }
                            }
                        }
                        effect.handleExtraPVP(chr, attacked);
                    }
                    if (chr.getJob() == 121 || chr.getJob() == 122 || chr.getJob() == 2110 || chr.getJob() == 2111 || chr.getJob() == 2112) { // WHITEKNIGHT
                        if (chr.getBuffSource(MapleBuffStat.属性攻击) == 圣骑士.寒冰冲击 || chr.getBuffSource(MapleBuffStat.属性攻击) == 战神.冰雪矛) {
                            MapleStatEffect eff = chr.getStatForBuff(MapleBuffStat.属性攻击);
                            if (eff.makeChanceResult()) {
                                attacked.giveDebuff(MapleDisease.结冰, 1, eff.getDuration(), MapleDisease.结冰.getDisease(), 1);
                            }
                        }
                    } else if (chr.getBuffedValue(MapleBuffStat.增加敏捷) != null) {
                        MapleStatEffect eff = chr.getStatForBuff(MapleBuffStat.增加敏捷);

                        if (eff != null && eff.makeChanceResult()) {
                            attacked.giveDebuff(MapleDisease.缓慢, 100 - Math.abs(eff.getX()), eff.getDuration(), MapleDisease.缓慢.getDisease(), 1);
                        }
                    } else if (chr.getBuffedValue(MapleBuffStat.缓速术) != null) {
                        MapleStatEffect eff = chr.getStatForBuff(MapleBuffStat.缓速术);
                        if (eff != null && eff.makeChanceResult()) {
                            attacked.giveDebuff(MapleDisease.缓慢, 100 - Math.abs(eff.getX()), eff.getDuration(), MapleDisease.缓慢.getDisease(), 1);
                        }
                    } else if (chr.getJob() == 412 || chr.getJob() == 422 || chr.getJob() == 434 || chr.getJob() == 1411 || chr.getJob() == 1412) {
                        int[] skills = {隐士.武器用毒液, 侠盗.武器用毒液, 双刀.武器用毒液};
                        for (int i : skills) {
                            Skill skill = SkillFactory.getSkill(i);
                            if (chr.getTotalSkillLevel(skill) > 0) {
                                MapleStatEffect venomEffect = skill.getEffect(chr.getTotalSkillLevel(skill));
                                if (venomEffect.makeChanceResult()) {// THIS MIGHT ACTUALLY BE THE DOT
                                    attacked.giveDebuff(MapleDisease.中毒, 1, venomEffect.getDuration(), MapleDisease.中毒.getDisease(), 1);
                                }
                                break;
                            }
                        }
                    }
                    if ((chr.getJob() / 100) % 10 == 2) {//mage
                        int[] skills = {魔法师.精灵弱化, 龙神.精灵弱化};
                        for (int i : skills) {
                            Skill skill = SkillFactory.getSkill(i);
                            if (chr.getTotalSkillLevel(skill) > 0) {
                                MapleStatEffect venomEffect = skill.getEffect(chr.getTotalSkillLevel(skill));
                                if (venomEffect.makeChanceResult()) {
                                    venomEffect.applyTo(attacked);
                                }
                                break;
                            }
                        }
                    }
                    if (ice == attacked.getId()) {
                        chr.getClient().getSession().write(MaplePacketCreator.getPVPIceHPBar(attacked.getStat().getHp(), attacked.getStat().getCurrentMaxHp()));
                    } else {
                        chr.getClient().getSession().write(MaplePacketCreator.getPVPHPBar(attacked.getId(), attacked.getStat().getHp(), attacked.getStat().getCurrentMaxHp()));
                    }
                    if (!attacked.isAlive()) {
                        addedScore += 5; //i guess
                        killed = true;
                    }
                    if (ourAttacks.size() >= mobCount) {
                        break;
                    }
                }
            }
        } else if (type == 3) {
            if (Integer.parseInt(chr.getEventInstance().getProperty("redflag")) == chr.getId() && chr.getMap().getArea(1).contains(chr.getTruePosition())) {
                chr.getEventInstance().setProperty("redflag", "0");
                chr.getEventInstance().setProperty("blue", String.valueOf(Integer.parseInt(chr.getEventInstance().getProperty("blue")) + 1));
                chr.getEventInstance().broadcastPlayerMsg(-7, "Blue Team has scored a point!");
                chr.getMap().spawnAutoDrop(2910000, chr.getMap().getGuardians().get(0).left);
                chr.getEventInstance().broadcastPacket(MaplePacketCreator.getCapturePosition(chr.getMap()));
                chr.getEventInstance().broadcastPacket(MaplePacketCreator.resetCapture());
                chr.getEventInstance().schedule("updateScoreboard", 1000);
            } else if (Integer.parseInt(chr.getEventInstance().getProperty("blueflag")) == chr.getId() && chr.getMap().getArea(0).contains(chr.getTruePosition())) {
                chr.getEventInstance().setProperty("blueflag", "0");
                chr.getEventInstance().setProperty("red", String.valueOf(Integer.parseInt(chr.getEventInstance().getProperty("red")) + 1));
                chr.getEventInstance().broadcastPlayerMsg(-7, "Red Team has scored a point!");
                chr.getMap().spawnAutoDrop(2910001, chr.getMap().getGuardians().get(1).left);
                chr.getEventInstance().broadcastPacket(MaplePacketCreator.getCapturePosition(chr.getMap()));
                chr.getEventInstance().broadcastPacket(MaplePacketCreator.resetCapture());
                chr.getEventInstance().schedule("updateScoreboard", 1000);
            }
        }
        if (chr.getEventInstance() == null) { //if the PVP ends
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (killed || addedScore > 0) {
            chr.getEventInstance().addPVPScore(chr, addedScore);
            chr.getClient().getSession().write(MaplePacketCreator.getPVPScore(ourScore + addedScore, killed));
        }
        if (didAttack) {
            chr.afterAttack(ourAttacks.size(), attackCount, skillid);
            PlayerHandler.AranCombo(c, chr, ourAttacks.size() * attackCount);
            if (skillid > 0 && (ourAttacks.size() > 0 || (skillid != 双刀.终极斩)) && !GameConstants.isNoDelaySkill(skillid)) {
                effect.applyTo(chr, chr.getTruePosition());
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            move = false;
            pull = false;
            push = false;
            c.getSession().write(MaplePacketCreator.enableActions());
        }
        chr.getMap().broadcastMessage(MaplePacketCreator.pvpAttack(chr.getId(), chr.getLevel(), trueSkill, trueSkillLevel, speed, fakeMastery, visProjectile, attackCount, chargeTime, animation, facingLeft ? 1 : 0, chr.getStat().defRange, skillid, skillLevel, move, push, pull, ourAttacks));
        if (addedScore > 0 && GameConstants.getAttackDelay(skillid, SkillFactory.getSkill(skillid)) >= 100) {
            CheatTracker tracker = chr.getCheatTracker();
            tracker.setAttacksWithoutHit(true);
            if (tracker.getAttacksWithoutHit() >= 50) {
                tracker.registerOffense(CheatingOffense.ATTACK_WITHOUT_GETTING_HIT, "无敌自动封号.");
            }
        }
    }

    public static boolean inArea(MapleCharacter chr) {
        for (Rectangle rect : chr.getMap().getAreas()) {
            if (rect.contains(chr.getTruePosition())) {
                return true;
            }
        }
        for (MapleMist mist : chr.getMap().getAllMistsThreadsafe()) {
            if (mist.getOwnerId() == chr.getId() && mist.getMistType() == 2 && mist.getBox().contains(chr.getTruePosition())) {
                return true;
            }
        }
        return false;
    }

    /*
     * 测谎仪系统
     */
    public static void LieDetector(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr, boolean isItem) { // Person who used 
        if (chr == null || chr.getMap() == null) {
            return;
        }
        String target = slea.readMapleAsciiString();
        byte slot = 0;
        if (isItem) {
            if (!chr.getCheatTracker().canLieDetector()) {
                chr.dropMessage(1, "您已经使用过一次，暂时还无法使用测谎仪道具.");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            slot = (byte) slea.readShort(); // 01 00 (first pos in use) 
            int itemId = slea.readInt(); // B0 6A 21 00 
            Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
            if (toUse == null || toUse.getQuantity() <= 0 || toUse.getItemId() != itemId || itemId != 2190000) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
        } else if (!chr.isIntern()) { // Manager using skill. Lie Detector Skill 
            chr.getClient().disconnect(true, false);
            c.getSession().close(true);
            return;
        }
        if ((FieldLimitType.PotionUse.check(chr.getMap().getFieldLimit()) && isItem) || chr.getMap().getReturnMapId() == chr.getMapId()) {
            chr.dropMessage(5, "当前地图无法使用测谎仪.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleCharacter search_chr = chr.getMap().getCharacterByName(target);
        if (search_chr == null || search_chr.getId() == chr.getId() || search_chr.isIntern() && !chr.isIntern()) {
            chr.dropMessage(1, "未找到角色.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (search_chr.getEventInstance() != null || search_chr.getMapId() == GameConstants.JAIL) {
            chr.dropMessage(5, "当前地图无法使用测谎仪.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (search_chr.getAntiMacro().inProgress()) {
            c.getSession().write(MaplePacketCreator.LieDetectorResponse((byte) 0x03));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (search_chr.getAntiMacro().isPassed() && isItem || search_chr.getAntiMacro().getAttempt() == 2) {
            c.getSession().write(MaplePacketCreator.LieDetectorResponse((byte) 0x02));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!search_chr.getAntiMacro().startLieDetector(chr.getName(), isItem, false)) {
            chr.dropMessage(5, "使用测谎仪失败."); //error occured, usually cannot access to captcha server 
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (isItem) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
        search_chr.dropMessage(5, chr.getName() + " 对你使用了测谎仪.");
    }

    public static void LieDetectorResponse(LittleEndianAccessor slea, MapleClient c) { // Person who typed 
        if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
            return;
        }
        String answer = slea.readMapleAsciiString();
        MapleLieDetector ld = c.getPlayer().getAntiMacro();
        if (!ld.inProgress() || (ld.isPassed() && ld.getLastType() == 0) || ld.getAnswer() == null || answer.length() <= 0) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (answer.equalsIgnoreCase(ld.getAnswer())) {
            MapleCharacter search_chr = c.getPlayer().getMap().getCharacterByName(ld.getTester());
            if (search_chr != null && search_chr.getId() != c.getPlayer().getId()) {
                search_chr.dropMessage(5, c.getPlayer().getName() + " 通过了测谎仪的检测.");
            }
            c.getSession().write(MaplePacketCreator.LieDetectorResponse((byte) 0x0C, (byte) 1));
            c.getPlayer().gainMeso(5000, true);
            ld.end();
            WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] 玩家: " + c.getPlayer().getName() + " (等级 " + c.getPlayer().getLevel() + ") 通过了测谎仪检测。"));
        } else if (ld.getAttempt() < 3) { // 图片重置
            ld.startLieDetector(ld.getTester(), ld.getLastType() == 0, true); // new attempt 
        } else {
            MapleCharacter search_chr = c.getPlayer().getMap().getCharacterByName(ld.getTester());
            if (search_chr != null && search_chr.getId() != c.getPlayer().getId()) {
                search_chr.dropMessage(5, c.getPlayer().getName() + " 没用通过测谎仪的检测，恭喜你获得7000的金币.");
                search_chr.gainMeso(7000, true);
            }
            ld.end();
            c.getPlayer().getClient().getSession().write(MaplePacketCreator.LieDetectorResponse((byte) 0x0A, (byte) 4));
            MapleMap map = c.getChannelServer().getMapFactory().getMap(GameConstants.JAIL);
            c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_QUEST)).setCustomData(String.valueOf(30 * 60));
            c.getPlayer().changeMap(map, map.getPortal(0));
            WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] 玩家: " + c.getPlayer().getName() + " (等级 " + c.getPlayer().getLevel() + ") 未通过测谎仪检测，系统将其监禁30分钟！"));
        }
    }

    public static void LieDetectorRefresh(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null) {
            return;
        }
        MapleLieDetector ld = c.getPlayer().getAntiMacro();
        if (ld.getAttempt() < 3) { // 图片重置
            ld.startLieDetector(ld.getTester(), ld.getLastType() == 0, true);
        } else {
            ld.end();
            c.getPlayer().getClient().getSession().write(MaplePacketCreator.LieDetectorResponse((byte) 0x0A, (byte) 4));
            MapleMap map = c.getChannelServer().getMapFactory().getMap(GameConstants.JAIL);
            c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.JAIL_QUEST)).setCustomData(String.valueOf(30 * 60));
            c.getPlayer().changeMap(map, map.getPortal(0));
            WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] 玩家: " + c.getPlayer().getName() + " (等级 " + c.getPlayer().getLevel() + ") 未通过测谎仪检测，系统将其监禁30分钟！"));
        }
    }

    public static void updateRedLeafHigh(LittleEndianAccessor slea, MapleClient c) {
        slea.readInt();
        slea.readInt();
        int joejoe = slea.readInt();
        slea.readInt();
        int hermoninny = slea.readInt();
        slea.readInt();
        int littledragon = slea.readInt();
        slea.readInt();
        int ika = slea.readInt();
        slea.readInt();
        int wooden = slea.readInt();
        if (joejoe + hermoninny + littledragon + ika != c.getPlayer().getFriendShipToAdd()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().setFriendShipPoints(joejoe, hermoninny, littledragon, ika, wooden);
    }
}
