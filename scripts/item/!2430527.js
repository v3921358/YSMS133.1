function start() {
        im.gainItem(2430527, -1);
	im.gainPlayerPoints(1000);
	im.playerMessage(-1, "『银票』： 获得了 1000 金的银票。当前已有 " + im.getPlayerPoints() + " 金的银票。");
	im.worldSpouseMessage(0x20,"『银票』：恭喜玩家 "+ im.getChar().getName() +" 获得了 1000 金的银票。当前已有 " + im.getPlayerPoints() + " 金的银票。");
        im.dispose(); 
}