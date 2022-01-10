 var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var eff1 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
        } else if (status == 0) {
        var selStr = "欢迎来到 芒果 冒险岛\r\n\r\n您今天已经进行了游戏:#r"+cm.getGamePoints()+"#k分钟[要合理安排游戏时间噢]\r\n\r\n下面是游戏相关信息:\r\n\芒果：#r"+cm.getPlayerPoints()+"#k	    元宝:   #r"+cm.getHyPay(1)+"#k\r\n点券:  #r" + cm.getPlayer().getCSPoints(1) + "#k#k	抵押券:   #r" + cm.getPlayer().getCSPoints(2) + "#k#k\r\n=============================================\r\n\r\n";
        selStr += "#L37##r新人首次进必点.超强装备.助您快速成长#l\r\n\r\n";
       selStr += "#L7##r回到市场#l";
        //selStr += "#L1##r活动专区#l";	
		//selStr += "#L2##b卷轴商店#l";	
		selStr += "#L3##b联系客服#l";
		//selStr += "#L11##r万能传送#l";
		selStr += "#L5##d充值点卷#l";
		selStr += "#L6##d免费10级#l\r\n\r\n";
      //  selStr += "#L0##r日常任务#l\r\n\r\n";
		//selStr += "#L8##b学习技能#l";
		//selStr += "#L9##r查看爆率#l";
		//selStr += "#L10##b管理雇佣#l";
		//selStr += "#L12##b副本传送#l\r\n\r\n";
		//selStr += "#L13##r快速转职#l";
		//selStr += "#L14##r银行存款#l";
		//selStr += "#L15##r美容美发#l\r\n\r\n";
		//selStr += "#L16##b每日福利#l\r\n\r\n";
		//selStr += "#L22##r积分兑换#l";
		//selStr += "#L23##r活力兑换#l";
		//selStr += "#L24##r宠物复活#l";
		//selStr += "#L17##r在线时间#l\r\n\r\n";
		//selStr += "#L18##b游戏商店#l";
		//selStr += "#L19##b副本重置#l";
		//selStr += "#L20##bRED-商店#l";
		//selStr += "#L21##bBOSS传送#l\r\n\r\n";
		//selStr += "#L25##b玩家排名#l";
		//selStr += "#L26##b百宝抽奖#l";
        //selStr += "#L27##b仓库管理#l"
        //selStr += "#L28##b神宠进化#l\r\n\r\n"
		//selStr += "#L29##b伤害皮肤#l"
		//selStr += "#L30##b物品回收#l"
		//selStr += "#L31##r点卷商城#l"
		//selStr += "#L32##r等级送礼#l\r\n\r\n"
		//selStr += "#L33##r结婚系统#l"
		//selStr += "#L34##r会员系统#l"
		//selStr += "#L35##r冒险之心#l"
		//selStr += "#L36##r点卷中介#l\r\n\r\n"*/
		selStr += " "
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
			cm.dispose();
			cm.openNpc(9900001);	
            break;
        case 1:
			cm.dispose();
			cm.openNpc(9900001,3000);	
            break;
        case 2:
			cm.dispose();
			cm.openShop(11000);	
		cm.dispose();
            break;
        case 3:
         cm.dispose();
        cm.openWeb("http://jq.qq.com/?_wv=1027&k=cw8waW ");
	    cm.sendOk("有什么问题可以直接QQ咨询");			
            break;
        case 4://管理雇佣商店
            cm.dispose();
	    cm.openNpc(9201116);
            break;
        case 5://累积充值
            cm.dispose();
	    cm.openNpc(9310382,709);
            break;
        case 6://免费10级
	if(cm.getPlayer().getLevel() <= 10){
		cm.gainExp( + 50000);
		cm.worldMessage("恭喜新玩家"+ cm.getChar().getName() +"在拍卖NPC处领取5W经验");
		cm.sendOk("恭喜您领取成功,10级下都能在我这里领取经验");
		}else{
		cm.sendOk("你的等级大于10");
	}
	cm.dispose();
            break;
        case 7://回到市场
            if (cm.getPlayer().getMapId() >= 910000000 && cm.getPlayer().getMapId() <= 910000022) {
                cm.sendOk("您已经在市场了，还想做什么？");
            } else {
                cm.saveReturnLocation("FREE_MARKET");
                cm.warp(910000000, "st00");
            }
            cm.dispose();		
            break;
        case 8://学购技能
			cm.dispose();
			cm.openNpc(9270035, 1);
			break;			
        case 9://查看爆率
            cm.dispose();
            cm.openNpc(9010000, 1);            
			break;
		 case 10://管理雇佣商店
		cm.dispose();
	    cm.openNpc(9030000);	
            break;
		 case 11://快速传送
		cm.dispose();
	    cm.openNpc(9270035);				
            break;
		case 12://副本传送
		cm.dispose();
	    cm.openNpc(9000178);	
            break;
		case 13://快速转职
			cm.dispose();
			cm.openNpc(9300011);
			break;			
		case 14://银行存款
			cm.dispose();
			cm.openNpc(9900002, 5);
			break;			
		case 15://美容美发
            cm.dispose();
			cm.openNpc(9900002,49);
            break;
		case 16://每日福利
            cm.dispose();
			cm.openNpc(9310058);
            break;
		case 17:
            cm.dispose();
			cm.openNpc(9900002,53);
            break;
		case 18://百货店
			cm.dispose();
			cm.openNpc(1012121);
			break;			
        case 19:
			cm.dispose();
			cm.openNpc(9900004, 3);
            break;	
        case 20://RED商店
            cm.dispose();
            cm.openNpc(9900002, 50);
            break;	
        case 21://RED商店
            cm.dispose();
            cm.openNpc(9900004, 55);
            break;		
        case 22://RED商店
            cm.dispose();
            cm.openNpc(9900002, 43);
            break;	
        case 23://RED商店
            cm.dispose();
            cm.openNpc(9900001, 200);
            break;
        case 24://RED商店
            cm.dispose();
            cm.openNpc(1032102);
            break;
        case 25://RED商店
			cm.dispose();
			cm.sendOk("请用命令查询！\r\n@ranking 所有 1 20 ");
            break;	
        case 26://RED商店
			cm.dispose();
			cm.warp(749050400);
			break;
        case 27://RED商店
			cm.dispose();
			cm.openNpc(9030100);
            break;	
        case 28://RED商店
			cm.dispose();
			cm.openNpc(9073025);
            break;
        case 29://RED商店
			cm.dispose();
			cm.openNpc(9900002, 54);
            break;
        case 30://RED商店
			cm.dispose();
			cm.openNpc(9900002, 55);
            break;		
        case 31://RED商店
			cm.dispose();
			cm.openNpc(9900002, 2);
            break;	
        case 32://RED商店
			cm.dispose();
			cm.openNpc(9900002, 12);
            break;	
        case 33://RED商店
			cm.dispose();
			if (cm.getMapId() == 680000000) {
				cm.sendOk("你已经在结婚地图了.");
			} else {
				cm.warp(680000000);
				cm.sendOk("已经将你传送到结婚地图。\r\n请查看左上角NPC结婚流程.\r\n请带上你的爱人.邀请你的朋友来吧!\r\n祝你新婚快乐!!!");
				break;
			}		
        case 34://RED商店
			cm.dispose();
			cm.openNpc(9000111);
            break;	
        case 35://RED商店
			cm.dispose();
			cm.openNpc(9900002, 41);
            break;		
		case 36:
			cm.dispose();
			cm.openNpc(9900002, 8);
			break;	
		case 37:
            if (cm.getBossLog("送装备", 1) == 0) {
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112917)).copy(); 
            toDrop.setStr(20); //装备力量
			toDrop.setDex(20); //装备敏捷
			toDrop.setInt(20); //装备智力
			toDrop.setLuk(20); //装备运气
			toDrop.setMatk(20); //物理攻击
			toDrop.setWatk(20); //魔法攻击
			toDrop.setSpeed(10); //移动速度	
			toDrop.setHp(2000);//hp
			toDrop.setMp(2000);//mp
			toDrop.setJump(10); //跳跃
			toDrop.setAcc(10); //命中率
			toDrop.setEnhance(25);//强化等级
			toDrop.setPotential1(40086);
			toDrop.setPotential2(30086);
			toDrop.setPotential3(30086);
			toDrop.setOwner("芒果神器");
			cm.addFromDrop(cm.getC(), toDrop, false)	
			cm.setBossLog("送装备", 1);
			cm.sendOk("超强装备已经给您发放.感谢您的支持.");
            } else {
				cm.sendOk("您已经领取过了");
            }
            cm.dispose();
			break;				
		}
    }
}