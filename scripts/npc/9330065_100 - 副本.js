var status = 0;
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var npcid = 9330065;
var gardenData = null;
var typed=0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		gardenData=getGardenInfo();
		var text = icon1+" #d���Ļ�԰�ȼ���#r["+gardenData['level']+"]#d ��\r\n";
		text+=icon1+" ���Ļ�����#r["+cm.getPlayerEnergy()+"]#d ��\r\n";
		text+=icon1+" ��԰����ֵ��#r["+gardenData['exp']+"/1000]#k\r\n\r\n";
		text+="#b#L0#"+icon2+" �����ҵĻ�԰#l";
		cm.sendSimple(text);
	} else if (status == 1) {
		switch(selection) {
			case 0:
				var text="\t\t\t\t\t#d#e�� �ҵĻ�԰ ��#n#k\r\n";
				text+="#L0#"+icon1+" [����ħ����] ������컹ʣ�� 0��18Сʱ32��#l";
				typed=selection;
				cm.sendOkS(text, 3);
				//cm.dispose();
			break;
			case 1:
				cm.dispose();
				cm.openNpc(npcid, 100);
			break;
			case 2:
			break;
			case 3:
			break;
		}
	} else if (status == 2) {
		switch(selection) {
			case 0:
				var text="\t\t\t\t\t#d#e�� �ҵĻ�԰ ��#n#k\r\n";
				text+="����ħ����\r\n";
				text+="������컹ʣ�� 0��18Сʱ32��\r\n"
				text+="#L0#��ˮ#l\t#L1#ʩ��#l\t#L2#�ڳ�#l";
				cm.sendOk(text);
				cm.dispose();
			break;
		}
	}
}

function getGardenInfo() {
	var charid = cm.getPlayer().getId();
	var sql = "SELECT * FROM memory_garden WHERE charid = ? limit 1";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, charid);
	var data = pstmt.executeQuery();
	if (data.next()) {
		var info = Array();
		info['level']=data.getInt('level');
		info['exp']=data.getInt('exp');
		data.close();
		pstmt.close();
		return info;
	} else {
		sql = "INSERT INTO memory_garden(charid, level, exp) VALUES(?,1,0)";
		pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, charid);
		pstmt.executeUpdate();
		pstmt.close();
		return getGardenInfo();
	}
}