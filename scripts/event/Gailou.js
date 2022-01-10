var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    em.setProperty("state", "false");
    em.setProperty("endEvent", "true");
    em.setProperty("check", "0");
    em.setProperty("maxCheck", "9999999");
    //var cal = java.util.Calendar.getInstance();
    //cal.set(java.util.Calendar.HOUR, 0);
    //cal.set(java.util.Calendar.MINUTE, 50);
    //cal.set(java.util.Calendar.SECOND, 0);
    //var nextTime = cal.getTimeInMillis();
    //while (nextTime <= java.lang.System.currentTimeMillis()) {
        //nextTime += 1000 * 60 * 50 * 1; //设置多久开启
        //nextTime += 1000 * 60 * 50 ; //设置多久开启

    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 50);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 60; //设置多久开启
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
}

function startEvent() {
    em.setProperty("state", "true");
    em.setProperty("endEvent", "false");
    em.setProperty("check", 0);
    em.setProperty("maxCheck", "" + getMaxCheck(Math.floor(Math.random() * 2)));
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 10);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 10; //设置多久结束
    }
    setupTask = em.scheduleAtTimestamp("finishEvent", nextTime);
	//em.broadcastServerMsg(5121034, "激情抢楼活动已经开始，请找自由市场NPC[裂空之鹰]盖楼,可以获得10倍普通盖楼的奖励",true);
	em.broadcastServerMsg(5121034, "抢楼活动已经开始，请找自由市场NPC[财神]盖楼,有概率获得极真装备，宿命饰品卷，漩涡等",true);
    em.broadcastServerMsg("[抢楼活动]  活动已经开启。10分钟后结束，第1个达到 " + em.getProperty("maxCheck") + " 楼的玩家将获得丰厚的奖励。");
}

function finishEvent() {
    if (em.getProperty("endEvent").equals("false")) {
        em.broadcastServerMsg("[抢楼活动] 活动已经结束。50分钟后开启。本次活动未开出所有奖励，请大家再接再厉。");
    } else {
        em.broadcastServerMsg("[抢楼活动] 本次活动所有奖励已经发放，下次活动将在50分钟后开启，希望大家积极参加。");
    }
    scheduleNew();
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}

function getMaxCheck(type) {
    switch (type) {
    case 0:
        return 488;
    case 1:
        return 488;
    case 2:
        return 488;
    }
    return 488;
}

function rand(lbound, ubound) {
    return Math.floor(Math.random() * (ubound - lbound)) + lbound;
}