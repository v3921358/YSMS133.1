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
	    cm.sendGetText("����,��ӭʹ�õ��ȡ���þ�.ÿ1���ȡ10����þ�\r\nĿǰ���#r"+cm.getPlayer().getCSPoints(1)+" #k��  Ŀǰ���þ�#r"+cm.getPlayer().getCSPoints(2)+" #k��\r\n#rע����������Ҫ�һ�������");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���10��");
	    cm.dispose();
	} else if(cm.getText() > 100000){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���10��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("����,��ӭʹ�õ��ȡ���þ�.\r\n��ȡ#r" + cm.getText() * 10 + "#k���þ���ʹ�õ���#r" + cm.getText() + "#k���\r\n��ȷ�Ϻ�ʹ�á�"); 
	    } 
        } else if (status == 2) { 
		var getmaxhp = cm.getChar().getStat().getMaxHp();
	if (cm.getPlayer().getCSPoints(1) >= cm.getText()) { 
		   cm.gainNX(1, -cm.getText());
		   cm.gainNX(2, cm.getText() * 10);
           cm.worldSpouseMessage(0x20,"[�������þ�] ����ϲ��� "+ cm.getChar().getName() +" ʹ�� "+ cm.getText()  +" ���ȡ�� "+ cm.getText() * 10 +" ���þ�");
           cm.sendOk("�ɹ�������"+cm.getText() * 10 +"���þ�.����ա�");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻�ĵ��,���ȡ��ʹ��.");
           cm.dispose();
	 }
      } 
   }
}