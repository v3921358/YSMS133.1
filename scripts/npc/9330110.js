var status = 0;
var choice;
var scrolls = Array(
Array("", 3010631, 10, "������"), 
Array("", 1102807, 10, "��������"), 
Array("", 1113029, 20),
Array("", 1142610, 20, "��ŵ�����ѫ��"), 
Array("", 3015075, 200, "����Ȼ����"),
Array("", 3994417, 300, "��ɫ����"),
Array("", 3015051, 400, "���ްԹ��ʾ���"),
Array("", 3010832, 500, "̫������"),
Array("", 2432069, 800, "�������߽���ȯ")

);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) cm.dispose();
    else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.sendOk("�ðɣ���ӭ�´μ������٣�.");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            var choices = "�ڵ��㳡������#r#z4000517##k����������߶һ���ƷŶ��\r\n��ǰӵ��#v4000517##z4000517##b:" + cm.getItemQuantity(4000517) + " #k��#l";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#k#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#��#d��Ҫ#r" + scrolls[i][2] + "��#b#v4000517#";
            }
            cm.sendSimpleS(choices,2);

        } else if (status == 1) {
            //var ii = MapleItemInformationProvider.getInstance();
            for (var i = 1; i <= 5; i++) {
                if (cm.getInventory(i).isFull()) {
                    cm.sendOk("������Ӧ�������а������ճ�һ��" + i);
                    cm.dispose();
                    return;
                }
            }
            cm.sendGetNumber("��������Ҫ���������.����ǰӵ��#v4000517##z4000517##b:" + cm.getItemQuantity(4000517) + "#k��.", 1, 0, 100);
            choice = selection;
        } else if (status == 2) {
            sm = selection;
            mesos = scrolls[choice][2] * sm;
            cm.sendYesNoS("��ȷ����Ҫ����#v" + scrolls[choice][1] + "##t" + scrolls[choice][1] + "# " + sm + "����\r\n�⽫������ " + mesos + " ��#v4000517##z4000517##b" + "\r\n#r�Ƿ����?", 2);
            status1 = choice;
        } else if (status == 3) {
            if (cm.haveItem(4000517, mesos) == true) {
                cm.gainItem(4000517, -mesos); 
				cm.gainItem(scrolls[status1][1], sm);
                cm.sendOk("�һ��ɹ�����鿴������"); 
				cm.dispose();
            } else if (sm < 0) {
                cm.sendOk("������ó�������Ȼ���븺����һ��ȥ!");
                cm.dispose();
            } else {
                cm.sendOk("��Ǹ����û�㹻��#v4000517##z4000517#��");
                cm.dispose();

            }
        }
    }
}