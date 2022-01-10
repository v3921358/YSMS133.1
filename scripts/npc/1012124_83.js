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
	    cm.sendGetText("\r\n- #b欢迎使用抵用卷增加HP.当前抵用卷：#r"+cm.getPlayer().getCSPoints(2)+" #k点\r\n#b抵用卷通过打怪获得，怪物掉落，市场挂机,抢楼等方式获得.\r\n\r\n#r每80点抵用卷增加1点最大HP值\r\n#r或者使用10点卷增加1点HP值，或者使用加智力点洗血\r\n\r\n#b提示：抵用与点卷并不是等值的，该功能爱用不用\r\n#b嫌贵请开通理财随身服务使用5点卷增加1点HP#k#n\r\n\r\n#r注：最大HP不能超过50万,否则出错该不负责\r\n\r\n#b请输入要增加HP的数量...\r\n ");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于1万。");
	    cm.dispose();
	} else if(cm.getText() > 10000){
	    cm.playerMessage(1,"单次输入的数字不能小于1。且不能大于1万。");
	    cm.dispose();
	} else {
	    cm.sendYesNo("您好,欢迎使用抵用卷增加血量.\r\n增加#r" + cm.getText() + "#k血量将会使用掉您#r" + cm.getText() * 80 + "#k抵用卷\r\n请确认后使用。"); 
	    } 
        } else if (status == 2) { 
		var getmaxhp = cm.getChar().getStat().getMaxHp();
	if (cm.getPlayer().getCSPoints(2) >= cm.getText() * 80) { 
		   cm.gainNX(2, -cm.getText() * 80);
		   cm.getChar().getStat().setMaxHp(getmaxhp+cm.getText() * 1,cm.getChar());
           cm.worldSpouseMessage(0x23,"[增加HP上限] ：恭喜玩家 "+ cm.getChar().getName() +" 使用 "+ cm.getText() * 80 +" 抵用卷增加了 "+ cm.getText() +" HP上限");
           cm.sendOk("成功增加了"+cm.getText()+"血量.换线或小退一下即可看到。");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的抵用卷,请获取后使用.");
           cm.dispose();
	 }
      } 
   }
}