/* 
	�����г���������NPC
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
        cm.sendSimple("����ȥ��������أ�\r\n#b#L0# ���ռ���㳡#l\r\n#l#k");
    } else if (status == 1) {
        if (selection <= 2 && selection >= 0) {
            if (cm.getPlayer().getMapId() < 749050500 || cm.getChannelServer().getChannel() == 1) {
                cm.saveLocation("FISHING");
            cm.warp(749050500 + selection);
               } 
        cm.sendOk("#e#b����ֻ��1Ƶ������.�����1Ƶ��.\r\n#e#b���ڵ����ʦ���ﹺ����������.#k\r\n#e#rע�⣺ÿ��ֻ�ܵ���4Сʱ�ӽ��볡�ؼ����ȥ����ʱ #k");
        cm.dispose();
    }
    }
}