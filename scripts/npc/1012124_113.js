/*
	���ܣ�ÿ������ - ������20��
	��ע�������ʼID 100100�����������μ�1�����������ĳ�ʼID����100����100200
*/

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
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
	Array(4000000, -1, "��ɫ��ţ�Ŀ�."), // ��ɫ��ţ�� - ��ɫ��ţ�Ŀ�.
	Array(4000269, -1, "��˵������#r������#k���ϼ��������ֶ���"),  //��������
	Array(4000268, -1, "��˵������#r�����#k���ϼ��������ֶ���"), // �����ĳ�� - ������ĺ�ɫ���
	Array(4000270, -1, "��˵������#r�ڷ���#k���ϼ��������ֶ���"), // ������ָ�� - ���ںڷ���������˵ļ���ָ��
	Array(4000190, -1, "��˵��#r�Ϻ�����#k���˿���ɽ���û"),// - ɽ��� - ɽ��Ľǣ�����ô���������е�Σ�ա�
	//Array(4000194, -1, "��˵��#r�Ϻ�����#k���˿���ɽ���û"), // ����ë - �������ë���е�ֲڡ�
	Array(4000187, -1, "��˵��#r�Ϻ�����#k�кܶ�ũ�����㵽�Ƕ���������������"), // ��צ - �����Ľ�,���Խ������׻��Ǻ�«
	Array(4000188, -1, "��˵��#r�Ϻ�����#k�кܶ�ũ�����㵽�Ƕ���������������"), // Ѽ�� - ��ͷѼ�ĵ�,���Խ������׻��Ǻ�«
	Array(4000252, -1, "��˵��#r�Ϻ�����#k�кܶ�ũ�����㵽�Ƕ���������������"), // ���� - ��ë���˵��������õļ���
	Array(4001017, 1, "��#r�ӻ���#k����һ�����Ұ�"), // ������� - �ѱ���ӡ���������������˹������ġ�����������̳����Ĳ��ϡ�
	Array(4001242, 1, "ȥ�ɣ�ȥ����#r�İ�ʨ��#k"), // �İ�ʨ���� - �İ�ʨ������Ľš�
	Array(4000021, -1, "Ҳ�����������#r��Ұ��#kʲô��"), // ����Ƥ - �Ƕ������Ƥ.
	Array(4000052, -1, "��#r����ѩ��#k���˿��������ֶ���"), // ����֮β - ���ǵ�β���ɰ�ɫ��ë����.
	Array(4000232, -1, "��˵����#r���������#k֮��������Դ"), // �������Ļ� - ���������֮��������Դ��
	Array(4000233, -1, "��˵����#r����������#k֮��������Դ"), // �������ľ�ˮ - ����������֮��������Դ��
	Array(4000234, -1, "��˵����#r���ڰ�����#k֮��������Դ"), // �������Ĺ�ͷ - ���ڰ�����֮��������Դ��
	Array(4000238, -1, "��˵����#r��ά#k���ϵ��µ�β��ë"), // ��ά��ë - ��ά���ϵ��µ�β��ë����ۺ���������װ��Ʒ��
	Array(4000239, -1, "��˵����#rѪ�ȹ�ά#k���ŵ�����"), // Ѫ�ȹ�ά������ - Ѫ�ȹ�ά���ŵ����ڡ���ɫ�Ե�ʮ�ֵ����ޡ�
	Array(4001241, 1, "����#r������#k���������ܻ�ȡ����������"), // �������� - ����������Ľš�
	Array(4160000, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�С��ϵ�� // �����ſɶ�С��ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160001, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�Сèϵ�� // �����ſɶ�Сèʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160002, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�����ϵ�� // �����ſɶ�����ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160003, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�С��è // �����ſɶ�С��èʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160004, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�ѩȮ // �����ſɶ�ѩȮʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160005, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ���С�� // �����ſɶԺ�С��ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160006, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ���è // �����ſɶ���èʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160007, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ����� // �����ſɶԿ���ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160008, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ��Ʊ� // �����ſɶ��Ʊ�ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160009, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�ʥ��¹ // �����ſɶ�ʥ��¹ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160010, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ����� // �����ſɶԺ���ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	//Array(4160011, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ��������ֵת�ƾ��� // �����ſ�ת�Ƴ�������ֵ�ľ��ᡣ\n#c����˫���õ��ߣ����֪����ϸ���ݡ�#
	Array(4160012, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�С��ѩ�� // �����ſɶ�С��ѩ��ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160013, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�С�׻� // �����ſɶ�С�׻�ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160014, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ�С���� // �����ſɶ�С����ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(4160015, 1, "��������Ե�#r����������#k�Ƕ�ȥ������"), // ����ָ������ // �����ſɶ������ʹ�õ�ָ��˵���顣\n#c����˫���õ��ߣ���ɿ����鱾��#
	Array(3010001, 1, "��������Ե�#r�����#k��һ�����Ƕ��ƺ�������"), // ��ɫľ�� - ֻ���������������������ɫľ�Ρ���������ÿ10��ɻָ�HP 35
	Array(2000000, -1, "����ҩ���������ۡ�"), // ��ɫҩˮ - ��ɫҩ����ĥ���ɵ�ҩˮ.\n�ָ�HPԼ50.
	Array(2000001, -1, "����ҩ���������ۡ�"), // ��ɫҩˮ - ��ɫҩ�ݾ������ɵ�Ũ��ҩˮ.\n�ָ�HPԼ150.
	Array(2000002, -1, "����ҩ���������ۡ�"), // ��ɫҩˮ - ��ɫҩ�ݾ������ɵĸ߼�Ũ��ҩˮ.\n�ָ�HPԼ300.
	Array(2000003, -1, "����ҩ���������ۡ�"), // ��ɫҩˮ - ��ɫҩ����ĥ���ɵ�ҩˮ.\n�ָ�MPԼ100.
	//Array(2000004, -1, "����ҩ���������ۡ�"), // ����ҩˮ - ��˵�е���ҩ��\nʹHP��MP�ָ�Լ50%�������HP��MP����99,999ʱ��HP��MP�ָ�49,999��
	Array(2000005, -1, "����ҩ���������ۡ�"), // ����ҩˮ - ��˵�е���ҩ��\nʹHP��MPȫ���ָ��������HP��MP����99,999ʱ��HP��MP�ָ�99,999��
	Array(2000006, -1, "����ҩ���������ۡ�") // ������ˮ - ��˵�е���ҩ.\n�ָ�MPԼ300.
	//Array(2000007, -1, "����ҩ���������ۡ�"), // ��ɫҩ�� - �ú�ɫҩˮ����ҩ�衣 HP�ָ�50����Ϊ���С���ܴ�����ҩ
	//Array(2000008, -1, "����ҩ���������ۡ�") // ��ɫҩ�� - �ó�ɫҩˮ����ҩ�衣 HP�ָ�150����Ϊ���С���ܴ�����ҩ
//	Array(-1,-1, "��������Ҫ��һЩ����ο���Լ���"), //��Ϸ��
//	Array(-2,-1,"��������Ҫ��һЩ����ο���Լ���") //���þ�
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
			text = head + "#e�ճ����� - ÿ������20��#n\r\n\r\n�����տ��ٽ�ȡ������#r" + (maxtimes-accepttimes) + "#k ��\r\n���ÿ������������½�����\r\n#r200�����ȯ��������Ϸ���顢15�������ҡ�200���\r\n#kÿ#r5��10��15��20#k��Ϊ#b˫������#k�����м��ʻ��#b��ĸ�̳齱����#kһ����\r\n#k";
			if (cm.getPlayer().MissionStatus(playerid, questid, 0, 4)) {  // �ж��Ƿ��ȡ������
				if (cm.getPlayer().MissionStatus(playerid, questid, 0, 0)) { // �ж��Ƿ��������
					if (cm.getPlayer().MissionStatus(playerid, questid, maxtimes, 3)) { // �ж��Ƿ񳬹���ɴ���
						text += "���Ѿ�����˽��������������0���������~";
					} else {
						text += "#b#L0#" + icon + "��������#l#k\r\n";
						//cm.MissionReMake(playerid, questid, 1, 0, 0);
					}
				} else {
					hitemid = cm.getPlayer().MissionGetMobId(playerid, questid);
					hitemcs = cm.getPlayer().MissionGetMaxNum(playerid, questid, 0);
					text += "#e  ��ǰ��#r" + Math.max(1, (accepttimes+1)) + "#k��  �ռ� #r#z" + hitemid + "# " + hitemcs + "#k��#n\r\n\r\n\r\n";
					if (cm.haveItem(hitemid, hitemcs)) {	// �ж��Ƿ�������������
						text += "#b#L1#" + icon + "�������#l\r\n";
					} else {
						text += "��ô�ˣ���û�ҵ���Ҫ�Ķ�����\r\n\r\n";
					}
					text += "#r#L2#" + icon + "�������� (�޷���ý�����������һ���������)#l\r\n";
				}
			} else {
				text += "#b#L3#" + icon + "��������#l\r\n";
			}
			cm.sendSimple(text);
		} else if (status == 1) {
			if (selection == 0) {			// ���½������� ��ʼ��
				var questrandid = Math.floor(Math.random()*questitems.length);
				questitemid = questitems[questrandid][0];	// �������ID
				if (questitems[questrandid][1] < 0) { 
					questitemcs = Math.floor(Math.random()*20) + 20 + Math.floor(Math.random()*cm.getReborns());	// �����������
				} else {
					questitemcs = questitems[questrandid][1];
				}
				text = head + "#e��#r" + (accepttimes + 1) + "#k����#n\r\n\r\n������ҵ�#b"+questitemcs+"#k��#r#z" + questitemid + "##k\r\n"+questitems[questrandid][2]+"\r\n#k�м���������ȥ���~";
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
				//�������
				cm.getPlayer().MissionFinish(playerid, questid);
				//����ֵ����
				var baseExp = 0.02;
				if (cm.getPlayer().getLevel() > 220 )
					baseExp = 0.01;
				else if (cm.getPlayer().getLevel() > 240) 
					baseExp = 0.001;
				var calcExp = Math.floor(cm.getPlayer().getExpNeededForLevel()*baseExp)+Math.floor(Math.random()*1000000+1000000);
				if (!((accepttimes+1)%5)) {
					calcExp*=2;
					var expNum = 1;
					var lastExp = 0;
					//������鳬��21E
					if (calcExp>=2147483647) {
						//����ֳɼ���
						expNum = Math.floor((calcExp / 2147483647));
						//��������
						lastExp = Math.floor((calcExp % 2147483647));
						//���ݼ��������θ��辭��
						for(var i = 0; i<expNum; i++) {
							cm.gainExp(2147483647);
						}
						//������������
						cm.gainExp(lastExp);
					} else {
						cm.gainExp(calcExp);
					}
					cm.gainItem(4310036, 30);
					if (cm.getEventCount("�·������"+(accepttimes+1))<1){
						cm.gainNX(2, 400);
						cm.gainNX(1,400);
						cm.setEventCount("�·������"+(accepttimes+1));
					}
					if (Math.round(Math.random()*1)) {
						cm.gainItem(2430069, 1);
						cm.channelMessage(0x18, "[ÿ������]" + " : " + "���Ǻ��ˣ���ҡ�" + cm.getChar().getName() + "�������һ����ĸ�̳齱�䡣");
					}
				} else {
					var expNum = 1;
					var lastExp = 0;
					if (calcExp>=2147483647) {
						expNum = Math.floor((calcExp / 2147483647));
						lastExp = Math.floor((calcExp % 2147483647));
						for(var i = 0; i<expNum; i++) {
							cm.gainExp(2147483647);
						}
						cm.gainExp(lastExp);
					} else {
						cm.gainExp(calcExp);
					}
					
					cm.gainItem(4310036, 15);
					
					if (cm.getEventCount("�·������"+(accepttimes+1))<1){
						cm.gainNX(2, 200);
						cm.gainNX(1,200);
						cm.setEventCount("�·������"+(accepttimes+1));
					}
				}	
				cm.gainItem(hitemid, -hitemcs);
				cm.finishActivity(120110);
				text = "��ϲ�����������~~";
				cm.sendOk(text);
				cm.channelMessage(0x18, "[ÿ������]" + " : " + "��ϲ��ҡ�" + cm.getChar().getName() + "��,����ˡ���"+(accepttimes+1)+"�����������˷��Ľ�����");
                //cm.playerMessage(-1, "��þ���"+calcExp);
				//cm.playerMessage(-1, "���������15��");
				//cm.playerMessage(-1, "��ø߼�ħ��1��");
				//cm.playerMessage(-1, "���50���");
				cm.dispose();
			} else if (selection == 2) {	// ��������
				cm.getPlayer().MissionFinish(playerid, questid);
				text = "�����ѷ�������";
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 3) {	// ��������
				var questrandid = Math.floor(Math.random()*questitems.length);
				questitemid = questitems[questrandid][0];	// �������ID
				if (questitems[questrandid][1] < 0) { 
					questitemcs = Math.floor(Math.random()*20) + 20 + Math.floor(Math.random()*cm.getReborns());	// �����������
				} else {
					questitemcs = questitems[questrandid][1];
				}
				text = "#e��#r" + (accepttimes + 1) + "#k����#n\r\n\r\n������ҵ�#b"+questitemcs+"#k��#r#z" + questitemid + "##k\r\n"+questitems[questrandid][2]+"\r\n#k��ȥ���~";
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