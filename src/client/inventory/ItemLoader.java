package client.inventory;

import constants.ItemConstants;
import database.DatabaseConnection;

import java.sql.*;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import server.MapleItemInformationProvider;
import tools.Pair;

public enum ItemLoader {

    装备道具(0, false),
    仓库道具(1, true),
    现金道具(2, true),
    雇佣道具(5, false),
    送货道具(6, false),
    拍卖道具(8, false),
    MTS_TRANSFER(9, false);
    private int value;
    private boolean account;

    ItemLoader(int value, boolean account) {
        this.value = value;
        this.account = account;
    }

    public int getValue() {
        return value;
    }

    //does not need connection con to be auto commit
    public Map<Long, Pair<Item, MapleInventoryType>> loadItems(boolean login, int id) throws SQLException {
        Map<Long, Pair<Item, MapleInventoryType>> items = new LinkedHashMap<>();

        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            StringBuilder query = new StringBuilder();
            query.append("SELECT * FROM `inventoryitems` LEFT JOIN `inventoryequipment` USING(`inventoryitemid`) WHERE `type` = ? AND `");
            query.append(account ? "accountid" : "characterid");
            query.append("` = ?");

            if (login) {
                query.append(" AND `inventorytype` = ");
                query.append(MapleInventoryType.EQUIPPED.getType());
            }

            ps = DatabaseConnection.getConnection().prepareStatement(query.toString());
            ps.setInt(1, value);
            ps.setInt(2, id);
            rs = ps.executeQuery();

            MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
            while (rs.next()) {
                if (!ii.itemExists(rs.getInt("itemid"))) { //没有存在的道具就跳过
                    continue;
                }
                MapleInventoryType mit = MapleInventoryType.getByType(rs.getByte("inventorytype"));

                if (mit.equals(MapleInventoryType.EQUIP) || mit.equals(MapleInventoryType.EQUIPPED)) {
                    Equip equip = new Equip(rs.getInt("itemid"), rs.getShort("position"), rs.getInt("uniqueid"), rs.getShort("flag"));
                    if (!login && equip.getPosition() != -55) { //monsterbook
                        equip.setQuantity((short) 1);
                        equip.setInventoryId(rs.getLong("inventoryitemid"));
                        equip.setOwner(rs.getString("owner"));
                        equip.setExpiration(rs.getLong("expiredate"));
                        equip.setEquipOnlyId(rs.getInt("equipOnlyId")); //设置装备道具的唯一ID
                        equip.setUpgradeSlots(rs.getByte("upgradeslots"));
                        equip.setLevel(rs.getByte("level"));
                        equip.setStr(rs.getShort("str"));
                        equip.setDex(rs.getShort("dex"));
                        equip.setInt(rs.getShort("int"));
                        equip.setLuk(rs.getShort("luk"));
                        equip.setHp(rs.getShort("hp"));
                        equip.setMp(rs.getShort("mp"));
                        equip.setWatk(rs.getShort("watk"));
                        equip.setMatk(rs.getShort("matk"));
                        equip.setWdef(rs.getShort("wdef"));
                        equip.setMdef(rs.getShort("mdef"));
                        equip.setAcc(rs.getShort("acc"));
                        equip.setAvoid(rs.getShort("avoid"));
                        equip.setHands(rs.getShort("hands"));
                        equip.setSpeed(rs.getShort("speed"));
                        equip.setJump(rs.getShort("jump"));
                        equip.setViciousHammer(rs.getByte("ViciousHammer"));
                        equip.setItemEXP(rs.getLong("itemEXP"));
                        equip.setGMLog(rs.getString("GM_Log"));
                        equip.setDurability(rs.getInt("durability"));
                        equip.setState(rs.getByte("state"));
                        equip.setEnhance(rs.getByte("enhance"));
                        equip.setOptential1(rs.getInt("potential1"));
                        equip.setOptential2(rs.getInt("potential2"));
                        equip.setOptential3(rs.getInt("potential3"));
                        equip.setOptential4(rs.getInt("potential4"));
                        equip.setOptential5(rs.getInt("potential5"));
                        equip.setOptential6(rs.getInt("potential6"));
                        equip.setGiftFrom(rs.getString("sender"));
                        equip.setIncSkill(rs.getInt("incSkill"));
                        equip.setPVPDamage(rs.getShort("pvpDamage"));
                        equip.setCharmEXP(rs.getShort("charmEXP"));
                        equip.setStateMsg(rs.getInt("statemsg")); //潜能等级提示设置
                        equip.setSocket1(rs.getInt("itemSlot1")); //镶嵌宝石1
                        equip.setSocket2(rs.getInt("itemSlot2")); //镶嵌宝石2
                        equip.setSocket3(rs.getInt("itemSlot3")); //镶嵌宝石3
                        equip.setItemSkin(rs.getInt("itemSkin")); //道具合成后的外形
                        equip.setLimitBreak(rs.getInt("limitBreak")); //武器攻击突破上限
                        //新增装备属性
                        equip.setEnhanctBuff(rs.getShort("enhanctBuff"));
                        equip.setReqLevel(rs.getShort("reqLevel"));
                        equip.setYggdrasilWisdom(rs.getShort("yggdrasilWisdom"));
                        equip.setFinalStrike(rs.getShort("finalStrike") > 0);
                        equip.setBossDamage(rs.getShort("bossDamage"));
                        equip.setIgnorePDR(rs.getShort("ignorePDR"));
                        //新增装备特殊属性
                        equip.setTotalDamage(rs.getShort("totalDamage"));
                        equip.setAllStat(rs.getShort("allStat"));
                        equip.setKarmaCount(rs.getShort("karmaCount"));
                        //漩涡装备属性
                        equip.setSealedLevel(equip.isSealedEquip() ? (byte) Math.max(1, rs.getByte("sealedlevel")) : 0);
                        equip.setSealedExp(rs.getLong("sealedExp"));
                        //灵魂武器属性
                        equip.setSoulName(rs.getShort("soulname"));
                        equip.setSoulEnchanter(rs.getShort("soulenchanter"));
                        equip.setSoulOptential(rs.getShort("soulpotential"));
                        equip.setSoulSkill(rs.getInt("soulskill"));
                        /*
                         * 如果装备的魅力小于0 就重新加载默认的魅力
                         */
                        if (equip.getCharmEXP() < 0) {
                            equip.setCharmEXP(((Equip) ii.getEquipById(equip.getItemId())).getCharmEXP());
                        }
                        /*
                         * 装备特殊的潜能属性
                         */
                        if (equip.getBossDamage() <= 0 && ii.getBossDamageRate(equip.getItemId()) > 0) {
                            equip.setBossDamage((short) ii.getBossDamageRate(equip.getItemId()));
                        }
                        if (equip.getIgnorePDR() <= 0 && ii.getIgnoreMobDmageRate(equip.getItemId()) > 0) {
                            equip.setIgnorePDR((short) ii.getIgnoreMobDmageRate(equip.getItemId()));
                        }
                        if (equip.getTotalDamage() <= 0 && ii.getTotalDamage(equip.getItemId()) > 0) {
                            equip.setTotalDamage((short) ii.getTotalDamage(equip.getItemId()));
                        }
                        if (equip.getOptential1() == 0 && ii.getOption1(equip.getItemId()) > 0) {
                            equip.setOptential1(ii.getOption1(equip.getItemId()));
                        }
                        if (equip.getOptential2() == 0 && ii.getOption2(equip.getItemId()) > 0) {
                            equip.setOptential2(ii.getOption2(equip.getItemId()));
                        }
                        if (equip.getOptential3() == 0 && ii.getOption3(equip.getItemId()) > 0) {
                            equip.setOptential3(ii.getOption3(equip.getItemId()));
                        }
                        /*
                         * 如果道具合成后的外形ID大于 0 且 物品数据中没有这个道具就设置外形为 0
                         */
                        if (equip.getItemSkin() > 0 && !ii.itemExists(equip.getItemSkin())) {
                            equip.setItemSkin(0);
                        }
                        if (equip.getUniqueId() > -1) {
                            if (ItemConstants.isEffectRing(rs.getInt("itemid"))) {
                                MapleRing ring = MapleRing.loadFromDb(equip.getUniqueId(), mit.equals(MapleInventoryType.EQUIPPED));
                                if (ring != null) {
                                    equip.setRing(ring);
                                }
                            } else if (equip.getItemId() / 10000 == 166) {
                                MapleAndroid android = MapleAndroid.loadFromDb(equip.getItemId(), equip.getUniqueId());
                                if (android != null) {
                                    equip.setAndroid(android);
                                }
                            }
                        }
                        if (equip.hasSetOnlyId()) {
                            equip.setEquipOnlyId(MapleEquipOnlyId.getInstance().getNextEquipOnlyId());
                        }
                    }
                    items.put(rs.getLong("inventoryitemid"), new Pair<>(equip.copy(), mit));
                } else {
                    Item item = new Item(rs.getInt("itemid"), rs.getShort("position"), rs.getShort("quantity"), rs.getShort("flag"), rs.getInt("uniqueid"));
                    item.setOwner(rs.getString("owner"));
                    item.setInventoryId(rs.getLong("inventoryitemid"));
                    item.setExpiration(rs.getLong("expiredate"));
                    item.setGMLog(rs.getString("GM_Log"));
                    item.setGiftFrom(rs.getString("sender"));
                    if (ItemConstants.isPet(item.getItemId())) {
                        if (item.getUniqueId() > -1) {
                            MaplePet pet = MaplePet.loadFromDb(item.getItemId(), item.getUniqueId(), item.getPosition());
                            if (pet != null) {
                                item.setPet(pet);
                            }
                        } else {
                            item.setPet(MaplePet.createPet(item.getItemId(), MapleInventoryIdentifier.getInstance()));
                        }
                    }
                    items.put(rs.getLong("inventoryitemid"), new Pair<>(item.copy(), mit));
                }
            }
            rs.close();
            ps.close();
        } finally {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
        }
        return items;
    }

    public void saveItems(List<Pair<Item, MapleInventoryType>> items, int id) throws SQLException {
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        try {
            StringBuilder query = new StringBuilder();
            query.append("DELETE FROM `inventoryitems` WHERE `type` = ? AND `");
            query.append(account ? "accountid" : "characterid");
            query.append("` = ?");

            Connection con = DatabaseConnection.getConnection();
            ps = con.prepareStatement(query.toString());
            ps.setInt(1, value);
            ps.setInt(2, id);
            ps.executeUpdate();
            ps.close();
            if (items == null) {
                return;
            }
            ps = con.prepareStatement("INSERT INTO `inventoryitems` VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
            pse = con.prepareStatement("INSERT INTO `inventoryequipment` VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            for (Pair<Item, MapleInventoryType> pair : items) {
                Item item = pair.getLeft();
                MapleInventoryType mit = pair.getRight();
                ps.setInt(1, value);
                ps.setString(2, account ? null : String.valueOf(id));
                ps.setString(3, account ? String.valueOf(id) : null);
                ps.setInt(4, item.getItemId());
                ps.setInt(5, mit.getType());
                ps.setInt(6, item.getPosition());
                ps.setInt(7, item.getQuantity());
                ps.setString(8, item.getOwner());
                ps.setString(9, item.getGMLog());
                if (item.getPet() != null) {
                    ps.setInt(10, Math.max(item.getUniqueId(), item.getPet().getUniqueId()));
                } else {
                    ps.setInt(10, item.getUniqueId());
                }
                ps.setShort(11, item.getFlag());
                ps.setLong(12, item.getExpiration());
                ps.setString(13, item.getGiftFrom());
                ps.setInt(14, item.getEquipOnlyId()); //新增增加的装备道具的唯一SQLid
                ps.executeUpdate();

                if (mit.equals(MapleInventoryType.EQUIP) || mit.equals(MapleInventoryType.EQUIPPED)) {
                    int i = 0;
                    ResultSet rs = ps.getGeneratedKeys();
                    if (!rs.next()) {
                        throw new RuntimeException("[saveItems] 保存道具失败.");
                    }
                    pse.setLong(++i, rs.getLong(1));
                    rs.close();

                    Equip equip = (Equip) item;
                    pse.setInt(++i, equip.getUpgradeSlots());
                    pse.setInt(++i, equip.getLevel());
                    pse.setInt(++i, equip.getStr());
                    pse.setInt(++i, equip.getDex());
                    pse.setInt(++i, equip.getInt());
                    pse.setInt(++i, equip.getLuk());
                    pse.setInt(++i, equip.getHp());
                    pse.setInt(++i, equip.getMp());
                    pse.setInt(++i, equip.getWatk());
                    pse.setInt(++i, equip.getMatk());
                    pse.setInt(++i, equip.getWdef());
                    pse.setInt(++i, equip.getMdef());
                    pse.setInt(++i, equip.getAcc());
                    pse.setInt(++i, equip.getAvoid());
                    pse.setInt(++i, equip.getHands());
                    pse.setInt(++i, equip.getSpeed());
                    pse.setInt(++i, equip.getJump());
                    pse.setInt(++i, equip.getViciousHammer());
                    pse.setLong(++i, equip.getItemEXP());
                    pse.setInt(++i, equip.getDurability());
                    pse.setByte(++i, equip.getState());
                    pse.setByte(++i, equip.getEnhance());
                    pse.setInt(++i, equip.getOptential1());
                    pse.setInt(++i, equip.getOptential2());
                    pse.setInt(++i, equip.getOptential3());
                    pse.setInt(++i, equip.getOptential4());
                    pse.setInt(++i, equip.getOptential5());
                    pse.setInt(++i, equip.getOptential6());
                    pse.setInt(++i, equip.getIncSkill());
                    pse.setShort(++i, equip.getCharmEXP());
                    pse.setShort(++i, equip.getPVPDamage());
                    pse.setInt(++i, equip.getStateMsg()); //星级提示次数
                    pse.setInt(++i, equip.getSocket1()); //镶嵌宝石1
                    pse.setInt(++i, equip.getSocket2()); //镶嵌宝石2
                    pse.setInt(++i, equip.getSocket3()); //镶嵌宝石3
                    pse.setInt(++i, equip.getItemSkin()); //道具合成后的外观
                    pse.setInt(++i, equip.getLimitBreak()); //武器攻击突破上限
                    //新增装备属性字段
                    pse.setInt(++i, equip.getEnhanctBuff());
                    pse.setInt(++i, equip.getReqLevel());
                    pse.setInt(++i, equip.getYggdrasilWisdom());
                    pse.setInt(++i, (equip.getFinalStrike() ? 1 : 0));
                    pse.setInt(++i, equip.getBossDamage());
                    pse.setInt(++i, equip.getIgnorePDR());
                    pse.setInt(++i, equip.getTotalDamage());
                    pse.setInt(++i, equip.getAllStat());
                    pse.setInt(++i, equip.getKarmaCount());
                    pse.setInt(++i, equip.getSealedLevel());
                    pse.setLong(++i, equip.getSealedExp());
                    pse.setShort(++i, equip.getSoulName());
                    pse.setShort(++i, equip.getSoulEnchanter());
                    pse.setShort(++i, equip.getSoulOptential());
                    pse.setInt(++i, equip.getSoulSkill());
                    pse.executeUpdate();
                }
            }
            pse.close();
            ps.close();
        } finally {
            if (ps != null) {
                ps.close();
            }
            if (pse != null) {
                pse.close();
            }
        }
    }
}
