function init() {
}

function cancelSchedule() {
}


function start(player) {
	//if (player.haveItem(2430794)) {
	if (player.haveItem(2430865)) {

		if (player.getBossLog("ÿ�յ�½�Զ��͵�ȯ") > 0) {
			var chars = em.getChannelServer().getPlayerStorage().getAllCharacters().iterator();
			while (chars.hasNext()) {
				var chr = chars.next();
				if (chr != null) {
					chr.modifyCSPoints(1, 1000);
					chr.dropMessage(1, "��ϲ����" + player.getName() + "�������1000��ȯ");
				}
			}
			player.setBossLog("ÿ�յ�½�Զ��͵�ȯ");
		}
		//em.worldMessageEffect("[��˿����] ��ϲ��˿�������" + player.getName() + "���Ż�������ǳ�����ҿ��������Ȱɣ�", 4, 180);
		em.broadcastServerMsg(5121006,"[��˿����] ��ϲ��˿������� " + player.getName() + " ���Ż�������ǳ�����ҿ��������Ȱ�!",true);
		em.worldSpouseMessage(0x24, "[��˿����] ��ϲ��˿������� " + player.getName() + " ���Ż�������ǳ�����ҿ��������Ȱɣ�");
		em.worldSpouseMessage(0x24, "[��˿����] ��ϲ��˿������� " + player.getName() + " ���Ż�������ǳ�����ҿ��������Ȱɣ�");

		em.worldSpouseMessage(0x24, "[��˿����] ��ϲ��˿������� " + player.getName() + " ���Ż�������ǳ�����ҿ��������Ȱɣ�");
		em.worldSpouseMessage(0x24, "[��˿����] ��ϲ��˿������� " + player.getName() + " ���Ż�������ǳ�����ҿ��������Ȱɣ�");

		em.worldSpouseMessage(0x24, "[��˿����] ��ϲ��˿������� " + player.getName() + " ���Ż�������ǳ�����ҿ��������Ȱɣ�");
		em.worldSpouseMessage(0x24, "[��˿����] ��ϲ��˿������� " + player.getName() + " ���Ż�������ǳ�����ҿ��������Ȱɣ�");
	}
	//em.addById(player.getClient(), itemid, quantity, "GMLOG");
}