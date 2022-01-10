/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package constants;

import client.inventory.MapleInventoryType;
import client.inventory.MapleWeaponType;

/**
 * @author PlayDK
 */
public class ItemConstants {

    public static boolean isHarvesting(int itemId) {
        return itemId >= 1500000 && itemId < 1520000;
    }

    public static boolean is飞镖道具(int itemId) {
        return itemId / 10000 == 207;
    }

    public static boolean is子弹道具(int itemId) {
        return itemId / 10000 == 233;
    }

    public static boolean is徽章(int itemid) {
        return itemid / 10000 == 118;
    }

    public static boolean is纹章(int itemid) {
        return itemid / 10000 == 119;
    }

    public static boolean isRechargable(int itemId) {
        return is飞镖道具(itemId) || is子弹道具(itemId);
    }

    public static boolean isOverall(int itemId) {
        return itemId / 10000 == 105;
    }

    public static boolean isPet(int itemId) {
        return itemId / 10000 == 500;
    }

    public static boolean is弩矢道具(int itemId) {
        return itemId >= 2061000 && itemId < 2062000;
    }

    public static boolean is弓矢道具(int itemId) {
        return itemId >= 2060000 && itemId < 2061000;
    }

    public static boolean isMagicWeapon(int itemId) {
        int type = itemId / 10000;
        return type == 137 || type == 138 || type == 121;
    }

    /*
     * 检测装备是否是武器
     * 夜光武器: 1212000 开始
     * 萝莉武器: 1222000 开始
     * 双弩武器: 1522000 - 1522054
     * 火炮武器: 1532000 - 1532058
     * 复仇武器: 1232000 - 1232056
     * 尖兵武器: 1242000 - 1242059
     * 驯兽武器: 1252000 - 1252063
     */
    public static boolean isWeapon(int itemId) {
        if (itemId == 1342069) { //空气刃 双刀副手 点装道具
            return false;
        }
        return itemId >= 1300000 && itemId < 1560000 || itemId / 1000 == 1212 || itemId / 1000 == 1222 || itemId / 1000 == 1232 || itemId / 1000 == 1242 || itemId / 1000 == 1252 || itemId / 1000 == 1262;
    }

    public static MapleInventoryType getInventoryType(int itemId) {
        byte type = (byte) (itemId / 1000000);
        if (type < 1 || type > 5) {
            return MapleInventoryType.UNDEFINED;
        }
        return MapleInventoryType.getByType(type);
    }

    public static MapleWeaponType getWeaponType(int itemId) {
        int cat = itemId / 10000;
        cat = cat % 100;
        switch (cat) {
            case 21:
                return MapleWeaponType.双头杖;
            case 22:
                return MapleWeaponType.灵魂手铳;
            case 23:
                return MapleWeaponType.亡命剑;
            case 24:
                return MapleWeaponType.能量剑;
            case 25:
                return MapleWeaponType.驯兽魔法棒;
            case 30:
                return MapleWeaponType.单手剑;
            case 31:
                return MapleWeaponType.单手斧;
            case 32:
                return MapleWeaponType.单手钝器;
            case 33:
                return MapleWeaponType.短刀;
            case 34:
                return MapleWeaponType.双刀副手;
            case 35:
                return MapleWeaponType.特殊副手;
            case 36:
                return MapleWeaponType.手杖;
            case 37:
                return MapleWeaponType.短杖;
            case 38:
                return MapleWeaponType.长杖;
            case 40:
                return MapleWeaponType.双手剑;
            case 41:
                return MapleWeaponType.双手斧;
            case 42:
                return MapleWeaponType.双手钝器;
            case 43:
                return MapleWeaponType.枪;
            case 44:
                return MapleWeaponType.矛;
            case 45:
                return MapleWeaponType.弓;
            case 46:
                return MapleWeaponType.弩;
            case 47:
                return MapleWeaponType.拳套;
            case 48:
                return MapleWeaponType.指节;
            case 49:
                return MapleWeaponType.短枪;
            case 52:
                return MapleWeaponType.双弩枪;
            case 53:
                return MapleWeaponType.手持火炮;
            case 54:
                return MapleWeaponType.武士刀;
            case 56:
                return MapleWeaponType.大剑;
            case 57:
                return MapleWeaponType.太刀;
        }
        //System.out.println("Found new Weapon: " + cat + " ItemId: " + itemId);
        return MapleWeaponType.没有武器;
    }

    public static final boolean isCap(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 0;
    }

    public static final boolean isCape(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 10;
    }

    public static final boolean isCoat(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 4;
    }

    public static final boolean isGlove(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 8;
    }

    public static final boolean isLongcoat(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 5;
    }

    public static final boolean isPants(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 6;
    }

    public static boolean isShield(final int itemId) {
        int cat = itemId / 10000;
        cat = cat % 100;
        return cat == 9;
    }

    public static final boolean isShoes(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 7;
    }

    // 护肩
    public static final boolean isShoulders(final int itemId) {
        int cat = itemId / 10000;
        cat %= 100;
        return cat == 15;
    }

    public static boolean isEquip(int itemId) {
        return itemId / 1000000 == 1;
    }

    public static boolean isCleanSlate(int itemId) {
        return itemId / 100 == 20490;
    }

    public static boolean isAccessoryScroll(int itemId) {
        return itemId / 100 == 20492;
    }

    public static boolean isChaosScroll(int itemId) {
        if (itemId >= 2049105 && itemId <= 2049110) {
            return false;
        }
        return itemId / 100 == 20491;
    }

    public static boolean isLimitBreakScroll(int itemId) {
        return itemId / 100 == 26140;
    }

    public static int getChaosNumber(int itemId) {
        switch (itemId) {
            case 2049116: //2049116 - 强化混沌卷轴 - 随机变换装备的属性。不能用于现金道具。\n成功率：60%
                return 10;
            case 2049119: //2049119 - 惊人混沌卷轴 - 和混沌卷轴相比，可以把装备当前属性变得更好或更坏。不能用于现金道具。\n成功率：60%
            case 2049132: //2049132 - 惊人混沌卷轴30% - 将装备的当前属性调整的比混沌卷轴更好或更坏。
            case 2049133: //2049133 - 惊人混沌卷轴50% - 将装备的当前属性调整的比混沌卷轴更好或更坏。
            case 2049134: //2049134 - 惊人混沌卷轴70% - 将装备的当前属性调整的比混沌卷轴更好或更坏。
                return 8;
            case 2049135: //2049135 - 惊人正义混沌卷轴 20% - 可不降低装备的当前属性，将装备的当前属性调整的比混沌卷轴更好或更坏。现金道具无法使用。
            case 2049136: //2049136 - 惊人正义混沌卷轴 20% - 可不降低装备的当前属性，将装备的当前属性调整的比混沌卷轴更好或更坏。现金道具无法使用。
            case 2049137: //2049137 - 惊人正义混沌卷轴 40% - 可不降低装备的当前属性，将装备的当前属性调整的比混沌卷轴更好或更坏。现金道具无法使用。
                return 7;
            default:
                return 5;
        }
    }

    public static boolean isChaosForGoodness(int itemId) {
        if (!isChaosScroll(itemId)) {
            return false;
        }
        switch (itemId) {
            case 2049122: //2049122 - 正向混沌卷轴 - 可以使装备的属性变得更好。无法用于现金物品。
            case 2049124: //2049124 - 正向混沌卷轴 - 可以使装备的属性变得更好。无法用于现金物品。
            case 2049127: //2049127 - 冒险勇士的肯定混沌卷轴 5% - 在不减少冒险勇士防具当前属性的前提下重新调整。
            case 2049129: //2049129 - 正义混沌卷轴 50% - 可不降低装备的当前属性，进行再调节。现金道具无法使用。
            case 2049130: //2049130 - 正义混沌卷轴 30% - 可不降低装备的当前属性，进行再调节。现金道具无法使用。
            case 2049131: //2049131 - 正义混沌卷轴 20% - 可不降低装备的当前属性，进行再调节。现金道具无法使用。
            case 2049135: //2049135 - 惊人正义混沌卷轴 20% - 可不降低装备的当前属性，将装备的当前属性调整的比混沌卷轴更好或更坏。现金道具无法使用。
            case 2049136: //2049136 - 惊人正义混沌卷轴 20% - 可不降低装备的当前属性，将装备的当前属性调整的比混沌卷轴更好或更坏。现金道具无法使用。
            case 2049137: //2049137 - 惊人正义混沌卷轴 40% - 可不降低装备的当前属性，将装备的当前属性调整的比混沌卷轴更好或更坏。现金道具无法使用。
            case 2049140: //
            case 2049155: //2049155 - 惊人正义混沌卷轴 50% - 可不降低装备的当前属性，将装备的当前属性调整的比混沌卷轴更好或更坏。现金道具无法使用。
                return true;
        }
        return false;
    }

    public static boolean isEquipScroll(int scrollId) {
        return scrollId / 100 == 20493;
    }

    public static boolean isAdvancedEquipScroll(int scrollId) {
        return scrollId == 2049323;
    }

    /*
     * 还原卷轴
     */
    public static boolean isResetScroll(int scrollId) {
        return scrollId / 100 == 20496;
    }

    public static boolean isOptentialScroll(int scrollId) {
        return scrollId / 100 == 20494 || scrollId / 100 == 20497 || scrollId == 5534000;
    }

    public static boolean isOptentialAddScroll(int scrollId) {
        switch (scrollId) {
            case 2048305: //附加潜能附加卷轴 - 不减少可升级次数，为装备增加附加潜能。\n#c只能用于没有附加潜能的道具#
            case 2048306: //特殊附加潜能附加古卷 - 不减少可升级次数，为装备增加附加潜能#c3个#。\n#c只能用于没有附加潜能的道具#
            case 2048307: //特殊附加潜能附加卷轴 - 不减少可升级次数，为装备增加附加潜能。 \n#c只能用于没有附加潜能的道具#
            case 2048308: //附加潜能附加卷轴 - 不减少可升级次数，为装备增加附加潜能。 \n#c只能用于没有附加潜能的道具#
            case 2048309: //附加潜能附加卷轴 - 不减少可升级次数，为装备增加附加潜能。 \n#c只能用于没有附加潜能的道具#
            case 2048310: //附加潜能附加卷轴 - 不减少可升级次数，为装备增加附加潜能。 \n#c只能用于没有附加潜能的道具#
            case 2048314: //附加潜能附加卷轴 - 可以在不扣减升级次数的情况下，在装备道具上增加附加潜能。\n#c只能在拥有带有潜能，但没有附加潜能的道具上使用#
            case 2048315: //特殊附加潜能卷轴 - 可以在不扣减升级次数的情况下，在装备道具上增加附加潜能。\n#c只能在拥有带有潜能，但没有附加潜能的道具上使用#
                return true;
        }
        return false;
    }

    public static boolean is真觉醒冒险之心(int itemId) {
        switch (itemId) {
            case 1122122: //真·觉醒冒险之心 - (无描述)
            case 1122123: //真·觉醒冒险之心 - (无描述)
            case 1122124: //真·觉醒冒险之心 - (无描述)
            case 1122125: //真·觉醒冒险之心 - (无描述)
            case 1122126: //真·觉醒冒险之心 - (无描述)
                return true;
        }
        return false;
    }

    public static boolean isSpecialScroll(int scrollId) {
        switch (scrollId) {
            case 2040727: //鞋子防滑卷轴 - 给鞋子增加防滑功能.成功率:10%, 对强化次数没有影响
            case 2041058: //披风防寒卷轴 - 给披肩增加防寒功能.成功率:10%, 对强化次数没有影响
            case 2530000: //幸运日卷轴 - 使接下去使用的卷轴的成功率提高10%。潜能附加卷轴、强化卷轴无效
            case 2530001: //快乐日幸运卷轴 - 使接下去使用的卷轴的成功率提高10%。对潜能附加卷轴、强化卷轴无效
            case 2531000: //防爆卷轴 - 在装备物品上使用，可以在使用卷轴失败时防止装备物品损坏，仅限1次。但是使用卷轴成功时，防御效果也会消失，强化12星以上的物品无法使用
            case 5063100: //幸运保护之盾 - 保护物品，以及提升成功概率的魔法卷轴。在装备物品上使用，可以提升使用卷轴的成功率10%，并且可以防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，魔法卷轴效果也会随之消失，#c强化12星以上的物品无法使用#。
            case 5064000: //防爆卷轴 - 保护物品的魔法盾。在装备物品上使用，可以在使用卷轴失败时防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失，#c强化12星以上的物品无法使用。# \n可以和#c安全之盾、复原之盾#一起使用。
            case 5064003: //极真保护之盾 - #极真道具专用#防爆卷轴。用在极真装备后，可以在使用卷轴失败时防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失，#c强化7星以上的物品无法使用。# \n可以和#c保护卷轴、卷轴防护卷轴#一起使用。
            case 5064100: //保护卷轴 - 保护物品的魔法盾。在装备物品上使用，可以在使用卷轴失败时防止装备物品#c可升级次数#减少，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失。\n可以和#c安全之盾、复原之盾#一起使用。
            case 5064200: //完美还原卷轴 - 除了潜在能力的其他属性都#c初始化#为标准能力值，只能使用在装备道具,如果是成长性道具可以复原为成长之前的状态。
            case 5064300: //卷轴防护卷轴 - 卷轴使用失败时，可以保护卷轴不消失的魔法防护卷轴. \n使用在装备道具上时 #c添加一次保护机会#，如果卷轴使用失败时#c使用的卷轴不会消失#。但是,卷轴使用成功时也会消耗保护效果。\n可以和#c保护卷轴,防爆卷轴#一起使用。
            case 5068100: //宠物专用保护卷轴 - 可保护道具的魔法盾。对 #c宠物装备#使用后可在使用卷轴失败时不减少装备道具的#c强化次数#,#c只限1次#。 但是使用卷轴成功时，防御效果也会消失。\n可以和#c安全之盾、复原之盾#一起使用。
            case 5068200: //宠物专用卷轴防护卷轴 - 卷轴使用失败时，可以保护卷轴不消失的魔法防护卷轴. \n使用在#c宠物装备道具#上时 #c添加一次保护机会#，如果卷轴使用失败时#c使用的卷轴不会消失#。但是,卷轴使用成功时也会消耗保护效果。\n可以和#c保护卷轴,防爆卷轴#一起使用。
                return true;
        }
        return false;
    }

    public static boolean isAzwanScroll(int scrollId) {
        switch (scrollId) {
            case 2046060: //阿斯旺单手武器攻击力卷轴 - 为单手武器增加攻击力属性。\n成功率：60%，物理攻击力+4，消耗升级次数2
            case 2046061: //阿斯旺单手武器攻击力卷轴 - 为单手武器增加攻击力属性。\n成功率：50%，物理攻击力+6，消耗升级次数3
            case 2046062: //阿斯旺单手武器攻击力卷轴 - 为单手武器增加攻击力属性。\n成功率：40%，物理攻击力+8，消耗升级次数4
            case 2046063: //阿斯旺单手武器攻击力卷轴 - 为单手武器增加攻击力属性。\n成功率：30%，物理攻击力+10，消耗升级次数5
            case 2046064: //阿斯旺单手武器攻击力卷轴 - 为单手武器增加攻击力属性。\n成功率：20%，物理攻击力+12，消耗升级次数6

            case 2046065: //阿斯旺单手武器魔力卷轴 - 为单手武器增加魔法攻击力属性。\n成功率：60%，魔法攻击力+4，消耗升级次数2
            case 2046066: //阿斯旺单手武器魔力卷轴 - 为单手武器增加魔法攻击力属性。\n成功率：50%，魔法攻击力+6，消耗升级次数3
            case 2046067: //阿斯旺单手武器魔力卷轴 - 为单手武器增加魔法攻击力属性。\n成功率：40%，魔法攻击力+8，消耗升级次数4
            case 2046068: //阿斯旺单手武器魔力卷轴 - 为单手武器增加魔法攻击力属性。\n成功率：30%，魔法攻击力+10，消耗升级次数5
            case 2046069: //阿斯旺单手武器魔力卷轴 - 为单手武器增加魔法攻击力属性。\n成功率：20%，魔法攻击力+12，消耗升级次数6

            case 2046141: //阿斯旺双手武器攻击力卷轴 - 为双手武器增加攻击力属性。\n成功率：60%，物理攻击力+4，消耗升级次数2
            case 2046142: //阿斯旺双手武器攻击力卷轴 - 为双手武器增加攻击力属性。\n成功率：50%，物理攻击力+6，消耗升级次数3
            case 2046143: //阿斯旺双手武器攻击力卷轴 - 为双手武器增加攻击力属性。\n成功率：40%，物理攻击力+8，消耗升级次数4
            case 2046144: //阿斯旺双手武器攻击力卷轴 - 为双手武器增加攻击力属性。\n成功率：30%，物理攻击力+10，消耗升级次数5
            case 2046145: //阿斯旺双手武器攻击力卷轴 - 为双手武器增加攻击力属性。\n成功率：20%，物理攻击力+12，消耗升级次数6

            case 2046519: //阿斯旺防具力量卷轴 - 为防具增加力量属性。\n成功率：60%，力量+6，消耗升级次数3
            case 2046520: //阿斯旺防具力量卷轴 - 为防具增加力量属性。\n成功率：50%，力量+8，消耗升级次数4
            case 2046521: //阿斯旺防具力量卷轴 - 为防具增加力量属性。\n成功率：40%，力量+10，消耗升级次数5
            case 2046522: //阿斯旺防具敏捷卷轴 - 为防具增加敏捷属性。\n成功率：60%，敏捷+6，消耗升级次数3
            case 2046523: //阿斯旺防具敏捷卷轴 - 为防具增加敏捷属性。\n成功率：50%，敏捷+8，消耗升级次数4
            case 2046524: //阿斯旺防具敏捷卷轴 - 为防具增加敏捷属性。\n成功率：40%，敏捷+10，消耗升级次数5
            case 2046525: //阿斯旺防具智力卷轴 - 为防具增加智力属性。\n成功率：60%，智力+6，消耗升级次数3
            case 2046526: //阿斯旺防具智力卷轴 - 为防具增加智力属性。\n成功率：50%，智力+8，消耗升级次数4
            case 2046527: //阿斯旺防具智力卷轴 - 为防具增加智力属性。\n成功率：40%，智力+10，消耗升级次数5
            case 2046528: //阿斯旺防具运气卷轴 - 为防具增加运气属性。\n成功率：60%，运气+6，消耗升级次数3
            case 2046529: //阿斯旺防具运气卷轴 - 为防具增加运气属性。\n成功率：50%，运气+8，消耗升级次数4
            case 2046530: //阿斯旺防具运气卷轴 - 为防具增加运气属性。\n成功率：40%，运气+10，消耗升级次数5

            case 2046701: //阿斯旺饰品力量卷轴 - 为饰品增加力量属性。\n成功率：60%，力量+6，消耗升级次数3
            case 2046702: //阿斯旺饰品力量卷轴 - 为饰品增加力量属性。\n成功率：50%，力量+8，消耗升级次数4
            case 2046703: //阿斯旺饰品力量卷轴 - 为饰品增加力量属性。\n成功率：40%，力量+10，消耗升级次数5
            case 2046704: //阿斯旺饰品敏捷卷轴 - 为饰品增加敏捷属性。\n成功率：60%，敏捷+6，消耗升级次数3
            case 2046705: //阿斯旺饰品敏捷卷轴 - 为饰品增加敏捷属性。\n成功率：50%，敏捷+8，消耗升级次数4
            case 2046706: //阿斯旺饰品敏捷卷轴 - 为饰品增加敏捷属性。\n成功率：40%，敏捷+10，消耗升级次数5
            case 2046707: //阿斯旺饰品智力卷轴 - 为饰品增加智力属性。\n成功率：60%，智力+6，消耗升级次数3
            case 2046708: //阿斯旺饰品智力卷轴 - 为饰品增加智力属性。\n成功率：50%，智力+8，消耗升级次数4
            case 2046709: //阿斯旺饰品智力卷轴 - 为饰品增加智力属性。\n成功率：40%，智力+10，消耗升级次数5
            case 2046710: //阿斯旺饰品运气卷轴 - 为饰品增加运气属性。\n成功率：60%，运气+6，消耗升级次数3
            case 2046711: //阿斯旺饰品运气卷轴 - 为饰品增加运气属性。\n成功率：50%，运气+8，消耗升级次数4
            case 2046712: //阿斯旺饰品运气卷轴 - 为饰品增加运气属性。\n成功率：40%，运气+10，消耗升级次数5
                return true;
        }
        return false;
    }

    public static boolean is回城卷轴(int id) {
        return id >= 2030000 && id < 2040000;
    }

    public static boolean is升级卷轴(int id) {
        return id >= 2040000 && id < 2050000;
    }

    public static boolean is短枪道具(int id) {
        return id >= 1492000 && id < 1500000;
    }

    public static boolean isUse(int id) {
        return id >= 2000000 && id < 3000000;
    }

    public static boolean is怪物召唤包(int id) {
        return id / 10000 == 210;
    }

    public static boolean is怪物卡片(int id) {
        return id / 10000 == 238;
    }

    public static boolean isBoss怪物卡(int id) {
        return id / 1000 >= 2388;
    }

    public static int getCardShortId(int id) {
        return id % 10000;
    }

    public static boolean is强化宝石(int id) {
        return id >= 4250000 && id <= 4251402;
    }

    public static boolean isOtherGem(int id) {
        switch (id) {
            case 4001174: //练习用鞋子
            case 4001175: //儿童鞋
            case 4001176: //作业用铲子
            case 4001177: //白色棉T恤
            case 4001178: //沙滩鞋
            case 4001179: //训练用光线枪
            case 4001180: //外出用手套
            case 4001181: //连指手套
            case 4001182: //清扫用拖把
            case 4001183: //修炼服
            case 4001184: //结实的耙子
            case 4001185: //温暖的皮靴
            case 4001186: //王的头巾
            case 4031980: //黄金砧子
            case 2041058: //披风防寒卷轴
            case 2040727: //鞋子防滑卷轴
            case 1032062: //元素耳环
            case 4032334: //狼的生命水
            case 4032312: //红珠玉
            case 1142156: //龙神
            case 1142157: //传说中的龙神
                return true; //mostly quest items
        }
        return false;
    }

    public static boolean isNoticeItem(int itemId) {

        switch (itemId) {
            case 1012438:// Lv160:// 漩涡文身(无描述)
            case 1022211:// Lv160:// 漩涡眼镜(无描述)
            case 1032224:// Lv160:// 漩涡耳环(无描述)
            case 1122269:// Lv160:// 漩涡吊坠(无描述)
            case 1132247:// Lv160:// 漩涡腰带(无描述)
            case 1152160:// Lv160:// 漩涡护肩(无描述)
            case 1003976:// Lv160:// 漩涡帽子(无描述)
            case 1102623:// Lv160:// 漩涡披风(无描述)
            case 1082556:// Lv160:// 漩涡手套(无描述)
            case 1052669:// Lv160:// 漩涡皇家外套(无描述)
            case 1072870:// Lv160:// 漩涡鞋(无描述)
            case 1212089:// Lv160:// 漩涡双头杖(无描述)
            case 1222084:// Lv160:// 漩涡灵魂手铳(无描述)
            case 1232084:// Lv160:// 漩涡恶魔剑(无描述)
            case 1242090:// Lv160:// 漩涡锁链剑(无描述)
            case 1302297:// Lv160:// 漩涡剑(无描述)
            case 1312173:// Lv160:// 漩涡斧(无描述)
            case 1322223:// Lv160:// 漩涡锤(无描述)
            case 1332247:// Lv160:// 漩涡匕首(无描述)
            case 1342090:// Lv160:// 漩涡刀(无描述)
            case 1362109:// Lv160:// 漩涡手杖(无描述)
            case 1372195:// Lv160:// 漩涡短杖(无描述)
            case 1382231:// Lv160:// 漩涡长杖(无描述)
            case 1402220:// Lv160:// 漩涡双手剑(无描述)
            case 1412152:// Lv160:// 漩涡双手战斧(无描述)
            case 1422158:// Lv160:// 漩涡巨锤(无描述)
            case 1432187:// Lv160:// 漩涡矛(无描述)
            case 1442242:// Lv160:// 漩涡戟(无描述)
            case 1452226:// Lv160:// 漩涡弓(无描述)
            case 1462213:// Lv160:// 漩涡弩(无描述)
            case 1472235:// Lv160:// 漩涡拳甲(无描述)
            case 1482189:// Lv160:// 漩涡冲拳(无描述)
            case 1492199:// Lv160:// 漩涡手铳(无描述)
            case 1522113:// Lv160:// 漩涡双翼短杖(无描述)
            case 1532118:// Lv160:// 漩涡手炮(无描述)
            case 1252033:// Lv160:// 漩涡虎梳魔法棒(无描述)
            case 1312065:// Lv140:// 狮心勇士斧(无描述)
            case 1322096:// Lv140:// 狮心震雷钉(无描述)
            case 1402095:// Lv140:// 狮心战斗弯刀(无描述)
            case 1412065:// Lv140:// 狮心战斗斧(无描述)
            case 1422066:// Lv140:// 狮心巨锤(无描述)
            case 1432086:// Lv140:// 狮心长枪(无描述)
            case 1442116:// Lv140:// 狮心矛(无描述)
            case 1232014:// Lv140:// 狮心痛苦命运(无描述)
            case 1302152:// Lv140:// 狮心弯刀(无描述)
            case 1212014:// Lv140:// 龙尾黑甲凶灵(无描述)
            case 1372084:// Lv140:// 龙尾精灵短杖(无描述)
            case 1382104:// Lv140:// 龙尾战斗长杖(无描述)
            case 1452111:// Lv140:// 鹰翼组合弓(无描述)
            case 1462099:// Lv140:// 鹰翼重弩(无描述)
            case 1522018:// Lv140:// 龙翼巨弩枪(无描述)
            case 1242042:// Lv140:// 渡鸦之魂女王意志之剑(无描述)
            case 1332130:// Lv140:// 渡鸦之魂短刀(无描述)
            case 1222014:// Lv140:// 鲨齿灵魂汲取者(无描述)
            case 1242014:// Lv140:// 鲨齿女王意志之剑(无描述)
            case 1482084:// Lv140:// 鲨齿巨鹰爪(无描述)
            case 1492085:// Lv140:// 鲨齿锐利手铳(无描述)
            case 1532018:// Lv140:// 鲨齿火焰炮(无描述)
            case 1152108:// Lv140:// 狮心战斗护肩(无描述)
            case 1152110:// Lv140:// 龙尾法师护肩(无描述)
            case 1152111:// Lv140:// 鹰翼哨兵护肩(无描述)
            case 1152112:// Lv140:// 渡鸦之魂猎人护肩(无描述)
            case 1152113:// Lv140:// 鲨齿船长护肩(无描述)
            case 1003172:// Lv140:// 狮心战斗头盔(无描述)
            case 1003173:// Lv140:// 龙尾法师帽子(无描述)
            case 1003174:// Lv140:// 鹰翼哨兵便帽(无描述)
            case 1003175:// Lv140:// 渡鸦之魂追踪者帽(无描述)
            case 1003176:// Lv140:// 鲨齿船长帽(无描述)
            case 1102275:// Lv140:// 狮心战斗披风(无描述)
            case 1102276:// Lv140:// 龙尾法师披风(无描述)
            case 1102277:// Lv140:// 鹰翼哨兵披风(无描述)
            case 1102278:// Lv140:// 渡鸦之魂猎人披风(无描述)
            case 1102279:// Lv140:// 鲨齿船长披风(无描述)
            case 1082295:// Lv140:// 狮心战斗护腕(无描述)
            case 1082296:// Lv140:// 龙尾法师手套(无描述)
            case 1082297:// Lv140:// 鹰翼哨兵手套(无描述)
            case 1082298:// Lv140:// 渡鸦之魂追踪者手套(无描述)
            case 1082299:// Lv140:// 鲨齿船长手套(无描述)
            case 1052314:// Lv140:// 狮心战斗锁子甲(无描述)
            case 1052315:// Lv140:// 龙尾法师长袍(无描述)
            case 1052316:// Lv140:// 鹰翼哨兵服(无描述)
            case 1052317:// Lv140:// 渡鸦之魂追踪者盔甲(无描述)
            case 1052318:// Lv140:// 鲨齿船长外套(无描述)
            case 1072485:// Lv140:// 狮心战斗鞋(无描述)
            case 1072486:// Lv140:// 龙尾法师鞋(无描述)
            case 1072487:// Lv140:// 鹰翼哨兵鞋(无描述)
            case 1072488:// Lv140:// 渡鸦之魂追踪者鞋(无描述)
            case 1072489:// Lv140:// 鲨齿船长鞋(无描述)
            case 1112915:// Lv0:// 蓝调戒指
            case 1112793:// Lv0:// 快乐指环
            case 5062000:// 神奇魔方
            case 5062002:// 高级神奇魔方
            case 2340000:// 祝福卷轴
            case 5062500:// 大师附加神奇魔方
            case 2614000:// 突破一万之石
            case 2614001:// 突破十万之石
            case 2614002:// 突破百万之石
            case 2614003:// 突破一万之石
            case 2614004:// 突破十万之石
            case 2614005:// 突破百万之石
            case 2614006:// 突破一万之石
            case 2614007:// 突破十万之石
            case 2614008:// 突破百万之石
            case 2614009:// 突破一万之石
            case 2614010:// 突破十万之石
            case 2614011:// 突破百万之石
            case 2614012:// 突破一万之石
            case 2614013:// 突破十万之石
            case 2614014:// 突破百万之石
            case 2614015:// 突破一万之石
            case 2614016:// 突破十万之石
            case 2614017:// 突破百万之石
            case 2431738:// 抵用券500商品券
            case 2431739:// 抵用券1000商品券
            case 2431740:// 抵用券1500商品券
            case 2431741:// 抵用券3000商品券
            case 2431742:// 抵用券4000商品券
            case 2431743:// 抵用券10000商品券
//            case 4021011: //纯洁灵魂的火花 - 锻造重生装备时的必要材料。
//            case 4021012: //强烈灵魂的净水 - 锻造永恒装备时的必要材料。
//            case 4020013: //梦碎片 - 充满了梦的碎片。
//            case 4021019: //梦之石 - 黑魔法师的梦凝聚而成的石头
//            case 4021020: //混沌碎片 - 含有黑暗混沌力量的金属。打猎140级以上怪物时，有非常低的概率可以获得。
//            case 4021021: //贤者之石 - 含有炼金术的精髓的矿物。乍一看像是液体。分解105级以上装备时偶尔可以发现。
//            case 4021022: //太初精髓 - 含有世界起源时期的纯粹气息的神秘石头。运气好的话，可以在跳动的心脏和金色花堆中发现。
//            case 4310015: //斗神证物 - 战争之神送给勇敢者的证物。可以感觉到未知的力量。
//
//            case 2430112: //神奇魔方碎片 - 从神奇魔方上掉落的碎块。双击使用物品，可以交换有用的东西。
//            case 2028061: //不可思议的卷轴卷 - 使用后封印解除，变成卷轴。谁也不知道会变成什么卷轴。
//            case 2028062: //不可思议的配方卷 - 使用后封印解除，变成配方。谁也不知道会变成什么配方。
//            case 2290285: //[能手册]神秘能手册 - 使用后可以变成特定技能能手册的神秘能手册。
                return true;
            default:
                return false;
        }
    }

    /*
     * 2048200 - 低级潜能附加印章 - #c双击#后，对开放潜能的道具使用，有一定概率开放1个附加潜能。无法对已开放附加潜能的道具使用。
     * 2048201 - 中级潜能附加印章 - #c双击#后，对开放潜能的道具使用，有一定概率开放1个附加潜能。无法对已开放附加潜能的道具使用。
     * 2048202 - 高级潜能附加印章 - #c双击#后，对开放潜能的道具使用，有一定概率开放1个附加潜能。无法对已开放附加潜能的道具使用。
     * 2048203 - 特殊潜能附加印章 - #c双击#后，对开放潜能的道具使用，有一定概率开放1个附加潜能。无法对已开放附加潜能的道具使用。
     * 2048204 - 最高级潜能附加印章 - #c双击#后，对开放潜能的道具使用，有一定概率开放1个附加潜能。无法对已开放附加潜能的道具使用。
     * 2048300 - 银光潜能附加印章 - #c双击#后，对开放潜能的道具使用，有一定概率开放1个附加潜能。#c每个装备最多开放2个#附加潜能，2次附加潜能只能通过在开放了1个附加潜能的道具上使用金色潜能附加印章和银色潜能附加印章的方法开放。附加潜在属性无法用于未鉴定状态的道具。
     * 2048301 - 金光潜能附加印章 - #c双击#后，对开放潜能的道具使用，有一定概率开放1个附加潜能。#c每个装备最多开放2个#附加潜能，2次附加潜能只能通过在开放了1个附加潜能的道具上使用金色潜能附加印章和银色潜能附加印章的方法开放。附加潜在属性无法用于未鉴定状态的道具。
     * 2048302 - 金色附加刻印之印 - #c双击#后在附加潜能开放了2个以下的道具上使用，可以增加1个附加潜能。
     * 2048303 - 银色附加刻印之印 - #c双击#后在附加潜能开放了2个以下的道具上使用，可以增加1个附加潜能。
     * 2048304 - 完美附加刻印之印 - #c双击#后在附加潜能开放了2个以下的道具上使用，可以增加1个附加潜能。
     */
    public static int getAdditionalSuccess(int itemId) {
        if (itemId == 2048200) {
            return 5;
        } else if (itemId == 2048201 || itemId == 2048202) {
            return 10;
        } else if (itemId == 2048203) {
            return 100;
        } else if (itemId == 2048204) {
            return 20;
        } else if (itemId == 2048300 || itemId == 2048303) {
            return 60;
        } else if (itemId == 2048301 || itemId == 2048302) {
            return 80;
        } else if (itemId == 2048304) {
            return 100;
        }
        return 0;
    }

    /*
     * 星岩系统
     */
    public static int getNebuliteGrade(int id) {
        if (id / 10000 != 306) {
            return -1;
        }
        if (id >= 3060000 && id < 3061000) {
            return 0; //[D]级星岩
        } else if (id >= 3061000 && id < 3062000) {
            return 1; //[C]级星岩
        } else if (id >= 3062000 && id < 3063000) {
            return 2; //[B]级星岩
        } else if (id >= 3063000 && id < 3064000) {
            return 3; //[A]级星岩
        }
        return 4; //[S]级星岩
    }

    public static boolean is机甲装备(int itemId) {
        return itemId >= 1610000 && itemId < 1660000;
    }

    public static boolean is龙龙装备(int itemId) {
        return itemId >= 1940000 && itemId < 1980000; //194 = 面罩, 195 = 吊坠, 196 = 飞翼, 197 = 尾巴
    }

    /*
     * 是否能砸卷的装备
     * itemId / 100000
     * 16 为机械装备和安卓装备
     * 19 为龙龙装备
     * 1672030 - 能量全开触发器 Plus 1
     * 1672031 - 无限能量全开触发器
     * 1672032 - 能量全开触发器 Plus 2
     */
    public static boolean canScroll(int itemId) {
        return itemId / 100000 != 19 && itemId / 100000 != 16 || (itemId / 1000 == 1672 && itemId != 1672030 && itemId != 1672031 && itemId != 1672032);
    }

    /*
     * 是否能上金锤子的装备
     */
    public static boolean canHammer(int itemId) {
        switch (itemId) {
            case 1122000: //黑龙项环
            case 1122076: //进阶黑暗龙王项链
                return false;
        }
        return canScroll(itemId);
    }

    public static int getLowestPrice(int itemId) {
        switch (itemId) {
            case 2340000: //祝福卷轴
            case 2531000: //防爆卷轴
            case 2530000: //幸运日卷轴
                return 50000000;
        }
        return -1;
    }

    public static int getModifier(int itemId, int up) {
        if (up <= 0) {
            return 0;
        }
        switch (itemId) {
            case 2022459: //星缘的奖励1
            case 2860179:
            case 2860193:
            case 2860207:
                return 130;
            case 2022460: //佳佳的报答1
            case 2022462: //佳佳的报答3
            case 2022730: //丰收的冬天
                return 150;
            case 2860181:
            case 2860195:
            case 2860209:
                return 200;
        }
        if (itemId / 10000 == 286) { //familiars
            return 150;
        }
        return 200;
    }

    public static short getSlotMax(int itemId) {
        switch (itemId) {
            case 4030003: //俄罗斯方块
            case 4030004: //俄罗斯方块
            case 4030005: //俄罗斯方块
                return 1;
            case 4001168: //金枫叶
            case 4031306:
            case 4031307:
            case 3993000: //吉祥装饰
            case 3993002: //竹子吉祥装饰
            case 3993003: //红色福袋
                return 100;
            case 5220010: //高级快乐百宝券
            case 5220013:
                return 1000;
            case 5220020:
                return 2000;
        }
        return 0;
    }

    public static boolean isDropRestricted(int itemId) {
        return itemId == 3012000
                || itemId == 4030004 //俄罗斯方块
                || itemId == 1052098 //海盗套装
                || itemId == 1052202;//玩具品克缤套服
    }

    public static boolean isPickupRestricted(int itemId) {
        return itemId == 4030003 //俄罗斯方块
                || itemId == 4030004; //俄罗斯方块
    }

    public static short getStat(int itemId, int def) {
        switch (itemId) {
            case 1002419: //枫叶帽
                return 5;
            case 1002959:
                return 25;
            case 1142002: //任务狂人勋章
                return 10;
            case 1122121:
                return 7;
        }
        return (short) def;
    }

    public static short getHpMp(int itemId, int def) {
        switch (itemId) {
            case 1122121:
                return 500;
            case 1142002: //任务狂人勋章
            case 1002959:
                return 1000;
        }
        return (short) def;
    }

    public static short getATK(int itemId, int def) {
        switch (itemId) {
            case 1122121:
                return 3;
            case 1002959:
                return 4;
            case 1142002: //任务狂人勋章
                return 9;
        }
        return (short) def;
    }

    public static short getDEF(int itemId, int def) {
        switch (itemId) {
            case 1122121:
                return 250;
            case 1002959:
                return 500;
        }
        return (short) def;
    }

    public static int getRewardPot(int itemid, int closeness) {
        switch (itemid) {
            case 2440000: //道具橘子宝宝
                switch (closeness / 10) {
                    case 0:
                    case 1:
                    case 2:
                        return 2028041 + (closeness / 10);
                    case 3:
                    case 4:
                    case 5:
                        return 2028046 + (closeness / 10);
                    case 6:
                    case 7:
                    case 8:
                        return 2028049 + (closeness / 10);
                }
                return 2028057; //非常甜美的果实
            case 2440001: //道具钻石宝宝
                switch (closeness / 10) {
                    case 0:
                    case 1:
                    case 2:
                        return 2028044 + (closeness / 10);
                    case 3:
                    case 4:
                    case 5:
                        return 2028049 + (closeness / 10);
                    case 6:
                    case 7:
                    case 8:
                        return 2028052 + (closeness / 10);
                }
                return 2028060; //非常灿烂的钻石
            case 2440002: //福满月妙
                return 2028069; //可爱的福满月妙
            case 2440003: //迷你西瓜盆景
                return 2430278; //黄金枫叶果实
            case 2440004: //第一个西瓜花盆
                return 2430381; //第一个佳佳牌西瓜
            case 2440005: //第二个西瓜花盆
                return 2430393; //第二个佳佳牌西瓜
        }
        return 0;
    }

    /*
     * 是否是需要记录日志的道具
     */
    public static boolean isLogItem(int itemId) {
        switch (itemId) {
            case 4000463: // 国庆纪念币
            case 2340000: // 祝福卷轴
            case 2049000: // 白医卷轴
            case 2049001: // 白医卷轴
            case 2049002: // 白医卷轴
            case 2040006: // 诅咒白医卷轴
            case 2040007: // 诅咒白医卷轴
            case 2040303: // 耳环智力必成卷
            case 2040403: // 上衣防御必成卷
            case 2040506: // 全身盔甲敏捷必成卷
            case 2040507: // 全身盔甲防御必成卷
            case 2040603: // 裤裙防御必成卷
            case 2040709: // 鞋子敏捷必成卷
            case 2040710: // 鞋子跳跃必成卷
            case 2040711: // 鞋子速度必成卷
            case 2040806: // 手套敏捷必成卷
            case 2040903: // 盾牌防御必成卷
            case 2041024: // 披风魔法防御必成卷
            case 2041025: // 披风物理防御必成卷
            case 2043003: // 单手剑攻击必成卷
            case 2043103: // 单手斧攻击必成卷
            case 2043203: // 单手钝器攻击必成卷
            case 2043303: // 短剑攻击必成卷
            case 2043703: // 短杖攻击必成卷
            case 2043803: // 长杖攻击必成卷
            case 2044003: // 双手剑攻击必成卷
            case 2044103: // 双手斧攻击必成卷
            case 2044203: // 双手钝器攻击必成卷
            case 2044303: // 枪攻击必成卷
            case 2044403: // 矛攻击必成卷
            case 2044503: // 弓攻击必成卷
            case 2044603: // 弩攻击必成卷
            case 2044908: // 短枪攻击必成卷
            case 2044815: // 指节攻击必成卷
            case 2044019: // 双手剑魔力必成卷
            case 2044703: // 拳套攻击必成卷
                return true;
        }
        return false;
    }

    /*
     * 内在能力系统
     */
    public static final int[] rankC = {70000000, 70000001, 70000002, 70000003, 70000004, 70000005, 70000006, 70000007, 70000008, 70000009, 70000010, 70000011, 70000012, 70000016,70000013};
    public static final int[] rankB = {70000014, 70000015,70000016, 70000017, 70000018, 70000021, 70000022, 70000023, 70000024, 70000025, 70000026};
    public static final int[] rankA = {70000027, 70000028, 70000029, 70000030, 70000031, 70000032, 70000033, 70000034, 70000035, 70000036};
    public static final int[] rankS = {70000048, 70000049, 70000050, 70000051, 70000052, 70000053, 70000054, 70000055, 70000056, 70000057, 70000058, 70000059, 70000060, 70000061, 70000062};
    public static final int[] circulators = {2700000, 2700100, 2700200, 2700300, 2700400, 2700500, 2700600, 2700700, 2700800, 2700900, 2701000};
    public static final int[] rankBlock = {
        //70000016, //攻击速度提升 - rankB
        70000037, //阿斯旺解放战，攻击塔时，伤害增加x% - rankA
        70000038, //攻击解放战补给模式的普通怪物时，有x%的概率造成一击必杀效果 - rankA
        70000039, //攻击昏迷，黑暗，冻结的状态异常对象时，伤害增加x% - rankA
        70000040, //命中值提升伤害 - 根据物理命中值和魔法命中值中较高数值的x%，增加格外伤害 - rankA
        70000041, //物防提升伤害 - 增加物理防御力的x%的伤害 - rankA
        70000042, //魔防提升伤害 - 增加魔法防御力的x%的伤害 - rankA
        70000043, //受到魔攻减少伤害 - 受到魔法攻击时，无视相当于物理防御力x%的伤害 - rankS
        70000044, //受到物功减少伤害 - 受到物理攻击时，无视相当于魔法防御力x%的伤害 - rankS
        70000045, //有一定概率无冷却时间 - 使用技能后，有x%概率无冷却时间。使用无冷却时间的技能时无效。 - rankS
        70000046, //被动技能等级加1 - 被动技能的技能等级增加1级。但对既有主动效果，又有被动效果的技能无效。 - rankS
        70000047, //增加群功技能对象数 - 群攻技能的攻击对象数量增加1 - rankS
    };

    public static int[] getInnerSkillbyRank(int rank) {
        if (rank == 0) {
            return rankC;
        } else if (rank == 1) {
            return rankB;
        } else if (rank == 2) {
            return rankA;
        } else if (rank == 3) {
            return rankS;
        } else {
            return null;
        }
    }

    public static boolean isTablet(int itemId) {
        return itemId / 1000 == 2047;
    }

    public static boolean isGeneralScroll(int itemId) {
        return itemId / 1000 == 2046;
    }

    public static int getSuccessTablet(int scrollId, int level) {
        if (scrollId % 1000 / 100 == 2) { //2047_2_00 = armor, 2047_3_00 = accessory
            switch (level) {
                case 0:
                    return 70;
                case 1:
                    return 55;
                case 2:
                    return 43;
                case 3:
                    return 33;
                case 4:
                    return 26;
                case 5:
                    return 20;
                case 6:
                    return 16;
                case 7:
                    return 12;
                case 8:
                    return 10;
                default:
                    return 7;
            }
        } else if (scrollId % 1000 / 100 == 3) {
            switch (level) {
                case 0:
                    return 70;
                case 1:
                    return 35;
                case 2:
                    return 18;
                case 3:
                    return 12;
                default:
                    return 7;
            }
        } else {
            switch (level) {
                case 0:
                    return 70;
                case 1:
                    return 50; //-20
                case 2:
                    return 36; //-14
                case 3:
                    return 26; //-10
                case 4:
                    return 19; //-7
                case 5:
                    return 14; //-5
                case 6:
                    return 10; //-4
                default:
                    return 7;  //-3
            }
        }
    }

    public static int getCurseTablet(int scrollId, int level) {
        if (scrollId % 1000 / 100 == 2) { //2047_2_00 = armor, 2047_3_00 = accessory
            switch (level) {
                case 0:
                    return 10;
                case 1:
                    return 12;
                case 2:
                    return 16;
                case 3:
                    return 20;
                case 4:
                    return 26;
                case 5:
                    return 33;
                case 6:
                    return 43;
                case 7:
                    return 55;
                case 8:
                    return 70;
                default:
                    return 100;
            }
        } else if (scrollId % 1000 / 100 == 3) {
            switch (level) {
                case 0:
                    return 12;
                case 1:
                    return 18;
                case 2:
                    return 35;
                case 3:
                    return 70;
                default:
                    return 100;
            }
        } else {
            switch (level) {
                case 0:
                    return 10;
                case 1:
                    return 14; //+4
                case 2:
                    return 19; //+5
                case 3:
                    return 26; //+7
                case 4:
                    return 36; //+10
                case 5:
                    return 50; //+14
                case 6:
                    return 70; //+20
                default:
                    return 100;  //+30
            }
        }
    }

    public static boolean isAccessory(int itemId) {
        return (itemId >= 1010000 && itemId < 1040000) || (itemId >= 1122000 && itemId < 1153000) || (itemId >= 1112000 && itemId < 1113000);
    }
 public static boolean isPetEquip(int itemid) {
        return itemid / 10000 == 180;
    }
    public static boolean isRing(int itemId) {
        return itemId >= 1112000 && itemId < 1113000;
    }// 112xxxx - pendants, 113xxxx - belts

    //if only there was a way to find in wz files -.-
    public static boolean isEffectRing(int itemid) {
        return is好友戒指(itemid) || is恋人戒指(itemid) || is结婚戒指(itemid);
    }

    public static boolean is结婚戒指(int itemId) {
        switch (itemId) {
            case 1112300: //月长石戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112301: //月长石戒指2克拉 -  爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112302: //月长石戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112303: //闪耀新星戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112304: //闪耀新星戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112305: //闪耀新星戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112306: //金心戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112307: //金心戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112308: //金心戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112309: //银翼戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112310: //银翼戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112311: //银翼戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指将会#c消失#。
            case 1112312: //永恒真爱戒指 - 使恋人的心灵相通的神奇纪念戒指，祝福相爱的人们永远幸福！冒险岛，永远有真爱！\n\n#c结婚的2人#同时佩戴，靠近时会有#c相爱一生#的效果。\n但如果#c离婚#了，真爱戒指可能会#c消失#。
            case 1112315: //恩爱夫妻结婚戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
            case 1112316: //恩爱夫妻结婚戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
            case 1112317: //恩爱夫妻结婚戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
            case 1112318: //鸳鸯夫妻结婚戒指1克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
            case 1112319: //鸳鸯夫妻结婚戒指2克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
            case 1112320: //鸳鸯夫妻结婚戒指3克拉 - 爱情与婚姻的象征。\n注：结婚人士如果#c离婚#，该戒指可能会#c消失#。
            case 1112804: //中式结婚戒指 - 表示夫妻之间爱情的戒指。\n#c中式结婚，2012绝版纪念。#
                return true;
        }
        return false;
    }

    public static boolean is好友戒指(int itemId) {
        switch (itemId) {
            case 1112800: //四叶挚友戒指
            case 1112801: //雏菊挚友戒指
            case 1112802: //闪星挚友戒指
            case 1112810: //圣诞夜响叮当
            case 1112811: //圣诞华丽派对
            case 1112812: //我的麻吉好友
            case 1112817: //蝴蝶挚友戒指30天权

            case 1049000: //友情T恤
                return true;
        }
        return false;
    }

    public static boolean is恋人戒指(int itemId) {
        switch (itemId) {
            case 1112001: //恋人戒指
            case 1112002: //纯爱恋人戒指
            case 1112003: //丘比特戒指
            case 1112005: //维纳斯戒指
            case 1112006: //圣十字架戒指
            case 1112007: //许愿情侣戒指
            case 1112012: //红玫瑰戒指
            case 1112013: //爱情红线戒指
            case 1112014: //热吻情侣戒指
            case 1112015: //白金戒指
            case 1112816: //雪晶球戒指 -- 以前是放在好友里面的
            case 1112820: //龙凤呈祥戒指 - 两个相配的异性角色站在一起会出现龙凤呈祥效果。

            case 1048000: //情侣T恤
            case 1048001: //兔兔情侣衫
            case 1048002: //胡萝卜情侣衫
                return true;
        }
        return false;
    }

    /*
     * 是否为副手武器 也就是盾牌
     */
//    public static boolean isSubWeapon(int itemId) {
//        switch (itemId / 10000) {
//            case 135:
//        }
//        return true;
//    }
     public static boolean isSubWeapon(int itemId) {
        return itemId / 10000 == 135 && itemId == 1092049;
    }

    public static boolean is双刀主手(int itemId) {
        return itemId / 10000 == 133;
    }

    public static boolean is双刀副手(int itemId) {
        return itemId / 10000 == 134 && itemId != 1342069; //1342069 - 空气刃 - 可以装备在暗影双刀副武器#c刀#上的透明利刃。
    }

    public static boolean is双弩箭矢(int itemId) {
        return itemId >= 1352000 && itemId <= 1352007;
    }

    public static boolean is幻影卡片(int itemId) {
        return itemId >= 1352100 && itemId <= 1352107;
    }

    public static boolean is恶魔副手(int itemId) {
        return itemId >= 1099000 && itemId <= 1099012;
    }

    public static boolean is龙传宝盒(int itemId) {
        return itemId >= 1352300 && itemId <= 1352304;
    }

    public static boolean is夜光宝珠(int itemId) {
        return itemId >= 1352400 && itemId <= 1352404;
    }

    public static boolean is尖兵副手(int itemId) {
        return itemId >= 1353000 && itemId <= 1353006;
    }

    public static boolean is狂龙副手(int itemId) {
        return itemId >= 1352500 && itemId <= 1352504;
    }

    public static boolean is萝莉副手(int itemId) {
        return itemId >= 1352600 && itemId <= 1352604;
    }

    public static boolean is特殊副手(int itemId) {
        return is双弩箭矢(itemId);
    }

    public static boolean isTwoHanded(int itemId) {
        return isTwoHanded(itemId, 0);
    }

    public static boolean isTwoHanded(int itemId, int job) {
        switch (getWeaponType(itemId)) {
            case 短枪:
                return !(job >= 570 && job <= 572);
            case 双手剑:
                return !(job >= 6100 && job <= 6112);
            case 双手斧:
            case 指节:
            case 双手钝器:
            case 弓:
            case 拳套:
            case 弩:
            case 矛:
            case 枪:
            case 手持火炮:
            case 双弩枪:
            case 武士刀:
                return true;
            default:
                return false;
        }
    }

    public static boolean isSuperiorEqp(final int itemid) {
        return itemid >= 1122241 && itemid <= 1122245 || itemid >= 1132164 && itemid <= 1132178 || itemid >= 1102471 && itemid <= 1102485 || itemid >= 1082543 && itemid <= 1082547 || itemid >= 1072732 && itemid <= 1072747;
    }

    public static boolean is随机攻击卷轴(final int itemid) {
        return itemid / 1000 == 2612 || itemid / 1000 == 2613 || itemid / 1000 == 2046 || itemid / 1000 == 2616;
    }

    public static boolean is武器攻击力卷轴(final int itemid) {
        return itemid / 100 == 20478 || itemid / 100 == 20469 || itemid / 100 == 20479;
    }

    public static int getNeedHonor(int lockLevel, int lockCount) {
        int needHonor = 0;
        switch (lockLevel) {
            case 0: {
                needHonor = 100;
                break;
            }
            case 1: {
                needHonor = lockCount == 0 ? 500 : lockCount == 1 ? 3500 : 8500;
                break;
            }
            case 2: {
                needHonor = lockCount == 0 ? 5100 : lockCount == 1 ? 8100 : 13100;
                break;
            }
            case 3: {
                needHonor = lockCount == 0 ? 10100 : lockCount == 1 ? 13100 : 18100;
                break;
            }
        }
        return needHonor;
    }

    public static boolean isSealedScroll(int itemid) {
        return itemid == 2610001;
    }

    public static String getEnchantingEquipType(int itemid) {
        /*
        * 1 武器
        * 2 帽子、披风、上衣、裤子、长袍、鞋子、护肩
        * 3 手套
        * 4 吊坠、腰带、耳环、眼饰
         */
        return ItemConstants.isWeapon(itemid) ? "武器" : (ItemConstants.isCap(itemid) || ItemConstants.isCape(itemid) || ItemConstants.isCoat(itemid)
                || ItemConstants.isPants(itemid) || ItemConstants.isLongcoat(itemid) || ItemConstants.isShoes(itemid) || ItemConstants.isShoulders(itemid)) ? "防具"
                : ItemConstants.isGlove(itemid) ? "手套" : "饰品";
    }

    public static int getEnchantingScrollStyle(String style) {
        switch (style.substring(0, 2)) {
            case "蓝色":
                return 0;
            case "灰色":
                return 1;
            case "棕色":
                return 2;
            case "金色":
                return 3;
            default:
                return 0;
        }
    }

    public static boolean is灵魂结晶(int itemid) {
        return itemid / 1000 == 2591;
    }

    /**
     * 打猎可获得经验的椅子
     */
    public static final boolean isSetupExpRate(int itemid) {
        return itemid / 10000 == 302;
    }
}
