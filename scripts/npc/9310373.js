//���ֻ
var status = 0;
var cal = java.util.Calendar.getInstance();
var month = cal.get(java.util.Calendar.MONTH) + 1; //����·�

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
			var myRmbPoints = 0;
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
			//var text ="\t11��8�������11��18�����ÿ��ֵ#r1Ԫ#k��ɻ��#r1����#k�����������һ����������\r\n\t11��18��ǰ������ͳ�Ƴ�ֵ����#rǰ10��#k����ң���������ͬ�ȳ�ֵ���İٷֱȽ��е������#b1-3������ֵ���#e#r30%#k#n���е��������һ���ɶ������#rһ������#b���ڶ����������#r3֧����#k���������������#r1֧����#k��4-7������ֵ����#e#r15%#k#n���е���������������ֵ����#e#r5%#k#n���е������\r\n\r\n"
			var text="��ã����ǳ�ֵ�����Ա��#b����ÿ��ֵ1Ԫ���ɻ��1����֣����ֿ��Զһ�����"
			text+="\r\n#k#d����ǰ�ĳ�ֵ����Ϊ��#r"+myRmbPoints+"#k��#k\r\n\r\n#b";
			text+="#L4#�³�ֵ����˵��#l";
			text+="\r\n#L1#�鿴���³�ֵ����#l";
			text+="\r\n#L3##r��ȡ#d#e"+((month-1==0) ? 12 : (month-1))+"��#n#r��ֵ���н���#b#l";
			text+="\r\n#L2##r��ֵ����ֶһ�#b#l";
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			if (selection==1) {
				cm.dispose();
				cm.openNpc(9310373, 1);
			} else if (selection == 2) {
				//cm.sendOk("���ڲ��ǻ��ֶһ���ʱ�䡣");
				cm.dispose();
				cm.openNpc(9310373, 2);
			} else if (selection == 3) {
				cm.dispose();
				cm.openNpc(9310373, 3);
			} else if (selection == 4) {
				var text="\tΪ�ܹ����������᳤���ȶ������е��ʽ����ǲ�ǿ������������������а�����Ϸ������������ң����ǽ�����н������ţ��Դ��ؿ��Ŵ˳�ֵ���С�\r\n";
				text+="\t#b��ֵ���н�ͳ�Ʊ��³�ֵ���ǰ10������ң�ÿ�����һ�����ͳ�ƣ������ڴ��¿�������������ȡ���µĳ�ֵ���н�����#k\r\n";
				text+="\r\n#d#e�³�ֵ���н������£�#n#k\r\n";
				text+="#r#e��һ��#n#k �ɻ��#bȫ����80��HP+10000#k#v1142499#ר��ѫ�£�Ϊ��һ���£����������߼�����ʦħ��x500������ħ��x100\r\n";
				text+="#g======================================================\r\n";
				text+="#r#e�ڶ���#n#k �ɻ��#bȫ����50��HP+8000#k#v1142498#ר��ѫ�£�Ϊ��һ���£����������߼�����ʦħ��x400\r\n";
				text+="#g======================================================\r\n";
				text+="#r#e������#n#k �ɻ��#bȫ����30��HP+3000#k#v1142497#ר��ѫ�£�Ϊ��һ���£����������߼�����ʦħ��x300\r\n";
				text+="#g======================================================\r\n";
				text+="#b#r1-3#b���������³�ֵ�ܽ���20%��ȯ���Լ�������Ӧ������\r\n#r4-6#b���������³�ֵ�ܽ���10%��ȯ���Լ�200��ħ����\r\n#r7-10#b���������³�ֵ�ܽ���5%��ȯ���Լ�100��ħ����";
				cm.sendOk(text);
				cm.dispose();
			}
		}
   }
}