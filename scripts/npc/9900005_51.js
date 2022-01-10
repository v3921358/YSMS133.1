/*
 * 显示全服玩家积累的能量
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * 2015年8月20日 18:14:59
 */


var itemid, leftday, quantity, needpoints;
var ItemArray = Array(
        Array(1050286, 1, 1, 100),
        Array(3010145, 1, 2, 50),
        Array(1322005, 1, -1, 1)
        );//道具id，个数，剩余天数，所需积分


var status = 0;

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
            var text = "你现在一共可用贡献积分为：" + getEventPoints(51, cm.getPlayer().getId()) + "\r\n#b"
            for (var i = 0; i < ItemArray.length; i++) {
                if (ItemArray[i][2] <= 0) {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 时限： 永久  ★ 积分：(" + ItemArray[i][3] + ")\r\n"
                } else {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# 时限：" + ItemArray[i][2] + "天  ★ 积分：(" + ItemArray[i][3] + ")\r\n"
                }
            }
            cm.sendSimple(text);
        } else if (status == 1) {
            itemid = ItemArray[selection][0];
            leftday = ItemArray[selection][2];
            quantity = ItemArray[selection][1];
            needpoints = ItemArray[selection][3];
            if (leftday <= 0) {
                cm.sendYesNo("你想使用" + needpoints + "贡献积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？\r\n 使用期限：#b永久#k。");
            } else {
                cm.sendYesNo("你想使用" + needpoints + "贡献积分来兑换#i" + itemid + "# #b#t" + itemid + "##k 吗？ \r\n使用期限：#b" + leftday + "天#k。");
            }
        } else if (status == 2) {
            if (cm.getSpace(1) < 2 && cm.getSpace(2) < 2 && cm.getSpace(3) < 2 && cm.getSpace(4) < 2 && cm.getSpace(5) < 2) {
                cm.sendOk("请确保您所有的背包栏都有2个以上的空格。");
                cm.dispose();
                return;
            }
            if (getEventPoints(51, cm.getPlayer().getId()) >= needpoints) {
                setEventPoints(51, cm.getPlayer().getId(), -needpoints);
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



function DelEventPoints(Eventid, charid) {
    var delectData = cm.getConnection().prepareStatement("delete from EventTimes where eventid = " + Eventid + " and cid = " + charid + "");
    delectData.executeUpdate(); //删除数据
}

function getEventTimes(Eventid, charid) {//通过eventid来得到参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("times");//得到次数
    }
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//通过eventid来得到参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("points");//得到点数
    }
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//通过eventid来给予参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, points);//points 点数
        insert.setString(6, getEventTimes(1, charid));//times 次数
        insert.setString(7, null);//
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
    }
}

function setEventTimes(Eventid, charid, times) {//通过eventid来设置参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, getEventPoints(2, charid));//points 点数
        insert.setString(6, times);//times 次数
        insert.setString(7, null);//
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
    }
}
