
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
        var selStr = "\r\n#e#d���ã�����������ɫ����ϵ��,�������ڴ����..#n#l#k\r\n\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        //selStr += "#L10#" + ttt6 + " #r11.#e#b ���ﰲ�ؾ�����(New~)#l#n\r\n";
		selStr += "\t\t#r" + tz + " �Ƽ����������ֱ��� " + tz + "\r\n";
		selStr += "#L11#" + tz1 + " #b����С�ձ�  ==#g���߾��飬��������Դ��#l\r\n";
		selStr += "#L16#" + tz1 + " #b#b������ս  ==#g [�������]#l\r\n";
		//selStr += "#L3#" + tz1 + " #b���ͥԺ  ==#g��������ң�#l\r\n";
        	selStr += "#L9#" + tz1 + " #bӵ�������  ==#g (������ħ������)#l\r\n";
		//selStr += "#L22#" + tz1 + " #b��������  ==#g (����ʯ����,���þ�)#l\r\n";

		selStr += "\r\n\t\t#r" + tz + " ��ɫ������������� " + tz + "\r\n";

		//selStr += "#L24#" + tz1 + " #b��������  ==#g��������#l\r\n";
		selStr += "#L14#" + tz1 + " #b����ϣ��֮��  ==#g���񻰶�����140װ����\r\n";
		selStr += "#L0#" + tz1 + " #bɭ��BOSSս  ==#g���˶���ң����ᣬ���ӣ�160������#l\r\n";
		selStr += "#L15#" + tz1 + " #b�����µ���  == #g(����뾭��)#l\r\n";
		selStr += "#L17#" + tz1 + " #bǿ��ɭ����  ==#g������Ҷһ����ߣ�\r\n";
        	selStr += "#L5#" + tz1 + " #b�ƽ���Ժ  ==#g(140����)#l\r\n";
		//selStr += "#L8#" + tz1 + " #b���޻�����ս==#g��ÿ10�ؽ����߼�ħ����#l\r\n";
        	selStr += "#L6#" + tz1 + " #b��������  ==#g (С��ţ����ħ��)#l\r\n";
		selStr += "#L1#" + tz1 + " #b�ɻ���ս  ==#g��װ����ħ�������ᣩ#l\r\n";
        	selStr += "#L7#" + tz1 + " #b�������  ==#g (���ӣ�װ������)#l\r\n";

		selStr += "\r\n\t#r" + tz + " �߼���������Ҫ200W���#b(��δ����) " + tz + "\r\n\r\n";


		//selStr += "#L21#" + tz1 + " #b��ǿ˹����Ӹ��� #g(160����˹#k#l\r\n\r\n";//#i1402251:#



		//selStr += "#e#r�߼�����#n#k  �Ƽ���壺50������\r\n";


		//selStr += "#L18#" + ttt6 + " #g[��]#n#r ��ս���͵� #g #i2431938:##k#i2430051:##k#l\r\n\r\n";
		//selStr += "#L4#" + ttt6 + " #b ��սӢ���Ĵ��������ɣ���ϡ�е��ߣ�#l\r\n";
		//selStr += "#L12#" + ttt6 + " #b ����������Ӹ����������齱�����������ߣ�#l\r\n";
		//selStr += "#L13#" + ttt6 + " #b ɨ���ػ�����Ӹ����������߼�ħ����#l\r\n";
		//selStr += "#L2#" + tz1 + " #b �����ڳ����ð�ռң�����1000���#l\r\n";


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
            case 11:
                cm.dispose();
                cm.warp(746000016, 0);
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
            case 13:
                if (cm.getEventCount("����") < 1) {
		cm.dispose();
		cm.openNpc(9330231);
		}else{
		cm.sendOk("������ʺ��Ѿ����[���]ɨ���ػ��ꡣ");
		cm.dispose();
		}
                break;


        }
    }
}