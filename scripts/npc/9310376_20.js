/* ����̵� */

var status = -1;
var itemList = Array(
Array(1003797, 150), //�߹�սʿͷ��
Array(1003798, 150), //�߹�����ά��ñ
Array(1003799, 150), //�߹���������ñ
Array(1003800, 150), //�߹�̿���ñ
Array(1003801, 150), //�߹�������ñ
Array(1042254, 150), //ӥ��սʿ����
Array(1042255, 150), //ӥ�۵�ά�泤��
Array(1042256, 150), //ӥ����������
Array(1042257, 150), //ӥ�۴̿ͳ���
Array(1042258, 150), //ӥ������������
Array(1062165, 150), //ħ��ʦսʿ�̿�
Array(1062166, 150), //ħ��ʦ��ά��̿�
Array(1062167, 150), //ħ��ʦ�����̿�
Array(1062168, 150), //ħ��ʦ�̿Ͷ̿�
Array(1062169, 150), //ħ��ʦ�����߶̿�
/*
Array(1212063, 200), //������ħ��ԴȪ��
Array(1222058, 200), //��������ʹ���
Array(1232057, 200), //����������ʹ��
Array(1242060, 200), //�����ɾ���֮��
Array(1302275, 200), //����������֮��
Array(1312153, 200), //������˫�����⸫
Array(1322203, 200), //�����ɸ���ϴ�
Array(1332225, 200), //�����ɴ���ʿ�｣
Array(1342082, 200), //�����ɼ���֮��
Array(1362090, 200), //�����ɶ�������
Array(1372177, 200), //������ħ����ȡ��
Array(1382208, 200), //������ħ��֮��
Array(1402196, 200), //���������֮��
Array(1412135, 200), //������ս�����⸫
Array(1422140, 200), //���������紸
Array(1432167, 200), //�����ɹ���ǹ
Array(1442223, 200), //�����ɰ��¿��и�
Array(1452205, 200), //������׷����
Array(1462193, 200), //�����ɷ�����
Array(1472214, 200), //������Σ��֮��
Array(1482168, 200), //�����ɾ���֮צ
Array(1492179, 200), //����������ǹ
Array(1522094, 200), //������˫������
Array(1532098, 200), //��������ҫ��
Array(1252015, 200), //�����ɱ�����ħ����

Array(1113072, 30), //�ͼ����յ½�ָ
Array(1113073, 60), //�м����յ½�ָ
Array(1113074, 100), //�߼����յ½�ָ
Array(1113075, 150), //��߼����յ½�ָ
Array(1132243, 30), //�ͼ����յ¿�ӡ����
Array(1132244, 60), //�м����յ¿�ӡ����
Array(1132245, 100), //�߼����յ¿�ӡ����
Array(1132246, 150), //��߼����յ¿�ӡ����
Array(1122264, 30), //�ͼ����յ¿�ӡ��׹
Array(1122265, 60), //�м����յ¿�ӡ��׹
Array(1122266, 100), //�߼����յ¿�ӡ��׹
Array(1122267, 150), //��߼����յ¿�ӡ��׹
Array(1032220, 30), //�ͼ����յ¶���
Array(1032221, 60), //�м����յ¶���
Array(1032222, 100), //�߼����յ¶���
Array(1032223, 150), //��߼����յ¶���
*/
Array(1132174, 398), //�������Ǵ�˹����
Array(1102481, 398), //�������Ǵ�˹����
Array(1082543, 398), //�������Ǵ�˹����
Array(1072743, 398), //�������Ǵ�˹ѥ
Array(1132175, 398), //�����ն�÷˹����
Array(1102482, 398), //�����ն�÷˹����
Array(1072744, 398), //�����ն�÷˹����
Array(1082544, 398), //�����ն�÷˹ѥ
Array(1102483, 398), //������������
Array(1082545, 398), //������������
Array(1072745, 398), //��������ѥ
Array(1132176, 398), //������������
Array(1102484, 398), //��������������
Array(1082546, 398), //��������������
Array(1072746, 398), //����������ѥ
Array(1132177, 398), //��������������
Array(1102485, 398), //��������̩����
Array(1082547, 398), //��������̩����
Array(1072747, 398), //��������̩ѥ
Array(1132178, 398) //��������̩����
//
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k #b�ֽ��#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#b���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�ֽ�� ?");//\r\n����Ҫ #r" + selectedCost*1000 + "#k #b���
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
        if (cm.getRMB() >= selectedCost && cm.getPlayer().getCSPoints(1) >= 0 ) {//selectedCost * 1000
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�߼�װ���̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�ֽ��");//\r\n#b����Ҫ#r" + selectedCost*1000 + "#k #b���
        }
        cm.dispose();
    }
}