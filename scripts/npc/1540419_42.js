//http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes

var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //������
var month = ca.get(java.util.Calendar.MONTH) + 1; //����·�
var day = ca.get(java.util.Calendar.DATE);//��ȡ��
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����

var status = 0;
var typed=0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
				var selStr = "#r[��ء���ܰ��ʾ]��#e#b�����ܸ������� #k#n\r\n\r\n";
				selStr += "#d��ǰ������ʱ��: #r" + year + " #d�� #r" + month + "#d �� #r" + day + " #d�� #r" + hour + " #dʱ #r" + minute + " #d��\r\n";
				//selStr += "#d�����ʱ��Ϊ��#r2015 #d��#r 6#d �� #r1 #d�� #r00 #dʱ #r01 #d��\r\n\r\n";
				selStr += "#r#L1#"+aaa+" �1). ��ĩ��Ϸ���� #l\r\n";
				selStr += "#r#L2#"+aaa+" �2). ��ĩ��Ϸ�  #l\r\n";
				selStr += "#b#L3#"+aaa+" �3). ������Ʒ[#r�桤ϵ������#k#b]��װ��ʣ�� #r5 #b�ף�#l\r\n";
				selStr += "#b#L4#"+aaa+" �4). ������Ʒ[#r�桤ϵ ����#k#b ]��װ��ʣ�� #r5 #b�ף�#l\r\n";
				selStr += "#b#L5#"+aaa+" �5). ������Ʒ[#r�桤ϵ������#k#b]������ʣ�� #r3 #b����#l\r\n\t\t";
				cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("#n#b��ĩ����˵��#n: #r[PS:������ϵ�ͷ�]#k\r\n#b����һ��#k\r\n#n��ĩ�����������������졿������20����22��֮�� �����ʱ������ߵ�ȫ��������� �� 10000 �������ĩ����#k\r\n\r\n!");
		} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("#b\t\t\t��ĩ�˵����#k\r\n#n�����:\r\n�����,��ʼʱ�䡾6��13��20��20�֡�������ʱ��Ϊ21����\r\n�˵����������ͼ ��ɽ���࣬�������� ��2�ص��յ㣬���뽱�ڵڶ�����㷢�ţ�\r\n#rPS������ʾ [����Ҿ����ֽ�Ԫ��Ŷ]#k\r\n#n������1�� �����20��,��2-3�� �����15������4-10�� ��������� 10��,С��ʾ�������뽱�н��5���� \r\n\r\n#k���ջ˵����\r\n�����ʱ��Ϊ ��6��14��20��30�֡�\r\n#rȫ�������ѽ���򱦵�ͼ ���ܴ򱦵�ͼ�����⸣��#k\r\n#b��ܰ��ʾ����������ϵ�ͷ�����񷵻���һҳ�� ");
		} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #e#d��.��������װϵ�� #k#n:#b������ 5 �ף�ʣ�� #r5 #b�ף�#l\r\n#b ��������.������ϵ����װ �ļ��׼۸� #k#r1388Ԫ#k\r\n\r\n#rװ������˵������:#k\r\n#b#b����#k������������ �̶�Ϊ 50\r\n������ ��Ȼ������+10��\r\nħ������ ��Ȼħ����+10ħ��\r\n�Դ���Ǳ��BOSS�˺�  + 100%\r\n�Դ���Ǳ�����ӷ���  + 50%\r\n�Դ���Ǳ�����˺�    + 10%\r\n�����ƹ�==��Ȼ���� + 20,000,000\r\n���������� �̶� 8 ��\r\nSSǱ�ܵ�һ����ȫ����20%\r\nSSǱ�ܵڶ��������˺�12%\r\nSSǱ�ܵ�������BOSS�˺�40%\r\n\r\n#bñ�� ���� ����#k \r\n������������ �̶�Ϊ50\r\n������ �̶�Ϊ 10 \r\nħ������ �̶�Ϊ 10\r\n�Դ���Ǳ��BOSS�˺�  + 50%\r\n�Դ���Ǳ�����ӷ���  + 20%\r\n�Դ���Ǳ��ȫ����    + 20%\r\n���������� ==װ����Ȼ����������\r\nSSǱ�ܵ�һ����ȫ����20%\r\nSSǱ�ܵڶ��������˺�12%\r\nSSǱ�ܵ�������BOSS�˺�40%\r\n\r\n");
		} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #e#d��.ϵ����ϵ����װ #k#n:#b������ 5 �ף�ʣ�� #r5 #b�ף�#l\r\n#b ��������.����ϵ����װ �˼��׼۸� #k#r2680Ԫ#k\r\n\r\n#rװ������˵������:#k\r\n#b#b����#k������������ �̶�Ϊ50\r\n������ ��Ȼ������+10��\r\nħ������ ��Ȼħ����+10ħ��\r\n�Դ���Ǳ��BOSS�˺�  + 100%\r\n�Դ���Ǳ�����ӷ���  + 50%\r\n�Դ���Ǳ�����˺�    + 12%\r\n�����ƹ�==��Ȼ���� + 50,000,000\r\n���������� �̶�Ϊ  8 ��\r\nSSǱ�ܵ�һ����ȫ����20%\r\nSSǱ�ܵڶ��������˺�10%\r\nSSǱ�ܵ�������BOSS�˺�40%\r\n\r\n#b��.ϵ���з���#k\r\n������������ �̶�Ϊ 50\r\n������ ��Ȼ������+20�� \r\nħ������ ��Ȼħ����+20ħ��\r\n�Դ���Ǳ��BOSS�˺�  + 40%\r\n�Դ���Ǳ�����ӷ���  + 10%\r\n�Դ���Ǳ��ȫ���� + 10%\r\n���������� ===��Ȼ����������\r\nSSǱ�ܵ�һ����ȫ����20%\r\nSSǱ�ܵڶ��������˺�12%\r\nSSǱ�ܵ�������BOSS�˺�40%\r\n\r\n");
		} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#d��ϵ������ϵ������-���� #k#n:#b������ 8 ����ʣ�� #r3 #b����#l\r\n#b�档������ϵ������ �����۸� #r800Ԫ#k\r\n#b�档������ϵ�з��� �����۸� #r300Ԫ#k\r\n\r\n#rװ������˵������:#k\r\n#b#b����#k������������ �̶�Ϊ 50\r\n������ ��Ȼ������+10��\r\nħ������ ��Ȼħ����+10ħ��\r\n�Դ���Ǳ��BOSS�˺�  + 100%\r\n�Դ���Ǳ�����ӷ���  + 50%\r\n�Դ���Ǳ�����˺�    + 10%\r\n�����ƹ�==��Ȼ���� + 20,000,000\r\n���������� �̶� 8 ��\r\nSSǱ�ܵ�һ����ȫ����20%\r\nSSǱ�ܵڶ��������˺�12%\r\nSSǱ�ܵ�������BOSS�˺�40%\r\n\r\n#bñ�� ���� ����#k \r\n������������ �̶�Ϊ50\r\n������ �̶�Ϊ 10 \r\nħ������ �̶�Ϊ 10\r\n�Դ���Ǳ��BOSS�˺�  + 50%\r\n�Դ���Ǳ�����ӷ���  + 20%\r\n�Դ���Ǳ��ȫ����    + 20%\r\n���������� ==װ����Ȼ����������\r\nSSǱ�ܵ�һ����ȫ����20%\r\nSSǱ�ܵڶ��������˺�12%\r\nSSǱ�ܵ�������BOSS�˺�40%\r\n\r\n");
			}
		} else if (status == 2) {
			if(typed==1){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==2){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==3){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==4){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==5){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
				}
           }
      }
}