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
	    cm.sendGetText("����,��ӭʹ�õ��#e#r����HP#n#k.ÿ10�������1�����#e#rHPֵ#k#n��\r\n\r\n#r�ӹ���ʹ��������ϴѪ�����߰�������\r\n\r\n#b��ܰ��ʾ������������������ϴѪֻ��5��#k\r\n\r\nĿǰ�����#r"+cm.getPlayer().getCSPoints(1)+" #k��\r\n\r\n#rע��������..���HP���ܳ���50��,��������ò�����");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���10��");
	    cm.dispose();
	} else if(cm.getText() > 100000){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���10��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("����,��ӭʹ�õ������Ѫ��.\r\n����#r" + cm.getText() + "#kѪ������ʹ�õ���#r" + cm.getText() * 10 + "#k���\r\n��ȷ�Ϻ�ʹ�á�"); 
	    } 
        } else if (status == 2) { 
		var getmaxhp = cm.getChar().getStat().getMaxHp();
	if (cm.getPlayer().getCSPoints(1) >= cm.getText() * 10) { 
		   cm.gainNX(-cm.getText() * 10);
		   cm.getChar().getStat().setMaxHp(getmaxhp+cm.getText() * 1,cm.getChar());
           cm.worldSpouseMessage(0x24,"[����HP����] ����ϲ��� "+ cm.getChar().getName() +" ��������������� "+ cm.getText() * 10 +" ��������� "+ cm.getText() +" HP����");
           cm.sendOk("�ɹ�������"+cm.getText()+"Ѫ��.���߻�С��һ�¼��ɿ�����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻�ĵ��,���ȡ��ʹ��.");
           cm.dispose();
	 }
      } 
   }
}