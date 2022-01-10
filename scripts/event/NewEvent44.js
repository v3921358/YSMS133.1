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
        nextTime += 1000 * 5;
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
        var allPlayers = em.getChannelServer().getMapFactory().getMap(951000100).getCharacters();//取得当前地图上面的所有玩家
        allPlayers = allPlayers.iterator();
        while (allPlayers.hasNext()) {//循环每一个玩家
            var player = allPlayers.next();
	    player.modifyCSPoints(1, 50)
	    player.modifyCSPoints(2, 100)
            player.gainPlayerPoints(+10);
	player.dropMessage(5,"『活动泡点地图』：当前泡点获得 [50] 点卷,[ 100 ] 抵用卷,[10] 雪花币。");
	player.dropMessage(-1,"『活动泡点地图』：获得 [50] 点卷,[100] 抵用卷,[10] 雪花币。");
	    
        }
}
