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
                        var selStr = "#d��#r#e#z1112446##d#nȡ�·ű�������ѡ����Ҫ������װ����#n#k\r\n";
                        //selStr +="\r\n#L1##b"+aaa+" ������#r#e#z1142310##d#n[�������鿴]#l#k\r\n";
			selStr +="#L2##b"+aaa+" ������#r#e#z1112447##d#n[ȫ����+5]#l#k\r\n";
			selStr +="#L3##b"+aaa+" ������#r#e#z1112448##d#n[ȫ����+10]#l#k\r\n";
			selStr +="#L4##b"+aaa+" ������#r#e#z1112449##d#n[ȫ����+15]#l#k\r\n";
			selStr +="#L5##b"+aaa+" ������#r#e#z1112450##d#n[ȫ����+20]#l#k\r\n";
			selStr +="#L6##b"+aaa+" ������#r#e#z1112451##d#n[ȫ����+25]#l#k\r\n";
			selStr +="#L7##b"+aaa+" ������#r#e#z1112452##d#n[ȫ����+30]#l#k\r\n";
			selStr +="#L8##b"+aaa+" ������#r#e#z1112453##d#n[ȫ����+35]#l#k\r\n";
			//selStr +="#r#e-����4����ָ�ܹ����#kÿ����Ȩ#n\r\n";
			selStr +="#L9##b"+aaa+" ������#r#e#z1112454##d#n[ȫ����+40]#l#k\r\n";
			selStr +="#L10##b"+aaa+" ������#r#e#z1112455##d#n[ȫ����+45]#l#k\r\n";
			selStr +="#L11##b"+aaa+" ������#r#e#z1112456##d#n[ȫ����+50]#l#k\r\n";
			selStr +="#L12##b"+aaa+" ������#r#e#z1112457##d#n[ȫ����+55#l#k\r\n";
			selStr +="#L13##b"+aaa+" ������#r#e#z1112458##d#n[ȫ����+60]#l#k\r\n";
			selStr +="#L14##b"+aaa+" ������#r#e#z1112459##d#n[ȫ����+65]#l#k\r\n";
			selStr +="#L15##b"+aaa+" ������#r#e#z1112460##d#n[ȫ����+70]#l#k\r\n";
			selStr +="#L16##b"+aaa+" ������#r#e#z1112461##d#n[ȫ����+75]#l#k\r\n";
			selStr +="#L17##b"+aaa+" ������#r#e#z1112462##d#n[ȫ����+80]#l#k\r\n";
			selStr +="#L18##b"+aaa+" ������#r#e#z1112463##d#n[ȫ����+85]#l#k\r\n";
			selStr +="#L19##b"+aaa+" ������#r#e#z1112464##d#n[ȫ����+90]#l#k\r\n";
			selStr +="#L20##b"+aaa+" ������#r#e#z1112465##d#n[ȫ����+95]#l#k\r\n";
			selStr +="#L21##b"+aaa+" ������#r#e#z1112466##d#n[ȫ����+100]#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #e#d���������֮����Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b��Ҫ#t4021012#��\t\t\t\t #r " + cm.itemQuantity(4021012) + " / 30 ��\r\n#b��Ҫ#t4021010#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4021010) + " / 30 ��\r\n#b��Ҫ#t4021011#�� \t\t\t\t  #r" + cm.itemQuantity(4021011) + " / 30 ��\r\n#b��Ҫ#t4000082#�� \t\t\t\t  #r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ#t4000124#��\t\t\t#r" + cm.itemQuantity(4000124) + " / 50 ��\r\n#b��Ҫ#t4310015#��\t\t\t\t\t\t#r" + cm.itemQuantity(4310015) + " / 3 ��\r\n#b��Ҫ#t4021019#��\t\t\t\t\t\t  #r" + cm.itemQuantity(4021019) + " / 1 ��\r\n#b��Ҫ#t4033356#��\t\t\t\t\t   #r" + cm.itemQuantity(4033356) + " / 50 ��\r\n#b��Ҫ#t4310030#�� \t\t\t\t\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 80 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036)   + " / 80 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5000W\t\t\r\n  #b��Ҫ#t1112446#��\t#r" + cm.itemQuantity(1112446) + " /  1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 3) {                                                                                                                                                                                                                                                                                                         
				typed=3;                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 160 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 160 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1E\t\t\r\n#b��Ҫ#t1112447#��\t#r"+ cm.itemQuantity(1112447) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 4) {                                                                                                                                                                                                                                                                                                          
				typed=4;                                                                                                                                                                                                                                                                                                                                      
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 320 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 320 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.5E\t\t\r\n#b��Ҫ#t1112448#��\t#r"+ cm.itemQuantity(1112448) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");	
                        } else if (selection == 5) {                                                                                                                                                                                                                                                                                                           
				typed=5;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 640 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 640 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2E\t\t\r\n#b��Ҫ#t1112449#��\t#r"+ cm.itemQuantity(1112449) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 6) {                                                                                                                                                                                                                                                                                                            
				typed=6;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3200  ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1280 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+" / 1280 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r   2.5E\t\t\r\n#b��Ҫ#t1112450#��\t#r"+cm.itemQuantity(1112450) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 7) {                                                                                                                                                                                                                                                                                                            
				typed=7;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1920 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 1920 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3E\t\t\r\n#b��Ҫ#t1112451#��\t#r"+cm.itemQuantity(1112451)+" / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 8) {                                                                                                                                                                                                                                                                                                           
				typed=8;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 3840 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 3840 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.5E\t\t\r\n#b��Ҫ#t1112452#��\t#r"+cm.itemQuantity(1112452)+" / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 7680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4E\t\t\r\n#b��Ҫ#t1112453#��\t#r" + cm.itemQuantity(1112453) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 10) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=10;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 8680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 8680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 40 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4.5E\t\t\r\n#b��Ҫ#t1112454#��\t#r" + cm.itemQuantity(1112454) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 11) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=11;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 9680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 9680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 60 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 600 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5E\t\t\r\n#b��Ҫ#t1112455#��\t#r" + cm.itemQuantity(1112455) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 12) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=12;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 12680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 12680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" +cm.itemQuantity(4000313)+" / 500 ��\r\n#b��Ҫ#t4033356#��\t\t#r"+ cm.itemQuantity(4033356) + " / 100 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 1000 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5.5E\t\t\r\n#b��Ҫ#t1112456#��\t#r" + cm.itemQuantity(1112456) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 13) {                                                                                                                                                                                                                                                                                                                                                                                            
				typed=13;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6E\t\t\r\n#b��Ҫ#t1112457#��\t#r" + cm.itemQuantity(1112457) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 14) {  

                                 typed=14;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6.5\t\t\r\n#b��Ҫ#t1112458#��\t#r" + cm.itemQuantity(1112458) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 15) {  

                                 typed=15;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    7E\t\t\r\n#b��Ҫ#t1112459#��\t#r" + cm.itemQuantity(1112459) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 16) {  

                                 typed=16;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    7.5E\t\t\r\n#b��Ҫ#t1112460#��\t#r" + cm.itemQuantity(1112460) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 17) {  

                                 typed=17;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8E\t\t\r\n#b��Ҫ#t1112461#��\t#r" + cm.itemQuantity(1112461) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 18) {  

                                 typed=18;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r   8.5E\t\t\r\n#b��Ҫ#t1112462#��\t#r" + cm.itemQuantity(1112462) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 19) {  

                                 typed=19;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    9E\t\t\r\n#b��Ҫ#t1112463#��\t#r" + cm.itemQuantity(1112463) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 20) {  

                                 typed=20;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    9.5E\t\t\r\n#b��Ҫ#t1112464#��\t#r" + cm.itemQuantity(1112464) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 21) {  

                                 typed=21;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    10E\t\t\r\n#b��Ҫ#t1112465#��\t#r" + cm.itemQuantity(1112465) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 22) {  

                                 typed=22;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 23) {  

                                 typed=23;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 24) {  

                                 typed=24;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 25) {  

                                 typed=25;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 26) {  

                                 typed=26;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 27) {  

                                 typed=27;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 28) {  

                                 typed=28;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 29) {  

                                 typed=29;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 30) {  

                                 typed=30;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    500W\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1142317) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4001465, 200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 100) && cm.haveItem(4310036, 100)) {
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
                if (cm.haveItem(4001465, 200)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 80) && cm.haveItem(4310036, 80) && cm.haveItem(1112446, 1)) {
					cm.gainItem(4001465, -200);
					//cm.gainItem(4000016, -200);
					cm.gainItem(4310030, -80);
					cm.gainItem(4310036, -80);
					cm.gainItem(1112446, -1);//��Ҫ�۳��Ľ�ָ
					cm.gainMeso(-50000000);//��Ҫ�۳����
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112447)).copy(); // �����ɹ������µĽ�ָ                    
            toDrop.setStr(5); //װ������
			toDrop.setDex(5); //װ������
			toDrop.setInt(5); //װ������
			toDrop.setLuk(5); //װ������
			toDrop.setMatk(5); //������
			toDrop.setWatk(5); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[2��������ָ]ȫ����+5");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 100 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 100 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    0.5E\t\t\r\n#b��Ҫ#t1112447#��\t#r" + cm.itemQuantity(1112447) + " / 1 ��#k");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(4001465, 400)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 160) && cm.haveItem(4310036, 160) && cm.haveItem(1112447, 1)) {
					cm.gainItem(4001465, -400);
					//cm.gainItem(4000016, -200);
					cm.gainItem(4310030, -160);
					cm.gainItem(4310036, -160);
					cm.gainItem(1112447, -1);
					cm.gainMeso(-100000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112448)).copy(); // ����һ��Equip��                    
            toDrop.setStr(10); //װ������
			toDrop.setDex(10); //װ������
			toDrop.setInt(10); //װ������
			toDrop.setLuk(10); //װ������
			toDrop.setMatk(10); //������
			toDrop.setWatk(10); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[3��������ָ]ȫ����+10");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 400 ��r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1E\t\t\r\n#b��Ҫ#t1112447#��\t#r" + cm.itemQuantity(1112447) + " / 1 ��#k");
			cm.dispose();
				}
			} else if(typed==4){
                if (cm.haveItem(4001465, 800) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 320) && cm.haveItem(4310036, 320) && cm.haveItem(1112448, 1)) {
					cm.gainItem(4001465, -800);
					cm.gainItem(4310030, -320);
					cm.gainItem(4310036, -320);
					cm.gainItem(1112448, -1);
					cm.gainMeso(-150000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112449)).copy(); // ����һ��Equip��                    
            toDrop.setStr(15); //װ������
			toDrop.setDex(15); //װ������
			toDrop.setInt(15); //װ������
			toDrop.setLuk(15); //װ������
			toDrop.setMatk(15); //������
			toDrop.setWatk(15); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[4��������ָ]ȫ����+15");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ� - #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 320 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 320 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.5E\t\t\r\n#b��Ҫ#t1112448#��\t#r"+ cm.itemQuantity(1112448) + " / 1 ��#k\r\n");
			cm.dispose();
				}
			} else if(typed==5){
                if (cm.haveItem(4001465, 1600)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 640) && cm.haveItem(4310036, 640) && cm.haveItem(1112449, 1)) {
				cm.gainItem(4001465, -1600);
					cm.gainItem(4310030, -640);
					cm.gainItem(4310036, -640);
					cm.gainItem(1112449, -1);
					cm.gainMeso(-200000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112450)).copy(); // ����һ��Equip��                    
            toDrop.setStr(20); //װ������
			toDrop.setDex(20); //װ������
			toDrop.setInt(20); //װ������
			toDrop.setLuk(20); //װ������
			toDrop.setMatk(20); //������
			toDrop.setWatk(20); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[5��������ָ]ȫ����+20");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 640 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 640 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2E\t\t\r\n#b��Ҫ#t1112449#��\t#r"+ cm.itemQuantity(1112449) + " / 1 ��#k\r\n");
			cm.dispose();
				}
			} else if(typed==6){
                if (cm.haveItem(4001465,3200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1280) && cm.haveItem(4310036, 1280) && cm.haveItem(1112450, 1)) {
					cm.gainItem(4001465, -3200);
					cm.gainItem(4310030, -1280);
					cm.gainItem(4310036, -1280);
					cm.gainItem(1112450, -1);
					cm.gainMeso(-250000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112451)).copy(); // ����һ��Equip��                    
            toDrop.setStr(25); //װ������
			toDrop.setDex(25); //װ������
			toDrop.setInt(25); //װ������
			toDrop.setLuk(25); //װ������
			toDrop.setMatk(25); //������
			toDrop.setWatk(25); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[6������]ȫ����+25");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3200  ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1280 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+" / 1280 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.5E\t\t\r\n#b��Ҫ#t1112450#��\t#r"+cm.itemQuantity(1112450) + " / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==7){
                if (cm.haveItem(4001465, 6400)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1920) && cm.haveItem(4310036, 1920) && cm.haveItem(1112450, 1)) {
					cm.gainItem(4001465, -6400);
					cm.gainItem(4310030, -1920);
					cm.gainItem(4310036, -1920);
					cm.gainMeso(-300000000);
					cm.gainItem(1112450, -1);
					
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112451)).copy(); // ����һ��Equip��                    
            toDrop.setStr(30); //װ������
			toDrop.setDex(30); //װ������
			toDrop.setInt(30); //װ������
			toDrop.setLuk(30); //װ������
			toDrop.setMatk(30); //������
			toDrop.setWatk(30); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[7��������]ȫ����+30");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1920 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 1920 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3E\t\t\r\n#b��Ҫ#t1112450#��\t#r"+cm.itemQuantity(1112450)+" / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==8){
                if (cm.haveItem(4001465,8800) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3840) && cm.haveItem(4310036, 3840) && cm.haveItem(1112451, 1)) {
				    cm.gainItem(4001465, -8800);
					cm.gainItem(4310030, -3840);
					cm.gainItem(4310036, -3840);
					cm.gainMeso(-350000000);
					cm.gainItem(1112451, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112452)).copy(); // ����һ��Equip��                    
            toDrop.setStr(35); //װ������
			toDrop.setDex(35); //װ������
			toDrop.setInt(35); //װ������
			toDrop.setLuk(35); //װ������
			toDrop.setMatk(35); //������
			toDrop.setWatk(35); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[8��������ָ]ȫ����+35");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 3840 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 3840 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.5E\t\t\r\n#b��Ҫ#t1142316#��\t#r"+cm.itemQuantity(1142316)+" / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==9){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 7680) && cm.haveItem(4310036, 7680) && cm.haveItem(1112452, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 200&&cm.haveItem(4000082,200)) {
					cm.gainItem(4001465, -4200);
					cm.gainItem(4310030, -7680);
					cm.gainItem(4310036, -7680);
					cm.gainMeso(-400000000);
					cm.gainItem(1112452, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainItem(4000082, -200);
					
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112453)).copy(); // ����һ��Equip��                    
            toDrop.setStr(40); //װ������
			toDrop.setDex(40); //װ������
			toDrop.setInt(40); //װ������
			toDrop.setLuk(40); //װ������
			toDrop.setMatk(40); //������
			toDrop.setWatk(40); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[9��������ָ]ȫ����+40���");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[9��������ָ]ȫ����+40���");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 7680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4E\t\t\r\n#b��Ҫ#t1112452#��\t#r" + cm.itemQuantity(1112452) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==10){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1112453, 1) && cm.haveItem(4000313, 120) && cm.haveItem(4033356, 40) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,400)) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1112453, -1);
					cm.gainItem(4000313, -120);
					cm.gainItem(4033356, -40);
					cm.gainItem(4000082, -400);
					cm.gainMeso(-450000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112454)).copy(); // ����һ��Equip��                    
            toDrop.setStr(45); //װ������
			toDrop.setDex(45); //װ������
			toDrop.setInt(45); //װ������
			toDrop.setLuk(45); //װ������
			toDrop.setMatk(45); //������
			toDrop.setWatk(45); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[10��������ָ]ȫ����+45����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[10��������ָ]ȫ����+45����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[10��������ָ]ȫ����+45����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 8680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 8680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 40 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4.5E\t\t\r\n#b��Ҫ#t1112453#��\t#r" + cm.itemQuantity(1112453) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==11){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1112454, 1) && cm.haveItem(4000313, 120) && cm.haveItem(4033356, 40) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,600)) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1112454, -1);
					cm.gainItem(4000313, -120);
					cm.gainItem(4033356, -40);
					cm.gainItem(4000082, -600);
					cm.gainMeso(-500000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112455)).copy(); // ����һ��Equip��                    
            toDrop.setStr(50); //װ������
			toDrop.setDex(50); //װ������
			toDrop.setInt(50); //װ������
			toDrop.setLuk(50); //װ������
			toDrop.setMatk(50); //������
			toDrop.setWatk(50); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[11��������ָ]ȫ����+50����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[11��������ָ]ȫ����+50����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[11��������ָ]ȫ����+50����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 9680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 9680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 60 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 600 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5E\t\t\r\n#b��Ҫ#t1112454#��\t#r" + cm.itemQuantity(1112454) + " / 1 ��#k#k");
			cm.dispose();
				}
			} else if(typed==12){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 10000) && cm.haveItem(4310036, 10000) && cm.haveItem(1112455, 1) && cm.haveItem(4000313, 500) && cm.haveItem(4033356, 100) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,1000)) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -10000);
					cm.gainItem(4310036, -10000);
					cm.gainItem(1112455, -1);
					cm.gainItem(4000313, -500);
					cm.gainItem(4033356, -100);
					cm.gainItem(4000082, -1000);
					cm.gainMeso(-550000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112456)).copy(); // ����һ��Equip��                    
            toDrop.setStr(55); //װ������
			toDrop.setDex(55); //װ������
			toDrop.setInt(55); //װ������
			toDrop.setLuk(55); //װ������
			toDrop.setMatk(55); //������
			toDrop.setWatk(55); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[12��������ָ]ȫ����+55����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[12��������ָ]ȫ����+55����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[12��������ָ]ȫ����+55����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 8800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 12680 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 12680 ��\r\n#b��Ҫ#t4000313#��\t\t#r" +cm.itemQuantity(4000313)+" / 500 ��\r\n#b��Ҫ#t4033356#��\t\t#r"+ cm.itemQuantity(4033356) + " / 100 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 1000 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5.5E\t\t\r\n#b��Ҫ#t1112455#��\t#r" + cm.itemQuantity(1112455) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==13){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112456, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112456, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-600000000);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112457)).copy(); // ����һ��Equip��                    
            toDrop.setStr(60); //װ������
			toDrop.setDex(60); //װ������
			toDrop.setInt(60); //װ������
			toDrop.setLuk(60); //װ������
			toDrop.setMatk(60); //������
			toDrop.setWatk(60); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[13��������ָ]ȫ����+60����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[13��������ָ]ȫ����+60����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[13��������ָ]ȫ����+60����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6E\t\t\r\n#b��Ҫ#t1112456#��\t#r" + cm.itemQuantity(1112456) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==14){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112457, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112457, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-6.50000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112458)).copy(); // ����һ��Equip��                    
            toDrop.setStr(65); //װ������
			toDrop.setDex(65); //װ������
			toDrop.setInt(65); //װ������
			toDrop.setLuk(65); //װ������
			toDrop.setMatk(65); //������
			toDrop.setWatk(65); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[14��������ָ]ȫ����+65����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[14��������ָ]ȫ����+65����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[14��������ָ]ȫ����+65����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6.5E\t\t\r\n#b��Ҫ#t1112457#��\t#r" + cm.itemQuantity(1112457) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==15){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112458, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112458, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-700000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112459)).copy(); // ����һ��Equip��                    
            toDrop.setStr(70); //װ������
			toDrop.setDex(70); //װ������
			toDrop.setInt(70); //װ������
			toDrop.setLuk(70); //װ������
			toDrop.setMatk(70); //������
			toDrop.setWatk(70); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[15��������ָ]ȫ����+70����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[15��������ָ]ȫ����+70����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[15��������ָ]ȫ����+70����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    7E\t\t\r\n#b��Ҫ#t1112458#��\t#r" + cm.itemQuantity(1112458) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==16){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112459, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112459, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-7.50000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112460)).copy(); // ����һ��Equip��                    
            toDrop.setStr(75); //װ������
			toDrop.setDex(75); //װ������
			toDrop.setInt(75); //װ������
			toDrop.setLuk(75); //װ������
			toDrop.setMatk(75); //������
			toDrop.setWatk(75); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[16��������ָ]ȫ����+75����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[16��������ָ]ȫ����+75����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[16��������ָ]ȫ����+75����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    7.5E\t\t\r\n#b��Ҫ#t1112459#��\t#r" + cm.itemQuantity(1112459) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==17){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112460, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112460, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-800000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112461)).copy(); // ����һ��Equip��                    
            toDrop.setStr(80); //װ������
			toDrop.setDex(80); //װ������
			toDrop.setInt(80); //װ������
			toDrop.setLuk(80); //װ������
			toDrop.setMatk(80); //������
			toDrop.setWatk(80); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[17��������ָ]ȫ����+80����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[17��������ָ]ȫ����+80����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[17��������ָ]ȫ����+80����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8E\t\t\r\n#b��Ҫ#t1112460#��\t#r" + cm.itemQuantity(1112460) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==18){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112461, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112461, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-8.50000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112462)).copy(); // ����һ��Equip��                    
            toDrop.setStr(85); //װ������
			toDrop.setDex(85); //װ������
			toDrop.setInt(85); //װ������
			toDrop.setLuk(85); //װ������
			toDrop.setMatk(85); //������
			toDrop.setWatk(85); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[18��������ָ]ȫ����+85����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[18��������ָ]ȫ����+85����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[18��������ָ]ȫ����+85����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8.5E\t\t\r\n#b��Ҫ#t1112461#��\t#r" + cm.itemQuantity(1112461) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==19){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112462, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112462, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-900000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112463)).copy(); // ����һ��Equip��                    
            toDrop.setStr(90); //װ������
			toDrop.setDex(90); //װ������
			toDrop.setInt(90); //װ������
			toDrop.setLuk(90); //װ������
			toDrop.setMatk(90); //������
			toDrop.setWatk(90); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[19��������ָ]ȫ����+90����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[19��������ָ]ȫ����+90����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[19��������ָ]ȫ����+90����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    9E\t\t\r\n#b��Ҫ#t1112462#��\t#r" + cm.itemQuantity(1112462) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==20){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112463, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112463, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-9.50000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112464)).copy(); // ����һ��Equip��                    
            toDrop.setStr(95); //װ������
			toDrop.setDex(95); //װ������
			toDrop.setInt(95); //װ������
			toDrop.setLuk(95); //װ������
			toDrop.setMatk(95); //������
			toDrop.setWatk(95); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[20��������ָ]ȫ����+95����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[20��������ָ]ȫ����+95����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[20��������ָ]ȫ����+95����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    9.5E\t\t\r\n#b��Ҫ#t1112463#��\t#r" + cm.itemQuantity(1112463) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==21){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112464, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112464, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-1000000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112465)).copy(); // ����һ��Equip��                    
            toDrop.setStr(100); //װ������
			toDrop.setDex(100); //װ������
			toDrop.setInt(100); //װ������
			toDrop.setLuk(100); //װ������
			toDrop.setMatk(100); //������
			toDrop.setWatk(100); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[21��������ָ]ȫ����+100����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[21��������ָ]ȫ����+100����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[21��������ָ]ȫ����+100����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    10E\t\t\r\n#b��Ҫ#t1112464#��\t#r" + cm.itemQuantity(1112464) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==22){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 5000) && cm.haveItem(4310036, 7000) && cm.haveItem(1112465, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() > 210) {
					cm.gainItem(4001465, -4200);
					//cm.gainItem(4000016, -4200);
					cm.gainItem(4310030, -5000);
					cm.gainItem(4310036, -7000);
					cm.gainItem(1112465, -1);
					cm.gainItem(4000313, -60);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-1050000000);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112466)).copy(); // ����һ��Equip��                    
            toDrop.setStr(105); //װ������
			toDrop.setDex(105); //װ������
			toDrop.setInt(105); //װ������
			toDrop.setLuk(105); //װ������
			toDrop.setMatk(105); //������
			toDrop.setWatk(105); //ħ������ 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("��ϲ�������ɹ�.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ������ɹ������ף�����������ɣ�", 5120002);
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[22��������ָ]ȫ����+105����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[22��������ָ]ȫ����+105����");
			cm.worldSpouseMessage(0x20, "��������� : ��ϲ��� " + cm.getChar().getName() + " �������ϵ�Ŭ�����ڳɹ�����Ϊ[22��������ָ]ȫ����+105����");
			cm.dispose();
                } else {
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 7000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    10.5E\t\t\r\n#b��Ҫ#t1112465#��\t#r" + cm.itemQuantity(1112465) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
           }
      }
   }
 }