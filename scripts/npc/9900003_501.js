/*
 �ű����� ���������ֶһ�
 */

var a = 0;
var score = 0;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            if (cm.MissionStatus(cm.getPlayer().getId(), 105, 0, 4) == false) {
                cm.MissionMake(cm.getPlayer().getId(), 105, 0, 0, 0, 999999)//��¼����������
            }
            cm.sendGetText("������һ���о���������" + cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) + "��\r\n���������1��1�һ������߱ң�����һ����������߱��أ�\r\n#e<���������ֿ����ڰ��ﰲ�ؾ��������>#n��");
        } else if (a == 1) {
            score = parseInt(cm.getText());
            if (cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) >= score) {
                if (cm.canHold(4310036, score)) {
                    cm.gainItem(4310036, score);
                    cm.MissionAddMinNum(cm.getPlayer().getId(), 105, -score);
                    cm.sendOk("�һ� " + score + "�������߱� �ɹ��ˣ�������ı�����")
                    cm.worldMessage("[���ﰲ�ؾ�����] "+cm.getChar().getName() + "  �ɹ��һ�����������߱ҡ�");
                } else {
                    cm.sendOk("�Բ������������㣬���ڳ�һЩ��λ��");
                }
            } else {
                cm.sendOk("�Բ�����û���㹻�ľ������������һ������߱ҡ�");
            }
            cm.dispose();
        }//a
    }//mode
}//f