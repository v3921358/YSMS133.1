/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * �����Ӹ���
 */
var status = 0;
var result = Array();
var resultAll = Array();
var aaa = Array();//����ò���resultAll���� �������ת
var em;
var eim;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            em = cm.getEventManager("Wenzi");
            eim = em.getInstance("Wenzi")
            text = "#e<�������Ӵ���>#n\r\n#d�������������������ӵĽ����\r\n\r\n#b"
            for (var i = 0; i < eim.getPlayerCount(); i++) {
                result.push(eim.getPlayers().get(i).getName())//һά��������
                result.push(eim.getKillCount(eim.getPlayers().get(i)))//��ά�����������
                resultAll.push(result)//���ϳ�һ������
                result = Array();
            }

            //ð�����򷨿�ʼ��ȡ���
            for (var i = 0; i < resultAll.length; i++) {
                for (var j = 0; j < resultAll.length; j++) {
                    var temp;
                    if (resultAll[i][1] > resultAll[j][1]) {
                        temp = resultAll[j];
                        resultAll[j] = resultAll[i];
                        resultAll[i] = temp;
                    }
                }
            }

            var sort;
            for (var i = 0; i < resultAll.length; i++) {
                sort = i + 1;
                text += "��" + sort + "����" + resultAll[i][0] + "  ��������������" + resultAll[i][1] + "\r\n"
                aaa.push(resultAll[i][0]);
            }
            text += "#b#L99# ֪������������ȡ�����뿪��ͼ��"
            cm.sendSimpleS(text, 9)
        } else if (status == 1) {
            var em = cm.getEventManager("Wenzi");
            var count = eim.getKillCount(cm.getPlayer());
            cm.warp(910000000, 0)
            //cm.MissionAddMinNum(cm.getPlayer().getId(), 105, count)
            setEventPoints(2, cm.getPlayer().getId(), count);
            setEventTimes(2, cm.getPlayer().getId(), count);
            var text = "������������ӻ��֣���" + count + "��\r\n�����ʹ�û�����(���ܴ��͡���������������)���һ���Ʒ."
            cm.sendOk(text);
            //cm.worldMessage("[���ﰲ�ؾ�����] ��������" + cm.getChar().getName() + "  ��ҹ������" + cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) + "���������֡�");
            cm.worldSpouseMessage(0x25, cm.getChar().getName() + "���������Ӵ�����һ���Ĵ���" + count + "ֻ���ӣ����һ��ף�����ɣ�");
            cm.dispose();
        }
    }
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