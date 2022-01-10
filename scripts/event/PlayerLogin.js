function init() {
}

function cancelSchedule() {
}


function start(player) {
	//if (player.haveItem(2430794)) {
	if (player.haveItem(2430865)) {

		if (player.getBossLog("每日登陆自动送点券") > 0) {
			var chars = em.getChannelServer().getPlayerStorage().getAllCharacters().iterator();
			while (chars.hasNext()) {
				var chr = chars.next();
				if (chr != null) {
					chr.modifyCSPoints(1, 1000);
					chr.dropMessage(1, "恭喜你获得" + player.getName() + "赠送你的1000点券");
				}
			}
			player.setBossLog("每日登陆自动送点券");
		}
		//em.worldMessageEffect("[屌丝公告] 恭喜屌丝贵族玩家" + player.getName() + "坐着火箭闪亮登场，大家快来抱大腿吧！", 4, 180);
		em.broadcastServerMsg(5121006,"[屌丝公告] 恭喜屌丝贵族玩家 " + player.getName() + " 坐着火箭闪亮登场，大家快来抱大腿吧!",true);
		em.worldSpouseMessage(0x24, "[屌丝公告] 恭喜屌丝贵族玩家 " + player.getName() + " 坐着火箭闪亮登场，大家快来抱大腿吧！");
		em.worldSpouseMessage(0x24, "[屌丝公告] 恭喜屌丝贵族玩家 " + player.getName() + " 坐着火箭闪亮登场，大家快来抱大腿吧！");

		em.worldSpouseMessage(0x24, "[屌丝公告] 恭喜屌丝贵族玩家 " + player.getName() + " 坐着火箭闪亮登场，大家快来抱大腿吧！");
		em.worldSpouseMessage(0x24, "[屌丝公告] 恭喜屌丝贵族玩家 " + player.getName() + " 坐着火箭闪亮登场，大家快来抱大腿吧！");

		em.worldSpouseMessage(0x24, "[屌丝公告] 恭喜屌丝贵族玩家 " + player.getName() + " 坐着火箭闪亮登场，大家快来抱大腿吧！");
		em.worldSpouseMessage(0x24, "[屌丝公告] 恭喜屌丝贵族玩家 " + player.getName() + " 坐着火箭闪亮登场，大家快来抱大腿吧！");
	}
	//em.addById(player.getClient(), itemid, quantity, "GMLOG");
}