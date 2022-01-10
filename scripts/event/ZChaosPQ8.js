/* 
 * ���˶��� ��֮У԰���� [��ͨģʽ]
 */

function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(level, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("ZChaosPQ8");
    var map = eim.setInstanceMap(744000008);
    map.resetFully();

    var map1 = eim.setInstanceMap(744000014);
    map1.resetFully();
    var mob = em.getMonster(9410183);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map1.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));


    var map2 = eim.setInstanceMap(744000013);
    map2.resetFully();
    var mob = em.getMonster(9410182);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map2.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));

    var map3 = eim.setInstanceMap(744000015);
    map3.resetFully();
    var mob = em.getMonster(9410184);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map3.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));

    var map4 = eim.setInstanceMap(744000003);
    map4.resetFully();
    var mob = em.getMonster(9410178);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map4.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));

    var map5 = eim.setInstanceMap(744000002);
    map5.resetFully();
    var mob = em.getMonster(9410179);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map5.spawnMonsterOnGroundBelow(mob, new java.awt.Point(70, 240));

    var map6 = eim.setInstanceMap(744000006);
    map6.resetFully();
    for(var i = 9410147; i <= 9410151; i++){
    var mob = em.getMonster(i);
    mob.changeLevel(level);
    eim.registerMonster(mob);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    map6.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));
    }

    var map7 = eim.setInstanceMap(744000007);
    map7.resetFully();
    var mob = em.getMonster(9410171);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map7.spawnMonsterOnGroundBelow(mob, new java.awt.Point(70, 240));

    var map8 = eim.setInstanceMap(744000010);
    map8.resetFully();
    var mob = em.getMonster(9410173);
    var mob1 = em.getMonster(9410174);
    var mob2 = em.getMonster(9410175);
    var mob3 = em.getMonster(9410176);
    mob.changeLevel(level);
    mob1.changeLevel(level);
    mob2.changeLevel(level);
    mob3.changeLevel(level);
    mob.setHp(5000000);
    mob1.setHp(200000000);
    mob2.setHp(200000000);
    mob3.setHp(200000000);
    eim.registerMonster(mob);
    eim.registerMonster(mob1);
    eim.registerMonster(mob2);
    eim.registerMonster(mob3);
    map8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(80, 240));
    map8.spawnMonsterOnGroundBelow(mob1, new java.awt.Point(150, 240));
    map8.spawnMonsterOnGroundBelow(mob2, new java.awt.Point(220, 240));
    map8.spawnMonsterOnGroundBelow(mob3, new java.awt.Point(290, 240));
    for(var i = 0; i < 10 ; i++){
    var mob = em.getMonster(9410190);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));
    }

    var map9 = eim.setInstanceMap(744000009);
    map9.resetFully();
    for(var i = 9410187; i <= 9410189; i++){
    var mob = em.getMonster(i);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map9.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));
    }

    var map10 = eim.setInstanceMap(744000011);
    map10.resetFully();
    var mob = em.getMonster(9410180);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map10.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));

    var map11 = eim.setInstanceMap(744000012);
    map11.resetFully();
    var mob = em.getMonster(9410181);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map11.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));

    var map12 = eim.setInstanceMap(744000001);
    map12.resetFully();
    eim.getMapFactory().getMap(744000001).killAllMonsters(false);
    for(var i = 9410165; i <= 9410168; i++){
    var mob = em.getMonster(i);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map12.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));
    }
    map12.spawnNpc(9330192, new java.awt.Point(-160, 240));

    var map13 = eim.setInstanceMap(744000004);
    map13.resetFully();
    var mob = em.getMonster(9410177);
    mob.changeLevel(level);
    var modified = em.newMonsterStats();
    modified.setOHp(mob.getMobMaxHp() * 22000000);
    mob.setOverrideStats(modified);
    eim.registerMonster(mob);
    map13.spawnMonsterOnGroundBelow(mob, new java.awt.Point(50, 240));

    eim.startEventTimer(1000 * 60 * 5); //5 min
    return eim;
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.changeMap(map, map.getPortal(0));
    em.broadcastServerMsg(5120067, "�������û���õ����㽱�µĻ������޷��뿪������" ,true);
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid , mobId) {
    if (mapid < 744000001 || mapid > 744000015) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("state", "0");
            em.setProperty("leader", "true");
        }
    }
    if(mapid == 744000014){
    eim.schedule("end", 1000 * 0);
    }
    if(mapid == 744000013){
    eim.schedule("end1", 1000 * 0);
    }
    if(mapid == 744000015){
    eim.schedule("end2", 1000 * 0);
    }
    if(mapid == 744000003){
    eim.schedule("end3", 1000 * 0);
    }
    if(mapid == 744000002){
    eim.schedule("end4", 1000 * 0);
    }
    if(mapid == 744000006){
    eim.schedule("end5", 1000 * 0);
    }
    if(mapid == 744000007){
    eim.schedule("end6", 1000 * 0);
    }
    if(mapid == 744000004){
    eim.schedule("end7", 1000 * 0);
    }
    if(mapid == 744000010){
    eim.schedule("end8", 1000 * 0);
    }
    if(mapid == 744000009){
    eim.schedule("end9", 1000 * 0);
    }
    if(mapid == 744000011){
    eim.schedule("end10", 1000 * 0);
    }
    if(mapid == 744000012){
    eim.schedule("end11", 1000 * 0);
    }
    if(mapid == 744000001){
    eim.schedule("end12", 1000 * 0);
    }
}

function playerDisconnected(eim, player) {
    eim.disposeIfPlayerBelow(100, 744000000);
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
    eim.disposeIfPlayerBelow(100, 744000000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function clearPQ(eim) {
    scheduledTimeout(eim);
}

function allMonstersDead(eim) {
    if (eim.getMapInstance(0).getAllMonstersThreadsafe().size() == 0) {
    eim.broadcastPlayerMsg(6, "��~����Ҫ�ٴ���~�ص����Ұɣ�������ȡ��Ӧ�õĽ����ɡ�");
    }
}


function end(eim){
    //em.broadcastServerMsg(5120075, "�����������һ�㶼���ú��¡��������翼�ԡ�" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end1(eim){
    //em.broadcastServerMsg(5120072, "������ļ�������ġ�����Ҫ����ץ�ߣ�������~" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end2(eim){
    //em.broadcastServerMsg(5120074, "���뵽�˲����˵������� �����ٵ�������~�ǺǺ�" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end3(eim){
    //em.broadcastServerMsg(5120069, "�ܸ�л������⡭ �����ǿ���ѵ�����١� ��" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end4(eim){
    //em.broadcastServerMsg(5120073, "���ڲֿ��ö�������ͨ���Ұɡ� ��" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end5(eim){
    //em.broadcastServerMsg(5120076, "������!��ʬ��Ȼ��ô�࡭" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end6(eim){
    //em.broadcastServerMsg(5120067, "��Ϊ��ʦ���Բ�ԭ�´������£�����ֻ������������ֹ�㣡����" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end7(eim){
    em.broadcastServerMsg(5120067, "�ո��Ǹ�����һֱ�ڵ�˭��С�����������ҵ��谡~" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end8(eim){
    //em.broadcastServerMsg(5120064, "��δ��Ҫһ�������4����������һλ�������Ļ�������ʧ�܆���" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end9(eim){
    em.broadcastServerMsg(5120067, "�졭�졭�졭�ҵ��˲��ܲ�����~ץס���ǣ�����" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end10(eim){
    //em.broadcastServerMsg(5120071, "�ҿ��Ǹ��ѧ�ġ�������ͬѧ��" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end11(eim){
    //em.broadcastServerMsg(5120070, "��~��~��^�� �����Ұ����㡭 �����ﾲֹ����������" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function end12(eim){
    //em.broadcastServerMsg(5120063, "��Ȼ����������...���������Ծ����޷�����ġ�" ,true);
    eim.startEventTimer(1000 * 60 * 5); //5 min
}

function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {}
function cancelSchedule() {}
function monsterDrop(eim, player, mob) {}