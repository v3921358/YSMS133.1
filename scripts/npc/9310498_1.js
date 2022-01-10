/*function start() {
	cm.dispose();
	//cm.openNpc(9900002, 8);
	cm.openNpc(9270035, 2);
}*/


var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa ="#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";
var hwtext=new Array("人长得漂亮不如活得漂亮！","当裤子失去皮带，才懂得什麽叫做依赖。","烟不听话，所以我们'抽烟'。","你发怒一分钟，便失去60秒的幸福。","当男人遇见女人，从此只有纪念日，没有独立日。","路见不平一声吼，吼完继续往前走。","幸福是个比较级，要有东西垫底才感觉得到。","知识就像内裤，看不见但很重要","作为失败的典型，你实在是太成功了","女人喜欢长得坏坏的男人，不是喜欢长坏了的男人","跌倒了，爬起来再哭","你若流泪，先湿的是我的心","让未来到来，让过去过去","我自横刀向天笑，笑完之后去睡觉","别跟我谈感情，谈感情伤钱","孤单是一个人的狂欢，狂欢是一群人的孤单","姐不是收破烂的，做不到让你随喊随到","我不是草船，你的贱别往我这发","你的矮是终身的，我的胖却是暂时的","別在无聊的时候來找我，不然显得我是多余的","姐不是电视机，不要老是盯着姐看","即使你已名花有主、我也要移花接木","心里只有你一个频道 最可恨的是还没有广告","给你最大的报复，就是活的比你幸福","要不是老师说不能乱扔垃圾，不然我早把你扔出去","没有癞蛤蟆，天鹅也会寂寞","我是光棍我可耻，我给国家浪费纸","人生没有如果，只有后果和结果","你那么有钱 为什么不让鬼来推磨？","别把人和狗相提并论，狗最起码忠诚","生活嘛，就是生下来，活下去","当你披上了婚纱 我也披上了袈裟","趁着年轻把能干的坏事都干了吧，没几年了","我人生只会两件事 1 这也不会 2 那也不会","出租车司机，司机中的战斗机，噢耶! ","思想有多远，你就给我滚多远!","人生最大的悲哀是青春不在,青春痘却还在。","最简单的长寿秘决:保持呼吸，不要断气~","打死我也不说，你们还没使美人计呢!","不要和我比懒,我懒得和你比","我不是个随便的人 我随便起来不是人","不怕虎一样的敌人，就怕猪一样的队友","老虎不发威 你当我是HELLO KITTY！","吃自助最高境界：扶墙进，扶墙出。","爷爷都是从孙子走过来的……","夏天就是不好，穷的时候我连西北风都没得喝","没什么事就不要找我，有事了更不要找我。","我想早恋，可是已经晚了……","钱可以解决的问题都不是问题。","天哪，我的衣服又瘦了！","不吃饱哪有力气减肥啊？","连广告也信，读书读傻了吧？","人怕出名猪怕壮，男怕没钱女怕胖。","如果有钱也是一种错，我情愿一错再错","命运负责洗牌，但是玩牌的是我们自己！","好好活着，因为我们会死很久!","人又不聪明，还学人家秃顶！","我总在牛a与牛c之间徘徊。","不怕被人利用，就怕你没用。","鄙视我的人这么多，你算老几? ","秀发去无踪，头屑更出众！","春色满园关不住，我诱红杏出墙来。","问世间情为何物？一物降一物","bmw是别摸我，msn是摸死你","女为悦己者容,男为悦己者穷！ ","念了十几年书，还是幼儿园比较好混");

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
		//var hwchance= Math.floor(Math.random()*hwtext.length);
		//var selStr = "#d幽默时刻:"+hwtext[hwchance]+"#k\r\n\r\n";
		var selStr = ""+aa+"\r\n";
		selStr += "#b您今天抽奖次数：#r"+ cm.getChar().getBossLog("当天明星抽奖") +" #b次  累计抽奖次数： #r" + cm.getBossLog("累计明星抽奖", 1) + " #b次\r\n";
		selStr += "- #d#e使用2洞门口的明星转盘,抽奖次数可领取：#n#k\r\n";
		selStr += "#rPS：累计抽奖只能领取一次,当天可每日达到领取。#k\r\n\r\n";
		selStr += "#L0#"+ttt6+" #b1). 当天抽奖 #r10#b 次可领取 #i5062009# x 50#k#l\r\n";
		selStr += "#L1#"+ttt6+" #b2). 当天抽奖 #r30#b 次可领取 #i2049124# x 3#k#l\r\n";
		selStr += "#L2#"+ttt6+" #b3). 当天抽奖 #r50#b 次可领取 #i4033204# x 30#k#l\r\n";
		selStr += "#L3#"+ttt6+" #b4). 当天抽奖 #r100#b 次可领取 #i2430252# x 1#k#l\r\n";
		selStr += "#L4#"+ttt6+" #b5). 当天抽奖 #r200#b 次可领取 #i2430252# x 3#k#l\r\n";
		selStr += "#L5#"+ttt6+" #d6). 累计抽奖 #r100#d 次可领取 #i4001006# x 120#k#l\r\n";
		selStr += "#L6#"+ttt6+" #d7). 累计抽奖 #r200#d 次可领取 #i1113038# x 1#k#l\r\n";
		selStr += "#L7#"+ttt6+" #d8). 累计抽奖 #r300#d 次可领取 #i2432069# x 1#k#l\r\n";
		selStr += "#L8#"+ttt6+" #d9). 累计抽奖 #r500#d 次可领取 #i2430865# x 30/天#k#l\r\n";
		selStr += "#L9#"+ttt6+"#d10). 累计抽奖 #r800#d 次可领取 #i3994417# x 六色/套#k#l\r\n";
		selStr += "#L10#"+ttt6+"#d11). 累计抽奖 #r1000#d 次可领取 #i1112941# 土豪专属#k#l\r\n ";
		cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
         if (cm.getBossLog("当天明星抽奖") >= 10 && cm.getBossLog("抽10次") < 1 && cm.getSpace(5) > 1) {
		cm.gainItem(5062009, 50);
		cm.setBossLog("抽10次");
		cm.sendOk(" #b成功领取了 #i5062009# #z5062009# x 50 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了当天抽奖 10 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您今天抽奖次数为：#r"+ cm.getBossLog("当天明星抽奖") +"#k #b次，要使用明星转盘10次才能领取\r\n\r\n#r或者您今天已经领取过。请明天再试。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
        case 1:
	if (cm.getBossLog("当天明星抽奖") >= 30 && cm.getBossLog("抽30次") < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2049124, 3);
		cm.setBossLog("抽30次");
		cm.sendOk(" #b成功领取了 #i2049124# #z2049124# x 3 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了当天抽奖 30 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您今天抽奖次数为：#r"+ cm.getBossLog("当天明星抽奖") +"#k #b次，要使用明星转盘30次才能领取\r\n\r\n#r或者您今天已经领取过。请明天再试。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 2:
	if (cm.getBossLog("当天明星抽奖") >= 50 && cm.getBossLog("抽50次") < 1 && cm.getSpace(4) > 1) {
		cm.gainItem(4001006, 80);
		cm.setBossLog("抽50次");
		cm.sendOk(" #b成功领取了 #i4001006# #z4001006# x 80 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了当天抽奖 50 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您今天抽奖次数为：#r"+ cm.getBossLog("当天明星抽奖") +"#k #b次，要使用明星转盘50次才能领取\r\n\r\n#r或者您今天已经领取过。请明天再试。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 3:
	if (cm.getBossLog("当天明星抽奖") >= 100 && cm.getBossLog("抽100次") < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2430252, 1);
		cm.setBossLog("抽100次");
		cm.sendOk(" #b成功领取了 #i2430252# #z2430252# x 1 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了当天抽奖 100 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您今天抽奖次数为：#r"+ cm.getBossLog("当天明星抽奖") +"#k #b次，要使用明星转盘100次才能领取\r\n\r\n#r或者您今天已经领取过。请明天再试。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 4:
	if (cm.getBossLog("当天明星抽奖") >= 200 && cm.getBossLog("抽200次") < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2430252, 3);
		cm.setBossLog("抽200次");
		cm.sendOk(" #b成功领取了 #i2430252# #z2430252# x 3 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了当天抽奖 200 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您今天抽奖次数为：#r"+ cm.getBossLog("当天明星抽奖") +"#k #b次，要使用明星转盘200次才能领取\r\n\r\n#r或者您今天已经领取过。请明天再试。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 5:
	if (cm.getBossLog("累计明星抽奖") >= 100 && cm.getBossLog("累计100次", 1) < 1 && cm.getSpace(4) > 1) {
		cm.gainItem(4001006, 120);
		cm.setBossLog("累计100次", 1);
		cm.sendOk(" #b成功领取了 #i4001006# #z4001006# x 120 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了累计抽奖 100 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您累计抽奖次数为：#r"+ cm.getBossLog("累计明星抽奖") +"#k #b次，要使用明星转盘100次才能领取\r\n\r\n#r或者您已经领取过。请勿重复使用该功能了。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 6:
	if (cm.getBossLog("累计明星抽奖") >= 200 && cm.getBossLog("累计200次", 1) < 1 && cm.getSpace(1) > 1) {
		cm.gainItem(1113038, 1);
		cm.setBossLog("累计200次", 1);
		cm.sendOk(" #b成功领取了 #i1113038# #z1113038# x 1 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了累计抽奖 200 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您累计抽奖次数为：#r"+ cm.getBossLog("累计明星抽奖") +"#k #b次，要使用明星转盘200次才能领取\r\n\r\n#r或者您已经领取过。请勿重复使用该功能了。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 7:
	if (cm.getBossLog("累计明星抽奖") >= 300 && cm.getBossLog("累计300次", 1) < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2432069, 1);
		cm.setBossLog("累计300次", 1);
		cm.sendOk(" #b成功领取了 #i2432069# #z2432069# x 1 个。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了累计抽奖 300 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您累计抽奖次数为：#r"+ cm.getBossLog("累计明星抽奖") +"#k #b次，要使用明星转盘300次才能领取\r\n\r\n#r或者您已经领取过。请勿重复使用该功能了。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 8:
	if (cm.getBossLog("累计明星抽奖") >= 500 && cm.getBossLog("累计500次", 1) < 1 && cm.haveItem(2430865) < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2430865, 1, 30);
		cm.setBossLog("月制度理财", 1, 1);
		cm.resetBossLog("理财十天", 1);
		cm.setBossLog("累计500次", 1);
		cm.sendOk(" #b成功领取了 #i2430865# #z2430865# x 50 天。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了累计抽奖 500 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您累计抽奖次数为：#r"+ cm.getBossLog("累计明星抽奖") +"#k #b次，要使用明星转盘500次才能领取\r\n\r\n#r或者您已经领取过。请勿重复使用该功能了。\r\n\r\n理财服务没有到期，无法再次领取。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 9:
	if (cm.getBossLog("累计明星抽奖") >= 800 && cm.getBossLog("累计800次", 1) < 1 && cm.getSpace(3) > 6) {
		cm.gainItem(3994417, 1);
		cm.gainItem(3994418, 1);
		cm.gainItem(3994419, 1);
		cm.gainItem(3994420, 1);
		cm.gainItem(3994421, 1);
		cm.gainItem(3994422, 1);
		cm.setBossLog("累计800次", 1);
		cm.sendOk(" #b成功领取了：\r\n#i3994417# #z3994417# x 1\r\n#i3994418# #z3994418# x 1\r\n#i3994419# #z3994419# x 1\r\n#i3994420# #z3994420# x 1\r\n#i3994421# #z3994421# x 1\r\n#i3994422# #z3994422# x 1\r\n。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了累计抽奖 800 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您累计抽奖次数为：#r"+ cm.getBossLog("累计明星抽奖") +"#k #b次，要使用明星转盘800次才能领取\r\n\r\n#r或者您已经领取过。请勿重复使用该功能了。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;
	case 10:
	if (cm.getBossLog("累计明星抽奖") >= 1000 && cm.getBossLog("累计1000次", 1) < 1 && cm.getSpace(1) > 1) {
		cm.setBossLog("累计1000次", 1);
		var ii = cm.getItemInfo();					
		var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // 生成一个Equip类             
		toDrop.setStr(100); //装备力量
		toDrop.setDex(100); //装备敏捷
		toDrop.setInt(100); //装备智力
		toDrop.setLuk(100); //装备运气
		toDrop.setMatk(100); //魔法攻击
		toDrop.setWatk(100); //物理攻击 
		toDrop.setOwner("土豪专属");
		cm.addFromDrop(cm.getC(),toDrop,false); 
		cm.sendOk(" #b成功领取了#i1112941# x 1。");
		cm.worldSpouseMessage(0x25, "『明星转盘奖励』 : 玩家 " + cm.getChar().getName() + " 领取了累计抽奖 1000 次的奖品.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b您累计抽奖次数为：#r"+ cm.getBossLog("累计明星抽奖") +"#k #b次，要使用明星转盘1000次才能领取\r\n\r\n#r或者您已经领取过。请勿重复使用该功能了。\r\n#d或者您背包已满。请清理一下。");
	    cm.dispose();
	}
            break;













}
    }
}
