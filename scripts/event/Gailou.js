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
        //nextTime += 1000 * 60 * 50 * 1; //���ö�ÿ���
        //nextTime += 1000 * 60 * 50 ; //���ö�ÿ���

    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 50);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 60; //���ö�ÿ���
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
        nextTime += 1000 * 60 * 10; //���ö�ý���
    }
    setupTask = em.scheduleAtTimestamp("finishEvent", nextTime);
	//em.broadcastServerMsg(5121034, "������¥��Ѿ���ʼ�����������г�NPC[�ѿ�֮ӥ]��¥,���Ի��10����ͨ��¥�Ľ���",true);
	em.broadcastServerMsg(5121034, "��¥��Ѿ���ʼ�����������г�NPC[����]��¥,�и��ʻ�ü���װ����������Ʒ�����е�",true);
    em.broadcastServerMsg("[��¥�]  ��Ѿ�������10���Ӻ��������1���ﵽ " + em.getProperty("maxCheck") + " ¥����ҽ���÷��Ľ�����");
}

function finishEvent() {
    if (em.getProperty("endEvent").equals("false")) {
        em.broadcastServerMsg("[��¥�] ��Ѿ�������50���Ӻ��������λδ�������н����������ٽ�������");
    } else {
        em.broadcastServerMsg("[��¥�] ���λ���н����Ѿ����ţ��´λ����50���Ӻ�����ϣ����һ����μӡ�");
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