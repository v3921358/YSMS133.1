/* ����̳� - ���� */

var status = -1;
var itemList = Array(
// -----�۸�Ϊ 8000 ��� --------
Array(1032038, 8000), //ѩ������
Array(1032233, 8000), //��ɫ���Ķ���
Array(1022085, 8000), //˯������(��ɫ)
Array(1022044, 8000), //ģ�����۾�
Array(1022084, 8000), //��Ц����
Array(1022075, 8000), //�ǹ��۾�
Array(1022122, 8000), //DJ�۾�
Array(1022229, 8000), //VIPī��
Array(1022095, 8000), //��Ǯ�ۿ�
Array(1012462, 8000), //��ʬ�����������ͫ
Array(1012511, 8000), //��ɨ����
Array(1012461, 8000), //�ഺ������
Array(1012131, 8000), //�ð׵���
Array(1012007, 8000), //�׺���
Array(1012008, 8000), //������
Array(1012023, 8000), //����3
Array(1012022, 8000), //����2
Array(1012021, 8000), //����1
Array(1012024, 8000), //���ź���
Array(1012026, 8000), //�ع�����
Array(1012029, 8000), //�ڰ�С��
Array(1012051, 8000), //��ɫС�����
Array(1012053, 8000), //��ŭ
Array(1012054, 8000), //����
Array(1012096, 8000), //ƻ��ζ������
Array(1012099, 8000), //��ɫ����
Array(1012137, 8000), //��֮ӡ
Array(1012165, 8000), //С�����
Array(1012179, 8000), //¹����
Array(1012208, 8000), //������
Array(1012366, 8000), //��ʬ��������
Array(1012253, 8000), //��������
Array(1012412, 8000), //����֮��
Array(1012413, 8000), //˫����
Array(1012427, 8000), //΢Ц�ı���
Array(1012428, 8000), //���ʵı���
Array(1012428, 8000), //���ȵı���
Array(1012429, 8000), //���ȵı���
Array(1012430, 8000), //�ɰ��ı���
Array(1012431, 8000), //Ʋ��ı���
Array(1012432, 8000), //�����ı���
Array(1012433, 8000), //��ŭ�ı���
Array(1012434, 8000), //�����ı���
Array(1012435, 8000), //�ƻ��ı���
Array(1012436, 8000), //��Ц�ı���
// -----�۸�Ϊ 8000 ��� --------
Array(5010021, 8000), //�׹�Ч��
Array(5010025, 8000), //�ֲ�������
Array(5010051, 8000), //�޺�ʥ����
Array(5010054, 8000), //ʥ��������
Array(5010102, 8000), //�˲���
Array(5010103, 8000), //�����
Array(5010104, 8000), //�����
Array(5010009, 8000), //������Ч��
Array(5010015, 8000), //777Ч��
Array(5010028, 8000), //��������
Array(5010029, 8000), //���涷��
Array(5010030, 8000), //�׵綷��
Array(5010038, 8000), //�ٲ�
Array(5010043, 8000), //�۹�
Array(5010044, 8000), //��Ӱ����
Array(5010075, 8000), //�׶�ʱ��
Array(5010076, 8000), //��������
Array(5010111, 8000), //ȥ���п�Ļ��
Array(5010008, 8000) //���˶�Ч��
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 2  + " #k���#l";
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