/*
 脚本功能：拍卖脚本V2版
 */

var a = 0;
var icon = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
//"#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
//"#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var List = Array(
        //Array(icon + " #r赞助 <-> 芒果冒险岛 <-> 链接你我#k\r\n", 703, 0),
		//Array(icon + " #b芒果冒险岛新人七天登录奖励#k\r\n", 708, 0),
        //Array(icon + " #r芒果冒险岛推广奖励系统#e#b << [HOT]#n#k\r\n", 704, 0),
		Array(icon + " #n返回市场#k", 99, 1),
        Array(icon + " #n万能传送#k", 2, 1),
		Array(icon + " #r会员服务#k", 606, 1),
		Array(icon + " #n职业转职#k", 4, 1),
		Array(icon + " #n物品删除#k", 500, 1),
		Array(icon + " #n芒果 T V#k\r\n", 40, 1),

        Array(icon + " #r我要变强#k", 37, 1),
		Array(icon + " #r活动公告#k", 42, 1),
        Array(iconEvent + " #r福利专区#k", 38, 1),
		Array(icon + " #n更多服务#k", 702, 1),
		Array(icon + " #n商店专区#k", 36, 1),
        Array(iconEvent + " #n天天任务#k", 39, 1), //TODO
		Array(iconEvent + " #r每日打宝", 46, 2),
        Array(iconEvent + " 特色副本", 108, 2),
		Array(icon + " BOSS传送#k\r\n", 13, 2),






		//Array(icon + " #n金币商店#k", 999, 2),
		//Array(icon + " #n#r点卷商城#k", 152, 2),
       // Array(icon + " #n#r抵用商城#k", 27, 2), //TODO
		//Array(icon + " #b美容美发#k", 500, 1),
       // Array(icon + " #b学习技能#k", 22, 1),
		//Array(icon + " 在线奖励", 608, 1),
   		
		//Array(icon + " 充值奖励", 8, 1),
		//Array(icon + " 活跃查询#k", 23, 1),
        //Array(icon + " 游戏宝库", 10, 1), //TODO
        //Array(iconEvent + " 银行管理", 14, 1),
		//Array(icon + " #b七天签到#k", 708, 1),
       // Array(icon + " #r技能书店#k", 26, 1),
		//Array(icon + " #e#d打开网站充值[1RMB==1元宝+2000点卷]#n#k\r\n", 709, 2)
        )
/*
        //1 便民服务  2 游戏乐园
        Array(icon + " 游戏商店", 1, 1),
        //Array(icon + " 极品装备", 1008, 1),
        Array(icon + " 万能传送", 2, 1),
        Array(icon + " 抵用商城", 16, 1), //TODO
        Array(icon + " 职业转职", 4, 1),
Array(icon+"#r签到七天#K",201,1),
    //  Array(icon + " 雪花兑换", 101, 1, 9310144),
       Array("爆率查询", 5, 1),
        //Array("仓库管理", 14, 1),
        //Array("美容美发", 8, 1),
        //Array(icon + " 充值奖励", 13, 1), //TODO
        Array(icon + " 挑战首领", 13, 1),
        Array(icon + " #b更多服务#k", 6, 1),
        Array(iconEvent + " #r每日签到#k", 7, 2),
        Array(iconEvent + " #r每日任务#k", 12, 2), //TODO
        Array(iconEvent + " #r游戏副本#k", 108, 2),
        //Array(iconEvent + " #r金币商店#k", 101, 2),
        Array(icon + " #r返回市场#k", 99, 1),
        Array(icon + " #r学习技能#k", 22, 1),
        Array(icon + " #r活跃查询#k", 23, 1),
        //Array(icon+ " 飞升洗髓", 1, 1, 9000174 ),
        Array(icon + " 游戏宝库", 10, 2), //TODO
        Array(icon + " 点卷商店", 15, 2),
        //Array(icon + " 时装觉醒", 1009, 2),
        Array(icon + " 物品回收", 500, 2)
        //Array(icon + " 竞技积分", 501, 2)//TODO
*/

var text;
/*
var time = java.util.Calendar.getInstance();
var year = time.get(java.util.Calendar.YEAR);           //获得年份
var month = time.get(java.util.Calendar.MONTH) + 1;     //获得月份
var day = time.get(java.util.Calendar.DATE);            //获取日
var hour = time.get(java.util.Calendar.HOUR_OF_DAY);    //获得小时
var minute = time.get(java.util.Calendar.MINUTE);       //获得分钟
var second = time.get(java.util.Calendar.SECOND);       //获得秒
*/

//是否活动，名字，模式，类别

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            // if (cm.getBossLogAcc("初识推广")>=0) {
            //     cm.dispose();
            //     cm.openNpc(9310382, 704);
            //     return;
            // }
            text = "";
            for (var i = 0; i < 3; i++) {
                ListFor(i);
            }
            cm.sendSimple(text)
        } else if (a == 1) {
            if(selection == 999) {
                cm.dispose();
                cm.openNpc(9310382, 703);
                return;
            }
            var mode_ = List[selection][1];
            var npcid = 9330079;
            if (List[selection][3]!=null)
            {
                npcid = List[selection][3];
            }
            cm.dispose();
            cm.openNpc(npcid, mode_);
        }//a
    }//mode
}//f


function ListFor(type) {
    switch (type) {
        case 0://便民服务
        //text += "  #fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
        //text += "  " + icon2 + "芒果冒险岛:有你更精彩 ^_^ \r\n";
            //text += "  " + icon2 + "当前时间:" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "\r\n";
        text += "#n您当前在本世界在线时间：#r" + cm.getPlayer().getTodayOnlineTime() + "#k#n分钟 当前芒果 #r" + cm.getPlayerPoints() + "#k\r\n";
		text += "#n您当前可用元宝： #r" + cm.getHyPay(1) + " #k#n元#k #n累计消费金额：#r" + cm.getHyPay(2) + " #k#n元#k\r\n";
        text += "#n当前点卷: #r" + cm.getNX(1) + "  #k#n点\t 当前抵用卷: #r" + cm.getNX(2) + " #k#n点#k#n";
       // text += "#L999##b当前元宝:  #r" + cm.getHyPay(1) + " #b元宝兑换点卷#k#l\r\n";
            //text += "#e├─────── 芒果冒险岛服务 ───────┤#n\r\n"
            break;
        case 2://游戏乐园
            //text += "#e├─────── 芒果冒险岛活动 ───────┤#n\r\n"
            break;
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if(type == 0) {
                text += "#L" + i + "#" + List[i][0] + "#l";
                continue;
            }
            if (x == 2) {
                text += "#L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "#L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
    text += "\r\n";
}