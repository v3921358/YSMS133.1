var aaa ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed=0;
var rmb = 0;
var weaponId = null;
var weaponList = Array(
	1212063, // ������ħ��ԴȪ��, // (������)
	1222058, // ��������ʹ���, // (������)
	1232057, // ����������ʹ��, // (������)
	1242060, // �����ɾ���֮��, // ³����˹��װ(����)ר������
	1242061, // �����ɾ���֮��, // ³����˹��װ(����)ר������
	1302275, // ����������֮��, // (������)
	1312153, // ������˫�����⸫, // (������)
	1412135, // ������ս�����⸫, // (������)
	1322203, // �����ɸ���ϴ�, // (������)
	1332225, // �����ɴ���ʿ�｣, // (������)
	1342082, // �����ɼ���֮��, // (������)
	1362090, // �����ɶ�������, // (������)
	1372177, // ������ħ����ȡ��, // (������)
	1382208, // ������ħ��֮��, // (������)
	1402196, // ���������֮��, // (������)
	1422140, // ���������紸, // (������)
	1432167, // �����ɹ���ǹ, // (������)
	1442223, // �����ɰ��¿��и�, // (������)
	1452205, // ������׷����, // (������)
	1462193, // �����ɷ�����, // (������)
	1472214, // ������Σ��֮��, // (������)
	1482168, // �����ɾ���֮צ, // (������)
	1492179, // ����������ǹ, // (������)
	1522094, // ������˫������, // (������)
	1532098, // ��������ҫ��, // (������)
	1252015, // �����ɱ�����ħ����, // (������)
	1003797, // �߹�սʿͷ��, // (������)
	1003798, // �߹�����ά��ñ, // (������)
	1003799, // �߹���������ñ, // (������)
	1003800, // �߹�̿���ñ, // (������)
	1003801, // �߹�������ñ, // (������)
	1042254, // ӥ��սʿ����, // (������)
	1042255, // ӥ�۵�ά�泤��, // (������)
	1042256, // ӥ����������, // (������)
	1042257, // ӥ�۴̿ͳ���, // (������)
	1042258, // ӥ������������, // (������)
	1062165, // ħ��ʦսʿ�̿�, // (������)
	1062166, // ħ��ʦ��ά��̿�, // (������)
	1062167, // ħ��ʦ�����̿�, // (������)
	1062168, // ħ��ʦ�̿Ͷ̿�, // (������)
	1062169 // ħ��ʦ�����߶̿�, // (������)
);
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
            var selStr = head + "#d�������������150����������ѡ����Ҫ������װ����#n#k\r\n";    
			for(var key in weaponList) {
				var item = weaponList[key];
				selStr += "#r#L"+key+"#���� #v"+item+"##b#z"+item+"# #r[�鿴����]\r\n";
			}
        	cm.sendSimple(selStr);	
		} else if (status == 1) {
			weaponId = selection;
			cm.sendYesNo(head + "- #e#d#z"+weaponList[weaponId]+"#��Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
		} else if (status == 2) {
            if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
				cm.gainItem(weaponList[weaponId], 1);
				cm.gainItem(4310030, -5000);
				cm.gainItem(4033356, -50);
				cm.gainItem(4021012, -30);
				cm.gainItem(4021011, -30);
				cm.gainItem(4021010, -30);
				cm.gainItem(4000082, -400);
				cm.gainItem(4000124, -50);
				cm.gainItem(4310015, -3);
				cm.gainItem(4021019, -1);
				cm.sendOk(head + "��ϲ���ϳ�#z"+weaponList[weaponId]+"#һ��.");
				cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<��ͨ����Ա>��������"+cm.getItemName(weaponList[weaponId])+".");
				cm.dispose();
			} else {
				cm.sendOk(head + "�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
				cm.dispose();
			}
		}
	}
}