/*
 笔芯制作★风云工作室所有
 完成时间：2013年10月28日 16:34:19
 脚本功能：挑战首领
 */

var a = 0;
var selects;
var head = "";//#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n
var BossList = Array(
        Array("[低级] 闹钟！【无限次】", 220080000),
        Array("[低级] 暴力熊/心疤狮王！【无限次】", 551030100),
        Array("2频道简单扎昆/3频道进阶扎昆.【简单4/进阶3】", 211042200),
        Array("3频道进阶黑龙王/2和4频道简单黑龙王【简单4/进阶3】", 240040700),
        Array("1频道简单品克缤/2频道混沌品克缤【简单1/进阶1】", 270050000),
       // Array("[普通] 次元缝隙-阿卡伊勒祭坛", 272030000),
        Array("[低级]妖精女王【无限次】", 300030300),
		Array("#r[高级]女皇【每天1次】", 271040000),
        //Array("#r[泰坦级] 强化钻机,弱小勿进(New~)", 703020000),
        Array("#r[高级]  四大天王BOSS【凭钥匙进入】 。", 105200000),
       // Array("[强化BOSS] 三头犬 - 血量非常多。", 510101100),
        Array("[高级] 千年树精王遗迹Ⅱ【无限次】", 541020800),
        Array("[高级] 狮子王之城 【每日1次】", 211070000),
        Array("#d[噩梦级] 三核贝勒德【每日2次】", 863000100),
        Array("[噩梦级]  暴君麦格纳斯【每日2次】", 401072000)
        )

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
            var text = head + "为了更方便的游戏，在这里可以传送到BOSS的传送点。\r\n#b"
            for (var i = 0; i < BossList.length; i++) {
                text += "#L" + i + "# " + BossList[i][0] + "\r\n"
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo(head + "你现在想出发到" + BossList[selects][0] + "吗？")
        } else if (a == 2) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(BossList[selects][1], 0)
            cm.dispose();
        }//a
    }//mode
}//f