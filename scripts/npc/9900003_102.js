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
			cm.sendYesNo("#dŮ��ϣ��˹���²����ڶ�,�����Ҫ�¸ҵ�ð�ռ�ǰ����������,�ڶཫ��ȴ����𣬹� #r20#k #d�����#k\r\n#e#d���� #bB#k#n #r(ÿ�˽����5 ��#t5062500#  5 ��#t5062009#)\r\n#e#d���� #bA#k#n #r(ÿ�˽����10 ��#t5062500#  10 ��#t5062009#)\r\n#e#d���� #bF#k#n #r(ÿ�˽���� 20 ��#t5062500# 20 ��#t5062009#)\r\n#e#d���� #bS#k#n#r (ÿ�˽���� 30 ��#t5062500# 30 ��#t5062009#)\r\n#r#eע������#k#n���ø�������Ѫ���϶࣬��������������\r\n#e#r����Ҫ��#k#n��#b����180�����ϣ�����HP����10��#k\r\n#r#e������ʾ#n#k�������;���߶��ǿ������¿�ʼ���������\r\n����������ȡ��������,�ٽ����ǲ�������ȡ������");					
		} else if (status == 1) {
		 if (cm.getLevel() <= 179) {
cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n\r\n����񻹲��߱������������Ҳ��������ǽ��롣\r\n\r\n\r\n- #e�ȼ�����#n��180������");
cm.dispose();
}
/*else if (cm.getHour() != 12 && cm.getHour() != 13 && cm.getHour() != 14 &&cm.getHour() != 20 && cm.getHour() != 22 &&cm.getHour() != 21){
cm.sendOk("ʱ��û��,С��ţ��������δ׼���á�"); 
cm.dispose();
}*/
else if (cm.getParty() == null) {
cm.sendOk("#e#r�����û��һ������,���ǲ��������ȥ��."); 
cm.dispose();
}
else if(!cm.isLeader()){
cm.sendOk("#e#r��ӳ�������̸��.");
cm.dispose();
}
 else if (cm.getMap(940021000).getCharactersSize() > 0) { // Not Party Leader
cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
cm.dispose();
}
else if (cm.getParty().getMembers().size() <= 3){
cm.sendOk("������ #r3#k ����Ա"); 
cm.dispose();
}
else if (cm.getBossLog("szsl") >= 1){
cm.sendOk("���Ѿ��������"); 
cm.dispose();
}
else if (cm.getEventCount("szsl") >= 1){
cm.sendOk("���Ѿ��������"); 
cm.dispose();
}else{
var em = cm.getEventManager("szsl");
if (em == null) {
cm.sendOk("������,����ϵGM.");
cm.dispose();
}else{
var party = cm.getParty().getMembers();//��ȡ���������ɫ��Ϣ
var it = party.iterator();
var next = true;
em.startInstance(cm.getParty(), cm.getChar().getMap());
}
cm.channelMessage(0x18, "��С��ţ����" + " : " + "��ϲ" + cm.getChar().getName() + ",�����Ķ��ѿ�ʼ��С��ţ����ף��ȡ�úõĳɼ�");
//cm.sendServerNotice(7, "����֮������" + " : " + "��� " + cm.getChar().getName() + " �����Ķ��ѿ�ʼ����֮������ף��ȡ�úõĳɼ�");
cm.dispose(); 
                }
		}
	}
}
