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
			var text = "#r#h ##k����ð���ÿ#r���塢����������#k���ϵ�#b08:00��08:05#k���Բ��뼷ţ�̻�����Ҽ�ţ�̣�ÿ��һ�μ��ɻ��#r2��#k��ȯ~���м��ʻ��#b��ӡ�����ħ����������ף������#kŶ��";
			//text = "����9����9��05�֣�4�����棬����";
			if(hour == 21 && (minute >= 0 && minute <= 5) && (weekday == 6 || weekday == 5 || weekday == 0)){// || cm.getPlayer().getName() == "����Ա��ʿ��"){
				var random = Math.floor(Math.random()*4000);
				if (random == 1258)
				{
					cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �����á���ӡ�����һ�š�", 5120012);
					cm.worldSpouseMessage(0x15, "[��ţ����] : ��ϲ ��" + cm.getChar().getName() + "�� �ڼ�ţ�̵�ʱ������á���ӡ�����һ��.");
					cm.gainItem(2610001, 1);
				} else if (random >= 1000 && random <= 1050) {
					var itemList = Array(5062000,5062002,5062500,5062010,5064000,2340000);
					var itemIdx = Math.floor(Math.random()*itemList.length);
					cm.worldSpouseMessage(0x15, "[��ţ����] : ��ϲ ��" + cm.getChar().getName() + "�� �ڼ�ţ�̵�ʱ������á�"+cm.getItemName(itemList[itemIdx])+"��һ��.");
					cm.gainItem(itemList[itemIdx], 1);
				}
				cm.gainNX(2);
				cm.dispose();
			} else {
				cm.sendOk(text);
				cm.dispose();
			}
		}
	}
}
