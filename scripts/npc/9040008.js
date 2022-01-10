/*
 * 家族任务 - 排名
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本 
 */

var status = -1;
var typed;
var ItemArray = Array(
        Array(1050286, 1, 1, 100),
        Array(3010145, 1, 2, 50),
        Array(1322005, 1, -1, 1)
        );//道具id，个数，剩余天数，所需积分
var itemid, leftday, quantity, needpoints;

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        var text = "这里是家族对抗赛的基地，你想做什么呢？\r\n#b\r\n#L2# #r#e[Hot~]使用个人积分兑换礼品！#n#b\r\n#L0# 查看十大家族排名#l\r\n#L1# 查看个人积分排名！"
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            GuildRanking();
            cm.dispose();
        } else if (selection == 1) {
            PlayerPointRanking();
            cm.dispose();
        } else if (selection == 2) {
            typed = 2;
            var text = "你现在的家族对抗赛积分是：#r#e" + getEventPoints(9, cm.getPlayer().getId()) + "#k#n\r\n你现做什么？\r\n#b";
            for (var i = 0; i < ItemArray.length; i++) {
                if (ItemArray[i][2] <= 0) {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 积分：(" + ItemArray[i][3] + ")\r\n"
                } else {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 时限：" + ItemArray[i][2] + "天   积分：(" + ItemArray[i][3] + ")\r\n"
                }
            }
            cm.sendSimple(text);
        }

    }else if (status == 2){
        itemid = ItemArray[selection][0];
            leftday = ItemArray[selection][2];
            quantity = ItemArray[selection][1];
            needpoints = ItemArray[selection][3];
            if (leftday <= 0) {
                cm.sendYesNo("你想使用" + needpoints + "抽奖积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？\r\n 使用期限：#b永久#k。");
            } else {
                cm.sendYesNo("你想使用" + needpoints + "抽奖积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？ \r\n使用期限：#b" + leftday + "天#k。");
            }
    }else if (status == 3){
        if (cm.getSpace(1) < 2 && cm.getSpace(2) < 2 && cm.getSpace(3) < 2 && cm.getSpace(4) < 2 && cm.getSpace(5) < 2) {
                cm.sendOk("请确保您所有的背包栏都有2个以上的空格。");
                cm.dispose();
                return;
            }
            if (getEventPoints(9, cm.getPlayer().getId()) >= needpoints) {
                setEventPoints(9, cm.getPlayer().getId(), -needpoints);
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

function PlayerPointRanking() {
    var text = "            #d★ 每月个人家族点数排行榜 ★\r\n\r\n#k"
    text += "\t#e名次\t\t玩家名称\t\t\t积分\t\t\参与次数#n\r\n"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM eventtimes where eventid = 9 and DATE_SUB(CURDATE(), INTERVAL 1 MONTH) <= date(date) ORDER BY points DESC LIMIT 10"); //1个月内前十名
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        if (i == 1) {
            text += "\t#r" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        } else
        if (i == 2) {
            text += "\t#g" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        } else
        if (i == 3) {
            text += "\t#b" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        } else {
            text += "\t" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        }
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(text);
}

function FormatString(c, length, content) {
    var str = "";
    var cs = "";
    if (content.length > length) {
        str = content;
    } else {
        for (var j = 0; j < length - content.getBytes("GB2312").length; j++) {
            cs = cs + c;
        }
    }
    str = content + cs;
    return str;
}

function GuildRanking() {
    var text = "            #d★ 全服十大家族排行榜 ★\r\n\r\n#k"
    text += "\t#e名次\t\t家族名称\t\t\t\t\t\t族长\r\n#n"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM guilds ORDER BY GP DESC LIMIT 10");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        if (i == 1) {
            text += "\t#r" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        } else
        if (i == 2) {
            text += "\t#g" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        } else
        if (i == 3) {
            text += "\t#b" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        } else {
            text += "\t" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        }
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(text);
}

function getCharNameByCid(cid) {
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT name FROM characters where id = " + cid + "");
    var Charbase = pstmt.executeQuery();
    while (Charbase.next()) {
        return Charbase.getString("name");
    }
    Charbase.close();
}