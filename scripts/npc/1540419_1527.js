/* ����̳� - ���� */

var status = -1;
var itemList = Array(
// -----�۸�Ϊ 5000 ��� --------
Array(1082527, 5000),//�߶�������
Array(1082312, 5000),//�ʺ绤��
Array(1082620, 5000),//�ʻ��ֻ�
Array(1082588, 5000),//�Ų������ֻ�
Array(1082101, 5000), //ʥ������
Array(1082631, 5000), //�̹��ֻ�
Array(1082155, 5000), //ѩ��֮��
Array(1081002, 5000), //��������
Array(1081004, 5000), //ī����������
Array(1082157, 5000), //�׹�����
Array(1082124, 5000), //����ɽ����
Array(1080003, 5000), //���커��-�п�
Array(1080004, 5000), //��������-�п�
Array(1081009, 5000), //��������-�п�
Array(1081009, 5000), //���커��-Ů��
Array(1081010, 5000), //��������-Ů��
Array(1082156, 5000), //��������
Array(1082169, 5000), //��������
Array(1082172, 5000), //�������
Array(1082224, 5000), //��������
Array(1082225, 5000), //��������
Array(1082233, 5000), //ţţ������
Array(1082247, 5000), //�ɰ�С��������
Array(1082580, 5000), //��������
Array(1082267, 5000), //������èצ��
Array(1082407, 5000), //���ų�������
Array(1082408, 5000), //������������
Array(1082421, 5000), //��������
Array(1082422, 5000), //��������
Array(1082423, 5000), //����ս������
Array(1081006, 5000), //����ɯ������
Array(1082161, 5000), //��������
Array(1082548, 5000), //�ǹ�����
Array(1082572, 5000), //ţ��������
Array(1082312, 5000), //�ʺ绤��
Array(1082495, 5000), //è������������
Array(1082502, 5000), //���д�è��צ
Array(1082504, 5000), //è������
Array(1082519, 5000), //С�����ƶ�����
Array(1082511, 5000), //С�����̶�����
Array(1082520, 5000), //�۷���������
Array(1082548, 5000), //�ǹ�����
Array(1082549, 5000), //���������
Array(1082551, 5000), //�ɿ�������
Array(1082552, 5000), //�ƶ�������
Array(1082553, 5000), //��ɫʮ�ּ�����
Array(1082555, 5000), //������������
Array(1082618, 5000), //����צ
Array(1082517, 5000) //�߶���������
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  / 2 + " #k���#l";
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