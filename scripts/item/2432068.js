
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����
var RMB = 0;
var PayLogPoints = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (im.getMapId() == 180000001) {
            im.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            im.dispose();
        } 
    else if (status == 0) {
		var selStr = "#r[��ʾ]�� #e#b��ѡ������Ҫ�ĸ���������ֻ����ȡ1��Ŷ��#k#n\r\n\r\n#r[���ע��]:#b��ʱ����ȡ����ֹͣ�Ի�\r\n\r\n";
		selStr += "#r#L0#"+ttt6+"  1). #z1212079##l\r\n";//����˫ͷ��
		selStr += "#r#L1#"+ttt6+"  2). #z1222074##l\r\n";//����������
		selStr += "#r#L2#"+ttt6+"  3). #z1232074##l\r\n";//������ħ��
		selStr += "#r#L3#"+ttt6+"  4). #z1402210##l\r\n";//����˫�ֽ�
		selStr += "#r#L4#"+ttt6+"  5). #z1242080##l\r\n";//����������
		selStr += "#r#L5#"+ttt6+"  6). #z1302289##l\r\n";//������
		selStr += "#r#L6#"+ttt6+"  7). #z1312165##l\r\n";//����ս��
		selStr += "#r#L7#"+ttt6+"  8). #z1322215##l\r\n";//�������ϴ�
		selStr += "#r#L8#"+ttt6+"  9). #z1332238##l\r\n";//�����и���
		selStr += "#r#L9#"+ttt6+" 10). #z1362101##l\r\n";//��������
		selStr += "#r#L10#"+ttt6+" 11). #z1372188##l\r\n";//��������
		selStr += "#r#L11#"+ttt6+" 12). #z1382101##l\r\n";//��������
		selStr += "#r#L12#"+ttt6+" 13). #z1382222##l\r\n";//����ʥ��
		selStr += "#r#L13#"+ttt6+" 14). #z1412147##l\r\n";//����˫��ս��
		selStr += "#r#L14#"+ttt6+" 15). #z1422152##l\r\n";//�����޴�
		selStr += "#r#L15#"+ttt6+" 16). #z1432178##l\r\n";//����֮ì
		selStr += "#r#L16#"+ttt6+" 17). #z1442234##l\r\n";//�������
		selStr += "#r#L17#"+ttt6+" 18). #z1452216##l\r\n";//������
		selStr += "#r#L18#"+ttt6+" 19). #z1462204##l\r\n";//����������
		selStr += "#r#L19#"+ttt6+" 20). #z1472226##l\r\n";//����ȭ��
		selStr += "#r#L20#"+ttt6+" 21). #z1482179##l\r\n";//������ȭ
		selStr += "#r#L21#"+ttt6+" 22). #z1492190##l\r\n";//������ܿ�
		selStr += "#r#L22#"+ttt6+" 23). #z1522105##l\r\n";//����˫����
		selStr += "#r#L23#"+ttt6+" 24). #z1532109##l\r\n";//��������
		selStr += "#r#L24#"+ttt6+" 25). #z1252046##l\r\n";//����è��ħ����
		selStr += "#r#L25#"+ttt6+" 26). #z1542074##l\r\n";//������
		selStr += "#r#L26#"+ttt6+" 27). #z1552074##l\r\n";//������


		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
	//if (im.getSpace(2) >= 1) {
		im.gainItem(2432068, -1);
		im.gainItem(1222079, 1);//����˫ͷ��
		im.sendOk("����� #z1222079# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���˫ͷ�ȡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 1:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1222074, 1);//����������
		im.sendOk("����� #z1222074# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸��������率�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 2:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1232074, 1);//������ħ��
		im.sendOk("����� #z1232074# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�����ħ����");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;

	case 2:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1232074, 1);//������ħ��
		im.sendOk("����� #z1232074# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�����ħ����");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 3:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1402210, 1);//����˫�ֽ�
		im.sendOk("����� #z1402210# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���˫�ֽ���");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 4:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1242080, 1);//����������
		im.sendOk("����� #z1242080# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�����������");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 5:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1302289, 1);//������
		im.sendOk("����� #z1302289# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�������");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 6:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1312165, 1);//����ս��
		im.sendOk("����� #z1312165# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���ս����");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 7:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1322215, 1);//�������ϴ�
		im.sendOk("����� #z1322215# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸������ϴ���");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 8:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1332238, 1);//�����и���
		im.sendOk("����� #z1332238# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸����и��ߡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 9:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1362101, 1);//��������
		im.sendOk("����� #z1362101# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸������ȡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 10:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1372188, 1);//��������
		im.sendOk("����� #z1372188# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸������ȡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 11:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1382101, 1);//��������
		im.sendOk("����� #z1382101# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸������ȡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 12:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1382222, 1);//����ʥ��
		im.sendOk("����� #z1382222# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���ʥ�ȡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 13:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1412147, 1);//����˫��ս��
		im.sendOk("����� #z1412147# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���˫��ս����");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 14:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1412152, 1);//�����޴�
		im.sendOk("����� #z1422152# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸����޴���");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 15:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1432178, 1);//����֮ì
		im.sendOk("����� #z1432178# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���֮ì��");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 16:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1442234, 1);//�������
		im.sendOk("����� #z1442234# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�����ꪡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 17:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1452216, 1);//������
		im.sendOk("����� #z1452216# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�������");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 18:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1462204, 1);//����������
		im.sendOk("����� #z1462204# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���������");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 19:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1472226, 1);//����ȭ��
		im.sendOk("����� #z1472226# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���ȭ�ס�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 20:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1482179, 1);//������ȭ
		im.sendOk("����� #z1482179# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�����ȭ��");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 21:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1492190, 1);//������ܿ�
		im.sendOk("����� #z1492190# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�����ܿˡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 22:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1522105, 1);//����˫����
		im.sendOk("����� #z1522105# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���˫����");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 23:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1532109, 1);//��������
		im.sendOk("����� #z1532109# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸������ڡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 24:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1252046, 1);//����è��ħ����
		im.sendOk("����� #z1252046# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸���è��ħ������");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 25:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1542074, 1);//������
		im.sendOk("����� #z1542074# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸�������");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;
	case 26:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1552074, 1);//������
		im.sendOk("����� #z1552074# x 1");
		im.worldSpouseMessage(0x24,"�����������䡻����� "+ im.getChar().getName() +" ����˸����ȡ�");	
		im.dispose();
	} else {
               im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���ĵȼ�����100��.�޷���ȡ.\r\n2). ����ǰ����ѩ���Ҳ���30�ҡ���ȥ�г��һ�");
		im.dispose();
	}
		break;







}
    }
}
