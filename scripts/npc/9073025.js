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
			cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ��ʲô�������ɹ���:\r\n#r#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#С������ɼ��#l\r\n\r\n   #k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#ĿǰС���ɳ�ֵ��#r"+cm.getBossLog("�����ܼƳɳ�ֵ",1)+"#k �� \r\n   #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�������ߣ�#r"+cm.getGamePoints()+"#k ����#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#L2##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[����]�����ҵ�С���      (#kĿǰ״̬�� #r�Ƽ�����#b)#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[����]С������������    (#kĿǰ״̬�� #r�Ƽ�����#b)#l\r\n#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#[����]��ҫһ���ҵ�С���  (#kĿǰ״̬�� #r�Ƽ�����#b)#l");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����,[����]С��������:\r\n  ��!����ð�յ���С�����!�ɰ��Ĳ�����Ү!!!���ͨ����\r\n  ��������,�ó���һ���ĳɳ�.������ɳ�����ȫ����̬��\r\n  ��ι����(��)�����˴���һ�λ��������ö���װ������\r\n  ����Ʒ�Ļ���.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##rע���������ٳɳ�����С��飬����ʹ���н��������");
                    	cm.dispose();
			} else if (selection == 2) {
			typed=3;
                    	cm.dispose();
			cm.openNpc(9073025, 100);
			} else if (selection == 3) {
			if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >= 800){
			typed=4;
			cm.dispose();
			cm.openNpc(9073025, 101);
			} else {
			cm.dispose();
			cm.sendOk("������#bС������������ʧ�ܡ�\r\n#rС����������ĸ��������һ�û�дﵽ��ȫ���ȫʢ״̬��");
			}
			} else if (selection == 4) {
			if(cm.getBossLog("��ҫ") < 3){
			typed=5;
			cm.setBossLog("��ҫ");
			cm.dispose();
			cm.openNpc(9073025, 102);
			} else {
			cm.dispose();
			cm.sendOk("ÿ�������ҫ3��Ŷ��");
			}
		}
	   }
      }
}