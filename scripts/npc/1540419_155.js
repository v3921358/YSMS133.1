/* ����̵� */

var status = -1;
var itemList = Array(
/*Array(5689000, 10000),// �߼�����ˮ
Array(5000084, 500000),//�����ް�����
Array(5000089, 500000),//�����޵ϰ���
Array(5000090, 500000),//�����޼���
Array(5000103, 2000000), //�����Ʒ����
Array(5000112, 2000000), //������׶�
Array(5000113, 2000000),//����������
Array(5000203, 200000), //������
Array(5000212, 650000), //���С��ħ
Array(5000213, 650000), //����С��ħ
Array(5000214, 650000), // �׻�С��ħ
Array(5000228, 1200000), //ħ��ħ��֮��
Array(5000229, 1200000), //ħ��Ĭ˹
Array(5000230, 1200000), //ħ�����
Array(5000239, 900000), //����������
Array(5000243, 900000), //�ۺ���
Array(5000244, 900000), //����
Array(5000245, 900000), // ��ɫ��
Array(5000249, 900000), //��С��
Array(5000250, 900000), // ��С��
Array(5000251, 900000), //��С��
Array(5000256, 900000), //�ϹϽܿ�
Array(5000257, 900000), //�Ϲϰ¿�
Array(5000258, 900000), //�Ϲ�����
Array(5000271, 900000), //��ɫ����
Array(5000272, 900000), //��ɫ����
Array(5000273, 900000), //��ɫ����
Array(5000275, 900000),//������
Array(5000276, 900000), //��������
Array(5000277, 900000), //����۷�
Array(5000281, 1500000), //New��ͼ˹
Array(5000282, 1500000), //NewĦ˹
Array(5000283, 1500000), //New����
Array(5000320, 1600000), //������
Array(5000321, 1600000), //�������
Array(5000322, 1600000), //����ţ��
Array(5000342, 1250000), //С������ͷ
Array(5000343, 1250000), //С������ͷ
Array(5000344, 1250000), //С������ͷ
Array(5000137, 2000000), //�����С����
Array(5000268, 300000), //���ĺ���
Array(5000274, 4000000), //������
Array(5000290, 1400000),//��ʹ���
Array(5000291, 1400000), //��ʹ����
Array(5000292, 1400000), //��ʹ�׶�
Array(5001006, 1400000), //���� - #c���ԣ����
Array(5001007, 1400000),//���� - #c���ԣ����
Array(5001008, 1400000), //���� - #c���ԣ�������ϣ�
Array(5001009, 2500000), //�������� - #c���ԣ��������
Array(5001010, 2500000), //�������� - #c���ԣ��������
Array(5001011, 2500000), //�������� - #c���ԣ��������
Array(5000191, 4000000), //����*/
Array(1402014, 200000), 
Array(1302021, 60000), 
Array(1362063, 80000), 
Array(1302219, 80000), 
Array(1322156, 80000), 
Array(1302026, 50000), 
Array(1302150,90000), 
Array(1112100,100000), 
Array(1302104, 50000),
Array(1322102, 80000),
Array(1302160, 50000),
Array(1302161, 100000),
Array(1302162, 70000),
Array(1332030, 70000),
Array(1412056, 100000),
Array(1422036, 70000),
Array(1402110, 100000),
Array(1402049, 80000)
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 5 + "#k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 5;
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ���");
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