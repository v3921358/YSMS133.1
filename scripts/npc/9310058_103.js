/*
	������
	��ĸ�̳齱���乺��NPC
*/

var status = -1;
var cost = 1500;
function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("��һ�ƿ�һ�����Ϸ�Ӻ�����������䱦��һ��ֻҪ#r"+cost+"���#k\r\n�ܹ����#v2049323##z2049323#��#v2046913##z2046913#��#v2431944##z2431944#��#v2431945##z2431945#��#v2431938##z2431938#��#v3010070##z3010070#ϡ�����ӵȸ߼���Ʒ#k���򿪱��������#r10��#k#b�˶����#k���˶�����ܶһ�#b�سɾ���#k��#b�˶���װ��#kŶ������\r\n�������ɣ�С�ֵܣ� \r\n#L0##b��1�����������#k#l\r\n#L1##b��10�����������#k#l\r\n#L2##r�ϰ壬��Ҫ100����#k#l");
    } else if (status == 1) {
		if (selection == 0) {
			if (cm.getPlayer().getCSPoints(1)>=cost) {
				cm.gainItem(2430069,1);
				cm.gainNX(1, -cost);
				cm.sendOk("�����Ѿ����֣���򿪿�����ʲô�ɣ�")
			} else {
				cm.sendOk('ιι��С�ֵܣ������û����ô�����ޣ�');
			}
		} else if (selection == 1) {
			if (cm.getPlayer().getCSPoints(1)>=cost*10) {
				cm.gainItem(2430069,10);
				cm.gainNX(1, -cost*10);
				cm.sendOk("�٣���10��ȥ���������ɣ�ף����ˣ�")
			} else {
				cm.sendOk('ιι��С�ֵܣ������û����ô�����ޣ�');
			}
		} else if (selection == 2) {
			if (cm.getPlayer().getCSPoints(1)>=cost*100) {
				cm.gainItem(2430069,100);
				cm.gainNX(1, -cost*100);
				cm.sendOk("���ϣ�����100�����䣬ף����ˣ�С�ֵܣ���")
			} else {
				cm.sendOk('ιι��С�ֵܣ������û����ô�����ޣ�');
			}
		}
       // cm.sendOk("����10����,�������￴����!");
        cm.dispose();
    }
}