var vv = "#fUI/UIWindow2.img/ValuePacktton/complete/0#";//领取完成
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa9 ="#fEffect/ItemEff/1102491/effect/proneStab/0#";

var status = 0;
var typed=0;

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
	cm.sendSimpleS("#r[GM提示您]：#b您当前的#z4310196#为： #r" + cm.getItemQuantity(4310196) + " #b个\r\n\r\n#e#r#z4310196##n#d 获得方式除了在线时间奖励、以及参加活动获得以外并无其他渠道获得。因此可兑换一些稀有道具。\r\n\r\n#b#L3#"+aa+" 兑换#z2432069##r (每人限购 "+(3-cm.getBossLog("随机暴君", 1))+" 次)#l#k\r\n#b#L4#"+aa+" 兑换#z2432507##r (每人限购 "+(1-cm.getBossLog("暴君披风卷", 1))+" 次)#l#k\r\n#b#L5#"+aa+" 兑换#z2432506##r (每人限购 "+(1-cm.getBossLog("暴君鞋子卷", 1))+" 次)#l#k\r\n#b#L6#"+aa+" 兑换#z2432508##r (每人限购 "+(1-cm.getBossLog("暴君腰带卷", 1))+" 次)#l#k\r\n#d#e#L7#"+aa+" 兑换各类稀有椅子、道具、卷轴等#l#k#n\r\n" ,2);//#b#L2#"+aa+" 兑换#z2431938##r   (每人限购 "+(1-cm.getBossLog("限购150", 1))+" 次)#l\r\n//\r\n#b#L1#"+aa+" 购买#z4310196#  (现金点比率1：1)#l#k
	} else if (status == 1) {
if (selection == 1) {
	typed=1;
	cm.sendYesNo("暂未开放购买。");
} else if (selection == 2) {
	typed=2;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b兑换 #r#z2431938##b 需要 #r#z4310196# x 50 #b个\r\n#b当前您已经拥有：#r" + cm.getItemQuantity(4310196) + " #b个  您确定要兑换吗？#k\r\n\r\n- #e友情提示：#n#b打开后获得制作150武器全部材料。");
} else if (selection == 3) {
	typed=3;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b兑换 #r#z2432069##b 需要 #r#z4310196# x 300 #b个\r\n#b当前您已经拥有：#r" + cm.getItemQuantity(4310196) + " #b个  您确定要兑换吗？#k\r\n\r\n- #e友情提示：#n#b打开后随即获得一件暴君装备。");
} else if (selection == 4) {
	typed=4;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b兑换 #r#z2432507##b 需要 #r#z4310196# x 400 #b个\r\n#b当前您已经拥有：#r" + cm.getItemQuantity(4310196) + " #b个  您确定要兑换吗？#k\r\n\r\n- #e友情提示：#n#b打开后获得一件自身暴君披风装备。");
} else if (selection == 5) {
	typed=5;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b兑换 #r#z2432506##b 需要 #r#z4310196# x 400 #b个\r\n#b当前您已经拥有：#r" + cm.getItemQuantity(4310196) + " #b个  您确定要兑换吗？#k\r\n\r\n- #e友情提示：#n#b打开后获得一件自身暴君鞋子装备。");
} else if (selection == 6) {
	typed=6;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n#b兑换 #r#z2432508##b 需要 #r#z4310196# x 400 #b个\r\n#b当前您已经拥有：#r" + cm.getItemQuantity(4310196) + " #b个  您确定要兑换吗？#k\r\n\r\n- #e友情提示：#n#b打开后获得一件自身暴君腰带装备。");
} else if (selection == 7) {
	typed=7;
	cm.sendYesNo("\t\t\t"+aa9+"\r\n\r\n#b当前您已经拥有：#r" + cm.getItemQuantity(4310196) + " #b个  您确定要兑换吗？#k\r\n\r\n- #e友情提示：#n#b打开查看可兑换的稀有椅子道具等。");
}
} else if (status == 2) {
	if(typed==1){
	cm.dispose();
   } else if(typed==2){
	if (cm.getBossLog("限购150") < 1 && cm.haveItem(4310196, 50)) {
	cm.setBossLog("限购150", 1);
	cm.gainItem(2431938, 1);
	cm.gainItem(4310196, -50);
	cm.sendOk("#b成功购买一个 #r#z2431938#")
	cm.dispose();
	} else {
	cm.sendOk("失败\r\n\r\n1). 您的#z4310196#不够.\r\n2). 您已经购买过一次了");
	cm.dispose();
	}
	} else if(typed==3){
	if (cm.getBossLog("随机暴君") < 3 && cm.haveItem(4310196, 300)) {
	cm.setBossLog("随机暴君", 1);
	cm.gainItem(2432069, 1);
	cm.gainItem(4310196, -300);
	cm.sendOk("#b成功购买一个 #r#z2432069#")
	cm.dispose();
	} else {
	cm.sendOk("失败\r\n\r\n1). 您的#z4310196#不够.\r\n2). 您已经购买过三次了");
	cm.dispose();
	}
	} else if(typed==4){
	if (cm.getBossLog("暴君披风卷") < 1 && cm.haveItem(4310196, 400)) {
	cm.setBossLog("暴君披风卷", 1);
	cm.gainItem(2432507, 1);
	cm.gainItem(4310196, -400);
	cm.sendOk("#b成功购买一个 #r#z2432507#")
	cm.dispose();
	} else {
	cm.sendOk("失败\r\n\r\n1). 您的#z4310196#不够.\r\n2). 您已经购买过一次了");
	cm.dispose();
	}
	} else if(typed==5){
	if (cm.getBossLog("暴君鞋子卷") < 1 && cm.haveItem(4310196, 400)) {
	cm.setBossLog("暴君鞋子卷", 1);
	cm.gainItem(2432506, 1);
	cm.gainItem(4310196, -400);
	cm.sendOk("#b成功购买一个 #r#z2432506#")
	cm.dispose();
	} else {
	cm.sendOk("失败\r\n\r\n1). 您的#z4310196#不够.\r\n2). 您已经购买过一次了");
	cm.dispose();
	}
	} else if(typed==6){
	if (cm.getBossLog("暴君腰带卷") < 1 && cm.haveItem(4310196, 400)) {
	cm.setBossLog("暴君腰带卷", 1);
	cm.gainItem(2432508, 1);
	cm.gainItem(4310196, -400);
	cm.sendOk("#b成功购买一个 #r#z2432508#")
	cm.dispose();
	} else {
	cm.sendOk("失败\r\n\r\n1). 您的#z4310196#不够.\r\n2). 您已经购买过一次了");
	cm.dispose();
	}
	} else if(typed==7){
	cm.dispose();
	cm.openNpc(9000290, 12);
	}
      }
    }
  }