var vv = "#fUI/UIWindow2.img/ValuePacktton/complete/0#";//��ȡ���
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�

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
	cm.sendSimpleS("#b>>> #b��ӭʹ�ó�ֵ��� #r��ܰ��ʾ:1Ԫ==1���Ǳ�#n#b <<<#k\r\n#b����ǰ���Ǳ���Ϊ�� #r"+cm.getRMB()+" #b�Ǳ�  ���Ѿ���ȡ�� #r"+cm.getBossLog("��������", 1) +" #b��#k\r\n\r\n    ������ƺ��������������ȡ���Ӧ�ĸ���Ӵ����������ÿ������������������ȡ #e#r9���Ǳ�#n#k������м�û����ȡ����ʧ���������Լ��ģ����סһ��Ҫ��ʱ��ȡ���ܹ����� #r270#k Ԫ���Ǳҡ�\r\n#b#L2#"+tz8+" 80Ԫ����߼����һ��Ȩ#l\r\n#b#L3#"+tz8+" 200Ԫ����߼����һ��Ȩ#l\r\n\r\n#L4##b������һҳ#k#l\r\n" ,2);
	} else if (status == 1) {
if (selection == 1) {
	typed=1;
	cm.sendYesNo("- #e#d��ȡ���츣��#n#k\r\n\r\n#b��ǰ����ȡ�Ǳ� #r"+(5+cm.getBossLog("��������", 1))+"#b �Ǳң��Լ����е��ߣ�\r\n\r\n#b#z5062010# x 20   #d(װ��SS������Ҫ�ĵ���)\r\n#b#z5064000# x 5        #d(��ֹװ���ұ���Ҫ�ĵ���)\r\n#b#z4001006# x 20       #d(���׳������Ҫ�ĵ���)\r\n#b#z4310036# x 100      #d(�һ�װ������Ҫ�ĵ���)\r\n#b#z4033943# x 30         #d(������������Ҫ�ĵ���)\r\n#b#z4310108# x 100  #d(�һ���������Ҫ�ĵ���)\r\n#b#z2340000# x 10       #d(��ֹʧ�ܼ�����������)\r\n#b��� x 30,000,000   #d(��Ϸ���ʵ������ҽ���)\r\n#b��� x 20,000       #d(����������ߵ�װ)");
} else if (selection == 2) {
	typed=2;
	cm.sendYesNo("#r����һ����ƿ���ʹ�����¹��ܣ�\r\n- #b��ֵ����#k#n     (ÿ����ȡ9���Ǳ��Լ���������)\r\n- #b��ָ����#n#k    (�Ϲ����Ž�ָ����)\r\n- #b��˿�̵�#n#k     (��˿ϵ�е��ߣ���˿�ر�)\r\n- #b��ѡ����#n#k     (������ѡ��ɰ�����)\r\n- #bÿ��Ѱ��#n#k     (ÿ�����Ѱ��1��)\r\n- #b��������#n#k     (ÿ�������ȡ��������)\r\n- #b˫������#n#k     (ÿ�������ȡ˫������)\r\n- #b����Ѫ��#n#k     (����10�����1��Ѫ��)\r\n- #b��ȡ��ָ#n#k     (��ȡǿ�����Խ�ָ)\r\n- #b�������#n#k     (�����2��Сʱϡ������)\r\n- #b�߼�����#n#k     (���ո߼�װ���ɻ�õ��)\r\n- #e#bBOSS����#n#k     (��ѡ������ָ��BOSS����)\r\n- #b��������#n#k     (��ѡ������ָ����������)\r\n\r\n\t#e#r��ȷ��Ҫ������");
} else if (selection == 3) {
	typed=3;
	cm.sendYesNo("#d��������ƺ��ʹ�����¹��ܣ�\r\n- #b��ֵ����#k#n     (ÿ����ȡ9���Ǳ��Լ���������)\r\n- #b��ָ����#n#k    (�Ϲ����Ž�ָ����)\r\n- #b��˿�̵�#n#k     (��˿ϵ�е��ߣ���˿�ر�)\r\n- #b��ѡ����#n#k     (������ѡ��ɰ�����)\r\n- #bÿ��Ѱ��#n#k     (ÿ�����Ѱ��1��)\r\n- #b��������#n#k     (ÿ�������ȡ��������)\r\n- #b˫������#n#k     (ÿ�������ȡ˫������)\r\n- #b����Ѫ��#n#k     (����10�����1��Ѫ��)\r\n- #b��ȡ��ָ#n#k     (��ȡǿ�����Խ�ָ)\r\n- #b�������#n#k     (�����2��Сʱϡ������)\r\n- #b�߼�����#n#k     (���ո߼�װ���ɻ�õ��)\r\n- #bBOSS����#n#k     (��ѡ������ָ��BOSS����)\r\n- #b��������#n#k     (��ѡ������ָ����������)\r\n\r\n\t#e#r��ȷ��Ҫ������");
} else if (selection == 4) 
			{
				cm.dispose();
				cm.openNpc(1012124, 1012124);
				return;
}
} else if (status == 2) {
if(typed==1){
 if (cm.getBossLog("��������") == 20) {
cm.sendOk("\r\n\r\n#b������Ѿ�����ȫ��20�췵��������\r\n\r\n-\r\n- #e#d��ȡ����Ϊ��#n��#r"+cm.getBossLog("��������", 1) +" #b��#k");
cm.dispose();
}
else if (cm.getBossLog("���췵��") >= 1) {
cm.sendOk("#e#r�������Ѿ���ȡ�������������ԡ�"); 
cm.dispose();
}
/*else if (cm.getBossLog("���ƶ����", 1) < 1) {
cm.sendOk("#b�����ǰ����һ�µ���ƣ����޷�Ϊ������"); 
cm.dispose();
}*/
else if (cm.getSpace(4) < 4) {
cm.sendOk("#e#r��������ı����������ճ�4����λ��"); 
cm.dispose();
}
else if (cm.getSpace(5) < 2){
cm.sendOk("#e#r��������ı����������ճ�2����λ��");
cm.dispose();
}
else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r��������ı����������ճ�1����λ��");
cm.dispose();
}else{
cm.setBossLog("��������", 1);
cm.setBossLog("���췵��");
cm.gainItem(5062010, 20);
cm.gainItem(5064000, 5);
cm.gainItem(4001006, 20);
cm.gainItem(4310036, 100);
cm.gainItem(4033943, 30);
cm.gainItem(4310108, 100);
cm.gainItem(2340000, 10);
cm.gainMeso(30000000);
cm.gainNX(1, 20000);
cm.getRMB(-(5+cm.getBossLog("��������")));
cm.sendOk("\r\n\r\n#b�ɹ���ȡ�� #r"+(1+cm.getBossLog("��������"))+"#b Ԫ�ֽ���Լ��������ߡ�");
cm.worldSpouseMessage(0x20, "�����Ǯׯ�� : ��ϲ " + cm.getChar().getName() + " �ɹ���ȡ�� "+(4+cm.getBossLog("��������"))+" Ԫ�ֽ���Լ��������ߡ�.");
cm.dispose();
                        }
} else if(typed==2){
	if (cm.haveItem(2430865) > 1) {
	//if (cm.haveItem(2433424) >= 1|| cm.haveItem(2430865) >= 1) {
cm.sendOk(" ����ǰ�Ѿ���������ƣ������ظ��������ߵȴ����ں��ٰ���");
cm.dispose();
}

else if (cm.getSevenDayPayLog(1).get(0) <= 80) {
cm.sendOk("- #e#d��Ʒ�������Ȩ��#n��Ҫ�����ֵ80Ԫ #k\r\n\r\n#r������δ��ֵ80Ԫ���޷�Ϊ������������ơ�"); 
cm.dispose();
}
else if (cm.getRMB() <= 800000) {
cm.sendOk("- #e#d�����ǱҲ���800000��"); 
cm.dispose();
}
else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r��������ı����������ճ�1����λ��");
cm.dispose();
}else{
cm.resetBossLog("���ƶ����", 1);
cm.setBossLog("�������", 1);
//cm.gainNX(1, -100000);
cm.gainRMB(-800000);
cm.gainItem(2430865,1,7);
cm.sendOk("��ϲ���ɹ�����������Ʒ���.");
cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �ɹ�������Ʒ�������Ȩ��", 5120012);
cm.worldSpouseMessage(0x20, "��ϵͳ���桻 : ��ϲ " + cm.getChar().getName() + " �ɹ�����������Ʒ���.");
cm.dispose();
}
} else if(typed==3){
	if (cm.haveItem(2430865) > 1) {
	//if (cm.haveItem(2433424) >= 1 || cm.haveItem(2430865) >= 1) {
cm.sendOk(" ����ǰ�Ѿ���������ƣ������ظ��������ߵȴ����ں��ٰ���");
cm.dispose();
}

else if (cm.getSevenDayPayLog(1).get(0) <= 200) {
cm.sendOk("- #e#d��Ʒ���һ��Ȩ��#n��Ҫ�����ֵ200Ԫ #k\r\n\r\n#r������δ��ֵ200Ԫ���޷�Ϊ������һ������ơ�"); 
cm.dispose();
}
else if (cm.getRMB() <= 2000000) {
cm.sendOk("- #e#d�����ǱҲ���2000000��"); 
cm.dispose();
}
else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r��������ı����������ճ�1����λ��");
cm.dispose();
}else{
cm.setBossLog("���ƶ����", 1);
cm.resetBossLog("���ʮ��", 1);
cm.gainRMB(-2000000);
cm.gainItem(2430865,1,30);
cm.sendOk("��ϲ���ɹ�����һ������Ʒ���.");
cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �ɹ�������Ʒ���һ��Ȩ��", 5120012);
cm.worldSpouseMessage(0x20, "��ϵͳ���桻 : ��ϲ " + cm.getChar().getName() + " �ɹ�����һ������Ʒ���.");
cm.dispose();
}
                }
}
}
}