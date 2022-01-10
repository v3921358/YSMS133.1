
var status = 0;
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
		var selStr = "#r[●ω●提示]： #e#b欢迎使用新手说明书：#k#n\r\n";
		selStr += "#b#L5#"+ttt6+" 1). 【本私服的玩法介绍】#l\r\n";
		selStr += "#r#L0#"+ttt6+" 2). 【我该如何变强变厉害】#l\r\n";
		selStr += "#d#L2#"+ttt6+" 3). 【我该如何快速提升等级】#l\r\n";
		selStr += "#b#L1#"+ttt6+" 4). 【赞助充值有什么好处】#l\r\n";
		selStr += "#r#L3#"+ttt6+" 5). 【加入本服玩家交流群】#l\r\n";
		selStr += "#d#L4#"+ttt6+" 6). 【本服拥有哪些特色服务】#l\r\n";
		selStr += "#b#L7#"+ttt6+" 7). 【领取220级每日魔方抵用卷奖励】#l\r\n";
		selStr += "#r#L8#"+ttt6+" 8). 【为何我的宠物无法捡取物品】#l\r\n";
		selStr += "#d#L9#"+ttt6+" 9). 【不花钱高级装备的来源】#l\r\n";
		selStr += "#b#L10#"+ttt6+"10). 【法弗纳150级武器材料出处】#l\r\n";
		selStr += "#r#L11#"+ttt6+"11). 【游戏币点卷以及抵用卷来源】#l\r\n";
		cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
		cm.sendOk("- #e#d如何变强变厉害：#n#k\r\n\r\n#b首先可以通过 #r特殊超值礼包礼物箱 #b打开等级等级奖励里面获得奖励，新手成长奖励 在自由市场 【NPC 财神】 领取成长奖励，升级不要忘记成长领取奖励哦 ，等级100级奖励可以获得，105革命装备一套。然后通过做【阿里安特副本】获得征服者币，或者使用 【点卷，抵用卷】购买140装备，或者150装备。然后通过使用 #r魔方 #b来改变装备潜能，潜能推荐：#r全属性+20%、总伤害+12%、攻击力+12%、BOSS伤害+40%等等 #b然后还可以通过使用#r各类卷轴#b来提高装备属性,还可以使用 #r高级装备强化卷轴 #b来提升装备星级，另外还可以使用拍卖》【我要变强】  #r装备合成系统 #b来提升装备属性。这样是对您的面板提高有很大帮助的。另外，还有一些不懂的地方，请加入我们的玩家交流群：#r 730662#b 进行交流");
		cm.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ cm.getChar().getName() +" 对本服不了解查看了如何变强的说明书。");	
		cm.dispose();
		break;
	case 1:
		cm.sendOk("- #e#d赞助充值好处：#n#k\r\n\r\n#b赞助本服十元即可在拍卖菜单#r 福利活动 #b处领取首充礼包,【全属性+1蓝调戒指1个】例如充值100元,即可领取10-100元充值奖励.(相当于白送,充值点卷还在).详情请点击 #r拍卖》充值奖励 - 累计充值奖励 #b进行查看充值赠送。");
		cm.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ cm.getChar().getName() +" 对本服不了解查看了赞助的好处。");	
		cm.dispose();
		break; 
	case 2:
		cm.sendOk("- #e#d如何快速提升等级：#n#k\r\n\r\n#d1-100级可以通过万能传送，按照等级推荐地方进行练级。当等级高了后，可以通过其他副本或者boss来提升等级。");	
		cm.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ cm.getChar().getName() +" 对本服不了解查看了如何快速提升等级。");
		cm.dispose();
		break; 
        case 3:
		cm.sendOk("\t\t#b#e玩家交流群：#r 730662 #k#n\r\n\r\n- #e#d加群好处：#k#n\r\n\r\n#d1). 本服拥有一些线下活动.\r\n#b2). 玩家求助，求带boss，求带副本，收购装备等等.\r\n#r3). Gm举行活动、游戏维护会在第一时间了解.\r\n#b4). 玩家有对游戏不了解的可以及时提问.\r\n#d5). 群活跃等级升级奖励，群活跃升到Lv.3可以领取5000点卷\r\n群活跃升级到Lv.4可以领取1万点卷，群活跃升级到Lv.5可以领取1万5点卷，群活跃升级到Lv.6可以领取2万点卷。");
		cm.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ cm.getChar().getName() +" 对本服不了解查看了加入玩家交流群的好处。");
		cm.dispose();
		break;
        case 4:
		cm.sendOk("本服活动多多，副本多多，趣味多多。");
		cm.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ cm.getChar().getName() +" 对本服不了解登录本服官网查看新闻。");
		cm.dispose();
		break; 
        case 5:
		cm.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ cm.getChar().getName() +" 对本服不了解登录本服官网查看新闻。");
		cm.dispose();
		cm.openWeb("http://www.168e8.cn");
		break;
        case 7:
	if (cm.getBossLog("225级奖励") < 1 && cm.getLevel() > 224) {
		cm.gainItem(5062000, 10);
		cm.gainItem(5062002, 10);
		cm.gainItem(5062009, 5);
	    cm.gainItem(2431739, 2);
		cm.setBossLog("225级奖励");
		cm.sendOk("- #e#d成功领取 225 级的等级奖励：#n#k\r\n\r\n#r#i5062000# #z5062000# x 10\r\n#i5062009# #z5062009# x 5\r\n#i5062002# #z5062002# x 10\r\n#i2431739# #z2431739# x 2");
		cm.worldSpouseMessage(0x14,"『写给我的信』：玩家 "+ cm.getChar().getName() +" 从写给我的信处领取了每日 220 级的等级奖励。");
		cm.dispose();
	} else {
		cm.sendOk("失败：\r\n\r\n#r1). 您已经领取过。\r\n2). 等级不足225,无法领取。\r\n\r\n#i5062000# #z5062000# x 10\r\n#i5062009# #z5062009# x 5\r\n#i5062002# #z5062002# x 10\r\n#i2431739# #z2431739# x 2");
		cm.dispose();
            }
		break;
        case 8:
		cm.sendOk("- #e#d宠物捡取物品设置：#n#k\r\n\r\n#b打开装备栏，默认是E键，点一下宠物，勾选上宠物捡取道具技能，宠物即可捡取物品了。");
		cm.dispose();
		break;
        case 9:
		cm.sendOk("- #e#d高级装备的来源：#n#k\r\n\r\n#b  游戏设置高级BOSS直接掉落，也可以使用 #r征服者币#b 兑换，世界怪物打死后均可获得抵用卷，可以使用抵用卷购买，也可以是使用点卷购买。也可以使用高级转蛋机和NPC金利奇抽取，或者充值转盘抽取。150的武器也可以通过材料来制作。也可以通过每日签到积分兑换\r\n140，150装备来源：征服者币兑换，抽奖，希纳斯女皇，\r\n皮埃尔，北仑，暴君 贝勒德 等均有掉落。可以使用点卷和抵用卷在市场NPC【亚敏】处购买\r\n");
		cm.dispose();
		break;
        case 10:
		cm.sendOk("- #e#d法弗纳武器材料出处：#n#k\r\n\r\n#b1). 强烈的灵魂净水，时间之石，纯洁的灵魂火花， 这3个扎昆，女皇，PB，黑龙等掉落。\r\n2). 僵尸丢弃的金牙这个打矿洞僵尸掉落\r\n3). 战甲吹泡泡鱼内存卡这个打玩具塔4层影藏塔掉落\r\n4). 斗神证物，扎昆，黑龙均有掉落\r\n5). 梦之石这个需要打PB掉落\r\n6). 正义火种这个废弃组队任务获得，每日累计在线时间奖励获得\r\n7). 运动会币这个，金利奇抽奖 和 做米纳尔森林保卫战通关奖励.\r\n");
		cm.dispose();
		break;
        case 11:
		cm.sendOk("- #e#d点卷的来源：#n#k\r\n#b1). 通过在线泡点获得。\r\n2). 通过每小时挤牛奶获得。\r\n3). 通过副本活动获得。\r\n4). 通过VIP会员随身盒子金币兑换点卷获得或通过充值获得。\r\n- #e#d抵用卷的来源：#n#k\r\n#b1). 通过打怪以及怪物掉落抵用卷商品卡获得。\r\n2). 通过在线泡点获得。\r\n3). 通过副本获得。\r\n4).通过任务获得.\r\n5).通过每日累计在线时间奖励获得.\r\n- #e#d冒险币的来源：#n#k\r\n#b1). 通过怪物掉落获得。\r\n2). 通过副本#r(天空庭院)#b获得。\r\n3). 通过玩家之间交易盈利。\r\n4).通过red币兑换获得");
		cm.dispose();
		break;

}
    }
}
