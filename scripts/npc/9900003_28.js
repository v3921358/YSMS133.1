var status = 0;
var minLevel = 10;
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

                    cm.sendSimple("- #e#d高经验升级地图#k#n #r进入 "+ cm.getBossLog("高经验地图") +" / 1 次:\r\n\r\n#b在该地图里消灭怪物可以获得大量经验值。比boss的经验更给力。建议进入时佩戴双倍经验或者三倍经验。。#k\r\n副本要求：\r\n#r1). 组队员等级必须要在" + minLevel + "级以上。\r\n2). 必须是 " + minPartySize + " 人进入。\r\n\r\n#L0#[执行]进入高经验地图#l")
                }
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) { // 没有组队
                        cm.sendOk("请组队后和我谈话。");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // 不是队长
                        cm.sendOk("队长必须在这里。请让他和我说话。");
                        cm.dispose();
                    } else if (cm.getMap(914050002).getCharactersSize() > 0) {
                        cm.sendOk("本次活动泡点地图副本已经在进行中。请等待或者换线后尝试..");
                        cm.dispose();
                    } else {
                        if (cm.getBossLog("高经验地图") < 3) {
                            //if (cm.checkPartyEventCount("欧拉拉1")){
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
                                var em = cm.getEventManager("hade");
                                if (em == null) {
                                    cm.sendOk("此任务正在建设当中。");
                                } else {
                                    var prop = em.getProperty("state");
                                    if (prop.equals("0") || prop == null) {
                                        em.startInstance(cm.getParty(), cm.getMap(), 198);
                                        cm.setBossLog("高经验地图");
                                        cm.worldSpouseMessage(0x20, "『高经验地图』：玩家 " + cm.getChar().getName() + " 进入 高经验升级 地图，升级那是快如飞。心动吧。");
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
                            // } else {
                            //	cm.sendOk("请检查队伍中是否存在已完成次数#b队员#k。");
                            //	cm.dispose();
                            //	}
                        } else {
                            cm.sendOk("对不起，每天只能进入1次。\r\n");
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