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
                        var selStr = "#d��ѫ��ȡ�·ű�������ѡ����Ҫ������װ����#n#k\r\n";
                        //selStr +="\r\n#L1##b"+aaa+" ������#r#e#z1142310##d#n[�������鿴]#l#k\r\n";
			selStr +="#L2##b"+aaa+" ������#r#e#z1142311##d#n[ȫ����+5]#l#k\r\n";
			selStr +="#L3##b"+aaa+" ������#r#e#z1142312##d#n[ȫ����+10]#l#k\r\n";
			selStr +="#L4##b"+aaa+" ������#r#e#z1142313##d#n[ȫ����+15]#l#k\r\n";
			//selStr +="#L14##b"+aaa+" ������#r#e#z1142314##d#n[ȫ����+]#l#k\r\n";
			selStr +="#L5##b"+aaa+" ������#r#e#z1142314##d#n[ȫ����+20]#l#k\r\n";
			selStr +="#L6##b"+aaa+" ������#r#e#z1142315##d#n[ȫ����+30]#l#k\r\n";
			selStr +="#L7##b"+aaa+" ������#r#e#z1142316##d#n[ȫ����+35]#l#k\r\n";
			selStr +="#L8##b"+aaa+" ������#r#e#z1142317##d#n[ȫ����+40]#l#k\r\n\r\n";
			selStr +="#r#e-����4��ѫ���ܹ����#kÿ����Ȩ#n\r\n";
			selStr +="#L9##b"+aaa+" ������#r#e#z1142318##d#n[ȫ����+50]#l#k\r\n";
			selStr +="#L10##b"+aaa+" ������#r#e#z1142319##d#n[ȫ����+60]#l#k\r\n";
			selStr +="#L11##b"+aaa+" ������#r#e#z1142320##d#n[ȫ����+70]#l#k\r\n";
			selStr +="#L12##b"+aaa+" ������#r#e#z1142321##d#n[ȫ����+100#l#k\r\n";
			//selStr +="#L13##b"+aaa+" ������#r#e#z1142310##d#n[ȫ����+]#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #e#d���������֮����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 80 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036)   + " / 80 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n  #b��Ҫ#t1142310#��\t#r" + cm.itemQuantity(1142310) + " /  1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 3) {                                                                                                                                                                                                                                                                                                         
				typed=3;                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 160 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 160 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1000W\t\t\r\n#b��Ҫ#t1142311#��\t#r"+ cm.itemQuantity(1142311) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 4) {                                                                                                                                                                                                                                                                                                          
				typed=4;                                                                                                                                                                                                                                                                                                                                      
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 320 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 320 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2000W\t\t\r\n#b��Ҫ#t1142312#��\t#r"+ cm.itemQuantity(1142312) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");	
                        } else if (selection == 5) {                                                                                                                                                                                                                                                                                                           
				typed=5;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 1600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 640 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 640 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4000W\t\t\r\n#b��Ҫ#t1142313#��\t#r"+ cm.itemQuantity(1142313) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 6) {                                                                                                                                                                                                                                                                                                            
				typed=6;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 3200  ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1280 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+" / 1280 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8000W\t\t\r\n#b��Ҫ#t1142314#��\t#r"+cm.itemQuantity(1142314) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 7) {                                                                                                                                                                                                                                                                                                            
				typed=7;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 6400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1920 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 1920 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1E6000W\t\t\r\n#b��Ҫ#t1142315#��\t#r"+cm.itemQuantity(1142315)+" / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 8) {                                                                                                                                                                                                                                                                                                           
				typed=8;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 3840 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 3840 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3E2000W\t\t\r\n#b��Ҫ#t1142316#��\t#r"+cm.itemQuantity(1142316)+" / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 4800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 7680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 10) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=10;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ220��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 5800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 8680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 8680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 40 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    7E4000W\t\t\r\n#b��Ҫ#t1142318#��\t#r" + cm.itemQuantity(1142318) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 11) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=11;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 6800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 9680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 9680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 60 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 600 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8E\t\t\r\n#b��Ҫ#t1142319#��\t#r" + cm.itemQuantity(1142319) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 12) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=12;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 12680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 12680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" +cm.itemQuantity(4000313)+" / 500 ��\r\n#b��Ҫ#t4033356#��\t\t#r"+ cm.itemQuantity(4033356) + " / 100 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 1000 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    12E\t\t\r\n#b��Ҫ#t1142320#��\t#r" + cm.itemQuantity(1142320) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 13) {                                                                                                                                                                                                                                                                                                                                                                                            
				typed=13;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 14) {                                                                                                       
				typed=14;                                                                                                                                   
				cm.sendYesNo("- #e#d������˫��������Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4000286, 200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 100) && cm.haveItem(4310036, 100)) {
			cm.gainItem(1402196,1);
			cm.gainItem(4310030, -5000);
			cm.gainItem(4033356, -50);
			cm.gainItem(4021012, -30);
			cm.gainItem(4021011, -30);
			cm.gainItem(4021010, -30);
			cm.gainItem(4000082, -400);
			cm.gainItem(4000124, -50);
			cm.gainItem(4310015, -3);
			cm.gainItem(4021019, -1);
			cm.sendOk("��ϲ���ϳɷ��������֮��һ��.");
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷��������֮��.");
			cm.dispose();
				} else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
			} else if(typed==2){
                if (cm.haveItem(4000286, 200)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 80) && cm.haveItem(4310036, 80) && cm.haveItem(1142310, 1)) {
					cm.gainItem(4000286, -200);
					//cm.gainItem(4000016, -200);
					cm.gainItem(4310030, -80);
					cm.gainItem(4310036, -80);
					cm.gainItem(1142310, -1);
					cm.gainMeso(-5000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142311)).copy(); // ����һ��Equip��                    
            toDrop.setStr(5); //װ������
			toDrop.setDex(5); //װ������
			toDrop.setInt(5); //װ������
			toDrop.setLuk(5); //װ������
			toDrop.setMatk(5); //������
			toDrop.setWatk(5); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[�еȱ�]ȫ����+5");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 100 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 100 ��\r\n#b��Ҫ#t1142310#��\t#r" + cm.itemQuantity(1142310) + " / 1 ��#k");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(4000286, 400)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 160) && cm.haveItem(4310036, 160) && cm.haveItem(1142311, 1)) {
					cm.gainItem(4000286, -400);
					//cm.gainItem(4000016, -200);
					cm.gainItem(4310030, -160);
					cm.gainItem(4310036, -160);
					cm.gainItem(1142311, -1);
					cm.gainMeso(-10000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142312)).copy(); // ����һ��Equip��                    
            toDrop.setStr(10); //װ������
			toDrop.setDex(10); //װ������
			toDrop.setInt(10); //װ������
			toDrop.setLuk(10); //װ������
			toDrop.setMatk(10); //������
			toDrop.setWatk(10); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[�ߵȱ�]ȫ����+10");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 400 ��r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 400 ��\r\n#b��Ҫ#t1142311#��\t#r" + cm.itemQuantity(1142311) + " / 1 ��#k");
			cm.dispose();
				}
			} else if(typed==4){
                if (cm.haveItem(4000286, 800) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 320) && cm.haveItem(4310036, 320) && cm.haveItem(1142312, 1)) {
					cm.gainItem(4000286, -800);
					cm.gainItem(4310030, -320);
					cm.gainItem(4310036, -320);
					cm.gainItem(1142312, -1);
					cm.gainMeso(-20000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142313)).copy(); // ����һ��Equip��                    
            toDrop.setStr(15); //װ������
			toDrop.setDex(15); //װ������
			toDrop.setInt(15); //װ������
			toDrop.setLuk(15); //װ������
			toDrop.setMatk(15); //������
			toDrop.setWatk(15); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��ʿ��]ȫ����+15");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ� - #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 320 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 320 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2000W\t\t\r\n#b��Ҫ#t1142312#��\t#r"+ cm.itemQuantity(1142312) + " / 1 ��#k\r\n");
			cm.dispose();
				}
			} else if(typed==5){
                if (cm.haveItem(4000286, 1600)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 640) && cm.haveItem(4310036, 640) && cm.haveItem(1142313, 1)) {
				cm.gainItem(4000286, -1600);
					cm.gainItem(4310030, -640);
					cm.gainItem(4310036, -640);
					cm.gainItem(1142313, -1);
					cm.gainMeso(-40000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142314)).copy(); // ����һ��Equip��                    
            toDrop.setStr(20); //װ������
			toDrop.setDex(20); //װ������
			toDrop.setInt(20); //װ������
			toDrop.setLuk(20); //װ������
			toDrop.setMatk(20); //������
			toDrop.setWatk(20); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[׼ξ]ȫ����+20");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 1600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 640 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 640 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4000W\t\t\r\n#b��Ҫ#t1142313#��\t#r"+ cm.itemQuantity(1142313) + " / 1 ��#k\r\n");
			cm.dispose();
				}
			} else if(typed==6){
                if (cm.haveItem(4000286,3200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1280) && cm.haveItem(4310036, 1280) && cm.haveItem(1142314, 1)) {
					cm.gainItem(4000286, -3200);
					cm.gainItem(4310030, -1280);
					cm.gainItem(4310036, -1280);
					cm.gainItem(1142314, -1);
					cm.gainMeso(-80000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142315)).copy(); // ����һ��Equip��                    
            toDrop.setStr(30); //װ������
			toDrop.setDex(30); //װ������
			toDrop.setInt(30); //װ������
			toDrop.setLuk(30); //װ������
			toDrop.setMatk(30); //������
			toDrop.setWatk(30); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��ξ]ȫ����+30");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 3200  ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1280 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+" / 1280 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8000W\t\t\r\n#b��Ҫ#t1142314#��\t#r"+cm.itemQuantity(1142314) + " / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==7){
                if (cm.haveItem(4000286, 6400)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1920) && cm.haveItem(4310036, 1920) && cm.haveItem(1142315, 1)) {
					cm.gainItem(4000286, -6400);
					cm.gainItem(4310030, -1920);
					cm.gainItem(4310036, -1920);
					cm.gainMeso(-160000000);
					cm.gainItem(1142315, -1);
					
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142316)).copy(); // ����һ��Equip��                    
            toDrop.setStr(35); //װ������
			toDrop.setDex(35); //װ������
			toDrop.setInt(35); //װ������
			toDrop.setLuk(35); //װ������
			toDrop.setMatk(35); //������
			toDrop.setWatk(35); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��ξ]ȫ����+35");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 6400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1920 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 1920 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1E6000W\t\t\r\n#b��Ҫ#t1142315#��\t#r"+cm.itemQuantity(1142315)+" / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==8){
                if (cm.haveItem(4000286,8800) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3840) && cm.haveItem(4310036, 3840) && cm.haveItem(1142316, 1)) {
				    cm.gainItem(4000286, -8800);
					cm.gainItem(4310030, -3840);
					cm.gainItem(4310036, -3840);
					cm.gainMeso(-160000000);
					cm.gainItem(1142316, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142317)).copy(); // ����һ��Equip��                    
            toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			toDrop.setMatk(40); //������
			toDrop.setWatk(40); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��ξ]ȫ����+40");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#rѫ����Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4000286#��\t\t#r " + cm.itemQuantity(4000286) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 3840 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 3840 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3E2000W\t\t\r\n#b��Ҫ#t1142316#��\t#r"+cm.itemQuantity(1142316)+" / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==9){
                if (cm.haveItem(4310091, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 7680) && cm.haveItem(4310036, 7680) && cm.haveItem(1142317, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 200&&cm.haveItem(4000082,200)) {
					cm.gainItem(4310091, -4200);
					cm.gainItem(4310030, -7680);
					cm.gainItem(4310036, -7680);
					cm.gainItem(1142317, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainItem(4000082, -200);
					
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142318)).copy(); // ����һ��Equip��                    
            toDrop.setStr(50); //װ������
			toDrop.setDex(50); //װ������
			toDrop.setInt(50); //װ������
			toDrop.setLuk(50); //װ������
			toDrop.setMatk(50); //������
			toDrop.setWatk(50); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+50���");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+50���");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 4800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 7680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==10){
                if (cm.haveItem(4000286, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1142318, 1) && cm.haveItem(4000313, 120) && cm.haveItem(4033356, 40) && cm.getPlayer().getLevel() >= 220&&cm.haveItem(4000082,400)) {
					cm.gainItem(4000286, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1142318, -1);
					cm.gainItem(4000313, -120);
					cm.gainItem(4033356, -40);
					cm.gainItem(4000082, -400);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142319)).copy(); // ����һ��Equip��                    
            toDrop.setStr(60); //װ������
			toDrop.setDex(60); //װ������
			toDrop.setInt(60); //װ������
			toDrop.setLuk(60); //װ������
			toDrop.setMatk(60); //������
			toDrop.setWatk(60); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+60����");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+60����");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+60����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ220��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 5800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 8680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 8680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 40 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    7E4000W\t\t\r\n#b��Ҫ#t1142318#��\t#r" + cm.itemQuantity(1142318) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==11){
                if (cm.haveItem(4000286, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1142319, 1) && cm.haveItem(4000313, 120) && cm.haveItem(4033356, 40) && cm.getPlayer().getLevel() >= 230&&cm.haveItem(4000082,600)) {
					cm.gainItem(4000286, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1142319, -1);
					cm.gainItem(4000313, -120);
					cm.gainItem(4033356, -40);
					cm.gainItem(4000082, -600);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142320)).copy(); // ����һ��Equip��                    
            toDrop.setStr(70); //װ������
			toDrop.setDex(70); //װ������
			toDrop.setInt(70); //װ������
			toDrop.setLuk(70); //װ������
			toDrop.setMatk(70); //������
			toDrop.setWatk(70); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+70����");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+70����");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[��У]ȫ����+70����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 6800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 9680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 9680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 60 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 600 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8E\t\t\r\n#b��Ҫ#t1142319#��\t#r" + cm.itemQuantity(1142319) + " / 1 ��#k#k");
			cm.dispose();
				}
			} else if(typed==12){
                if (cm.haveItem(4000286, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1142320, 1) && cm.haveItem(4000313, 500) && cm.haveItem(4033356, 100) && cm.getPlayer().getLevel() >= 240&&cm.haveItem(4000082,1000)) {
					cm.gainItem(4000286, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1142320, -1);
					cm.gainItem(4000313, -500);
					cm.gainItem(4033356, -100);
					cm.gainItem(4000082, -1000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142321)).copy(); // ����һ��Equip��                    
            toDrop.setStr(100); //װ������
			toDrop.setDex(100); //װ������
			toDrop.setInt(100); //װ������
			toDrop.setLuk(100); //װ������
			toDrop.setMatk(100); //������
			toDrop.setWatk(100); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[�ų�]ȫ����+100������");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[�ų�]ȫ����+100������");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[�ų�]ȫ����+100������");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[�ų�]ȫ����+100������");
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[�ų�]ȫ����+100������");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 12680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 12680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" +cm.itemQuantity(4000313)+" / 500 ��\r\n#b��Ҫ#t4033356#��\t\t#r"+ cm.itemQuantity(4033356) + " / 100 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 1000 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    12E\t\t\r\n#b��Ҫ#t1142320#��\t#r" + cm.itemQuantity(1142320) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==13){
                if (cm.haveItem(4000286, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1142317, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 200) {
					cm.gainItem(4000286, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1142317, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1142318)).copy(); // ����һ��Equip��                    
            toDrop.setStr(50); //װ������
			toDrop.setDex(50); //װ������
			toDrop.setInt(50); //װ������
			toDrop.setLuk(50); //װ������
			toDrop.setMatk(50); //������
			toDrop.setWatk(50); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �������γɹ�", 5120002);
			cm.worldSpouseMessage(0x20, "���������š� : ��ϲʿ�� " + cm.getChar().getName() + " �ɹ�����Ϊ[��У]");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#rѫ����Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4310091#��\t\t#r " + cm.itemQuantity(4310091) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n#k");
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
			cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ���г�<��ͨ����Ա>�������˷�����˫������.");
			cm.dispose();
                } else {
			cm.sendOk("�ϳ�ʧ�ܣ�\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k");
			cm.dispose();
				}
           }
      }
   }
 }