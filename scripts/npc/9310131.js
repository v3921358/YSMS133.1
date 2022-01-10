var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fEffect/CharacterEff/1082565/2/0#";
var vvv = "#fUI/Basic/BtHide3/mouseOver/0#";
var vvv4 = "#fUI/UIWindow4/PQRank/rank/gold#";
var z1 = "#fEffect/ItemEff/1112811/0/0#";//黄金音符
var z5 = "#fEffect/CharacterEff/1112904/2/1#";//五角花
var eff1 = "#fUI/StarCityUI.img/GradeInfo/icon_ss/7#"
var icon3 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/7#";//发呆
var icon4 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/6#";//愤怒
var icon5 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/3#";//大笑
var icon6 = "#fUI/GuildBBS/GuildBBS/Emoticon/Cash/1#";//大笑
cztp = 0;
var targetLevel = 250;

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
    if (status == 0) {
        var txt = "           #e#r #fUI/GuildMark.img/Mark/Etc/00009001/9# 冒险岛自由转职系统 #fUI/GuildMark.img/Mark/Etc/00009001/9#\r\n\r\n#e#d   部分职业互转可能造成BUG，如果出现请小退，不可转红毛白毛，并且红毛白毛职业也不用使用，会出严重BUG！！！！。\r\n\r\n\r\n";
                txt += "#r   #L40#" + vvv4 + "#r#e【学满技能】";  
	       
	        txt += "#r#L1#" + vvv4 + "#r#e英雄";
		txt += "#r#L2#" + vvv4 + "#r#e圣骑";
		txt += "#r#L3#" + vvv4 + "#r#e黑骑";
		txt += "#r#L4#" + vvv4 + "#r#e火毒";
		txt += "#r#L5#" + vvv4 + "#r#e冰雷";
		txt += "#r#L6#" + vvv4 + "#r#e主教";
		txt += "#r#L7#" + vvv4 + "#r#e神射";
		txt += "#r#L8#" + vvv4 + "#r#e箭神";
		txt += "#r#L9#" + vvv4 + "#r#e隐士";
		txt += "#r#L10#" + vvv4 + "#r#e侠盗";
		txt += "#r#L11#" + vvv4 + "#r#e双刀";
		txt += "#r#L12#" + vvv4 + "#r#e队长";
		txt += "#r#L13#" + vvv4 + "#r#e船长";
		txt += "#r#L14#" + vvv4 + "#r#e火炮";
		txt += "#r#L15#" + vvv4 + "#r#e龙传";
		txt += "#r#L16#" + vvv4 + "#r#e魂骑";
		txt += "#r#L17#" + vvv4 + "#r#e炎术";
		txt += "#r#L18#" + vvv4 + "#r#e风灵";
		txt += "#r#L19#" + vvv4 + "#r#e夜行";
		txt += "#r#L20#" + vvv4 + "#r#e奇袭";
		txt += "#r#L21#" + vvv4 + "#r#e战神";
		txt += "#r#L22#" + vvv4 + "#r#e龙神";
		txt += "#r#L23#" + vvv4 + "#r#e夜光";
		txt += "#r#L24#" + vvv4 + "#r#e双弩";
		txt += "#r#L25#" + vvv4 + "#r#e幻影";
		txt += "#r#L26#" + vvv4 + "#r#e魔链影士";
		txt += "#r#L27#" + vvv4 + "#r#e圣晶使徒";
		txt += "#r#L28#" + vvv4 + "#r#e唤灵";
		txt += "#r#L29#" + vvv4 + "#r#e豹弩";
		txt += "#r#L30#" + vvv4 + "#r#e机械";
		txt += "#r#L31#" + vvv4 + "#r#e尖兵";
		txt += "#r#L32#" + vvv4 + "#r#e剑豪";
		txt += "#r#L33#" + vvv4 + "#r#e阴阳";
		txt += "#r#L34#" + vvv4 + "#r#e米哈";
		txt += "#r#L35#" + vvv4 + "#r#e狂龙";
		txt += "#r#L36#" + vvv4 + "#r#e天使";
		txt += "#r#L37#" + vvv4 + "#r#e古迹猎人";
		txt += "#r#L38#" + vvv4 + "#r#e御剑骑士";
		txt += "#r#L39#" + vvv4 + "#r#e虎影";
txt += "#r#L41#" + vvv4 + "#r#e影魂异人";
txt += "#r#L42#" + vvv4 + "#r#e恶魔猎手";
                
        cm.sendSimple(txt);

    } else if (status == 1) {
        if(!cm.haveItem(4033943,1)){
            cm.sendOk("需要1个#v4033943#才能进行自由转职！");
            cm.dispose();
            return;
        }
        cm.gainItem(4033943,-1);
		
        switch (selection) {
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
                cm.changeJob(6412);
                cm.sendOk("转职成功");
                break;
            case 27:
			    cm.dispose();
                cm.changeJob(15212);
                cm.sendOk("转职成功");
                break;
            case 28:
			    cm.dispose();
                cm.changeJob(3212);
                cm.sendOk("转职成功");
                break;
            case 29:
			    cm.dispose();
                cm.changeJob(3312);
                cm.sendOk("转职成功");
                break;
            case 30:
			    cm.dispose();
                cm.changeJob(3512);
                cm.sendOk("转职成功");
                break;
            case 31:
			    cm.dispose();
                cm.changeJob(3612);
                cm.sendOk("转职成功");
                break;
            case 32:
			    cm.dispose();
                cm.changeJob(4112);
                cm.sendOk("转职成功");
                break;
            case 33:
			    cm.dispose();
                cm.changeJob(4212);
                cm.sendOk("转职成功");
                break;
            case 34:
			    cm.dispose();
                cm.changeJob(5112);
                cm.sendOk("转职成功");
                break;
            case 35:
			    cm.dispose();
                cm.changeJob(6112);
                cm.sendOk("转职成功");
                break;
            case 36:
			    cm.dispose();
                cm.changeJob(6512);
                cm.sendOk("转职成功");
                break;
            case 37:
			    cm.dispose();
                cm.changeJob(332);
                cm.sendOk("转职成功");
                break;
            case 38:
		cm.dispose();
                cm.changeJob(15112);
                cm.sendOk("转职成功");
                break;
            case 39:
              cm.dispose();
                cm.changeJob(16412);
                cm.sendOk("转职成功");
                break;
            case 40:
              cm.clearSkills();
                cm.maxSkillsByJob();
                cm.dispose();
                break;
            case 41:
             cm.dispose();
                cm.changeJob(15512);
                cm.sendOk("转职成功");
                break;
case 42:
             cm.dispose();
                cm.changeJob(3112);
                cm.sendOk("转职成功");
                break;
        }
    } else if (status == 2) {
        if (cztp == 1) {
            switch (selection) {
                case 10:
                    if (cm.getHyPay(1) < 1) {
                        cm.sendOk();
                        status = -1;
                    } else {
                        var revenue0 = cm.getHyPay(1);
                        cm.sendGetText();
                    }
                    break;
                case 0:
                    cm.dispose();
                    cm.openNpc();
                    break;
            }
        }
    } else if (status == 3) {
        if (cm.getHyPay(1) - cm.getText() < 0) {
            cm.sendOk();
            cm.dispose();
        } else {
            cm.addHyPay(+cm.getText());
            cm.gainNX(cm.getText() * 3000);
            cm.sendOk();
            cm.dispose();
        }
    }else {
        cm.dispose();
    }
}