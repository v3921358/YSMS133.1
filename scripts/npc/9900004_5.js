var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var status = 0;

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
            //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n\r\n";//\r\n#L0#����\r\n#L1#����
			var selStr = "#e#b��ӭʹ����Ʒ�������������ս������#k#n\r\n";
			selStr += "#r#L0#"+aa+" ϣ��֮��   #d(ʣ����ô���Ϊ�� #r"+(3-cm.getBossLog("�����񻰸���"))+" #d��)#l\r\n";
			selStr += "#r#L1#"+aa+" ɭ��BOSS   #d(ʣ����ô���Ϊ�� #r"+(3-cm.getBossLog("����ɭ�ֱ���"))+" #d��)#l\r\n";
			selStr += "#r#L2#"+aa+" �ƽ���Ժ   #d(ʣ����ô���Ϊ�� #r"+(3-cm.getBossLog("���ûƽ���Ժ"))+" #d��)#l\r\n";             
			//selStr += "#r#L3#"+aa+" ���׺���   #d(ʣ����ô���Ϊ�� #r"+(3-cm.getBossLog("���ý��׺���"))+" #d��)#l\r\n";
			//selStr += "#r#L4#"+aa+" ��������   #d(ʣ����ô���Ϊ�� #r"+(3-cm.getBossLog("���ð�������"))+" #d��)#l\r\n";
			//selStr += "#r#L5#"+aa+" ʱ����   #d(ʣ����ô���Ϊ�� #r"+(3-cm.getBossLog("����Ʒ����"))+" #d��)#l\r\n";
			//selStr += "#r#L6#"+aa+" ϣ��˹Ů�� #d(ʣ����ô���Ϊ�� #r"+(3-cm.getBossLog("����ϣ��˹"))+" #d��)#l\r\n";
			//selStr += "#r#L8#"+aa+" ��ͨ������ #d(ʣ����ô���Ϊ�� #r"+(1-cm.getBossLog("������ͨ������"))+" #d��)#l\r\n";
			//selStr += "#r#L9#"+aa+" ���������� #d(ʣ����ô���Ϊ�� #r"+(1-cm.getBossLog("���ý���������"))+" #d��)#l\r\n";
			//selStr += "#r#L10#"+aa+" ����Ʒ���� #d(ʣ����ô���Ϊ�� #r"+(1-cm.getBossLog("���û���Ʒ����"))+" #d��)#l\r\n";
			//selStr += "#r#L11#"+aa+" ج�α��յ� #d(ʣ����ô���Ϊ�� #r"+(1-cm.getBossLog("���ñ��յ�"))+" #d��)#l\r\n";
			//selStr += "#r#L12#"+aa+" �����˹   #d(ʣ����ô���Ϊ�� #r"+(1-cm.getBossLog("���������˹"))+" #d��)#l\r\n";
 	    cm.sendSimple(selStr);
    } else if (status == 1) {
      switch (selection) {
        case 0:
           if (cm.getBossLog("�����񻰸���") < 3 && cm.getBossLog("�񻰸���") > 2) {
                    cm.resetBossLog("�񻰸���");
					cm.setBossLog("�����񻰸���");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] �����������������ϣ��֮��.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 1:
           if (cm.getBossLog("����ɭ�ֱ���") < 3 && cm.getBossLog("ɭ�ֱ���") > 1) {
                    cm.resetBossLog("ɭ�ֱ���");
					cm.setBossLog("����ɭ�ֱ���");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] �����������������ɭ�ֱ���.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 2:
           if (cm.getBossLog("���ûƽ���Ժ") < 3 && cm.getBossLog("GoldTemple") > 1) {
                    cm.resetBossLog("GoldTemple");
					cm.setBossLog("���ûƽ���Ժ");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] ����������������˻ƽ���Ժ.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 3:
           if (cm.getBossLog("���ý��׺���") < 3 && cm.getBossLog("���׺���") > 1) {
                    cm.resetBossLog("���׺���");
					cm.setBossLog("���ý��׺���");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] ����������������˽��׺���.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 4:
           if (cm.getBossLog("���ð�������") < 3 && cm.getBossLog("��������") > 1) {
                    cm.resetBossLog("��������");
					cm.setBossLog("���ð�������");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] ����������������˰�������.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 5:
           if (cm.getBossLog("����Ʒ����") < 3 && cm.getBossLog("Ʒ����") > 1) {
                    cm.resetBossLog("Ʒ����");
					cm.setBossLog("����Ʒ����");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] �����������������Ʒ����.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 6:
           if (cm.getBossLog("����ϣ��˹") < 3 && cm.getBossLog("ϣ��˹") >= 1) {
                    cm.resetBossLog("ϣ��˹");
					cm.setBossLog("����ϣ��˹");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] �����������������ϣ��˹.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 8:
           if (cm.getBossLog("������ͨ������") < 1 && (cm.getBossLog("��ͨƤ����") > 1 || cm.getBossLog("��ͨѪ��Ů��") > 1 || cm.getBossLog("��ͨ����") > 1 || cm.getBossLog("����Կ��") > 2)){
                    cm.resetBossLog("��ͨƤ����");
					cm.resetBossLog("��ͨѪ��Ů��");
					cm.resetBossLog("��ͨ����");
					cm.resetBossLog("����Կ��");
					cm.setBossLog("������ͨ������");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] �����������������³����˹[��ͨ].");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��³����˹<��ͨ>#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 9:
           if (cm.getBossLog("���ý���������") < 1 && (cm.getBossLog("����Ƥ����") > 1 || cm.getBossLog("����Ѫ��Ů��") > 1 || cm.getBossLog("���ױ���") > 1 || cm.getBossLog("����Կ��") > 2)){
                    cm.resetBossLog("����Ƥ����");
					cm.resetBossLog("����Ѫ��Ů��");
					cm.resetBossLog("���ױ���");
					cm.resetBossLog("����Կ��");
					cm.setBossLog("���ý���������");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] �����������������³����˹[����].");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��³����˹<����>#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 10:
           if (cm.getBossLog("���û���Ʒ����") < 1 && cm.getBossLog("����Ʒ����") >= 1) {
                    cm.resetBossLog("����Ʒ����");
					cm.setBossLog("���û���Ʒ����");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] ����������������˻���Ʒ����.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
		case 11:
           if (cm.getBossLog("���ñ��յ�") < 1 && cm.getBossLog("���յ�") >= 1) {
                    cm.resetBossLog("���յ�");
					cm.resetEventCount("���յ�");
					cm.setBossLog("���ñ��յ�");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] ����������������˱��յ�.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
		case 12:
           if (cm.getBossLog("���������˹") < 1 && cm.getBossLog("�����˹") >= 1) {
                    cm.resetBossLog("�����˹");
					cm.setBossLog("���������˹");
                    cm.sendOk("��ܰ��ʾ��#b\r\n�������óɹ�����ʿ�ж������ɣ�");
					cm.worldSpouseMessage(0x20, "����Ƹ������á� : [" + cm.getChar().getName() + "] ����������������������˹.");
					cm.dispose();
                } else {
                    cm.sendOk("��ܰ��ʾ��#b\r\n\r\n1). ��ս�ĸ�������û���꣬��ʹ�ú����ԣ������˷ѡ�\r\n2). �����ø����Ĵ����Ѿ�ʹ���꣬���������ԡ�");
                    cm.dispose();
                }
            	    break;
        case 7:
	if( cm.haveItem(4310015,3) && (cm.getBossLog("��������") > 1 || cm.getBossLog("���׺���") > 1 || cm.getBossLog("Ʒ����") > 1)){
                    cm.resetBossLog("��������");
                    cm.resetBossLog("���׺���");
                    cm.resetBossLog("Ʒ����");
		    cm.gainItem(4310015,-3);
	    cm.sendOk("���óɹ�.ף����Ϸ���!");
	    cm.dispose();
} else {
	    cm.sendOk("��û�д�������֤��x3(BOSS���)\r\n�������ս������û��ʹ����Ŷ");
	    cm.dispose();
}
            break;
        }
    }
}