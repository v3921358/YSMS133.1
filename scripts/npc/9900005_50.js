/*
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * 2015年8月14日 20:53:21
 * 许愿树系统
 * 
 * 许愿系统event入口设置
 *  - wish = open  开放许愿状态
 *  - wish = close 关闭许愿状态
 *  - 许愿系统有第X期，每个帐号每期只能参与一次，一天一期。
 *  - 每天中午12点刷新和开放
 *  
 *  没有实现的愿望就删除掉，不保留了。
 *  wishstatus - 0奖励还没有领取 1奖励已经领取
 *  且记录超过只查询7天内的
 *  
 *  wishitem 为 1点券
 *              2抵用
 *              3元宝
 */

var iconComit = "#fUI/UIWindow2/CN_Survey/BtSubmit/normal/0#"
var iconGhost = "#fUI/UIWindow2/FadeForEvent/icon1#"
var eim, em;
var status = 0;
var typed;
var text = " ";
var wishstatus;
var record = new Array();
var WishTimes = 1;

//许愿池
var WishList = new Array(
        new Array(5062009, 1),
        new Array(5062500, 1),
        new Array(2431944, 1),
        new Array(2431945, 1),
        new Array(2046007, 1),
        new Array(2046006, 1),
        new Array(2046106, 1),
        new Array(2046107, 1),
        new Array(2049752, 1)
        );//itemid,数量

function start() {
    status = -2;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == -1) {
        em = cm.getEventManager("WishTreeSystem");
        eim = em.getInstance("WishTreeSystem")
        if (eim == null) {
            cm.sendOk("现在活动还没有开始，或者管理员还没有设置成开放状态。")
            cm.dispose();
        } else {
            if (em.getProperty("WishName") == "null") {
                cm.sendNext("今天还没有公布愿望之星哦~~ 请点击下一步继续。")
            } else {
                cm.sendNext("今日的愿望之星是:\r\n#b" + em.getProperty("WishName") + "！\r\n#r - 请点击下一步继续哦~~");
            }
        }
    } else if (status == 0) {
        if (eim == null) {
            cm.sendOk("现在活动还没有开始，或者管理员还没有设置成开放状态。")
            cm.dispose();
        } else {
            // var text = "今日愿望之星：\r\n"
            //text += "1、测试小先锋\r\n"
            text = "#e-------------------------------------------#n\r\n"
            text += "\t\t\t\t" + iconGhost + "#r#e#h0##n" + iconGhost + "#d\r\n\t\t我是充满希望的许愿精灵，你想做什么呢？\r\n#b"
            //if (em.getProperty("wish") == "open") {//如果是许愿开放状态
            text += "\t\t   #d#e#L0# 我想向精灵许愿！！#l\r\n"
            // }
            text += "\t#L2##r点击查询我的愿望清单！！！（领奖）#b#l\r\n\r\n"
            text += "-------------------------------------------\r\n"
            text += "      #L1#查看许愿精灵的正确使用方法。#l\r\n\r\n"
            cm.sendSimple(text);
        }
    } else if (status == 1) {
        typed = selection;
        switch (selection) {
            case 2:
                var i = 0;
                text = "现在是你的愿望清单：\r\n#r - 如果显示已实现，请点击领取奖励！\r\n#b"
                var AllRecordStore = cm.getConnection().prepareStatement("SELECT * FROM wishtreesystem_store where wishCharid = " + cm.getPlayer().getId() + " Order By  id Desc LIMIT 100").executeQuery();
                var AllRecord = cm.getConnection().prepareStatement("SELECT * FROM wishtreesystem where wishCharid = " + cm.getPlayer().getId() + "").executeQuery();
                while (AllRecord.next()) {//得到许愿仓库的记录数据
                    // 0 未公布 1 未实现 2已实现 3已领取
                    text += "\r\n#L" + i + "#[第#r" + AllRecord.getString("id") + "#b个]  #v" + AllRecord.getString("wishitem") + "#  #t" + AllRecord.getString("wishitem") + "##l  #d - 未公布#b"
                    var recordPart = Array(AllRecord.getString("id"), AllRecord.getString("wishitem"), AllRecord.getString("wishitemQty"), AllRecord.getString("wishstatus"));
                    record.push(recordPart);
                    i++;
                }
                while (AllRecordStore.next()) {//得到记录数据
                    // 0 未公布 1 未实现 2已实现 3已领取
                    if (AllRecordStore.getString("wishstatus") == 1) {//未实现
                        text += "\r\n#L" + i + "#[第#r" + AllRecordStore.getString("wishid") + "#b个]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #d -未实现#b"
                    } else if (AllRecordStore.getString("wishstatus") == 2) {//已实现
                        text += "\r\n#L" + i + "#[第#r" + AllRecordStore.getString("wishid") + "#b个]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #r - 已实现#b"
                    } else if (AllRecordStore.getString("wishstatus") == 0) {//未公布
                        text += "\r\n#L" + i + "#[第#r" + AllRecordStore.getString("wishid") + "#b个]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #d - 未公布#b"
                    } else if (AllRecordStore.getString("wishstatus") == 3) {//已领取
                        text += "\r\n#L" + i + "#[第#r" + AllRecordStore.getString("wishid") + "#b个]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #d - 已领取#b"
                    }
                    i++;
                    var recordPart = Array(AllRecordStore.getString("wishid"), AllRecordStore.getString("wishitem"), AllRecordStore.getString("wishitemQty"), AllRecordStore.getString("wishstatus"));
                    record.push(recordPart);
                }
                if (i == 0) {
                    cm.sendOk("不好意思，现在暂时没有您的许愿清单。 \r\n许愿清单需要每日更新愿望之星之后，才能显示。");
                    status = -1;
                } else {
                    cm.sendSimple(text);
                    status = 3;
                }
                break;
            case 1:
                cm.sendNext("许愿的话，请选择目前许愿池的物品。这么多东西，肯定有一些是你想要的！选择好自己想要的东西之后，填写许愿感想，就可以载入愿望清单了！许愿系统每天固定时间将会找出愿望成真的人，并且全服公告。如果你想成为愿望之星的话，就来找我吧！！")
                status = -1;
                break;
            case 0:
                //if (em.getProperty("wish") == "open") {//如果是许愿开放状态
                if (em.getProperty("wish") == "close") {//如果是许愿关闭状态
                    var text = "现在许愿池有下列东西，你想许愿得到什么物品呢？\r\n#b"
                    for (var i = 0; i < WishList.length; i++) {
                        if (WishList[i][0] == 1) {//点券
                            text += "#L" + i + "# 许愿获得 " + WishList[i][1] + " 点券！！\r\n"
                        } else if (WishList[i][0] == 2) {//抵用券
                            text += "#L" + i + "# 许愿获得 " + WishList[i][1] + " 抵用券！！\r\n"
                        } else if (WishList[i][0] == 2) {//元宝
                            text += "#L" + i + "# 许愿获得 " + WishList[i][1] + " 元宝！！\r\n"
                        } else {
                            text += "#L" + i + "# 许愿获得 #i" + WishList[i][0] + "# #t" + WishList[i][0] + "#!!\r\n"
                        }
                    }
                    cm.sendSimple(text);
                } else {
                    //cm.sendOk("现在是许愿池统计状态，暂时不能许愿。\r\n #r - 请等待1分钟后再试。");
		    cm.sendOk("现在是许愿池关闭状态，暂时不能许愿。\r\n\r\n #r - 请等待周六开启后再试。\r\n\r\n#b许愿池开启关闭时间为：每周六早上开启，周日晚上关闭：");
                    status = -1;
                }
                break;
        }
    }
    else if (status == 2) {
        if (cm.getBossLogAcc("许愿系统") >= WishTimes) {
            cm.sendOk("一天一个帐号只能许愿" + WishTimes + "次，您今天不能再许愿了！");
            status = -1;
        } else {
            typed = selection;
            cm.sendGetText("请输入您的愿望感想，感想写得越真实，获奖的几率将更高哦~~~\r\n");
        }
    } else if (status == 3) {
        InsertWish(WishList[typed][0], WishList[typed][1], cm.getText());
        cm.sendOk("载入愿望清单成功！请等待每天定时更新的愿望之星，希望名单上有你的名字~！")
        cm.setBossLogAcc("许愿系统")
        cm.dispose();
    } else if (status == 4) {
        typed = selection;
        if (record[typed][3] != 2) {//如果不是已实现状态
            cm.sendNext("选择的愿望已经领取或者还未领取或者已经领取了，不能继续进行。");
            status = -1;
        } else {// 奖励实现部分
            if (cm.getSpace(1) < 1 || cm.getSpace(2) < 1 || cm.getSpace(3) < 1 || cm.getSpace(4) < 1 || cm.getSpace(5) < 1) {
                cm.sendOk("请让你所有的背包腾出一格后再试。");
                cm.dispose();
                return;
            }
            cm.gainItem(record[typed][1], record[typed][2]);//获得奖励
            UpdateData(record[typed][0], 3);//设置成已经领取了。
            cm.sendOk("领取许愿道具成功！！希望你能一直好运！！");
            status = -1;
        }
    }
}

function UpdateData(wishid, status) {
    var UpDateStatus = cm.getConnection().prepareStatement("update wishtreesystem_store set wishstatus=? where wishid =  " + wishid + " and wishCharid = " + cm.getPlayer().getId() + "")
    UpDateStatus.setString(1, status);//设置状态
    UpDateStatus.executeUpdate();
}

function InsertWish(wishitem, wishitemqty, wishnote) {
    var insert = cm.getConnection().prepareStatement("INSERT INTO wishtreesystem(id,wishCharid,wishCharName,wishitem,wishitemQty,wishNote) values (?,?,?,?,?,?)");
    insert.setString(1, null); //载入记录ID
    insert.setString(2, cm.getPlayer().getId()); //cid
    insert.setString(3, cm.getPlayer().getName()); //itemid
    insert.setString(4, wishitem); //愿望道具
    insert.setString(5, wishitemqty); //愿望道具数量
    insert.setString(6, wishnote); //许愿留言
    insert.executeUpdate(); //更新
    insert.close();
}