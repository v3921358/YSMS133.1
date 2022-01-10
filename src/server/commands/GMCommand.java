/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.commands;

import client.skills.Skill;
import client.skills.SkillFactory;
import client.*;
import client.inventory.Equip;
import client.inventory.Item;
import client.inventory.ItemFlag;
import client.inventory.MapleInventoryType;
import server.commands.InternCommand.Ban;
import server.commands.InternCommand.TempBan;
import constants.GameConstants;
import constants.ItemConstants;
import handling.channel.ChannelServer;
import handling.world.WorldBroadcastService;
import org.apache.log4j.Logger;
import scripting.event.EventInstanceManager;
import scripting.event.EventManager;
import server.MapleCarnivalChallenge;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.shop.MapleShopFactory;
import server.events.MapleEvent;
import server.events.MapleEventType;
import server.life.MapleMonster;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.StringUtil;

/**
 * @author Emilyx3
 */
public class GMCommand {

    private static final Logger log = Logger.getLogger(GMCommand.class);

    /**
     * @return
     */
    public static PlayerGMRank getPlayerLevelRequired() {
        return PlayerGMRank.GM;
    }

    /**
     *
     */
    public static class MapInfo extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int xpos = c.getPlayer().getPosition().x;
            int ypos = c.getPlayer().getPosition().y;
            c.getPlayer().dropMessage(6, "当前地图信息: ID " + c.getPlayer().getMapId() + " 名字 " + c.getPlayer().getMap().getMapName() + " 当前坐标信息: " + xpos + " / " + ypos);
            return 1;
        }
    }

    /**
     *
     */
    public static class GetSkill extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            Skill skill = SkillFactory.getSkill(Integer.parseInt(splitted[1]));
            byte level = (byte) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            byte masterlevel = (byte) CommandProcessorUtil.getOptionalIntArg(splitted, 3, 1);

            if (level > skill.getMaxLevel()) {
                level = (byte) skill.getMaxLevel();
            }
            if (masterlevel > skill.getMaxLevel()) {
                masterlevel = (byte) skill.getMaxLevel();
            }
            c.getPlayer().changeSingleSkillLevel(skill, level, masterlevel);
            return 1;
        }
    }

    /**
     *
     */
    public static class Fame extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter player = c.getPlayer();
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: !fame <玩家名字> <要加人气的数量>");
                return 0;
            }
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            int fame = 0;
            try {
                fame = Integer.parseInt(splitted[2]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "输入的数字无效...");
                return 0;
            }
            if (victim != null && player.allowedToTarget(victim)) {
                victim.addFame(fame);
                victim.updateSingleStat(MapleStat.人气, victim.getFame());
                log.info("[命令] 管理员 " + player.getName() + " 给玩家 " + victim.getName() + " 加人气 " + fame + " 点.");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class 无敌模式 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter player = c.getPlayer();
            if (player.isInvincible()) {
                player.setInvincible(false);
                player.dropMessage(6, "无敌模式已关闭.");
            } else {
                player.setInvincible(true);
                player.dropMessage(6, "无敌模式已开启.");
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class SP extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            for (int i = 0; i < 4; i++) {
                c.getPlayer().setRemainingSp(CommandProcessorUtil.getOptionalIntArg(splitted, 1, 1), i);
            }
            c.getPlayer().updateSingleStat(MapleStat.AVAILABLESP, 0);
            return 1;
        }
    }

    /**
     *
     */
    public static class Job extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "!job <职业ID>");
                return 0;
            }
            int jobId = Integer.parseInt(splitted[1]);
            if (MapleCarnivalChallenge.getJobNameById(jobId).length() == 0) {
                c.getPlayer().dropMessage(5, "输入的职业id无效.");
                return 0;
            }
            c.getPlayer().changeJob(Integer.parseInt(splitted[1]));
            return 1;
        }
    }

    /**
     *
     */
    public static class Shop extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleShopFactory shop = MapleShopFactory.getInstance();
            int shopId = Integer.parseInt(splitted[1]);
            if (shop.getShop(shopId) != null) {
                shop.getShop(shopId).sendShop(c);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class 给经验 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getLevel() < 250) {
                c.getPlayer().gainExp(500000000, true, false, true);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class 刷物品 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            if (!c.getPlayer().isAdmin()) {
                for (int i : GameConstants.itemBlock) {
                    if (itemId == i) {
                        c.getPlayer().dropMessage(5, "对不起，您当前管理权限无法刷出这个装备.");
                        return 0;
                    }
                }
            }
            if (!c.getPlayer().isSuperGM()) {
                switch (itemId / 10000) {
                    case 202:
                    case 204:
                    case 229: //技能书
                    case 251: //配方
                    case 253: //特殊卷轴
                    case 261: //武器上使用后可以突破伤害上限
                    case 400:
                    case 401:
                    case 402:
                    case 403:
                    case 413: //作辅助剂
                    case 417: //花生之类
                    case 425: //锻造道具
                    case 431:
                    case 506: //防暴卷轴
                        c.getPlayer().dropMessage(5, "对不起，您当前管理权限无法刷出这个装备.");
                        return 0;
                }
            }
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (ItemConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "宠物道具请通过商城购买.");
            } else if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 这个道具不存在.");
            } else {
                Item item;
                short flag = (short) ItemFlag.LOCK.getValue();
                if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    item = ii.randomizeStats((Equip) ii.getEquipById(itemId));
                } else {
                    item = new client.inventory.Item(itemId, (byte) 0, !c.getPlayer().isSuperGM() ? 1 : quantity, (byte) 0);
                }
                if (!c.getPlayer().isSuperGM()) {
                    item.setFlag(flag);
                }
                if (!c.getPlayer().isAdmin()) {
                    item.setOwner(c.getPlayer().getName());
                }
                item.setGMLog(c.getPlayer().getName() + " 使用命令 !刷物品");
                MapleInventoryManipulator.addbyItem(c, item);
                log.info("[命令] 管理员 " + c.getPlayer().getName() + " 刷道具: " + item.getItemId() + " 数量: " + item.getQuantity() + " 名称: " + ii.getName(itemId));
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class GetItemAll extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: !GetItemAll <道具ID> <道具数量>");
                return 0;
            }
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = splitted.length < 3 ? 1 : (short) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 这个道具不存在.");
            } else if (ItemConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "宠物道具请通过商城购买.");
            }
            int succ = 0, error = 0;
            for (MapleCharacter player : ChannelServer.getInstance(1).getMapFactory().getMap(910000000).getCharacters()) {
                if (player != null && player.haveSpaceForId(itemId)) {
                    Item item;
                    if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                        item = ii.randomizeStats((Equip) ii.getEquipById(itemId));
                    } else {
                        item = new client.inventory.Item(itemId, (byte) 0, !c.getPlayer().isSuperGM() ? 1 : quantity, (byte) 0);
                    }
                    item.setGMLog(c.getPlayer().getName() + " 使用命令 !GetItemAll");
                    MapleInventoryManipulator.addbyItem(player.getClient(), item);
                    log.info("[命令] 管理员 " + c.getPlayer().getName() + " 使用全服刷道具, 玩家名: " + player.getName() + " 道具: " + item.getItemId() + " 数量: " + item.getQuantity() + " 名称: " + ii.getName(itemId));
                    player.dropMessage(1, "恭喜你获得管理员赠送的 " + ii.getName(itemId) + " " + quantity + "个。");
                    player.dropMessage(6, "[系统公告] 恭喜你获得管理员赠送的 " + ii.getName(itemId) + " " + quantity + "个。");
                    succ++;
                } else {
                    error++;
                }
            }
            c.getPlayer().dropMessage(1, "命令使用完毕。\r\n发送成功: " + succ + "\r\n发送失败: " + error);
            return 1;
        }
    }

    /**
     *
     */
    public static class GetItemAll2 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: !GetItemAll2 <道具ID> <道具数量>");
                return 0;
            }
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = splitted.length < 3 ? 1 : (short) CommandProcessorUtil.getOptionalIntArg(splitted, 2, 1);
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 这个道具不存在.");
            } else if (ItemConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "宠物道具请通过商城购买.");
            }
            int succ = 0, error = 0;
            for (ChannelServer channel : ChannelServer.getAllInstances()) {
                for (MapleCharacter player : channel.getPlayerStorage().getAllCharacters()) {
                    if (player != null && player.haveSpaceForId(itemId)) {
                        Item item;
                        if (ItemConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                            item = ii.randomizeStats((Equip) ii.getEquipById(itemId));
                        } else {
                            item = new client.inventory.Item(itemId, (byte) 0, !c.getPlayer().isSuperGM() ? 1 : quantity, (byte) 0);
                        }
                        item.setGMLog(c.getPlayer().getName() + " 使用命令 !GetItemAll2");
                        MapleInventoryManipulator.addbyItem(player.getClient(), item);
                        log.info("[命令] 管理员 " + c.getPlayer().getName() + " 使用全服刷道具, 玩家名: " + player.getName() + " 道具: " + item.getItemId() + " 数量: " + item.getQuantity() + " 名称: " + ii.getName(itemId));
                        player.dropMessage(1, "恭喜你获得管理员赠送的 " + ii.getName(itemId) + " " + quantity + "个。");
                        player.dropMessage(6, "[系统公告] 恭喜你获得管理员赠送的 " + ii.getName(itemId) + " " + quantity + "个。");
                        succ++;
                    } else {
                        error++;
                    }
                }
            }
            c.getPlayer().dropMessage(1, "命令使用完毕。\r\n发送成功: " + succ + "\r\n发送失败: " + error);
            return 1;
        }
    }

    /**
     *
     */
    public static class 设置等级 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(6, "用法: !设置等级 <等级>");
                return 0;
            }
            int change; //需要调整的等级
            try {
                change = Integer.parseInt(splitted[1]);
            } catch (NumberFormatException nfe) {
                c.getPlayer().dropMessage(6, "输入的数字无效.");
                return 0;
            }
            if (change <= 0 || change > 250) {
                c.getPlayer().dropMessage(6, "调整的等级范围出错，默认范围[1-250]");
                return 0;
            }
            c.getPlayer().setLevel((short) (change - 1)); //调整角色的等级为 当前调整的等级 - 1
            c.getPlayer().levelUp(); //触发角色升级效果
            return 1;
        }
    }

    /**
     *
     */
    public static class StartAutoEvent extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            final EventManager em = c.getChannelServer().getEventSM().getEventManager("AutomatedEvent");
            if (em != null) {
                em.scheduleRandomEvent();
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class SetEvent extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleEvent.onStartEvent(c.getPlayer());
            return 1;
        }
    }

    /**
     *
     */
    public static class StartEvent extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getChannelServer().getEvent() == c.getPlayer().getMapId()) {
                MapleEvent.setEvent(c.getChannelServer(), false);
                c.getPlayer().dropMessage(5, "开启或关闭活动脚本成功.");
                return 1;
            } else {
                c.getPlayer().dropMessage(5, "!scheduleevent must've been done first, and you must be in the event map.");
                return 0;
            }
        }
    }

    /**
     *
     */
    public static class ScheduleEvent extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            final MapleEventType type = MapleEventType.getByString(splitted[1]);
            if (type == null) {
                final StringBuilder sb = new StringBuilder("Wrong syntax: ");
                for (MapleEventType t : MapleEventType.values()) {
                    sb.append(t.name()).append(",");
                }
                c.getPlayer().dropMessage(5, sb.toString().substring(0, sb.toString().length() - 1));
                return 0;
            }
            final String msg = MapleEvent.scheduleEvent(type, c.getChannelServer());
            if (msg.length() > 0) {
                c.getPlayer().dropMessage(5, msg);
                return 0;
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class 删除道具 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "需要输入 <角色名字> <道具ID>");
                return 0;
            }
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (chr == null) {
                c.getPlayer().dropMessage(6, "输入的角色不存在或者角色不在线或者不在这个频道.");
                return 0;
            }
            chr.removeAll(Integer.parseInt(splitted[2]), false, false);
            c.getPlayer().dropMessage(6, "已经成功的将ID为: " + splitted[2] + " 的所有道具从角色: " + splitted[1] + " 的背包中删除.");
            return 1;
        }
    }

    /**
     *
     */
    public static class 锁定道具 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "Need <name> <itemid>");
                return 0;
            }
            MapleCharacter chr = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (chr == null) {
                c.getPlayer().dropMessage(6, "输入的角色不存在或者角色不在线或者不在这个频道.");
                return 0;
            }
            int itemid = Integer.parseInt(splitted[2]);
            MapleInventoryType type = ItemConstants.getInventoryType(itemid);
            for (Item item : chr.getInventory(type).listById(itemid)) {
                item.setFlag((byte) (item.getFlag() | ItemFlag.LOCK.getValue()));
                chr.forceUpdateItem(item);
            }
            if (type == MapleInventoryType.EQUIP) {
                type = MapleInventoryType.EQUIPPED;
                for (Item item : chr.getInventory(type).listById(itemid)) {
                    item.setFlag((byte) (item.getFlag() | ItemFlag.LOCK.getValue()));
                    chr.forceUpdateItem(item);
                }
            }
            c.getPlayer().dropMessage(6, "已经成功的将ID为: " + splitted[2] + " 的所有道具锁定,执行角色为: " + splitted[1] + ".");
            return 1;
        }
    }

    /**
     *
     */
    public static class KillMap extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            for (MapleCharacter map : c.getPlayer().getMap().getCharactersThreadsafe()) {
                if (map != null && !map.isGM()) {
                    map.getStat().setHp((short) 0, map);
                    map.getStat().setMp((short) 0, map);
                    map.updateSingleStat(MapleStat.HP, 0);
                    map.updateSingleStat(MapleStat.MP, 0);
                }
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class SpeakMega extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.serverNotice(3, victim == null ? c.getChannel() : victim.getClient().getChannel(), victim == null ? splitted[1] : victim.getName() + " : " + StringUtil.joinStringFrom(splitted, 2), true));
            return 1;
        }
    }

    /**
     *
     */
    public static class Speak extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            if (victim == null) {
                c.getPlayer().dropMessage(5, "没有找到 " + splitted[1] + " 玩家.");
                return 0;
            } else {
                victim.getMap().broadcastMessage(MaplePacketCreator.getChatText(victim.getId(), StringUtil.joinStringFrom(splitted, 2), victim.isGM(), 0));
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class Disease extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (splitted.length < 3) {
                c.getPlayer().dropMessage(6, "!disease <type> [charname] <level> where type = SEAL/DARKNESS/WEAKEN/STUN/CURSE/POISON/SLOW/SEDUCE/REVERSE/ZOMBIFY/POTION/SHADOW/BLIND/FREEZE/POTENTIAL");
                return 0;
            }
            int type = 0;
            if (splitted[1].equalsIgnoreCase("SEAL")) {
                type = 120;
            } else if (splitted[1].equalsIgnoreCase("DARKNESS")) {
                type = 121;
            } else if (splitted[1].equalsIgnoreCase("WEAKEN")) {
                type = 122;
            } else if (splitted[1].equalsIgnoreCase("STUN")) {
                type = 123;
            } else if (splitted[1].equalsIgnoreCase("CURSE")) {
                type = 124;
            } else if (splitted[1].equalsIgnoreCase("POISON")) {
                type = 125;
            } else if (splitted[1].equalsIgnoreCase("SLOW")) {
                type = 126;
            } else if (splitted[1].equalsIgnoreCase("SEDUCE")) {
                type = 128;
            } else if (splitted[1].equalsIgnoreCase("REVERSE")) {
                type = 132;
            } else if (splitted[1].equalsIgnoreCase("ZOMBIFY")) {
                type = 133;
            } else if (splitted[1].equalsIgnoreCase("POTION")) {
                type = 134;
            } else if (splitted[1].equalsIgnoreCase("SHADOW")) {
                type = 135;
            } else if (splitted[1].equalsIgnoreCase("BLIND")) {
                type = 136;
            } else if (splitted[1].equalsIgnoreCase("FREEZE")) {
                type = 137;
            } else if (splitted[1].equalsIgnoreCase("POTENTIAL")) {
                type = 138;
            } else {
                c.getPlayer().dropMessage(6, "!disease <type> [charname] <level> where type = SEAL/DARKNESS/WEAKEN/STUN/CURSE/POISON/SLOW/SEDUCE/REVERSE/ZOMBIFY/POTION/SHADOW/BLIND/FREEZE/POTENTIAL");
                return 0;
            }
            if (splitted.length == 4) {
                MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[2]);
                if (victim == null) {
                    c.getPlayer().dropMessage(5, "无法找到角色.");
                    return 0;
                }
                victim.disease(type, CommandProcessorUtil.getOptionalIntArg(splitted, 3, 1));
            } else {
                for (MapleCharacter victim : c.getPlayer().getMap().getCharactersThreadsafe()) {
                    victim.disease(type, CommandProcessorUtil.getOptionalIntArg(splitted, 3, 1));
                }
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class SetInstanceProperty extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            EventManager em = c.getChannelServer().getEventSM().getEventManager(splitted[1]);
            if (em == null || em.getInstances().size() <= 0) {
                c.getPlayer().dropMessage(5, "none");
            } else {
                em.setProperty(splitted[2], splitted[3]);
                for (EventInstanceManager eim : em.getInstances()) {
                    eim.setProperty(splitted[2], splitted[3]);
                }
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class ListInstanceProperty extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            EventManager em = c.getChannelServer().getEventSM().getEventManager(splitted[1]);
            if (em == null || em.getInstances().size() <= 0) {
                c.getPlayer().dropMessage(5, "none");
            } else {
                for (EventInstanceManager eim : em.getInstances()) {
                    c.getPlayer().dropMessage(5, "活动脚本: " + eim.getName() + ", eventManager: " + em.getName() + " iprops: " + eim.getProperty(splitted[2]) + ", eprops: " + em.getProperty(splitted[2]));
                }
            }
            return 0;
        }
    }

    /**
     *
     */
    public static class LeaveInstance extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getEventInstance() == null) {
                c.getPlayer().dropMessage(5, "You are not in one");
            } else {
                c.getPlayer().getEventInstance().unregisterPlayer(c.getPlayer());
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class WhosThere extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            StringBuilder builder = new StringBuilder("当前地图玩家: ").append(c.getPlayer().getMap().getCharactersThreadsafe().size()).append(" 人. ");
            for (MapleCharacter chr : c.getPlayer().getMap().getCharactersThreadsafe()) {
                if (builder.length() > 150) { // wild guess :o
                    builder.setLength(builder.length() - 2);
                    c.getPlayer().dropMessage(6, builder.toString());
                    builder = new StringBuilder();
                }
                builder.append(MapleCharacterUtil.makeMapleReadable(chr.getName()));
                builder.append(", ");
            }
            builder.setLength(builder.length() - 2);
            c.getPlayer().dropMessage(6, builder.toString());
            return 1;
        }
    }

    /**
     *
     */
    public static class StartInstance extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            if (c.getPlayer().getEventInstance() != null) {
                c.getPlayer().dropMessage(5, "You are in one");
            } else if (splitted.length > 2) {
                EventManager em = c.getChannelServer().getEventSM().getEventManager(splitted[1]);
                if (em == null || em.getInstance(splitted[2]) == null) {
                    c.getPlayer().dropMessage(5, "Not exist");
                } else {
                    em.getInstance(splitted[2]).registerPlayer(c.getPlayer());
                }
            } else {
                c.getPlayer().dropMessage(5, "!startinstance [eventmanager] [eventinstance]");
            }
            return 1;

        }
    }

    /**
     *
     */
    public static class 重置怪物 extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().getMap().killAllMonsters(false);
            return 1;
        }
    }

    /**
     *
     */
    public static class KillMonsterByOID extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            MapleMap map = c.getPlayer().getMap();
            int targetId = Integer.parseInt(splitted[1]);
            MapleMonster monster = map.getMonsterByOid(targetId);
            if (monster != null) {
                map.killMonster(monster, c.getPlayer(), false, false, (byte) 1);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class 重置NPC extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().getMap().resetNPCs();
            return 1;
        }
    }

    /**
     *
     */
    public static class Notice extends CommandExecute {

        /**
         * @param typestring
         * @return
         */
        protected static int getNoticeType(String typestring) {
            if (typestring.equals("n")) {
                return 0;
            } else if (typestring.equals("p")) {
                return 1;
            } else if (typestring.equals("l")) {
                return 2;
            } else if (typestring.equals("nv")) {
                return 5;
            } else if (typestring.equals("v")) {
                return 5;
            } else if (typestring.equals("b")) {
                return 6;
            }
            return -1;
        }

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int joinmod = 1;
            int range = -1;
            if (splitted[1].equals("m")) {
                range = 0;
            } else if (splitted[1].equals("c")) {
                range = 1;
            } else if (splitted[1].equals("w")) {
                range = 2;
            }

            int tfrom = 2;
            if (range == -1) {
                range = 2;
                tfrom = 1;
            }
            int type = getNoticeType(splitted[tfrom]);
            if (type == -1) {
                type = 0;
                joinmod = 0;
            }
            StringBuilder sb = new StringBuilder();
            if (splitted[tfrom].equals("nv")) {
                sb.append("[Notice]");
            } else {
                sb.append("");
            }
            joinmod += tfrom;
            sb.append(StringUtil.joinStringFrom(splitted, joinmod));

            byte[] packet = MaplePacketCreator.serverNotice(type, sb.toString());
            if (range == 0) {
                c.getPlayer().getMap().broadcastMessage(packet);
            } else if (range == 1) {
                ChannelServer.getInstance(c.getChannel()).broadcastPacket(packet);
            } else if (range == 2) {
                WorldBroadcastService.getInstance().broadcastMessage(packet);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class Yellow extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            int range = -1;
            if (splitted[1].equals("m")) {
                range = 0;
            } else if (splitted[1].equals("c")) {
                range = 1;
            } else if (splitted[1].equals("w")) {
                range = 2;
            }
            if (range == -1) {
                range = 2;
            }
            byte[] packet = MaplePacketCreator.yellowChat((splitted[0].equals("!y") ? ("[" + c.getPlayer().getName() + "] ") : "") + StringUtil.joinStringFrom(splitted, 2));
            if (range == 0) {
                c.getPlayer().getMap().broadcastMessage(packet);
            } else if (range == 1) {
                ChannelServer.getInstance(c.getChannel()).broadcastPacket(packet);
            } else if (range == 2) {
                WorldBroadcastService.getInstance().broadcastMessage(packet);
            }
            return 1;
        }
    }

    /**
     *
     */
    public static class Y extends Yellow {
    }

    /**
     *
     */
    public static class WhatsMyIP extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().dropMessage(5, "IP: " + c.getSession().getRemoteAddress().toString().split(":")[0]);
            return 1;
        }
    }

    /**
     *
     */
    public static class TempBanIP extends TempBan {

        /**
         *
         */
        public TempBanIP() {
            ipBan = true;
        }
    }

    /**
     *
     */
    public static class BanIP extends Ban {

        /**
         *
         */
        public BanIP() {
            ipBan = true;
        }
    }

    /**
     *
     */
    public static class TDrops extends CommandExecute {

        @Override
        public int execute(MapleClient c, String[] splitted) {
            c.getPlayer().getMap().toggleDrops();
            return 1;
        }
    }
}
