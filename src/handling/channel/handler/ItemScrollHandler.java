/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.channel.handler;

import client.MapleCharacter;
import client.MapleClient;
import client.PlayerStats;
import client.skills.SkillFactory;
import client.inventory.Equip;
import client.inventory.EnchantingScroll;
import client.inventory.Item;
import client.inventory.ItemFlag;
import client.inventory.MapleInventoryType;
import client.inventory.ModifyInventory;
import configs.ServerConfig;
import constants.GameConstants;
import constants.ItemConstants;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import server.MapleInventoryManipulator;
import static server.MapleInventoryManipulator.equip;
import server.MapleItemInformationProvider;
import server.Randomizer;
import server.StructItemOption;
import tools.MaplePacketCreator;
import tools.data.input.LittleEndianAccessor;
import tools.data.output.MaplePacketLittleEndianWriter;
import tools.packet.InventoryPacket;
import tools.packet.PacketHelper;

/**
 * @author PlayDK
 */
public class ItemScrollHandler {

    public static void handlePacket(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr, boolean cash) {
        if (chr == null || chr.getMap() == null) {
            return;
        }
        chr.updateTick(slea.readInt());
        byte slot = (byte) slea.readShort();
        byte dst = (byte) slea.readShort();
        byte ws = 0; //是否使用祝福卷轴
        if (slea.available() >= 3) {
            ws = (byte) slea.readShort();
        }
        //boolean ScrollResult = UseUpgradeScroll(slot, dst, ws, c, chr, 0, cash);
        //c.getSession().write(MaplePacketCreator.showScrollTip(ScrollResult));
        UseUpgradeScroll(slot, dst, ws, c, chr, 0, cash);
    }

    public static boolean UseUpgradeScroll(short slot, short dst, short ws, MapleClient c, MapleCharacter chr, int vegas, boolean cash) {
        boolean whiteScroll = false; //是否使用祝福卷轴
        boolean legendarySpirit = false; //是否使用技能砸卷 V.110后修改无需技能就可以砸卷
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        chr.setScrolledPosition((short) 0);
        if ((ws & 2) == 2) {
            whiteScroll = true;
        }
        Equip toScroll;
        if (dst < 0) {
            toScroll = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem(dst);
        } else {
            legendarySpirit = true;
            toScroll = (Equip) chr.getInventory(MapleInventoryType.EQUIP).getItem(dst);
        }
        if (toScroll == null || c.getPlayer().hasBlockedInventory()) {
            return false;
        }
        byte oldLevel = toScroll.getLevel();
        byte oldEnhance = toScroll.getEnhance();
        byte oldState = toScroll.getState();
        byte oldAddState = toScroll.getAddState();
        short oldFlag = toScroll.getFlag();
        byte oldSlots = toScroll.getUpgradeSlots();
        int oldLimitBreak = toScroll.getLimitBreak();
        byte oldSealedLevel = toScroll.getSealedLevel();

        Item scroll;
        if (cash) {
            scroll = chr.getInventory(MapleInventoryType.CASH).getItem(slot);
        } else {
            scroll = chr.getInventory(MapleInventoryType.USE).getItem(slot);
        }
        if (scroll == null) {
            if (chr.isAdmin()) {
                chr.dropMessage(-9, "砸卷错误: 卷轴道具为空");
            }
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        }
        if (chr.isAdmin()) {
            chr.dropSpouseMessage(0x0A, "砸卷信息: 卷轴ID " + scroll.getItemId() + " 卷轴名字 " + ii.getName(scroll.getItemId()));
        }
        if (!ItemConstants.isSpecialScroll(scroll.getItemId())
                && !ItemConstants.isCleanSlate(scroll.getItemId())
                && !ItemConstants.isEquipScroll(scroll.getItemId())
                && !ItemConstants.isOptentialScroll(scroll.getItemId())
                && !ItemConstants.isOptentialAddScroll(scroll.getItemId())
                && !ItemConstants.isLimitBreakScroll(scroll.getItemId())
                && !ItemConstants.isResetScroll(scroll.getItemId())
                && !ItemConstants.isSealedScroll(scroll.getItemId())) {
            int scrollSlots = ItemConstants.isAzwanScroll(scroll.getItemId()) ? ii.getSlots(scroll.getItemId()) : 1;
            if (toScroll.getUpgradeSlots() < scrollSlots) {
                chr.dropMessage(1, "当前装备可升级次数为: " + toScroll.getUpgradeSlots() + " 成功或失败需要减少: " + scrollSlots + " 的升级次数，请检查该装备是否符合升级条件.");
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        } else if (ItemConstants.isEquipScroll(scroll.getItemId())) {
            if (toScroll.getUpgradeSlots() >= 1 || toScroll.getEnhance() >= 100 || vegas > 0 || ii.isCash(toScroll.getItemId())) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: 强化卷轴检测 装备是否有升级次数: " + (toScroll.getUpgradeSlots() >= 1) + " 装备星级是否大于100星: " + (toScroll.getEnhance() >= 100) + " - " + (vegas > 0) + " 装备是是否为点装: " + (ii.isCash(toScroll.getItemId())));
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
            //检测直接强化到x星的卷轴 必须装备当前为0星才能砸卷
            int forceUpgrade = ii.getForceUpgrade(scroll.getItemId());
            if (forceUpgrade > 1 && toScroll.getEnhance() > 0) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: 强化卷轴检测 forceUpgrade: " + forceUpgrade + " 装备星级: " + toScroll.getEnhance());
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        } else if (ItemConstants.isOptentialScroll(scroll.getItemId())) {
            boolean isSpecialScrollA = scroll.getItemId() / 100 == 20497;
            boolean isSpecialEquip = toScroll.getItemId() / 10000 == 135 || toScroll.getItemId() / 1000 == 1098 || toScroll.getItemId() / 1000 == 1099 || toScroll.getItemId() / 1000 == 1190;
            if ((!isSpecialScrollA && toScroll.getState() >= 1) || (isSpecialScrollA && toScroll.getState() >= 18) || (toScroll.getLevel() == 0 && toScroll.getUpgradeSlots() == 0 && !isSpecialScrollA && !isSpecialEquip) || vegas > 0 || ii.isCash(toScroll.getItemId())) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: isOptentialScroll " + (toScroll.getState() >= 1) + " " + (toScroll.getLevel() == 0 && toScroll.getUpgradeSlots() == 0 && !isSpecialScrollA && !isSpecialEquip) + " " + (vegas > 0) + " " + (ii.isCash(toScroll.getItemId())));
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        } else if (ItemConstants.isOptentialAddScroll(scroll.getItemId())) {
            boolean isA级潜能卷轴 = scroll.getItemId() / 100 == 20497;
            boolean is特殊装备 = toScroll.getItemId() / 10000 == 135 || toScroll.getItemId() / 1000 == 1098 || toScroll.getItemId() / 1000 == 1099 || toScroll.getItemId() / 1000 == 1190;
            if ((toScroll.getLevel() == 0 && toScroll.getUpgradeSlots() == 0 && !isA级潜能卷轴 && !is特殊装备) || vegas > 0 || ii.isCash(toScroll.getItemId()) || toScroll.getAddState() > 0) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: isOptentialAddScroll " + (toScroll.getState() >= 1) + " " + (toScroll.getLevel() == 0 && toScroll.getUpgradeSlots() == 0 && !isA级潜能卷轴 && !is特殊装备) + " " + (vegas > 0) + " " + (ii.isCash(toScroll.getItemId())));
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        } else if (ItemConstants.isSpecialScroll(scroll.getItemId())) {
            //要砸的卷的道具是商城道具或者道具的星级大于等于12星
            int maxEnhance = scroll.getItemId() == 5064003 ? 7 : 12;
            if (ii.isCash(toScroll.getItemId()) || toScroll.getEnhance() >= maxEnhance) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: 特殊卷轴 isCash - " + (ii.isCash(toScroll.getItemId())) + " getEnhance - " + (toScroll.getEnhance() >= maxEnhance) + " 保护星级: " + maxEnhance);
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        } else if (ItemConstants.isLimitBreakScroll(scroll.getItemId())) {
            if (!ItemConstants.isWeapon(toScroll.getItemId()) || (ii.getScrollLimitBreak(scroll.getItemId()) + oldLimitBreak) > 5000000) {
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        } else if (ItemConstants.isSealedScroll(scroll.getItemId())) {
            if (!GameConstants.canSealedLevelUp(toScroll.getItemId(), toScroll.getSealedLevel(), toScroll.getSealedExp())) {
                chr.dropMessage(-9, "砸卷错误: 封印解除经验不足或已经达到最高级，无法解除封印。");
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        }
        if (!ItemConstants.canScroll(toScroll.getItemId()) && !ItemConstants.isChaosScroll(toScroll.getItemId())) {
            if (chr.isAdmin()) {
                chr.dropMessage(-9, "砸卷错误: 卷轴是否能对装备进行砸卷 " + !ItemConstants.canScroll(toScroll.getItemId()) + " 是否混沌卷轴 " + !ItemConstants.isChaosScroll(toScroll.getItemId()));
            }
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        }
        if ((ItemConstants.isCleanSlate(scroll.getItemId()) || ItemConstants.isTablet(scroll.getItemId()) || ItemConstants.isGeneralScroll(scroll.getItemId()) || ItemConstants.isChaosScroll(scroll.getItemId())) && (vegas > 0 || ii.isCash(toScroll.getItemId()))) {
            if (chr.isAdmin()) {
                chr.dropMessage(-9, "砸卷错误: 卷轴是否白衣卷轴 " + ItemConstants.isCleanSlate(scroll.getItemId()) + " isTablet " + ItemConstants.isTablet(scroll.getItemId()));
            }
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        }
        if (ItemConstants.isTablet(scroll.getItemId()) && !ItemConstants.is武器攻击力卷轴(scroll.getItemId()) && toScroll.getDurability() < 0) {
            if (chr.isAdmin()) {
                chr.dropMessage(-9, "砸卷错误: isTablet " + ItemConstants.isTablet(scroll.getItemId()) + " getDurability " + (toScroll.getDurability() < 0));
            }
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        } else if ((!ItemConstants.isTablet(scroll.getItemId()) && !ItemConstants.isOptentialScroll(scroll.getItemId()) && !ItemConstants.isEquipScroll(scroll.getItemId()) && !ItemConstants.isCleanSlate(scroll.getItemId()) && !ItemConstants.isSpecialScroll(scroll.getItemId()) && !ItemConstants.isOptentialAddScroll(scroll.getItemId()) && !ItemConstants.isChaosScroll(scroll.getItemId())) && toScroll.getDurability() >= 0 && !ItemConstants.is随机攻击卷轴(scroll.getItemId())) {
            if (chr.isAdmin()) {
                chr.dropMessage(-9, "砸卷错误: !isTablet ----- 1");
            }
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        } else if (scroll.getItemId() == 2049405 && !ItemConstants.is真觉醒冒险之心(toScroll.getItemId())) { //2049405 - 真·觉醒冒险之心专用潜能力卷轴 - 不会扣除使用卷轴的次数，会赋予真·觉醒冒险之心项链专用潜在能力。\n#c只有真·冒险之心项链可以使用。#\n成功率 100%
            chr.dropMessage(1, "该卷轴只能对真·觉醒冒险之心使用。");
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        }
        Item wscroll = null;
        // 骗子卷轴什么的 有些道具只能砸特定的卷轴
        List<Integer> scrollReqs = ii.getScrollReqs(scroll.getItemId());
        if (scrollReqs != null && scrollReqs.size() > 0 && !scrollReqs.contains(toScroll.getItemId())) {
            if (chr.isAdmin()) {
                chr.dropMessage(-9, "砸卷错误: 特定卷轴只能对指定的卷轴进行砸卷.");
            }
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        }
        if (whiteScroll) {
            wscroll = chr.getInventory(MapleInventoryType.USE).findById(2340000); //祝福卷轴
            if (wscroll == null) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: 使用祝福卷轴 但祝福卷轴信息为空.");
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                whiteScroll = false;
            }
        }
        if (ItemConstants.isTablet(scroll.getItemId()) || ItemConstants.isGeneralScroll(scroll.getItemId())) {
            switch (scroll.getItemId() % 1000 / 100) {
                case 0: //1h
                    if (ItemConstants.isTwoHanded(toScroll.getItemId()) || !ItemConstants.isWeapon(toScroll.getItemId())) {
                        if (chr.isAdmin()) {
                            chr.dropMessage(-9, "砸卷错误: 最后检测 --- 0");
                        }
                        c.getSession().write(InventoryPacket.getInventoryFull());
                        return false;
                    }
                    break;
                case 1: //2h
                    if (!ItemConstants.isTwoHanded(toScroll.getItemId()) || !ItemConstants.isWeapon(toScroll.getItemId())) {
                        if (chr.isAdmin()) {
                            chr.dropMessage(-9, "砸卷错误: 最后检测 --- 1");
                        }
                        c.getSession().write(InventoryPacket.getInventoryFull());
                        return false;
                    }
                    break;
                case 2: //armor
                    if (ItemConstants.isAccessory(toScroll.getItemId()) || ItemConstants.isWeapon(toScroll.getItemId())) {
                        if (chr.isAdmin()) {
                            chr.dropMessage(-9, "砸卷错误: 最后检测 --- 2");
                        }
                        c.getSession().write(InventoryPacket.getInventoryFull());
                        return false;
                    }
                    break;
                case 3: //accessory
                    if (!ItemConstants.isAccessory(toScroll.getItemId()) || ItemConstants.isWeapon(toScroll.getItemId())) {
                        if (chr.isAdmin()) {
                            chr.dropMessage(-9, "砸卷错误: 最后检测 --- 3");
                        }
                        c.getSession().write(InventoryPacket.getInventoryFull());
                        return false;
                    }
                    break;
            }
        } else if (!ItemConstants.isAccessoryScroll(scroll.getItemId()) && !ItemConstants.isChaosScroll(scroll.getItemId()) && !ItemConstants.isCleanSlate(scroll.getItemId()) && !ItemConstants.isEquipScroll(scroll.getItemId()) && !ItemConstants.isOptentialScroll(scroll.getItemId()) && !ItemConstants.isOptentialAddScroll(scroll.getItemId()) && !ItemConstants.isSpecialScroll(scroll.getItemId()) && !ItemConstants.isLimitBreakScroll(scroll.getItemId()) && !ItemConstants.isResetScroll(scroll.getItemId()) && !ItemConstants.is随机攻击卷轴(scroll.getItemId()) && !ItemConstants.isSealedScroll(scroll.getItemId())) {
            if (!ii.canScroll(scroll.getItemId(), toScroll.getItemId())) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: 砸卷的卷轴无法对装备进行砸卷");
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        }
        if (ItemConstants.isAccessoryScroll(scroll.getItemId()) && !ItemConstants.isAccessory(toScroll.getItemId())) {
            if (chr.isAdmin()) {
                chr.dropMessage(-9, "砸卷错误: 卷轴为配置卷轴 但砸卷的装备不是配饰");
            }
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        }
        if (scroll.getQuantity() <= 0) {
            chr.dropSpouseMessage(0x0B, "砸卷错误，背包卷轴[" + ii.getName(scroll.getItemId()) + "]数量为 0 .");
            c.getSession().write(InventoryPacket.getInventoryFull());
            return false;
        }
        if (legendarySpirit && vegas == 0) {
            if (chr.getSkillLevel(SkillFactory.getSkill(PlayerStats.getSkillByJob(1003, chr.getJob()))) <= 0 && ServerConfig.MAPLE_VERSION < 110) {
                if (chr.isAdmin()) {
                    chr.dropMessage(-9, "砸卷错误: 检测是否技能砸卷 角色没有拥有技能");
                }
                c.getSession().write(InventoryPacket.getInventoryFull());
                return false;
            }
        }
        Equip scrolled = (Equip) ii.scrollEquipWithId(toScroll, scroll, whiteScroll, chr, vegas);
        Equip.ScrollResult scrollSuccess;
        if (scrolled == null) { //如果返回的砸卷后的道具为空
            if (ItemFlag.装备防爆.check(oldFlag)) { //检测未砸卷前是否有防爆效果
                scrolled = toScroll;
                scrollSuccess = Equip.ScrollResult.失败;
                scrolled.removeFlag((short) ItemFlag.装备防爆.getValue());
                chr.dropSpouseMessage(0x0B, "由于卷轴的效果，物品没有损坏。");
            } else if (ItemConstants.isAdvancedEquipScroll(scroll.getItemId())) {
                scrollSuccess = Equip.ScrollResult.失败;
            } else {
                scrollSuccess = Equip.ScrollResult.消失;
            }
        } else {
            if ((scroll.getItemId() / 100 == 20497 && scrolled.getState() == 1) || scrolled.getLevel() > oldLevel || scrolled.getEnhance() > oldEnhance || scrolled.getState() > oldState || scrolled.getFlag() > oldFlag || scrolled.getAddState() > oldAddState || scrolled.getLimitBreak() > oldLimitBreak || scrolled.getSealedLevel() > oldSealedLevel) {
                scrollSuccess = Equip.ScrollResult.成功;
            } else if (ItemConstants.isCleanSlate(scroll.getItemId()) && scrolled.getUpgradeSlots() > oldSlots) {
                scrollSuccess = Equip.ScrollResult.成功;
            } else if (ItemConstants.isResetScroll(scroll.getItemId()) && scrolled != toScroll) {
                scrollSuccess = Equip.ScrollResult.成功;
            } else {
                scrollSuccess = Equip.ScrollResult.失败;
            }
            //如果砸卷后道具不为空 就清除防爆卷轴状态 且道具不为白衣和特殊卷轴
            if (ItemFlag.装备防爆.check(oldFlag) && !ItemConstants.isCleanSlate(scroll.getItemId()) && !ItemConstants.isSpecialScroll(scroll.getItemId())) {
                scrolled.removeFlag((short) ItemFlag.装备防爆.getValue());
            }
            //如果是管理员
            if (chr.isIntern()) {
                scrolled.addFlag((short) ItemFlag.CRAFTED.getValue());
                scrolled.setOwner(chr.getName());
            }
        }
        //装备带有保护卷轴不消失的效果
        if (ItemFlag.卷轴防护.check(oldFlag)) {
            if (scrolled != null) {
                scrolled.removeFlag((short) ItemFlag.卷轴防护.getValue());
            }
            if (scrollSuccess == Equip.ScrollResult.成功) {
                chr.getInventory(ItemConstants.getInventoryType(scroll.getItemId())).removeItem(scroll.getPosition(), (short) 1, false); //删除卷轴信息
            } else {
                chr.dropSpouseMessage(0x0B, "由于卷轴的效果，卷轴" + ii.getName(scroll.getItemId()) + "没有消失。");
            }
        } else {
            chr.getInventory(ItemConstants.getInventoryType(scroll.getItemId())).removeItem(scroll.getPosition(), (short) 1, false); //删除卷轴信息
        }
        if (whiteScroll) { //祝福卷轴
            MapleInventoryManipulator.removeFromSlot(c, MapleInventoryType.USE, wscroll.getPosition(), (short) 1, false, false);
        } else if (scrollSuccess == Equip.ScrollResult.失败 && scrolled.getUpgradeSlots() < oldSlots && chr.getInventory(MapleInventoryType.CASH).findById(5640000) != null) {
            chr.setScrolledPosition(scrolled.getPosition());
            if (vegas == 0) {
                c.getSession().write(MaplePacketCreator.pamSongUI());
            }
        }
        List<ModifyInventory> mods = new ArrayList<>();
        mods.add(new ModifyInventory(scroll.getQuantity() > 0 ? 1 : 3, scroll)); //更新卷轴信息 [1 = 更新卷轴数量 3 = 删除卷轴]
        if (scrollSuccess == Equip.ScrollResult.消失) {
            mods.add(new ModifyInventory(3, toScroll)); //删除装备
            if (dst < 0) {
                chr.getInventory(MapleInventoryType.EQUIPPED).removeItem(toScroll.getPosition());
            } else {
                chr.getInventory(MapleInventoryType.EQUIP).removeItem(toScroll.getPosition());
            }
        } else if (vegas == 0) {
            mods.add(new ModifyInventory(3, scrolled)); //删除装备
            mods.add(new ModifyInventory(0, scrolled)); //获得装备
        }
        c.getSession().write(InventoryPacket.modifyInventory(true, mods, chr));
        chr.getMap().broadcastMessage(chr, InventoryPacket.getScrollEffect(chr.getId(), scrollSuccess, legendarySpirit, whiteScroll, scroll.getItemId(), toScroll.getItemId()), vegas == 0);
        if (dst < 0 && (scrollSuccess == Equip.ScrollResult.成功 || scrollSuccess == Equip.ScrollResult.消失) && vegas == 0) {
            chr.equipChanged();
        }
        chr.finishActivity(120102);
        if (scrolled != null && scrolled.getEnhance() > oldEnhance && scrolled.getEnhance() > 35) {
            chr.getClient().getChannelServer().startMapEffect(chr.getName() + "成功将" + ii.getName(scrolled.getItemId()) + "强化至 " + scrolled.getEnhance() + "星！", 5120037);
        }
        return scrollSuccess == Equip.ScrollResult.成功;
    }

    public static void UseEquipEnchanting(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        int mode = slea.readByte();
        switch (mode) {
            case 0:
            case 1: {
                chr.updateTick(slea.readInt());
                short slot = slea.readShort();
                Item toScroll = chr.getInventory(slot < 0 ? MapleInventoryType.EQUIPPED : MapleInventoryType.EQUIP).getItem(slot);
                EnchantingScroll scroll;
                if (mode == 0)
                    scroll = MapleItemInformationProvider.getInstance().getEnchantingScrolls(ItemConstants.getEnchantingEquipType(toScroll.getItemId())).get(slea.readInt());
                else
                    scroll = MapleItemInformationProvider.getInstance().getEnchantingEnhanceInfo(ItemConstants.getEnchantingEquipType(toScroll.getItemId()), ((Equip) toScroll).getEnhance() + 1);

                if (mode == 1 && scroll == null) {
                    chr.dropMessage(6, "目前只能强化到" + ((Equip) toScroll).getEnhance() + "星，后续星级属性调整中。");
                    chr.dropMessage(-12, "目前只能强化到" + ((Equip) toScroll).getEnhance() + "星，后续星级属性调整中。");
                    c.getSession().write(InventoryPacket.getEnchantingResult(0x65, false, toScroll, toScroll));
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }

                if (chr.getItemQuantity(mode == 0 ? 4001832 : 4001839) < scroll.need) {
                    chr.dropMessage(1, (mode == 0 ? "咒语痕迹" : "星星") + "数量不足，无法使用此卷轴强化。");
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                Item oldToScroll = toScroll.copy();
                Equip scrolled = (Equip) UseEquipEnchanting_toScroll(chr, toScroll, scroll, mode == 0);
                List<ModifyInventory> mods = new ArrayList<>();
                mods.add(new ModifyInventory(3, oldToScroll)); //删除装备
                if (scrolled != null)
                    mods.add(new ModifyInventory(0, scrolled)); //获得装备
                c.getSession().write(InventoryPacket.modifyInventory(true, mods, chr));
                MapleInventoryManipulator.removeById(c, MapleInventoryType.ETC, mode == 0 ? 4001832 : 4001839, (short) scroll.need, false, false);
                c.getSession().write(InventoryPacket.getEnchantingResult(0x64 + mode, scrolled != null && (mode == 0 ? (scrolled.getLevel() > ((Equip) oldToScroll).getLevel()) : (scrolled.getEnhance() > ((Equip) oldToScroll).getEnhance())), oldToScroll, scrolled));
                break;
            }
            case 0x32: {// 请求装备附魔的卷轴列表
                int slot = slea.readInt();
                Item toScroll = chr.getInventory(slot < 0 ? MapleInventoryType.EQUIPPED : MapleInventoryType.EQUIP).getItem((short) slot);
                c.getSession().write(InventoryPacket.getEnchantingScrolls(MapleItemInformationProvider.getInstance().getEnchantingScrolls(ItemConstants.getEnchantingEquipType(toScroll.getItemId())), mode));
                break;
            }
            case 0x34: {// 请求装备附魔的星级属性
                int slot = slea.readInt();
                Item toScroll = chr.getInventory(slot < 0 ? MapleInventoryType.EQUIPPED : MapleInventoryType.EQUIP).getItem((short) slot);
                EnchantingScroll es = MapleItemInformationProvider.getInstance().getEnchantingEnhanceInfo(ItemConstants.getEnchantingEquipType(toScroll.getItemId()), ((Equip) toScroll).getEnhance() + 1);
                if (es == null) {
                    c.dropMessage("获取装备附魔的星级属性错误。");
                    c.getSession().write(MaplePacketCreator.enableActions());
                    return;
                }
                c.getSession().write(InventoryPacket.getEnchantingEnhance(es, mode));
                break;
            }
            case 0x35: {// 星级附魔的强化开始
                c.getSession().write(InventoryPacket.getEnchantingEnhanceStart(mode));
                break;
            }
        }
    }
 
    public static Item UseEquipEnchanting_toScroll(MapleCharacter chr, Item toScroll, EnchantingScroll scroll, boolean isScroll) {
        Equip nEquip = (Equip) toScroll;
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
//        System.out.println("装备id" + (Equip) toScroll);
          System.out.println("失败保持率" + scroll.speed);
//          System.out.println("数组小于成功率" + Randomizer.nextInt(isScroll ? 100 : 1000));
//          System.out.println("掉星率小于600" + Randomizer.nextInt(isScroll ? 200 : 1000));
//          System.out.println("isScroll" + isScroll);
//          System.out.println("装备损坏率600" + Randomizer.nextInt(isScroll ? 300 : 1000));
          
       
            
          //System.out.println("随机数" + Randomizer.nextInt(1000));
        boolean succ = false;
          List<ModifyInventory> mods = new ArrayList<>();
            boolean removeItem = false;
        //boolean passoff= false;
        if (Randomizer.nextInt(isScroll ? 100 : 1000) < scroll.succ) {
            if (scroll.watk > 0) {
                nEquip.setWatk((short) (nEquip.getWatk() + scroll.watk));
            }
            if (scroll.matk > 0) {
                nEquip.setMatk((short) (nEquip.getMatk() + scroll.matk));
            }
            if (scroll.str > 0) {
                nEquip.setStr((short) (nEquip.getStr() + scroll.str));
            }
            if (scroll.dex > 0) {
                nEquip.setDex((short) (nEquip.getDex() + scroll.dex));
            }
            if (scroll.int_ > 0) {
                nEquip.setInt((short) (nEquip.getInt() + scroll.int_));
            }
            if (scroll.luk > 0) {
                nEquip.setLuk((short) (nEquip.getLuk() + scroll.luk));
            }
            if (scroll.wdef > 0) {
                nEquip.setWdef((short) (nEquip.getWdef() + scroll.wdef));
            }
            if (scroll.mdef > 0) {
                nEquip.setMdef((short) (nEquip.getMdef() + scroll.mdef));
            }
            if (scroll.maxhp > 0) {
                nEquip.setHp((short) (nEquip.getHp() + scroll.maxhp));
            }
            if (scroll.maxmp > 0) {
                nEquip.setMp((short) (nEquip.getMp() + scroll.maxmp));
            }
            if (scroll.acc > 0) {
                nEquip.setAcc((short) (nEquip.getAcc() + scroll.acc));
            }
            if (scroll.avoid > 0) {
                nEquip.setAvoid((short) (nEquip.getAvoid() + scroll.avoid));
            }
            if (scroll.jump > 0) {
                nEquip.setJump((short) (nEquip.getJump() + scroll.jump));
            }
            if (scroll.speed > 0) {
                nEquip.setSpeed((short) (nEquip.getSpeed() + scroll.speed));
            }
            if (isScroll)
                nEquip.setLevel((byte) (nEquip.getLevel() + 1));
            else
                nEquip.setEnhance((byte) (nEquip.getEnhance() + 1));

            succ = true;
        } else if (nEquip.getEnhance() != 10 && nEquip.getEnhance() != 15 && nEquip.getEnhance() != 20 && Randomizer.nextInt(1000) < scroll.speed ) {// && scroll.passoff > 0 && Randomizer.nextInt(1000) < scroll.passoff

             
            if (scroll.watk > 0) {
                nEquip.setWatk((short) (nEquip.getWatk() - scroll.watk));
            }
            if (scroll.matk > 0) {
                nEquip.setMatk((short) (nEquip.getMatk() - scroll.matk));
            }
            if (scroll.str > 0) {
                nEquip.setStr((short) (nEquip.getStr() - scroll.str));
            }
            if (scroll.dex > 0) {
                nEquip.setDex((short) (nEquip.getDex() - scroll.dex));
            }
            if (scroll.int_ > 0) {
                nEquip.setInt((short) (nEquip.getInt() - scroll.int_));
            }
            if (scroll.luk > 0) {
                nEquip.setLuk((short) (nEquip.getLuk() - scroll.luk));
            }
            if (scroll.wdef > 0) {
                nEquip.setWdef((short) (nEquip.getWdef() - scroll.wdef));
            }
            if (scroll.mdef > 0) {
                nEquip.setMdef((short) (nEquip.getMdef() - scroll.mdef));
            }
            if (scroll.maxhp > 0) {
                nEquip.setHp((short) (nEquip.getHp() - scroll.maxhp));
            }
            if (scroll.maxmp > 0) {
                nEquip.setMp((short) (nEquip.getMp() - scroll.maxmp));
            }
            if (scroll.acc > 0) {
                nEquip.setAcc((short) (nEquip.getAcc() - scroll.acc));
            }
            if (scroll.avoid > 0) {
                nEquip.setAvoid((short) (nEquip.getAvoid() - scroll.avoid));
            }
            if (scroll.jump > 0) {
                nEquip.setJump((short) (nEquip.getJump() - scroll.jump));
            }
            if (scroll.speed > 0) {
                nEquip.setSpeed((short) (nEquip.getSpeed() - scroll.speed));
            }
            if (isScroll)
                nEquip.setLevel((byte) (nEquip.getLevel() - 1));
            else
                nEquip.setEnhance((byte) (nEquip.getEnhance() - 1));
            
        }else if(Randomizer.nextInt(isScroll ? 200 : 1000) > scroll.speed){
            chr.dropMessage(1, "很幸运，装备没有掉级！！！");
            
        }
else if(!isScroll&& nEquip.getEnhance() > 14){
                chr.dropMessage(1, "很遗憾，装备已损坏！！！");
                chr.getInventory(MapleInventoryType.EQUIP).removeItem(nEquip.getPosition());
     //return null;
       }

        if (isScroll) {
            short oldFlag = nEquip.getFlag();
            if (ItemFlag.保护升级次数.check(oldFlag)) {
                nEquip.setFlag((short) (oldFlag - ItemFlag.保护升级次数.getValue()));
                if (succ) {
                    nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() - 1));
                }
                chr.dropSpouseMessage(0x0B, succ ? "装备附魔成功，装备失去保护卷轴效果。" : "由于卷轴的效果，升级次数没有减少。");
            } else {
                nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() - 1));
            }
        }
        return nEquip;
    }

    public static void ChangeWeaponOptential(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        slea.skip(4);
        int mode = slea.readByte();
        if (mode == 1) {
            Item lazuliItem = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
            Item lapisItem = chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
            int level = (int) (Math.floor(chr.getLevel() / 10) * 10 + 10);
            c.getSession().write(InventoryPacket.getZeroWeaponInfo(lazuliItem.getItemId() % 10, level, Math.min(1562007, lazuliItem.getItemId() + 1), Math.min(1572007, lapisItem.getItemId() + 1)));
            c.getSession().write(InventoryPacket.getZeroWeaponChangeOptential(100000, 600));
        }
    }

    public static void ChangeWeaponOptential_WP(LittleEndianAccessor slea, MapleClient c, MapleCharacter chr) {
        if (chr.getWeaponPoint() < 600 || chr.getMeso() < 100000) {
            chr.dropMessage(1, "金币或WP不足，无法更改潜能。");
            return;
        }
        Equip lazuliItem = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
        Equip lapisItem = (Equip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);

        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        //开始重置潜能属性
        //int stateRate = chr.getClient().getChannelServer().getStateRate();
        //lazuliItem.renewOptential(0, chr.isAdmin() ? 99 : stateRate);
        List<List<StructItemOption>> opts = new LinkedList<>(ii.getAllOptentialInfo().values());
        int reqLevel = ii.getReqLevel(lazuliItem.getItemId()) / 10;
        int new_state = Math.abs(lazuliItem.getOptential1());
        if (new_state > 20 || new_state < 17) {
            new_state = 17;
        }
        int lines = 3;
        while (lazuliItem.getState() != new_state) {
            for (int i = 0; i < lines; i++) { //最小 2 条, 最大 3 条
                boolean rewarded = false;
                while (!rewarded) {
                    StructItemOption opt = opts.get(Randomizer.nextInt(opts.size())).get(reqLevel);
                    if (opt != null && opt.reqLevel / 10 <= reqLevel && !GameConstants.isAboveA(opt.opID) && GameConstants.optionTypeFits(opt.optionType, lazuliItem.getItemId()) && GameConstants.optionTypeFitsX(opt.opID, lazuliItem.getItemId()) && GameConstants.optentialIDFits(opt.opID, 17, 1) && GameConstants.isBlockedOptential(lazuliItem, opt.opID, true, false)) { //optionType
                        if (i == 0) {
                            lazuliItem.setOptential1(opt.opID);
                        } else if (i == 1) {
                            lazuliItem.setOptential2(opt.opID);
                        } else if (i == 2) {
                            lazuliItem.setOptential3(opt.opID);
                        }
                        rewarded = true;
                    }
                }
            }
        }
        lapisItem.setOptential1(lazuliItem.getOptential1());
        lapisItem.setOptential2(lazuliItem.getOptential2());
        lapisItem.setOptential3(lazuliItem.getOptential3());
        List<ModifyInventory> mods = new ArrayList<>();
        mods.add(new ModifyInventory(3, lazuliItem)); //删除装备
        mods.add(new ModifyInventory(3, lapisItem)); //删除装备
        mods.add(new ModifyInventory(0, lazuliItem)); //获得装备
        mods.add(new ModifyInventory(0, lapisItem)); //获得装备
        c.getSession().write(InventoryPacket.modifyInventory(true, mods, chr));
        chr.gainWeaponPoint(-600);
     
        chr.gainMeso(-100000, false);
        chr.dropSpouseMessage(0x0C, "潜能被变更了。");
        c.getSession().write(InventoryPacket.showZeroWeaponChangeOptentialResult(true));
    }
}
