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
                        var selStr = "#d���ã�1��1����2��28�ջ�ڼ�ֻҪ�ռ�60ö���ڱҼ�����ȡ�������#n#k\r\n";
                        selStr +="\r\n#L1##b"+aaa+" 60ö���ڱҶһ�150���ϰ�#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #e#d���Ʒ��#n#k\r\n\r\n#b��Ҫ#t4310110# x 60��\t\t\t\t #r " + cm.itemQuantity(4310110) + " / 60 ��\r\n\r\n�����ռ���󽫻�õ�\r\n #i2431938# #t2431938# x1 ��\r\n #i1112159# #t1112159# x1 ��\r\n #i1112271# #t1112271# x1 ��\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����ȡ����񷵻���һҳ.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#d�����ɹ���ǹ��Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #e#d������׷������Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #e#d�����ɷ�������Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");	
                        } else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#d������Σ��֮����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 6) {
				typed=6;
				cm.sendYesNo("- #e#d�����ɴ���ʿ�｣��Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 7) {
				typed=7;
				cm.sendYesNo("- #e#d�����ɼ���֮����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 8) {
				typed=8;
				cm.sendYesNo("- #e#d�����ɶ���������Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- #e#d������ħ��֮����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 10) {
				typed=10;
				cm.sendYesNo("- #e#d������ħ����ȡ����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 11) {
				typed=11;
				cm.sendYesNo("- #e#d������ħ��ԴȪ����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 12) {
				typed=12;
				cm.sendYesNo("- #e#d�����ɾ���֮����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 13) {
				typed=13;
				cm.sendYesNo("- #e#d����������ʹ����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
                        } else if (selection == 14) {
				typed=14;
				cm.sendYesNo("- #e#d������˫��������Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4310110, 60)) {
			cm.gainItem(4310110, -60);
			cm.gainItem(2431938, 1);
			cm.gainItem(1112159, 1);
			cm.gainItem(1112271, 1);
			cm.sendOk("��ϲ����û�����������������ϰ�һ����");
			cm.worldSpouseMessage(0x20, "������桻 : ��ϲ " + cm.getChar().getName() + " ������л��150����������һ�ѡ�");
			cm.dispose();
				} else {
			cm.sendOk("����ǰ���ڱҲ��㣬������������һ���");
			cm.dispose();
				}
			} else if(typed==2){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1432167,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ����ɹ���ǹһ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷����ɹ���ǹ.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1452205,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ�����׷����һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷�����׷����.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==4){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1462193,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ����ɷ�����һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷����ɷ�����.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==5){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1472214,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ�����Σ��֮��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷�����Σ��֮��.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==6){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1332225,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ����ɴ���ʿ�｣һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷�������ʿ�｣.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==7){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1342082,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ����ɼ���֮��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷����ɼ���֮��.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==8){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1362090,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ����ɶ�������һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷����ɶ�������.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==9){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1382208,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ�����ħ��֮��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷�����ħ��֮��.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==10){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1372177,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ�����ħ����ȡ��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷�����ħ����ȡ��.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==11){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1212063,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ�����ħ��ԴȪ��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷�����ħ��ԴȪ��.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==12){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1242060,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ����ɾ���֮��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷����ɾ���֮��.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==13){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1232057,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ���������ʹ��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷���������ʹ��.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==14){
                if (cm.haveItem(4310030, 5000) && cm.haveItem(4033356, 50) && cm.getSpace(1) >= 1 && cm.haveItem(4021012, 30) && cm.haveItem(4021010, 30) && cm.haveItem(4021011, 30) && cm.haveItem(4000082, 400) && cm.haveItem(4000124, 50) && cm.haveItem(4310015, 3) && cm.haveItem(4021019, 1)) {
			cm.gainItem(1522094,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ�����˫������һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<KINYOU>�������˷�����˫������.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
           }
      }
   }
 }