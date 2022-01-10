/*
 副本：	森兰丸副本
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(4310156, 400), //埃苏莱布斯币
	Array(4033287, 500), //宝物地图
	Array(4033288, 500), //古代宝物的地图
	Array(5062500, 500), //大师附加神奇魔方
	Array(2049124, 100), //正向混沌卷轴
	Array(4033356, 300),  //正义火种
	Array(5062010, 600),  //终极魔方
	Array(5062010, 500),  //终极魔方
	Array(5062010, 500),  //终极魔方
	Array(5062010, 500),  //终极魔方
	Array(5062010, 500),  //终极魔方
	Array(5062010, 500),  //终极魔方
	Array(5062010, 500),  //终极魔方
	Array(2340000, 200),  //
	Array(5072000, 200),  //
	Array(5073000, 200),  //
	Array(5074000, 200),  //
	Array(1432086, 300), // - 狮心长枪, 300), // - (无描述)
	Array(1302152, 300), // - 狮心弯刀, 300), // - (无描述)
	Array(1522018, 300), // - 龙翼巨弩枪, 300), // - (无描述)
	Array(1232014, 300), // - 狮心痛苦命运, 300), // - (无描述)
	Array(1322096, 300), // - 狮心震雷钉, 300), // - (无描述)
	Array(1402095, 300), // - 狮心战斗弯刀, 300), // - (无描述)
	Array(1372084, 300), // - 龙尾精灵短杖, 300), // - (无描述)
	Array(1382104, 300), // - 龙尾战斗长杖, 300), // - (无描述)
	Array(1212014, 300), // - 龙尾黑甲凶灵, 300), // - (无描述)
	Array(1452111, 300), // - 鹰翼组合弓, 300), // - (无描述)
	Array(1462099, 300), // - 鹰翼重弩, 300), // - (无描述)
	Array(1242042, 300), // - 渡鸦之魂女王意志之剑, 300), // - (无描述)
	Array(1332130, 300), // - 渡鸦之魂短刀, 300), // - (无描述)
	Array(1362019, 300), // - 渡鸦之魂真红手杖, 300), // - (无描述)
	Array(1482084, 300), // - 鲨齿巨鹰爪, 300), // - (无描述)
	Array(1492085, 300), // - 鲨齿锐利手铳, 300), // - (无描述)
	Array(1532018, 300), // - 鲨齿火焰炮, 300), // - (无描述)
	Array(1222014, 300), // - 鲨齿灵魂汲取者, 300), // - (无描述)
	Array(1242014, 300), // - 鲨齿女王意志之剑, 300), // - (无描述)
	Array(1052314, 300), // - 狮心战斗锁子甲, 300), // - (无描述)
	Array(1052315, 300), // - 龙尾法师长袍, 300), // - (无描述)
	Array(1052316, 300), // - 鹰翼哨兵服, 300), // - (无描述)
	Array(1052317, 300), // - 渡鸦之魂追踪者盔甲, 300), // - (无描述)
	Array(1052318, 300), // - 鲨齿船长外套, 300), // - (无描述)
	Array(1082296, 300), // - 龙尾法师手套, 300), // - (无描述)
	Array(1082297, 300), // - 鹰翼哨兵手套, 300), // - (无描述)
	Array(1082298, 300), // - 渡鸦之魂追踪者手套, 300), // - (无描述)
	Array(1082299, 300), // - 鲨齿船长手套, 300), // - (无描述)
	Array(1082295, 300), // - 狮心战斗护腕, 300), // - (无描述)
	Array(1152110, 300), // - 龙尾法师护肩, 300), // - (无描述)
	Array(1152111, 300), // - 鹰翼哨兵护肩, 300), // - (无描述)
	Array(1152112, 300), // - 渡鸦之魂猎人护肩, 300), // - (无描述)
	Array(1152113, 300), // - 鲨齿船长护肩, 300), // - (无描述)
	Array(1152108, 300), // - 狮心战斗护肩, 300), // - (无描述)
	Array(1102275, 300), // - 狮心战斗披风, 300), // - (无描述)
	Array(1102276, 300), // - 龙尾法师披风, 300), // - (无描述)
	Array(1102277, 300), // - 鹰翼哨兵披风, 300), // - (无描述)
	Array(1102278, 300), // - 渡鸦之魂猎人披风, 300), // - (无描述)
	Array(1102279, 300), // - 鲨齿船长披风, 300), // - (无描述)
	Array(1003172, 300), // - 狮心战斗头盔, 300), // - (无描述)
	Array(1003173, 300), // - 龙尾法师帽子, 300), // - (无描述)
	Array(1003174, 300), // - 鹰翼哨兵便帽, 300), // - (无描述)
	Array(1003175, 300), // - 渡鸦之魂追踪者帽, 300), // - (无描述)
	Array(1003176, 300), // - 鲨齿船长帽, 300), // - (无描述)
	Array(1072485, 300), // - 狮心战斗鞋, 300), // - (无描述)
	Array(1072486, 300), // - 龙尾法师鞋, 300), // - (无描述)
	Array(1072487, 300), // - 鹰翼哨兵鞋, 300), // - (无描述)
	Array(1072488, 300), // - 渡鸦之魂追踪者鞋, 300), // - (无描述)
	Array(1072489, 300), // - 鲨齿船长鞋, 300), // - (无描述)
	Array(2049323, 300), //高级装备强化卷
	Array(2049752, 300), //S级潜能卷轴 30%
	Array(1122149, 100), //烈日吊坠
	Array(1122148, 100), //烈日吊坠
	Array(3010895, 200), // 阿卡伊勒童话书椅子, 100), // 感觉和阿卡伊勒的关系好像变得亲近一些的椅子。每10秒HP恢复100，MP恢复50。
	Array(3010896, 200), // 我的女皇椅子, 100), // 可以感觉到女王的火热人气的椅子。每10秒HP恢复100，MP恢复50。
	Array(3010897, 200), // 生日快乐，恶魔, 100), // 坐在椅子上的恶魔猎手的表情感觉很奇怪。每10秒HP恢复100，MP恢复50。
	Array(3010898, 100), // 迷你神兽椅子, 100), // 坐在迷你神兽椅子上时，每10秒HP恢复50，MP恢复50。
	Array(3010899, 100), // 摆钟椅子, 100), // 坐在钟摆椅子上时，每10秒HP恢复50，MP恢复50。
	Array(3010900, 200), // 宝石枫叶椅子, 100), // 用宝石做成的闪亮枫叶椅子。坐下后每10秒恢复HP 40, MP 20。
	Array(3010901, 200), // 热情的红色药水椅子, 100), // 和其他药水椅子相比，可以更快地恢复HP的红色药水椅子。每10秒HP恢复110，MP恢复50。
	Array(3010902, 200), // 新鲜的蓝色药水椅子, 100), // 和其他药水椅子相比，可以更快地恢复MP的蓝色药水椅子。每10秒HP恢复100，MP恢复60。
	Array(3010903, 200), // 兔子椅子, 100), // 坐在上面，每10秒HP恢复100，MP恢复50的兔子椅子。
	Array(3010904, 200), // 椰子树沙滩椅, 100), // 放在阿里安特凉爽的椰子树下的沙滩椅。坐在上面，每10秒HP恢复40，MP恢复20。
	//Array(3010905, 200), // 柿子树鞦韆, 100), // 吊挂在挂满成熟柿子的柿子树上的鞦韆。
	Array(3010906, 200), // 云朵洗手间椅子, 100), // 装修豪华的洗手间。里面一切应有尽有。每10秒HP恢复100，MP恢复50。
	Array(3010907, 200), // 公沙沙兔靠垫, 100), // 靠着可爱的公沙沙兔坐着，每10秒HP恢复60。
	Array(3010908, 200), // 海蓝天鹅绒沙发, 100), // 奢华的海蓝色天鹅绒沙发。坐在上面，每10秒HP恢复60。
	Array(3010909, 200), // 红色设计师椅子, 100), // 采用明亮红色的设计师椅子。坐在上面，每10秒HP恢复60。
	//Array(3010910, 200), // 艾莉珍椅子, 100), // 可以成为可爱的少女艾莉珍的好朋友。每10秒HP恢复50，MP恢复50。
	Array(3010911, 200), // 红帽月妙抱枕椅, 100), // 坐在抱枕椅上就可以看到戴著红色帽子的可爱月妙的才艺。
	Array(3010912, 200), // 蓝帽月妙抱枕椅, 100), // 坐在抱枕椅上就可以看到戴著蓝色帽子的可爱月妙的才艺。
	Array(3010913, 200), // 扇子月妙抱枕椅, 100), // 坐在抱枕椅上就可以观赏拿著扇子走绳索的月妙的才艺。
	Array(3010914, 200), // 太平萧月妙抱枕椅, 100), // 坐在抱枕椅上就可以观赏史出浑身力量演奏的月妙。
	Array(3010915, 200), // 恶灵附身的娃娃椅子, 100), // 恶灵附身的娃娃椅子。坐在上面，每10秒HP恢复50。
	Array(3010916, 200), // 粉红沙滩遮阳伞, 100), // 让人想起凉爽的大海的粉红色沙滩遮阳伞。坐在上面，每10秒HP恢复60。
	Array(3010917, 200), // 红色龙椅, 100), // 有严肃的火龙相伴的椅子。每10秒HP恢复50，MP恢复50。
	Array(3010918, 200), // 蓝色龙椅, 100), // 有严苛的青龙相伴的椅子。每10秒HP恢复50，MP恢复50。
	Array(3010919, 200), // 精灵王座, 100), // 为精灵之王制作的椅子。每10秒HP恢复100，MP恢复50。
	Array(3010920, 200), // 水晶月亮, 100), // 怪盗幻影专用椅子，坐下去后每10秒都能恢复HP。
	Array(3010921, 10), // 彩蛋篮子, 100), // 篮子中塞满五彩缤纷的彩蛋!\n每10秒钟恢复HP40,MP40.
	Array(3010922, 10), // 悠长假期(红色), 100), // 坐在上面可享受悠闲的红色悠长假期,每10秒钟恢复MP 20.
	Array(3010923, 10), // 10周年椅子, 100), // 为纪念冒险岛10周年而制作的巨无霸椅子。每10秒钟，HP和MP各恢复50.
	
	Array(1132164, 10), //赫里希安精锐战士腰带
	Array(1132165, 10), //赫里希安精锐法师腰带
	Array(1132166, 10), //赫里希安精锐弓箭手腰带
	Array(1132167, 10), //赫里希安精锐飞侠腰带
	Array(1132168, 10), //赫里希安精锐海盗腰带
	Array(1102471, 10), //赫里希安精锐战士披风
	Array(1102472, 10), //赫里希安精锐法师披风
	Array(1102473, 10), //赫里希安精锐弓箭手披风
	Array(1102474, 10), //赫里希安精锐飞侠披风
	Array(1102475, 10) //赫里希安精锐海盗披风
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("slw");
	eim.setInstanceMap(807300200).resetPQ(level);
    var map = eim.setInstanceMap(807300210);
    map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 9421586;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*50);
	modified.setOMp(mob.getMobMaxMp()*99);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(807300210);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(219, 123));
	var map2 = eim.getMapInstance(807300200);
	mobid = 9421562;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map2.spawnMonsterOnGroundBelow(mob, new java.awt.Point(257, 1038));
	var map3 = eim.getMapInstance(807300200);
	mobid = 9421563;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map3.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-125, 978));
	var map4 = eim.getMapInstance(807300200);
	mobid = 9421567;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map4.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-488, 978));
	var map5 = eim.getMapInstance(807300200);
	mobid = 9421569;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map5.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-125, 978));
	var map6 = eim.getMapInstance(807300200);
	mobid = 9421570;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map6.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-488, 978));
    eim.startEventTimer(1000 * 60 * 60);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[森兰丸副本] 进入到了挑战地图，请小心行事。");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[森兰丸副本] 真遗憾！已超过限定挑战时间，本次挑战失败！别气馁，期待更加强大的您前来挑战~");
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
		case 807300200:
		case 807300210:
            return;
    }
	
    player.dropMessage(6, "[森兰丸副本] 已退出挑战。");
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
//var map = eim.getMapInstance(0);
//map.killAllMonsters(true);
if (mobid == 9421589) {
			if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[森兰丸副本] 10秒后开启宝箱，掷点时请勿进行其他操作，并且需要在10秒钟内做出需求选择，否则将会被强制下线。");
		var map = eim.getMapInstance(807300210);
		map.startMapEffect("[森兰丸副本] 森兰丸已被击败，10秒后将开出宝箱。", 5122015);
			return;
		}
}   
return 1;
}


function monsterKilled(eim, player, cp) {
}


function allMonstersDead(eim) {
    /*if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[森兰丸副本] 10秒后开启宝箱，掷点时请勿进行其他操作，并且需要在10秒钟内做出需求选择，否则将会被强制下线。");
		var map = eim.getMapInstance(807300210);
		map.startMapEffect("[森兰丸副本] 森兰丸已被击败，10秒后将开出宝箱。", 5120059);
	}
	*/
	/*if (eim.getMapInstance(0).getAllMonstersThreadsafe().size() == 0) {
		if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[森兰丸副本] 10秒后开启宝箱，掷点时请勿进行其他操作，并且需要在10秒钟内做出需求选择，否则将会被强制下线。");
		var map = eim.getMapInstance(807300210);
		map.startMapEffect("[森兰丸副本] 森兰丸已被击败，10秒后将开出宝箱。", 5120059);
	}*/
    //}
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
				var notice =  "[森兰丸副本] 玩家 "+charName+" 掷出了 "+eim.getProperty("charid_"+charId)+"点";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[森兰丸副本] 玩家 "+charName+" 放弃了掷点";
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
			currentItem = 4310156;
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
	setupTask = em.schedule("roll", 1000 * 10 * 1, eim);
}

function EndThisBattle(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[森兰丸副本] 挑战成功！");
    }
	//em.broadcastYellowMsg("[森兰丸副本] 挑战结束");
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

function monsterDrop(eim, player, mob) {
}