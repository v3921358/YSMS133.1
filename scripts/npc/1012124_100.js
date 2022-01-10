var vv = "#fUI/UIWindow2.img/ValuePacktton/complete/0#";//领取完成
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉

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
	cm.sendSimpleS("#b>>> #b欢迎使用超值理财 #r温馨提示:1元==1万星币#n#b <<<#k\r\n#b您当前的星币数为： #r"+cm.getRMB()+" #b星币  您已经领取： #r"+cm.getBossLog("返利次数", 1) +" #b天#k\r\n\r\n    办理理财后可以在我这里领取相对应的福利哟。接下来的每天您可以在我这里领取 #e#r9万星币#n#k，如果中间没有领取，损失将会是您自己的，请记住一定要按时领取，总共返利 #r270#k 元的星币。\r\n#b#L2#"+tz8+" 80元办理高级理财一周权#l\r\n#b#L3#"+tz8+" 200元办理高级理财一月权#l\r\n\r\n#L4##b返回上一页#k#l\r\n" ,2);
	} else if (status == 1) {
if (selection == 1) {
	typed=1;
	cm.sendYesNo("- #e#d领取当天福利#n#k\r\n\r\n#b当前可领取星币 #r"+(5+cm.getBossLog("返利次数", 1))+"#b 星币，以及下列道具：\r\n\r\n#b#z5062010# x 20   #d(装备SS级所需要的道具)\r\n#b#z5064000# x 5        #d(防止装备砸爆需要的道具)\r\n#b#z4001006# x 20       #d(进阶翅膀所需要的道具)\r\n#b#z4310036# x 100      #d(兑换装备所需要的道具)\r\n#b#z4033943# x 30         #d(神器培养所需要的道具)\r\n#b#z4310108# x 100  #d(兑换戒子所需要的道具)\r\n#b#z2340000# x 10       #d(防止失败减少升级次数)\r\n#b金币 x 30,000,000   #d(游戏金币实用于玩家交易)\r\n#b点卷 x 20,000       #d(用来购买道具点装)");
} else if (selection == 2) {
	typed=2;
	cm.sendYesNo("#r办理一周理财可以使用以下功能：\r\n- #b超值福利#k#n     (每天领取9万星币以及大量道具)\r\n- #b戒指晋级#n#k    (老公老婆戒指晋级)\r\n- #b屌丝商店#n#k     (屌丝系列道具，屌丝必备)\r\n- #b自选发型#n#k     (可自主选择可爱发型)\r\n- #b每日寻宝#n#k     (每日免费寻宝1次)\r\n- #b三倍经验#n#k     (每日免费领取三倍经验)\r\n- #b双倍爆率#n#k     (每日免费领取双倍爆率)\r\n- #b增加血量#n#k     (自主10点卷购买1点血量)\r\n- #b领取戒指#n#k     (领取强大属性戒指)\r\n- #b租借椅子#n#k     (可租借2个小时稀有椅子)\r\n- #b高级回收#n#k     (回收高级装备可获得点卷)\r\n- #e#bBOSS重置#n#k     (可选择重置指定BOSS次数)\r\n- #b副本重置#n#k     (可选择重置指定副本次数)\r\n\r\n\t#e#r您确定要办理吗？");
} else if (selection == 3) {
	typed=3;
	cm.sendYesNo("#d办理月理财后可使用以下功能：\r\n- #b超值福利#k#n     (每天领取9万星币以及大量道具)\r\n- #b戒指晋级#n#k    (老公老婆戒指晋级)\r\n- #b屌丝商店#n#k     (屌丝系列道具，屌丝必备)\r\n- #b自选发型#n#k     (可自主选择可爱发型)\r\n- #b每日寻宝#n#k     (每日免费寻宝1次)\r\n- #b三倍经验#n#k     (每日免费领取三倍经验)\r\n- #b双倍爆率#n#k     (每日免费领取双倍爆率)\r\n- #b增加血量#n#k     (自主10点卷购买1点血量)\r\n- #b领取戒指#n#k     (领取强大属性戒指)\r\n- #b租借椅子#n#k     (可租借2个小时稀有椅子)\r\n- #b高级回收#n#k     (回收高级装备可获得点卷)\r\n- #bBOSS重置#n#k     (可选择重置指定BOSS次数)\r\n- #b副本重置#n#k     (可选择重置指定副本次数)\r\n\r\n\t#e#r您确定要办理吗？");
} else if (selection == 4) 
			{
				cm.dispose();
				cm.openNpc(1012124, 1012124);
				return;
}
} else if (status == 2) {
if(typed==1){
 if (cm.getBossLog("返利次数") == 20) {
cm.sendOk("\r\n\r\n#b你好像已经领完全部20天返利奖励。\r\n\r\n-\r\n- #e#d领取天数为：#n：#r"+cm.getBossLog("返利次数", 1) +" #b天#k");
cm.dispose();
}
else if (cm.getBossLog("当天返利") >= 1) {
cm.sendOk("#e#r您今天已经领取过。请明天再试。"); 
cm.dispose();
}
/*else if (cm.getBossLog("月制度理财", 1) < 1) {
cm.sendOk("#b您不是办理的一月的理财，我无法为您服务。"); 
cm.dispose();
}*/
else if (cm.getSpace(4) < 4) {
cm.sendOk("#e#r你请把您的背包其他栏空出4个空位来"); 
cm.dispose();
}
else if (cm.getSpace(5) < 2){
cm.sendOk("#e#r你请把您的背包特殊栏空出2个空位来");
cm.dispose();
}
else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r你请把您的背包消耗栏空出1个空位来");
cm.dispose();
}else{
cm.setBossLog("返利次数", 1);
cm.setBossLog("当天返利");
cm.gainItem(5062010, 20);
cm.gainItem(5064000, 5);
cm.gainItem(4001006, 20);
cm.gainItem(4310036, 100);
cm.gainItem(4033943, 30);
cm.gainItem(4310108, 100);
cm.gainItem(2340000, 10);
cm.gainMeso(30000000);
cm.gainNX(1, 20000);
cm.getRMB(-(5+cm.getBossLog("返利次数")));
cm.sendOk("\r\n\r\n#b成功领取了 #r"+(1+cm.getBossLog("返利次数"))+"#b 元现金点以及大量道具。");
cm.worldSpouseMessage(0x20, "『理财钱庄』 : 恭喜 " + cm.getChar().getName() + " 成功领取了 "+(4+cm.getBossLog("返利次数"))+" 元现金点以及大量道具。.");
cm.dispose();
                        }
} else if(typed==2){
	if (cm.haveItem(2430865) > 1) {
	//if (cm.haveItem(2433424) >= 1|| cm.haveItem(2430865) >= 1) {
cm.sendOk(" 您当前已经办理了理财，请无重复办理，或者等待到期后再办理。");
cm.dispose();
}

else if (cm.getSevenDayPayLog(1).get(0) <= 80) {
cm.sendOk("- #e#d理财服务七天权：#n需要今天充值80元 #k\r\n\r\n#r您今天未充值80元，无法为您办理七天理财。"); 
cm.dispose();
}
else if (cm.getRMB() <= 800000) {
cm.sendOk("- #e#d您的星币不足800000。"); 
cm.dispose();
}
else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r你请把您的背包消耗栏空出1个空位来");
cm.dispose();
}else{
cm.resetBossLog("月制度理财", 1);
cm.setBossLog("理财七天", 1);
//cm.gainNX(1, -100000);
cm.gainRMB(-800000);
cm.gainItem(2430865,1,7);
cm.sendOk("恭喜您成功购买七天理财服务.");
cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功购买理财服务七天权。", 5120012);
cm.worldSpouseMessage(0x20, "『系统公告』 : 恭喜 " + cm.getChar().getName() + " 成功购买七天理财服务.");
cm.dispose();
}
} else if(typed==3){
	if (cm.haveItem(2430865) > 1) {
	//if (cm.haveItem(2433424) >= 1 || cm.haveItem(2430865) >= 1) {
cm.sendOk(" 您当前已经办理了理财，请无重复办理，或者等待到期后再办理。");
cm.dispose();
}

else if (cm.getSevenDayPayLog(1).get(0) <= 200) {
cm.sendOk("- #e#d理财服务一月权：#n需要今天充值200元 #k\r\n\r\n#r您今天未充值200元，无法为您办理一个月理财。"); 
cm.dispose();
}
else if (cm.getRMB() <= 2000000) {
cm.sendOk("- #e#d您的星币不足2000000。"); 
cm.dispose();
}
else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r你请把您的背包消耗栏空出1个空位来");
cm.dispose();
}else{
cm.setBossLog("月制度理财", 1);
cm.resetBossLog("理财十天", 1);
cm.gainRMB(-2000000);
cm.gainItem(2430865,1,30);
cm.sendOk("恭喜您成功购买一个月理财服务.");
cm.getMap().startMapEffect("恭喜玩家 "+cm.getChar().getName()+" 成功购买理财服务一月权。", 5120012);
cm.worldSpouseMessage(0x20, "『系统公告』 : 恭喜 " + cm.getChar().getName() + " 成功购买一个月理财服务.");
cm.dispose();
}
                }
}
}
}