var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;

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
		if (status == 0) {//" + im.itemQuantity(4021012) + "
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
			selStr +="\r\n ";
			im.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				im.sendYesNo("- #e#d#z1402251#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 205\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 2) {
				typed=2;
				im.sendYesNo("- #e#d#z1432214#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 205\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 3) {
				typed=3;
				im.sendYesNo("- #e#d#z1322250#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 197\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 4) {
				typed=4;
				im.sendYesNo("- #e#d#z1232109#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t\����HP  + 2240\r\n\t\t��������  + 205\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 5) {
				typed=5;
				im.sendYesNo("- #e#d#z1242116#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 154\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 6) {
				typed=6;
				im.sendYesNo("- #e#d#z1362135#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 197\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 7) {
				typed=7;
				im.sendYesNo("- #e#d#z1522138#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 192\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 8) {
				typed=8;
				im.sendYesNo("- #e#d#z1332274#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 192\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 9) {
				typed=9;
				im.sendYesNo("- #e#d#z1472261#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 103\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 10) {
				typed=10;
				im.sendYesNo("- #e#d#z1342101#��#n#k\r\n\r\n\t\t#b����������������40\r\n\t\t��������  + 97\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��   0\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 11) {
				typed=11;
				im.sendYesNo("- #e#d#z1452252#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 192\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 12) {
				typed=12;
				im.sendYesNo("- #e#d#z1462239#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 197\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 13) {
				typed=13;
				im.sendYesNo("- #e#d#z1382259#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\tħ��������  + 245\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 14) {
				typed=14;
				im.sendYesNo("- #e#d#z1212115#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\tħ��������  + 241\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 15) {
				typed=15;
				im.sendYesNo("- #e#d#z1492231#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 150\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 16) {
				typed=16;
				im.sendYesNo("- #e#d#z1482216#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 154\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 17) {
				typed=16;
				im.sendYesNo("- #e#d#z1532144#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 215\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 18) {
				typed=16;
				im.sendYesNo("- #e#d#z1552110#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\tħ��������  + 246\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 19) {
				typed=16;
				im.sendYesNo("- #e#d#z1542108#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\t��������  + 202\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			} else if (selection == 20) {
				typed=16;
				im.sendYesNo("- #e#d#z1252093#��#n#k\r\n\r\n\t\t#b����������������60\r\n\t\tħ��������  + 246\r\n\t\tBOSS�˺�  + 40%\r\n\t\t�����˺�  + 20%\r\n\t\t�ܹ���    + 10%\r\n\t\t�����ƹ�׷��  20,000,000\r\n\t\t����������  8 ��\r\n\r\n- #e#r������ʾ��#n\r\n\r\n  #b�õ���Ϊһ���ԣ���ȡ��õ�����ʧ��������ѡ��");
			}
		} else if (status == 2) {
			if(typed==1){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1402251)).copy(); // ����һ��Equip��  ��������˹���           
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(205); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1402251##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==2){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1432214)).copy(); // սʿǹ             
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(205); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1432214##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				} 
			} else if(typed==3){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1322250)).copy(); // ��ħ����             
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(197); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1322250##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==4){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1232109)).copy(); // ��ħ����             
				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(205); //������
				toDrop.setHp(2240); //HP
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1232109##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==5){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1242116)).copy(); // ���             
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(154); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1242116##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==6){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1362135)).copy(); // ��Ӱ            
//				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(197); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1362135##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==7){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1522138)).copy(); // ˫��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(192); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1522138##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==8){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1332274)).copy(); // �����̵�            
//				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(192); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1332274##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==9){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1472261)).copy(); // �����̵�            
//				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(103); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1472261##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==10){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1342101)).copy(); // ��������            
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
				toDrop.setLuk(40); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(97); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
//				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1342101##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==11){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1452252)).copy(); // ��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(192); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1452252##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==12){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1462239)).copy(); // ��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(200); //ħ������
				toDrop.setWatk(197); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1462239##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==13){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1382259)).copy(); // ����            
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(245); //ħ������
				toDrop.setWatk(151); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1382259##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==14){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1212115)).copy(); // ҹ��˫ͷ��            
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(241); //ħ������
				toDrop.setWatk(143); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1212115##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==15){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1492231)).copy(); // ������������˹ǹ          
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(241); //ħ������
				toDrop.setWatk(150); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1492231##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==16){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1482216)).copy(); // ������������˹ȭ��            
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(241); //ħ������
				toDrop.setWatk(154); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1482216##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==17){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1532144)).copy(); // ��������˹����           
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(0); //ħ������
				toDrop.setWatk(215); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1532144##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==18){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1552110)).copy(); // ��������˹����           
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(246); //ħ������
				toDrop.setWatk(145); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1552110##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==19){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1542108)).copy(); // ��������˹��ʿ��           
				toDrop.setStr(60); //װ������
				toDrop.setDex(60); //װ������
//				toDrop.setInt(60); //װ������
//				toDrop.setLuk(60); //װ������
//				toDrop.setMatk(0); //ħ������
				toDrop.setWatk(202); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1542108##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			} else if(typed==20){
                if (im.haveItem(2432255, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432255,-1);
				var ii = im.getItemInfo();					
				var toDrop = ii.randomizeStats(ii.getEquipById(1252093)).copy(); // ��������˹ħ����           
//				toDrop.setStr(60); //װ������
//				toDrop.setDex(60); //װ������
				toDrop.setInt(60); //װ������
				toDrop.setLuk(60); //װ������
				toDrop.setMatk(246); //ħ������
				toDrop.setWatk(148); //������ 
				toDrop.setBossDamage(40);//BOOS��
				toDrop.setIgnorePDR(20);//���ӷ���
				toDrop.setTotalDamage(10);//���˺�
				//toDrop.setAllStat(20);//ȫ����
				toDrop.setLimitBreak(20000000);
//				toDrop.setPotential1(60001);
//				toDrop.setPotential2(60002);
//				toDrop.setPotential3(40603);
//				toDrop.setPotential4(40603);
//				toDrop.setPotential5(40603);
//				toDrop.setPotential6(40603);
//				toDrop.setOwner("�������桤����ϵ��");
				im.addFromDrop(im.getC(), toDrop, false);
				im.sendOk("#b��ϲ����� #r#z1252093##b һ��.");
				//im.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + im.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
				im.dispose();
				} else {
				im.sendOk("ʧ��");
				im.dispose();
				}
			}
      }
   }
 }