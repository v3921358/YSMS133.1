/* �̳� */

var status = -1;
var itemList = Array(
Array(1542015, 100000), // ��������
Array(1212014, 100000), // ��β�ڼ�����140������
Array(1222014, 100000), // �����꼳ȡ��
Array(1232014, 100000), // ʨ��ʹ������
Array(1242014, 100000), // ���Ů����־֮��
Array(1302152, 100000), // ʨ���䵶
Array(1312065, 100000), // ʨ����ʿ��
Array(1322096, 100000), // ʨ�����׶�
Array(1332130, 100000), // ��ѻ֮��̵�
Array(1342036, 100000), // ����ǰ�Ӱ��
Array(1362019, 100000), // ��ѻ֮���������
Array(1372084, 100000), // ��β�������
Array(1382104, 100000), // ��βս������
Array(1402095, 100000), // ʨ��ս���䵶
Array(1412065, 100000), // ʨ��ս����
Array(1422066, 100000), // ʨ�ľ޴�
Array(1432086, 100000), // ʨ�ĳ�ǹ
Array(1442116, 100000), // ʨ��ì
Array(1462099, 100000), // ӥ������
Array(1472122, 100000), // ��ѻ֮�����ȭ��
Array(1452111, 100000), // ӥ����Ϲ�
Array(1482084, 100000), // ��ݾ�ӥצ
Array(1492085, 100000), // ����������
Array(1522018, 100000), // ��������ǹ
Array(1532018, 100000), // ��ݻ�����
Array(1252014, 100000), // èβ�ǻ�ħ���� 140����������
Array(1003172, 100000), // ʨ��ս��ͷ��140������
Array(1003173, 100000), // ��β��ʦñ��
Array(1003174, 100000), // ӥ���ڱ���ñ
Array(1003175, 100000), // ��ѻ֮��׷����ñ
Array(1003176, 100000), // ��ݴ���ñ
Array(1052314, 100000), // ʨ��ս�����Ӽ�
Array(1052315, 100000), // ��β��ʦ����
Array(1052316, 100000), // ӥ���ڱ���
Array(1052317, 100000), // ��ѻ֮��׷���߿���
Array(1052318, 100000), // ��ݴ�������
Array(1072485, 100000), // ʨ��ս��Ь
Array(1072486, 100000), // ��β��ʦЬ
Array(1072487, 100000), // ӥ���ڱ�Ь
Array(1072488, 100000), // ��ѻ֮��׷����Ь
Array(1072489, 100000), // ��ݴ���Ь
Array(1082295, 100000), // ʨ��ս������
Array(1082296, 100000), // ��β��ʦ����
Array(1082297, 100000), // ӥ���ڱ�����
Array(1082298, 100000), // ��ѻ֮��׷��������
Array(1082299, 100000), // ��ݴ�������
Array(1102275, 100000), // ʨ��ս������
Array(1102276, 100000), // ��β��ʦ����
Array(1102277, 100000), // ӥ���ڱ�����
Array(1102278, 100000), // ��ѻ֮����������
Array(1102279, 100000), // ��ݴ�������
Array(1152110, 100000), // ��β��ʦ����
Array(1152111, 100000), // ӥ���ڱ�����
Array(1152112, 100000), // ��ѻ֮�����˻���
Array(1152113, 100000), // ��ݴ�������
Array(1152108, 100000), // ʨ��ս������140�����߽���
Array(1542072, 1000000), // ��������
Array(1212089, 1000000), //  ����˫ͷ��        �ȼ�: 160����
Array(1222084, 1000000), // ����������
Array(1232084, 1000000), // ���ж�ħ��
Array(1242090, 1000000), // ����������
Array(1302297, 1000000), // ���н�
Array(1312173, 1000000), // ���и�
Array(1322223, 1000000), // ���д�
Array(1332247, 1000000), // ����ذ��
Array(1342090, 1000000), // ���е�
Array(1362109, 1000000), // ��������
Array(1372195, 1000000), // ���ж���
Array(1382231, 1000000), // ���г���
Array(1402220, 1000000), // ����˫�ֽ� 
Array(1412152, 1000000), // ����˫��ս��
Array(1422158, 1000000), // ���о޴�
Array(1432187, 1000000), // ����ì
Array(1442242, 1000000), // �����
Array(1452226, 1000000), // ���й�
Array(1462213, 1000000), // ������
Array(1472235, 1000000), // ����ȭ��
Array(1482189, 1000000), // ���г�ȭ
Array(1492199, 1000000), // �������
Array(1522113, 1000000), // ����˫������
Array(1532118, 1000000), // ��������
Array(1252033, 1000000), // ħ����  150������ ����
Array(1012438, 1000000), // ��������            �ȼ�: 160������
Array(1022211, 1000000), // �����۾�
Array(1032224, 1000000), // ���ж��� 
Array(1122269, 1000000), // ���е�׹
Array(1132247, 1000000), // ��������
Array(1152160, 1000000), // ���л���
Array(1102623, 1000000), // �������� 
Array(1072870, 1000000), // ����Ь
Array(1082556, 1000000), // ��������
Array(1003976, 1000000), // ����ñ��
Array(1052669, 1000000) // ���лʼ�����
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":#   ������Ҫ  #r" + itemList[i][1] + " #k���þ�#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + " #k ���þ���");
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
        if (cm.getPlayer().getCSPoints(2) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "���þ��̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX(2, - selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("��û����ô����þ���\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k ���þ���");
        }
        cm.dispose();
    }
}