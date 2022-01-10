/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * �����Ӹ���
 */

var status = 0;
var minLevel = 150;
var maxLevel = 255;
var minPartySize = 4;
var maxPartySize = 6;
var maxPlay = 2;
var ItemArray = Array(
        Array(2430692, 1, -1, 2000),
        Array(2431743, 1, -1, 1000)//10000����ȯ
        );//����id��������ʣ���������������
var itemid, leftday, quantity, needpoints;

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
            cm.sendSimple("#b��ô�죿�������Խ��Խ�����ˡ�ð�ռ��ǣ����ǿ��԰�������������\r\n\r\n\t\t\t\t#e<��������>#n\r\n\r\n#d   �����������ӵĻ����ﵽһ�������Ҿͻ�������Ķ����͸��㣡ð�ռ��ǣ���ô�������԰������\r\n\r\n#b#L0#Эͬ��Ӱ�æ�������ӣ�#l\r\n#L1##r�鿴��һ�������˶������ӣ����һ���Ʒ��#l#b\r\n#L2#�����˽�һ����ô�����ӡ�#l\r\n#L3#���뻨��10000��ȯ������ս������#l")
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getBossLog("��������") >= maxPlay) {
                    cm.sendOk("�������Ѿ�������" + maxPlay + "�Σ������ٰ��Ҵ��ˣ�����̫���ˣ����������~");
                    cm.dispose();
                    return;
                }
                if (cm.getParty() == null) { // û�����
                    cm.sendOk("��������Ҳ����Ҫ�ӳ��İ�~\r\n��ӳ�����˵����");
                    cm.dispose();
                } else if (!cm.isLeader()) { // ���Ƕӳ�
                    cm.sendOk("��жӳ�����̸����");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    var idx = Array();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                        idx.push(cPlayer.getId());
                    }
                    if (getBossLog(idx) >= maxPlay) {
                        cm.sendOk("������������Ѿ�������ø���" + maxPlay + "�Σ��޷��ٽ��룬���߳�����ҡ�");
                        cm.dispose();
                        return;
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Wenzi");
                        if (em == null) {
                            cm.sendOk("Ŀǰ��������ø������ȴ����š���");
                        } else {
                            if (cm.getPlayerCount(350033000) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
                                cm.setPartyBossLog("��������");
                                cm.worldSpouseMessage(0x25, cm.getChar().getName() + "   �������Ķ��������ȥ���������ˣ����Ҳ�������Ա�������Ӱɣ���");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("Ŀǰ��Ƶ���Ѿ���������ս���뻻��Ƶ�����½��롣");
                                cm.dispose();
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                        cm.dispose();
                    }
                } //�ж����
            }
            else if (selection == 2) {
                cm.sendOk("���븱��ǰ����ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                cm.dispose();
            } else if (selection == 3) {
                if (cm.getPlayer().getCSPoints(1) >= 10000) {
                    cm.gainNX(1, -10000);
                    cm.resetBossLog("��������");
                    cm.sendOk("���óɹ���");
                    cm.dispose();
                } else {
                    cm.sendOk("��ĵ�������޷����á�");
                    cm.dispose();
                }
            } else if (selection == 1) {//�鿴�Ҵ��˶������ӣ��һ���Ʒ
                var text = "������һ��������" + getEventTimes(2, cm.getPlayer().getId()) + "���ӡ�\r\n���öһ�����Ϊ��" + getEventPoints(2, cm.getPlayer().getId()) + "\r\n#b"
                for (var i = 0; i < ItemArray.length; i++) {
                    if (ItemArray[i][2] <= 0) {
                        text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# ʱ�ޣ� ����  �� ���֣�(" + ItemArray[i][3] + ")\r\n"
                    } else {
                        text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# ʱ�ޣ�" + ItemArray[i][2] + "��  �� ���֣�(" + ItemArray[i][3] + ")\r\n"
                    }
                }
                cm.sendSimple(text);
            }
        } else if (status == 2) {
            itemid = ItemArray[selection][0];
            leftday = ItemArray[selection][2];
            quantity = ItemArray[selection][1];
            needpoints = ItemArray[selection][3];
            if (leftday <= 0) {
                cm.sendYesNo("����ʹ��" + needpoints + "�������һ�#i" + itemid + "# #b#t" + itemid + "##k ��\r\n ʹ�����ޣ�#b����#k��");
            } else {
                cm.sendYesNo("����ʹ��" + needpoints + "�������һ�#i" + itemid + "# #b#t" + itemid + "##k �� \r\nʹ�����ޣ�#b" + leftday + "��#k��");
            }
        } else if (status == 3) {
            if (cm.getSpace(1) < 2 && cm.getSpace(2) < 2 && cm.getSpace(3) < 2 && cm.getSpace(4) < 2 && cm.getSpace(5) < 2) {
                cm.sendOk("��ȷ�������еı���������2�����ϵĿո�");
                cm.dispose();
                return;
            }
            if (getEventPoints(2, cm.getPlayer().getId()) >= needpoints) {
                setEventPoints(2, cm.getPlayer().getId(), -needpoints);
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
}


function getBossLog(idx) {
    var idStr = "";
    for (var key in idx) {
        if (key == 0)
            idStr += idx[key];
        else
            idStr += "," + idx[key];
    }
    var sql = "SELECT max(count) as maxcount FROM bosslog where bossid = '��������' and characterid in (" + idStr + ") and to_days(time) = to_days(now());";
    //java.lang.System.out.println(sql);
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement(sql);
    bosslogSql = pstmt.executeQuery();
    if (bosslogSql.next()) {
        return bosslogSql.getString("maxcount") * 1;
    }
    bosslogSql.close();
    pstmt.close();
    //conn.close();
    return 0;
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