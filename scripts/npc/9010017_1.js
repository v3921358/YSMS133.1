var status = 0;
var typed = 0;
var itemid = 0;
var itemprice = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == -1) {
            cm.dispose();
		} else if (status == 0) {
			var text = "#r#e�����װ����ϵͳ#k#n\r\n";
			text+="#b#L1#���Ӿ����װ#l\r\n";
			text+="#b#L2#�޸�/ɾ�������װ#l\r\n";
			cm.sendSimple(text);
		} else if (status == 1) {
			if (selection == 1 || typed==1) {
				cm.sendGetNumber("#d#eStep 1.#n#k ����Ҫ��ӵ���ƷID��", 0, 999999, 9999999);
				typed = 1;
			} else if (selection == 2) {
				cm.dispose();
			}
		} else if (status == 2) {
			if (typed==1) {
				itemid = selection;
				if (cm.getItemName(itemid)==null)
				{
					status = 0;
					cm.sendNext("�����ڵ�ID������������"+itemid);
				} else {
					cm.sendGetNumber("#d#eStep 2.#n#k ����ӵ���ƷΪ#b<#z"+itemid+"#>#k����������Ʒ�ļ۸�", 0, 1, 9999999);
				}
			} else {
				
			}
		} else if (status == 3) {
			if (typed==1) {
				itemprice = selection;
				var conn = cm.getConnection();
				var delSql = "delete from npccashshop where itemid = ?";
				var pstmt = conn.prepareStatement(delSql);
				pstmt.setInt(1, itemid);
				pstmt.executeUpdate();
				
				var sql = "insert into npccashshop(itemid,itemname,itemprice) values(?,?,?)";
				pstmt = conn.prepareStatement(sql);
				pstmt.setInt(1, itemid);
				pstmt.setString(2, cm.getItemName(itemid));
				pstmt.setInt(3, itemprice);
				pstmt.executeUpdate();
				pstmt.close();
				//conn.close();
				cm.sendSimple("��ӳɹ�");
				status = -1;
			}
		}
    }//mode
}//f