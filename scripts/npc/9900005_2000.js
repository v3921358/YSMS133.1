var status = 0;
var typed=0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { 
			cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ��ʲô����R.E.D�һ�:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#R.E.D�һ����#l\r\n\r\n   #k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##v4310088#R.E.D�ң�#r"+cm.itemQuantity(4310088)+"#k ��  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##v4001126#��Ҷ��#r"+cm.itemQuantity(4001126)+"#k ��\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0##b\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[R.E.D]R.E.D�Ҷһ���Ҷ    (#kĿǰ״̬�� #r�Ƽ�����#b)#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[R.E.D]��Ҷ�һ�R.E.D��    (#kĿǰ״̬�� #r�Ƽ�����#b)#l");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����,��ӭ����R.E.D�һ����:\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition##r\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#R.E.D�Ҷһ��ɽ��Ҷ ����Ϊ 1 : 1.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#���Ҷ�һ���R.E.D�� ����Ϊ 1 : 1.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#R.E.D�Ҷһ��ɽ��Ҷ��������ҽ��н���.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#���Ҷ�һ���R.E.D�Ҿ��ܹ���R.E.D�̵����.");
                    	cm.dispose();
			} else if (selection == 2) {
			typed=3;
                    	cm.dispose();
			cm.openNpc(9900005, 2001);
			} else if (selection == 3) {
			typed=4;
			cm.dispose();
			cm.openNpc(9900005, 2002);
			}
	   }
      }
}