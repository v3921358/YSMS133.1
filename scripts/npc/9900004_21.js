/*
 笔芯制作★风云工作室所有
 完成时间：2013年10月28日 16:34:19
 脚本功能：挑战首领
 */

var a = 0;
var selects;
var BossList = Array(
        Array("#k#n[简单] 1-5线挑战闹钟！", 220080000),
        Array("[简单] 1-5线挑战暴力熊、心疤狮王！", 551030100),
        Array("[简单] 1-5线挑战-阿卡伊勒祭坛!", 272030000),
        Array("[简单] 1线挑战女王-艾菲尼娅!", 300030300),
        //Array("[简单] 1-5线挑战-千年树精王遗迹Ⅱ）", 541020800),
        Array("[简单] 2-4线挑战-狮子王!", 211070000),
        Array("[扎昆] 2线为普通、3线为进阶扎昆！#k#b\r\n", 211042200),


        Array("[黑龙王]   3/5线进阶2/4线为普通!", 240040700),
        Array("[品克缤]   1/2线普通3/4线为混沌!", 270050000),
	Array("[女皇]     1频道女皇 - 希纳斯的庭院!）", 271040000),
       // Array("[泰坦级] 强化钻机,弱小勿进(New~)", 703020000),
        Array("[四大天王] 1-5频道 - 四大天王BOSS! \r\n", 105200000),


        Array("#k#r[困难] 2/3线  - 三核贝勒德", 863000100),
        Array("[困难] 4/5线 - 暴君麦格纳斯", 401072000),
	Array("[困难] 4/5线 - 黑色天堂终极斯乌", 350020120)
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
            var text = "为了让您更方便的游戏，在这里可以传送到BOSS的传送点。\r\n#r管理提示：#k\r\n#n黑色区域，适合新手升级，推荐1-30W面板\r\n#b蓝色区域比较难打，推荐30W-100W面板\r\n#r红色区域，血量非常多，推荐100-200W面板\r\n请选择:\r\n#b"
            for (var i = 0; i < BossList.length; i++) {
                text += "#L" + i + "# " + BossList[i][0] + "\r\n"
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo("你现在想出发到" + BossList[selects][0] + "吗？")
        } else if (a == 2) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(BossList[selects][1], 0)
            cm.dispose();
        }//a
    }//mode
}//f