/*
	����: 		�ƶ���
	��ͼ: 		�����
	����: 		�����ѯʦ
*/

var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("����һ����꣬������ʲô�£�#b\r\n\r\n#L0# ������顣#l\r\n#L1# ɾ����ָ��#l\r\n#L2# û�С�û�°���#k#l");
    } else if (status == 1) {
        if (selection == 0) {
            if (cm.getPlayer().getMarriageId() <= 0) {
                cm.sendNext("�������δ�����֪�������ζ��ʲô��");
                cm.dispose();
            } else {
                cm.sendYesNo("�������ȷ����������飿ȷ�����Ҫ�������");
            }
        } else if (selection == 1) {
            if (cm.getPlayer().getMarriageId() > 0) {
                cm.sendNext("������ǽ��״̬�ɾ����ָ����������ܲ�����");
                cm.dispose();
            } else {
                var selStr = "�ǵģ����ǿ���ɾ�����˲���Ҫ�Ľ���ָ������һ������Щ����ָ��û���ˡ������ܻ���һ�������ĸо���\r\n#b";
                var found = false;
                for (var i = 1112300; i < 1112312; i++) {
                    if (cm.haveItem(i)) {
                        found = true;
                        selStr += "\r\n#L" + i + "##v" + i + "##t" + i + "##l";
                    }
                }
                if (!found) {
                    cm.sendNext("�����û�п���ɾ���Ľ���ָ����������");
                    cm.dispose();
                } else {
                    cm.sendSimple(selStr);
                }
            }
        } else if (selection == 2) {
            cm.sendNext("����������ڻ��ڷ��գ�������һ��Ҫ���ؿ��ǡ�");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selection == -1) {
            if (cm.getPlayer().getMarriageId() <= 0) {
                cm.sendNext("�������δ�����֪�������ζ��ʲô��");
            } else {
                cm.handleDivorce();
            }
        } else {
            if (selection >= 1112300 && selection < 1112312) {
                cm.gainItem(selection, -1);
                cm.sendOk("�ã���ָ�һ���յġ�������Ϊ�����ָ�Ѿ�ʧȥ����ԭ�ȵ����壬���Ժ��ź����Ҳ��ܸ��㲹����");
            }
        }
        cm.dispose();
    }
}