status = -1;
var event;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    event = cm.getEventManager("Gailou"); //��ȡ��ű������� test ��Ӧ event Ŀ¼����� gailou.js �ļ�
    if (status == 0) {
        if (event == null) {
            cm.sendOk(head + "��ű�����...����ϵ����Ա�޸��������´򿪡�");
            cm.dispose();
        } else if (cm.getPlayer().getClient().getChannel() != 1) {
            cm.sendOk(head + "�ֻ����1Ƶ�����У��ף�");
	    cm.dispose();
        } else if (event != null && event.getProperty("state").equals("true")) {
            cm.sendYesNo(head + "�װ���#r#h ##k���ã����Ǹ�¥�Ա�����λʱ��Ϊ10����.\r\n���һ�Ƚ������Ƚ�.\r\nһ�Ƚ�����һ�����ｨ¥�߶ȵ���һ��һ�Ƚ�����1W���\r\n���Ƚ���һ�Ƚ�֮�������¥��10�����Ϊ���Ƚ�\r\n���Ƚ���Ϊ���������ֻ��1�������� 0 - 2000���þ�\r\n�ǾͿ��������� ��ʼ�ɣ�");
        } else {
            cm.sendOk(head + "���δ�������߻�Ѿ�������ÿСʱ��15�ֺ�45�ֿ���, �������������������\r\n���ע���Ǹ�¥������μӡ�\r\n���һ�Ƚ������Ƚ������Ƚ�.\r\nһ�Ƚ�����һ�����ｨ¥�߶ȵ���һ��һ�Ƚ���\r\n���Ƚ���һ�Ƚ�֮�������¥��10�����Ϊ���Ƚ�\r\n���Ƚ���Ϊ���������ֻ��1�������� 0 - 2000���þ�");
            cm.dispose();
        }
    } else if (status == 1) {
        if (event != null && event.getProperty("state").equals("true")) {
            event.setProperty("check", "" + (parseInt(event.getProperty("check")) + 1)); //���õ������+1
            var count = parseInt(event.getProperty("check")); //����ܵ������
            var max = parseInt(event.getProperty("maxCheck"));
			var Cheat = event.getProperty("Message");
            var dj = rand(1000, 5000);
            var dj3 = rand(100, 300);
			var nameIndexOf = Cheat.indexOf(cm.getName());
            if(nameIndexOf != -1) {			
                if (Cheat.indexOf(cm.getName(), nameIndexOf+cm.getName().length()) != -1)
                {
					cm.sendOk("���Ѿ��������������...���ܼ��������ˣ�\r\n");
					cm.dispose();
					return;
                }
            }
            if (count == max) {
                cm.gainNX( + 10000);
                //cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л��һ�Ƚ�,��������Ľ");
				event.setProperty("Message","" + cm.getName());
				event.setProperty("endEvent", "true");
                cm.sendOk(head + "[��¥�] ��ϲ��������¥�һ�Ƚ���");
            } else if (count > max && count <= (max + 30)) {
                cm.gainNX( + dj);
                //cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л�ö��Ƚ�,��������Ľ");
				event.setProperty("Message","" + Cheat + "," + cm.getName());
                cm.sendOk(head + "��ϲ��������¥����Ƚ���");
            } else if (count > (max + 20)) {
                cm.gainNX(1, dj3);
               // event.setProperty("state", "false");
                //cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л�����Ƚ� " + dj3 + "���þ�.������¥��Ѿ�����...");
				event.setProperty("Message","" + Cheat + "," + cm.getName());
                cm.sendOk(head + "��ϲ��������¥����Ƚ���\r\n���� 0 - 100 ����ȡ�\r\n������¥��Ѿ�����...");
            } else {
                cm.sendOk(head + "��ǰ¥��: " + parseInt(event.getProperty("check")) + " ¥��");
            }
        } else {
            cm.sendOk(head + "���δ�������߻�Ѿ����������н������Ѿ����ţ����´��ڲμӡ�");
        }
        cm.dispose();
    }
}

function rand(lbound, ubound) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}