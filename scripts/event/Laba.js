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
	if (setupTask!=null)
  		setupTask.cancel(true);
}

function start() {
	var cal = java.util.Calendar.getInstance();
	var hour = cal.get(java.util.Calendar.HOUR);
	var min = cal.get(java.util.Calendar.MINUTE);
	var sec = cal.get(java.util.Calendar.SECOND);
	var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
	var month = cal.get(java.util.Calendar.MONTH) + 1; //����·�
	var day = cal.get(java.util.Calendar.DATE); //��ȡ��
	weekday-=1;
	scheduleNew();
	if(hour == 19 && (minute == 40) && (weekday == 6 || weekday == 5 || weekday == 0)){
		//em.broadcastServerMsg(5121028,"20���Ӻ󽫿��� < ��ţ�̻ >�����ץ��ʱ������׼���ɣ�",true);
	}
	/* if (hour == 13 && (min >= 0 && min <= 20)) {
		//em.startSuperlabaed("ÿСʱ����<��ս����>���г�������������,��ʿ�ǿ������������..",5121010);
		em.broadcastServerMsg(5120074,"����13������޻����ؿ���ʼ�ˡ�20���Ӻ󽫹ر��ˣ���ץ����ս��",true);
	} else if (hour == 20 && (min >= 0 && min <= 20)) {
		//em.broadcastServerMsg(5120074," < ���� > ������ˣ����ڴ��¸�Сʱ50�ֵ�ʱ�������������Ŷ.",true);
		em.broadcastServerMsg(5120074,"����20������޻����ؿ���ʼ�ˡ�20���Ӻ󽫹ر��ˣ���ץ����ս��",true);
	}
	} else if (min == 50) {
		//em.broadcastServerMsg(5120074," < ���� > ������ˣ����ڴ��¸�Сʱ50�ֵ�ʱ�������������Ŷ.",true);
		em.broadcastServerMsg(5120074,"ÿСʱ50���ӵĴ������г�12���ſ�<������>��ʼ�ˡ�5���Ӻ�رա�",true);
	}
	} else if (min == 55) {
		em.broadcastServerMsg(5120074," < ���� > ������ˣ����ڴ��¸�Сʱ50�ֵ�ʱ�������������Ŷ.",true);
		//em.broadcastServerMsg(5120074,"ÿСʱ50���ӵĴ������г�<������>��ʼ�ˡ�5���Ӻ�رա�",true);
	}  
	 if (min == 40) {
		//em.startSuperlabaed("ÿСʱ����<��ս����>���г�������������,��ʿ�ǿ������������..",5121010);
		em.broadcastServerMsg(5120030,"ÿСʱ40��ʱ�� < ���� > ���г�17���ſں�����鴦������,С�����ץ��ʱ������ҵ��..",true);
	} else if (min == 45) {
		em.broadcastServerMsg(5120030," < ���� > ������ˣ����ڴ��¸�Сʱ40�ֵ�ʱ�������������Ŷ.",true);
	}*/
 	if (min == 10) {
		//em.startSuperlabaed("ÿСʱ����<��ս����>���г�������������,��ʿ�ǿ������������..",5121010);
		em.broadcastServerMsg(5121051,"ÿСʱ10��ʱ�� < �������� > ���г�[12��]��������,С�����ץ��ʱ�䱨��ѩ�ް�..",true);
	} else if (min == 13) {
		em.broadcastServerMsg(5121051," < �������� > ������ˣ����ڴ��¸�Сʱ10�ֵ�ʱ�������������ѩ��.",true);
	}
	/*if ((month == 1 || month == 1) && (day == 1 || day == 21 || (day >=1 && day<=5)) && hour == 0 && min ==05 ) {
		em.broadcastServerMsg(5120074,"ʥ�����˿��������������ֻ��5����ʱ�䣬����ǰ����ȡ��",true);
	}*/
    
}
