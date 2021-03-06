var status = 0;
var minLevel = 200;
var maxLevel = 255;
var minPartySize = 1;
var maxPartySize = 6;
var maxPlay = 2;
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#e<麦格纳斯>#n\r\n为了消灭强大的暴君，您们有足够的勇气去挑战吗? 它非比寻常，比一般BOSS强大很多哟，你们准备好了吗？如果准备好了，请让你们的队长和我谈话……。\r\n#L1#我想听一下说明。#l\r\n#b#L0#我想执行组队任务。#l\r\n\r\n")//\r\n#L3#我想要极真暴君装备。#l\r\n#L4##r我要花费点卷重置次数。
        } else if (status == 1) {
            if (selection == 0) {
				if (cm.getBossLog("麦格纳斯") >= maxPlay) {
					cm.sendOk("今天你已经参与了"+maxPlay+"次，不能再参与该副本了！请明天赶早~");
					return;

				}
				
                if (cm.getParty() == null) { // 没有组队
                    cm.sendOk("请组队后和我谈话。");
                    cm.dispose();
                } else if (!cm.isLeader()) { // 不是队长
                    cm.sendOk("请叫队长和我谈话。");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
					var idx = Array();
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
						idx.push(cPlayer.getId());
                    }
					if (getBossLog(idx)>=maxPlay) {
						cm.sendOk("队伍中有玩家已经参与过该副本2次，无法再进入，请踢出该玩家。");
						cm.dispose();
						return;
					}
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("ZChaosPQ1");
                        //cm.worldMessage(cm.getChar().getName() + "   带领他的队伍进入了玩具城101副本挑战任务.想去的快去组织队伍吧！");
                        if (em == null) {
                            cm.sendOk("此任务正在建设当中。");
                        } else {
                            if (cm.getPlayerCount(401060100) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
								cm.setPartyBossLog("麦格纳斯");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("目前该频道已经有人在挑战，请换个频道重新进入。");
                                cm.dispose();
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                        cm.dispose();
                    }
                } //判断组队
            } else if (selection == 1) {
                cm.sendOk("副本只有麦格纳斯BOSS一只，但是血量非常多，输出非常高，如果火力不足够，是会自动脱离战场的。击败后就能开启#e#b神秘宝箱#n#k，里面有传说中的#b#z4310058##k，还有各种新奇的椅子和时装；开启宝箱后，玩家通过掷点的方式来赢取奖励。掷点时，你需要在10秒钟内做出需求选择，否则将会被强制下线。\r\n进入副本前，请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                cm.dispose();
            } else if (selection == 2) {
                cm.warp(910000000, 0)
                cm.sendOk("我等着更加强大的你……")
                cm.dispose();
           } else if (selection == 3) {
				if (cm.haveItem(4310058,1)) {
					if (cm.getSpace(1) > 1) {
						cm.dispose();
						cm.openShop(10003);
					} else {
						cm.sendOk("失败，装备栏包裹不足，请检查！");
					}
					cm.dispose();
				} else {
					cm.sendOk("您没有个#b#z4310058#无法察看#k");
					cm.dispose();
				}
			/*} else if (selection == 4) {
				cm.sendYesNo("你是否需要花费#r100000#k点卷重置该副本？");
			}
        } else if (status == 2) {
			if (cm.getPlayer().getCSPoints(1) >= 100000) {
				cm.gainNX(1,-100000);
				cm.resetBossLog("麦格纳斯");
				cm.sendOk("重置成功！");
				cm.dispose();
			} else {
				cm.sendOk("你的点卷不够，无法重置。");
				cm.dispose();*/
				}
			}
		}
    }
//}
function getBossLog(idx) {
	var idStr ="";
	for(var key in idx) {
		if (key==0)
			idStr+=idx[key];
		else
			idStr+=","+idx[key];
	}
	var sql = "SELECT max(count) as maxcount FROM bosslog where bossid = '麦格纳斯' and characterid in (" + idStr + ") and to_days(time) = to_days(now());";
	//java.lang.System.out.println(sql);
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	bosslogSql = pstmt.executeQuery();
    if(bosslogSql.next()) {
    	return bosslogSql.getString("maxcount")*1;
    }
	bosslogSql.close();
	pstmt.close();
	//conn.close();
	return 0;
}
