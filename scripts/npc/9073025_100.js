/*
 *���찮����
 */
var status = 0; 
var cwzt = "";
var cwjd = "";
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 

    if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >=0 && cm.getBossLog("�����ܼƳɳ�ֵ",1) <= 50){
	cwjd = "��1�׶�(������)";
	cwzt = "#fUI/UIWindow2.img/raise/18/0#";
    } else if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >=51 && cm.getBossLog("�����ܼƳɳ�ֵ",1) <= 150){
	cwjd = "��2�׶�(�ƿ���)";
	cwzt = "#fUI/UIWindow2.img/raise/18/1#";
    } else if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >=151 && cm.getBossLog("�����ܼƳɳ�ֵ",1) <= 250){
	cwjd = "��3�׶�(������)";
	cwzt = "#fUI/UIWindow2.img/raise/18/2#";
    } else if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >=251 && cm.getBossLog("�����ܼƳɳ�ֵ",1) <= 350){
	cwjd = "��4�׶�(������)";
	cwzt = "#fUI/UIWindow2.img/raise/18/3#";
    } else if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >=351 && cm.getBossLog("�����ܼƳɳ�ֵ",1) <= 550){
	cwjd = "5�ڽ׶�(�ɳ���)";
	cwzt = "#fUI/UIWindow2.img/raise/19/1#";
    } else if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >=551 && cm.getBossLog("�����ܼƳɳ�ֵ",1) <= 800){
	cwjd = "��6�׶�(������)";
	cwzt = "#fUI/UIWindow2.img/raise/19/2#";
    } else if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >=801 && cm.getBossLog("�����ܼƳɳ�ֵ",1) <= 999){
	cwjd = "��7�׶�(��ȫ��)";
	cwzt = "#fUI/UIWindow2.img/raise/19/3#";
    } else {
	cwjd ="��������(���Կ�������)";
	cwzt = "#fUI/UIWindow2.img/raise/19/3#";
    }

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
	    cm.sendGetText("- #e#d�������������ռ�˵����#n#k\r\n\r\n#b1��#t4033943#����1��ɳ�ֵ\r\nĿǰ����������ɳ�ֵ��(#r"+cm.getBossLog("�����ܼƳɳ�ֵ",1)+" #k/#r 1000#k#b) ��\r\n#rע�������������ɳ�ֵ����(��ֵ����1000����Ը�)��\r\n#i2430096#�� "+ cwjd +"   "+ cwzt +" ");
        } else if (status == 1) { 
	if(cm.getText() < 1 || cm.getText() > 1000){
	    cm.playerMessage(1,"��������ֲ���С��1�����1000��");
	    cm.dispose();
	} else {
	    cm.sendYesNo("ʹ��#r" + cm.getText() + "#k#i4033943#\r\n����#r" + cm.getText() + "#k��ɳ�ֵ"); 
	    }
        } else if (status == 2) { 
	if(cm.getBossLog("�����ܼƳɳ�ֵ",1) < 1000){
	if (cm.haveItem(4033943,cm.getText())) { 
	   cm.gainItem(4033943, -cm.getText());
	for(var i = 1; i <= cm.getText(); i++){
	   cm.setBossLog("�����ܼƳɳ�ֵ",1);
	}
	   cm.worldSpouseMessage(0x20,"���������䡻����� "+ cm.getChar().getName() +" �������������� "+ cm.getText() +" ����.����������������");
           cm.sendOk("�����ɹ�,��ע��鿴.");
           cm.dispose();
        } else {
           cm.sendOk("��û���㹻��#t4033943#,����Ŭ��.");
           cm.dispose();
	 }
	} else {
	   cm.sendOk("�����������Ѿ����ѣ��޷��������������\r\n#r�Ѿ�����ʹ��#b [��������] #r������������ϲ��");
           cm.dispose();
	}
      } 
   }
}