/*
 * ��ҷ�����װ װ�� ��̨ϵͳ
 * ���ð�յ�����������
 * �������ݿ� cashtradesystemStore
 */
var status = 0;
var AllRecord;
var TradeId;
var giveback = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.sendOk("ף����Ϸ���!!!");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        var text = "��ù���Ա:\r\n#b"
        text += "#L0# �������еĽ�����Ϣ��\r\n"
        text += "#L1# �ϼ��Զ���ĵ��ߣ�(New~)\r\n"
        text += "#L2# �鿴�ϼ��Զ���ĵ��ߵ�������(New~)"
        text += "\r\n#L3# #r�鿴�������(New~)��\r\n#L4# #r�鿴������־(����100��)��"
        cm.sendSimple(text);


    } else if (status == 1) {
        if (selection == 0) {
            var text = "Ŀǰ���н�����Ϣ:\r\n(��������ƶ����ֿ�)\r\n#d"
            text += "#r#L99999# ����������ת�Ƶ��ֿ⣡\r\n#d"
            AllRecord = cm.getConnection().prepareStatement("SELECT id,itemid FROM cashtradesystem").executeQuery();
            while (AllRecord.next()) {//�õ���¼����
                text += "#L" + AllRecord.getString("id") + "#[��" + AllRecord.getString("id") + "��]  #i" + AllRecord.getString("itemid") + "#\t#t" + AllRecord.getString("itemid") + "# #l\r\n"
            }
            if (text == "Ŀǰ���н�����Ϣ:\r\n(��������ƶ����ֿ�)\r\n#d#r#L99999# ����������ת�Ƶ��ֿ⣡\r\n#d") {
                cm.sendOk("Ŀǰ��ʱû���κν��׷���");
                cm.dispose();
            } else {
                cm.sendSimple(text);
            }
        } else if (selection == 1) {//�ϼ��Զ���ĵ��ߣ�
            cm.dispose();
            cm.openNpc(9900004, 28);
        } else if (selection == 2) {//�鿴����
            var i = 0;
            var text = "������������ݣ�\r\n";
            var CharRecord = cm.getConnection().prepareStatement("SELECT * FROM TradeSystemGiveBack where cid = '-1'").executeQuery();
            while (CharRecord.next()) {//�õ���¼����
                giveback[0] = CharRecord.getString("meso");
                giveback[1] = CharRecord.getString("dianquan");
                giveback[2] = CharRecord.getString("diyong");
                i++;
            }
            if (i == 0) {
                cm.sendOk("��ʱ��û������ȥ�����ݡ�");
                cm.dispose();
            } else {
                if (giveback[0] == 0 && giveback[1] == 0 && giveback[2] == 0) {
                    cm.sendOk("Ŀǰû�н����Բ�ѯ��")
                    cm.dispose();
                } else {
                    cm.sendOk("����Ŀǰһ��������" + i + "�����ߡ�\r\nĿǰ������Ϊ��\r\n��ң�" + giveback[0] + "\r\���" + giveback[1] + "\r\n��" + giveback[2] + "\r\nϣ������������������~");
                    cm.dispose();
                }
            }
        } else if (selection == 3) {
            status = 2;
            cm.sendGetNumber("����Ա��ã�����鿴�����ڵ����������", 0, 0, 365);
        } else if (selection == 4) {
            var i = 0;
            var LogRecord = cm.getConnection().prepareStatement("SELECT tid,cid,boughtByCid,boughtByCName,boughtTradeType,boughtPrice,boughtItemid,DATE_FORMAT(boughtDate,'%m��%d��') as boughtDate FROM cashtradesystemLog LIMIT 100").executeQuery();
            var text = "���������100���ķ���ѶϢ��\r\n#b"
            while (LogRecord.next()) {//�õ���¼����
                if (LogRecord.getString("boughtTradeType") == 0) {//���
                    text += "��" + (i + 1) + "����" + LogRecord.getString("boughtDate") + " #i" + LogRecord.getString("boughtItemid") + "#��" + LogRecord.getString("boughtByCName") + "��" + LogRecord.getString("boughtPrice") + " ������ߡ�\r\n"
                } else if (LogRecord.getString("boughtTradeType") == 1) {//��ȯ
                    text += "��" + (i + 1) + "����" + LogRecord.getString("boughtDate") + " #i" + LogRecord.getString("boughtItemid") + "#��" + LogRecord.getString("boughtByCName") + "��" + LogRecord.getString("boughtPrice") + " ��ȯ���ߡ�\r\n"
                } else if (LogRecord.getString("boughtTradeType") == 2) {
                    text += "��" + (i + 1) + "����" + LogRecord.getString("boughtDate") + " #i" + LogRecord.getString("boughtItemid") + "#��" + LogRecord.getString("boughtByCName") + "��" + LogRecord.getString("boughtPrice") + " ������ߡ�\r\n"
                }
                i++;
            }
            status = -1;
            cm.sendNext(text);
        }
    } else if (status == 2) {//�ƶ����ֿ�
        if (selection == 99999) {
            TradeId = selection;
            var AllRecords = cm.getConnection().prepareStatement("SELECT * FROM cashtradesystem where id = " + TradeId + "").executeQuery();
            var AllRecordAll = cm.getConnection().prepareStatement("SELECT * FROM cashtradesystem").executeQuery();

            var insertEquipData = cm.getConnection().prepareStatement("INSERT INTO cashtradesystemStore(id,cid,itemid,itemtype,str,dex,ints,luk,hp,mp,watk,matk,wdef,mdef,acc,avoid,speed,jump,upgradeSlots,limitBreak,potential1,potential2,potential3,potential4,potential5,potential6,enhance,reqLevel,yggdrasilWisdom,bossDamage,ignorePDR,totalDamage,allStat,karmaCount,tradeType,itemPrice,hands,ViciousHammer,ItemEXP,sealedlevel,sealedExp,Owner,level,expiredate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"); // ��������
            //�õ����ݣ����Ҽ��뵽�ֿ����ݿ�
            while (AllRecordAll.next()) {//�õ���¼����
                insertEquipData.setString(1, AllRecordAll.getString("id"));
                insertEquipData.setString(2, AllRecordAll.getString("cid"));
                insertEquipData.setString(3, AllRecordAll.getString("itemid"));
                insertEquipData.setString(4, AllRecordAll.getString("itemtype"));
                insertEquipData.setString(5, AllRecordAll.getString("str"));
                insertEquipData.setString(6, AllRecordAll.getString("dex"));
                insertEquipData.setString(7, AllRecordAll.getString("ints"));
                insertEquipData.setString(8, AllRecordAll.getString("luk"));
                insertEquipData.setString(9, AllRecordAll.getString("hp"));
                insertEquipData.setString(10, AllRecordAll.getString("mp"));
                insertEquipData.setString(11, AllRecordAll.getString("watk"));
                insertEquipData.setString(12, AllRecordAll.getString("matk"));
                insertEquipData.setString(13, AllRecordAll.getString("wdef"));
                insertEquipData.setString(14, AllRecordAll.getString("mdef"));
                insertEquipData.setString(15, AllRecordAll.getString("acc"));
                insertEquipData.setString(16, AllRecordAll.getString("avoid"));
                insertEquipData.setString(17, AllRecordAll.getString("speed"));
                insertEquipData.setString(18, AllRecordAll.getString("jump"));
                insertEquipData.setString(19, AllRecordAll.getString("upgradeSlots"));
                insertEquipData.setString(20, AllRecordAll.getString("limitBreak"));
                insertEquipData.setString(21, AllRecordAll.getString("potential1"));
                insertEquipData.setString(22, AllRecordAll.getString("potential2"));
                insertEquipData.setString(23, AllRecordAll.getString("potential3"));
                insertEquipData.setString(24, AllRecordAll.getString("potential4"));
                insertEquipData.setString(25, AllRecordAll.getString("potential5"));
                insertEquipData.setString(26, AllRecordAll.getString("potential6"));
                insertEquipData.setString(27, AllRecordAll.getString("enhance"));
                insertEquipData.setString(28, AllRecordAll.getString("reqLevel"));
                insertEquipData.setString(29, AllRecordAll.getString("yggdrasilWisdom"));
                insertEquipData.setString(30, AllRecordAll.getString("bossDamage"));
                insertEquipData.setString(31, AllRecordAll.getString("ignorePDR"));
                insertEquipData.setString(32, AllRecordAll.getString("totalDamage"));
                insertEquipData.setString(33, AllRecordAll.getString("allStat"));
                insertEquipData.setString(34, AllRecordAll.getString("karmaCount"));
                insertEquipData.setString(35, AllRecordAll.getString("tradeType"));
                insertEquipData.setString(36, AllRecordAll.getString("itemPrice"));
                insertEquipData.setString(37, AllRecordAll.getString("hands"));
                insertEquipData.setString(38, AllRecordAll.getString("ViciousHammer"));
                insertEquipData.setString(39, AllRecordAll.getString("ItemEXP"));
                insertEquipData.setString(40, AllRecordAll.getString("sealedlevel"));
                insertEquipData.setString(41, AllRecordAll.getString("sealedExp"));
                insertEquipData.setString(42, AllRecordAll.getString("Owner"));
                insertEquipData.setString(43, AllRecordAll.getString("level"));
                insertEquipData.setString(44, AllRecordAll.getString("expiredate"))
                insertEquipData.executeUpdate(); //����
                // DeleteDataById(AllRecords.getString("id"));
            }
            DeleteDataAll();
            cm.sendNext("��ֲ�������ݳɹ���");
            cm.dispose();
        } else {
            TradeId = selection;
            var AllRecords = cm.getConnection().prepareStatement("SELECT * FROM cashtradesystem where id = " + TradeId + "").executeQuery();
            var insertEquipData = cm.getConnection().prepareStatement("INSERT INTO cashtradesystemStore(id,cid,itemid,itemtype,str,dex,ints,luk,hp,mp,watk,matk,wdef,mdef,acc,avoid,speed,jump,upgradeSlots,limitBreak,potential1,potential2,potential3,potential4,potential5,potential6,enhance,reqLevel,yggdrasilWisdom,bossDamage,ignorePDR,totalDamage,allStat,karmaCount,tradeType,itemPrice,hands,ViciousHammer,ItemEXP,sealedlevel,sealedExp,Owner,level,expiredate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"); // ��������
            //�õ����ݣ����Ҽ��뵽�ֿ����ݿ�
            while (AllRecords.next()) {//�õ���¼����
                if (AllRecords.getString("id") == TradeId) {
                    i = 1;
                    insertEquipData.setString(1, AllRecords.getString("id"));
                    insertEquipData.setString(2, AllRecords.getString("cid"));
                    insertEquipData.setString(3, AllRecords.getString("itemid"));
                    insertEquipData.setString(4, AllRecords.getString("itemtype"));
                    insertEquipData.setString(5, AllRecords.getString("str"));
                    insertEquipData.setString(6, AllRecords.getString("dex"));
                    insertEquipData.setString(7, AllRecords.getString("ints"));
                    insertEquipData.setString(8, AllRecords.getString("luk"));
                    insertEquipData.setString(9, AllRecords.getString("hp"));
                    insertEquipData.setString(10, AllRecords.getString("mp"));
                    insertEquipData.setString(11, AllRecords.getString("watk"));
                    insertEquipData.setString(12, AllRecords.getString("matk"));
                    insertEquipData.setString(13, AllRecords.getString("wdef"));
                    insertEquipData.setString(14, AllRecords.getString("mdef"));
                    insertEquipData.setString(15, AllRecords.getString("acc"));
                    insertEquipData.setString(16, AllRecords.getString("avoid"));
                    insertEquipData.setString(17, AllRecords.getString("speed"));
                    insertEquipData.setString(18, AllRecords.getString("jump"));
                    insertEquipData.setString(19, AllRecords.getString("upgradeSlots"));
                    insertEquipData.setString(20, AllRecords.getString("limitBreak"));
                    insertEquipData.setString(21, AllRecords.getString("potential1"));
                    insertEquipData.setString(22, AllRecords.getString("potential2"));
                    insertEquipData.setString(23, AllRecords.getString("potential3"));
                    insertEquipData.setString(24, AllRecords.getString("potential4"));
                    insertEquipData.setString(25, AllRecords.getString("potential5"));
                    insertEquipData.setString(26, AllRecords.getString("potential6"));
                    insertEquipData.setString(27, AllRecords.getString("enhance"));
                    insertEquipData.setString(28, AllRecords.getString("reqLevel"));
                    insertEquipData.setString(29, AllRecords.getString("yggdrasilWisdom"));
                    insertEquipData.setString(30, AllRecords.getString("bossDamage"));
                    insertEquipData.setString(31, AllRecords.getString("ignorePDR"));
                    insertEquipData.setString(32, AllRecords.getString("totalDamage"));
                    insertEquipData.setString(33, AllRecords.getString("allStat"));
                    insertEquipData.setString(34, AllRecords.getString("karmaCount"));
                    insertEquipData.setString(35, AllRecords.getString("tradeType"));
                    insertEquipData.setString(36, AllRecords.getString("itemPrice"));
                    insertEquipData.setString(37, AllRecords.getString("hands"));
                    insertEquipData.setString(38, AllRecords.getString("ViciousHammer"));
                    insertEquipData.setString(39, AllRecords.getString("ItemEXP"));
                    insertEquipData.setString(40, AllRecords.getString("sealedlevel"));
                    insertEquipData.setString(41, AllRecords.getString("sealedExp"));
                    insertEquipData.setString(42, AllRecords.getString("Owner"))
                    insertEquipData.setString(43, AllRecords.getString("level"))
                    insertEquipData.setString(44, AllRecords.getString("expiredate"))
                    insertEquipData.executeUpdate(); //����
                }
            }
            DeleteDataById(TradeId);
            status = 0;
            cm.sendNext("��ֲ�ɹ���" + TradeId);
        }
    }
    else if (status == 3) {
        var i = 0;
        var meso = 0, nx = 0, hypay = 0;
        var LogRecord = cm.getConnection().prepareStatement("SELECT tid,cid,boughtByCid,boughtByCName,boughtTradeType,boughtPrice,boughtItemid,DATE_FORMAT(boughtDate,'%m��%d��') as boughtDate FROM cashtradesystemLog where DATE_SUB(CURDATE(), INTERVAL " + selection + " DAY) <= date(boughtDate)").executeQuery();
        var text = "������ϵͳ��" + selection + "���ڵ����������\r\n#b"
        while (LogRecord.next()) {//�õ���¼����
            if (LogRecord.getString("boughtTradeType") == 0) {//���
                meso += parseInt(LogRecord.getString("boughtPrice"));
            }
            if (LogRecord.getString("boughtTradeType") == 1) {//��ȯ
                nx += parseInt(LogRecord.getString("boughtPrice"));
            }
            if (LogRecord.getString("boughtTradeType") == 0) {//���
                hypay += parseInt(LogRecord.getString("boughtPrice"));
            }
            i++;
        }
        text += "һ����" + i + "���׷����ɹ���\r\n"
        text += "�����������" + hypay + "\r\n";
        text += "��ȯ��������" + nx + "\r\n";
        text += "�����������" + meso + "\r\n";
        status = -1;
        cm.sendOk(text);
    } else if (status == 4) {

    }
}

function DeleteDataById(id) {//ɾ������
    var delectData = cm.getConnection().prepareStatement("delete from cashtradesystem where id = " + id + "");
    delectData.executeUpdate(); //ɾ������
}

function DeleteDataAll() {//ɾ������
    var delectData = cm.getConnection().prepareStatement("delete from cashtradesystem");
    delectData.executeUpdate(); //ɾ������
}
