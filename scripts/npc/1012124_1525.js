/* ����̳� - ȹ�� */

var status = -1;
var itemList = Array(
// -----�۸�Ϊ 10000 ��� --------
Array(1062204, 10000), //���Ƕ̿�
Array(1062203, 10000), //�����ܶ̿�
Array(1062210, 10000), //�������ж̿�
Array(1062211, 10000), //��ţ�̿�
Array(1062213, 10000), //��֯���޿�
Array(1062207, 10000), //��Ƥ�̿�
Array(1062093, 10000), //�������ж̿�
Array(1060180, 10000), //�����Ϲ϶̿�
Array(1061203, 10000), //�����Ϲ϶�ȹ
Array(1060001, 10000), //������-��
Array(1061161, 10000), //������-Ů
// -----�۸�Ϊ 8000 ��� --------
Array(1062173, 8000), //���Ƕ̿�
Array(1062157, 8000), //��ݮ�ɿ����̿�
Array(1062163, 8000), //����������
Array(1062156, 8000), //��ɫ�����˶̿�
Array(1062153, 8000), //����б�ƶ̿�
Array(1062126, 8000), //�����ƶ̿�
Array(1062113, 8000), //��Ǧ�̿�
Array(1062112, 8000), //�ڿ�
Array(1062109, 8000), //�ۻ������
Array(1062053, 8000), //�۱߰׶̿�
Array(1062025, 8000), //����װ��
Array(1062026, 8000), //���װ��
Array(1061206, 8000), //�߶����ȹ
Array(1060182, 8000), //�߶���̿�
Array(1061207, 8000), //�������ȹ
Array(1060181, 8000), //���������
Array(1060126, 8000), //����Ħ�ǿ���
Array(1062222, 8000), //�ۻ�С���߷ֿ�
Array(1062221, 8000), //�ۺ�С���߷ֿ�
Array(1062218, 8000), //��������С����
Array(1062219, 8000), //��������С����
Array(1062223, 8000), //��ɫ��������ȹ
Array(1062224, 8000), //��ɫ��������ȹ
// -----�۸�Ϊ 5000 ��� --------
Array(1062189, 5000), //��֮��̿�
Array(1061127, 5000), //��ҡ�����ȿ�
Array(1062186, 5000), //���̿�
Array(1062185, 5000), //��ɫ����
Array(1062182, 5000), //ε��ɫ�̿�
Array(1062183, 5000), //õ�챳����
Array(1062176, 5000), //�Ųʽ����
Array(1062174, 5000), //�����������
Array(1062172, 5000), //�űȸ��������
Array(1062152, 5000), //ӫ��۳���
Array(1062151, 5000), //����˿�ÿ�
Array(1062138, 5000), //����ɫ����ţ�п�
Array(1062135, 5000), //��Ӣ����
Array(1062131, 5000), //��ɫ���ţ�п�
Array(1062091, 5000), //�ڻҸ��Ӷ̿�
Array(1062089, 5000), //��ɫ�������ж̿�
Array(1062109, 5000), //�ۻ������
Array(1061139, 5000), //����ħ���̿�
Array(1060003, 5000), //���ö̿�
Array(1062066, 5000), //��ɫ�ƶ�ţ�п�
Array(1062035, 5000), //������Ƥ��
Array(1061106, 5000), //������Ƥȹ
Array(1062024, 5000), //Ұս����
Array(1062011, 5000), //��ɫ�����
Array(1062012, 5000), //��ɫ�����
Array(1062013, 5000), //��ɫ�����
Array(1062014, 5000), //����ɫ�����
Array(1062010, 5000), //������ѩ��
Array(1061209, 5000), //���Ƥȹ
Array(1061126, 5000), //��ɫ����ȹ
Array(1061103, 5000), //���ȹ
Array(1061068, 5000), //����ȹ
Array(1061007, 5000), //������ȹ
Array(1062080, 5000), //���������
Array(1062084, 5000) //ϸ��ţ�п�
);
var selectedItem = -1;
var selectedCost = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 2 + " #k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 2;
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + " #k ���");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "����̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("��û����ô����\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ���");
        }
        cm.dispose();
    }
}