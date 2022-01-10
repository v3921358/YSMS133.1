var mapId = 865030111;

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("Vergamot" + leaderid);

    eim.setProperty("vergamotSummoned", "0");

    var map = eim.setInstanceMap(mapId);
    map.resetFully();
    var overrideStats = em.newMonsterStats();
    var mob = em.getMonster(9390300);//
    var hprand = 100000000;
    overrideStats.setOHp(hprand);
    overrideStats.setOExp(500000);
    overrideStats.setOMp(500000);
    mob.setOverrideStats(overrideStats);
    mob.setHp(hprand);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(799,90)); //ˢ���������
    eim.schedule("timeout", 300 * 1000);//10���� 
    eim.schedule("beginQuest", 1000);
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function scheduledTimeout(eim) {
    end(eim);
}

function timeout(eim) {
    end(eim);
}

function changedMap(eim, player, mapid) {
    if (mapid != 865030111) {
        eim.unregisterPlayer(player);

        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    return 0;
}

function monsterValue(eim, mobId) {
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("state", "0");
        em.setProperty("leader", "true");
    }
}

function clearPQ(eim) {
    end(eim);
}

function end(eim) {
    var map = eim.getMapInstance(865030111);
    map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(1, "����ʱ�䵽��,���˳��˸���"));
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function monsterSpawn(eim) {
	 var map = eim.getMapInstance(865030111);
         if (map.getAllMonstersThreadsafe().size() <= 80) {
         var overrideStats = em.newMonsterStats();
         for (var i = 0; i < 2; i++) {
         var mob = em.getMonster(6500002);//����
         var hprand = 1000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(50000);
         overrideStats.setOMp(20000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-552,90)); //ˢ���������
         }
         for (var i = 0; i < 2; i++) {
         var mob = em.getMonster(6500002);//����
         var hprand = 1000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(50000);
         overrideStats.setOMp(200000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-631,90)); //ˢ���������
         }
         for (var i = 0; i < 2; i++) {
         var mob = em.getMonster(6500002);//����
         var hprand = 1000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(50000);
         overrideStats.setOMp(200000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-673,90)); //ˢ���������
         }
         for (var i = 0; i < 4; i++) {
         var mob = em.getMonster(6500003);//����
         var hprand = 2000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(70000);
         overrideStats.setOMp(200000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-754,90)); //ˢ���������
         }
	 eim.schedule("monsterSpawn", 10000);
         map.startMapEffect("����������10�������,��ץ������,,��ǰ������������" + map.getAllMonstersThreadsafe().size() + "", 5120031);
	 map.broadcastMessage(Packages.tools.MaplePacketCreator.getClock(10));
         } else if (map.getAllMonstersThreadsafe().size() > 80 && map.getAllMonstersThreadsafe().size() < 100 ) {
         var overrideStats = em.newMonsterStats();
         for (var i = 0; i < 2; i++) {
         var mob = em.getMonster(6500003);//����
         var hprand = 2000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(70000);
         overrideStats.setOMp(200000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-754,90)); //ˢ���������
         }
         for (var i = 0; i < 2; i++) {
         var mob = em.getMonster(6500004);//����
         var hprand = 3000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(90000);
         overrideStats.setOMp(200000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-912,90)); //ˢ���������
         }
         for (var i = 0; i < 2; i++) {
         var mob = em.getMonster(6500004);//����
         var hprand = 3000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(90000);
         overrideStats.setOMp(200000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-371,90)); //ˢ���������
         }
         for (var i = 0; i < 4; i++) {
         var mob = em.getMonster(6500004);//����
         var hprand = 3000000;
         overrideStats.setOHp(hprand);
         overrideStats.setOExp(90000);
         overrideStats.setOMp(200000);
         mob.setOverrideStats(overrideStats);
         mob.setHp(hprand);
         eim.registerMonster(mob);
         map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-206,90)); //ˢ���������
         }       
	 eim.schedule("monsterSpawn", 10000);
	 map.broadcastMessage(Packages.tools.MaplePacketCreator.getClock(10));
         map.startMapEffect("��ǰ���߹��࣬ץ������,��ǰ������������" + map.getAllMonstersThreadsafe().size() + "������100ֻ���ｫ���˳�����", 5121037);   
	 }else{      
         map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(1, "���ѱ��������ߴ�ܣ�ʧ��"));
         eim.disposeIfPlayerBelow(100, 910000000);//�˳�����
         em.setProperty("state", "0");
         em.setProperty("leader", "true");
         }
         }
function beginQuest(eim) {
	var map = eim.getMapInstance(865030111);
        map.startMapEffect("����ʱ��Ϊ10����,����������10�����������ץ������", 5121037);
	eim.schedule("monsterSpawn", 10000);
	map.broadcastMessage(Packages.tools.MaplePacketCreator.getClock(10));
}
function leftParty(eim, player) {}

function disbandParty(eim) {}

function playerDead(eim, player) {}

function cancelSchedule() {}

function monsterDrop(eim, player, mob) {}
