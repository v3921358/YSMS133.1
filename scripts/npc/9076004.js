/*
	���ݣ��������а�
*/

var status = -1;
var db;
var player;
function start() {
	action(1, 0, 0);
	 db = new mChar(cm.getC());
}


var mChar = function(client) {

    this.db = cm.getConnection();
    //��ȡ����
    this.getFishIntegral = function(player) {
        var ps = this.db.prepareStatement("SELECT dyjf FROM `characters` WHERE `id` = ?");
        ps.setInt(1, player.getId());
        var rs = ps.executeQuery();
        var key = 0;
        if (!rs.next()) return false;
        key = rs.getInt(1);
        rs.close();
        ps.close();
        return (key == '' || key == null) ? 0 : key;
    }
    //���ӻ���
    this.updateFishIntegral = function(numbers, player) {
        if (this.getFishIntegral(player) == false) {
            //ԭ���޻���
            var ps = this.db.prepareStatement("UPDATE `characters` SET dyjf = ? WHERE `id` = ?");
            ps.setInt(1, 0);
            ps.setInt(2, player.getId());
            ps.executeUpdate();
            ps.close();
        }
        var ps = this.db.prepareStatement("UPDATE `characters` SET dyjf = ? WHERE `id` = ?");
        ps.setInt(1, numbers + this.getFishIntegral(player));
        ps.setInt(2, player.getId());
        ps.executeUpdate();
        ps.close();
        return;
    };
    this.get_Ranks = function(numbers, player) {
        var ps = this.db.prepareStatement("SELECT `name`,`dyjf`  FROM characters ORDER BY dyjf DESC LIMIT 0,30");
        var rs = ps.executeQuery();
        var result = "�������а�ǰ #r#e" + numbers + " #n#k �����:\r\n\r\n";
        var i = 1;
        while (rs.next() && i <= numbers) {
            result += "#b�� " + i + " ����" + rs.getString(1) + "\t\t\t���֣�" + rs.getString(2) + ".";
            result += "\r\n";
            i++;
        }
        if (!i) {
            result += "\r\n#b��Ǹ����ʱ���������.";
        }
        rs.close();
        ps.close();
        return result;
    };
    //debug
    this.debug = function(str) {
        org.slf4j.LoggerFactory.getLogger(this).info(str);
    };
};

function action(mode, type, selection) {
	player = cm.getPlayer();
	if (mode == 0) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		var text = "#e��ѡ��Ҫ��ѯ�İ񵥣�#r\r\n";
		//text += "\t\t\t#L2#���³�ֵ���а�#l\r\n";
		text += "\t\t\t#L0#����ȼ����а�#l\r\n";
		text += "\t\t\t#L4#���縻�����а�#l\r\n";
		text += "\t\t\t#L5#��ֲ�������а�#l\r\n";
		text += "\t\t\t#L1#�����������а�#l\r\n";
		text += "\t\t\t#L3#ʮ��������а�#l\r\n";
		//text += "\t\t\t#L7#����������а�#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 0) {
			//var list = cm.getRankingTopInstance().getLevelRank().iterator();
			var conn = cm.getConnection();
			var sql = "select name,level,gender,reborns1 from characters where gm<=0 order by reborns1 desc, level desc, exp desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var result = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d�� ���˵ȼ����� ��#k#n\r\n\r\n";
			text += "\t#e����#n\t#e����ǳ�#n\t\t\t#e�ȼ�#n\t\t\r\n";
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
				
				//text += "\t\t\t " + result.getString("reborns1")+"#k";

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
						text += " ������������#k";
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
			cm.openNpc(9310373, 1);
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
			cm.sendOkS(text, 3);
			cm.dispose();
		}else if(selection == 7){
			//cm.dispose();
			cm.openNpc(1511001,1);
			//cm.sendOkS(db.get_Ranks(30, player), 2);
            cm.dispose();
		}
	}
}