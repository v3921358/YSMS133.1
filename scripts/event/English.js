/*
 �ű����ܣ�Ӣ������
 */

var letters0 = Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
var answers0 = Array("APPLE", "BEAR", "CHEESE", "DOUGHNUT", "EARTH", "FLY", "GOLD", "HALLOWEEN", "ICE", "JEWELRY", "KING", "LOVE", "MOUNTAIN", "NOTE", "ORANGE", "POLICE", "QUIZ", "ROSE", "SNAKE", "TEA", "UFO", "VIP", "WOOD", "XMAS", "YOUNG", "ZZZ");

var letters1 = Array("ƻ��", "��", "����", "����", "����", "����", "��ƻ��", "ɳ��", "ը��", "����", "����", "����", "��?��", "�����", "�㳦", "��֭", "����֭", "�ָ���", "ѱ¹��", "�峿֮¶", "�ƻ�֮¶", "���ҵ���");
var answers1 = Array("APPLE", "MEAT", "EGG", "ORANGE", "LEMON", "HONEY", "GREENAPPLE", "SALAD", "FRIEDCHICKEN", "CAKE", "PIZZA", "HAMBURGER", "HOTDOG", "DRIEDSQUID", "FATSAUSAGE", "ORANGEJUICE", "GRAPEJUICE", "MELTINGCHEESE", "REINDEERMILK", "SUNRISEDEW", "SUNSETDEW", "CHEESECAKE");

var letters2 = Array("��ݮ��Ӣ�ﵥ����ʲô��", "�ָ�MPֵ100��ҩˮ��ʲô��ɫ��", "������Ҫ��ʲô���ܵö����� ", "2��14����ʲô�����أ�", "������Ҫȥ���", "ʲô�ѵ������÷ֳ�һ�룿", "������Ϸ�Ļ����Ա��˭������ʾ��BiXX��", "���ֳ�Ϊһ��ħ��ʦ����Ҫ����͵ȼ��Ƕ��٣�", "ð�յ���Ӣ��������ʲô��", "��ս������ͼ��Ƕ��ټ���?");
var answers2 = Array("STRAWBERRY", "BLUE", "GAS", "VALENTINE", "HOSPITAL","EQUATOR","BIXIN","EIGHT","MAPLESTORY","FIFTY");


function init() {
}

function monsterValue(eim, mobId) {
    return 1;
}

function setup(mapid) {

    var eim = em.newInstance("English" + mapid);
    eim.setInstanceMap(702090101 + (parseInt(mapid) * 100)).resetFully();
    eim.setInstanceMap(702090102 + (parseInt(mapid) * 100)).resetFully();
    eim.setInstanceMap(702090103 + (parseInt(mapid) * 100)).resetFully();
    
	eim.setProperty("mode", mapid);
	if (eim.getProperty("mode").equals("0")) {
		var ee = java.lang.Math.floor(java.lang.Math.random() * letters0.length);
		eim.setProperty("question", letters0[ee]);
		eim.setProperty("answer", answers0[ee]);
	} else if (eim.getProperty("mode").equals("1")) {
		var ee = java.lang.Math.floor(java.lang.Math.random() * letters1.length);
		eim.setProperty("question", letters1[ee]);
		eim.setProperty("answer", answers1[ee]);
	} else if (eim.getProperty("mode").equals("2")) {
		var ee = java.lang.Math.floor(java.lang.Math.random() * letters2.length);
		eim.setProperty("question", letters2[ee]);
		eim.setProperty("answer", answers2[ee]);
	}
    eim.startEventTimer(300000); //5 mins lol

    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
	if (eim.getProperty("mode").equals("0")) {
		player.getMap().startMapEffect("���������ĸ [" + eim.getProperty("question") + "] ��ʲô�أ�",5120008);
	} else if (eim.getProperty("mode").equals("1")) {
		player.getMap().startMapEffect("���ռ������������ĸ��  " + eim.getProperty("question") + "��",5120034);
	} else if (eim.getProperty("mode").equals("2")) {
		player.getMap().startMapEffect(eim.getProperty("question"),5120034);
	}
}

function playerDead(eim, player) {
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
	case 702090101: // 1st Stage
	case 702090102: // 2nd Stage
	case 702090103: // 3rd Stage
	case 702090201:
	case 702090202:
	case 702090203:
	case 702090301:
	case 702090302:
		case 702090303:
	    return; // Everything is fine
    }
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(2, 702090400)) {
    }
}

function playerRevive(eim, player) {
}

function playerDisconnected(eim, player) {
    return -2;
}

function leftParty(eim, player) {			
    // If only 2 players are left, uncompletable
    if (!eim.disposeIfPlayerBelow(2, 702090400)) {
	playerExit(eim, player);
    }
}

function disbandParty(eim) {
    // Boot whole party and end
    eim.disposeIfPlayerBelow(100, 702090400);
}


function scheduledTimeout(eim) {
    clearPQ(eim);
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    var exit = eim.getMapFactory().getMap(702090400);
    player.changeMap(exit, exit.getPortal(0));
    if (eim.disposeIfPlayerBelow(2, 702090400)) {
    }
}

function clearPQ(eim) {
    // KPQ does nothing special with winners
    eim.disposeIfPlayerBelow(100, 702090400);
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}