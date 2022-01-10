/*
 副本：	麦格纳斯
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(4310058, 550), //
	Array(2049752, 350), //S级潜能卷轴 30%
	Array(5062010, 600),  //终极魔方
	Array(5062010, 550),  //终极魔方
	Array(5062010, 550),  //终极魔方
	Array(4310058, 550),  //终极魔方
	Array(5062010, 550),  //终极魔方
	Array(5062010, 550),  //终极魔方
	Array(5062010, 550),  //终极魔方
	Array(2340000, 550),  //
	Array(5072000, 550),  //
	Array(5073000, 550),  //
	Array(5074000, 550),  //
	Array(4001006, 350),  //火焰羽毛
	Array(2433654, 350),  //星星500个交换券
	Array(2433285, 350),  //
	Array(1032205, 150),  //神话耳环
	Array(4033356, 300),  //正义火种
	Array(1432086, 150), // - 狮心长枪, 150), // - (无描述)
	Array(1302152, 150), // - 狮心弯刀, 150), // - (无描述)
	Array(1522018, 150), // - 龙翼巨弩枪, 150), // - (无描述)
	Array(1232014, 150), // - 狮心痛苦命运, 150), // - (无描述)
	Array(1322096, 150), // - 狮心震雷钉, 150), // - (无描述)
	Array(1402095, 150), // - 狮心战斗弯刀, 150), // - (无描述)
	Array(1372084, 150), // - 龙尾精灵短杖, 150), // - (无描述)
	Array(1382104, 150), // - 龙尾战斗长杖, 150), // - (无描述)
	Array(1212014, 150), // - 龙尾黑甲凶灵, 150), // - (无描述)
	Array(1452111, 150), // - 鹰翼组合弓, 150), // - (无描述)
	Array(1462099, 150), // - 鹰翼重弩, 150), // - (无描述)
	Array(1242042, 150), // - 渡鸦之魂女王意志之剑, 150), // - (无描述)
	Array(1332130, 150), // - 渡鸦之魂短刀, 150), // - (无描述)
	Array(1362019, 150), // - 渡鸦之魂真红手杖, 150), // - (无描述)
	Array(1482084, 150), // - 鲨齿巨鹰爪, 150), // - (无描述)
	Array(1492085, 150), // - 鲨齿锐利手铳, 150), // - (无描述)
	Array(1532018, 150), // - 鲨齿火焰炮, 150), // - (无描述)
	Array(1222014, 150), // - 鲨齿灵魂汲取者, 150), // - (无描述)
	Array(1242014, 150), // - 鲨齿女王意志之剑, 150), // - (无描述)
	Array(1052314, 150), // - 狮心战斗锁子甲, 150), // - (无描述)
	Array(1052315, 150), // - 龙尾法师长袍, 150), // - (无描述)
	Array(1052316, 150), // - 鹰翼哨兵服, 150), // - (无描述)
	Array(1052317, 150), // - 渡鸦之魂追踪者盔甲, 150), // - (无描述)
	Array(1052318, 150), // - 鲨齿船长外套, 150), // - (无描述)
	Array(1082296, 150), // - 龙尾法师手套, 150), // - (无描述)
	Array(1082297, 150), // - 鹰翼哨兵手套, 150), // - (无描述)
	Array(1082298, 150), // - 渡鸦之魂追踪者手套, 150), // - (无描述)
	Array(1082299, 150), // - 鲨齿船长手套, 150), // - (无描述)
	Array(1082295, 150), // - 狮心战斗护腕, 150), // - (无描述)
	Array(1152110, 150), // - 龙尾法师护肩, 150), // - (无描述)
	Array(1152111, 150), // - 鹰翼哨兵护肩, 150), // - (无描述)
	Array(1152112, 150), // - 渡鸦之魂猎人护肩, 150), // - (无描述)
	Array(1152113, 150), // - 鲨齿船长护肩, 150), // - (无描述)
	Array(1152108, 150), // - 狮心战斗护肩, 150), // - (无描述)
	Array(1102275, 150), // - 狮心战斗披风, 150), // - (无描述)
	Array(1102276, 150), // - 龙尾法师披风, 150), // - (无描述)
	Array(1102277, 150), // - 鹰翼哨兵披风, 150), // - (无描述)
	Array(1102278, 150), // - 渡鸦之魂猎人披风, 150), // - (无描述)
	Array(1102279, 150), // - 鲨齿船长披风, 150), // - (无描述)
	Array(1003172, 150), // - 狮心战斗头盔, 150), // - (无描述)
	Array(1003173, 150), // - 龙尾法师帽子, 150), // - (无描述)
	Array(1003174, 150), // - 鹰翼哨兵便帽, 150), // - (无描述)
	Array(1003175, 150), // - 渡鸦之魂追踪者帽, 150), // - (无描述)
	Array(1003176, 150), // - 鲨齿船长帽, 150), // - (无描述)
	Array(1072485, 150), // - 狮心战斗鞋, 150), // - (无描述)
	Array(1072486, 150), // - 龙尾法师鞋, 150), // - (无描述)
	Array(1072487, 150), // - 鹰翼哨兵鞋, 150), // - (无描述)
	Array(1072488, 150), // - 渡鸦之魂追踪者鞋, 150), // - (无描述)
	Array(1072489, 150), // - 鲨齿船长鞋, 150), // - (无描述)
	Array(1003797, 80), // - 高贵战士头盔, 150), // - (无描述)
	Array(1003798, 80), // - 高贵流丹维奇帽, 150), // - (无描述)
	Array(1003799, 80), // - 高贵游侠贝雷帽, 150), // - (无描述)
	Array(1003800, 80), // - 高贵刺客软帽, 150), // - (无描述)
	Array(1003801, 80), // - 高贵流浪者帽, 150), // - (无描述)
	Array(1042254, 80), // - 鹰眼战士盔甲, 150), // - (无描述)
	Array(1042255, 80), // - 鹰眼丹维奇长袍, 150), // - (无描述)
	Array(1042256, 80), // - 鹰眼游侠斗篷, 150), // - (无描述)
	Array(1042257, 80), // - 鹰眼刺客衬衣, 150), // - (无描述)
	Array(1042258, 80), // - 鹰眼流浪者外衣, 150), // - (无描述)
	Array(1062165, 80), // - 魔术师战士短裤, 150), // - (无描述)
	Array(1062166, 80), // - 魔术师丹维奇短裤, 150), // - (无描述)
	Array(1062167, 80), // - 魔术师游侠短裤, 150), // - (无描述)
	Array(1062168, 80), // - 魔术师刺客短裤, 150), // - (无描述)
	Array(1062169, 80) // - 魔术师流浪者短裤, 150), // - (无描述)
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("ZChaosPQ1");
	eim.setInstanceMap(401060100).resetPQ(level);
    eim.setInstanceMap(401060100).resetPQ(level);
    eim.getMapFactory().getMap(401060100).killAllMonsters(false);
    var map = eim.setInstanceMap(401060100);
    map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 8880000;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*200);
	modified.setOMp(mob.getMobMaxMp()*9999);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(401060100);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1647, -1347));
    eim.startEventTimer(1000 * 60 * 60);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[暴君 - 麦格拉斯] 进入到了危险挑战地图，请小心行事。");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[暴君 - 麦格拉斯] 真遗憾！已超过限定挑战时间，本次挑战失败！别气馁，期待更加强大的您前来挑战~");
    eim.disposeIfPlayerBelow(100, 401072000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}




function playerRevive(eim, player) {
    var map = em.getMapFactory().getMap(401072000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 401072000);
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 401060100:
            return;
    }
	
    player.dropMessage(6, "[暴君 - 麦格拉斯] 已退出挑战。");
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 401072000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 401072000);
}



function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 401072000);
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
		eim.broadcastPlayerMsg(6, "[暴君 - 麦格拉斯] 10秒后开启宝箱，掷点时请勿进行其他操作，并且需要在10秒钟内做出需求选择，否则将会被强制下线。");
		var map = eim.getMapInstance(401060100);
		map.startMapEffect("[暴君 - 麦格拉斯] 已被击败，10秒后将开出宝箱。", 5120059);
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
				var notice =  "[暴君 - 麦格拉斯] 玩家 "+charName+" 掷出了 "+eim.getProperty("charid_"+charId)+"点";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[暴君 - 麦格拉斯] 玩家 "+charName+" 放弃了掷点";
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
			currentItem = 4310058;
		break;
	}
	eim.setProperty("rewarditem", currentItem);
	//延迟10秒打开ROLL点NPC
	setupTask = em.schedule("openRollNpc", 1000 * 10 * 1, eim);
}

function openRollNpc(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
		eim.getPlayers().get(i).openNpc(1052008);
    }
	//10秒后继续ROLL点
	setupTask = em.schedule("roll", 1000 * 10 * 1, eim);
}

function EndThisBattle(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[暴君 - 麦格拉斯] 挑战成功！");
    }
    em.setProperty("state", "done");
    eim.disposeIfPlayerBelow(100, 401072000);
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
    eim.disposeIfPlayerBelow(100, 401072000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 401072000);
}


function onMapLoad(eim, player) {
}

function monsterDrop(eim, player, mob) {
}