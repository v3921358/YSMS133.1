/*
 脚本功能：市场管理员
 */

var a = 0;
var iconEvent ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var List = Array(
		//福利项目
		Array(iconEvent + " #r实惠礼包#k", 5, 1, 9000069),
		Array(iconEvent + " #b绝版点装#k", 1, 1, 9000069),
		Array(iconEvent + " #b稀有椅子#k", 2, 1, 9000069),
		Array(iconEvent + " #b上乘装备#k", 4, 1, 9000069),
		Array(iconEvent + " #b极品卷轴#k", 3, 1, 9000069),
		Array(iconEvent + " #b品级副装#k", 999, 1, 9310144),
		Array(iconEvent + " #b皮肤伤害#k", 0, 1, 9310071),
		Array(iconEvent + " #b职业手册#k", 0, 1, 9310073),
		Array(iconEvent + " #b职业副手#k", 0, 1, 9310072)
		
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
            for (var i = 0; i < 2; i++) {
                ListFor(i);
            }
			//text += "\r\n#e#g\t\t\t  "+icon2+" 回忆祝您游戏愉快 "+ icon2 +"#n#k\r\n";
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
            text += "你好，看一看吧，需要购买什么呢？\r\n";
            break;
    }
    var x = 0;
    for (var i = 0; i < List.length; i++) {
        if (List[i][2] == type) {
            if (x == 2) {
                text += " #L" + i + "#" + List[i][0] + "#l\r\n\r\n";
                x = 0;
            } else {
                text += " #L" + i + "#" + List[i][0] + "#l";
                x++;
            }
        }
    }
}