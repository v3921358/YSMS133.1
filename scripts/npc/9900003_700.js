var status = 0;
var selStr;
var sel;
var selitem;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#";//��ȡ���

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
			selStr = "#r#e<��԰����ս>#n#k.\r\nǿ��ĺ�ħ��ʦ��Ϯ���������������!#b\r\n��Ŀǰӵ�У� #r" + cm.getPlayer().getCSPoints(1) + "#k #b���  ����һ�ο۳� #r500#k #b���\r\n#r���ѵ���ģʽ��������ʱ�� 10 ����\r\n#b�����ģʽ��������ʱ�� 5 ����\r\n";
			selStr+="#L2#" + aaa + " ʲô�Ǽ�԰����ս��#l\r\n";
			selStr+="#L3#" + aaa + " #r#z4310091##k#b��ȡϡ�����ӣ�ÿ�ܸ��£�#l\r\n";
			selStr+="#L5#" + aaa + " #r#z4310091##k#b��ȡ�߼�װ����ÿ�ܸ��£�#b#l\r\n";
			selStr+="#L1#" + aaa + " ��ģʽ������#z4310091#������3000���þ�#l\r\n";
			selStr+="#L4#" + aaa + " ����ģʽ������#z4310091#������500���#l\r\n";
			selStr+="#L7#" + aaa + " ��ģʽ�����ģʽ�����۶ӳ�5000���þ�#l\r\n";
			selStr+="#L8#" + aaa + " ����ģʽ�����ģʽ�����۶ӳ�1000���#l";
			cm.sendSimple(selStr);
    } else if (status == 1) {
		sel=selection;
        if(sel==1){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����,����ֻ������һ����~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 3000) { // Not Party Leader
                    cm.sendOk("��ĵ��þ���3000�㣬���㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() > 1) {
                        cm.sendOk("#r�Բ���,Ϊ�˳��׵Ĳ����������,ֻ��һ��ǰ��..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -3000); //�۳����
                    cm.channelMessage(0x09, "��������԰��" + " : " + "���<" + cm.getChar().getName() + ">�������ػ���ͼ��ʼ������԰");
                        cm.dispose();
                    }
}
        } else if(sel==4){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����,����ֻ������һ����~.zzzZZZZZ..");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 500) { // Not Party Leader
                    cm.sendOk("��ĵ����500�㣬���㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() > 1) {
                        cm.sendOk("#r�Բ���,Ϊ�˳��׵Ĳ����������,ֻ��һ��ǰ��..");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw1");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
		    cm.gainNX(1, -500);
                    cm.channelMessage(0x09, "��������԰��" + " : " + "���<" + cm.getChar().getName() + ">�������ػ���ͼ��ʼ������԰");
                        cm.dispose();
                    }
}
        } else if(sel==7){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(2) < 5000) { // Not Party Leader
                    cm.sendOk("��ĵ��þ���5000�����㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r�Բ���,��ӱ���2�����ϣ�����ѡ����ģʽ");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.gainNX(2, -5000); //�۳����
                    cm.channelMessage(0x09,"��������԰��" + " : " + "���<" + cm.getChar().getName() + ">������ʥ�ؿ�ʼ����ʥ��[���ģʽ]");
                        cm.dispose();
                    }
}
        } else if(sel==8){
              if (cm.getParty() == null) { // No Party
                    cm.sendOk("��Ҫ��#b����#kһ�����");
                    cm.dispose();
                    return;
                } else if (!cm.isLeader()) { // Not Party Leader
                    cm.sendOk("��жӳ�����˵��.");
                    cm.dispose();
                    return;
                } else if (cm.getMap(746000015).getCharactersSize() > 0) { // Not Party Leader
                    cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                    cm.dispose();
                    return;
                } else if (cm.getPlayer().getCSPoints(1) < 1000) { // Not Party Leader
                    cm.sendOk("��ĵ����1000�����㹻������");
                    cm.dispose();
                    return;
                } else {
                    var party = cm.getParty().getMembers();
                    if (party.size() < 2) {
                        cm.sendOk("#r�Բ���,��ӱ���2�����ϣ�����ѡ����ģʽ");
                        cm.dispose();
                        return;
                    }
                    var em = cm.getEventManager("jysw1");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
		    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
		    cm.gainNX(1, -1000);
                    cm.channelMessage(0x09, "��������԰��" + " : " + "���<" + cm.getChar().getName() + ">������ʥ�ؿ�ʼ����ʥ��[���ģʽ]");
                        cm.dispose();
                    }
}
		} else if (sel==3){
			cm.dispose();
              	        cm.openNpc(9900003,701);  
		} else if (sel==5){
			cm.dispose();
              	        cm.openNpc(9900003,702);                        
		} else if (sel==2){
			cm.sendOkS("#r#e<������԰>\r\n#r#e������ɫ��#k#n�����ÿ��15��ˢ��һ�������Ѹ������\r\n#r#e��սʧ��������#k#n��ͼ��������������100ֻ��\r\n#e#r��ս������#k#nɱ��������л��ʵ���#v4310091##z4310091#\r\n#r#e��������#k#n��������ߵ��þ�",2);
			cm.dispose();
		} else if (sel==6){
			cm.sendOkS("��δ����",2);
			cm.dispose();
	 }
}
}
