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
	    cm.sendGetText("您好,欢迎使用点卷#e#r增加HP#n#k.每5点卷增加1点最大#e#rHP值#k#n。\r\n目前点卷：#r"+cm.getPlayer().getCSPoints(1)+" #k点\r\n#r注：请输入..最大HP不能超过50万,否则出错该不负责");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于10万。");
	    cm.dispose();
	} else if(cm.getText() > 100000){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于10万。");
	    cm.dispose();
	} else {
	    cm.sendYesNo("您好,欢迎使用点卷增加血量.\r\n增加#r" + cm.getText() + "#k血量将会使用掉您#r" + cm.getText() * 5 + "#k点卷\r\n请确认后使用。"); 
	    } 
        } else if (status == 2) { 
		var getmaxhp = cm.getChar().getStat().getMaxHp();
	if (cm.getPlayer().getCSPoints(1) >= cm.getText() * 5) { 
		   cm.gainNX(-cm.getText() * 5);
		   cm.getChar().getStat().setMaxHp(getmaxhp+cm.getText() * 1,cm.getChar());
           cm.worldSpouseMessage(0x24,"[增加HP上限] ：恭喜玩家 "+ cm.getChar().getName() +" 在随身NPC中用 "+ cm.getText() * 5 +" 点卷增加了 "+ cm.getText() +" HP上限");
           cm.sendOk("成功增加了"+cm.getText()+"血量.换线或小退一下即可看到。");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的点卷,请获取后使用.");
           cm.dispose();
	 }
      } 
   }
}