var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

/*var status = 0;
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
		if (status == 0) {//" + cm.itemQuantity(4021012) + "
			var selStr = "#d��ѡ����Ҫ��160����װ����#n#k\r\n";
			selStr +="#b(PS����ѡ����������,ֻ��ʹ��һ��,ѡ��õ��߻���ʧ��)\r\n";
			selStr +="#L1##r"+aaa+" սʿ˫�ֽ�#l         #L2#"+aaa+" սʿǹ#l\r\n";
			selStr +="#L3#"+aaa+" ��ħ���ֶ���#l       #L4#"+aaa+" ��ħ������#l\r\n";
			selStr +="#L5#"+aaa+" ���������#l         #L6#"+aaa+" ��Ӱ����#l\r\n";
			selStr +="#L7#"+aaa+" ˫����ǹ#l         #L8#"+aaa+" �����̵�#l\r\n";
			selStr +="#L9#"+aaa+" ����ȭ��#l           #L10#"+aaa+" ˫������#l\r\n";
			selStr +="#L11#"+aaa+" �����ֹ�#l           #L12#"+aaa+" ������#l\r\n";
			selStr +="#L13#"+aaa+" ��ʦ����#l           #L14#"+aaa+" ҹ��˫ͷ��#l\r\n";
			selStr +="#L15#"+aaa+" ������ǹ#l           #L16#"+aaa+" ����ָ��#l\r\n";
			selStr +="#L17#"+aaa+" ��������#l           #L18#"+aaa+" ����ʦ����#l\r\n";
			selStr +="#L19#"+aaa+" ������ʿ��#l         #L20#"+aaa+" ��֮��ħ����#l";
			selStr +="\r\n ";*/
var status = 0;
var typed=0;
var RMB = 0;

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
			var selStr = "#d����ǰ�����Ǳ�Ϊ��  #r" +cm.getRMB() + " #d �Ǳң���ѡ������Ҫ�ģ�#k\r\n\r\n";
			//selStr +="\t#b����ǰ�����ֽ�Ϊ��  #r" +cm.getRMB() + " #b �Ǳ�#n#k\r\n\r\n";
			selStr +="#L1#"+aaa+" #r6990000#k #b���� #rսʿ˫�ֽ�160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L2#"+aaa+" #r6990000#k #b���� #rսʿǹ160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L3#"+aaa+" #r6990000#k #b���� #r��ħ����160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L4#"+aaa+" #r6990000#k #b���� #r��ħ������160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L5#"+aaa+" #r6990000#k #b���� #r���160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L6#"+aaa+" #r6990000#k #b���� #r��Ӱ160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L7#"+aaa+" #r6990000#k #b���� #r˫����160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L8#"+aaa+" #r6990000#k #b���� #r����160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L9#"+aaa+" #r6990000#k #b���� #r��ʿ160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L10#"+aaa+" #r6990000#k #b���� #r˫������160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L11#"+aaa+" #r6990000#k #b���� #r������160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L12#"+aaa+" #r6990000#k #b���� #r����160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L13#"+aaa+" #r6990000#k #b���� #r��ʦ160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L14#"+aaa+" #r6990000#k #b���� #rҹ�ⷨʦ160������˹����#k #bһ��#l#k\r\n"; 
			selStr +="#L15#"+aaa+" #r6990000#k #b���� #r����160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L16#"+aaa+" #r6990000#k #b���� #r���ӳ�160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L17#"+aaa+" #r6990000#k #b���� #r������160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L18#"+aaa+" #r6990000#k #b���� #r����ʦ160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L19#"+aaa+" #r6990000#k #b���� #r����160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L20#"+aaa+" #r6990000#k #b���� #r��֮��160������˹����#k #bһ��#l#k\r\n";
			selStr +="#L21#"+aaa+" #r6990000#k #b���� #r��������ʹ160������˹����#k #bһ��#l#k\r\n";


			//selStr +="#L12#"+aaa+" #r6990000#k #b���� #rӢ��160������˹����#k #bһ��#l#k\r\n";
			//selStr +="#L13#"+aaa+" #r6990000#k #b���� #r����ʿ160������˹����#k #bһ��#l#k\r\n";
			//selStr +="#L4#"+aaa+" #r6990000#k #b���� #r��ħ������160������˹����#k #bһ��#l#k\r\n";
			//selStr +="#L6#"+aaa+" #r6990000#k #b���� #rʥ��ʿ160������˹����#k #bһ��#l#k\r\n"; 
			//selStr +="#L7#"+aaa+" #r6990000#k #b���� #r��ħ����160������˹����#k #bһ��#l#k\r\n";
			selStr +=" \r\n\r\n";

			cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1402251##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 205\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1432214##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 205\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1322250##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 197\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1232109##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n\����HP  + 2240\r\n��������  + 205\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1242116##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 154\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1362135##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 197\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 7) {
				typed=7;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1522138##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 192\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 8) {
				typed=8;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1332274##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 192\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1472261##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 103\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 10) {
				typed=10;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1342101##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������40\r\n��������  + 97\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 11) {
				typed=11;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1452252##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 192\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 12) {
				typed=12;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1462239##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 197\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 13) {
				typed=13;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1382259##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\nħ��������  + 245\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 14) {
				typed=14;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1212115##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\nħ��������  + 241\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 15) {
				typed=15;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1492231##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 150\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 16) {
				typed=16;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1482216##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 154\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 17) {
				typed=17;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1532144##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 215\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 18) {
				typed=18;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1552110##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\nħ��������  + 246\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 19) {
				typed=19;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1542108##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 202\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 20) {
				typed=20;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1252093##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\nħ��������  + 246\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			} else if (selection == 21) {
				typed=21;
				cm.sendYesNo("- ȷ������һ����˿��ϵ�� #e#d#z1222109##k ��? ����ʹ�õ��� #r6990000#k �Ǳ�\r\n\r\n#b����������������60\r\n��������  + 160\r\nBOSS�˺�  + 100%\r\n���ӷ���  + 70%\r\n�ܹ���    + 20%\r\n�����ƹ�  39,999,999\r\n����������  8 ��\r\n��һ����BOSS�˺�40%\r\n�ڶ�����BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n��������BOSS�˺�40%\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ��߹���󲻿��˻���������ѡ��");
			}
		} else if (status == 2) {
			if(typed==1){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
					cm.gainRMB(-6990000);

				//cm.gainItem(2432255,-1);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1402251)).copy(); // ����һ��Equip��  ��������˹���           
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(205); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);

//				toDrop.setPotential1(699000001);
//				toDrop.setPotential2(699000002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);


				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);


//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1402251##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ������һ�ѣ���ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==2){
               // if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1432214)).copy(); // սʿǹ             
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(205); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1432214##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				} 
			} else if(typed==3){
                	//if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1322250)).copy(); // ��ħ����             
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(197); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1322250##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==4){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1232109)).copy(); // ��ħ����             
				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(205); //������
				toDrop.setHp(2240); //HP
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1232109##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==5){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1242116)).copy(); // ���             
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(154); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1242116##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==6){
               // if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1362135)).copy(); // ��Ӱ            
//				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(197); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1362135##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==7){
                //if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
				//cm.gainItem(2432255,-1);
                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);

				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1522138)).copy(); // ˫��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(192); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1522138##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==8){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1332274)).copy(); // �����̵�            
//				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(192); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1332274##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==9){
               // if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1472261)).copy(); // �����̵�            
//				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(103); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1472261##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==10){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1342101)).copy(); // ��������            
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(40); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(97); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1342101##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==11){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1452252)).copy(); // ��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(192); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1452252##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==12){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
			//	cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1462239)).copy(); // ��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(197); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1462239##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==13){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1382259)).copy(); // ����            
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(245); //ħ������
				toDrop.setWatk(151); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1382259##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==14){
              //  if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1212115)).copy(); // ҹ��˫ͷ��            
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(241); //ħ������
				toDrop.setWatk(143); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1212115##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==15){
            //    if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1492231)).copy(); // ������������˹ǹ          
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(241); //ħ������
				toDrop.setWatk(150); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1492231##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==16){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1482216)).copy(); // ������������˹ȭ��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(241); //ħ������
				toDrop.setWatk(154); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1482216##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==17){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1532144)).copy(); // ��������˹����           
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(0); //ħ������
				toDrop.setWatk(215); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1532144##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==18){
            //    if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1552110)).copy(); // ��������˹����           
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(246); //ħ������
				toDrop.setWatk(145); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1552110##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);
				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==19){
            //    if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1542108)).copy(); // ��������˹��ʿ��           
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(0); //ħ������
				toDrop.setWatk(202); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1542108##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);

				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			} else if(typed==20){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1252093)).copy(); // ��������˹ħ����           
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(246); //ħ������
				toDrop.setWatk(148); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1252093##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);

				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}

			} else if(typed==21){
             //   if (cm.haveItem(2432255, 1) && cm.getSpace(1) >= 1) {
		//		cm.gainItem(2432255,-1);

                if (cm.getSevenDayPayLog(1).get(0) >= 800 && cm.getRMB() >= 6990000 && cm.getPlayer().getCSPoints(1) >= 1 && cm.getSpace(1) >= 1) {
				cm.gainRMB(-6990000);
				var ii = cm.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1222109)).copy(); // ��������˹������           
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(246); //ħ������
				toDrop.setWatk(160); //������ 
				toDrop.setBossDamage(100);//BOOS��
				toDrop.setIgnorePDR(70);//���ӷ���
				toDrop.setTotalDamage(20);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
				toDrop.setPotential1(40603);
				toDrop.setPotential2(40603);
				toDrop.setPotential3(40603);
				toDrop.setPotential4(40603);
				toDrop.setPotential5(40603);
				toDrop.setPotential6(40603);
//				toDrop.setOwner("��˿��ϵ��");
				cm.addFromDrop(cm.getC(), toDrop, false);
				cm.sendOk("#b��ϲ����Ì�˿��ϵ�� #r#z1222109##b һ��.");
				//cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ���� " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				cm.worldMessageEffect("[��˿�̳�] ��ϲ����" + cm.getName() + "�ڻ�Ա��˿�̳ǹ����˿��ϵ����������ҿ��������Ȱ�", 7, 60);

				cm.worldSpouseMessage(0x20, "����˿�̳ǡ� : ��ϲ���� " + cm.getChar().getName() + " �ڌ�˿�̳ǹ��� ��˿��ϵ�� ����˹ ����һ��.");
				cm.dispose();
				} else {
			cm.sendOk("����ʧ�ܣ�#b    �����ճ�ֵ���Ϊ��#r" + cm.getSevenDayPayLog(1) + " #bԪ\r\n\r\n#r)1.�������������û�дﵽ800Ԫ�����������800Ԫ����������\r\n\r\n#b2). ��ǰ�Ǳ�δ�ﵽ��������ȷ�������㹻���Ǳ�֧��\r\n\r\n3). ������λ����,������.");
			cm.dispose();
				}
			}
      }
   }
 }