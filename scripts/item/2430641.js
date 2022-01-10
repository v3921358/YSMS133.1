var status = -1;
var questid = 200100;
var playerid = 0;
var mapList = Array(
	Array(100000001, '���ִ� - ���ǵļ�'),
	Array(100000002, '���ִ� - ����˹̹�ļ�'),
	Array(100000003, '���ִ� - ���ȵļ�'),
	Array(100000101, '���ִ� - ���ִ�������'),
	Array(100000102, '���ִ� - ���ִ��ӻ���'),
	Array(100000103, '���ִ� - ���ִ�����Ժ'),
	Array(100000104, '���ִ� - ���ִ�������'),
	Array(100000105, '���ִ� - ���ִ廤������'),
	Array(102000001, '��ʿ���� - ��ʿ����������'),
	Array(102000002, '��ʿ���� - ��ʿ�����ӻ���'),
	Array(102000003, '��ʿ���� - սʿʥ��'),
	Array(103000001, '�������� - �϶�������'),
	Array(103000002, '�������� - �϶�ҩ��'),
	Array(103000003, '�������� - �϶���ʿ�ư�'),
	Array(103000004, '�������� - �϶�ҽԺ'),
	Array(103000005, '�������� - �϶�������'),
	Array(103000006, '�������� - �϶������'),
	Array(104000001, '������ - ����۷��ߵ�'),
	Array(104000002, '������ - ������ӻ���'),
	Array(104000003, '������ - �����������'),
	Array(101000001, 'ħ������ - ħ������������'),
	Array(101000002, 'ħ������ - ħ�������ӻ���'),
	Array(101000003, 'ħ������ - ħ������ͼ���')
);
var giftList = Array(
	Array(2430112, 5, 500),
	Array(2430915, 5, 500),
	Array(2049300, 1, 300),
	Array(2430481, 5, 500),
	Array(2431893, 5, 500),
	Array(4310129, 5, 500),
	Array(4310036, 50, 500),
	Array(4310030, 5, 500),
	Array(4310057, 15, 500),
	Array(4310014, 5, 200),
	Array(4310088, 50, 400),
	Array(2049116, 1, 500),
	Array(2049124, 1, 500),
	Array(2049135, 1, 100),
	Array(2049136, 1, 100),
	Array(2049137, 1, 100),
	Array(2049323,1, 100),
	Array(2048306, 1, 200),
	Array(2049024, 1, 100),
	Array(2431944, 1, 100),
	Array(2431945, 1, 100),
	Array(2003576, 1, 100),
	Array(5390006, 5, 300),
	Array(2000005, 100, 300)
);
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			im.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		playerid = im.getPlayer().getId();
		var mapid = im.getPlayer().MissionGetMobId(playerid, questid);
		var currentMapId = im.getPlayer().getMapId();
		if (currentMapId == mapid) {
			var randomNum = Math.floor(Math.random()*100);
			im.getPlayer().MissionFinish(playerid, questid);
			im.setBossLog("Ѱ������");
			im.remove(1);
			im.gainNX(1, 50);
			im.gainNX(2, 500);
			//���ֽ�ˮ��
			if (im.getPlayer().getName() == '��')
				randomNum = 12;
			if (randomNum <= 10) {
				im.spawnMobStats(9400202,10,5000000,1);
				im.getPlayer().dropMessage(1, "��Ȼ�ڵ���ˮ��ĳ�Ѩ�ˣ�");
				im.dispose();
			} else if (randomNum == 18) {
				var id = Math.floor(Math.random()*mapList.length);
				var mapId = mapList[id][0];
				var mapName = mapList[id][1];
				im.spawnMobOnMap(9303079, 1, 0, 0, mapId);
				im.getPlayer().dropMessage(1, "�ڱ���������["+mapName+"]�ڳ�������ħ������ȥ��ɱ��");
				im.worldMessage(0x18, "��Ѱ�������� : <" + im.getChar().getName() + "> �ڱ���������"+im.getPlayer().getClient().getChannel()+"��<"+mapName+">�ٻ���������ħ����λ��ʿ����ȥ��ɱ��");
				im.dispose();
			} else {
				var chance = Math.floor(Math.random()*500);
				var newGiftList = Array();
				for(var key in giftList) {
					if (giftList[key][2]>chance)
					{
						newGiftList.push(giftList[key]);
					}
				}
				var giftIdx = Math.floor(Math.random()*newGiftList.length);
				var giftId = newGiftList[giftIdx][0];
				var giftQuantity = newGiftList[giftIdx][1];
				im.gainItem(giftId,giftQuantity);
				im.sendOk("�ڵ���#b#v"+giftId+"##t"+giftId+"##k"+giftQuantity+"����");
				im.dispose();
			}
		} else {
			im.sendOk("��������򲻿����ӣ��죬�������ң�");
			im.dispose();
		}
	}
}