/*
	���ܣ�ÿ��Ѱ��
	��ע�������ʼID 200100�����������μ�1�����������ĳ�ʼID����100����100200
*/


var status = 0;
var text = "";
var questid = 200100;
var maxtimes = 10;
var playerid = 0;
var accepttimes = 0;
var questitemid = 0;
var questitemcs = 0;
var mapid = 0;

var lastMapList = Array();
var maplist = Array(
	Array(700000000, "��𽹬 - ��𽹬���"),
	Array(702100000, "�������� - ���۱���"),
	Array(100000001, "���ִ� - ���ǵļ�"),
	Array(100000002, "���ִ� - ����˹̹�ļ�"),
	Array(100000003, "���ִ� - ���ȵļ�"),
	Array(500000000, "̩�� - ˮ���г�"),
	Array(500010000, "̩�� - ����������"),
	Array(500010100, "̩�� - ���������"),
	Array(500020000, "̩�� - ����"),
	Array(500020100, "̩�� - ����������"),
	Array(500020101, "̩�� - ������"),
	Array(500020200, "̩�� - С����"),
	Array(500020300, "̩�� - �����"),
	Array(500020400, "̩�� - �����"),
	Array(100000200, "���ִ� - ���ִ幫԰"),
	Array(100000201, "���ִ� - ��������ѵ����"),
	Array(100000202, "���ִ� - ���﹫԰"),
	Array(100010000, "���ִ� - ���ִ山��Сɽ"),
	Array(100010001, "���ִ� - ��ֵ�ɽ��"),
	Array(100010100, "���ִ� - �ξ�С��"),
	Array(102000000, "��ʿ���� - ��ʿ����"),
	Array(102000001, "��ʿ���� - ��ʿ����������"),
	Array(102000002, "��ʿ���� - ��ʿ�����ӻ���"),
	Array(102000003, "��ʿ���� - սʿʥ��"),
	Array(102030000, "����֮�� - Ұ�������"),
	Array(102030100, "����֮�� - Ұ�����������"),
	Array(102030200, "����֮�� - �������������"),
	Array(102030300, "����֮�� - ȼ�յ�����"),
	Array(102030400, "����֮�� - �ҽ�֮��"),
	Array(103000000, "�������� - ��������"),
	Array(103000001, "�������� - �϶�������"),
	Array(103000002, "�������� - �϶�ҩ��"),
	Array(103000003, "�������� - �϶���ʿ�ư�"),
	Array(103000004, "�������� - �϶�ҽԺ"),
	Array(103000005, "�������� - �϶�������"),
	Array(103000006, "�������� - �϶������"),
	Array(104010000, "������ - ����۽���"),
	Array(100000204, "���ִ� - �����ֵĵ���"),
	Array(101000004, "ħ������ - ħ��ʦ�ĵ���"),
	Array(102000004, "��ʿ���� - սʿ�ĵ���"),
	Array(103000007, "�������� - �϶�ҹ��"),
	Array(103000008, "�������� - �����ĵ���"),
	Array(800000000, "������ - �Ŵ�����"),
	Array(800010000, "������ - ӣ��ɽ��"),
	Array(800010100, "������ - ��ʵ���"),
	Array(800010001, "������ - �ƺ�ɽ��"),
	Array(800020000, "������ - ��ѻ����"),
	Array(800020101, "������ - ��ѻ����2"),
	Array(800020110, "������ - ��Ұ������"),
	Array(800020120, "������ - �ӵ�ͼ��ʧ�ٵĴ�ׯ"),
	Array(800020130, "������ - ��������"),
	Array(800020100, "������ - ǰ��Ĺ��֮·"),
	Array(800020200, "������ - ������Ĺ��"),
	Array(800020300, "������ - Ư������Ĺ��"),
	Array(800020400, "������ - ��������·"),
	Array(800030000, "������ - ����֮��"),
	Array(701010000, "�������� - �Ϻ�����"),
	Array(701010100, "�������� - �Ϻ�����ƽԭ"),
	Array(701010200, "�������� - �Ϻ�����Сɽ"),
	Array(701010300, "�������� - ���ݲ��"),
	Array(701010310, "�������� - ��ԭɽ��ش�1"),
	Array(701010320, "�������� - ��ԭɽ��ش�2"),
	//Array(701010321, "�������� - ���������"),
	//Array(701010322, "�������� - ͨ��"),
	//Array(701010323, "�������� - Σ�յ�ɽ��"),
	//Array(701010324, "�������� - ���µ�ɽ��"),
	Array(701010400, "�������� - ����ƽԭ1"),
	Array(701010500, "�������� - ����ƽԭ2"),
	Array(701010600, "�������� - ����ƽԭ3"),
	Array(220000001, "��߳� - �ӻ���"),
	Array(220000002, "��߳� - ҩ��"),
	Array(220000003, "��߳� - ��߳�����ҽԺ"),
	Array(220000004, "��߳� - ��߳�������"),
	Array(220000005, "��߳� - ��߳ǻ�������"),
	Array(220000006, "��߳� - ��߳ǳ���ѵ����"),
	Array(220000100, "��߳� - ��߳���Ʊ��"),
	Array(220000110, "��߳� - ��ͷ<�������֮��>"),
	Array(220000111, "��߳� - ����<�������֮��>"),
	Array(240000001, "��ľ�� - �峤֮��"),
	Array(240000002, "��ľ�� - ҩˮ�̵�"),
	Array(240000003, "��ľ�� - �ǿ�֮��"),
	Array(240000004, "��ľ�� - ����֮��"),
	Array(240000005, "��ľ�� - ��Ħ֮��"),
	Array(240000006, "��ľ�� - ��ķ֮��")
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
			accepttimes = cm.getBossLog("Ѱ������");//cm.getPlayer().MissionGetFinish(playerid, questid);
			text = "\t\t\t#eѰ������ - ������Ļƽ�ڴ�#n\r\n\r\n";
			text += "�ҵĲƸ����鲼������ء���\r\n";
			text += "����ʣ��Ѱ��������#r" + (maxtimes-accepttimes) + "#k ��\r\n";
			text += "#r#L999#Ѱ��������#l#k\r\n\r\n";
			if (cm.getPlayer().MissionStatus(playerid, questid, 0, 4)) {  // �ж��Ƿ��ȡ������
				if (cm.getPlayer().MissionStatus(playerid, questid, 0, 0)) { // �ж��Ƿ��������
					if ((maxtimes-accepttimes)==0) { // �ж��Ƿ񳬹���ɴ���
						text += "���Ѿ�����˽����Ѱ������������0���������~\r\n";
					} else {
						text += "#b#L0#��������#l#k\r\n";
						//cm.MissionReMake(playerid, questid, 1, 0, 0);
					}
					
				} else {
					//mapid = cm.getPlayer().MissionGetMobId(playerid, questid);
					//text += "#e  ��ǰ��#r" + Math.max(1, (accepttimes+1)) + "#k�� #n\r\n\r\n\r\n";
					
					//text += "��û���ҵ����ص�ͼ�𣿣�\r\n\r\n";

					text += "#r#L2#�������� (�޷�����κν������һ�����һ���������)#l\r\n";
				}
			} else {
				text += "#b#L3#��������#l\r\n";
			}
			text += "#b#L111#Ѱ����ǩ�һ�#l#k\r\n";
			text += "#b#L222#����ƽ�����#l#k\r\n";
			cm.sendSimple(text);
		} else if (status == 1) {
			if (selection == 999) {
				status = -1;
				text = "#e#dʲô��Ѱ������#n#k\r\n";
				text += "\t����Ѱ������֮���㽫����һ��#b������Ļƽ�ڴ�#k���һ��������ܲ��б��ص�5����ͼ������ֻ��һ����ͼ�ܴ��ҵĿڴ�������Ҫ��#r10����֮��#k�ҵ����#b��ȷ�ĵ�ͼ#k�����ҵĿڴ����ܻ�÷��Ľ��������������ʱ�䣬��ֻ��#r��������#k����\r\n";
				text += "#e#dʲô��Ѱ����ǩ��#n#k\r\n";
				text += "\t�ڿ�������ʱ�п��ܻ��Ѱ����ǩ��ʹ��Ѱ����ǩ�����Զһ����������Ʒ�����˹��ܽ��ں����汾���ţ�\r\n";
				text += "#e#dʲô�ǻƽ����̣�#n#k\r\n";
				text += "\tʹ�ûƽ����̣����԰�����ֱ��Ѱ�ҵ���ȷ�ı��ص�ͼ��������ͨ�������ûƽ����̣�ͬʱѰ���������м��ʻ�ûƽ����̡�\r\n";
				cm.sendSimple(text);
			} else if (selection == 222) {
				cm.sendYesNo("�Ƿ�Ҫ����#r3000#k�㹺��һ���ƽ����̣�");
			} else if (selection == 0) {			// ���½������� ��ʼ��
				if (cm.getLevel() < 160) {
					cm.sendOk("�ȼ�����160�����޷���ȡ����");
					cm.dispose();
					return ;
				}
				if (cm.getSpace(2)<1) {
					cm.sendOk("������������Ӳ��㣬��������һ�°ɡ�");
					cm.dispose();
					return;
				}
				getRandomArray();
				var questrandid = Math.floor(Math.random()*lastMapList.length);
				mapid = lastMapList[questrandid][0] // �����ͼID
				cm.gainItem(2430641, 1, 1000*60*10);
				text = "�����п��ܲ�����һ�¼�����ͼ������#b10����#k��ʱ��Ѱ�ҵ���ȷ��ͼ�����ҵĻƽ���ӣ�\r\n";
				for(var key in lastMapList) {
					text+="#b"+lastMapList[key][1]+"\r\n";
				}
				text+="#r#e��ʾ��ֻ����һ��Ŷ��һ��Ҫ���Σ�#n#k";
				// ���½�������
				cm.getPlayer().MissionReMake(playerid, questid, 1, 0, 0);
				// д�������ͼID
				cm.getPlayer().MissionSetMobId(playerid, questid, mapid);
				// д�������������
				cm.getPlayer().MissionMaxNum(questid, 0);
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 2) {	// ��������
				cm.getPlayer().MissionFinish(playerid, questid);
				cm.setBossLog("Ѱ������");
				if (cm.haveItem(2430641)) {
					cm.gainItem(2430641, -cm.getItemQuantity(2430641));
				}
				text = "�����ѷ�������";
				cm.sendOk(text);
				cm.dispose();
			} else if (selection == 3) {	// ��������
				if (cm.getLevel() < 160) {
					cm.sendOk("�ȼ�����160�����޷���ȡ����");
					cm.dispose();
					return ;
				}
				if (cm.getSpace(2)<1) {
					cm.sendOk("������������Ӳ��㣬��������һ�°ɡ�");
					cm.dispose();
					return;
				}
				getRandomArray();
				var questrandid = Math.floor(Math.random()*lastMapList.length);
				mapid = lastMapList[questrandid][0] // �����ͼID
				cm.gainItem(2430641, 1, 1000*60*10);
				text = "�����п��ܲ�����һ�¼�����ͼ������#b10����#k��ʱ��Ѱ�ҵ���ȷ��ͼ�����ҵĻƽ���ӣ�\r\n";
				for(var key in lastMapList) {
					text+="#b"+lastMapList[key][1]+"\r\n";
				}
				text+="#r#e��ʾ��ֻ����һ��Ŷ��һ��Ҫ���Σ�#n#k";
				// ��������д���������ID
				cm.getPlayer().MissionMake(playerid, questid, 1, 0, 0, mapid);
				// д�������������
				cm.getPlayer().MissionMaxNum(questid, 0);
				cm.sendOk(text);
				cm.dispose();
			} else {
				cm.sendOk('�˹�����δ���ţ������ڴ���');
				cm.dispose();
			}
		} else if (status == 2) {
			if (cm.getPlayer().getCSPoints(1)>=3000)
			{
				if (cm.getSpace(2)<1) {
					cm.sendOk("����������");
					cm.dispose();
					return ;
				}
				cm.gainNX(-3000);
				cm.gainItem(2430030, 1);
				cm.sendOk("����ɹ�");
			} else {
				cm.sendOk("����㣡");
			}
			cm.dispose();
		}
	}
}

function getRandomArray() {
	if (lastMapList.length>=5)
		return true;
	var newMapId = maplist[Math.floor(Math.random()*maplist.length)];
	for (var key in lastMapList) {
		if (lastMapList[key] == newMapId) {
			getRandomArray();
			return false;
		}
	}
	lastMapList.push(newMapId);
	getRandomArray();
}
