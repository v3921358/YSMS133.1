status = -1;
var itemList = Array(
// ------ 150װ�� ------
Array(1003797,500,1,3), //�߹�սʿͷ�� - (������)
Array(1003798,500,1,3), //�߹�����ά��ñ - (������)
Array(1003799,500,1,3), //�߹���������ñ - (������)
Array(1003800,500,1,3), //�߹�̿���ñ - (������)
Array(1003801,500,1,3), //�߹�������ñ - (������)
Array(1042254,500,1,3), //ӥ��սʿ���� - (������)
Array(1042255,500,1,3), //ӥ�۵�ά�泤�� - (������)
Array(1042256,500,1,3), //ӥ���������� - (������)
Array(1042257,500,1,3), //ӥ�۴̿ͳ��� - (������)
Array(1042258,500,1,3), //ӥ������������ - (������)
Array(1062165,500,1,3), //ħ��ʦսʿ�̿� - (������)
Array(1062166,500,1,3), //ħ��ʦ��ά��̿� - (������)
Array(1062167,500,1,3), //ħ��ʦ�����̿� - (������)
Array(1062168,500,1,3), //ħ��ʦ�̿Ͷ̿� - (������)
Array(1062169,500,1,3)  //ħ��ʦ�����߶̿� - (������)
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
            item = im.gainGachaponItem(itemId, quantity, "150װ����", notice);
            if (item != -1) {
		im.gainItem(2432341, -1);
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