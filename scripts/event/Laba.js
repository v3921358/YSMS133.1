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
	var month = cal.get(java.util.Calendar.MONTH) + 1; //获得月份
	var day = cal.get(java.util.Calendar.DATE); //获取日
	weekday-=1;
	scheduleNew();
	if(hour == 19 && (minute == 40) && (weekday == 6 || weekday == 5 || weekday == 0)){
		//em.broadcastServerMsg(5121028,"20分钟后将开启 < 挤牛奶活动 >，大家抓紧时间做好准备吧！",true);
	}
	/* if (hour == 13 && (min >= 0 && min <= 20)) {
		//em.startSuperlabaed("每小时副本<挑战粉扎>在市场刘备处开放了,勇士们快组队征服它吧..",5121010);
		em.broadcastServerMsg(5120074,"下午13点的无限火力关卡开始了。20分钟后将关闭了，请抓紧挑战。",true);
	} else if (hour == 20 && (min >= 0 && min <= 20)) {
		//em.broadcastServerMsg(5120074," < 答题 > 活动结束了，请期待下个小时50分的时候继续回来答题哦.",true);
		em.broadcastServerMsg(5120074,"晚上20点的无限火力关卡开始了。20分钟后将关闭了，请抓紧挑战。",true);
	}
	} else if (min == 50) {
		//em.broadcastServerMsg(5120074," < 答题 > 活动结束了，请期待下个小时50分的时候继续回来答题哦.",true);
		em.broadcastServerMsg(5120074,"每小时50分钟的答题在市场12洞门口<诸葛孔明>开始了。5分钟后关闭。",true);
	}
	} else if (min == 55) {
		em.broadcastServerMsg(5120074," < 答题 > 活动结束了，请期待下个小时50分的时候继续回来答题哦.",true);
		//em.broadcastServerMsg(5120074,"每小时50分钟的答题在市场<诸葛孔明>开始了。5分钟后关闭。",true);
	}  
	 if (min == 40) {
		//em.startSuperlabaed("每小时副本<挑战粉扎>在市场刘备处开放了,勇士们快组队征服它吧..",5121010);
		em.broadcastServerMsg(5120030,"每小时40分时的 < 答题 > 在市场17洞门口红粉天书处开放了,小伙伴们抓紧时间做作业吧..",true);
	} else if (min == 45) {
		em.broadcastServerMsg(5120030," < 答题 > 活动结束了，请期待下个小时40分的时候继续回来答题哦.",true);
	}*/
 	if (min == 10) {
		//em.startSuperlabaed("每小时副本<挑战粉扎>在市场刘备处开放了,勇士们快组队征服它吧..",5121010);
		em.broadcastServerMsg(5121051,"每小时10分时的 < 不忘国耻 > 在市场[12洞]处开放了,小伙伴们抓紧时间报仇雪恨吧..",true);
	} else if (min == 13) {
		em.broadcastServerMsg(5121051," < 不忘国耻 > 活动结束了，请期待下个小时10分的时候继续回来报仇雪恨.",true);
	}
	/*if ((month == 1 || month == 1) && (day == 1 || day == 21 || (day >=1 && day<=5)) && hour == 0 && min ==05 ) {
		em.broadcastServerMsg(5120074,"圣诞老人开服红包开抢啦，只有5分钟时间，速速前往领取！",true);
	}*/
    
}
