/* ���һ� */

var status = -1;
var selectedpay = 0;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQrmal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�

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
                cm.sendNext(head + "�������Ҫ���ǱҶһ��ɵ��Ļ�����ô���´������ң�");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("\r\n�װ���#b#h ##k���ã�����" + cm.getServerName() + "��ҵ���ֵ�һ�Ա.\r\n  ����������ϢΪ:\r\n  " + tz1 + "��ǰ�Ǳ�:#r " + cm.getRMB() + " #k��\t  " + tz1 + "��ǰ��ȯ��#r" + cm.getNX(1) + " #k\r\n#b    ��ܰ��ʾ����������Ϊ1�����=10000�Ǳ�\r\n\r\n#b#L0#" + tz1 + "#b�ǱҶһ����#r     (3�Ǳ�=1���)\r\n\r\n#b#L3#" + tz1 + "#b����Ҷһ����#r   (1�����=900���)\r\n\r\n#b#L5#" + tz1 + "#b���һ������#r   (1000���=1�����)\r\n");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getRMB() == 0) {//�ǱҶһ����
                    cm.sendNext(head + "��û�пɶһ����Ǳҡ�");
                    cm.dispose();
                } else {
                    cm.sendGetNumber(head + "��������Ҫ�һ��ĵ�ȯ:\r\n��Ϸ���Ķһ�����Ϊ 1��ȯ : 3�Ǳ�\r\n", 1, 1, 10000);
                }
            } else if (selection == 1) {
                cm.dispose();
                cm.openNpc(9310144, 8);
                return;
            } else if (selection == 2) {
                cm.dispose();
                cm.openNpc(1540419, 100);
                return;
            } else if (selection == 9) {
                cm.dispose();
                cm.openNpc(1540419);
                return;
            } else if (selection == 4) {//Ԫ���һ��ֽ�
                cm.dispose();
                cm.openNpc(1540419, 91);
                return;
            } else if (selection == 5) {//���һ������
                cm.dispose();
                cm.openNpc(1012124, 89);
                return;
            } else if (selection == 3) {//����Ҷһ����
                cm.dispose();
                cm.openNpc(1012124, 90);
                return;

            }
        } else if (status == 2) {
            selectedpay = selection;
            if (cm.getRMB() < selectedpay * 3) {
                cm.sendNext(head + "���ǱҲ�����");
                cm.dispose();
            } else {
                cm.sendYesNo(head + "���Ƿ�Ҫ��#r " + (selectedpay * 3) + " #k�ǱҶһ���#b " + selectedpay + " #k�ĵ��");
            }
        } else if (status == 3) {
            if (cm.getRMB() >= selectedpay * 3) {
                cm.gainRMB(-selectedpay * 3);
                cm.gainNX(selectedpay);
                cm.sendOk("�һ��ɹ�");

            } else {
                cm.sendOk(head + "�һ������ִ����뷴��������Ա��");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}
