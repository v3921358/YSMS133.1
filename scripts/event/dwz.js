var mapId = 350033000;
var item = Array(1302081,1312037,1322060,1332073,1332074,1312038,1322061,1332075,1372045,1402047,1412034,1432049,1462051,1702208,1042213,1202003,1142502,1142500,1142496,1202025,1202028,1202033,1202034,1202038,1042142,1702372,1003390,1052416,1071026,1061148,1041142,1052201,1042078,1052422,1702155,1302081,1312037,1322060,1332073,1332074,1312038,1322061,1332075,1372045,1402047,1412034,1432049,1302081,1312037,1322060,1332073,1332074,1312038,1322061,1332075,1372045,1402047,1412034,1432049,1003666,1052372,1072680,1082448,1003667,1052373,1072681,1102349,11702379); //ϡ�е�װ
var yp = Array(1,2,3,4,4,3,4,5,4,1); //��Ʊ

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

    //var mob = em.getMonster(9600136);//
    //var overrideStats = em.newMonsterStats();
    //var hprand = Math.floor(Math.random() * 2100000000)+2100000000;
    //overrideStats.setOHp(hprand);
    //overrideStats.setOExp(2147483647);
    //overrideStats.setOMp(200000);
    //mob.setOverrideStats(overrideStats);
    //mob.setHp(hprand);
    //eim.registerMonster(mob);
    //map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(760,551)); //ˢ���������

    eim.startEventTimer(60000); // 4 hrs
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
    if (mapid != 350033000) {
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
                //var randyp = Math.floor(Math.random() * yp.length);
                //var toDrop = new Packages.client.inventory.Item(4002000, 0, 1);
                for (var i = 0; i < yp[randyp]; i++) {
                    //map.spawnItemDrop(chr, chr, toDrop, chr.getPosition(), true, false);
		map.spawnAutoDrop(4002002,chr.getPosition());
                }
		var randx= Math.floor((Math.random()*2));
		var xwsj= Math.floor((Math.random()*20))+30;
                //toDrop = new Packages.client.inventory.Item(item[randitem], 0, 1);
                //map.spawnItemDrop(winner, winner, toDrop, winner.getPosition(), true, false);
		//map.spawnAutoDrop(item[randitem],chr.getPosition());
                //map.broadcastMessage(Packages.tools.MaplePacketCreator.serverNotice(5, "��ϲ���ɵ�����Ƥ�����������" + yp[randyp] + "����Ʊ��ϡ����Ʒ����"));
            }
        }
    }

function leftParty(eim, player) {}

function disbandParty(eim) {}

function playerDead(eim, player) {}

function cancelSchedule() {}

function monsterDrop(eim, player, mob) {}