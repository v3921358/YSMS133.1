var status = 0;
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//美化1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////美化2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//美化圆
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////美化!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//美化会员
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //兔子粉
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //兔子蓝

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
        var selStr = "\r\n#e#d您好，本服新增特色副本系列,更多请期待添加..#k#n#l#k\r\n\r\n";
                                selStr += "#L0#" + ttt + " #r满技能#n\r\n";
                                selStr += "#L1#" + ttt + " #r英雄#n\r\n";
		selStr += "#L2#" + ttt + " #b圣骑#l\r\n";
        	                selStr += "#L3#" + ttt + " #b黑骑#l\r\n";
		selStr += "#L4#" + ttt + " #b火毒#l\r\n";
		selStr += "#L5#" + ttt + " #b冰雷#l\r\n";
		selStr += "#L6#" + ttt + " #r牧师#n\r\n";
       		selStr += "#L7#" + ttt + " #b神射n\r\n"; 
                                selStr += "#L8#" + ttt + " #b箭神#l\r\n";
		selStr += "#L9#" + ttt + " #b隐士#l\r\n";
		selStr += "#L10#" + ttt + " #b侠盗#l\r\n";
		selStr += "#L11#" + ttt + " #b双刀#l\r\n";
		selStr += "#L12#" + ttt + " #b队长#l\r\n";
		selStr +="#L13#"+ttt + " #b船长#l\r\n";
        	                selStr += "#L14#" + ttt + " #b火炮#l\r\n";
                                selStr += "#L15#" + ttt + " #b龙传#l\r\n";
                                 selStr += "#L16#" + ttt + " #b魂骑#l\r\n";
                                 selStr += "#L17#" + ttt + " #b炎术#l\r\n";
		selStr += "#L18#" + ttt + " #b风灵\r\n";
		selStr += "#L19#" + ttt + " #b夜行#l\r\n";
                                 selStr += "#L20#" + ttt + " #b奇袭\r\n";
        	                 selStr += "#L21#" + ttt + " #b战神#l\r\n";
		selStr += "#L22#" + ttt + " #b龙神#l\r\n";
                                selStr += "#L23#" + ttt + " #b夜光#l\r\n";
        	               selStr += "#L24#" + ttt + " #b双弩  #l\r\n";
                                selStr += "#L25#" + ttt + " #b幻影  #l\r\n";
		selStr += "#L26#" + ttt + "#b狂龙  #l\r\n";
                              selStr += "#L27#" + ttt + "  #b超能  #l\r\n";
                               selStr += "#L28#" + ttt + " #b煎饼  #l\r\n";
                                selStr += "#L29#" + ttt + " #b米哈尔  #l\r\n";
		selStr += "#L30#" + ttt + " #b萌爆  #l\r\n";
                              selStr += "#L31#" + ttt + " #b影月  #l\r\n";


        selStr += "\r\n";
        //selStr +="\r\n#d======================================================#k\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
            case 0:
              cm.clearSkills();
                cm.maxSkillsByJob();
                cm.dispose();
                break;
             case 1:
                cm.dispose();
				cm.changeJob(112);
                cm.sendOk("转职成功");
                break;
            case 2:
                cm.dispose();
				cm.changeJob(122);
                cm.sendOk("转职成功");
                break;
            case 3:
                cm.dispose();
				cm.changeJob(132);
                cm.sendOk("转职成功");
                break;
            case 4:
                cm.dispose();
				cm.changeJob(212);
                cm.sendOk("转职成功");
                break;
            case 5:
			    cm.dispose();
                cm.changeJob(222);
                cm.sendOk("转职成功");
                break;
            case 6:
			    cm.dispose();
                cm.changeJob(232);
                cm.sendOk("转职成功");
                break;
            case 7:
			    cm.dispose();
                cm.changeJob(312);
                cm.sendOk("转职成功");
                break;
            case 8:
			    cm.dispose();
                cm.changeJob(322);
                cm.sendOk("转职成功");
                break;
            case 9:
			    cm.dispose();
                cm.changeJob(412);
                cm.sendOk("转职成功");
                break;
            case 10:
			    cm.dispose();
                cm.changeJob(422);
                cm.sendOk("转职成功");
                break;
            case 11:
			    cm.dispose();
                cm.changeJob(434);
                cm.sendOk("转职成功");
                break;
            case 12:
			    cm.dispose();
                cm.changeJob(512);
                cm.sendOk("转职成功");
                break;
            case 13:
			    cm.dispose();
                cm.changeJob(522);
                cm.sendOk("转职成功");
                break;
            case 14:
			    cm.dispose();
                cm.changeJob(532);
                cm.sendOk("转职成功");
                break;
            case 15:
			    cm.dispose();
                cm.changeJob(572);
                cm.sendOk("转职成功");
                break;
            case 16:
			    cm.dispose();
                cm.changeJob(1112);
                cm.sendOk("转职成功");
                break;
            case 17:
			    cm.dispose();
                cm.changeJob(1212);
                cm.sendOk("转职成功");
                break;
            case 18:
			    cm.dispose();
                cm.changeJob(1312);
                cm.sendOk("转职成功");
                break;
            case 19:
			    cm.dispose();
                cm.changeJob(1412);
                cm.sendOk("转职成功");
                break;
            case 20:
			    cm.dispose();
                cm.changeJob(1512);
                cm.sendOk("转职成功");
                break;
            case 21:
			    cm.dispose();
                cm.changeJob(2112);
                cm.sendOk("转职成功");
                break;
            case 22:
			    cm.dispose();
                cm.changeJob(2217);
                cm.sendOk("转职成功");
                break;
            case 23:
			    cm.dispose();
                cm.changeJob(2712);
                cm.sendOk("转职成功");
                break;
            case 24:
			    cm.dispose();
                cm.changeJob(2312);
                cm.sendOk("转职成功");
                break;
            case 25:
			    cm.dispose();
                cm.changeJob(2412);
                cm.sendOk("转职成功");
                break;
           case 26:
			    cm.dispose();
                cm.changeJob(6112);
                cm.sendOk("转职成功");
                break;
            case 27:
			    cm.dispose();
                cm.changeJob(14212);
                cm.sendOk("转职成功");
                break;
            case 28:
		    cm.dispose();
                cm.changeJob(3612);
                cm.sendOk("转职成功");
                break;
            case 29:
			    cm.dispose();
                cm.changeJob(5112);
                cm.sendOk("转职成功");
                break;
            case 30:
			    cm.dispose();
                cm.changeJob(6512);
                cm.sendOk("转职成功");
                break;
            case 31:
			    cm.dispose();
                cm.changeJob(2512);
                cm.sendOk("转职成功");
                break;
            


        }
    }
}