var status = -1;
var random = java.lang.Math.floor(Math.random() * 10);
function action(mode, type, selection) {
	   if(random >= 0 && random <= 8){
           cm.worldSpouseMessage(0x20,"���������������� "+ cm.getChar().getName() +" ������������������������ı�����x1��");
	   cm.gainItem(2430096,1);
           cm.resetBossLog("�����ܼƳɳ�ֵ");
	   cm.dispose();
	   } else {
           cm.worldSpouseMessage(0x20,"���������������� "+ cm.getChar().getName() +" �����δ�ܽ����������������ͨ�ı�����x1��");
	   cm.gainItem(2430066,1);
           cm.resetBossLog("�����ܼƳɳ�ֵ");
	   cm.dispose();
	   }
}