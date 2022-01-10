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
var text = "#h0# 欢迎来到" + cm.getServerName() +" #k,先来大概了解一下本服特色：\r\n\r\n";

				text += "· #e#d本服为仿官 爆率设置：经验50倍  金币10倍  爆率5倍\r\n";
				text += "· #b#n问:为什么别的F倍率那么高,我们F倍率那么低?答:我们F的倍率经过了精心的策划与测试,不是倍率高就好玩,爆的东西就多.请不要被一些垃圾F蒙蔽了双眼.\r\n";
				text += "· #r主菜单在拍卖按钮(或者输入@NPC),和市场里的NPC可以提供各种便捷服务\r\n";
				text += "· #e#r新手出生将会送你:#v1142802##v1142310##v1003552##v1082433##v1052461##v1102441##v1072666##v1132154##v1152089##v2431402##v1002679##v1702224##v1050291##v1051357##v3010501##v1012057##v1022048##v1032024##v5150040##v5152053##v5150052##v5153015##v5152057##v5151036##v5211060##v5360015##v5060000##v2431092##v1102630##v2431402##v1112918#\r\n";
				text += "· 开放全职业创建。所有的怪物都会随机掉落#v4280000##v4280001##v2430112##v2028061##v2460003##v2290285##v2028062##v2028062##v4310088##v2431887##v2431174##v2431738##v2431738##v4310057##v4001832##v4310129##v4032579##v4032580##v4032581##v4032582##v4032583##v4032584##v4032585##v4032586##v4032587##v4000313##v4004000##v4004001##v4004002##v4004003##v4001244#\r\n";
				//text += "· 开放转生功能,每次转生可获得全属性+5,每次飞升可获得全属性+100\r\n";
				text += "· 各种仿官方流程副本趣味活动丰厚奖励,尽享游戏欢乐,强力的等级奖励,各种独有副本-吊丝.土豪.上班族的天堂\r\n";
				text += "\r\n\r\n更多精彩,敬请期待!";
				cm.sendNextS(text, 1);
            }
		} else if (status == 1) {
			cm.sendNext("为帮助您能顺利成长,我们准备了新手礼包给您:" + "\r\n\r\n#t3010145# × 1\r\n#t2430241# × 1");
		} else if (status == 2) {
			cm.gainItem(3010145, 1);	// 周年庆水晶枫叶椅子
			cm.gainItem(2430154, 1);	// 新手礼包
			//cm.gainMeso(100000);
			//cm.warp(50000, 0);
			//cm.useItem(2003519);
			Operate(cm.getJob());
			text = "现在直接去消灭蜗牛升至10级,开始你的冒险之旅吧~ \r\n请勿重复点击该NPC，否则需要使用#r@ea#k解卡。\r\n#r【需要帮助的话可以点击拍卖按钮查看主菜单】";
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