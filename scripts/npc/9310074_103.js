/* ����̵� */

var status = -1;
var itemList = Array(
/*Array(1003797, 100), //�߹�սʿͷ��
Array(1003798, 100), //�߹�����ά��ñ
Array(1003799, 100), //�߹���������ñ
Array(1003800, 100), //�߹�̿���ñ
Array(1003801, 100), //�߹�������ñ
Array(1042254, 100), //ӥ��սʿ����
Array(1042255, 100), //ӥ�۵�ά�泤��
Array(1042256, 100), //ӥ����������
Array(1042257, 100), //ӥ�۴̿ͳ���
Array(1042258, 100), //ӥ������������
Array(1062165, 100), //ħ��ʦսʿ�̿�
Array(1062166, 100), //ħ��ʦ��ά��̿�
Array(1062167, 100), //ħ��ʦ�����̿�
Array(1062168, 100), //ħ��ʦ�̿Ͷ̿�
Array(1062169, 100), //ħ��ʦ�����߶̿�*/

Array(1212063, 1), //������ħ��ԴȪ��
Array(1222058, 1), //��������ʹ���
Array(1232057, 1), //����������ʹ��
Array(1242060, 1), //�����ɾ���֮��
Array(1302275, 1), //����������֮��
Array(1312153, 1), //������˫�����⸫
Array(1322203, 1), //�����ɸ���ϴ�
Array(1332225, 1), //�����ɴ���ʿ�｣
Array(1342082, 1), //�����ɼ���֮��
Array(1362090, 1), //�����ɶ�������
Array(1372177, 1), //������ħ����ȡ��
Array(1382208, 1), //������ħ��֮��
Array(1402196, 1), //���������֮��
Array(1412135, 1), //������ս�����⸫
Array(1422140, 1), //���������紸
Array(1432167, 1), //�����ɹ���ǹ
Array(1442223, 1), //�����ɰ��¿��и�
Array(1452205, 1), //������׷����
Array(1462193, 1), //�����ɷ�����
Array(1472214, 1), //������Σ��֮��
Array(1482168, 1), //�����ɾ���֮צ
Array(1492179, 1), //����������ǹ
Array(1522094, 1), //������˫������
Array(1532098, 1), //��������ҫ��
Array(1252015, 1) //�����ɱ�����ħ����

/*Array(1113072, 30), //�ͼ����յ½�ָ
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
Array(1132174, 400), //�������Ǵ�˹����
Array(1102481, 400), //�������Ǵ�˹����
Array(1082543, 400), //�������Ǵ�˹����
Array(1072743, 400), //�������Ǵ�˹ѥ
Array(1132175, 400), //�����ն�÷˹����
Array(1102482, 400), //�����ն�÷˹����
Array(1072744, 400), //�����ն�÷˹����
Array(1082543, 400), //�����ն�÷˹ѥ
Array(1102483, 400), //������������
Array(1082545, 400), //������������
Array(1072745, 400), //��������ѥ
Array(1132176, 400), //������������
Array(1102484, 400), //��������������
Array(1082546, 400), //��������������
Array(1072746, 400), //����������ѥ
Array(1132177, 400), //��������������
Array(1102485, 400), //��������̩����
Array(1082547, 400), //��������̩����
Array(1072747, 400), //��������̩ѥ
Array(1132178, 400) //��������̩����*/
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����\r\n��ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k #b�Ǳ�#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#b���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�Ǳ� ?");//\r\n����Ҫ #r" + selectedCost*1000 + "#k #b���
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
        if (cm.getRMB() >= selectedCost ) {//&& cm.getPlayer().getCSPoints(1) >= selectedCost * 1000
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�Ǳ��̳�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#b��Ǹ,��û����ô��  �Ǳ�,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�Ǳ�\r\n");//#b����Ҫ#r" + selectedCost*1000 + "#k #b���
        }
        cm.dispose();
    }
}