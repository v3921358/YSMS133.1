status = -1;
var itemList = Array(
// ------ ���� ------
Array(5062000, 700, 10, 1), //ͬһ��ɡ��
Array(5062002, 700, 10, 1), //ԡͰ
Array(5064000, 700, 10, 1), //��������
Array(5062500, 700, 10, 1), //��������
Array(5062010, 700, 10, 1), //ħŮ�ķ�ɨ��
Array(2340000, 700, 10, 1), //������
Array(2049323, 350, 10, 1), //����
Array(2049325, 700, 10, 1), //ʥ��������
Array(2049136, 500, 10, 1), //������
Array(2049137, 700, 10, 1),
Array(2614017, 300, 2, 1),
Array(2431354, 700, 1, 1)
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
        var chance = Math.floor(Math.random() * 700);
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
            item = im.gainGachaponItem(itemId, quantity, "������������(��)", notice);
            if (item != -1) {
            im.gainItem(2430639, -1);
                im.sendOk("������ #b#t" + item + "##k " + quantity + "����");
            } else {
                im.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
            }
            im.safeDispose();
        } else {
            im.sendOk("�������������ʲô��û���õ���\r\n(����˰�ο�����˶���� x3��)");
            im.gainItem(4310030, 3);
            im.safeDispose();
        }
    }
}