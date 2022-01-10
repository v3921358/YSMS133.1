/*
 副本：
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(2433646, 250), //星星100个交换券
	Array(2049752, 350), //S级潜能卷轴 30%
	Array(2433646, 450), //星星100个交换券
	Array(2433646, 300),  //星星100个交换券
	Array(2022956, 500),  //火红玫瑰
	Array(5062009, 200),  //超级魔方
	Array(5062010, 600),  //终极魔方
	Array(2340000, 550),  //高质地喇叭
	Array(5072000, 550),  //高质地喇叭
	Array(5073000, 550),  //高质地喇叭
	Array(5074000, 550),  //高质地喇叭
	Array(1003622, 100), //布莱克缤帽
	Array(1022232, 160), //布莱克缤瞳印
	Array(1052527, 100), //布莱克缤大衣
	Array(1212072, 160), //布莱克缤双头杖
	Array(1232064, 160), //布莱克缤亡命剑
	Array(1242069, 160), //布莱克缤能量剑
	Array(1302070, 160), //布莱克缤单手剑
	Array(1312142, 160), //布莱克缤单手斧
	Array(1312100, 160), //布莱克缤单手钝器
	Array(1332214, 160), //布莱克缤短刀
	Array(1342079, 160), //布莱克缤双刀
	Array(1362081, 160), //布莱克缤手杖
	Array(1372168, 160), //布莱克缤短杖
	Array(1382199, 160), //布莱克缤长杖
	Array(1402185, 160), //布莱克缤双手剑
	Array(1412126, 160), //布莱克缤双手斧
	Array(1432158, 160), //布莱克缤长枪
	Array(1442209, 160), //布莱克缤长矛
	Array(1452196, 160), //布莱克缤弓
	Array(1462184, 160), //布莱克缤弩
	Array(1472205, 160), //布莱克缤拳套
	Array(1482159, 160), //布莱克缤指节
	Array(1492170, 160), //布莱克缤短枪
	Array(1522085, 160), //布莱克缤双弩枪
	Array(1012478, 100), // - 凝聚之力结晶石
	Array(1022231, 10), //1022231 - 绚蓝水印脸饰
	Array(1022232, 10), //1022232 - 布莱克缤瞳印
	Array(1182087, 10), //1182087 - 水晶幸运徽章
	Array(1152170, 5), // 1152170 - 皇家黑色金属护肩
	Array(1132272, 50), // 1132272 - 黄金四叶草腰带
	Array(1122150, 100), // 1122150 - 统治者吊坠
	Array(1122254, 100), // 1122254 - 毒蛇终结者吊坠
	Array(1122076, 100), // 1122076 - 进阶黑暗龙王项链
	Array(1122000, 100), // 1122000 - 黑龙项环
	Array(1032241, 100), // 1032241 - 魅惑耳环
	Array(1032136, 100), // 1032136 - 地狱火焰
	Array(1113149, 100), // 1113149 - 银花戒指
	Array(4001006, 10),  //火焰羽毛
	Array(3010678, 150),  //海加顿之安息
	Array(3010680, 150),  //童话中的宫殿
	Array(3010183, 150),//胡萝卜椅子
	Array(3010184, 150),//冰钓椅子
	Array(2433646, 350),  //星星500个交换券
	Array(2433285, 350),  //
	Array(4033356, 300)  //正义火种
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("GoldTempleBoss");
    var map = eim.setInstanceMap(252030100);
    map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 8800200;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*300);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(252030100);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(984, 513));
    eim.startEventTimer(1000 * 60 * 30);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[黄金寺院拉瓦那] 进入到了挑战地图，请小心行事。");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[黄金寺院拉瓦那] 真遗憾！已超过限定挑战时间，本次挑战失败！别气馁，期待更加强大的您前来挑战~");
    eim.disposeIfPlayerBelow(100, 252030000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}




function playerRevive(eim, player) {
    var map = em.getMapFactory().getMap(252030000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 252030000);
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 252030100:
            return;
    }
	
    player.dropMessage(6, "[黄金寺院拉瓦那] 已退出挑战。");
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 252030000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 252030000);
}



function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 252030000);
		if (setupTask!=null)
			setupTask.cancel(true);
        eim.dispose();
    }
    return 0;
}


function monsterValue(eim, mobid) {
    return 1;
}


function monsterKilled(eim, player, cp) {
}


function allMonstersDead(eim) {
    if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[黄金寺院拉瓦那] 10秒后开启宝箱，掷点时请勿进行其他操作，并且需要在10秒钟内做出需求选择，否则将会被强制下线。");
		var map = eim.getMapInstance(252030100);
		map.startMapEffect("[黄金寺院拉瓦那] 已通关，10秒后将开出宝箱。", 5120059);
	}
}

function roll(eim) {
	MaxRandom = 0;
	var count = eim.getProperty("giftcount");
	var rewardPlayer = null;
	//第二次开始,统计上一次ROLL点玩家结果，并发放奖励。
	if ((count*1)>=1) {
		for (var i = 0; i < eim.getPlayerCount(); i++) {
			var charName = eim.getPlayers().get(i).getName();
			var charId = eim.getPlayers().get(i).getId();
			//推送ROLL点信息
			for (var j = 0; j < eim.getPlayerCount(); j++) {
				var notice =  "[黄金寺院拉瓦那] 玩家 "+charName+" 掷出了 "+eim.getProperty("charid_"+charId)+"点";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[黄金寺院拉瓦那] 玩家 "+charName+" 放弃了掷点";
				}
				eim.getPlayers().get(j).dropMessage(6,notice);
			}
			//不断重置最大值
			if ((eim.getProperty("charid_"+charId)*1)>MaxRandom) {
				MaxRandom = eim.getProperty("charid_"+charId);
				//置换玩家名称
				eim.setProperty("rewardplayer", charName);
				//置换玩家ID
				eim.setProperty("rewardplayerid", charId);
			} 
   		}
		for (var j = 0; j < eim.getPlayerCount(); j++) {
			//操作NPC 发放奖励
			eim.getPlayers().get(j).openNpc(1052008, 1111);
		}
	}
	for (var j = 0; j < eim.getPlayerCount(); j++) {
		//重置所有玩家ROLL点点数为零
		eim.setProperty("charid_"+eim.getPlayers().get(j).getId(),"0");
	}
	//次数+1
	eim.setProperty("giftcount", (count*1+1));
	//重新读入次数
	count = eim.getProperty("giftcount");
	count = (count*1);
	//退出战场
	if ((count*1)>10) {
		EndThisBattle(eim);
		return;
	}
	//创建几率
	var chance = Math.floor(Math.random()*600);
	//最终物品列表
	var finalItemList = Array();
	for(var m=0; m<itemList.length; m++) {
		if (itemList[m][1] >= chance) {
			finalItemList.push(itemList[m][0]);
		}
	}
	var currentItem = finalItemList[Math.floor(Math.random()*finalItemList.length)];
	switch(count) {
		case 8:
		case 9:
		case 10:
			currentItem = 2433646;
		break;
	}
	eim.setProperty("rewarditem", currentItem);
	//延迟10秒打开ROLL点NPC
	setupTask = em.schedule("openRollNpc", 1000 * 5 * 1, eim);
}

function openRollNpc(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
		eim.getPlayers().get(i).openNpc(1052008);
    }
	//10秒后继续ROLL点
	setupTask = em.schedule("roll", 1000 * 5 * 1, eim);
}

function EndThisBattle(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[黄金寺院拉瓦那] 挑战成功！");
    }
    em.setProperty("state", "done");
    eim.disposeIfPlayerBelow(100, 252030000);
	if (setupTask!=null)
		setupTask.cancel(true);
	eim.dispose();
}

function monsterDamaged(eim, player, mobid, damage) {
}

function cancelSchedule() {
	if (setupTask!=null)
		setupTask.cancel(true);
}

function leftParty(eim, player) {
    eim.disposeIfPlayerBelow(100, 252030000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 252030000);
}


function onMapLoad(eim, player) {
}

function monsterDrop(eim, player, mob) {
}