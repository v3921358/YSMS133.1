/* �ֽ������̵� */

var status = -1;
var itemList = Array(
Array(3015303, 200000), //�Ҹ��Ļ�Ь����
Array(3015183, 200000), //��ˮ�鱳������
Array(3015331, 200000), //��������Ԣ
Array(3015247, 200000), //ս����!��˵֮�ع�����
Array(3015257, 300000), //����ͥԺ����
Array(3015059, 300000), //���������ɿ�������
Array(3012028, 300000), //�ȳ�����豭����
Array(3015096, 300000), //���������������
Array(3015296, 300000),//��Ů����԰
Array(3015295, 300000),//��ʿ����԰
Array(3015225, 500000), //�ʹ���һ����������
Array(3015227, 500000), //��Ī��Ұ������
Array(3015312, 500000), //ũ�����԰����
Array(3016000, 500000), //�������ΰ�����
Array(3015181, 500000), //����ҹ֮������
Array(3015343, 500000), //��ѩ���������
Array(3015224, 500000), //�λ�ˮ��������
Array(3015419, 500000),//��̲��������
Array(3015406, 500000),//��ҵ�ʥ����
Array(3015328, 800000), //ð�յ��綯�³�����
Array(3015193, 800000), //��ѱ���ľ�������
Array(3015349, 800000), //����ҡҡ������
Array(3015259, 800000),//�ö�үү������
Array(3015260, 800000),//�ö����̵�����
Array(3016101, 1000000), //����ˮ������ǧ��
Array(3015338, 1000000), //���ܻ�԰����
Array(3015304, 1200000) //��������ˮ��



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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k #b �Ǳ�#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("#b���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�Ǳ� ?");
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
        //if (cm.getRMB() >= selectedCost && cm.getPlayer().getCSPoints(1) >= selectedCost * 1000) {
	if (cm.getRMB() >= selectedCost && cm.getPlayer().getCSPoints(1) >= 1000) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "�Ǳ��̳�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            //cm.sendOk("#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�Ǳ�\r\n#b����Ҫ#r" + selectedCost*1000 + "#k #b���");
            //cm.sendOk("#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ #r" + selectedCost + "#k #b�Ǳһ�����������û��1000���\r\n");
             cm.sendOk("#b��Ǹ,��û����ô��  �Ǳ�,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ  #r" + selectedCost + "#k #b  �Ǳҡ�");

       }
        cm.dispose();
    }
}