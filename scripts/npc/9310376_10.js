var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun = "#fUI/UIWindow/Megaphone/2#";////��ɳ©
var yun2 = "#fUI/UIWindow/Quest/icon8/0#";////��ָ��
var yun8 = "#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////����ָ��
var yun9 = "#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////����ָ��
var yun4 = "#fUI/UIWindow/Quest/reward#";////����
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //�ʹ�
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //�ʺ��
var eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //�ʹ�
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //�ʹ�1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //����
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //��ϵ
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //���� 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //�ʹ�3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //����
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //שʯ��
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //שʯ��
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //��ϵ
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //������!
var yun1 = "#fUI/UIWindow/Quest/icon7/10#";////��ɫԲ
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //����
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //����
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //����
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //����
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //����
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //����
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //��������
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //��������
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //��������
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //��������
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //��������
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //���ǻ�
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var RMB = 0;

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
			var selStr = "#d��ӭѡ����Ʒ����ѡ������Ҫ�ģ�#k\r\n\r\n";
			selStr +="\t#b����ǰ�������Ϊ��  #r" + cm.getRMB() + " #b Ԫ#k\r\n\r\n";
			selStr +="#L1##r"+tz1+"  ���������ϵ������#l#k\r\n";
 
			//selStr +="#L10##b"+tz1+"  ����150��³����˹/��������#l#k\r\n"; 
			//selStr +="#L2#"+tz1+" #r 8#k #b�ֽ�㹺�� #r#z4001006#���#k#l#k\r\n";
			//selStr +="#L3#"+tz1+" #r 10#k #b�ֽ�㹺�� #r#z4034151#ǿ�����#k#l#k\r\n";
			//selStr +="#L4#"+tz1+" #r 10#k #b�ֽ�㹺�� #r#z5062010#���(С)#k#l#k\r\n";
			//selStr +="#L5#"+tz1+" #r 50#k #b�ֽ�㹺�� #r#z5062010#���(��)#k#l#k\r\n";
			//selStr +="#L6#"+tz1+" #r90#k #b�ֽ�㹺�� #r#z5062010#���(��)#k#l#k\r\n";
			//selStr +="#L7#"+tz1+" #r80#k #b�ֽ�㹺�� #r����#z2049323#���#k#l#k\r\n";
			//selStr +="#L11#"+tz1+" #r100#k #b�ֽ�㹺�� #r#z5750000#���#k#l#k\r\n";
			//selStr +="#L12#"+tz1+" #r380#k #b�ֽ�㹺�� #r#z3994417#���#k#l#k\r\n";
			//selStr +="#L9#"+tz1+" #r  5#k #bԪ���� #r#z2049168##k#l#k\r\n";
			//selStr +="#L8#"+tz1+" #r 20#k #bԪ���� #r#z2049122##k#l#k\r\n";
			selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("���������ϵ����������ͨ��������������Ҫ�����Ķ࣬���Ǽ۸�ܹ�Ӵ�����Ƿ�Ҫ�鿴����?");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("ȷ������ #r������ë���#k ��? ����ʹ�õ��� #r8#k �ֽ��,ʹ�ú󽫻�û�����ë x #r20#k �������׳������Ҫ�õ��Ĳ���");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("ȷ������ #r�۱�ǿ�����#k ��? ����ʹ�õ��� #r10#k �ֽ��,ʹ�ú󽫻�÷۱�x #r100#k �����۱�ǿ��װ������Ҫ�õ��Ĳ���");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("ȷ������ #r#z5062010#���(С)#k ��? ����ʹ�õ��� #r10#k �ֽ�㡣ʹ�ú󽫻��#t5062010# x #r20#k ��.");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("ȷ������ #r#z5062010#���(��)#k ��? ����ʹ�õ��� #r50#k �ֽ�㡣ʹ�ú󽫻��#t5062010# x #r150#k ��.");
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("ȷ������ #r#z5062010#���(��)#k ��? ����ʹ�õ��� #r100#k �ֽ�㡣ʹ�ú󽫻��#t5062010# x #r300#k ��.");
			} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("ȷ������ #r#z2049323#���#k ��? ����ʹ�õ��� #r80#k �ֽ�㡣ʹ�ú󽫻��#t2049323# x #r100#k ��.");
			} else if (selection == 8) {
				typed=8;
				cm.sendYesNo("ȷ������ #r#z2049122##k ��? ����ʹ�õ��� #r20#k Ԫ��ʹ�ú󽫻��#t2049122# x #r1#k ��.");
			} else if (selection == 9) {
				typed=9;
				cm.sendYesNo("ȷ������ #r#z2049168##k ��? ����ʹ�õ��� #r5#k Ԫ��ʹ�ú󽫻��#t2049168# x #r1#k ��.");
			} else if (selection == 10) {
				typed=10;
				cm.sendYesNo("����150��������³����˹���ߡ����Ƿ�Ҫ�鿴����?");
			} else if (selection == 11) {
				typed=11;
				cm.sendYesNo("ȷ������ #r#z5750000#���#k ��? ����ʹ�õ��� #r100#k �ֽ�㡣ʹ�ú󽫻��#t5750000# x #r100#k ��.");
			} else if (selection == 12) {
				typed=12;
				cm.sendYesNo("ȷ������ #r#z3994417#���#k ��? ����ʹ�õ��� #r380#k �ֽ�㡣ʹ�ú󽫻��#v3994417# #v3994418# #v3994419# #v3994420# #v3994421# #v3994422#  x ��#r1#k ��.");

			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getSpace(1) >= 1) {
			cm.dispose();
			cm.openNpc(9310382, 301);
				} else {
			cm.sendOk("������λ����,������.");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.getRMB() >= 8 && cm.getSpace(4) >= 1) {
			cm.gainRMB(-8);
			cm.gainItem(4001006, 20);
			cm.sendOk("��ϲ���ɹ����������ë���.");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ��������ë���.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.getRMB() >= 10 && cm.getSpace(4) >= 1) {
			cm.gainRMB(-10);
			cm.gainItem(4034151, 100);
			cm.sendOk("��ϲ���ɹ�����۱�ǿ�����.");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ���۱�ǿ�����.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==4){
                if (cm.getRMB() >= 10 && cm.getSpace(5) >= 1) {
			cm.gainRMB(-10);
			cm.gainItem(5062010, 10);
			cm.sendOk("��ϲ���ɹ�����#z5062010#���(С).");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ����ռ�����ħ�����(С).");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==5){
                if (cm.getRMB() >= 50 && cm.getSpace(5) >= 1) {
			cm.gainRMB(-50);
			cm.gainItem(5062010, 60);
			cm.sendOk("��ϲ���ɹ�����#z5062010#���(��).");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ����ռ�����ħ�����(��).");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==6){
                if (cm.getRMB() >= 100 && cm.getSpace(5) >= 1) {
			cm.gainRMB(-100);
			cm.gainItem(5062010, 120);
			cm.sendOk("��ϲ���ɹ�����#z5062010#���(��).");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ����ռ�����ħ�����(��).");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==7){
                if (cm.getRMB() >= 80 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-80);
			cm.gainItem(2049323, 100);
			cm.sendOk("��ϲ���ɹ�����#z2049323#.");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ�������߼�װ��ǿ����.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==8){
                if (cm.getRMB() >= 20 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-20);
			cm.gainItem(2049122, 1);
			cm.sendOk("��ϲ���ɹ�����#z2049122#.");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ��� ����������.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==8){
                if (cm.getRMB() >= 5 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-5);
			cm.gainItem(2049168, 1);
			cm.sendOk("��ϲ���ɹ�����#z2049168#.");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ��� �������������� 20%.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==10){
                if (cm.getSpace(1) >= 1) {
			cm.dispose();
			cm.openNpc(9310376, 20);
				} else {
			cm.sendOk("������λ����,������.");
			cm.dispose();
				}
			}else if(typed==11){
                if (cm.getRMB() >= 100 && cm.getSpace(2) >= 1) {
			cm.gainRMB(-100);
			cm.gainItem(5750000, 100);
			cm.sendOk("��ϲ���ɹ�����#z5750000#.");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ�������ħ�����.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
			}else if(typed==12){
                if (cm.getRMB() >= 380 && cm.getSpace(4) >= 6) {
			cm.gainRMB(-380);
			cm.gainItem(3994417, 1);
			cm.gainItem(3994418, 1);
			cm.gainItem(3994419, 1);
			cm.gainItem(3994420, 1);
			cm.gainItem(3994421, 1);
			cm.gainItem(3994422, 1);
			cm.sendOk("��ϲ���ɹ�����#z3994417#.");
			cm.worldSpouseMessage(0x20, "�������̳ǡ� : ��ϲ " + cm.getChar().getName() + " �������̳ǹ����������.");
			cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�\r\n\r\n#r1). ��ǰ����.\r\n2). ������λ����,������.");
			cm.dispose();
				}
           }
		}
	  }
	}