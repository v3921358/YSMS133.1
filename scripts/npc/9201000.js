/*
	����: 		�����׸�
	��ͼ: 		�����
	����: 		��ָ��������
*/

var status = -1;
var itemList = Array(
Array(2240004, 1000000, 1112300, "�³�ʯ��ָ���������ϵ�����������ԭʯ�������ɵģ��ȼ�Ӳ�������Ľ�ָ��"), //�³�ʯ��ָ
Array(2240007, 1000000, 1112303, "��ҫ���ǽ�ָ���ô������ϵ�����������ҫԭʯ�������ɵ�������ָ��"), //��ҫ���ǽ�ָ
Array(2240010, 1000000, 1112306, "���Ľ�ָ���ô���������Ľ����������ɵĻ�����ָ��"), //���Ľ�ָ
Array(2240013, 1000000, 1112309, "�����ָ���ô����Ŵ���ʹ���������������ɵļ򵥡����ŵĽ�ָ��"), //�����ָ
Array(2240005, 3000000, 1112301, "�³�ʯ��ָ���������ϵ�����������ԭʯ�������ɵģ��ȼ�Ӳ�������Ľ�ָ��"), //�³�ʯ��ָ2����
Array(2240008, 3000000, 1112304, "��ҫ���ǽ�ָ���ô������ϵ�����������ҫԭʯ�������ɵ�������ָ��"), //��ҫ���ǽ�ָ2����
Array(2240011, 3000000, 1112307, "���Ľ�ָ���ô���������Ľ����������ɵĻ�����ָ��"), //���Ľ�ָ2����
Array(2240014, 3000000, 1112310, "�����ָ���ô����Ŵ���ʹ���������������ɵļ򵥡����ŵĽ�ָ��"), //�����ָ2����
Array(2240006, 6000000, 1112302, "�³�ʯ��ָ���������ϵ�����������ԭʯ�������ɵģ��ȼ�Ӳ�������Ľ�ָ��"), //�³�ʯ��ָ3����
Array(2240009, 6000000, 1112305, "��ҫ���ǽ�ָ���ô������ϵ�����������ҫԭʯ�������ɵ�������ָ��"), //��ҫ���ǽ�ָ3����
Array(2240012, 6000000, 1112308, "���Ľ�ָ���ô���������Ľ����������ɵĻ�����ָ��"), //���Ľ�ָ3����
Array(2240015, 6000000, 1112311, "�����ָ���ô����Ŵ���ʹ���������������ɵļ򵥡����ŵĽ�ָ��") //�����ָ3����
);
var selectedItem = -1;
var selectedCost = -1;
var firstSelection = -1;

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            cm.sendNext("������ٿ��ǿ��ǣ�����������ɡ�");
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("��û��ʲô�����Ƚ�ָ���ʺ���������İ����ˣ��̺����氮�Ľ�ָ�������������õĶ����ˡ������İ�������ֻҪ��Ը�⣬�һ�Ŭ�����������ת����Է��ġ���ô������\r\n#L0##b���빺�򶩻��ָ��#l\r\n#L2#�����˻������ָ��#l\r\n#L1#���𡭲����һ�û���İ����˰���#l");
    } else if (status == 1) {
        firstSelection = selection;
        if (selection == 0) { //���빺�򶩻��ָ
            if (cm.getPlayer().getMarriageId() > 0) {
                cm.sendNext("������Ѿ�������");
                cm.dispose();
            } else if (!canBuyItem()) {
                cm.sendNext("������Ѿ���������ָ�����������������ָ�������ȶ������ڵ��Ǹ�����ָ�ɡ���Ҳ���������������");
                cm.dispose();
            } else {
                var prompt = "�ҳ��۵Ľ�ָ����" + itemList.length + "�֡�����Ҫ�����ֽ�ָ������һ����ϲ���Ľ�ָ�ɡ�\r\n#b";
                for (var i = 0; i < itemList.length; i++) {
                    prompt += "\r\n#L" + i + "##i" + itemList[i][0] + ":##t" + itemList[i][0] + "##l";
                }
                prompt += "#k";
                cm.sendSimple(prompt);
            }
        } else if (selection == 1) { //���𡭲����һ�û���İ����˰�
            cm.sendNext("������һ��������İ����˵ģ�����ʱ���������Ұɡ�");
            cm.dispose();
        } else if (selection == 2) { //�����˻������ָ
            var selStr = "�ǵģ����ǿ��Իع����˲���Ҫ������ָ������һ������Щ����ָ��û���ˡ������ܻ���һ�������ĸо���\r\n#b";
            var found = false;
            for (var i = 0; i < itemList.length; i++) {
                if (cm.haveItem(itemList[i][0])) {
                    found = true;
                    selStr += "\r\n#L" + i + "##t" + itemList[i][0] + "##l";
                }
            }
            if (!found) {
                cm.sendNext("�����û�п����˸��ҵĽ�ָ����������");
                cm.dispose();
            } else {
                cm.sendSimple(selStr);
            }
        }
    } else if (status == 2) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            if (firstSelection == 0) { //���򶩻��ָ�б�ѡ��
                cm.sendYesNo(item[3] + "���ļ۸���#b" + selectedCost / 10000 + "����#k�����ھ�Ҫ������");
            } else { //�˻������ָ
                cm.sendGetNumber("����������#t" + selectedItem + "#��", 1, 1, cm.getItemQuantity(selectedItem));
            }
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 3) {
        if (firstSelection == 0) { //���򶩻��ָ�б�ѡ��
            if (selectedItem <= 0 || selectedCost <= 0) {
                cm.sendOk("���򶩻��ָ���ִ���...");
            } else if (cm.getMeso() < selectedCost || !cm.canHold(selectedItem)) {
                cm.sendNext("��ȷ���������Ƿ���1�����Ͽռ䣬���б������Ƿ����㹻�Ľ�ҡ�");
            } else if (!canBuyItem()) {
                cm.sendNext("������Ѿ���������ָ�����������������ָ�������ȶ������ڵ��Ǹ�����ָ�ɡ���Ҳ���������������");
            } else {
                cm.gainMeso( - selectedCost);
                cm.gainItem(selectedItem, 1);
                cm.sendNext("ף�����ɹ���ֻҪ�����Ǹ���ָ���϶��ܳɹ��ġ�");
            }
        } else { //�˻������ָ
            if (selectedItem <= 0) {
                cm.sendOk("���ִ���...");
            } else if (selection <= 0) {
                cm.sendOk("������˻������ָ��������...");
            } else if (cm.haveItem(selectedItem, selection)) {
                cm.gainItem(selectedItem, -selection);
                cm.sendOk("�ã���ָ�һ���յġ�������Ϊ�����ָ�Ѿ�ʧȥ����ԭ�ȵ����壬���Ժ��ź����Ҳ��ܸ��㲹����");
            }
        }
        cm.dispose();
    }
}

function canBuyItem() {
    var complete = true;
    for (var i = 0; i < itemList.length; i++) {
        if (cm.haveItem(itemList[i][0])) {
            complete = false;
            break;
        }
    }
    return complete;
}