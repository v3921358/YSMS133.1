/*

 ���ʱ�䣺2014��12��28�� 22:22:28
 �ű����ܣ�������Ʒ�����ύ����
 */
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var time = new Date();

var hour = time.getHours(); //���Сʱ
var minute = time.getMinutes();//��÷���
var second = time.getSeconds(); //�����
var itemid = 4031132;//���꿨4031132������2431854
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
            cm.sendOk("ÿ�����Զ������������������������Ҫ�ύ#r#t4031132##k#n\r\n\r\n��ܰ��ʾ:ǰ���������Ǳ�ְҵ����Ŷ���޷������ְҵʹ��\r\n\r\n����������ڻ��������ͳ�����ݣ���2�췢�Ž�����");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) { 
			//if (month == 8 && day >= 1 && day <= 7 && (hour == 22 && (minute >= 10 && minute <= 45)) || hour == 22 && (minute >= 01 && minute <= 45)) {
                cm.sendSimple("#r�����ʱ�䣺1.23��20:00����1.30��23:00�ֽ���#k\r\n#d������ #rһ#d ��#n ����Ϊһ����ڣ�1�ڣ�\r\n#b��ڼ�ֻҪ�����ռ� #r#t4031132# #b�����Ͻ����������ƶȽ���\r\n#b\t��һ������ #r��ְҵ�������� x 1#b\r\n\t�ڶ������� #r��ְҵ140���� x 1#b\r\n\t���������� #r��ְҵ140���� x 1#b\r\n\t����ʮ���� #r��������ħ�� x 200#b\r\n#d���в��뱾��߾��ɻ��#r�ύ1����ɫ���� x 2���#n#b����#k#b \r\n��ǰ�������У� #r" + cm.getItemQuantity("4031132") + " #b����Ŀǰ���Ѿ��Ͻ��ˣ� #r"+getQty()+" #b����\r\n#b#L1# ����鿴����\t\t#L0# �����ύ��Ʒ")//\r\n#L0# �����ύ��Ʒ��
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
		var DataBase = cm.getConnection().prepareStatement("SELECT * FROM ItemQuantityRankingdiaoyu where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"").executeQuery();
		while(DataBase.next()){
			i++;
		}
		if(i == 0){//��һ��
			var insert = cm.getConnection().prepareStatement("INSERT INTO ItemQuantityRankingdiaoyu (id,charid,charName,itemid,quantity) VALUES(?,?,?,?,?)"); // ��������
			insert.setString(1, null); //�����¼ID
                	insert.setString(2, cm.getPlayer().getId());
                	insert.setString(3, cm.getPlayer().getName());
                	insert.setString(4, itemid);
                	insert.setString(5, quantity);
                	insert.executeUpdate(); //����
		}else{ //��n��
			var UpDateData = cm.getConnection().prepareStatement("update ItemQuantityRankingdiaoyu set quantity=? where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"")
    			UpDateData.setString(1, parseInt(getQty()) + quantity);
   			UpDateData.executeUpdate();//����;
		}
		cm.sendOk("�������ӳɹ���\r\nĿǰ���ľ�������Ϊ�� "+getQty()+"\r\n\r\n");
		cm.gainItem(itemid,-quantity);
		cm.gainNX(1, quantity*2)
		cm.worldSpouseMessage(0x23, "�������ɫ������ : " + cm.getChar().getName() + " �Ͻ� "+quantity+" ����ɫ����,����� "+quantity * 2+" ���,Ŀǰ�ܹ��Ͻ��� "+getQty()+" ����");
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
    var EventDataBase = cm.getConnection().prepareStatement("SELECT quantity FROM ItemQuantityRankingdiaoyu where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"").executeQuery();
    while (EventDataBase.next()) {
        Times = EventDataBase.getString("quantity");
    }
    return Times;
}



function Ranking() {
    var Text = "�������£�(1~10����)\r\n\r\n#d"
    var RankDataBase = cm.getConnection().prepareStatement("SELECT * FROM ItemQuantityRankingdiaoyu where itemid = "+itemid+" ORDER BY quantity DESC LIMIT 10").executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        Text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# #b����:#r�� " + i + " ��#k#b     ��ɫ��: #r" + RankDataBase.getString("charName") + " #k#b   �ύ��Ʒ��:#r" + RankDataBase.getString("quantity") + "#b��#k "
        //Text += "~~~~~~~~~\r\n"
        i++;
    }
    cm.sendOk(Text);
}