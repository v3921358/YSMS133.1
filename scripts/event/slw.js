/*
 ������	ɭ���踱��
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(4310156, 400), //��������˹��
	Array(4033287, 500), //�����ͼ
	Array(4033288, 500), //�Ŵ�����ĵ�ͼ
	Array(5062500, 500), //��ʦ��������ħ��
	Array(2049124, 100), //����������
	Array(4033356, 300),  //�������
	Array(5062010, 600),  //�ռ�ħ��
	Array(5062010, 500),  //�ռ�ħ��
	Array(5062010, 500),  //�ռ�ħ��
	Array(5062010, 500),  //�ռ�ħ��
	Array(5062010, 500),  //�ռ�ħ��
	Array(5062010, 500),  //�ռ�ħ��
	Array(5062010, 500),  //�ռ�ħ��
	Array(2340000, 200),  //
	Array(5072000, 200),  //
	Array(5073000, 200),  //
	Array(5074000, 200),  //
	Array(1432086, 300), // - ʨ�ĳ�ǹ, 300), // - (������)
	Array(1302152, 300), // - ʨ���䵶, 300), // - (������)
	Array(1522018, 300), // - �������ǹ, 300), // - (������)
	Array(1232014, 300), // - ʨ��ʹ������, 300), // - (������)
	Array(1322096, 300), // - ʨ�����׶�, 300), // - (������)
	Array(1402095, 300), // - ʨ��ս���䵶, 300), // - (������)
	Array(1372084, 300), // - ��β�������, 300), // - (������)
	Array(1382104, 300), // - ��βս������, 300), // - (������)
	Array(1212014, 300), // - ��β�ڼ�����, 300), // - (������)
	Array(1452111, 300), // - ӥ����Ϲ�, 300), // - (������)
	Array(1462099, 300), // - ӥ������, 300), // - (������)
	Array(1242042, 300), // - ��ѻ֮��Ů����־֮��, 300), // - (������)
	Array(1332130, 300), // - ��ѻ֮��̵�, 300), // - (������)
	Array(1362019, 300), // - ��ѻ֮���������, 300), // - (������)
	Array(1482084, 300), // - ��ݾ�ӥצ, 300), // - (������)
	Array(1492085, 300), // - ����������, 300), // - (������)
	Array(1532018, 300), // - ��ݻ�����, 300), // - (������)
	Array(1222014, 300), // - �����꼳ȡ��, 300), // - (������)
	Array(1242014, 300), // - ���Ů����־֮��, 300), // - (������)
	Array(1052314, 300), // - ʨ��ս�����Ӽ�, 300), // - (������)
	Array(1052315, 300), // - ��β��ʦ����, 300), // - (������)
	Array(1052316, 300), // - ӥ���ڱ���, 300), // - (������)
	Array(1052317, 300), // - ��ѻ֮��׷���߿���, 300), // - (������)
	Array(1052318, 300), // - ��ݴ�������, 300), // - (������)
	Array(1082296, 300), // - ��β��ʦ����, 300), // - (������)
	Array(1082297, 300), // - ӥ���ڱ�����, 300), // - (������)
	Array(1082298, 300), // - ��ѻ֮��׷��������, 300), // - (������)
	Array(1082299, 300), // - ��ݴ�������, 300), // - (������)
	Array(1082295, 300), // - ʨ��ս������, 300), // - (������)
	Array(1152110, 300), // - ��β��ʦ����, 300), // - (������)
	Array(1152111, 300), // - ӥ���ڱ�����, 300), // - (������)
	Array(1152112, 300), // - ��ѻ֮�����˻���, 300), // - (������)
	Array(1152113, 300), // - ��ݴ�������, 300), // - (������)
	Array(1152108, 300), // - ʨ��ս������, 300), // - (������)
	Array(1102275, 300), // - ʨ��ս������, 300), // - (������)
	Array(1102276, 300), // - ��β��ʦ����, 300), // - (������)
	Array(1102277, 300), // - ӥ���ڱ�����, 300), // - (������)
	Array(1102278, 300), // - ��ѻ֮����������, 300), // - (������)
	Array(1102279, 300), // - ��ݴ�������, 300), // - (������)
	Array(1003172, 300), // - ʨ��ս��ͷ��, 300), // - (������)
	Array(1003173, 300), // - ��β��ʦñ��, 300), // - (������)
	Array(1003174, 300), // - ӥ���ڱ���ñ, 300), // - (������)
	Array(1003175, 300), // - ��ѻ֮��׷����ñ, 300), // - (������)
	Array(1003176, 300), // - ��ݴ���ñ, 300), // - (������)
	Array(1072485, 300), // - ʨ��ս��Ь, 300), // - (������)
	Array(1072486, 300), // - ��β��ʦЬ, 300), // - (������)
	Array(1072487, 300), // - ӥ���ڱ�Ь, 300), // - (������)
	Array(1072488, 300), // - ��ѻ֮��׷����Ь, 300), // - (������)
	Array(1072489, 300), // - ��ݴ���Ь, 300), // - (������)
	Array(2049323, 300), //�߼�װ��ǿ����
	Array(2049752, 300), //S��Ǳ�ܾ��� 30%
	Array(1122149, 100), //���յ�׹
	Array(1122148, 100), //���յ�׹
	Array(3010895, 200), // ��������ͯ��������, 100), // �о��Ͱ������յĹ�ϵ�������׽�һЩ�����ӡ�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010896, 200), // �ҵ�Ů������, 100), // ���Ըо���Ů���Ļ������������ӡ�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010897, 200), // ���տ��֣���ħ, 100), // ���������ϵĶ�ħ���ֵı���о�����֡�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010898, 100), // ������������, 100), // ������������������ʱ��ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010899, 100), // ��������, 100), // �����Ӱ�������ʱ��ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010900, 200), // ��ʯ��Ҷ����, 100), // �ñ�ʯ���ɵ�������Ҷ���ӡ����º�ÿ10��ָ�HP 40, MP 20��
	Array(3010901, 200), // ����ĺ�ɫҩˮ����, 100), // ������ҩˮ������ȣ����Ը���ػָ�HP�ĺ�ɫҩˮ���ӡ�ÿ10��HP�ָ�110��MP�ָ�50��
	Array(3010902, 200), // ���ʵ���ɫҩˮ����, 100), // ������ҩˮ������ȣ����Ը���ػָ�MP����ɫҩˮ���ӡ�ÿ10��HP�ָ�100��MP�ָ�60��
	Array(3010903, 200), // ��������, 100), // �������棬ÿ10��HP�ָ�100��MP�ָ�50���������ӡ�
	Array(3010904, 200), // Ҭ����ɳ̲��, 100), // ���ڰ��ﰲ����ˬ��Ҭ�����µ�ɳ̲�Ρ��������棬ÿ10��HP�ָ�40��MP�ָ�20��
	//Array(3010905, 200), // �������F�a, 100), // �����ڹ����������ӵ��������ϵ��F�a��
	Array(3010906, 200), // �ƶ�ϴ�ּ�����, 100), // װ�޺�����ϴ�ּ䡣����һ��Ӧ�о��С�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010907, 200), // ��ɳɳ�ÿ���, 100), // ���ſɰ��Ĺ�ɳɳ�����ţ�ÿ10��HP�ָ�60��
	Array(3010908, 200), // ���������ɳ��, 100), // �ݻ��ĺ���ɫ�����ɳ�����������棬ÿ10��HP�ָ�60��
	Array(3010909, 200), // ��ɫ���ʦ����, 100), // ����������ɫ�����ʦ���ӡ��������棬ÿ10��HP�ָ�60��
	//Array(3010910, 200), // ����������, 100), // ���Գ�Ϊ�ɰ�����Ů������ĺ����ѡ�ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010911, 200), // ��ñ�������, 100), // ���ڱ������ϾͿ��Կ���������ɫñ�ӵĿɰ�����Ĳ��ա�
	Array(3010912, 200), // ��ñ�������, 100), // ���ڱ������ϾͿ��Կ���������ɫñ�ӵĿɰ�����Ĳ��ա�
	Array(3010913, 200), // �����������, 100), // ���ڱ������ϾͿ��Թ�����������������������Ĳ��ա�
	Array(3010914, 200), // ̫ƽ���������, 100), // ���ڱ������ϾͿ��Թ���ʷ������������������
	Array(3010915, 200), // ���鸽�����������, 100), // ���鸽����������ӡ��������棬ÿ10��HP�ָ�50��
	Array(3010916, 200), // �ۺ�ɳ̲����ɡ, 100), // ����������ˬ�Ĵ󺣵ķۺ�ɫɳ̲����ɡ���������棬ÿ10��HP�ָ�60��
	Array(3010917, 200), // ��ɫ����, 100), // ������Ļ����������ӡ�ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010918, 200), // ��ɫ����, 100), // ���Ͽ��������������ӡ�ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010919, 200), // ��������, 100), // Ϊ����֮�����������ӡ�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010920, 200), // ˮ������, 100), // �ֵ���Ӱר�����ӣ�����ȥ��ÿ10�붼�ָܻ�HP��
	Array(3010921, 10), // �ʵ�����, 100), // ��������������ͷ׵Ĳʵ�!\nÿ10���ӻָ�HP40,MP40.
	Array(3010922, 10), // �Ƴ�����(��ɫ), 100), // ����������������еĺ�ɫ�Ƴ�����,ÿ10���ӻָ�MP 20.
	Array(3010923, 10), // 10��������, 100), // Ϊ����ð�յ�10����������ľ��ް����ӡ�ÿ10���ӣ�HP��MP���ָ�50.
	
	Array(1132164, 10), //����ϣ������սʿ����
	Array(1132165, 10), //����ϣ������ʦ����
	Array(1132166, 10), //����ϣ�����񹭼�������
	Array(1132167, 10), //����ϣ�������������
	Array(1132168, 10), //����ϣ�����񺣵�����
	Array(1102471, 10), //����ϣ������սʿ����
	Array(1102472, 10), //����ϣ������ʦ����
	Array(1102473, 10), //����ϣ�����񹭼�������
	Array(1102474, 10), //����ϣ�������������
	Array(1102475, 10) //����ϣ�����񺣵�����
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("slw");
	eim.setInstanceMap(807300200).resetPQ(level);
    var map = eim.setInstanceMap(807300210);
    map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 9421586;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*50);
	modified.setOMp(mob.getMobMaxMp()*99);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(807300210);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(219, 123));
	var map2 = eim.getMapInstance(807300200);
	mobid = 9421562;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map2.spawnMonsterOnGroundBelow(mob, new java.awt.Point(257, 1038));
	var map3 = eim.getMapInstance(807300200);
	mobid = 9421563;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map3.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-125, 978));
	var map4 = eim.getMapInstance(807300200);
	mobid = 9421567;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map4.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-488, 978));
	var map5 = eim.getMapInstance(807300200);
	mobid = 9421569;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map5.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-125, 978));
	var map6 = eim.getMapInstance(807300200);
	mobid = 9421570;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map6.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-488, 978));
    eim.startEventTimer(1000 * 60 * 60);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[ɭ���踱��] ���뵽����ս��ͼ����С�����¡�");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[ɭ���踱��] ���ź����ѳ����޶���սʱ�䣬������սʧ�ܣ������٣��ڴ�����ǿ�����ǰ����ս~");
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
		case 807300200:
		case 807300210:
            return;
    }
	
    player.dropMessage(6, "[ɭ���踱��] ���˳���ս��");
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
//var map = eim.getMapInstance(0);
//map.killAllMonsters(true);
if (mobid == 9421589) {
			if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[ɭ���踱��] 10��������䣬����ʱ�����������������������Ҫ��10��������������ѡ�񣬷��򽫻ᱻǿ�����ߡ�");
		var map = eim.getMapInstance(807300210);
		map.startMapEffect("[ɭ���踱��] ɭ�����ѱ����ܣ�10��󽫿������䡣", 5122015);
			return;
		}
}   
return 1;
}


function monsterKilled(eim, player, cp) {
}


function allMonstersDead(eim) {
    /*if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[ɭ���踱��] 10��������䣬����ʱ�����������������������Ҫ��10��������������ѡ�񣬷��򽫻ᱻǿ�����ߡ�");
		var map = eim.getMapInstance(807300210);
		map.startMapEffect("[ɭ���踱��] ɭ�����ѱ����ܣ�10��󽫿������䡣", 5120059);
	}
	*/
	/*if (eim.getMapInstance(0).getAllMonstersThreadsafe().size() == 0) {
		if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[ɭ���踱��] 10��������䣬����ʱ�����������������������Ҫ��10��������������ѡ�񣬷��򽫻ᱻǿ�����ߡ�");
		var map = eim.getMapInstance(807300210);
		map.startMapEffect("[ɭ���踱��] ɭ�����ѱ����ܣ�10��󽫿������䡣", 5120059);
	}*/
    //}
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
				var notice =  "[ɭ���踱��] ��� "+charName+" ������ "+eim.getProperty("charid_"+charId)+"��";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[ɭ���踱��] ��� "+charName+" ����������";
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
			currentItem = 4310156;
		break;
	}
	eim.setProperty("rewarditem", currentItem);
	//�ӳ�10���ROLL��NPC
	setupTask = em.schedule("openRollNpc", 1000 * 5 * 1, eim);
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
        eim.getPlayers().get(i).dropMessage(1, "[ɭ���踱��] ��ս�ɹ���");
    }
	//em.broadcastYellowMsg("[ɭ���踱��] ��ս����");
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

function monsterDrop(eim, player, mob) {
}