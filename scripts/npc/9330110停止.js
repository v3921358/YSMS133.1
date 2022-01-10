importPackage(Packages.server);
importPackage(Packages.client.inventory);
importPackage(Packages.constants);

var status = 0;
var choice;
var scrolls = Array(
Array("", 4110010, 8), 
Array("", 1113029, 30), 
Array("", 1142610, 30, "�߼�����ħ��"), 
Array("", 1002590, 50, "�߼�����ħ��"), 
Array("", 1002608, 50, "�߼�����ħ��"), 
Array("", 1003861, 50, "����ħ��"), 
Array("", 1042263, 50, "��������ħ��"), 
Array("", 1062107, 50, "ת��ʥ��"), 
Array("", 1061205, 50, "140������ϵ��"), 
Array("", 1062173, 50, "140������ϵ��"), 
Array("", 1072820, 50, "140������ϵ��"), 
Array("", 1702422, 100, "140������ϵ��"), 
Array("", 1702415, 100, "140������ϵ��"), 
Array("", 3010465, 100, "140������ϵ��"), 
Array("", 3010458, 120, "140������ϵ��"), 
Array("", 3010460, 200, "140������ϵ��"), 
Array("", 3010456, 300, "140������ϵ��"), 
Array("", 3010457, 350, "140������ϵ��"), 
Array("", 3010526, 350, "140������ϵ��"), 
Array("", 3010070, 400, "140������ϵ��"), 
Array("", 3010609, 500, "140������ϵ��"), 
Array("", 3010631, 500, "140������ϵ��"), 
Array("", 3010193, 550, "140������ϵ��"),
//Array("",3010450,500,"140������ϵ��"),
Array("", 3010412, 650, "140������ϵ��"), 
Array("", 3010511, 650, "140������ϵ��"), 
Array("", 3010527, 800, "140������ϵ��")
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
            var choices = "�ڵ��㳡������#r#z2431690##k����������߶һ���ƷŶ��\r\n��ǰӵ��#v2431690##z2431690##b:" + cm.getPlayer().getItemAmount(2431690) + " #k��#l";
            for (var i = 0; i < scrolls.length; i++) {
                choices += "\r\n#k#L" + i + "##v" + scrolls[i][1] + "##z" + scrolls[i][1] + "#��#d��Ҫ#r" + scrolls[i][2] + "��#b#v2431690#";
            }
            cm.sendSimpleS(choices,2);

        } else if (status == 1) {
            //var ii = MapleItemInformationProvider.getInstance();
            for (var i = 1; i <= 5; i++) {
                if (cm.getPlayer().getInventory(MapleInventoryType.getByType(i)).isFull()) {
                    cm.sendOk("������Ӧ�������а������ճ�һ��" + i);
                    cm.dispose();
                    return;
                }
            }
            cm.sendGetNumber("��������Ҫ���������.����ǰӵ��#v2431690##z2431690##b:" + cm.getPlayer().getItemAmount(2431690) + "#k��.", 1, 0, 100);
            choice = selection;
        } else if (status == 2) {
            sm = selection;
            mesos = scrolls[choice][2] * sm;
            cm.sendYesNoS("��ȷ����Ҫ����#v" + scrolls[choice][1] + "##t" + scrolls[choice][1] + "# " + sm + "����\r\n�⽫������ " + mesos + " ��#v2431690##z2431690##b" + "\r\n#r�Ƿ����?", 2);
            status1 = choice;
        } else if (status == 3) {
            if (cm.haveItem(2431690, mesos) == true) {
                cm.gainItem(2431690, -mesos); 
				cm.gainItem(scrolls[status1][1], sm);
                cm.sendOk("�һ��ɹ�����鿴������"); 
				cm.dispose();
            } else if (sm < 0) {
                cm.sendOk("������ó�������Ȼ���븺����һ��ȥ!");
                cm.dispose();
            } else {
                cm.sendOk("��Ǹ����û�㹻��#v2431690##z2431690#��");
                cm.dispose();

            }
        }
    }
}