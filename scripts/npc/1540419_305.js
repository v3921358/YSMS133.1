/*
 完成时间：2013年8月11日 13:05:43
 脚本功能：大陆移动卷轴
 */
var isopenvip = false;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var tiaotiaomaps = Array(
        Array(500000000,"水上市场"),
        Array(702000000,"蒿山镇"),
        Array(700000000,"红蛮宫入口"),
        Array(600000000,"新叶城"),
        Array(540000000,"中心商务区"),
        Array(800000000,"古代神射"),
        Array(701000000,"上海外滩"),
        Array(702100000,"大雄宝殿"),
        Array(550000000,"吉隆大都市")

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
		}
        if (a == 0) {
            var text = "请选择你要传送的地图：#b\r\n\r\n"
           for (var i = 0; i < tiaotiaomaps.length; i++) {
                       text += "#L" + i + "# "+icon+" #m" + tiaotiaomaps[i][0] + "# (" + tiaotiaomaps[i][1] + ")\r\n"
                    }
                    MapType = 3
                    needMoney = true;
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo("在这里的事情办完了吗？确定要去你像要去的地方了吗？");
        } else if (a == 2) {
			cm.warp(tiaotiaomaps[selects][0],0);
            cm.dispose();
        }//a
    }//mode
}//f