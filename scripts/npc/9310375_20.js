/*
 * �޴�ı��� ��ʾȫ����һ��۵�����
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * 2015��7��30�� 17:06:33
 */
//������
var l = "#fUI/mapleBingo.img/mapleBingo/Gage/leftGage#";
var m = "#fUI/mapleBingo.img/mapleBingo/Gage/middleGage#";
var r = "#fUI/mapleBingo.img/mapleBingo/Gage/rightGage#";
var RemainQty;
var NeedItem = 4001168;//������Ʒ
var status = 0;
var typed;
var em, eim;
var showListLimit = 200;

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
            em = cm.getEventManager("ZiyouPaoItem");
            eim = em.getInstance("ZiyouPaoItem")
            if (eim == null) {
                cm.sendOk("���ڻ��û�п�ʼ����������û�б�������룡\r\n���������Ա�Ĺ��棡��л֧�֣�")
                cm.dispose();
            } else {
                if (em.getProperty("state") == "" + em.getProperty("ItemNeedQty") + "") {
                    cm.sendOk("�����Ѿ��ۼ���������ֵ����ȴ��������Զ��������棡");
                    cm.dispose();
                    return;
                }
                if (em.getProperty("dropstart") == "true") {
                    cm.sendOk("���������г��Ѿ���ʼ�˶����߻�ˣ����Ժ��ٹ��������㡣");
                    cm.dispose();
                    return;
                }
                RemainQty = parseInt(em.getProperty("ItemNeedQty")) - parseInt(em.getProperty("state"));
                var text = "ֻҪ�������Э��Ϊ���������\r\n�ҾͿ��Ը���Һܶ�ḻ����Ʒ�أ�#n\r\n#r��������ռ�#b#t" + NeedItem + "##k�Ϳ���#e�ɼ�����#n\r\n#d����������ʱ�򽫻���#e�����г�#n�������ĵ��ߣ���#e#d\r\n\r\n>>>>>>>>>> Ŀǰ������������ <<<<<<<<<<<<\r\n#n";
                text += "\t\t#B" + parseInt(parseInt(em.getProperty("state")) / em.getProperty("ItemNeedQty") * 100) + "#\r\n#b"
                text += "#b#e#L1# �ύ#t" + NeedItem + "#��Ϊ��������ף���#l";
                text += "\r\n#b#e#L0# �鿴�ҹ����˶��������㡣#l\r\n";
                text += "#b#e#L3# �鿴�������а񣡣�#l\r\n"
                text += "#r#e#L4# >> ���ݹ��׵�һ���Ʒ << #l\r\n"
                if (cm.getPlayer().isGM()) {
                    text += "#r#e#L2#  #e�������������㣨����Ա�ɼ���#n#k#l\r\n";
                }
                cm.sendSimple(text);
            }
        } else if (status == 1) {
            if (selection == 4) {
                cm.dispose();
                cm.openNpc(cm.getNpc(), 21);
            }
            else if (selection == 3) {
                Ranking();
                status = -1;
            }
            else if (selection == 1) {
                cm.sendGetNumber("��������Ҫ���׶��ٸ�#b#t" + NeedItem + "##k��", 0, 0, RemainQty);
            } else if (selection == 2) {
                em.setProperty("state", "0");
                cm.sendOk("���óɹ���");
                status = -1;
            } else {
                cm.sendNext("�װ���#e#h0##nð�ռң�\r\n#d����Ŀǰ��һ��������#r#e" + getEventTimes(51, cm.getPlayer().getId()) + "#d#n�����㣡");
                status = -1;
            }
        } else if (status == 2) {
            if (selection == 0) {
                cm.sendNext("������һ������0������");
                status = -1;
            } else
            if (cm.getItemQuantity(NeedItem) >= selection) {
                em.setProperty("state", "" + (parseInt(em.getProperty("state")) + selection) + "");
                cm.sendOk("���׳ɹ���Ŀǰ����ȫ��������������Ϊ��" + em.getProperty("state") + "��\r\n��������Ŭ���ɣ���");
                setEventPoints(51, cm.getPlayer().getId(), selection);
                setEventTimes(51, cm.getPlayer().getId(), selection);
                cm.gainItem(NeedItem,-selection);
                status = -1;
            } else {
                cm.sendOk("�����û���㹻��#b#t" + NeedItem + "##k��\r\n����һ��������");
                status = -1;
            }
        }
    }
}

function FormatString(c, length, content) {
    var str = "";
    var cs = "";
    if (content.length > length) {
        str = content;
    } else {
        for (var j = 0; j < length - content.getBytes("GB2312").length; j++) {
            cs = cs + c;
        }
    }
    str = content + cs;
    return str;
}

function Ranking() {
    var text = "            #d�� ȫ��ʮ�������а� ��\r\n\r\n#k"
    text += "\t#e����\t\t�������\t\t\t\t\t����ֵ\r\n#n"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM EventTimes where eventid = 51 ORDER BY points DESC LIMIT 10 ");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        if (i == 1) {
            text += "\t#r" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else
        if (i == 2) {
            text += "\t#g" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else
        if (i == 3) {
            text += "\t#b" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        } else {
            text += "\t" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\r\n#k"
        }
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(text);
}



function DelEventPoints(Eventid, charid) {
    var delectData = cm.getConnection().prepareStatement("delete from EventTimes where eventid = " + Eventid + " and cid = " + charid + "");
    delectData.executeUpdate(); //ɾ������
}

function getEventTimes(Eventid, charid) {//ͨ��eventid���õ����������Ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i = Times.getString("times");//�õ�����
    }
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//ͨ��eventid���õ����������ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i = Times.getString("points");//�õ�����
    }
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//ͨ��eventid��������������ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // ��������
        insert.setString(1, null); //�����¼ID
        insert.setString(2, Eventid); //����ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, points);//points ����
        insert.setString(6, getEventTimes(1, charid));//times ����
        insert.setString(7, null);//
        insert.executeUpdate(); //����
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//����Ϊ��ʹ��
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
    }
}

function setEventTimes(Eventid, charid, times) {//ͨ��eventid�����ò��������Ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // ��������
        insert.setString(1, null); //�����¼ID
        insert.setString(2, Eventid); //����ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, getEventPoints(2, charid));//points ����
        insert.setString(6, times);//times ����
        insert.setString(7, null);//
        insert.executeUpdate(); //����
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//����Ϊ��ʹ��
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
    }
}
