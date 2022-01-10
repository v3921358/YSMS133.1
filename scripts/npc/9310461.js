/*
钻机副本
芬芬时尚潮流
*/
var status = 0;
var minLevel = 230;
var maxLevel = 255;
var minPartySize = 3;
var maxPartySize = 6;
var maxPierre1 = 2;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;
		if(cm.getPlayer().getMapId() == 706041650){
        if (status == 0) {
            cm.sendSimple("#r#e<★龙★虎★>#n\r\n你想和队员们一起努力，完成任务吗？这里面必须要队员的完美配合，请让#b所属组队的队长#k来和我说话。\r\n       #e#L0#我想开启#r#e<★龙#g★虎★#b蛇★>#k副本。#l\r\n            #L1#我想听一下说明。#l")
        } else if (status == 1) {
            if (selection == 0) {
				 if (cm.getPlayer().getCSPoints(1) < 5000||!cm.haveItem(4000286, 1000)) {
	                cm.sendOk("抱歉尊敬的玩家\r\n\r\n需缴纳 5000 点卷和1000个#i4000286# 才可挑战");
	                cm.dispose();
					return;
	           	 }
				
				
                if (cm.getParty() == null) { // 没有组队
                    cm.sendOk("请组队后和我谈话。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是队长
                    cm.sendOk("队长必须在这里。请让他和我说话。");
                    cm.dispose();
                    } else  {
		if (cm.getBossLog("龙虎") < maxPierre1){
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Zch");
					   //var em = cm.getEventManager("Zch");
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
								
							  if (cm.getPlayer().getCSPoints(1) > 5000||cm.haveItem(4000286, 1000)) 
								{
									cm.gainNX(1, -5000); 
									cm.gainItem(4000286,-1000);
									em.startInstance(cm.getParty(), cm.getMap(), 140);
									cm.setBossLog("龙虎");
									//cm.worldSpouseMessage(0x21, "玩家 " + cm.getChar().getName() + " 带领TA的远征队 征伐 卧虎藏龙副本 危险星：★★★★★★★");
		    						//cm.worldSpouseMessage(0x21, "玩家 " + cm.getChar().getName() + " 带领TA的远征队 征伐 卧虎藏龙副本 危险星：★★★★★★★");
		    						//cm.worldSpouseMessage(0x21, "玩家 " + cm.getChar().getName() + " 带领TA的远征队 征伐 卧虎藏龙副本 危险星：★★★★★★★");
		    						//cm.getMap().startMapEffect("玩家 " + cm.getChar().getName() + " 带领TA的远征队 征伐 卧虎藏龙副本 危险星：★★★★★★★", 5121000);//火影窗口
									cm.dispose();
									 return;
								}else
								{
									 cm.sendOk("你的点卷或者#i4000286#不足哦。");
									cm.dispose();
									
									return;
								}
								
								
                                
                               
                            } else {
                                cm.sendOk("里面已经有人了，请稍等！！");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                        cm.dispose();
                    }
                } else {
			cm.sendOk("对不起，一天只能进入2次。");
			cm.dispose();
			}
		} //判断组队
            } else if (selection == 1) {
                cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                cm.dispose();
            }
        } 
	} else if(cm.getPlayer().getMapId() == 703020100){
		cm.dispose();	
		cm.warp(703020000);
	}
    }
}