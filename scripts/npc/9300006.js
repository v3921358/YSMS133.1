var typed = 0;

var itemList = Array(4000019,4000000,4000016);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	var em = cm.getEventManager("Yzc");
	var eim = em.getInstance("Yzc");
	if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	if (status==0) {
		if (cm.getPlayer().getMapId() == 700000200) {
			cm.sendOk("��ϲ��ϲ���п�ȥ�ҵ�������һ����");
			cm.dispose();
			return;
		}
		if (eim.getProperty("gift") == 1) {
			cm.warp(910000000);
			cm.dispose();return;
		}
		if (em.getProperty("state")==2) {
			cm.sendSimple("�ţ��治�������ҵĽ���ȫ�ˡ�����һ��������һ��Ҫ���¡�\r\n#b#L0#���ҾͲ������ˣ�#l");
		} else {
			cm.sendOk("���Ͱ������꣡");
			cm.dispose();
		}
	} else if (status == 1) {
		if (selection == 0) {
			eim.setProperty("gift", 1);
			cm.setBossLog("��������");
			var mobQuantity = eim.getProperty("pigcount");
			var nx = 1*mobQuantity+Math.floor(Math.random()*400+100);
			var nx2 = 1*mobQuantity*2+Math.floor(Math.random()*500+500);
			text = "#e#d<������>#n#k\r\n��ɹ���ɱ��"+mobQuantity+"ֻҰ��\r\n�������#b"+nx+"#k��\r\n��������ȯ��#b"+nx2+"#k��\r\n";
			if (nx>2000)
				nx = 2000;
			if (nx2 > 5000)
				nx2 = 5000;
			cm.gainNX(1,nx);
			cm.gainNX(2,nx2);
			if (mobQuantity >= 100 && mobQuantity <= 300) {
				text+="�������ߣ�1��#b�߼�����ħ��#k";
				cm.gainItem(5062002, 1);
			} else if (mobQuantity>300 && mobQuantity<=500) {
				text+="�������ߣ�2��#b�߼�����ħ��#k";
				cm.gainItem(5062002, 2);
			} else if (mobQuantity>500) {
				text+="�������ߣ�2��#b�߼�����ħ��#k,2��#b��ʦ��������ħ��#k";
				cm.gainItem(5062002, 1);
			}
			text+="\r\n#b#L0#лл�ϰ壬������һ����#l";
			cm.sendSimple(text);
		}
	} else if (status == 2) {
			cm.dispose();
			cm.warp(910000000);
			
	}
}