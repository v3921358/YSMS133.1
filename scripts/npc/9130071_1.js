var vv = "#fUI/UIWindow2.img/ValuePacktton/complete/0#";//领取完成
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var Frock = "#fUI/UIWindow.img/RpsGame/Frock#";
var Fpaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";
var Fscissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var rock = "#fUI/UIWindow.img/RpsGame/rock#";
var paper = "#fUI/UIWindow.img/RpsGame/paper#";
var scissor = "#fUI/UIWindow.img/RpsGame/scissor#";
var win = "#fUI/UIWindow.img/RpsGame/win#";
var lose = "#fUI/UIWindow.img/RpsGame/lose#";
var draw = "#fUI/UIWindow.img/RpsGame/draw#";
var beta = "#fUI/UIWindow.img/BetaEdition/BetaEdition#";
var item = new Array(5062002,5062009,5062500,5064000,2340000,2049300);
var chance = Math.floor(Math.random()*item.length);
var chance1 = Math.floor(Math.random() * 10 + 30);
var chance2 = Math.floor(Math.random() * 100 + 500);
var chance3 = Math.floor(Math.random() * 1 + 1);
var chance4 = Math.floor(Math.random() * 10 + 10);
var laba = new Array(5072000,5073000,5074000,5390000,5390001,5390002);
var etc = new Array(4310030,4001839,4310088,4310036,4310030,4310030,4310036,4001839,4001839,4310036);
var hwtext=new Array("有种放学别走.本美女和你单挑...","我爸是比尔盖兹，你想怎么着","不服你就来揍我呀","小子，看你身子骨不错，适合当2B","看什么看，没见过美女吗？","就你这骨瘦如柴的皮包骨还想揍我吗？");

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
	cm.sendSimpleS("\r\n\t\t\t#r[温馨提示您]：#k\r\n\r\n#e#d有种放学别走、不服你就来和本姑娘单挑！#n#k\r\n\r\n\t\t- #e提示：#n#r请点击锤子\r\n\r\n\t\t\t#L1#"+ Frock +"#l\r\n" ,2);
	} else if (status == 1) {
if (selection == 1) {
	typed=1;
	var hwchance= Math.floor(Math.random()*hwtext.length);
	cm.sendYesNo("#rNPC："+hwtext[hwchance]+"#k");
} else if (selection == 2) {
	typed=2;
	cm.sendYesNo("");
} else if (selection == 3) {
	typed=3;
	cm.sendYesNo("");
}
} else if (status == 2) {
	if(typed==1){
	var ii = cm.getItemInfo();
	var xxx = Math.floor(Math.random() * 9);
	if (xxx == 1) {
	cm.gainItem(item[chance], 1);
	cm.sendOk(""+win+"\r\n\r\n- #e#d您不费吹灰之力已将美女打趴下。#n\r\n\r\n- #e#d本次获得：#n#r#z"+item[chance]+"# x 1#k");
	cm.worldSpouseMessage(0x24, "不忘国耻 : " + cm.getChar().getName() + " 胜利获得 ["+ii.getName(item[chance])+"] 一个.");
	cm.dispose();
	} else if (xxx == 3) {
	cm.gainNX(1, chance1);
	cm.sendOk(""+win+"\r\n\r\n- #e#d您不费吹灰之力已将美女打趴下。#n\r\n\r\n- #e#d本次获得点卷：#n#r"+chance1+"#k");
	cm.worldSpouseMessage(0x24, "不忘国耻 : " + cm.getChar().getName() + " 胜利获得 "+chance1+" 点卷奖励.");
	cm.dispose();
	} else if (xxx == 5) {
	cm.gainNX(2, chance2);
	cm.sendOk(""+win+"\r\n\r\n- #e#d您不费吹灰之力已将美女打趴下。#n\r\n\r\n- #e#d本次获得抵用卷：#n#r"+chance2+"#k");
	cm.worldSpouseMessage(0x24, "不忘国耻 : " + cm.getChar().getName() + " 胜利获得 "+chance2+" 抵用卷奖励.");
	cm.dispose();
	} else if (xxx == 7) {
	cm.gainItem(laba[chance], chance3);
	cm.sendOk(""+draw+"\r\n\r\n- #e#d战成平手。什么个情况？#n\r\n\r\n- #e#d本次获得：#n#r#z"+laba[chance]+"# x "+chance3+"#k");
	cm.worldSpouseMessage(0x24, "不忘国耻 : " + cm.getChar().getName() + " 战成平手获得 ["+ii.getName(laba[chance])+"] x "+chance3+".");
	cm.dispose();
	} else if (xxx == 9) {
	cm.gainItem(etc[chance], chance4);
	cm.sendOk(""+draw+"\r\n\r\n- #e#d战成平手。什么个情况？#n\r\n\r\n- #e#d本次获得：#n#r#z"+etc[chance]+"# x "+chance4+"#k");
	cm.worldSpouseMessage(0x24, "不忘国耻 : " + cm.getChar().getName() + " 战成平手获得 ["+ii.getName(etc[chance])+"] x "+chance4+".");
	cm.dispose();
	} else {
	cm.sendOk(""+lose+"\r\n\r\n- #e#d您被美女反揍的鼻青脸肿，请再次尝试。#n\r\n\r\n");
	cm.dispose();
	}
    if(typed==2){
	cm.dispose();
	}
    if(typed==3){
	cm.dispose();
	     }
       }
     }
   }
}