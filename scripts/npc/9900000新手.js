importPackage(net.sf.odinms.client);
var status = 0;

var zz ="��������ð�յ�"; //������������

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
cm.sendNext("#d��ӭ����#r"+zz+"#k,#dϣ�������ܳ�Ϊ���һ����,\r\n���ǵĳ�ŵ��#r�����ȶ�,��BT��#d.����������뱾���Ľ���\r\n\r\n#b�����������:#rȫ������+50��װ����.#k\r\n#bװ��:#v1002824#,#v1052170#,#v1302024#,#v1142173#,#v1012135#,#v1092048#,#v1302106#,#v4002000#,#v4002001#,#v3010118#,#v3010048#,#v4031454#,#v5370000#,#v1002140#,#v1302070#,#v1302155#.\r\n����:#v4002002#,#v1442012#,#v2000005#,50W���.");

} else if (cm.getPlayer().getReborns() == 15) {//
} else{
cm.sendOk("#b���Ѿ���ȡ��������.");
cm.dispose();
} 

} else if (status == 1) {
//��װ
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
//װ��
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
//��Ʊ
cm.gainItem(4002002,2);
cm.gainItem(4002000,2);
cm.gainItem(4002001,2);
//����
cm.gainItem(2000005,100);
//���
cm.gainNX(500000);
//ѫ��
var xunzhang = 1142173;//
var shuxing = 100; //����
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xunzhang); //���װ��������
var toDrop = ii.randomizeStats(ii.getEquipById(xunzhang)).copy(); // ����һ��Equip��
//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //ʱ��
//toDrop.setExpiration(temptime); //��װ��ʱ��
toDrop.setStr(shuxing);
toDrop.setDex(shuxing);
toDrop.setInt(shuxing);
toDrop.setLuk(shuxing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���		
cm.getChar().saveToDB(true);

var xnzhang = 1002824;//
var shxing = 100; //����
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xnzhang); //���װ��������
var toDrop = ii.randomizeStats(ii.getEquipById(xnzhang)).copy(); // ����һ��Equip��
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //ʱ��
toDrop.setExpiration(temptime); //��װ��ʱ��
toDrop.setStr(shxing);
toDrop.setDex(shxing);
toDrop.setInt(shxing);
toDrop.setLuk(shxing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���		
cm.getChar().saveToDB(true);


var xzhang = 1052170;//
var sxing = 100; //����
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xzhang); //���װ��������
var toDrop = ii.randomizeStats(ii.getEquipById(xzhang)).copy(); // ����һ��Equip��
var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //ʱ��
toDrop.setExpiration(temptime); //��װ��ʱ��
toDrop.setStr(sxing);
toDrop.setDex(sxing);
toDrop.setInt(sxing);
toDrop.setLuk(sxing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���		
cm.getChar().saveToDB(true);



var xhang = 1302024;//
var sing = 100; //����
var ii = net.sf.odinms.server.MapleItemInformationProvider.getInstance();		                
var type = ii.getInventoryType(xhang); //���װ��������
var toDrop = ii.randomizeStats(ii.getEquipById(xhang)).copy(); // ����һ��Equip��
//var temptime = new java.sql.Timestamp(java.lang.System.currentTimeMillis() + 10 * 24 * 60 * 60 * 30); //ʱ��
//toDrop.setExpiration(temptime); //��װ��ʱ��
toDrop.setStr(sing);
toDrop.setDex(sing);
toDrop.setInt(sing);
toDrop.setLuk(sing);
toDrop.setSpeed(20);
toDrop.setJump(20);					
cm.getPlayer().getInventory(type).addItem(toDrop);//�����װ���������
cm.getC().getSession().write(net.sf.odinms.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���		
cm.getChar().saveToDB(true);




cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() + 1);
cm.getChar().setLevel(10);
cm.sendOk("#r[�������]#n������������.");
cm.dispose();	
}				
}
}
