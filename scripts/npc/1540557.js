var status = 0;
var minLevel = 220; 
var maxLevel = 250;
var minPlayers = 1;
var maxPlayers = 6;
var moblevel = 255;
var open = true;
var PQ = '斯乌';
var eventname = "bdsw";
var maxenter = 1;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        cm.sendOk("快捷寻找组队按热键“O”赶快加入组队来挑战组队任务吧。");
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        var em = cm.getEventManager(eventname);
        var prop = em.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr = "#r副本空闲#k";
        } else {
            var vipstr = "#b已经开启#k";
        }



        if (cm.getPlayer().getClient().getChannel() == 1) {
            if (cm.getPlayer().getMapId() == 211070100) { //传送
                cm.sendSimple("#e#v3991051##v3991051##v3991051##v3991051##v3991050##v3991050##v3991050##v3991050##n\r\n你现在确定放弃任务,从这里出去?\r\n#L2##b是的,现在就出去#l");


            } else {
                var pqtry = maxenter - cm.getPQLog(PQ);
                var rwpz = "";
                rwpz = "BOSS难度：#v4140301##v4140301##v4140301##v4140301##v4140301##v4140301##v4140301##v4140301#\r\n";
                rwpz += "#e推荐等级：250";
                rwpz += "        推荐人数：1 - 6  \r\n#b已进行：" + cm.getPQLog(PQ) + " 次       剩余挑战次数：" + pqtry + " 次#k";
                rwpz += "\r\nBOSS状态：" + vipstr + "        #n";
                var zyms = "";
                zyms = "     #r#e黑色天堂最终章BOSS-<布迪斯乌>第一阶段#n\r\n#b#h0# \n\#k欢迎你来到黑色天堂最后一战！准备好了吗？\r\n" + rwpz + "\r\n";
                zyms += "#L1##b发起第一阶段挑战！(每次上线挑战机会只有一次！)#l\r\n\r\n";
                cm.sendSimple(zyms);
            }
        } else {
           cm.sendOk("当前副本只能在1频道进行。");
            cm.dispose();
        }

    } else if (status == 1) {
        if (selection == 1) {
            if (cm.getParty() == null) { //判断组队
                cm.sendYesNo("你没有创建组队,无法进入副本。");
            } else if (!cm.isLeader()) { // 判断组队队长
                cm.sendOk("请你们团队的队长和我对话。");
                cm.dispose();
            } else if (cm.getPQLog(PQ) >= maxenter) {
                cm.sendOk("你今天挑战次数已经用完了,请明天在来吧!");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("你的组队部分成员不在当前地图,请召集他们过来后在尝试。"); //判断组队成员是否在一张地图..
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;
                cm.rain(1000);
                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if (cPlayer.getLevel() >= minLevel && cPlayer.getLevel() <= maxLevel) {
                        levelValid += 1;
                    } else {
                        //cm.sendOk("组队成员 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成员等级 "+ minLevel +" 以上 "+ maxLevel +" 以下才可以入场。");
                        cm.dispose();
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() > maxPlayers || inMap < minPlayers) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager(eventname);
                    if (em == null || open == false) {
                        cm.sendSimple("配置文件不存在,请联系管理员。");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), moblevel);
                        } else {
                            cm.sendSimple("本次上线挑战完毕");
                        }
                        
                        cm.setPQLog(PQ);
                        cm.dispose();
                    }
                } else {
                    cm.sendYesNo("组队成员 " + minPlayers + " 人以上 " + maxPlayers + "人 以下 所有成员等级 " + minLevel + " 以上 " + maxLevel + " 以下才可以入场。");
                }
            }
        } else if (selection == 2) {
            cm.warp(211061001, 0);
            cm.dispose();
        }






    } else if (mode == 0) {
        cm.dispose();
    }
}