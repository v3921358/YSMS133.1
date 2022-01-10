/*
 *R.E.D币兑换
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
	    cm.sendGetText("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好,欢迎使用R.E.D币兑换.\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##v4310088#1 : 1#v4001126#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#目前R.E.D币：#r"+cm.itemQuantity(4310088)+" #k个\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r注：请输入消耗的#bR.E.D币#r数量来兑换#b枫叶");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"输入的数字不能小于1。");
	    cm.dispose();
	} else {
	    cm.sendYesNo("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#亲爱的#r#h ##k您好,欢迎使用R.E.D币兑换.\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#使用#r" + cm.getText() + "#k#v4310088#R.E.D币\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/reward#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#兑换#r" + cm.getText() + "#k#v4001126#枫叶"); 
	    }
        } else if (status == 2) { 
	if (cm.itemQuantity(4310088) >= cm.getText()) { 
	   cm.gainItem(4310088,-cm.getText());
	   cm.gainItem(4001126,cm.getText());
           cm.sendOk("兑换成功,请注意查收.\r\n"+ cm.getText() +" #v4310088#R.E.D币 兑换了 "+ cm.getText() +" #v4001126#枫叶");
           cm.dispose();
        } else {
           cm.sendOk("您没有足够的R.E.D币,请多加努力.");
           cm.dispose();
	 }
      } 
   }
}