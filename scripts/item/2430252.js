var status = 0;
var typed=0;
var random1 = java.lang.Math.floor(Math.random() * 1000 + 1);
var random2 = java.lang.Math.floor(Math.random() * 3000 + 1);
var aa ="#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		im.dispose();
	} else {
		if (mode == 0 && status == 0) {
			im.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { 
			im.sendSimple(""+aa+"\r\n\r\n#b�װ���#r#h ##k#b���ã�ʹ���ҿ���ͻ���ƹ�����100��Ӵ��\r\n\r\n\r\n#L3##r" + ttt6 + " [����]�˺�����ͻ��#l");
		} else if (status == 1) {
			if (selection == 1) {
			im.sendOk("�װ���#r#h ##k����,�����˺�����ͻ��ϵͳ���:\r\n  ʹ�õ���: ��ǰְҵ��Ӧ�ȼ����� \r\n  ʹ�õ��: �κ������������˺�����ͻ�� \r\n\r\n\r\n\r\n#rע��ÿ���������׷��1���˺�,�����������.");
                    	im.dispose();
			} else if (selection == 2) {
			if(im.getBossLog("����ͻ��",1) <= 10000000){
			if(im.haveItem(4033356, 5)){
			if (im.changeLimitBreak(random1)) {
			for(var i = 0; i < random1; i++){
			    im.setBossLog("����ͻ��",1);
			}
			    im.gainItem(4033356,-5);
    			    im.sendOk("#b�˺�����ͻ�Ƴɹ�.\r\n\r\n����׷���˺�Ϊ��#r"+ random1 +"#b.");
			    im.worldSpouseMessage(0x20,"[�˺�ͻ��] ��� "+ im.getChar().getName() +" ʹ�� �������1 �������˺�����ͻ�Ƴɹ� ����׷�� "+ random1 +" �˺�ֵ ��");
			}else{
    			    im.sendOk("#bͻ��ʧ��.\r\nϵͳΪ��⵽��ɫ����װ������.");
			}
    			    im.dispose();
			}else{
    			    im.sendOk("#bͻ��ʧ��.\r\n��Ҫ 5�� �������1 �ſ���ͻ��.");
    			    im.dispose();
			}
			}else{
    			    im.sendOk("#bͻ��ʧ��.\r\n������߶���ͻ��1000���˺�.");
    			    im.dispose();
			}
			} else if (selection == 3) {
			if(im.getBossLog("���ͻ��1",1) <= 1000){
			if(im.haveItem(2430252, 1)){
				if (im.getLimitBreak() >= 100000000) {
				im.sendOk("Ŀǰֻ��ͻ��1���˺���");
				im.dispose();
				return;
						}
			if (im.changeLimitBreak(1000000)) {
			    im.setBossLog("���ͻ��1",1);
			    im.gainItem(2430252,-1);
    			    im.sendOk("#b�˺�����ͻ�Ƴɹ�.\r\n\r\n����׷���˺�Ϊ��#r1000000#b.");
			    im.worldSpouseMessage(0x20,"[�˺�ͻ��] ��� "+ im.getChar().getName() +" ʹ�� ��� �������˺�����ͻ�Ƴɹ� ����׷�� 1000000 �˺�ֵ��");
			}else{
    			    im.sendOk("#bͻ��ʧ��.\r\nϵͳδ��⵽��ɫ����װ������.");
			}
    			    im.dispose();
			}else{
    			    im.sendOk("#bͻ��ʧ��.\r\n��Ҫ 1 �ſ���ͻ��.");
    			    im.dispose();
			}
			}else{
    			    im.sendOk("#bͻ��ʧ��.\r\n������߶���ͻ��1E�˺�.");
    			    im.dispose();
			}
			}
	   }
      }
}