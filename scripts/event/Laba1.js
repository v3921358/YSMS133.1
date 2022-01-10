var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 50);
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
	var cal = java.util.Calendar.getInstance();
	var hour = cal.get(java.util.Calendar.HOUR);
	var min = cal.get(java.util.Calendar.MINUTE);
	var sec = cal.get(java.util.Calendar.SECOND);
	
	scheduleNew();
	 if (min == 30) {
		em.broadcastServerMsg(5121007,"ÿСʱ30��ʱ�� < ����� > ���г� 5 ���ſڴ� ������,ץ��ʱ�伷�̰�..",true);
	} else if (min == 34) {
		em.broadcastServerMsg(5121007," < ����� > ������ˣ����ڴ��¸�Сʱ30�ֵ�ʱ�������������Ŷ.",true);
	}
    
}
