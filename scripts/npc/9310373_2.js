//���ֻ

var status = 0;
var typed = 0;
var myRmbPoints;
//���ֵ���
var pointTypes = Array(10,50,100,500);
//�������
var pointGifts = Array(
	//10�������
	Array(1, 1112918, 1, 3), //�ع��ָ
	//50�������
	Array(2, 2430639, 1),
	//100�������
	Array(3, 2430640, 1),  //������������
	//500�������
	Array(4, 2431995, 1,null, "10������������������")  //���յ�����
	//500�������
	//Array(5, 2431725, 1,null, "�����������"),  //����������������
	//1000�������
	//Array(6, 2431996,1,null, "����װ������")
);
var lastGifts = Array();

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
			var conn = cm.getConnection();
			var sql = "select rmbpoints from accounts where id = ?;";
			var pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, cm.getPlayer().getAccountID());
			var myRPSql = pstmt.executeQuery();
			if (myRPSql.next()) {
				myRmbPoints = myRPSql.getString("rmbpoints");
			} else {
				myRmbPoints = 0;
			}
			myRPSql.close();
			pstmt.close();
			//conn.close();
			var text ="\t��ѡ����Ҫ�һ��Ļ���������һ���ɺ󽫿۳���Ӧ�Ļ��֣�����ɲ鿴�������ϸ���ݡ�\r\n\r\n"
			text+="#k����ǰ�ĳ�ֵ����Ϊ��#r"+myRmbPoints+"#k��\r\n\r\n#b";
			for(var i=0; i<pointTypes.length; i++) {
				text+="#L"+i+"#�һ�"+pointTypes[i]+"�������#l\r\n";
			}
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			var text="������ݣ�\r\n";
			
			typed = selection;
			for(var i=0; i<pointGifts.length; i++) {
				if ((typed+1)!=pointGifts[i][0])
					continue;
				var itemName = "#z"+pointGifts[i][1]+"#";
				if (pointGifts[i][4]!=null)
					itemName = pointGifts[i][4];
				if (pointGifts[i][3]!=null) {
					text+="#v"+pointGifts[i][1]+"##b"+itemName+" - "+pointGifts[i][3]+"��Ȩ x#r"+pointGifts[i][2]+"#k�� #k\r\n";
				}
				else
				{
					text+="#v"+pointGifts[i][1]+"##b"+itemName+"#k x#r"+pointGifts[i][2]+"#k��\r\n";
				}
			}
			//text+=pointGiftContent[selection];
			text+="\r\n��ȷ��Ҫ�һ�������𣿶һ��ɹ��󽫿۳���#r"+pointTypes[selection]+"#k�����";
			cm.sendYesNo(text);
			//cm.dispose();
		} else if (status == 2) {
			//��ȡ������
			var conn = cm.getConnection();
			var sql = "select rmbpoints from accounts where id = ?;";
			var pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, cm.getPlayer().getAccountID());
			var myRPSql = pstmt.executeQuery();
			if (myRPSql.next()) {
				myRmbPoints = myRPSql.getString("rmbpoints");
			} else {
				myRmbPoints = 0;
			}
			myRPSql.close();
			
			//�������Ƿ��㹻
			if (myRmbPoints<pointTypes[typed]) {
				cm.sendOk("�һ�ʧ�ܣ���û����ô�����");
				cm.dispose();
				return;
			}
			//�������Ƿ��п�
			if (cm.getSpace(1)<2 || cm.getSpace(2)<2 || cm.getSpace(3)<2 || cm.getSpace(4)<2 || cm.getSpace(5)<2) {
				cm.sendOk("�һ�ʧ�ܣ���ȷ�����ı���ÿ����λ�������������ӡ�");
				cm.dispose();
				return;
			}
			//���ٻ���
			pstmt = conn.prepareStatement("update accounts set rmbpoints=rmbpoints-"+pointTypes[typed]+" where id = "+cm.getPlayer().getAccountID()+";");
			var isSuccess = pstmt.executeUpdate();
			//�жϼ��ٻ����Ƿ�ɹ�
			if (isSuccess >= 1) {
				//�ɹ����轱��
				for(var i=0; i<pointGifts.length; i++) {
					if ((typed+1)!=pointGifts[i][0])
						continue;
					if (pointGifts[i][3]!=null) {
						cm.gainItem(pointGifts[i][1],pointGifts[i][2],pointGifts[i][3]);
					}
					else
					{
						cm.gainItem(pointGifts[i][1],pointGifts[i][2]);
					}
				}
				cm.sendOk("��ϲ�����һ��ɹ�");
				cm.worldSpouseMessage(0x20,"[�������]����� "+ cm.getChar().getName() +" �һ���"+pointTypes[typed]+"���ֳ�ֵ��������Ǻ�����");
				cm.dispose();
			} else {
				cm.sendOk("δ֪ԭ�򣬶һ�ʧ�ܣ�����ϵ����Ա��");
				cm.dispose();
			}
			pstmt.close();
			//conn.close();
		}
   }
}