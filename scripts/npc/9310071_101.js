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
                        var selStr = "#d把#r#e老公老婆戒指#k#d取下放背包，请选择想要升级的装备：#n#k\r\n";
                        //selStr +="\r\n#L1##b"+aaa+" 晋级到#r#e#z1142310##d#n[详情点击查看]#l#k\r\n";
			//selStr +="#L1##b"+aaa+" 传送到#r #z4001465##b 专用地图#l#k\r\n";
			selStr +="#L100##b"+aaa+" 领初始#r#z1112446# #b开启晋级之路#l#k\r\n";
			selStr +="#L2##b"+aaa+" 晋级到#r#e#z1112447##d#n[全属性+5]#l#k\r\n";
			selStr +="#L3##b"+aaa+" 晋级到#r#e#z1112448##d#n[全属性+10]#l#k\r\n";
			selStr +="#L4##b"+aaa+" 晋级到#r#e#z1112449##d#n[全属性+15]#l#k\r\n";
			selStr +="#L5##b"+aaa+" 晋级到#r#e#z1112450##d#n[全属性+20]#l#k\r\n";
			selStr +="#L6##b"+aaa+" 晋级到#r#e#z1112451##d#n[全属性+25]#l#k\r\n";
			selStr +="#L7##b"+aaa+" 晋级到#r#e#z1112452##d#n[全属性+30]#l#k\r\n";
			selStr +="#L8##b"+aaa+" 晋级到#r#e#z1112453##d#n[全属性+35]#l#k\r\n";
			//selStr +="#r#e-以下4个戒指能够获得#k每日特权#n\r\n";
			selStr +="#L9##b"+aaa+" 晋级到#r#e#z1112454##d#n[全属性+40]#l#k\r\n";
			selStr +="#L10##b"+aaa+" 晋级到#r#e#z1112455##d#n[全属性+45]#l#k\r\n";
			selStr +="#L11##b"+aaa+" 晋级到#r#e#z1112456##d#n[全属性+50]#l#k\r\n";
			selStr +="#L12##b"+aaa+" 晋级到#r#e#z1112457##d#n[全属性+55#l#k\r\n";
			selStr +="#L13##b"+aaa+" 晋级到#r#e#z1112458##d#n[全属性+60]#l#k\r\n";
			selStr +="#L14##b"+aaa+" 晋级到#r#e#z1112459##d#n[全属性+65]#l#k\r\n";
			selStr +="#L15##b"+aaa+" 晋级到#r#e#z1112460##d#n[全属性+70]#l#k\r\n";
			selStr +="#L16##b"+aaa+" 晋级到#r#e#z1112461##d#n[全属性+75]#l#k\r\n";
			selStr +="#L17##b"+aaa+" 晋级到#r#e#z1112462##d#n[全属性+80]#l#k\r\n";
			selStr +="#L18##b"+aaa+" 晋级到#r#e#z1112463##d#n[全属性+85]#l#k\r\n";
			selStr +="#L19##b"+aaa+" 晋级到#r#e#z1112464##d#n[全属性+90]#l#k\r\n";
			selStr +="#L20##b"+aaa+" 晋级到#r#e#z1112465##d#n[全属性+95]#l#k\r\n";
			selStr +="#L21##b"+aaa+" 晋级到#r#e#z1112466##d#n[全属性+100]#l#k\r\n";
			//下面还有30个老公老婆戒指，暂未添加

                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("-你确定要传送到爱心宝石#i4001465#专用地图吗？\r\n\r\n- #e#d管理提示：#n#b点是传送。点否返回上一页.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 300 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036)   + " / 200 个\r\n#b需要游戏币：\t\t #r    2000W\t\t\r\n  #b需要#t1112446#：\t#r" + cm.itemQuantity(1112446) + " /  1 个#k\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 3) {                                                                                                                                                                                                                                                                                                         
				typed=3;                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 600 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 400 个\r\n#b需要游戏币：\t\t #r    4000W\t\t\r\n#b需要#t1112447#：\t#r"+ cm.itemQuantity(1112447) + " / 1 个#k\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 4) {                                                                                                                                                                                                                                                                                                          
				typed=4;                                                                                                                                                                                                                                                                                                                                      
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 900 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 600 个\r\n#b需要游戏币：\t\t #r    6000W\t\t\r\n#b需要#t1112448#：\t#r"+ cm.itemQuantity(1112448) + " / 1 个#k\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");	
                        } else if (selection == 5) {                                                                                                                                                                                                                                                                                                           
				typed=5;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 1200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 800 个\r\n#b需要游戏币：\t\t #r    8000W\t\t\r\n#b需要#t1112449#：\t#r"+ cm.itemQuantity(1112449) + " / 1 个#k\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 6) {                                                                                                                                                                                                                                                                                                            
				typed=6;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 1500  个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) +" / 1000 个\r\n#b需要#t4310036#：\t\t#r" +cm.itemQuantity(4310036)+" / 1000 个\r\n#b需要游戏币：\t\t #r   1E\t\t\r\n#b需要#t1112450#：\t#r"+cm.itemQuantity(1112450) + " / 1 个#k\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 7) {                                                                                                                                                                                                                                                                                                            
				typed=7;                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 1800 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) +" / 1200 个\r\n#b需要#t4310036#：\t\t#r" +cm.itemQuantity(4310036)+ " / 1200 个\r\n#b需要游戏币：\t\t #r    1.2E\t\t\r\n#b需要#t1112451#：\t#r"+cm.itemQuantity(1112451)+" / 1 个#k\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 8) {                                                                                                                                                                                                                                                                                                           
				typed=8;                                                                                                                                                                                                                                                                                                                                       
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 2100 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) +" / 1400 个\r\n#b需要#t4310036#：\t\t#r" +cm.itemQuantity(4310036)+ " / 1400 个\r\n#b需要游戏币：\t\t #r    1.4E\t\t\r\n#b需要#t1112452#：\t#r"+cm.itemQuantity(1112452)+" / 1 个#k\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 9) {
				typed=9;
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 2400 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 1600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 60 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 20 个\r\n#b需要游戏币：\t\t #r    1.6E\t\t\r\n#b需要#t1112453#：\t#r" + cm.itemQuantity(1112453) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 10) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=10;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 2700 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 1800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 120 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 40 个\r\n#b需要游戏币：\t\t #r    1.8E\t\t\r\n#b需要#t1112454#：\t#r" + cm.itemQuantity(1112454) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 11) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=11;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3000 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 180 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 60 个\r\n#b需要游戏币：\t\t #r    2E\t\t\r\n#b需要#t1112455#：\t#r" + cm.itemQuantity(1112455) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 12) {                                                                                                                                                                                                                                                                                                                                                                                         
				typed=12;                                                                                                                                                                                                                                                                                                                                                                                                                     
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3300 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2200 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 240 个\r\n#b需要#t4033356#：\t\t#r"+ cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 80 个\r\n#b需要游戏币：\t\t #r    2.2E\t\t\r\n#b需要#t1112456#：\t#r" + cm.itemQuantity(1112456) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
                        } else if (selection == 13) {                                                                                                                                                                                                                                                                                                                                                                                            
				typed=13;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3600 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2400 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 300 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 100 个\r\n#b需要游戏币：\t\t #r    2.4E\t\t\r\n#b需要#t1112457#：\t#r" + cm.itemQuantity(1112457) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 14) {  

                                 typed=14;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3900 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 360 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 120 个\r\n#b需要游戏币：\t\t #r    2.6E\t\t\r\n#b需要#t1112458#：\t#r" + cm.itemQuantity(1112458) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 15) {  

                                 typed=15;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 420 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 140 个\r\n#b需要游戏币：\t\t #r    2.8E\t\t\r\n#b需要#t1112459#：\t#r" + cm.itemQuantity(1112459) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 16) {  

                                 typed=16;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 4500 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 480 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 160 个\r\n#b需要游戏币：\t\t #r    3E\t\t\r\n#b需要#t1112460#：\t#r" + cm.itemQuantity(1112460) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 17) {  

                                 typed=17;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 4800 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3200 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 540 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 180 个\r\n#b需要游戏币：\t\t #r    3.2E\t\t\r\n#b需要#t1112461#：\t#r" + cm.itemQuantity(1112461) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 18) {  

                                 typed=18;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 5100 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3400 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 600 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 200 个\r\n#b需要游戏币：\t\t #r   3.4E\t\t\r\n#b需要#t1112462#：\t#r" + cm.itemQuantity(1112462) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 19) {  

                                 typed=19;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 5400 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 660 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 220 个\r\n#b需要游戏币：\t\t #r    3.6E\t\t\r\n#b需要#t1112463#：\t#r" + cm.itemQuantity(1112463) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 20) {  

                                 typed=20;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 5700 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 720 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 240 个\r\n#b需要游戏币：\t\t #r    3.8E\t\t\r\n#b需要#t1112464#：\t#r" + cm.itemQuantity(1112464) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 21) {  

                                 typed=21;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 6000 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 4000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 4000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 780 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 260 个\r\n#b需要游戏币：\t\t #r    4E\t\t\r\n#b需要#t1112465#：\t#r" + cm.itemQuantity(1112465) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 22) {  

                                 typed=22;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 6300 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 4200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 4200 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 840 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 280 个\r\n#b需要游戏币：\t\t #r    4.2E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112466) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 23) {  

                                 typed=23;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 6600 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 4400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 4400 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 900 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 300 个\r\n#b需要游戏币：\t\t #r    4.4E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112467) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 24) {  

                                 typed=24;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 6900 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 4600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 4600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 960 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 320 个\r\n#b需要游戏币：\t\t #r    4.6E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112468) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 25) {  

                                 typed=25;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 7200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 4800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 4800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 1020 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 340 个\r\n#b需要游戏币：\t\t #r    4.8E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112469) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 26) {  

                                 typed=26;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 7500 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 5000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 1080 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 360 个\r\n#b需要游戏币：\t\t #r    5E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112470) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 27) {  

                                 typed=27;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 7800 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 5200 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 1140 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 380 个\r\n#b需要游戏币：\t\t #r    5.2E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112471) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 28) {  

                                 typed=28;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 8100 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 5400 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 1200 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 400 个\r\n#b需要游戏币：\t\t #r    5.4E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112472) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 29) {  

                                 typed=29;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 8400 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 5600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 1260 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 420 个\r\n#b需要游戏币：\t\t #r    5.6E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112473) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");

                        } else if (selection == 30) {  

                                 typed=30;                                                                                                                                                                                                                                                                                                                                                                                                                        
				cm.sendYesNo("- #e#r戒指需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 8700 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 5800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 5800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 1320 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 440 个\r\n#b需要游戏币：\t\t #r    5.8E\t\t\r\n#b需要#t1142317#：\t#r" + cm.itemQuantity(1112474) + " / 1 个#k\r\n\r\n- #e#d管理提示：#n#b点是进行晋级。点否返回上一页.#k");
		 } else	if (selection == 100) {
				typed=100;

				cm.sendYesNo("-#b你确定要领取初始#r#z1112246##b开启晋级之路吗？\r\n\r\n- #e#d管理提示：#n#b点是传送。点否返回上一页.#k");

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
		if (cm.getBossLog("初阶老公老婆",1) == 0 && cm.getSpace(1) > 1) {
	    cm.gainItem(1112446, 1);
	    cm.setBossLog("初阶老公老婆",1);
	    cm.setBossLog("初阶老公老婆领取",1);
		cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 领取初阶老公老婆戒指，成功开启了晋级之路，大家祝福他（她）吧！", 5120002);
	    cm.worldSpouseMessage(0x20, "『戒指晋级』 : 玩家 " + cm.getChar().getName() + " 领取了初阶段老公老婆戒指开启了晋级之路。");
	    cm.sendOk(" #b成功领取了初阶段老公老婆戒指一个。请妥善保管每次晋级的戒指。下次再无法从我这里领取初级戒指了。");
            cm.dispose();
	} else {
	    cm.sendOk("#b您已经领取过。或者背包已满。#k\r\n\r\n\r\n- #d#e戒指晋级说明#k#n\r\n\r\n#b1). 请点击领取老公老婆戒指领取初阶戒指。\r\n#r2). 请把要晋级的老公老婆戒指放在背包第一格。");
	    cm.dispose();
	}
				

			} else if(typed==2){
                if (cm.haveItem(4001465, 300)  && cm.getSpace(1) >= 1 && cm.haveItem(4310030, 200) && cm.haveItem(4310036, 200) && cm.haveItem(1112446, 1)) {
					cm.gainItem(4001465, -300);//爱心宝石
					cm.gainItem(4310030, -200);//运动会币
					cm.gainItem(4310036, -200);//征服者币
					cm.gainItem(1112446, -1);//需要扣除的戒指
					cm.gainMeso(-20000000);//需要扣除金币
			var ii = cm.getItemInfo();				
			var toDrop = ii.randomizeStats(ii.getEquipById(1112447)).copy(); // 晋级成功给予新的戒指                    
            toDrop.setStr(5); //装备力量
			toDrop.setDex(5); //装备敏捷
			toDrop.setInt(5); //装备智力
			toDrop.setLuk(5); //装备运气
			toDrop.setMatk(5); //物理攻击
			toDrop.setWatk(5); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[2级恩爱戒指]全属性+5");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 300 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 200 个\r\n#b需要游戏币：\t\t #r    2000W\t\t\r\n#b需要#t1112446#：\t#r" + cm.itemQuantity(1112446) + " / 1 个#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112448)).copy(); // 生成一个Equip类                    
            toDrop.setStr(10); //装备力量
			toDrop.setDex(10); //装备敏捷
			toDrop.setInt(10); //装备智力
			toDrop.setLuk(10); //装备运气
			toDrop.setMatk(10); //物理攻击
			toDrop.setWatk(10); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[3级恩爱戒指]全属性+10");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 600 个r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 400 个\r\n#b需要游戏币：\t\t #r    4000W\t\t\r\n#b需要#t1112447#：\t#r" + cm.itemQuantity(1112447) + " / 1 个#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112449)).copy(); // 生成一个Equip类                    
            toDrop.setStr(15); //装备力量
			toDrop.setDex(15); //装备敏捷
			toDrop.setInt(15); //装备智力
			toDrop.setLuk(15); //装备运气
			toDrop.setMatk(15); //物理攻击
			toDrop.setWatk(15); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[4级恩爱戒指]全属性+15");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败： - #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 900 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 600 个\r\n#b需要游戏币：\t\t #r    6000W\t\t\r\n#b需要#t1112448#：\t#r"+ cm.itemQuantity(1112448) + " / 1 个#k\r\n");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112450)).copy(); // 生成一个Equip类                    
            toDrop.setStr(20); //装备力量
			toDrop.setDex(20); //装备敏捷
			toDrop.setInt(20); //装备智力
			toDrop.setLuk(20); //装备运气
			toDrop.setMatk(20); //物理攻击
			toDrop.setWatk(20); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[5级恩爱戒指]全属性+20");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 1200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 800 个\r\n#b需要游戏币：\t\t #r    8000W\t\t\r\n#b需要#t1112449#：\t#r"+ cm.itemQuantity(1112449) + " / 1 个#k\r\n");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112451)).copy(); // 生成一个Equip类                    
            toDrop.setStr(25); //装备力量
			toDrop.setDex(25); //装备敏捷
			toDrop.setInt(25); //装备智力
			toDrop.setLuk(25); //装备运气
			toDrop.setMatk(25); //物理攻击
			toDrop.setWatk(25); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[6级恩爱]全属性+25");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 1500  个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) +" / 1000 个\r\n#b需要#t4310036#：\t\t#r" +cm.itemQuantity(4310036)+" / 1000 个\r\n#b需要游戏币：\t\t #r    1E\t\t\r\n#b需要#t1112450#：\t#r"+cm.itemQuantity(1112450) + " / 1 个#k\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112452)).copy(); // 生成一个Equip类                    
            toDrop.setStr(30); //装备力量
			toDrop.setDex(30); //装备敏捷
			toDrop.setInt(30); //装备智力
			toDrop.setLuk(30); //装备运气
			toDrop.setMatk(30); //物理攻击
			toDrop.setWatk(30); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[7级恩爱戒]全属性+30");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 1800 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) +" / 1200 个\r\n#b需要#t4310036#：\t\t#r" +cm.itemQuantity(4310036)+ " / 1200 个\r\n#b需要游戏币：\t\t #r    1.2E\t\t\r\n#b需要#t1112451#：\t#r"+cm.itemQuantity(1112451)+" / 1 个#k\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112453)).copy(); // 生成一个Equip类                    
            toDrop.setStr(35); //装备力量
			toDrop.setDex(35); //装备敏捷
			toDrop.setInt(35); //装备智力
			toDrop.setLuk(35); //装备运气
			toDrop.setMatk(35); //物理攻击
			toDrop.setWatk(35); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[8级恩爱戒指]全属性+35");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r戒指需要放在背包里升级\r\n\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 2100 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) +" / 1400 个\r\n#b需要#t4310036#：\t\t#r" +cm.itemQuantity(4310036)+ " /1400 个\r\n#b需要游戏币：\t\t #r    1.4E\t\t\r\n#b需要#t1112452#：\t#r"+cm.itemQuantity(1112452)+" / 1 个#k\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112454)).copy(); // 生成一个Equip类                    
            toDrop.setStr(40); //装备力量
			toDrop.setDex(40); //装备敏捷
			toDrop.setInt(40); //装备智力
			toDrop.setLuk(40); //装备运气
			toDrop.setMatk(40); //物理攻击
			toDrop.setWatk(40); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[9级恩爱戒指]全属性+40★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[9级恩爱戒指]全属性+40★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  #e#r戒指需要放在背包里升级\r\n#g等级需要达到200级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 2400 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 1600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 60 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 20 个\r\n#b需要游戏币：\t\t #r    1.6E\t\t\r\n#b需要#t1112453#：\t#r" + cm.itemQuantity(1112453) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112455)).copy(); // 生成一个Equip类                    
            toDrop.setStr(45); //装备力量
			toDrop.setDex(45); //装备敏捷
			toDrop.setInt(45); //装备智力
			toDrop.setLuk(45); //装备运气
			toDrop.setMatk(45); //物理攻击
			toDrop.setWatk(45); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[10级恩爱戒指]全属性+45★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[10级恩爱戒指]全属性+45★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[10级恩爱戒指]全属性+45★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 2700 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 1800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 1800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) +" / 120 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 40 个\r\n#b需要游戏币：\t\t #r    1.8E\t\t\r\n#b需要#t1112453#：\t#r" + cm.itemQuantity(1112454) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112456)).copy(); // 生成一个Equip类                    
            toDrop.setStr(50); //装备力量
			toDrop.setDex(50); //装备敏捷
			toDrop.setInt(50); //装备智力
			toDrop.setLuk(50); //装备运气
			toDrop.setMatk(50); //物理攻击
			toDrop.setWatk(50); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[11级恩爱戒指]全属性+50★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[11级恩爱戒指]全属性+50★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[11级恩爱戒指]全属性+50★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3000 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) +" / 180 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 60 个\r\n#b需要游戏币：\t\t #r    2E\t\t\r\n#b需要#t1112454#：\t#r" + cm.itemQuantity(1112455) + " / 1 个#k#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112457)).copy(); // 生成一个Equip类                    
            toDrop.setStr(55); //装备力量
			toDrop.setDex(55); //装备敏捷
			toDrop.setInt(55); //装备智力
			toDrop.setLuk(55); //装备运气
			toDrop.setMatk(55); //物理攻击
			toDrop.setWatk(55); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[12级恩爱戒指]全属性+55★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[12级恩爱戒指]全属性+55★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[12级恩爱戒指]全属性+55★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3300 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2200 个\r\n#b需要#t4000313#：\t\t#r" +cm.itemQuantity(4000313)+" / 240 个\r\n#b需要#t4033356#：\t\t#r"+ cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 80 个\r\n#b需要游戏币：\t\t #r    2.2E\t\t\r\n#b需要#t1112455#：\t#r" + cm.itemQuantity(1112456) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112458)).copy(); // 生成一个Equip类                    
            toDrop.setStr(60); //装备力量
			toDrop.setDex(60); //装备敏捷
			toDrop.setInt(60); //装备智力
			toDrop.setLuk(60); //装备运气
			toDrop.setMatk(60); //物理攻击
			toDrop.setWatk(60); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			//cm.gainNX(1, 2);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[13级恩爱戒指]全属性+60★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[13级恩爱戒指]全属性+60★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[13级恩爱戒指]全属性+60★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3600 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2400 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 300 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 100 个\r\n#b需要游戏币：\t\t #r    2.4E\t\t\r\n#b需要#t1112457#：\t#r" + cm.itemQuantity(1112457) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112459)).copy(); // 生成一个Equip类                    
            toDrop.setStr(65); //装备力量
			toDrop.setDex(65); //装备敏捷
			toDrop.setInt(65); //装备智力
			toDrop.setLuk(65); //装备运气
			toDrop.setMatk(65); //物理攻击
			toDrop.setWatk(65); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[14级恩爱戒指]全属性+65★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[14级恩爱戒指]全属性+65★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[14级恩爱戒指]全属性+65★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 3900 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 360 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 10 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 120 个\r\n#b需要游戏币：\t\t #r    2.6E\t\t\r\n#b需要#t1112458#：\t#r" + cm.itemQuantity(1112458) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112460)).copy(); // 生成一个Equip类                    
            toDrop.setStr(70); //装备力量
			toDrop.setDex(70); //装备敏捷
			toDrop.setInt(70); //装备智力
			toDrop.setLuk(70); //装备运气
			toDrop.setMatk(70); //物理攻击
			toDrop.setWatk(70); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[15级恩爱戒指]全属性+70★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[15级恩爱戒指]全属性+70★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[15级恩爱戒指]全属性+70★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 4200 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 2800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 2800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 420 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 140 个\r\n#b需要游戏币：\t\t #r    2.8E\t\t\r\n#b需要#t1112459#：\t#r" + cm.itemQuantity(1112459) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112461)).copy(); // 生成一个Equip类                    
            toDrop.setStr(75); //装备力量
			toDrop.setDex(75); //装备敏捷
			toDrop.setInt(75); //装备智力
			toDrop.setLuk(75); //装备运气
			toDrop.setMatk(75); //物理攻击
			toDrop.setWatk(75); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[16级恩爱戒指]全属性+75★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[16级恩爱戒指]全属性+75★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[16级恩爱戒指]全属性+75★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 4500 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 480 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 160 个\r\n#b需要游戏币：\t\t #r    3E\t\t\r\n#b需要#t1112460#：\t#r" + cm.itemQuantity(1112460) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112462)).copy(); // 生成一个Equip类                    
            toDrop.setStr(80); //装备力量
			toDrop.setDex(80); //装备敏捷
			toDrop.setInt(80); //装备智力
			toDrop.setLuk(80); //装备运气
			toDrop.setMatk(80); //物理攻击
			toDrop.setWatk(80); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[17级恩爱戒指]全属性+80★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[17级恩爱戒指]全属性+80★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[17级恩爱戒指]全属性+80★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 4800 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3200 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 540 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 180 个\r\n#b需要游戏币：\t\t #r    3.2E\t\t\r\n#b需要#t1112461#：\t#r" + cm.itemQuantity(1112461) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112463)).copy(); // 生成一个Equip类                    
            toDrop.setStr(85); //装备力量
			toDrop.setDex(85); //装备敏捷
			toDrop.setInt(85); //装备智力
			toDrop.setLuk(85); //装备运气
			toDrop.setMatk(85); //物理攻击
			toDrop.setWatk(85); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[18级恩爱戒指]全属性+85★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[18级恩爱戒指]全属性+85★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[18级恩爱戒指]全属性+85★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到210级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 5100 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3400 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3400 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 600 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 20 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 200 个\r\n#b需要游戏币：\t\t #r    3.4E\t\t\r\n#b需要#t1112462#：\t#r" + cm.itemQuantity(1112462) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112464)).copy(); // 生成一个Equip类                    
            toDrop.setStr(90); //装备力量
			toDrop.setDex(90); //装备敏捷
			toDrop.setInt(90); //装备智力
			toDrop.setLuk(90); //装备运气
			toDrop.setMatk(90); //物理攻击
			toDrop.setWatk(90); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[19级恩爱戒指]全属性+90★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[19级恩爱戒指]全属性+90★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[19级恩爱戒指]全属性+90★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 5400 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3600 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3600 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 660 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 220 个\r\n#b需要游戏币：\t\t #r    3.6E\t\t\r\n#b需要#t1112463#：\t#r" + cm.itemQuantity(1112463) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112465)).copy(); // 生成一个Equip类                    
            toDrop.setStr(95); //装备力量
			toDrop.setDex(95); //装备敏捷
			toDrop.setInt(95); //装备智力
			toDrop.setLuk(95); //装备运气
			toDrop.setMatk(95); //物理攻击
			toDrop.setWatk(95); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[20级恩爱戒指]全属性+95★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[20级恩爱戒指]全属性+95★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[20级恩爱戒指]全属性+95★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 5700 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 3800 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 3800 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 720 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 240 个\r\n#b需要游戏币：\t\t #r    3.8E\t\t\r\n#b需要#t1112464#：\t#r" + cm.itemQuantity(1112464) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112466)).copy(); // 生成一个Equip类                    
            toDrop.setStr(100); //装备力量
			toDrop.setDex(100); //装备敏捷
			toDrop.setInt(100); //装备智力
			toDrop.setLuk(100); //装备运气
			toDrop.setMatk(100); //物理攻击
			toDrop.setWatk(100); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[21级恩爱戒指]全属性+100★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[21级恩爱戒指]全属性+100★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[21级恩爱戒指]全属性+100★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到230级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 6000 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 4000 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 4000 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 780 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 260 个\r\n#b需要游戏币：\t\t #r    4E\t\t\r\n#b需要#t1112465#：\t#r" + cm.itemQuantity(1112465) + " / 1 个#k\r\n\r\n#k");
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
			var toDrop = ii.randomizeStats(ii.getEquipById(1112467)).copy(); // 生成一个Equip类                    
            toDrop.setStr(105); //装备力量
			toDrop.setDex(105); //装备敏捷
			toDrop.setInt(105); //装备智力
			toDrop.setLuk(105); //装备运气
			toDrop.setMatk(105); //物理攻击
			toDrop.setWatk(105); //魔法攻击 
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.sendOk("恭喜您晋级成功.");
			cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 秀恩爱成功，大家祝福他（她）吧！", 5120002);
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[22级恩爱戒指]全属性+105★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[22级恩爱戒指]全属性+105★★★");
			cm.worldSpouseMessage(0x20, "『秀恩爱』 : 恭喜玩家 " + cm.getChar().getName() + " 经过不断的努力终于成功晋级为[22级恩爱戒指]全属性+105★★★");
			cm.dispose();
                } else {
			cm.sendOk("晋级失败：  - #e#r戒指需要放在背包里升级\r\n#g等级需要达到240级\r\n#b需要#t4001465#：\t\t#r " + cm.itemQuantity(4001465) + " / 6300 个\r\n#b需要#t4310030#：\t\t#r" + cm.itemQuantity(4310030) + " / 4200 个\r\n#b需要#t4310036#：\t\t#r" + cm.itemQuantity(4310036) + " / 4200 个\r\n#b需要#t4000313#：\t\t#r" + cm.itemQuantity(4000313) + " / 840 个\r\n#b需要#t4033356#：\t\t#r" + cm.itemQuantity(4033356) + " / 30 个\r\n#b需要#t4000082#：\t\t#r" + cm.itemQuantity(4000082) + " / 280 个\r\n#b需要游戏币：\t\t #r    4.2E\t\t\r\n#b需要#t1112466#：\t#r" + cm.itemQuantity(1112466) + " / 1 个#k\r\n\r\n#k");
			cm.dispose();




				}

				}
           }
      }
  // }
// }