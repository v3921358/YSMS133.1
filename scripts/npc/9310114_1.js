/*
�齱����
*/
var status = 0;
var psrw = Array(
Array(5062000, 5), 
Array(5062000, 2), 
Array(5062000, 1), 
Array(5062002, 1),
Array(5062002, 2),
Array(5062002, 3), 
Array(5062002, 5),
Array(2340000, 1),
Array(2340000, 2),
Array(2340000, 3),
Array(2340000, 5), 
Array(5064000, 1),
Array(5064000, 2),
Array(5064000, 3),
Array(5064000, 5),    
Array(5062500, 1), 
Array(5062500, 2), 
Array(5062500, 3), 
Array(5062500, 5), 
Array(5390018, 1), 
Array(5390000, 10), 
Array(5390001, 10), 
Array(5390002, 10), 
Array(5390002, 5),
Array(5390001, 5),
Array(5390000, 5),
Array(4001714, 1),
Array(4001784, 1),
Array(4001785, 1),
Array(4310036, 10),
Array(4310036, 20),
Array(4310036, 30),
Array(4310036, 50),
Array(4310036, 100),
Array(1112915, 1),
Array(1402199, 1),
Array(1232060, 1),
Array(1222061, 1),
Array(1212066, 1),
Array(1242065, 1),
Array(1302277, 1),
Array(1322205, 1),
Array(1332227, 1),
Array(1372179, 1),
Array(1382211, 1),
Array(1422142, 1),
Array(1432169, 1),
Array(1442225, 1),
Array(1452207, 1),
Array(1462195, 1),
Array(1472216, 1),
Array(1482170, 1),
Array(1492181, 1),
Array(1522096, 1),
Array(1532100, 1),
Array(1252065, 1),
Array(1362092, 1)
);
var rand = Math.floor(Math.random() * psrw.length);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        cm.sendYesNo("����������Ļ���Ģ�����ˣ�����ػ�ȡĢ���������� #r#t4001318##k���һ�������һ��С��������Ц�ɡ�");
    } else if (status == 1) {
          if (cm.haveItem(4001318, 1) == false) {
		cm.sendOk("��û��1��#v4001318##z4001318#");
		cm.dispose();
         } else if (cm.getSpace(1) < 1 && cm.getSpace(2) < 1 && cm.getSpace(3) < 1 && cm.getSpace(4) < 1 && cm.getSpace(5) < 1) {
		cm.sendOk("�㱣֤�㱳����ÿһ�����п�λ");
		cm.dispose();
            } else {
	   var ii = cm.getItemInfo();
	   cm.gainItem(psrw[rand][0],+psrw[rand][1]); //����������
	   cm.removeAll(4001318); //����1��ʹ�õ��������
	   cm.warp(910000000);
	   cm.gainItem(4310129, 10);
	   cm.gainItem(2003517, 1);
	   cm.gainItem(5062002, 5);
	  cm.setBossLog("Heros");
	   cm.sendOk("��ȡ�� #v"+psrw[rand][0]+"# "+psrw[rand][1]+"����#b����������#k10����#b�߼�������ҩ#k1����#b�߼�����ħ��#k5����");
	cm.channelMessage(0x18, "��Ӣ�۾�����" + " : " + "[" + cm.getChar().getName() + "]�����" + psrw[rand][1] + "��<" + ii.getName(psrw[rand][0]) + ">,��ȥ��ս��");
	   cm.dispose(); 
	}
		}
		}

