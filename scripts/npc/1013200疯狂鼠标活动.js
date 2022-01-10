var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //获得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
var day = ca.get(java.util.Calendar.DATE);//获取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
var status = -1;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {   
	if (mode == -1) {
		cm.dispose();
	}else {
        if (status >= 0 && mode == 0) {
		   cm.dispose();
		   return;                    
		}
		if (mode == 1) {
		   status++;
		}else {
		   status--;
		}
		if (status == 0) {
			weekday-=1;
			var text = "-- 亲爱的玩家 #r#h ##k  你好啊\r\n#r周五、周六、周日#k晚上的#b08:05至08:08#k可以参与疯狂鼠标活动\r\n#k每点一次鼠标必定获得下列道具奖励\r\n#r点券 x 5点\t\t\t\t金币 x 10000\r\n#z4001839# x 5个\t\t\t\t#z4310030# x 2个\r\n#z4310036# x 2个\r\n#k还有几率获得#b#z4032733#,#z2610001#,#z2430069#,#z5062009#,#z5062002#,#z5062500#,#z5062010#,#z4001713#,#z5064000#,#z2340000#,#z4001714#,#z2049142#,#z2049135#,#z2049135#,#z2049137#,#z2049138#,#z2049116#哦！#k\r\n#r温馨提示：请多备1个鼠标哦！哈哈哈哈哈哈";
			//text = "今晚9点至9点05分，4倍收益，抄点";
			if(hour == 20 && (minute >= 5 && minute <= 8) && (weekday == 6 || weekday == 5 || weekday == 0)){// || cm.getPlayer().getName() == "管理员哈士奇"){
				var random = Math.floor(Math.random()*4000);
				//if (random == 999)
				if (random >= 800 && random <= 999) {
				
					cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 额外获得【封印解除卷】一张。", 5120012);
					cm.worldSpouseMessage(0x15, "[疯狂鼠标] : 恭喜 【" + cm.getChar().getName() + "】 在狂点鼠标的时候额外获得【封印解除卷】一张.");
					cm.gainItem(2610001, 1);
				} else if (random >= 1000 && random <= 1250) {
				
					cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 额外获得【宝箱】一个。", 5120012);
					cm.worldSpouseMessage(0x15, "[疯狂鼠标] : 恭喜 【" + cm.getChar().getName() + "】 在狂点鼠标的时候额外获得【宝箱】一个.");
					cm.gainItem(2430069, 1);
				} else if (random >= 1300 && random <= 1550) {
				
					cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 额外获得【宝箱】一个。", 5120012);
					cm.worldSpouseMessage(0x15, "[疯狂鼠标] : 恭喜 【" + cm.getChar().getName() + "】 在狂点鼠标的时候额外获得【彩虹枫叶】5个.");
					cm.gainItem(4032733, 5);
				} else if (random >= 1600 && random <= 1850) {
				
					cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 额外获得【宝箱】一个。", 5120012);
					cm.worldSpouseMessage(0x15, "[疯狂鼠标] : 恭喜 【" + cm.getChar().getName() + "】 在狂点鼠标的时候额外获得【爱心宝石】10个.");
					cm.gainItem(4001465, 10);


				} else if (random >= 2000 && random <= 3500) {
					var itemList = Array(5062009,5062009,5062009,5062500,5062009,5062009,5062500,5062009,5062002,5062500,5062010,4001713);
					var itemIdx = Math.floor(Math.random()*itemList.length);
					cm.worldSpouseMessage(0x15, "[疯狂鼠标] : 恭喜 【" + cm.getChar().getName() + "】 在狂点鼠标的时候额外获得【"+cm.getItemName(itemList[itemIdx])+"】一个.");
					cm.gainItem(itemList[itemIdx], 1);

				} else if (random >= 3600 && random <= 3999) {
					var itemListj = Array(5064000,2340000,4001714,2049142,2049135,2049135,2049137,2049138,2049116);
					var itemIdx = Math.floor(Math.random()*itemListj.length);
					cm.worldSpouseMessage(0x15, "[疯狂鼠标] : 恭喜 【" + cm.getChar().getName() + "】 在狂点鼠标的时候额外获得【"+cm.getItemName(itemListj[itemIdx])+"】一个.");
					cm.gainItem(itemListj[itemIdx], 1);
				}
				cm.gainNX(5);//点卷5点
				cm.gainMeso(10000);//金币1W
				cm.gainItem(4001839,5);//星星
				//cm.gainItem(4001465,1);//爱心宝石
				cm.gainItem(4310030,2);//运动会币
				cm.gainItem(4310036,2);//征服者币
				//cm.gainItem(4032733,1);//彩虹枫叶
				cm.dispose();
			} else {
				cm.sendOk(text);
				cm.dispose();
			}
		}
	}
}
