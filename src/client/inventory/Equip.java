package client.inventory;

import constants.GameConstants;
import constants.ItemConstants;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

import server.MapleItemInformationProvider;
import server.Randomizer;

public class Equip extends Item implements Serializable {

    private static final long serialVersionUID = -4385634094556865314L;

    public enum ScrollResult {

        失败, 成功, 消失
    }

    public static final long ARMOR_RATIO = 350000;
    public static final long WEAPON_RATIO = 700000;
    //charm: -1 = has not been initialized yet, 0 = already been worn, >0 = has teh charm exp
    private byte upgradeSlots = 0, level = 0, vicioushammer = 0, state = 0, enhance = 0;
    private short enhanctBuff = 0, reqLevel = 0, yggdrasilWisdom = 0, bossDamage = 0, ignorePDR = 0, totalDamage = 0, allStat = 0, karmaCount = -1; //新增的装备属性
    private boolean finalStrike = false;  //新增的装备属性
    private short str = 0, dex = 0, _int = 0, luk = 0, hp = 0, mp = 0, watk = 0, matk = 0, wdef = 0, mdef = 0, acc = 0, avoid = 0, hands = 0, speed = 0, jump = 0, charmExp = 0, pvpDamage = 0;
    private int durability = -1, incSkill = -1, statemsg = 0;
    private int potential1 = 0, potential2 = 0, potential3 = 0, potential4 = 0, potential5 = 0, potential6 = 0;
    private int socket1 = -1, socket2 = -1, socket3 = -1; //V.102新增 装备插槽
    private int itemSkin = 0; //装备皮肤 也是装备外观改变 以后会用到暂时写在这
    private int limitBreak = 0; //武器装备的攻击突破上限附加数字
    private MapleRing ring = null;
    private MapleAndroid android = null;
    // 潜能锁
    private int lockSlot = 0;
    private short lockId = 0;
    private byte sealedLevel = 0;
    private long sealedExp = 0, itemEXP = 0;
    private short soulname, soulenchanter, soulpotential;
    private int soulSkill = 0;
    private Map<EquipStats, Long> statsTest = new LinkedHashMap<>();

    public Equip(int id, short position, byte flag) {
        super(id, position, (short) 1, flag);
    }

    public Equip(int id, short position, int uniqueid, short flag) {
        super(id, position, (short) 1, flag, uniqueid);
    }

    @Override
    public Item copy() {
        Equip ret = new Equip(getItemId(), getPosition(), getUniqueId(), getFlag());
        ret.str = str; //力量
        ret.dex = dex; //敏捷
        ret._int = _int; //智力
        ret.luk = luk; //运气
        ret.hp = hp; //Hp
        ret.mp = mp; //Mp
        ret.matk = matk; //魔法攻击
        ret.mdef = mdef; //魔法防御
        ret.watk = watk; //物理攻击
        ret.wdef = wdef; //物理防御
        ret.acc = acc; //命中率
        ret.avoid = avoid; //回避率
        ret.hands = hands; //手技
        ret.speed = speed; //移动速度
        ret.jump = jump; //跳跃力
        ret.upgradeSlots = upgradeSlots;  //可升级次数
        ret.level = level; //已升级次数
        ret.itemEXP = itemEXP;
        ret.durability = durability; //耐久度
        ret.vicioushammer = vicioushammer; //金锤子
        ret.state = state; //潜能等级
        ret.enhance = enhance; //星级
        ret.potential1 = potential1; //潜能1
        ret.potential2 = potential2; //潜能2
        ret.potential3 = potential3; //潜能3
        ret.potential4 = potential4; //潜能4
        ret.potential5 = potential5; //潜能5
        ret.potential6 = potential6; //潜能6
        ret.charmExp = charmExp; //魅力经验
        ret.pvpDamage = pvpDamage; //大乱斗攻击力
        ret.incSkill = incSkill; //是否拥有技能
        ret.statemsg = statemsg; //星级提示
        ret.socket1 = socket1; //镶嵌宝石1
        ret.socket2 = socket2; //镶嵌宝石1
        ret.socket3 = socket3; //镶嵌宝石1
        ret.itemSkin = itemSkin; //道具合成后的外观
        ret.limitBreak = limitBreak; //武器攻击突破上限
        //---------------------------------------------------------
        //下面的为新增的装备属性
        ret.enhanctBuff = enhanctBuff;
        ret.reqLevel = reqLevel;
        ret.yggdrasilWisdom = yggdrasilWisdom;
        ret.finalStrike = finalStrike;
        ret.bossDamage = bossDamage;
        ret.ignorePDR = ignorePDR;
        ret.totalDamage = totalDamage;
        ret.allStat = allStat;
        ret.karmaCount = karmaCount;
        ret.statsTest = statsTest;
        //---------------------------------------------------------
        ret.setGMLog(getGMLog()); //装备是从什么地方获得的信息
        ret.setGiftFrom(getGiftFrom()); //是谁送的礼物
        ret.setOwner(getOwner()); //拥有者名字
        ret.setQuantity(getQuantity()); //数量
        ret.setExpiration(getExpiration()); //道具经验
        ret.setInventoryId(getInventoryId()); //道具的SQLid分解装备和合成装备需要
        ret.setEquipOnlyId(getEquipOnlyId()); //装备道具的唯一ID
        //--------------------------------------------------------
        ret.lockSlot = lockSlot;
        ret.lockId = lockId;
        ret.sealedLevel = sealedLevel;
        ret.sealedExp = sealedExp;
        //灵魂武器
        ret.soulname = soulname;
        ret.soulenchanter = soulenchanter;
        ret.soulpotential = soulpotential;
        ret.soulSkill = soulSkill;
        return ret;
    }

    @Override
    public byte getType() {
        return 1;
    }

    public byte getUpgradeSlots() {
        return upgradeSlots;
    }

    public short getStr() {
        return str;
    }

    public short getDex() {
        return dex;
    }

    public short getInt() {
        return _int;
    }

    public short getLuk() {
        return luk;
    }

    public short getHp() {
        return hp;
    }

    public short getMp() {
        return mp;
    }

    public short getWatk() {
        return watk;
    }

    public short getMatk() {
        return matk;
    }

    public short getWdef() {
        return wdef;
    }

    public short getMdef() {
        return mdef;
    }

    public short getAcc() {
        return acc;
    }

    public short getAvoid() {
        return avoid;
    }

    public short getHands() {
        return hands;
    }

    public short getSpeed() {
        return speed;
    }

    public short getJump() {
        return jump;
    }

    public void setStr(short str) {
        if (str < 0) {
            str = 0;
        }
        this.str = str;
    }

    public void setDex(short dex) {
        if (dex < 0) {
            dex = 0;
        }
        this.dex = dex;
    }

    public void setInt(short _int) {
        if (_int < 0) {
            _int = 0;
        }
        this._int = _int;
    }

    public void setLuk(short luk) {
        if (luk < 0) {
            luk = 0;
        }
        this.luk = luk;
    }

    public void setHp(short hp) {
        if (hp < 0) {
            hp = 0;
        }
        this.hp = hp;
    }

    public void setMp(short mp) {
        if (mp < 0) {
            mp = 0;
        }
        this.mp = mp;
    }

    public void setWatk(short watk) {
        if (watk < 0) {
            watk = 0;
        }
        this.watk = watk;
    }

    public void setMatk(short matk) {
        if (matk < 0) {
            matk = 0;
        }
        this.matk = matk;
    }

    public void setWdef(short wdef) {
        if (wdef < 0) {
            wdef = 0;
        }
        this.wdef = wdef;
    }

    public void setMdef(short mdef) {
        if (mdef < 0) {
            mdef = 0;
        }
        this.mdef = mdef;
    }

    public void setAcc(short acc) {
        if (acc < 0) {
            acc = 0;
        }
        this.acc = acc;
    }

    public void setAvoid(short avoid) {
        if (avoid < 0) {
            avoid = 0;
        }
        this.avoid = avoid;
    }

    public void setHands(short hands) {
        if (hands < 0) {
            hands = 0;
        }
        this.hands = hands;
    }

    public void setSpeed(short speed) {
        if (speed < 0) {
            speed = 0;
        }
        this.speed = speed;
    }

    public void setJump(short jump) {
        if (jump < 0) {
            jump = 0;
        }
        this.jump = jump;
    }

    public void setUpgradeSlots(byte upgradeSlots) {
        this.upgradeSlots = upgradeSlots;
    }

    public byte getLevel() {
        return level;
    }

    public void setLevel(byte level) {
        this.level = level;
    }

    public byte getViciousHammer() {
        return vicioushammer;
    }

    public void setViciousHammer(byte ham) {
        vicioushammer = ham;
    }

    public long getItemEXP() {
        return itemEXP;
    }

    public void setItemEXP(long itemEXP) {
        if (itemEXP < 0) {
            itemEXP = 0;
        }
        this.itemEXP = itemEXP;
    }

    public long getEquipExp() {
        if (itemEXP <= 0) {
            return 0;
        }
        //aproximate value
        if (ItemConstants.isWeapon(getItemId())) {
            return itemEXP / WEAPON_RATIO;
        } else {
            return itemEXP / ARMOR_RATIO;
        }
    }

    public long getEquipExpForLevel() {
        if (getEquipExp() <= 0) {
            return 0;
        }
        long expz = getEquipExp();
        for (int i = getBaseLevel(); i <= GameConstants.getMaxLevel(getItemId()); i++) {
            if (expz >= GameConstants.getExpForLevel(i, getItemId())) {
                expz -= GameConstants.getExpForLevel(i, getItemId());
            } else {
                break;
            }
        }
        return expz;
    }

    public long getExpPercentage() {
        if (getEquipLevel() < getBaseLevel() || getEquipLevel() > GameConstants.getMaxLevel(getItemId()) || GameConstants.getExpForLevel(getEquipLevel(), getItemId()) <= 0) {
            return 0;
        }
        return getEquipExpForLevel() * 100 / GameConstants.getExpForLevel(getEquipLevel(), getItemId());
    }

    public int getEquipLevel() {
        int fixLevel = 0;
        Map<String, Integer> equipStats = MapleItemInformationProvider.getInstance().getEquipStats(getItemId());
        if (equipStats.containsKey("fixLevel")) {
            fixLevel = equipStats.get("fixLevel");
        }

        if (GameConstants.getMaxLevel(getItemId()) <= 0) {
            return fixLevel;
        }

        int levelz = getBaseLevel() + fixLevel;
        if (getEquipExp() <= 0) {
            return levelz;
        }
        long expz = getEquipExp();
        for (int i = levelz; (GameConstants.getStatFromWeapon(getItemId()) == null ? (i <= GameConstants.getMaxLevel(getItemId())) : (i < GameConstants.getMaxLevel(getItemId()))); i++) {
            if (expz >= GameConstants.getExpForLevel(i, getItemId())) {
                levelz++;
                expz -= GameConstants.getExpForLevel(i, getItemId());
            } else {
                break;
            }
        }
        return levelz;
    }

    public int getBaseLevel() {
        return (GameConstants.getStatFromWeapon(getItemId()) == null ? 1 : 0);
    }

    @Override
    public void setQuantity(short quantity) {
        if (quantity < 0 || quantity > 1) {
            throw new RuntimeException("设置装备的数量错误 欲设置的数量： " + quantity + " (道具ID: " + getItemId() + ")");
        }
        super.setQuantity(quantity);
    }

    /*
     * 耐久度也就是持久
     */
    public int getDurability() {
        return durability;
    }

    public void setDurability(int dur) {
        this.durability = dur;
    }

    /*
     * 星级
     */
    public byte getEnhance() {
        return enhance;
    }

    public void setEnhance(byte en) {
        this.enhance = en;
    }

    /*
     * 潜能属性1
     */
    public int getOptential1() {
        return potential1;
    }

    public void setOptential1(int en) {
        this.potential1 = en;
    }

    /*
     * 潜能属性2
     */
    public int getOptential2() {
        return potential2;
    }

    public void setOptential2(int en) {
        this.potential2 = en;
    }

    /*
     * 潜能属性3
     */
    public int getOptential3() {
        return potential3;
    }

    public void setOptential3(int en) {
        this.potential3 = en;
    }

    /*
     * 潜能属性4
     */
    public int getOptential4() {
        return potential4;
    }

    public void setOptential4(int en) {
        this.potential4 = en;
    }

    /*
     * 潜能属性5
     */
    public int getOptential5() {
        return potential5;
    }

    public void setOptential5(int en) {
        this.potential5 = en;
    }

    /*
     * 潜能属性6
     */
    public int getOptential6() {
        return potential6;
    }

    public void setOptential6(int en) {
        this.potential6 = en;
    }

    /*
     * 装备的等级
     * 15 = 未鉴定 16以下 20以上都是未鉴定
     * 16 = C级
     * 17 = B级
     * 18 = A级
     * 19 = S级
     * 20 = SS级
     */
    public byte getState() {
        return getState(false);
    }

    public byte getState(boolean useAddPot) {
        byte ret = 0; //默认C级属性
        if (potential1 >= 40000 || potential2 >= 40000 || potential3 >= 40000) {
            ret = 0x14; //有SS级潜能属性
        } else if (potential1 >= 30000 || potential2 >= 30000 || potential3 >= 30000) {
            ret = 0x13; //有S级潜能属性
        } else if (potential1 >= 20000 || potential2 >= 20000 || potential3 >= 20000) {
            ret = 0x12; //有A级潜能属性
        } else if (potential1 >= 1 || potential2 >= 1 || potential3 >= 1) {
            ret = 0x11; //有B级潜能属性
        } else if (potential1 < 0 || potential2 < 0 || potential3 < 0) {
            ret = 0x01; //未鉴定状态
        }
        if (useAddPot && (potential4 < 0 || potential5 < 0 || potential6 < 0)) {
            ret |= 0x20; //附加潜能状态
        }
        return ret; //返回装备的潜能的状态属性
    }

    public void setState(byte en) {
        this.state = en;
    }

    public void resetOptential_Fuse(boolean half, int optentialState) { //maker skill - equip first receive
        //0.16% chance unique, 4% chance epic, else rare
        optentialState = -optentialState;
        if (Randomizer.nextInt(100) < 4) {
            optentialState -= Randomizer.nextInt(100) < 4 ? 2 : 1;
        }
        setOptential1(optentialState);
        setOptential2((Randomizer.nextInt(half ? 5 : 10) == 0 ? optentialState : 0)); //1/10 chance of 3 line
        setOptential3(0); //just set it theoretically
    }

    public void resetOptential() { //equip first one, scroll hidden on it
        //no legendary, 0.16% chance unique, 4% chance epic, else rare
        int rank = Randomizer.nextInt(100) < 4 ? (Randomizer.nextInt(100) < 4 ? -19 : -18) : -17;
        setOptential1(rank);
        setOptential2((Randomizer.nextInt(10) == 0 ? rank : 0)); //1/10 chance of 3 line
        setOptential3(0); //just set it theoretically
    }

    /*
     * 0 = 5062000 - 神奇魔方
     * 1 = 5062100 - 枫叶魔方 5062001 - 混沌神奇魔方
     * 2 = A级潜能卷
     * 3 = 5062002 - 高级神奇魔方
     * 4 = S级潜能卷
     */
    public void renewOptential(int type) {
        renewOptential(type, 4);
    }

    public void renewOptential(int type, int rate) {
        int rank = type == 4 ? -19 : type == 2 ? -18 : (Randomizer.nextInt(100) < rate && getState() < (type == 3 ? 20 : 19) ? -(getState() + 1) : -(getState())); // 4 % chance to up 1 tier
        setOptential1(rank);
        setOptential2(rank);
        setOptential3(0);
    }

    public byte getAddState() {
        byte ret = 0;
        if (potential4 < 0 || potential5 < 0 || potential6 < 0) {
            ret = 0x11;
        }
        return ret;
    }

    public byte getAddState(int lines) {
        byte ret = 0;
        int potential = lines == 6 ? potential6 : lines == 5 ? potential5 : potential4;
        if (potential >= 40000) {
            ret = 0x14;
        } else if (potential >= 30000) {
            ret = 0x13;
        } else if (potential >= 20000) {
            ret = 0x12;
        } else if (potential >= 1) {
            ret = 0x11;
        }
        return ret;
    }

    /*
     * 重置附加潜能属性
     */
    public void renewAddOptential(int rate, int lines) {
        int rank = (Randomizer.nextInt(100) < rate && getAddState(lines) != 20 ? -(getAddState(lines) + 1) : -(getAddState(lines)));
        if (lines == 6) {
            setOptential6(rank);
        } else if (lines == 5) {
            setOptential5(rank);
        } else {
            setOptential4(rank);
        }
    }

    /*
     * 装备技能
     */
    public int getIncSkill() {
        return incSkill;
    }

    public void setIncSkill(int inc) {
        this.incSkill = inc;
    }

    /*
     * 装备魅力经验
     */
    public short getCharmEXP() {
        return charmExp;
    }

    public void setCharmEXP(short s) {
        this.charmExp = s;
    }

    /*
     * 装备大乱斗攻击力
     */
    public short getPVPDamage() {
        return pvpDamage;
    }

    public void setPVPDamage(short p) {
        this.pvpDamage = p;
    }

    /*
     * 戒指
     */
    public MapleRing getRing() {
        if (!ItemConstants.isEffectRing(getItemId()) || getUniqueId() <= 0) {
            return null;
        }
        if (ring == null) {
            ring = MapleRing.loadFromDb(getUniqueId(), getPosition() < 0);
        }
        return ring;
    }

    public void setRing(MapleRing ring) {
        this.ring = ring;
    }

    /*
     * 安卓
     */
    public MapleAndroid getAndroid() {
        if (getItemId() / 10000 != 166 || getUniqueId() <= 0) {
            return null;
        }
        if (android == null) {
            android = MapleAndroid.loadFromDb(getItemId(), getUniqueId());
        }
        return android;
    }

    public void setAndroid(MapleAndroid ring) {
        this.android = ring;
    }

    /*
     * 星级提示次数
     */
    public int getStateMsg() {
        return statemsg;
    }

    public void setStateMsg(int en) {
        if (en >= 3) {
            this.statemsg = 3;
        } else if (en < 0) {
            this.statemsg = 0;
        } else {
            this.statemsg = en;
        }
    }

    /*
     * 装备插槽 可以镶嵌宝石
     * V.102新增功能
     * 0x01 = 你可以在这件物品上镶入星岩。
     * 0x03 = 你可以在这件物品上镶入星岩。 有个镶嵌的孔 未镶嵌
     * 0x13 = 有1个插孔 已经镶嵌东西
     */
    public short getSocketState() {
        short flag = 0;
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        boolean isSocketItem = !ii.isCash(getItemId()); //ii.isActivatedSocketItem(getItemId());
        if (isSocketItem) {
            flag |= SocketFlag.可以镶嵌.getValue();
            if (socket1 == -1 && isSocketItem) {
                setSocket1(0);
            }
            if (socket1 != -1) {
                flag |= SocketFlag.已打孔01.getValue();
            }
            if (socket2 != -1) {
                flag |= SocketFlag.已打孔02.getValue();
            }
            if (socket3 != -1) {
                flag |= SocketFlag.已打孔03.getValue();
            }
            if (socket1 > 0) {
                flag |= SocketFlag.已镶嵌01.getValue();
            }
            if (socket2 > 0) {
                flag |= SocketFlag.已镶嵌02.getValue();
            }
            if (socket3 > 0) {
                flag |= SocketFlag.已镶嵌03.getValue();
            }
        }
        return flag;
    }

    public int getSocket1() {
        return socket1;
    }

    public void setSocket1(int socket) {
        this.socket1 = socket;
    }

    public int getSocket2() {
        return socket2;
    }

    public void setSocket2(int socket) {
        this.socket2 = socket;
    }

    public int getSocket3() {
        return socket3;
    }

    public void setSocket3(int socket) {
        this.socket3 = socket;
    }

    /*
     * 装备合成后的外观
     */
    public int getItemSkin() {
        return itemSkin;
    }

    public void setItemSkin(int id) {
        this.itemSkin = id;
    }

    /*
     * 新增的装备属性
     */
    public short getEnhanctBuff() {
        return enhanctBuff;
    }

    public void setEnhanctBuff(short enhanctBuff) {
        if (enhanctBuff < 0) {
            enhanctBuff = 0;
        }
        this.enhanctBuff = enhanctBuff;
    }

    public short getReqLevel() {
        return reqLevel;
    }

    public void setReqLevel(short reqLevel) {
        if (reqLevel < 0) {
            reqLevel = 0;
        }
        this.reqLevel = reqLevel;
    }

    public short getYggdrasilWisdom() {
        return yggdrasilWisdom;
    }

    public void setYggdrasilWisdom(short yggdrasilWisdom) {
        if (yggdrasilWisdom < 0) {
            yggdrasilWisdom = 0;
        }
        this.yggdrasilWisdom = yggdrasilWisdom;
    }

    public boolean getFinalStrike() {
        return finalStrike;
    }

    public void setFinalStrike(boolean finalStrike) {
        this.finalStrike = finalStrike;
    }

    public short getBossDamage() {
        return bossDamage;
    }

    public void setBossDamage(short bossDamage) {
        if (bossDamage < 0) {
            bossDamage = 0;
        }
        this.bossDamage = bossDamage;
    }

    public short getIgnorePDR() {
        return ignorePDR;
    }

    public void setIgnorePDR(short ignorePDR) {
        if (ignorePDR < 0) {
            ignorePDR = 0;
        }
        this.ignorePDR = ignorePDR;
    }

    /*
     * 新增的装备特殊属性
     */
    public short getTotalDamage() {
        return totalDamage;
    }

    public void setTotalDamage(short totalDamage) {
        if (totalDamage < 0) {
            totalDamage = 0;
        }
        this.totalDamage = totalDamage;
    }

    public short getAllStat() {
        return allStat;
    }

    public void setAllStat(short allStat) {
        if (allStat < 0) {
            allStat = 0;
        }
        this.allStat = allStat;
    }

    public short getKarmaCount() {
        return karmaCount;
    }

    public void setKarmaCount(short karmaCount) {
        this.karmaCount = karmaCount;
    }

    public Map<EquipStats, Long> getStatsTest() {
        return statsTest;
    }

    /*
     * 装备的总体状态
     */
    public int getEquipFlag() {
        int flag = 0;
        if (getUpgradeSlots() > 0) {
            flag |= EquipStats.可升级次数.getValue(); //可升级次数
        }
        if (getLevel() > 0) {
            flag |= EquipStats.已升级次数.getValue(); //已升级次数
        }
        if (getStr() > 0) {
            flag |= EquipStats.力量.getValue(); //力量
        }
        if (getDex() > 0) {
            flag |= EquipStats.敏捷.getValue(); //敏捷
        }
        if (getInt() > 0) {
            flag |= EquipStats.智力.getValue(); //智力
        }
        if (getLuk() > 0) {
            flag |= EquipStats.运气.getValue(); //运气
        }
        if (getHp() > 0) {
            flag |= EquipStats.Hp.getValue(); //Hp 
        }
        if (getMp() > 0) {
            flag |= EquipStats.Mp.getValue(); //Mp
        }
        if (getWatk() > 0) {
            flag |= EquipStats.物攻.getValue(); //物理攻击
        }
        if (getMatk() > 0) {
            flag |= EquipStats.魔攻.getValue(); //魔法攻击
        }
        if (getWdef() > 0) {
            flag |= EquipStats.物防.getValue(); //物理防御
        }
        if (getMdef() > 0) {
            flag |= EquipStats.魔防.getValue(); //魔法防御
        }
        if (getAcc() > 0) {
            flag |= EquipStats.命中.getValue(); //命中率
        }
        if (getAvoid() > 0) {
            flag |= EquipStats.回避.getValue(); //回避率
        }
        if (getHands() > 0) {
            flag |= EquipStats.手技.getValue(); //手技
        }
        if (getSpeed() > 0) {
            flag |= EquipStats.速度.getValue(); //移动速度
        }
        if (getJump() > 0) {
            flag |= EquipStats.跳跃.getValue(); //跳跃力
        }
        if (getFlag() > 0) {
            flag |= EquipStats.状态.getValue(); //道具状态
        }
        if (getIncSkill() > 0) {
            flag |= EquipStats.技能.getValue(); //是否拥有技能
        }
        if (isSealedEquip()) {
            if (getSealedLevel() > 0) {
                flag |= EquipStats.道具等级.getValue();
            }
            if (getSealedExp() > 0) {
                flag |= EquipStats.道具经验.getValue(); //道具经验
            }
        } else {
            if (getEquipLevel() > 0) {
                flag |= EquipStats.道具等级.getValue(); //道具等级
            }
            if (getExpPercentage() > 0) {
                flag |= EquipStats.道具经验.getValue(); //道具经验
            }
        }
        if (getDurability() > 0) {
            flag |= EquipStats.耐久度.getValue(); //耐久度
        }
        if (getViciousHammer() > 0) {
            flag |= EquipStats.金锤子.getValue(); //金锤子
        }
        if (getPVPDamage() > 0) {
            flag |= EquipStats.大乱斗攻击力.getValue(); //大乱斗攻击力
        }
        if (getEnhanctBuff() > 0) {
            flag |= EquipStats.ENHANCT_BUFF.getValue(); //强化效果
        }
        if (getReqLevel() > 0) {
            flag |= EquipStats.REQUIRED_LEVEL.getValue(); //穿戴装备的等级要求提高
        }
        if (getYggdrasilWisdom() > 0) {
            flag |= EquipStats.YGGDRASIL_WISDOM.getValue();
        }
        if (getFinalStrike()) {
            flag |= EquipStats.FINAL_STRIKE.getValue(); //最终一击卷轴成功
        }
        if (getBossDamage() > 0) {
            flag |= EquipStats.BOSS伤害.getValue(); //BOSS伤害增加百分比
        }
        if (getIgnorePDR() > 0) {
            flag |= EquipStats.无视防御.getValue(); //无视怪物增加百分比
        }
        return flag;
    }

    /*
     * 装备的特殊状态
     */
    public int getEquipSpecialFlag() {
        int flag = EquipSpecialStat.UNK10.getValue();
        if (getTotalDamage() > 0) {
            flag |= EquipSpecialStat.总伤害.getValue(); //装备总伤害百分比增加
        }
        if (getAllStat() > 0) {
            flag |= EquipSpecialStat.全属性.getValue(); //装备所有属性百分比增加
        }
        flag |= EquipSpecialStat.剪刀次数.getValue(); //可以使用剪刀多少次 默认必须
//        flag |= 0x08;
        return flag;
    }

    /*
     * 武器装备的攻击突破上限附加数字
     * 5000000 = 500万
     * 上限设置为 21亿
     */
    public int getLimitBreak() {
        return Math.min(limitBreak, 2100000000);
    }

    public void setLimitBreak(int lb) {
        this.limitBreak = lb;
    }

    public void setOptentials(int potline, int potId) {
        if (potline == 1) {
            setOptential1(potId);
        } else if (potline == 2) {
            setOptential2(potId);
        } else if (potline == 3) {
            setOptential3(potId);
        } else if (potline == 4) {
            setOptential4(potId);
        } else if (potline == 5) {
            setOptential5(potId);
        } else if (potline == 6) {
            setOptential6(potId);
        }
    }

    public void setLockOptential(int slot, short id) {
        lockSlot = slot;
        lockId = id;
    }

    public int getLockSlot() {
        return lockSlot;
    }

    public int getLockId() {
        return lockId;
    }

    public boolean isSealedEquip() {
        return GameConstants.isSealedEquip(getItemId());
    }

    public void setSealedLevel(byte level) {
        sealedLevel = level;
    }

    public byte getSealedLevel() {
        return sealedLevel;
    }

    public void setSealedExp(long exp) {
        sealedExp = exp;
    }

    public void gainSealedExp(long gain) {
        sealedExp += gain;
    }

    public long getSealedExp() {
        return sealedExp;
    }

    public short getSoulName() {
        return soulname;
    }

    public void setSoulName(short soulname) {
        this.soulname = soulname;
    }

    public short getSoulEnchanter() {
        return soulenchanter;
    }

    public void setSoulEnchanter(short soulenchanter) {
        this.soulenchanter = soulenchanter;
    }

    public short getSoulOptential() {
        return soulpotential;
    }

    public void setSoulOptential(short soulpotential) {
        this.soulpotential = soulpotential;
    }

    public int getSoulSkill() {
        return soulSkill;
    }

    public void setSoulSkill(int skillid) {
        this.soulSkill = skillid;
    }
}
