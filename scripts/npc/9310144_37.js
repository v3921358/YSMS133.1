/*
 脚本功能：装备培养
 */

var Item140 = Array(
        1152108,
        1003172,
        1102275,
        1082295,
        1052314,
        1072485,
        1232014,
        1302152,
        1312065,
        1322096,
        1402095,
        1412065,
        1422066,
        1432086,
        1442116,
        1152110,
        1003173,
        1102276,
        1082296,
        1052315,
        1072486,
        1212014,
        1372084,
        1382104,
        1152111,
        1003174,
        1102277,
        1082297,
        1052316,
        1072487,
        1452111,
        1462099,
        1522018,
        1152112,
        1003175,
        1102278,
        1082298,
        1052317,
        1072488,
        1242042,
        1332130,
        1362019,
        1472122,
        1152113,
        1003176,
        1102279,
        1082299,
        1052318,
        1072489,
        1222014,
        1242014,
        1482084,
        1492085,
        1532018,
        1003719,
        1003720,
        1003721,
        1003722
        );
var Item150 = Array(
        1212063,
        1222058,
        1232057,
        1242060,
        1242061,
        1302275,
        1312153,
        1322203,
        1332225,
        1342082,
        1362090,
        1372177,
        1382208,
        1402196,
        1412135,
        1422140,
        1432167,
        1442223,
        1452205,
        1462193,
        1472214,
        1482168,
        1492179,
        1522094,
        1532098,
        1252015,
        1003797,
        1003798,
        1003799,
        1003800,
        1003801,
        1042254,
        1042255,
        1042256,
        1042257,
        1042258,
        1062165,
        1062166,
        1062167,
        1062168,
        1062169,
        1132174,
        1132175,
        1132176,
        1132177,
        1132178,
        1102481,
        1102482,
        1102483,
        1102484,
        1102485,
        1082543,
        1082544,
        1082545,
        1082546,
        1082547,
        1072743,
        1072744,
        1072745,
        1072746,
        1072747
        );
var Item160 = Array(
        1012438,
        1022211,
        1032224,
        1122269,
        1132247,
        1152160,
        1003976,
        1102623,
        1082556,
        1052669,
        1072870,
        1212089,
        1222084,
        1232084,
        1242090,
        1302297,
        1312173,
        1322223,
        1332247,
        1342090,
        1362109,
        1372195,
        1382231,
        1402220,
        1412152,
        1422158,
        1432187,
        1442242,
        1452226,
        1462213,
        1472235,
        1482189,
        1492199,
        1522113,
        1532118,
        1252033
        );//装备数据
var EquipStat = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);//记录原始装备属性
var EquipStatChanged = Array();//记录更改后的装备属性
var itemid;
var SucRand;
var Posibilities = 5;//10分之一的几率
var placeMentItemid = 4034304;//代替装备的物品id
var needMeso = 500000;//需要的金币数量
var type;
var aa ="#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var lose = "#fUI/UIWindow.img/RpsGame/lose#";


function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            //cm.sendSimple("介绍文字XXX\r\n#L0# 功能部分（利用相同道具） \r\n#L1# 功能部分（利用道具）\r\n#L2# 介绍部分");
            cm.sendSimple("#b您当前拥有：#r" + cm.getItemQuantity("4034304") + " #b个#z4034304#.  您当前拥有：#r" + cm.getMeso() + " #b钱#k\r\n\r\n"+aa+"\r\n- #b使用[#z4034304#]10%的成功几率无限提升装备属性#k#n\r\n#r 目前只支持140/150/160级装备强化属性#k#n\r\n#r#L1#"+ttt6+" 1). #z4034304#强化#b(10%成功几率)#l#k\r\n#b#L2#"+ttt6+" 2). 强化装备说明(强化必看)#l#k\r\n\r\n   "+ttt6+" #b3). 爱心可以通过充值获得.\r\n   "+ttt6+" #b4). 爱心可以通过消费获得.\r\n   "+ttt6+" #b5). 爱心可以通过部分BOSS获得.\r\n   "+ttt6+" #b6). 爱心可以通过参加活动获得.");
        } else if (a == 1) {
            if (selection == 0) {
                if ((cm.getEquipBySlot(1) == null || cm.getEquipBySlot(2) == null) || cm.getEquipBySlot(1).getItemId() != cm.getEquipBySlot(2).getItemId()) {
                    cm.sendOk("进行装备培养之前，\r\n必须得把要#b#e培养#n的道具放在装备栏第一格#k。\r\n必须得把要#b#e牺牲#n的道具放在装备栏第二格#k。\r\n #e#r- 请确定您已经把要进行培养的道具放在了相应位置。\r\n #e#r- 请确定您把#b相同的道具#r放在装备的第1、2格。");
                    cm.dispose();
                } else {
                    type = 1;//利用相同道具
                    cm.sendNext("请确认你要进行培养的道具为\r\n\r\n  [#i " + cm.getEquipBySlot(1).getItemId() + "#] #t" + cm.getEquipBySlot(1).getItemId() + "#？#r\r\n\r\n\同样的装备可喂养自身装备，培养不减少自身属性潜能。\r\n培养后将有10%机率随机增加1点属性");
                }
            } else if (selection == 1) {
                var ii = cm.getItemInfo();
                if (cm.getEquipBySlot(1) != null && ii.isCash(cm.getEquipBySlot(1).getItemId()) == true) {
                    cm.sendOk("现金道具不能培养。");
                    cm.dispose();
                } else if ((cm.getEquipBySlot(1) != null) && (cm.getItemQuantity(placeMentItemid) >= 1) && (cm.getMeso() > needMeso)) {
                    type = 2;//利用道具id
                    cm.sendNext("请确认你要进行培养的道具为\r\n\r\n  [#i " + cm.getEquipBySlot(1).getItemId() + "#] #t" + cm.getEquipBySlot(1).getItemId() + "#？#r\r\n\r\n\利用#t" + placeMentItemid + "#可喂养自身装备，培养不减少自身属性潜能。\r\n培养后将有10%机率随机增加1点属性");
                } else {
                    cm.sendOk("进行装备培养之前，\r\n必须得把要#b#e培养#n的道具放在装备栏第一格#k。\r\n\r\n必须有#b#e牺牲#n的道具：#i" + placeMentItemid + "# #t" + placeMentItemid + "#\r\n\r\n #e#r- 请确定您已经把要进行培养的道具放在了相应位置。\r\n #e#r- 请确定您有#b#t" + placeMentItemid + "##r这道具。\r\n #e#r- 请确定您有#b" + needMeso + "#r金币。");
                    cm.dispose();
                }
            } else if (selection == 2) {
                cm.sendOk(""+aa+"\r\n\r\n   #b培养的装备必须放到背包第一格，且培养的装备不能为点装，培养需要1个 #r爱心 #b以及 #r50W金币#b，则10%的成功几率随机增加装备一点属性。\r\n#rPS：如果失败，爱心和金币将不会返回。#b请谨慎使用。\r\n\r\n- #d#e增加的属性包括：#n#K\r\n#r【力量】 【敏捷】 【智力】 【运气】 【HP】 【MP】 \r\n【物理攻击力】  【魔法攻击力】  【物理防御力】 \r\n【魔法防御力】 【命中力】 【回避力】 【移动速度】 \r\n【跳跃力】");
                cm.dispose();
            }//selection
        } else if (a == 2) {
            itemid = cm.getEquipBySlot(1).getItemId();
            var ii = cm.getItemInfo();
            toDrop = ii.randomizeStats(ii.getEquipById(cm.getEquipBySlot(1).getItemId())).copy(); // 生成一个Equip类(生成这个装备)
            getEquipStatToArray();//将原始道具属性数据载入数组
            var rand = Math.floor(Math.random() * 13) + 1;//1~13随机，14个后面不参与强化
            var SucRand = Math.floor(Math.random() * Posibilities) + 1;
            if (SucRand == 1) {
                for (var i = 0; i < EquipStat.length; i++) {
                    if (rand == i) {
                        setEquipStatSuccess(i, EquipStat[i] + 1);
                        EquipStatChanged.push(EquipStat[i] + 1);
                    } else {
                        setEquipStatSuccess(i, EquipStat[i]);
                        EquipStatChanged.push(EquipStat[i]);
                    }
                }

                cm.removeSlot(1, 1, 1);//删除掉原始道具
                if (type == 1) {//利用相同道具的
                    cm.removeSlot(1, 2, 1);//删除掉牺牲的道具
                } else {//利用道具id的
                    cm.gainItem(placeMentItemid, -1);
                    cm.gainMeso(-needMeso);
                }
                //inventoryType, deleteSlot, deleteQuantity
                //toDrop.setEquipOnlyId(cm.getInstance().getNextEquipOnlyId());
                cm.addFromDrop(cm.getC(), toDrop, false);
                var text = "装备培养成功！\r\n培养后的属性如下：\r\n";
                text += "强化的道具为：[#i" + itemid + "#] #t" + itemid + "#\r\n"
                text += "力量：\t" + EquipStat[0] + "\t>>\t#r" + EquipStatChanged[0] + "\r\n#k";
                text += "敏捷：\t" + EquipStat[1] + "\t>>\t#r" + EquipStatChanged[1] + "\r\n#k";
                text += "智力：\t" + EquipStat[2] + "\t>>\t#r" + EquipStatChanged[2] + "\r\n#k";
                text += "运气：\t" + EquipStat[3] + "\t>>\t#r" + EquipStatChanged[3] + "\r\n#k";
                text += "HP：\t" + EquipStat[4] + "\t>>\t#r" + EquipStatChanged[4] + "\r\n#k";
                text += "MP：\t" + EquipStat[5] + "\t>>\t#r" + EquipStatChanged[5] + "\r\n#k";
                text += "物理攻击力：\t" + EquipStat[6] + "\t>>\t#r" + EquipStatChanged[6] + "\r\n#k";
                text += "魔法攻击力：\t" + EquipStat[7] + "\t>>\t#r" + EquipStatChanged[7] + "\r\n#k";
                text += "物理防御力：\t" + EquipStat[8] + "\t>>\t#r" + EquipStatChanged[8] + "\r\n#k";
                text += "魔法防御力：\t" + EquipStat[9] + "\t>>\t#r" + EquipStatChanged[9] + "\r\n#k";
                text += "命中率：\t" + EquipStat[10] + "\t>>\t#r" + EquipStatChanged[10] + "\r\n#k";
                text += "回避率：\t" + EquipStat[11] + "\t>>\t#r" + EquipStatChanged[11] + "\r\n#k";
                text += "移动速度：\t" + EquipStat[12] + "\t>>\t#r" + EquipStatChanged[12] + "\r\n#k";
                text += "跳跃力：\t" + EquipStat[13] + "\t>>\t#r" + EquipStatChanged[13] + "\r\n#k";
                cm.sendOk(text);
		cm.worldMessageEffect("[爱心强化] :  玩家 "+cm.getPlayer().getName()+" 培养 "+ii.getName(itemid) +" 装备，属性又增强了。" , 18, 20);

                cm.worldSpouseMessage(0x24, "『爱心强化』 :  玩家 "+cm.getPlayer().getName()+" 培养 "+ii.getName(itemid) +" 装备，属性又增强了。");
                cm.dispose();
            } else {//失败了
                if (type == 1) {
                    cm.sendOk("培养失败了，第二个道具牺牲了。");
                    cm.removeSlot(1, 2, 1);//删除掉牺牲的道具
                } else {
                    cm.sendOk(""+lose+"\r\n\r\n\r\n- #e#d本次消耗道具： #n#r#z" + placeMentItemid + "# x 1#k\r\n- #e#d本次消耗金币： #n#r500,000#k\r\n- #e#d背包爱心剩余：#n #r" + cm.getItemQuantity("4034304") + "\r\n- #e#d游戏金币剩余：#n #r"+cm.getMeso()+"")
                    cm.gainItem(placeMentItemid, -1);
                    cm.gainMeso(-needMeso);
                }
                cm.dispose();
            }
        }
    }
}


function getEquipStatToArray() {//得到原始装备数据
    EquipStat[0] = cm.getEquipBySlot(1).getStr();//力量
    EquipStat[1] = cm.getEquipBySlot(1).getDex();//敏捷
    EquipStat[2] = cm.getEquipBySlot(1).getInt();//智力
    EquipStat[3] = cm.getEquipBySlot(1).getLuk();//运气
    EquipStat[4] = cm.getEquipBySlot(1).getHp();
    EquipStat[5] = cm.getEquipBySlot(1).getMp();
    EquipStat[6] = cm.getEquipBySlot(1).getWatk();
    EquipStat[7] = cm.getEquipBySlot(1).getMatk();
    EquipStat[8] = cm.getEquipBySlot(1).getWdef();
    EquipStat[9] = cm.getEquipBySlot(1).getMdef();
    EquipStat[10] = cm.getEquipBySlot(1).getAcc();
    EquipStat[11] = cm.getEquipBySlot(1).getAvoid();
    EquipStat[12] = cm.getEquipBySlot(1).getSpeed();
    EquipStat[13] = cm.getEquipBySlot(1).getJump();
    EquipStat[14] = cm.getEquipBySlot(1).getUpgradeSlots();
    EquipStat[15] = cm.getEquipBySlot(1).getLimitBreak();
    EquipStat[16] = cm.getEquipBySlot(1).getPotential1();
    EquipStat[17] = cm.getEquipBySlot(1).getPotential2();
    EquipStat[18] = cm.getEquipBySlot(1).getPotential3();
    EquipStat[19] = cm.getEquipBySlot(1).getPotential4();
    EquipStat[20] = cm.getEquipBySlot(1).getPotential5();
    EquipStat[21] = cm.getEquipBySlot(1).getPotential6();
    EquipStat[22] = cm.getEquipBySlot(1).getBossDamage();
    EquipStat[23] = cm.getEquipBySlot(1).getIgnorePDR();
    EquipStat[24] = cm.getEquipBySlot(1).getTotalDamage();
    EquipStat[25] = cm.getEquipBySlot(1).getAllStat();
    EquipStat[26] = cm.getEquipBySlot(1).getEnhance();
    EquipStat[27] = cm.getEquipBySlot(1).getViciousHammer();
    EquipStat[28] = cm.getEquipBySlot(1).getSealedLevel();
    EquipStat[29] = cm.getEquipBySlot(1).getSealedExp();
}

function setEquipStatSuccess(i, v) {//设置装备属性
    switch (i) {
        case 0:
            toDrop.setStr(v);
            break;
        case 1:
            toDrop.setDex(v);
            break;
        case 2:
            toDrop.setInt(v);
            break;
        case 3:
            toDrop.setLuk(v);
            break;
        case 4:
            toDrop.setHp(v);
            break;
        case 5:
            toDrop.setMp(v);
            break;
        case 6:
            toDrop.setWatk(v);
            break;
        case 7:
            toDrop.setMatk(v);
            break;
        case 8:
            toDrop.setWdef(v);
            break;
        case 9:
            toDrop.setMdef(v);
            break;
        case 10:
            toDrop.setAcc(v);
            break;
        case 11:
            toDrop.setAvoid(v);
            break;
        case 12:
            toDrop.setSpeed(v);
            break;
        case 13:
            toDrop.setJump(v);
            break;
        case 14:
            toDrop.setUpgradeSlots(v);
            break;
        case 15:
            toDrop.setLimitBreak(v);
            break;
        case 16:
            toDrop.setPotential1(v);
            break;
        case 17:
            toDrop.setPotential2(v);
            break;
        case 18:
            toDrop.setPotential3(v);
            break;
        case 19:
            toDrop.setPotential4(v);
            break;
        case 20:
            toDrop.setPotential5(v);
            break;
        case 21:
            toDrop.setPotential6(v);
            break;
        case 22:
            toDrop.setBossDamage(v);
            break;
        case 23:
            toDrop.setIgnorePDR(v);
            break;
        case 24:
            toDrop.setTotalDamage(v);
            break;
        case 25:
            toDrop.setAllStat(v);
            break;
        case 26:
            toDrop.setEnhance(v);
            break;
        case 27:
            toDrop.setViciousHammer(v);
            break;
		case 28:
            toDrop.setSealedLevel(v);
            break;
		case 29:
			toDrop.setSealedExp(v);
            break;
    }
}