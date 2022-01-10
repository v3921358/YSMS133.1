
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
		var selStr = "#r[提示]： #e#b请选择对应职业领取：#k#n\r\n\r\n#r[务必注意]:#b暂时不领取请点击停止对话\r\n\r\n";
selStr += "#r#L0#"+ttt6+"  1). 领取战士职业套装#l\r\n";
selStr += "#r#L1#"+ttt6+"  1). 领取法师职业套装#l\r\n";
selStr += "#r#L2#"+ttt6+"  1). 领取弓箭手职业套装#l\r\n";
selStr += "#r#L3#"+ttt6+"  1). 领取飞侠职业套装#l\r\n";
selStr += "#r#L4#"+ttt6+"  1). 领取海盗职业套装#l\r\n";
		/*selStr += "#r#L0#"+ttt6+"  1). #z1212079##l\r\n";//革命双头杖
		selStr += "#r#L1#"+ttt6+"  2). #z1222074##l\r\n";//革命灵魂手铳
		selStr += "#r#L2#"+ttt6+"  3). #z1232074##l\r\n";//革命恶魔剑
		selStr += "#r#L3#"+ttt6+"  4). #z1402210##l\r\n";//革命双手剑
		selStr += "#r#L4#"+ttt6+"  5). #z1242080##l\r\n";//革命锁链剑
		selStr += "#r#L5#"+ttt6+"  6). #z1302289##l\r\n";//革命剑
		selStr += "#r#L6#"+ttt6+"  7). #z1312165##l\r\n";//革命战斧
		selStr += "#r#L7#"+ttt6+"  8). #z1322215##l\r\n";//革命铁瓜锤
		selStr += "#r#L8#"+ttt6+"  9). #z1332238##l\r\n";//革命切割者
		selStr += "#r#L9#"+ttt6+" 10). #z1362101##l\r\n";//革命手杖
		selStr += "#r#L10#"+ttt6+" 11). #z1372188##l\r\n";//革命短杖
		selStr += "#r#L11#"+ttt6+" 12). #z1382101##l\r\n";//革命长杖
		selStr += "#r#L12#"+ttt6+" 13). #z1382222##l\r\n";//革命圣杖
		selStr += "#r#L13#"+ttt6+" 14). #z1412147##l\r\n";//革命双手战斧
		selStr += "#r#L14#"+ttt6+" 15). #z1422152##l\r\n";//革命巨锤
		selStr += "#r#L15#"+ttt6+" 16). #z1432178##l\r\n";//革命之矛
		selStr += "#r#L16#"+ttt6+" 17). #z1442234##l\r\n";//革命长戟
		selStr += "#r#L17#"+ttt6+" 18). #z1452216##l\r\n";//革命弓
		selStr += "#r#L18#"+ttt6+" 19). #z1462204##l\r\n";//革命暗黑弩
		selStr += "#r#L19#"+ttt6+" 20). #z1472226##l\r\n";//革命拳甲
		selStr += "#r#L20#"+ttt6+" 21). #z1482179##l\r\n";//革命冲拳
		selStr += "#r#L21#"+ttt6+" 22). #z1492190##l\r\n";//革命红杰克
		selStr += "#r#L22#"+ttt6+" 23). #z1522105##l\r\n";//革命双翼弩
		selStr += "#r#L23#"+ttt6+" 24). #z1532109##l\r\n";//革命手炮
		selStr += "#r#L24#"+ttt6+" 25). #z1252046##l\r\n";//革命猫梳魔法棒
		selStr += "#r#L25#"+ttt6+" 26). #z1542074##l\r\n";//革命刀
		selStr += "#r#L26#"+ttt6+" 27). #z1552074##l\r\n";//革命扇*/


		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0://战士套装
           if (im.getLevel() >= 10 && im.getSpace(1) >= 15) {
	//if (im.getSpace(1) >= 12) {
		im.gainItem(2431047, -1);
	im.gainItem(1422125, 1);
	im.gainItem(1432151, 1);
	im.gainItem(1442203, 1);
	im.gainItem(1302249, 1);
	im.gainItem(1312136, 1);
	im.gainItem(1322182, 1);
	im.gainItem(1402174, 1);
	im.gainItem(1412123, 1);
	im.gainItem(1022149, 1);//风暴眼镜
	im.gainItem(1032148, 1);//风暴耳环
	im.gainItem(1122200, 1);//风暴吊坠
	im.gainItem(1132161, 1);//风暴腰带
	im.gainItem(1152099, 1);//风暴肩章
	im.gainItem(1003561, 1);//风暴羽毛帽子
	im.gainItem(1102467, 1);//风暴披风
	im.gainItem(1082438, 1);//风暴手套
	im.gainItem(1112748, 1);//风暴戒指
	im.gainItem(1072672, 1);//风暴鞋子
	im.gainItem(1052467, 1);//风暴连帽长袍
		im.sendOk("获得了 风暴套装");
		im.worldSpouseMessage(0x24,"『风暴套装』：玩家 "+ im.getChar().getName() +" 获得了战士风暴套装。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够10级.无法领取.\r\n#b2). 您的装备栏不足15格，请整理下装备栏");
		im.dispose();
	}
		break;
	case 1:
           if (im.getLevel() >= 10 && im.getSpace(1) >= 15) {
		im.gainItem(2431047, -1);
	im.gainItem(1212040, 1);
	im.gainItem(1252045, 1);
	im.gainItem(1372162, 1);
	im.gainItem(1382193, 1);


	im.gainItem(1022149, 1);//风暴眼镜
	im.gainItem(1032148, 1);//风暴耳环
	im.gainItem(1122200, 1);//风暴吊坠
	im.gainItem(1132161, 1);//风暴腰带
	im.gainItem(1152099, 1);//风暴肩章
	im.gainItem(1003561, 1);//风暴羽毛帽子
	im.gainItem(1102467, 1);//风暴披风
	im.gainItem(1082438, 1);//风暴手套
	im.gainItem(1112748, 1);//风暴戒指
	im.gainItem(1072672, 1);//风暴鞋子
	im.gainItem(1052467, 1);//风暴连帽长袍
		im.sendOk("获得了 风暴套装");
		im.worldSpouseMessage(0x24,"『风暴套装』：玩家 "+ im.getChar().getName() +" 获得了法师风暴套装。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够10级.无法领取.\r\n#b2). 您的装备栏不足15格，请整理下装备栏");
		im.dispose();
	}
		break;

	case 2:
           if (im.getLevel() >= 10 && im.getSpace(1) >= 15) {
		im.gainItem(2431047, -1);
	im.gainItem(1452190, 1);
	im.gainItem(1462178, 1);
	im.gainItem(1522079, 1);

	im.gainItem(1022149, 1);//风暴眼镜
	im.gainItem(1032148, 1);//风暴耳环
	im.gainItem(1122200, 1);//风暴吊坠
	im.gainItem(1132161, 1);//风暴腰带
	im.gainItem(1152099, 1);//风暴肩章
	im.gainItem(1003561, 1);//风暴羽毛帽子
	im.gainItem(1102467, 1);//风暴披风
	im.gainItem(1082438, 1);//风暴手套
	im.gainItem(1112748, 1);//风暴戒指
	im.gainItem(1072672, 1);//风暴鞋子
	im.gainItem(1052467, 1);//风暴连帽长袍
		im.sendOk("获得了 风暴套装");
		im.worldSpouseMessage(0x24,"『风暴套装』：玩家 "+ im.getChar().getName() +" 获得了弓箭手风暴套装。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够10级.无法领取.\r\n#b2). 您的装备栏不足15格，请整理下装备栏");
		im.dispose();
	}
		break;


	case 3:
           if (im.getLevel() >= 10 && im.getSpace(1) >= 15) {
		im.gainItem(2431047, -1);
	im.gainItem(1332207, 1);
	im.gainItem(1362075, 1);
	im.gainItem(1472198, 1);

	im.gainItem(1022149, 1);//风暴眼镜
	im.gainItem(1032148, 1);//风暴耳环
	im.gainItem(1122200, 1);//风暴吊坠
	im.gainItem(1132161, 1);//风暴腰带
	im.gainItem(1152099, 1);//风暴肩章
	im.gainItem(1003561, 1);//风暴羽毛帽子
	im.gainItem(1102467, 1);//风暴披风
	im.gainItem(1082438, 1);//风暴手套
	im.gainItem(1112748, 1);//风暴戒指
	im.gainItem(1072672, 1);//风暴鞋子
	im.gainItem(1052467, 1);//风暴连帽长袍
		im.sendOk("获得了 风暴套装");
		im.worldSpouseMessage(0x24,"『风暴套装』：玩家 "+ im.getChar().getName() +" 获得了飞侠风暴套装。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够10级.无法领取.\r\n#b2). 您的装备栏不足15格，请整理下装备栏");
		im.dispose();
	}
		break;


	case 4:
           if (im.getLevel() >= 10 && im.getSpace(1) >= 15) {
		im.gainItem(2431047, -1);
	im.gainItem(1222040, 1);
	im.gainItem(1482152, 1);
	im.gainItem(1492163, 1);
	im.gainItem(1532082, 1);

	im.gainItem(1022149, 1);//风暴眼镜
	im.gainItem(1032148, 1);//风暴耳环
	im.gainItem(1122200, 1);//风暴吊坠
	im.gainItem(1132161, 1);//风暴腰带
	im.gainItem(1152099, 1);//风暴肩章
	im.gainItem(1003561, 1);//风暴羽毛帽子
	im.gainItem(1102467, 1);//风暴披风
	im.gainItem(1082438, 1);//风暴手套
	im.gainItem(1112748, 1);//风暴戒指
	im.gainItem(1072672, 1);//风暴鞋子
	im.gainItem(1052467, 1);//风暴连帽长袍
		im.sendOk("获得了 风暴套装");
		im.worldSpouseMessage(0x24,"『风暴套装』：玩家 "+ im.getChar().getName() +" 获得了飞侠风暴套装。");	
		im.dispose();
	} else {
                im.sendOk("失败：\r\n\r\n#r1). 您的等级不够10级.无法领取.\r\n#b2). 您的装备栏不足15格，请整理下装备栏");
		im.dispose();
	}
		break;


	case 5:
           if (im.getLevel() >= 10 && im.getPlayerPoints() > 30) {
		im.gainItem(2431047, -1);
	im.gainItem(1022149, 1);//风暴眼镜
	im.gainItem(1032148, 1);//风暴耳环
	im.gainItem(1122200, 1);//风暴吊坠
	im.gainItem(1132161, 1);//风暴腰带
	im.gainItem(1152099, 1);//风暴肩章
	im.gainItem(1003561, 1);//风暴羽毛帽子
	im.gainItem(1102467, 1);//风暴披风
	im.gainItem(1082438, 1);//风暴手套
	im.gainItem(1112748, 1);//风暴戒指
	im.gainItem(1072672, 1);//风暴鞋子
	im.gainItem(1052467, 1);//风暴连帽长袍
		im.sendOk("获得了 风暴套装");
		im.worldSpouseMessage(0x24,"『风暴套装』：玩家 "+ im.getChar().getName() +" 获得了海盗风暴套装。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够10级.无法领取.\r\n");
		im.dispose();
	}
		break;


	case 6:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1312165, 1);//革命战斧
		im.sendOk("获得了 #z1312165# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命战斧。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 7:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1322215, 1);//革命铁瓜锤
		im.sendOk("获得了 #z1322215# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命铁瓜锤。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 8:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1332238, 1);//革命切割者
		im.sendOk("获得了 #z1332238# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命切割者。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 9:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1362101, 1);//革命手杖
		im.sendOk("获得了 #z1362101# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命手杖。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 10:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1372188, 1);//革命短杖
		im.sendOk("获得了 #z1372188# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命短杖。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 11:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1382101, 1);//革命长杖
		im.sendOk("获得了 #z1382101# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命长杖。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 12:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1382222, 1);//革命圣杖
		im.sendOk("获得了 #z1382222# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命圣杖。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 13:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1412147, 1);//革命双手战斧
		im.sendOk("获得了 #z1412147# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命双手战斧。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 14:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1412152, 1);//革命巨锤
		im.sendOk("获得了 #z1422152# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命巨锤。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 15:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1432178, 1);//革命之矛
		im.sendOk("获得了 #z1432178# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命之矛。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 16:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1442234, 1);//革命长戟
		im.sendOk("获得了 #z1442234# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命长戟。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 17:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1452216, 1);//革命弓
		im.sendOk("获得了 #z1452216# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命弓。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 18:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1462204, 1);//革命暗黑弩
		im.sendOk("获得了 #z1462204# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命暗黑弩。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 19:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1472226, 1);//革命拳甲
		im.sendOk("获得了 #z1472226# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命拳甲。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 20:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1482179, 1);//革命冲拳
		im.sendOk("获得了 #z1482179# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命冲拳。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 21:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1492190, 1);//革命红杰克
		im.sendOk("获得了 #z1492190# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命红杰克。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 22:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1522105, 1);//革命双翼弩
		im.sendOk("获得了 #z1522105# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命双翼弩。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 23:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1532109, 1);//革命手炮
		im.sendOk("获得了 #z1532109# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命手炮。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 24:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1252046, 1);//革命猫梳魔法棒
		im.sendOk("获得了 #z1252046# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命猫梳魔法棒。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 25:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1542074, 1);//革命刀
		im.sendOk("获得了 #z1542074# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命刀。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;
	case 26:
           if (im.getLevel() >= 100 && im.getPlayerPoints() > 30) {
		im.gainItem(2432068, -1);
		im.gainItem(1552074, 1);//革命扇
		im.sendOk("获得了 #z1552074# x 1");
		im.worldSpouseMessage(0x24,"『革命武器箱』：玩家 "+ im.getChar().getName() +" 获得了革命扇。");	
		im.dispose();
	} else {
               im.sendOk("失败：\r\n\r\n#r1). 您的等级不够100级.无法领取.\r\n2). 您当前在线雪花币不足30币。请去市场挂机");
		im.dispose();
	}
		break;







}
    }
}
