var status = -1;
var text;

var starttime = "2016-2-1 11:00:00";
var endtime = "2016-2-2 21:10:00";

var sel;

var invtype = new Array("װ��", "����", "����", "����", "����");

function start() {
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

    var currdate = new Date();
    var define_starttime = new Date(Date.parse(starttime.replace(/-/g,"/")));
    var define_endtime =   new Date(Date.parse(endtime.replace(/-/g,"/")));
    var packages = new Array();

	var ca = java.util.Calendar.getInstance();
	var year = ca.get(java.util.Calendar.YEAR); //������
	var month = ca.get(java.util.Calendar.MONTH) + 1; //����·�
	var day = ca.get(java.util.Calendar.DATE); //��ȡ��
	var hour = ca.get(java.util.Calendar.HOUR_OF_DAY) + 1; //���Сʱ
	var minute = ca.get(java.util.Calendar.MINUTE); //��÷���
	var second = ca.get(java.util.Calendar.SECOND); //�����
	var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);

    if (currdate < define_starttime || currdate > define_endtime) {
	//if (hour != 21 || minute < 00 || minute > 10) { //�������������ʱ��21��10����30��֮�������ȡ

        cm.sendOk("\t\t\t#r�ػ��̵�#k\r\n\r\n#b��ף���ǻ𱬿������Żݳ��\r\n\r\n2��2������9���ػ�#r168���Ǳ�#b�������� (#r 2 #k#b)��FFN����\r\n\r\n����������ĵ�����ҵ��Żݵ����ڴ���������\r\n\r\n�ǻʱ�䡭�� \r\n\r\n���ʼʱ�䣺#r" + starttime + "#k\r\n" + "�����ʱ�䣺#r" + endtime);
        cm.dispose();
        return;
    } else {
        packages = getShopItems();
        if (packages.length == 0) {
            cm.sendOk("��ǰû�пɹ���ĵ��ߡ�");
            cm.dispose();
            return;
        }
    }
    var bosslogstr = "��ʱ�ػ��̵�" + starttime.substring(0, 11);

    if (status == 0) {
        text = "\t\t\t#b��ʱ�ػ��̵�#k\r\n\r\n";
        for (var i in packages) {
            var item = packages[i];
            text += "#L" + i + "##i" + item[1] + "##z" + item[1] + "# (" + (Math.min(item[3] - cm.getBossLog(bosslogstr + item[0]), Math.max(item[2], item[3]))) + "/" + item[3] + ") #b���ʣ��: #r" + item[2] + " " + (item[4] != 0 ? "#b��ȯ��#r" + item[4] : item[5] != 0 ? "#b��ң�#r" + item[5] : "#b�Ǳң�#r" + item[6]) + "#k\r\n";
        }
        cm.sendNext(text);
    } else if (status == 1) {

        sel = selection;
        var item = packages[selection];
        text = "��Ʒ���飺\r\n\r\n#i" + item[1] + "##z" + item[1] + "# (" + (Math.min(item[3] - cm.getBossLog(bosslogstr + item[0]), Math.max(item[2], item[3]))) + "/" + item[3] + ") #b���ʣ��: #r" + item[2] + " " + (item[4] != 0 ? "#b��ȯ��#r" + item[4] : item[5] != 0 ? "#b��ң�#r" + item[5] : "#b�Ǳң�#r" + item[6]) + "\r\n\r\n������Ҫ�����������"
        cm.sendGetNumber(text, 1, 1, item[3]);
    } else if (status == 2) {
        packages = getShopItems();  //ˢ������
        var item = packages[sel];
        if (item[2] <= 0) {
            cm.sendOk("����һ��������Ʒ����������");
        } else if (selection > Math.min(item[3] - cm.getBossLogAcc(bosslogstr + item[0]), Math.max(item[2], item[3]))) {
            cm.sendOk("��������Ʒ�ɹ��������������������");
        } else if (item[4] != 0 && cm.getNX(1) < item[4] * selection) {
            cm.sendOk("��ȯ���㣬����ʧ�ܡ�");
        } else if (item[5] != 0 && cm.getMeso() < item[5] * selection) {
            cm.sendOk("��Ҳ��㣬����ʧ�ܡ�");
        } else if (item[6] != 0 && cm.getRMB() < item[6] * selection) {
            cm.sendOk("RMB���㣬����ʧ�ܡ�");
        } else if (cm.getSpace(Math.floor(item[1] / 1000000)) < 1) {
            cm.sendOk("�����ռ䲻��1�񣬹���ʧ�ܡ�");
        } else {
            if (item[4] != 0) {
                cm.gainNX(1, -item[4] * selection);
            } else if (item[5] != 0) {
                cm.gainMeso(-item[5] * selection);
            } else {
                cm.gainRMB(-item[6] * selection);
            }
            cm.gainItem(item[1], selection);
			cm.setBossLogAcc(bosslogstr + item[0], selection);
            updateShopItem(item[0], selection);
            cm.worldMessageEffect("[��ʱ�ػ��̵�] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC�����ػ��̵��������ػݵ��ߣ�Ŀǰʣ�� " + (item[2] - selection), 1, 10);
	cm.worldSpouseMessage(0x23, "[��ʱ�ػ��̵�] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC�����ػ��̵��������ػݵ��ߣ�Ŀǰʣ�� " + (item[2] - selection)); 
 	cm.worldSpouseMessage(0x23, "[��ʱ�ػ��̵�] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC�����ػ��̵��������ػݵ��ߣ�Ŀǰʣ�� " + (item[2] - selection)); 
	cm.worldSpouseMessage(0x23, "[��ʱ�ػ��̵�] ��ϲ " + cm.getName() + " ���г�7���ſ�NPC�����ػ��̵��������ػݵ��ߣ�Ŀǰʣ�� " + (item[2] - selection)); 


          cm.sendOk("����ɹ���ף����Ϸ��졣");
        }
        cm.dispose();
    }
}

function getShopItems() {
    var ret = new Array();
    var ps = cm.getConnection().prepareStatement("SELECT * FROM data_discount_shop");
    var rs = ps.executeQuery();
    while (rs.next()) {
        ret.push(new Array(rs.getInt("id"), rs.getInt("itemid"), rs.getInt("inventory"), rs.getInt("buylimit"), rs.getInt("cash"), rs.getInt("meso"), rs.getInt("rmb")));
    }
    ps.close();
    rs.close();
    return ret;
}

function updateShopItem(id, quantity) {
    var ps = cm.getConnection().prepareStatement("UPDATE data_discount_shop SET inventory = inventory - ? WHERE id = ?");
    ps.setInt(1, quantity);
    ps.setInt(2, id);
    ps.executeUpdate();
    ps.close();
}