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
        nextTime += 1000 * 30;
    }
    setupTask = em.scheduleAtTimestamp("start", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function start() {
    scheduleNew();
        var allPlayers = em.getChannelServer().getMapFactory().getMap(704000000).getCharacters();//ȡ�õ�ǰ��ͼ������������
        allPlayers = allPlayers.iterator();
        while (allPlayers.hasNext()) {//ѭ��ÿһ�����
            var player = allPlayers.next();
	    //player.modifyCSPoints(1, 1)
	    player.modifyCSPoints(2, 15);
            //player.gainPlayerPoints(+5);
	player.dropMessage(5,"[�ݵ㽱��]����� [ 15 ] ���þ� ");
	player.dropMessage(-1,"[�ݵ㽱��]�� ���[ 15 ]���þ� ");
	//player.dropMessage(-1,"[�屶�ݵ㽱��]����� [5] ���,[50] ���þ�,[25] �󶨻���ҡ�");
	//player.dropMessage(5,"[�屶�ݵ㽱��]��8��17��-20���г�ÿ30���� [5] ���,[50] ���þ�,[25] �󶨻���ҡ�");
	    
        }
}
