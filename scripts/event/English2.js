/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��7��30�� 12:57:53
 �ű����ܣ�Ӣ������
 */

var letters2 = Array("��ݮ��Ӣ�ﵥ����ʲô��", "�ָ�MPֵ100��ҩˮ��ʲô��ɫ��", "������Ҫ��ʲô���ܵö����� ", "2��14����ʲô�����أ�", "������Ҫȥ���", "ʲô�ѵ������÷ֳ�һ�룿", "������Ϸ�Ļ����Ա��˭������ʾ��BiXX��", "���ֳ�Ϊһ��ħ��ʦ����Ҫ����͵ȼ��Ƕ��٣�", "ð�յ���Ӣ��������ʲô��", "��ս������ͼ��Ƕ��ټ���?");
var answers2 = Array("STRAWBERRY", "BLUE", "GAS", "VALENTINE", "HOSPITAL","EQUATOR","BIXIN","EIGHT","MAPLESTORY","FIFTY");


function init() {
    em.setProperty("state", "0");
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup() {
    em.setProperty("state", "1");

    var eim = em.newInstance("English0");
    eim.setInstanceMap(702090301).resetFully();
    eim.setInstanceMap(702090302).resetFully();
    eim.setInstanceMap(702090303).resetFully();
    var ee = java.lang.Math.floor(java.lang.Math.random() * letters.length);
    eim.setProperty("question", letters[ee]);
    eim.setProperty("answer", answers[ee]);
    eim.startEventTimer(300000); //5 mins lol

    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
    player.sendEnglishQuiz(eim.getProperty("question"));
}

function playerDead(eim, player) {
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
	case 702090301: // 1st Stage
	case 702090302: // 2nd Stage
	case 702090303: // 3rd Stage
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