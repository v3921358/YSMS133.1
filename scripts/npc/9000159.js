var status = 0;
var selStr;
var sel;
var selitem;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var bbb = "#fUI/UIWindow.img/Shop/meso#";
var vvv = "#fUI/UIWindow2.img/ValuePack/button/complete/0#";//��ȡ���
var pass = true;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        selStr = "#r#e<�������ܱ���ѩ�ޣ���С�ձ�>#n#k.\r\n\r\n\t#b��ǰ�������У� #r" + cm.getItemQuantity("4310036") + " #b�� #r�����߱�#k\r\n\r\n  ��������Խ��Խ�����ˣ������ܰ���������#b\r\n\r\n#r�߾��飬100�����Ͽɽ��룬�����м��ʵ���#b�����߱�#k\r\n#b������ʱ�� 5 ����,ÿ�տ��Խ��� 3 �Σ��벻Ҫ�����˳�\r\n";
        selStr += "#L2#" + aaa + " #r�淨���ܣ���ϸ�淨���̣�#l\r\n";
        //selStr += "#L3#" + aaa + " #b�һ�����#d��ħ�������ᣬ��ң�#l\r\n";
        //selStr += "#L5#" + aaa + " #r�һ�װ��#d��140��150��160װ����#l\r\n";
        selStr += "#L1#" + aaa + " #b����ˢ��ģʽ#d�����տɽ��� #r" + (3 - cm.getBossLog("����ѩ��")) + " #d�Σ�#l\r\n";
        //selStr += "#L6#" + aaa + " #b���BOSSģʽ#d���ƶ����޴������룩#l\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        sel = selection;
        if (sel == 1) {
            if (cm.getParty() == null) { // No Party
                cm.sendOk("��Ҫ��#b����#kһ�����,����ֻ������һ����~.zzzZZZZZ..");
                cm.dispose();
                return;
            } else if (!cm.isLeader()) { // Not Party Leader
                cm.sendOk("��жӳ�����˵��.");
                cm.dispose();
                return;
            } else if (cm.getLevel() <= 99) {
                cm.sendOk("��ȷ����ĵȼ�100�����ϡ�");
                cm.dispose();
                return;
            } else if (cm.getMap(865030111).getCharactersSize() > 0) { // Not Party Leader
                cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                cm.dispose();
                return;
            } else if (cm.getBossLog("����С�ձ�") >= 3) {
                cm.sendOk("����ģʽÿ��ֻ�ܽ��� 3 ��");
                cm.dispose();
                return;
            } else {
                var party = cm.getParty().getMembers();
                if (party.size() > 1) {
                    cm.sendOk("#r�Բ���,Ϊ�˳��׵Ĳ����������,ֻ��һ��ǰ��..");
                    cm.dispose();
                    return;
                }
                var em = cm.getEventManager("xrb");
                if (em == null) {
                    cm.sendOk("��δ����.");
                    cm.dispose();
                    return;
                } else {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                    cm.setBossLog("����С�ձ�");
                    cm.worldSpouseMessage(0x20, "������ѩ�ޡ� : ��� <" + cm.getChar().getName() + "> �����˰�ɱ�߾ݵ�.");
                    cm.dispose();
                }
            }
        } else if (sel == 7) {
            if (cm.getParty() == null) { // No Party
                cm.sendOk("��Ҫ��#b����#kһ�����");
                cm.dispose();
                return;
            } else if (!cm.isLeader()) { // Not Party Leader
                cm.sendOk("��жӳ�����˵��.");
                cm.dispose();
                return;
            } else if (cm.getLevel() <= 99) {
                cm.sendOk("��ȷ����ĵȼ�100�����ϡ�");
                cm.dispose();
                return;
            } else if (cm.getMap(865030112).getCharactersSize() > 0) { // Not Party Leader
                cm.sendOk("��������ս�˸��������Ե�һ�ᣬ���߻������߳���һ�£�..");
                cm.dispose();
                return;
            } else {
                var party = cm.getParty().getMembers();
                if (party.size() < 4) {
                    cm.sendOk("#r�Բ���,��ӱ���4�ˣ�����ѡ����ģʽ");
                    cm.dispose();
                    return;
                }
                for (var i = 0; i < party.size(); i++) {
                    if (party.get(i).getLevel() < 100) {
                        pass = false;
                        break;
                    }
                }
                if (pass) {
                    var em = cm.getEventManager("xrb1");
                    if (em == null) {
                        cm.sendOk("��δ����.");
                        cm.dispose();
                        return;
                    } else {
                        em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 120);
                        cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x09, cm.getC().getChannel(), "������С�ձ���" + " : " + "��� <" + cm.getChar().getName() + "> �����������˰�ɱ�߾ݵ�."));
                        cm.dispose();
                    }
                }else{
                    cm.sendOk("��Ķ��ѱ�����100�ȼ����ϡ�");
                    cm.dispose();
                }
            }
        } else if (sel == 3) {
            cm.dispose();
            cm.openNpc(9310144, 31);
        } else if (sel == 5) {
            cm.dispose();
            cm.openNpc(9900003, 21);
        } else if (sel == 2) {
            cm.sendOkS("#r#e<����С�ձ�>\r\n\r\n#d#e����˵����#k#n#b�����ÿ��15��ˢ��һ�������Ѹ������\r\n#d#eʧ��������#k#n#b��ͼ��������������100ֻ��\r\n#e#d��ս������#k#n#bɱ��������л��ʵ���#r#z4310036##k\r\n#d#eǮ�����ã�#k#n#b�ɶһ�װ��������\r\n#d#e����������#k#n#b��Ҫ�ȼ�����100����", 2);
            cm.dispose();
        } else if (sel == 6) {
            cm.dispose();
	    cm.openNpc(9310144, 39);
        }
    }
}
