var status = 0;
//////////////////////////////////////////////////
//�������
var bosslogId = "��֮��ѫ��";
//�����ʼ��ȡʱ��
var startTime = "2015-7-7 18:00:00";
//���������ȡʱ��
var endTime = "2015-7-14 23:00:00";
//��ȡҪ����С�ȼ�
var minLevel = 180;
//��Ҫ����ʱ��
var minOnlineTime = 240;
//////////////////////////////////////////////////
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
			var text = "��ã����ǻ��ʹ���һ�Ϊ��������»��\r\n";
			//text+="#b#L1#��ȡ��֮��ѫ��[����7����Ч]#l\r\n";
			//text+="#r#L6#����������˲��գ���������ѹ������#l\r\n#b";
			//text+="#L2#��ȡ�����弶������[2015��7��18��-2015��7��24��]#l\r\n";
			//text+="#L3#��ȡ�����׳影��[2015��7��7��-2015��7��13��]#l\r\n";
			text+="#L4#�콵����[2015��7��21��-2015��7��30��]#l\r\n"
			//text+="#r#L5#28��ͣ��ά������[2015��3��1������8��40��]#l\r\n"
			//text+="#L3#�˽�ʲô�ǽ�������#l\r\n";//����������ڽ���8:30��ʼ����
			//text+="#r#L7#��ȡ�����������[2015��7��17������8��30�ֿ�ʼ����]#l\r\n"
			cm.sendSimple(text);
		} else if (status == 1){
			if (selection == 1) {
				
				if (cm.getPlayer().getLevel() < minLevel) {
					cm.sendOk("���ĵȼ�С��#r"+minLevel+"#k�����޷���ȡ����������Ŷ��");
					cm.dispose();
					return; 
				}
				if (cm.getPlayer().getTodayOnlineTime() < minOnlineTime) {
					cm.sendOk("����ʱ��С��#r"+minOnlineTime+"#k���ӣ��޷���ȡ����������Ŷ��");
					cm.dispose();
					return; 
				}
				var currentTimestamp = java.lang.System.currentTimeMillis();
				var startTimestamp = java.sql.Timestamp.valueOf(startTime).getTime();
				var endTimestamp = java.sql.Timestamp.valueOf(endTime).getTime();
				//������ȡʱ��
				if (currentTimestamp < startTimestamp || currentTimestamp > endTimestamp) {
					cm.sendOk("��ȡʱ��Ϊ��#r"+startTime.substring(0, 16)+"#k��#r"+endTime.substring(0, 16)+"#k����ǰʱ�仹δ�����Ѿ���ʱ");
					cm.dispose();
					return ;
				}
				
				
					//����������� ID,����
					var itemList = Array(
						Array(2430505,1)
					);
					var str = "���ɹ���ȡ�����������������£�\r\n";
					for (var key in itemList) {
						str +="#b#v"+itemList[key][0]+"##t"+itemList[key][0]+"##kx#r"+itemList[key][1]+"#k\r\n";
						cm.gainItem(itemList[key][0], itemList[key][1]);
					}
					cm.sendOk(str);
					cm.dispose();
				
			} else if (selection == 2) {/*
				var giftBosslogId = '�������20150101';
				if (cm.getBossLogAcc(giftBosslogId)!=-1) {
					
					if (cm.getPlayer().getLevel() < minLevel) {
						cm.sendOk("���ĵȼ�С��#r"+minLevel+"#k�����޷���ȡ����������Ŷ��");
						cm.dispose();
						return; 
					}
					if (cm.getPlayer().getTodayOnlineTime() < minOnlineTime) {
						cm.sendOk("����ʱ��С��#r"+minOnlineTime+"#k���ӣ��޷���ȡ����������Ŷ��");
						cm.dispose();
						return; 
					}
					//д��BOSSLOG
					cm.setBossLogAcc(giftBosslogId, -2);
					var itemList = Array(
						Array(5062000, 10),
						Array(5062002, 10),
						Array(5062500, 10),
						Array(2431741, 5)
					);
					var str = "���ɹ���ȡ�˽������������������£�\r\n";
					for (var key in itemList) {
						str +="#b#v"+itemList[key][0]+"##t"+itemList[key][0]+"##kx#r"+itemList[key][1]+"#k\r\n";
						cm.gainItem(itemList[key][0], itemList[key][1]);
					}
					cm.sendOk(str);
					cm.dispose();
				} else {
					cm.sendOk("���Ѿ��������ˣ�");
					cm.dispose();
				}*/
				cm.dispose();
				cm.openNpc(9201116, 1);
			} else if (selection == 3) {
				cm.dispose();
				cm.openNpc(9201116, 2);
				//cm.dispose();
			} else if (selection == 4) {
				cm.dispose();
				cm.openNpc(9201116, 3);
				//cm.dispose();
			} else if (selection == 5) {
				cm.dispose();
				cm.openNpc(9201116, 4);
				//cm.dispose();
			} else if (selection == 6) {
				cm.dispose();
				cm.openNpc(9201116, 5);
				//cm.dispose();
			} else if (selection == 7) {
				cm.dispose();
				cm.openNpc(9201116, 6);
				//cm.dispose();
			}
		}
   }
}