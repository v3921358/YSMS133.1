status = -1;
var itemList = Array(
// ------ ���� ------
Array(2049100, 500, 1, 3), //�������60%
Array(2049133, 500, 1, 3), //���˻������50%
Array(2049134, 500, 1, 3), //���˻������70%
Array(2049137, 500, 1, 3), //�������������� 40%
Array(2049129, 500, 1, 3), //���������� 50%
Array(2049116, 500, 1, 3), //ǿ��������� 60%
Array(2049124, 500, 1, 3), //���������� 60%
Array(2340000, 600, 1, 3), //ף������
Array(2049752, 300, 1, 3), //S��Ǳ�ܾ��� 30%
Array(2049704, 500, 1, 3), //A��Ǳ�ܸ��Ӿ��� 40%
Array(2048311, 500, 1, 3), //����Ǳ�ܸ��Ӿ��� 50%
Array(2049304, 500, 1, 3), //3��װ��ǿ������ 80%
// ------ װ�� ------
Array(1012319, 600, 1, 3), //8�������
Array(1112915, 500, 1, 3), //������ָ
Array(1003561, 600, 1, 3), //�籩��ëñ��
Array(1022149, 600, 1, 3), //�籩�۾�
Array(1032148, 600, 1, 3), //�籩����
Array(1052467, 600, 1, 3), //�籩��ñ���� 
Array(1072672, 600, 1, 3), //�籩Ь��
Array(1082438, 600, 1, 3), //�籩����
Array(1102467, 600, 1, 3), //�籩����
Array(1112748, 600, 1, 3), //�籩��ָ
Array(1122200, 600, 1, 3), //�籩��׹
Array(1132161, 600, 1, 3), //�籩����
Array(1152099, 600, 1, 3), //�籩����
Array(1202023, 600, 1, 3), //�桤��ͼ��
Array(1202027, 600, 1, 3), //�桤������ͼ��
Array(1202031, 600, 1, 3), //�桤С��ͼ��
Array(1202035, 600, 1, 3), //�桤�˾ͼ��
// ------ ���� ------
Array(5064300, 600, 2, 3), //�����������
Array(5062500, 600, 2, 3), //��ʦ��������ħ��
Array(5062000, 600, 2, 3), //����ħ��
Array(5064000, 600, 2, 3), //��������
Array(5064100, 600, 2, 3), //��������
Array(5062002, 600, 2, 3)  //�߼�����ħ��
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("����ʹ���𣿡��ҵĶ������и���#b�������λ���ᡢװ�����������#kŶ��");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        var chance = Math.floor(Math.random() * 600);
        var finalitem = Array();
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1] >= chance) {
                finalitem.push(itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = finalitem[finalchance][2];
            var notice = finalitem[finalchance][3];
            item = im.gainGachaponItem(itemId, quantity, "���찮�齱", notice);
            if (item != -1) {
		im.gainItem(2430070, -1);
                im.sendOk("������ #b#t" + item + "##k " + quantity + "����");
            } else {
                im.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
            }
            im.safeDispose();
        } else {
            im.sendOk("�������������ʲô��û���õ���");
            im.safeDispose();
        }
    }
}