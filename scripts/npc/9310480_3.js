/*
 *兑换
 */

var status = 0; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
	    abb = 1;
	    cm.sendGetText("您好,欢迎使用金币换取点卷服务。\r\n#b每5万金币可以兑换 1 点卷#k\r\目前点卷：#r"+cm.getPlayer().getCSPoints(1)+" #k点\r\n#r注：请输入点卷数量，最大不得超过1万点卷");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于1万。");
	    cm.dispose();
	} else if(cm.getText() > 10000){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于1万。");
	    cm.dispose();
	} else {
	    cm.sendYesNo("您好,欢迎使用金币换取点卷服务。\r\n兑换#r" + cm.getText() + "#k点卷将会使用掉您#r" + cm.getText() * 50000 + "#k金币\r\n请确认后使用。"); 
	    } 
        } else if (status == 2) { 
	if (cm.getPlayer().getMeso() >= cm.getText() * 50000) { 
		   cm.gainNX(cm.getText());
		   cm.gainMeso(-cm.getText() * 50000);
           cm.worldSpouseMessage(0x20,"[超值买卖金币换点] ：恭喜玩家 "+ cm.getChar().getName() +" 在【金币换点】处用 "+ cm.getText() * 50000 +" 金币√换了 "+ cm.getText() +" 点卷");
           cm.sendOk("#b成功增加了 #r" + cm.getText() + " #b点卷。");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的金币,请获取后使用.");
           cm.dispose();
	 }
      } 
   }
}