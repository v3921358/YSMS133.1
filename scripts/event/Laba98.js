/*function start() {
	var cal = java.util.Calendar.getInstance();
	var hour = cal.get(java.util.Calendar.HOUR);
	var min = cal.get(java.util.Calendar.MINUTE);
	var sec = cal.get(java.util.Calendar.SECOND);
	var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
	var month = cal.get(java.util.Calendar.MONTH) + 1; //����·�
	var day = cal.get(java.util.Calendar.DATE); //��ȡ��
	weekday-=1;
	scheduleNew();
    if(month == 1) {
	  if (day >= 1 && day <= 30) {
		  if (hour == 1 ) {
			  if (min == 25) {
				  em.broadcastServerMsg(5121027,"ʥ�����˿��������������ֻ��5����ʱ�䣬����ǰ����ȡ��",true);
		}

	} 
*/



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
	 if (hour == 19 && min == 55) {//����19.55�ֿ��������� �Դ�����
		em.broadcastServerMsg(5121001," < ������ > ����20��01�����г�10���ſڡ�С��������,С����ǿ���г�����׼����.",true);
	} else if ((hour == 20 && min == 1)) {
		em.broadcastServerMsg(5121001," < ������ > ���г�10���ſڡ�С���������ˣ�С����ǸϽ���ʼ����.",true);
	//}

	} else if (hour == 20 && min == 3) {//����20:2�ֿ��������� �Դ�����
		em.broadcastServerMsg(5121001," < ������ > �����ˣ����ڴ�����20��01�ֵ�ʱ��������������Ŷ.",true);
	}


	 //if (hour == 21 && min == 5) {//2:50�� �Դ�����
		//em.broadcastServerMsg(5121001," < ��ʱ�̵� > ����21��10�����г�7���ſڡ��������á�������,С����ǿ���г�����׼����..",true);
	//} else if ((hour == 21 && min == 10)) {
		//em.broadcastServerMsg(5121001," < ��ʱ�̵� > ���г�7���ſڡ��������á��������ˣ�С����ǿ����������ص��߰ɣ����˾�û��Ŷ.",true);
	//}

	// if (hour == 21 && min == 20) {//2:50�� �Դ�����
		//em.broadcastServerMsg(5121001," < ��ʱ�̵� > �����ˣ����ڴ�����21��10�ֵ�ʱ���������������Ŷ.",true);
	//}
    
}
