var ca = java.util.Calendar.getInstance();
var year = ca.get(java.util.Calendar.YEAR); //������
var month = ca.get(java.util.Calendar.MONTH) + 1; //����·�
var day = ca.get(java.util.Calendar.DATE);//��ȡ��
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����
var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);
var status = -1;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {   
	if (mode == -1) {
		cm.dispose();
	}else {
        if (status >= 0 && mode == 0) {
		   cm.dispose();
		   return;                    
		}
		if (mode == 1) {
		   status++;
		}else {
		   status--;
		}
		if (status == 0) {
			weekday-=1;
			var text = "-- �װ������ #r#h ##k  ��ð�\r\n#r���塢����������#k���ϵ�#b08:05��08:08#k���Բ��������\r\n#kÿ��һ�����ض�������е��߽���\r\n#r��ȯ x 5��\t\t\t\t��� x 10000\r\n#z4001839# x 5��\t\t\t\t#z4310030# x 2��\r\n#z4310036# x 2��\r\n#k���м��ʻ��#b#z4032733#,#z2610001#,#z2430069#,#z5062009#,#z5062002#,#z5062500#,#z5062010#,#z4001713#,#z5064000#,#z2340000#,#z4001714#,#z2049142#,#z2049135#,#z2049135#,#z2049137#,#z2049138#,#z2049116#Ŷ��#k\r\n#r��ܰ��ʾ����౸1�����Ŷ��������������";
			//text = "����9����9��05�֣�4�����棬����";
			if(hour == 20 && (minute >= 5 && minute <= 8) && (weekday == 6 || weekday == 5 || weekday == 0)){// || cm.getPlayer().getName() == "����Ա��ʿ��"){
				var random = Math.floor(Math.random()*4000);
				//if (random == 999)
				if (random >= 800 && random <= 999) {
				
					cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �����á���ӡ�����һ�š�", 5120012);
					cm.worldSpouseMessage(0x15, "[������] : ��ϲ ��" + cm.getChar().getName() + "�� �ڿ������ʱ������á���ӡ�����һ��.");
					cm.gainItem(2610001, 1);
				} else if (random >= 1000 && random <= 1250) {
				
					cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �����á����䡿һ����", 5120012);
					cm.worldSpouseMessage(0x15, "[������] : ��ϲ ��" + cm.getChar().getName() + "�� �ڿ������ʱ������á����䡿һ��.");
					cm.gainItem(2430069, 1);
				} else if (random >= 1300 && random <= 1550) {
				
					cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �����á����䡿һ����", 5120012);
					cm.worldSpouseMessage(0x15, "[������] : ��ϲ ��" + cm.getChar().getName() + "�� �ڿ������ʱ������á��ʺ��Ҷ��5��.");
					cm.gainItem(4032733, 5);
				} else if (random >= 1600 && random <= 1850) {
				
					cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �����á����䡿һ����", 5120012);
					cm.worldSpouseMessage(0x15, "[������] : ��ϲ ��" + cm.getChar().getName() + "�� �ڿ������ʱ������á����ı�ʯ��10��.");
					cm.gainItem(4001465, 10);


				} else if (random >= 2000 && random <= 3500) {
					var itemList = Array(5062009,5062009,5062009,5062500,5062009,5062009,5062500,5062009,5062002,5062500,5062010,4001713);
					var itemIdx = Math.floor(Math.random()*itemList.length);
					cm.worldSpouseMessage(0x15, "[������] : ��ϲ ��" + cm.getChar().getName() + "�� �ڿ������ʱ������á�"+cm.getItemName(itemList[itemIdx])+"��һ��.");
					cm.gainItem(itemList[itemIdx], 1);

				} else if (random >= 3600 && random <= 3999) {
					var itemListj = Array(5064000,2340000,4001714,2049142,2049135,2049135,2049137,2049138,2049116);
					var itemIdx = Math.floor(Math.random()*itemListj.length);
					cm.worldSpouseMessage(0x15, "[������] : ��ϲ ��" + cm.getChar().getName() + "�� �ڿ������ʱ������á�"+cm.getItemName(itemListj[itemIdx])+"��һ��.");
					cm.gainItem(itemListj[itemIdx], 1);
				}
				cm.gainNX(5);//���5��
				cm.gainMeso(10000);//���1W
				cm.gainItem(4001839,5);//����
				//cm.gainItem(4001465,1);//���ı�ʯ
				cm.gainItem(4310030,2);//�˶����
				cm.gainItem(4310036,2);//�����߱�
				//cm.gainItem(4032733,1);//�ʺ��Ҷ
				cm.dispose();
			} else {
				cm.sendOk(text);
				cm.dispose();
			}
		}
	}
}
