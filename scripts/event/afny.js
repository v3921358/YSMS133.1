var mapId = 703200900;
var item = Array(1000050,1050227,1001076,1042081,1102453,1102390,1102389,1102278,1152112,1082298,1052317,1472122,1332130,1003175,1072488,1102385,1102385,1102385,1102385,1102386,1102386,1102386,1102386,1102368,1102367,1102367,1102367,1102367,1102367,1102367,1102367,1102367,1102358,1102358,1102358,1102358,1102358,1102358,1102358,1102355,1102355,1102355,1102355,1102355,1102355,1102355,1702368,1102451,1003677,1042237,1062043); //ϡ�е�װ
var yp = Array(166,266,166,166,166,166,66,66,66,6,66,66,66,66,166,166); //��Ʊ

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

    var mob = em.getMonster(8920000);
    var overrideStats = Packages.server.life.OverrideMonsterStats();
    var hprand = Math.floor(Math.random() * 99000000000)+61000000000;
    overrideStats.setOHp(hprand);
    overrideStats.setOExp(2147483647);
    overrideStats.setOMp(200000);
    mob.setOverrideStats(overrideStats);
    mob.setHp(hprand);
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(5,-181)); 

    eim.startEventTimer(3600000); // 4 hrs
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

function changedMap(eim, player, mapid) {
    if (mapid != 703200900) {
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

function end(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
        var iter = em.getInstances().iterator();
        while (iter.hasNext()) {
            var eim = iter.next();
            var pIter = eim.getPlayers().iterator();
            while (pIter.hasNext()) {
                var chr = pIter.next();
                //var winner = eim.getPlayers().get(0);
                var map = eim.getMapFactory().getMap(mapId);
                var randitem = Math.floor(Math.random() * item.length);
                var randyp = Math.floor(Math.random() * yp.length);
                var toDrop = new Packages.client.inventory.Item(4002000, 0, 1);
                for (var i = 0; i < yp[randyp]; i++) {
                    //map.spawnItemDrop(chr, chr, toDrop, chr.getPosition(), true, false);
		map.spawnAutoDrop(4002002,chr.getPosition());
                }
		var randx= Math.floor((Math.random()*2));
		var xwsj= Math.floor((Math.random()*20))+30;
                //toDrop = new Packages.client.inventory.Item(item[randitem], 0, 1);
                //map.spawnItemDrop(winner, winner, toDrop, winner.getPosition(), true, false);
		map.spawnAutoDrop(item[randitem],chr.getPosition());
                map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(5, "[��ء���ʾ]����ϲ���ɵ�����Ѫ��Ů���������" + yp[randyp] + "����Ʊ��ϡ�е�װ����"));
            }
        }
    }

function leftParty(eim, player) {}

function disbandParty(eim) {}

function playerDead(eim, player) {}

function cancelSchedule() {}