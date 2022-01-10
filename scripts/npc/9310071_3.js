//���ֻ
var status = 0;
var account=null;
var totalpay=0;
var ranking=0;
var cal = java.util.Calendar.getInstance();
var month = cal.get(java.util.Calendar.MONTH) + 1; //����·�
var year = cal.get(java.util.Calendar.YEAR); //������
var bosslogId = year+""+month+"�³�ֵ���";
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
			var payRanking = cm.getConnection().prepareStatement("select p.account, sum(p.rmb) as totalpay from paylog p, accounts a where a.name=p.account and a.gm<=0 and date_format(p.paytime,'%Y-%m')=date_format(DATE_SUB(curdate(), INTERVAL 1 MONTH),'%Y-%m') GROUP BY p.account ORDER BY totalpay desc limit 10;").executeQuery();
			var flag = false;
			var myAccountName =getAccountName(cm.getPlayer().getId());
			while(payRanking.next()) {
				ranking++;
				account=payRanking.getString("account");
				totalpay=payRanking.getString("totalpay");
				if (account==myAccountName) {
					flag=true;
					break;
				}
			}
			payRanking.close();
			if (!flag) {
				cm.sendOk("��û�����ϸ��³�ֵ���а�֮�ڣ��޷���ȡ������");
				cm.dispose();
				return;
			}
			var text = "�����˺ţ�#b"+myAccountName+"#k\r\n���ĳ�ֵ��#r��"+totalpay+"#kԪ\r\n���ϸ��µĳ�ֵ������#e#d"+ranking+"#n#k";
			text+="\r\n��������Ϣ��������ϵ����Ա��";
			cm.sendYesNo(text+"\r\n\r\n#r��ȷ�����İ������㹻�Ŀռ�#k���Ƿ������ȡ�����");
			//cm.dispose();
		} else if (status == 1) {
			if (cm.getBossLogAcc(bosslogId)==-1) {
				cm.sendOk("���Ѿ���ȡ������ˡ�");
				cm.dispose();
				return;
			}
			//ranking = 7;
			var nx=0;
			var text="��";
			switch(ranking) {
				case 1:
					//cm.gainItem(2431725, 1);
					nx=gainNX(0.20);
					gainItemGift(1142499, 80, 10000, "���۰����¡�");
					cm.gainItem(5062024, 100);
					cm.gainItem(5062002, 500);
					cm.gainItem(5062009, 500);
					cm.gainItem(5062500, 500);
					text="�Լ�����ħ����һ���������ӣ�ȫ����80ѫ�£�";
				break;
				case 2:
					gainItemGift(1142498, 50, 8000, "���ɨǧ����");
					cm.gainItem(5062000, 400);
					cm.gainItem(5062002, 400);
					cm.gainItem(5062500, 400);
					nx=gainNX(0.20);
					text="�Դ���ħ����ȫ����50ѫ�£�";
				break;
				case 3:
					gainItemGift(1142497, 30, 5000, "��Ǳ�����á�");
					cm.gainItem(5062009, 300);
					cm.gainItem(5062002, 300);
					cm.gainItem(5062500, 300);
					nx=gainNX(0.20);
					text="�Լ�����ħ����ȫ����30ѫ�£�";
				break;
				case 4:
				case 5:
				case 6:
					cm.gainItem(5062009, 200);
					cm.gainItem(5062002, 200);
					cm.gainItem(5062500, 200);
					text="�Լ�����ħ����";
					nx=gainNX(0.10);
				break;
				case 7:
				case 8:
				case 9:
				case 10:
					cm.gainItem(5062009, 100);
					cm.gainItem(5062002, 100);
					cm.gainItem(5062500, 100);
					text="�Լ�����ħ����";
					nx=gainNX(0.05);
				break;
			}
			cm.getPlayer().dropMessage(1, "��ȡ��"+nx+"���"+text);
			cm.setBossLogAcc(bosslogId, -2);
			cm.worldSpouseMessage(0x15, "[��ֵ�������] : ��ϲ���еڡ�"+ranking+"������� " + cm.getChar().getName() + " ��ȡ�˱��·���"+nx+"���");
			cm.dispose();
		}
   }
}

function getAccountName(charid) {
	var sql = "select name from accounts where id = (select accountid from characters where id = "+charid+");";
	var accountQuery = cm.getConnection().prepareStatement(sql).executeQuery();
	var accountName = null;
	if (accountQuery.next())
		accountName = accountQuery.getString("name");
	accountQuery.close();
	return accountName;
}
function gainNX(percent) {
	var d=Math.floor(totalpay*percent)*1000;
	cm.gainNX(1, d);
	return d;
}
function gainItemGift(itemid, attr, hpmp, owner) {
	var timeStamp = java.lang.System.currentTimeMillis();
	var expirationDate = timeStamp+30*86400*1000;
	var ii = cm.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(itemid)).copy(); // ����һ��Equip��                    
	toDrop.setStr(attr); //װ������
	toDrop.setDex(attr); //װ������
	toDrop.setInt(attr); //װ������
	toDrop.setLuk(attr); //װ������
	toDrop.setMatk(attr); //������
	toDrop.setWatk(attr); //ħ������ 
	toDrop.setSpeed(attr); //�ƶ��ٶ�
	toDrop.setHp(hpmp);
	toDrop.setMp(hpmp);
	toDrop.setJump(attr); //��Ծ
	toDrop.setAcc(attr); //
	toDrop.setExpiration(expirationDate);
	toDrop.setOwner(owner);
	cm.addFromDrop(cm.getC(), toDrop, false);
}