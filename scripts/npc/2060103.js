/*
 ��ù���������
 ���ʱ�䣺2014��8��10�� 15:31:48
 ����ʱ�䣺2015��7��18�� 22:17:02
 �ű����ܣ���������ս
 */




var time = new Date();

var hour = time.getHours(); //���Сʱ
var minute = time.getMinutes();//��÷���
var second = time.getSeconds(); //�����
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
            cm.sendOk("��... �Ҳ��㻹��ʲô�������Ҫ���������ɣ�");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMapId() == 923020100) {
                var em = cm.getEventManager("Limitless");
                if (em.getProperty("Gift") == "true") {
                    var ItemQuality = 0;
                    var conn = cm.getConnection();
                    var pstmt = conn.prepareStatement("SELECT ItemQuality FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
                    var EventDataBase = pstmt.executeQuery();
                    while (EventDataBase.next()) {
                        ItemQuality = EventDataBase.getString("ItemQuality");
                    }
                    EventDataBase.close();
                    pstmt.close();
                    //conn.close();
                    var UpDateData = cm.getConnection().prepareStatement("update limitlessEvent set ItemQuality=? where charid=" + cm.getPlayer().getId() + "")
                    UpDateData.setString(1, parseInt(ItemQuality) + 5);
                    UpDateData.executeUpdate();//����;
                    cm.gainItem(5062002, 5);
                    cm.playerMessage(-1, "[����ս��] ��ֹĿǰ�Ѿ���ȡ����" + (parseInt(ItemQuality) + 5) + "���߼���ħ����");
                    em.setProperty("Gift", "false");
                    cm.dispose();
                } else {
                    status = 1;
                    cm.sendYesNo("���������ս�뿪������");
                }
            } else {
                cm.sendSimple("#e#d   �޾���Ԩ֮�У�BOSS������Ϯ��ð�ռ��Ǵ������ǵ�����ȥ�������ǰɡ�Ϊ���������ð�յ������е�ǿ��������ڴ˶������������ɡ�#n#k\r\n\r\n#L0# #r���������ս������ս������#b\r\n#L1# ����鿴��ս���������\r\n#L2# ����鿴�������ܡ�")
            }
        } else if (status == 1) {
            if (selection == 0) {
                var cal = java.util.Calendar.getInstance();
                var weekday = cal.get(java.util.Calendar.DAY_OF_WEEK);
                //hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
                //refreshDates(cal);
                //if (weekday == 1 || weekday == 7) {
                if (weekday == 1 || weekday == 7) {//(hour == 13 && (minute >= 0 && minute <= 20)) || (hour == 20 && (minute >= 0 && minute <= 20))) {
                    if (cm.getParty() == null) { // û�����
                        cm.sendOk("����Ӻ����̸����");
                        cm.dispose();
                    } else if (!cm.isLeader()) { // ���Ƕӳ�
                        cm.sendOk("��жӳ�����̸����");
                        cm.dispose();
                    } else if (cm.getBossLogAcc('���޸���') >= 1) {
                        cm.sendOk("�㲻�ܽ�ȥ�����˺�ÿ��ֻ�ܽ���һ�Ρ�")
                        cm.dispose();
                    } else {
                        var party = cm.getParty().getMembers().size();
                        var mapId = cm.getPlayer().getMapId();
                        if (party != 1) {
                            cm.sendOk("�Բ���������սֻ��һ���˽�ȥ��\r\n�뿪��ֻ����һ���˵���ӡ�")
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Limitless");
                            if (em == null) {
                                cm.sendOk("���������ڽ��赱�С�");
                            } else {
                                var conn = cm.getConnection();
                                var pstmt = conn.prepareStatement("SELECT * FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
                                var EventDataBase = pstmt.executeQuery();
                                var insert = conn.prepareStatement("INSERT INTO limitlessEvent(id,charid,times,ItemQuality,name) VALUES(?,?,?,?,?)"); // ��������
                                var prop = em.getProperty("started");
                                var x = 0;
                                if (/*prop == "false" || prop == null || */cm.getMap(923020100).getCharactersSize() == 0) {
                                    cm.setBossLogAcc('���޸���');
                                    cm.worldSpouseMessage(0x15, "�����޹ؿ���ս������� " + cm.getChar().getName() + " �������ڵ�ȥ��ս����֮���޹ؿ�ȥ�ˡ�");
                                    while (EventDataBase.next()) {
                                        x++;
                                    }
                                    EventDataBase.close();
                                    pstmt.close();
                                    //conn.close();
                                    if (x == 0) {
                                        insert.setString(1, null); //�����¼ID
                                        insert.setString(2, cm.getPlayer().getId());
                                        insert.setString(3, 0);
                                        insert.setString(4, 0);
                                        insert.setString(5, cm.getPlayer().getName());
                                        insert.executeUpdate(); //����
                                        insert.close();
                                    } else {
                                        //���ù���
                                        var update = conn.prepareStatement("UPDATE limitlessEvent set times = 0, ItemQuality = 0 where charid = " + cm.getPlayer().getId() + "");
                                        update.executeUpdate();
                                        update.close();
                                    }
                                    //conn.close();
                                    em.startInstance(cm.getParty(), cm.getMap());
                                    cm.dispose();
                                    return;
                                } else {
                                    cm.sendOk("�Բ��𣬴�Ƶ���Ѿ����������޸��������ˡ�");
                                    cm.dispose();
                                }
                            }
                        }
                    }
                } else {
                    cm.sendOk("�ø���ֻ����ĩ���š�");
                    cm.dispose();
                }
            } else if (selection == 1) {//����
                Ranking();//����
                cm.dispose();
            } else if (selection == 2) {//��������
                //TODO 
                cm.sendOk("- #e#d�������ܣ�#k#n\r\n\r\n#b����ø����󣬵�ͼ����һ��BOSS�ȴ����������ǵ�һ�ؿ���BOSSѪ���Ƚ��٣�ֻ��10��HP�����������֮��ؿ����Ե�����ʽ��ǰһ��BOSSѪ���߳�500��HP���������㹻ҩˮ������ҩˮ��С�Ĳ�Ҫ�����ˡ��ڸ������������ #r@mob#b ���鿴����ʣ��HP�������ڸ����ﲻС�����������ʹ�� #r@fh#b �������Լ��Ӷ�ս������������BOSS�Ժ����10���϶ʱ����Զ�������һ�أ���ʱ�䵽��BOSS��δ�����򸱱�ʧ�ܡ�ÿͨ��ʮ������Ի��5���߼�����ħ��������#k\r\n\r\n#e#d�ؿ���ʾ��#n#k#r�������ȴﵽ200������峬��5�������ٽ��롣#k");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.warp(923020000);
            cm.dispose();
        }
    }
}

function Ranking() {
    var Text = "�޾��������������£�(1~10����)\r\n\r\n#d"
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT * FROM limitlessEvent ORDER BY times DESC LIMIT 10");
    var RankDataBase = pstmt.executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        Text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# ����:" + i + "\r\n��ɫ��:" + RankDataBase.getString("name") + "\r\n����ͨ�ؿ�:" + RankDataBase.getString("times") + "\r\n���ħ����:" + RankDataBase.getString("ItemQuality") + "\r\n"
        Text += "~~~~~~~~~~~~~~~~~~~\r\n"
        i++;
    }
    RankDataBase.close();
    pstmt.close();
    //conn.close();
    cm.sendOk(Text);
}

function getItemQty() {
    var ItemQuality = 0;
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT ItemQuality FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
    var EventDataBase = pstmt.executeQuery();
    while (EventDataBase.next()) {
        ItemQuality = EventDataBase.getString("ItemQuality");
    }
    EventDataBase.close();
    pstmt.close();
    //conn.close();
    cm.playerMessage(-1, "[����ս��] ��ֹĿǰ�Ѿ���ȡ����" + ItemQuality + "���߼�����ħ����");
}

function getTimes() {
    var Times = 0;
    var conn = cm.getConnection();
    var pstmt = conn.prepareStatement("SELECT times FROM limitlessEvent where charid = " + cm.getPlayer().getId() + "");
    var EventDataBase = pstmt.executeQuery();
    while (EventDataBase.next()) {
        Times = EventDataBase.getString("times");
    }
    EventDataBase.close();
    pstmt.close();
    //conn.close();
    return Times;
}

function UpateTimes() {
    var conn = cm.getConnection();
    //var pstmt = conn.prepareStatement(
    var UpDateData = conn.prepareStatement("update limitlessEvent set times=? where charid = " + cm.getPlayer().getId() + "");
    UpDateData.setString(1, parseInt(getTimes()) + 1);
    UpDateData.executeUpdate();//����;
    UpDateData.close();
    //conn.close();
}
