//_每日定时开启限量领取礼包

var status = -1;
var text;

var starttime = "2016-1-1 22:28:00";//活动每天刷新开启时间
var endtime = "2016-1-8 00:32:00";//活动结束时间


var invtype = new Array("装备", "消耗", "设置", "其他", "特殊");

var maxcount = 20;

var packages1 = new Array(
    Array(5062009, 100),
    Array(5062500, 100),
    Array(5750000, 100)
    );
var packages2 = new Array(
    Array(5062009, 50),
    Array(5062500, 50),
    Array(5250000, 50)
    );
var packages3 = new Array(
    Array(5062009, 10),
    Array(5062500, 10),
    Array(5750000, 10)
    );

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var currdate = new Date();
    var define_starttime = new Date(Date.parse(starttime.replace(/-/g,"/")));
    var define_endtime =   new Date(Date.parse(endtime.replace(/-/g,"/")));

    if (currdate < define_starttime || currdate > define_endtime) {
        cm.sendOk("亲，神秘礼包数量有限，来晚了就没有了哦\r\n\r\n非活动时间…… \r\n\r\n活动开始时间：#r" + starttime + "#k\r\n" + "活动结束时间：#r" + endtime);
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendNext("亲爱的玩家您好，这里是每日限时领取限量神秘礼包\r\n\r\n礼包内有神秘礼物在等着亲来领取哦\r\n\r\n神秘礼包内的礼物会不定期更新,来晚了可就没有了哦");
    } else if (status == 1) {
        var count = cm.getEventLogForDay("限量神秘礼包");
        var packages = new Array();
        var gRMB = false;
        if (count >= 0 && count < 1) {
            packages = packages1;
            gRMB = true;
        } else if (count >= 1 && count < 10) {
            packages = packages2;
        } else if (count >= 10 && count < 20) {
            packages = packages3;
        } else {
            cm.sendOk("很抱歉现在礼包已经发放完毕。");
            cm.dispose();
            return;
        }

        if (!checkSpace(packages)) {  //这里是检测包裹的，满了会直接提示玩家，不执行后面的操作，所以你要给什么东西都应该加在这个后面
            return;
        }

        if (gRMB) {
            cm.gainRMB(100);
        }

        for (var i in packages) {
            cm.gainItem(packages[i][0], packages[i][1]);
        }
        cm.sendOk("领取完毕");
        cm.setEventLogForDay("限量神秘礼包");
        //cm.worldMessageEffect("[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1), 1, 10);
	cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[限量神秘礼包] 恭喜" + cm.getName() + "市场NPC流星妹妹处领取,限量神秘礼包，目前剩余 " + (maxcount - count - 1));

        cm.dispose();
    }
}

function checkSpace(packages) {
    var haveSpace = 0;
    var needSpace = new Array(5);
    for (var i = 1; i <= 5; i++) {
        for (var j in packages) {
            needSpace[Math.floor(packages[j][0] / 1000000)] += 1;
        }
    }
    for (var i in needSpace) {
        if (cm.getSpace(i) < needSpace[i]) {
            haveSpace = i;
            break;
        }
    }
    if (haveSpace > 0) {
        cm.sendOk("您的#b" + invtype[haveSpace] + "栏#k剩余空间不足" + needSpace[haveSpace] + "格，请清理一下再来吧…");
        cm.dispose();
        return false;
    }
    return true;
}