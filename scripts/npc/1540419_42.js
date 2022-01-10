//http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes

var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //获得年份
var month = ca.get(java.util.Calendar.MONTH) + 1; //获得月份
var day = ca.get(java.util.Calendar.DATE);//获取日
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE);//获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒

var status = 0;
var typed=0;
var rmb = 0;

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
				var selStr = "#r[●ω●温馨提示]：#e#b【本周福利与活动】 #k#n\r\n\r\n";
				selStr += "#d当前服务器时间: #r" + year + " #d年 #r" + month + "#d 月 #r" + day + " #d日 #r" + hour + " #d时 #r" + minute + " #d分\r\n";
				//selStr += "#d活动开启时间为：#r2015 #d年#r 6#d 月 #r1 #d日 #r00 #d时 #r01 #d分\r\n\r\n";
				selStr += "#r#L1#"+aaa+" 活动1). 周末游戏福利 #l\r\n";
				selStr += "#r#L2#"+aaa+" 活动2). 周末游戏活动  #l\r\n";
				selStr += "#b#L3#"+aaa+" 活动3). 限量极品[#r真·系法弗纳#k#b]套装（剩余 #r5 #b套）#l\r\n";
				selStr += "#b#L4#"+aaa+" 活动4). 限量极品[#r真·系 漩涡#k#b ]套装（剩余 #r5 #b套）#l\r\n";
				selStr += "#b#L5#"+aaa+" 活动5). 限量极品[#r真·系法弗纳#k#b]单件（剩余 #r3 #b件）#l\r\n\t\t";
				cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("#n#b周末福利说明#n: #r[PS:点是联系客服]#k\r\n#b福利一：#k\r\n#n周末福利【礼拜六，礼拜天】管理将在20点至22点之间 给这个时间段在线的全体玩家赠送 【 10000 点卷】的周末福利#k\r\n\r\n!");
		} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("#b\t\t\t周末活动说明：#k\r\n#n周六活动:\r\n跳跳活动,开始时间【6月13号20点20分】，结束时限为21点整\r\n活动说明：跳跳地图 火山心脏，奖励设置 第2关的终点，参与奖在第二关起点发放，\r\n#rPS管理提示 [国庆币就是现金元宝哦]#k\r\n#n奖励第1名 国庆币20个,第2-3名 国庆币15个，第4-10名 奖励国庆币 10个,小提示：【参与奖中介币5个】 \r\n\r\n#k周日活动说明：\r\n活动开启时间为 【6月14日20点30分】\r\n#r全体玩家免费进入打宝地图 享受打宝地图的特殊福利#k\r\n#b温馨提示：【点是联系客服，点否返回上一页】 ");
		} else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #e#d真.法弗纳套装系列 #k#n:#b（限量 5 套：剩余 #r5 #b套）#l\r\n#b 限量版真.法弗纳系列套装 四件套价格 #k#r1388元#k\r\n\r\n#r装备属性说明如下:#k\r\n#b#b武器#k自身两项属性 固定为 50\r\n物理攻击 天然攻击力+10攻\r\n魔法攻击 天然魔法力+10魔攻\r\n自带非潜能BOSS伤害  + 100%\r\n自带非潜能无视防御  + 50%\r\n自带非潜能总伤害    + 10%\r\n武器破功==天然上限 + 20,000,000\r\n可升级次数 固定 8 次\r\nSS潜能第一条：全属性20%\r\nSS潜能第二条：总伤害12%\r\nSS潜能第三条：BOSS伤害40%\r\n\r\n#b帽子 上衣 裤子#k \r\n自身两项属性 固定为50\r\n物理攻击 固定为 10 \r\n魔法攻击 固定为 10\r\n自带非潜能BOSS伤害  + 50%\r\n自带非潜能无视防御  + 20%\r\n自带非潜能全属性    + 20%\r\n可升级次数 ==装备天然可升级次数\r\nSS潜能第一条：全属性20%\r\nSS潜能第二条：总伤害12%\r\nSS潜能第三条：BOSS伤害40%\r\n\r\n");
		} else if (selection == 4) {
				typed=4;
				cm.sendYesNo("- #e#d真.系漩涡系列套装 #k#n:#b（限量 5 套：剩余 #r5 #b套）#l\r\n#b 限量版真.漩涡系列套装 八件套价格 #k#r2680元#k\r\n\r\n#r装备属性说明如下:#k\r\n#b#b武器#k自身四项属性 固定为50\r\n物理攻击 天然攻击力+10攻\r\n魔法攻击 天然魔法力+10魔攻\r\n自带非潜能BOSS伤害  + 100%\r\n自带非潜能无视防御  + 50%\r\n自带非潜能总伤害    + 12%\r\n武器破功==天然上限 + 50,000,000\r\n可升级次数 固定为  8 次\r\nSS潜能第一条：全属性20%\r\nSS潜能第二条：总伤害10%\r\nSS潜能第三条：BOSS伤害40%\r\n\r\n#b真.系漩涡防具#k\r\n自身四项属性 固定为 50\r\n物理攻击 天然攻击力+20攻 \r\n魔法攻击 天然魔法力+20魔力\r\n自带非潜能BOSS伤害  + 40%\r\n自带非潜能无视防御  + 10%\r\n自带非潜能全属性 + 10%\r\n可升级次数 ===天然可升级次数\r\nSS潜能第一条：全属性20%\r\nSS潜能第二条：总伤害12%\r\nSS潜能第三条：BOSS伤害40%\r\n\r\n");
		} else if (selection == 5) {
				typed=5;
				cm.sendYesNo("- #e#d真系法弗纳系列武器-防具 #k#n:#b（限量 8 件：剩余 #r3 #b件）#l\r\n#b真。法弗纳系列武器 单件价格 #r800元#k\r\n#b真。法弗纳系列防具 单件价格 #r300元#k\r\n\r\n#r装备属性说明如下:#k\r\n#b#b武器#k自身两项属性 固定为 50\r\n物理攻击 天然攻击力+10攻\r\n魔法攻击 天然魔法力+10魔攻\r\n自带非潜能BOSS伤害  + 100%\r\n自带非潜能无视防御  + 50%\r\n自带非潜能总伤害    + 10%\r\n武器破功==天然上限 + 20,000,000\r\n可升级次数 固定 8 次\r\nSS潜能第一条：全属性20%\r\nSS潜能第二条：总伤害12%\r\nSS潜能第三条：BOSS伤害40%\r\n\r\n#b帽子 上衣 裤子#k \r\n自身两项属性 固定为50\r\n物理攻击 固定为 10 \r\n魔法攻击 固定为 10\r\n自带非潜能BOSS伤害  + 50%\r\n自带非潜能无视防御  + 20%\r\n自带非潜能全属性    + 20%\r\n可升级次数 ==装备天然可升级次数\r\nSS潜能第一条：全属性20%\r\nSS潜能第二条：总伤害12%\r\nSS潜能第三条：BOSS伤害40%\r\n\r\n");
			}
		} else if (status == 2) {
			if(typed==1){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==2){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==3){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==4){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
			} else if(typed==5){
					cm.openWeb("http://wpa.qq.com/msgrd?v=3&uin=724479101&site=qq&menu=yes");
					cm.dispose();
				}
           }
      }
}