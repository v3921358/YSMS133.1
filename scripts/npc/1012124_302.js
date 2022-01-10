/*
 完成时间：2013年8月11日 13:05:43
 脚本功能：大陆移动卷轴
 */
var isopenvip = false;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";

var monstermaps = Array(
        Array(50000, "适合 1级 ~ 10级 的玩家"),
        Array(100010100, "适合 3级 ~ 10级 的玩家"),
        Array(101020100, "适合 8级 ~ 15级 的玩家"),
        Array(102030000, "适合 15级 ~ 20级 的玩家"),
        Array(102030400, "适合 20级 ~ 30级 的玩家"),
        Array(551000200, "适合 30级 ~ 50级 的玩家"),
        Array(600020300, "适合 50级 ~ 80级 的玩家"),
        Array(702010000, "适合 80级 ~ 90级 的玩家"),
        Array(220060000, "适合 90级 ~ 100级 的玩家"),
        Array(541010010, "适合 90级 ~ 100级 的玩家"),
        Array(220060200, "适合 100级 ~ 110级 的玩家"),
        Array(220060201, "适合 110级 ~ 120级 的玩家"),
        Array(240040510, "适合 120级以上 的玩家"),
        Array(270030100, "适合 150级以上 的玩家"),
        Array(703001200, "适合 160级以上 的玩家")
        );


var a = 0;
var selects = 0;
var MapType;

function start() {
    a = -1;
    action(1, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else {
			cm.dispose();
			return;
        }
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {

            var text = "请选择你要接连的地方：\r\n#b"

                    for (var i = 0; i < monstermaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + monstermaps[i][0] + "# (" + monstermaps[i][1] + ")\r\n"
                    }
                    MapType = 3
                    needMoney = true;
                    cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo("在这里的事情办完了吗？确定要去你像要去的地方了吗？");
        } else if (a == 2) {

					cm.warp(monstermaps[selects][0]);


            cm.dispose();
        }//a
    }//mode
}//f