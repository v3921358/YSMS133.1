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
	    cm.sendGetText("����,��ӭʹ�ý�һ�ȡ������\r\n#bÿ5���ҿ��Զһ� 1 ���#k\r\Ŀǰ���#r"+cm.getPlayer().getCSPoints(1)+" #k��\r\n#rע������������������󲻵ó���1����");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���1��");
	    cm.dispose();
	} else if(cm.getText() > 10000){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���1��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("����,��ӭʹ�ý�һ�ȡ������\r\n�һ�#r" + cm.getText() + "#k�����ʹ�õ���#r" + cm.getText() * 50000 + "#k���\r\n��ȷ�Ϻ�ʹ�á�"); 
	    } 
        } else if (status == 2) { 
	if (cm.getPlayer().getMeso() >= cm.getText() * 50000) { 
		   cm.gainNX(cm.getText());
		   cm.gainMeso(-cm.getText() * 50000);
           cm.worldSpouseMessage(0x20,"[��ֵ������һ���] ����ϲ��� "+ cm.getChar().getName() +" �ڡ���һ��㡿���� "+ cm.getText() * 50000 +" ��ҡ̻��� "+ cm.getText() +" ���");
           cm.sendOk("#b�ɹ������� #r" + cm.getText() + " #b���");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻�Ľ��,���ȡ��ʹ��.");
           cm.dispose();
	 }
      } 
   }
}