/*
 BOSS�޴�����
 */


var status = 0;
//���Ƶȼ�
var minLevel = 50; //��͵ȼ�
var maxLevel = 250;//��ߵȼ�
var minLevel1 = 70; //��͵ȼ�
var maxLevel1 = 250;//��ߵȼ�

//��������
var minPlayers = 1;
var maxPlayers = 6; 

//�������� ������true �رա�false
var open = true;

//���log��¼
var PQ = '��ͨ����';
var PQ1 = '��������';

//�����ļ�����
var eventname = "BossBalrog_NORMAL"; 
var eventname1 = "BossBalrog_EASY";

//����ÿ�մ���
var maxenter = 3;
var maxenter1 = 3;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (status >= 1 && mode == 0) {
        cm.sendOk("���Ѱ����Ӱ��ȼ���O���Ͽ�����������ս�������ɡ�");  
        cm.dispose();
        return;
    }
    if (mode == 1)
        status++;
    else
        status--;

    if (status == 0) {
        var em = cm.getEventManager(eventname);
        var em1 = cm.getEventManager(eventname1);
        var prop = em.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr = "#r��������#k";
        } else {
            var vipstr = "#b�Ѿ�����#k";
        }
         var prop = em1.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr1 = "#r��������#k";
        } else {
            var vipstr1 = "#b�Ѿ�����#k";
        }
        
            var pqtry = maxenter - cm.getPQLog(PQ);
            var pqtry1 = maxenter1 - cm.getPQLog(PQ1);
            var rwpz = "";
            rwpz = "����ָ����#v4140301##v4140301#\r\n";
            rwpz += "#e�Ƽ��ȼ���50 - 200";
            rwpz += "        �Ƽ�������1 - 6  \r\n#b�ѽ�����ͨģʽ��" + cm.getPQLog(PQ) + " ��       ʣ����ս������" + pqtry + " ��#k";
            rwpz += "\r\n#r�ѽ��н���ģʽ��" + cm.getPQLog(PQ1) + " ��       #rʣ����ս������" + pqtry1 + " ��#n#k";
            rwpz += "\r\n��ͨģʽ״̬��" + vipstr + "        ����ģʽ״̬��" + vipstr1+ "";
            var zyms = "";
            zyms = "#e#v3991051##v3991051##v3991051##v3991051#<Boss - �޴�����>#v3991050##v3991050##v3991050##v3991050##n\r\n#b#h0# \n\#k��������Ͷ���һ����ս���BOSS������?\r\n" + rwpz + "\r\n";
            zyms += "   #L1##b>>>>>>>>>>>>>�ǵ�,������ͨģʽ<<<<<<<<<<<<<<#l\r\n\r\n";
            zyms += "   #L2##b>>>>>>>>>>>>>�ǵ�,���н���ģʽ<<<<<<<<<<<<<<#l\r\n";
            cm.sendSimple(zyms);
       
    } else if (status == 1) {
        if (selection == 0) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(910002000, 0);
            cm.dispose();
        } else if (selection == 1) {
            if (cm.getParty() == null) { //�ж����
                cm.sendYesNo("��û������Ƿ񴴽�һ����ӡ�");
            } else if (!cm.isLeader()) { // �ж���Ӷӳ�
                cm.sendOk("�������ŶӵĶӳ����ҶԻ���");
                cm.dispose();
            } else if (cm.getPQLog(PQ) >= maxenter) {
                cm.sendOk("�������ս�����Ѿ�������,������������!");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("�����Ӳ��ֳ�Ա���ڵ�ǰ��ͼ,���ټ����ǹ������ڳ��ԡ�"); //�ж���ӳ�Ա�Ƿ���һ�ŵ�ͼ..
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;

                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if (cPlayer.getLevel() >= minLevel && cPlayer.getLevel() <= maxLevel) {
                        levelValid += 1;
                    } else {
                        //cm.sendOk("��ӳ�Ա " + minPlayers + " ������ " + maxPlayers + "�� ���� ���г�Ա�ȼ� "+ minLevel +" ���� "+ maxLevel +" ���²ſ����볡��");
                        cm.dispose();
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() > maxPlayers || inMap < minPlayers) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager(eventname);
                    if (em == null || open == false) {
                        cm.sendSimple("�����ļ�������,����ϵ����Ա��");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), 160105);
                        } else {
                            cm.sendSimple("�Ѿ��ж����ڽ�����,�뻻����Ƶ�����ԡ�");
                        }
                        cm.removeAll(4001022);
                        cm.removeAll(4001023);
                        cm.setPQLog(PQ);
                        cm.dispose();
                    }
                } else {
                    cm.sendYesNo("��ӳ�Ա " + minPlayers + " ������ " + maxPlayers + "�� ���� ���г�Ա�ȼ� "+ minLevel +" ���� "+ maxLevel +" ���²ſ����볡��");
                }
            }

        } else if (selection == 2) {
            if (cm.getParty() == null) { //�ж����
                cm.sendYesNo("��û������Ƿ񴴽�һ����ӡ�");
            } else if (!cm.isLeader()) { // �ж���Ӷӳ�
                cm.sendOk("�������ŶӵĶӳ����ҶԻ���");
                cm.dispose();
            } else if (cm.getPQLog(PQ1) >= maxenter1) {
                cm.sendOk("�������ս�����Ѿ�������,������������!");
                cm.dispose();
            } else if (!cm.allMembersHere()) {
                cm.sendOk("�����Ӳ��ֳ�Ա���ڵ�ǰ��ͼ,���ټ����ǹ������ڳ��ԡ�"); //�ж���ӳ�Ա�Ƿ���һ�ŵ�ͼ..
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers();
                var mapId = cm.getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;

                var it = party.iterator();
                while (it.hasNext()) {
                    var cPlayer = it.next();
                    if (cPlayer.getLevel() >= minLevel1 && cPlayer.getLevel() <= maxLevel1) {
                        levelValid += 1;
                    } else {
                        //cm.sendOk("��ӳ�Ա " + minPlayers + " ������ " + maxPlayers + "�� ���� ���г�Ա�ȼ� "+ minLevel +" ���� "+ maxLevel +" ���²ſ����볡��");
                        cm.dispose();
                        next = false;
                    }
                    if (cPlayer.getMapid() == mapId) {
                        inMap += 1;
                    }
                }
                if (party.size() > maxPlayers || inMap < minPlayers) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager(eventname1);
                    if (em == null || open == false) {
                        cm.sendSimple("�����ļ�������,����ϵ����Ա��");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), 160106);
                        } else {
                            cm.sendSimple("�Ѿ��ж����ڽ�����,�뻻����Ƶ�����ԡ�");
                        }
                        cm.removeAll(4001022);
                        cm.removeAll(4001023);
                        cm.setPQLog(PQ1);
                        cm.dispose();
                    }
                } else {
                    cm.sendYesNo("��ӳ�Ա " + minPlayers + " ������ " + maxPlayers + "�� ���� ���г�Ա�ȼ� "+ minLevel1 +" ���� "+ maxLevel1 +" ���²ſ����볡��");
                }
            }
        }
    } else if (status == 2) {
        //cm.EnableUI(21);
        //cm.openUI("21");
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    }
}