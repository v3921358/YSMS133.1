/*
 * gm����������ܣ����ٿ��ǰ10����ȡ��Ʒ��
 * ����ʱ�䣺2015��11��19�� 09:41:29
 */

importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
var LuckyMoney = 0;
var LuckMoneyType = 0;
var monArr = new Array();
//        id,luckmoneytype,LuckyMoney,AllowPeople,used
/*
 * 0 - ���
 * 1 - ��ȯ
 * 2 -  ����ȯ
 * 3 - �ֽ�
 * ���� - ��Ʒid��Ĭ������Ϊ1���������Ū��������ߣ�
 */
var status = -1;
var iconQ = "#fUI/UIWindow2/QuestAlarm/BtQ/normal/0#";
var ����ԲȦ1 = "#fUI/UIWindow2/bohabManager/dot/1/dot#";
var ����ԲȦ2 = "#fUI/UIWindow2/bohabManager/dot/2/dot#";
var ����ԲȦ3 = "#fUI/UIWindow2/bohabManager/dot/3/dot#";
var ����ԲȦ4 = "#fUI/UIWindow2/bohabManager/dot/4/dot#";
var ������ = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#"
var Gift = "#fUI/UIWindow2/crossHunterUI/reward/button/normal/0#";

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        cm.sendOk("���������Ҫ�Ļ�������������Ŷ~");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var text = ������ + "\r\n #b�װ���#r" + cm.getPlayer().getName() + "#k,#b��ӭ����#r" + cm.getServerName() + "#k! #b�����ǹ���Ա����������Ž��������ٹ����������ҽ���������ԱGm���ŵ����˺�������������ȫ���й�����ʾ����ע��鿴.\r\n\r\n#b";
        text += "\t\t#L0# " + Gift + "\r\n\r\n"
        if (cm.getPlayer().isGM()) {
            text += "#L1# " + ����ԲȦ2 + " #d[����Աѡ��]#r����������á�"
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 0) {//��ȡ����Ա�����ĺ��
            status = 5;
            var text = findLuckeyMoney(0);
            if (text == "") {
                cm.sendOk("#rĿǰ����Ѿ������꣬���ڴ���һ�κ��������~");
                cm.dispose();
                return;
            }
            cm.sendSimple(text);
        } else if (selection == 1) {//�����������
            cm.sendSimple("#b#L0# ����һ��������� \r\n#L1# ����Ŀǰ�ĺ����");
        }
    } else if (status == 2) {
        if (selection == 0) {//����һ�����
            /*
             * 0 - ���
             * 1 - ��ȯ
             * 2 -  ����ȯ
             * 3 - �ֽ�
             * ���� - ��Ʒid��Ĭ������Ϊ1���������Ū��������ߣ�
             */
            cm.sendSimple("��ѡ������Ҫ���ɺ�������ͣ�\r\n#L0# ��� #L1# ��ȯ #L2# ���� #L3# �ֽ� \r\n#L4# ����");
        } else if (selection == 1) {//����Ŀǰ�ĺ��
            //TODO
            status = 6;
            var text = findLuckeyMoney(1);
            if (text == "") {
                cm.sendOk("#r��ʱû�к�����ݡ�");
                cm.dispose();
                return;
            }
            cm.sendSimple(findLuckeyMoney(1));
        }
    } else if (status == 3) {
        switch (selection) {
            case 0://���
                cm.sendGetNumber("����������Ҫ����Ľ������", 0, 0, 2100000000);
                break;
            case 1://��ȯ
                cm.sendGetNumber("����������Ҫ����ĵ�ȯ����", 0, 0, 10000);
                break;
            case 2://����
                cm.sendGetNumber("����������Ҫ����ĵ�������", 0, 0, 10000000);
                break;
            case 3://�ֽ�
                cm.sendGetNumber("����������Ҫ������ֽ�����", 0, 0, 100);
                break;
            case 4://����
                cm.sendGetNumber("���������ID", 0, 0, 9999999);
                break;
        }
        LuckMoneyType = selection; //��¼�������������
    } else if (status == 4) {
        LuckyMoney = selection;
        cm.sendGetNumber("������ú�����ɹ�������ȡ��1��ֻ����ȡһ�Σ�", 0, 0, 999);
    } else if (status == 5) {
        //LuckeyMoneyType������LuckeyMoney����ܶselection�����ȡ����
        setLuckeyMoney(LuckMoneyType, LuckyMoney, selection);
        cm.sendOk("���ɺ�����ݳɹ�����");
		cm.worldMessageEffect("[�������] " + " : " + "������ƴ��������������г�7���ſ�NPC���̻����ˡ��������ˣ���ҿ�������� " , 16, 30);

        cm.worldSpouseMessage(0x23, "�����������" + " : " + "������ " + cm.getChar().getName() + " �������������������Ͻ�ץ��ʱ�����ɡ�");
        cm.worldSpouseMessage(0x23, "�����������" + " : " + "������ " + cm.getChar().getName() + " �������������������Ͻ�ץ��ʱ�����ɡ�");
        cm.worldSpouseMessage(0x23, "�����������" + " : " + "������ " + cm.getChar().getName() + " �������������������Ͻ�ץ��ʱ�����ɡ�");
        cm.worldSpouseMessage(0x23, "�����������" + " : " + "������ " + cm.getChar().getName() + " �������������������Ͻ�ץ��ʱ�����ɡ�");
        cm.worldSpouseMessage(0x23, "�����������" + " : " + "������ " + cm.getChar().getName() + " �������������������Ͻ�ץ��ʱ�����ɡ�");
        //cm.dispose();
        status = -1;
    } else if (status == 6) {
        getLuckeyMoney(selection);
        cm.dispose();
    } else if (status == 7) {
        delMoney(monArr[selection]);
        cm.sendNext("ɾ�����ݳɹ���");
        status = -1;
    }
}
function getLuckeyMoney(which) {
    if (cm.getBossLog("����Ա���" + monArr[which]) >= 1) {
        cm.sendOk("�Բ���һ�����ÿ����ɫֻ����ȡһ�Ρ�");
        cm.dispose();
        return;
    }
    var getMoney = cm.getConnection().prepareStatement("SELECT * FROM LuckMoneyData where id =" + monArr[which] + " and  used < AllowPeople").executeQuery();
    //TODO �ٴ��ж��Ƿ��Ѿ���ȡ
    var ii = cm.getItemInfo();
    cm.getPlayer().dropMessage(-1, monArr[which]);
    while (getMoney.next()) {
        switch (parseInt(getMoney.getString("luckmoneytype"))) {
            case 0://���
                cm.gainMeso(parseInt(getMoney.getString("LuckyMoney")));
                cm.sendOk("��ȡ�ɹ���������");
				cm.worldMessageEffect("��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " ��Һ�� " , 1, 10);

                cm.worldSpouseMessage(0x23, "��ƴ���������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " ��Һ����");
                break;
            case 1://��ȯ
                cm.gainNX(1, parseInt(getMoney.getString("LuckyMoney")));
                cm.sendOk("��ȡ�ɹ���������");
				cm.worldMessageEffect("��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " ������ " , 1, 10);

                cm.worldSpouseMessage(0x23, "��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " ��������");
                break;
            case 2://����
                cm.gainNX(2, parseInt(getMoney.getString("LuckyMoney")));
                cm.sendOk("��ȡ�ɹ���������");
				cm.worldMessageEffect("��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " ���þ���� " , 1, 10);

                cm.worldSpouseMessage(0x23, "��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " ���þ������");
                break;
            case 3://�ֽ�

                cm.gainRMB(parseInt(getMoney.getString("LuckyMoney")));
                cm.sendOk("��ȡ�ɹ���������");
				cm.worldMessageEffect("��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " �ֽ��� " , 1, 10);

                cm.worldSpouseMessage(0x23, "��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " �ֽ�����");
                break;
            case 4://����
                cm.gainItem(parseInt(getMoney.getString("LuckyMoney")), 1);
                cm.sendOk("��ȡ�ɹ���������");
				cm.worldMessageEffect("��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + parseInt(getMoney.getString("LuckyMoney")) + " ���ߺ�� " , 1, 10);

                cm.worldSpouseMessage(0x23, "��ƴ�����������" + " : " + "��� " + cm.getChar().getName() + " ��ȡ�˹���Ա���ŵ� " + ii.getName(parseInt(getMoney.getString("LuckyMoney"))) + " ���ߺ����");
                break;
        }
        iUsed(monArr[which], parseInt(getMoney.getString("used")) + 1);
        cm.setBossLog("����Ա���" + monArr[which]);
    }
}

function iUsed(uid, times) {
    var usedpp = cm.getConnection().prepareStatement("update LuckMoneyData set used = ? where id =" + uid);
    usedpp.setString(1, times);
    usedpp.executeUpdate();
    usedpp.close();
}
function findLuckeyMoney(index) {
    var getMoney;
    if (index == 0) {//0��ʾ���ã� 1��ʾ����
        getMoney = cm.getConnection().prepareStatement("SELECT * FROM LuckMoneyData where used < AllowPeople").executeQuery();
    } else if (index == 1) {
        getMoney = cm.getConnection().prepareStatement("SELECT * FROM LuckMoneyData").executeQuery();
    }
    var text = "";
    var i = 0;
    while (getMoney.next()) {
        text += "#L" + i + "# ��" + (i + 1) + "�������պ��!\r\n";
        monArr.push(getMoney.getString("id"));
        i++;
    }
    getMoney.close();
    return text;
}

function setLuckeyMoney(monType, monNumber, monMax) {
    var inserLuckeyMoney = cm.getConnection().prepareStatement("INSERT INTO LuckMoneyData(id, luckmoneytype, LuckyMoney, AllowPeople, used) value(?,?,?,?,?)");
    inserLuckeyMoney.setString(1, null);
    inserLuckeyMoney.setString(2, monType);
    inserLuckeyMoney.setString(3, monNumber);
    inserLuckeyMoney.setString(4, monMax);
    inserLuckeyMoney.setString(5, 0);
    inserLuckeyMoney.executeUpdate();
    inserLuckeyMoney.close();
}

function delMoney(uid) {
    var delectData = cm.getConnection().prepareStatement("delete from LuckMoneyData where id = " + uid + "");
    delectData.executeUpdate(); //ɾ������
    delectData.close();

}