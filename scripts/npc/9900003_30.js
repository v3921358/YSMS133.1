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
	    cm.sendGetText("����,��ӭʹ�õ��ȡ��ҷ���\r\nĿǰ���#r"+cm.getPlayer().getCSPoints(1)+" #k��\r\n#rע������������������󲻵ó���1����");
        } else if (status == 1) { 
	if(cm.getText() < 1000){
	    cm.playerMessage(1,"������������ֲ���С��1000���Ҳ��ܴ���1��");
	    cm.dispose();
	} else if(cm.getText() > 10000){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���1��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("����,��ӭʹ�õ��ȡ��ҷ���\r\n�һ�#r" + cm.getText() * 10000 + "#k��ҽ���ʹ�õ���#r" + cm.getText() + "#k���\r\n��ȷ�Ϻ�ʹ�á�"); 
	    } 
        } else if (status == 2) { 
	if (cm.getPlayer().getCSPoints(1) >= cm.getText()) { 
		   cm.gainNX(-cm.getText());
		   cm.gainMeso(cm.getText() * 10000);
           cm.worldSpouseMessage(0x25,"[������] ����ϲ��� "+ cm.getChar().getName() +" ��ͨ����Ա���� "+ cm.getText() +" ����� "+ cm.getText() * 10000 +" ���");
           cm.sendOk("#b�ɹ������� #r" + cm.getText() * 10000+ " #b��ҡ�");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻�ĵ��,���ȡ��ʹ��.");
           cm.dispose();
	 }
      } 
   }
}