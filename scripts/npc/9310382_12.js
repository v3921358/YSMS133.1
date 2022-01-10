/*
 脚本功能：物品回收
 */
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var hwtext=new Array("人长得漂亮不如活得漂亮！","当裤子失去皮带，才懂得什麽叫做依赖。","烟不听话，所以我们'抽烟'。","你发怒一分钟，便失去60秒的幸福。","当男人遇见女人，从此只有纪念日，没有独立日。","路见不平一声吼，吼完继续往前走。","幸福是个比较级，要有东西垫底才感觉得到。","知识就像内裤，看不见但很重要","作为失败的典型，你实在是太成功了","女人喜欢长得坏坏的男人，不是喜欢长坏了的男人","跌倒了，爬起来再哭","你若流泪，先湿的是我的心","让未来到来，让过去过去","我自横刀向天笑，笑完之后去睡觉","别跟我谈感情，谈感情伤钱","孤单是一个人的狂欢，狂欢是一群人的孤单","姐不是收破烂的，做不到让你随喊随到","我不是草船，你的贱别往我这发","你的矮是终身的，我的胖却是暂时的","別在无聊的时候來找我，不然显得我是多余的","姐不是电视机，不要老是盯着姐看","即使你已名花有主、我也要移花接木","心里只有你一个频道 最可恨的是还没有广告","给你最大的报复，就是活的比你幸福","要不是老师说不能乱扔垃圾，不然我早把你扔出去","没有癞蛤蟆，天鹅也会寂寞","我是光棍我可耻，我给国家浪费纸","人生没有如果，只有后果和结果","你那么有钱 为什么不让鬼来推磨？","别把人和狗相提并论，狗最起码忠诚","生活嘛，就是生下来，活下去","当你披上了婚纱 我也披上了袈裟","趁着年轻把能干的坏事都干了吧，没几年了","我人生只会两件事 1 这也不会 2 那也不会","出租车司机，司机中的战斗机，噢耶! ","思想有多远，你就给我滚多远!","人生最大的悲哀是青春不在,青春痘却还在。","最简单的长寿秘决:保持呼吸，不要断气~","打死我也不说，你们还没使美人计呢!","不要和我比懒,我懒得和你比","我不是个随便的人 我随便起来不是人","不怕虎一样的敌人，就怕猪一样的队友","老虎不发威 你当我是HELLO KITTY！","吃自助最高境界：扶墙进，扶墙出。","爷爷都是从孙子走过来的……","夏天就是不好，穷的时候我连西北风都没得喝","没什么事就不要找我，有事了更不要找我。","我想早恋，可是已经晚了……","钱可以解决的问题都不是问题。","天哪，我的衣服又瘦了！","不吃饱哪有力气减肥啊？","连广告也信，读书读傻了吧？","人怕出名猪怕壮，男怕没钱女怕胖。","如果有钱也是一种错，我情愿一错再错","命运负责洗牌，但是玩牌的是我们自己！","好好活着，因为我们会死很久!","人又不聪明，还学人家秃顶！","我总在牛a与牛c之间徘徊。","不怕被人利用，就怕你没用。","鄙视我的人这么多，你算老几? ","秀发去无踪，头屑更出众！","春色满园关不住，我诱红杏出墙来。","问世间情为何物？一物降一物","bmw是别摸我，msn是摸死你","女为悦己者容,男为悦己者穷！ ","念了十几年书，还是幼儿园比较好混");
var ReturnPrice140 = 1000;
var ReturnPrice150 = 20000;
var ReturnPrice160 = 10000;
var deleteSlot;
var deleteQuantity;
var nx = 0;
var ExcuteArray = Array();
var Item140 = Array(
1152108,
1003172,
1102275,
1082295,
1052314,
1072485,
1232014,
1302152,
1312065,
1322096,
1402095,
1412065,
1422066,
1432086,
1442116,
1152110,
1003173,
1102276,
1082296,
1052315,
1072486,
1212014,
1372084,
1382104,
1152111,
1003174,
1102277,
1082297,
1052316,
1072487,
1452111,
1462099,
1522018,
1152112,
1003175,
1102278,
1082298,
1052317,
1072488,
1242042,
1332130,
1362019,
1472122,
1152113,
1003176,
1102279,
1082299,
1052318,
1072489,
1222014,
1242014,
1482084,
1492085,
1532018,
1003719,
1003720,
1003721,
1003722
);
var Item150 = Array(
1212063,
1222058,
1232057,
1242060,
1242061,
1302275,
1312153,
1322203,
1332225,
1342082,
1362090,
1372177,
1382208,
1402196,
1412135,
1422140,
1432167,
1442223,
1452205,
1462193,
1472214,
1482168,
1492179,
1522094,
1532098,
1252015,
1003797,
1003798,
1003799,
1003800,
1003801,
1042254,
1042255,
1042256,
1042257,
1042258,
1062165,
1062166,
1062167,
1062168,
1062169,
1132174,
1132175,
1132176,
1132177,
1132178,
1102481,
1102482,
1102483,
1102484,
1102485,
1082543,
1082544,
1082545,
1082546,
1082547,
1072743,
1072744,
1072745,
1072746,
1072747,
1132246,
1122267,
1032223,
1032223
);
var Item160 = Array(
1012438,
1022211,
1032224,
1122269,
1132247,
1152160,
1003976,
1102623,
1082556,
1052669,
1072870,
1212089,
1222084,
1232084,
1242090,
1302297,
1312173,
1322223,
1332247,
1342090,
1362109,
1372195,
1382231,
1402220,
1412152,
1422158,
1432187,
1442242,
1452226,
1462213,
1472235,
1482189,
1492199,
1522113,
1532118,
1252033
);
var returnType = -1;
			var count = 0;


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
			var hwchance= Math.floor(Math.random()*hwtext.length);
			var selStr = "#r幽默时刻:"+hwtext[hwchance]+"#k\r\n\r\n";
			selStr += "#e#d欢迎使用装备回收系统，请选择您需要的来进行回收。每回收一件装备可以获得相当不错的奖励。例如背包里有两件150可获得2*20000=40000点卷奖励。#k#n\r\n";
			selStr += "#rPS:回收150装备可获得20000点卷奖励。回收160可获得10000点卷奖励。#k\r\n\r\n";
			//selStr += "#b#L0#"+ttt6+" 一键回收背包里140装备#k#l\r\n";
			selStr += "#b#L1#"+ttt6+" 一键回收背包里150装备#k#l\r\n";
			selStr += "#b#L2#"+ttt6+" 一键回收背包里160装备#k#l\r\n";
			cm.sendSimple(selStr);
			//cm.sendSimple("123\r\n#L0# 回收140\r\n#L1# 回收150 \r\n#L2# 回收160")
		} else if (a == 1) {
			var text = "\t\t#e- 请选择要回收的道具 -#n\r\n\r\n#b";
			var itemList = cm.getInventory(1).list().iterator();
			var indexof = 0;
			var pass= false;
			returnType = selection;
			while (itemList.hasNext()) {
				var item = itemList.next();
            	if (returnType == 0){
					for (var i =0;i < Item140.length;i++){
						if (item.getItemId() == Item140[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 1){
					for (var i =0;i < Item150.length;i++){
						if (item.getItemId() == Item150[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 2){
					for (var i =0;i < Item160.length;i++){
						if (item.getItemId() == Item160[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}
			}
			text += "\r\n#r#e#L1000# 全部回收！";
			if (pass){
			cm.sendSimple(text);
			}else{
				cm.sendOk("- #e#bGM警告：#n#k\r\n\r\n\t#r您这是坑爹呢，明明没有我想要的还来换，没见过您这么坑的。请获得后再来找我。请不要再坑我。#k");
				cm.dispose();
			}
		}else if (a == 2){
			if (selection != 1000){
				var item = cm.getInventory(1).getItem(selection);
        		deleteSlot = selection;
        		deleteQuantity = item.getQuantity();
        		text = "确定要回收#r#v" + item.getItemId() + "# #z" + item.getItemId() + "#   " + deleteQuantity + "个 #k吗？";
				cm.sendYesNo(text);
			}else{
				a = 3;
				cm.sendYesNo("#e你真的确定要回收掉所有的装备吗？！\r\n此操作不可逆请再次确认！")
			}
		}else if (a == 3){
			 if (returnType == 0){
				 nx = ReturnPrice140;
			 }else if (returnType == 1){
				 nx = ReturnPrice150;
			 }else if (returnType == 2){
				 nx = ReturnPrice160;
			 }
			 cm.removeSlot(1, deleteSlot, deleteQuantity);
			 cm.gainNX(nx);
			 cm.sendOk("回收装备成功！一共获得了"+nx+"点卷");
			 cm.worldSpouseMessage(0x20, "『随身回收』 : 玩家 " + cm.getChar().getName() + "  回收高级装备成功获得 "+nx+" 点卷！");
			 cm.dispose();
		}else if (a == 4){
			var text = "123\r\n"
			for (var i = 0; i < ExcuteArray.length;i++){
				cm.gainItem(ExcuteArray[i],-1);
			}
			if (returnType == 0){
				 nx = ReturnPrice140;
			 }else if (returnType == 1){
				 nx = ReturnPrice150;
			 }else if (returnType == 2){
				 nx = ReturnPrice160;
			 }
			 nx = nx * count;
			cm.sendOk("回收所有装备成功！一共获得了"+nx+"点卷");
			cm.worldSpouseMessage(0x20, "『随身回收』 : 玩家 " + cm.getChar().getName() + "  回收高级装备成功获得 "+nx+" 点卷！");
			cm.gainNX(nx);
			cm.dispose();
		}//a
	}
}