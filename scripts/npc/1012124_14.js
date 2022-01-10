var status = -1;
var selectedType = 0;
var selectedMeso = 0;
var moneyMeso = 100000000;

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
                cm.sendNext("�������Ҫ������ȡ��Ļ������ң���ô���´������ң�");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ������Ҫ��������Ŀ:\r\n\r\n��Ŀǰ������#r " + cm.getMeso() + " #k���\r\n���д��Ϊ#r " + cm.getMoney() + " #k�ڽ��\r\n#b#L0#��Ҫ���#l\r\n#L1#��Ҫȡ��#l");
        } else if (status == 1) {
            selectedType = selection;
            if (selectedType == 0) {
                cm.sendGetNumber("��������Ҫ���Ľ��(��λ: �� ):\r\n", 1, 1, 23);
            } else if (selectedType == 1) {
                cm.sendGetNumber("��������Ҫȡ��Ľ��(��λ: �� ):\r\n", 1, 1, 5);
            }
        } else if (status == 2) {
            selectedMeso = selection;
            if (selectedType == 0) {
                cm.sendYesNo("���Ƿ�Ҫ����#r " + selectedMeso + " #k�ڽ�ҡ�");
            } else if (selectedType == 1) {
                cm.sendYesNo("���Ƿ�Ҫȡ��#r " + selectedMeso + " #k�ڽ�ҡ�");
            }
        } else if (status == 3) {
            if (selectedType == 0) {
                if (cm.getMeso() < selectedMeso * moneyMeso) {
                    cm.sendNext("���Ľ�Ҳ�����");
                } else if (cm.addMoney(selectedMeso, 0) > 0) {
                    cm.gainMeso( - selectedMeso * moneyMeso);
                    cm.sendOk("�õģ��Ѿ����룡");
                } else {
                    cm.sendOk("�����ִ����뷴��������Ա��");
                }
                cm.dispose();
            } else if (selectedType == 1) {
                if (cm.getMoney() < selectedMeso) {
                    cm.sendNext("��û�д���ô��Ǯ��");
                } else if (cm.getMeso() > 1500000000) {
                    cm.sendNext("�����ϵĽ�ҳ����� 15 �ڣ���ȡʧ�ܡ��뽫��Ҵ���ֿ����������ȡ�ɣ�");
                } else if (cm.addMoney( - selectedMeso, 1) > 0) {
                    cm.gainMeso(selectedMeso * moneyMeso);
                    cm.sendOk("�õģ����պ�����Ǯ��");
                } else {
                    cm.sendOk("ȡ����ִ����뷴��������Ա��");
                }
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    }
}