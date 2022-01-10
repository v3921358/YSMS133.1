/*function start() {
	var cal = java.util.Calendar.getInstance();
	var hour = cal.get(java.util.Calendar.HOUR);
	var min = cal.get(java.util.Calendar.MINUTE);
	var sec = cal.get(java.util.Calendar.SECOND);
	var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
	var month = cal.get(java.util.Calendar.MONTH) + 1; //获得月份
	var day = cal.get(java.util.Calendar.DATE); //获取日
	weekday-=1;
	scheduleNew();
    if(month == 1) {
	  if (day >= 1 && day <= 30) {
		  if (hour == 1 ) {
			  if (min == 25) {
				  em.broadcastServerMsg(5121027,"圣诞老人开服红包开抢啦，只有5分钟时间，速速前往领取！",true);
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
	//var hour = cal.get(java.util.Calendar.HOUR);//12小时制
	var hour = cal.get(java.util.Calendar.HOUR_OF_DAY);//24小时制
	var min = cal.get(java.util.Calendar.MINUTE);
	var sec = cal.get(java.util.Calendar.SECOND);
	var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
	var month = cal.get(java.util.Calendar.MONTH) + 1; //获得月份
	var day = cal.get(java.util.Calendar.DATE); //获取日
	
	scheduleNew();
	 if (hour == 19 && min == 55) {//晚上19.55分开启此喇叭 以此类推
		em.broadcastServerMsg(5121001," < 疯狂鼠标活动 > 将于20点01分在市场10洞门口【小猪】处开启,小伙伴们快回市场做好准备吧.",true);
	} else if ((hour == 20 && min == 1)) {
		em.broadcastServerMsg(5121001," < 疯狂鼠标活动 > 在市场10洞门口【小猪】处开启了，小伙伴们赶紧开始狂点吧.",true);
	//}

	} else if (hour == 20 && min == 3) {//晚上20:2分开启此喇叭 以此类推
		em.broadcastServerMsg(5121001," < 疯狂鼠标活动 > 结束了，请期待明天20点01分的时候继续回来疯狂点击哦.",true);
	}


	 //if (hour == 21 && min == 5) {//2:50分 以此类推
		//em.broadcastServerMsg(5121001," < 限时商店活动 > 将于21点10分在市场7洞门口【流星妹妹】处开启,小伙伴们快回市场做好准备吧..",true);
	//} else if ((hour == 21 && min == 10)) {
		//em.broadcastServerMsg(5121001," < 限时商店活动 > 在市场7洞门口【流星妹妹】处开启了，小伙伴们快来抢购神秘道具吧，晚了就没了哦.",true);
	//}

	// if (hour == 21 && min == 20) {//2:50分 以此类推
		//em.broadcastServerMsg(5121001," < 限时商店活动 > 结束了，请期待明天21点10分的时候继续回来抢道具哦.",true);
	//}
    
}
