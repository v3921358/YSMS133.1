/* ���һ� */

var status = -1;
var selectedpay = 0;
var acash = 3000;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQrmal/0#";
var icon2 = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            if (status == 2) {
                cm.sendNext(head + "�������Ҫ���ֽ�һ��ɵ��Ļ�����ô���´������ң�");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n�װ���#b#h ##k���ã�����" + cm.getServerName() + "��ҵ���ֵ�һ�Ա.\r\n  ����������ϢΪ:\r\n  " + tz1 + "��ǰ�ֽ�:#r " + getEnergyvalue() + " #kԪ\t  " + tz1 + "�ۼƳ�ֵ��#r" + cm.getTotalRMB() + " #kԪ\r\n" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n#b#L0#" + tz1 + "#r�ֽ�һ����(1:3000)\r\n#b#L4#" + tz1 + "#r�ֽ�Ԫ���н�(1:1)\r\n#b#L5#" + tz1 + "#r���һ��н�(1000:1)\r\n");//#b#L4#" + tz1 + "#r�ֽ�Ԫ���н�(1:1)\r\n#b#L5#" + tz1 + "#r���һ��н�(1000:1)\r\n#L1#" + tz1 + "��ȡ��������#l\r\n#L2#" + tz1+ "����Ա���#l#k\r\n\r\n" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n#L3#" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "#b����������˵�#k" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "" + tz1+ "#l\r\n");
        } else if (status == 1) {
            if (selection == 1) {
                cm.dispose();
                cm.openNpc(9310144, 8);
                return;
            } else if (selection == 2) {
                cm.dispose();
                cm.openNpc(1540419, 100);
                return;
            } else if (selection == 3) {
                cm.dispose();
                cm.openNpc(1540419);
                return;
            } else if (selection == 4) {
                cm.dispose();
                cm.openNpc(1540419, 91);
                return;
            } else if (selection == 5) {
                cm.dispose();
                cm.openNpc(1540419, 89);
                return;
            }

            if (getEnergyvalue() == 0) {
                cm.sendNext(head + "��û�пɶһ����ֽ�");
                cm.dispose();
            } else {
                cm.sendGetNumber(head + "��������Ҫ�һ����ֽ�:\r\n��Ϸ���Ķһ�����Ϊ 1 : 3000\r\n", 1, 1, getEnergyvalue());
            }
        } else if (status == 2) {
            selectedpay = selection;
            if (getEnergyvalue() < selectedpay) {
                cm.sendNext(head + "���ֽ𲻹���");
                cm.dispose();
            } else {
                cm.sendYesNo(head + "���Ƿ�Ҫ��#r " + selectedpay + " #k�ֽ�һ���#b " + selectedpay * acash + " #k�ĵ��");
            }
        } else if (status == 3) {
            if (getEnergyvalue() >= selectedpay) {
                setEnergyvalues(-selectedpay);
                cm.gainNX(selectedpay * acash);
                cm.sendOk("�һ��ɹ�");

            } else {
                cm.sendOk(head + "�һ������ִ����뷴��������Ա��");
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}

function getEnergyvalue() {                                                                                                                                                     //��ѯRMB
    var CharData = cm.getConnection().prepareStatement("SELECT * FROM accounts where id = " + cm.getPlayer().getAccountID() + "").executeQuery();
    while (CharData.next()) {//�õ���¼����
        return parseInt(CharData.getString("rmb"));
    }
    CharData.close();
}

function setEnergyvalues(Number) {                                                                                                                                               //����RMB
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM accounts where id = " + cm.getPlayer().getAccountID() + "").executeQuery();
    while (Times.next()) {
        i++;
    }
    if (i == 0) {
        var insert = cm.getConnection().prepareStatement("INSERT INTO accounts VALUES(?,?)");
        insert.setString(cm.getPlayer().getAccountID(), Number);
        insert.executeUpdate();
    } else {
        var update = cm.getConnection().prepareStatement("update accounts set rmb = ? where id = " + cm.getPlayer().getAccountID());
        update.setString(1, getEnergyvalue(cm.getPlayer().getAccountID()) + Number);
        update.executeUpdate();
    }
}
