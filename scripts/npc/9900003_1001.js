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
			cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ��ʲô����һ��Ǳ��:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#���һ��Ǳ�ܼ��#l\r\n\r\n #k  #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�������ߣ�#r"+cm.getGamePoints()+"#k ����#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[һ��Ǳ��]װ��Ǳ�ܵ�1������  (#r������#b)#v3994417##l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[һ��Ǳ��]װ��Ǳ�ܵ�2������  (#r������#b)#v3994418##l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[һ��Ǳ��]װ��Ǳ�ܵ�3������  (#r������#b)#v3994419##l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[һ��Ǳ��]����Ǳ�ܵ�1������  (#r������#b)#v3994420##l\r\n#L6##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[һ��Ǳ��]����Ǳ�ܵ�2������  (#r������#b)#v3994421##l\r\n#L7##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[һ��Ǳ��]����Ǳ�ܵ�3������  (#r������#b)#v3994422##l");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����,��ӭ�������һ��Ǳ�ܼ��:\r\n  ���һ��Ǳ�� ��ֱ���޸�װ��Ǳ��1,2,3 ����Ǳ��1,2,3��\r\n  ����\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##bͨ���ר����û���.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##rע�����һ��Ǳ�ܻ��ʱ����.");
                    	cm.dispose();
			} else if (selection == 2) {
			typed=3;
                    	cm.dispose();
		    	cm.openNpc(9900003,1002);
			} else if (selection == 3) {
			typed=4;
			cm.dispose();
		    	cm.openNpc(9900003,1003);
			} else if (selection == 4) {
			typed=5;
			cm.dispose();
		    	cm.openNpc(9900003,1004);
			} else if (selection == 5) {
			typed=6;
			cm.dispose();
		    	cm.openNpc(9900003,1005);
			} else if (selection == 6) {
			typed=6;
			cm.dispose();
		    	cm.openNpc(9900003,1006);
			} else if (selection == 7) {
			typed=6;
			cm.dispose();
		    	cm.openNpc(9900003,1007);
			}
	   }
      }
}