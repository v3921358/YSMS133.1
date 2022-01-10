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
    var allPlayers = em.getChannelServer().getMapFactory().getMap(910000000).getCharacters(); //ȡ�õ�ǰ��ͼ������������
    allPlayers = allPlayers.iterator();
    while (allPlayers.hasNext()) { //ѭ��ÿһ�����
        var player = allPlayers.next();
        player.modifyCSPoints(1, 10)
        player.modifyCSPoints(2 , 20)
        player.gainPlayerPoints(5);
        player.dropMessage(-1, "�г��ݵ㽱��  ����� 10 ���, ��� 20 ���þ�, ��� 5 �ƶ� ��");
	//player.dropMessage(-1,"[˫���ݵ㽱��]������� [4] ���,[8] ���þ�,[2] ѩ����");
	//player.dropMessage(-1,"[�屶�ݵ㽱��]��������г�ÿ60���� [10] ���,[20] ���þ�,[5] ѩ����");
	player.dropMessage(5,"[�г��ݵ㽱��]������� 10 ���, ��� 20 ���þ�, ��� 2 ѩ�� ��");

    }
}