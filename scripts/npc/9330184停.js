var status = 0;
var selStr;
var sel;
var selitem;
var psrw = new Array(1202001, 1202002, 1202003, 1202004);
var rand = Math.floor(Math.random() * psrw.length);

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
        cm.sendNext("��������������Ľ�ʬ���һ�����㽱����\r\n#r��ȡ������鿴�����Ƿ���,��ȡʧ��GM������#l");
    } else if (status == 1) {
        if (cm.getChar().getMap().getAllMonstersThreadsafe().size() == 0) {
            if (cm.getBossLog("����ʬ", 1) == 0) {
                cm.setBossLog("����ʬ", 1);
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(psrw[rand]); 
                var toDrop = ii.randomizeStats(ii.getEquipById(psrw[rand])).copy();
                toDrop.setStr(50); //װ������
                toDrop.setDex(50); //װ������
                toDrop.setInt(50); //װ������
                toDrop.setLuk(50); //װ������
                toDrop.setMatk(50); //������
                toDrop.setWatk(50); //ħ������
                cm.getPlayer().getInventory(type).addItem(toDrop); //�����װ���������
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //ˢ�±���
            }
            cm.sendOk("��л������������ʬ������Ľ�ʬͼ�ں��������ҿ���ͨ�ذ�\r\n#rһ����ֻ����ȡһ�Σ��Ժ���������������#k");
        }
        cm.sendOk("�㻹û���������ʬ�ɣ�");
        cm.dispose();
    }
}