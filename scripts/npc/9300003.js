var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (cm.getMapId() != 700000100) {
        cm.sendOk("���������,�������.");
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("���뿪ʼ�����ʽ��?");
    } else if (status == 1) {
        var marr = cm.getQuestRecord(160001);
        var data = marr.getCustomData();
        if (data == null) {
            marr.setCustomData("0");
            data = "0";
        }
        if (data.equals("0")) {
            if (!cm.getParty().getMembers().size() == 2) { //�ж���ӳ�Ա�Ƿ�ﵽ2�ˡ�
                cm.sendNext("�����Ա���ܳ��������ˡ��������������˽����")
                cm.dispose();
            } else if (!cm.isLeader()) { // ���Ƕӳ�
                cm.sendOk("���������Ǿ��������ӳ����ҽ����ɡ�");
                cm.dispose();
            } else if (cm.getPlayer().getMarriageId() > 0) { //�鿴����Ƿ��Ѿ���顣
                cm.sendNext("���Ѿ�����˰ɡ� ���Ļ��ǲ����ٽ��ġ�")
                cm.dispose();
            } else if (cm.MarrageChecking() == 3) { //���������Ƿ��Ѿ����
                cm.sendNext("�������У��Ѿ����˽�����ˡ�\r\n��������ԡ�");
                cm.dispose();
            } else if (cm.allMembersHere() == false) { //����Ƿ���ͬ1��ͼ
                cm.sendNext("��ȷ�����İ��º�����ͬһ��ͼ��")
                cm.dispose();
            } else if (cm.MarrageChecking() == 4) {
                cm.sendNext("�Ҳ�֧��ͬ�Խ�顣���Բ������ǽ�ȥ")
                cm.dispose();
            } else if (cm.MarrageChecking() == 5) {
                cm.sendNext("��ʿ:#b#b#t1050121##k��#b#b#t1050122##k��#b#b#t1050113##k��Ůʿ:#b#t1051129##k��#b#t1051130##k��#b#t1051114##k������#b#t1050121##k��#b#t1051129##k��#b#t1050113##k��#b#t1051114##k,��Щ������ð���̳ǿ��Թ���#b#t1050122##k��#b#t1051130##k�����Ǳ���λ����Ů��������\r\n\r\n#b�봩��������ٺ��ҶԻ���")
                cm.dispose();
                /*} else if (cm.MarrageChecking() == 6) {
                 cm.sendNext("��ӳ�Ա������û�н���ָ��")
                 cm.dispose();
                 */
            } else {
                var chr = cm.getMap().getCharacterById(cm.getPartyFormID());
                if (chr == null) {
                    cm.sendOk("��ȷ����İ�������ͬһ��ͼ.");
                    cm.dispose();
                    return;
                }
                marr.setCustomData("2_");
                cm.setQuestRecord(chr, 160001, "2_");
                cm.doWeddingEffect(chr);
            }
        } else if (data.equals("2_") || data.equals("2")) {
            if (cm.getPlayer().getMarriageId() <= 0) {
                cm.sendOk("��ȷ����İ���ͬ�⿪ʼ�����ʽ.");
                cm.dispose();
                return;
            }
            var chr = cm.getMap().getCharacterById(cm.getPlayer().getMarriageId());
            if (chr == null) {
                cm.sendOk("��ȷ����İ�������ͬһ��ͼ.");
                cm.dispose();
                return;
            }
            cm.setQuestRecord(cm.getPlayer(), 160001, "3");
            cm.setQuestRecord(chr, 160001, "3");
            var dat = parseInt(cm.getQuestRecord(160002).getCustomData());
            if (dat > 10) {
                cm.warpMap(700000200, 0);
            } else {
                cm.setQuestRecord(chr, 160002, "0");
                cm.setQuestRecord(cm.getPlayer(), 160002, "0");
                cm.warpMap(700000300, 0);
            }
        } else {
            cm.sendOk("���ǿ�ʼ�����!");
        }
        cm.dispose();
    }
}