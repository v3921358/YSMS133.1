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
	    cm.sendGetText("您好,欢迎使用点卷换取抵用卷.每1点卷换取10点抵用卷。\r\n目前点卷：#r"+cm.getPlayer().getCSPoints(1)+" #k点  目前抵用卷：#r"+cm.getPlayer().getCSPoints(2)+" #k点\r\n#r注：请输入想要兑换的数量");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于10万。");
	    cm.dispose();
	} else if(cm.getText() > 100000){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于10万。");
	    cm.dispose();
	} else {
	    cm.sendYesNo("您好,欢迎使用点卷换取抵用卷.\r\n换取#r" + cm.getText() * 10 + "#k抵用卷将会使用掉您#r" + cm.getText() + "#k点卷\r\n请确认后使用。"); 
	    } 
        } else if (status == 2) { 
		var getmaxhp = cm.getChar().getStat().getMaxHp();
	if (cm.getPlayer().getCSPoints(1) >= cm.getText()) { 
		   cm.gainNX(1, -cm.getText());
		   cm.gainNX(2, cm.getText() * 10);
           cm.worldSpouseMessage(0x20,"[点卷购买抵用卷] ：恭喜玩家 "+ cm.getChar().getName() +" 使用 "+ cm.getText()  +" 点卷换取了 "+ cm.getText() * 10 +" 抵用卷。");
           cm.sendOk("成功增加了"+cm.getText() * 10 +"抵用卷.请查收。");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的点卷,请获取后使用.");
           cm.dispose();
	 }
      } 
   }
}