/*
 *�һ�
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
	    cm.sendGetText("����,��ӭʹ�õ��#e#r����MP#n#k.ÿ20�������1�����#e#rMPֵ#n#k��\r\nĿǰ���#r"+cm.getPlayer().getCSPoints(1)+" #k��\r\n#rע��������..���MP���ܳ���50��,�������ò�����\r\n");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���10��");
	    cm.dispose();
	} else if(cm.getText() > 100000){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���10��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("����,��ӭʹ�õ����������.\r\n����#r" + cm.getText() + "#k��������ʹ�õ���#r" + cm.getText() * 20 + "#k���\r\n��ȷ�Ϻ�ʹ�á�"); 
	    } 
        } else if (status == 2) { 
		var getmaxmp = cm.getChar().getStat().getMaxMp();
	if (cm.getPlayer().getCSPoints(1) >= cm.getText() * 20) { 
		   cm.gainNX(-cm.getText() * 20);
		   cm.getChar().getStat().setMaxMp(getmaxmp+cm.getText() * 1,cm.getChar());
           cm.worldSpouseMessage(0x24,"[����MP����] ����ϲ��� "+ cm.getChar().getName() +" ������NPC���� "+ cm.getText() * 20 +" ��������� "+ cm.getText() +" MP����");
           cm.sendOk("�ɹ�������"+cm.getText()+"����.���߻�С��һ�¼��ɿ�����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻�ĵ��,���ȡ��ʹ��.");
           cm.dispose();
	 }
      } 
   }
}