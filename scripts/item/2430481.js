/* �߼�����ħ����Ƭ */

var status = -1;
var itemList = Array(
Array(2049300, 30), //�߼�װ��ǿ������
Array(2049705, 40) //AǱ�� 50%
);
var itemId = -1;
var amount = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            if (status == 1) {
                im.sendNext("�������Ҫ�һ��Ļ�����ô���´������ң�");
            }
            im.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "�����ڳ���#r" + im.getItemQuantity(2430481) + "#k��#b#i2430481:# #t2430481##k\r\n��ѡ����ϣ���һ�������:";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "#�Ѽ�#r" + itemList[i][1] + "��#k���Ի��#b#i" + itemList[i][0] + ":# #t" + itemList[i][0] + "##k#l";
        }
        im.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            itemId = item[0];
            amount = item[1];
            if (im.getItemQuantity(2430481) >= amount) {
                im.sendYesNo("�����ڳ���#r" + im.getItemQuantity(2430481) + "#k��#b#i2430481:# #t2430481##k \r\n��Ҫ��#r" + amount + "��#k#t2430481#����#i" + itemId + ":# #b#t" + itemId + "##k ��");
            } else {
                im.sendOk("�һ�#i" + itemId + ":# #b#t" + itemId + "##k��Ҫ#r" + amount + "��#k#b#t2430481##k\r\n�������ռ�#r" + (amount - im.getItemQuantity(2430481)) + "#k���Ҳ���Ϊ���һ���");
                im.dispose();
            }
        } else {
            im.sendOk("���ִ���...");
            im.dispose();
        }
    } else if (status == 2) {
        if (itemId <= 0 || amount <= 0) {
            im.sendOk("�һ����߳��ִ���...");
            im.dispose();
            return;
        }
        if (im.getItemQuantity(2430481) >= amount) {
            if (im.canHold(itemId)) {
                im.gainItem(2430481, -amount);
                im.gainItem(itemId, 1);
                im.sendOk("��ϲ���ɹ��һ�#i" + itemId + ":# #b#t" + itemId + "##k ��");
            } else {
                im.sendOk("���������������1�����ϵĿռ䡣");
            }
        } else {
            im.sendOk("�һ�#i" + itemId + ":# #b#t" + itemId + "##k��Ҫ#r" + amount + "��#k#b#t2430481##k\r\n�������ռ�#r" + (amount - im.getItemQuantity(2430481)) + "#k���Ҳ���Ϊ���һ���");
        }
        im.dispose();
    }
}