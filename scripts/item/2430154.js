
var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒
var RMB = 0;
var PayLogPoints = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (im.getMapId() == 180000001) {
            im.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            im.dispose();
        } 
    else if (status == 0) {
		var time = im.getPlayer().getTodayOnlineTime();
		RMB = im.getRMB();
		var selStr = "#r[提示]： #e#b欢迎使用新手说明书：#k#n\r\n";
		//selStr += "#d您今天在线时长为： #r" + time + "#k #d分钟  累计充值金额： #r" + RMB + "#b 元#k\r\n";
		//selStr += "#b可用余额为： #r"+ im.getPay(1) +"#b 元  #b目前点卷： #r" + im.getPlayer().getCSPoints(1) + "#k #b点\r\n";
		//selStr += "#b目前抵用卷：#r" + im.getPlayer().getCSPoints(2) + "#k #b点 当前云朵：#r"+im.getPlayerPoints()+"#k #b点\r\n\r\n";
		selStr += "#b#L5#"+ttt6+" 1). 【新手必看快速明白玩法】#l\r\n";
		selStr += "#r#L0#"+ttt6+" 2). 【我该如何变强变厉害】#l\r\n";
		selStr += "#d#L2#"+ttt6+" 3). 【我该如何快速提升等级】#l\r\n";
		selStr += "#b#L1#"+ttt6+" 4). 【赞助充值有什么好处】#l\r\n";
		selStr += "#r#L3#"+ttt6+" 5). 【加入本服玩家交流群】#l\r\n";
		//selStr += "#d#L4#"+ttt6+" 6). 【本服拥有哪些特色服务】#l\r\n";
		//selStr += "#b#L6#"+ttt4+" 7). #e#b打开充值#n#b(比例1:1000点卷)#k#l\r\n";		
		//selStr += "#r#L8#"+ttt6+" 7). 【为何我的宠物无法捡取物品】#l\r\n";
		selStr += "#d#L9#"+ttt6+" 6). 【不花钱高级装备的来源】#l\r\n";
		selStr += "#b#L10#"+ttt6+" 7). 【法弗纳150级武器材料出处】#l\r\n";
		selStr += "#r#L11#"+ttt6+" 8). 【游戏币点卷以及抵用卷来源】#l\r\n";
		selStr += "#d#L8#"+ttt6+" 9). 【Gm指导您如何经济来源】#l\r\n";
		selStr += "#b#L7#"+ttt6+"10). 【领取210级每日奖励】#l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
		im.setBossLog("新手2");
		im.sendOk("- #e#d如何变强变厉害：#n#k\r\n\r\n#b首先可以通过 #r基础超值礼包礼物箱 #b打开等级100级里面获得 105革命装备一套。150级领取低级贝勒德首饰1套，然后通过获得征服者币，或者现金点购买150装备。然后通过使用 #r魔方 #b来改变装备潜能，潜能推荐：#r全属性+20%、总伤害+12%、攻击力+12%、BOSS伤害+40%等等 #b然后还可以通过使用#r各类卷轴#b来提高装备属性,还可以使用 #r高级装备强化卷轴 #b来提升装备星级，另外还可以使用 #r一键潜能 #b来提升装备属性。这样是对您的面板提高有很大帮助的。另外，还有一些不懂的地方，请加入我们的玩家交流群：#r466126007#b 进行交流\r\n\r\n#r说明：(一键潜能只对点点会员玩家开放，价格昂贵，不建议玩家大量使用)#k");
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 对本服不了解查看了如何变强的说明书。");	
		im.dispose();
		break;
	case 1:
		im.setBossLog("新手4");
		im.sendOk("- #e#d赞助充值好处：#n#k\r\n\r\n#b赞助本服即可在（市场NPC甘迪）处领取首充礼包,例如充值100元,即可领取1-100元充值奖励.(相当于白送您很多礼物).详情请点击 #r拍卖>- 充值奖励 - 累计充值奖励 #b进行查看充值赠送。\r\n\r\n#r说明：首冲礼包只赠送7天，公测7天之后不再赠送#k");
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 对本服不了解查看了赞助的好处。");	
		im.dispose();
		break; 
	case 2:
		im.setBossLog("新手3");
		im.sendOk("- #e#d如何快速提升等级：#n#k\r\n\r\n#d1-100级可以通过万能传送，按照等级推荐地方进行练级。100级之后可以通过副本消灭小日本来进行组队练级。当等级高了后，可以通过其他副本或者boss来提升等级。");	
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 对本服不了解查看了如何快速提升等级。");
		im.dispose();
		break; 
        case 3:
		im.setBossLog("新手5");
		im.sendOk("\t\t#b#e玩家交流群：#r466126007#k#n\r\n\r\n- #e#d加群好处：#k#n\r\n\r\n#d1). 本服拥有一些线下活动，比如QQ群里发红包.\r\n#b2). 玩家求助，求带boss，求带副本，收购装备等等.\r\n#r3). Gm举行活动、游戏维护会在第一时间了解.\r\n#b4). 玩家有对游戏不了解的可以及时提问.\r\n#d5). 群活跃等级升级奖励，群活跃升到Lv.3可以领取5000点卷\r\n群活跃升级到Lv.4可以领取1万点卷，群活跃升级到Lv.5可以领取1万5点卷，群活跃升级到Lv.6可以领取2万点卷。");
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 对本服不了解查看了加入玩家交流群的好处。");
		im.dispose();
		break;
        case 4:
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 对本服不了解登录本服官网获得许多帮助。");
		im.dispose();
		im.openWeb("http://www.cca15.com/help/");
		break; 
        case 5:
		im.setBossLog("新手1", 1);
		im.sendOk("#g1). #e#d问：#k#n#b本服的常用指令有哪些？\r\n    #d#e答：#n#r商城按钮可以打开万能NPC和商城。@fm 返回市场 @ea 解除假死 @fh 死亡复活 @help 查看帮助，其他的详情请输入@help里面查看，GM在这里不多介绍了。#k\r\n#g2). #e#d问：#k#n#b为何我打怪物只有掉 1 HP？\r\n    #d#e答：#n#r怪物有带★的标识表示为需要星之力的才可以打的动。\r\n#g3). #e#d问：#k#n#b星之力、咒语痕迹如何获得？\r\n    #d#e答：#n#r通过世界怪物掉落，也可以通过一些副本获得。还可以通过充值赠送以及充值购买。\r\n#g4). #e#d问：#k#n#b为何我的宠物无法捡取物品？\r\n    #d#e答：#n#r打开装备栏，默认是E键，点一下宠物，勾选上宠物捡取道具技能，宠物即可捡取物品了。");
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 对本服不了解查看了玩法介绍。");
		im.dispose();
		//im.openWeb("http://www.cca15.com/help/");
		break;
        case 6:
		im.dispose();
		im.openWeb("http://www.libaopay.com/buy/?wid=60889");
		break;
        case 7:
	if (im.getBossLog("210级奖励") < 1 && im.getLevel() > 209) {
		im.gainItem(4001839, 1000);//星星
		im.gainItem(5062500, 50);
		im.gainItem(5062010, 50);
		im.setBossLog("210级奖励");
		im.sendOk("- #e#d成功领取 210 级的等级奖励：#n#k\r\n\r\n#r#i4001839# #z4001839# x 1000\r\n#i5062010# #z5062010# x 50\r\n#i5062500# #z5062500# x 50");
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 从写给我的信处领取了每日 210 级的等级奖励。");
		im.dispose();
	} else {
		im.sendOk("失败：\r\n\r\n#r1). 您已经领取过。\r\n2). 等级不足210,无法领取。\r\n\r\n#i4001839# #z4001839# x 1000\r\n#i5062010# #z5062010# x 50\r\n#i5062500# #z5062500# x 50");
		im.dispose();
            }
		break;
        case 8:
		im.sendOk("- #e#dGm指导您如何经济来源：#n#k\r\n\r\n#b不愿意花钱。点卷的来源先就打怪捡取一些神秘之冰，和恭喜发财4个字符,字符拿去换金币。神秘之冰开魔方和征服者币,因为你100级的等级奖励有一套105的革命装备,可以用好久了,金币可以到市场天使MM处兑换点卷。另外怪物会掉落抵用卷商品卡，打死怪物也有1点抵用卷，抵用卷可以购买高级装备。神秘之冰开出来的星星，可以进行星之力强化，必须要把装备的可升级次数用完才可以强化上星。");
		im.worldSpouseMessage(0x14,"『新手认证书』：玩家 "+ im.getChar().getName() +" 从写给我的信查看了Gm指导如何经济来源。");
		im.dispose();
		break;
        case 9:
		im.setBossLog("新手6");
		im.sendOk("- #e#d高级装备的来源：#n#k\r\n\r\n#b GM提示：点点装备靠打BOOS和副本获得，鲁塔比斯防具暂时只能通过现金购买。 游戏设置高级BOSS直接掉落，也可以使用 #r征服者币、麦格拉斯币、贝勒德币#b 兑换，世界怪物打死后均可获得抵用卷，还能掉落抵用卷商品卷，，也可以是使用点卷购买少部分装备，也可以使用明星转盘来抽取。或者充值赠送的也有。150的武器也可以通过材料来制作。也可以通过每日签到积分兑换\r\n140装备来源：征服者币兑换，幸运抽奖，希纳斯女皇，北仑\r\n皮埃尔，血腥女王掉落。\r\n");
		im.dispose();
		break;
        case 10:
		im.setBossLog("新手7");
		im.sendOk("- #e#d法弗纳武器材料出处：#n#k\r\n\r\n#b1). 强烈的灵魂净水，时间之石，纯洁的灵魂火花， 这3个扎昆，女皇，PB，黑龙等掉落。\r\n2). 僵尸丢弃的金牙这个打矿洞僵尸掉落\r\n3). 战甲吹泡泡鱼内存卡这个打玩具塔4层影藏塔掉落\r\n4). 斗神证物，扎昆，黑龙均有掉落\r\n5). 梦之石这个需要打PB掉落\r\n6). 正义火种这个打希纳斯女皇掉落\r\n7). 运动会币这个做米纳尔森林保卫战通关奖励.\r\n");
		im.dispose();
		break;
        case 11:
		im.setBossLog("新手8");
		im.sendOk("- #e#d点卷的来源：#n#k\r\n#b1). 通过每小时35分时候挤奶获得。\r\n2). 通过每小时40分答题获得。\r\n3). 通过在市场泡点获得。\r\n4). 通过金币兑换获得或通过充值获得。\r\n5). 通过抢楼获得。\r\n- #e#d抵用卷的来源：#n#k\r\n#b1). 通过打怪以及怪物掉落抵用卷商品卡获得。\r\n2). 通过每小时40分答题获得。\r\n3). 通过市场泡点以及寻宝里面获得。\r\n4). 通过抢楼获得。\r\n- #e#d冒险币的来源：#n#k\r\n#b1). 通过怪物掉落获得。\r\n2). 通过玩家之间交易盈利。");
		im.dispose();
		break;









}
    }
}
