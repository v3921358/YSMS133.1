/* ȫְҵ�����̵� */

var status = -1;
var itemList = Array(
Array(1552115, 50000),
Array(1352808, 50000),
Array(1092049, 150000), 
Array(1352503, 50000),
Array(1352203, 50000), 
Array(1352213, 50000), 
Array(1352223, 50000), 
Array(1352233, 50000), 
Array(1352243, 50000), 
Array(1352253, 50000), 
Array(1352263, 50000), 
Array(1352273, 50000), 
Array(1352283, 50000), 
Array(1352293, 50000), 
Array(1352903, 50000), 
Array(1352913, 50000), 
Array(1352923, 50000), 
Array(1352953, 50000), 
Array(1352963, 50000), 
Array(1353004, 50000), 
Array(1352973, 50000), 
Array(1352943, 50000), 
Array(1352933, 50000), 
Array(1352703, 50000),

Array(1099011, 100000),//����֮���
Array(1099012, 100000),//����֮��
Array(1342095, 100000),//����֮��
Array(1352009, 100000),//����֮��ʸ
Array(1352109, 100000),//����֮��Ƭ
Array(1352206, 100000),//����֮��׹
Array(1352216, 100000),//����֮����
Array(1352226, 100000),//����֮����
Array(1352236, 100000),//����֮��֮ͭ��
Array(1352246, 100000),//����֮����֮��
Array(1352256, 100000),//����֮�׽�֮��
Array(1352266, 100000),//����֮�籩��ë
Array(1352276, 100000),//����֮��ָ
Array(1352286, 100000),//����֮����
Array(1352296, 100000),//����֮���
Array(1352406, 100000),//����֮����
Array(1352506, 100000),//����֮����
Array(1352606, 100000),//����֮�������
Array(1352707, 100000),//����֮���ֵ�
Array(1352815, 100000),//����֮˽��
Array(1352906, 100000),//����֮����
Array(1352916, 100000),//����֮����
Array(1352928, 100000),//����֮��ҩͰ
Array(1352935, 100000),//����֮������
Array(1352945, 100000),//����֮������Ų�
Array(1352957, 100000),//����֮������
Array(1352967, 100000),//����֮��Ұ֮ì
Array(1352975, 100000),//����֮ʥ��֮��
Array(1353006, 100000),//����֮������
Array(1353105, 100000)//����֮������


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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
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
                cm.gainNX( - selectedCost );
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