/*
	功能：新手入场帮助提示
	日期：2013-11-23
	作者：输了爱
*/

var status = 0;
var text;
function start () {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == 0) {
            if (cm.getLevel() <= 100) {//如果没完成且角色等级小于等于10级
				text = "#h0# 欢迎来到" + cm.getServerName() + "#k,先来大概了解一下本服特色：\r\n\r\n";
				text += "· 本服为仿官方模式\r\n";
				text += "· 爆率设置：经验2倍  金币5倍  爆率5倍\r\n";
				text += "· 主菜单在拍卖按钮(商城按钮旁边),提供各种便捷服务\r\n";
				text += "· 开放全职业,完美修复技能。BOSS掉落魔方.防爆.\r\n";
				text += "· 每日签到，猜数字以及魔法点都可以助您快速获得极品装备\r\n";
				//text += "· 开放转生功能,每次转生可获得全属性+5,每次飞升可获得全属性+100\r\n";
				text += "· 各种仿官方流程副本趣味活动丰厚奖励,尽享游戏欢乐\r\n";
				text += "\r\n\r\n更多精彩,敬请期待!";
				cm.sendNextS(text, 1);
            }else {
				cm.sendOk("我将给予您获推广大礼包奖励和VIP等级提升");
				cm.dispose();
		}
		} else if (status == 1) {
			cm.sendNextS("为帮助您能顺利成长,我们准备了新手礼包给您:" + "快捷服务可以打开特殊物品中的\r\n#t5530346#",1);
		} else if (status == 2) {
			cm.gainItem(3010145, 1);// 周年庆水晶枫叶椅子
			cm.gainItem(2430241, 1);//可爱新手礼物套装
                                                cm.gainItem(2430251, 1);//拍卖箱子
                                                cm.gainMeso(100000);
			Operate(cm.getJob());
			cm.worldSpouseMessage(0x20,"『新手驾到』：恭喜玩家 "+ cm.getChar().getName() +" 来到了鱼泡泡独家怀旧岛。热烈祝贺他(她)吧。");
cm.worldSpouseMessage(0x20,"『新手驾到』：恭喜玩家 "+ cm.getChar().getName() +" 来到了鱼泡泡独家怀旧岛。热烈祝贺他(她)吧。");
cm.worldSpouseMessage(0x20,"『新手驾到』：恭喜玩家 "+ cm.getChar().getName() +" 来到了鱼泡泡独家怀旧岛。热烈祝贺他(她)吧。");
			cm.warp(100000000);
			cm.dispose();
			//text = "现在直接去消灭蜗牛升至10级,开始你的冒险之旅吧~ \r\n请勿重复点击该NPC，否则需要使用#r@ea#k解卡。\r\n#r【需要帮助的话可以点击拍卖按钮查看主菜单】";
			//cm.sendNextS(text,1);
		}
	}
}




function Operate(job) {
    switch (job) {
        case 6001://爆莉萌天使
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)//升到10级
            cm.gainItem(1222000, -1);//删除原始道具
            equip(1352600)//佩戴灵魂手镯
            cm.changeJob(6500);
            cm.gainItem(2431305, 1);
			cm.worldSpouseMessage(0x12,"赠送给你 >>> 火光武器箱 一个，可以根据你的角色等级获取相应的道具！");
            break;
    }
}

function equip(itemId) {
    if (!cm.haveItem(itemId, 1, true, true)) {
        cm.gainItem(itemId, 1);
    }
    //查找玩家背包有没有这个物品,没有就给玩家
    cm.gainItemAndEquip(itemId, -10);
}
