/*
 *R.E.D�Ҷһ�
 */

var status = 0; 

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else if (mode == 0) { 
        cm.dispose(); 
    } else { 
        if (mode == 1) 
            status++; 
        else 
            status--; 
        if (status == 0) { 
	    abb = 1;
	    cm.sendGetText("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����,��ӭʹ��R.E.D�Ҷһ�.\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##v4310088#1 : 1#v4001126#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#ĿǰR.E.D�ң�#r"+cm.itemQuantity(4310088)+" #k��\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##rע�����������ĵ�#bR.E.D��#r�������һ�#b��Ҷ");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"��������ֲ���С��1��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����,��ӭʹ��R.E.D�Ҷһ�.\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#ʹ��#r" + cm.getText() + "#k#v4310088#R.E.D��\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/reward#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�һ�#r" + cm.getText() + "#k#v4001126#��Ҷ"); 
	    }
        } else if (status == 2) { 
	if (cm.itemQuantity(4310088) >= cm.getText()) { 
	   cm.gainItem(4310088,-cm.getText());
	   cm.gainItem(4001126,cm.getText());
           cm.sendOk("�һ��ɹ�,��ע�����.\r\n"+ cm.getText() +" #v4310088#R.E.D�� �һ��� "+ cm.getText() +" #v4001126#��Ҷ");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��R.E.D��,����Ŭ��.");
           cm.dispose();
	 }
      } 
   }
}