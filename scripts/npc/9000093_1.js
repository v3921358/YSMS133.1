var status = 0;
var typed=0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple(" >��ʸ�#b120�����Ͻ�ɫ\r\n\r\n#k >�Ŀ�꣺#b<���ֵ�ð�յ������˶���>\r\n\r\n#k >�������#b#v4310030#�˶���ң�#k" + cm.itemQuantity(4310030) + " #bö\r\n#b#L1#�����#l #L2#�����˶�#l #L10#�����һ�#l");
		} else if (status == 1) {
			if (selection == 1) {
                    cm.dispose();
			cm.sendYesNo("#b#eð�յ����˶���\r\n����һ�ڣ�#n#b\r\n               ���죡�������ѵ��գ�\r\n�ǲ����ڶ������е��������أ��Ե��е���ˣ�����Ҳû���⣡���紵��ս���ޣ�ð�յ���Ѫ�˶���������Ļ��~��"); 
			}
			if (selection == 2) {
                    	typed=1;
			cm.sendYesNo("��ã�#h #����#b2012��11��18�յ�2018��11��18�� #k֮�佫�����ð�յ������˶��ᡣ����������һ���뻶�ֵĽ��գ�ÿ���½һ�Σ��Ϳ��Ի��#r�˶����#k ����������ȡ������˶������");
			}
			if (selection == 3) {
                    cm.dispose();
		    cm.openNpc(9000093,3);
			}
			if (selection == 4) {
                    cm.dispose();
		    cm.openNpc(9000093,4);
			}
			if (selection == 5) {
                    cm.dispose();
		    cm.warp(262030000);
			}
			if (selection == 6) {
                    cm.dispose();
		    cm.warp(744000000);
			}
			if (selection == 7) {
                    cm.dispose();
		    cm.warp(922231000,0);
			}
			if (selection == 9) {
                    cm.dispose();
		    cm.openNpc(9000093,6);
			}
			if (selection == 8) {
                    cm.dispose();
		    cm.openNpc(9000093,5);
			}
			if (selection == 10) {
                    cm.dispose();
		    cm.openNpc(9000093,7);
			}
			if (selection == 11) {
                    cm.dispose();
		    cm.openNpc(9000093,8);
			}
			if (selection == 12) {
                    cm.dispose();
		    cm.openNpc(9000008);
			}
			if (selection == 13) {
                    cm.dispose();
		    cm.openNpc(2085001);
			}
			if (selection == 14) {
                    cm.dispose();
		    cm.openNpc(2112003,1);
			}
			if (selection == 15) {
                    cm.dispose();
		    cm.openNpc(2094000);
			}
			if (selection == 16) {
                    cm.dispose();
		    cm.openNpc(9000093,9);
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.getBossLog("�����˶�") == 0) {
                    cm.gainItem(4310030,1);
                    cm.setBossLog("�����˶�");
		    cm.worldMessage(cm.getChar().getName() + "�������˶���л���˶����x1��");
                    cm.dispose();
                } else {
                    cm.sendOk("������Ѿ���ȡ����");
                    cm.dispose();
                }
			}
		}
	}
}