status = -1;
var event;

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
            cm.sendOk("��ű�����...����ϵ����Ա�޸��������´򿪡�");
            cm.dispose();
        } else if (cm.getPlayer().getClient().getChannel() != 1) {
            cm.sendOk("�ֻ����1Ƶ�����У��ף�");
	    cm.dispose();
        } else if (event != null && event.getProperty("state").equals("true")) {
            cm.sendYesNo("�װ���#r#h ##k���ã����Ǹ�¥�Ա�����λʱ��Ϊ10����.\r\n���һ�Ƚ������Ƚ������Ƚ�.\r\nһ�Ƚ�����һ�����ｨ¥�߶ȵ���һ��һ�Ƚ���\r\n���Ƚ���һ�Ƚ�֮�������¥��10�����Ϊ���Ƚ�\r\n���Ƚ���Ϊ���������ֻ��1�ˡ�\r\n�ǾͿ��������� ��ʼ�ɣ�");
        } else {
            cm.sendOk("���δ�������߻�Ѿ��������������������������\r\n���ע���Ǹ�¥������μӡ�\r\n���һ�Ƚ������Ƚ������Ƚ�.\r\nһ�Ƚ�����һ�����ｨ¥�߶ȵ���һ��һ�Ƚ���\r\n���Ƚ���һ�Ƚ�֮�������¥��10�����Ϊ���Ƚ�\r\n���Ƚ���Ϊ���������ֻ��1��");
            cm.dispose();
        }
    } else if (status == 1) {
        if (event != null && event.getProperty("state").equals("true")) {
            event.setProperty("check", "" + (parseInt(event.getProperty("check")) + 10)); //���õ������+1
            var count = parseInt(event.getProperty("check")); //����ܵ������
            var max = parseInt(event.getProperty("maxCheck"));
            //var dj = rand(5000, 8000);
            var dj3 = rand(0, 2000);
            if (count == max) {
                cm.gainNX(1, 1000);
				//cm.gainItem(5062000, 10);
				cm.gainItem(5062009, 2);
				cm.gainItem(5062500, 1);
				cm.gainItem(4310036, 100);
				cm.gainItem(4310129, 50);
				cm.gainItem(4310030, 5);
				//cm.gainNX(2, 1000);
                cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л��һ�Ƚ�����ô���ħ������������Ľ");
                cm.sendOk("[��¥�] ��ϲ��������¥�һ�Ƚ�������˵��1000�㡣����ħ��2������ʦ����ħ��1���������߱�100��������������50�����˶����5��");
            } else if (count > max && count <= (max + 10)) {
                cm.gainNX(1, 500);
				cm.gainItem(5062000, 2);
				cm.gainItem(5062002, 2);
				//cm.gainItem(5062002, 1);
				//cm.gainItem(5062500, 1);
				//cm.gainItem(4310036, 5);
				//cm.gainItem(4310030, 2);
				//cm.gainNX(2, 500);
                cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л�ö��Ƚ�����ô���ħ������������Ľ");
                cm.sendOk("��ϲ��������¥����Ƚ�������˵��500�㣬����ħ��2�����߼�����ħ��2��");
            } else if (count > (max + 10)) {
                cm.gainItem(5062000, 5);
				//cm.gainItem(5062002, 1);
				//cm.gainItem(5062500, 1);
				cm.gainNX(1, 300);
                event.setProperty("state", "false");
                event.setProperty("endEvent", "true");
                cm.worldMessage("[��¥�]�� ��ϲ��� " + cm.getName() + " ����¥��л�����Ƚ�,���Ǻ�����");
                cm.sendOk("��ϲ��������¥����Ƚ�������˵��300�㣬����ħ��5����\r\n������¥��Ѿ�����...");
            } else {
                cm.sendOk("��ǰ¥��: " + parseInt(event.getProperty("check")) + " ¥��");
            }
        } else {
            cm.sendOk("���δ�������߻�Ѿ����������н������Ѿ����ţ����´��ڲμӡ�");
        }
        cm.dispose();
    }
}

function rand(lbound, ubound) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}