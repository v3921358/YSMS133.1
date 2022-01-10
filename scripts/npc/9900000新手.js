importPackage(net.sf.odinms.client);
var status = 0;

var zz ="●●●奇妙冒险岛"; //这里设置名字

function start() {
status = -1;
action(1, 0, 0);
}

function action(mode, type, selection) {
if (mode == -1) {
cm.dispose();
} else {
if (mode == 0 && status == 0) {
cm.dispose();
return;
}
if (mode == 1)
status++;
else
status--;

if (status == 0) {

if (cm.getPlayer().getDojoPoints() == 0) {//
cm.sendNext("#d欢迎来到#r"+zz+"#k,#d希望这里能成为你的一个家,\r\n我们的承诺是#r长久稳定,不BT服#d.下面是你加入本服的奖励\r\n\r\n#b新手礼包如下:#r全部属性+50的装备礼报.#k\r\n#b装备:#v1002824#,#v1052170#,#v1302024#,#v1142173#,#v1012135#,#v1092048#,#v1302106#,#v4002000#,#v4002001#,#v3010118#,#v3010048#,#v4031454#,#v5370000#,#v1002140#,#v1302070#,#v1302155#.\r\n其他:#v4002002#,#v1442012#,#v2000005#,50W点卷.");

} else if (cm.getPlayer().getReborns() == 15) {//
} else{
cm.sendOk("#b您已经领取过奖励了.");
cm.dispose();
} 

} else if (status == 1) {
//点装
//cm.gainItem(1052194,1);
//cm.gainItem(1002240,1);
//cm.gainItem(1032073,1);
//cm.gainItem(1022095,1);
//cm.gainItem(3010118,1);
//cm.gainItem(1072257,1);
//cm.gainItem(1082251,1);
//cm.gainItem(1702223,1);
//cm.gainItem(1302106,1);
//cm.gainItem(1012135,1);
//cm.gainItem(1092048,1);
//cm.gainItem(3010100,1);
//cm.gainItem(4031454,1);
//装备
cm.gainItem(3010048,1);
cm.gainItem(1092048,1);
cm.gainItem(1012135,1);
cm.gainItem(1302106,1);
cm.gainItem(3010099,1);
cm.gainItem(3010118,1);
cm.gainItem(4031454,10);
cm.gainItem(5370000,1);
cm.gainItem(1002140,1);
cm.gainItem(1302070,1);
cm.gainItem(1302155,1);
cm.gainItem(1442012,1)
//邮票
cm.gainItem(4002002,2);
cm.gainItem(4002000,2);
cm.gainItem(4002001,2);
//消耗
cm.gainItem(2000005,100);
//点卷
cm.gainNX(500000);
//勋章
var xunzhang = 1142173;//
var shuxing = 100; //设置
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xunzhang); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(xunzhang)).copy(); // 生成一个Equip类
//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //时间
//toDrop.setExpiration(temptime); //给装备时间
toDrop.setStr(shuxing);
toDrop.setDex(shuxing);
toDrop.setInt(shuxing);
toDrop.setLuk(shuxing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
cm.getChar().saveToDB(true);

var xnzhang = 1002824;//
var shxing = 100; //设置
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xnzhang); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(xnzhang)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //时间
toDrop.setExpiration(temptime); //给装备时间
toDrop.setStr(shxing);
toDrop.setDex(shxing);
toDrop.setInt(shxing);
toDrop.setLuk(shxing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
cm.getChar().saveToDB(true);


var xzhang = 1052170;//
var sxing = 100; //设置
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xzhang); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(xzhang)).copy(); // 生成一个Equip类
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //时间
toDrop.setExpiration(temptime); //给装备时间
toDrop.setStr(sxing);
toDrop.setDex(sxing);
toDrop.setInt(sxing);
toDrop.setLuk(sxing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
cm.getChar().saveToDB(true);



var xhang = 1302024;//
var sing = 100; //设置
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xhang); //获得装备的类形
var toDrop = ii.randomizeStats(ii.getEquipById(xhang)).copy(); // 生成一个Equip类
//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //时间
//toDrop.setExpiration(temptime); //给装备时间
toDrop.setStr(sing);
toDrop.setDex(sing);
toDrop.setInt(sing);
toDrop.setLuk(sing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//将这个装备放入包中
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包		
cm.getChar().saveToDB(true);




cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() + 1);
cm.getChar().setLevel(10);
cm.sendOk("#r[新手礼包]#n已送至背包中.");
cm.dispose();	
}				
}
}
