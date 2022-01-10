/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.programs;

import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import database.DatabaseConnectionWZ;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import server.MapleItemInformationProvider;
import tools.FileoutputUtil;
import tools.StringUtil;

/**
 * @author PlayDK
 */
public class LoadItemTest {

    public static void main(String[] args) {
        MapleItemInformationProvider.getInstance().runEtc();
        MapleItemInformationProvider.getInstance().runItems();
        List<Integer> 星岩 = new ArrayList<>();
        List<Integer> 极真 = new ArrayList<>();
        List<Integer> 永恒 = new ArrayList<>();
        List<Integer> 重生 = new ArrayList<>();
        List<Integer> 深渊 = new ArrayList<>();
        List<Integer> 无双 = new ArrayList<>();
        List<Integer> 君主 = new ArrayList<>();
        List<Integer> 死灵 = new ArrayList<>();
        List<Integer> 无爱 = new ArrayList<>();
        List<Integer> 风暴 = new ArrayList<>();
        List<Integer> 豪华 = new ArrayList<>();
        List<Integer> 紫金枫叶 = new ArrayList<>();
        List<Integer> 专属紫金枫叶 = new ArrayList<>();
        List<Integer> 布莱克缤 = new ArrayList<>();
        List<Integer> 天使 = new ArrayList<>();
        List<Integer> 狂龙战士 = new ArrayList<>();
        List<Integer> 夜光法师 = new ArrayList<>();
        List<Integer> 武器 = new ArrayList<>();
        List<Integer> 装备 = new ArrayList<>();
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        try {
            PreparedStatement ps = DatabaseConnectionWZ.getConnection().prepareStatement("SELECT * FROM wz_itemdata");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                int itemId = rs.getInt("itemid");
                String name = rs.getString("name");
                if (name.startsWith("永恒")) {
                    永恒.add(itemId);
                } else if (name.startsWith("重生")) {
                    重生.add(itemId);
                } else if (name.startsWith("深渊")) {
                    深渊.add(itemId);
                } else if (name.startsWith("无双")) {
                    无双.add(itemId);
                } else if (name.startsWith("君主")) {
                    君主.add(itemId);
                } else if (name.startsWith("死灵")) {
                    死灵.add(itemId);
                } else if (name.startsWith("无爱")) {
                    无爱.add(itemId);
                } else if (name.startsWith("风暴")) {
                    风暴.add(itemId);
                } else if (name.startsWith("豪华")) {
                    豪华.add(itemId);
                } else if (name.startsWith("紫金枫叶")) {
                    紫金枫叶.add(itemId);
                } else if (name.startsWith("专属紫金枫叶")) {
                    专属紫金枫叶.add(itemId);
                } else if (name.startsWith("布莱克缤")) {
                    布莱克缤.add(itemId);
                } else if (name.startsWith("天使")) {
                    天使.add(itemId);
                } else if (name.startsWith("狂龙战士")) {
                    狂龙战士.add(itemId);
                } else if (name.startsWith("夜光法师")) {
                    夜光法师.add(itemId);
                }
                if (ii.isActivatedSocketItem(itemId)) {
                    星岩.add(itemId);
                }
                if (ii.isSuperiorEquip(itemId)) {
                    极真.add(itemId);
                }
                if (ii.getItemIncMHPr(itemId) > 0) {
                    System.out.println("IncMHPr: " + itemId + " - " + ii.getName(itemId));
                }
                if (ii.getItemIncMMPr(itemId) > 0) {
                    System.out.println("IncMMPr: " + itemId + " - " + ii.getName(itemId));
                }
                if (!ii.isCash(itemId) && ItemConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    if (ItemConstants.isWeapon(itemId)) {
                        武器.add(itemId);
                    } else {
                        装备.add(itemId);
                    }
                }
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            System.out.println("[ItemLoader] 加载装备数据出错." + ex);
        }
        Collections.sort(永恒);
        for (Integer rid : 永恒) {
            FileoutputUtil.log("游戏装备\\特殊装备\\永恒装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(重生);
        for (Integer rid : 重生) {
            FileoutputUtil.log("游戏装备\\特殊装备\\重生装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(深渊);
        for (Integer rid : 深渊) {
            FileoutputUtil.log("游戏装备\\特殊装备\\深渊装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(无双);
        for (Integer rid : 无双) {
            FileoutputUtil.log("游戏装备\\特殊装备\\无双装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(君主);
        for (Integer rid : 君主) {
            FileoutputUtil.log("游戏装备\\特殊装备\\君主装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(死灵);
        for (Integer rid : 死灵) {
            FileoutputUtil.log("游戏装备\\特殊装备\\死灵装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(星岩);
        for (Integer rid : 星岩) {
            FileoutputUtil.log("游戏装备\\特殊装备\\星岩装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(极真);
        for (Integer rid : 极真) {
            FileoutputUtil.log("游戏装备\\特殊装备\\极真装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(无爱);
        for (Integer rid : 无爱) {
            FileoutputUtil.log("游戏装备\\特殊装备\\无爱装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(风暴);
        for (Integer rid : 风暴) {
            FileoutputUtil.log("游戏装备\\特殊装备\\风暴装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(豪华);
        for (Integer rid : 豪华) {
            FileoutputUtil.log("游戏装备\\特殊装备\\豪华装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(紫金枫叶);
        for (Integer rid : 紫金枫叶) {
            FileoutputUtil.log("游戏装备\\特殊装备\\紫金枫叶装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(专属紫金枫叶);
        for (Integer rid : 专属紫金枫叶) {
            FileoutputUtil.log("游戏装备\\特殊装备\\专属紫金枫叶装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(布莱克缤);
        for (Integer rid : 布莱克缤) {
            FileoutputUtil.log("游戏装备\\特殊装备\\布莱克缤装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(天使);
        for (Integer rid : 天使) {
            FileoutputUtil.log("游戏装备\\特殊装备\\天使装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(狂龙战士);
        for (Integer rid : 狂龙战士) {
            FileoutputUtil.log("游戏装备\\特殊装备\\狂龙战士装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(夜光法师);
        for (Integer rid : 夜光法师) {
            FileoutputUtil.log("游戏装备\\特殊装备\\夜光法师装备.txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(武器);
        for (Integer rid : 武器) {
            FileoutputUtil.log("游戏装备\\武器类型\\" + getWeaponType(rid) + ".txt", rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid), true);
        }
        Collections.sort(装备);
        for (Integer rid : 装备) {
            String buff = rid + " - " + StringUtil.getRightPaddedStr(ii.getName(rid), ' ', 24) + " 等级: " + ii.getReqLevel(rid);
            if (rid / 10000 == 100) {
                FileoutputUtil.log("游戏装备\\装备类型\\100-帽子.txt", buff, true);
            } else if (rid / 10000 == 101) {
                FileoutputUtil.log("游戏装备\\装备类型\\101-面饰.txt", buff, true);
            } else if (rid / 10000 == 102) {
                FileoutputUtil.log("游戏装备\\装备类型\\102-眼饰.txt", buff, true);
            } else if (rid / 10000 == 103) {
                FileoutputUtil.log("游戏装备\\装备类型\\103-耳环.txt", buff, true);
            } else if (rid / 10000 == 104) {
                FileoutputUtil.log("游戏装备\\装备类型\\104-上衣.txt", buff, true);
            } else if (rid / 10000 == 105) {
                FileoutputUtil.log("游戏装备\\装备类型\\105-套服.txt", buff, true);
            } else if (rid / 10000 == 106) {
                FileoutputUtil.log("游戏装备\\装备类型\\106-裤子.txt", buff, true);
            } else if (rid / 10000 == 107) {
                FileoutputUtil.log("游戏装备\\装备类型\\107-鞋子.txt", buff, true);
            } else if (rid / 10000 == 108) {
                FileoutputUtil.log("游戏装备\\装备类型\\108-手套.txt", buff, true);
            } else if (rid / 10000 == 109) {
                FileoutputUtil.log("游戏装备\\装备类型\\109-盾牌.txt", buff, true);
            } else if (rid / 10000 == 110) {
                FileoutputUtil.log("游戏装备\\装备类型\\110-披风.txt", buff, true);
            } else if (rid / 10000 == 111) {
                FileoutputUtil.log("游戏装备\\装备类型\\111-戒指.txt", buff, true);
            } else if (rid / 10000 == 112) {
                FileoutputUtil.log("游戏装备\\装备类型\\112-项链.txt", buff, true);
            } else if (rid / 10000 == 113) {
                FileoutputUtil.log("游戏装备\\装备类型\\113-腰带.txt", buff, true);
            } else if (rid / 10000 == 114) {
                FileoutputUtil.log("游戏装备\\装备类型\\114-勋章.txt", buff, true);
            } else if (rid / 10000 == 115) {
                FileoutputUtil.log("游戏装备\\装备类型\\115-护肩.txt", buff, true);
            } else if (rid / 10000 == 116) {
                FileoutputUtil.log("游戏装备\\装备类型\\116-口袋.txt", buff, true);
            } else if (rid / 10000 == 118) {
                FileoutputUtil.log("游戏装备\\装备类型\\118-徽章.txt", buff, true);
            } else if (rid / 10000 == 120) {
                FileoutputUtil.log("游戏装备\\装备类型\\120-图腾.txt", buff, true);
            } else {
                FileoutputUtil.log("游戏装备\\装备类型\\未分类装备.txt", buff, true);
            }
        }
    }

    public static String getWeaponType(int itemId) {
        int cat = itemId / 10000;
        cat = cat % 100;
        switch (cat) {
            case 21:
                return "21-双头杖";
            case 22:
                return "22-灵魂手铳";
            case 23:
                return "23-亡命剑";
            case 24:
                return "24-能量剑";
            case 30:
                return "30-单手剑";
            case 31:
                return "31-单手斧";
            case 32:
                return "32-单手钝器";
            case 33:
                return "33-短刀";
            case 34:
                return "34-双刀副手";
            case 35:
                return "35-特殊副手";
            case 36:
                return "36-手杖";
            case 37:
                return "37-短杖";
            case 38:
                return "38-长杖";
            case 40:
                return "40-双手剑";
            case 41:
                return "41-双手斧";
            case 42:
                return "42-双手钝器";
            case 43:
                return "43-枪";
            case 44:
                return "44-矛";
            case 45:
                return "45-弓";
            case 46:
                return "46-弩";
            case 47:
                return "47-拳套";
            case 48:
                return "48-指节";
            case 49:
                return "49-短枪";
            case 52:
                return "52-双弩枪";
            case 53:
                return "53-手持火炮";
        }
        //System.out.println("Found new Weapon: " + cat + " ItemId: " + itemId);
        return "未分类武器";
    }
}
