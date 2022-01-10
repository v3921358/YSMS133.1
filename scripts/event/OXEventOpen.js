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
        //nextTime += 1000; //���ö�ÿ���
	nextTime += 1000 * 60 * 50;
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
   // �˹������Ļ������������{setupTask = em.scheduleAtTimestamp("startEvent", nextTime);}�Ϳ����ˡ�
}

function startEvent() {
    em.setProperty("open", "true");
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 10);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 3; //���ö�ý���
    }
    setupTask = em.scheduleAtTimestamp("finishEvent", nextTime);
    em.broadcastServerMsg(5120026, "OX������Ѿ���ʼ���������ٶȴ�1���г� [��������] �������ڽ���Ŷ��", true);
    em.broadcastServerMsg("[OX�����]  �����Ѿ������������ٶȴ�1���г� [��������] �������ڽ���Ŷ��");
}

function finishEvent() {
    em.broadcastServerMsg("[OX�����] �����Ѿ��رգ�����50���Ӻ��ٴο��ţ�");
    scheduleNew();
}

function cancelSchedule() {
    if (setupTask != null) {
        setupTask.cancel(true);
    }
}