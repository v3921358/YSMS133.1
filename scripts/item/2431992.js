status = -1;
var itemList = Array(
// ------ 150���� ------
Array(1132174 , 500, 1, 3), //- �������Ǵ�˹���� - (������)
Array(1132175 , 500, 1, 3), //- �����ն�÷˹���� - (������)
Array(1132176 , 500, 1, 3), //- ������������ - (������)
Array(1132177 , 500, 1, 3), //- �������������� - (������)
Array(1132178 , 500, 1, 3), //- ��������̩���� - (������)
Array(1102481 , 500, 1, 3), //- �������Ǵ�˹���� - (������)
Array(1102482 , 500, 1, 3), //- �����ն�÷˹���� - (������)
Array(1102483 , 500, 1, 3), //- ������������ - (������)
Array(1102484 , 500, 1, 3), //- �������������� - (������)
Array(1102485 , 500, 1, 3), //- ��������̩���� - (������)
Array(1082543 , 500, 1, 3), //- �������Ǵ�˹���� - (������)
Array(1082544 , 500, 1, 3), //- �����ն�÷˹���� - (������)
Array(1082545 , 500, 1, 3), //- ������������ - (������)
Array(1082546 , 500, 1, 3), //- �������������� - (������)
Array(1082547 , 500, 1, 3), //- ��������̩���� - (������)
Array(1072743 , 500, 1, 3), //- �������Ǵ�˹ѥ - (������)
Array(1072744 , 500, 1, 3), //- �����ն�÷˹ѥ - (������)
Array(1072745 , 500, 1, 3), //- ��������ѥ - (������)
Array(1072746 , 500, 1, 3), //- ����������ѥ - (������)
Array(1072747 , 500, 1, 3) //- ��������̩ѥ - (������)
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
            item = im.gainGachaponItem(itemId, quantity, "150��������", notice);
            if (item != -1) {
		im.gainItem(2431992, -1);
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