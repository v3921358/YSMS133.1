package tools.packet;

import client.skills.Skill;
import client.skills.InnerSkillEntry;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import server.shop.MapleShopItem;
import server.shop.MapleShop;
import client.*;
import client.inventory.*;
import constants.GameConstants;
import constants.ItemConstants;
import constants.JobConstants;
import constants.skills.幻影;

import java.util.*;
import java.util.Map.Entry;

import server.*;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.shops.AbstractPlayerStore;
import server.shops.IMaplePlayerShop;
import tools.*;
import tools.data.output.MaplePacketLittleEndianWriter;

public class PacketHelper {

    public static long MAX_TIME = 150842304000000000L; //00 80 05 BB 46 E6 17 02
    public static long ZERO_TIME = 94354848000000000L; //00 40 E0 FD 3B 37 4F 01
    public static long PERMANENT = 150841440000000000L; //00 C0 9B 90 7D E5 17 02

    public static long getKoreanTimestamp(long realTimestamp) {
        return realTimestamp * 10000 + 116444592000000000L;
    }

    public static long getTime(long realTimestamp) {
        if (realTimestamp == -1) {
            return MAX_TIME; //00 80 05 BB 46 E6 17 02
        } else if (realTimestamp == -2) {
            return ZERO_TIME; //00 40 E0 FD 3B 37 4F 01
        } else if (realTimestamp == -3) {
            return PERMANENT; //00 C0 9B 90 7D E5 17 02
        }
        return DateUtil.getFileTimestamp(realTimestamp);
    }

    /*
     * 药剂罐信息
     */
    public static void addPotionPotInfo(MaplePacketLittleEndianWriter mplew, MaplePotionPot potionPot) {
        mplew.writeInt(potionPot.getItmeId());
        mplew.writeInt(potionPot.getChrId());
        mplew.writeInt(potionPot.getMaxValue());
        mplew.writeInt(potionPot.getHp());
        mplew.writeInt(potionPot.getMp());
        mplew.writeLong(getTime(potionPot.getStartDate()));
        mplew.writeLong(getTime(potionPot.getEndDate()));
    }

    public static void addCharStats(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(chr.getId()); // 角色ID
        mplew.writeInt(chr.getId());
        mplew.writeInt(chr.getWorld());
        mplew.writeAsciiString(chr.getName(), 13); //角色名字
        mplew.write(chr.getGender()); // 性别 (0 = 男, 1 = 女)
        mplew.write(chr.getSkinColor()); // 皮肤
        mplew.writeInt(chr.getFace()); // 脸型
        mplew.writeInt(chr.getHair()); // 发型

        mplew.write(-1);
        mplew.writeShort(0);

        mplew.write(chr.getLevel()); // 等级
        mplew.writeShort(chr.getJob()); // 职业
        chr.getStat().connectData(mplew);
        mplew.writeShort(chr.getRemainingAp()); // remaining ap
        addCharSP(mplew, chr);
        mplew.writeLong(chr.getExp()); // 经验 V.110修改 以前为Int
        mplew.writeInt(chr.getFame()); // 人气
        mplew.writeInt(chr.getWeaponPoint());  // 神之子WP
        mplew.writeLong(0);
        mplew.writeLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        mplew.writeInt(chr.getMapId()); // 当前地图ID
        mplew.write(chr.getInitialSpawnpoint()); // spawnpoint
        mplew.writeShort(chr.getSubcategory()); // 1 here = db, 2 = cannoner
        if (chr.hasDecorate()) {
            mplew.writeInt(chr.getDecorate()); // 魔族之纹
        }
        mplew.write(chr.getFatigue());
        mplew.writeInt(DateUtil.getTime()); // 年月日时
        /*
         * 倾向系统 领袖气质 感性 洞察力 意志 手技 魅力
         * charisma, sense, insight, volition, hands, charm;
         */
        for (MapleTraitType t : MapleTraitType.values()) {
            mplew.writeInt(chr.getTrait(t).getTotalExp());
        }
        mplew.writeZeroBytes(13);
        mplew.writeLong(getTime(-2));
        /*
         * 大乱战斗
         */
        mplew.writeInt(chr.getStat().pvpExp); //pvp exp
        mplew.write(chr.getStat().pvpRank); //pvp rank
        mplew.writeInt(chr.getBattlePoints()); //pvp points
        mplew.write(5);//chr.getValue()
        mplew.write(6); //未知
        mplew.writeInt(0);
        addPartTimeJob(mplew, MapleCharacter.getPartTime(chr.getId()));
        chr.getCharacterCard().connectData(mplew); //角色卡 9*9 个字节
        mplew.writeReversedLong(DateUtil.getFileTimestamp(System.currentTimeMillis()));
        mplew.write(0);
        mplew.writeReversedInt(getTime(System.currentTimeMillis()));
    }

    public static void addCharSP(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        if (JobConstants.isSeparatedSpJob(chr.getJob())) {
            mplew.write(chr.getRemainingSpSize());
            for (int i = 0; i < chr.getRemainingSps().length; i++) {
                if (chr.getRemainingSp(i) > 0) {
                    mplew.write(i + 1);
                    mplew.writeInt(chr.getRemainingSp(i));
                }
            }
        } else if (JobConstants.is暗影双刀(chr.getJob())) {
            int sp1 = 0, sp2 = 0;
            List<Pair<Integer, Integer>> splist = new ArrayList<>();
            for (int i = 0; i < chr.getRemainingSps().length; i++) {
                if (i < 2) {
                    sp1 += chr.getRemainingSp(i);
                    if (i == 1 && sp1 > 0) {
                        splist.add(new Pair<>(0, sp1));
                        splist.add(new Pair<>(1, sp1));
                    }
                } else if (i < 4) {
                    sp2 += chr.getRemainingSp(i);
                    if (i == 3 && sp2 > 0) {
                        splist.add(new Pair<>(2, sp2));
                        splist.add(new Pair<>(3, sp2));
                    }
                } else if (chr.getRemainingSp(i) > 0) {
                    splist.add(new Pair<>(i, chr.getRemainingSp(i)));
                }
            }
            mplew.write(splist.size());
            for (Pair<Integer, Integer> sp : splist) {
                if (sp.right > 0) {
                    mplew.write(sp.left + 1);
                    mplew.writeInt(sp.right);
                }
            }
        } else {
            mplew.writeShort(chr.getRemainingSp());
        }
    }

    public static void addPartTimeJob(MaplePacketLittleEndianWriter mplew, MaplePartTimeJob parttime) {
        mplew.write(parttime.getJob());
        if (parttime.getJob() > 0 && parttime.getJob() <= 5) {
            //mplew.writeHexString("6B E2 D0 01 30 C0 D4 DD");
            mplew.writeReversedLong(parttime.getTime());
        } else {
            mplew.writeReversedLong(getTime(-2));
        }
        mplew.writeInt(parttime.getReward());
        mplew.writeBool(parttime.getReward() > 0);
    }

    public static void addCharLook(MaplePacketLittleEndianWriter mplew, MapleCharacter chr, boolean mega, boolean second) {
        mplew.write(second ? chr.getSecondGender() : chr.getGender());
        mplew.write(chr.getSkinColor());
        mplew.writeInt(second ? chr.getSecondFace() : chr.getFace());
        chr.writeJobData(mplew);
        mplew.write(mega ? 0 : 1);
        mplew.writeInt(second ? chr.getSecondHair() : chr.getHair());

        Map<Byte, Integer> myEquip = new LinkedHashMap<>();
        Map<Byte, Integer> maskedEquip = new LinkedHashMap<>();
        Map<Byte, Integer> totemEquip = new LinkedHashMap<>();
        MapleInventory equip = chr.getInventory(MapleInventoryType.EQUIPPED);

        for (Item item : equip.newList()) { //遍历装备列表
            if (item.getPosition() <= -5000 && item.getPosition() > -5003) {
                byte pos = (byte) (item.getPosition() * -1 - 5000); //定义图腾装备的位置
                if (totemEquip.get(pos) == null) {
                    totemEquip.put(pos, item.getItemId());
                }
            }
            if (item.getPosition() < -128) { //not visible
                continue;
            }
            /*
             * T069 如果身上装备为武器 且 武器合成其他道具的外观 就要外观武器的ID
             */
            byte pos = (byte) (item.getPosition() * -1); //定义装备的位置pos
            if (pos < 100 && myEquip.get(pos) == null) {
                Equip skin = (Equip) item;
                myEquip.put(pos, skin.getItemSkin() % 10000 > 0 ? skin.getItemSkin() : item.getItemId());
            } else if ((pos > 100 || pos == -128) && pos != 111) {
                pos = (byte) (pos == -128 ? 28 : pos - 100);
                if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, myEquip.get(pos));
                }
                myEquip.put(pos, item.getItemId());
            } else if (myEquip.get(pos) != null) {
                maskedEquip.put(pos, item.getItemId());
            }
        }
        /*
         * 神之子主手和副手处理
         * 1572000 太刀类型 主手
         * 1562000 太剑类型 副手
         * 10 = 盾牌
         * 11 = 武器
         */
        boolean zero = JobConstants.is神之子(chr.getJob());
        if (zero) {
            if (second && myEquip.containsKey((byte) 10)) {
                int itemId = myEquip.remove((byte) 10); //删除盾牌
                myEquip.put((byte) 11, itemId); //将盾牌装备放到主手
            }
        }
        //遍历玩家身上装备的位置
        for (Entry<Byte, Integer> entry : myEquip.entrySet()) {
            mplew.write(entry.getKey()); //装备的位置
            mplew.writeInt(entry.getValue()); //装备ID
            //System.err.println("身上装备 - > " + entry.getKey() + " " + entry.getValue());
        }
        mplew.write(0xFF); // 加载身上装备结束
        //背包里的装备
        for (Entry<Byte, Integer> entry : maskedEquip.entrySet()) {
            mplew.write(entry.getKey()); //装备栏的位置
            mplew.writeInt(entry.getValue()); //装备ID
            //System.err.println("背包装备 - > " + entry.getKey() + " " + entry.getValue());
        }
        mplew.write(0xFF); // 加载背包装备结束
        //加载玩家图腾信息 图腾的KEY位置从0开始计算 0 1 2 共三个
        for (Entry<Byte, Integer> entry : totemEquip.entrySet()) {
            mplew.write(entry.getKey()); //装备的位置
            mplew.writeInt(entry.getValue()); //装备ID
            //System.err.println("图腾装备 - > " + entry.getKey() + " " + entry.getValue());
        }
        mplew.write(0xFF); // 图腾
        //点装武器
        Item cWeapon = equip.getItem((byte) -111);
        mplew.writeInt(cWeapon != null ? cWeapon.getItemId() : 0);
        //角色武器
        Item weapon = equip.getItem(second ? (byte) -10 : (byte) -11); //神之子第2角色 显示的武器是盾牌的
        mplew.writeInt(weapon != null ? weapon.getItemId() : 0);
        //角色副手或者盾牌
        Item subWeapon = equip.getItem((byte) -10);
        mplew.writeInt(!zero && subWeapon != null ? subWeapon.getItemId() : 0);
        //是否显示精灵耳朵
        mplew.writeBool(chr.isElfEar());
        //检测是否有宠物
        for (int i = 0; i < 3; i++) {
            mplew.writeInt(!second && chr.getSpawnPet(i) != null ? chr.getSpawnPet(i).getPetItemId() : 0);
        }
        if (chr.hasDecorate()) {
            mplew.writeInt(chr.getDecorate()); // 魔族之纹
        }
        if (zero) { //神之子
            mplew.write(second ? 1 : 0);
        }
        if (JobConstants.is林之灵(chr.getJob())) {
            chr.checkTailAndEar();
            mplew.write(1);
            mplew.writeInt(5010116);
            mplew.write(1);
            mplew.writeInt(5010119);
        }
        mplew.writeShort(0);
    }

    public static void addExpirationTime(MaplePacketLittleEndianWriter mplew, long time) {
        mplew.writeLong(getTime(time));
    }

    public static void addItemPosition(MaplePacketLittleEndianWriter mplew, Item item, boolean trade, boolean bagSlot) {
        if (item == null) {
            mplew.write(0);
            return;
        }
        short pos = item.getPosition();
        if (pos <= -1) {
            pos *= -1;
            if (pos > 100 && pos < 1000) {
                pos -= 100;
            }
        }
        if (bagSlot) {
            mplew.writeInt((pos % 100) - 1);
        } else if (!trade && item.getType() == 1) {
            mplew.writeShort(pos);
        } else {
            mplew.write(pos);
        }
    }

    public static void addItemInfo(MaplePacketLittleEndianWriter mplew, Item item) {
        addItemInfo(mplew, item, null);
    }

    public static void addItemInfo(MaplePacketLittleEndianWriter mplew, Item item, MapleCharacter chr) {
        addItemInfo(mplew, item, chr, false);
    }

    public static void addItemInfo(MaplePacketLittleEndianWriter mplew, Item item, MapleCharacter chr, boolean active) {
        mplew.write(item.getPet() != null ? 3 : item.getType()); // 道具类型
        mplew.writeInt(item.getItemId()); // 装备ID
        //结婚戒指没有 且 不是安卓 智能机器人
        boolean hasUniqueId = item.getUniqueId() > 0 && !ItemConstants.is结婚戒指(item.getItemId()) && item.getItemId() / 10000 != 166;
        mplew.write(hasUniqueId ? 1 : 0);
        if (hasUniqueId) {
            mplew.writeLong(item.getUniqueId());
        }
        if (item.getPet() != null) { // Pet
            addPetItemInfo(mplew, item, item.getPet(), active);
        } else {
            addExpirationTime(mplew, item.getExpiration());
            mplew.writeInt(chr == null ? -1 : chr.getExtendedSlots().indexOf(item.getItemId()));
            if (item.getType() == 1) { // 如果是装备
                Equip equip = (Equip) item;
                mplew.writeInt(equip.getEquipFlag());
                if (equip.getUpgradeSlots() > 0) {
                    mplew.write(equip.getUpgradeSlots()); // 可升级次数
                }
                if (equip.getLevel() > 0) {
                    mplew.write(equip.getLevel()); // 已升级次数 
                }
                if (equip.getStr() > 0) {
                    mplew.writeShort(equip.getStr()); // 力量  
                }
                if (equip.getDex() > 0) {
                    mplew.writeShort(equip.getDex()); // 敏捷
                }
                if (equip.getInt() > 0) {
                    mplew.writeShort(equip.getInt()); // 智力
                }
                if (equip.getLuk() > 0) {
                    mplew.writeShort(equip.getLuk()); // 运气
                }
                if (equip.getHp() > 0) {
                    mplew.writeShort(equip.getHp()); // MaxHp 
                }
                if (equip.getMp() > 0) {
                    mplew.writeShort(equip.getMp()); // MaxMp
                }
                if (equip.getWatk() > 0) {
                    mplew.writeShort(equip.getWatk()); // 物理攻击
                }
                if (equip.getMatk() > 0) {
                    mplew.writeShort(equip.getMatk()); // 魔法攻击
                }
                if (equip.getWdef() > 0) {
                    mplew.writeShort(equip.getWdef()); // 物理防御
                }
                if (equip.getMdef() > 0) {
                    mplew.writeShort(equip.getMdef()); // 魔法防御
                }
                if (equip.getAcc() > 0) {
                    mplew.writeShort(equip.getAcc()); // 命中率
                }
                if (equip.getAvoid() > 0) {
                    mplew.writeShort(equip.getAvoid()); // 回避率
                }
                if (equip.getHands() > 0) {
                    mplew.writeShort(equip.getHands()); // 手技
                }
                if (equip.getSpeed() > 0) {
                    mplew.writeShort(equip.getSpeed()); // 移动速度
                }
                if (equip.getJump() > 0) {
                    mplew.writeShort(equip.getJump()); // 跳跃力
                }
                if (equip.getFlag() > 0) {
                    mplew.writeInt(equip.getFlag()); // 道具状态
                }
                if (equip.getIncSkill() > 0) {
                    mplew.write(equip.getIncSkill() > 0 ? 1 : 0); // 是否拥有技能
                }
                if (equip.isSealedEquip()) {
                    if (equip.getSealedLevel() > 0) {
                        mplew.write(equip.getSealedLevel());
                    }
                    if (equip.getSealedExp() > 0) {
                        mplew.writeLong(equip.getSealedExp());
                    }
                } else {
                    if (equip.getEquipLevel() > 0) {
                        mplew.write(Math.max(equip.getBaseLevel(), equip.getEquipLevel())); // 道具等级 
                    }
                    if (equip.getExpPercentage() > 0) {
                        mplew.writeLong(equip.getExpPercentage() * 100000); // 道具经验... 10000000 = 100% 好像现在是20000是满经验 V.110修改 以前是Int
                    }
                }
                if (equip.getDurability() > 0) {
                    mplew.writeInt(equip.getDurability()); // 耐久度
                }
                if (equip.getViciousHammer() > 0) {
                    mplew.writeShort(equip.getViciousHammer()); //金锤子
                    mplew.writeShort(0);//白金锤子
                }
                if (equip.getPVPDamage() > 0) {
                    mplew.writeShort(equip.getPVPDamage()); //大乱斗攻击力
                }
                if (equip.getEnhanctBuff() > 0) {
                    mplew.writeShort(equip.getEnhanctBuff()); //强化效果
                }
                if (equip.getReqLevel() > 0) {
                    mplew.write(equip.getReqLevel()); //穿戴装备的等级要求提高多少级
                }
                if (equip.getYggdrasilWisdom() > 0) {
                    mplew.write(equip.getYggdrasilWisdom());
                }
                if (equip.getFinalStrike()) {
                    mplew.writeBool(equip.getFinalStrike()); //最终一击卷轴成功
                }
                if (equip.getBossDamage() > 0) {
                    mplew.write(equip.getBossDamage()); //BOSS伤害
                }
                if (equip.getIgnorePDR() > 0) {
                    mplew.write(equip.getIgnorePDR()); //无视防御
                }
                /*
                 * 0x01 = 装备总伤害百分比增加
                 * 0x02 = 装备所有属性百分比增加
                 * 0x04 = 可以使用剪刀多少次
                 */
                mplew.writeInt(equip.getEquipSpecialFlag());  // 14 00 00 00 
                if (equip.getTotalDamage() > 0) {
                    mplew.write(equip.getTotalDamage()); //装备总伤害百分比增加
                }
                if (equip.getAllStat() > 0) {
                    mplew.write(equip.getAllStat()); //装备所有属性百分比增加
                }
                mplew.write(equip.getKarmaCount()); //可以使用剪刀多少次 默认-1 必须发送这个封包 0x0A = 宿命剪刀1次
                //--------------------------------------------------------
                // 8D 00 00 00 00 00 00 00 可能是灵魂卷轴
                mplew.writeHexString("00 11 00 00");
                addEquipBonusStats(mplew, equip, hasUniqueId);
            } else { // 如果是物品道具
                mplew.writeShort(item.getQuantity()); // 道具数量
                mplew.writeMapleAsciiString(item.getOwner()); // 道具拥有者
                mplew.writeShort(item.getFlag()); // 道具状态
                mplew.writeShort(0); // V.115.1新增
                if (ItemConstants.is飞镖道具(item.getItemId()) || ItemConstants.is子弹道具(item.getItemId()) || item.getItemId() / 10000 == 287) {
                    mplew.writeLong(item.getInventoryId() <= 0 ? 0 : item.getInventoryId());
                }
                if (ItemConstants.isSetupExpRate(item.getItemId())) { //TODO 打怪获得的经验存储在椅子
                    mplew.writeLong(0);
                }
                mplew.writeZeroBytes(17);
            }
        }
    }

    public static void addEquipStatsTest(MaplePacketLittleEndianWriter mplew, Equip equip) {
        int mask;
        int masklength = 2;
        for (int i = 1; i <= masklength; i++) {
            mask = 0;
            if (equip.getStatsTest().size() > 0) {
                for (EquipStats stat : equip.getStatsTest().keySet()) {
                    if (stat.getPosition() == i) {
                        mask += stat.getValue();
                    }
                }
            }
            mplew.writeInt(mask);
            if (mask != 0) {
                for (EquipStats stat : equip.getStatsTest().keySet()) {
                    switch (stat.getDatatype()) {
                        case 1:
                            mplew.write(equip.getStatsTest().get(stat).byteValue());
                            break;
                        case 2:
                            mplew.writeShort(equip.getStatsTest().get(stat).shortValue());
                            break;
                        case 4:
                            mplew.writeInt(equip.getStatsTest().get(stat).intValue());
                            break;
                        case 8:
                            mplew.writeLong(equip.getStatsTest().get(stat));
                            break;
                    }
                }
            }
        }
    }

    public static void addEquipBonusStats(MaplePacketLittleEndianWriter mplew, Equip equip, boolean hasUniqueId) {
        mplew.writeMapleAsciiString(equip.getOwner()); // 拥有者名字
        mplew.write(equip.getState(true));  // 16以下20以上都是未鉴定 16= C级 17=B级 18=A级 19=S级 20=SS级
        mplew.write(equip.getEnhance()); // 星级            
        mplew.writeShort(equip.getOptential1() <= 0 ? 0 : equip.getOptential1());
        mplew.writeShort(equip.getOptential2() <= 0 ? 0 : equip.getOptential2());
        mplew.writeShort(equip.getOptential3() <= 0 ? 0 : equip.getOptential3());
        mplew.writeShort(equip.getOptential4() < 0 ? 1 : equip.getOptential4());
        mplew.writeShort(equip.getOptential5() < 0 ? 1 : equip.getOptential5());
        mplew.writeShort(equip.getOptential6() < 0 ? 1 : equip.getOptential6()); //V.109新增
        mplew.writeShort(equip.getItemSkin() % 10000); //这个是合成后的外观皮肤
         /*
         * 0x01 = 你可以在这件物品上镶入星岩。
         * 0x03 = 你可以在这件物品上镶入星岩。 有个镶嵌的孔 未镶嵌
         * 0x13 = 有1个插孔 已经镶嵌东西
         */
        mplew.writeShort(equip.getSocketState()); //V.101新增 这里的4个是没有就是-1的值
        mplew.writeShort(equip.getSocket1() % 10000); //V.102新增 镶嵌宝石1 ID: 3281 = 全属性+4%
        mplew.writeShort(equip.getSocket2() % 10000); //V.102新增 镶嵌宝石2
        mplew.writeShort(equip.getSocket3() % 10000); //V.102新增 镶嵌宝石3
        //System.out.println("装备ItemSlot: " + equip.getItemSlot1() + " - " + equip.getItemSlot2() + " - " + equip.getItemSlot3());
        if (!hasUniqueId) {
            mplew.writeLong(equip.getEquipOnlyId());
        }
        mplew.writeLong(getTime(-2)); //00 40 E0 FD 3B 37 4F 01
        mplew.writeInt(-1);
        mplew.writeLong(0);
        mplew.writeLong(getTime(-2)); //00 40 E0 FD 3B 37 4F 01
        mplew.writeLong(0);
        mplew.writeLong(0);
        //灵魂武器
        mplew.writeShort(equip.getSoulName());
        mplew.writeShort(equip.getSoulEnchanter());
        mplew.writeShort(equip.getSoulOptential());
        //道具的伤害突破上限增加多少
        mplew.writeInt(equip.getLimitBreak());
    }

    public static void serializeMovementList(MaplePacketLittleEndianWriter lew, List<LifeMovementFragment> moves) {
        /*
         * 移动类型 movetype
         * 0 = 人物移动d
         * 1 = 召唤对象移动
         * 2 = 宠物移动
         * 3 = 龙移动
         * 4 = 怪物移动
         * 9 = PK对象移动
         */
        lew.write(moves.size());
//        Collections.reverse(moves);
        for (LifeMovementFragment move : moves) {
            move.serialize(lew);
        }
    }

    public static void addAnnounceBox(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        if (chr.getPlayerShop() != null && chr.getPlayerShop().isOwner(chr) && chr.getPlayerShop().getShopType() != 1 && chr.getPlayerShop().isAvailable()) {
            addInteraction(mplew, chr.getPlayerShop());
        } else {
            mplew.write(0);
        }
    }

    public static void addInteraction(MaplePacketLittleEndianWriter mplew, IMaplePlayerShop shop) {
        mplew.write(shop.getGameType());
        mplew.writeInt(((AbstractPlayerStore) shop).getObjectId());
        mplew.writeMapleAsciiString(shop.getDescription());
        if (shop.getShopType() != 1) {
            mplew.write(shop.getPassword().length() > 0 ? 1 : 0); //password = false
        }
        mplew.write(shop.getItemId() % 10); //应该是商店的外观 以前是: shop.getItemId() % 10   shop.getItemId() - 5030000
        mplew.write(shop.getSize()); //current size
        mplew.write(shop.getMaxSize()); //full slots... 4 = 4-1=3 = has slots, 1-1=0 = no slots
        if (shop.getShopType() != 1) {
            mplew.write(shop.isOpen() ? 0 : 1);
        }
    }

    /**
     * 添加角色相关数据：属性、道具、任务、技能等
     * @param mplew
     * @param chr
     */
    public static void addCharacterInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeLong(-1); // 开始生成角色信息

        mplew.write(0);
        mplew.writeInt(-1);
        mplew.writeInt(-1);
        mplew.writeInt(-1);

        mplew.writeZeroBytes(6);
        addCharStats(mplew, chr);
        mplew.write(chr.getBuddylist().getCapacity());
        // 精灵的祝福
        if (chr.getBlessOfFairyOrigin() != null) {
            mplew.write(1);
            mplew.writeMapleAsciiString(chr.getBlessOfFairyOrigin());
        } else {
            mplew.write(0);
        }
        // 女皇的祝福
        if (chr.getBlessOfEmpressOrigin() != null) {
            mplew.write(1);
            mplew.writeMapleAsciiString(chr.getBlessOfEmpressOrigin());
        } else {
            mplew.write(0);
        }
        // 终极冒险家
        MapleQuestStatus ultExplorer = chr.getQuestNoAdd(MapleQuest.getInstance(GameConstants.ULT_EXPLORER));
        mplew.writeBool((ultExplorer != null) && (ultExplorer.getCustomData() != null));
        if ((ultExplorer != null) && (ultExplorer.getCustomData() != null)) {
            mplew.writeMapleAsciiString(ultExplorer.getCustomData());
        }
        
        /* v.130 */
        mplew.writeInt(0);
        mplew.write(-1);
        mplew.writeInt(0);
        mplew.write(-1);
        /*
        * inv
        */
        mplew.writeLong(chr.getMeso()); // 金币 V.110修改以前是 Int
        mplew.writeInt(chr.getId());  // 角色ID

        mplew.writeInt(chr.getBeans()); // 豆豆
        mplew.writeZeroBytes(12);

        mplew.writeInt(chr.getId());  // 角色ID V.112.1新增
        mplew.writeZeroBytes(31); //未知 V.112.1新增
        mplew.writeInt(chr.getPotionPot() != null ? 1 : 0); //药剂罐信息
        if (chr.getPotionPot() != null) {
            addPotionPotInfo(mplew, chr.getPotionPot());
        }
        mplew.write(chr.getInventory(MapleInventoryType.EQUIP).getSlotLimit()); // equip slots 默认是24个装备格子
        mplew.write(chr.getInventory(MapleInventoryType.USE).getSlotLimit()); // use slots
        mplew.write(chr.getInventory(MapleInventoryType.SETUP).getSlotLimit()); // set-up slots
        mplew.write(chr.getInventory(MapleInventoryType.ETC).getSlotLimit()); // etc slots
        mplew.write(chr.getInventory(MapleInventoryType.CASH).getSlotLimit()); // cash slots

        MapleQuestStatus stat = chr.getQuestNoAdd(MapleQuest.getInstance(GameConstants.PENDANT_SLOT));
        if (stat != null && stat.getCustomData() != null && Long.parseLong(stat.getCustomData()) > System.currentTimeMillis()) {
            mplew.writeLong(getTime(Long.parseLong(stat.getCustomData())));
        } else {
            mplew.writeLong(getTime(-2));
        }
        mplew.write(0); //V.116.1新增 未知
        // 下面是关于装备的
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        List<Item> equippedList = iv.newList(); //获取装备中的道具列表
        Collections.sort(equippedList); //对道具进行排序
        List<Item> equipped = new ArrayList<>(); //装备道具
        List<Item> equippedCash = new ArrayList<>(); //点装道具
        List<Item> equippedDragon = new ArrayList<>(); //龙神装备
        List<Item> equippedMechanic = new ArrayList<>(); //机械装备
        List<Item> equippedAndroid = new ArrayList<>(); //安卓装备
        List<Item> equippedTotem = new ArrayList<>(); //图腾装备
        List<Item> equippedLolitaCash = new ArrayList<>(); //萝莉时装
//        List<Item> equippeSkin = new ArrayList<Item>();//技能皮肤
        for (Item item : equippedList) {
            if (item.getPosition() < 0 && item.getPosition() > -100) { //非点装
                equipped.add(item);
            } else if (item.getPosition() <= -100 && item.getPosition() > -1000) { //点装道具
                equippedCash.add(item);
            } else if (item.getPosition() <= -1000 && item.getPosition() > -1100) { //龙神装备
                equippedDragon.add(item);
            } else if (item.getPosition() <= -1100 && item.getPosition() > -1200) { //机械装备
                equippedMechanic.add(item);
            } else if (item.getPosition() <= -1200 && item.getPosition() > -1300) { //安卓装备
                equippedAndroid.add(item);
            } else if (item.getPosition() <= -5000 && item.getPosition() > -5003) { //图腾装备
                equippedTotem.add(item);
            } else if (item.getPosition() <= -1300 && item.getPosition() > -1306) { //萝莉时装
                equippedLolitaCash.add(item);
            }
        }
        // 开始加载身上的装备
        for (Item item : equipped) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 开始加载身上的点装   1
        for (Item item : equippedCash) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 开始加载装备栏道具   2
        iv = chr.getInventory(MapleInventoryType.EQUIP);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 开始加载龙神装备    3
        for (Item item : equippedDragon) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 开始加载机械装备    4
        for (Item item : equippedMechanic) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 开始加载安卓装备    5
        for (Item item : equippedAndroid) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 开始加载图腾装备    6
        for (Item item : equippedTotem) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 开始加载萝莉时装    7
        for (Item item : equippedLolitaCash) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.writeShort(0); // 未知 V.109 新增
        mplew.writeShort(0); // 未知 V.109 新增
        mplew.writeShort(0); // 未知 V.112 新增 口袋怪物装备
        mplew.writeShort(0); // 未知 V.112 新增 拼图道具 从20000开始    T090 这个地方为装备中的技能皮肤 从6000开始
        mplew.writeShort(0); // 未知 V.114 新增
        mplew.writeShort(0); // 未知 V.114 新增 技能皮肤 从21000开始    未装备
        mplew.writeShort(0); // 未知 V.116 新增
        mplew.writeShort(0); // 未知 V.116 新增
        mplew.writeShort(0); // 未知 V.116 新增
        mplew.writeShort(0); // 开始加载消耗栏道具
        iv = chr.getInventory(MapleInventoryType.USE);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.write(0); // 开始加载设置栏道具    1
        iv = chr.getInventory(MapleInventoryType.SETUP);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.write(0); // 开始加载其他栏道具    2
        iv = chr.getInventory(MapleInventoryType.ETC);
        for (Item item : iv.list()) {
            if (item.getPosition() < 100) {
                addItemPosition(mplew, item, false, false);
                addItemInfo(mplew, item, chr);
            }
        }
        mplew.write(0); // 开始加载现金栏道具    3
        iv = chr.getInventory(MapleInventoryType.CASH);
        for (Item item : iv.list()) {
            addItemPosition(mplew, item, false, false);
            addItemInfo(mplew, item, chr);
        }
        mplew.write(0);
        mplew.writeInt(0);
        mplew.writeInt(0);
        //开始加载矿物背包道具
        mplew.writeInt(chr.getExtendedSlots().size());
        for (int i = 0; i < chr.getExtendedSlots().size(); i++) {
            mplew.writeInt(i);
            mplew.writeInt(chr.getExtendedSlot(i));
            for (Item item : chr.getInventory(MapleInventoryType.ETC).list()) {
                if (item.getPosition() > (i * 100 + 100) && item.getPosition() < (i * 100 + 200)) {
                    addItemPosition(mplew, item, false, true);
                    addItemInfo(mplew, item, chr);
                }
            }
            mplew.writeInt(-1);
        }
        mplew.writeZeroBytes(9);
        /*
        * SkillInfo
        */
        Map<Skill, SkillEntry> skills = chr.getSkills(true);
        Map<Skill, SkillEntry> teachList = new HashMap<>();
        mplew.write(1);  //V.100新加
        mplew.writeShort(skills.size());
        for (Entry<Skill, SkillEntry> skill : skills.entrySet()) {
            /*
             * 当技能为海盗祝福和精灵祝福时
             * 00 B4 C4 04 - 海盗祝福
             * 4F 80 09 00 - 传授人的角色ID？
             * 00 80 05 BB 46 E6 17 02
             */
            mplew.writeInt(skill.getKey().getId());
            if (skill.getKey().isLinkSkills()) { //别人传授给角色的技能 写别人角色的ID
                mplew.writeInt(skill.getValue().teachId);
            } else if (skill.getKey().isTeachSkills()) { //如果是自己的传授技能 传授对象不为空写传授对象的角色ID 如果为空写 自己的角色ID
                mplew.writeInt(skill.getValue().teachId > 0 ? skill.getValue().teachId : chr.getId()); //skill.getValue().skillevel
            } else {
                mplew.writeInt(skill.getValue().skillevel);
            }
            addExpirationTime(mplew, skill.getValue().expiration);
            if (skill.getKey().isFourthJob()) {
                mplew.writeInt(skill.getValue().masterlevel);
            }
            if (chr.isShowPacket()) {
                String job = "addSkillInfo\\" + MapleCarnivalChallenge.getJobNameById(chr.getJob()) + ".txt";
                FileoutputUtil.log(job, "玩家技能: " + skill.getKey().getId() + " 名字: " + SkillFactory.getSkillName(skill.getKey().getId()) + " 技能等级: " + skill.getValue().skillevel + "/" + skill.getValue().masterlevel + " 是否写最大等级: " + skill.getKey().isFourthJob(), true);
            }
            if (skill.getKey().isLinkSkills()) { // && skill.getValue().skillevel > 1
                teachList.put(skill.getKey(), skill.getValue());
            }
        }
        //传授技能的等级
        mplew.writeShort(teachList.size());
        for (Entry<Skill, SkillEntry> skill : teachList.entrySet()) {
            mplew.writeInt(skill.getKey().getId());
            mplew.writeShort(skill.getValue().skillevel - 1);
        }
        /*
        * CoolDownInfo
        */
        List<MapleCoolDownValueHolder> cooldowns = chr.getCooldowns();
        mplew.writeShort(cooldowns.size());
        for (MapleCoolDownValueHolder cooling : cooldowns) {
            mplew.writeInt(cooling.skillId);
            int timeLeft = (int) (cooling.length + cooling.startTime - System.currentTimeMillis());
            mplew.writeInt(timeLeft / 1000); //V.103修改为int
            //System.out.println("技能冷却 - 技能ID: " + cooling.skillId + " 剩余时间: " + (timeLeft / 1000) + " 秒");
        }
        /*
        * QuestInfo
        */
        List<MapleQuestStatus> started = chr.getStartedQuests();
        mplew.write(1);
        mplew.writeShort(started.size());
        for (MapleQuestStatus q : started) { // 检测是否接过任务
            mplew.writeShort(q.getQuest().getId()); // 任务ID
            mplew.writeShort(0); // 若任务ID不存在为0，否则为-1
            if (q.hasMobKills()) {
                StringBuilder sb = new StringBuilder();
                for (int kills : q.getMobKills().values()) {
                    sb.append(StringUtil.getLeftPaddedStr(String.valueOf(kills), '0', 3));
                }
                mplew.writeMapleAsciiString(sb.toString());
            } else {
                mplew.writeMapleAsciiString(q.getCustomData() == null ? "" : q.getCustomData());
            }
        }

        mplew.write(1);
        List<MapleQuestStatus> completed = chr.getCompletedQuests();
        mplew.writeShort(completed.size());
        for (MapleQuestStatus q : completed) {
            mplew.writeInt(q.getQuest().getId());
            mplew.writeInt(DateUtil.getTime(q.getCompletionTime()));
        }
        /*
        * RingInfo
        */
        mplew.writeShort(0);
        Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> aRing = chr.getRings(true);
        //恋人戒指
        List<MapleRing> cRing = aRing.getLeft();
        mplew.writeShort(cRing.size());
        for (MapleRing ring : cRing) {
            mplew.writeInt(ring.getPartnerChrId());
            mplew.writeAsciiString(ring.getPartnerName(), 13);
            mplew.writeLong(ring.getRingId());
            mplew.writeLong(ring.getPartnerRingId());
        }
        //好友戒指
        List<MapleRing> fRing = aRing.getMid();
        mplew.writeShort(fRing.size());
        for (MapleRing ring : fRing) {
            mplew.writeInt(ring.getPartnerChrId());
            mplew.writeAsciiString(ring.getPartnerName(), 13);
            mplew.writeLong(ring.getRingId());
            mplew.writeLong(ring.getPartnerRingId());
            mplew.writeInt(ring.getItemId());
        }
        //结婚戒指
        List<MapleRing> mRing = aRing.getRight();
        mplew.writeShort(mRing.size());
        int marriageId = 30000;
        for (MapleRing ring : mRing) {
            mplew.writeInt(marriageId);
            mplew.writeInt(chr.getId());
            mplew.writeInt(ring.getPartnerChrId());
            mplew.writeShort(3); //1 = engaged 3 = married
            mplew.writeInt(ring.getItemId());
            mplew.writeInt(ring.getItemId());
            mplew.writeAsciiString(chr.getName(), 13);
            mplew.writeAsciiString(ring.getPartnerName(), 13);
        }
        /*
        * RocksInfo
        */
        int[] mapz = chr.getRegRocks();
        for (int i = 0; i < 5; i++) { // VIP teleport map
            mplew.writeInt(mapz[i]);
        }
        int[] map = chr.getRocks();
        for (int i = 0; i < 10; i++) { // VIP teleport map
            mplew.writeInt(map[i]);
        }
        int[] maps = chr.getHyperRocks();
        for (int i = 0; i < 13; i++) { // VIP teleport map
            mplew.writeInt(maps[i]);
        }
        /**
         * QuestDataInfo
         * 将任务数据根据共享级别分开存放
         */
        Map<Integer, String> questInfos = new LinkedHashMap<>();
        Map<Integer, String> questInfos_share = new LinkedHashMap<>();
        for (Entry<Integer, String> quest : chr.getInfoQuest_Map().entrySet()) {
            if (GameConstants.isShareQuestInfo(quest.getKey())) {
                questInfos_share.put(quest.getKey(), quest.getValue());
            } else {
                questInfos.put(quest.getKey(), quest.getValue());
            }
        }

        mplew.writeShort(questInfos.size());
        for (Entry<Integer, String> quest : questInfos.entrySet()) {
            mplew.writeInt(quest.getKey());
            mplew.writeMapleAsciiString(quest.getValue() == null ? "" : quest.getValue());
        }

        mplew.writeShort(0);
        mplew.writeShort(0);
        addJaguarInfo(mplew, chr); // 豹弩游侠的豹子信息 不是该职业就不发送

        if (JobConstants.is神之子(chr.getJob())) {
            chr.getStat().zeroData(mplew, chr);
        } else {
            mplew.writeInt(0);
        }

        if (JobConstants.is幻影(chr.getJob())) {
            //获取复制技能数装备的技能列表
            for (int i = 0; i < 13; i++) {
                mplew.writeInt(chr.幻影复制技能(i));
            }
            //装备中的技能
            int[] p_skills = {幻影.幻影印技天赋Ⅰ, 幻影.幻影印技天赋Ⅱ, 幻影.幻影印技天赋Ⅲ, 幻影.幻影印技天赋Ⅳ};
            for (int i : p_skills) {
                mplew.writeInt(chr.获取幻影装备技能(SkillFactory.getSkill(i)));
            }
        } else {
            mplew.writeZeroBytes(68); //非幻影角色 4 * 17
        }

        mplew.writeShort(chr.getInnerSkillSize()); //内在能力技能数量
        for (int i = 0; i < chr.getInnerSkillSize(); i++) {
            InnerSkillEntry innerSkill = chr.getInnerSkills()[i];
            if (innerSkill != null) {
                mplew.write(innerSkill.getPosition()); // key
                mplew.writeInt(innerSkill.getSkillId()); // id 7000000 id ++
                mplew.write(innerSkill.getSkillLevel());  // level
                mplew.write(innerSkill.getRank()); // rank, C, B, A, and S
            }
        }
        mplew.writeShort(0);
        mplew.writeInt(chr.getHonorLevel()); //荣誉等级//118已经不存在了
        mplew.writeInt(chr.getHonorExp()); //声望点数
        mplew.write(1);
        mplew.writeZeroBytes(16);
        mplew.writeInt(-1);
        mplew.writeZeroBytes(16);
        mplew.writeLong(PacketHelper.getTime(-2)); //00 40 E0 FD 3B 37 4F 01 
        mplew.writeShort(0);
        mplew.writeInt(0);  //进化系统的地图皮肤
        mplew.writeZeroBytes(3);
//        mplew.writeInt(chr.getLove()); //V.112新增 好感度
        mplew.writeLong(PacketHelper.getTime(-2)); //00 40 E0 FD 3B 37 4F 01 
        mplew.writeInt(0);
        // v133 start
        mplew.writeInt(chr.getId());
        mplew.writeZeroBytes(12);
        mplew.writeLong(PacketHelper.getTime(-2));
        mplew.writeInt(0x0A);
        /**
         * 账号下角色共享任务数据
         */
        mplew.writeShort(questInfos_share.size());
        for (Entry<Integer, String> quest : questInfos_share.entrySet()) {
            mplew.writeInt(quest.getKey());
            mplew.writeMapleAsciiString(quest.getValue() == null ? "" : quest.getValue());
        }
        // v133 end
        mplew.writeInt(0);
        mplew.write(new byte[]{0, 1, 0});
        mplew.writeLong(1);
        mplew.writeInt(0x64);
        mplew.writeLong(PacketHelper.getTime(System.currentTimeMillis())); // V.114 新增
        mplew.writeZeroBytes(13); // 未知 V.114 新增
        addCoreAura(mplew, chr); //宝盒属性信息
        addRedLeafInfo(mplew, chr);
    }

    public static void addRedLeafInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        int idarr[] = new int[]{9410165, 9410166, 9410167, 9410168, 9410198};
        mplew.writeInt(chr.getClient().getAccID());
        mplew.writeInt(chr.getId());
        mplew.writeLong(idarr.length);
        for (int i = 0; i < idarr.length; i++) {
            mplew.writeInt(idarr[i]);
            mplew.writeInt(chr.getFriendShipPoints()[i]);
        }
    }

    /*
     * 宝盒信息
     */
    public static void addCoreAura(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        MapleCoreAura aura = chr.getCoreAura();
        if (aura != null) {
            mplew.writeInt(chr.getId()); //角色ID
            mplew.writeInt(aura.getId()); //传授者的ID
            mplew.writeInt(aura.getLevel()); //传授者的等级
            mplew.writeInt(aura.getCoreAuraLevel()); //宝盒的等级
            mplew.writeInt(aura.getTotal()); //总点数
            mplew.writeInt(aura.getWatk()); //攻击
            mplew.writeInt(aura.getDex()); //敏捷
            mplew.writeInt(aura.getLuk()); //运气
            mplew.writeInt(aura.getMagic()); //魔攻
            mplew.writeInt(aura.getInt()); //智力
            mplew.writeInt(aura.getStr()); //力量
            mplew.writeInt(0x05); //未知 5
            mplew.writeInt(0x20); //宝盒单个属性的最大上限 32
            mplew.writeInt(0x12); //未知 18
            mplew.writeInt(0x44); //未知 68
            mplew.writeLong(getTime(aura.getExpiration()));
        } else {
            mplew.writeZeroBytes(60);
            mplew.writeLong(getTime(System.currentTimeMillis())); //宝盒的时间
        }
        mplew.writeHexString("00 01 00 00 00 00");
    }

    public static void addMonsterBookInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.writeInt(0); //something
        if (chr.getMonsterBook().getSetScore() > 0) {
            chr.getMonsterBook().writeFinished(mplew);
        } else {
            chr.getMonsterBook().writeUnfinished(mplew);
        }
        mplew.writeInt(chr.getMonsterBook().getSet());
        mplew.writeZeroBytes(9); //tespia lol

        /*
         * int totalVitality = 0; mplew.writeInt(chr.getFamiliars().size());
         * //size for (MonsterFamiliar mf : chr.getFamiliars().values()) {
         * mf.writeRegisterPacket(mplew, true); totalVitality +=
         * mf.getVitality(); }
         *
         * mplew.writeInt(totalVitality); //size of ALL not just stacked for
         * (MonsterFamiliar mf : chr.getFamiliars().values()) { for (int i = 0;
         * i < mf.getVitality(); i++) { mplew.writeInt(chr.getId());
         * mplew.writeInt(mf.getFamiliar()); mplew.writeLong(mf.getId() +
         * (100000 * i)); //fake it like a pro mplew.write(1); } }
         */
    }

    public static void addPetItemInfo(MaplePacketLittleEndianWriter mplew, Item item, MaplePet pet, boolean active) {
        if (item == null) {
            mplew.writeLong(PacketHelper.getKoreanTimestamp((long) (System.currentTimeMillis() * 1.5)));
        } else {
            PacketHelper.addExpirationTime(mplew, item.getExpiration() <= System.currentTimeMillis() ? -1 : item.getExpiration());
        }
        mplew.writeInt(-1);
        mplew.writeAsciiString(pet.getName(), 13);
        mplew.write(pet.getLevel());
        mplew.writeShort(pet.getCloseness());
        mplew.write(pet.getFullness());
        if (item == null) {
            mplew.writeLong(PacketHelper.getKoreanTimestamp((long) (System.currentTimeMillis() * 1.5)));
        } else {
            PacketHelper.addExpirationTime(mplew, item.getExpiration() <= System.currentTimeMillis() ? -1 : item.getExpiration());
        }
        mplew.writeShort(0);
        mplew.writeShort(pet.getFlags());
        mplew.writeInt(pet.getPetItemId() == 5000054 && pet.getSecondsLeft() > 0 ? pet.getSecondsLeft() : 0); //in seconds, 3600 = 1 hr.
        mplew.writeShort(pet.isCanPickup() ? 0 : 2);
        mplew.write(active ? (pet.getSummoned() ? pet.getSummonedValue() : 0) : 0);
        mplew.writeInt(active ? pet.getBuffSkill() : 0); //宠物自动加BUFF的技能ID
        mplew.writeInt(-1); //T071新增 大概是宠物颜色
        mplew.writeShort(0x64); //V.109新增 未知
        mplew.write(new byte[12]); //V.108新增 未知
    }

    /*
     * 0 = 全体
     * 1 = 装备
     * 2 = 消耗
     * 3 = 设置
     * 4 = 其他
     * 5 = 配方
     * 6 = 卷轴
     * 7 = 特殊
     * 8 = 8周年
     * 11 = 材料
     * 80 = 乔
     * 81 = 海丽密
     * 82 = 小龙
     * 83 = 李卡司
     */
    public static void addShopInfo(MaplePacketLittleEndianWriter mplew, MapleShop shop, MapleClient c) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        mplew.writeInt(0);//v131
        mplew.writeInt(DateUtil.getTime()); //当前系统时间的年月日时
        mplew.write(shop.getRanks().size() > 0 ? 1 : 0);
        if (shop.getRanks().size() > 0) {
            mplew.write(shop.getRanks().size());
            for (Pair<Integer, String> s : shop.getRanks()) {
                mplew.writeInt(s.left);
                mplew.writeMapleAsciiString(s.right);
            }
        }
        //道具数量+玩家回购数量
        List<MapleShopItem> shopItems = shop.getItems(c);
        mplew.writeShort(shopItems.size());
        for (MapleShopItem item : shopItems) { //加载商店道具
            mplew.writeInt(item.getItemId()); //物品ID
            mplew.writeInt((int) item.getPrice()); //物品价格
            mplew.writeInt(item.getReqItem()); //购买道具所需要的物品ID
            mplew.writeInt(item.getReqItemQ()); //购买道具需要的物品数量
            mplew.writeZeroBytes(16); //未知
            mplew.writeLong(60 * 24 * item.getPeriod()); //该道具显示购买后的使用时间 60 * 24 * X
            mplew.writeInt(item.getMinLevel());//购买等级限制
            mplew.writeZeroBytes(18); //未知
            mplew.writeLong(getTime(-2)); //T071 新增 [00 40 E0 FD 3B 37 4F 01] 
            mplew.writeLong(getTime(-1)); //T071 新增 [00 80 05 BB 46 E6 17 02]
            mplew.writeInt(item.getCategory());
            mplew.write(0);//v131
            mplew.writeMapleAsciiString("1900010100");
            mplew.writeMapleAsciiString("2079010100");
            mplew.write(item.getState() > 0 ? 1 : 0); //是否是未鉴定装备
            mplew.write(0); //可以购买的次数
            mplew.writeInt(0); //是否是时间道具
            mplew.writeZeroBytes(3);
            if (!ItemConstants.is飞镖道具(item.getItemId()) && !ItemConstants.is子弹道具(item.getItemId())) {
                mplew.writeShort(1);
                mplew.writeShort(item.getBuyable());
            } else {
                mplew.writeZeroBytes(6); //未知
                mplew.writeShort(BitTools.doubleToShortBits(ii.getPrice(item.getItemId())));
                mplew.writeShort(ii.getSlotMax(item.getItemId()));
            }
            //回购栏的道具信息
            Item rebuy = item.getRebuy();
            mplew.write(rebuy == null ? 0 : 1);
            if (rebuy != null) {
                addItemInfo(mplew, rebuy);
            }
            //十字商店信息
            if (shop.getRanks().size() > 0) {
                mplew.write(item.getCategory() >= 0 ? 1 : 0);
                if (item.getCategory() >= 0) {
                    mplew.write(item.getCategory());
                }
            }
            //下面的未知
            mplew.write(new byte[16]);
            int idarr[] = new int[]{9410165, 9410166, 9410167, 9410168, 9410198};
            for (int k = 0; k < idarr.length; k++) {
                mplew.writeInt(idarr[k]);
                mplew.writeInt(c.getPlayer().getFriendShipPoints()[k]);
            }
        }
    }

    public static void addJaguarInfo(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        if (chr.getJob() >= 3300 && chr.getJob() <= 3312) {
            mplew.write(chr.getIntNoRecord(GameConstants.JAGUAR));
            for (int i = 0; i < 5; i++) {
                mplew.writeInt(0); //probably mobID of the 5 mobs that can be captured.
            }
        }
    }

    public static void addLittleWhite(MaplePacketLittleEndianWriter mplew, MapleCharacter chr) {
        mplew.write(JobConstants.is阴阳师(chr.getJob()) ? 1 : 0);
        if (JobConstants.is阴阳师(chr.getJob())) {
            mplew.writeInt(chr.getId());
            mplew.writeInt(chr.getLittleWhite().getSkillId());
            mplew.write(1);//chr.getLittleWhite().isShow() ? 1 : 2
            mplew.writePos(chr.getLittleWhite().getTruePosition());
            mplew.writeInt(0);
        }
    }
}
