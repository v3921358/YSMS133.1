/*
	功能：新手入场帮助提示
	日期：2013-11-23
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
            if (!cm.MissionStatus(cm.getPlayer().getId(), 10000, 0, 4)) {//查看接了没
                cm.MissionMake(cm.getPlayer().getId(), 10000, 0, 0, 0, 0)
            }
            if (!cm.MissionStatus(cm.getPlayer().getId(), 10000, 0, 0) && cm.getLevel() <= 10) {//如果没完成且角色等级小于等于10级
                cm.MissionFinish(cm.getPlayer().getId(), 10000);
				text = "#h0# 欢迎来到" + cm.getServerName() + "#k,先来大概了解一下本服特色：\r\n\r\n";
				text += "· 本服为仿官方模式\r\n";
				text += "· 爆率设置：经验50倍  金币30倍  爆率10倍\r\n";
				text += "· 主菜单在拍卖按钮和(商城按钮),提供各种便捷服务\r\n";
				//text += "· 开放全职业,完美修复技能。BOSS掉落魔方.防爆.突破之石\r\n";
				//text += "· 每日签到，猜数字以及魔法点都可以助您快速获得极品装备\r\n";
				//text += "· 开放转生功能,每次转生可获得全属性+5,每次飞升可获得全属性+100\r\n";
				text += "· 各种仿官方流程副本趣味活动丰厚奖励,尽享游戏欢乐\r\n";
				text += "\r\n\r\n更多精彩,敬请期待!";
				cm.sendNextS(text, 1);
            }
		} else if (status == 1) {
			cm.sendNext("为帮助您能顺利成长,我们准备了新手说明书给您:" + "\r\n\r\n#t2430154# × 1不看说明书您是无法出去的哦\r\n");
		} else if (status == 2) {
			cm.gainItem(2430154, 1);	// 周年庆水晶枫叶椅子
			//cm.gainItem(2430241, 1);	// 新手礼包
			//cm.gainMeso(100000);
			//cm.warp(50000, 0);
			//cm.useItem(2003519);
			Operate(cm.getJob());
			text = "现在直接去背包消耗栏阅读新手认证说明书,不看完您是无法出去的哦，开始您的冒险之旅吧~ \r\n请勿重复点击该NPC，否则需要使用#r@ea#k解卡。\r\n#r【需要帮助的话可以点击拍卖按钮查看主菜单】";
			cm.sendOk(text);
			cm.dispose();
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
            cm.sendY("赠送给你 >>> 火光武器箱 一个，可以根据你的角色等级获取相应的道具！")
            break;
    }
}

function equip(itemId) {
    var item = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).findById(itemId);
    if (item == null) {
        cm.gainItem(itemId, 1);
    }
    var item2 = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).findById(itemId);
    //查找玩家背包有没有这个物品,没有就给玩家
    if (item2 != null) {
        var pos = item2.getPosition();
        Packages.server.MapleInventoryManipulator.equip(cm.getC(), pos, -10);
    }
}