/*
 ??о?????????ƹ?????????
 ????ʱ?䣺2013??7??30?? 12:57:53
 ?ű????ܣ?Ӣ????????
 */

var letters1 = Array("ƻ??", "??", "????", "????", "????", "????", "??ƻ??", "ɳ??", "ը??", "????", "????", "????", "?ȹ?", "??????", "?㳦", "??֭", "????֭", "?ָ???", "ѱ¹??", "?峿֮¶", "?ƻ?֮¶", "???ҵ???");
var answers1 = Array("APPLE", "MEAT", "EGG", "ORANGE", "LEMON", "HONEY", "GREENAPPLE", "SALAD", "FRIEDCHICKEN", "CAKE", "PIZZA", "HAMBURGER", "HOTDOG", "DRIEDSQUID", "SAUSAGE", "ORANGEJUICE", "GRAPEJUICE", "MELTINGCHEESE", "REINDEERMILK", "SUNRISEDEW", "SUNSETDEW", "CHEESECAKE");

function init() {
    em.setProperty("state", "0");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    em.setProperty("state", "1");

    var eim = em.newInstance("English0");
    eim.setInstanceMap(702090201).resetFully();
    eim.setInstanceMap(702090202).resetFully();
    eim.setInstanceMap(702090203).resetFully();
    var ee = java.lang.Math.floor(java.lang.Math.random() * letters.length);
    eim.setProperty("question", "" + letters[ee]);
    eim.setProperty("answer", answers[ee]);
    eim.startEventTimer(300000); //5 mins lol

    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
    player.startMapEffect("???ռ?????????????ĸ??  " + eim.getProperty("question") + "??",5120034);
}

function playerDead(eim, player) {
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
	case 702090201: // 1st Stage
	case 702090202: // 2nd Stage
	case 702090203: // 3rd Stage
	    return; // Everything is fine
    }
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(2, 702090400)) {
	em.setProperty("state", "0");
    }
}

function playerRevive(eim, player) {
}

function playerDisconnected(eim, player) {
    return -2;
}

function leftParty(eim, player) {			
    // If only 2 players are left, uncompletable
    if (eim.disposeIfPlayerBelow(2, 702090400)) {
	em.setProperty("state", "0");
    } else {
	playerExit(eim, player);
    }
}

function disbandParty(eim) {
    // Boot whole party and end
    eim.disposeIfPlayerBelow(100, 702090400);

    em.setProperty("state", "0");
}


function scheduledTimeout(eim) {
    clearPQ(eim);
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    var exit = eim.getMapFactory().getMap(702090400);
    player.changeMap(exit, exit.getPortal(0));
    if (eim.disposeIfPlayerBelow(2, 702090400)) {
	em.setProperty("state", "0");
    }
}

function clearPQ(eim) {
    // KPQ does nothing special with winners
    eim.disposeIfPlayerBelow(100, 702090400);

    em.setProperty("state", "0");
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}