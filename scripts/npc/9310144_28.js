/*
 脚本功能：披风升级
 更新时间：2015年5月15日 
 */
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var a = 0;
var Text;
var PenItemId = 4033204;//注射用道具ID 温暖羽毛
var Level;
var NeededItem;
var GiveItem;
var Shuxing;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";


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
            Text = "#r欢迎使用翅膀进阶系统，#r#z4033204#只能通过消费获得：#k\r\n\r\n\t#b当前背包里有： #r[ " + cm.getItemQuantity("4033204") + " ] #b个 #r#t4033204##k\r\n\r\n";
            Level = Math.abs(cm.getBossLog('披风进阶', 1));
            // cm.sendOk(Level)
            if (Level == 0) {
                Text += "#i1102729# #b需要灌注 #r(" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "/100)#k #b能量可升阶至一阶 #i1102451#\r\n\r\n\t\t#d可加成全属性+10点(包含攻击防御命中)\r\n\r\n"
            } else if (Level == 1) {
                Text += "#i1102451# #b需要灌注 #r(" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "/200)#k #b能量可升阶至二阶 #i1102575#\r\n\r\n\t\t#d可加成全属性+20点(包含攻击防御命中)\r\n\r\n"
            } else if (Level == 2) {
                Text += "#i1102575# #b需要灌注 #r(" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "/300)#k #b能量可升阶至三阶 #i1102572#\r\n\r\n\t\t#d可加成全属性+30点(包含攻击防御命中)\r\n\r\n"
            } else if (Level == 3) {
                Text += "#i1102572# #b需要灌注 #r(" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "/500)#k #b能量可升阶至四阶 #i1102624#\r\n\r\n\t\t#d可加成全属性+50点(包含攻击防御命中)\r\n\r\n"
            } else if (Level == 4) {
                Text += "#i1102624# #b需要灌注 #r(" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "/700)#k #b能量可升阶至五阶 #i1102724#\r\n\r\n\t\t#d可加成全属性+60点(包含攻击防御命中)\r\n\r\n"
            } else if (Level == 5) {
                Text += "#i1102724# #b需要灌注 #r(" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "/800)#k #b能量可升阶至六阶 #i1102723#\r\n\r\n\t\t#d可加成全属性+80点(包含攻击防御命中)\r\n\r\n"
            } else if (Level == 6) {
                Text += "#i1102723# #b需要灌注 #r(" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "/1000)#k #b能量可升阶至七阶 #i1102798#\r\n\r\n\t\t#d可加成全属性+100点(包含攻击防御命中)\r\n\r\n"
            } else {
                Text = "你已经全部进阶完毕了。\r\nError!\r\n";
            }
            if (Text == "你已经全部进阶完毕了。\r\nError!\r\n") {
                cm.sendOk("你已经全部进阶完毕了。")
                cm.dispose();
            } else {
                Text += "#b#L0# " + aaa + " 灌注能量#l #L1#  " + aaa + " 翅膀进阶#l #L2#  " + aaa + " 进阶介绍#l#k\r\n \r\n";
                cm.sendSimple(Text);
            }
        } else if (a == 1) {
            if (selection == 0) {
                cm.sendGetText("请输入您要注射的温暖羽毛数量。");
            } else if (selection == 1) {//进阶
                NeededItem = EquipItemNeededAndGive(Level)[0];
                GiveItem = EquipItemNeededAndGive(Level)[1];
                Shuxing = EquipItemNeededAndGive(Level)[2];
                a = 2;
                cm.sendSimple("此次合成需要如下要求：\r\n1、#i" + NeededItem + "# #t" + NeededItem + "# x1\r\n\r\n2、灌注能量" + getMax(Level) + "点，目前为" + Math.abs(cm.getBossLog('温暖羽毛能量')) + "点。#b#e\r\n#L0# 点击我进行披风进阶！");
            } else {//介绍
                cm.sendOk("\t\t#e#b翅膀进阶全属性预览#k#n\r\n\r\n\r\n#r#z1102451#            一阶 全属性+10\r\n#z1102575#          二阶 全属性+20\r\n#z1102572#        三阶 全属性+30\r\n#z1102624#          四阶 全属性+50\r\n#z1102724#            五阶 全属性+60\r\n#z1102723#            六阶 全属性+80\r\n#z1102798#              七阶 全属性+100");
                cm.dispose();
            }
        } else if (a == 2) {
            var quantity = cm.getText();
            //var rand = Math.floor(Math.random() * 3) + 1;
            if (quantity == null) {
                cm.sendOk("什么？请输入您要注射的温暖羽毛数量！");
                cm.dispose();
            }
            if (quantity > getMax(Level) - Math.abs(cm.getBossLog('温暖羽毛能量'))) {
                cm.sendOk("对不起，输入的数量不能超过目前阶数的能量值" + getMax(Level) + "。" + Level);
                cm.dispose();
            } else {
                if (cm.haveItem(PenItemId, quantity)) {
                    for (var i = 0; i < quantity; i++) {
                        cm.setBossLog('温暖羽毛能量', 1);
                    }
                    cm.gainItem(PenItemId, -quantity);
                    if (Math.abs(cm.getBossLog('温暖羽毛能量')) >= getMax(Level)) {
                        cm.sendOk("您已成功注射温暖羽毛能量 " + quantity + " 点。\r\n您当前阶数所需要的能量值已满。\r\n你可以选择进行进阶了！");			
			cm.worldSpouseMessage(0x20, "『温暖羽毛』 : 玩家 " + cm.getChar().getName() + "  成功给翅膀灌注了 " + quantity + " 点能量！");
                        cm.dispose();
                    } else {
                        cm.sendOk("您已成功注射温暖羽毛能量" + quantity + "点。\r\n您目前的温暖羽毛能量是: " + Math.abs(cm.getBossLog('温暖羽毛能量', 1)) + ".");
			cm.worldSpouseMessage(0x20, "『温暖羽毛』 : 玩家 " + cm.getChar().getName() + "  成功给翅膀灌注了 " + quantity + " 点能量！");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("请确认您的背包有 #b#t" + PenItemId + "##k？");
                    cm.dispose();
                }
            }
        } else if (a == 3) {
            if (Math.abs(cm.getBossLog('温暖羽毛能量'), 1) >= getMax(Level) && cm.haveItem(NeededItem)) {
                if (cm.getEquipBySlot(1) == null || cm.getEquipBySlot(1).getItemId() != NeededItem) {
                    cm.sendOk("请将#b#t" + NeededItem + "##k放在装备栏的第一栏！");
                    cm.dispose();
                } else if (Level != 0 && cm.getEquipBySlot(1).getOwner() != "温暖羽毛" + (parseInt(Level)) + "阶") {
                    cm.sendOk("只有进行过进阶的道具才能进阶！"+"温暖羽毛" + (parseInt(Level)) + "阶");
                    cm.dispose();
                } else {
                    MakeEquip();
                    cm.resetBossLog('温暖羽毛能量');//清空
                    cm.setBossLog('披风进阶', 1);//进阶1
		    cm.getMap().startMapEffect("强大的玩家 "+cm.getChar().getName()+" 翅膀升级到 " + (1+(parseInt(Level))) + " 阶了！", 5120008);
                    cm.worldSpouseMessage(0x20, "『翅膀进阶』 : 玩家 " + cm.getChar().getName() + " 的翅膀在温暖羽毛的灌注下升级到 " + (1+(parseInt(Level))) + " 阶了！");
                    cm.sendOk("进阶成功!");
                    cm.dispose();
                }
            } else {
                cm.sendOk("你还没有满足所需要的物品。");
                cm.dispose();
            }
        }//a
    }//mode
}//f

function EquipItemNeededAndGive(Level) {
    var Item = new Array();
    switch (Level) {
        case 0:
            Item.push(1102729);//所需
            Item.push(1102451);//所得
            Item.push(10);//全属性
            return Item;
            break;
        case 1:
            Item.push(1102451);//所需
            Item.push(1102575);//所得
            Item.push(20);//全属性
            return Item;
            break;
        case 2:
            Item.push(1102575);//所需
            Item.push(1102572);//所得
            Item.push(30);//全属性
            return Item;
            break;
        case 3:
            Item.push(1102572);//所需
            Item.push(1102624);//所得
            Item.push(50);//全属性
            return Item;
            break;
        case 4:
            Item.push(1102624);//所需
            Item.push(1102724);//所得
            Item.push(60);//全属性
            return Item;
            break;
        case 5:
            Item.push(1102724);//所需
            Item.push(1102723);//所得
            Item.push(80);//全属性
            return Item;
            break;
        case 6:
            Item.push(1102723);//所需
            Item.push(1102798);//所得
            Item.push(100);//全属性
            return Item;
            break;
        default:
            return 0;
            break;
    }
}
function getMax(Level) {
    switch (Level) {
        case 0:
            return 100;
            break;
        case 1:
            return 200;
            break;
        case 2:
            return 300;
            break;
        case 3:
            return 500;
            break;
        case 4:
            return 700;
            break;
        case 5:
            return 800;
            break;
        case 6:
            return 1000;
            break;
        default:
            return 55;
            break;
    }
}
function getEquipStatToArray() {//得到装备数据
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
}
function setEquipStatRandom(i, v) {//设置装备属性
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
            toDrop.setOwner("温暖羽毛" + (parseInt(Level + 1)) + "阶");
            /*case 15:
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
             */
    }
}
function MakeEquip() {//制作装备
    var rand;
    var ii = cm.getItemInfo();
    toDrop = ii.randomizeStats(ii.getEquipById(GiveItem)).copy(); // 生成一个Equip类(生成这个装备)
    for (var i = 0; i < 16; i++) {
        rand = Shuxing;//全属性10
        setEquipStatRandom(i, rand);
    }
    cm.removeSlot(1, 1, 1);//删除掉原始道具
    //inventoryType, deleteSlot, deleteQuantity
    //toDrop.setEquipOnlyId(cm.getItemInfo().getNextEquipOnlyId());
    cm.addFromDrop(cm.getC(), toDrop, false);
}