var status = 0;
var minLevel = 180;
var maxLevel = 255;
var minPartySize = 1;
var maxPartySize = 1;

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
        if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 4 || cm.getPlayer().getClient().getChannel() == 5) {
            if (status == 0) {
                if (cm.getMap().getId() == 951000100) {
                    status = 1;
                    cm.sendYesNo("你想出去吗？");
                } else {

                    cm.sendSimple("- #e#d宝物仓库#k#n:\r\n\r\n#b5分钟内击败35血的管理员可随机获得以下道具：\r\n\r\n#i4001485# #i2340000# #i5062000# #i5062002# #i4001839# #i4310088# #i4310036# #i5072000# #i5073000# #i5074000# #i3010527# #i3010832# #i3010829# #i2430866# #i1102481# #i1102482# #i1102483# #i1102484# #i1102485# #i1082543# #i1082544# #i1082545# #i1082546# #i1082547# #i1072743# #i1072744# #i1072745# #i1072746# #i1072747# #i1132174# #i1132175# #i1132176# #i1132177# #i1132178# #i1012438# #i1022211# #i1032224# #i1122269# #i1132247# #i1152160# #i1003976# #i1102623# #i1082556# #i1052669# #i1072870# #i1112793#等等。#k\r\n副本要求：\r\n#r1). 组队员等级必须要在" + minLevel + "级以上。\r\n2). 组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n\r\n#L0#[执行]进入打宝地图#l")
                }
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) { // 没有组队
                        cm.sendOk("请组队后和我谈话。");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // 不是队长
                        cm.sendOk("队长必须在这里。请让他和我说话。");
                        cm.dispose();
                    } else if (cm.getMap(951000100).getCharactersSize() > 0) {
                        cm.sendOk("本次活动泡点地图副本已经在进行中。请等待或者换线后尝试..");
                        cm.dispose();
                    } else {
                        if (cm.getBossLog("活动泡点") < 1 && cm.getEventCount("活动泡点1") < 1) {
                            if (cm.checkPartyEventCount("活动泡点1")){
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
                                var em = cm.getEventManager("NewEvent46");
                                if (em == null) {
                                    cm.sendOk("此任务正在建设当中。");
                                } else {
                                    var prop = em.getProperty("state");
                                    if (prop.equals("0") || prop == null) {
                                        em.startInstance(cm.getParty(), cm.getMap(), 198);
                                        cm.setBossLog("活动泡点");
					cm.setEventCount("活动泡点1");
					cm.finishActivity(120111);
					cm.worldMessageEffect("[活动泡点] " + " : " + "哇塞，玩家 " + cm.getChar().getName() + " 进入 活动泡点 地图，他即将会满载而归。恭喜他吧 " , 16, 60);

                                        cm.worldSpouseMessage(0x20, "[活动泡点] ：玩家 " + cm.getChar().getName() + " 进入 活动泡点 地图，他即将会满载而归。恭喜他吧。");
                                        cm.dispose();
                                        return;
                                    } else {
                                        cm.sendOk("任务里面已经有人了，请稍等！");
                                    }
                                }
                                cm.dispose();
                            } else {
                                cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                                cm.dispose();
                            }
                             } else {
                            	cm.sendOk("请检查队伍中是否存在已完成次数#b队员#k。");
                            	cm.dispose();
                            	}
                      	   } else {
                            cm.sendOk("对不起，该帐号每天只能进入1次。\r\n");
                            cm.dispose();
                        } 
                    } //判断组队
                } else if (selection == 1) {
                    cm.sendOk("请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                    cm.dispose();
                }
            } else if (status == 2) {
                cm.warp(910000000);
                cm.dispose();
            }
        } else {
            cm.dispose();
            cm.sendOk("只有在1,2,3频道才可以参加任务。");
        }
    }
}