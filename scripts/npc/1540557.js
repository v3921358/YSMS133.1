var status = 0;
var minLevel = 220; 
var maxLevel = 250;
var minPlayers = 1;
var maxPlayers = 6;
var moblevel = 255;
var open = true;
var PQ = '˹��';
var eventname = "bdsw";
var maxenter = 1;

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
        var prop = em.getProperty("state");
        if (prop == null || prop.equals("0")) {
            var vipstr = "#r��������#k";
        } else {
            var vipstr = "#b�Ѿ�����#k";
        }



        if (cm.getPlayer().getClient().getChannel() == 1) {
            if (cm.getPlayer().getMapId() == 211070100) { //����
                cm.sendSimple("#e#v3991051##v3991051##v3991051##v3991051##v3991050##v3991050##v3991050##v3991050##n\r\n������ȷ����������,�������ȥ?\r\n#L2##b�ǵ�,���ھͳ�ȥ#l");


            } else {
                var pqtry = maxenter - cm.getPQLog(PQ);
                var rwpz = "";
                rwpz = "BOSS�Ѷȣ�#v4140301##v4140301##v4140301##v4140301##v4140301##v4140301##v4140301##v4140301#\r\n";
                rwpz += "#e�Ƽ��ȼ���250";
                rwpz += "        �Ƽ�������1 - 6  \r\n#b�ѽ��У�" + cm.getPQLog(PQ) + " ��       ʣ����ս������" + pqtry + " ��#k";
                rwpz += "\r\nBOSS״̬��" + vipstr + "        #n";
                var zyms = "";
                zyms = "     #r#e��ɫ����������BOSS-<����˹��>��һ�׶�#n\r\n#b#h0# \n\#k��ӭ��������ɫ�������һս��׼��������\r\n" + rwpz + "\r\n";
                zyms += "#L1##b�����һ�׶���ս��(ÿ��������ս����ֻ��һ�Σ�)#l\r\n\r\n";
                cm.sendSimple(zyms);
            }
        } else {
           cm.sendOk("��ǰ����ֻ����1Ƶ�����С�");
            cm.dispose();
        }

    } else if (status == 1) {
        if (selection == 1) {
            if (cm.getParty() == null) { //�ж����
                cm.sendYesNo("��û�д������,�޷����븱����");
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
                cm.rain(1000);
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
                            em.startInstance(cm.getParty(), cm.getMap(), moblevel);
                        } else {
                            cm.sendSimple("����������ս���");
                        }
                        
                        cm.setPQLog(PQ);
                        cm.dispose();
                    }
                } else {
                    cm.sendYesNo("��ӳ�Ա " + minPlayers + " ������ " + maxPlayers + "�� ���� ���г�Ա�ȼ� " + minLevel + " ���� " + maxLevel + " ���²ſ����볡��");
                }
            }
        } else if (selection == 2) {
            cm.warp(211061001, 0);
            cm.dispose();
        }






    } else if (mode == 0) {
        cm.dispose();
    }
}