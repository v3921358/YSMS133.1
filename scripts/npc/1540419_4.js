/*
	���ƣ���ӪԱ
	���ݣ�����תְ
*/

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = -1;
var jobData = new Array(
        Array("սʿ", 100, 999),
        Array("����", 110, 999),
        Array("��ʿ", 111, 999),
        Array("Ӣ��", 112, 999),
        Array("׼��ʿ", 120, 999),
        Array("��ʿ", 121, 999),
        Array("ʥ��ʿ", 122, 999),
        Array("ǹսʿ", 130, 999),
        Array("����ʿ", 131, 999),
        Array("����ʿ", 132, 999),
        Array("ħ��ʦ", 200, 999),
        Array("�𶾷�ʦ", 210, 999),
        Array("����ʦ", 211, 999),
        Array("��ħ��ʿ", 212, 999),
        Array("���׷�ʦ", 220, 999),
        Array("������ʦ", 221, 999),
        Array("����ħ��ʿ", 222, 999),
        Array("��ʦ", 230, 999),
        Array("��˾", 231, 999),
        Array("����", 232, 999),
        Array("������", 300, 999),
        Array("����", 310, 999),
        Array("����", 311, 999),
        Array("������", 312, 999),
        Array("����", 320, 999),
        Array("����", 321, 999),
        Array("����", 322, 999),
        Array("����", 400, 999),
        Array("�̿�", 410, 999),
        Array("��Ӱ��", 411, 999),
        Array("��ʿ", 412, 999),
        Array("����", 420, 999),
        Array("���п�", 421, 999),
        Array("����", 422, 999),
        Array("����", 500, 999),
        Array("ȭ��", 510, 999),
        Array("��ʿ", 511, 999),
        Array("���ӳ�", 512, 999),
        Array("��ǹ��", 520, 999),
        Array("��", 521, 999),
        Array("����", 522, 999),
        Array("����ʿ��һת��", 1100, 9),
        Array("����ʿ����ת��", 1110, 9),
        Array("����ʿ����ת��", 1111, 9),
        Array("����ʿ����ת��", 1112, 9),
        Array("����ʿ��һת��", 1200, 9),
        Array("����ʿ����ת��", 1210, 9),
        Array("����ʿ����ת��", 1211, 9),
        Array("����ʿ����ת��", 1212, 9),
        Array("����ʹ�ߣ�һת��", 1300, 9),
        Array("����ʹ�ߣ���ת��", 1310, 9),
        Array("����ʹ�ߣ���ת��", 1311, 9),
        Array("����ʹ�ߣ���ת��", 1312, 9),
        Array("ҹ���ߣ�һת��", 1400, 9),
        Array("ҹ���ߣ���ת��", 1410, 9),
        Array("ҹ���ߣ���ת��", 1411, 9),
        Array("ҹ���ߣ���ת��", 1412, 9),
        Array("��Ϯ�ߣ�һת��", 1500, 9),
        Array("��Ϯ�ߣ���ת��", 1510, 9),
        Array("��Ϯ�ߣ���ת��", 1511, 9),
        Array("��Ϯ�ߣ���ת��", 1512, 9),
        Array("ս��һת��", 2100, 0),
        Array("ս�񣨶�ת��", 2110, 0),
        Array("ս����ת��", 2111, 0),
        Array("ս����ת��", 2112, 0),
		Array("���������֣�", 501, 0),
		Array("�����֣���ת��", 530, 0),
		Array("�������֣���ת��", 531, 0),
		Array("�������������������֣�", 532, 0),
        Array("˫���飨һת��", 2300, 1),
        Array("˫���飨��ת��", 2310, 1),
        Array("˫���飨��ת��", 2311, 1),
        Array("˫���飨��ת��", 2312, 1),
        Array("��Ӱ��һת��", 2400, 2),
        Array("��Ӱ����ת��", 2410, 2),
        Array("��Ӱ����ת��", 2411, 2),
        Array("��Ӱ����ת��", 2412, 2),
        Array("ҹ�ⷨʦ��һת��", 2700, 3),
        Array("ҹ�ⷨʦ����ת��", 2710, 3),
        Array("ҹ�ⷨʦ����ת��", 2711, 3),
        Array("ҹ�ⷨʦ����ת��", 2712, 3),
        Array("��ħ���֣�һת��", 3100, 4),
        Array("��ħ���֣���ת��", 3110, 4),
        Array("��ħ���֣���ת��", 3111, 4),
        Array("��ħ���֣���ת��", 3112, 4),
        Array("��ħ�����ߣ�������", 3101, 0),
        Array("��ħ�����ߣ��м���", 3120, 0),
        Array("��ħ�����ߣ��߼���", 3121, 0),
        Array("��ħ�����ߣ�������", 3122, 0),
        Array("���鷨ʦ��һת��", 3200, 999),
        Array("���鷨ʦ����ת��", 3210, 999),
        Array("���鷨ʦ����ת��", 3211, 999),
        Array("���鷨ʦ����ת��", 3212, 999),
        Array("����������һת��", 3300, 999),
        Array("������������ת��", 3310, 999),
        Array("������������ת��", 3311, 999),
        Array("������������ת��", 3312, 999),
        Array("��еʦ��һת��", 3500, 999),
        Array("��еʦ����ת��", 3510, 999),
        Array("��еʦ����ת��", 3511, 999),
        Array("��еʦ����ת��", 3512, 999),
        Array("�����һת��", 3600, 5),
        Array("�������ת��", 3610, 5),
        Array("�������ת��", 3611, 5),
        Array("�������ת��", 3612, 5),
        Array("�׹�����һת��", 5100, 6),
        Array("�׹�������ת��", 5110, 6),
        Array("�׹�������ת��", 5111, 6),
        Array("�׹�������ת��", 5112, 6),
        Array("����սʿ��һת��", 6100, 7),
        Array("����սʿ����ת��", 6110, 7),
        Array("����սʿ����ת��", 6111, 7),
        Array("����սʿ����ת��", 6112, 7),
        Array("��������ʹ��һת��", 6500, 8),
        Array("��������ʹ����ת��", 6510, 8),
        Array("��������ʹ����ת��", 6511, 8),
        Array("��������ʹ����ת��", 6512, 8),
		Array("���Ĵ��ˣ�һת��", 508, 0),
		Array("���Ĵ��ˣ���ת��", 570, 0),
		Array("���Ĵ��ˣ���ת��", 571, 0),
		Array("���Ĵ��ˣ���ת��", 572, 0),
		Array("���£�һת��", 2500, 0),
		Array("���£���ת��", 2510, 0),
		Array("���£���ת��", 2511, 0),
		Array("���£���ת��", 2512, 0)
        ); //�ȽϹ淶��ְҵIDͳһ������ű�����תְ
var noAdvance = head + "�Բ��������㲻��תְ����ĵȼ������� ";
var advance = head + "#r - С������ҳ >> תְ���� #k\r\n\r\n���Ŷ������������ṩ����תְŶ~";
var unable = head + "�������Ѿ�ͨ����ȫ����תְ�ˣ����ð��������ô����������������ĵ��£�ЦЦ�͹��ˡ��Ժ��кܶ����������ȥ��ԡ�";
var noThanks = "\r\n\r\n#L1#лл��������������ʱ����תְ��#l";
var check = "��ȷ�������Ϊһ�� ";
var congrats = "�����Ϊһ�� ";
var first;
var newJobName;
var newJob;

function start () {
	status = -1;
	action(1, 0, 0);
}


function action (mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
		return;
	}

	if (mode == 1) {
		status++;
	} else {
		status--;
	}

	if (status == -1) {
		cm.dispose();
		return;
	}

	if (cm.getPlayer().getSubcategory() == 1) {
		sdchangejob();
		return;
	} else if (cm.getPlayer().getSubcategory() == 2) {
		hpchangejob();
		return;
	} else if (cm.getPlayer().getSubcategory() == 10) {
		lrchangejob();
		return;
	}

	if (cm.haveItem(2431305)) { // ����л�������䣬��ô��ʾ���ʹ�ú����תְ
		cm.sendOk("#r�������ϴ�תְδʹ�õĻ�������䣬��ʹ�ú���תְ��");
		cm.dispose();
		return;
	}

	if (status == 0) {
		if (cm.getJob() % 100 == 0) {
			noAdvance += cm.getJob() % 1000 == 0 ? "10������" : "30������";
		} else {
			noAdvance += cm.getJob() % 10 == 0 ? "60������" : "100������";
			noAdvance += " ����תְ�������ڵĵȼ�Ϊ " + cm.getPlayerStat("LVL") + " ����";
		}
		if (cm.getJob() % 10 == 2 && cm.getJob() != 2002 && cm.getJob() != 3002) {//��ת������תְ
			cm.sendOk(unable);
			cm.dispose();
			return;
		} else {
			if (cm.getJob() % 1000 == 0 || cm.getJob() == 0 || cm.getJob() == 3000 || cm.getJob() == 2002 || cm.getJob() == 2003 || cm.getJob() == 2004 || cm.getJob() == 2005 || cm.getJob() == 2000 || cm.getJob() == 6001 || cm.getJob() == 3001 || cm.getJob() == 3002) {
				if (cm.getPlayerStat("LVL") == 8 || cm.getPlayerStat("LVL") == 9) {//����Ƿ�ʦ
					for (var i = 0; i < jobData.length; i++)
						if (jobData[i][1] == (200 + cm.getJob()))
							advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
				} else if (cm.getPlayerStat("LVL") >= 10) {//����ְҵ
					if (cm.getJob() == 2000) {
						advance += "\r\n#b#L" + 2100 + "# ս��һת��#l";
					} else if (cm.getJob() == 2002) {
						advance += "\r\n#b#L" + 2300 + "# ˫���飨һת��#l";
					} else if (cm.getJob() == 2003) {
						advance += "\r\n#b#L" + 2400 + "# ��Ӱ��һת��#l";
					} else if (cm.getJob() == 2004) {
						advance += "\r\n#b#L" + 2700 + "# ҹ�ⷨʦ��һת��#l";
					} else if (cm.getJob() == 2005) {
						advance += "\r\n#b#L" + 2500 + "# ���£�һת��#l";
					} else if (cm.getJob() == 3002) {
						advance += "\r\n#b#L" + 3600 + "# �����һת��#l";
					} else if (cm.getJob() == 6000) {
						advance += "\r\n#b#L" + 6100 + "# ����սʿ��һת��#l";
					} else if (cm.getJob() == 6001) {
						advance += "\r\n#b#L" + 6500 + "# ��������ʹ��һת��#l";
					} else if (cm.getJob() == 3001) {
						advance += "\r\n#b#L" + 3100 + "# ��ħ���֣�һת��#l";
						advance += "\r\n#b#L" + 3101 + "# ��ħ�����ߣ�һת��#l";
					} else {
						for (var i = 0; i < jobData.length; i++) {
							if ((jobData[i][1] % 100 == 0) && (jobData[i][1] > cm.getJob()) && (jobData[i][1] < (600 + cm.getJob()))) {
								advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
							} else if (cm.getJob() == 0 & jobData[i][1] % 100 == 0 && (jobData[i][1] > cm.getJob()) && (jobData[i][1] < (600 + cm.getJob()))) {
								advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
							}
						}
					}
				} else {
					cm.sendOk(noAdvance);
					cm.dispose();
					return;
				}
				first = true;
			} else if (cm.getJob() % 100 == 0 || cm.getJob() == 3101) { //�ڶ���תְ
				if (cm.getPlayerStat("LVL") >= 30) {
					if (cm.getJob() == 3101) {
						advance += "\r\n#b#L" + 3120 + "# ��ħ�����ߣ��м���#l";
					} else {
						for (var i = 0; i < jobData.length; i++)
							if (((jobData[i][1] % 10 == 0 && jobData[i][1] % 100 != 0)) && (jobData[i][1] > cm.getJob() && jobData[i][1] <= (cm.getJob() + 30)))
								advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
					}
				} else {
					cm.sendOk(noAdvance);
					cm.dispose();
					return;
				}
			} else if (cm.getJob() % 10 == 0 || cm.getJob() % 10 == 1 || cm.getJob() == 3120 || cm.getJob() == 3121) { // ������\4��תְ
				if (cm.getPlayerStat("LVL") >= (cm.getJob() % 10 == 1 ? 100 : 60)) {
					for (var i = 0; i < jobData.length; i++)
						if (jobData[i][1] - 1 == cm.getJob())
							advance += "\r\n#b#L" + jobData[i][1] + "#" + jobData[i][0] + "#l";
				} else {
					cm.sendOk(noAdvance);
					cm.dispose();
					return;
				}
			} else {
				cm.sendOk(unable);
				cm.dispose();
				return;
			}
			advance += noThanks;
			cm.sendSimple(advance);
		}
	} else if (status == 1) {
		if (selection == 1) {
			cm.sendOk("�����ڲ���תְ���Ǻðɡ�������Ҫתְ���������ң���ʱʱ�̿������");
			cm.dispose();
		} else {
			if (cm.getSpace(2) >= 1) {
				newJob = selection;
				for (var i = 0; i < jobData.length; i++) {
					if (jobData[i][1] == newJob) {
						newnewJobName = jobData[i][0];
					}
				}
				cm.sendNext("��ȷ�����Ҫ��Ϊһ�� #b" + newnewJobName + "#k ��\r\n\r\n#r - ս��תְ����תתְ����Ӱ˫��תְ����Ϊ��ѧϰ���ܲ��������ܻ��ӳ�2~3�룬�벻Ҫ�رնԻ�����ɵļ����쳣���ָܻ���\r\n\r\n#r - תְ�󣬻����͵��ߡ���ȷ����ĵ�����ÿ����2�����ϵĿո����תְ���򱳰������������ȡ�������ߣ����ָܻ���")
			} else {
				cm.sendNext("����תְ�Ļ�������װ���������������ڳ��������ӡ�")
				cm.dispose();
			}
		}//selection
	} else if (status == 2) {
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //��������� ���ݽ�ɫ��������͵���
		cm.playerMessage(-1, "���͸��� >>> ��������� һ�������Ը�����Ľ�ɫ�ȼ���ȡ��Ӧ�ĵ��ߣ�")
//		if (first) {
//			cm.resetAp();
//		}//�����һת������AP
		switch (newJob) {
			case 2700:
				equip(1352400); // Lv10 - ���籦��(������)
				break;
			case 2710:
				equip(1352401); // Lv30 - ҫ�۱���(������)
				break;
			case 2711:
				equip(1352402); // Lv60 - ��ҫ����(������)
				break;
			case 2712:
				equip(1352403); // Lv100 - ���˱���(������)
				break;
			case 6100:
				equip(1352500); // Lv10 - ŵ�;���(������)
				break;
			case 6110:
				equip(1352501); // Lv30 - �ػ�֮ŵ�;���(������)
				break;
			case 6111:
				equip(1352502); // Lv60 - ����֮ŵ�;���(������)
				break;
			case 6112:
				equip(1352503); // Lv100 - ����֮ŵ�;���(������)
				break;
			case 6500:
				equip(1352601); // Lv10 - ��ɫ�������(������)
				break;
			case 6510:
				equip(1352602); // Lv30 - ��ɫ�������(������)
				break;
			case 6511:
				equip(1352603); // Lv60 - ��ɫ�������(������)
				break;
			case 6512:
				equip(1352604); // Lv100 - ��ɫ�������(������)
				break;
			case 3300:
			case 3310:
			case 3311:
			case 3312: {
				if (!cm.hasSkill(30001061)) {
					cm.teachSkill(30001061, 1);
				}
				if (!cm.hasSkill(30001062)) {
					cm.teachSkill(30001062, 1);
				}
				break;
			}

		}
		cm.sendOk("����С���ֵ����������������ڿ�ʼ���Ѿ���#b" + newnewJobName + "#k�ˣ�\r\n���͸���#b���������#kһ�������Ը�����Ľ�ɫ�ȼ���ȡ��Ӧ�ĵ��ߣ�");
		cm.dispose();
	}
}

function equip(itemId) {
    cm.gainItemAndEquip(itemId, -10);
}

function sdchangejob() {
	if (status == 0) {
		if (cm.getJob() == 434) {//�Ѿ�תְ���
			cm.sendOk("˫����������ô�������������������ЦһЦ�͹��ˣ�û��ʲô�ġ�")
			cm.dispose();
		} else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {//��һ��תְ
			newJob = 400;
			newJobName = "������˫����";
		} else if (cm.getJob() == 400 && cm.getPlayerStat("LVL") >= 20) {//�ڶ���תְ
			newJob = 430;
			newJobName = "��ϰ����";
		} else if (cm.getJob() == 430 && cm.getPlayerStat("LVL") >= 30) {//������תְ
			newJob = 431;
			newJobName = "˫����";
		} else if (cm.getJob() == 431 && cm.getPlayerStat("LVL") >= 45) {//���Ĵ�תְ
			newJob = 432;
			newJobName = "˫����";
		} else if (cm.getJob() == 432 && cm.getPlayerStat("LVL") >= 60) {//�����תְ
			newJob = 433;
			newJobName = "Ѫ��";
		} else if (cm.getJob() == 433 && cm.getPlayerStat("LVL") >= 100) {//������תְ
			newJob = 434;
			newJobName = "��Ӱ˫��";
		} else {
			cm.sendOk("�����ڻ�����������Ŷ����Ӱ˫����תְ�ȼ��ǣ�#r\r\n10>>20>>30>>45>>60>>100!")
			cm.dispose();
		}
		cm.sendNext("��ȷ�������Ϊһ��#b" + newJobName + "#k��");
	} else if (status == 1) {
//		if (newJob == 400) {
//			cm.resetAp();
//		}
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //��������� ���ݽ�ɫ��������͵���
		cm.playerMessage(-1, "���͸��� >>> ��������� һ�������Ը�����Ľ�ɫ�ȼ���ȡ��Ӧ�ĵ��ߣ�")
		cm.sendOk("�Ѿ��ɹ�תְ����#b" + newJobName + "#k")
		cm.dispose();
	}
}

function hpchangejob() {
	if (status == 0) {
		if (cm.getJob() == 532) {
			cm.sendOk("�����ֵ�������ô�������������������ЦһЦ�͹��ˣ�û��ʲô�ġ�");
			cm.dispose();
		} else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {
			newJob = 501;
			newJobName = "���������֣�";
		} else if (cm.getJob() == 501 && cm.getPlayerStat("LVL") >= 30) {
			newJob = 530;
			newJobName = "�����֣���ת��";
		} else if (cm.getJob() == 530 && cm.getPlayerStat("LVL") >= 60) {
			newJob = 531;
			newJobName = "�������֣���ת��";
		} else if (cm.getJob() == 531 && cm.getPlayerStat("LVL") >= 100) {
			newJob = 532;
			newJobName = "�������������������֣�";
		}
		cm.sendNext("��ȷ�������Ϊһ��#b" + newJobName + "#k��");
	} else if (status == 1) {
//		if (newJob == 501) {
//			cm.resetAp();
//		}
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //��������� ���ݽ�ɫ��������͵���
		cm.playerMessage(-1, "���͸��� >>> ��������� һ�������Ը�����Ľ�ɫ�ȼ���ȡ��Ӧ�ĵ��ߣ�")
		cm.sendOk("�Ѿ��ɹ�תְ����#b" + newJobName + "#k")
		cm.dispose();
	}
}

function lrchangejob() {
	if (status == 0) {
		if (cm.getJob() == 572) {
			cm.sendOk("���Ĵ�����ô�������������������ЦһЦ�͹��ˣ�û��ʲô�ġ�");
			cm.dispose();
		} else if (cm.getJob() == 0 && cm.getPlayerStat("LVL") >= 10) {
			newJob = 508;
			newJobName = "���Ĵ��ˣ�һת��";
		} else if (cm.getJob() == 508 && cm.getPlayerStat("LVL") >= 30) {
			newJob = 570;
			newJobName = "���Ĵ��ˣ���ת��";
		} else if (cm.getJob() == 570 && cm.getPlayerStat("LVL") >= 60) {
			newJob = 571;
			newJobName = "���Ĵ��ˣ���ת��";
		} else if (cm.getJob() == 571 && cm.getPlayerStat("LVL") >= 100) {
			newJob = 572;
			newJobName = "���Ĵ��ˣ���ת��";
		}
		cm.sendNext("��ȷ�������Ϊһ��#b" + newJobName + "#k��");
	} else if (status == 1) {
//		if (newJob == 508) {
//			cm.resetAp();
//		}
		cm.changeJob(newJob);
		cm.gainItem(2431305, 1); //��������� ���ݽ�ɫ��������͵���
		cm.playerMessage(-1, "���͸��� >>> ��������� һ�������Ը�����Ľ�ɫ�ȼ���ȡ��Ӧ�ĵ��ߣ�")
		cm.sendOk("�Ѿ��ɹ�תְ����#b" + newJobName + "#k")
		cm.dispose();
	}
}