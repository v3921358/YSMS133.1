/* 
	�� �����г���������NPC
*/

var status = -1;
var sel;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("����ȥ��������أ�\r\n#b#L0# ���ռ���㳡#l\r\n#L1# �λ��������㳡\r\n#b#L2# ������㳡#l#k");
    } else if (status == 1) {
        if (selection <= 2 && selection >= 0) {
            if (cm.getPlayer().getMapId() < 749050500 || cm.getPlayer().getMapId() > 749050502) {
                cm.saveLocation("FISHING");
            }
            cm.warp(749050500 + selection);
        }
        cm.dispose();
    }
}