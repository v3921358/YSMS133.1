
var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //������

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
    if (cm.getMapId() == 180000001) {
        cm.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
        cm.dispose();
    }
    else if (status == 0) {
        var selStr = "\r\n#e#d���ã�����������ɫ����ϵ��,�������ڴ����..#k#n#l#k\r\n\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        //selStr += "#L10#" + ttt6 + " #r11.#e#b ���ﰲ�ؾ�����(New~)#l#k#n\r\n";
		selStr += "#L11#" + ttt + " #b[����]�������ܱ���ѩ��  ==#k#n���������飩#l\r\n";
        	selStr += "#L6#" + ttt + " #b[����]���޻�������  ==#k#n (��������)#l\r\n";
		selStr += "#L1#" + ttt + " #b[����]�ɻ���ս  ==#k#n��140װ����#l\r\n";
		selStr += "#L16#" + ttt + " #b[����]������ս  ==#k#n [�������]#l\r\n";
		selStr += "#L15#" + ttt + " #b[����]������  == #k#n(������)#l\r\n\r\n";
       		selStr += "#L10#" + ttt + " #b [����]���ﰲ�ؾ�����  == #k#n(�����߱�) #k#l#n\r\n";


		selStr += "#L53#" + ttt + " #b[���]�������� ==#k#n����ĸ�̱��䣩#l\r\n";
		selStr += "#L54#" + ttt + " #b[���]��ʼ����Ĺ ==#k#n������������#l\r\n";
		selStr += "#L55#" + ttt + " #b[���]��ɽ��ףӢ̨ ==#k#n����������#l\r\n";//Ŀǰ״̬�� "+zdlz+"
		selStr += "#L56#" + ttt + " #b[���]��ռ������ ==#k#n����������#l\r\n";//Ŀǰ״̬�� "+zdhd+"
		selStr += "#L26#" + ttt + " #b[���]���﹫԰ #l\r\n";
		//selStr +="#L12#"+ttt6+" [���]�������Ժ    (#kĿǰ״̬�� "+zdgj+")#l\r\n";
        	selStr += "#L9#" + ttt + " #b[���]Ӣ�۾���  ==#k#n (������ָ)#l\r\n";

		//selStr += "#L3#" + ttt + " #b���ͥԺ  ==#k#n��������ң�#l\r\n";

		//selStr += "#L22#" + ttt + " #b��������  ==#k#n (����ʯ����,���þ�)#l\r\n";


		//selStr += "#L24#" + ttt + " #b��������  ==#k#n��������#l\r\n";
		selStr += "#L14#" + ttt + " #b[���]�������������  ==#k#n���񻰶�����140װ����\r\n";
		selStr += "#L0#" + ttt + " #b[���]ɭ�ֱ���ս  ==#k#n������,װ����#l\r\n";

		selStr += "#L17#" + ttt + " #b[���]��սɭ����  ==#k#n������������\r\n";
        	selStr += "#L5#" + ttt + " #b[���]�ƽ���Ժ  ==#k#n(140����)#l\r\n";
		//selStr += "#L8#" + ttt + " #b���޻�����ս==#k#n��ÿ10�ؽ����߼�ħ����#l\r\n";

        	selStr += "#L7#" + ttt + " #b[���]�������  ==#k#n (����)#l\r\n";
        	selStr += "#L27#" + ttt + " #b[���]����  #l\r\n";

		//selStr += "\r\n\t======= �߼����� ��ģʽ������ =======\r\n\r\n";


		//selStr += "#L21#" + ttt + " #b��ǿ˹����Ӹ��� #k#n(160����˹#k#l\r\n\r\n";//#i1402251:#



		//selStr += "#e#r�߼�����#k#n#k  �Ƽ���壺50������\r\n";


		//selStr += "#L18#" + ttt6 + " #k#n[��]#k#n#r ��ս���͵� #k#n #i2431938:##k#i2430051:##k#l\r\n\r\n";
		//selStr += "#L4#" + ttt6 + " #b ��սӢ���Ĵ��������ɣ���ϡ�е��ߣ�#l\r\n";

		//selStr += "#L2#" + ttt + " #b �����ڳ����ð�ռң�����1000���#l\r\n";


        selStr += "\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
                cm.dispose();
                cm.openNpc(9900003, 109);
                break;
            case 1:
                cm.worldSpouseMessage(0x20, "[ȫ��ɻ���ս] ����� " + cm.getChar().getName() + " �����˻�������ҡ�");
                cm.dispose();
                cm.warp(540010001, 0);
                break;
            case 2:
                cm.dispose();
                cm.openNpc(9900003, 107);
                break;
            case 3:
                cm.dispose();
                cm.openNpc(9220032);
                break;
            case 4:
                cm.dispose();
                cm.openNpc(9310057);
                break;
            case 5:
                cm.dispose();
                cm.openNpc(9900003, 101);
                break;
            case 6:
                cm.dispose();
                cm.openNpc(9900003, 102);
                break;
            case 7:
                cm.dispose();
                cm.openNpc(9900003, 700);
                break;
            case 8:
                cm.dispose();
                cm.openNpc(2060103);
                break;
            case 9:
                cm.dispose();
                cm.openNpc(9120050);
                break;
            case 10:
                cm.dispose();
                cm.openNpc(2101017,1);
                break;
            case 11://С����
                cm.dispose();
                cm.openNpc(9000159);
                //cm.warp(746000016, 0);
                break;
            case 12:
                cm.dispose();
                cm.openNpc(9020000);
                break;
			case 15:
				cm.dispose();
				cm.warp(925020000);
				break;
            case 14:
                cm.dispose();
                cm.warp(262030000, 0);
                break;
			case 16:
				cm.dispose();
				cm.openNpc(9300006,1);
				break;
			case 17:
				cm.dispose();
				cm.openNpc(9900003,113);
				break;
			case 21:
				cm.dispose();
				cm.openNpc(1540446);
				break;
			case 22:
				cm.dispose();
				cm.openNpc(9900005);
				break;
			case 24:
                		cm.dispose();
                		cm.openNpc(9040000);
               		        break;
			case 25://�������
                		cm.dispose();
                		cm.openNpc(9020000);
               		        break;
			case 26://���﹫԰
				cm.dispose();
				cm.warp(951000000);
				break;
			case 27://����BOSS
                		cm.dispose();
                		cm.openNpc(9310461);
               		        break;
            case 54:
                if (cm.getEventCount("��ʼ��") < 3) {
		cm.dispose();
		cm.openNpc(9330231);
		}else{
		cm.sendOk("������ʺ��Ѿ����[���]��ʼ��3�Ρ�");
		cm.dispose();
		}
                break;
            case 53:
                if (cm.getEventCount("����") < 20) {
		cm.dispose();
		cm.openNpc(9020000);
		}else{
		cm.sendOk("������ʺ��Ѿ����[���]����20�Ρ�");
		cm.dispose();
		}
                break;

            case 55:
			if (cm.getEventCount("��ף") < 3) {
                    	cm.dispose();
			cm.openNpc(2112003,1);
			}else{
		    	cm.sendOk("������ʺ��Ѿ����[���]��ף3�Ρ�");
		    	cm.dispose();
			}
                break;
            case 56:
			if (cm.getEventCount("����") < 3) {
                    	cm.dispose();
			cm.openNpc(2094000);
			}else{
		    	cm.sendOk("������ʺ��Ѿ����[���]��ռ������3�Ρ�");
		    	cm.dispose();
			}
                break;
            case 57:
			if (cm.getEventCount("����") < 1) {
                    	cm.dispose();
			cm.openNpc(9000093,6);
			}else{
		    	cm.sendOk("������ʺ��Ѿ����[���]�������Ժ��");
		    	cm.dispose();
			}
		break;


        }
    }
}