/*
	������˹ - Victoria Road: Kerning City (103000000)
*/

var status = -1;
var minLevel = 100;
var maxLevel = 250;

var minPartySize = 3;
var maxPartySize = 6;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.removeAll(4001007);
        cm.removeAll(4001008);
        if (cm.getPlayer().getMapId() != 910000000) {
            cm.sendSimple("#e<����������ѵ����>#n\r\n����Ͷ�Ա��һ��Ŭ��������������������кܶ������ͬ��Э�����޷�������ϰ���\r\n#b#L0#����������ѵ���������ҡ�#l");
        } else {
            cm.sendSimple("#e<����������ѵ����>#n\r\n����Ͷ�Ա��һ��Ŭ��������������������кܶ������ͬ��Э�����޷�������ϰ���������ս�Ļ�����ͨ��#b������ӵĶӳ�#k����˵����\r\n#b#L0#����ִ���������#l\r\n#L1#����Ѱ�Ҷ�Ա��#l\r\n#L2#��������˵����#l");
        }
    } else if (status == 1) {
        if (selection == 0) { //����ִ���������
            if (cm.getPlayer().getMapId() != 910000000) { //��������ʼ��ͼ
                cm.saveLocation("MULUNG_TC");
                cm.warp(910340700, 0);
            } else if (cm.getPlayer().getParty() == null) { //û�����
                cm.sendNext("����������Σ�գ�����һ���˵������С�\r\n#b������Ӻ��ٺ���̸������");
            } else if (!cm.isLeader()) { //���Ƕӳ�
                cm.sendNext("�����ǵĴ���������˵����");
                    } else if (cm.getBossLog('KerningPQ') >= 30){
                     cm.sendNext("�Բ���һ��ֻ�ܽ���30�Ρ�")
            } else {

                var party = cm.getPlayer().getParty().getMembers();
                var mapId = cm.getPlayer().getMapId();
                var next = true;
                var levelValid = 0;
                var inMap = 0;
                var it = party.iterator();
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
                }
                if (party.size() > maxPartySize || inMap < minPartySize) {
                    next = false;
                }
                if (next) {
                    var em = cm.getEventManager("KerningPQ");
                    if (em == null) {
                        cm.sendOk("Please try again later.");
                    } else {
                        var prop = em.getProperty("state");
                        if (prop == null || prop.equals("0")) {
                            em.startInstance(cm.getParty(), cm.getMap(), 150);
                        } else {
                            cm.sendOk("���Ե�...�������ڽ�����.");
                        }
                    }
                } else {
                    cm.sendOk("����������ӵ���������3�����ϣ��޷�ִ�����������3�����ϡ����������ļ��Ա������ʹ��Ѱ����ӹ��ܡ�");
                }
            }
            cm.dispose();
        } else if (selection == 1) { //����Ѱ�Ҷ�Ա��
            status = -1;
            cm.sendNext("������Χ�ĺ���������ӡ�ͨ��Ѱ����ӣ���ݼ�O����������ʱ�ҵ��ʺ��Լ�����ӡ�ϣ�����ܲο�һ�¡�");
        } else if (selection == 2) { //��������˵����
            status = -1;
            cm.sendOk("�����ڵȴ��¸ҵ�ð�ռҡ��������Լ����������ǻۣ�һ���ƽ����⣬����ǿ���#r#o9300003##k��ͨ������ȡ�����������ȵ�ͨ��֤���͡��²���ȷλ�á����ʴ��#o9300003#�ͻ���֡�\r\n - #e�ȼ�#n��20������#r���Ƽ��ȼ���20��69 ��#k\r\n - #e����ʱ��#n��20����\r\n - #e�μ�����#n��3��6��\r\n - #e�����Ʒ#n��#i1072369:# #t1072369# #b��#o9300003#���䣩#k\r\n - #e�����Ʒ#n��#i1072533:# #t1072533# #b����15��#t4001531#������#k");
        } else if (selection == 3) { //������#t1072533#��
            status = -1;
            cm.sendNext("��Ҫ#i1072533:# #t1072533#�Ļ�����Ҫ#b15��#t4001531##k������#r��ˮ����#k�����Ի��#t4001531#��");
        } else if (selection == 4) { //����֪�������ʣ����ս������
            status = -1;
            cm.sendOk("����ʣ����ս�����������Ρ�");
        }
    } else if (status == 2) {
        cm.dispose();
    }
}