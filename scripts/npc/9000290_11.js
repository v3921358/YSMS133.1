var vv = "#fUI/UIWindow2.img/ValuePacktton/complete/0#";//��ȡ���
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa9 ="#fEffect/ItemEff/1102491/effect/proneStab/0#";

var status = 0;
var typed=0;

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
	cm.sendSimpleS("#r[GM��ʾ��]��#b����ǰ��#z4310196#Ϊ�� #r" + cm.getItemQuantity(4310196) + " #b��\r\n\r\n#e#r#z4310196##n#d ��÷�ʽ��������ʱ�佱�����Լ��μӻ������Ⲣ������������á���˿ɶһ�һЩϡ�е��ߡ�\r\n\r\n#b#L3#"+aa+" �һ�#z2432069##r (ÿ���޹� "+(3-cm.getBossLog("�������", 1))+" ��)#l#k\r\n#b#L4#"+aa+" �һ�#z2432507##r (ÿ���޹� "+(1-cm.getBossLog("���������", 1))+" ��)#l#k\r\n#b#L5#"+aa+" �һ�#z2432506##r (ÿ���޹� "+(1-cm.getBossLog("����Ь�Ӿ�", 1))+" ��)#l#k\r\n#b#L6#"+aa+" �һ�#z2432508##r (ÿ���޹� "+(1-cm.getBossLog("����������", 1))+" ��)#l#k\r\n#d#e#L7#"+aa+" �һ�����ϡ�����ӡ����ߡ������#l#k#n\r\n" ,2);//#b#L2#"+aa+" �һ�#z2431938##r   (ÿ���޹� "+(1-cm.getBossLog("�޹�150", 1))+" ��)#l\r\n//\r\n#b#L1#"+aa+" ����#z4310196#  (�ֽ�����1��1)#l#k
	} else if (status == 1) {
if (selection == 1) {
	typed=1;
	cm.sendYesNo("��δ���Ź���");
} else if (selection == 2) {
	typed=2;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b�һ� #r#z2431938##b ��Ҫ #r#z4310196# x 50 #b��\r\n#b��ǰ���Ѿ�ӵ�У�#r" + cm.getItemQuantity(4310196) + " #b��  ��ȷ��Ҫ�һ���#k\r\n\r\n- #e������ʾ��#n#b�򿪺�������150����ȫ�����ϡ�");
} else if (selection == 3) {
	typed=3;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b�һ� #r#z2432069##b ��Ҫ #r#z4310196# x 300 #b��\r\n#b��ǰ���Ѿ�ӵ�У�#r" + cm.getItemQuantity(4310196) + " #b��  ��ȷ��Ҫ�һ���#k\r\n\r\n- #e������ʾ��#n#b�򿪺��漴���һ������װ����");
} else if (selection == 4) {
	typed=4;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b�һ� #r#z2432507##b ��Ҫ #r#z4310196# x 400 #b��\r\n#b��ǰ���Ѿ�ӵ�У�#r" + cm.getItemQuantity(4310196) + " #b��  ��ȷ��Ҫ�һ���#k\r\n\r\n- #e������ʾ��#n#b�򿪺���һ������������װ����");
} else if (selection == 5) {
	typed=5;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b�һ� #r#z2432506##b ��Ҫ #r#z4310196# x 400 #b��\r\n#b��ǰ���Ѿ�ӵ�У�#r" + cm.getItemQuantity(4310196) + " #b��  ��ȷ��Ҫ�һ���#k\r\n\r\n- #e������ʾ��#n#b�򿪺���һ��������Ь��װ����");
} else if (selection == 6) {
	typed=6;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b�һ� #r#z2432508##b ��Ҫ #r#z4310196# x 400 #b��\r\n#b��ǰ���Ѿ�ӵ�У�#r" + cm.getItemQuantity(4310196) + " #b��  ��ȷ��Ҫ�һ���#k\r\n\r\n- #e������ʾ��#n#b�򿪺���һ������������װ����");
} else if (selection == 7) {
	typed=7;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n\r\n#b��ǰ���Ѿ�ӵ�У�#r" + cm.getItemQuantity(4310196) + " #b��  ��ȷ��Ҫ�һ���#k\r\n\r\n- #e������ʾ��#n#b�򿪲鿴�ɶһ���ϡ�����ӵ��ߵȡ�");
}
} else if (status == 2) {
	if(typed==1){
	cm.dispose();
   } else if(typed==2){
	if (cm.getBossLog("�޹�150") < 1 && cm.haveItem(4310196, 50)) {
	cm.setBossLog("�޹�150", 1);
	cm.gainItem(2431938, 1);
	cm.gainItem(4310196, -50);
	cm.sendOk("#b�ɹ�����һ�� #r#z2431938#")
	cm.dispose();
	} else {
	cm.sendOk("ʧ��\r\n\r\n1). ����#z4310196#����.\r\n2). ���Ѿ������һ����");
	cm.dispose();
	}
	} else if(typed==3){
	if (cm.getBossLog("�������") < 3 && cm.haveItem(4310196, 300)) {
	cm.setBossLog("�������", 1);
	cm.gainItem(2432069, 1);
	cm.gainItem(4310196, -300);
	cm.sendOk("#b�ɹ�����һ�� #r#z2432069#")
	cm.dispose();
	} else {
	cm.sendOk("ʧ��\r\n\r\n1). ����#z4310196#����.\r\n2). ���Ѿ������������");
	cm.dispose();
	}
	} else if(typed==4){
	if (cm.getBossLog("���������") < 1 && cm.haveItem(4310196, 400)) {
	cm.setBossLog("���������", 1);
	cm.gainItem(2432507, 1);
	cm.gainItem(4310196, -400);
	cm.sendOk("#b�ɹ�����һ�� #r#z2432507#")
	cm.dispose();
	} else {
	cm.sendOk("ʧ��\r\n\r\n1). ����#z4310196#����.\r\n2). ���Ѿ������һ����");
	cm.dispose();
	}
	} else if(typed==5){
	if (cm.getBossLog("����Ь�Ӿ�") < 1 && cm.haveItem(4310196, 400)) {
	cm.setBossLog("����Ь�Ӿ�", 1);
	cm.gainItem(2432506, 1);
	cm.gainItem(4310196, -400);
	cm.sendOk("#b�ɹ�����һ�� #r#z2432506#")
	cm.dispose();
	} else {
	cm.sendOk("ʧ��\r\n\r\n1). ����#z4310196#����.\r\n2). ���Ѿ������һ����");
	cm.dispose();
	}
	} else if(typed==6){
	if (cm.getBossLog("����������") < 1 && cm.haveItem(4310196, 400)) {
	cm.setBossLog("����������", 1);
	cm.gainItem(2432508, 1);
	cm.gainItem(4310196, -400);
	cm.sendOk("#b�ɹ�����һ�� #r#z2432508#")
	cm.dispose();
	} else {
	cm.sendOk("ʧ��\r\n\r\n1). ����#z4310196#����.\r\n2). ���Ѿ������һ����");
	cm.dispose();
	}
	} else if(typed==7){
	cm.dispose();
	cm.openNpc(9000290, 12);
	}
      }
    }
  }