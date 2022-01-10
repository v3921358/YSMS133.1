
var status = 0;
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
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#"
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk("很遗憾，您因为违反用户守则被禁止游戏活动，如有异议请联系管理员.")
            cm.dispose();
        } 
    else if (status == 0) {
		var selStr = "#b这里的功能都是【#r惊喜副本#k#b】ROLL点数宝箱内物品查看。\r\n\r\n";
		selStr += "#e#b"+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+"\r\n";

		selStr += "#r#L0#"+tz+" 森林BOSS宝箱战利品内容查看#l\r\n";
		selStr += "#r#L1#"+tz+" 希拉副本宝箱战利品内容查看#l\r\n";
		selStr += "#r#L2#"+tz+" 阿卡伊勒宝箱战利品内容查看#l\r\n";
		selStr += "#r#L3#"+tz+" 黄金寺院宝箱战利品内容查看#l\r\n";
		selStr += "#r#L4#"+tz+" 组队日本宝箱战利品内容查看#l\r\n";
		selStr += "\r\n";
		selStr += "#e#b"+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+""+tz88+"\r\n";

		selStr += "#b#L11#"+tz+" 点击进入惊喜副本#l  #b#L10#"+tz+" 点击返回拍卖菜单#l\r\n";
		//selStr += "#b#L10#"+ttt6+" 点击返回主菜单#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
			cm.sendOk("#i4310150# #i2049752# #i2433646# #i2022956# #i5062009# #i5062010# #i1112663# #i1112586# #i2430471# #i2340000# #i5072000# #i5073000# #i5074000# #i2049135# #i2049122# #i5010110# #i1012478# #i1022231# #i1022232# #i1182087# #i1152170# #i1132272# #i1122150# #i1122254# #i1122076# #i1032241# #i1032136# #i1113149# #i1112191# #i1115004# #i1112190# #i1115003# #i1112959# #i5010044# #i1112183# #i1112296# #i1112181# #i1112294# #i3010895# #i3010896# #i3010897# #i3010898# #i3010899# #i3010900# #i3010901# #i3010902# #i3010903# #i3010904# #i1112915# #i4001006# #i3010678# #i3010680# #i1112103# #i1112253# #i1112142# #i1112135# #i1112238# #i1702020# #i1002524# #i1702533# #i1112230# #i1112254# #i1112143# #i3010852# #i3010844# #i3010851# #i1072337# #i1702459# #i1702302# #i1042285# #i3010788# #i3010781# #i3010779# #i3010780# #i3010797# #i3010798# #i3010810# #i3010811# #i3010812# #i3010814# #i3010815# #i3010844# #i3010806# #i3012019# #i3010714# #i3010795# #i3010748# #i3010794# #i3010799# #i3010732# #i3012020# #i3010936# #i3010894# #i3010915# #i3010747# #i3010606# #i3010608# #i3010800# #i3010909# #i3010908# #i3010916#\r\n#i1212014##r 龙尾全套装备,  #i1542015# 狮心全套装备,\r\n#i1242014##r 鲨齿全套装备,  #i1342036##r 渡鸦全套装备,\r\n#i1452111##r 鹰翼全套装备,  #i1232040# 豪华全套装备,\r\n");
            cm.dispose();
            break; 
        case 1:
			cm.sendOk("#b已省略全部140装备,和部分椅子，和森林出的一样\r\n\r\n#i1102807# #i4033924# #i2432013# #i2432014# #i2049752# #i5062009# #i5062010# #i2340000# #i5072000# #i5073000# #i5074000# #i4001006# #i1112915# #i2433654# #i2433285# #i1032205# #i4033356# #i1003797# #i1003798# #i1003799# #i1003800# #i1003801# #i1042254# #i1042255# #i1042256# #i1042257# #i1042258# #i1062165# #i1062166# #i1062167# #i1062168# #i1062169#");
            cm.dispose();
            break;  
        case 2:
			cm.sendOk("#b已省略全部140装备,和部分椅子，和森林出的一样\r\n\r\n#i2433646# #i2049752# #i2022956# #i5062009# #i5062010# #i2430471# #i2340000# #i5072000# #i5073000# #i5074000# #i2049135# #i2049122# #i1003622# #i1012478# #i1022231# #i1022232# #i1182087# #i1152170# #i1132272# #i1122150# #i1122254# #i1122076# #i1032241# #i1032136# #i1113149# #i4001006# #i4033356#");
            cm.dispose();
            break;
		case 3:
			cm.sendOk("还要添加爆率，添加副本后再添加查询\r\n\r\n#i2433646# #i2049752# #i2022956# #i5062009# #i5062010# #i2430471# #i2340000# #i5072000# #i5073000# #i5074000# #i1003622# #i1022232# #i1052527# #i1012478# #i3010678# #i3010680# #i3010183# #i3010184# #i4033356#");
            cm.dispose();
            break;
		case 4:
			cm.sendOk("#i2430460# #i2430866# #i5073000# #i5074000# #i2049135# #i2049122# #i4001006# #i1112915# #i2433654# #i4033356# #i1003797# #i1003798# #i1003799# #i1003800# #i1003801# #i1042254# #i1042255# #i1042256# #i1042257# #i1042258# #i1062165# #i1062166# #i1062167# #i1062168# #i1062169# #i1542075# #i1252058# #i1532106# #i1522103# #i1492188# #i1482177# #i1472223# #i1462202# #i1452214# #i1442232# #i1432176# #i1422149# #i1412144# #i1382220# #i1372186# #i1362099# #i1342084# #i1332235# #i1322213# #i1312162# #i1302285# #i1242076# #i1402204# #i1232071# #i1222072# #i1212077#");
            cm.dispose();
            break;
		case 10:
            cm.dispose();
			cm.openNpc(1540419);
            break;











}
    }
}
