/*
	���ݣ��������а�
*/

var status = -1;
var eff = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //�ʹ�
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //�ʹ�1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //����
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //��ϵ
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //���� 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //�ʹ�3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //����
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //שʯ��
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //שʯ��
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //��ϵ
var tz1 = "#fEffect/CharacterEff/1082565/2/0#";  //������
var tz = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
var tz5 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var iconEvent = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var tz2 = "#fEffect/CharacterEff/1082565/0/0#";  //���ӻ�ɫ
var tz3 = "#fEffect/CharacterEff/1082588/0/0#";  //���
var tz4 = "#fEffect/CharacterEff/1082588/3/0#";  //����
var tz51 = "#fEffect/CharacterEff/1082588/1/0#";  //�̵�
var tz6 = "#fEffect/CharacterEff/1112900/2/1#";  //������
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/5/1#";  //������!
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //����
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //����
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //����
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //����
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //����
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //����
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //��������
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //��������
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //��������
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //��������
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //��������
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //���ǻ�

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		var text = "#e#b         ��   "+tz13+"������������"+tz13+"   �� #r\r\n";
		//text += "\t\t   #L2#"+tz11+"�����������а�"+tz11+"#l\r\n";
		text += "\t\t   #L0#"+tz11+"����ȼ����а�"+tz11+"#l\r\n";
		text += "\t\t   #L4#"+tz11+"���縻�����а�"+tz11+"#l\r\n";
		//text += "\t\t#L5#��ֲ�������а�#l\r\n";
		text += "\t\t   #L1#"+tz11+"�����������а�"+tz11+"#l\r\n";
		text += "\t\t   #L3#"+tz11+"ʮ��������а�"+tz11+"#l\r\n";
		text += "\r\n#e#b         ��                      ��\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 0) {
			//var list = cm.getRankingTopInstance().getLevelRank().iterator();
			var conn = cm.getConnection();
			var sql = "select name,level,gender,reborns1 from characters where gm<=0 order by reborns1 desc, level desc, exp desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var result = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d�� ���˵ȼ����� ��#k#n\r\n\r\n";
			text += "\t#e����#n\t#e����ǳ�#n\t\t\t#e�ȼ�#n\t\t #e#n\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!result.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// ������ֿո�
				text += result.getString("name");
				for (var j = 16 - result.getString("name").getBytes().length; j > 0 ; j--) {
					text += " ";
				}
				text += "\t " + result.getString("level");
				
				text += "\t\t\t " + result.getString("reborns1")+"#k";

				text += "\r\n";
			}
			result.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 1) {
			var conn = cm.getConnection();
			var sql = "select name,fame,gender from characters where gm<=0 order by fame desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var list = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d�� ������������ ��#k#n\r\n\r\n";
			text += "\t#e����#n\t#e����ǳ�#n\t\t  #e����#n\t\t  #e�ƺ�#n\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!list.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// ������ֿո�
				text += list.getString("name");
				for (var j = 16 - list.getString("name").getBytes().length; j > 0; j--) {
					text += " ";
				}

				// ���������
				text += "\t " + list.getInt("fame");
				var famevalues = list.getInt("fame");
				var famelength = 0;
				while (famevalues > 0) {
					famevalues = Math.floor(famevalues/10);
					famelength += 1;
				}
				for (var j = 8 - famelength; j > 0; j--) {
					text += " ";
				}

				if (i == 1) {
					if (list.getInt("gender") == 0) {
						text += " ������ż���#k";
					} else {
						text += " ��è�䱦����#k";
					}
				} else if (i == 2) {
					text += "\t #k";
				} else if (i == 3) {
					text += "\t #k";
				}
				text += "\r\n";
			}
			list.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 2) {
			cm.dispose();
			cm.openNpc(9310373,1);
		} else if (selection == 3) {
			var conn = cm.getConnection();
			var sql = "select c.name as leadername, g.name from characters c, guilds g where g.leader=c.id order by g.gp desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var list = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d�� ʮ��������� ��#k#n\r\n\r\n";
			text += "\t#e����#n\t#e��������#n\t\t    #e�峤#n\t\t\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!list.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// ������ֿո�
				text += list.getString("name");
				for (var j = 16 - list.getString("name").getBytes().length; j > 0; j--) {
					text += " ";
				}

				// ����峤����
				text += "\t " + list.getString("leadername");
				var leadername = list.getString("leadername");
				
				for (var j = 16 - list.getString("leadername").getBytes().length; j > 0; j--) {
					text += " ";
				}

				
					text += "\t #k";
				
				text += "\r\n";
			}
			list.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 4) {
			var conn = cm.getConnection();
			var sql = "select c.name, (c.meso+b.money*100000000) as totalmoney from characters c,bank b where b.charid=c.id order by totalmoney desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var list = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d�� ���縻������ ��#k#n\r\n\r\n";
			text += "\t#e����#n\t#e����ǳ�#n\t\t  #e�ʲ�#n\t\t  #e�ƺ�#n\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!list.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// ������ֿո�
				text += list.getString("name");
				for (var j = 16 - list.getString("name").getBytes().length; j > 0; j--) {
					text += " ";
				}

				// ����ʲ�
				var zc = "��"+(list.getLong("totalmoney")/100000000).toFixed(2)+"��";
				text += "  " + zc;
				var totalmoney = list.getLong("totalmoney");
				var totalmoneylength = 0;
				while (totalmoney > 0) {
					totalmoney = Math.floor(totalmoney/10);
					totalmoneylength += 1;
				}
				for (var j = 8 - totalmoneylength; j > 0; j--) {
					text += " ";
				}

				
				text += "#k\r\n";
			}
			list.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 5) {
		/*
			var conn = cm.getConnection();
			var sql = "select c.name,g.level from characters c, memory_garden g where c.gm<=0 and c.id=g.charid order by g.level desc, g.exp desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var result = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d�� ��ֲ�������� ��#k#n\r\n\r\n";
			text += "\t#e����#n\t#e����ǳ�#n\t\t#e��԰�ȼ�#n\t\t #e�ƺ�#n\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!result.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// ������ֿո�
				text += result.getString("name");
				for (var j = 16 - result.getString("name").getBytes().length; j > 0 ; j--) {
					text += " ";
				}
				text += "\t " + result.getString("level");
				if (i == 1) {
					text += "\t\t ���칤�����#k";
				} else if (i == 2) {
					text += "\t\t �����ֻش���#k";
				} else if (i == 3) {
					text += "\t\t ���������ɡ�#k";
				}
				text += "\r\n";
			}
			result.close();
			pstmt.close();
			cm.sendOkS(text, 3);*/
			cm.dispose();
		}
	}
}