status = -1;
var itemList = Array(
// ------ ��*���ѵ�ð��֮�� ------
Array(1122122, 500, 1, 3), //��*���ѵ�ð��֮�� - սʿ 
Array(1122123, 500, 1, 3), //��*���ѵ�ð��֮�� - ��ʦ 
Array(1122124, 500, 1, 3), //��*���ѵ�ð��֮�� - ����
Array(1122125, 500, 1, 3), //��*���ѵ�ð��֮�� - ���� 
Array(1122126, 500, 1, 3)  //��*���ѵ�ð��֮�� - ����
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
        var chance = Math.floor(Math.random() * 500);
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
            item = im.gainGachaponItem(itemId, quantity, "ð��֮����", notice);
            if (item != -1) {
		im.gainItem(2431991, -1);
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