/*
 脚本功能：市场管理员
 */

var a = 0;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//美化New
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";

var List = Array(
		//福利项目

		Array(iconEvent + " #r充值奖励#k", 8, 1, 9310144),
		Array(iconEvent + " #b活动奖励#k", 1, 1, 9310144),
		Array(iconEvent + " #b美食福利#k", 1, 1, 1012102),
		
		Array(iconEvent + " #b神器培养", 0, 1, 9073025),
		//Array(iconEvent + " #r福利字母#k", 888, 1, 9310144),
		Array(iconEvent + " #b解锁密码#k", 111, 1),
		Array(iconEvent + " #b猜拳游戏#k", 300, 1, 9900004),
		Array(iconEvent + " #b金币换点#k", 333, 1, 9310144),
		//Array(iconEvent + " #r在线奖励", 608, 1, 9900003)

		Array(iconEvent + " #b纯爱 T V", 40, 1, 9330079),
		Array(iconEvent + " #b皮肤伤害#k", 12, 1, 9900004),
		Array(iconEvent + " #b职业手册#k", 10, 1, 9900004),
		Array(iconEvent + " #b职业副手#k", 11, 1, 9900004)
		
		//Array(iconEvent + " #b点卷商店", 15, 2),
		//Array(iconEvent + " #b花园种植#k", 100, 2, 9330065),
		//Array(iconEvent + " #b超值福袋#k", 666, 2, 9310144),
		
		//Array(iconEvent + " #b爆率查询#k", 5, 3),

		
		
		//Array(icon2+"#b时装觉醒"+icon2, 0, 2, 9000069),
		//Array(icon2+"#d飞升洗髓"+icon2, 1, 2, 9000174),
		 //Array(icon2+"#b武器破功"+icon2, 1000, 2),
		//Array(icon2+"#b蜡笔潜能"+icon2, 1001, 2)
		//Array(iconEvent + " #r暖男女神#k", 777, 1, 9310144)
)
var text;
//是否活动，名字，模式，类别

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            text = "";
            for (var i = 0; i < 5; i++) {
                ListFor(i);
            }
			
            cm.sendSimple(text)
        } else if (a == 1) {
            var mode_ = List[selection][1];
            cm.dispose();
			var npcid = 9900003;
			if (List[selection][3] != null)
				npcid = List[selection][3];
            cm.openNpc(npcid, mode_);
        }//a
    }//mode
}//f


function ListFor(type) {
    switch (type) {
        case 1://便民服务
            text += "#e#d\t\t\t  "+icon2+" 纯爱服务中心 "+ icon2 +"#n#k\r\n";
            break;
		default: 
			text+="\r\n";
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 2) {
				if (List[i+1]!=null && List[i+1][2]!=type)
               		text += "  #L" + i + "#" + List[i][0] + "#l";
				else
					text += "  #L" + i + "#" + List[i][0] + "#l\r\n";
                x = 0;
            } else {
                text += "  #L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
}