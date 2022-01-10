var status = 0;
var typed=0;
var random1 = java.lang.Math.floor(Math.random() * 1000 + 1);
var random2 = java.lang.Math.floor(Math.random() * 3000 + 1);
var aa ="#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		im.dispose();
	} else {
		if (mode == 0 && status == 0) {
			im.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { 
			im.sendSimple(""+aa+"\r\n\r\n#b亲爱的#r#h ##k#b您好，使用我可以突破破功上限100万哟：\r\n\r\n\r\n#L3##r" + ttt6 + " [武器]伤害上限突破#l");
		} else if (status == 1) {
			if (selection == 1) {
			im.sendOk("亲爱的#r#h ##k您好,我是伤害上限突破系统简介:\r\n  使用道具: 当前职业对应等级武器 \r\n  使用点卷: 任何武器都可以伤害上限突破 \r\n\r\n\r\n\r\n#r注：每把武器最多追加1亿伤害,超过后不予计算.");
                    	im.dispose();
			} else if (selection == 2) {
			if(im.getBossLog("火种突破",1) <= 10000000){
			if(im.haveItem(4033356, 5)){
			if (im.changeLimitBreak(random1)) {
			for(var i = 0; i < random1; i++){
			    im.setBossLog("火种突破",1);
			}
			    im.gainItem(4033356,-5);
    			    im.sendOk("#b伤害上限突破成功.\r\n\r\n本次追加伤害为：#r"+ random1 +"#b.");
			    im.worldSpouseMessage(0x20,"[伤害突破] 玩家 "+ im.getChar().getName() +" 使用 正义火种1 让武器伤害上限突破成功 本次追加 "+ random1 +" 伤害值 。");
			}else{
    			    im.sendOk("#b突破失败.\r\n系统为检测到角色身上装备武器.");
			}
    			    im.dispose();
			}else{
    			    im.sendOk("#b突破失败.\r\n需要 5个 正义火种1 才可以突破.");
    			    im.dispose();
			}
			}else{
    			    im.sendOk("#b突破失败.\r\n武器最高额外突破1000万伤害.");
    			    im.dispose();
			}
			} else if (selection == 3) {
			if(im.getBossLog("点卷突破1",1) <= 1000){
			if(im.haveItem(2430252, 1)){
				if (im.getLimitBreak() >= 100000000) {
				im.sendOk("目前只能突破1亿伤害。");
				im.dispose();
				return;
						}
			if (im.changeLimitBreak(1000000)) {
			    im.setBossLog("点卷突破1",1);
			    im.gainItem(2430252,-1);
    			    im.sendOk("#b伤害上限突破成功.\r\n\r\n本次追加伤害为：#r1000000#b.");
			    im.worldSpouseMessage(0x20,"[伤害突破] 玩家 "+ im.getChar().getName() +" 使用 香包 让武器伤害上限突破成功 本次追加 1000000 伤害值。");
			}else{
    			    im.sendOk("#b突破失败.\r\n系统未检测到角色身上装备武器.");
			}
    			    im.dispose();
			}else{
    			    im.sendOk("#b突破失败.\r\n需要 1 才可以突破.");
    			    im.dispose();
			}
			}else{
    			    im.sendOk("#b突破失败.\r\n武器最高额外突破1E伤害.");
    			    im.dispose();
			}
			}
	   }
      }
}