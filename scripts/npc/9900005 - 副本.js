var status = 0;
var typed=0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) { 
			cm.sendSimple("#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ��� #r#h ##k ���ã��������ֳɳ�ϵͳ:\r\n#k#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#��ǰ�ǹ���#r"+cm.getPlayerPoints()+"#k ��     #fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�������ߣ�#r"+cm.getGamePoints()+"#k ����#b\r\n\r\n#fUI/UIWindow2.img/QuestGuide/Button/WorldMapQuestToggle/normal/0#\r\n#k#L1##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r[����] #b���ֳɳ�ϵͳ���#l\r\n#k#L4##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r[����]#b �Ķ���������ָ��#l\r\n#L3##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r[����]#b �Ķ��淨ָ������#l\r\n#L5##fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##r[����]#b ��ȡ�ɳ��ȼ�����#l\r\n\t\t");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendOk("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k����,�������ֳɳ�ϵͳ���:\r\n  ְҵ: ����\r\n  �ȼ�: 30 60 100 150 180 210 230 250\r\n  �Ƽ�������ͼ: ϵͳ������ͼ����\r\n  ����ʹ��ĳ����: ϵͳ����ʹ��ĳ����\r\n  ���͵���: ��ǰְҵ��Ӧ�ȼ�����,����\r\n#fUI/UIWindow2.img/Quest/quest_info/summary_icon/startcondition#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�ý�ɫ�ﵽ�ȼ�Ҫ�󼴿����1�ν׶ι���.\r\n\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##rע����ɫ���ܳ����ȼ���Χ�������ȼ���Ӧתְ��.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##rע��װ�� ���� ���� ���� ���� ������ Ԥ�� 10 ������.\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0##rע�����ﵽ�ȼ�δ�ﵽתְ������������,�޷���ȡ����(����Ը�).");
                    	cm.dispose();
			} else if (selection == 2) {
			if((cm.getPlayer().getLevel() > 9 && cm.getPlayer().getLevel() < 30) && cm.getBossLog("����10",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 100 || cm.getJob() == 1100){ //-- սʿ
				cm.gainItem(1302001,1); // ��
				}else if(cm.getJob() == 200|| cm.getJob() == 1200){ //-- ��ʦ
				cm.gainItem(1372043,1); // ����ħ��ʦ����
				}else if(cm.getJob() == 300 || cm.getJob() == 1300){ //-- ����
				cm.gainItem(1452002,1); // ����
				}else if(cm.getJob() == 400 || cm.getJob() == 1400){ //-- ����
				cm.gainItem(1332063,1); // ���������Ķ̽�
				cm.gainItem(1472104,1); // ��ս֮ȭ��
				}else if(cm.getJob() == 500 || cm.getJob() == 1500){ //-- ����
				cm.gainItem(1482000,1); // ָ��
				cm.gainItem(1492066,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 2100){ //-- ս��
				cm.gainItem(1442013,1); // �׺�ѩ��
				}else if(cm.getJob() == 3300){ //-- ��������
				cm.gainItem(1462084,1); // ��ս֮��
				}else if(cm.getJob() == 3500){ //-- ��еʦ
				cm.gainItem(1492066,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 3200){ //-- ���鶷ʦ
				cm.gainItem(1372043,1); // ����ħ��ʦ����
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- ����
				cm.gainItem(1372043,1); // ����ħ��ʦ����
				}else if(cm.getJob() == 2300){ //-- ˫����
				cm.gainItem(1522000,1); // ����˫��ǹ
				cm.gainItem(1352000,1); // ����˫��ǹ
				}else if(cm.getJob() == 501){ //-- ������
				cm.gainItem(1532000,1); // ���ִ���
				}else if(cm.getJob() == 3100){ //-- ��ħ����
				cm.gainItem(1322006,1); // �ֹ�
				}else if(cm.getJob() == 3600){ //-- ���
				cm.gainItem(1242001,1); // ��г֮��
				}else if(cm.getJob() == 2700){ //-- ҹ�ⷨʦ
				cm.gainItem(1212000,1); // ����˫ͷ��
				cm.gainItem(1352400,1); // ���籦��
				}else if(cm.getJob() == 3101){ //-- ��ħ������
				cm.gainItem(1232001,1); // ��ɫ������
				}else if(cm.getJob() == 6100){ //-- ����սʿ
				cm.gainItem(1402078,1); // ��ս֮˫�ֽ�
				}else if(cm.getJob() == 5100){ //-- �׹���
				cm.gainItem(1302001,1); // ��
				}else if(cm.getJob() == 508){ //-- ���Ĵ���
				cm.gainItem(1492066,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 2400){ //-- ��Ӱ
				cm.gainItem(1362001,1); // ��������
				}
				cm.setBossLog("����10",1);
				cm.gainItem(1142609,1,30);
				cm.gainItem(3700012,1,30);
           			cm.worldSpouseMessage(0x20,"[����ϵͳ] ��� "+ cm.getChar().getName() +" �����â�����ֳɳ�ϵͳ�׶�1���� ϵͳ�������������");
				cm.sendOk("�����â�����ֳɳ�ϵͳ�׶ι��� ϵͳ�������������");
				cm.dispose();
			} else if((cm.getPlayer().getLevel() > 29 && cm.getPlayer().getLevel() < 60)  && cm.getBossLog("����30",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 100 || cm.getJob() == 110 || cm.getJob() == 120 || cm.getJob() == 130 || cm.getJob() == 1110){ //-- սʿ
				cm.gainItem(1302003,1); // ̫����
				cm.gainItem(1432002,1); // ��֧ǹ
				}else if(cm.getJob() == 200 || cm.getJob() == 210 || cm.getJob() == 220 || cm.getJob() == 230 || cm.getJob() == 1210){ //-- ��ʦ
				cm.gainItem(1372018,1); // ��ʦ����
				}else if(cm.getJob() == 300 || cm.getJob() == 310 || cm.getJob() == 320 || cm.getJob() == 1310){ //-- ����
				cm.gainItem(1452096,1); // ��ս֮��
				cm.gainItem(1462081,1); // ��ս֮��
				}else if(cm.getJob() == 400 || cm.getJob() == 410 || cm.getJob() == 420 || cm.getJob() == 1410){ //-- ����
				cm.gainItem(1472107,1); // ��ս֮ȭ��
				cm.gainItem(1332043,1); // ˮ����
				}else if(cm.getJob() == 500 || cm.getJob() == 510 || cm.getJob() == 520 || cm.getJob() == 1510){ //-- ����
				cm.gainItem(1492069,1); // ��ս֮��ǹ
				cm.gainItem(1482069,1); // ��սָ֮��
				}else if(cm.getJob() == 2100 || cm.getJob() == 2110){ //-- ս��
				cm.gainItem(1442011,1); // ���˰�
				}else if(cm.getJob() == 3300 || cm.getJob() == 3310){ //-- ��������
				cm.gainItem(1462081,1); // ��ս֮��
				}else if(cm.getJob() == 3500 || cm.getJob() == 3510){ //-- ��еʦ
				cm.gainItem(1492069,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 3200 || cm.getJob() == 3210){ //-- ���鶷ʦ
				cm.gainItem(1372018,1); // ��ʦ����
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- ����
				cm.gainItem(1372018,1); // ��ʦ����
				}else if(cm.getJob() == 2300 || cm.getJob() == 2310){ //-- ˫����
				cm.gainItem(1522004,1); // ˫����ǹ
				cm.gainItem(1352001,1); // ����ħ����ʸ
				}else if(cm.getJob() == 530){ //-- ������
				cm.gainItem(1532004,1); // ��������
				}else if(cm.getJob() == 2400 || cm.getJob() == 3110){ //-- ��ħ����
				cm.gainItem(1322003,1); // ������
				}else if(cm.getJob() == 3600 || cm.getJob() == 3610){ //-- ���
				cm.gainItem(1242002,1); // ɽ���и���
				}else if(cm.getJob() == 2700 || cm.getJob() == 2710){ //-- ҹ�ⷨʦ
				cm.gainItem(1212020,1); // ���������˫ͷ��
				cm.gainItem(1352401,1); // ҫ�۱���
				}else if(cm.getJob() == 3100 || cm.getJob() == 3120){ //-- ��ħ������
				cm.gainItem(1232002,1); // ģ������
				}else if(cm.getJob() == 6100 || cm.getJob() == 6110){ //-- ����սʿ
				cm.gainItem(1402081,1); // ��ս֮˫�ֽ�
				}else if(cm.getJob() == 5100 || cm.getJob() == 5110){ //-- �׹���
				cm.gainItem(1302003,1); // ̫����
				}else if(cm.getJob() == 570){ //-- ���Ĵ���
				cm.gainItem(1492069,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 2400 || cm.getJob() == 2410){ //-- ��Ӱ
				cm.gainItem(1362005,1); // Ѫ·����
				}
				cm.setBossLog("����30",1);
				cm.gainItem(2022956,10); // ���õ��
				cm.gainItem(2001505,100); // ����ҩˮ
           			cm.worldSpouseMessage(0x20,"[����ϵͳ] ��� "+ cm.getChar().getName() +" �����â�����ֳɳ�ϵͳ�׶�2���� ϵͳ�������������");
				cm.sendOk("�����â�����ֳɳ�ϵͳ�׶ι��� ϵͳ�������������");
				cm.dispose();
			} else if((cm.getPlayer().getLevel() >= 60 && cm.getPlayer().getLevel() < 100)  && cm.getBossLog("����60",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 111 || cm.getJob() == 121 || cm.getJob() == 131 || cm.getJob() == 1111){ //-- սʿ
				cm.gainItem(1432006,1); // ʮ��ǹ
				cm.gainItem(1302041,1); // ���͵�
				}else if(cm.getJob() == 211 || cm.getJob() == 221 || cm.getJob() == 231 || cm.getJob() == 1211){ //-- ��ʦ
				cm.gainItem(1372021,1); // ��ʹ֮��
				}else if(cm.getJob() == 311 || cm.getJob() == 321 || cm.getJob() == 1311){ //-- ����
				cm.gainItem(1462084,1); // ��ս֮��
				cm.gainItem(1452099,1); // ��ս֮��
				}else if(cm.getJob() == 411 || cm.getJob() == 421 || cm.getJob() == 1411){ //-- ����
				cm.gainItem(1332046,1); // �����
				cm.gainItem(1472110,1); // ��ս֮ȭ��
				}else if(cm.getJob() == 511 || cm.getJob() == 521 || cm.getJob() == 1511){ //-- ����
				cm.gainItem(1482072,1); // ��սָ֮��
				cm.gainItem(1492072,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 2111){ //-- ս��
				cm.gainItem(1442033,1); // ������
				}else if(cm.getJob() == 3311){ //-- ��������
				cm.gainItem(1462084,1); // ��ս֮��
				}else if(cm.getJob() == 3511){ //-- ��еʦ
				cm.gainItem(1492072,1); // ��սָ֮ǹ
				}else if(cm.getJob() == 3211){ //-- ���鶷ʦ
				cm.gainItem(1372021,1); // ��ʹ֮��
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- ����
				cm.gainItem(1372021,1); // ��ʹ֮��
				}else if(cm.getJob() == 2311){ //-- ˫����
				cm.gainItem(1522008,1); // �»���ҫ
				cm.gainItem(1352002,1); // ����ħ����ʸ
				}else if(cm.getJob() == 531){ //-- ������
				cm.gainItem(1532008,1); // ����������
				}else if(cm.getJob() == 4111){ //-- ��ħ����
				cm.gainItem(1322018,1); // ���ʹ�
				}else if(cm.getJob() == 3611){ //-- ���
				cm.gainItem(1242004,1); // ����С��
				}else if(cm.getJob() == 2711){ //-- ҹ�ⷨʦ
				cm.gainItem(1212047,1); // ־Ը��˫ͷ��
				cm.gainItem(1352402,1); // ��ҫ����
				}else if(cm.getJob() == 3121){ //-- ��ħ������
				cm.gainItem(1232004,1); // ��ɫ����
				}else if(cm.getJob() == 6111){ //-- ����սʿ
				cm.gainItem(1402084,1); // ��ս֮˫�ֽ�
				}else if(cm.getJob() == 5111){ //-- �׹���
				cm.gainItem(1302041,1); // ���͵�
				}else if(cm.getJob() == 571){ //-- ���Ĵ���
				cm.gainItem(1492072,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 2411){ //-- ��Ӱ
				cm.gainItem(1362010,1); // Ѫ������
				}
				cm.setBossLog("����60",1);
				cm.gainItem(5150040,10);
				cm.gainItem(5152053,10);
				cm.gainItem(1003084,1,30);
				cm.gainItem(1052412,1,30);
				cm.gainItem(2022956,10); // ���õ��
				cm.gainItem(2001505,100); // ����ҩˮ
           			cm.worldSpouseMessage(0x20,"[����ϵͳ] ��� "+ cm.getChar().getName() +" �����â�����ֳɳ�ϵͳ�׶�3���� ϵͳ�������������");
				cm.sendOk("�����â�����ֳɳ�ϵͳ�׶ι��� ϵͳ�������������");
				cm.dispose();
			} else if((cm.getPlayer().getLevel() > 99 && cm.getPlayer().getLevel() < 150)  && cm.getBossLog("����100",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 112 || cm.getJob() == 122 || cm.getJob() == 132 || cm.getJob() == 1112){ //-- սʿ
				cm.gainItem(1302078,1); // ��ս֮���ֽ�
				cm.gainItem(1432030,1); // ��������ǹ
				}else if(cm.getJob() == 212 || cm.getJob() == 222 || cm.getJob() == 232 || cm.getJob() == 1212){ //-- ��ʦ
				cm.gainItem(1372072,1); // ��ս֮��������
				}else if(cm.getJob() == 312 || cm.getJob() == 322 || cm.getJob() == 1312){ //-- ����
				cm.gainItem(1462086,1); // ��ս֮��
				cm.gainItem(1452101,1); // ��ս֮��
				}else if(cm.getJob() == 412 || cm.getJob() == 422 || cm.getJob() == 1412){ //-- ����
				cm.gainItem(1472112,1); // ��ս֮ȭ��
				cm.gainItem(1332052,1); // ���������
				}else if(cm.getJob() == 512 || cm.getJob() == 522 || cm.getJob() == 1512){ //-- ����
				cm.gainItem(1492074,1); // ��ս֮��ǹ
				cm.gainItem(1482074,1); // ��սָ֮��
				}else if(cm.getJob() == 2112){ //-- ս��
				cm.gainItem(1442044,1); // ս�궷ɱ�
				}else if(cm.getJob() == 3312){ //-- ��������
				cm.gainItem(1462086,1); // ��ս֮��
				}else if(cm.getJob() == 3512){ //-- ��еʦ
				cm.gainItem(1492074,1); // ��ս֮��ǹ
				}else if(cm.getJob() == 3212){ //-- ���鶷ʦ
				cm.gainItem(1372072,1); // ��ս֮��������
				}else if(cm.getJob() == 2200){ //-- ����
				cm.gainItem(1372072,1); // ��ս֮��������
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- ����
				cm.gainItem(1372072,1); // ��ս֮��������
				}else if(cm.getJob() == 2312){ //-- ˫����
				cm.gainItem(1522012,1); // ������ǹ
				cm.gainItem(1352003,1); // ����ħ����ʸ
				}else if(cm.getJob() == 532){ //-- ������
				cm.gainItem(1532012,1); // ������˹
				}else if(cm.getJob() == 4112){ //-- ��ħ����
				cm.gainItem(1322085,1); // ��ս֮���ֶ���
				}else if(cm.getJob() == 3612){ //-- ���
				cm.gainItem(1242008,1); // �ɺ�����
				}else if(cm.getJob() == 2712){ //-- ҹ�ⷨʦ
				cm.gainItem(1212083,1); // ������˫ͷ��
				cm.gainItem(1352403,1); // ���˱���
				}else if(cm.getJob() == 3122){ //-- ��ħ������
				cm.gainItem(1232008,1); // �пḴ��
				}else if(cm.getJob() == 6112){ //-- ����սʿ
				cm.gainItem(1402075,1); // ��ս֮˫�ֽ�
				}else if(cm.getJob() == 5112){ //-- �׹���
				cm.gainItem(1302078,1); // ��ս֮���ֽ�
				}else if(cm.getJob() == 572){ //-- ���Ĵ���
				cm.gainItem(1492074,1); // ��ս֮��ǹ
				/*}else if(cm.getJob() >= 10000 && cm.getJob() <= 10112){ //-- ��֮��
				cm.gainItem(1562000,1); // ��Ӱ��
				cm.gainItem(1562001,1); // ����˹1��
				cm.gainItem(1562002,1); // ����˹2��
				cm.gainItem(1562003,1); // ����˹3��
				cm.gainItem(1572000,1); // ����֮Ӱ
				cm.gainItem(1572001,1); // ������1��
				cm.gainItem(1572002,1); // ������2��
				cm.gainItem(1572003,1); // ������3��*/
				}else if(cm.getJob() == 2412){ //-- ��Ӱ
				cm.gainItem(1362013,1); // �������
				}
				cm.setBossLog("����100",1);
				cm.gainItem(1003946,1);
				cm.gainItem(1102612,1);
				cm.gainItem(1082540,1);
				cm.gainItem(1052647,1);
				cm.gainItem(1072853,1);
				cm.gainItem(1182070,1);
				cm.gainItem(1113069,1,30);
				cm.gainItem(2022956,10); // ���õ��
				cm.gainItem(2001505,100); // ����ҩˮ
           			cm.worldSpouseMessage(0x20,"[����ϵͳ] ��� "+ cm.getChar().getName() +" �����â�����ֳɳ�ϵͳ�׶�4���� ϵͳ�������������");
				cm.sendOk("�����â�����ֳɳ�ϵͳ�׶ι��� ϵͳ�������������");
				cm.dispose();
			} else if(cm.getLevel() >= 150  && cm.getBossLog("����150",1) == 0 && (cm.getSpace(1) > 5||cm.getSpace(2) > 5||cm.getSpace(3) > 5||cm.getSpace(4) > 5)){
				if(cm.getJob() == 112 || cm.getJob() == 122 || cm.getJob() == 132 || cm.getJob() == 1112){ //-- սʿ
				cm.gainItem(1432137,1); // ������֮ǹ
				cm.gainItem(1302224,1); // ������֮���ֽ�
				}else if(cm.getJob() == 212 || cm.getJob() == 222 || cm.getJob() == 232 || cm.getJob() == 1212){ //-- ��ʦ
				cm.gainItem(1382167,1); // ������֮����
				}else if(cm.getJob() == 312 || cm.getJob() == 322 || cm.getJob() == 1312){ //-- ����
				cm.gainItem(1462157,1); // ������֮��
				cm.gainItem(1452168,1); // ������֮��
				}else if(cm.getJob() == 412 || cm.getJob() == 422 || cm.getJob() == 1412){ //-- ����
				cm.gainItem(1332192,1); // ������֮�̵�
				cm.gainItem(1472178,1); // ������֮ȭ��
				}else if(cm.getJob() == 512 || cm.getJob() == 522 || cm.getJob() == 1512){ //-- ����
				cm.gainItem(1482139,1); // ������ָ֮��
				cm.gainItem(1492149,1); // ������֮��ǹ
				}else if(cm.getJob() == 2112){ //-- ս��
				cm.gainItem(1442181,1); // ������֮ì
				}else if(cm.getJob() == 3312){ //-- ��������
				cm.gainItem(1462157,1); // ������֮��
				}else if(cm.getJob() == 3512){ //-- ��еʦ
				cm.gainItem(1492149,1); // ������֮��ǹ
				}else if(cm.getJob() == 3212){ //-- ���鶷ʦ
				cm.gainItem(1382167,1); // ������֮����
				}else if(cm.getJob() >= 2200 && cm.getJob() <= 2218){ //-- ����
				cm.gainItem(1382167,1); // ������֮����
				}else if(cm.getJob() == 2312){ //-- ˫����
				cm.gainItem(1522108,1); // ������֮˫��ǹ
				}else if(cm.getJob() == 532){ //-- ������
				cm.gainItem(1532113,1); // ������֮����
				}else if(cm.getJob() == 2412){ //-- ��ħ����
				cm.gainItem(1322161,1); // ������֮���ֶ���
				}else if(cm.getJob() == 3612){ //-- ���
				cm.gainItem(1242086,1); // ������֮������
				}else if(cm.getJob() == 2700){ //-- ҹ�ⷨʦ
				cm.gainItem(1212084,1); // ������֮˫ͷ��
				}else if(cm.getJob() == 3122){ //-- ��ħ������
				cm.gainItem(1232079,1); // ������֮������
				}else if(cm.getJob() == 6112){ //-- ����սʿ
				cm.gainItem(1402150,1); // ������֮˫�ֽ�
				}else if(cm.getJob() == 5112){ //-- �׹���
				cm.gainItem(1302224,1); // ������֮���ֽ�
				}else if(cm.getJob() == 572){ //-- ���Ĵ���
				cm.gainItem(1492149,1); // ������֮��ǹ
				}else if(cm.getJob() == 11200){ //-- ��֮��
				cm.gainItem(1252063,1); // ������֮ħ����
				/*}else if(cm.getJob() >= 10000 && cm.getJob() <= 10112){ //-- ��֮��
				cm.gainItem(1562004,1); // ����˹4��
				cm.gainItem(1562005,1); // ����˹5��
				cm.gainItem(1562006,1); // ����˹6��
				cm.gainItem(1562007,1); // ����˹7��
				cm.gainItem(1572004,1); // ������4��
				cm.gainItem(1572005,1); // ������5��
				cm.gainItem(1572006,1); // ������6��
				cm.gainItem(1572007,1); // ������7��*/
				}else if(cm.getJob() == 2412){ //-- ��Ӱ
				cm.gainItem(1362104,1); // ������֮����
				}
				cm.setBossLog("����150",1);
				//cm.gainItem(1113072,1);
				//cm.gainItem(1032220,1);
				//cm.gainItem(1122264,1);
				//cm.gainItem(1132243,1);
				cm.gainItem(2022956,3); // ���õ��
				cm.gainItem(2001505,100); // ����ҩˮ
           			cm.worldSpouseMessage(0x20,"[����ϵͳ] ��� "+ cm.getChar().getName() +" �����â�����ֳɳ�ϵͳ�׶�5���� ϵͳ�������������");
				cm.sendOk("�����â�����ֳɳ�ϵͳ�׶ι��� ϵͳ�������������");
				cm.dispose();
			}else{
			cm.sendOk("�޷������������������Ķ�#b���ֳɳ�ϵͳ���#��");
			cm.dispose();
			}
		cm.dispose();
		} else if (selection == 3) {
			cm.dispose();
			cm.openNpc(9900005,1000);
		} else if (selection == 4) {
			cm.dispose();
			cm.openNpc(9900005,1001);
		} else if (selection == 5) {//�ȼ�����
			cm.dispose();
			cm.openNpc(9900005,1002);
		} else if (selection == 6) {//�����ʴ��뽱��
			cm.dispose();
			cm.openNpc(9900005,1);
		}
	   }
      }
}