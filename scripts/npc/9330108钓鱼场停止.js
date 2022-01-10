/* 
	自由市场进入钓鱼的NPC
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
        cm.sendSimple("你想去哪里钓鱼呢？\r\n#b#L0# 外层空间钓鱼场#l\r\n#l#k");
    } else if (status == 1) {
        if (selection <= 2 && selection >= 0) {
            if (cm.getPlayer().getMapId() < 749050500 || cm.getChannelServer().getChannel() == 1) {
                cm.saveLocation("FISHING");
            cm.warp(749050500 + selection);
               } 
        cm.sendOk("#e#b钓鱼只在1频道开放.请更换1频道.\r\n#e#b请在钓鱼厨师哪里购买鱼饵跟鱼竿.#k\r\n#e#r注意：每天只能钓鱼4小时从进入场地计算出去不计时 #k");
        cm.dispose();
    }
    }
}