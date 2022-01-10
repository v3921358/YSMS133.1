var status = 0;
//var z = "#fUI/UIWindow/Quest/icon5/1#";//"+z+"//美化
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var z = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var yz =new Array(3010947, 3010948, 3015006, 3015010, 3010837,3010838, 3010854);
var chance = Math.floor(Math.random()*yz.length);

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
    if (status == 0) {
        var selStr = "#e#r#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k\r\n\r\n- #e#r随身 npc#k#n\r\n";
		selStr += head + icon2 + "#e#b欢迎使用世界公共,本次给您公告服务：#k#n\r\n";
		//selStr += "#r#L0#"+z+" 每日工资#l  #L1#"+z+" 每日点卷#l  #L9#"+z+" 每日理财#l\r\n";
		selStr += "  #L14#"+z+" 世界喊话#l  \r\n";//#L4#"+z+" 副本重置#l #L7#"+z+" 全天双倍#l
		//selStr += "#L10#"+z+" 椅子租借#l  #L6#"+z+" 自选发型  #L2#" + z + " 快速洗血#l\r\n";
		//selStr += "#L16#"+z+" 极品装备#l  #L17#"+z+" 武器破功  #L18#" + z + " 金币换点#l\r\n";
		//selStr += "#L19#"+z+" 每日寻宝#l  #L20#"+z+" 元宝换点  #L21#"+z+" #b理财钱庄#k \r\n";
		selStr += "\r\n\r\n#fEffect/ItemEff/1112811/0/0##fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k#fEffect/ItemEff/1112811/0/0##n#k";
        im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
		case 6:
				im.dispose();
				im.openNpc(9900001, 10);
            break;
		 case 16:
				im.dispose();
				im.openNpc(9310480, 1);//会员商店
            break;
		 case 17:
				im.dispose();
				im.openNpc(9310480, 2);//会员破功
           break;
		 case 18:
				 im.dispose();
				im.openNpc(9310480, 3);//金币换点
			break;
		 case 19:
				 im.dispose();
				im.openNpc(9900003, 26);//活动泡点
			break;
		 case 20:
				 im.dispose();
				im.openNpc(9330079, 703);//元宝兑换点卷
			break;
		 case 21:
		if (im.getBossLog("元宝") < 1) {
			im.setBossLog("元宝");
			im.addHyPay(-5);
			im.sendOk("恭喜您领取VIP服务的每日元宝5个");
			im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日 5 元宝。");
			im.dispose();
			} else {
			im.sendOk("领取失败，当天已经领取过。");
			im.dispose();
			}
			break;
        case 0:
           if (im.getBossLog("工资") < 1) { //工资
            	im.gainMeso(30000000);
				im.setBossLog("工资");
				im.sendOk("恭喜您领取VIP服务的每日工资3000万金币.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日金币。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 您当前在线积分不足180点。");
				im.dispose();
            }
            break;
        case 1:
           if (im.getBossLog("点卷") < 1) { //点卷
            	im.gainNX(10000);
				im.setBossLog("点卷");
				im.sendOk("恭喜您领取点卷10000点.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里免费领取每日 10000 点卷。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经使用，请明日再试。\r\n");
				im.dispose();
            }
            break;
        case 2:
           if (im.getPlayer().getCSPoints(1) > 10000) { //会员等级
				im.dispose();
				im.openNpc(9900001,9);
            } else {
                im.sendOk("您糊弄我呢。点卷不足还点什么。最少得拥有1万点卷才可以使用。");
				im.dispose();
            }
            break;
		case 7:
           if (im.getBossLog("三倍") < 1) { //三倍
            	im.gainItem(5211060,1,1);
				im.gainItem(5360015,1,1);
				im.setBossLog("三倍");
				im.sendOk("恭喜您领取VIP服务的每日三倍经验卡一张以及双倍爆率卡.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日三倍经验卡以及双倍爆率卡。");
				im.dispose();
            } else {
                im.sendOk("您已经领取过，请明日再领。");
				im.dispose();
            }
            break;
		case 8:
           if (im.getBossLog("双爆") < 1) { //双爆
            	im.gainItem(5360015,1,1);
				im.setBossLog("双爆");
				im.sendOk("恭喜您领取VIP服务的每日双倍爆率卡一张.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日双倍爆率卡。");
				im.dispose();
            } else {
                im.sendOk("您已经领取过，请明日再领。");
				im.dispose();
            }
            break;
		case 9:
           if (im.getBossLog("魔方") < 1) { //魔方
            	im.gainItem(5064000,5);
		        im.gainItem(2340000,5);
				im.gainItem(5062500,5);
				im.gainItem(5062002,5);
				im.setBossLog("魔方");
				im.sendOk("恭喜您领取理财服务的每日理财道具，获得高级神奇魔方、大师级神奇魔方、防暴卷轴、祝福卷轴x5。");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日理财道具。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。");
				im.dispose();
            }
            break;
		case 11:
           if (im.getBossLog("积分") < 1 && im.getPlayerPoints() > 180) { //积分
            	im.gainPlayerPoints(200);
				im.setBossLog("积分");
				im.sendOk("恭喜您领取VIP服务的每日积分200点.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日积分 200 点。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 您当前在线时间不足180分钟。");
				im.dispose();
            }
            break;
		case 12:
           if (im.getBossLog("活力") < 1 && im.getPlayerPoints() > 180) { //活力
            	im.gainPlayerEnergy(50);
				im.gainPlayerPoints(-180);
				im.setBossLog("活力");
				im.sendOk("恭喜您领取VIP服务的每日活力50点.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里领取每日活力 50 点。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 您当前在线积分不足180点。");
				im.dispose();
            }
            break;
		case 10:
			var ii = im.getItemInfo();
           if (im.getBossLog("租借") < 1 && im.getSpace(3) >= 1) { //
				im.setBossLog("租借");
				im.gainItem(yz[chance], 1, 2 * 60 *60 * 1000);
				im.sendOk("恭租借了2小时的 #r#z"+yz[chance]+"##k 椅子.");
				im.worldSpouseMessage(0x20, "『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里租借了 " + ii.getName(yz[chance]) + " 一个。");
				im.dispose();
            } else {
                im.sendOk("失败：\r\n\r\n#r1). 您已经领取过，请明日再领。\r\n2). 您当前在线积分不足1000点。");
				im.dispose();
            }
            break;
		case 4:
           if (im.getBossLog("所有副本重置") < 1) { //副本重置
				im.resetEventCount("抽奖");
				im.resetEventCount("历练");
				im.resetEventCount("养成");
				im.resetEventCount("皇陵");
				im.resetEventCount("罗朱");
				im.resetEventCount("海盗");
				im.resetEventCount("鬼节");
				im.resetEventCount("贝勒德");
				im.resetBossLog("贝勒德");
				im.resetBossLog("mrdb");
				im.resetBossLog("进阶扎昆");
				im.resetBossLog("普通扎昆");
				im.resetBossLog("普通黑龙");
				im.resetBossLog("进阶黑龙");
				im.resetBossLog("普通皮埃尔");
				im.resetBossLog("麦格纳斯");
				im.resetBossLog("钥匙");
				im.resetBossLog("古树钥匙");
				im.resetBossLog("进阶皮埃尔");
				im.resetBossLog("混沌品克缤");
				im.resetBossLog("希纳斯");
				im.resetBossLog("品克缤");
				im.resetBossLog("狮子王");
				im.resetBossLog("进阶贝伦");
				im.resetBossLog("普通贝伦");
				im.resetBossLog("普通血腥女皇");
				im.resetBossLog("进阶血腥女皇");
				im.resetBossLog("进阶血腥女皇");
				im.setBossLog("所有副本重置");
				im.sendOk("恭喜您使用VIP服务的重置了所有的副本.");
				im.worldSpouseMessage(0x20,"『随身服务』 ：玩家 "+ im.getChar().getName() +" 在随身NPC里重置了全部副本任务。");
				im.dispose();
            } else {
                im.sendOk("您已经领取过，请明日再领。");
				im.dispose();
            }
            break;
		case 3:
           if (im.getMeso() > 10000) { //地图传送
				im.sendOk("梢后开放，练级，打钱，打抵用卷地图.");
				im.dispose();
				//im.openNpc(9900001, 11);
            } else {
                im.sendOk("金币不足1万。");
				im.dispose();
            }
            break;
		case 13:
			if (im.getMeso() > 10000) { //地图传送
				im.dispose();
				im.sendOk("近期开放。");
            } else {
                im.sendOk("金币不足1万。");
				im.dispose();
            }

	   break;
		case 14:
			if (im.getMeso() >= 100) {
				im.sendGetText("消耗100万游戏币，请输入您要说的话：");
				typed = 14;
			} else {
				im.sendOk("您没有10000万游戏币，不能进行世界喊话。");
				im.dispose();
			}
			break;
		case 15:
			im.dispose();
			im.openNpc(9030000);
			break;
        }
    } else if (status == 2) {
		if (typed == 14) {
			im.worldSpouseMessage(0x01, "[公告]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[公告]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[公告]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[公告]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.worldSpouseMessage(0x01, "[公告]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			//im.worldSpouseMessage(0x01, "[公告]"+im.getPlayer().getMedalText()+im.getChar().getName()+" : "+im.getText());
			im.gainMeso(-100);
			//im.dispose();
		}
		im.dispose();
        }
}
