var status = 0;
var selStr;
var sel;
var selitem;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#";//领取完成
var pass = true;

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
    if (status == 0) {
        selStr = "#r#e<不忘国耻报仇雪恨，打倒小日本>#n#k.\r\n\r\n\t#b当前背包里有： #r" + cm.getItemQuantity("4310036") + " #b个 #r征服者币#k\r\n\r\n  伊贺忍着越来越嚣张了，你们能帮我消灭吗？#b\r\n\r\n#r高经验，100级以上可进入，怪物有几率掉落#b征服者币#k\r\n#b副本总时间 5 分钟,每日可以进入 3 次，请不要轻易退出\r\n";
        selStr += "#L2#" + aaa + " #r玩法介绍（详细玩法流程）#l\r\n";
        //selStr += "#L3#" + aaa + " #b兑换道具#d（魔方，卷轴，金币）#l\r\n";
        //selStr += "#L5#" + aaa + " #r兑换装备#d（140，150，160装备）#l\r\n";
        selStr += "#L1#" + aaa + " #b单人刷怪模式#d（今日可进入 #r" + (3 - cm.getBossLog("报仇雪恨")) + " #d次）#l\r\n";
        //selStr += "#L6#" + aaa + " #b组队BOSS模式#d（云朵无限次数进入）#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 1) {
            if (cm.getParty() == null) { // No Party
                cm.sendOk("需要先#b开启#k一个组队,而且只能是你一个人~.zzzZZZZZ..");
                cm.dispose();
                return;
            } else if (!cm.isLeader()) { // Not Party Leader
                cm.sendOk("请叫队长跟我说话.");
                cm.dispose();
                return;
            } else if (cm.getLevel() <= 99) {
                cm.sendOk("请确认你的等级100级以上。");
                cm.dispose();
                return;
            } else if (cm.getMap(865030111).getCharactersSize() > 0) { // Not Party Leader
                cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                cm.dispose();
                return;
            } else if (cm.getBossLog("消灭小日本") >= 3) {
                cm.sendOk("单人模式每天只能进入 3 次");
                cm.dispose();
                return;
            } else {
                var party = cm.getParty().getMembers();
                if (party.size() > 1) {
                    cm.sendOk("#r对不起,为了彻底的测试你的能力,只能一人前往..");
                    cm.dispose();
                    return;
                }
                var em = cm.getEventManager("xrb");
                if (em == null) {
                    cm.sendOk("暂未开放.");
                    cm.dispose();
                    return;
                } else {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.setBossLog("消灭小日本");
                    cm.worldSpouseMessage(0x20, "『报仇雪恨』 : 玩家 <" + cm.getChar().getName() + "> 进入了暗杀者据点.");
                    cm.dispose();
                }
            }
        } else if (sel == 7) {
            if (cm.getParty() == null) { // No Party
                cm.sendOk("需要先#b开启#k一个组队");
                cm.dispose();
                return;
            } else if (!cm.isLeader()) { // Not Party Leader
                cm.sendOk("请叫队长跟我说话.");
                cm.dispose();
                return;
            } else if (cm.getLevel() <= 99) {
                cm.sendOk("请确认你的等级100级以上。");
                cm.dispose();
                return;
            } else if (cm.getMap(865030112).getCharactersSize() > 0) { // Not Party Leader
                cm.sendOk("有人在挑战此副本，请稍等一会，或者换其它线尝试一下！..");
                cm.dispose();
                return;
            } else {
                var party = cm.getParty().getMembers();
                if (party.size() < 4) {
                    cm.sendOk("#r对不起,组队必须4人，或者选择单人模式");
                    cm.dispose();
                    return;
                }
                for (var i = 0; i < party.size(); i++) {
                    if (party.get(i).getLevel() < 100) {
                        pass = false;
                        break;
                    }
                }
                if (pass) {
                    var em = cm.getEventManager("xrb1");
                    if (em == null) {
                        cm.sendOk("暂未开放.");
                        cm.dispose();
                        return;
                    } else {
                        em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                        cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x09, cm.getC().getChannel(), "『消灭小日本』" + " : " + "玩家 <" + cm.getChar().getName() + "> 带领队伍进入了暗杀者据点."));
                        cm.dispose();
                    }
                }else{
                    cm.sendOk("你的队友必须在100等级以上。");
                    cm.dispose();
                }
            }
        } else if (sel == 3) {
            cm.dispose();
            cm.openNpc(9310144, 31);
        } else if (sel == 5) {
            cm.dispose();
            cm.openNpc(9900003, 21);
        } else if (sel == 2) {
            cm.sendOkS("#r#e<消灭小日本>\r\n\r\n#d#e副本说明：#k#n#b进入后，每次15秒刷新一批怪物，请迅速消灭\r\n#d#e失败条件：#k#n#b地图怪物总数量超过100只。\r\n#e#d挑战待遇：#k#n#b杀死怪物后，有机率掉落#r#z4310036##k\r\n#d#e钱币作用：#k#n#b可兑换装备，道具\r\n#d#e进入条件：#k#n#b需要等级大于100级。", 2);
            cm.dispose();
        } else if (sel == 6) {
            cm.dispose();
	    cm.openNpc(9310144, 39);
        }
    }
}

