/* ���һ� */

var status = -1;
var selectedpay = 0;
var acash = 2000;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";

function start() {
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
        if (mode == 1) {
            status++;
        } else {
            if (status == 2) {
                cm.sendNext(head + "�������Ҫ��Ԫ���һ��ɵ��Ļ�����ô���´������ң�");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
			var selStr = ""+ head + "�װ���#b#h ##k���ã�����" + cm.getServerName() + "��ҵ���ֵ�һ�Ա.\r\n\r\n- #e#d����������ϢΪ:#n#k\r\n\r\n";
			selStr += "#b��ǰԪ��:#r " + cm.getHyPay(1) + "#k #b������Ԫ��:#r " + cm.getHyPay(2) + " #k #b�ۼƳ�ֵԪ��:#r " + cm.getHyPay(3) + " #k\r\n\r\n";
			selStr += "#b#L0#" + icon + "Ԫ��������(1:2000)\r\n";
			selStr += "#L1#" + icon + "��ȡ��������#l\r\n";
			selStr += "#L2#" + icon+ "����Ҷһ�Ԫ��#l\r\n";
			selStr += "#L3#" + icon+ "�򿪱�����ֵ����\r\n";
            cm.sendSimple(selStr);
        } else if (status == 1) {
			if(selection == 1) {
				cm.dispose();
				cm.openNpc(9310382, 8);
				return;
			} else if (selection == 2) 
			{
				cm.dispose();
				cm.openNpc(9201357, 2);
				return;
			} else if (selection == 3) 
			{
				cm.dispose();
				cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
				return;
			}

            if (cm.getHyPay(1) == 0) {
                cm.sendNext(head + "��û�п�ʹ�õ�Ԫ����");
                cm.dispose();
            } else {
                cm.sendGetNumber(head + "��������Ҫ�����Ԫ��:\r\n��Ϸ���Ĺ������Ϊ 1 : 2000\r\n", 1, 1, cm.getHyPay(1));
            }
        } else if (status == 2) {
            selectedpay = selection;
            if (cm.getHyPay(1) < selectedpay) {
                cm.sendNext(head + "��Ԫ��������");
                cm.dispose();
            } else {
                cm.sendYesNo(head + "���Ƿ�Ҫʹ��#r " + selectedpay + " #kԪ������#b " + selectedpay * acash + " #k�ĵ��");
            }
        } else if (status == 3) {
            if (cm.getHyPay(1) < selectedpay) {
                cm.sendNext(head + "��Ԫ��������");
            } else if (cm.addHyPay(selectedpay) > 0) {
                cm.gainNX(selectedpay * acash);
                cm.sendOk(head + "��ϲ���ɹ�����#b " + selectedpay * acash + " #k�ĵ�����ι�������Ԫ��#r " + selectedpay + " #k����Ŀǰ��Ԫ�����Ϊ:#r " + cm.getHyPay(1) + " #k��");
            } else {
                cm.sendOk(head + "��������ִ����뷴��������Ա��");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}