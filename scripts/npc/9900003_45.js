/* �����̳� - ���ܺ�װ�� */

var status = -1;
var itemList = Array(
// ----����ID -�۸��� --------
Array(5380000, 10000),//����֮ʯ
Array(5190011, 3000),//�����Զ�ιʳ
Array(5190010, 3000),//�����Զ���BUFF����
Array(5190001, 2000),//�Զ�����HPҩˮ����
Array(5190006, 3000),//�Զ�����MPҩˮ����
Array(5180000, 2000),//����ˮ
Array(1802510, 10000),//˹�ڵĹ�â֮��
Array(1802378, 10000),//�������ӾȦ
Array(1802467, 10000),//���յµı�ʯ
Array(1802436, 10000),//���������
Array(1802422, 10000),//���Ĺ���
Array(1802446, 10000),//Ƥ��������ɡ
Array(1802520, 10000),//��Ĩ����ı���Ҷ
Array(1802521, 10000),//����õĲ���
Array(1802522, 10000),//���ȵܵ�������
Array(1802428, 10000),//����³��Ӥ��ͷ��
Array(1802429, 10000),//����³��Ӥ��ͷ��
Array(1802427, 10000),//����³��Ӥ��ͷ��
Array(1802424, 10000),//�������ʹ�⻷
Array(1802425, 10000),//��������ʹ�⻷
Array(1802426, 10000),//�׶�����ʹ�⻷
Array(1802461, 10000),//ϣ����С��ħ
Array(1802459, 10000),//���װ��İ�Ǿޱ
Array(1802511, 10000),//�¶�����ƿ
Array(1802464, 10000),//��ͷ��Ҷ��
Array(1802465, 10000),//��ͷ��Ҷ��
Array(1802466, 10000)//��ͷ��Ҷ��



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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + " #k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
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
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "���＼��װ���̵�", 3, true);
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