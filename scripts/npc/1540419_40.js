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
			cm.sendSimple("   #d亲，您还在为了无聊的要死而在挂机吗? 亲，您还在为了玩冒险岛找不到事情做吗? 因此管理员特此开放了#k#e#b 奇妙ＴＶ#n#k#d系统，在这里，您可以点击#k#e#r下面您想看的电视节目#n#k#d，目前开放的只有下类一些电台。更多的期待管理添加....#k\r\n\r\n- #e动漫频道#n\r\n#L1##b[海贼王全集观看]#k#l      #L2##b[火影忍者全集观看]#k#l\r\n#L3##b[死神全集观看吧]#k#l      #L4##r[推荐]#k#b[妖精的尾巴]#k#l\r\n\r\n- #e电影频道#n\r\n#L5##b[周润发电影全集]#k#l      #L7##b[刘德华电影全集]#k#l\r\n\r\n- #e综艺平道#n\r\n#L6##b[非诚勿扰综艺节目]#k#l    #L8##b[快乐大本营综艺节目]#k#l");					
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看大型热血动漫类型动漫#k#r[海贼王OnePiece]#k#b，此动漫目前已经正在同步连载中....#k\r\n- #e剧情介绍#n：\r\n拥有世上一切财富、声望和权力,他就是海贼王--哥鲁·D·罗杰。他临死前说的一句话,驱使全世界的人进入大海--“想要我的财富吗? 可以的。我把一切都放在那里,你们去找吧!”于是，海贼时代开始了。。。#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");		
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看大型热血动漫类型动漫#k#r[火影忍者]#k#b，此动漫目前已经正在同步连载中....#k\r\n- #e剧情介绍#n：\r\n  这是一个忍者的世界。从小身上封印着邪恶的九尾妖狐，鸣人受尽了村人的冷落，只是拼命用各种恶作剧试图吸引大家的注意力。好在还是有依鲁卡老师关心他，鸣人的性格才没有变得扭曲，他总是干劲十足；超级乐火影忍者漫画观。为了让更多的人认可自己，鸣人的目标是成为火影。鸣人的同伴，是由老师确定的同班同学，随着共同的战斗，终于成了互相认可、信赖的好伙伴。#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");
                       } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看大型热血动漫类型动漫#k#r[死神BLEACH]#k#b.已完结.#k\r\n- #e剧情介绍#n：\r\n  故事的主角黑崎一护是个看似颓废、单薄，实质上善良、勇敢、爱护家庭的《死神》海报(23张)少年，并且拥有能看见灵的体质。家里有一个开少儿诊所的老爸和两个性格正常的妹妹夏梨和游子，一护每天七点必须按时回家否则老爸便会使用“身体语言教训”的家规。吵闹的父子，懂事的妹妹以及与其他普通人并无大异的普通生活，等到露琪亚被他一脚踢到墙角并满脸惊疑地望着他问“你能看见我？”时序幕才这样被他正式地揭开。 从此黑崎一护身边所有的事物都产生了翻天覆地的变化#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");
                       } else if (selection == 4) {
				typed=4;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看大型热血动漫类型动漫#k#r[妖精的尾巴]#k#b.第一季.#k\r\n- #e剧情介绍#n：\r\n  菲奥雷王国，人口1700万的永久中立国，那里是个魔法的世界。魔法被普通的贩卖，深入人们的生活，然而有些人操纵着魔法并以此为生，人们称他们为魔导士。魔导士们隶属于不同的公会接收委托并完成工作，那样的公会在国内有很多，然而在某个城市，有某个魔导士公会，是个过去，不，直到将来仍是个孕育出许多传说的公会，它的名字叫“FAIRY TAIL”（妖精的尾巴）。#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");
                       } else if (selection == 5) {
				typed=5;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看国际巨星#k#r[周润发电影全集]#k#b..#k\r\n- #e人物介绍#n：\r\n  周润发，1955年5月18日生于香港南丫岛，国家一级演员，华人世界顶级巨星，国际巨星。他是第一位个人奋斗经历被写入中学教科书的中国演员，被誉为“演技之神”和“一个时代的坐标”。在港片鼎盛时期开启了诸多类型片先河，枪战片影响更是远播欧美，并塑造了许文强、小马哥、赌神等多个脍炙人口的经典角色；又与成龙、周星驰并称为“双周一成”，意为香港电影票房的保证。95年远赴好莱坞发展，主演了《安娜与国王》、《卧虎藏龙》等享誉全球的经典电影，曾两次担任奥斯卡颁奖嘉宾。他于本世纪初重返华语影坛，经历着演艺生涯又一个全新挑战。#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");
                         } else if (selection == 6) {
				typed=6;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看大型相亲综艺节目#k#r[非诚勿扰]#k#b.#k\r\n- #e节目介绍#n：\r\n  《非诚勿扰》是2010年1月15日中国大陆江苏卫视制作的一档婚恋交友真人秀节目，由江苏电视台新闻节目主持人孟非主持。#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");
                         } else if (selection == 7) {
				typed=7;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看国际巨星#k#r[刘德华电影全集]#k#b..#k\r\n- #e人物介绍#n：\r\n  他是香港“无线五虎”之一，参与演出的电影超过140部，先后获得三届香港电影金像奖最佳男主角奖，两届台湾电影金马奖最佳男主角奖，2012年担任第49届台湾电影金马奖评审团主席。作为巨星，他先后四次登上央视春晚舞台，享誉整个华人社会，被誉为华语娱乐圈的“常青树”。#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");
                         } else if (selection == 8) {
				typed=8;
				cm.sendYesNo("#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#\r\n\r\n #b欢迎收看大型娱乐节目#k#r[快乐大本营]#k#b..#k\r\n- #e节目介绍#n：\r\n  《快乐大本营》是湖南电视台于1997年7月11日开办的一档综艺性娱乐节目，是湖南卫视上星以来一直保持的品牌节目之一。节目开始采用全民娱乐的类型，经常邀请一些有特殊才能的人物，一些可爱的孩子来表演，后又转为选秀节目，来选举其主持人；现在多以嘉宾访谈游戏型的综艺节目，经常邀请一些中国大陆、香港、台湾的知名艺人来访谈，游戏等。是湖南卫视的品牌节目之一。观众最喜欢的综艺节目，该节目获得1998年度金鹰奖。#k\r\n\r\n- #e#r管理提示#n#k：点击是可以进行全集观看。\r\n\r\n#fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1##fEffect/CharacterEff/1112905/0/1#");		
			}
		} else if (status == 2) {
			if(typed==1){
		    cm.dispose();
                    cm.openWeb("http://www.52tian.net/html/movie/97/2023_%E6%B5%B7%E8%B4%BC%E7%8E%8B01.htm");
                        }
			if(typed==2){
		    cm.dispose();
                    cm.openWeb("http://www.52tian.net/html/movie/1/1_%E7%81%AB%E5%BD%B1%E5%BF%8D%E8%80%8501.htm");
                        }
			if(typed==3){
		    cm.dispose();
                    cm.openWeb("http://www.52tian.net/html/movie/2/149_%E6%AD%BB%E7%A5%9E01.htm");
                        }
			if(typed==4){
		    cm.dispose();
                    cm.openWeb("http://www.52tian.net/html/movie/2527/45795_%E5%A6%96%E7%B2%BE%E7%9A%84%E5%B0%BE%E5%B7%B401.htm");
                        }
			if(typed==5){
		    cm.dispose();
                    cm.openWeb("http://www.yiyi.cc/film18/zhourunfadianying/");
                        }
			if(typed==7){
		    cm.dispose();
                    cm.openWeb("http://www.yiyi.cc/film1/liudehuadianyingquanji/");
                        }
			if(typed==6){
		    cm.dispose();
                    cm.openWeb("http://www.yiyi.cc/film8/9097/");
                        }
			if(typed==8){
		    cm.dispose();
                    cm.openWeb("http://ent.hdol.cn/Html/zhibo/18985.html");
                        }
                }
	}
}
