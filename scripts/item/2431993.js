status = -1;
var itemList = Array(
// ------ ��߼����յ����� ------
Array(1113075, 400, 1, 3), //��߼����յ½�ָ
Array(1032223, 400, 1, 3), //��߼����յ¶���
Array(1122267, 400, 1, 3), //��߼����յµ�׹
Array(1132246, 400, 1, 3),  //��߼����յ�����
Array(1132243, 800, 1, 3), // �ͼ����յ¿�ӡ���� - ����ű��յµ�������������
Array(1132244, 700, 1, 3), // �м����յ¿�ӡ���� - ����ű��յµ�������������
Array(1132245, 600, 1, 3), // �߼����յ¿�ӡ���� - ����ű��յµ�������������
Array(1122264, 800, 1, 3), // �ͼ����յ¿�ӡ��׹ - ����ű��յµ������ĵ�׹��
Array(1122265, 700, 1, 3), // �м����յ¿�ӡ��׹ - ����ű��յµ������ĵ�׹��
Array(1122266, 600, 1, 3), // �߼����յ¿�ӡ��׹ - ����ű��յµ������ĵ�׹��
Array(1032220, 800, 1, 3), // �ͼ����յ¶��� - �ñ��յ�֮����Ƭ�������ɵĶ������о���ʱ�ᷢ����â��
Array(1032221, 700, 1, 3), // �м����յ¶��� - �ñ��յ�֮����Ƭ�������ɵĶ������о���ʱ�ᷢ����â��
Array(1032222, 600, 1, 3),  // �߼����յ¶��� - �ñ��յ�֮����Ƭ�������ɵĶ������о���ʱ�ᷢ����â��
Array(1113072, 800, 1, 3), // �ͼ����յ½�ָ - �ôӱ��յ����ϻ�õĺ˵���Ƭ�������ɵĽ�ָ��. 
Array(1113073, 700, 1, 3),  // �м����յ½�ָ - �ôӱ��յ����ϻ�õĺ˵���Ƭ�������ɵĽ�ָ��. 
Array(1113074, 600, 1, 3) // �߼����յ½�ָ - �ôӱ��յ����ϻ�õĺ˵���Ƭ�������ɵĽ�ָ��. 
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
        var chance = Math.floor(Math.random() * 800);
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
            item = im.gainGachaponItem(itemId, quantity, "���յ�������", notice);
            if (item != -1) {
		im.gainItem(2431993, -1);
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