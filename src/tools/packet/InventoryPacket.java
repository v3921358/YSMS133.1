/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import client.MapleCharacter;
import client.inventory.Equip;
import client.inventory.EnchantingScroll;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePotionPot;
import client.inventory.ModifyInventory;
import constants.ItemConstants;
import constants.ServerConstants;
import handling.SendPacketOpcode;

import java.awt.Point;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import server.ServerProperties;
import server.maps.MapleMapItem;
import tools.data.output.MaplePacketLittleEndianWriter;

import static tools.packet.PacketHelper.addItemInfo;

/**
 * @author PlayDK
 */
public class InventoryPacket {

    private static final Logger log = Logger.getLogger(InventoryPacket.class);

    public static byte[] updateInventorySlotLimit(byte invType, byte newSlots) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_INVENTORY_SLOT.getValue());
        mplew.write(invType);
        mplew.write(newSlots);

        return mplew.getPacket();
    }

    public static byte[] modifyInventory(boolean updateTick, List<ModifyInventory> mods) {
        return modifyInventory(updateTick, mods, null);
    }

    public static byte[] modifyInventory(boolean updateTick, List<ModifyInventory> mods, MapleCharacter chr) {
        return modifyInventory(updateTick, mods, chr, false);
    }

    /*
     * 0 = 获得道具
     * 1 = 更新道具数量
     * 2 = 移动道具
     * 3 = 删除道具
     * 4 = 刷新装备经验
     * 5 = 移动道具小背包到背包
     * 6 = 小背包更新道具
     * 7 = 小背包删除道具
     * 8 = 移动位置小背包里面的道具
     * 9 = 小背包获得道具
     */
    public static byte[] modifyInventory(boolean updateTick, List<ModifyInventory> mods, MapleCharacter chr, boolean active) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        mplew.writeBool(updateTick);
        mplew.writeShort(mods.size()); //更新的次数
        int addMovement = -1;
        for (ModifyInventory mod : mods) {
            mplew.write(mod.getMode());
            mplew.write(mod.getInventoryType());
            boolean oldpos = mod.getMode() == 2 || mod.getMode() == 8 || (mod.getMode() == 5 && !mod.switchSrcDst());
            mplew.writeShort(oldpos ? mod.getOldPosition() : mod.getPosition());
            switch (mod.getMode()) {
                case 0:  //获得道具
                    PacketHelper.addItemInfo(mplew, mod.getItem(), chr, active);
                    break;
                case 1:  //更新道具数量
                    mplew.writeShort(mod.getQuantity());
                    break;
                case 2:  //移动道具                  
                    mplew.writeShort(mod.getPosition());
                    if (mod.getPosition() < 0 || mod.getOldPosition() < 0) {
                        addMovement = mod.getOldPosition() < 0 ? 1 : 2;
                    }
                    break;
                case 3:  //删除道具
                    if (mod.getPosition() < 0) {
                        addMovement = 2;
                    }
                    break;
                case 4:  // 刷新经验值
                    mplew.writeLong(((Equip) mod.getItem()).getSealedExp());
                    break;
                case 5: //移动道具小背包到背包
                    mplew.writeShort(!mod.switchSrcDst() ? mod.getPosition() : mod.getOldPosition());
                    if (mod.getIndicator() != -1) {
                        mplew.writeShort(mod.getIndicator());
                    }
                    break;
                case 6: //小背包更新道具
                    mplew.writeShort(mod.getQuantity());
                    break;
                case 7: //小背包删除道具
                    //这个地方无需处理
                    break;
                case 8: //移动位置小背包里面的道具
                    mplew.writeShort(mod.getPosition());
                    break;
                case 9: //小背包获得道具
                    PacketHelper.addItemInfo(mplew, mod.getItem());
                    break;
            }
            mod.clear();
        }
        if (addMovement > -1) {
            mplew.write(addMovement);
        }

        return mplew.getPacket();
    }

    public static byte[] getInventoryFull() {
        return modifyInventory(true, Collections.EMPTY_LIST);
    }

    public static byte[] getInventoryStatus() {
        return modifyInventory(false, Collections.EMPTY_LIST);
    }

    public static byte[] getShowInventoryFull() {
        return getShowInventoryStatus(0xFF);
    }

    public static byte[] showItemUnavailable() {
        return getShowInventoryStatus(0xFE);
    }

    public static byte[] getShowInventoryStatus(int mode) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        mplew.write(ServerConstants.MapleStatusInfo.获得道具.getType());
        mplew.write(mode);

        return mplew.getPacket();
    }

    public static byte[] showScrollTip(boolean success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SCROLL_TIP.getValue());
        mplew.writeInt(success ? 1 : 0);

        return mplew.getPacket();
    }

    public static byte[] getScrollEffect(int chrId, int scroll, int toScroll) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SCROLL_EFFECT.getValue());
        mplew.writeInt(chrId);
        mplew.writeShort(1);
        mplew.writeInt(scroll);
        mplew.writeInt(toScroll);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] getScrollEffect(int chrId, Equip.ScrollResult scrollSuccess, boolean legendarySpirit, boolean whiteScroll, int scroll, int toScroll) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        //[DB 00] [46 57 01 00] [00] [00] [00] [00] 没有成功
        mplew.writeShort(SendPacketOpcode.SHOW_SCROLL_EFFECT.getValue());
        mplew.writeInt(chrId);
        switch (scrollSuccess) {
            case 失败:
                mplew.write(0x00);
                break;
            case 成功:
                mplew.write(0x01);
                break;
            case 消失:
                mplew.write(0x02);
                break;
            default:
                throw new IllegalArgumentException("effect in illegal range");
        }
        mplew.write(legendarySpirit ? 0 : 0); //V.110修改 好像都是0
        mplew.writeInt(scroll);
        mplew.writeInt(toScroll);
        mplew.write(whiteScroll ? 1 : 0);

        return mplew.getPacket();
    }

    /*
     * 使用魔方
     */
    public static byte[] getOptentialEffect(int chrId, int itemid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_MAGNIFYING_EFFECT.getValue());
        mplew.writeInt(chrId);
        mplew.write(1);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    /*
     * 使用放大镜
     */
    public static byte[] showMagnifyingEffect(int chrId, short pos, boolean isPotAdd) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_MAGNIFYING_EFFECT.getValue());
        mplew.writeInt(chrId);
        mplew.writeShort(pos);
        mplew.write(isPotAdd ? 1 : 0); //T071新增 是否扩展潜能

        return mplew.getPacket();
    }

    public static byte[] showOptentialReset(boolean fireworks, int chrId, boolean success, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(fireworks ? SendPacketOpcode.SHOW_FIREWORKS_EFFECT.getValue() : SendPacketOpcode.SHOW_POTENTIAL_RESET.getValue());
        mplew.writeInt(chrId);
        mplew.write(success ? 1 : 0);
        mplew.writeInt(itemid); // fireworks, Item/Cash/0506.img/%08d/effect/default

        return mplew.getPacket();
    }

    public static byte[] showOptentialResetPanel(MapleCharacter chr, int CSitemId, Item item, byte type) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(type == 0 ? SendPacketOpcode.SHOW_POTENTIAL_RESET_PANEL.getValue() : SendPacketOpcode.SHOW_POTENTIAL_FINALPANEL.getValue());
        mplew.writeInt(chr.getId());
        mplew.write(type);
        mplew.writeInt(CSitemId);
        mplew.writeInt(item.getPosition());
        if (type == 0) {
            addItemInfo(mplew, item, chr);
        }

        return mplew.getPacket();
    }

    public static byte[] showOptentialResetPanel_Black(MapleCharacter chr, Item item, int CSitemId, byte CSitemSlot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BLACKY_CUBE_EFFECT.getValue());
        mplew.writeLong(item.getEquipOnlyId());
        mplew.write(1);
        addItemInfo(mplew, item, chr);
        mplew.writeInt(CSitemId);
        mplew.writeInt(item.getPosition());
        mplew.writeInt(CSitemSlot);

        return mplew.getPacket();
    }

    public static byte[] showBlackCubeResults() {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.BLACKY_CUBE_RESULTS.getValue());
        mplew.write(0);

        return mplew.getPacket();
    }

    /*
     * 重置扩展潜能效果
     */
    public static byte[] 潜能变化效果(int chrId, boolean success, int itemid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ADDITIONAL_RESET.getValue());
        mplew.writeInt(chrId);
        mplew.write(success ? 1 : 0);
        mplew.writeInt(itemid);

        return mplew.getPacket();
    }

    /*
     * 增加扩展潜能效果
     */
    public static byte[] 潜能扩展效果(int chrId, boolean success, int itemid, boolean 是否破坏) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ADDITIONAL_EFFECT.getValue());
        mplew.writeInt(chrId);
        mplew.write(success ? 1 : 0);
        mplew.writeInt(itemid);
        mplew.write(是否破坏 ? 1 : 0); //道具是否破坏

        return mplew.getPacket();
    }

    /*
     * 镶嵌星岩效果
     */
    public static byte[] showNebuliteEffect(int chrId, boolean success, String msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_NEBULITE_EFFECT.getValue());
        mplew.writeInt(chrId);
        mplew.write(success ? 1 : 0);
        mplew.writeMapleAsciiString(msg);

        return mplew.getPacket();
    }

    public static byte[] useNebuliteFusion(int chrId, int itemId, boolean success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_FUSION_EFFECT.getValue());
        mplew.writeInt(chrId);
        mplew.write(success ? 1 : 0);
        mplew.writeInt(itemId);

        return mplew.getPacket();
    }

    /*
     * 道具合成提示
     */
    public static byte[] showSynthesizingMsg(int itemId, int giveItemId, boolean success) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SYNTHESIZING_MSG.getValue());
        mplew.write(success ? 1 : 0);
        mplew.writeInt(itemId);
        mplew.writeInt(giveItemId);

        return mplew.getPacket();
    }

    public static byte[] dropItemFromMapObject(MapleMapItem drop, Point dropfrom, Point dropto, byte mod) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.DROP_ITEM_FROM_MAPOBJECT.getValue());
        mplew.write(0);
        mplew.write(mod); // 1 animation, 2 no animation, 3 spawn disappearing item [Fade], 4 spawn disappearing item
        mplew.writeInt(drop.getObjectId()); // item owner id
        mplew.write(drop.getMeso() > 0 ? 1 : 0); // 1 金币, 0 物品, 2 and above all item meso bag,
        mplew.writeZeroBytes(12);
        mplew.writeInt(drop.getItemId()); // drop object ID
        mplew.writeInt(drop.getOwner()); // owner charid
        mplew.write(drop.getDropType()); // 0 = timeout for non-owner, 1 = timeout for non-owner's party, 2 = FFA, 3 = explosive/FFA
        mplew.writePos(dropto);
        mplew.writeInt(0);
        mplew.writeInt(0);
        if (mod != 2) {
            mplew.writePos(dropfrom);
            mplew.writeShort(0); //FH ?
            mplew.writeShort(0); //V.109 新增 未知
        }
        mplew.write(0);

        if (drop.getMeso() == 0) {
            PacketHelper.addExpirationTime(mplew, drop.getItem().getExpiration());
        }
        mplew.writeInt(drop.isPlayerDrop() ? 0 : 1); // 玩家丢弃是 0 怪物掉落是 1
        mplew.writeZeroBytes(6); //未知 V.116.1修改 以前2位 好像玩家丢弃和掉落是6个0 如果是技能移动是 [00 02 00 00 00 00]
        byte potential = 0;
        if (ItemConstants.getInventoryType(drop.getItemId()) == MapleInventoryType.EQUIP) {
            potential = (byte) Math.max(0, ((Equip) drop.getItem()).getState() - 10);
        }
        mplew.write(potential); // 1蓝色光效B 2紫色光效A 3黄色光效S 4绿色光效SS
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] explodeDrop(int oid) {
        if (ServerProperties.ShowPacket()) {
            log.info("调用: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_ITEM_FROM_MAP.getValue());
        mplew.write(4); // 4 = Explode
        mplew.writeInt(oid);
        mplew.writeShort(655);

        return mplew.getPacket();
    }

    public static byte[] removeItemFromMap(int oid, int animation, int chrId) {
        return removeItemFromMap(oid, animation, chrId, 0);
    }

    public static byte[] removeItemFromMap(int oid, int animation, int chrId, int slot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_ITEM_FROM_MAP.getValue());
        mplew.write(animation); // 0 = Expire, 1 = without animation, 2 = pickup, 4 = explode, 5 = pet pickup
        mplew.writeInt(oid);
        if (animation >= 2) {
            mplew.writeInt(chrId);
            if (animation == 5) { // allow pet pickup?
                mplew.writeInt(slot);
            }
        }

        return mplew.getPacket();
    }

    /*
     * 药剂罐使用返回的提示
     * 0 = 使用失败
     * 1 = 使用成功
     */
    public static byte[] showPotionPotMsg(int reason) {
        return showPotionPotMsg(reason, 0x00);
    }

    public static byte[] showPotionPotMsg(int reason, int msg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.POTION_POT_MSG.getValue());
        mplew.write(reason);
        if (reason == 0) {
            /*
             * 0x00 没有提示
             * 0x01 没有物品
             * 0x02 这个药剂罐已经满了。
             * 0x03 你的药剂罐容量已达最大值。
             * 0x04 药剂魔瓶不能用在生锈的药剂罐上。请用除锈剂为你的药剂罐除锈。
             * 0x05 你的药剂罐还没有生锈。
             * 0x06 这个药剂罐是空的，请再次填充。
             * 0x08 被奇怪的气息所围绕，暂时无法使用道具。
             */
            mplew.write(msg);
        }

        return mplew.getPacket();
    }

    /*
     * 更新药剂罐信息
     */
    public static byte[] updataPotionPot(MaplePotionPot potionPot) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.POTION_POT_UPDATE.getValue());
        PacketHelper.addPotionPotInfo(mplew, potionPot);

        return mplew.getPacket();
    }

    /*
     * 更新宝盒信息
     */
    public static byte[] updataCoreAura(MapleCharacter chr) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.UPDATE_CORE_AURA.getValue());
        mplew.write(0x01);
        mplew.writeZeroBytes(6);
        mplew.write(0x04);
        mplew.writeZeroBytes(21);
        mplew.writeInt(8951284); //F4 95 88 00
        mplew.writeLong(0x01); //好像更新2次 第1次这个地方为 0x01 第2次为 0x02
        PacketHelper.addCoreAura(mplew, chr);

        return mplew.getPacket();
    }

    /*
     * 显示角色当前装备的技能皮肤信息
     */
    public static byte[] showSkillSkin(Map<Integer, Integer> skillskinlist) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_SKILL_SKIN.getValue());
        mplew.writeInt(0x02);
        mplew.writeInt(skillskinlist.size()); //当前全部装备的中的技能皮肤
        //循环发送信息[技能ID] [皮肤ID]
        for (Map.Entry<Integer, Integer> skillskin : skillskinlist.entrySet()) {
            mplew.writeInt(skillskin.getKey());
            mplew.writeInt(skillskin.getValue());
        }

        return mplew.getPacket();
    }

    /*
     * 隐藏或者显示林之灵耳朵和尾巴
     */
    public static byte[] hiddenTailAndEar(int chrId, boolean hiddenTail, boolean hiddenEar) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.HIDDEN_TAIL_ADN_EAR.getValue());
        mplew.writeInt(chrId);
        mplew.write(hiddenTail ? 0 : 1);
        mplew.write(hiddenEar ? 0 : 1);

        return mplew.getPacket();
    }

    /*
     * 其他玩家更换伤害皮肤效果
     */
    public static byte[] showDamageSkin(int chrId, int skinId) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_DAMAGE_SKIN.getValue());
        mplew.writeInt(chrId); //玩家ID
        mplew.writeInt(skinId); //更换的伤害皮肤ID

        return mplew.getPacket();
    }

    /*
    * 装备附魔：放入装备,返回卷轴列表
     */
    public static byte[] getEnchantingScrolls(List<EnchantingScroll> scrolls, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ENCHANTING_OPERATION.getValue());
        mplew.writeShort(mode);
        mplew.write(scrolls.size());
        for (EnchantingScroll scroll : scrolls) {
            mplew.writeInt(scroll.style);
            mplew.writeMapleAsciiString(scroll.name);
            scroll.writePacket(mplew);
            mplew.writeInt(scroll.need);
            mplew.write(scroll.style == 0 ? 1 : 0);
        }
        return mplew.getPacket();
    }

    public static byte[] getEnchantingEnhance(EnchantingScroll enhance, int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ENCHANTING_OPERATION.getValue());
        mplew.writeShort(mode); //后面的byte为1表示失败掉星
        mplew.writeLong(enhance.need);
        mplew.writeInt(enhance.succ);
        mplew.writeInt(enhance.speed);//scroll.speed
        mplew.write(0);
        enhance.writePacket(mplew);
        return mplew.getPacket();
    }

    public static byte[] getEnchantingEnhanceStart(int mode) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ENCHANTING_OPERATION.getValue());
        mplew.writeShort(mode);
        mplew.writeHexString("00 00 4C 82 C6");
        return mplew.getPacket();
    }

    /*
    * 装备附魔：发送强化结果
     */
    public static byte[] getEnchantingResult(int mode, boolean succ, Item toScroll, Item scrolled) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.ENCHANTING_OPERATION.getValue());
        mplew.write(mode);
        if (mode == 0x64) {
            mplew.write(0);
        }
        mplew.writeInt(succ ? 1 : 0);
        if (mode == 0x65) {
            mplew.write(0);
        }
        if (toScroll != null) {
            PacketHelper.addItemInfo(mplew, toScroll);
        }
        if (scrolled != null) {
            PacketHelper.addItemInfo(mplew, scrolled);
        }
        if (mode == 0x65) {
            mplew.writeLong(0);
        }
        return mplew.getPacket();
    }

    public static byte[] getZeroWeaponInfo(int weaponlevel, int level, int weapon1, int weapon2) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_ZERO_WEAPON_INFO.getValue());
        mplew.writeShort(0);
        mplew.writeInt(weaponlevel);
        mplew.writeInt(level);
        mplew.writeInt(weapon1);
        mplew.writeInt(weapon2);
        mplew.write(0);

        return mplew.getPacket();
    }

    public static byte[] getZeroWeaponChangeOptential(int meso, int wp) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_CHANGE_POTENTIAL_MESO.getValue());
        mplew.writeInt(1);
        mplew.writeInt(meso);
        mplew.writeInt(wp);
        mplew.writeShort(1);

        return mplew.getPacket();
    }

    public static byte[] showZeroWeaponChangeOptentialResult(boolean succ) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_CHANGE_POTENTIAL_RESULT.getValue());
        mplew.write(1);
        mplew.writeBool(succ);

        return mplew.getPacket();
    }

    public static byte[] showHyunOptentialResult(boolean result, List<Integer> potids) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SHOW_POTENTIAL_RESULT.getValue());
        mplew.writeShort(result ? 1 : 0);
        mplew.writeInt(0);
        if (!result) {
            mplew.writeInt(potids.size() / 2);
            mplew.writeInt(potids.size());
            for (int potid : potids) {
                mplew.writeInt(potid);
            }
        }

        return mplew.getPacket();
    }
}
