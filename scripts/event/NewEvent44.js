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
        var allPlayers = em.getChannelServer().getMapFactory().getMap(951000100).getCharacters();//ȡ�õ�ǰ��ͼ������������
        allPlayers = allPlayers.iterator();
        while (allPlayers.hasNext()) {//ѭ��ÿһ�����
            var player = allPlayers.next();
	    player.modifyCSPoints(1, 50)
	    player.modifyCSPoints(2, 100)
            player.gainPlayerPoints(+10);
	player.dropMessage(5,"����ݵ��ͼ������ǰ�ݵ��� [50] ���,[ 100 ] ���þ�,[10] ѩ���ҡ�");
	player.dropMessage(-1,"����ݵ��ͼ������� [50] ���,[100] ���þ�,[10] ѩ���ҡ�");
	    
        }
}
