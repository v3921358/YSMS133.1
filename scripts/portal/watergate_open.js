/*
Stage 3: Exit Door - Guild Quest

@Author Lerk
*/

function enter(pi) {
    if (pi.getMap().getReactorByName("watergate").getState() == 1 || (pi.getPlayer().getEventInstance() != null && pi.getPlayer().getEventInstance().getProperty("stage3clear") != null && pi.getPlayer().getEventInstance().getProperty("stage3clear").equals("true"))) {
        pi.warp(990000600,0);
	pi.openNpc(9040000,3);//赠送个人积分
        return true;
    } else {
        pi.playerMessage("神秘的力量阻止着你的前进。");
        return false;
    }
}