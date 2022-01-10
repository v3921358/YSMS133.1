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
	//var hour = cal.get(java.util.Calendar.HOUR);//12Сʱ��
	var hour = cal.get(java.util.Calendar.HOUR_OF_DAY);//24Сʱ��
	var min = cal.get(java.util.Calendar.MINUTE);
	var sec = cal.get(java.util.Calendar.SECOND);
	var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
	var month = cal.get(java.util.Calendar.MONTH) + 1; //����·�
	var day = cal.get(java.util.Calendar.DATE); //��ȡ��
	
	scheduleNew();
	 if (hour == 20 && min == 5) {//����20:5�ֿ��������� �Դ�����
		em.broadcastServerMsg(5121001," < ��ϲ���� > ����20��10�����г�7���ſڡ��̻����ˡ�������,С����ǿ���г�����׼����..",true);
	} else if ((hour == 20 && min == 10)) {
		em.broadcastServerMsg(5121001," < ��ϲ���� > ���г�7���ſڡ��̻����ˡ��������ˣ�С����ǸϽ���ʼ����������˾�û��Ŷ.",true);
	}

	// if (hour == 20 && min == 15) {//����20:5�ֿ��������� �Դ�����
		//em.broadcastServerMsg(5121001," < �������� > �����ˣ����ڴ�����20��10�ֵ�ʱ��������������Ŷ.",true);
	//}


	 //if (hour == 21 && min == 5) {//2:50�� �Դ�����
		//em.broadcastServerMsg(5121001," < ��ʱ�̵� > ����21��10�����г�7���ſڡ��������á�������,С����ǿ���г�����׼����..",true);
	//} else if ((hour == 21 && min == 10)) {
		//em.broadcastServerMsg(5121001," < ��ʱ�̵� > ���г�7���ſڡ��������á��������ˣ�С����ǿ����������ص��߰ɣ����˾�û��Ŷ.",true);
	//}

	// if (hour == 21 && min == 20) {//2:50�� �Դ�����
		//em.broadcastServerMsg(5121001," < ��ʱ�̵� > �����ˣ����ڴ�����21��10�ֵ�ʱ���������������Ŷ.",true);
	//}
    
}
