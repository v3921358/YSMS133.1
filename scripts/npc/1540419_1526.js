/* ����̳� - ���� */

var status = -1;
var itemList = Array(
// -----�۸�Ϊ 10000 ��� --------

Array(1042319, 10000), //��ƤT��
Array(1042329, 10000), //�ǹ�ɫT��
Array(1042321, 10000), //�Ļ�ŭ��T��
Array(1042320, 10000), //��Ÿӡ��T��
Array(1042316, 10000), //��ɫ������T��
Array(1042315, 10000), //��ɫ������T��
Array(1042314, 10000), //������T��
Array(1042313, 10000), //ĢĢ��T�������ʻƣ�
Array(1042312, 10000), //ĢĢ��T������ѩ����
Array(1042311, 10000), //����T��
Array(1042330, 10000), //¶��babyװ
Array(1042336, 10000), //΢Ц������
Array(1042337, 10000), //�ܺ�������(��)
Array(1042338, 10000), //�ܺ�������(��)
Array(1042142, 10000), //�ʺ�������
Array(1042143, 10000), //���Χ������
Array(1040001, 10000), //����װ
Array(1041194, 10000), //��ɫ����T��
Array(1040192, 10000), //��ɫ����T��
// -----�۸�Ϊ 8000 ��� --------
Array(1040195, 8000),//�������ӱ���
Array(1041197, 8000),//�ۺ����T��
Array(1041196, 8000),//���ܵ�����
Array(1040194, 8000),//���ܱ���
Array(1042172, 8000),//�߶�������
Array(1042264, 8000),//�����߶�����
Array(1042236, 8000),//ƻ����ë��
Array(1042340, 8000), //������Χ��С����
Array(1042339, 8000), //������Χ��С����
Array(1042334, 8000), //��������������
Array(1042333, 8000), //��������������
Array(1042332, 8000), //ҡ����������
Array(1042292, 8000), //�㽶��ë����
Array(1042290, 8000), //��ɫӣ����֯��
Array(1042285, 8000), //ƴɫ���T��
Array(1042278, 8000), //��������
Array(1042275, 8000), //��������
Array(1042271, 8000), //������ƴɫT��
Array(1042267, 8000), //������ñ��
Array(1042265, 8000), //��ݮΧ��С����
Array(1042263, 8000), //�������мп�
Array(1042260, 8000), //����ǹ���ë��
Array(1042252, 8000), //�߶�������T��
Array(1042251, 8000), //������������
Array(1042242, 8000), //����ˮ������
Array(1042241, 8000), //����������
Array(1042262, 8000), //ϼ�����T��
Array(1042239, 8000), //��ɫ�����
Array(1042270, 8000), //�ۺ���ë��
Array(1042237, 8000), //�ڰ׳�������
Array(1042235, 8000), //����˿������
Array(1042232, 8000), //����������
Array(1042219, 8000), //��ݮ�ǹ���ͷ��
Array(1042218, 8000), //ľݮ�ǹ���ͷ��
Array(1042214, 8000), //������������
Array(1042212, 8000), //��ɫѩ������
Array(1042213, 8000), //��ɫѩ������
Array(1042208, 8000), //��������
Array(1042207, 8000), //�����˶���
Array(1042095, 8000), //��ɫ�п�
Array(1042204, 8000), //����T��
Array(1042203, 8000), //��ѿΧ��T��
Array(1042198, 8000), //�ʺ�T��
Array(1042193, 8000), //���з�������
Array(1042189, 8000), //��������
Array(1042187, 8000), //�ۺ�������
Array(1042185, 8000), //��ּ�ķ
Array(1042177, 8000), //����С����
Array(1042176, 8000), //I LOVE CHINA
Array(1042174, 8000), //ҰӪ��
Array(1042173, 8000), //������polo��
Array(1042172, 8000), //�߶�������
Array(1042170, 8000), //����T��
Array(1042166, 8000), //Ħ�мп�
Array(1042165, 8000), //��ɫ���С����
Array(1042164, 8000), //���������
Array(1042161, 8000), //�ۻ���ñ����
Array(1042160, 8000), //��������ͷ��
Array(1042159, 8000), //С�۷䱳��
Array(1042158, 8000), //�ڰ׶̿�п�
Array(1042157, 8000), //�ۺ찮��T��
Array(1042156, 8000), //����ϵT��
Array(1042122, 8000), //����̽�Ʒ�
Array(1042023, 8000), //��ɫ��װ
Array(1042024, 8000), //��ɫ��װ
Array(1042022, 8000), //Ұս����
Array(1042020, 8000), //��ɫ����
Array(1041143, 8000), //������Ƿ���װ
Array(1041142, 8000), //���ǵ������
Array(1041114, 8000), //��������װ
Array(1041140, 8000), //��������
Array(1040114, 8000), //�����Ļ���
Array(1042129, 8000), //�������װ
Array(1042154, 8000), //�����޷�
Array(1042152, 8000), //�����޷�
// -----�۸�Ϊ 5000 ��� --------
Array(1042104, 5000), //С��ҶT��
Array(1042105, 5000), //С��ҶT��
Array(1042108, 5000), //ˮӡ���Ǳ���
Array(1042098, 5000), //��Ī��ͷ�п�
Array(1042097, 5000), //ӡ��������ͷT��
Array(1042095, 5000), //��ɫ�п�
Array(1042093, 5000), //˫�ſ�С����
Array(1042088, 5000), //��ɫ��������
Array(1042086, 5000), //��Ӱʦ�п�
Array(1042084, 5000), //��װ��ñ����
Array(1042083, 5000), //�ɰ���ñ����
Array(1042082, 5000), //���ѿ���
Array(1042076, 5000) //����T��
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
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 2 + " #k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 2;
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + " #k �����");
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
            cm.sendOk("��û����ô������\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k �����");
        }
        cm.dispose();
    }
}