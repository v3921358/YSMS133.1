/*
 ��о��������ƹ���������
 ���ʱ�䣺2014��8��10�� 15:31:26
 �ű����ܣ�����ϵͳ��̨����
 */

importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var time = new Date();
var hour = time.getHours();
var min = time.getMinutes();
var sec = time.getSeconds();
var setupTask;
var PaiMaiIdOnly;
var PaiMaiIdOnly1;
var itemName;


var MaxPrice = 0;
var MaxPlayer;
var MaxpId = 0;



function init() {
    scheduleNew();
}

function scheduleNew() {


    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 1;//5���Ӽ��һ��ʱ��
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}

function startEvent() {
    scheduleNew();
     if (hour == 23) {//ÿ��23��ִ��ˢ��
    var ItemDataBase = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM PaiMaiNpc WHERE bought = 0 LIMIT 1").executeQuery(); //��ѯ�������ݿ�
    var PaiMaiDataBase = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM paimainpcrecord").executeQuery();//�õ���¼���ݿ�
    var UpDateData = DatabaseConnection.getConnection().prepareStatement("update PaiMaiNpc set bought=? where bought=0")
    //var UpDateMax = DatabaseConnection.getConnection().prepareStatement("update paimainpcrecord set status=? where status=0")
    var i = 0;
    while (ItemDataBase.next()) {
        PaiMaiIdOnly = ItemDataBase.getString("PaiMaiId");
        itemName = ItemDataBase.getString("itemName");
        UpDateData.setString(1, 1)
        UpDateData.executeUpdate();//����;
        //��ɶһ���ֱ����NPC������ֶθĳɽ�ɫID
    }//ÿ��������ֻ��1�� ����PaiMaiIdOnly������Ϊ����

    //var RecordMax = DatabaseConnection.getConnection().prepareStatement("select PaiMaiId,charid,CharName,Price,Status from PaiMaiNpcRecord where Price=(select max(Price) from PaiMaiNpcRecord where status = 0 and PaiMaiId = " + PaiMaiIdOnly + ")").executeQuery(); //ȡ���
    var RankDataBase = DatabaseConnection.getConnection().prepareStatement("SELECT PaiMaiId,charid,CharName,Price,Status FROM PaiMaiNpcRecord ORDER BY Price DESC LIMIT 1").executeQuery();
    var UpDateMax = DatabaseConnection.getConnection().prepareStatement("update paimainpcrecord set status=? where status=0")
    while (RankDataBase.next()) {//��ȡ����ɫѶϢ
        MaxPlayer = RankDataBase.getString("CharName");
        MaxPrice = RankDataBase.getString("Price");
        UpDateMax.setString(1, 1)
        UpDateMax.executeUpdate();//����;
        i++;
    }
    var time = parseInt(PaiMaiIdOnly) + 1;
    if (i != 0) {
        em.broadcastServerMsg(5120025, "[����ϵͳ] �� ��" + PaiMaiIdOnly + "�� �������Ѿ������� \r\n�� ��" + time + "�� �����ڿ�ʼ��", true);
        em.broadcastServerMsg(4, "[����С�챨] ��" + PaiMaiIdOnly + "�������Ѿ����������������ĵ���Ϊ��" + itemName + "���ڱ��������У���ң�" + MaxPlayer + "����ȫ��������ߵļ۸�" + MaxPrice + "���ɹ������˱��ڵĵ��ߡ����һ����ף�أ���/�����ɣ�", false);
        em.broadcastServerMsg(6, "[����С�챨] ��" + PaiMaiIdOnly + "�������Ѿ����������������ĵ���Ϊ��" + itemName + "���ڱ��������У���ң�" + MaxPlayer + "����ȫ��������ߵļ۸�" + MaxPrice + "���ɹ������˱��ڵĵ��ߡ����һ����ף�أ���/�����ɣ�", false);
    }
    // - 0 ��������
    // - 1 �����������������
    // - CharId ��ɫID�����Ѿ������ɹ�
    }
}