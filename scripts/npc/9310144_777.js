/*
���ͶƱ
 */

var a = 0;
var players = null;
var idx = -1;
var endTime = "2014-12-25 12:00:00";

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
        cm.dispose();
	} else {
		if (mode == 0 && a == 0) {
			cm.dispose();
			return;
		}
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
		} else if (a == 0) {
			if (players == null) {
				players = Array();
				var conn = cm.getConnection();
				var sql = "select * from playervote order by number desc";
				var pstmt = conn.prepareStatement(sql);
				var = pstmt.executeQuery();//rs
				var i = 0;
				while(rs.next()) {
					var id = rs.getString('id');
					var title = rs.getString('title');
					var number = rs.getInt('number');

					var pic = rs.getString('picurl');
					players[i++] = Array(id, title, number, pic);
				}
				rs.close();
				pstmt.close();
			}
			var text = "��ů����&����Ů����ƴͶƱ���\r\n";
			i = 0;
			for (var key in players) {
				
				text+="#b#L"+key+"# "+(i+1)+". "+players[key][1]+"#r("+players[key][2]+"Ʊ)#k#l\r\n";
				i++;
			}
			cm.sendSimple(text);
			//cm.dispose();
		} else if (a == 1) {
			if (idx == -1)
				idx = selection;
			var text = "����#b#e"+players[idx][1]+"#n#k������������㣡\r\n";
			text += "#b#L1#�鿴��(��)����Ƭ#l\r\n";
			text += "#L2#Ͷ��(��)һƱ";
			cm.sendNextPrev(text);
		} else if (a == 2) {
			if (selection == 1) {
				cm.sendPrev("�Ѿ�Ϊ������Ƭ�鿴��վ�����Ե��#g#e��һ��#n#k����");
				cm.openWeb(players[idx][3]);
			} else if (selection == 2) {
				if (cm.getBossLogAcc("���ͶƱ") != -1) {
					if (cm.getPlayer().getLevel() <= 180) {
						cm.sendOk("���ĵȼ�����180�����޷�����ͶƱ");
						cm.dispose();
						return;
					}
					if (cm.getPlayer().getTodayOnlineTime() < 30) {
						cm.sendOk("����ʱ�䲻��30���ӣ��޷�����ͶƱ");
						cm.dispose();
						return;
					}
					var currentTimestamp = java.lang.System.currentTimeMillis();
					var endTimestamp = java.sql.Timestamp.valueOf(endTime).getTime();
					//������ȡʱ��
					if (currentTimestamp > endTimestamp) {
						cm.sendOk("ͶƱ�Ѿ���ֹ");
						cm.dispose();
						return ;
					}
					var conn = cm.getConnection();
					var sql = "update playervote set number=number+1 where id = ?";
					var pstmt = conn.prepareStatement(sql);
					pstmt.setInt(1, players[idx][0]);
					pstmt.executeUpdate();
					pstmt.close();
					cm.setBossLogAcc("���ͶƱ", -2);
					cm.sendOk("ͶƱ��ɣ�");
					cm.dispose();
				} else {
					cm.sendOk("���Ѿ����й�ͶƱ���޷��ظ�ͶƱ��");
					cm.dispose();
				}
			}
		}
		 //a
    }//mode
}//f