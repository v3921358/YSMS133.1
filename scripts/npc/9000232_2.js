
var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
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
        var selStr = head+"����������һ�����ɶ����~\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
		selStr += "#L20#" + ttt6 + " #r#e[NEW]#n#b ��֮���� #r[ѩ���ҡ�����ħ��������]#l#n\r\n";
		selStr += "#L19#" + ttt6 + " #e[NEW]#n#b ������ս��#r[�����������]#l#n\r\n";
		selStr += "#L16#" + ttt6 + "#b �°�������� #r[��Ʒװ����������]#l#n\r\n";
		selStr += "#L17#" + ttt6 + "#b �����ҵĹ��� #r[ħ����������ǿ������]#l#n\r\n";
		selStr += "#L15#" + ttt6 + "#b ��֮��У #r[�����ҡ�����ħ��]#l#n\r\n";
		selStr += "#L14#" + ttt6 + "#b ���ɣ����﹫԰ #r[�������顢���ӱ�]#l#n\r\n";
		//selStr += "#L12#" + ttt6 + " #e[HOT]#n#b ���ִ������� #r[���������]#l#n\r\n";
		//selStr += "#L13#" + ttt6 + " #e[HOT]#n#b ��߳������� #r[���������]#l#n\r\n";
		selStr += "#L18#" + ttt6 + " #e[HOT]#n#b ��ս���͵� #r[����װ�������ӡ�������]#l#n\r\n";
		selStr += "#L11#" + ttt6 + " #e[HOT]#n#b �񻰸��� #r[��Ʒ����������ʱװ����]#l#n\r\n";
        selStr += "#L10#" + ttt6 + " #e[HOT]#n#b ���ﰲ�ؾ����� #r[����������]#l#n\r\n";
        selStr += "#b#L0#" + ttt6 + "#b ���ɶ�ɭ�ֱ���ս #r[�˶��ҡ�����]#l\r\n";
        selStr += "#L1#" + ttt6 + "#b ȫ��ɻ���ս #r[ħ����������ף��]#l\r\n";
        selStr += "#L2#" + ttt6 + "#b �����ڳ����ð�ռ�#l\r\n";
        selStr += "#L3#" + ttt6 + "#b ����������ͥԺ #r[����װ����ϡ������]#l\r\n";
        selStr += "#L4#" + ttt6 + "#b ��սӢ���Ĵ��������� #r[ϡ�����ӡ��������]#l\r\n";
        selStr += "#L5#" + ttt6 + "#b �ƽ���Ժ��ɮ��ŵ������Ը#l\r\n";
        selStr += "#L6#" + ttt6 + "#b �ؿ���������(С��ţ��) #r[����ħ��]#l\r\n";
        selStr += "#L7#" + ttt6 + "#b ��ɷ������� #r[���ӡ���Ʒװ��]#l\r\n";
        selStr += "#L8#" + ttt6 + " #e[HOT]#n#b ���޻�����ս #r[ϡ�е��ߡ�����ħ��]#l\r\n";
        selStr += "#L9#" + ttt6 + "#b ����ħ��ŷ���� #r[ħ����������ǿ������]#l\r\n";
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
				cm.warp(262030000);
				break;
			case 12: 
				cm.dispose();
				cm.warp(100000202, 0);
				cm.sendOk("�������ϣ�ȥ��ȡ������Ľ����ɣ�");
				break;
			case 13:
				cm.dispose();
				cm.warp(220000006, 0);
				cm.sendOk("�������ϣ�ȥ��ȡ������Ľ����ɣ�");
				break;
			case 14:
				cm.dispose();
				cm.warp(951000000);
				break;
			case 15:
				cm.dispose();
				cm.warp(744000000);
				break;
			case 16:
				cm.dispose();
				cm.warp(925020001);
				break;
			case 17:
				cm.dispose();
				cm.openNpc(9310114, 2);
				break;
			case 18:
				cm.dispose();
				cm.openNpc(9220059);
				break;
			case 19:
				cm.dispose();
				cm.openNpc(9300006,1);
				break;
			case 20:
				cm.dispose();
				cm.openNpc(9070010,1);
				break;
        }
    }
}