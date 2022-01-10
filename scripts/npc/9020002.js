/* 
 * ���� NPC (9020002)
 */

var status;
var random = java.lang.Math.floor(Math.random() * 9 + 1);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        var mapId = cm.getMapId();
        if (mapId == 910340000) {
            cm.warp(910340700, 0);
            cm.removeAll(4001007);
            cm.removeAll(4001008);
            cm.dispose();
        } else {
            var outText;
            if (mapId == 910340600) {
		cm.setEventCount("��������");
		if(random == 1){
		cm.finishActivity(120104);
		cm.gainItem(2430781,1);
		cm.worldSpouseMessage(0x20,"[���-��������] ��� "+ cm.getChar().getName() +" ͨ�� "+ cm.getEventCount("��������") +" �� ϵͳ����������ͨ�ؽ�����");
	   	cm.dispose();
		}else if(random == 2){
		cm.gainItem(2430781,1);
		cm.gainItem(4310088,5);
		cm.finishActivity(120104);
		cm.worldSpouseMessage(0x20,"[���-��������] ��� "+ cm.getChar().getName() +" ͨ�� "+ cm.getEventCount("��������") +" �� ϵͳ����������ͨ�ؽ����������ô���RED�ҡ�");
	   	cm.dispose();
		}else if(random == 3){
		cm.gainItem(2430781,1);
		cm.gainItem(4033356,1);
		cm.finishActivity(120104);
		cm.worldSpouseMessage(0x20,"[���-��������] ��� "+ cm.getChar().getName() +" ͨ�� "+ cm.getEventCount("��������") +" �� ϵͳ����������ͨ�ؽ���,�������������1��");
	   	cm.dispose();
		}else{
                    if (cm.getEventCount("��������") >30){
		        cm.gainItem(2430781,1);
			cm.finishActivity(120104);
		        cm.worldSpouseMessage(0x20,"[���-��������] ��� "+ cm.getChar().getName() +" ͨ�� "+ cm.getEventCount("��������") +" �� ϵͳ����������ͨ�ؽ�����");
	  	        cm.dispose();
                    }else{
                        cm.gainItem(2430781,1);
			cm.finishActivity(120104);
		        cm.gainItem(4310088,Math.random() * 15 + 1);
		        cm.worldSpouseMessage(0x20,"[���-��������] ��� "+ cm.getChar().getName() +" ͨ�� "+ cm.getEventCount("��������") +" �� ϵͳ����������ͨ�ؽ���������С��30��ô���RED�ҡ�");
                    }
		}
                outText = "ͨ�سɹ�!";
		cm.warp(910340000,0);
            } else {
                outText = "��ȷ��Ҫ�뿪��ͼ��?";
            }
            if (status == 0) {
                cm.sendYesNo(outText);
            } else if (mode == 1) {
                cm.warp(910340000, "st00"); // Warp player
                cm.dispose();
            }
        }
    }
}