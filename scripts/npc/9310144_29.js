/*

 ���ʱ�䣺2014��12��28�� 22:22:28
 �ű����ܣ���Ʒ�����ύ����
 */
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var time = new Date();
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var hour = time.getHours(); //���Сʱ
var minute = time.getMinutes();//��÷���
var second = time.getSeconds(); //�����
var itemid = 4310143;
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            //cm.sendOk("12��31��-1��2��00��00�ֿ���ȫ��������䡣�����������1��3�շ��š�");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) { 
                cm.sendSimple("\t#b�۲�����ϷҲ����׬Ǯ������ӭ������ð�յ�˽����������ֻ��Ҫ������ÿ����ô��Сʱ��ֻҪ��ɱBOSS���м��ʵ��� #rһԪӲ��#k #bʰȡ������ύ���ң�Ȼ��ֻ��Ҫ����д�����п��Ż���֧�������žͿ��Կ�����ȡ�ֽ�100%��ʵ��24Сʱ�ڵ��ˡ�\r\n\r\n\r\n#d����ǰ���Ϊ��#r" +getQty()+ " #dԪ�������ֲ #r"+getQty()+" / 100 #dԪ��\r\n\r\n#b#L0#"+ttt6+" BOSS����Ҵ�ȡ�ֽ�#r(��100������)\r\n#L2#"+ttt6+" #b��д���п��Ż�֧�����ʺ���Ϣ��\r\n#L4#"+ttt6+" #b��д��ȡ�ֽ�#r(24Сʱ�ڵ���)\r\n#L3#"+ttt6+" #b�鿴���˵����#r(���ս���Ȩ�鱦��ð�յ�)#k")
        } else if (status == 1) {
            if (selection == 0) {
		cm.sendGetText("�����ύ���ٸ�#b#t"+itemid+"##k ?");
            } else if (selection == 1) {//����
                Ranking();//����
                cm.dispose();
	    }
        } else if (status == 2) {
		var quantity = parseInt(cm.getText());
                if (quantity >  0&& quantity<= 9999){
		if (cm.haveItem(itemid,quantity)){
		var i =0;
		var DataBase = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM ItemQuantityRanking where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"").executeQuery();
		while(DataBase.next()){
			i++;
		}
		if(i == 0){//��һ��
			var insert = DatabaseConnection.getConnection().prepareStatement("INSERT INTO ItemQuantityRanking (id,charid,charName,itemid,quantity) VALUES(?,?,?,?,?)"); // ��������
			insert.setString(1, null); //�����¼ID
                	insert.setString(2, cm.getPlayer().getId());
                	insert.setString(3, cm.getPlayer().getName());
                	insert.setString(4, itemid);
                	insert.setString(5, quantity);
                	insert.executeUpdate(); //����
		}else{ //��n��
			var UpDateData = DatabaseConnection.getConnection().prepareStatement("update ItemQuantityRanking set quantity=? where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"")
    			UpDateData.setString(1, parseInt(getQty()) + quantity);
   			UpDateData.executeUpdate();//����;
		}
		cm.sendOk("������ӳɹ���\r\nĿǰ���Ĵ��Ϊ�� "+getQty()+"\r\n\r\n#r��100Ԫ��������Ӵ��#k");
		cm.gainItem(itemid,-quantity);
		cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x03, cm.getC().getChannel(), "���ҵ����롻" + " : " + "��ϲ" + cm.getChar().getName() + ",���� "+quantity+" Ԫ��Ŀǰ�ܹ������� "+getQty()+" Ԫ�����ϱ����Ǯ�ˡ�"));
		}else{
			cm.sendOk("�Բ�����û���㹻��#t"+itemid+"#");
		}
}else{
       cm.sendOk("1����9999�������ֿ������롣");

}
		cm.dispose();
        }
    }
}



function getQty() { //�õ�Ŀǰ����
    var Times = 0;
    var EventDataBase = DatabaseConnection.getConnection().prepareStatement("SELECT quantity FROM ItemQuantityRanking where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"").executeQuery();
    while (EventDataBase.next()) {
        Times = EventDataBase.getString("quantity");
    }
    return Times;
}



function Ranking() {
    var Text = "�������£�(1~10����)\r\n\r\n#d"
    var RankDataBase = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM ItemQuantityRanking where itemid = "+itemid+" ORDER BY quantity DESC LIMIT 10").executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        Text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# ����:" + i + "\r\n��ɫ��:" + RankDataBase.getString("charName") + "\r\n�ύ��Ʒ��:" + RankDataBase.getString("quantity") + "\r\n"
        Text += "~~~~~~~~~~~~~~~~~~~\r\n"
        i++;
    }
    cm.sendOk(Text);
}