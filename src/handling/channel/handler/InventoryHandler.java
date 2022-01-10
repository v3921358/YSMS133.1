package handling.channel.handler;

import client.skills.Skill;
import client.skills.InnerSkillEntry;
import client.skills.InnerAbillity;
import client.skills.SkillFactory;
import client.*;
import client.inventory.*;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import static handling.channel.handler.UseCashItemHandler.getMagnifyPrice;
import handling.world.party.MaplePartyCharacter;
import handling.world.WorldBroadcastService;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.locks.Lock;

import scripting.item.ItemScriptManager;
import scripting.npc.NPCScriptManager;
import server.*;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.maps.*;
import server.quest.MapleQuest;
import server.shops.HiredMerchant;
import server.shops.IMaplePlayerShop;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.Pair;
import tools.data.input.LittleEndianAccessor;
import tools.packet.BuffPacket;
import tools.packet.EffectPacket;
import tools.packet.InventoryPacket;
import tools.packet.MTSCSPacket;
import tools.packet.MobPacket;
import tools.packet.PlayerShopPacket;

public class InventoryHandler {

    /*
     * 道具移动
     */
    public static void ItemMove(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        c.getPlayer().updateTick(slea.readInt());
        MapleInventoryType type = MapleInventoryType.getByType(slea.readByte());
        short src = slea.readShort(); //背包位置
        short dst = slea.readShort(); //装备栏位置
        short quantity = slea.readShort();
        if (src < 0 && dst > 0) {
            MapleInventoryManipulator.unequip(c, src, dst);
        } else if (dst < 0) {
            MapleInventoryManipulator.equip(c, src, dst);
        } else if (dst == 0) {
            MapleInventoryManipulator.drop(c, type, src, quantity);
        } else {
            MapleInventoryManipulator.move(c, type, src, dst);
        }
    }

    /*
     * 小背包里面的道具移动
     */
    public static void SwitchBag(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        c.getPlayer().updateTick(slea.readInt());
        short src = (short) slea.readInt();
        short dst = (short) slea.readInt();
        if (src < 100 || dst < 100) {
            return;
        }
        MapleInventoryManipulator.move(c, MapleInventoryType.ETC, src, dst);
    }

    /*
     * 小背包道具到道具栏
     */
    public static void MoveBag(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        c.getPlayer().updateTick(slea.readInt());
        boolean srcFirst = slea.readInt() > 0;
        if (slea.readByte() != 4) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        short dst = (short) slea.readInt();
        short src = slea.readShort();
        MapleInventoryManipulator.move(c, MapleInventoryType.ETC, srcFirst ? dst : src, srcFirst ? src : dst);
    }

    /*
     * 道具集合
     */
    public static void ItemSort(LittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        MapleInventoryType pInvType = MapleInventoryType.getByType(slea.readByte());
        if (pInvType == MapleInventoryType.UNDEFINED || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleInventory pInv = c.getPlayer().getInventory(pInvType); //Mode should correspond with MapleInventoryType
        boolean sorted = false;
        while (!sorted) {
            byte freeSlot = (byte) pInv.getNextFreeSlot();
            if (freeSlot != -1) {
                byte itemSlot = -1;
                for (byte i = (byte) (freeSlot + 1); i <= pInv.getSlotLimit(); i++) {
                    if (pInv.getItem(i) != null) {
                        itemSlot = i;
                        break;
                    }
                }
                if (itemSlot > 0) {
                    MapleInventoryManipulator.move(c, pInvType, itemSlot, freeSlot);
                } else {
                    sorted = true;
                }
            } else {
                sorted = true;
            }
        }
        c.getSession().write(MaplePacketCreator.finishedSort(pInvType.getType()));
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 道具排序
     */
    public static void ItemGather(LittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        if (c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        byte mode = slea.readByte();
        if (mode == 0x05) {
            c.getPlayer().dropMessage(1, "特殊栏道具暂不开放已种类道具排列.");
            c.getSession().write(MaplePacketCreator.finishedGather(mode));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleInventoryType invType = MapleInventoryType.getByType(mode);
        MapleInventory Inv = c.getPlayer().getInventory(invType);

        List<Item> itemMap = new LinkedList<>();
        for (Item item : Inv.list()) {
            itemMap.add(item.copy());
        }
        for (Item itemStats : itemMap) {
            MapleInventoryManipulator.removeFromSlot(c, invType, itemStats.getPosition(), itemStats.getQuantity(), true, false);
        }

        List<Item> sortedItems = sortItems(itemMap);
        for (Item item : sortedItems) {
            MapleInventoryManipulator.addFromDrop(c, item, false);
        }
        c.getSession().write(MaplePacketCreator.finishedGather(mode));
        c.getSession().write(MaplePacketCreator.enableActions());
        itemMap.clear();
        sortedItems.clear();
    }

    private static List<Item> sortItems(List<Item> passedMap) {
        List<Integer> itemIds = new ArrayList<>(); // empty list.
        for (Item item : passedMap) {
            itemIds.add(item.getItemId()); // adds all item ids to the empty list to be sorted.
        }
        Collections.sort(itemIds); // 对道具ID进行排序 sorts item ids
        List<Item> sortedList = new LinkedList<>(); // ordered list pl0x <3.
        for (Integer val : itemIds) {
            for (Item item : passedMap) {
                if (val == item.getItemId()) { // Goes through every index and finds the first value that matches
                    sortedList.add(item);
                    passedMap.remove(item);
                    break;
                }
            }
        }
        return sortedList;
    }

    public static boolean UseRewardItem(byte slot, int itemId, MapleClient c, MapleCharacter chr) {
        Item toUse = c.getPlayer().getInventory(ItemConstants.getInventoryType(itemId)).getItem(slot);
        c.getSession().write(MaplePacketCreator.enableActions());
        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId && !chr.hasBlockedInventory()) {
            if (chr.getInventory(MapleInventoryType.EQUIP).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.USE).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.SETUP).getNextFreeSlot() > -1 && chr.getInventory(MapleInventoryType.ETC).getNextFreeSlot() > -1) {
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                if (itemId == 2028048) { //未知金币包
                    int mesars = 5000000;
                    if (mesars > 0 && chr.getMeso() < (Integer.MAX_VALUE - mesars)) {
                        int gainmes = Randomizer.nextInt(mesars);
                        chr.gainMeso(gainmes, true, true);
                        c.getSession().write(MTSCSPacket.sendMesobagSuccess(gainmes));
                        //MapleInventoryManipulator.removeById(c, GameConstants.getInventoryType(itemId), itemId, 1, false, false);
                        MapleInventoryManipulator.removeFromSlot(c, ItemConstants.getInventoryType(itemId), slot, (short) 1, false);
                        return true;
                    } else {
                        chr.dropMessage(1, "金币已达到上限无法使用这个道具.");
                        return false;
                    }
                }
                Pair<Integer, List<StructRewardItem>> rewards = ii.getRewardItem(itemId);

                if (rewards != null && rewards.getLeft() > 0) {
                    while (true) {
                        for (StructRewardItem reward : rewards.getRight()) {
                            if (reward.prob > 0 && Randomizer.nextInt(rewards.getLeft()) < reward.prob) { // Total prob
                                if (ItemConstants.getInventoryType(reward.itemid) == MapleInventoryType.EQUIP) {
                                    Item item = ii.getEquipById(reward.itemid);
                                    if (reward.period > 0) {
                                        item.setExpiration(System.currentTimeMillis() + (reward.period * 60 * 1000));
                                    }
                                    item.setGMLog("Reward item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date());
                                    if (chr.isAdmin()) {
                                        chr.dropMessage(5, "打开道具获得: " + item.getItemId());
                                    }
                                    if (reward.itemid / 1000 == 1182) {
                                        ii.randomize休彼德蔓徽章((Equip) item);
                                    }
                                    MapleInventoryManipulator.addbyItem(c, item);
                                    c.getSession().write(MaplePacketCreator.getShowItemGain(item.getItemId(), item.getQuantity(), true));
                                } else {
                                    if (chr.isAdmin()) {
                                        chr.dropMessage(5, "打开道具获得: " + reward.itemid + " - " + reward.quantity);
                                    }
                                    MapleInventoryManipulator.addById(c, reward.itemid, reward.quantity, "Reward item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date());
                                    c.getSession().write(MaplePacketCreator.getShowItemGain(reward.itemid, reward.quantity, true));
                                }
                                //MapleInventoryManipulator.removeById(c, GameConstants.getInventoryType(itemId), itemId, 1, false, false);
                                MapleInventoryManipulator.removeFromSlot(c, ItemConstants.getInventoryType(itemId), slot, (short) 1, false);
                                c.getSession().write(EffectPacket.showRewardItemAnimation(reward.itemid, reward.effect));
                                chr.getMap().broadcastMessage(chr, EffectPacket.showRewardItemAnimation(reward.itemid, reward.effect, chr.getId()), false);
                                return true;
                            }
                        }
                    }
                } else {
                    chr.dropMessage(6, "出现未知错误.");
                }
            } else {
                chr.dropMessage(6, "背包空间不足。");
            }
        }
        return false;
    }

    /*
     * 使用消耗道具
     */
    public static void UseItem(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMapId() == 749040100 || chr.getMap() == null || chr.hasDisease(MapleDisease.药水停止) || chr.hasBlockedInventory() || chr.inPVP() || chr.getMap().isPvpMaps()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        long time = System.currentTimeMillis();
        if (chr.getNextConsume() > time) {
            chr.dropMessage(5, "暂时无法使用这个道具，请稍后在试。");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }

        if (!FieldLimitType.PotionUse.check(chr.getMap().getFieldLimit())) { //cwk quick hack
            if (MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyTo(chr)) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
                if (chr.getMap().getConsumeItemCoolTime() > 0) {
                    chr.setNextConsume(time + (chr.getMap().getConsumeItemCoolTime() * 1000));
                }
            }
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 使用理发卷[2540000]之类的道具
     */
    public static void UseCosmetic(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || itemId / 10000 != 254 || (itemId / 1000) % 10 != chr.getGender()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (MapleItemInformationProvider.getInstance().getItemEffect(toUse.getItemId()).applyTo(chr)) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
    }

    /*
     * 使用还原器[2700000]之类的道具
     */
    public static void UseReducer(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int itemId = slea.readInt();
        byte slot = (byte) slea.readInt();
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || itemId / 10000 != 270) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int lines = chr.getLevel() >= 70 ? 3 : chr.getLevel() >= 50 ? 2 : chr.getLevel() >= 30 ? 1 : 0;
        if (lines < chr.getInnerSkillSize()) {
            lines = chr.getInnerSkillSize() > 3 ? 3 : chr.getInnerSkillSize();
        }
        for (int i = 0; i < lines; i++) {
            boolean rewarded = false;
            //InnerSkillEntry oldskill = chr.getInnerSkills()[i];
            int rank = 0;
            int position = i + 1;
            while (!rewarded) {
                InnerSkillEntry newskill = InnerAbillity.getInstance().renewSkill(rank, position, itemId == 2701000);
                if (newskill != null) {
                    chr.changeInnerSkill(newskill);
                    rewarded = true;
                }
            }
        }
        chr.equipChanged();
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, toUse.getPosition(), (short) 1, false);
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void UseReducerPrestige(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int lockLevel = slea.readInt();
        int lockCount = slea.readInt();
        int needHonor = ItemConstants.getNeedHonor(lockLevel, lockCount);
        if (chr.getHonorExp() < needHonor) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }

        int lockLine[] = {-1, -1};
        for (int i = 0; i < 2; i++) {
            if (slea.available() >= 4) {
                lockLine[i] = slea.readInt();
            }
        }
        int lines = chr.getLevel() >= 70 ? 3 : chr.getLevel() >= 50 ? 2 : chr.getLevel() >= 30 ? 1 : 0;
        if (lines < chr.getInnerSkillSize()) {
            lines = chr.getInnerSkillSize() > 3 ? 3 : chr.getInnerSkillSize();
        }
        for (int i = 0; i < lines; i++) {
            boolean rewarded = false;
            boolean lock = false;
            int position = i + 1;
            // 跳过已锁定的
            for (int j : lockLine) {
                if (j == position) {
                    lock = true;
                    break;
                }
            }
            if (lock) {
                continue;
            }
            while (!rewarded) {
                InnerSkillEntry newskill = InnerAbillity.getInstance().renewSkill(lockLevel, position, lockLevel > 0);
                if (newskill != null) {
                    chr.changeInnerSkill(newskill);
                    rewarded = true;
                }
            }
        }
        chr.gainHonorExp(-needHonor);
        chr.equipChanged();
        chr.dropMessage(1, "能力重新设置成功");
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 使用回城卷道具
     */
    public static void UseReturnScroll(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (!chr.isAlive() || chr.getMapId() == 749040100 || chr.hasBlockedInventory() || chr.isInBlockedMap() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt(); //物品ID
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!FieldLimitType.PotionUse.check(chr.getMap().getFieldLimit())) {
            if (ii.getItemEffect(toUse.getItemId()).applyReturnScroll(chr)) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
            } else {
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 使用鉴定放大镜
     */
    public static void UseMagnify(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        chr.updateTick(slea.readInt());
        chr.setScrolledPosition((short) 0);
        byte src = (byte) slea.readShort();
        byte dst = (byte) slea.readShort();
        boolean insight = src == 127/* && chr.getTrait(MapleTraitType.sense).getLevel() >= 30*/;
        Item magnify = chr.getInventory(MapleInventoryType.USE).getItem(src);
        Equip toScroll;
       
        if (dst < 0) {
            toScroll = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        } else {
            toScroll = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(dst);
        }
        if (chr.isShowPacket()) {
            System.out.println("鉴定装备: 放大镜: " + magnify + " insight: " + insight + " toScroll: " + toScroll + " BlockedInventory: " + c.getPlayer().hasBlockedInventory());
        }
        if ((magnify == null && !insight) || toScroll == null || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
         long price = getMagnifyPrice(chr,toScroll);
           if (chr.getMeso()<price) {
          chr.dropMessage(1, "金币不够，无法使用魔方");
           return;
} else {
chr.gainMeso(-price, true);
           }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int reqLevel = ii.getReqLevel(toScroll.getItemId()) / 10;
     
        boolean isPotAdd = false;
         
        if ((toScroll.getState() == 1 || toScroll.getOptential4() < 0 || toScroll.getOptential5() < 0) && (insight || magnify.getItemId() == 2460005 || magnify.getItemId() == 2460004 || magnify.getItemId() == 2460003 || (magnify.getItemId() == 2460002 && reqLevel <= 12) || (magnify.getItemId() == 2460001 && reqLevel <= 7) || (magnify.getItemId() == 2460000 && reqLevel <= 3))) {
            List<List<StructItemOption>> opts = new LinkedList<>(ii.getAllOptentialInfo().values());
            if (toScroll.getState() == 1) {
                int new_state = Math.abs(toScroll.getOptential1());
                if (new_state > 20 || new_state < 17) { // incase overflow
                    new_state = 17;
                }
                int lines = (toScroll.getOptential2() != 0 ? 3 : 2); // 默认2条属性
                while (toScroll.getState() != new_state) {
                    //31001 = 好用的轻功, 31002 = 好用的时空门, 31003 = 好用的火眼晶晶, 31004 = 好用的神圣之火, 41005 = 强化战斗命令, 41006 = 强化进阶祝福, 41007 = 强化极速领域
                    for (int i = 0; i < lines; i++) { //最小 2 条, 最大 3 条
                        boolean rewarded = false;
                        while (!rewarded) {
                            StructItemOption opt = opts.get(Randomizer.nextInt(opts.size())).get(reqLevel);
                            if (opt != null && opt.reqLevel / 10 <= reqLevel && !GameConstants.isAboveA(opt.opID) && GameConstants.optionTypeFits(opt.optionType, toScroll.getItemId()) && GameConstants.optionTypeFitsX(opt.opID, toScroll.getItemId()) && GameConstants.optentialIDFits(opt.opID, 17, 1) && GameConstants.isBlockedOptential(toScroll, opt.opID, true, false)) {//optionType
                                //have to research optionType before making this truely sea-like
                                if (i == 0) {
                                    toScroll.setOptential1(opt.opID);
                                } else if (i == 1) {
                                    toScroll.setOptential2(opt.opID);
                                } else if (i == 2) {
                                    toScroll.setOptential3(opt.opID);
                                }
                                rewarded = true;
                            }
                        }
                    }
                }
                // 恢复潜能锁属性
                int lockSlot = toScroll.getLockSlot();
                switch (lockSlot) {
                    case 1:
                        toScroll.setOptential1(toScroll.getLockId());
                        break;
                    case 2:
                        toScroll.setOptential2(toScroll.getLockId());
                        break;
                    case 3:
                        toScroll.setOptential3(toScroll.getLockId());
                        break;
                }
                toScroll.setLockOptential(0, (short) 0);

                if (toScroll.getState() >= 18 && toScroll.getStateMsg() < 3) {
                    if (toScroll.getState() == 18 && toScroll.getStateMsg() == 0) {
                        toScroll.setStateMsg(1);
                        chr.finishAchievement(52);
                        if (!chr.isAdmin()) {
                            String msg = chr.getMedalText() + chr.getName() + " : 鉴定出 A 级装备，大家祝贺他(她)吧！";
                            WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.itemMegaphone(msg, true, c.getChannel(), toScroll));
                        }
                    } else if (toScroll.getState() == 19 && toScroll.getStateMsg() <= 1) {
                        toScroll.setStateMsg(2);
                        chr.finishAchievement(53);
                        if (!chr.isAdmin()) {
                            String msg = chr.getMedalText() + chr.getName() + " : 鉴定出 S 级装备，大家祝贺他(她)吧！";
                            WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.itemMegaphone(msg, true, c.getChannel(), toScroll));
                        }
                    } else if (toScroll.getState() == 20 && toScroll.getStateMsg() <= 2) {
                        toScroll.setStateMsg(3);
                        chr.finishAchievement(54);
                        if (!chr.isAdmin()) {
                            String msg = chr.getMedalText() + chr.getName() + " : 鉴定出 SS 级装备，大家祝贺他(她)吧！";
                            WorldBroadcastService.getInstance().broadcastSmega(MaplePacketCreator.itemMegaphone(msg, true, c.getChannel(), toScroll));
                        }
                    }
                }
            } else {
                if (toScroll.getOptential4() < 0) {
                    int new_state = Math.abs(toScroll.getOptential4());
                    if (new_state > 20 || new_state < 17) {
                        new_state = 17;
                    }
                    while (toScroll.getAddState(4) != new_state) {
                        boolean rewarded = false;
                        while (!rewarded) {
                            StructItemOption opt = opts.get(Randomizer.nextInt(opts.size())).get(reqLevel);
                           if (opt != null && opt.reqLevel / 10 <= reqLevel && !GameConstants.isAboveA(opt.opID) && GameConstants.optionTypeFits(opt.optionType, toScroll.getItemId()) && GameConstants.optionTypeFitsX(opt.opID, toScroll.getItemId()) && GameConstants.optentialIDFits(opt.opID, 17, 1) && GameConstants.isBlockedOptential(toScroll, opt.opID, true, false))  { //optionType
                                toScroll.setOptential4(opt.opID);
                                rewarded = true;
                            }
                        }
                    }
                }
                if (toScroll.getOptential5() < 0) {
                    int new_state = Math.abs(toScroll.getOptential5());
                    if (new_state > 20 || new_state < 17) {
                        new_state = 17;
                    }
                    while (toScroll.getAddState(5) != new_state) {
                        boolean rewarded = false;
                        while (!rewarded) {
                            StructItemOption opt = opts.get(Randomizer.nextInt(opts.size())).get(reqLevel);
                           if (opt != null && opt.reqLevel / 10 <= reqLevel && !GameConstants.isAboveA(opt.opID) && GameConstants.optionTypeFits(opt.optionType, toScroll.getItemId()) && GameConstants.optionTypeFitsX(opt.opID, toScroll.getItemId()) && GameConstants.optentialIDFits(opt.opID, 17, 1) && GameConstants.isBlockedOptential(toScroll, opt.opID, true, false))  { //optionType
                                toScroll.setOptential5(opt.opID);
                                rewarded = true;
                            }
                        }
                    }
                }
                if (toScroll.getOptential6() < 0) {
                    int new_state = Math.abs(toScroll.getOptential6());
                    if (new_state > 20 || new_state < 17) {
                        new_state = 17;
                    }
                    while (toScroll.getAddState(6) != new_state) {
                        boolean rewarded = false;
                        while (!rewarded) {
                            StructItemOption opt = opts.get(Randomizer.nextInt(opts.size())).get(reqLevel);
                            if (opt != null && opt.reqLevel / 10 <= reqLevel && !GameConstants.isAboveA(opt.opID) && GameConstants.optionTypeFits(opt.optionType, toScroll.getItemId()) && GameConstants.optionTypeFitsX(opt.opID, toScroll.getItemId()) && GameConstants.optentialIDFits(opt.opID, 17, 1) && GameConstants.isBlockedOptential(toScroll, opt.opID, true, false))  { //optionType
                                toScroll.setOptential6(opt.opID);
                                rewarded = true;
                            }
                        }
                    }
                }
                isPotAdd = true;
            }
            chr.getTrait(MapleTraitType.insight).addExp((insight ? 10 : ((magnify.getItemId() + 2) - 2460000)) * 2, chr);
            chr.getMap().broadcastMessage(InventoryPacket.showMagnifyingEffect(chr.getId(), toScroll.getPosition(), isPotAdd));
            if (!insight) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, magnify.getPosition(), (short) 1, false);
            }
            chr.forceUpdateItem(toScroll, true);
            if (dst < 0) { //当 dst 小于 就是鉴定装备中的装备 需要重新计算角色的属性
                chr.equipChanged();
            }
            c.getSession().write(MaplePacketCreator.enableActions());
        } else {
            c.getSession().write(InventoryPacket.getInventoryFull());
        }
    }

    /*
     * 使用技能书
     */
    public static boolean UseSkillBook(byte slot, int itemId, MapleClient c, MapleCharacter chr) {
        Item toUse = chr.getInventory(ItemConstants.getInventoryType(itemId)).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || chr.hasBlockedInventory()) {
            return false;
        }
        Map<String, Integer> skilldata = MapleItemInformationProvider.getInstance().getEquipStats(toUse.getItemId());
        if (skilldata == null) { // Hacking or used an unknown item
            return false;
        }
        boolean canuse = false, success = false;
        int skill = 0, maxlevel = 0;

        Integer SuccessRate = skilldata.get("success");
        Integer ReqSkillLevel = skilldata.get("reqSkillLevel");
        Integer MasterLevel = skilldata.get("masterLevel");

        byte i = 0;
        Integer CurrentLoopedSkillId;
        while (true) {
            CurrentLoopedSkillId = skilldata.get("skillid" + i);
            i++;
            if (CurrentLoopedSkillId == null || MasterLevel == null) {
                break; // End of data
            }
            Skill CurrSkillData = SkillFactory.getSkill(CurrentLoopedSkillId);
            if (CurrSkillData != null && CurrSkillData.canBeLearnedBy(chr.getJob()) && (ReqSkillLevel == null || chr.getSkillLevel(CurrSkillData) >= ReqSkillLevel) && chr.getMasterLevel(CurrSkillData) < MasterLevel) {
                canuse = true;
                if (SuccessRate == null || Randomizer.nextInt(100) <= SuccessRate) {
                    success = true;
                    chr.changeSingleSkillLevel(CurrSkillData, chr.getSkillLevel(CurrSkillData), (byte) (int) MasterLevel);
                } else {
                    success = false;
                }
                MapleInventoryManipulator.removeFromSlot(c, ItemConstants.getInventoryType(itemId), slot, (short) 1, false);
                break;
            }
        }
        c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.useSkillBook(chr, skill, maxlevel, canuse, success));
        c.getSession().write(MaplePacketCreator.enableActions());
        return canuse;
    }

    /*
     * 使用Sp初始化卷
     */
    public static void UseSpReset(byte slot, int itemId, MapleClient c, MapleCharacter chr) {
        Item toUse = chr.getInventory(ItemConstants.getInventoryType(itemId)).getItem(slot);
        if (toUse == null || itemId / 1000 != 2500 || toUse.getItemId() != itemId || JobConstants.is新手职业(chr.getJob())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        chr.SpReset();
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, true);
        c.getSession().write(MaplePacketCreator.useSPReset(chr.getId()));
    }

    /*
     * 使用Ap初始化卷
     */
    public static void UseApReset(byte slot, int itemId, MapleClient c, MapleCharacter chr) {
        Item toUse = chr.getInventory(ItemConstants.getInventoryType(itemId)).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemId && !chr.hasBlockedInventory() && itemId / 10000 == 250) {
            chr.resetStats(4, 4, 4, 4);
            MapleInventoryManipulator.removeFromSlot(c, ItemConstants.getInventoryType(itemId), slot, (short) 1, false);
            c.getSession().write(MaplePacketCreator.useAPReset(chr.getId()));
            c.getSession().write(MaplePacketCreator.enableActions());
        } else {
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 使用捕抓怪物道具
     */
    public static void UseCatchItem(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        byte slot = (byte) slea.readShort();
        int itemid = slea.readInt();
        MapleMonster mob = chr.getMap().getMonsterByOid(slea.readInt());
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        MapleMap map = chr.getMap();
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && mob != null && !chr.hasBlockedInventory() && itemid / 10000 == 227 && MapleItemInformationProvider.getInstance().getCardMobId(itemid) == mob.getId()) {
            if (!MapleItemInformationProvider.getInstance().isMobHP(itemid) || mob.getHp() <= mob.getMobMaxHp() / 2) {
                map.broadcastMessage(MobPacket.catchMonster(mob.getObjectId(), itemid, (byte) 1));
                map.killMonster(mob, chr, true, false, (byte) 1);
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false, false);
                if (MapleItemInformationProvider.getInstance().getCreateId(itemid) > 0) {
                    MapleInventoryManipulator.addById(c, MapleItemInformationProvider.getInstance().getCreateId(itemid), (short) 1, "Catch item " + itemid + " on " + FileoutputUtil.CurrentReadable_Date());
                }
            } else {
                map.broadcastMessage(MobPacket.catchMonster(mob.getObjectId(), itemid, (byte) 0));
                c.getSession().write(MobPacket.catchMob(mob.getId(), itemid, (byte) 0));
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 使用坐骑疲劳恢复药水
     */
    public static void UseMountFood(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        int itemid = slea.readInt(); //2260000 usually 恢复疲劳补药
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        MapleMount mount = chr.getMount();
        if (itemid / 10000 == 226 && toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && mount != null && !c.getPlayer().hasBlockedInventory()) {
            int fatigue = mount.getFatigue();
            boolean levelup = false;
            mount.setFatigue((byte) -30);
            if (fatigue > 0) {
                mount.increaseExp();
                int level = mount.getLevel();
                if (level < 30 && mount.getExp() >= GameConstants.getMountExpNeededForLevel(level + 1)) {
                    mount.setLevel((byte) (level + 1));
                    levelup = true;
                }
            }
            chr.getMap().broadcastMessage(MaplePacketCreator.updateMount(chr, levelup));
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void UseScriptedNPCItem(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (c == null || chr == null) {
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        Item toUse = chr.getInventory(ItemConstants.getInventoryType(itemId)).getItem(slot);
        long expiration_days = 0;
        int mountid = 0;
        int damageSkin = -1;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        ScriptedItem info = ii.getScriptedItemInfo(itemId);
        if (info == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId && !chr.hasBlockedInventory() && !chr.inPVP()) {
            switch (toUse.getItemId()) {
                case 2430007: { // Blank Compass
                    MapleInventory inventory = chr.getInventory(MapleInventoryType.SETUP);
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                    if (inventory.countById(3994102) >= 20 // 罗盘用N
                            && inventory.countById(3994103) >= 20 // 罗盘用E
                            && inventory.countById(3994104) >= 20 // 罗盘用W
                            && inventory.countById(3994105) >= 20) { // 罗盘用S
                        //2430008 - 黄金罗盘 - 指向钻石王老五宝物岛位置的黄金罗盘。 双击后可以移动到宝物岛
                        MapleInventoryManipulator.addById(c, 2430008, (short) 1, "Scripted item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date()); // Gold Compass
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994102, 20, false, false);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994103, 20, false, false);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994104, 20, false, false);
                        MapleInventoryManipulator.removeById(c, MapleInventoryType.SETUP, 3994105, 20, false, false);
                    } else {
                        //2430007 - 空罗盘 - 没有任何标志的罗盘。
                        MapleInventoryManipulator.addById(c, 2430007, (short) 1, "Scripted item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date()); // Blank Compass
                    }
                    NPCScriptManager.getInstance().start(c, 2084001);
                    break;
                }
                case 2430008: { // 黄金罗盘
                    chr.saveLocation(SavedLocationType.RICHIE);
                    MapleMap map;
                    boolean warped = false;
                    for (int i = 390001000; i <= 390001004; i++) {
                        map = c.getChannelServer().getMapFactory().getMap(i);
                        if (map.getCharactersSize() == 0) {
                            chr.changeMap(map, map.getPortal(0));
                            warped = true;
                            break;
                        }
                    }
                    if (warped) { // Removal of gold compass
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                    } else { // Or mabe some other message.
                        c.getPlayer().dropMessage(5, "All maps are currently in use, please try again later.");
                    }
                    break;
                }
                case 2430112: //神奇魔方碎片
                    if (c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430112) >= 25) {
                            if (MapleInventoryManipulator.checkSpace(c, 2049400, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 25, true, false)) {
                                MapleInventoryManipulator.addById(c, 2049400, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "消耗栏空间位置不足.");
                            }
                        } else if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430112) >= 10) {
                            if (MapleInventoryManipulator.checkSpace(c, 2049401, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 10, true, false)) {
                                MapleInventoryManipulator.addById(c, 2049401, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "消耗栏空间位置不足.");
                            }
                        } else {
                            ItemScriptManager.getInstance().start(c, info.getNpc(), toUse.getItemId());
                            //c.getPlayer().dropMessage(5, "There needs to be 10 Fragments for a Optential Scroll, 25 for Advanced Optential Scroll.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "消耗栏空间位置不足.");
                    }
                    break;
                case 2430481: //高级神奇魔方碎片
                    if (c.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430481) >= 100) {
                            if (MapleInventoryManipulator.checkSpace(c, 2049701, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 100, true, false)) {
                                MapleInventoryManipulator.addById(c, 2049701, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "消耗栏空间位置不足.");
                            }
                        } else if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430481) >= 30) {
                            if (MapleInventoryManipulator.checkSpace(c, 2049400, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 30, true, false)) {
                                MapleInventoryManipulator.addById(c, 2049400, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "消耗栏空间位置不足.");
                            }
                        } else {
                            ItemScriptManager.getInstance().start(c, info.getNpc(), toUse.getItemId());
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "消耗栏空间位置不足.");
                    }
                    break;
                case 2430760: // 星岩魔方碎片
                    if (c.getPlayer().getInventory(MapleInventoryType.CASH).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430760) >= 10) {
                            if (MapleInventoryManipulator.checkSpace(c, 5750000, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 10, true, false)) {
                                MapleInventoryManipulator.addById(c, 5750000, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "请检测背包空间是否足够.");
                            }
                        } else {
                            c.getPlayer().dropMessage(5, "10个星岩魔方碎片才可以兑换1个星岩魔方.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "请检测背包空间是否足够.");
                    }
                    break;
                case 2430691: // 星岩电钻机碎片
                    if (c.getPlayer().getInventory(MapleInventoryType.CASH).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430691) >= 10) {
                            if (MapleInventoryManipulator.checkSpace(c, 5750001, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 10, true, false)) {
                                MapleInventoryManipulator.addById(c, 5750001, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "请检测背包空间是否足够.");
                            }
                        } else {
                            c.getPlayer().dropMessage(5, "10个星岩电钻机碎片才可以兑换1个星岩电钻机.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "请检测背包空间是否足够.");
                    }
                    break;
                case 2430692: // 星岩箱子
                    if (c.getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.USE).countById(2430692) >= 1) {
                            int rank = Randomizer.nextInt(100) < 30 ? (Randomizer.nextInt(100) < 4 ? 2 : 1) : 0;
                            List<StructItemOption> pots = new LinkedList<>(ii.getAllSocketInfo(rank).values());
                            int newId = 0;
                            while (newId == 0) {
                                StructItemOption pot = pots.get(Randomizer.nextInt(pots.size()));
                                if (pot != null) {
                                    newId = pot.opID;
                                }
                            }
                            if (MapleInventoryManipulator.checkSpace(c, newId, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 1, true, false)) {
                                int grade = ItemConstants.getNebuliteGrade(newId);
                                if (grade == 2) { //[B]级星岩
                                    Item nItem = new Item(newId, (byte) 0, (short) 1, (byte) 0);
                                    WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(c.getPlayer().getName(), " : 从星岩箱子中获得{" + ii.getName(newId) + "}！大家一起恭喜他（她）吧！！！！", nItem, (byte) 1, c.getChannel()));
                                } else if (grade == 3) {
                                    Item nItem = new Item(newId, (byte) 0, (short) 1, (byte) 0);
                                    WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(c.getPlayer().getName(), " : 从星岩箱子中获得{" + ii.getName(newId) + "}！大家一起恭喜他（她）吧！！！！", nItem, (byte) 2, c.getChannel()));
                                } else if (grade == 4) {
                                    Item nItem = new Item(newId, (byte) 0, (short) 1, (byte) 0);
                                    WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(c.getPlayer().getName(), " : 从星岩箱子中获得{" + ii.getName(newId) + "}！大家一起恭喜他（她）吧！！！！", nItem, (byte) 3, c.getChannel()));
                                }
                                MapleInventoryManipulator.addById(c, newId, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                                c.getSession().write(MaplePacketCreator.getShowItemGain(newId, (short) 1, true));
                                chr.getMap().broadcastMessage(InventoryPacket.showNebuliteEffect(chr.getId(), true, "成功交换了星岩。"));
                                c.getSession().write(MaplePacketCreator.craftMessage("你得到了" + ii.getName(newId)));
                            } else {
                                c.getPlayer().dropMessage(5, "请检测背包空间是否足够.");
                            }
                        } else {
                            c.getPlayer().dropMessage(5, "您没有星岩箱子.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "请检测背包空间是否足够.");
                    }
                    break;
                case 5680019: {//starling hair 
                    //if (c.getPlayer().getGender() == 1) {
                    int hair = 32150 + (c.getPlayer().getHair() % 10);
                    c.getPlayer().setHair(hair);
                    c.getPlayer().updateSingleStat(MapleStat.发型, hair);
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, slot, (byte) 1, false);
                    //}
                    break;
                }
                case 5680020: {//starling hair 
                    //if (c.getPlayer().getGender() == 0) {
                    int hair = 32160 + (c.getPlayer().getHair() % 10);
                    c.getPlayer().setHair(hair);
                    c.getPlayer().updateSingleStat(MapleStat.发型, hair);
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, slot, (byte) 1, false);
                    //}
                    break;
                }
                case 3994225:
                    c.getPlayer().dropMessage(5, "Please bring this item to the NPC.");
                    break;
                case 2430212: //疲劳恢复药
                    MapleQuestStatus marr = c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.ENERGY_DRINK));
                    if (marr.getCustomData() == null) {
                        marr.setCustomData("0");
                    }
                    long lastTime = Long.parseLong(marr.getCustomData());
                    if (lastTime + (600000) > System.currentTimeMillis()) {
                        c.getPlayer().dropMessage(5, "疲劳恢复药 10分钟内只能使用1次，请稍后在试。");
                    } else if (c.getPlayer().getFatigue() > 0) {
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                        c.getPlayer().setFatigue(c.getPlayer().getFatigue() - 5);
                    }
                    break;
                case 2430213: //疲劳恢复药
                    marr = c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.ENERGY_DRINK));
                    if (marr.getCustomData() == null) {
                        marr.setCustomData("0");
                    }
                    lastTime = Long.parseLong(marr.getCustomData());
                    if (lastTime + (600000) > System.currentTimeMillis()) {
                        c.getPlayer().dropMessage(5, "疲劳恢复药 10分钟内只能使用1次，请稍后在试。");
                    } else if (c.getPlayer().getFatigue() > 0) {
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                        c.getPlayer().setFatigue(c.getPlayer().getFatigue() - 10);
                    }
                    break;
                case 2430220: //疲劳恢复药
                case 2430214: //疲劳恢复药
                    if (c.getPlayer().getFatigue() > 0) {
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                        c.getPlayer().setFatigue(c.getPlayer().getFatigue() - 30);
                    }
                    break;
                case 2430227: //疲劳恢复药
                    if (c.getPlayer().getFatigue() > 0) {
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                        c.getPlayer().setFatigue(c.getPlayer().getFatigue() - 50);
                    }
                    break;
                case 2430231: //疲劳恢复药
                    marr = c.getPlayer().getQuestNAdd(MapleQuest.getInstance(GameConstants.ENERGY_DRINK));
                    if (marr.getCustomData() == null) {
                        marr.setCustomData("0");
                    }
                    lastTime = Long.parseLong(marr.getCustomData());
                    if (lastTime + (600000) > System.currentTimeMillis()) {
                        c.getPlayer().dropMessage(5, "疲劳恢复药 10分钟内只能使用1次，请稍后在试。");
                    } else if (c.getPlayer().getFatigue() > 0) {
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                        c.getPlayer().setFatigue(c.getPlayer().getFatigue() - 40);
                    }
                    break;
                case 2430144: //秘密能手册
                    int itemid = Randomizer.nextInt(373) + 2290000;
                    if (MapleItemInformationProvider.getInstance().itemExists(itemid) && !MapleItemInformationProvider.getInstance().getName(itemid).contains("Special") && !MapleItemInformationProvider.getInstance().getName(itemid).contains("Event")) {
                        MapleInventoryManipulator.addById(c, itemid, (short) 1, "Reward item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                    }
                    break;
                case 2430370: //秘密配方
                    if (MapleInventoryManipulator.checkSpace(c, 2028062, (short) 1, "")) {
                        MapleInventoryManipulator.addById(c, 2028062, (short) 1, "Reward item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                    }
                    break;
                case 2430158: //狮子王的勋章
                    if (c.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.ETC).countById(4000630) >= 100) {
                            if (MapleInventoryManipulator.checkSpace(c, 4310010, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 1, true, false)) {
                                MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4000630, 100, true, false);
                                MapleInventoryManipulator.addById(c, 4310010, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "其他栏空间位置不足.");
                            }
                        } else if (c.getPlayer().getInventory(MapleInventoryType.ETC).countById(4000630) >= 50) {
                            if (MapleInventoryManipulator.checkSpace(c, 4310009, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 1, true, false)) {
                                MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4000630, 50, true, false);
                                MapleInventoryManipulator.addById(c, 4310009, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "其他栏空间位置不足.");
                            }
                        } else {
                            c.getPlayer().dropMessage(5, "需要50个净化图腾才能兑换出狮子王的贵族勋章，100个净化图腾才能兑换狮子王的皇家勋章。");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "其他栏空间位置不足.");
                    }
                    break;
                case 2430159: //阿尔卡斯特的水晶
                    MapleQuest.getInstance(3182).forceComplete(c.getPlayer(), 2161004);
                    MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                    break;
                case 2430200: //闪电之石
                    if (c.getPlayer().getQuestStatus(31152) != 2) {
                        c.getPlayer().dropMessage(5, "You have no idea how to use it.");
                    } else if (c.getPlayer().getInventory(MapleInventoryType.ETC).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getInventory(MapleInventoryType.ETC).countById(4000660) >= 1 && c.getPlayer().getInventory(MapleInventoryType.ETC).countById(4000661) >= 1 && c.getPlayer().getInventory(MapleInventoryType.ETC).countById(4000662) >= 1 && c.getPlayer().getInventory(MapleInventoryType.ETC).countById(4000663) >= 1) {
                            if (MapleInventoryManipulator.checkSpace(c, 4032923, 1, "") && MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, toUse.getItemId(), 1, true, false) && MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4000660, 1, true, false) && MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4000661, 1, true, false) && MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4000662, 1, true, false) && MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4000663, 1, true, false)) {
                                MapleInventoryManipulator.addById(c, 4032923, (short) 1, "Scripted item: " + toUse.getItemId() + " on " + FileoutputUtil.CurrentReadable_Date());
                            } else {
                                c.getPlayer().dropMessage(5, "其他栏空间位置不足.");
                            }
                        } else {
                            c.getPlayer().dropMessage(5, "There needs to be 1 of each Stone for a Dream Key.");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "其他栏空间位置不足.");
                    }
                    break;
                case 2430130: //反抗者能量胶囊
                case 2430131: //为所有人准备的能量胶囊
                    if (JobConstants.is反抗者(c.getPlayer().getJob())) {
                        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                        c.getPlayer().gainExp(20000 + (c.getPlayer().getLevel() * 50 * c.getChannelServer().getExpRate()), true, true, false);
                    } else {
                        c.getPlayer().dropMessage(5, "您无法使用这个道具。");
                    }
                    break;
                case 2430132: //反抗者武器箱
                case 2430133: //卡珊德拉的补给品箱
                case 2430134: //反抗者秘密箱子
                case 2430142: //卡珊德拉的专属补给品箱
                    if (c.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() >= 1) {
                        if (c.getPlayer().getJob() == 3200 || c.getPlayer().getJob() == 3210 || c.getPlayer().getJob() == 3211 || c.getPlayer().getJob() == 3212) {
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                            MapleInventoryManipulator.addById(c, 1382101, (short) 1, "Scripted item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date());
                        } else if (c.getPlayer().getJob() == 3300 || c.getPlayer().getJob() == 3310 || c.getPlayer().getJob() == 3311 || c.getPlayer().getJob() == 3312) {
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                            MapleInventoryManipulator.addById(c, 1462093, (short) 1, "Scripted item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date());
                        } else if (c.getPlayer().getJob() == 3500 || c.getPlayer().getJob() == 3510 || c.getPlayer().getJob() == 3511 || c.getPlayer().getJob() == 3512) {
                            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                            MapleInventoryManipulator.addById(c, 1492080, (short) 1, "Scripted item: " + itemId + " on " + FileoutputUtil.CurrentReadable_Date());
                        } else {
                            c.getPlayer().dropMessage(5, "您无法使用这个道具。");
                        }
                    } else {
                        c.getPlayer().dropMessage(5, "背包空间不足。");
                    }
                    break;
                case 2430455: //传说时空石
                    ItemScriptManager.getInstance().start(c, 9010000, 2430455);
                    break;
                case 2430036: //黑鳄鱼1天使用券
                    mountid = 1027;
                    expiration_days = 1;
                    break;
                case 2430170: //croco 7 day
                    mountid = 1027;
                    expiration_days = 7;
                    break;
                case 2430037: //男男机车1天使用券
                    mountid = 1028;
                    expiration_days = 1;
                    break;
                case 2430038: //女女机车1天使用券
                    mountid = 1029;
                    expiration_days = 1;
                    break;
                case 2430039: //筋斗云1天使用券
                    mountid = 1030;
                    expiration_days = 1;
                    break;
                case 2430040: //蝙蝠怪1天使用券
                    mountid = 1031;
                    expiration_days = 1;
                    break;
                case 2430223: //balrog 1 day
                    mountid = 1031;
                    expiration_days = 15;
                    break;
                case 2430259: //蝙蝠魔骑宠卷
                    mountid = 1031;
                    expiration_days = 3;
                    break;
                case 2430242: //摩托车使用券
                    mountid = 80001018;
                    expiration_days = 10;
                    break;
                case 2430243: //超能套装使用券
                    mountid = 80001019;
                    expiration_days = 10;
                    break;
                case 2430261: //超能套装骑宠卷
                    mountid = 80001019;
                    expiration_days = 3;
                    break;
                case 2430249: //木飞机3天使用券
                    mountid = 80001027;
                    expiration_days = 3;
                    break;
                case 2430225: //蝙蝠怪骑宠使用券
                    mountid = 1031;
                    expiration_days = 10;
                    break;
                case 2430053: //鳄鱼30天使用券
                    mountid = 1027;
                    expiration_days = 1;
                    break;
                case 2430054: //男男机车30天使用券
                    mountid = 1028;
                    expiration_days = 30;
                    break;
                case 2430055: //女女机车30天使用券
                    mountid = 1029;
                    expiration_days = 30;
                    break;
                case 2430257: //女女机车7天使用券
                    mountid = 1029;
                    expiration_days = 7;
                    break;
                case 2430056: //蝙蝠魔先生30天使用券
                    mountid = 1035;
                    expiration_days = 30;
                    break;
                case 2430057: //赛车30天使用券
                    mountid = 1033;
                    expiration_days = 30;
                    break;
                case 2430072: //老虎传说7天使用券
                    mountid = 1034;
                    expiration_days = 7;
                    break;
                case 2430073: //狮子王 (有效期15天) 
                    mountid = 1036;
                    expiration_days = 15;
                    break;
                case 2430074: //独角兽骑宠券（7天）
                    mountid = 1037;
                    expiration_days = 15;
                    break;
                case 2430272: //跑车骑宠卷 - 跑车3天使用券
                    mountid = 1038;
                    expiration_days = 3;
                    break;
                case 2430275: //休彼德蔓的热气球7天使用券
                    mountid = 80001033;
                    expiration_days = 7;
                    break;
                case 2430075: //low rider 15 day
                    mountid = 1038;
                    expiration_days = 15;
                    break;
                case 2430076: //田园红卡车 (有效期15天)
                    mountid = 1039;
                    expiration_days = 15;
                    break;
                case 2430077: //恶魔石像 (有效期15天)
                    mountid = 1040;
                    expiration_days = 15;
                    break;
                case 2430080: //圣兽提拉奥斯20天使用券
                    mountid = 1042;
                    expiration_days = 20;
                    break;
                case 2430082: //花蘑菇7天使用券
                    mountid = 1044;
                    expiration_days = 7;
                    break;
                case 2430260: //花蘑菇骑宠卷 - 花蘑菇3天使用券
                    mountid = 1044;
                    expiration_days = 3;
                    break;
                case 2430091: //梦魇使用券 - 双击后可以在10天内使用骑乘技能[梦魇]
                    mountid = 1049;
                    expiration_days = 10;
                    break;
                case 2430092: //白雪人骑宠使用券 - 双击后可以在7天内使用骑乘技能[白雪人骑宠]
                    mountid = 1050;
                    expiration_days = 10;
                    break;
                case 2430263: //白雪人骑宠卷 - 白雪人骑宠3天使用券
                    mountid = 1050;
                    expiration_days = 3;
                    break;
                case 2430093: //鸵鸟骑宠使用券 - 双击后可以在10天内使用骑乘技能[鸵鸟骑宠]
                    mountid = 1051;
                    expiration_days = 10;
                    break;
                case 2430101: //粉红熊热气球使用券 - 双击后可以在10天内使用骑乘技能[粉红熊热气球]
                    mountid = 1052;
                    expiration_days = 10;
                    break;
                case 2430102: //变形金刚使用券 - 双击后可以在10天内使用骑乘技能[变形金刚]
                    mountid = 1053;
                    expiration_days = 10;
                    break;
                case 2430103: //chicken 30 day
                    mountid = 1054;
                    expiration_days = 30;
                    break;
                case 2430266: //走路鸡骑宠卷 - 走路鸡骑宠3天使用券
                    mountid = 1054;
                    expiration_days = 3;
                    break;
                case 2430265: //骑士团战车骑宠卷 - 骑士团战车骑宠3天使用券
                    mountid = 1151;
                    expiration_days = 3;
                    break;
                case 2430258: //警车1年使用券
                    mountid = 1115;
                    expiration_days = 365;
                    break;
                case 2430117: //狮子王(有效期1年) 
                    mountid = 1036;
                    expiration_days = 365;
                    break;
                case 2430118: //田园红卡车  (有效期1年)
                    mountid = 1039;
                    expiration_days = 365;
                    break;
                case 2430119: //恶魔石像  (有效期1年)
                    mountid = 1040;
                    expiration_days = 365;
                    break;
                case 2430120: //unicorn 1 year
                    mountid = 1037;
                    expiration_days = 365;
                    break;
                case 2430271: //猫头鹰骑宠卷 - 猫头鹰骑宠3天使用券
                    mountid = 1069;
                    expiration_days = 3;
                    break;
                case 2430136: //猫头鹰骑宠15天权
                    mountid = 1069;
                    expiration_days = 15;
                    break;
                case 2430137: //猫头鹰骑宠30天权
                    mountid = 1069;
                    expiration_days = 30;
                    break;
                case 2430138: //猫头鹰骑宠1年权
                    mountid = 1069;
                    expiration_days = 365;
                    break;
                case 2430145: //mothership
                    mountid = 1070;
                    expiration_days = 30;
                    break;
                case 2430146: //mothership
                    mountid = 1070;
                    expiration_days = 365;
                    break;
                case 2430147: //mothership
                    mountid = 1071;
                    expiration_days = 30;
                    break;
                case 2430148: //mothership
                    mountid = 1071;
                    expiration_days = 365;
                    break;
                case 2430135: //os4
                    mountid = 1065;
                    expiration_days = 15;
                    break;
                case 2430149: //雄狮骑宠30日使用权
                    mountid = 1072;
                    expiration_days = 30;
                    break;
                case 2430262: //雄狮骑宠卷 - 雄狮骑宠3天使用券
                    mountid = 1072;
                    expiration_days = 3;
                    break;
                case 2430179: //魔女的扫把15日使用权
                    mountid = 1081;
                    expiration_days = 15;
                    break;
                case 2430264: //魔女的扫把骑宠卷 - 魔女的扫把3天使用券
                    mountid = 1081;
                    expiration_days = 3;
                    break;
                case 2430201: //兔子骑宠3日券
                    mountid = 1096;
                    expiration_days = 3;
                    break;
                case 2430228: //兔兔加油骑宠（15天权）
                    mountid = 1101;
                    expiration_days = 15;
                    break;
                case 2430276: //tiny bunny 60 day
                    mountid = 1101;
                    expiration_days = 15;
                    break;
                case 2430277: //tiny bunny 60 day
                    mountid = 1101;
                    expiration_days = 365;
                    break;
                case 2430283: //突击！木马10天使用券
                    mountid = 1025;
                    expiration_days = 10;
                    break;
                case 2430291: //热气球交换券
                    mountid = 1145;
                    expiration_days = -1;
                    break;
                case 2430293: //飞船交换券
                    mountid = 1146;
                    expiration_days = -1;
                    break;
                case 2430295: //天马交换券
                    mountid = 1147;
                    expiration_days = -1;
                    break;
                case 2430297: //暗光龙交换券
                    mountid = 1148;
                    expiration_days = -1;
                    break;
                case 2430299: //魔法扫帚交换券
                    mountid = 1149;
                    expiration_days = -1;
                    break;
                case 2430301: //筋斗云交换券
                    mountid = 1150;
                    expiration_days = -1;
                    break;
                case 2430303: //骑士团战车交换券
                    mountid = 1151;
                    expiration_days = -1;
                    break;
                case 2430305: //梦魇交换券
                    mountid = 1152;
                    expiration_days = -1;
                    break;
                case 2430307: //蝙蝠怪交换券
                    mountid = 1153;
                    expiration_days = -1;
                    break;
                case 2430309: //透明蝙蝠怪交换券
                    mountid = 1154;
                    expiration_days = -1;
                    break;
                case 2430311: //猫头鹰交换券
                    mountid = 1156;
                    expiration_days = -1;
                    break;
                case 2430313: //直升机交换券
                    mountid = 1156;
                    expiration_days = -1;
                    break;
                case 2430315: //妮娜的魔法阵交换券
                    mountid = 1118;
                    expiration_days = -1;
                    break;
                case 2430317: //青蛙交换券
                    mountid = 1121;
                    expiration_days = -1;
                    break;
                case 2430319: //小龟龟交换券
                    mountid = 1122;
                    expiration_days = -1;
                    break;
                case 2430321: //无辜水牛交换券
                    mountid = 1123;
                    expiration_days = -1;
                    break;
                case 2430323: //玩具坦克交换券
                    mountid = 1124;
                    expiration_days = -1;
                    break;
                case 2430325: //维京战车交换券
                    mountid = 1129;
                    expiration_days = -1;
                    break;
                case 2430327: //打豆豆机器人交换券
                    mountid = 1130;
                    expiration_days = -1;
                    break;
                case 2430329: //暴风摩托交换券
                    mountid = 1063;
                    expiration_days = -1;
                    break;
                case 2430331: //玩具木马交换券
                    mountid = 1025;
                    expiration_days = -1;
                    break;
                case 2430333: //老虎只是传说交换券
                    mountid = 1034;
                    expiration_days = -1;
                    break;
                case 2430335: //莱格斯的豺犬交换券
                    mountid = 1136;
                    expiration_days = -1;
                    break;
                case 2430337: //鸵鸟交换券
                    mountid = 1051;
                    expiration_days = -1;
                    break;
                case 2430339: //跑车交换券
                    mountid = 1138;
                    expiration_days = -1;
                    break;
                case 2430341: //拿破仑的白马交换券
                    mountid = 1139;
                    expiration_days = -1;
                    break;
                case 2430343: //鳄鱼王交换券
                    mountid = 1027;
                    expiration_days = -1;
                    break;
                case 2430346: //女女机车交换券
                    mountid = 1029;
                    expiration_days = -1;
                    break;
                case 2430348: //男男机车交换券
                    mountid = 1028;
                    expiration_days = -1;
                    break;
                case 2430350: //赛车交换券
                    mountid = 1033;
                    expiration_days = -1;
                    break;
                case 2430352: //机械套装交换券
                    mountid = 1064;
                    expiration_days = -1;
                    break;
                case 2430354: //巨无霸兔子交换券
                    mountid = 1096;
                    expiration_days = -1;
                    break;
                case 2430356: //兔兔加油交换券
                    mountid = 1101;
                    expiration_days = -1;
                    break;
                case 2430358: //兔子车夫交换券
                    mountid = 1102;
                    expiration_days = -1;
                    break;
                case 2430360: //走路鸡交换券
                    mountid = 1054;
                    expiration_days = -1;
                    break;
                case 2430362: //钢铁变形侠交换券
                    mountid = 1053;
                    expiration_days = -1;
                    break;
                case 2430292: //热气球90天交换券
                    mountid = 1145;
                    expiration_days = 90;
                    break;
                case 2430294: //飞船90天交换券
                    mountid = 1146;
                    expiration_days = 90;
                    break;
                case 2430296: //天马90天交换券
                    mountid = 1147;
                    expiration_days = 90;
                    break;
                case 2430298: //暗光龙90天交换券
                    mountid = 1148;
                    expiration_days = 90;
                    break;
                case 2430300: //魔法扫帚90天交换券
                    mountid = 1149;
                    expiration_days = 90;
                    break;
                case 2430302: //筋斗云90天交换券
                    mountid = 1150;
                    expiration_days = 90;
                    break;
                case 2430304: //骑士团战车90天交换券
                    mountid = 1151;
                    expiration_days = 90;
                    break;
                case 2430306: //梦魇90天交换券
                    mountid = 1152;
                    expiration_days = 90;
                    break;
                case 2430308: //蝙蝠怪90天交换券
                    mountid = 1153;
                    expiration_days = 90;
                    break;
                case 2430310: //透明蝙蝠怪90天交换券
                    mountid = 1154;
                    expiration_days = 90;
                    break;
                case 2430312: //猫头鹰90天交换券
                    mountid = 1156;
                    expiration_days = 90;
                    break;
                case 2430314: //直升机90天交换券
                    mountid = 1156;
                    expiration_days = 90;
                    break;
                case 2430316: //妮娜的魔法90天交换券
                    mountid = 1118;
                    expiration_days = 90;
                    break;
                case 2430318: //青蛙90天交换券
                    mountid = 1121;
                    expiration_days = 90;
                    break;
                case 2430320: //小龟龟90天交换券
                    mountid = 1122;
                    expiration_days = 90;
                    break;
                case 2430322: //无辜水牛90天交换券
                    mountid = 1123;
                    expiration_days = 90;
                    break;
                case 2430326: //维京战车90天交换券
                    mountid = 1129;
                    expiration_days = 90;
                    break;
                case 2430328: //打豆豆机器人90天交换券
                    mountid = 1130;
                    expiration_days = 90;
                    break;
                case 2430330: //暴风摩托90天交换券
                    mountid = 1063;
                    expiration_days = 90;
                    break;
                case 2430332: //玩具木马90天交换券
                    mountid = 1025;
                    expiration_days = 90;
                    break;
                case 2430334: //老虎只是传说90天交换券
                    mountid = 1034;
                    expiration_days = 90;
                    break;
                case 2430336: //莱格斯的豺犬90天交换券
                    mountid = 1136;
                    expiration_days = 90;
                    break;
                case 2430338: //鸵鸟90天交换券
                    mountid = 1051;
                    expiration_days = 90;
                    break;
                case 2430340: //跑车90天交换券
                    mountid = 1138;
                    expiration_days = 90;
                    break;
                case 2430342: //拿破仑的白马90天交换券
                    mountid = 1139;
                    expiration_days = 90;
                    break;
                case 2430344: //鳄鱼王90天交换券
                    mountid = 1027;
                    expiration_days = 90;
                    break;
                case 2430347: //女女机车90天交换券
                    mountid = 1029;
                    expiration_days = 90;
                    break;
                case 2430349: //男男机车90天交换券
                    mountid = 1028;
                    expiration_days = 90;
                    break;
                case 2430351: //赛车90天交换券
                    mountid = 1033;
                    expiration_days = 90;
                    break;
                case 2430353: //机械套装90天交换券
                    mountid = 1064;
                    expiration_days = 90;
                    break;
                case 2430355: //巨无霸兔子90天交换券
                    mountid = 1096;
                    expiration_days = 90;
                    break;
                case 2430357: //兔兔加油90天交换券
                    mountid = 1101;
                    expiration_days = 90;
                    break;
                case 2430359: //兔子车夫90天交换券 
                    mountid = 1102;
                    expiration_days = 90;
                    break;
                case 2430361: //走路鸡90天交换券
                    mountid = 1054;
                    expiration_days = 90;
                    break;
                case 2430363: //钢铁变形侠90天交换券
                    mountid = 1053;
                    expiration_days = 90;
                    break;
                case 2430324: //机动巡逻车(准乘4人)交换券
                    mountid = 1158;
                    expiration_days = -1;
                    break;
                case 2430345: //机动巡逻车(准乘4人)90天交换券
                    mountid = 1158;
                    expiration_days = 90;
                    break;
                case 2430367: //警车3天使用券
                    mountid = 1115;
                    expiration_days = 3;
                    break;
                case 2430365: //pony
                    mountid = 1025;
                    expiration_days = 365;
                    break;
                case 2430366: //pony
                    mountid = 1025;
                    expiration_days = 15;
                    break;
                case 2430369: //梦魇骑宠10天使用券
                    mountid = 1049;
                    expiration_days = 10;
                    break;
                case 2430392: //冒险骑士团高速电车90天使用券
                    mountid = 80001038;
                    expiration_days = 90;
                    break;
                case 2430476: //red truck? but name is pegasus?
                    mountid = 1039;
                    expiration_days = 15;
                    break;
                case 2430477: //red truck? but name is pegasus?
                    mountid = 1039;
                    expiration_days = 365;
                    break;
                case 2430232: //福袋10天使用券
                    mountid = 1106;
                    expiration_days = 10;
                    break;
                case 2430511: //spiegel
                    mountid = 80001033;
                    expiration_days = 15;
                    break;
                case 2430512: //rspiegel
                    mountid = 80001033;
                    expiration_days = 365;
                    break;
                case 2430536: //GO兔冒险永久权交换券
                    mountid = 80001114;
                    expiration_days = -1;
                    break;
                case 2430537: //GO兔冒险90天权交换券
                    mountid = 80001114;
                    expiration_days = 90;
                    break;
                case 2430229: //bunny rickshaw 60 day
                    mountid = 1102;
                    expiration_days = 60;
                    break;
                case 2430199: //圣诞雪橇12小时使用券
                    mountid = 1089;
                    expiration_days = 1;
                    break;
                case 2432311: //圣诞雪橇骑宠永久使用券
                    mountid = 1089;
                    expiration_days = -1;
                    break;
                case 2430211: //赛车30天使用券
                    mountid = 80001009;
                    expiration_days = 30;
                    break;
                case 2430521: //小兔子骑宠30天使用券
                    mountid = 80001326;
                    expiration_days = 30;
                    break;
                case 2432497: //赤兔马骑宠永久使用券
                    mountid = 80011029;
                    expiration_days = -1;
                    break;
                case 2430707: //好朋友坐骑7天使用券
                    mountid = 80001348;
                    expiration_days = -1;
                    break;
                case 2430464: //国庆纪念版热气球永久权
                    mountid = 80001120;
                    expiration_days = -1;
                    break;
                case 2432735: //熊猫骑宠永久券
                    mountid = 80001112;
                    expiration_days = -1;
                    break;
                case 2432733: //雄鹰！骑宠永久券
                    mountid = 80001552;
                    expiration_days = -1;
                    break;
                case 2432487: //LV骑宠永久券 -os
                    mountid = 80001531;
                    expiration_days = -1;
                    break;
                case 2432496: //舞狮骑宠永久使用权 -os
                    mountid = 80011028;
                    expiration_days = -1;
                    break;
                case 2432518: //幽灵马车骑宠永久使用券 -os
                    mountid = 80011030;
                    expiration_days = -1;
                    break;
                case 2430534: //企鹅永久权使用券
                    mountid = 80001113;
                    expiration_days = -1;
                    break;
//                case 2430620: //红火恐龙90天使用券
//                    mountid = 80001127;
//                    expiration_days = 30;
//                    break;
                case 2430992: //藏獒骑宠7天使用券
                    mountid = 80001181;
                    expiration_days = 7;
                    break;
                case 2430993: //藏獒骑宠30天使用券
                    mountid = 80001181;
                    expiration_days = 30;
                    break;
                case 2430994: //藏獒骑宠90天使用券
                    mountid = 80001181;
                    expiration_days = 90;
                    break;
//                case 2430794: //宇宙船骑宠 -os
//                    mountid = 80001163;
//                    expiration_days = 7;
//                    break;
//                case 2430726: //双跳银狼战车骑宠30天使用券
//                    mountid = 80001144;
//                    expiration_days = 30;
//                    break;
//                case 2430727: //双跳红卡车骑宠30天使用券
//                    mountid = 80001148;
//                    expiration_days = 30;
//                    break;
//                case 2430728: //双跳强力机甲骑宠30天使用券
//                    mountid = 80001149;
//                    expiration_days = 30;
//                    break;
//                case 2431364: //双变形金刚骑宠30天使用券
//                    mountid = 80001183;
//                    expiration_days = 30;
//                    break;
//                case 2430934: //双神兽骑宠永久使用券
//                    mountid = 80001185;
//                    expiration_days = -1;
//                    break;
//                case 2430936: //双熊热气球骑宠永久使用券
//                    mountid = 80001187;
//                    expiration_days = -1;
//                    break;
//                case 2430933: //双梦魇骑宠永久使用券
//                    mountid = 80001184;
//                    expiration_days = -1;
//                    break;
//                case 2430935: //双猫头鹰骑宠永久使用券
//                    mountid = 80001186;
//                    expiration_days = -1;
//                    break;
//                case 2431369: //双兔车骑宠30天使用券
//                    mountid = 80001173;
//                    expiration_days = 30;
//                    break;
//                case 2431370: //双花蘑菇骑宠30天使用券
//                    mountid = 80001174;
//                    expiration_days = 30;
//                    break;
//                case 2431371: //双超级兔子骑宠30天使用券
//                    mountid = 80001175;
//                    expiration_days = 30;
//                    break;
//                case 2430937: //双马克西姆斯骑宠永久使用券
//                    mountid = 80001193;
//                    expiration_days = -1;
//                    break;
                case 2430938: //红色皮卡永久使用券 -os
                    mountid = 80001194;
                    expiration_days = -1;
                    break;
                case 2430939: //双强力滑车骑宠永久使用券
                    mountid = 80001195;
                    expiration_days = -1;
                    break;
                case 2430968: //双粉红飞马永久使用券
                    mountid = 80001196;
                    expiration_days = -1;
                    break;
                case 2431137: //幻龙骑宠永久使用券
                    mountid = 80001198;
                    expiration_days = -1;
                    break;
                case 2431073: //二连跳青蛙永久使用券
                    mountid = 80001199;
                    expiration_days = -1;
                    break;
                case 2431135: //与你相伴幻影骑宠永久使用券
                    mountid = 80001220;
                    expiration_days = -1;
                    break;
                case 2431136: //与你相伴阿莉亚骑宠永久使用券
                    mountid = 80001221;
                    expiration_days = -1;
                    break;
                case 2431268: //玛瑙美洲豹永久使用券
                    mountid = 80001228;
                    expiration_days = -1;
                    break;
                case 2431353: //黑飞龙骑宠永久使用券
                    mountid = 80001237;
                    expiration_days = -1;
                    break;
                case 2431362: //礼物雪球永久使用券
                    mountid = 80001240;
                    expiration_days = -1;
                    break;
//                case 2431415: //蝴蝶秋千骑宠永久使用券
//                    mountid = 80001241;
//                    expiration_days = -1;
//                    break;
                case 2431423: //天空自行车骑宠永久使用券
                    mountid = 80001243;
                    expiration_days = -1;
                    break;
                case 2431424: //雪花骑宠永久使用券
                    mountid = 80011175;
                    expiration_days = -1;
                    break;
                case 2431425: //乌云骑宠永久使用券
                    mountid = 80001245;
                    expiration_days = -1;
                    break;
                case 2431426: //月亮骑宠永久使用券
                    mountid = 80001645;
                    expiration_days = -1;
                    break;
                case 2431473: //和品克缤一起旅行骑宠永久使用券
                    mountid = 80001257;
                    expiration_days = -1;
                    break;
                case 2431474: //和布莱克缤一起旅行骑宠永久使用券
                    mountid = 80001258;
                    expiration_days = -1;
                    break;
                case 2434377: //不想长大！骑宠永久使用券
                    mountid = 80001792;
                    expiration_days = -1;
                    break;
                case 2434379: //骑士团花轿骑宠永久使用券
                    mountid = 80001790;
                    expiration_days = -1;
                    break;
                case 2434277: //极光鹿骑宠永久使用券
                    mountid = 80001786;
                    expiration_days = -1;
                    break;
//                case 2432820: //可爱猫咪人力车骑宠永久使用券
//                    mountid = 80011093;
//                    expiration_days = -1;
//                    break;
//                case 2432821: //摩托艇骑宠永久使用券
//                    mountid = 80011094;
//                    expiration_days = -1;
//                    break;
                case 2432172: //兔兔赏月骑宠永久使用券
                    mountid = 80001410;
                    expiration_days = -1;
                    break;
                case 2432992: //蜜蝴蝶骑宠永久使用券
                    mountid = 80011109;
                    expiration_days = -1;
                    break;
                case 2433069: //迷你太空船永久使用券
                    mountid = 80011110;
                    expiration_days = -1;
                    break;
                case 2432806: //官轿骑宠永久券
                    mountid = 80001557;
                    expiration_days = -1;
                    break;
                case 2432994: //希望敞篷车骑宠
                    mountid = 80001561;
                    expiration_days = -1;
                    break;
                case 2432995: //后起跑车骑宠
                    mountid = 80001562;
                    expiration_days = -1;
                    break;
                case 2432996: //梦幻跑车骑宠
                    mountid = 80001563;
                    expiration_days = -1;
                    break;
                case 2432997: //新手滑板骑宠
                    mountid = 80001564;
                    expiration_days = -1;
                    break;
                case 2432998: //初级滑板骑宠
                    mountid = 80001565;
                    expiration_days = -1;
                    break;
                case 2432999: //普通滑板骑宠
                    mountid = 80001566;
                    expiration_days = -1;
                    break;
                case 2433000: //高级滑板骑宠
                    mountid = 80001567;
                    expiration_days = -1;
                    break;
                case 2433001: //精英滑板骑宠
                    mountid = 80001568;
                    expiration_days = -1;
                    break;
                case 2433002: //传说滑板骑宠
                    mountid = 80001569;
                    expiration_days = -1;
                    break;
                case 2433003: //闪耀气球骑宠
                    mountid = 80001570;
                    expiration_days = -1;
                    break;
                case 2433051: //猫咪手推车骑宠永久劵
                    mountid = 80001582;
                    expiration_days = -1;
                    break;
                case 2433053: //喷气式滑艇骑宠永久劵
                    mountid = 80001584;
                    expiration_days = -1;
                    break;
                case 2431898: //弹跳车骑宠永久券
                    mountid = 80001324;
                    expiration_days = -1;
                    break;
                case 2431914: //小兔子骑宠30天使用券
                    mountid = 80001326;
                    expiration_days = 30;
                    break;
                case 2431915: //鸟叔邮递员永久使用券
                    mountid = 80001327;
                    expiration_days = -1;
                    break;
                case 2432003: //战斗飞艇骑宠使用券
                    mountid = 80001331;
                    expiration_days = 10;
                    break;
                case 2432007: //海加顿之拳骑宠使用券
                    mountid = 80001345;
                    expiration_days = 10;
                    break;
                case 2432029: //老式战船骑宠90天券
                    mountid = 80001346;
                    expiration_days = 90;
                    break;
                case 2432030: //石像鬼骑宠永久券
                    mountid = 80001347;
                    expiration_days = -1;
                    break;
                case 2432031: //好友骑宠永久券
                    mountid = 80001348;
                    expiration_days = -1;
                    break;
                case 2432078: //地狱犬骑宠永久券
                    mountid = 80001353;
                    expiration_days = -1;
                    break;
                case 2432085: //海豚骑宠永久券
                    mountid = 80001355;
                    expiration_days = -1;
                    break;
                case 2431883: //沙云骑宠永久使用券
                    mountid = 80001330;
                    expiration_days = -1;
                    break;
                case 2431765: //摇摇木马骑宠券
                    mountid = 80001290;
                    expiration_days = -1;
                    break;
                case 2432015: //赤红沙云骑宠永久使用券
                    mountid = 80001333;
                    expiration_days = -1;
                    break;
                case 2432099: //巨大公鸡骑宠30天券
                    mountid = 80001336;
                    expiration_days = 30;
                    break;
                case 2431950: //巨大公鸡骑宠90天券
                    mountid = 80001337;
                    expiration_days = 90;
                    break;
                case 2432149: //稻香四溢骑宠永久使用券
                    mountid = 80001398;
                    expiration_days = -1;
                    break;
                case 2432151: //飞行床骑宠永久券
                    mountid = 80001400;
                    expiration_days = -1;
                    break;
                case 2432309: //吉尼骑宠永久使用券
                    mountid = 80001404;
                    expiration_days = -1;
                    break;
                case 2432328: //Naver帽子骑宠30天使用券
                    mountid = 80001435;
                    expiration_days = 30;
                    break;
                case 2432216: //僵尸卡车永久券
                    mountid = 80001411;
                    expiration_days = -1;
                    break;
                case 2432218: //妮娜的魔法阵骑宠永久券
                    mountid = 80001413;
                    expiration_days = -1;
                    break;
                case 2432291: //滑板永久使用券
                    mountid = 80001419;
                    expiration_days = -1;
                    break;
                case 2432293: //南瓜马车永久使用券
                    mountid = 80001421;
                    expiration_days = -1;
                    break;
                case 2432295: //贝伦骑宠永久使用券
                    mountid = 80001423;
                    expiration_days = -1;
                    break;
                case 2432347: //南哈特和雪原永久骑宠交换券
                    mountid = 80001440;
                    expiration_days = -1;
                    break;
                case 2432348: //希纳斯和雪原永久骑宠交换券
                    mountid = 80001441;
                    expiration_days = -1;
                    break;
                case 2432349: //奥尔卡和雪原永久骑宠交换券
                    mountid = 80001442;
                    expiration_days = -1;
                    break;
                case 2432350: //白魔法师和雪原骑宠1天交换券
                    mountid = 80001443;
                    expiration_days = -1;
                    break;
                case 2432351: //希拉和雪原永久骑宠交换券
                    mountid = 80001444;
                    expiration_days = -1;
                    break;
                case 2432431: //龙骑士骑宠永久使用券
                    mountid = 80001480;
                    expiration_days = -1;
                    break;
                case 2432433: //魔法扫帚骑宠永久使用券
                    mountid = 80001482;
                    expiration_days = -1;
                    break;
                case 2432449: //飞鞋骑宠永久使用券
                    mountid = 80001484;
                    expiration_days = -1;
                    break;
                case 2432582: //迟到了！骑宠永久使用券
                    mountid = 80001505;
                    expiration_days = -1;
                    break;
                case 2432498: //蓝焰梦魇骑宠永久使用券
                    mountid = 80001508;
                    expiration_days = -1;
                    break;
                case 2432500: //新年快乐骑宠永久使用券
                    mountid = 80001510;
                    expiration_days = -1;
                    break;
                case 2432645: //毛驴骑宠永久券
                    mountid = 80001531;
                    expiration_days = -1;
                    break;
                case 2432653: //舞动的向日葵骑宠
                    mountid = 80001533;
                    expiration_days = -1;
                    break;
//                case 2432654: //花瓣螺旋桨骑宠90天券
//                    mountid = 80001534;
//                    expiration_days = 90;
//                    break;
                case 2434127: //菇菇有点肿骑宠永久券
                    mountid = 80001549;
                    expiration_days = -1;
                    break;
                case 2433499: //奥尔卡之搀扶永久券
                    mountid = 80001671;
                    expiration_days = -1;
                    break;
                case 2433501: //赫丽娜之搀扶永久券
                    mountid = 80001673;
                    expiration_days = -1;
                    break;
                case 2433735: //飞翔青羊骑宠永久券
                    mountid = 80001707;
                    expiration_days = -1;
                    break;
                case 2433736: //飞翔粉羊骑宠永久券
                    mountid = 80001708;
                    expiration_days = -1;
                    break;
                case 2433809: //拉拉喵骑宠永久券
                    mountid = 80001711;
                    expiration_days = -1;
                    break;
                case 2433811: //草莓蛋糕骑宠永久券
                    mountid = 80001713;
                    expiration_days = -1;
                    break;
                case 2433292: //蛋糕骑宠永久使用券
                    mountid = 80011139;
                    expiration_days = -1;
                    break;
                case 2433293: //驯鹿雪橇骑宠永久使用券
                    mountid = 80011140;
                    expiration_days = -1;
                    break;
                case 2433497: //美羊羊骑宠永久交换券
                    mountid = 80011147;
                    expiration_days = -1;
                    break;
                case 2433511: //喜羊羊骑宠永久交换券
                    mountid = 80011148;
                    expiration_days = -1;
                    break;
                case 2434084: //黑色天使骑宠永久交换券
                    mountid = 80001701;
                    expiration_days = -1;
                    break;
                case 2434142: //盖奥勒克骑宠使用券
                    mountid = 80011205;
                    expiration_days = -1;
                    break;
                case 2434143: //粉碎机骑宠使用券
                    mountid = 80011206;
                    expiration_days = -1;
                    break;
                case 2434235: //变身云朵骑宠
                    mountid = 80011236;
                    expiration_days = -1;
                    break;
                case 2434236: //呆萌鲸鱼骑宠
                    mountid = 80011237;
                    expiration_days = -1;
                    break;
                case 2434037: //迷你黑色天堂骑宠券
                    mountid = 80011157;
                    expiration_days = -1;
                    break;
                case 2433836: //拯救骑宠
                    mountid = 80011179;
                    expiration_days = -1;
                    break;
                case 2433058: //永久性喷气式滑艇载具优惠券
                    mountid = 80011180;
                    expiration_days = -1;
                    break;
                case 2433059: //永久性潜水艇载具优惠券
                    mountid = 80011181;
                    expiration_days = -1;
                    break;
                case 2433060: //永久性直升机载具优惠券
                    mountid = 80011182;
                    expiration_days = -1;
                    break;
                case 2433168: //永久性热气球载具优惠券
                    mountid = 80011183;
                    expiration_days = -1;
                    break;
                case 2433169: //永久性独木舟载具优惠券
                    mountid = 80011184;
                    expiration_days = -1;
                    break;
                case 2433170: //永久性迷你直升机载具优惠券
                    mountid = 80011185;
                    expiration_days = -1;
                    break;
                case 2433198: //永久性猫咪海盗船载具优惠券
                    mountid = 80011186;
                    expiration_days = -1;
                    break;
                case 2433881: //橄榄球兔骑宠
                    mountid = 80011190;
                    expiration_days = -1;
                    break;
                case 2433876: //王权马车骑宠使用券
                    mountid = 80011189;
                    expiration_days = -1;
                    break;
                case 2434082: //金鱼出租车骑宠永久交换券
                    mountid = 80011199;
                    expiration_days = -1;
                    break;
                case 2434083: //金龙鱼骑宠永久使用券
                    mountid = 80011200;
                    expiration_days = -1;
                    break;

                // 伤害皮肤
                case 2431965: //默认伤害皮肤
                    damageSkin = 0;
                    break;
                case 2431966: //数码式伤害皮肤
                case 2432084:
                case 2433104:
                    damageSkin = 1;
                    break;
                case 2431967: //克里蒂亚斯伤害皮肤
                case 2434130:
                    damageSkin = 2;
                    break;
                case 2432131: //组队任务伤害皮肤
                    damageSkin = 3;
                    break;
                case 2432153: //冲击式伤害皮肤
                case 2432603:
                case 2432638:
                case 2432659:
                    damageSkin = 4;
                    break;
                case 2432154: //甜美传统韩果伤害皮肤
                case 2432637:
                case 2432658:
                case 2433106:
                    damageSkin = 5;
                    break;
                case 2432207: //射手村俱乐部伤害皮肤
                    damageSkin = 6;
                    break;
                case 2432354: //圣诞快乐伤害皮肤
                    damageSkin = 7;
                    break;
                case 2432355: //雪花伤害皮肤
                case 2432972:
                case 2433710:
                    damageSkin = 8;
                    break;
                case 2432465: //阿丽莎的伤害皮肤
                case 2433199:
                    damageSkin = 9;
                    break;
                case 2432479: //桃乐丝的伤害皮肤
                    damageSkin = 10;
                    break;
                case 2432526: //键盘战士伤害皮肤
                case 2432639:
                case 2432660:
                case 2433105:
                    damageSkin = 11;
                    break;
                case 2432532: //轻柔春风伤害皮肤
                case 2433107:
                    damageSkin = 12;
                    break;
                case 2432592: //单身部队伤害皮肤
                case 2433132:
                    damageSkin = 13;
                    break;
                case 2432640: //回忆伤害皮肤
                case 2432661:
                case 2434129:
                    damageSkin = 14;
                    break;
                case 2432710: //花蘑菇伤害皮肤
                case 2434040:
                    damageSkin = 15;
                    break;
                case 2432836: //王冠伤害皮肤
                    damageSkin = 16;
                    break;
                case 2432973: //灰白伤害皮肤
                    damageSkin = 17;
                    break;
                case 2433063: //Star Planet伤害皮肤
                    damageSkin = 18;
                    break;
                case 2433178: //毛骨悚然伤害皮肤
                    damageSkin = 20;
                    break;
                case 2433456: //韩文日伤害皮肤
                    damageSkin = 21;
                    break;
                case 2433715: //七彩伤害皮肤
                    damageSkin = 23;
                    break;
                case 2432591: //樱吹雪伤害皮肤
                    damageSkin = 1000;
                    break;
                case 2432695: //金灿灿伤害皮肤
                    damageSkin = 1001;
                    break;
                case 2432748: //血色伤害皮肤
                    damageSkin = 1002;
                    break;
                case 2432749: //僵尸伤害皮肤
                    damageSkin = 1003;
                    break;
                case 2432804: //紫色妖姬伤害皮肤
                    damageSkin = 1004;
                    break;
                case 2433112: //卧虎藏龙伤害皮肤
                case 2433558:
                    damageSkin = 1007;
                    break;
                case 2433113: //冰淇淋伤害皮肤
                    damageSkin = 1008;
                    break;
                case 2433038: //粉笔效果伤害皮肤
                    damageSkin = 1010;
                    break;
                case 2433197: //蘑菇公主伤害皮肤
                    damageSkin = 1012;
                    break;
                case 2433182: //万圣节南瓜伤害皮肤
                    damageSkin = 1014;
                    break;
                case 2433183: //万圣节幽灵伤害皮肤
                    damageSkin = 1015;
                    break;
                case 2433184: //女巫伤害皮肤
                    damageSkin = 1016;
                    break;
                case 2433362: //夜空伤害皮肤
                    damageSkin = 1020;
                    break;
                case 2433587: //羊咩咩伤害皮肤
                    damageSkin = 1022;
                    break;
                case 2433588: //烟花伤害皮肤
                    damageSkin = 1023;
                    break;
                case 2433572: //娇艳玫瑰伤害皮肤
                    damageSkin = 1024;
                    break;
                case 2433571: //彩色涂鸦伤害皮肤
                    damageSkin = 1025;
                    break;
                case 2433570: //恋爱季节伤害皮肤
                    damageSkin = 1026;
                    break;
                case 2433569: //爆裂之石伤害皮肤
                    damageSkin = 1027;
                    break;
                case 2433568: //蜜桃甜心伤害皮肤
                    damageSkin = 1028;
                    break;
                case 2433709: //兔年糕伤害皮肤
                case 2434081:
                    damageSkin = 1030;
                    break;
                case 2433777: //黑色天堂伤害皮肤
                    damageSkin = 1031;
                    break;
                case 2433775: //奥尔卡伤害皮肤
                    damageSkin = 1032;
                    break;
                case 2433776: //斯乌伤害皮肤
                    damageSkin = 1033;
                    break;
                case 2433883: //绿色地球伤害皮肤
                    damageSkin = 1040;
                    break;
                default:
                    ItemScriptManager.getInstance().start(c, info.getNpc(), toUse.getItemId());
                    break;
            }
        }
        if (mountid > 0) {
            //System.err.println("骑宠技能 - 1 " + mountid);
            mountid = mountid > 80001000 ? mountid : PlayerStats.getSkillByJob(mountid, c.getPlayer().getJob());
            int fk = GameConstants.getMountItem(mountid, c.getPlayer());
            //System.err.println("骑宠技能 - 2 " + mountid + " fk: " + fk);
            if (fk > 0 && mountid < 80001000) {
                for (int i = 80001001; i < 80001999; i++) {
                    Skill skill = SkillFactory.getSkill(i);
                    if (skill != null && GameConstants.getMountItem(skill.getId(), c.getPlayer()) == fk) {
                        mountid = i;
                        break;
                    }
                }
            }
            //System.err.println("骑宠技能 - 3 " + mountid + " 是否有技能: " + (SkillFactory.getSkill(mountid) == null) + " 骑宠: " + (GameConstants.getMountItem(mountid, c.getPlayer()) == 0));
            if (c.getPlayer().getSkillLevel(mountid) > 0) {
                c.getPlayer().dropMessage(1, "您已经拥有了[" + SkillFactory.getSkill(mountid).getName() + "]这个骑宠的技能，无法使用该道具。");
            } else if (SkillFactory.getSkill(mountid) == null || GameConstants.getMountItem(mountid, c.getPlayer()) == 0) {
                c.getPlayer().dropMessage(1, "您无法使用这个骑宠的技能.");
            } else if (expiration_days > 0) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                c.getPlayer().changeSingleSkillLevel(SkillFactory.getSkill(mountid), (byte) 1, (byte) 1, System.currentTimeMillis() + expiration_days * 24 * 60 * 60 * 1000);
                c.getPlayer().dropMessage(1, "恭喜您获得[" + SkillFactory.getSkill(mountid).getName() + "]骑宠技能 " + expiration_days + " 权。");
            } else if (expiration_days == -1) {
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
                c.getPlayer().changeSingleSkillLevel(SkillFactory.getSkill(mountid), (byte) 1, (byte) 1, -1);
                c.getPlayer().dropMessage(1, "恭喜您获得[" + SkillFactory.getSkill(mountid).getName() + "]骑宠技能永久权。");
            }
        }
        if (damageSkin >= 0) {
            c.getPlayer().changeDamageSkin(damageSkin);
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (byte) 1, false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 使用怪物召唤包
     */
    public static void UseSummonBag(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (!chr.isAlive() || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        Item toUse = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() >= 1 && toUse.getItemId() == itemId && (c.getPlayer().getMapId() < 910000000 || c.getPlayer().getMapId() > 910000022)) {
            Map<String, Integer> toSpawn = MapleItemInformationProvider.getInstance().getEquipStats(itemId);
            if (toSpawn == null) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            MapleMonster ht = null;
            int type = 0;
            for (Entry<String, Integer> i : toSpawn.entrySet()) {
                if (i.getKey().startsWith("mob") && Randomizer.nextInt(99) <= i.getValue()) {
                    ht = MapleLifeFactory.getMonster(Integer.parseInt(i.getKey().substring(3)));
                    chr.getMap().spawnMonster_sSack(ht, chr.getPosition(), type);
                }
            }
            if (ht == null) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 打开谜之蛋
     */
    public static void UseTreasureChest(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        /*
         * [B4 00] [19 00] [C0 4E 41 00] [01] - 没有永恒的热度提示使用点卷 800 最后面的就是 1
         * [B4 00] [19 00] [C0 4E 41 00] [00]
         */
        short slot = slea.readShort();
        int itemid = slea.readInt();
        boolean useCash = slea.readByte() > 0;
        Item toUse = chr.getInventory(MapleInventoryType.ETC).getItem((byte) slot);
        if (toUse == null || toUse.getQuantity() <= 0 || toUse.getItemId() != itemid || chr.hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (!chr.getCheatTracker().canMZD() && !chr.isGM()) {
            chr.dropMessage(5, "你需要等待5秒之后才能使用谜之蛋.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int reward;
        int keyIDforRemoval;
        String box, key;
        int price;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        switch (toUse.getItemId()) {
            case 4280000: //永恒的谜之蛋
                reward = RandomRewards.getGoldBoxReward();
                keyIDforRemoval = 5490000; //永恒的热度
                box = "永恒的谜之蛋";
                key = "永恒的热度";
                price = 800;
                break;
            case 4280001: //重生的谜之蛋
                reward = RandomRewards.getSilverBoxReward();
                keyIDforRemoval = 5490001; //重生的热度
                box = "重生的谜之蛋";
                key = "重生的热度";
                price = 500;
                break;
            default: // Up to no good
                return;
        }
        int amount = 1;
        switch (reward) {
            case 2000004: //特殊药水
                amount = 200;
                break;
            case 2000005: //超级药水
                amount = 100;
                break;
        }
        if (useCash && chr.getCSPoints(2) < price) {
            chr.dropMessage(1, "抵用券不足" + price + "点，请到商城购买“抵用券兑换包”即可充值抵用券！");
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (chr.getInventory(MapleInventoryType.CASH).countById(keyIDforRemoval) < 0) {
            chr.dropMessage(1, "孵化" + box + "需要" + key + "，请到商城购买！");
            c.getSession().write(MaplePacketCreator.enableActions());
        } else if (chr.getInventory(MapleInventoryType.CASH).countById(keyIDforRemoval) > 0 || (useCash && chr.getCSPoints(2) > price)) {
            Item item = MapleInventoryManipulator.addbyId_Gachapon(c, reward, (short) amount, "从 " + box + " 中获得时间: " + FileoutputUtil.CurrentReadable_Time());
            if (item == null) {
                chr.dropMessage(1, "孵化失败，请重试一次。");
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.ETC, slot, (short) 1, true);
            if (useCash) {
                chr.modifyCSPoints(2, -price, true);
            } else {
                MapleInventoryManipulator.removeById(c, MapleInventoryType.CASH, keyIDforRemoval, 1, true, false);
            }
            c.getSession().write(MaplePacketCreator.getShowItemGain(reward, (short) amount, true));
            byte rareness = GameConstants.gachaponRareItem(item.getItemId());
            if (rareness > 0) {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.getGachaponMega(c.getPlayer().getName(), " : 从" + box + "中获得{" + ii.getName(item.getItemId()) + "}！大家一起恭喜他（她）吧！！！！", item, rareness, c.getChannel()));
            }
        } else {
            chr.dropMessage(5, "孵化" + box + "失败，进检查是否有" + key + "或者抵用卷大于" + price + "点。");
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 玩家捡取道具
     */
    public static void Pickup_Player(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (c.getPlayer().hasBlockedInventory()) { //hack
            return;
        }
        chr.updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        slea.skip(1); // or is this before tick?
        Point Client_Reportedpos = slea.readPos();
        if (chr == null || chr.getMap() == null) {
            return;
        }
        MapleMapObject ob = chr.getMap().getMapObject(slea.readInt(), MapleMapObjectType.ITEM);
        if (ob == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleMapItem mapitem = (MapleMapItem) ob;
        Lock lock = mapitem.getLock();
        lock.lock();
        try {
            if (mapitem.isPickedUp()) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (mapitem.getQuest() > 0 && chr.getQuestStatus(mapitem.getQuest()) != 1) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (mapitem.getOwner() != chr.getId() && ((!mapitem.isPlayerDrop() && mapitem.getDropType() == 0) || (mapitem.isPlayerDrop() && chr.getMap().getEverlast()))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (!mapitem.isPlayerDrop() && mapitem.getDropType() == 1 && mapitem.getOwner() != chr.getId() && (chr.getParty() == null || chr.getParty().getMemberById(mapitem.getOwner()) == null)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            double Distance = Client_Reportedpos.distanceSq(mapitem.getPosition());
            if (Distance > 5000 && (mapitem.getMeso() > 0 || mapitem.getItemId() != 4001025)) {
                chr.getCheatTracker().checkPickup(20, false);
                //chr.getCheatTracker().registerOffense(CheatingOffense.ITEMVAC_CLIENT, String.valueOf(Distance));
                WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 全屏捡物。地图ID: " + chr.getMapId() + " 范围: " + Distance));
            } else if (chr.getPosition().distanceSq(mapitem.getPosition()) > 640000.0) {
                chr.getCheatTracker().checkPickup(10, false);
                //chr.getCheatTracker().registerOffense(CheatingOffense.ITEMVAC_SERVER);
                WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 全屏捡物。地图ID: " + chr.getMapId() + " 范围: " + Distance));
            }
            if (mapitem.getMeso() > 0) {
                if (chr.getParty() != null && mapitem.getOwner() != chr.getId()) {
                    List<MapleCharacter> toGive = new LinkedList<>();
                    int splitMeso = mapitem.getMeso() * 40 / 100;
                    for (MaplePartyCharacter z : chr.getParty().getMembers()) {
                        MapleCharacter m = chr.getMap().getCharacterById(z.getId());
                        if (m != null && m.getId() != chr.getId()) {
                            toGive.add(m);
                        }
                    }
                    for (MapleCharacter m : toGive) {
                        if (m.getMeso() >= ServerProperties.getMaxMeso()) {
                            m.getClient().getSession().write(MaplePacketCreator.enableActions());
                            return;
                        }
                        m.gainMeso(splitMeso / toGive.size() + (m.getStat().hasPartyBonus ? (int) (mapitem.getMeso() / 20.0) : 0), true);
                    }
                    if (chr.getMeso() >= ServerProperties.getMaxMeso()) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                    chr.gainMeso(mapitem.getMeso() - splitMeso, true);
                } else {
                    if (chr.getMeso() >= ServerProperties.getMaxMeso()) {
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return;
                    }
                    chr.gainMeso(mapitem.getMeso(), true);
                }
                removeItem(chr, mapitem, ob);
            } else if (MapleItemInformationProvider.getInstance().isPickupBlocked(mapitem.getItemId())) {
                c.getSession().write(MaplePacketCreator.enableActions());
                chr.dropMessage(5, "这个道具无法捡取.");
            } else if (chr.inPVP() && Integer.parseInt(chr.getEventInstance().getProperty("ice")) == chr.getId()) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                c.getSession().write(InventoryPacket.getShowInventoryFull());
                c.getSession().write(MaplePacketCreator.enableActions());
            } else if (useItem(c, mapitem.getItemId())) {
                removeItem(c.getPlayer(), mapitem, ob);
                //another hack
                if (mapitem.getItemId() / 10000 == 291) {
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.getCapturePosition(c.getPlayer().getMap()));
                    c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.resetCapture());
                }
            } else if (mapitem.getItemId() / 10000 != 291 && MapleInventoryManipulator.checkSpace(c, mapitem.getItemId(), mapitem.getItem().getQuantity(), mapitem.getItem().getOwner())) {
                if (mapitem.getItem().getQuantity() >= 50 && mapitem.getItemId() == 2340000) {
                    c.setMonitored(true); //hack check
                }
                MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), true, mapitem.getDropper() instanceof MapleMonster);
                removeItem(chr, mapitem, ob);
            } else {
                c.getSession().write(InventoryPacket.getInventoryFull());
                c.getSession().write(InventoryPacket.getShowInventoryFull());
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } finally {
            lock.unlock();
        }
    }

    /*
     * 宠物捡取道具
     */
    public static void Pickup_Pet(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        if (c.getPlayer().hasBlockedInventory() || c.getPlayer().inPVP()) { //hack
            return;
        }
        c.getPlayer().setScrolledPosition((short) 0);
        byte petz = (byte) slea.readInt();
        MaplePet pet = chr.getSpawnPet(petz);
        slea.skip(1); // [4] Zero, [4] Seems to be tickcount, [1] Always zero
        chr.updateTick(slea.readInt());
        Point Client_Reportedpos = slea.readPos();
        MapleMapObject ob = chr.getMap().getMapObject(slea.readInt(), MapleMapObjectType.ITEM);
        if (ob == null || pet == null) {
            return;
        }
        MapleMapItem mapitem = (MapleMapItem) ob;
        Lock lock = mapitem.getLock();
        lock.lock();
        try {
            if (mapitem.isPickedUp()) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                return;
            }
            if (mapitem.getOwner() != chr.getId() && mapitem.isPlayerDrop()) {
                return;
            }
            if (mapitem.getOwner() != chr.getId() && ((!mapitem.isPlayerDrop() && mapitem.getDropType() == 0) || (mapitem.isPlayerDrop() && chr.getMap().getEverlast()))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            if (!mapitem.isPlayerDrop() && mapitem.getDropType() == 1 && mapitem.getOwner() != chr.getId() && (chr.getParty() == null || chr.getParty().getMemberById(mapitem.getOwner()) == null)) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            double Distance = Client_Reportedpos.distanceSq(mapitem.getPosition());
            if (Distance > 10000 && (mapitem.getMeso() > 0 || mapitem.getItemId() != 4001025)) {
                chr.getCheatTracker().checkPickup(12, true);
                //chr.getCheatTracker().registerOffense(CheatingOffense.PET_ITEMVAC_CLIENT, String.valueOf(Distance));
//                WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 全屏宠吸。地图ID: " + chr.getMapId() + " 范围: " + Distance));
            } else if (pet.getPos().distanceSq(mapitem.getPosition()) > 640000.0) {
                chr.getCheatTracker().checkPickup(6, true);
                //chr.getCheatTracker().registerOffense(CheatingOffense.PET_ITEMVAC_SERVER);
//                WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.getName() + " ID: " + chr.getId() + " (等级 " + chr.getLevel() + ") 全屏宠吸。地图ID: " + chr.getMapId() + " 范围: " + Distance));
            }
            if (mapitem.getMeso() > 0) {
                if (chr.getParty() != null && mapitem.getOwner() != chr.getId()) {
                    List<MapleCharacter> toGive = new LinkedList<>();
                    int splitMeso = mapitem.getMeso() * 40 / 100;
                    for (MaplePartyCharacter z : chr.getParty().getMembers()) {
                        MapleCharacter m = chr.getMap().getCharacterById(z.getId());
                        if (m != null && m.getId() != chr.getId()) {
                            toGive.add(m);
                        }
                    }
                    for (MapleCharacter m : toGive) {
                        m.gainMeso(splitMeso / toGive.size() + (m.getStat().hasPartyBonus ? (int) (mapitem.getMeso() / 20.0) : 0), true);
                    }
                    chr.gainMeso(mapitem.getMeso() - splitMeso, true);
                } else {
                    chr.gainMeso(mapitem.getMeso(), true);
                }
                removeItem_Pet(chr, mapitem, petz);
            } else if (MapleItemInformationProvider.getInstance().isPickupBlocked(mapitem.getItemId()) || mapitem.getItemId() / 10000 == 291) {
                c.getSession().write(MaplePacketCreator.enableActions());
            } else if (useItem(c, mapitem.getItemId())) {
                removeItem_Pet(chr, mapitem, petz);
            } else if (MapleInventoryManipulator.checkSpace(c, mapitem.getItemId(), mapitem.getItem().getQuantity(), mapitem.getItem().getOwner())) {
                if (mapitem.getItem().getQuantity() >= 50 && mapitem.getItemId() == 2340000) {
                    c.setMonitored(true); //hack check
                }
                MapleInventoryManipulator.addFromDrop(c, mapitem.getItem(), true, mapitem.getDropper() instanceof MapleMonster, false);
                removeItem_Pet(chr, mapitem, petz);
            }
        } finally {
            lock.unlock();
        }
    }

    /*
     * 使用物品道具
     */
    public static boolean useItem(MapleClient c, int id) {
        if (ItemConstants.isUse(id)) { // TO prevent caching of everything, waste of mem
            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            MapleStatEffect eff = ii.getItemEffect(id);
            if (eff == null) {
                return false;
            }
            //must hack here for ctf
            if (id / 10000 == 291) {
                boolean area = false;
                for (Rectangle rect : c.getPlayer().getMap().getAreas()) {
                    if (rect.contains(c.getPlayer().getTruePosition())) {
                        area = true;
                        break;
                    }
                }
                if (!c.getPlayer().inPVP() || (c.getPlayer().getTeam() == (id - 2910000) && area)) {
                    return false; //dont apply the consume
                }
            }
            int consumeval = eff.getConsume();
            if (consumeval > 0) {
                consumeItem(c, eff);
                consumeItem(c, ii.getItemEffectEX(id));
                c.getSession().write(MaplePacketCreator.getShowItemGain(id, (byte) 1));
                return true;
            } else if (GameConstants.isDoJangConsume(id)) {
                ii.getItemEffect(id).applyTo(c.getPlayer());
                c.getSession().write(MaplePacketCreator.getShowItemGain(id, (byte) 1));
                return true;
            }
        }
        return false;
    }

    /*
     * 消耗物品道具 也就是使用成功吧
     */
    public static void consumeItem(MapleClient c, MapleStatEffect eff) {
        if (eff == null) {
            return;
        }
        if (eff.getConsume() == 2) {
            if (c.getPlayer().getParty() != null && c.getPlayer().isAlive()) {
                for (MaplePartyCharacter pc : c.getPlayer().getParty().getMembers()) {
                    MapleCharacter chr = c.getPlayer().getMap().getCharacterById(pc.getId());
                    if (chr != null && chr.isAlive()) {
                        eff.applyTo(chr);
                    }
                }
            } else {
                eff.applyTo(c.getPlayer());
            }
        } else if (c.getPlayer().isAlive()) {
            eff.applyTo(c.getPlayer());
        }
    }

    /*
     * 宠物捡取道具后移除地图道具信息
     */
    public static void removeItem_Pet(MapleCharacter chr, MapleMapItem mapitem, int pet) {
        mapitem.setPickedUp(true);
        chr.getMap().broadcastMessage(InventoryPacket.removeItemFromMap(mapitem.getObjectId(), 5, chr.getId(), pet));
        chr.getMap().removeMapObject(mapitem);
    }

    /*
     * 玩家捡取道具后移除地图道具信息
     */
    private static void removeItem(MapleCharacter chr, MapleMapItem mapitem, MapleMapObject ob) {
        mapitem.setPickedUp(true);
        chr.getMap().broadcastMessage(InventoryPacket.removeItemFromMap(mapitem.getObjectId(), 2, chr.getId()), mapitem.getPosition());
        chr.getMap().removeMapObject(ob);
    }

    /*
     * 使用商店搜索器开始搜索道具
     */
    public static void OwlMinerva(LittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte) slea.readShort();
        int itemid = slea.readInt();
        Item toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse != null && toUse.getQuantity() > 0 && toUse.getItemId() == itemid && itemid == 2310000 && !c.getPlayer().hasBlockedInventory()) {
            int itemSearch = slea.readInt();
            List<HiredMerchant> hms = c.getChannelServer().searchMerchant(itemSearch);
            if (hms.size() > 0) {
                c.getSession().write(MaplePacketCreator.getOwlSearched(itemSearch, hms));
                MapleInventoryManipulator.removeById(c, MapleInventoryType.USE, itemid, 1, true, false);
            } else {
                c.getPlayer().dropMessage(1, "没有找到这个道具.");
            }
            MapleCharacterUtil.addToItemSearch(itemSearch);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 打开商店搜索器
     */
    public static void Owl(LittleEndianAccessor slea, MapleClient c) {
        //5230000 - 商店搜索器 5230001 - 新手商店搜索器 2310000 -雅典娜的猫头鹰
        if (c.getPlayer().getMapId() >= 910000000 && c.getPlayer().getMapId() <= 910000022) {
            c.getSession().write(MaplePacketCreator.getOwlOpen());
        } else {
            c.getPlayer().dropMessage(5, "商店搜索器只能在自由市场使用.");
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public static final int OWL_ID = 1; //don't change. 0 = owner ID, 1 = store ID, 2 = object ID

    /*
     * 使用商店搜索器后选择道具点击移动
     */
    public static void OwlWarp(LittleEndianAccessor slea, MapleClient c) {
        c.getSession().write(MaplePacketCreator.enableActions());
        if (c.getPlayer().getMapId() >= 910000000 && c.getPlayer().getMapId() <= 910000022 && !c.getPlayer().hasBlockedInventory()) {
            int id = slea.readInt();
//            int type = slea.readByte(); //未知 应该是搜索类型
            slea.skip(1);
            int map = slea.readInt();
            if (map >= 910000001 && map <= 910000022) {
                MapleMap mapp = c.getChannelServer().getMapFactory().getMap(map);
                c.getPlayer().changeMap(mapp, mapp.getPortal(0));
                HiredMerchant merchant = null;
                List<MapleMapObject> objects;
                switch (OWL_ID) {
                    case 0:
                        objects = mapp.getAllHiredMerchantsThreadsafe();
                        for (MapleMapObject ob : objects) {
                            if (ob instanceof IMaplePlayerShop) {
                                IMaplePlayerShop ips = (IMaplePlayerShop) ob;
                                if (ips instanceof HiredMerchant) {
                                    HiredMerchant merch = (HiredMerchant) ips;
                                    if (merch.getOwnerId() == id) {
                                        merchant = merch;
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    case 1:
                        objects = mapp.getAllHiredMerchantsThreadsafe();
                        for (MapleMapObject ob : objects) {
                            if (ob instanceof IMaplePlayerShop) {
                                IMaplePlayerShop ips = (IMaplePlayerShop) ob;
                                if (ips instanceof HiredMerchant) {
                                    HiredMerchant merch = (HiredMerchant) ips;
                                    if (merch.getStoreId() == id) {
                                        merchant = merch;
                                        break;
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        MapleMapObject ob = mapp.getMapObject(id, MapleMapObjectType.HIRED_MERCHANT);
                        if (ob instanceof IMaplePlayerShop) {
                            IMaplePlayerShop ips = (IMaplePlayerShop) ob;
                            if (ips instanceof HiredMerchant) {
                                merchant = (HiredMerchant) ips;
                            }
                        }
                        break;
                }
                if (merchant != null) {
                    if (merchant.isOwner(c.getPlayer())) {
                        merchant.setOpen(false);
                        merchant.removeAllVisitors(0x12, (byte) 1);
                        c.getPlayer().setPlayerShop(merchant);
                        c.getSession().write(PlayerShopPacket.getHiredMerch(c.getPlayer(), merchant, false));
                    } else if (!merchant.isOpen() || !merchant.isAvailable()) {
                        c.getPlayer().dropMessage(1, "主人正在整理商店物品\r\n请稍后再度光临！");
                    } else if (merchant.getFreeSlot() == -1) {
                        c.getPlayer().dropMessage(1, "店铺已达到最大人数\r\n请稍后再度光临！");
                    } else if (merchant.isInBlackList(c.getPlayer().getName())) {
                        c.getPlayer().dropMessage(1, "你被禁止进入该店铺.");
                    } else {
                        c.getPlayer().setPlayerShop(merchant);
                        merchant.addVisitor(c.getPlayer());
                        c.getSession().write(PlayerShopPacket.getHiredMerch(c.getPlayer(), merchant, false));
                    }
                } else {
                    c.getPlayer().dropMessage(1, "主人正在整理商店物品\r\n请稍后再度光临！");
                }
            }
        }
    }

    /*
     * 还原装备升级失败减少的次数
     */
    public static void PamSong(LittleEndianAccessor slea, MapleClient c) {
        Item pam = c.getPlayer().getInventory(MapleInventoryType.CASH).findById(5640000);
        if (slea.readByte() > 0 && c.getPlayer().getScrolledPosition() != 0 && pam != null && pam.getQuantity() > 0) {
            MapleInventoryType inv = c.getPlayer().getScrolledPosition() < 0 ? MapleInventoryType.EQUIPPED : MapleInventoryType.EQUIP;
            Item item = c.getPlayer().getInventory(inv).getItem(c.getPlayer().getScrolledPosition());
            c.getPlayer().setScrolledPosition((short) 0);
            if (item != null) {
                Equip eq = (Equip) item;
                eq.setUpgradeSlots((byte) (eq.getUpgradeSlots() + 1));
                c.getPlayer().forceUpdateItem(eq);
                MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.CASH, pam.getPosition(), (short) 1, true, false);
                c.getPlayer().getMap().broadcastMessage(MaplePacketCreator.pamsSongEffect(c.getPlayer().getId()));
            }
        } else {
            c.getPlayer().setScrolledPosition((short) 0);
        }
    }

    /*
     * 使用瞬移之石移动
     */
    public static void TeleRock(LittleEndianAccessor slea, MapleClient c) {
        byte slot = (byte) slea.readShort();
        int itemId = slea.readInt();
        Item toUse = c.getPlayer().getInventory(MapleInventoryType.USE).getItem(slot);
        if (toUse == null || toUse.getQuantity() < 1 || toUse.getItemId() != itemId || itemId / 10000 != 232 || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        boolean used = UseTeleRock(slea, c, itemId);
        if (used) {
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, slot, (short) 1, false);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static boolean UseTeleRock(LittleEndianAccessor slea, MapleClient c, int itemId) {
        boolean used = false;
        if (slea.readByte() == 0) { // Rocktype
            MapleMap target = c.getChannelServer().getMapFactory().getMap(slea.readInt());
            if ((itemId == 5041000 && c.getPlayer().isRockMap(target.getId())) || (itemId != 5041000 && c.getPlayer().isRegRockMap(target.getId())) || ((itemId == 5040004 || itemId == 5041001) && (c.getPlayer().isHyperRockMap(target.getId()) || GameConstants.isHyperTeleMap(target.getId())))) {
                if (!FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(target.getFieldLimit()) && !c.getPlayer().isInBlockedMap()) { //Makes sure this map doesn't have a forced return map
                    c.getPlayer().changeMap(target, target.getPortal(0));
                    used = true;
                }
            }
        } else {
            MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(slea.readMapleAsciiString());
            if (victim != null && !victim.isIntern() && c.getPlayer().getEventInstance() == null && victim.getEventInstance() == null) {
                if (!FieldLimitType.VipRock.check(c.getPlayer().getMap().getFieldLimit()) && !FieldLimitType.VipRock.check(c.getChannelServer().getMapFactory().getMap(victim.getMapId()).getFieldLimit()) && !victim.isInBlockedMap() && !c.getPlayer().isInBlockedMap()) {
                    if (itemId == 5041000 || itemId == 5040004 || itemId == 5041001 || (victim.getMapId() / 100000000) == (c.getPlayer().getMapId() / 100000000)) { // Viprock or same continent
                        c.getPlayer().changeMap(victim.getMap(), victim.getMap().findClosestPortal(victim.getTruePosition()));
                        used = true;
                    }
                }
            } else {
                c.getPlayer().dropMessage(1, "在此频道未找到该玩家.");
            }
        }
        return used;
    }

    /*
     * 使用星岩
     */
    public static void UseNebulite(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        chr.updateTick(slea.readInt());
        chr.setScrolledPosition((short) 0);
        Item nebulite = chr.getInventory(MapleInventoryType.SETUP).getItem((byte) slea.readShort()); //星岩在背包的位置
        int nebuliteId = slea.readInt(); //星岩的道具ID
        Item toMount = chr.getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readShort());
        if (nebulite == null || nebuliteId != nebulite.getItemId() || toMount == null || chr.hasBlockedInventory()) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
        Equip eqq = (Equip) toMount;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean success = false;
        if (eqq.getSocket1() == 0/*
                 * || eqq.getSocket2() == 0 || eqq.getSocket3() == 0
                 */) { // removed 2nd and 3rd sockets, we can put into npc.
            StructItemOption pot = ii.getSocketInfo(nebuliteId);
            if (pot != null && GameConstants.optionTypeFits(pot.optionType, eqq.getItemId())) {
                //if (eqq.getSocket1() == 0) { // priority comes first
                eqq.setSocket1(pot.opID);
                //}// else if (eqq.getSocket2() == 0) {
                //    eqq.setSocket2(pot.opID);
                //} else if (eqq.getSocket3() == 0) {
                //    eqq.setSocket3(pot.opID);
                //}
            }
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, nebulite.getPosition(), (short) 1, false);
            chr.forceUpdateItem(toMount);
            success = true;
        }
        chr.getMap().broadcastMessage(InventoryPacket.showNebuliteEffect(c.getPlayer().getId(), success, success ? "成功嵌入星岩。" : "嵌入星岩失败。"));
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void UseAlienSocket(LittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        Item alienSocket = c.getPlayer().getInventory(MapleInventoryType.USE).getItem((byte) slea.readShort());
        int alienSocketId = slea.readInt();
        Item toMount = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem((byte) slea.readShort());
        if (alienSocket == null || alienSocketId != alienSocket.getItemId() || toMount == null || c.getPlayer().hasBlockedInventory()) {
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
        // Can only use once-> 2nd and 3rd must use NPC.
        Equip eqq = (Equip) toMount;
        if (eqq.getSocketState() != 0) { // Used before
            c.getPlayer().dropMessage(1, "This item already has a socket.");
        } else {
            eqq.setSocket1(0); // First socket, GMS removed the other 2
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, alienSocket.getPosition(), (short) 1, false);
            c.getPlayer().forceUpdateItem(toMount);
        }
        c.getSession().write(MTSCSPacket.useAlienSocket(true));
    }

    public static void UseNebuliteFusion(LittleEndianAccessor slea, MapleClient c) {
        c.getPlayer().updateTick(slea.readInt());
        c.getPlayer().setScrolledPosition((short) 0);
        int nebuliteId1 = slea.readInt();
        Item nebulite1 = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) slea.readShort());
        int nebuliteId2 = slea.readInt();
        Item nebulite2 = c.getPlayer().getInventory(MapleInventoryType.SETUP).getItem((byte) slea.readShort());
        int mesos = slea.readInt();
        int premiumQuantity = slea.readInt();
        if (nebulite1 == null || nebulite2 == null || nebuliteId1 != nebulite1.getItemId() || nebuliteId2 != nebulite2.getItemId() || (mesos == 0 && premiumQuantity == 0) || (mesos != 0 && premiumQuantity != 0) || mesos < 0 || premiumQuantity < 0 || c.getPlayer().hasBlockedInventory()) {
            c.getPlayer().dropMessage(1, "Failed to fuse Nebulite.");
            c.getSession().write(InventoryPacket.getInventoryFull());
            return;
        }
        int grade1 = ItemConstants.getNebuliteGrade(nebuliteId1);
        int grade2 = ItemConstants.getNebuliteGrade(nebuliteId2);
        int highestRank = grade1 > grade2 ? grade1 : grade2;
        if (grade1 == -1 || grade2 == -1 || (highestRank == 3 && premiumQuantity != 2) || (highestRank == 2 && premiumQuantity != 1)
                || (highestRank == 1 && mesos != 5000) || (highestRank == 0 && mesos != 3000) || (mesos > 0 && c.getPlayer().getMeso() < mesos)
                || (premiumQuantity > 0 && c.getPlayer().getItemQuantity(4420000, false) < premiumQuantity) || grade1 >= 4 || grade2 >= 4
                || (c.getPlayer().getInventory(MapleInventoryType.SETUP).getNumFreeSlot() < 1)) { // 4000 + = S, 3000 + = A, 2000 + = B, 1000 + = C, else = D
            c.getSession().write(InventoryPacket.useNebuliteFusion(c.getPlayer().getId(), 0, false));
            return; // Most of them were done in client, so we just send the unsuccessfull packet, as it is only here when they packet edit.
        }
        int avg = (grade1 + grade2) / 2; // have to revise more about grades.
        int rank = Randomizer.nextInt(100) < 4 ? (Randomizer.nextInt(100) < 70 ? (avg != 3 ? (avg + 1) : avg) : (avg != 0 ? (avg - 1) : 0)) : avg;
        // 4 % chance to up/down 1 grade, (70% to up, 30% to down), cannot up to S grade. =)
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        List<StructItemOption> pots = new LinkedList<>(ii.getAllSocketInfo(rank).values());
        int newId = 0;
        while (newId == 0) {
            StructItemOption pot = pots.get(Randomizer.nextInt(pots.size()));
            if (pot != null) {
                newId = pot.opID;
            }
        }
        if (mesos > 0) {
            c.getPlayer().gainMeso(-mesos, true);
        } else if (premiumQuantity > 0) {
            MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4420000, premiumQuantity, false, false);
        }
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, nebulite1.getPosition(), (short) 1, false);
        MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.SETUP, nebulite2.getPosition(), (short) 1, false);
        MapleInventoryManipulator.addById(c, newId, (short) 1, "Fused from " + nebuliteId1 + " and " + nebuliteId2 + " on " + FileoutputUtil.CurrentReadable_Date());
        c.getSession().write(InventoryPacket.useNebuliteFusion(c.getPlayer().getId(), newId, true));
    }

    /*
     * 使用潜能附加印章
     */
    public static void UseAdditionalItem(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        chr.updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        byte toSlot = (byte) slea.readShort();
        Item scroll = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        Equip toScroll = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(toSlot);
        if (scroll == null || scroll.getQuantity() < 0 || toScroll == null || toScroll.getQuantity() != 1) {
            //c.getSession().write(MaplePacketCreator.showScrollTip(false));
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int successRate = ii.getScrollSuccess(scroll.getItemId()); //卷轴成功的几率
        boolean noCursed = ii.isNoCursedScroll(scroll.getItemId());
        if (successRate <= 0) {
            c.getPlayer().dropMessage(1, "卷轴道具: " + scroll.getItemId() + " - " + ii.getName(scroll.getItemId()) + " 成功几率为: " + successRate + " 该卷轴可能还未修复.");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (chr.isAdmin()) {
            chr.dropSpouseMessage(0x0B, "卷轴道具: " + scroll.getItemId() + " - " + ii.getName(scroll.getItemId()) + " 成功几率为: " + successRate + "% 卷轴是否失败不消失装备: " + noCursed);
        }
        if (toScroll.getOptential4() == 0 || toScroll.getOptential5() == 0 || toScroll.getOptential6() == 0) {
            boolean success = false;
            int lines = toScroll.getOptential4() == 0 ? 4 : toScroll.getOptential5() == 0 ? 5 : 6;
            int reqLevel = ii.getReqLevel(toScroll.getItemId()) / 10;
            if (Randomizer.nextInt(100) <= successRate) {
                List<List<StructItemOption>> opts = new LinkedList<>(ii.getAllOptentialInfo().values());
                boolean rewarded = false;
                while (!rewarded) {
                    StructItemOption opt = opts.get(Randomizer.nextInt(opts.size())).get(reqLevel);
                   if (opt != null && opt.reqLevel / 10 <= reqLevel && !GameConstants.isAboveA(opt.opID) && GameConstants.optionTypeFits(opt.optionType, toScroll.getItemId()) && GameConstants.optionTypeFitsX(opt.opID, toScroll.getItemId()) && GameConstants.optentialIDFits(opt.opID, 17, 1) && GameConstants.isBlockedOptential(toScroll, opt.opID, true, false)) {//optionType
                        if (lines == 4) {
                            toScroll.setOptential4(opt.opID);
                            if (chr.isAdmin()) {
                                chr.dropMessage(5, "附加潜能4 获得ID： " + opt.opID);
                            }
                        } else if (lines == 5) {
                            toScroll.setOptential5(opt.opID);
                            if (chr.isAdmin()) {
                                chr.dropMessage(5, "附加潜能5 获得ID： " + opt.opID);
                            }
                        } else {
                            toScroll.setOptential6(opt.opID);
                            if (chr.isAdmin()) {
                                chr.dropMessage(6, "附加潜能6 获得ID： " + opt.opID);
                            }
                        }
                        rewarded = true;
                    }
                }
                success = true;
            }
            /*
             * 如果没有成功
             * 2048200 - 低级潜能附加印章 - 成功几率 5 % 失败 100 %消失道具
             * 2048201 - 中级潜能附加印章 - 成功几率 5 % 失败 100 %消失道具
             */
            List<ModifyInventory> mods = new ArrayList<>();
            boolean removeItem = false;
            if (!success && !noCursed) {
                mods.add(new ModifyInventory(3, toScroll));
                removeItem = true;
                chr.getInventory(MapleInventoryType.EQUIP).removeItem(toScroll.getPosition());
            } else {
                mods.add(new ModifyInventory(3, toScroll));
                mods.add(new ModifyInventory(0, toScroll));
            }
            c.getSession().write(InventoryPacket.modifyInventory(true, mods, chr));
            //c.getSession().write(MaplePacketCreator.showScrollTip(!removeItem));
            chr.getMap().broadcastMessage(InventoryPacket.潜能扩展效果(chr.getId(), success, scroll.getItemId(), removeItem));
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, scroll.getPosition(), (short) 1, false);
        } else {
            //c.getSession().write(MaplePacketCreator.showScrollTip(false));
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    /*
     * 购买十字猎人商店道具
     */
    public static void BuyCrossHunterItem(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int key = slea.readShort();
        int itemId = slea.readInt();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        StructCrossHunterShop shop = ii.getCrossHunterShop(key);
        if (shop != null && itemId == shop.getItemId() && shop.getTokenPrice() > 0) {
            if (chr.getInventory(MapleInventoryType.ETC).countById(4310029) >= shop.getTokenPrice()) {
                if (MapleInventoryManipulator.checkSpace(c, shop.getItemId(), 1, "")) {
                    MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, 4310029, shop.getTokenPrice(), true, false);
                    MapleInventoryManipulator.addById(c, shop.getItemId(), (short) 1, shop.getOptentialGrade(), "十字商店购买: " + FileoutputUtil.CurrentReadable_Date());
                    c.getSession().write(MaplePacketCreator.confirmCrossHunter((byte) 0x00)); //物品购买完成。
                } else {
                    c.getSession().write(MaplePacketCreator.confirmCrossHunter((byte) 0x02)); //背包空间不足。
                }
            } else {
                c.getSession().write(MaplePacketCreator.confirmCrossHunter((byte) 0x01)); //道具不够.
            }
        } else {
            c.getSession().write(MaplePacketCreator.confirmCrossHunter((byte) 0x04)); //现在无法购买物品。
        }
    }

    public static void UseSoulScroll(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        c.getPlayer().updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        byte toSlot = (byte) slea.readShort();
        Item scroll = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        Equip equip = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(toSlot);

        if (equip == null || scroll == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }

        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        int soulid = scroll.getItemId();
        int skillid = ii.getSoulSkill(soulid);
        Equip nEquip = equip;
        if (skillid == 0 || nEquip.getSoulEnchanter() == 0) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }

        ArrayList<Integer> tempOption = ii.getTempOption(soulid);
        int pot;
        if (tempOption.isEmpty()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        } else if (tempOption.size() == 1) {
            pot = tempOption.get(0);
        } else {
            pot = tempOption.get(Randomizer.nextInt(tempOption.size()));
        }

        Map enchanterStats = ii.getEquipStats(scroll.getItemId());
        int success = enchanterStats == null || !enchanterStats.containsKey("success") ? 100 : (int) enchanterStats.get("success");

        chr.getInventory(ItemConstants.getInventoryType(scroll.getItemId())).removeItem(scroll.getPosition(), (short) 1, false);
        List<ModifyInventory> mods = new ArrayList<>();
        mods.add(new ModifyInventory(scroll.getQuantity() > 0 ? 1 : 3, scroll));

        if (Randomizer.nextInt(100) < success) {
            int skid = chr.getEquippedSoulSkill();
            if (skid > 0) {
                chr.changeSkillLevel(new Skill(chr.getEquippedSoulSkill()), (byte) 0, (byte) 0);
            }
            chr.setSoulCount((short) 0);
            nEquip.setSoulName((short) (soulid % 1000 + 1));
            nEquip.setSoulOptential((short) pot);
            nEquip.setSoulSkill(skillid);
            chr.changeSkillLevel(new Skill(skillid), (byte) 1, (byte) 1);
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.showSoulScrollEffect(chr.getId(), true, false), true);
            mods.add(new ModifyInventory(3, nEquip));
            mods.add(new ModifyInventory(0, nEquip));
        } else {
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.showSoulScrollEffect(chr.getId(), false, false), true);
        }
        c.getSession().write(InventoryPacket.modifyInventory(true, mods, chr));
    }

    public static void UseSoulEnchanter(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        chr.updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        byte toSlot = (byte) slea.readShort();
        Item scroll = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        Equip nEquip = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(toSlot);
        if (nEquip == null || scroll == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();

        int reqLevel = ii.getReqLevel(nEquip.getItemId());
        Pair<Integer, Integer> socketReqLevel = ii.getSocketReqLevel(scroll.getItemId());
        if (reqLevel > socketReqLevel.getLeft() || reqLevel < socketReqLevel.getRight()) {
            chr.dropMessage(-1, "无法使用该道具！");
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }

        Map enchanterStats = ii.getEquipStats(scroll.getItemId());
        int success = enchanterStats == null || !enchanterStats.containsKey("success") ? 100 : (int) enchanterStats.get("success");
        List<ModifyInventory> mods = new ArrayList<>();
        if (Randomizer.nextInt(100) <= success) {
            nEquip.setSoulName((short) 1);
            nEquip.setSoulEnchanter((short) 3);
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.showEnchanterEffect(chr.getId(), true), true);
            c.getSession().write(BuffPacket.show灵魂武器(nEquip.getSoulSkill(), 0));
        } else {
            chr.getMap().broadcastMessage(chr, MaplePacketCreator.showEnchanterEffect(chr.getId(), false), true);
        }
        chr.getInventory(ItemConstants.getInventoryType(scroll.getItemId())).removeItem(scroll.getPosition(), (short) 1, false);
        mods.add(new ModifyInventory(scroll.getQuantity() > 0 ? 1 : 3, scroll));
        mods.add(new ModifyInventory(3, nEquip));
        mods.add(new ModifyInventory(0, nEquip));
        c.getSession().write(InventoryPacket.modifyInventory(true, mods, chr));

        c.getSession().write(MaplePacketCreator.enableActions());
    }

    public static void applyHyunCube(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP()) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleQuest q = MapleQuest.getInstance(52998);
        if (q == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        chr.updateTick(slea.readInt());
        int size = slea.readInt();
        MapleQuestStatus status = chr.getQuestNAdd(q);
        String customData = status.getCustomData();
        List<String> potids = Arrays.asList(customData.split(","));
        List<Integer> potids_ = new ArrayList<>();
        int slot = Integer.valueOf(potids.get(potids.size() - 1));
        for (int i = 0; i < size; i++) {
            int potid = slea.readInt();
            if (!potids.contains(String.valueOf(potid))) {
                c.getSession().write(MaplePacketCreator.enableActions());
                return;
            }
            potids_.add(potid);
        }
        Collections.sort(potids_, new SizeComparator());

        Item item = chr.getInventory(MapleInventoryType.EQUIP).getItem((short) slot);
        if (item != null) {
            Equip toScroll = (Equip) item;
            for (int i = 0; i < potids_.size(); i++) {
                switch (i) {
                    case 0:
                        toScroll.setOptential1(potids_.get(i));
                        break;
                    case 1:
                        toScroll.setOptential2(potids_.get(i));
                        break;
                    case 2:
                        toScroll.setOptential3(potids_.get(i));
                        break;
                    default:
                        break;
                }
            }
        }
        chr.forceUpdateItem(item);
        c.getSession().write(InventoryPacket.showHyunOptentialResult(true, null));
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    // 大小排序规则
    static class SizeComparator implements Comparator<Integer> {

        @Override
        public int compare(Integer o1, Integer o2) {
            return o2.compareTo(o1);
        }
    }

    public static void applyBlackCube(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        // 6 应用新潜能
        // 7 应用旧潜能
        if (chr == null || !chr.isAlive() || chr.getMap() == null || chr.hasBlockedInventory() || chr.inPVP() || chr.getItemOptential() == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        chr.updateTick(slea.readInt());
        int mode = slea.readShort();

        if (mode == 6) {
            ModifyItemOptential mip = chr.getItemOptential();
            Equip newItem = (Equip) mip.getNewItem();
            Equip oldItem = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(newItem.getPosition());
            oldItem.setOptential1(newItem.getOptential1());
            oldItem.setOptential2(newItem.getOptential2());
            oldItem.setOptential3(newItem.getOptential3());
            chr.forceUpdateItem(oldItem);
        }

        chr.resetItemOptential();
        c.getSession().write(InventoryPacket.showBlackCubeResults());
    }
}
