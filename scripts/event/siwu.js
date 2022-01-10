/*
 * ˹��11�س�������
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű� 
 INSERT INTO `drop_data` (`id`, `dropperid`, `itemid`, `minimum_quantity`, `maximum_quantity`, `questid`, `chance`) VALUES (null, '8240089', '4009159', '1', '10', '0', '99999');
 INSERT INTO `drop_data` (`id`, `dropperid`, `itemid`, `minimum_quantity`, `maximum_quantity`, `questid`, `chance`) VALUES (null, '8240089', '4009160', '1', '5', '0', '99999');
 INSERT INTO `drop_data` (`id`, `dropperid`, `itemid`, `minimum_quantity`, `maximum_quantity`, `questid`, `chance`) VALUES (null, '8240090', '4009159', '5', '8', '0', '99999');
 INSERT INTO `drop_data` (`id`, `dropperid`, `itemid`, `minimum_quantity`, `maximum_quantity`, `questid`, `chance`) VALUES (null, '8240090', '4009160', '5', '8', '0', '99999');
 */

var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var MapList = Array(
        350050100, //��ɫ���ù��� - ����ͨ��1 10����
        350050200, //��ɫ���ù��� - ����ͨ��2 10����
        350050300, //���ݣ�֮����ֹ�����������ֱ�ӽ�����һ�� -162,-25|183,-25   |8250014
        350051000, //���ݵ��� ���� D1 Z05 001
        350051050, //�����ͼ��������������һ�� �ο����� -66,61|314,61|634,61|1025,61|1349,61|950,-153
        350051100, //��������ȡ֤����4009159��4009160 ��50�������ڶ������Ϳڣ��жϡ�
        350051150, //������������ص�350051100��֮��bh_1100_check1.js �ж��Ƿ�350051150 û���ˣ�û�ֵĻ�����ǰ����������һ����ͼ
        350051200, //�����������֮����1540752��������ڣ�֮��NPC��ʧ������ǰ����֮�������һ����ͼ
        350051250, //���ǹܵ���֮��ֱ���Ƴ��ϰ�������һ����ͼ
        350060000, //�����ͼ��������������һ��
        350060160//BOSS��ͼ
        );


function init() {
    em.setProperty("state", "0");
}

function setup(level, leaderid) {
    var eim = em.newInstance("siwu");
    for (var i = 0; i < MapList.length; i++) {
        var map = eim.setInstanceMap(MapList[i]);
        map.resetPQ(level);
        map.resetFully();
        map.killAllMonsters(true);
        //map.respawn(false);
    }
    var map = eim.setInstanceMap(350050100);
    map.getPortal("in00").setScriptName("swpq1");//���ӽű����ͣ�����������⴫������
    map.getPortal("out00").setScriptName("swpq1next");//���ӽű����ͣ�����������⴫������
    var map = eim.setInstanceMap(350050200);
    map.getPortal("in00").setScriptName("swpq2");//���ӽű����ͣ�����������⴫������
    em.setProperty("state", "1");
    //�����ص�������ˢ��
    for (var i = 0; i < 10; i++) {//ˢ10ֻ
        mobid = 8230043;
        mob = em.getMonster(mobid);
        modified = em.newMonsterStats();
        modified.setOHp(500000000);
        modified.setOMp(mob.getMobMaxMp() * 2);
        mob.setOverrideStats(modified);
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(350050300);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-162, -25));
    }
    for (var i = 0; i < 10; i++) {//ˢ10ֻ
        mobid = 8230043;
        mob = em.getMonster(mobid);
        modified = em.newMonsterStats();
        modified.setOHp(500000000);
        modified.setOMp(mob.getMobMaxMp() * 2);
        mob.setOverrideStats(modified);
        eim.registerMonster(mob);
        var mapForMob = eim.getMapInstance(350050300);
        mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(183, -25));
    }
    //���Ĺع��� ÿֻ��1EѪ
    //-66,61|314,61|634,61|1025,61|1349,61|950,-153
    mobid = 8230043;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(350051050);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(950, -153));

    mobid = 8230043;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(350051050);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1349, 61));

    mobid = 8230043;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(350051050);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1025, 61));

    mobid = 8230043;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(350051050);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(634, 61));

    mobid = 8230043;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(350051050);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-66, 61));

    mobid = 8230043;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob = eim.getMapInstance(350051050);
    mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(314, 61));

    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob1 = eim.getMapInstance(350051250);
    mapForMob1.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-104, 59));

    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob2 = eim.getMapInstance(350051250);
    mapForMob2.spawnMonsterOnGroundBelow(mob, new java.awt.Point(145, 113));


    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob3 = eim.getMapInstance(350051250);
    mapForMob3.spawnMonsterOnGroundBelow(mob, new java.awt.Point(290, 196));

    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob4 = eim.getMapInstance(350051250);
    mapForMob4.spawnMonsterOnGroundBelow(mob, new java.awt.Point(458, 292));

    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob5 = eim.getMapInstance(350051250);
    mapForMob5.spawnMonsterOnGroundBelow(mob, new java.awt.Point(619, 385));

    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob6 = eim.getMapInstance(350051250);
    mapForMob6.spawnMonsterOnGroundBelow(mob, new java.awt.Point(830, 456));

    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob7 = eim.getMapInstance(350051250);
    mapForMob7.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1170, 456));

    mobid = 8240096;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob8 = eim.getMapInstance(350051250);
    mapForMob8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1449, 456));

    mobid = 8240091;
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(300000000000);
    modified.setOMp(mob.getMobMaxMp() * 2);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob8 = eim.getMapInstance(350060000);
    mapForMob8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(747, 61));



    mobid = 8240097;////��һֻ˹�� 
    mob = em.getMonster(mobid);
    modified = em.newMonsterStats();
    modified.setOHp(1000000000000);
    modified.setOMp(1000000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    var mapForMob8 = eim.getMapInstance(350060160);
    mapForMob8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-9, -16));
    eim.startEventTimer(1000 * 60 * 15);//��һ��������15���ӵ�ʱ��
    //8240089 90
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[˹�ڸ���] ���뵽����ս��ͼ����С�����¡�");
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[˹�ڸ���] ���ź����ѳ����޶���սʱ�䣬������սʧ�ܣ������٣��ڴ�����ǿ�����ǰ����ս~");
    eim.disposeIfPlayerBelow(100, 910000000);
}

function cancelSchedule() {
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) {
    /*var map = em.getMapFactory().getMap(910000000);
     if (map != null) {
     player.changeMap(map, map.getPortal(0));
     }
     eim.disposeIfPlayerBelow(100, 910000000);
     return false;
     */
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 350050100: //��ɫ���ù��� - ����ͨ��1
            em.setProperty("state", "1");
            var map = eim.getMapInstance(350050100);
            map.startMapEffect("ǰ������Ԥ��������ǰ�����ܻ���Σ�գ�����������һ����ɣ�", 5120124);
            break;
        case 350050200: //��ɫ���ù��� - ����ͨ��2
            em.setProperty("state", "2");
            var map = eim.getMapInstance(350050200);
            map.startMapEffect("�벻���㻹��ͨ���ҵĲ��飿�ߺߡ������������أ�", 5120124);
            eim.restartEventTimer(1000 * 60 * 10);//�ڶ�����10���ӵ�ʱ��
            break;
        case 350050300: //���ݣ�֮����ֹ�����������ֱ�ӽ�����һ��
            var map = eim.getMapInstance(350050300);
            map.startMapEffect("��������кڰ���Ϣ������ʲô�˻��������", 5120124);
            em.setProperty("state", "3");
            eim.restartEventTimer(1000 * 60 * 10);//��������10���ӵ�ʱ��
            break;
        case 350051000: //���ݵ��� ���� D1 Z05 001
            em.setProperty("state", "4");
            var map = eim.getMapInstance(350051000);
            map.startMapEffect("�ڰ�����Խ��Խǿ���ˣ������������Σ�ա�����", 5120124);
            eim.restartEventTimer(1000 * 60 * 45);//���Ĵ����45���ӵ�ʱ��
            break;
        case 350051100: //���ݵ��� ���� D1 Z05 001
            em.setProperty("state", "4");
            var map = eim.getMapInstance(350051100);
            map.startMapEffect("��е�Ż��ˣ����ռ�100����������֮�󽻸��ӳ��ɣ���", 5120124);
            eim.restartEventTimer(1000 * 60 * 45);//���Ĵ����45���ӵ�ʱ��
            break;
        case 350051150: //���ݵ��� ���� D1 Z05 001
            em.setProperty("state", "4");
            var map = eim.getMapInstance(350051150);
            map.startMapEffect("��е�Ż��ˣ����ռ�100����������֮�󽻸��ӳ��ɣ���", 5120124);
            break;
        case 350051200: //���������������һ�������������� ����������֮��֮����1540752��������ڣ�֮��NPC��ʧ������ǰ����֮�������һ����ͼ
            em.setProperty("state", "5");//100���������ռ����
            var map = eim.getMapInstance(350051200);
            map.startMapEffect("�ƶ������񻵵��ˣ����ȥ�ɼ��ڰ������������ɣ�", 5120124);
            eim.restartEventTimer(1000 * 60 * 15);//��������15���ӵ�ʱ��
            break;
        case 350051250: //���ǹܵ���֮��ֱ���Ƴ��ϰ�������һ����ͼ
            em.setProperty("state", "6");
            var map = eim.getMapInstance(350051250);
            map.startMapEffect("������һ�����ε�ǽ���赲�����ǰ��������", 5120124);
            eim.restartEventTimer(1000 * 60 * 10);//��������10���ӵ�ʱ��
            break;
        case 350060000: //�����ͼ��������������һ��
            em.setProperty("state", "7");
            var map = eim.getMapInstance(350060000);
            map.startMapEffect("������˭�������", 5120124);
            eim.restartEventTimer(1000 * 60 * 8);//��������8���ӵ�ʱ��
            break;
        case 350060160://BOSS��ͼ
            em.setProperty("state", "8");
            var map = eim.getMapInstance(350060160);
            map.startMapEffect("�ڰ�������צ����������������������ʲô������", 5120124);
            eim.restartEventTimer(1000 * 60 * 60);//��������1Сʱ��ʱ��
            break;
    }

    switch (mapid) {
        case 350050200: //��ɫ���ù��� - ����ͨ��2
        case 350050100: //��ɫ���ù��� - ����ͨ��1
        case 350050300: //���ݣ�֮����ֹ�����������ֱ�ӽ�����һ��
        case 350051000: //���ݵ��� ���� D1 Z05 001
        case 350051050: //�����ͼ��������������һ�� �ο����� -66,61|314,61|634,61|1025,61|1349,61|950,-153
        case 350051100: //�޹��ֱ�ӽ���
        case 350051150: //������������ص�350051100��֮��bh_1100_check1.js �ж��Ƿ�350051150 û���ˣ�û�ֵĻ�����ǰ����������һ����ͼ
        case 350051200: //���������������һ�������������� ����������֮��֮����1540752��������ڣ�֮��NPC��ʧ������ǰ����֮�������һ����ͼ
        case 350051250: //���ǹܵ���֮��ֱ���Ƴ��ϰ�������һ����ͼ
        case 350060000: //�����ͼ��������������һ��
        case 350060160://BOSS��ͼ
            return;
    }
    player.dropMessage(6, "[˹�ڸ���] ���˳���ս��");
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
    return 0;
}


function monsterValue(eim, mobid) {
    if (mobid == 8240104) {
        openNpc(eim, 9900000, 1);
        return 0;
    }
    if (mobid == 8240097) {//�ڶ�ֻֻ˹�� 
        mobid = 8240098;
        mob = em.getMonster(mobid);
        modified = em.newMonsterStats();
        modified.setOHp(2000000000000);
        modified.setOMp(mob.getMobMaxMp() * 2);
        mob.setOverrideStats(modified);
        eim.registerMonster(mob);
        var mapForMob8 = eim.getMapInstance(350060160);
        mapForMob8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-9, -16));
        return 0;
    }
    if (mobid == 8240098) {//����ֻ˹�� �涨
        mobid = 8240099;
        mob = em.getMonster(mobid);
        modified = em.newMonsterStats();
        modified.setOHp(4000000000000);
        modified.setOMp(mob.getMobMaxMp() * 2);
        mob.setOverrideStats(modified);
        eim.registerMonster(mob);
        var mapForMob8 = eim.getMapInstance(350060160);
        mapForMob8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-9, -16));
        return 0;
    }
    if (mobid == 8240099) {//˹�������ٻ�NPC
        openNpc(eim, 1540446, 2);
        return 0;
    }
    if (eim.getMapFactory().getMap(350051200).getCharactersSize() != 0) {
        return 1;
    }
    if (eim.getMapFactory().getMap(350050300).getCharactersSize() != 0) {
        if (eim.getMapFactory().getMap(350050300).getAllMonstersThreadsafe().size() == 0) {
            openNpc(eim, 1540446, 1);//���ƹ���  �Ǹ�allmonsterdead�������� ֻ��������� T.T
        }
    }
    if (eim.getMapFactory().getMap(350051050).getCharactersSize() != 0) {
        if (eim.getMapFactory().getMap(350051050).getAllMonstersThreadsafe().size() == 0) {
            openNpc(eim, 1540446, 1);//���ƹ���  �Ǹ�allmonsterdead�������� ֻ��������� T.T
        }
    }

    if (eim.getMapFactory().getMap(350051100).getCharactersSize() != 0) {
        openNpc(eim, 1540446, 5);//monsterdrop ����ʹ���ڵ�ͼԭ�еĹ��ֻ��������T.T
    }
    if (eim.getMapFactory().getMap(350051150).getCharactersSize() != 0) {
        openNpc(eim, 1540446, 5);//monsterdrop ����ʹ���ڵ�ͼԭ�еĹ��ֻ��������T.T
    }

    if (eim.getMapFactory().getMap(350051250).getCharactersSize() != 0) {
        if (eim.getMapFactory().getMap(350051250).getAllMonstersThreadsafe().size() == 0) {
            openNpc(eim, 1540446, 1);//���ƹ���  �Ǹ�allmonsterdead�������� ֻ��������� T.T
        }
    }

    if (eim.getMapFactory().getMap(350060000).getCharactersSize() != 0) {
        if (eim.getMapFactory().getMap(350060000).getAllMonstersThreadsafe().size() == 0) {
            openNpc(eim, 1540446, 1);//���ƹ���  �Ǹ�allmonsterdead�������� ֻ��������� T.T
        }
    }
    return 0;
}

function monsterKilled(eim, player, cp) {
}

function allMonstersDead(eim) {
    // openNpc(eim, 1540446, 1);//���ƹ���
}

function openNpc(eim, npcid, mode) {
    for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).openNpc(npcid, mode);
    }
}

function monsterDamaged(eim, player, mobid, damage) {
}

function cancelSchedule() {
    if (setupTask != null)
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