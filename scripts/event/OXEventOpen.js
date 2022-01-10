var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    em.setProperty("open", "false");
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 10);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        //nextTime += 1000; //设置多久开启
	nextTime += 1000 * 60 * 50;
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
   // 人工开启的话，屏蔽上面的{setupTask = em.scheduleAtTimestamp("startEvent", nextTime);}就可以了。
}

function startEvent() {
    em.setProperty("open", "true");
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 10);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 3; //设置多久结束
    }
    setupTask = em.scheduleAtTimestamp("finishEvent", nextTime);
    em.broadcastServerMsg(5120026, "OX宾果活动已经开始拉！请大家速度从1线市场 [流星妹妹] 宾果活动入口进来哦！", true);
    em.broadcastServerMsg("[OX宾果活动]  活动入口已经开启，请大家速度从1线市场 [流星妹妹] 宾果活动入口进来哦！");
}

function finishEvent() {
    em.broadcastServerMsg("[OX宾果活动] 活动入口已经关闭，将在50分钟后再次开放！");
    scheduleNew();
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}