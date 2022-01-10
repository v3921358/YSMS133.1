/* 
 * �������
 */

var status = -1;
var minLevel = 70;
var maxLevel = 250;

var minPartySize = 1;
var maxPartySize = 6;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendYesNoS("������ǰ�����櫵����صء�\r\n����û�б����������˵�Ƿǳ�Σ�յĵط���\r\nȷ��Ҫ������", 4, 2133006);
    } else if (status == 1) {
        if (cm.getPlayer().getParty() == null) {
            cm.sendOkS("���1�����ϵ���Ӻ�ɳ��Խ��롣", 0, 2133006);
        } else if (!cm.isLeader()) {
            cm.sendOkS("��������ȥ��������������ӵĶӳ�������˵����", 0, 2133006);
        } else {
            var party = cm.getPlayer().getParty().getMembers();
            var mapId = cm.getPlayer().getMapId();
            var next = true;
            var levelValid = 0;
            var inMap = 0;
            var it = party.iterator();
            while (it.hasNext()) {
                var cPlayer = it.next();
                var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                if (ccPlayer != null) {
                    if (ccPlayer.getLevel() >= minLevel && ccPlayer.getLevel() <= maxLevel) {
                        levelValid += 1;
                    }
                    if (ccPlayer.getMapId() == mapId) {
                        inMap += (ccPlayer.isGM() ? 3 : 1);
                    }
		    if (cPlayer.getChannel() != cm.getPlayer().getClient().getChannel() || cPlayer.getMapid() != cm.getMapId() || cm.getPlayer().getClient().getChannel()!=1){ 
			next = false;
		    }
                } else {
                    next = false;
                }
            }
            if (party.size() > maxPartySize || inMap < minPartySize) {
                next = false;
            }
            if (next) {
                var em = cm.getEventManager("FairyBoss");
                if (em == null) {
                    cm.sendOkS("�ű���������ϵ����Ա��", 0, 2133006);
                    cm.dispose();
                    return;
                }
                var prop = em.getProperty("state");
                if (prop == null || prop.equals("0")) {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                } else {
                    cm.sendOkS("��ǰ��ͼ������Ѿ�����ս������櫣����Ժ����ԡ�", 0, 2133006);
                }
            } else {
                cm.sendOkS("�����������������" + minPartySize + "�����£�û�취��ȥ��������" + minLevel + "�����ϵĽ�ɫ" + minPartySize + "�����ϲ��ܽ�ȥ�����Ҷ�ԱҪ����ͬƵ���͵�ͼ,���Ҹù���ֻ����1����ս��\r\n��ȷ��һ�£�Ȼ���������ҡ�", 0, 2133006);
            }
        }
        cm.dispose();
    }
}