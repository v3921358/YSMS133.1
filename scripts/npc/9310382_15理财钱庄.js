var vv = "#fUI/UIWindow2.img/ValuePacktton/complete/0#";//��ȡ���
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
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
	cm.sendSimpleS("\t\t\t#b>>> #e#d��ӭʹ�����Ǯׯ#n#b <<<#k\r\n#b����ǰ�������Ϊ�� #r"+cm.getRMB()+" #bԪ  ���Ѿ���ȡ�� #r"+cm.getBossLog("��������", 1) +" #b��#k\r\n#b#L1#      "+tz1+" ��ȡ�� #r"+ (1+cm.getBossLog('��������', 1)) + " #b�췵�� #r"+(5+cm.getBossLog("��������", 1))+" #bԪ���#l\r\n\r\n" ,2);
	} else if (status == 1) {
if (selection == 1) {
	typed=1;
	cm.sendYesNo("- #e#d��ȡ���츣��#n#k\r\n#b��ǰ����ȡ��� #r"+(5+cm.getBossLog('��������', 1))+"#b Ԫ���Լ����е��ߣ�\r\n#b#z4001465# x 100 ��      #d(�Ϲ����Ž�ָ��������)#k\r\n#b#z4034304# x 30 ��       #d(����ǿ������Ҫ�ĵ���)#k\r\n#b#z5062009# x 100 ��  #d(װ��SS������Ҫ�ĵ���)\r\n#b#z5064000# x 10 ��       #d(��ֹװ���ұ���Ҫ�ĵ���)\r\n#b#z4033204# x 10 ��     #d(���׳������Ҫ�ĵ���)\r\n#b#z4310036# x 100         #d(�һ�װ������Ҫ�ĵ���)\r\n#b#z4310023# x 30       #d(ʱװ��������Ҫ�ĵ���)\r\n#b#z4310108# x 30      #d(�һ���������Ҫ�ĵ���)\r\n#b#z2340000# x 10          #d(��ֹʧ�ܼ�����������)\r\n#b��� x 30,000,000      #d(��Ϸ���ʵ������ҽ���)\r\n#b��� x 15,000          #d(����������ߵ�װ)#k");
}
} else if (status == 2) {
if(typed==1){
 if (cm.getBossLog("��������", 1) > 19) {
cm.sendOk("\r\n\r\n#b������Ѿ�����ȫ��20�췵��������\r\n\r\n-\r\n- #e#d��ȡ����Ϊ��#n��#r"+cm.getBossLog('��������', 1) +" #b��#k");
cm.dispose();
} else if (cm.getBossLog('���췵��') >= 1) {
cm.sendOk("#e#r�������Ѿ���ȡ�������������ԡ�"); 
cm.dispose();
}
else if (!cm.getBossLog("���ƶ����", 1) < 1) {
cm.sendOk("#b�����ǰ����һ�µ���ƣ����޷�Ϊ������"); 
cm.dispose();
} 
else if (cm.getSpace(4) < 4) {
cm.sendOk("#e#r��������ı����������ճ�4����λ��"); 
cm.dispose();
} else if (cm.getSpace(5) < 2){
cm.sendOk("#e#r��������ı����������ճ�2����λ��");
cm.dispose();
} else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r��������ı����������ճ�1����λ��");
cm.dispose();
} else {
cm.setBossLog('��������', 1);
cm.setBossLog('���췵��');
cm.gainItem(4001465, 100);//���ı�ʯ���Ϲ����Ž�ָʹ��
cm.gainItem(4034304, 30);//NENE����,����ǿ����Ҫ�ĵ���
cm.gainItem(5062009, 100);//����ħ��
cm.gainItem(5064000, 10);//��������
cm.gainItem(4033204, 10);//��ů����ë��������ʹ��
cm.gainItem(4310036, 100);//�����߱�
cm.gainItem(4310023, 30);//���˵�ͭ��ʱװ����ʹ��
//cm.gainItem(4033943, 30);//ħ������ʱȡ������Ʒ���ͣ�
cm.gainItem(4310108, 30);//ð�յ�����ң��һ�����ָ����Ҫ�ĵ���
cm.gainItem(2340000, 10);//ף������
cm.gainMeso(30000000);//���
cm.gainNX(1, 15000);//���
cm.gainRMB( (4+cm.getBossLog('��������')));//���
//cm.addHyPay(-(4+cm.getBossLog('��������')));
cm.sendOk("\r\n\r\n#b�ɹ���ȡ�� #r"+(4+cm.getBossLog('��������', 1))+"#b Ԫ����Լ��������ߡ�");
cm.worldSpouseMessage(0x24, "�����Ǯׯ�� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�˵� "+cm.getBossLog('��������', 1) +" �췵 "+(4+cm.getBossLog('��������', 1))+" Ԫ����Լ��������ߡ�.");
cm.dispose();
                        }
                }
          }
     }
}