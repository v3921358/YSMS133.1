var status = 0;
var itemid = 0;

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
			cm.sendGetText("��������Ҫ��ѯ��#r��ƷID#k��");
		} else if (status == 1){
			itemid = cm.getText()*1;
			if (isNaN(itemid)) {
				cm.sendOk("�ܱ�Ǹ����ƷIDֻ��Ϊ#r����#k��������ȷ�Ϻ��ѯ��");
				cm.dispose();
				return;
			}
			var text = "������ѯ����Ʒ��#v"+itemid+"##r#t"+itemid+"##k������Ϣ���£�\r\n";
			var conn = cm.getConnection();
			var pstmt = conn.prepareStatement("select id from drop_data_global where itemid = "+itemid+" limit 1;");
			var GlobalDropData = pstmt.executeQuery();
			if (GlobalDropData.next()) {
				text += "\r\n#b����Ʒ���й�����ɵ���#k\r\n";
				GlobalDropData.close();
			} else {
				pstmt = conn.prepareStatement("select dropperid from drop_data where itemid = "+itemid+" order by chance;");
				var Monsters = pstmt.executeQuery();
				var count = 0;
				while (Monsters.next()) {
					var monster = Monsters.getString("dropperid");
					text += "#b#o"+monster+"#\r\n";
					count++;
				}
				Monsters.close();
				if (count > 0) {
					text += "#k\r\n��Ϊ���ҵ�#r"+count+"#kֻ�ɱ�����Ʒ�Ĺ���";
				} else {
					text += "#r�ܱ�Ǹ��û�в�ѯ��������ݣ�����ϵ����Ա������ӣ�#k"
				}
			}
			pstmt.close();
			//conn.close();
			cm.sendOk(text);
			cm.dispose();
		}
   }
}