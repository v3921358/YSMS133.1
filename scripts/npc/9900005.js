/*
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * 打蚊子副本
 */

var status = 0;
var minLevel = 150;
var maxLevel = 255;
var minPartySize = 4;
var maxPartySize = 6;
var maxPlay = 2;
var ItemArray = Array(
        Array(2430692, 1, -1, 2000),
        Array(2431743, 1, -1, 1000)//10000抵用券
        );//道具id，个数，剩余天数，所需积分
var itemid, leftday, quantity, needpoints;

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
            cm.sendSimple("#b怎么办？最近蚊子越来越泛滥了。冒险家们，你们可以帮我消灭蚊子吗？\r\n\r\n\t\t\t\t#e<消灭蚊子>#n\r\n\r\n#d   帮我消灭蚊子的话，达到一定数量我就会把我珍贵的东西送给你！冒险家们？怎么样？可以帮帮我吗？\r\n\r\n#b#L0#协同组队帮忙消灭蚊子！#l\r\n#L1##r查看我一共消灭了多少蚊子，并兑换礼品。#l#b\r\n#L2#我想了解一下怎么打蚊子。#l\r\n#L3#我想花费10000点券重置挑战次数。#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getBossLog("消灭蚊子") >= maxPlay) {
                    cm.sendOk("今天你已经参与了" + maxPlay + "次，不能再帮我打了，怕你太累了！请明天赶早~");
                    cm.dispose();
                    return;
                }
                if (cm.getParty() == null) { // 没有组队
                    cm.sendOk("消灭蚊子也是需要队长的啊~\r\n请队长跟我说话。");
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
                    if (getBossLog(idx) >= maxPlay) {
                        cm.sendOk("队伍中有玩家已经参与过该副本" + maxPlay + "次，无法再进入，请踢出该玩家。");
                        cm.dispose();
                        return;
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Wenzi");
                        if (em == null) {
                            cm.sendOk("目前正在整理该副本。等待开放。。");
                        } else {
                            if (cm.getPlayerCount(350033000) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
                                cm.setPartyBossLog("消灭蚊子");
                                cm.worldSpouseMessage(0x25, cm.getChar().getName() + "   带领他的队伍进入了去消灭文字了，大家也快点帮管理员消灭蚊子吧！？");
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
            }
            else if (selection == 2) {
                cm.sendOk("进入副本前，请确认你的组队员：\r\n\r\n#b1、组队员必须要" + minPartySize + "人以上，" + maxPartySize + "人以下。\r\n2、组队员等级必须要在" + minLevel + "级以上。\r\n\r\n（#r如果仍然错误, 重新下线,再登陆 或者请重新组队。#k#b）");
                cm.dispose();
            } else if (selection == 3) {
                if (cm.getPlayer().getCSPoints(1) >= 10000) {
                    cm.gainNX(1, -10000);
                    cm.resetBossLog("消灭蚊子");
                    cm.sendOk("重置成功！");
                    cm.dispose();
                } else {
                    cm.sendOk("你的点卷不够，无法重置。");
                    cm.dispose();
                }
            } else if (selection == 1) {//查看我打了多少蚊子，兑换礼品
                var text = "你现在一共消灭了" + getEventTimes(2, cm.getPlayer().getId()) + "蚊子。\r\n可用兑换积分为：" + getEventPoints(2, cm.getPlayer().getId()) + "\r\n#b"
                for (var i = 0; i < ItemArray.length; i++) {
                    if (ItemArray[i][2] <= 0) {
                        text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 时限： 永久  ★ 积分：(" + ItemArray[i][3] + ")\r\n"
                    } else {
                        text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 时限：" + ItemArray[i][2] + "天  ★ 积分：(" + ItemArray[i][3] + ")\r\n"
                    }
                }
                cm.sendSimple(text);
            }
        } else if (status == 2) {
            itemid = ItemArray[selection][0];
            leftday = ItemArray[selection][2];
            quantity = ItemArray[selection][1];
            needpoints = ItemArray[selection][3];
            if (leftday <= 0) {
                cm.sendYesNo("你想使用" + needpoints + "积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？\r\n 使用期限：#b永久#k。");
            } else {
                cm.sendYesNo("你想使用" + needpoints + "积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？ \r\n使用期限：#b" + leftday + "天#k。");
            }
        } else if (status == 3) {
            if (cm.getSpace(1) < 2 && cm.getSpace(2) < 2 && cm.getSpace(3) < 2 && cm.getSpace(4) < 2 && cm.getSpace(5) < 2) {
                cm.sendOk("请确保您所有的背包栏都有2个以上的空格。");
                cm.dispose();
                return;
            }
            if (getEventPoints(2, cm.getPlayer().getId()) >= needpoints) {
                setEventPoints(2, cm.getPlayer().getId(), -needpoints);
                if (leftday <= 0) {
                    cm.gainItem(itemid, quantity);
                } else {
                    cm.gainItemPeriod(itemid, quantity, leftday);
                }
                status = -1;
                cm.sendOk("兑换成功了！");
            } else {
                status = -1;
                cm.sendOk("对不起，你没有足够的积分兑换。");
            }
        }
    }
}


function getBossLog(idx) {
    var idStr = "";
    for (var key in idx) {
        if (key == 0)
            idStr += idx[key];
        else
            idStr += "," + idx[key];
    }
    var sql = "SELECT max(count) as maxcount FROM bosslog where bossid = '消灭蚊子' and characterid in (" + idStr + ") and to_days(time) = to_days(now());";
    //java.lang.System.out.println(sql);
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement(sql);
    bosslogSql = pstmt.executeQuery();
    if (bosslogSql.next()) {
        return bosslogSql.getString("maxcount") * 1;
    }
    bosslogSql.close();
    pstmt.close();
    //conn.close();
    return 0;
}

function getEventTimes(Eventid, charid) {//通过eventid来得到参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("times");//得到次数
    }
    Times.close();
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//通过eventid来得到参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("points");//得到点数
    }
    Times.close();
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//通过eventid来给予参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, points);//points 点数
        insert.setString(6, getEventTimes(1, charid));//times 次数
        insert.executeUpdate(); //更新
        insert.close();
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
        update.close();
    }
}

function setEventTimes(Eventid, charid, times) {//通过eventid来设置参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, getEventPoints(2, charid));//points 点数
        insert.setString(6, times);//times 次数
        insert.executeUpdate(); //更新
        insert.close();
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
        update.close();
    }
}