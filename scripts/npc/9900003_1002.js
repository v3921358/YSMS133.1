/* ϴװ��Ǳ�� */

var status = -1;
var potList = Array(
Array(40603, "����BOSSʱ�˺���+40%", 1),
Array(40292, "���ӹ���40%�ķ�����", 1),
Array(42051, "��������+12%", 1),
Array(60001, "���˺���+12% (�����޸ĸ���Ǳ��)", 1),
Array(60002, "�������ԣ�+20% (�����޸ĸ���Ǳ��)", 1),
Array(60007, "MaxHP : +10% (�����޸ĸ���Ǳ��)", 1),
Array(60008, "������/ħ����+10% (�����޸ĸ���Ǳ��)", 1),
Array(40055, "������ 12%", 1));
var potId = -1; //Ǳ�ܵ�ID
var depict = ""; //Ǳ�ܵ�����
var points = -1; //ÿ�εļ۸�
var potline = 1; //�޸ĵ�Ǳ���ǵڼ���
var oldEquip;
var newEquip;
var count = 1; //����ϴ���Ǹ����ԵĴ���
var slot = 1; //������Ҫ�޸ĵ�װ���ڱ�����λ��
var potline = 1; //������Ҫ�޸ĵ��ǵڼ���Ǳ�� [1-3] Ϊ��ͨ [4-6] Ϊ����
var Nx = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n\r\n�װ���#r#h ##k����!��ѡ��ʲô����Ǳ��:\r\n#kӵ�к�ɫ����: #r" + cm.itemQuantity(3994417) + "#v3994417##k\r\n\r\n";
        for (var i = 0; i < potList.length; i++) {
            selStr += "\r\n#L" + i + "##b " + potList[i][1] + "#k  \r\n\t#d(�����ģ� #r" + potList[i][2] + "#k #k#d ��ɫ����)#l\r\n";
        }
        cm.sendSimple(selStr + " \r\n ");
    } else if (status == 1) {
        oldEquip = cm.getEquipBySlot(slot);
        if (oldEquip == null || oldEquip.getState() != 0x14) { //oldEquip.getState() != 0x14 ���װ����ͨǱ���Ƿ� SS
            cm.sendOk("���ִ���: \r\n��������1��λ�õ�װ��Ϊ�� ���� װ����Ǳ�ܵȼ���Ϊ SS");
            cm.dispose();
            return; //���ִ���ֱ�ӷ��� ��ִ������Ĳ��� �������ע��
        }
        var pot = potList[selection];
        if (pot != null) {
            potId = pot[0];
            depict = pot[1];
            points = pot[2];
            cm.sendYesNo("���Ƿ�Ҫ��#bװ������һ��װ��\r\n��һ��Ǳ������(����ı�����Ǳ������)#k\r\nһ��ϴǱ������Ϊ #b" + depict + "#k��");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
	if(cm.itemQuantity(3994417) < 1) {
	    cm.sendOk("��ȷ�ϱ������Ƿ����#v3994417##t3994417#");
	    cm.dispose();
	    return;
	}
        if (potId <= 0 || depict == "" || points <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
            cm.sendYesNo("ϴ��Ǳ������Ϊ #b" + depict + "#k ���� #b" + count + "#k �Ρ�\r\n���α�����������Ҫ:#r 1 #k ��ɫ���� �Ƿ��������ԣ�");
    } else if (status == 3) {
        newEquip = cm.getEquipBySlot(slot);
        if (oldEquip == newEquip) { //����ط�����Ҫ���������
                if (cm.changePotential(slot, potline, potId, false)) { //[װ��λ��] [Ǳ��λ��] [Ǳ��ID] [�Ƿ񹫸�]
                    //todo �۵��
		    cm.gainItem(3994417,-1);
                    cm.sendOk("��ϲ���ɹ�ϴ��Ǳ������....");
		    cm.getPlayer().saveToDB(false, false);
		    cm.dispose();
		    return;
                } else {
                    cm.sendOk("���ִ���...");
		    cm.dispose();
                }
        } else {
            cm.sendOk("���ִ���...");
	    cm.dispose();
        }
    }
}