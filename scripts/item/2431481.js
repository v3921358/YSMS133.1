status = -1;
var itemList = Array(
// ------ ���� ------
Array(2049100, 500, 1, 3), //�������60%
Array(2340000, 200, 1, 3), //ף������
Array(2049752, 100, 1, 3), //S��Ǳ�ܾ��� 30%
Array(2049704, 300, 1, 3), //A��Ǳ�ܸ��Ӿ��� 40%
// ------ װ�� ------
Array(1112915, 20, 1, 3), //������ָ
Array(2020014, 600, 1, 3), //
Array(2041002, 600, 1, 3), //
Array(2041005, 600, 1, 3), //
Array(2041008, 600, 1, 3), // 
Array(2041023, 600, 1, 3), //
Array(2041105, 600, 1, 3), //
Array(2041108, 600, 1, 3), //
Array(2041111, 600, 1, 3), //
Array(2041102, 600, 1, 3), //
Array(2041305, 600, 1, 3), //
Array(2041308, 600, 1, 3), //
Array(2041311, 600, 1, 3), //
Array(2041302, 600, 1, 3), //
Array(2041500, 600, 1, 3), //
Array(2041502, 600, 1, 3), //
Array(1152000, 400, 1, 3), //
Array(1012058, 400, 1, 3), //
Array(1152016, 400, 1, 3), //
Array(1122138, 1, 1, 3), //
Array(1122139, 1, 1, 3), //
Array(1122140, 1, 1, 3), //
Array(1122141, 1, 1, 3), //
Array(1122142, 1, 1, 3), //
Array(1032171, 400, 1, 3), //
Array(1122201, 400, 1, 3), //
Array(1132138, 400, 1, 3), //
Array(1001012, 900, 1, 3), //
Array(1001031, 900, 1, 3), //
Array(1001078, 900, 1, 3), //
Array(1002020, 900, 1, 3), //
Array(1002066, 900, 1, 3), //
Array(1002568, 900, 1, 3), //
Array(1002575, 900, 1, 3), //
Array(1002599, 900, 1, 3), //
Array(1002707, 900, 1, 3), //
// ------ ���� ------
Array(3010001, 200, 1, 3), //
Array(3010002, 500, 1, 3), //
Array(3010003, 500, 1, 3), //
Array(3010004, 200, 1, 3), //
Array(3010005, 200, 1, 3), //
Array(3010006, 500, 1, 3), //
Array(3010007, 500, 1, 3), //
Array(3010008, 500, 1, 3), //
Array(3010009, 500, 1, 3), //
Array(3010010, 500, 1, 3), //
Array(3010012, 500, 1, 3), //
Array(3010013, 500, 1, 3), //
Array(3010014, 500, 1, 3), //
Array(3010018, 500, 1, 3), //
Array(3010016, 500, 1, 3), //
Array(3010017, 500, 1, 3), //
Array(3010019, 500, 1, 3), //
Array(3010020, 500, 1, 3), //
Array(3010021, 500, 1, 3), //
Array(3010028, 500, 1, 3), //
Array(3010029, 500, 1, 3), //
Array(3010024, 500, 1, 3), //
Array(3010025, 500, 1, 3), //
Array(3010026, 500, 1, 3), //
Array(3010030, 500, 1, 3), //
Array(3010031, 200, 1, 3), //
Array(3010032, 200, 1, 3), //
Array(3010033, 200, 1, 3), //
Array(3010034, 200, 1, 3), //
Array(3010035, 200, 1, 3), //
Array(3010036, 200, 1, 3), //
Array(3010037, 200, 1, 3), //
Array(3010038, 200, 1, 3), //
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
        var chance = Math.floor(Math.random() * 900);
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
            item = im.gainGachaponItem(itemId, quantity, "�޴����", notice);
            if (item != -1) {
		im.gainItem(2431481, -1);
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