/*
 * �������� - ����
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű� 
 */

var status = -1;
var typed;
var ItemArray = Array(
        Array(1050286, 1, 1, 100),
        Array(3010145, 1, 2, 50),
        Array(1322005, 1, -1, 1)
        );//����id��������ʣ���������������
var itemid, leftday, quantity, needpoints;

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0) {
        var text = "�����Ǽ���Կ����Ļ��أ�������ʲô�أ�\r\n#b\r\n#L2# #r#e[Hot~]ʹ�ø��˻��ֶһ���Ʒ��#n#b\r\n#L0# �鿴ʮ���������#l\r\n#L1# �鿴���˻���������"
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {
            GuildRanking();
            cm.dispose();
        } else if (selection == 1) {
            PlayerPointRanking();
            cm.dispose();
        } else if (selection == 2) {
            typed = 2;
            var text = "�����ڵļ���Կ��������ǣ�#r#e" + getEventPoints(9, cm.getPlayer().getId()) + "#k#n\r\n������ʲô��\r\n#b";
            for (var i = 0; i < ItemArray.length; i++) {
                if (ItemArray[i][2] <= 0) {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# ���֣�(" + ItemArray[i][3] + ")\r\n"
                } else {
                    text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# ʱ�ޣ�" + ItemArray[i][2] + "��   ���֣�(" + ItemArray[i][3] + ")\r\n"
                }
            }
            cm.sendSimple(text);
        }

    }else if (status == 2){
        itemid = ItemArray[selection][0];
            leftday = ItemArray[selection][2];
            quantity = ItemArray[selection][1];
            needpoints = ItemArray[selection][3];
            if (leftday <= 0) {
                cm.sendYesNo("����ʹ��" + needpoints + "�齱�������һ�#i" + itemid + "# #b#t" + itemid + "##k ��\r\n ʹ�����ޣ�#b����#k��");
            } else {
                cm.sendYesNo("����ʹ��" + needpoints + "�齱�������һ�#i" + itemid + "# #b#t" + itemid + "##k �� \r\nʹ�����ޣ�#b" + leftday + "��#k��");
            }
    }else if (status == 3){
        if (cm.getSpace(1) < 2 && cm.getSpace(2) < 2 && cm.getSpace(3) < 2 && cm.getSpace(4) < 2 && cm.getSpace(5) < 2) {
                cm.sendOk("��ȷ�������еı���������2�����ϵĿո�");
                cm.dispose();
                return;
            }
            if (getEventPoints(9, cm.getPlayer().getId()) >= needpoints) {
                setEventPoints(9, cm.getPlayer().getId(), -needpoints);
                if (leftday <= 0) {
                    cm.gainItem(itemid, quantity);
                } else {
                    cm.gainItemPeriod(itemid, quantity, leftday);
                }
                status = -1;
                cm.sendOk("�һ��ɹ��ˣ�");
            } else {
                status = -1;
                cm.sendOk("�Բ�����û���㹻�Ļ��ֶһ���");
            }
    }
}

function getEventTimes(Eventid, charid) {//ͨ��eventid���õ����������Ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i = Times.getString("times");//�õ�����
    }
    Times.close();
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//ͨ��eventid���õ����������ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i = Times.getString("points");//�õ�����
    }
    Times.close();
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//ͨ��eventid��������������ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?)"); // ��������
        insert.setString(1, null); //�����¼ID
        insert.setString(2, Eventid); //����ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, points);//points ����
        insert.setString(6, getEventTimes(1, charid));//times ����
        insert.executeUpdate(); //����
        insert.close();
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//����Ϊ��ʹ��
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
        update.close();
    }
}

function setEventTimes(Eventid, charid, times) {//ͨ��eventid�����ò��������Ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?)"); // ��������
        insert.setString(1, null); //�����¼ID
        insert.setString(2, Eventid); //����ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, getEventPoints(2, charid));//points ����
        insert.setString(6, times);//times ����
        insert.executeUpdate(); //����
        insert.close();
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//����Ϊ��ʹ��
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
        update.close();
    }
}

function PlayerPointRanking() {
    var text = "            #d�� ÿ�¸��˼���������а� ��\r\n\r\n#k"
    text += "\t#e����\t\t�������\t\t\t����\t\t\�������#n\r\n"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM eventtimes where eventid = 9 and DATE_SUB(CURDATE(), INTERVAL 1 MONTH) <= date(date) ORDER BY points DESC LIMIT 10"); //1������ǰʮ��
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        if (i == 1) {
            text += "\t#r" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        } else
        if (i == 2) {
            text += "\t#g" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        } else
        if (i == 3) {
            text += "\t#b" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        } else {
            text += "\t" + i + "\t\t" + FormatString(" ", 13, RankDataBase.getString("cname")) + "\t\t" + FormatString(" ", 5, RankDataBase.getString("points")) + "\t\t" + RankDataBase.getString("times") + "\r\n#k"
        }
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(text);
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

function GuildRanking() {
    var text = "            #d�� ȫ��ʮ��������а� ��\r\n\r\n#k"
    text += "\t#e����\t\t��������\t\t\t\t\t\t�峤\r\n#n"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM guilds ORDER BY GP DESC LIMIT 10");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        if (i == 1) {
            text += "\t#r" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        } else
        if (i == 2) {
            text += "\t#g" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        } else
        if (i == 3) {
            text += "\t#b" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        } else {
            text += "\t" + i + "\t\t" + FormatString(" ", 20, RankDataBase.getString("name")) + "\t\t" + FormatString(" ", 5, getCharNameByCid(RankDataBase.getString("leader"))) + "\r\n#k"
        }
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(text);
}

function getCharNameByCid(cid) {
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT name FROM characters where id = " + cid + "");
    var Charbase = pstmt.executeQuery();
    while (Charbase.next()) {
        return Charbase.getString("name");
    }
    Charbase.close();
}