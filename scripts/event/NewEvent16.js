/* 
 * ???Խű?
 */

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("NewEvent16");
    eim.setInstanceMap(324040000).resetPQ(level);
    eim.setInstanceMap(324041000).resetPQ(level);
    eim.setInstanceMap(324042000).resetPQ(level);
    eim.setInstanceMap(324043000).resetPQ(level);
    eim.setInstanceMap(324044000).resetPQ(level);
    eim.setInstanceMap(324045000).resetPQ(level);
    eim.setInstanceMap(324046000).resetPQ(level);
    //var map = eim.setInstanceMap(262030300);
    //map.resetFully();
    //em.getMapFactory().getMap(262030300).killAllMonsters(false);
    //var mob = em.getMonster(8870100);
    //mob.changeLevel(level);
    //eim.registerMonster(mob);
    //map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(169, 196));
    eim.startEventTimer(1000 * 60 * 60); //60 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    if (mapid < 324040000 || mapid > 324046000) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
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
function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}

function allMonstersDead(eim) {
	eim.schedule("end", 1000 * 0);
}


function end(eim, player){
    em.broadcastYellowMsg("[ϵ??-???ִ?]?ѱ????ܣ???ʿ?ǽ????ˣ?");
    em.broadcastServerMsg(5120059, "[ϵ??-???ִ?]?ѱ????ܣ?????10???ڵ???NPC???ý?????" ,true);
    eim.startEventTimer(1000 * 10); //10 min
    eim.getMapInstance(5).spawnNpc(9330192, new java.awt.Point(169, 196));
	
}

function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}