var status = 0;
//////////////////////////////////////////////////
//�������
var bosslogId = "��֮��ѫ��";
//�����ʼ��ȡʱ��
var startTime = "2015-7-31 18:00:00";
//���������ȡʱ��
var endTime = "2015-8-6 23:00:00";
//��ȡҪ����С�ȼ�
var minLevel = 50;
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
			var text = "#r��ã����Ǹ������ʹ���һ�Ϊ��������¸����#b\r\n";
			//text+= "#b������ʾ�����������ӣ��˸���Խ�ڷܻ�ø���Խ��#k\r\n";
			//text+= "#b��Ҫ˵û�и������Ϳ����ǲ����ڿ���#k\r\n";
			text+= "#n��ѡ��#k\r\n";


			text+="#b#L21#��Ƹ���      #r[�н�Ҷһ�,�����Ա,��ֵ����]#l\r\n";
			text+="#b#L11#��ȡ�׳影��  #r[1��2��-1��8��]#l\r\n";//[1��1��-1��3��]
			text+="#b#L12#99ԪFFN����   #r[1��2��-1��8��21��10�ֿ�ʼ�������]#l\r\n";
			text+="#b#L7#������ϲ���  #r[1��2��20��30�ֿ�ʼ�����������]#l\r\n";			
			text+="#b#L3#�弶������    #r[1��2��-1��8��]#l#k\r\n";




			//text+="#b#L4#��ȡ������  #r[8��14��-8��20��]#l#k\r\n\r\n"
			//text+="#r#L5#28��ͣ��ά������[2015��3��1������8��40��]#l\r\n"
			//text+="#L3#�˽�ʲô�ǽ�������#l\r\n";//����������ڽ���8:30��ʼ����
			//text+="#L13#��ȡ���þ�[12��21��-1��7��]#l\r\n";
			//text+="#L14#��ȡ���[12��21��-1��7��]#l\r\n";
			//text+="#b#L8#�������\t#r[������������Ч]#l#k\r\n\r\n";
			//text+="#b#L9#ħ������\t#r[������������Ч]#l#k\r\n\r\n";
			//text+="#b#L1#��ȡ��֮��ѫ�� #r[����7����Ч]#l#k\r\n";
			//text+="#r#L6#����������˲��գ���������ѹ������#l\r\n#b";
			//text+="#L20#��ȡ[һ�ڵ��]#l\r\n";
			//text+="#L22#��ȡ[��Ա����ң��ֽ�]#l\r\n";

			//text+="#L200##rһ����̵�[FFN��������]#l#k\r\n";

			//text+="#b#L10#�ռ�����  #r[8��13��-8��20��]#l#k\r\n"
			text+="\t"
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
						Array(2430193,1)
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

			} else if (selection == 3) {//�弶���
				cm.dispose();
				cm.openNpc(9310058, 3);
				//cm.dispose();

			} else if (selection == 4) {//�������
				cm.dispose();
				cm.openNpc(9310058, 4);
				//cm.dispose();

			} else if (selection == 5) {//ͣ��ά���������
				cm.dispose();
				cm.openNpc(9310058, 5);
				//cm.dispose();

			} else if (selection == 6) {//���ջ
				cm.dispose();
				cm.openNpc(9310058, 6);
				//cm.dispose();

			} else if (selection == 7) {//�����������
				cm.dispose();
				cm.openNpc(9310375, 50);//�������
				//cm.openNpc(9310058, 7);//�������

			} else if (selection == 8) {//�������
				cm.dispose();
				cm.openNpc(9310058, 1);

			} else if (selection == 9) {// ħ������
				cm.dispose();
				cm.openNpc(9310058, 2);
				//cm.dispose();
			} else if (selection == 10) {// ���꿨
				cm.dispose();
				cm.openNpc(9310058, 10);
				//cm.dispose();
			} else if (selection == 11) {// �״γ�ֵ����
				cm.dispose();
				cm.openNpc(9310382, 501);
				//cm.dispose();
			} else if (selection == 12) {// 99Ԫ������
				cm.dispose();
				cm.openNpc(9310375, 51);// �����̵�
				//cm.openNpc(9310382, 305);// 99Ԫ������
				//cm.dispose();
			} else if (selection == 13) {// ��ѵ���
				cm.dispose();
				cm.openNpc(9310058, 20);
				//cm.dispose();
			} else if (selection == 14) {// ��ѵ��
				cm.dispose();
				cm.openNpc(9310058, 21);
				//cm.dispose();
			} else if (selection == 20) {// ���Ի���
				cm.dispose();
				cm.openNpc(9300011, 10);
				//cm.dispose();
			} else if (selection == 21) {// ��ֵ���
				cm.dispose();
				cm.openNpc(1540419, 88);
				//cm.dispose();
			} else if (selection == 22) {// ��Ա����ֽ�
				cm.dispose();
				cm.openNpc(9300011, 11);
			} else if (selection == 200) {// ��ֵ���
				cm.dispose();
				cm.openNpc(1540419, 7952);
				//cm.dispose();
			}
		}
   }
}