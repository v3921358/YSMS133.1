status = -1;
var itemList = Array(
// ------ 150���� ------
Array(1532098,500,1,3), //��������ҫ�� - (������)
Array(1522094,500,1,3), //������˫������ - (������)
Array(1492179,500,1,3), //����������ǹ - (������)
Array(1482168,500,1,3), //�����ɾ���֮צ - (������)
Array(1472214,500,1,3), //������Σ��֮�� - (������)
Array(1462193,500,1,3), //�����ɷ����� - (������)
Array(1452205,500,1,3), //������׷���� - (������)
Array(1442223,500,1,3), //�����ɰ��¿��и� - (������)
Array(1432167,500,1,3), //�����ɹ���ǹ - (������)
Array(1422140,500,1,3), //���������紸 - (������)
Array(1412135,500,1,3), //������ս�����⸫ - (������)
Array(1402196,500,1,3), //���������֮�� - (������)
Array(1382208,500,1,3), //������ħ��֮�� - (������)
Array(1372177,500,1,3), //������ħ����ȡ�� - (������)
Array(1362090,500,1,3), //�����ɶ������� - (������)
Array(1342082,500,1,3), //�����ɼ���֮�� - (������)
Array(1332225,500,1,3), //�����ɴ���ʿ�｣ - (������)
Array(1322203,500,1,3), //�����ɸ���ϴ� - (������)
Array(1312153,500,1,3), //������˫�����⸫ - (������)
Array(1302275,500,1,3), //����������֮�� - (������)
Array(1242061,500,1,3), //�����ɾ���֮�� - ³����˹��װ(����)ר������
Array(1242060,500,1,3), //�����ɾ���֮�� - ³����˹��װ(����)ר������
Array(1232057,500,1,3), //����������ʹ�� - (������)
Array(1222058,500,1,3), //��������ʹ��� - (������)
Array(1212063,500,1,3)  //������ħ��ԴȪ�� - (������)
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
            item = im.gainGachaponItem(itemId, quantity, "150������", notice);
            if (item != -1) {
		im.gainItem(2431989, -1);
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