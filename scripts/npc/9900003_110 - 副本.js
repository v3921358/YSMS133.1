/*
	���ܣ�ÿ������ - ������20��
	��ע�������ʼID 100100�����������μ�1�����������ĳ�ʼID����100����100200
*/


var status = 0;
var text = "";
var questid = 100100;
var maxtimes = 20;
var playerid = 0;
var accepttimes = 0;
var questitemid = 0;
var questitemcs = 0;
var hitemid = 0;
var hitemcs = 0;
var questitems = Array(
						4000454,
						4000453,
						4000458,
						4000443,
						4000269,
						4000268,
						4000469,
						4000470,
						4003005,
						4000130,
						4000132,
						4000135,
						4000134,
						4000150,
						4000170,
						4000169,
						4000180,
						4000190,
						4000189,
						4000193,
						4000192,
						4000238,
						4000266,
						4000267,
						4000407,
						4000406,
						4000188,
						4000187,
						4000171,
						4000108,
						4000069,
						4000035,
						4000036,
						4000037,
						4000002,
						4000010,
						4000030,
						4000029,
						4000039

						);

function start () {
	status = -1;
	action(1, 0, 0);
}


function action (mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == -1) {
			cm.dispose();
		} else if (status == 0) {
			playerid = cm.getPlayer().getId();
			accepttimes = cm.getPlayer().MissionGetFinish(playerid, questid);
			text = "\t\t\t\t#e�ճ����� - ������20��#n\r\n\r\n  �����տ��ٽ�ȡ������#r" + (maxtimes-accepttimes) + "#k ��\r\n  ���ÿ������������½�����\r\n\t#r1��#t5062002#��������Ϸ���顢15�������ҡ�50���\r\n\r\n#k";
			if (cm.getPlayer().MissionStatus(playerid, questid, 0, 4)) {  // �ж��Ƿ��ȡ������
				if (cm.getPlayer().MissionStatus(playerid, questid, 0, 0)) { // �ж��Ƿ��������
					if (cm.getPlayer().MissionStatus(playerid, questid, maxtimes, 3)) { // �ж��Ƿ񳬹���ɴ���
						text += "���Ѿ�����˽��������������0���������~";
					} else {
						text += "#b#L0#��������#l#k\r\n";
						//cm.MissionReMake(playerid, questid, 1, 0, 0);
					}
				} else {
					hitemid = cm.getPlayer().MissionGetMobId(playerid, questid);
					hitemcs = cm.getPlayer().MissionGetMaxNum(playerid, questid, 0);
					text += "#e  ��ǰ��#r" + Math.max(1, accepttimes) + "#k��  �ռ� #r#z" + hitemid + "# " + hitemcs + "#k��#n\r\n\r\n\r\n";
					if (cm.haveItem(hitemid, hitemcs)) {	// �ж��Ƿ�������������
						text += "#b#L1#�������#l\r\n";
					}
					text += "#r#L2#�������� (�޷�����κν������һ�����һ���������)#l\r\n";
				}
			} else {
				text += "#b#L3#��������#l\r\n";
			}
			cm.sendSimple(text);
		} else if (status == 1) {
			if (selection == 0) {			// ���½������� ��ʼ��
				questitemid = questitems[Math.floor(Math.random()*questitems.length)];	// �������ID
				questitemcs = Math.floor(Math.random()*15) + 20 + Math.floor(Math.random()*cm.getReborns());	// �����������
				text = "#e��#r" + (accepttimes + 1) + "#k����\r\n\r\n���������� �ռ�#r#z" + questitemid + "# " + questitemcs + "��#k#n\r\n\r\n#k��ȥ���~";
				// ���½�������
				cm.getPlayer().MissionReMake(playerid, questid, 1, 0, 0);
				// д���������ID
				cm.getPlayer().MissionSetMobId(playerid, questid, questitemid);
				// д�������������
				cm.getPlayer().MissionMaxNum(questid, questitemcs);
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 1) {	// �������
				//accepttimes = cm.getPlayer().MissionGetFinish(playerid, questid);
				cm.getPlayer().MissionFinish(playerid, questid);
				var calcExp = Math.floor(cm.getPlayer().getExpNeededForLevel()*0.02)+Math.floor(Math.random()*1000000+1000000);
				cm.gainExp(calcExp);
                cm.gainItem(5062002, 1);
				cm.gainItem(4310036, 15);
                cm.getChar().modifyCSPoints(1,50);
				cm.gainItem(hitemid, -hitemcs);
				cm.finishActivity(120110);
				text = "��ϲ�����������~~";
				cm.sendOk(text);
				cm.channelMessage(0x18, "[�ճ�����]" + " : " + "��ϲ��ҡ�" + cm.getChar().getName() + "��,����ˡ���"+accepttimes+"�����������˷��Ľ�����");
                cm.playerMessage(-1, "��þ���"+calcExp);
				cm.playerMessage(-1, "���������15��");
				cm.playerMessage(-1, "��ø߼�ħ��1��");
				cm.playerMessage(-1, "���50���");
				cm.dispose();
			} else if (selection == 2) {	// ��������
				cm.getPlayer().MissionFinish(playerid, questid);
				text = "�����ѷ�������";
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 3) {	// ��������
				questitemid = questitems[Math.floor(Math.random()*questitems.length)];	// �������ID
				questitemcs = Math.floor(Math.random()*15) + 20 + Math.floor(Math.random()*cm.getReborns());	// �����������
				text = "#e��#r" + (accepttimes + 1) + "#k����\r\n\r\n���������� �ռ�#r#z" + questitemid + "# " + questitemcs + "��#k#n\r\n\r\n#k��ȥ���~";
				// ��������д���������ID
				cm.getPlayer().MissionMake(playerid, questid, 1, 0, 0, questitemid);
				// д�������������
				cm.getPlayer().MissionMaxNum(questid, questitemcs);
				cm.sendOk(text);
				cm.dispose();
			}
		}
	}
}