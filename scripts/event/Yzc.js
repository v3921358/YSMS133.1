/* 
 * ������
 */
function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
	//����ʵ��
    var eim = em.newInstance("Yzc");
	//ͳ�Ƹ�����ɱ��������
	eim.setProperty("pigcount", 0);
	//���Ӵ�������
	eim.setProperty("rabbits", 0);
	//ʱ���ʱ��
	eim.setProperty("times", 0);
    var map = eim.setInstanceMap(866010454);
	map.resetFully();
	eim.getMapFactory().getMap(866010454).killAllMonsters(false);
	//����һֻ����������
	var mob = em.getMonster(9302000);
	var overrideStats = em.newMonsterStats();
	var hprand = 30000000;
	overrideStats.setOHp(hprand);
	overrideStats.setOExp(500000);
	overrideStats.setOMp(200000);
	mob.setOverrideStats(overrideStats);
	mob.setHp(hprand);
	eim.registerMonster(mob);
	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(0,82)); //ˢ���������
	spawnMonster(eim);
	map.spawnNpc(9300006, new java.awt.Point(670,82));
    eim.startEventTimer(1000 * 60 * 10); // 10 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
	map.startMapEffect("һ��Ҫ�úñ������������С��ɱ���˽��������ʧ���ˣ�", 5120026);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    if (mapid != 866010454) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
		return ;
    }
}

function spawnMonster(eim) {
	var map = eim.getMapInstance(0);
	var mob = null;
	var xPoint = Array(-700,-550, -400, -250, -100, 50, 200, 350, 500, 650);
	var overrideStats = em.newMonsterStats();
	var hprand = 3000000;
	overrideStats.setOHp(hprand);
	for(var i=0;i < 10; i++) {
		mob = em.getMonster(5250003);
		mob.setOverrideStats(overrideStats);
		mob.setHp(hprand);
		eim.registerMonster(mob);
		var x = xPoint[i];
		map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(x,82)); //ˢ���������
	}
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    return 0;
}

function monsterValue(eim, mobId) {
	if (em.getProperty("state")==1) {
		if (eim.getMapInstance(0).getAllMonstersThreadsafe().size() == 1) {
			allMonstersDead(eim);
		}
		var count = 1*eim.getProperty("pigcount");
		count++;
		eim.setProperty("pigcount", count);
		if (mobId == 9302000) {
			eim.startEventTimer(1000 * 1); // 10 min
			for (var i = 0; i < eim.getPlayerCount(); i++) {
				eim.getPlayers().get(i).dropMessage(1,"������˽�����������ʧ�ܣ�");
				eim.disposeIfPlayerBelow(100, 910000000);
			}
			return;
		}
	}
    return 1;
}

function monsterKilled(eim, player, cp) {
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}
function scheduledTimeout(eim) {
	if (em.getProperty("state")!=2) {
		var map = eim.getMapInstance(0);
		em.setProperty("state", "2");
		map.killAllMonsters(true);
		eim.startEventTimer(1000 * 60 * 1); // 10 min
		//em.set
		//eim.disposeIfPlayerBelow(100, 910000000);
		map.startMapEffect("��ϲ��ɹ������˽���ȥ�ҽ��ϰ���ȡ����Ľ����ɣ�", 5120026);
		em.setProperty("leader", "true");
	} else {
		em.setProperty("state", "0");
		eim.disposeIfPlayerBelow(100, 910000000);
	}
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}

function monsterDrop(eim,player,mob){
	
	// ��������Ʒ���������
	/* //���ʿ��� 
	for (var i = 0; i < dropItems.length; i++) {
		var chance = Math.floor(Math.random() * 999999);
		if (chance < dropItems[i][2] * monsterLv && monsterLv >= dropItems[i][0]) {
			toDrop.push(new Array(dropItems[i][1], Math.floor(Math.random() * monsterLv) + 1));
		}
	}*/

	
}

function allMonstersDead(eim) {
	var map = eim.getMapInstance(0);
    //eim.getMapFactory().getMap(866010454).killAllMonsters(false);
	spawnMonster(eim);
	//}
}

function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}