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
                        var selStr = "#d��#r#e�Ϲ����Ž�ָ#k#dȡ�·ű�������ѡ����Ҫ������װ����#n#k\r\n";
                        //selStr +="\r\n#L1##b"+aaa+" ������#r#e#z1142310##d#n[�������鿴]#l#k\r\n";
			//selStr +="#L1##b"+aaa+" ���͵�#r #z4001465##b ר�õ�ͼ#l#k\r\n";
			selStr +="#L100##b"+aaa+" ���ʼ#r#z1112446# #b��������֮·#l#k\r\n";
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
			//���滹��30���Ϲ����Ž�ָ����δ���

                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("-��ȷ��Ҫ���͵����ı�ʯ#i4001465#ר�õ�ͼ��\r\n\r\n- #e#d������ʾ��#n#b���Ǵ��͡���񷵻���һҳ.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 300 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036)   + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2000W\t\t\r\n  #b��Ҫ#t1112446#��\t#r" + cm.itemQuantity(1112446) + " /  1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 3) {                                                                                                                                                                                                                                                                                                         
				typed=3;                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4000W\t\t\r\n#b��Ҫ#t1112447#��\t#r"+ cm.itemQuantity(1112447) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 4) {                                                                                                                                                                                                                                                                                                          
				typed=4;                                                                                                                                                                                                                                                                                                                                      
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 900 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 600 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6000W\t\t\r\n#b��Ҫ#t1112448#��\t#r"+ cm.itemQuantity(1112448) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");	
                        } else if (selection == 5) {                                                                                                                                                                                                                                                                                                           
				typed=5;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 800 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8000W\t\t\r\n#b��Ҫ#t1112449#��\t#r"+ cm.itemQuantity(1112449) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 6) {                                                                                                                                                                                                                                                                                                            
				typed=6;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1500  ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+" / 1000 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r   1E\t\t\r\n#b��Ҫ#t1112450#��\t#r"+cm.itemQuantity(1112450) + " / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 7) {                                                                                                                                                                                                                                                                                                            
				typed=7;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 1200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.2E\t\t\r\n#b��Ҫ#t1112451#��\t#r"+cm.itemQuantity(1112451)+" / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 8) {                                                                                                                                                                                                                                                                                                           
				typed=8;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 2100 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 1400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.4E\t\t\r\n#b��Ҫ#t1112452#��\t#r"+cm.itemQuantity(1112452)+" / 1 ��#k\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 2400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 1600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 1600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.6E\t\t\r\n#b��Ҫ#t1112453#��\t#r" + cm.itemQuantity(1112453) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 10) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=10;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 2700 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 1800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 1800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 40 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.8E\t\t\r\n#b��Ҫ#t1112454#��\t#r" + cm.itemQuantity(1112454) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 11) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=11;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3000 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 180 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 60 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2E\t\t\r\n#b��Ҫ#t1112455#��\t#r" + cm.itemQuantity(1112455) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 12) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=12;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3300 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2200 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 240 ��\r\n#b��Ҫ#t4033356#��\t\t#r"+ cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 80 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.2E\t\t\r\n#b��Ҫ#t1112456#��\t#r" + cm.itemQuantity(1112456) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
                        } else if (selection == 13) {                                                                                                                                                                                                                                                                                                                                                                                            
				typed=13;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2400 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 300 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 100 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.4E\t\t\r\n#b��Ҫ#t1112457#��\t#r" + cm.itemQuantity(1112457) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 14) {  

                                 typed=14;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3900 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 360 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 120 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.6E\t\t\r\n#b��Ҫ#t1112458#��\t#r" + cm.itemQuantity(1112458) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 15) {  

                                 typed=15;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 420 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 140 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.8E\t\t\r\n#b��Ҫ#t1112459#��\t#r" + cm.itemQuantity(1112459) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 16) {  

                                 typed=16;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4500 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 480 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 160 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3E\t\t\r\n#b��Ҫ#t1112460#��\t#r" + cm.itemQuantity(1112460) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 17) {  

                                 typed=17;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3200 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 540 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 180 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.2E\t\t\r\n#b��Ҫ#t1112461#��\t#r" + cm.itemQuantity(1112461) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 18) {  

                                 typed=18;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5100 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3400 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 600 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r   3.4E\t\t\r\n#b��Ҫ#t1112462#��\t#r" + cm.itemQuantity(1112462) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 19) {  

                                 typed=19;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 660 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 220 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.6E\t\t\r\n#b��Ҫ#t1112463#��\t#r" + cm.itemQuantity(1112463) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 20) {  

                                 typed=20;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5700 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 720 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 240 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.8E\t\t\r\n#b��Ҫ#t1112464#��\t#r" + cm.itemQuantity(1112464) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 21) {  

                                 typed=21;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6000 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 4000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 4000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 780 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 260 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4E\t\t\r\n#b��Ҫ#t1112465#��\t#r" + cm.itemQuantity(1112465) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 22) {  

                                 typed=22;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6300 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 4200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 4200 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 840 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 280 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4.2E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112466) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 23) {  

                                 typed=23;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 4400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 4400 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 900 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 300 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4.4E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112467) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 24) {  

                                 typed=24;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6900 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 4600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 4600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 960 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 320 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4.6E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112468) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 25) {  

                                 typed=25;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 7200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 4800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 4800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 1020 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 340 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4.8E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112469) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 26) {  

                                 typed=26;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 7500 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 5000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 1080 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 360 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112470) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 27) {  

                                 typed=27;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 7800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 5200 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 1140 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 380 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5.2E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112471) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 28) {  

                                 typed=28;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 8100 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 5400 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 1200 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5.4E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112472) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 29) {  

                                 typed=29;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 8400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 5600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 1260 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 420 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5.6E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112473) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");

                        } else if (selection == 30) {  

                                 typed=30;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 8700 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 5800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 5800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 1320 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 440 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    5.8E\t\t\r\n#b��Ҫ#t1142317#��\t#r" + cm.itemQuantity(1112474) + " / 1 ��#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ��н�������񷵻���һҳ.#k");
		 } else	if (selection == 100) {
				typed=100;

				cm.sendYesNo("-#b��ȷ��Ҫ��ȡ��ʼ#r#z1112246##b��������֮·��\r\n\r\n- #e#d������ʾ��#n#b���Ǵ��͡���񷵻���һҳ.#k");

			}


			} else if (selection == 2) {
					if(typed==1){
				cm.dispose();
                    		cm.warp(211080100);
				cm.dispose();
				}
			} else	if(typed==100){
                    //cm.openNpc(9310071, 102);
					//cm.dispose();
		if (cm.getBossLog("�����Ϲ�����",1) == 0 && cm.getSpace(1) > 1) {
	    cm.gainItem(1112446, 1);
	    cm.setBossLog("�����Ϲ�����",1);
	    cm.setBossLog("�����Ϲ�������ȡ",1);
		cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" ��ȡ�����Ϲ����Ž�ָ���ɹ������˽���֮·�����ף�����������ɣ�", 5120002);
	    cm.worldSpouseMessage(0x20, "����ָ������ : ��� " + cm.getChar().getName() + " ��ȡ�˳��׶��Ϲ����Ž�ָ�����˽���֮·��");
	    cm.sendOk(" #b�ɹ���ȡ�˳��׶��Ϲ����Ž�ָһ���������Ʊ���ÿ�ν����Ľ�ָ���´����޷�����������ȡ������ָ�ˡ�");
            cm.dispose();
	} else {
	    cm.sendOk("#b���Ѿ���ȡ�������߱���������#k\r\n\r\n\r\n- #d#e��ָ����˵��#k#n\r\n\r\n#b1). ������ȡ�Ϲ����Ž�ָ��ȡ���׽�ָ��\r\n#r2). ���Ҫ�������Ϲ����Ž�ָ���ڱ�����һ��");
	    cm.dispose();
	}
				

			} else if(typed==2){
                if (cm.haveItem(4001465, 300)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 200) && cm.haveItem(4310036, 200) && cm.haveItem(1112446, 1)) {
					cm.gainItem(4001465, -300);//���ı�ʯ
					cm.gainItem(4310030, -200);//�˶����
					cm.gainItem(4310036, -200);//�����߱�
					cm.gainItem(1112446, -1);//��Ҫ�۳��Ľ�ָ
					cm.gainMeso(-20000000);//��Ҫ�۳����
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
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 300 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2000W\t\t\r\n#b��Ҫ#t1112446#��\t#r" + cm.itemQuantity(1112446) + " / 1 ��#k");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(4001465, 600)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 400) && cm.haveItem(4310036, 400) && cm.haveItem(1112447, 1)) {
					cm.gainItem(4001465, -600);
					cm.gainItem(4310030, -400);
					cm.gainItem(4310036, -400);
					cm.gainItem(1112447, -1);
					cm.gainMeso(-40000000);
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
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 600 ��r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4000W\t\t\r\n#b��Ҫ#t1112447#��\t#r" + cm.itemQuantity(1112447) + " / 1 ��#k");
			cm.dispose();
				}
			} else if(typed==4){
                if (cm.haveItem(4001465, 900) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 600) && cm.haveItem(4310036, 600) && cm.haveItem(1112448, 1)) {
					cm.gainItem(4001465, -900);
					cm.gainItem(4310030, -600);
					cm.gainItem(4310036, -600);
					cm.gainItem(1112448, -1);
					cm.gainMeso(-60000000);
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
			cm.sendOk("����ʧ�ܣ� - #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 900 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 600 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    6000W\t\t\r\n#b��Ҫ#t1112448#��\t#r"+ cm.itemQuantity(1112448) + " / 1 ��#k\r\n");
			cm.dispose();
				}
			} else if(typed==5){
                if (cm.haveItem(4001465, 1200)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 800) && cm.haveItem(4310036, 800) && cm.haveItem(1112449, 1)) {
				cm.gainItem(4001465, -1200);
					cm.gainItem(4310030, -800);
					cm.gainItem(4310036, -800);
					cm.gainItem(1112449, -1);
					cm.gainMeso(-80000000);
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
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 800 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    8000W\t\t\r\n#b��Ҫ#t1112449#��\t#r"+ cm.itemQuantity(1112449) + " / 1 ��#k\r\n");
			cm.dispose();
				}
			} else if(typed==6){
                if (cm.haveItem(4001465,1500) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1000) && cm.haveItem(4310036, 1000) && cm.haveItem(1112450, 1)) {
					cm.gainItem(4001465, -1500);
					cm.gainItem(4310030, -1000);
					cm.gainItem(4310036, -1000);
					cm.gainItem(1112450, -1);
					cm.gainMeso(-100000000);
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
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1500  ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+" / 1000 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1E\t\t\r\n#b��Ҫ#t1112450#��\t#r"+cm.itemQuantity(1112450) + " / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==7){
                if (cm.haveItem(4001465, 1800)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1200) && cm.haveItem(4310036, 1200) && cm.haveItem(1112451, 1)) {
					cm.gainItem(4001465, -1800);
					cm.gainItem(4310030, -1200);
					cm.gainItem(4310036, -1200);
					cm.gainMeso(-120000000);
					cm.gainItem(1112451, -1);
					
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112452)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 1800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " / 1200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.2E\t\t\r\n#b��Ҫ#t1112451#��\t#r"+cm.itemQuantity(1112451)+" / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==8){
                if (cm.haveItem(4001465,2100) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1400) && cm.haveItem(4310036, 1400) && cm.haveItem(1112452, 1)) {
				    cm.gainItem(4001465, -2100);
					cm.gainItem(4310030, -1400);
					cm.gainItem(4310036, -1400);
					cm.gainMeso(-140000000);
					cm.gainItem(1112452, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112453)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 2100 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) +" / 1400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" +cm.itemQuantity(4310036)+ " /1400 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.4E\t\t\r\n#b��Ҫ#t1112452#��\t#r"+cm.itemQuantity(1112452)+" / 1 ��#k\r\n#k");
			cm.dispose();
				}
			} else if(typed==9){
                if (cm.haveItem(4001465, 2400) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1600) && cm.haveItem(4310036, 1600) && cm.haveItem(1112453, 1) && cm.haveItem(4000313, 60) && cm.haveItem(4033356, 10) && cm.getPlayer().getLevel() > 200&&cm.haveItem(4000082,20)) {
					cm.gainItem(4001465, -2400);
					cm.gainItem(4310030, -1600);
					cm.gainItem(4310036, -1600);
					cm.gainItem(4000313, -60);
					cm.gainItem(4000082, -20);
					cm.gainItem(4033356, -10);
					cm.gainMeso(-160000000);
					cm.gainItem(1112453, -1);
					
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112454)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ200��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 2400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 1600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 1600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 60 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 20 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.6E\t\t\r\n#b��Ҫ#t1112453#��\t#r" + cm.itemQuantity(1112453) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==10){
                if (cm.haveItem(4001465, 2700) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 1800) && cm.haveItem(4310036, 1800) && cm.haveItem(1112454, 1) && cm.haveItem(4000313, 120) && cm.haveItem(4033356, 10) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,40)) {
					cm.gainItem(4001465, -2700);
					cm.gainItem(4310030, -1800);
					cm.gainItem(4310036, -1800);
					cm.gainItem(4000313, -120);
					cm.gainItem(4000082, -40);
					cm.gainItem(4033356, -10);
					cm.gainMeso(-180000000);
					cm.gainItem(1112454, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112455)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 2700 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 1800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 1800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 120 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 40 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    1.8E\t\t\r\n#b��Ҫ#t1112453#��\t#r" + cm.itemQuantity(1112454) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==11){
                if (cm.haveItem(4001465, 3000) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 2000) && cm.haveItem(4310036, 2000) && cm.haveItem(1112455, 1) && cm.haveItem(4000313, 180) && cm.haveItem(4033356, 10) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,60)) {
					cm.gainItem(4001465, -3000);
					cm.gainItem(4310030, -2000);
					cm.gainItem(4310036, -2000);
					cm.gainItem(4000313, -180);
					cm.gainItem(4000082, -60);
					cm.gainItem(4033356, -10);
					cm.gainMeso(-200000000);
					cm.gainItem(1112455, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112456)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3000 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) +" / 180 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 60 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2E\t\t\r\n#b��Ҫ#t1112454#��\t#r" + cm.itemQuantity(1112455) + " / 1 ��#k#k");
			cm.dispose();
				}
			} else if(typed==12){
                if (cm.haveItem(4001465, 3300) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 2200) && cm.haveItem(4310036, 2200) && cm.haveItem(1112456, 1) && cm.haveItem(4000313, 240) && cm.haveItem(4033356, 40) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,80)) {
					cm.gainItem(4001465, -3300);
					cm.gainItem(4310030, -2200);
					cm.gainItem(4310036, -2200);
					cm.gainItem(4000313, -240);
					cm.gainItem(4000082, -80);
					cm.gainItem(4033356, -40);
					cm.gainMeso(-220000000);
					cm.gainItem(1112456, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112457)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3300 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2200 ��\r\n#b��Ҫ#t4000313#��\t\t#r" +cm.itemQuantity(4000313)+" / 240 ��\r\n#b��Ҫ#t4033356#��\t\t#r"+ cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 80 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.2E\t\t\r\n#b��Ҫ#t1112455#��\t#r" + cm.itemQuantity(1112456) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==13){
                if (cm.haveItem(4001465, 3600) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 2400) && cm.haveItem(4310036, 2400) && cm.haveItem(1112457, 1) && cm.haveItem(4000313, 300) && cm.haveItem(4033356, 10) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,100)) {
					cm.gainItem(4001465, -3600);
					cm.gainItem(4310030, -2400);
					cm.gainItem(4310036, -2400);
					cm.gainItem(4000313, -300);
					cm.gainItem(4000082, -100);
					cm.gainItem(4033356, -10);
					cm.gainMeso(-240000000);
					cm.gainItem(1112457, -1);
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112458)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3600 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2400 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 300 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 100 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.4E\t\t\r\n#b��Ҫ#t1112457#��\t#r" + cm.itemQuantity(1112457) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}
			} else if(typed==14){
                if (cm.haveItem(4001465, 3900) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 2600) && cm.haveItem(4310036, 2600) && cm.haveItem(1112458, 1) && cm.haveItem(4000313, 360) && cm.haveItem(4033356, 10) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,120)) {
					cm.gainItem(4001465, -3900);
					cm.gainItem(4310030, -2600);
					cm.gainItem(4310036, -2600);
					cm.gainItem(4000313, -360);
					cm.gainItem(4000082, -120);
					cm.gainItem(4033356, -10);
					cm.gainMeso(-260000000);
					cm.gainItem(1112458, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112459)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 3900 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 360 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 10 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 120 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.6E\t\t\r\n#b��Ҫ#t1112458#��\t#r" + cm.itemQuantity(1112458) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==15){
                if (cm.haveItem(4001465, 4200) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 2800) && cm.haveItem(4310036, 2800) && cm.haveItem(1112459, 1) && cm.haveItem(4000313, 420) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,140)) {
					cm.gainItem(4001465, -4200);
					cm.gainItem(4310030, -2800);
					cm.gainItem(4310036, -2800);
					cm.gainItem(4000313, -420);
					cm.gainItem(4000082, -140);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-280000000);
					cm.gainItem(1112459, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112460)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4200 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 2800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 2800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 420 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 140 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    2.8E\t\t\r\n#b��Ҫ#t1112459#��\t#r" + cm.itemQuantity(1112459) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==16){
                if (cm.haveItem(4001465, 4500) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3000) && cm.haveItem(4310036, 3000) && cm.haveItem(1112460, 1) && cm.haveItem(4000313, 480) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,160)) {
					cm.gainItem(4001465, -4500);
					cm.gainItem(4310030, -3000);
					cm.gainItem(4310036, -3000);
					cm.gainItem(4000313, -480);
					cm.gainItem(4000082, -160);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-300000000);
					cm.gainItem(1112460, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112461)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4500 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 480 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 160 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3E\t\t\r\n#b��Ҫ#t1112460#��\t#r" + cm.itemQuantity(1112460) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==17){
                if (cm.haveItem(4001465, 4800) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3200) && cm.haveItem(4310036, 3200) && cm.haveItem(1112461, 1) && cm.haveItem(4000313, 540) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,180)) {
					cm.gainItem(4001465, -4800);
					cm.gainItem(4310030, -3200);
					cm.gainItem(4310036, -3200);
					cm.gainItem(4000313, -540);
					cm.gainItem(4000082, -180);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-320000000);
					cm.gainItem(1112461, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112462)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 4800 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3200 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 540 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 180 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.2E\t\t\r\n#b��Ҫ#t1112461#��\t#r" + cm.itemQuantity(1112461) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==18){
                if (cm.haveItem(4001465, 5100) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3400) && cm.haveItem(4310036, 3400) && cm.haveItem(1112462, 1) && cm.haveItem(4000313, 600) && cm.haveItem(4033356, 20) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,200)) {
					cm.gainItem(4001465, -5100);
					cm.gainItem(4310030, -3400);
					cm.gainItem(4310036, -3400);
					cm.gainItem(4000313, -600);
					cm.gainItem(4000082, -200);
					cm.gainItem(4033356, -20);
					cm.gainMeso(-340000000);
					cm.gainItem(1112462, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112463)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ210��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5100 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3400 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3400 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 600 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 20 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 200 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.4E\t\t\r\n#b��Ҫ#t1112462#��\t#r" + cm.itemQuantity(1112462) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==19){
                if (cm.haveItem(4001465, 5400) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3600) && cm.haveItem(4310036, 3600) && cm.haveItem(1112463, 1) && cm.haveItem(4000313, 660) && cm.haveItem(4033356, 30) && cm.getPlayer().getLevel() >= 230&&cm.haveItem(4000082,220)) {
					cm.gainItem(4001465, -5400);
					cm.gainItem(4310030, -3600);
					cm.gainItem(4310036, -3600);
					cm.gainItem(4000313, -660);
					cm.gainItem(4000082, -220);
					cm.gainItem(4033356, -30);
					cm.gainMeso(-360000000);
					cm.gainItem(1112463, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112464)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5400 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3600 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3600 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 660 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 220 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.6E\t\t\r\n#b��Ҫ#t1112463#��\t#r" + cm.itemQuantity(1112463) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==20){
                if (cm.haveItem(4001465, 5700) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 3800) && cm.haveItem(4310036, 3800) && cm.haveItem(1112464, 1) && cm.haveItem(4000313, 720) && cm.haveItem(4033356, 120) && cm.getPlayer().getLevel() >= 230&&cm.haveItem(4000082,240)) {
					cm.gainItem(4001465, -5700);
					cm.gainItem(4310030, -3800);
					cm.gainItem(4310036, -3800);
					cm.gainItem(4000313, -720);
					cm.gainItem(4000082, -240);
					cm.gainItem(4033356, -30);
					cm.gainMeso(-380000000);
					cm.gainItem(1112464, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112465)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 5700 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 3800 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 3800 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 720 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 240 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    3.8E\t\t\r\n#b��Ҫ#t1112464#��\t#r" + cm.itemQuantity(1112464) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==21){
                if (cm.haveItem(4001465, 6000) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 4000) && cm.haveItem(4310036, 4000) && cm.haveItem(1112464, 1) && cm.haveItem(4000313, 780) && cm.haveItem(4033356, 130) && cm.getPlayer().getLevel() >= 230&&cm.haveItem(4000082,260)) {
					cm.gainItem(4001465, -6000);
					cm.gainItem(4310030, -4000);
					cm.gainItem(4310036, -4000);
					cm.gainItem(4000313, -780);
					cm.gainItem(4000082, -260);
					cm.gainItem(4033356, -30);
					cm.gainMeso(-400000000);
					cm.gainItem(1112465, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112466)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ230��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6000 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 4000 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 4000 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 780 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 260 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4E\t\t\r\n#b��Ҫ#t1112465#��\t#r" + cm.itemQuantity(1112465) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();
				}

			} else if(typed==22){
                if (cm.haveItem(4001465, 6300) && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 4200) && cm.haveItem(4310036, 4200) && cm.haveItem(1112466, 1) && cm.haveItem(4000313, 840) && cm.haveItem(4033356, 140) && cm.getPlayer().getLevel() >= 210&&cm.haveItem(4000082,280)) {
					cm.gainItem(4001465, -6300);
					cm.gainItem(4310030, -4200);
					cm.gainItem(4310036, -4200);
					cm.gainItem(4000313, -840);
					cm.gainItem(4000082, -280);
					cm.gainItem(4033356, -30);
					cm.gainMeso(-420000000);
					cm.gainItem(1112466, -1);

			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112467)).copy(); // ����һ��Equip��                    
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
			cm.sendOk("����ʧ�ܣ�  - #e#r��ָ��Ҫ���ڱ���������\r\n#g�ȼ���Ҫ�ﵽ240��\r\n#b��Ҫ#t4001465#��\t\t#r " + cm.itemQuantity(4001465) + " / 6300 ��\r\n#b��Ҫ#t4310030#��\t\t#r" + cm.itemQuantity(4310030) + " / 4200 ��\r\n#b��Ҫ#t4310036#��\t\t#r" + cm.itemQuantity(4310036) + " / 4200 ��\r\n#b��Ҫ#t4000313#��\t\t#r" + cm.itemQuantity(4000313) + " / 840 ��\r\n#b��Ҫ#t4033356#��\t\t#r" + cm.itemQuantity(4033356) + " / 30 ��\r\n#b��Ҫ#t4000082#��\t\t#r" + cm.itemQuantity(4000082) + " / 280 ��\r\n#b��Ҫ��Ϸ�ң�\t\t #r    4.2E\t\t\r\n#b��Ҫ#t1112466#��\t#r" + cm.itemQuantity(1112466) + " / 1 ��#k\r\n\r\n#k");
			cm.dispose();




				}

				}
           }
      }
  // }
// }