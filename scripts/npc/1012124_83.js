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
	    cm.sendGetText("\r\n- #b��ӭʹ�õ��þ�����HP.��ǰ���þ�#r"+cm.getPlayer().getCSPoints(2)+" #k��\r\n#b���þ�ͨ����ֻ�ã�������䣬�г��һ�,��¥�ȷ�ʽ���.\r\n\r\n#rÿ80����þ�����1�����HPֵ\r\n#r����ʹ��10�������1��HPֵ������ʹ�ü�������ϴѪ\r\n\r\n#b��ʾ�������������ǵ�ֵ�ģ��ù��ܰ��ò���\r\n#b�ӹ��뿪ͨ����������ʹ��5�������1��HP#k#n\r\n\r\n#rע�����HP���ܳ���50��,�������ò�����\r\n\r\n#b������Ҫ����HP������...\r\n ");
        } else if (status == 1) { 
	if(cm.getText() < 1){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���1��");
	    cm.dispose();
	} else if(cm.getText() > 10000){
	    cm.playerMessage(1,"������������ֲ���С��1���Ҳ��ܴ���1��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("����,��ӭʹ�õ��þ�����Ѫ��.\r\n����#r" + cm.getText() + "#kѪ������ʹ�õ���#r" + cm.getText() * 80 + "#k���þ�\r\n��ȷ�Ϻ�ʹ�á�"); 
	    } 
        } else if (status == 2) { 
		var getmaxhp = cm.getChar().getStat().getMaxHp();
	if (cm.getPlayer().getCSPoints(2) >= cm.getText() * 80) { 
		   cm.gainNX(2, -cm.getText() * 80);
		   cm.getChar().getStat().setMaxHp(getmaxhp+cm.getText() * 1,cm.getChar());
           cm.worldSpouseMessage(0x23,"[����HP����] ����ϲ��� "+ cm.getChar().getName() +" ʹ�� "+ cm.getText() * 80 +" ���þ������� "+ cm.getText() +" HP����");
           cm.sendOk("�ɹ�������"+cm.getText()+"Ѫ��.���߻�С��һ�¼��ɿ�����");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻�ĵ��þ�,���ȡ��ʹ��.");
           cm.dispose();
	 }
      } 
   }
}