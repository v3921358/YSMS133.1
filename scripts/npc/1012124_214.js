/* ����̵� */

var status = -1;
var itemList = Array(
Array(1353205, 480000),//������������140������
Array(1099011, 480000),//����֮���
Array(1099012, 480000),//����֮��
Array(1342095, 480000),//����֮��
Array(1352009, 480000),//����֮��ʸ
Array(1352109, 480000),//����֮��Ƭ
Array(1352206, 480000),//����֮��׹
Array(1352216, 480000),//����֮����
Array(1352226, 480000),//����֮����
Array(1352236, 480000),//����֮��֮ͭ��
Array(1352246, 480000),//����֮����֮��
Array(1352256, 480000),//����֮�׽�֮��
Array(1352266, 480000),//����֮�籩��ë
Array(1352276, 480000),//����֮��ָ
Array(1352286, 480000),//����֮����
Array(1352296, 480000),//����֮���
Array(1352406, 480000),//����֮����
Array(1352506, 480000),//����֮����
Array(1352606, 480000),//����֮�������
Array(1352707, 480000),//����֮���ֵ�
Array(1352815, 480000),//����֮˽��
Array(1352906, 480000),//����֮����
Array(1352916, 480000),//����֮����
Array(1352928, 480000),//����֮��ҩͰ
Array(1352935, 480000),//����֮������
Array(1352945, 480000),//����֮������Ų�
Array(1352957, 480000),//����֮������
Array(1352967, 480000),//����֮��Ұ֮ì
Array(1352975, 480000),//����֮ʥ��֮��
Array(1353006, 480000),//����֮������
Array(1353105, 480000)//����֮������
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