/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * OX�ʴ𸱱�  ���˰����NPC
 * 
 */

var status = 0;
var maxPlay = 20;
var em;
var emgate;
var Eventstatus;
var itemid, leftday, quantity, needpoints;
var ItemArray = Array(
    Array(5211047, 1, -1, 100),//��Сʱ˫������
    Array(5360014, 1, -1, 100),//˫������3Сʱ
    Array(5750000, 10, 0, 100),//����ħ��
        Array(5062009, 50, -1, 100),
        //Array(3010145, 1, -1, 100),
        Array(5062500, 20, -1, 100),
	//Array(5062002, 10, -1, 100),
	Array(4001839, 400, -1, 100),
	Array(2431945, 1, -1, 500),
	Array(2340000, 10, -1, 200),
	Array(2049751, 1, -1, 200)
        );//����id��������ʣ���������������

function start() {
    status = -1;
    em = cm.getEventManager("OXEvent");
    emgate = cm.getEventManager("OXEventOpen");
    Eventstatus = "#r�ر�״̬��#k";
    if (em.getProperty("start") == "3") {//�Ѿ��ر������
        Eventstatus = "#e#r���ڽ����С�#n"
    }
    if (em.getProperty("start") == "1") {//
        Eventstatus = "#e#r��������С�#n"
    }
    if (em.getProperty("start") == "2") {//
        Eventstatus = "#e#r�ȴ��볡�С�#n"
    }
    if (em.getProperty("start") == "0") {//�Ѿ��ر������
        Eventstatus = "#e#r�ȴ��볡��#n"
    }
    if (emgate.getProperty("open") == "false") {//
        Eventstatus = "#e#r����Ա�ѹر���ڣ���ֹ���롣#n"
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status >= 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMap().getId() == 910048100) {
                if (cm.getPlayer().isGM()) {
                    cm.sendSimple("������ʲô�أ�\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n#L99# #r#e[Hot~]���ô�����ֶһ���Ʒ����#n#b\r\n#b#L1# ����鿴����ܡ�\r\n#L2# ���������ս�뿪���#r#e\r\n#L3# �ر���ڣ�������Ա�ɼ���\r\n#L4# ������ڣ�������Ա�ɼ���");
                } else {
                    cm.sendSimple("������ʲô�أ�\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n#L99# #r#e[Hot~]���ô�����ֶһ���Ʒ����#n#b\r\n#b#L1# ����鿴����ܡ�\r\n#L2# ���������ս�뿪���");
                }
            } else if (cm.getMap().getId() == 910048200) {
                cm.sendOk("���~");
                cm.dispose();
            } else {
                em = cm.getEventManager("OXEvent");
                emgate = cm.getEventManager("OXEventOpen");
                if (emgate.getProperty("open") == "false") {//�Ѿ��ر������
                    if (cm.getPlayer().isGM()) {
                        status = 2;
                        cm.sendYesNo("�𾴵Ĺ���Ա�����뿪��OX������������");
                    } else {
                        cm.sendSimple("���ڲ��ǻʱ�䣬���Ժ����ԣ�\r\n#L99# #r#e[Hot~]���ô�����ֶһ���Ʒ����#n#b\r\n")
                    }
                    return;
                }
                if (cm.getBossLog("OX�����") >= maxPlay) {
                    cm.sendOk("�������Ѿ�������" + maxPlay + "�Σ������ٲ���ø����ˣ����������~");
                    cm.dispose();
                    return;
                }
                if (cm.getPlayerCount(910048100) == 0 && (em.getProperty("start") == "3" || em.getProperty("start") == "4")) {//�Ѿ��ر������ ���������Ѿ�û���ˣ�����
                    em.setProperty("OXEventState", "0");
                    em.setProperty("start", "0");
                    em.setProperty("question", "0");
                    em.setProperty("RightAnwser", "0");//�õ��������ȷ��
                    cm.sendOk("�����´���Ŷ~~");
                    cm.dispose();
                    return;
                }
                if (em.getProperty("start") == "3") {//�Ѿ��ر������
                    cm.sendOk("�Ѿ���ʼ��OX����������Ժ�������");
                    cm.dispose();
                    return;
                }

                if (em == null) {
                    cm.sendOk("���ִ��������½��븱����");
                } else {
                    if (cm.getPlayer().isGM()) {
                        cm.sendSimple("#n#b\r\n\t\t\t\t#e<OX�ʴ�>#n\r\n\r\n#dOX�������Ҫ��ʼ�������ڻ��м����ӵĵȴ�ʱ�䡭��\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n\r\n\r\n#b#L0#����μ�<OX�����>��#l\r\n#L1#�����˽�һ�¸û��˵����#l \r\n#L99# #r#e[Hot~]���ô�����ֶһ���Ʒ����#n#b\r\n#L3# �رջ��ڣ�(GM�ɼ�)")
                    }
                    else if (em.getProperty("start") == "2" || em.getProperty("start") == "1") {//�ȴ�״̬
                        cm.sendSimple("#n#b\r\n\t\t\t\t#e<OX�ʴ�>#n\r\n\r\n#dOX�������Ҫ��ʼ�������ڻ��м����ӵĵȴ�ʱ�䡭��\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n\r\n\r\n#b#L0#����μ�<OX�����>��#l\r\n\r\n#L99# #r#e[Hot~]���ô�����ֶһ���Ʒ����#n#b\r\n#L1#�����˽�һ�¸û��˵����#l")
                    } else {//��һ���˽����
                        cm.sendSimple("#n#b\r\n\t\t\t\t#e<OX�ʴ�>#n\r\n\r\n#dOX�������Ҫ��ʼ��������\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n\r\n\r\n#b#L0#����ִ��<OX�����>��#l\r\n#L99# #r#e[Hot~]���ô�����ֶһ���Ʒ����#n#b\r\n#L1#�����˽�һ�¸û��˵����#l")
                    }
                }
            }
        } else if (status == 1) {
            if (selection == 0) {
                if (em.getProperty("start") == "0") {
                    em.setProperty("OXEventState", "0");//�������
                    em.setProperty("start", "1");//���ÿ��أ��Ѿ����Խ����ˡ� ֮��һ������ʱ60�룬�Ⱥ�������ҽ���
                    cm.warp(910048100, "sp");
                    cm.setBossLog("OX�����");
                    cm.getMap().startMapEffect("������3���ӵ�ʱ��Ⱥ�������ң����Ժ�", 5121052);
                    cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������\r\n\r\n�����ͨ�����ҵĿ���Ļ��������ÿ�� 1����֡�");
                } else if (em.getProperty("start") == "1") {//����Ѿ�����
                    cm.warp(910048100, "sp");
                    cm.setBossLog("OX�����");
                    cm.getMap().startMapEffect("������3���ӵ�ʱ��Ⱥ�������ң����Ժ�", 5121052);
                    cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������\r\n\r\n�����ͨ�����ҵĿ���Ļ��������ÿ�� 1����֡�");
                } else {//�ȴ�״̬
                    cm.warp(910048100, "sp");
                    cm.setBossLog("OX�����");
                    cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������\r\n\r\n�����ͨ�����ҵĿ���Ļ��������ÿ�� 1����֡�");
                    cm.getPlayer().dropMessage(1, "����Ͽ�ʼ����Ⱥ�������ң�");
                }
                // cm.getNpcNotice(1540104, "[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n#b�������ȵȺ�3��������ӭ���浽����ð�ռҰɣ�#k\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������", 9);//��ʾ180��Ļ����
                cm.safeDispose();
            } else if (selection == 1) {
                cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������")
                cm.safeDispose();
            } else if (selection == 2) {
                cm.sendYesNo("���Ҫ�뿪�����������Ͳ��ܺʹ��һ�������أ�");
            } else if (selection == 3) {
                emgate.setProperty("open", "false");
                cm.sendOk("�Ѿ��ر�����ڣ�");
                cm.spouseMessage(0x24, "[OX�����] ���ڹ���Ա�Ѿ��ر��˻��ڡ�");
                cm.worldBrodcastEffect(5121052, "[OX�����] ���ڹ���Ա�Ѿ��ر��˻��ڡ�");
                cm.dispose();
            } else if (selection == 4) {
                emgate.setProperty("open", "true");
                cm.sendOk("�Ѿ�������ڣ�");
                cm.spouseMessage(0x24, "[OX�����] ���ڹ���Ա�Ѿ������˻��ڡ�");
                cm.worldBrodcastEffect(5121052, "[OX�����] ���ڹ���Ա�Ѿ������˻��ڡ�");
                cm.dispose();
            } else if (selection == 99) {
                var text = "������һ�����ô������Ϊ��" + getEventPoints(20, cm.getPlayer().getId()) + "\r\n#b"
                for (var i = 0; i < ItemArray.length; i++) {
                    if (ItemArray[i][2] <= 0) {
                        text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# ʱ�ޣ� ����  �� ���֣�(" + ItemArray[i][3] + ")\r\n"
                    } else {
                        text += "#L" + i + "# #i" + ItemArray[i][0] + "# #t" + ItemArray[i][0] + "# ʱ�ޣ�" + ItemArray[i][2] + "��  �� ���֣�(" + ItemArray[i][3] + ")\r\n"
                    }
                }
                status = 3;
                cm.sendSimple(text);
            }
        } else if (status == 2) {
            cm.warp(910000000, 0);
            cm.dispose();
        } else if (status == 3) {
            emgate.setProperty("open", "true");
            cm.sendOk("�Ѿ���������ڣ�");
            cm.spouseMessage(0x24, "[OX�����] ����Ա�Ѿ������˻��ڣ������ٶȴ������г�6���ſ�NPC�����������ڽ���Ŷ��");
            cm.worldBrodcastEffect(5121052, "����Ա�Ѿ������˻��ڣ������ٶȴ������г�6���ſ�NPC�����������ڽ���Ŷ��");
            cm.dispose();
        } else if (status == 4) {
            itemid = ItemArray[selection][0];
            leftday = ItemArray[selection][2];
            quantity = ItemArray[selection][1];
            needpoints = ItemArray[selection][3];
            if (leftday <= 0) {
                cm.sendYesNo("����ʹ��" + needpoints + "�������һ�#i" + itemid + "# #b#t" + itemid + "##k ��\r\n ʹ�����ޣ�#b����#k��");
            } else {
                cm.sendYesNo("����ʹ��" + needpoints + "�������һ�#i" + itemid + "# #b#t" + itemid + "##k �� \r\nʹ�����ޣ�#b" + leftday + "��#k��");
            }
        } else if (status == 5) {
            if (cm.getSpace(1) < 2 && cm.getSpace(2) < 2 && cm.getSpace(3) < 2 && cm.getSpace(4) < 2 && cm.getSpace(5) < 2) {
                cm.sendOk("��ȷ�������еı���������2�����ϵĿո�");
                cm.dispose();
                return;
            }
            if (getEventPoints(20, cm.getPlayer().getId()) >= needpoints) {
                setEventPoints(20, cm.getPlayer().getId(), -needpoints);
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