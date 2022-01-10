var vv = "#fUI/UIWindow2.img/ValuePacktton/complete/0#";//领取完成
var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun = "#fUI/UIWindow/Megaphone/2#";////红沙漏
var yun2 = "#fUI/UIWindow/Quest/icon8/0#";////蓝指标
var yun8 = "#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////金左指标
var yun9 = "#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////金右指标
var yun4 = "#fUI/UIWindow/Quest/reward#";////奖励
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //彩虹带
var eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //彩光
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //彩光1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //爱心
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //星系
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //泡炮 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //爱心
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //砖石粉
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //砖石蓝
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //星系
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //音符红
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //音符绿
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //音符绿!
var yun1 = "#fUI/UIWindow/Quest/icon7/10#";////红色圆
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //蓝心
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //红心
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //彩心
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //黄星
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //蓝星
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //红星
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //花样音符
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //花样音符
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //花样音符
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //花样音符
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //花样音符
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //红星花
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
	cm.sendSimpleS("\t\t\t#b>>> #e#d欢迎使用理财钱庄#n#b <<<#k\r\n#b您当前的余额数为： #r"+cm.getRMB()+" #b元  您已经领取： #r"+cm.getBossLog("返利次数", 1) +" #b天#k\r\n#b#L1#      "+tz1+" 领取第 #r"+ (1+cm.getBossLog('返利次数', 1)) + " #b天返利 #r"+(5+cm.getBossLog("返利次数", 1))+" #b元余额#l\r\n\r\n" ,2);
	} else if (status == 1) {
if (selection == 1) {
	typed=1;
	cm.sendYesNo("- #e#d领取当天福利#n#k\r\n#b当前可领取余额 #r"+(5+cm.getBossLog('返利次数', 1))+"#b 元，以及下列道具：\r\n#b#z4001465# x 100 个      #d(老公老婆戒指晋级道具)#k\r\n#b#z4034304# x 30 个       #d(爱心强化所需要的道具)#k\r\n#b#z5062009# x 100 个  #d(装备SS级所需要的道具)\r\n#b#z5064000# x 10 个       #d(防止装备砸爆需要的道具)\r\n#b#z4033204# x 10 个     #d(进阶翅膀所需要的道具)\r\n#b#z4310036# x 100         #d(兑换装备所需要的道具)\r\n#b#z4310023# x 30       #d(时装升星所需要的道具)\r\n#b#z4310108# x 30      #d(兑换戒子所需要的道具)\r\n#b#z2340000# x 10          #d(防止失败减少升级次数)\r\n#b金币 x 30,000,000      #d(游戏金币实用于玩家交易)\r\n#b点卷 x 15,000          #d(用来购买道具点装)#k");
}
} else if (status == 2) {
if(typed==1){
 if (cm.getBossLog("返利次数", 1) > 19) {
cm.sendOk("\r\n\r\n#b你好像已经领完全部20天返利奖励。\r\n\r\n-\r\n- #e#d领取天数为：#n：#r"+cm.getBossLog('返利次数', 1) +" #b天#k");
cm.dispose();
} else if (cm.getBossLog('当天返利') >= 1) {
cm.sendOk("#e#r您今天已经领取过。请明天再试。"); 
cm.dispose();
}
else if (!cm.getBossLog("月制度理财", 1) < 1) {
cm.sendOk("#b您不是办理的一月的理财，我无法为您服务。"); 
cm.dispose();
} 
else if (cm.getSpace(4) < 4) {
cm.sendOk("#e#r你请把您的背包其他栏空出4个空位来"); 
cm.dispose();
} else if (cm.getSpace(5) < 2){
cm.sendOk("#e#r你请把您的背包特殊栏空出2个空位来");
cm.dispose();
} else if (cm.getSpace(2) < 1) { // Not Party Leader
cm.sendOk("#e#r你请把您的背包消耗栏空出1个空位来");
cm.dispose();
} else {
cm.setBossLog('返利次数', 1);
cm.setBossLog('当天返利');
cm.gainItem(4001465, 100);//爱心宝石，老公老婆戒指使用
cm.gainItem(4034304, 30);//NENE爱心,爱心强化需要的道具
cm.gainItem(5062009, 100);//超级魔方
cm.gainItem(5064000, 10);//防爆卷轴
cm.gainItem(4033204, 10);//温暖的羽毛，翅膀进价使用
cm.gainItem(4310036, 100);//征服者必
cm.gainItem(4310023, 30);//幸运的铜币时装升星使用
//cm.gainItem(4033943, 30);//魔法球（暂时取消该物品赠送）
cm.gainItem(4310108, 30);//冒险岛纪念币，兑换快乐指挥需要的道具
cm.gainItem(2340000, 10);//祝福卷轴
cm.gainMeso(30000000);//金币
cm.gainNX(1, 15000);//点卷
cm.gainRMB( (4+cm.getBossLog('返利次数')));//余额
//cm.addHyPay(-(4+cm.getBossLog('返利次数')));
cm.sendOk("\r\n\r\n#b成功领取了 #r"+(4+cm.getBossLog('返利次数', 1))+"#b 元余额以及大量道具。");
cm.worldSpouseMessage(0x24, "『理财钱庄』 : 恭喜 " + cm.getChar().getName() + " 成功领取了第 "+cm.getBossLog('返利次数', 1) +" 天返 "+(4+cm.getBossLog('返利次数', 1))+" 元余额以及大量道具。.");
cm.dispose();
                        }
                }
          }
     }
}