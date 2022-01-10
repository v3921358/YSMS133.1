/*
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * 自由市场累计点数 抢物品
 */
var mapid = 910000000;//进行地图
var map;
var setupTask;
var CharList = new Array();
var ItemNeedQty = 1000;//全服需要累计的物品数量
var ItemList = Array(
Array(2430456, 999)//itemid,暴率  999为必暴 
//Array(2431944, 999),//140武器箱子
//Array(2431945, 999) //140级防具箱


//Array(5062009, 900), //itemid,暴率  999为必暴
//Array(5062500, 800),
//Array(2340000, 700)
        );
var 安慰道具 = 5062009;
var PosList = Array(
        Array(528, 4, "自由市场1洞"),
        Array(681, 4, "自由市场2洞"),
        Array(825, 4, "自由市场3洞"),
        Array(1024, 4, "自由市场4洞"),
        Array(1195, 4, "自由市场5洞"),
        Array(1349, 4, "自由市场6洞"),
        Array(566, -266, "自由市场7洞"),
        Array(708, -266, "自由市场8洞"),
        Array(850, -266, "自由市场9洞"),
        Array(1005, -266, "自由市场10洞"),
        Array(1152, -266, "自由市场11洞"),
        Array(1297, -266, "自由市场12洞")
        );
var dropTimes = 0;

function init() {
    scheduleNew();
    eim = em.newInstance("ZiyouPaoItem")
    map = eim.getMapInstance(mapid);
    em.setProperty("state", "0");
    em.setProperty("dropstart", "false");
    em.setProperty("ItemNeedQty", "" + ItemNeedQty + "");
    dropTimes = 0;
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        //nextTime += 1000 * 20 * 1;//1分钟公告一次。
        nextTime += 1000 * 100 * 1;//5分钟公告一次。
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}


function startEvent() {
    scheduleNew();
    if (em.getProperty("state") == "" + ItemNeedQty + "" && dropTimes == 0) {//全服累计已经达到了数量
        em.setProperty("state", "0"); //还原
        em.setProperty("dropstart", "true");
        em.schedule("dropAction", 1000 * 30 * 1);
        em.broadcastServerMsg("[幸运宝箱] 还有30秒钟就会在1线自由市场的随机地点暴出幸运宝箱，你们准备好了吗？！");
        em.broadcastServerMsg(5122015, "还有30秒钟就会在1线自由市场的随机地点暴出幸运宝箱，你们准备好了吗？！", true);
        if (em.getChannelServer() != null) {//防止关端的时候一大堆错
            var allPlayers = em.getChannelServer().getPlayerStorage().getAllCharacters();
        }
        if (allPlayers != null) {
            allPlayers = allPlayers.iterator();
            while (allPlayers.hasNext()) {//循环每一个玩家
                var player = allPlayers.next();
                player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getPVPClock(3, 30));
                //eim.broadcastPlayerMsg(6, allPlayers.length);
            }
        }
    } else {
        if (dropTimes == 0) {
            em.broadcastServerMsg("[幸运宝箱] 现在活动开始了，请在1线市场NPC流星妹妹处提交从怪物中暴出的物品金枫叶，全服累计达到一定数量，将会在自由市场的随机地方暴出许多好玩的道具哦~~大家一起来努力吧！");
            em.broadcastServerMsg("[幸运宝箱] 目前全服务器一共累计了 " + em.getProperty("state") + "点能量点。");
        }

    }
}

function dropAction() {
    if (em.getChannelServer().getChannel() == 1) {//只在第1频道进行
        if (dropTimes < 5) {//掉宝次数
            dropTimes++;
            var randPos = Math.floor(Math.random() * PosList.length); //得到随机坐标
            var randItemid = Math.floor(Math.random() * ItemList.length); //得到随机道具
            var chance = Math.floor(Math.random() * 999);
            if (chance < ItemList[randItemid][1]) {//暴率中了
                map.spawnAutoDrop(ItemList[randItemid][0], new java.awt.Point(PosList[randPos][0], PosList[randPos][1]));
                em.broadcastServerMsg("我暴拉，快来抢我吧！");
            } else {//每中，安慰道具
                map.spawnAutoDrop(安慰道具, new java.awt.Point(PosList[randPos][0], PosList[randPos][1]));
                em.broadcastServerMsg("我暴拉，快来抢我吧！");
            }
            em.broadcastServerMsg("[幸运宝箱] 在1线的" + PosList[randPos][2] + "门口爆出了幸运宝箱。幸运儿快来吧");
            em.broadcastServerMsg(5122015, "在1线的" + PosList[randPos][2] + "门口爆出了幸运宝箱。幸运儿快来吧", true);
            if (dropTimes != 5) {//掉宝次数
                em.broadcastServerMsg("[幸运宝箱] 还有30秒钟就会在1线自由市场的随机地点暴出幸运宝箱，你们准备好了吗？！");
                if (em.getChannelServer() != null) {//防止关端的时候一大堆错
                    var allPlayers = em.getChannelServer().getPlayerStorage().getAllCharacters();
                }
                if (allPlayers != null) {
                    allPlayers = allPlayers.iterator();
                    while (allPlayers.hasNext()) {//循环每一个玩家
                        var player = allPlayers.next();
                        player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getPVPClock(3, 30));
                        //eim.broadcastPlayerMsg(6, allPlayers.length);
                    }
                }
                setupTask = em.schedule("dropAction", 1000 * 30 * 1);
            } else {
                dropTimes = 0;
                em.setProperty("dropstart", "false");
                em.broadcastServerMsg(5122015, "现在活动结束啦！快点继续收集道具进行下一次的活动吧！！", true);
                em.broadcastServerMsg("[幸运宝箱] 现在活动结束啦！快点继续收集道具进行下一次的活动吧！！");
            }
        } else {
            dropTimes = 0;
        }
    }
}