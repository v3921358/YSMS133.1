/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * 2015��8��14�� 20:53:21
 * ��Ը��ϵͳ
 * 
 * ��Ըϵͳevent�������
 *  - wish = open  ������Ը״̬
 *  - wish = close �ر���Ը״̬
 *  - ��Ըϵͳ�е�X�ڣ�ÿ���ʺ�ÿ��ֻ�ܲ���һ�Σ�һ��һ�ڡ�
 *  - ÿ������12��ˢ�ºͿ���
 *  
 *  û��ʵ�ֵ�Ը����ɾ�������������ˡ�
 *  wishstatus - 0������û����ȡ 1�����Ѿ���ȡ
 *  �Ҽ�¼����ֻ��ѯ7���ڵ�
 *  
 *  wishitem Ϊ 1��ȯ
 *              2����
 *              3Ԫ��
 */

var iconComit = "#fUI/UIWindow2/CN_Survey/BtSubmit/normal/0#"
var iconGhost = "#fUI/UIWindow2/FadeForEvent/icon1#"
var eim, em;
var status = 0;
var typed;
var text = " ";
var wishstatus;
var record = new Array();
var WishTimes = 1;

//��Ը��
var WishList = new Array(
        new Array(5062009, 1),
        new Array(5062500, 1),
        new Array(2431944, 1),
        new Array(2431945, 1),
        new Array(2046007, 1),
        new Array(2046006, 1),
        new Array(2046106, 1),
        new Array(2046107, 1),
        new Array(2049752, 1)
        );//itemid,����

function start() {
    status = -2;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == -1) {
        em = cm.getEventManager("WishTreeSystem");
        eim = em.getInstance("WishTreeSystem")
        if (eim == null) {
            cm.sendOk("���ڻ��û�п�ʼ�����߹���Ա��û�����óɿ���״̬��")
            cm.dispose();
        } else {
            if (em.getProperty("WishName") == "null") {
                cm.sendNext("���컹û�й���Ը��֮��Ŷ~~ ������һ��������")
            } else {
                cm.sendNext("���յ�Ը��֮����:\r\n#b" + em.getProperty("WishName") + "��\r\n#r - ������һ������Ŷ~~");
            }
        }
    } else if (status == 0) {
        if (eim == null) {
            cm.sendOk("���ڻ��û�п�ʼ�����߹���Ա��û�����óɿ���״̬��")
            cm.dispose();
        } else {
            // var text = "����Ը��֮�ǣ�\r\n"
            //text += "1������С�ȷ�\r\n"
            text = "#e-------------------------------------------#n\r\n"
            text += "\t\t\t\t" + iconGhost + "#r#e#h0##n" + iconGhost + "#d\r\n\t\t���ǳ���ϣ������Ը���飬������ʲô�أ�\r\n#b"
            //if (em.getProperty("wish") == "open") {//�������Ը����״̬
            text += "\t\t   #d#e#L0# ����������Ը����#l\r\n"
            // }
            text += "\t#L2##r�����ѯ�ҵ�Ը���嵥���������콱��#b#l\r\n\r\n"
            text += "-------------------------------------------\r\n"
            text += "      #L1#�鿴��Ը�������ȷʹ�÷�����#l\r\n\r\n"
            cm.sendSimple(text);
        }
    } else if (status == 1) {
        typed = selection;
        switch (selection) {
            case 2:
                var i = 0;
                text = "���������Ը���嵥��\r\n#r - �����ʾ��ʵ�֣�������ȡ������\r\n#b"
                var AllRecordStore = cm.getConnection().prepareStatement("SELECT * FROM wishtreesystem_store where wishCharid = " + cm.getPlayer().getId() + " Order By  id Desc LIMIT 100").executeQuery();
                var AllRecord = cm.getConnection().prepareStatement("SELECT * FROM wishtreesystem where wishCharid = " + cm.getPlayer().getId() + "").executeQuery();
                while (AllRecord.next()) {//�õ���Ը�ֿ�ļ�¼����
                    // 0 δ���� 1 δʵ�� 2��ʵ�� 3����ȡ
                    text += "\r\n#L" + i + "#[��#r" + AllRecord.getString("id") + "#b��]  #v" + AllRecord.getString("wishitem") + "#  #t" + AllRecord.getString("wishitem") + "##l  #d - δ����#b"
                    var recordPart = Array(AllRecord.getString("id"), AllRecord.getString("wishitem"), AllRecord.getString("wishitemQty"), AllRecord.getString("wishstatus"));
                    record.push(recordPart);
                    i++;
                }
                while (AllRecordStore.next()) {//�õ���¼����
                    // 0 δ���� 1 δʵ�� 2��ʵ�� 3����ȡ
                    if (AllRecordStore.getString("wishstatus") == 1) {//δʵ��
                        text += "\r\n#L" + i + "#[��#r" + AllRecordStore.getString("wishid") + "#b��]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #d -δʵ��#b"
                    } else if (AllRecordStore.getString("wishstatus") == 2) {//��ʵ��
                        text += "\r\n#L" + i + "#[��#r" + AllRecordStore.getString("wishid") + "#b��]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #r - ��ʵ��#b"
                    } else if (AllRecordStore.getString("wishstatus") == 0) {//δ����
                        text += "\r\n#L" + i + "#[��#r" + AllRecordStore.getString("wishid") + "#b��]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #d - δ����#b"
                    } else if (AllRecordStore.getString("wishstatus") == 3) {//����ȡ
                        text += "\r\n#L" + i + "#[��#r" + AllRecordStore.getString("wishid") + "#b��]  #v" + AllRecordStore.getString("wishitem") + "#  #t" + AllRecordStore.getString("wishitem") + "##l  #d - ����ȡ#b"
                    }
                    i++;
                    var recordPart = Array(AllRecordStore.getString("wishid"), AllRecordStore.getString("wishitem"), AllRecordStore.getString("wishitemQty"), AllRecordStore.getString("wishstatus"));
                    record.push(recordPart);
                }
                if (i == 0) {
                    cm.sendOk("������˼��������ʱû��������Ը�嵥�� \r\n��Ը�嵥��Ҫÿ�ո���Ը��֮��֮�󣬲�����ʾ��");
                    status = -1;
                } else {
                    cm.sendSimple(text);
                    status = 3;
                }
                break;
            case 1:
                cm.sendNext("��Ը�Ļ�����ѡ��Ŀǰ��Ը�ص���Ʒ����ô�ණ�����϶���һЩ������Ҫ�ģ�ѡ����Լ���Ҫ�Ķ���֮����д��Ը���룬�Ϳ�������Ը���嵥�ˣ���Ըϵͳÿ��̶�ʱ�佫���ҳ�Ը��������ˣ�����ȫ�����档��������ΪԸ��֮�ǵĻ����������Ұɣ���")
                status = -1;
                break;
            case 0:
                //if (em.getProperty("wish") == "open") {//�������Ը����״̬
                if (em.getProperty("wish") == "close") {//�������Ը�ر�״̬
                    var text = "������Ը�������ж�����������Ը�õ�ʲô��Ʒ�أ�\r\n#b"
                    for (var i = 0; i < WishList.length; i++) {
                        if (WishList[i][0] == 1) {//��ȯ
                            text += "#L" + i + "# ��Ը��� " + WishList[i][1] + " ��ȯ����\r\n"
                        } else if (WishList[i][0] == 2) {//����ȯ
                            text += "#L" + i + "# ��Ը��� " + WishList[i][1] + " ����ȯ����\r\n"
                        } else if (WishList[i][0] == 2) {//Ԫ��
                            text += "#L" + i + "# ��Ը��� " + WishList[i][1] + " Ԫ������\r\n"
                        } else {
                            text += "#L" + i + "# ��Ը��� #i" + WishList[i][0] + "# #t" + WishList[i][0] + "#!!\r\n"
                        }
                    }
                    cm.sendSimple(text);
                } else {
                    //cm.sendOk("��������Ը��ͳ��״̬����ʱ������Ը��\r\n #r - ��ȴ�1���Ӻ����ԡ�");
		    cm.sendOk("��������Ը�عر�״̬����ʱ������Ը��\r\n\r\n #r - ��ȴ��������������ԡ�\r\n\r\n#b��Ը�ؿ����ر�ʱ��Ϊ��ÿ�������Ͽ������������Ϲرգ�");
                    status = -1;
                }
                break;
        }
    }
    else if (status == 2) {
        if (cm.getBossLogAcc("��Ըϵͳ") >= WishTimes) {
            cm.sendOk("һ��һ���ʺ�ֻ����Ը" + WishTimes + "�Σ������첻������Ը�ˣ�");
            status = -1;
        } else {
            typed = selection;
            cm.sendGetText("����������Ը�����룬����д��Խ��ʵ���񽱵ļ��ʽ�����Ŷ~~~\r\n");
        }
    } else if (status == 3) {
        InsertWish(WishList[typed][0], WishList[typed][1], cm.getText());
        cm.sendOk("����Ը���嵥�ɹ�����ȴ�ÿ�춨ʱ���µ�Ը��֮�ǣ�ϣ�����������������~��")
        cm.setBossLogAcc("��Ըϵͳ")
        cm.dispose();
    } else if (status == 4) {
        typed = selection;
        if (record[typed][3] != 2) {//���������ʵ��״̬
            cm.sendNext("ѡ���Ը���Ѿ���ȡ���߻�δ��ȡ�����Ѿ���ȡ�ˣ����ܼ������С�");
            status = -1;
        } else {// ����ʵ�ֲ���
            if (cm.getSpace(1) < 1 || cm.getSpace(2) < 1 || cm.getSpace(3) < 1 || cm.getSpace(4) < 1 || cm.getSpace(5) < 1) {
                cm.sendOk("���������еı����ڳ�һ������ԡ�");
                cm.dispose();
                return;
            }
            cm.gainItem(record[typed][1], record[typed][2]);//��ý���
            UpdateData(record[typed][0], 3);//���ó��Ѿ���ȡ�ˡ�
            cm.sendOk("��ȡ��Ը���߳ɹ�����ϣ������һֱ���ˣ���");
            status = -1;
        }
    }
}

function UpdateData(wishid, status) {
    var UpDateStatus = cm.getConnection().prepareStatement("update wishtreesystem_store set wishstatus=? where wishid =  " + wishid + " and wishCharid = " + cm.getPlayer().getId() + "")
    UpDateStatus.setString(1, status);//����״̬
    UpDateStatus.executeUpdate();
}

function InsertWish(wishitem, wishitemqty, wishnote) {
    var insert = cm.getConnection().prepareStatement("INSERT INTO wishtreesystem(id,wishCharid,wishCharName,wishitem,wishitemQty,wishNote) values (?,?,?,?,?,?)");
    insert.setString(1, null); //�����¼ID
    insert.setString(2, cm.getPlayer().getId()); //cid
    insert.setString(3, cm.getPlayer().getName()); //itemid
    insert.setString(4, wishitem); //Ը������
    insert.setString(5, wishitemqty); //Ը����������
    insert.setString(6, wishnote); //��Ը����
    insert.executeUpdate(); //����
    insert.close();
}