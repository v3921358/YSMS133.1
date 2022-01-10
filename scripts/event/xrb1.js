/*
 副本：	消灭小日本 - 组队模式
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(2430460, 250), //
	Array(2430460, 600),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(2430866, 550),  //
	Array(2430866, 550),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(5073000, 550),  //
	Array(2049135, 300),
	Array(2049122, 100),
	Array(5074000, 550),  //
	Array(2430460, 151),  //
	Array(2430460, 180),  //
	Array(2430460, 320),  //
	Array(2430460, 200),  //
	Array(2430460, 20),  //
	Array(2430460, 140),  //
	Array(2430460, 450),  //
	Array(4001006, 350),  //火焰羽毛
	Array(1112915, 300),  //蓝调戒指
	Array(2433654, 350),  //星星500个交换券
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
	Array(1542075, 80),
	Array(1252058, 80),
	Array(1532106, 80),
	Array(1522103, 80),
	Array(1492188, 80),
	Array(1482177, 80),
	Array(1472223, 80),
	Array(1452214, 80),
	Array(1442232, 80),
	Array(1432176, 80),
	Array(1422149, 80),
	Array(1412144, 80),
	Array(1382220, 80),
	Array(1372186, 80),
	Array(1362099, 80),
	Array(1332235, 80),
	Array(1342084, 80),
	Array(1322213, 80),
	Array(1312162, 80),
	Array(1302285, 80),
	Array(1242076, 80),
	Array(1402204, 80),
	Array(1232071, 80),
	Array(1222072, 80),
	Array(1212077, 80),
	Array(1003797, 10), // - 高贵战士头盔, 150), // - (无描述)
	Array(1003798, 10), // - 高贵流丹维奇帽, 150), // - (无描述)
	Array(1003799, 10), // - 高贵游侠贝雷帽, 150), // - (无描述)
	Array(1003800, 10), // - 高贵刺客软帽, 150), // - (无描述)
	Array(1003801, 10), // - 高贵流浪者帽, 150), // - (无描述)
	Array(1042254, 10), // - 鹰眼战士盔甲, 150), // - (无描述)
	Array(1042255, 10), // - 鹰眼丹维奇长袍, 150), // - (无描述)
	Array(1042256, 10), // - 鹰眼游侠斗篷, 150), // - (无描述)
	Array(1042257, 10), // - 鹰眼刺客衬衣, 150), // - (无描述)
	Array(1042258, 10), // - 鹰眼流浪者外衣, 150), // - (无描述)
	Array(1062165, 10), // - 魔术师战士短裤, 150), // - (无描述)
	Array(1062166, 10), // - 魔术师丹维奇短裤, 150), // - (无描述)
	Array(1062167, 10), // - 魔术师游侠短裤, 150), // - (无描述)
	Array(1062168, 10), // - 魔术师刺客短裤, 150), // - (无描述)
	Array(1062169, 10) // - 魔术师流浪者短裤, 150), // - (无描述)
	//Array(1003588, 10) // 玩具粉熊帽子, 100), // (无描述)
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("xrb1");
	eim.setInstanceMap(865030113).resetPQ(level);
	var map = eim.setInstanceMap(865030113);
	map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 6500011;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	modified.setOExp(50000);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(865030113);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-524, 90));
    eim.startEventTimer(1000 * 60 * 10);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[消灭小日本] 进入到了挑战地图，请小心行事。");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[消灭小日本] 真遗憾！已超过限定挑战时间，本次挑战失败！别气馁，期待更加强大的您前来挑战~");
    eim.disposeIfPlayerBelow(100, 910000000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}




function playerRevive(eim, player) {
    var map = em.getMapFactory().getMap(910000000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 910000000);
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 865030113:
            return;
    }
	
    player.dropMessage(6, "[消灭小日本] 已退出挑战。");
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 910000000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
}



function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 910000000);
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
		eim.broadcastPlayerMsg(6, "[消灭小日本] 10秒后开启宝箱，掷点时请勿进行其他操作，并且需要在10秒钟内做出需求选择，否则将会被强制下线。");
    	//em.broadcastServerMsg(5120059, "[神话副本] 希拉已被击败，10秒后将开出宝箱。" ,true);
		var map = eim.getMapInstance(262030300);
		map.startMapEffect("[消灭小日本] 全部伊贺忍着已被击败，10秒后将开出宝箱。", 5120059);
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
				var notice =  "[组队 - 消灭小日本] 玩家 "+charName+" 掷出了 "+eim.getProperty("charid_"+charId)+"点";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[组队 - 消灭小日本] 玩家 "+charName+" 放弃了掷点";
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
			currentItem = 2430460;
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
        eim.getPlayers().get(i).dropMessage(1, "[组队 - 消灭小日本] \r\n\r\n恭喜消灭伊贺忍者成功！");
    }
	//em.broadcastYellowMsg("[神话副本] 挑战结束");
    em.setProperty("state", "done");
    eim.disposeIfPlayerBelow(100, 910000000);
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
    eim.disposeIfPlayerBelow(100, 910000000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
}


function onMapLoad(eim, player) {
}

function monsterDrop(eim, player, mob) {}