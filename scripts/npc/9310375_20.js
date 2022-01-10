/*
 * 巨大的冰块 显示全服玩家积累的能量
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * 2015年7月30日 17:06:33
 */
//进度条
var l = "#fUI/mapleBingo.img/mapleBingo/Gage/leftGage#";
var m = "#fUI/mapleBingo.img/mapleBingo/Gage/middleGage#";
var r = "#fUI/mapleBingo.img/mapleBingo/Gage/rightGage#";
var RemainQty;
var NeedItem = 4001168;//贡献物品
var status = 0;
var typed;
var em, eim;
var showListLimit = 200;

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
            em = cm.getEventManager("ZiyouPaoItem");
            eim = em.getInstance("ZiyouPaoItem")
            if (eim == null) {
                cm.sendOk("现在活动还没有开始，或者您还没有被邀请加入！\r\n请留意管理员的公告！感谢支持！")
                cm.dispose();
            } else {
                if (em.getProperty("state") == "" + em.getProperty("ItemNeedQty") + "") {
                    cm.sendOk("现在已经累计满了能量值，请等待服务器自动发出公告！");
                    cm.dispose();
                    return;
                }
                if (em.getProperty("dropstart") == "true") {
                    cm.sendOk("现在自由市场已经开始了丢道具活动了，请稍后再贡献能量点。");
                    cm.dispose();
                    return;
                }
                RemainQty = parseInt(em.getProperty("ItemNeedQty")) - parseInt(em.getProperty("state"));
                var text = "只要大家齐心协力为点点做贡献\r\n我就可以给大家很多丰富的礼品呢！#n\r\n#r消灭怪物收集#b#t" + NeedItem + "##k就可以#e采集能量#n\r\n#d能量条满的时候将会在#e自由市场#n掉落好玩的道具！！#e#d\r\n\r\n>>>>>>>>>> 目前的能量进度条 <<<<<<<<<<<<\r\n#n";
                text += "\t\t#B" + parseInt(parseInt(em.getProperty("state")) / em.getProperty("ItemNeedQty") * 100) + "#\r\n#b"
                text += "#b#e#L1# 提交#t" + NeedItem + "#，为点点做贡献！！#l";
                text += "\r\n#b#e#L0# 查看我贡献了多少能量点。#l\r\n";
                text += "#b#e#L3# 查看贡献排行榜！！#l\r\n"
                text += "#r#e#L4# >> 根据贡献点兑换礼品 << #l\r\n"
                if (cm.getPlayer().isGM()) {
                    text += "#r#e#L2#  #e重置所有能量点（管理员可见）#n#k#l\r\n";
                }
                cm.sendSimple(text);
            }
        } else if (status == 1) {
            if (selection == 4) {
                cm.dispose();
                cm.openNpc(cm.getNpc(), 21);
            }
            else if (selection == 3) {
                Ranking();
                status = -1;
            }
            else if (selection == 1) {
                cm.sendGetNumber("请输入您要贡献多少个#b#t" + NeedItem + "##k？", 0, 0, RemainQty);
            } else if (selection == 2) {
                em.setProperty("state", "0");
                cm.sendOk("重置成功。");
                status = -1;
            } else {
                cm.sendNext("亲爱的#e#h0##n冒险家：\r\n#d截至目前您一共贡献了#r#e" + getEventTimes(51, cm.getPlayer().getId()) + "#d#n能量点！");
                status = -1;
            }
        } else if (status == 2) {
            if (selection == 0) {
                cm.sendNext("请输入一个大于0的数！");
                status = -1;
            } else
            if (cm.getItemQuantity(NeedItem) >= selection) {
                em.setProperty("state", "" + (parseInt(em.getProperty("state")) + selection) + "");
                cm.sendOk("贡献成功！目前现在全服务器的能量点为：" + em.getProperty("state") + "！\r\n继续加油努力吧！！");
                setEventPoints(51, cm.getPlayer().getId(), selection);
                setEventTimes(51, cm.getPlayer().getId(), selection);
                cm.gainItem(NeedItem,-selection);
                status = -1;
            } else {
                cm.sendOk("你好像没有足够的#b#t" + NeedItem + "##k！\r\n请检查一下再来。");
                status = -1;
            }
        }
    }
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

function Ranking() {
    var text = "            #d★ 全服十大贡献排行榜 ★\r\n\r\n#k"
    text += "\t#e名次\t\t玩家名称\t\t\t\t\t贡献值\r\n#n"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM EventTimes where eventid = 51 ORDER BY points DESC LIMIT 10 ");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        if (i == 1) {
            text += "\t#r" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else
        if (i == 2) {
            text += "\t#g" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else
        if (i == 3) {
            text += "\t#b" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else {
            text += "\t" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        }
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(text);
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
