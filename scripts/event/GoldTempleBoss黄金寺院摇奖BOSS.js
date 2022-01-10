/*
 ������
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(2433646, 250), //����100������ȯ
	Array(2049752, 350), //S��Ǳ�ܾ��� 30%
	Array(2433646, 450), //����100������ȯ
	Array(2433646, 300),  //����100������ȯ
	Array(2022956, 500),  //���õ��
	Array(5062009, 200),  //����ħ��
	Array(5062010, 600),  //�ռ�ħ��
	Array(2340000, 550),  //���ʵ�����
	Array(5072000, 550),  //���ʵ�����
	Array(5073000, 550),  //���ʵ�����
	Array(5074000, 550),  //���ʵ�����
	Array(1003622, 100), //��������ñ
	Array(1022232, 160), //��������ͫӡ
	Array(1052527, 100), //�������ʹ���
	Array(1212072, 160), //��������˫ͷ��
	Array(1232064, 160), //��������������
	Array(1242069, 160), //��������������
	Array(1302070, 160), //�������͵��ֽ�
	Array(1312142, 160), //�������͵��ָ�
	Array(1312100, 160), //�������͵��ֶ���
	Array(1332214, 160), //�������Ͷ̵�
	Array(1342079, 160), //��������˫��
	Array(1362081, 160), //������������
	Array(1372168, 160), //�������Ͷ���
	Array(1382199, 160), //�������ͳ���
	Array(1402185, 160), //��������˫�ֽ�
	Array(1412126, 160), //��������˫�ָ�
	Array(1432158, 160), //�������ͳ�ǹ
	Array(1442209, 160), //�������ͳ�ì
	Array(1452196, 160), //�������͹�
	Array(1462184, 160), //����������
	Array(1472205, 160), //��������ȭ��
	Array(1482159, 160), //��������ָ��
	Array(1492170, 160), //�������Ͷ�ǹ
	Array(1522085, 160), //��������˫��ǹ
	Array(1012478, 100), // - ����֮���ᾧʯ
	Array(1022231, 10), //1022231 - Ѥ��ˮӡ����
	Array(1022232, 10), //1022232 - ��������ͫӡ
	Array(1182087, 10), //1182087 - ˮ�����˻���
	Array(1152170, 5), // 1152170 - �ʼҺ�ɫ��������
	Array(1132272, 50), // 1132272 - �ƽ���Ҷ������
	Array(1122150, 100), // 1122150 - ͳ���ߵ�׹
	Array(1122254, 100), // 1122254 - �����ս��ߵ�׹
	Array(1122076, 100), // 1122076 - ���׺ڰ���������
	Array(1122000, 100), // 1122000 - �����
	Array(1032241, 100), // 1032241 - �Ȼ����
	Array(1032136, 100), // 1032136 - ��������
	Array(1113149, 100), // 1113149 - ������ָ
	Array(4001006, 10),  //������ë
	Array(3010678, 150),  //���Ӷ�֮��Ϣ
	Array(3010680, 150),  //ͯ���еĹ���
	Array(3010183, 150),//���ܲ�����
	Array(3010184, 150),//��������
	Array(2433646, 350),  //����500������ȯ
	Array(2433285, 350),  //
	Array(4033356, 300)  //�������
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("GoldTempleBoss");
    var map = eim.setInstanceMap(252030100);
    map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 8800200;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*300);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(252030100);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(984, 513));
    eim.startEventTimer(1000 * 60 * 30);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[�ƽ���Ժ������] ���뵽����ս��ͼ����С�����¡�");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[�ƽ���Ժ������] ���ź����ѳ����޶���սʱ�䣬������սʧ�ܣ������٣��ڴ�����ǿ�����ǰ����ս~");
    eim.disposeIfPlayerBelow(100, 252030000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}




function playerRevive(eim, player) {
    var map = em.getMapFactory().getMap(252030000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 252030000);
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 252030100:
            return;
    }
	
    player.dropMessage(6, "[�ƽ���Ժ������] ���˳���ս��");
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 252030000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 252030000);
}



function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 252030000);
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
		eim.broadcastPlayerMsg(6, "[�ƽ���Ժ������] 10��������䣬����ʱ�����������������������Ҫ��10��������������ѡ�񣬷��򽫻ᱻǿ�����ߡ�");
		var map = eim.getMapInstance(252030100);
		map.startMapEffect("[�ƽ���Ժ������] ��ͨ�أ�10��󽫿������䡣", 5120059);
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
				var notice =  "[�ƽ���Ժ������] ��� "+charName+" ������ "+eim.getProperty("charid_"+charId)+"��";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[�ƽ���Ժ������] ��� "+charName+" ����������";
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
			currentItem = 2433646;
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
	setupTask = em.schedule("roll", 1000 * 5 * 1, eim);
}

function EndThisBattle(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[�ƽ���Ժ������] ��ս�ɹ���");
    }
    em.setProperty("state", "done");
    eim.disposeIfPlayerBelow(100, 252030000);
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
    eim.disposeIfPlayerBelow(100, 252030000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 252030000);
}


function onMapLoad(eim, player) {
}

function monsterDrop(eim, player, mob) {
}