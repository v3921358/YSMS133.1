/*
 ������	����С�ձ� - ���ģʽ
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(2430460, 250), //
	Array(2430460, 600),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(2430866, 550),  //
	Array(2430866, 550),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(2430460, 550),  //
	Array(5073000, 550),  //
	Array(2049135, 300),
	Array(2049122, 100),
	Array(5074000, 550),  //
	Array(2430460, 151),  //
	Array(2430460, 180),  //
	Array(2430460, 320),  //
	Array(2430460, 200),  //
	Array(2430460, 20),  //
	Array(2430460, 140),  //
	Array(2430460, 450),  //
	Array(4001006, 350),  //������ë
	Array(1112915, 300),  //������ָ
	Array(2433654, 350),  //����500������ȯ
	Array(4033356, 300),  //�������
	Array(1432086, 150), // - ʨ�ĳ�ǹ, 150), // - (������)
	Array(1302152, 150), // - ʨ���䵶, 150), // - (������)
	Array(1522018, 150), // - �������ǹ, 150), // - (������)
	Array(1232014, 150), // - ʨ��ʹ������, 150), // - (������)
	Array(1322096, 150), // - ʨ�����׶�, 150), // - (������)
	Array(1402095, 150), // - ʨ��ս���䵶, 150), // - (������)
	Array(1372084, 150), // - ��β�������, 150), // - (������)
	Array(1382104, 150), // - ��βս������, 150), // - (������)
	Array(1212014, 150), // - ��β�ڼ�����, 150), // - (������)
	Array(1452111, 150), // - ӥ����Ϲ�, 150), // - (������)
	Array(1462099, 150), // - ӥ������, 150), // - (������)
	Array(1242042, 150), // - ��ѻ֮��Ů����־֮��, 150), // - (������)
	Array(1332130, 150), // - ��ѻ֮��̵�, 150), // - (������)
	Array(1362019, 150), // - ��ѻ֮���������, 150), // - (������)
	Array(1482084, 150), // - ��ݾ�ӥצ, 150), // - (������)
	Array(1492085, 150), // - ����������, 150), // - (������)
	Array(1532018, 150), // - ��ݻ�����, 150), // - (������)
	Array(1222014, 150), // - �����꼳ȡ��, 150), // - (������)
	Array(1242014, 150), // - ���Ů����־֮��, 150), // - (������)
	Array(1052314, 150), // - ʨ��ս�����Ӽ�, 150), // - (������)
	Array(1052315, 150), // - ��β��ʦ����, 150), // - (������)
	Array(1052316, 150), // - ӥ���ڱ���, 150), // - (������)
	Array(1052317, 150), // - ��ѻ֮��׷���߿���, 150), // - (������)
	Array(1052318, 150), // - ��ݴ�������, 150), // - (������)
	Array(1082296, 150), // - ��β��ʦ����, 150), // - (������)
	Array(1082297, 150), // - ӥ���ڱ�����, 150), // - (������)
	Array(1082298, 150), // - ��ѻ֮��׷��������, 150), // - (������)
	Array(1082299, 150), // - ��ݴ�������, 150), // - (������)
	Array(1082295, 150), // - ʨ��ս������, 150), // - (������)
	Array(1152110, 150), // - ��β��ʦ����, 150), // - (������)
	Array(1152111, 150), // - ӥ���ڱ�����, 150), // - (������)
	Array(1152112, 150), // - ��ѻ֮�����˻���, 150), // - (������)
	Array(1152113, 150), // - ��ݴ�������, 150), // - (������)
	Array(1152108, 150), // - ʨ��ս������, 150), // - (������)
	Array(1102275, 150), // - ʨ��ս������, 150), // - (������)
	Array(1102276, 150), // - ��β��ʦ����, 150), // - (������)
	Array(1102277, 150), // - ӥ���ڱ�����, 150), // - (������)
	Array(1102278, 150), // - ��ѻ֮����������, 150), // - (������)
	Array(1102279, 150), // - ��ݴ�������, 150), // - (������)
	Array(1003172, 150), // - ʨ��ս��ͷ��, 150), // - (������)
	Array(1003173, 150), // - ��β��ʦñ��, 150), // - (������)
	Array(1003174, 150), // - ӥ���ڱ���ñ, 150), // - (������)
	Array(1003175, 150), // - ��ѻ֮��׷����ñ, 150), // - (������)
	Array(1003176, 150), // - ��ݴ���ñ, 150), // - (������)
	Array(1072485, 150), // - ʨ��ս��Ь, 150), // - (������)
	Array(1072486, 150), // - ��β��ʦЬ, 150), // - (������)
	Array(1072487, 150), // - ӥ���ڱ�Ь, 150), // - (������)
	Array(1072488, 150), // - ��ѻ֮��׷����Ь, 150), // - (������)
	Array(1072489, 150), // - ��ݴ���Ь, 150), // - (������)
	Array(1542075, 80),
	Array(1252058, 80),
	Array(1532106, 80),
	Array(1522103, 80),
	Array(1492188, 80),
	Array(1482177, 80),
	Array(1472223, 80),
	Array(1452214, 80),
	Array(1442232, 80),
	Array(1432176, 80),
	Array(1422149, 80),
	Array(1412144, 80),
	Array(1382220, 80),
	Array(1372186, 80),
	Array(1362099, 80),
	Array(1332235, 80),
	Array(1342084, 80),
	Array(1322213, 80),
	Array(1312162, 80),
	Array(1302285, 80),
	Array(1242076, 80),
	Array(1402204, 80),
	Array(1232071, 80),
	Array(1222072, 80),
	Array(1212077, 80),
	Array(1003797, 10), // - �߹�սʿͷ��, 150), // - (������)
	Array(1003798, 10), // - �߹�����ά��ñ, 150), // - (������)
	Array(1003799, 10), // - �߹���������ñ, 150), // - (������)
	Array(1003800, 10), // - �߹�̿���ñ, 150), // - (������)
	Array(1003801, 10), // - �߹�������ñ, 150), // - (������)
	Array(1042254, 10), // - ӥ��սʿ����, 150), // - (������)
	Array(1042255, 10), // - ӥ�۵�ά�泤��, 150), // - (������)
	Array(1042256, 10), // - ӥ����������, 150), // - (������)
	Array(1042257, 10), // - ӥ�۴̿ͳ���, 150), // - (������)
	Array(1042258, 10), // - ӥ������������, 150), // - (������)
	Array(1062165, 10), // - ħ��ʦսʿ�̿�, 150), // - (������)
	Array(1062166, 10), // - ħ��ʦ��ά��̿�, 150), // - (������)
	Array(1062167, 10), // - ħ��ʦ�����̿�, 150), // - (������)
	Array(1062168, 10), // - ħ��ʦ�̿Ͷ̿�, 150), // - (������)
	Array(1062169, 10) // - ħ��ʦ�����߶̿�, 150), // - (������)
	//Array(1003588, 10) // ��߷���ñ��, 100), // (������)
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("xrb1");
	eim.setInstanceMap(865030113).resetPQ(level);
	var map = eim.setInstanceMap(865030113);
	map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 6500011;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	modified.setOExp(50000);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(865030113);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-524, 90));
    eim.startEventTimer(1000 * 60 * 10);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[����С�ձ�] ���뵽����ս��ͼ����С�����¡�");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[����С�ձ�] ���ź����ѳ����޶���սʱ�䣬������սʧ�ܣ������٣��ڴ�����ǿ�����ǰ����ս~");
    eim.disposeIfPlayerBelow(100, 910000000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}




function playerRevive(eim, player) {
    var map = em.getMapFactory().getMap(910000000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 910000000);
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 865030113:
            return;
    }
	
    player.dropMessage(6, "[����С�ձ�] ���˳���ս��");
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
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 910000000);
		if (setupTask!=null)
			setupTask.cancel(true);
        eim.dispose();
    }
    return 0;
}


function monsterValue(eim, mobid) {
    return 1;
}


function monsterKilled(eim, player, cp) {
}


function allMonstersDead(eim) {
    if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[����С�ձ�] 10��������䣬����ʱ�����������������������Ҫ��10��������������ѡ�񣬷��򽫻ᱻǿ�����ߡ�");
    	//em.broadcastServerMsg(5120059, "[�񻰸���] ϣ���ѱ����ܣ�10��󽫿������䡣" ,true);
		var map = eim.getMapInstance(262030300);
		map.startMapEffect("[����С�ձ�] ȫ�����������ѱ����ܣ�10��󽫿������䡣", 5120059);
	}
}

function roll(eim) {
	MaxRandom = 0;
	var count = eim.getProperty("giftcount");
	var rewardPlayer = null;
	//�ڶ��ο�ʼ,ͳ����һ��ROLL����ҽ���������Ž�����
	if ((count*1)>=1) {
		for (var i = 0; i < eim.getPlayerCount(); i++) {
			var charName = eim.getPlayers().get(i).getName();
			var charId = eim.getPlayers().get(i).getId();
			//����ROLL����Ϣ
			for (var j = 0; j < eim.getPlayerCount(); j++) {
				var notice =  "[��� - ����С�ձ�] ��� "+charName+" ������ "+eim.getProperty("charid_"+charId)+"��";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[��� - ����С�ձ�] ��� "+charName+" ����������";
				}
				eim.getPlayers().get(j).dropMessage(6,notice);
			}
			//�����������ֵ
			if ((eim.getProperty("charid_"+charId)*1)>MaxRandom) {
				MaxRandom = eim.getProperty("charid_"+charId);
				//�û��������
				eim.setProperty("rewardplayer", charName);
				//�û����ID
				eim.setProperty("rewardplayerid", charId);
			} 
   		}
		for (var j = 0; j < eim.getPlayerCount(); j++) {
			//����NPC ���Ž���
			eim.getPlayers().get(j).openNpc(1052008, 1111);
		}
	}
	for (var j = 0; j < eim.getPlayerCount(); j++) {
		//�����������ROLL�����Ϊ��
		eim.setProperty("charid_"+eim.getPlayers().get(j).getId(),"0");
	}
	//����+1
	eim.setProperty("giftcount", (count*1+1));
	//���¶������
	count = eim.getProperty("giftcount");
	count = (count*1);
	//�˳�ս��
	if ((count*1)>10) {
		EndThisBattle(eim);
		return;
	}
	//��������
	var chance = Math.floor(Math.random()*600);
	//������Ʒ�б�
	var finalItemList = Array();
	for(var m=0; m<itemList.length; m++) {
		if (itemList[m][1] >= chance) {
			finalItemList.push(itemList[m][0]);
		}
	}
	var currentItem = finalItemList[Math.floor(Math.random()*finalItemList.length)];
	switch(count) {
		case 8:
		case 9:
		case 10:
			currentItem = 2430460;
		break;
	}
	eim.setProperty("rewarditem", currentItem);
	//�ӳ�10���ROLL��NPC
	setupTask = em.schedule("openRollNpc", 1000 * 10 * 1, eim);
}

function openRollNpc(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
		eim.getPlayers().get(i).openNpc(1052008);
    }
	//10������ROLL��
	setupTask = em.schedule("roll", 1000 * 10 * 1, eim);
}

function EndThisBattle(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[��� - ����С�ձ�] \r\n\r\n��ϲ�����������߳ɹ���");
    }
	//em.broadcastYellowMsg("[�񻰸���] ��ս����");
    em.setProperty("state", "done");
    eim.disposeIfPlayerBelow(100, 910000000);
	if (setupTask!=null)
		setupTask.cancel(true);
	eim.dispose();
}

function monsterDamaged(eim, player, mobid, damage) {
}

function cancelSchedule() {
	if (setupTask!=null)
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

function monsterDrop(eim, player, mob) {}