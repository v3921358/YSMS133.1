var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60;
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
    var allPlayers = em.getChannelServer().getMapFactory().getMap(910000000).getCharacters(); //取得当前地图上面的所有玩家
    allPlayers = allPlayers.iterator();
    while (allPlayers.hasNext()) { //循环每一个玩家
        var player = allPlayers.next();
        player.modifyCSPoints(1, 10)
        player.modifyCSPoints(2 , 20)
        player.gainPlayerPoints(5);
        player.dropMessage(-1, "市场泡点奖励  您获得 10 点卷, 获得 20 抵用卷, 获得 5 云朵 。");
	//player.dropMessage(-1,"[双倍泡点奖励]：您获得 [4] 点卷,[8] 抵用卷,[2] 雪花。");
	//player.dropMessage(-1,"[五倍泡点奖励]：端午节市场每60秒获得 [10] 点卷,[20] 抵用卷,[5] 雪花。");
	player.dropMessage(5,"[市场泡点奖励]：您获得 10 点卷, 获得 20 抵用卷, 获得 2 雪花 。");

    }
}