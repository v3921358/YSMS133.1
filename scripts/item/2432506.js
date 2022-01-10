var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa1 ="#fEffect/ItemEff/1048000/0/0#";//苹果红心
var aa2 ="#fEffect/ItemEff/1004139/effect/jump/0#";//粉图心
var aa5 ="#fEtc/EmotionEffect/oops/0#";//水滴效果
var aa8 ="#fEffect/ItemEff/1102420/effect/ladder/0#";//多星星效果
var aa9 ="#fEffect/ItemEff/1102491/effect/proneStab/0#";// 太阳效果
var aa0 ="#fEffect/CharacterEff/1112904/0/1#";//彩色心效果
var aa11 ="#fEffect/CharacterEff/1112904/2/0#";//彩色星星效果
var aa12 ="#fEffect/CharacterEff/1112946/1/1#";//钻石效果.
var aa13 ="#fEffect/CharacterEff/1112946/5/0#";//钻石效果
var aa14 ="#fEffect/CharacterEff/1082565/2/0#";//兔子效果

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
			var selStr = "  "+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+"\r\n";
			//selStr += "#d请选择想要的职业暴君靴子装备：#n#k\r\n";
			selStr +="#b(PS；请选择自身靴子,只可使用一次,选后该道具会消失。)\r\n";
			selStr +="\t#L1##r"+aaa+" 选择战士#z1072743##i1072743##l\r\n"; 
			selStr +="\t#L2#"+aaa+" 选择法师#z1072744##i1072744##l\r\n";
			selStr +="\t#L3#"+aaa+" 选择弓箭手的#z1072745##i1072745##l\r\n";
			selStr +="\t#L4#"+aaa+" 选择飞侠的#z1072746##i1072746##l\r\n";
			selStr +="\t#L5#"+aaa+" 选择海盗的#z1072747##i1072747##l\r\n";
			selStr +=" ";
			im.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d您确定选择战士 #r#z1072743# #d吗?#n\r\n\r\n- #e#r提示：#n#b一旦做出选择后是不能更改了。");
			} else if (selection == 2) {
				typed=2;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d您确定选择魔法师 #r#z1072744# #d吗?#n\r\n\r\n- #e#r提示：#n#b一旦做出选择后是不能更改了。");
			} else if (selection == 3) {
				typed=3;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d您确定选择弓箭手 #r#z1072745# #d吗?#n\r\n\r\n- #e#r提示：#n#b一旦做出选择后是不能更改了。");
			} else if (selection == 4) {
				typed=4;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d您确定选择飞侠 #r#z1072746# #d吗?#n\r\n\r\n- #e#r提示：#n#b一旦做出选择后是不能更改了。");
			} else if (selection == 5) {
				typed=5;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d您确定选择海盗 #r#z1072747# #d吗?#n\r\n\r\n- #e#r提示：#n#b一旦做出选择后是不能更改了。");
			}
		} else if (status == 2) {
			if(typed==1){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072743, 1);
				im.sendOk("#b恭喜您获得 #r#z1072743##b 一件.");
				im.worldSpouseMessage(0x15,  "『暴君靴子使用券』 : [" + im.getChar().getName() + "] 获得了一件 暴君西亚戴斯靴.");
				im.dispose();
				} else {
				im.sendOk("背包空间不足");
				im.dispose();
				}
			} else if(typed==2){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072744, 1);
				im.sendOk("#b恭喜您获得 #r#z1072744##b 一件.");
				im.worldSpouseMessage(0x15,  "『暴君靴子使用券』 : [" + im.getChar().getName() + "] 获得了一件 暴君赫尔梅斯靴.");
				im.dispose();
				} else {
				im.sendOk("背包空间不足");
				im.dispose();
				}
			} else if(typed==3){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072745, 1);
				im.sendOk("#b恭喜您获得 #r#z1072745##b 一件.");
				im.worldSpouseMessage(0x15,  "『暴君靴子使用券』 : [" + im.getChar().getName() + "] 获得了一件 暴君凯伦靴.");
				im.dispose();
				} else {
				im.sendOk("背包空间不足");
				im.dispose();
				}
			} else if(typed==4){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072746, 1);
				im.sendOk("#b恭喜您获得 #r#z1072746##b 一件.");
				im.worldSpouseMessage(0x15,  "『暴君靴子使用券』 : [" + im.getChar().getName() + "] 获得了一件 暴君利卡昂靴.");
				im.dispose();
				} else {
				im.sendOk("背包空间不足");
				im.dispose();
				}
			} else if(typed==5){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072747, 1);
				im.sendOk("#b恭喜您获得 #r#z1072747##b 一件.");
				im.worldSpouseMessage(0x15,  "『暴君靴子使用券』 : [" + im.getChar().getName() + "] 获得了一件 暴君阿尔泰靴.");
				im.dispose();
				} else {
				im.sendOk("背包空间不足");
				im.dispose();
				}
			}
      }
   }
 }