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
	//var allPlayers = em.getChannelServer().getMapFactory().getMap(910000000).getCharacters();//ȡ�õ�ǰ��ͼ������������
	var allPlayers = em.getChannelServer().getPlayerStorage().getAllCharacters();
	allPlayers = allPlayers.iterator();
	while (allPlayers.hasNext()) {//ѭ��ÿһ�����
		var player = allPlayers.next();
		if (player.getMapId() == 910000000 || player.haveItem(2430865)) {
			var points = 10;//player = allPlayers.next();//
        		player.modifyCSPoints(1, 10)
        		player.modifyCSPoints(2 , 20)
        		player.gainPlayerPoints(2);
			//if (player.haveItem(2430865)) {
			//	points = 15;
			//}
			//player.modifyCSPoints(2, points);
			player.dropMessage(5,"[�����ݵ㽱��]������� 10 ���, ��� 30 ���þ�, ��� 2 �ǹ� . ");
			player.dropMessage(-1,"[�����ݵ㽱��]�� ����� 10 ���, ��� 30 ���þ�, ��� 2 �ǹ� . ");//[ "+points+" ]���þ� ");
			//player.dropMessage(-1,"[�屶�ݵ㽱��]����� [5] ���,[50] ���þ�,[25] �󶨻���ҡ�");
			//player.dropMessage(5,"[�屶�ݵ㽱��]��8��17��-20���г�ÿ30���� [5] ���,[50] ���þ�,[25] �󶨻���ҡ�");
		}			
	}
}