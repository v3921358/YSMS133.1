/*
 * ��ҷ�����װ װ�� ϵͳ
 * ���ð�յ�����������
 * ����ʱ�䣺2015��7��24�� 15:20:09
 * �������ݣ�����Ա���Զ����ϴ�����
 * �������ݣ�����Ա�ɲ鿴�������������
 * �������ݣ�����Ա�ɲ鿴����100��������־
 */
var status = 0;
var backupmode = 0;
var EquipStat = new Array();
var EquipStatFromData = new Array();
var itemid;
var TradeId;
var TradePrice;
var TradeItem;
var TradeMod;
var TradeCid;
var tradetype;
var itemposition;
var canbuy = false;
var s;//��ֹĿ¼����
var ItemPrice;
var TradeData;
var blockItem = Array(4000001);
var giveback = new Array();
var newItemList;
var indexSearch = false;

var aaa = "#fUI/UIWindow4/PQRank/rank/gold#";
var xxx = "#fUI/UIWindow.img/Shop/meso#";
var eff4 = "#fUI/Basic/BtHide3/mouseOver/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
        //cm.sendOk("ף����Ϸ���!!!");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        CheckData();//�����������
        var text = "#e#d�������������������� ����ϵͳ ������������������#n#k\r\n��Ŀǰӵ�� ��#r" + cm.getPlayer().getCSPoints(1) + "#k�� ���\r\r��Ŀǰӵ�� ��#r " + cm.getRMB() + "#k�����\r\n";
        text += "#L0# " + eff4 + " #e#r�鿴���м���װ��#n#k#l  #L4# " + eff4 + " #e#rһ���������߱��#n\r\n\r\n";
        text += "#L1# " + xxx + " #e#d��Ҫ�ϼ��ҵ�װ��#n#k#l\r\n\r\n"; //OK
        text += "#L2# " + aaa + " #e���˼��۹���#n#k#l\r\n\r\n";
        text += "    #e#dPS:�µ��¼����м���װ��ת�浽���Ĳֿ�#n#k\r\n";
        text += "           #e#dPS:���˼��۹���-�ҵĲֿ�#n#k\r\n";
        if (cm.getPlayer().isGM()) {
            text += "#r#e#L3# " + eff4 + " #e����Ա������̨#n#k#l\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        switch (selection) {
            case 0://�鿴Ŀǰ���н���
                s = 0;//��ֹĿ¼����
                status = 7;
                var text = "������Ŀǰ�Ľ�����Ϣ��\r\n#b "
                var i = 0;
                var AllRecord = cm.getConnection().prepareStatement("SELECT id,cid,itemid,itemPrice,tradeType FROM cashtradesystem").executeQuery();

                while (AllRecord.next()) {//�õ���¼����
                    if (AllRecord.getString("tradeType") == 1) {//���
                        text += "\r\n#L" + AllRecord.getString("id") + "#[���#r" + AllRecord.getString("id") + "#b]  #v" + AllRecord.getString("itemid") + "#  #t" + AllRecord.getString("itemid") + "##l  #r(" + AllRecord.getString("itemPrice") + ")#b���"
                    } else if (AllRecord.getString("tradeType") == 2) {//���
                        text += "\r\n#L" + AllRecord.getString("id") + "#[���#r" + AllRecord.getString("id") + "#b]  #v" + AllRecord.getString("itemid") + "#  #t" + AllRecord.getString("itemid") + "##l  #d(" + AllRecord.getString("itemPrice") + ")#b���"
                    } else {
                        text += "\r\n#L" + AllRecord.getString("id") + "#[���#r" + AllRecord.getString("id") + "#b]  #v" + AllRecord.getString("itemid") + "#  #t" + AllRecord.getString("itemid") + "##l  (" + AllRecord.getString("itemPrice") + ")���"
                    }
                    if (AllRecord.getString("cid") == -1) {//����ǹ���Ա��ӵ�
                        text += "#r�ع�~#b"
                    }
                    i++;
                }
                if (text == "������Ŀǰ�Ľ�����Ϣ��\r\n#b ") {
                    cm.sendOk("Ŀǰ��ʱû���κν��׷���");
                    cm.dispose();
                } else {
                    cm.sendSimple(text);
                }
                break;
            case 1://�����ҵĽ���1
                if (cm.getBossLogAcc("����ϵͳ") >= 10) {
                    cm.sendOk("�Բ���һ���ʺ�һ��ֻ�ܼ���10�Ρ�");
                    cm.dispose();
                } else {
                    var text = "��ѡ����Ҫ�����׵����ͣ�\r\n";
                    text += "#L0# װ��#l";
                    //text += "#L1# ��������#l";
                    cm.sendSimple(text);
                }
                break;
            case 2:
                s = 0;
                status = 10;
                var text = "��ã���ӭ�������˹������ġ�#b\r\n#L0# " + eff4 + " #e#r�鿴�ҵļ��ۡ�#n#k#l\r\n\r\n#L1# " + xxx + " #e#d�¼��Ҽ��۵���Ʒ#n#k#l\r\n\r\n#L2# " + xxx + " #e�鷷���������#n#k#l\r\n\r\n#L3# " + xxx + " #e#d�ҵĲֿ⡾#r�µ�δ���۵��߽�ת���ڴ˲ֿ���#k��#n#k#l"
                cm.sendSimple(text);
                break;
            case 3://����Ա��̨
                cm.dispose();
                cm.openNpc(9900004, 27);
                break;
            case 4://��������
                status = 7;
                indexSearch = true;
                cm.sendGetNumber("��������Ҫ�����ļ��۱�š�", 0, 1, 9999999);
                break;
            default:
                cm.dispose();
                break;
        }
    } else if (status == 2) {//�����ҵĽ���2
        switch (selection) {
            case 0://װ��
                var i = 0;
                var list = cm.getInventory(1).list();
                var itemList = list.iterator();
                var text = "��ѡ������Ҫ���׵ĵ��ߣ�\r\n#b";
                position = -1;
                newItemList = Array();
                while (itemList.hasNext()) {
                    var item = itemList.next();
                    newItemList[item.getPosition()] = item.getItemId();
                    i++;
                }
                if (i == 0) {
                    cm.sendOk("�Բ�������װ������û��װ�����޷�������");
                    cm.dispose();
                } else {
                    for (var key in newItemList) {
                        text += "#L" + key + "# #v" + newItemList[key] + "# #t" + newItemList[key] + "#\r\n";
                    }
                    s = 1;
                    cm.sendSimple(text);
                    /*
                     if (cm.getEquipBySlot(1) == null) {
                     cm.sendOk("�����Ҫ���׵�װ�����ڵ�һ���������档\r\n����ȷ���Ƿ����ֽ���ߡ�");
                     cm.dispose();
                     } else {
                     itemid = parseInt(selection);
                     s = 1;
                     status = 4;
                     cm.sendNext("��Ҫ���۵ĵ���Ϊ��#v" + cm.getEquipBySlot(1).getItemId() + "#  #t" + cm.getEquipBySlot(1).getItemId() + "#��");
                     }
                     */
                }
                break;
            case 1://����
                s = 1;
                cm.sendGetNumber("��������Ҫ�����ĵ���ID��", 0, 10, 9999999);
                break;
        }
    } else if (status == 3) {
        if (s == 1) {//����װ��
            if (position == -1)
                position = selection;
            if (position != -1) {
                if (cm.getEquipBySlot(position).getFlag() == 1) {
                    cm.sendOk("�Բ��������ĵ��߲��ܱ�������");
                    cm.dispose();
                    return;
                }
                if (cm.getNX(1) < 1000) {
                    cm.sendOk("�Բ�����ĵ�ȯ����1000�㲻���ϼܡ�");
                    cm.dispose();
                    return;
                }
                if (cm.getEquipBySlot(position).getExpiration() > 0) {
                    cm.sendOk("�Բ�����ʱ�����Ƶĵ��߲����ϼܡ�");
                    cm.dispose();
                    return;
                }
                s = 1;
                status = 4;
                cm.sendNext("��Ҫ���۵ĵ���Ϊ��#v" + cm.getEquipBySlot(position).getItemId() + "#  #t" + cm.getEquipBySlot(position).getItemId() + "#��\r\n�ϼ���Ҫ1000��ȯ�������ѣ���ȷ����");
            }
        } else {
            itemid = parseInt(selection);
            if (parseInt(itemid / 1000000) == 1) {
                cm.sendOk("�Բ��������ﲻ�ܷ���װ��Ŷ��");
            } else {
                status = 9;
                s = 1;
                cm.sendSimple("��ѡ���׵����ͣ�\r\n#L0# " + xxx + " #e#r ���-��ȡ����%5˰#n#k#l    #L1# " + xxx + " #e#r ��ȯ-��ȡ����%5˰#n#k#l    #L2# " + xxx + " #e#d ���-��ȡ����%2˰#n#k#l");
            }
        }

    } else if (status == 4) {
        if (cm.haveItem(itemid)) {
            ItemPrice = selection;
            var insertItemData = cm.getConnection().prepareStatement("INSERT INTO cashtradesystem(id,cid,itemid,itemtype,tradeType,itemprice) values (?,?,?,?,?,?)");
            insertItemData.setString(1, null); //�����¼ID
            insertItemData.setString(2, cm.getPlayer().getId()); //cid
            insertItemData.setString(3, itemid); //itemid
            insertItemData.setString(4, 1); //itemtype  1����ͨ����
            insertItemData.setString(5, tradetype); //tradeType    0��� 1��ȯ 2����
            insertItemData.setString(6, ItemPrice); //price
            insertItemData.executeUpdate(); //����
            cm.gainItem(itemid, -1);
            cm.sendOk("���Ѿ����������Ľ�����Ϣ��\r\n���ڽ��׵����Ѿ�ת�浽���׿��С�");
            cm.dispose();
        } else {
            //cm.sendOk("�Բ�����û�д˵��ߣ����ܷ�����");
            cm.dispose();
        }
    } else if (status == 5) {
        if (s == 1) {
            s = 1;
            cm.sendSimple("��ѡ���׵����ͣ�\r\n#L0# " + xxx + " #e#d���#n#k ����ȡ����%5˰��#l \r\n\r\n#L1# " + xxx + " #e#d��ȯ#n#k ����ȡ����%5˰��#l \r\n\r\n#L2# " + xxx + " #e#r���#n#k ����ȡ����%2˰��#l");
        } else {
            cm.dispose();
        }
    } else if (status == 6) {
        tradetype = selection;
        if (s == 1) {
            if (selection == 1) {
                cm.sendGetNumber("����������Ҫ�����ļ۸�1", 0, 1000, 2100000000);
            } else {
                cm.sendGetNumber("����������Ҫ�����ļ۸�1", 0, 10, 2100000000);
            }
        } else {
            cm.dispose();
        }
    } else if (status == 7) {
        ItemPrice = selection;
        var insertEquipData = cm.getConnection().prepareStatement("INSERT INTO cashtradesystem(id,cid,itemid,itemtype,str,dex,ints,luk,hp,mp,watk,matk,wdef,mdef,acc,avoid,speed,jump,upgradeSlots,limitBreak,potential1,potential2,potential3,potential4,potential5,potential6,enhance,reqLevel,yggdrasilWisdom,bossDamage,ignorePDR,totalDamage,allStat,karmaCount,tradeType,itemPrice,hands,ViciousHammer,ItemEXP,sealedlevel,sealedExp,Owner,level,expiredate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"); // ��������
        getEquipStatToArray(); //�õ�װ��������
        insertEquipData.setString(1, null); //�����¼ID
        insertEquipData.setString(2, cm.getPlayer().getId()); //cid
        insertEquipData.setString(3, cm.getEquipBySlot(position).getItemId()); //itemid
        insertEquipData.setString(4, 0); //itemtype
        for (var i = 5; i < 35; i++) {
            insertEquipData.setString(i, EquipStat[i - 5]); //status
        }
        insertEquipData.setString(35, tradetype); //tradetype
        insertEquipData.setString(36, ItemPrice);

        //�������ӵ�����
        insertEquipData.setString(37, EquipStat[30]);
        insertEquipData.setString(38, EquipStat[31]);
        insertEquipData.setString(39, EquipStat[32]);

        insertEquipData.setString(40, EquipStat[33]);
        insertEquipData.setString(41, EquipStat[34]);
        insertEquipData.setString(42, EquipStat[35]);
        insertEquipData.setString(43, EquipStat[36]);
        insertEquipData.setString(44, EquipStat[37]);
        insertEquipData.executeUpdate(); //����
        cm.removeSlot(1, position, 1); //ɾ����ԭʼ����
        cm.sendNext("���Ѿ����������Ľ�����Ϣ��\r\n���ڽ��׵����Ѿ�ת�浽���׿��С�\r\n��ȡ����1000��ȯ�������ѡ�");
        cm.gainNX(-1000);//������1000��ȯ
        status = -1;
    } else if (status == 8) {
        var text = "";
        var i = 0;
        TradeId = selection;//�õ����׺�
        TradeData = cm.getConnection().prepareStatement("SELECT * FROM cashtradesystem").executeQuery();
        if (indexSearch) {
            text += " - ����������������ѶϢ��\r\n"
        }
        while (TradeData.next()) {//�õ���¼����
            if (TradeData.getString("id") == TradeId) {
                i++;
                TradeItem = TradeData.getString("itemid");
                TradeMode = TradeData.getString("itemtype");
                TradePrice = TradeData.getString("itemprice");
                TradeCid = TradeData.getString("cid");
                getEquipStatFormData();//�����ݿ��еõ�����
            }
        }
        if (i == 0) {
            cm.sendNext("�Բ���û�м�������Ŷ�Ӧ�����ݡ�");
            return;
        }//δ������
        if (TradeMode == 0) {//װ��
            var ii = cm.getItemInfo();
            toDrop = ii.randomizeStats(ii.getEquipById(TradeItem)).copy(); // ����һ��Equip��(�������װ��)
            if (EquipStatFromData[31] == 0) {
                text += "#e#d���ļ۸��ǣ�#r" + EquipStatFromData[30] + "#d ���,�����һ�����й���.#n\r\n";
            } else if (EquipStatFromData[31] == 1) {
                text += "#e#d���ļ۸��ǣ�#r" + EquipStatFromData[30] + "#d ��ȯ,�����һ�����й���.#n\r\n";
            } else if (EquipStatFromData[31] == 2) {
                text += "#e#d���ļ۸��ǣ�#r" + EquipStatFromData[30] + "#d ���,�����һ�����й���.#n\r\n";
            }
            text += "#d#eװ������#n�� #r#e#t" + TradeItem + "##d װ��ͼƬ [#v" + TradeItem + "#]\r\nװ���������£�������ʱע��װ���������ո�\r\n#n#b";
            text += "������������" + EquipStatFromData[38] + "\r\n";
            text += "������������" + EquipStatFromData[14] + " ��ǿ����" + EquipStatFromData[22] + "\r\n";
            text += "������" + EquipStatFromData[0] + "    ���ݣ�" + EquipStatFromData[1] + "    ������" + EquipStatFromData[2] + "    ������" + EquipStatFromData[3] + "\r\n";
            text += "�﹥��" + EquipStatFromData[6] + "    ħ����" + EquipStatFromData[7] + "";
            text += "    �����" + EquipStatFromData[8] + "    ħ����" + EquipStatFromData[9] + "\r\n";
            text += "HP��" + EquipStatFromData[4] + "      MP��" + EquipStatFromData[5] + "\r\n";
            text += "�����ʣ�" + EquipStatFromData[10] + "      �ر��ʣ�" + EquipStatFromData[11] + "\r\n";
            text += "�ƶ��ٶȣ�" + EquipStatFromData[12] + "    ��Ծ����" + EquipStatFromData[13] + "\r\n";
            text += "�ƹ�����ͻ�ƣ�" + EquipStatFromData[15] + "\r\n";
            text += "Ǳ��1��" + ii.resolvePotentialId(TradeItem, EquipStatFromData[16]) + "\r\n";
            text += "Ǳ��2��" + ii.resolvePotentialId(TradeItem, EquipStatFromData[17]) + "\r\n";
            text += "Ǳ��3��" + ii.resolvePotentialId(TradeItem, EquipStatFromData[18]) + "\r\n";
            text += "����Ǳ��1��" + ii.resolvePotentialId(TradeItem, EquipStatFromData[19]) + "\r\n";
            text += "����Ǳ��2��" + ii.resolvePotentialId(TradeItem, EquipStatFromData[20]) + "\r\n";
            text += "����Ǳ��3��" + ii.resolvePotentialId(TradeItem, EquipStatFromData[21]) + "\r\n";
            text += "BOSS���⹥�����ӳɣ�" + EquipStatFromData[25] + "\r\n";
            text += "�رܰٷֱȼӳɣ�" + EquipStatFromData[26] + "\r\n";
            text += "���˺��ӳɣ�" + EquipStatFromData[27] + "\r\n";
            text += "ȫ���Լӳɣ�" + EquipStatFromData[28] + "\r\n";
            text += "��ӡ����׶Σ�" + EquipStatFromData[35] + "\r\n";
            text += "��ӡ�������ֵ��" + EquipStatFromData[36] + "/113723136\r\n";

        } else {
            text += "\r\n[#v" + TradeItem + "#] #t" + TradeItem + "#\r\n\r\n#b";
        }

        s = 1;
        cm.sendNext(text);
        status = 14;
    } else if (status == 9) {//����ѶϢ
        if (s == 1) {
            if (BuyCheckDataAgain()) {
                // if (cm.getEquipBySlot(1) == null) {
                if (cm.getSpace(1) < 1) {
                    cm.sendOk("�Բ����������װ���������ڳ�һ��");
                    cm.dispose();
                    return;
                }
                if (parseInt(EquipStatFromData[31]) == 0) {
                    if (cm.getMeso() >= TradePrice) {
                        cm.gainMeso(-TradePrice);
                        if (TradeMode == 0) {
                            if (cm.getSpace(1) >= 1) {
                                UpdateData(TradeCid, TradePrice, 0, 0);
                                MakeEquip();
                                setLog(TradeId);//����Log
                                cm.sendOk("��ϲ�㹺��ɹ���");

                                DeleteDataById(TradeId);
                                cm.dispose();
                            }
                        } else {
                            UpdateData(TradeCid, TradePrice, 0, 0);
                            cm.gainItem(TradeItem, 1);
                            cm.sendOk("��ϲ�㹺��ɹ���");
                            setLog(TradeId);//����Log

                            DeleteDataById(TradeId);
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("�Բ�����û���㹻�Ľ�ҡ�");
                        cm.dispose();
                    }
                } else if (parseInt(EquipStatFromData[31]) == 1) {
                    if (cm.getNX(1) >= TradePrice) {
                        cm.gainNX(1, -TradePrice);
                        if (TradeMode == 0) {
                            if (cm.getSpace(1) >= 1) {
                                UpdateData(TradeCid, 0, TradePrice, 0);
                                MakeEquip();
                                cm.sendOk("��ϲ�㹺��ɹ���");
                                setLog(TradeId);//����Log
                                DeleteDataById(TradeId);
                                cm.dispose();
                            }
                        } else {
                            UpdateData(TradeCid, 0, TradePrice, 0);
                            cm.gainItem(TradeItem, 1);
                            cm.sendOk("��ϲ�㹺��ɹ���");
                            setLog(TradeId);//����Log
                            DeleteDataById(TradeId);
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("�Բ�����û���㹻�ĵ�ȯ��\r\n��Ŀǰӵ�� ��#r" + cm.getPlayer().getCSPoints(1) + "#k�� ���");
                        cm.dispose();
                    }
                } else if (parseInt(EquipStatFromData[31]) == 2) {
                    if (cm.getRMB() >= TradePrice) {
                        cm.gainRMB(-TradePrice);
                        if (TradeMode == 0) {
                            if (cm.getSpace(1) >= 1) {
                                UpdateData(TradeCid, 0, 0, TradePrice);
                                MakeEquip();
                                cm.sendOk("��ϲ�㹺��ɹ���");
                                setLog(TradeId);//����Log
                                DeleteDataById(TradeId);
                                cm.dispose();
                            }
                        } else {
                            UpdateData(TradeCid, 0, 0, TradePrice);
                            cm.gainItem(TradeItem, 1);

                            cm.sendOk("��ϲ�㹺��ɹ���");
                            setLog(TradeId);//����Log
                            DeleteDataById(TradeId);
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("�Բ�����û���㹻����\r\n��Ŀǰӵ�� ��#r " + cm.getRMB() + "#k�� ���");
                        cm.dispose();
                    }
                } else {
                    // cm.sendOk(EquipStatFromData[31]);
                    cm.dispose();
                }
            } else {
                cm.sendOk("ѡ��ĵ����Ѿ��������������һ��������Ŷ��");
                cm.dispose();
            }
        } else {
            cm.dispose();
        }
    } else if (status == 10) {
        if (s == 1) {
            status = 3;
            tradetype = selection;
            cm.sendGetNumber("����������Ҫ�����ļ۸�", 0, 0, 2100000000);
        } else {
            cm.dispose();
        }
    } else if (status == 11) {
        s = 0;
        if (selection == 0) {
            var text = "��������Ľ�����Ϣ��\r\n";
            var AllRecord = cm.getConnection().prepareStatement("SELECT id,itemid FROM cashtradesystem where cid = " + cm.getPlayer().getId() + "").executeQuery();
            while (AllRecord.next()) {//�õ���¼����
                text += "\r\n #b[���#r" + AllRecord.getString("id") + "#b]  #v" + AllRecord.getString("itemid") + "#\t#t" + AllRecord.getString("itemid") + "##l\r\n"
                i++;
            }
            if (text == "��������Ľ�����Ϣ��\r\n") {
                cm.sendOk("Ŀǰ��ʱû���κν��׷���");
            } else {
                cm.sendNext(text);
            }

            status = -1;
        } else if (selection == 1) {
            var text = "��������Ľ�����Ϣ��\r\n";
            var AllRecord = cm.getConnection().prepareStatement("SELECT id,itemid FROM cashtradesystem where cid = " + cm.getPlayer().getId() + "").executeQuery();
            while (AllRecord.next()) {//�õ���¼����
                text += "\r\n#L" + AllRecord.getString("id") + "##b[���#r" + AllRecord.getString("id") + "#b]  #v" + AllRecord.getString("itemid") + "#\t#t" + AllRecord.getString("itemid") + "##l\r\n"
                i++;
            }
            if (text == "��������Ľ�����Ϣ��\r\n") {
                cm.sendOk("Ŀǰ��û���κμ��۵��ߡ�");
                cm.dispose();//����
            } else {
                s = 1;
                cm.sendSimple(text);
            }

        } else if (selection == 2) {
            var i = 0;
            var text = "������������ݣ�\r\n";
            var CharRecord = cm.getConnection().prepareStatement("SELECT * FROM TradeSystemGiveBack where cid = " + cm.getPlayer().getId() + "").executeQuery();
            while (CharRecord.next()) {//�õ���¼����
                giveback[0] = CharRecord.getString("meso");
                giveback[1] = CharRecord.getString("dianquan");
                giveback[2] = CharRecord.getString("diyong");
                i++;
            }
            if (i == 0) {
                cm.sendOk("��ʱ��û��������ݡ�");
                cm.dispose();
            } else {
                status = 13;
                if (giveback[0] == 0 && giveback[1] == 0 && giveback[2] == 0) {
                    cm.sendOk("Ŀǰû�н�������ȡ��")
                    cm.dispose();
                } else {
                    cm.sendSimple("��������������Ʒ��#b\r\n#L0#��ؽ��(" + giveback[0] + ")  ��ص�ȯ(" + giveback[1] + ")  ������(" + giveback[2] + ")\r\n#e#rȫ����ȡ��#k#n#l")
                }
            }
        } else if (selection == 3) {//��ȡ�ڲֿ�ĵ���
            var i = 0;//��¼�ڲֿ���������ݸ���
            var text = "Ŀǰ���ڲֿ�����ĵ��ߣ�\r\n#d"
            var TradeDataForOwner = cm.getConnection().prepareStatement("SELECT id,itemid FROM cashtradesystemStore where cid = " + cm.getPlayer().getId() + "").executeQuery();
            while (TradeDataForOwner.next()) {//�õ���¼����
                i++;
                text += "#L" + TradeDataForOwner.getString("id") + "##b[���#r" + TradeDataForOwner.getString("id") + "#b]  #v" + TradeDataForOwner.getString("itemid") + "#\t#t" + TradeDataForOwner.getString("itemid") + "# #l\r\n"
            }
            text += "\r\nһ���ҵ���" + i + "�����ݡ�";
            if (i != 0) {
                cm.sendSimple(text);//TODO
                s = 1;
                backupmode = 1;
            } else {
                cm.sendOk("�ֿ���û��������ݡ�");
                cm.dispose();
            }
        }
    } else if (status == 12) {
        if (s == 1) {
            TradeId = selection;//�õ����׺�
            cm.sendNext("��ȷ��Ҫ���յ��߲���ɾ��������Ϣ��");
        } else {
            cm.dispose();
        }
    } else if (status == 13) {
        if (backupmode == 1) {
            TradeData = cm.getConnection().prepareStatement("SELECT * FROM cashtradesystemStore").executeQuery();

        } else {
            TradeData = cm.getConnection().prepareStatement("SELECT * FROM cashtradesystem").executeQuery();
        }
        while (TradeData.next()) {//�õ���¼����
            if (TradeData.getString("id") == TradeId) {
                TradeItem = TradeData.getString("itemid");
                TradeMode = TradeData.getString("itemtype");
                getEquipStatFormData();//�����ݿ��еõ�����
            }
        }
        if (cm.canHold(TradeItem) /*&& cm.getEquipBySlot(1) == null*/) {
            if (TradeMode == 0) {
                MakeEquip();
                cm.sendOk("���سɹ���");
                cm.dispose();
            } else {
                cm.gainItem(TradeItem, 1);
                cm.sendOk("���سɹ���");
                cm.dispose();
            }
            if (backupmode == 1) {
                DeleteDataByIdForOwn(TradeId);
            } else {
                DeleteDataById(TradeId);
            }
        } else {
            cm.sendOk("��ȷ����ı����пռ䣬����װ�����ĵ�һ���ո�Ϊ�պ����ԡ�");
            cm.dispose();
        }
    } else if (status == 14) {
        if (cm.getMeso() + (giveback[0] - giveback[0] * 0.05) > 9999999999 || cm.getNX(1) + (giveback[1] - giveback[1] * 0.05) > 9999999999 || cm.getRMB() + (giveback[2] - giveback[2] * 0.05) > 9999999999) {
            cm.sendOk("��ȡ�Ľ��ᳬ�����ֵ��������ȡ��");
            cm.dispose();
        } else {
            cm.gainMeso(parseInt(giveback[0] - giveback[0] * 0.05));
            cm.gainNX(1, parseInt(giveback[1] - giveback[1] * 0.05));
            cm.gainRMB(parseInt(giveback[2] - giveback[2] * 0.02));
            var delectData = cm.getConnection().prepareStatement("delete from TradeSystemGiveBack where cid = " + cm.getPlayer().getId() + "");
            delectData.executeUpdate(); //ɾ������
            cm.sendOk("��سɹ���")
            cm.dispose();
        }
    } else if (status == 15) {
        status = 8;
        cm.sendYesNo("��ȷ��Ҫ����#v" + TradeItem + "# #t" + TradeItem + "# ��");
    } else if (status == 16) {
        TradeId = selection;//�õ�����ID
        cm.dispose();
    }

}
function getGiveBackData() {
    var i = 0;
    var data = cm.getConnection().prepareStatement("SELECT * FROM TradeSystemGiveBack where cid = " + TradeCid + "").executeQuery();
    while (data.next()) {//�õ���¼����
        giveback[0] = data.getString("meso");
        giveback[1] = data.getString("dianquan");
        giveback[2] = data.getString("diyong");
        i++;
    }
    if (i == 0) {
        var insert = cm.getConnection().prepareStatement("INSERT INTO TradeSystemGiveBack values (?,?,?,?,?)");
        insert.setString(1, null);
        insert.setString(2, cm.getPlayer().getId());
        insert.setString(3, 0);
        insert.setString(4, 0);
        insert.setString(5, 0);
        insert.executeUpdate();
    }
}


function BuyCheckDataAgain() {//�����ʱ���ٴβ����Ƿ�ѡ��ĵ����Ѿ��ǹ���ɹ�״̬�ˡ�
    var i = 0;
    var data = cm.getConnection().prepareStatement("SELECT * FROM cashtradesystem where id = " + TradeId + "").executeQuery();
    while (data.next()) {//�õ���¼����
        i++;
    }
    if (i == 0) {
        return false;
    } else {
        return true;
    }
}

function CheckData() {
    var i = 0;
    var data = cm.getConnection().prepareStatement("SELECT * FROM TradeSystemGiveBack where cid = " + cm.getPlayer().getId() + "").executeQuery();
    while (data.next()) {//�õ���¼����
        i++;
    }
    if (i == 0) {
        var insert = cm.getConnection().prepareStatement("INSERT INTO TradeSystemGiveBack values (?,?,?,?,?)");
        insert.setString(1, null);
        insert.setString(2, cm.getPlayer().getId());
        insert.setString(3, 0);
        insert.setString(4, 0);
        insert.setString(5, 0);
        insert.executeUpdate();
    }
}

function UpdateData(cid, meso, dianquan, diyong) {
    getGiveBackData();
    var UpDateStatus = cm.getConnection().prepareStatement("update TradeSystemGiveBack set meso=?,dianquan=?,diyong=? where cid =  " + cid + "")
    UpDateStatus.setString(1, parseInt(meso) + parseInt(giveback[0]));
    UpDateStatus.setString(2, parseInt(dianquan) + parseInt(giveback[1]));
    UpDateStatus.setString(3, parseInt(diyong) + parseInt(giveback[2]));
    UpDateStatus.executeUpdate();
}

function DeleteDataById(id) {//ɾ������
    var delectData = cm.getConnection().prepareStatement("delete from cashtradesystem where id = " + id + "");
    delectData.executeUpdate(); //ɾ������
}

function DeleteDataByIdForOwn(id) {//ɾ������
    var delectData = cm.getConnection().prepareStatement("delete from cashtradesystemStore where id = " + id + "");
    delectData.executeUpdate(); //ɾ������
}

function MakeEquip() {//����װ��
    var ii = cm.getItemInfo();
    toDrop = ii.randomizeStats(ii.getEquipById(TradeItem)).copy(); // ����һ��Equip��(�������װ��)
    for (var i = 0; i < 30; i++) {
        setEquipStatRandom(i, EquipStatFromData[i]);
    }
    //�������Բ���
    setEquipStatRandom(30, EquipStatFromData[32]);
    setEquipStatRandom(31, EquipStatFromData[33]);
    setEquipStatRandom(32, EquipStatFromData[34]);
    setEquipStatRandom(33, EquipStatFromData[35]);//��ӡ�ȼ�
    setEquipStatRandom(34, EquipStatFromData[36]);
    if (EquipStatFromData[37] != null) {
        setEquipStatRandom(35, EquipStatFromData[37]);//owner
    }
    setEquipStatRandom(36, EquipStatFromData[38]);//����������
    setEquipStatRandom(37, EquipStatFromData[39]);//ʣ��ʱ��
    // cm.removeSlot(1, 1, 1); //ɾ����ԭʼ����
    //inventoryType, deleteSlot, deleteQuantity
    //toDrop.setEquipOnlyId(cm.getItemInfo().getNextEquipOnlyId());
    cm.addFromDrop(cm.getC(), toDrop, false);
}

function getEquipStatFormDataOfOwner() {//�����ݿ�õ�װ������ �Լ���
    EquipStatFromData[0] = TradeDataForOwner.getString("str"); //����
    EquipStatFromData[1] = TradeDataForOwner.getString("dex"); //����
    EquipStatFromData[2] = TradeDataForOwner.getString("ints"); //����
    EquipStatFromData[3] = TradeDataForOwner.getString("luk"); //����
    EquipStatFromData[4] = TradeDataForOwner.getString("hp");
    EquipStatFromData[5] = TradeDataForOwner.getString("mp");
    EquipStatFromData[6] = TradeDataForOwner.getString("watk");
    EquipStatFromData[7] = TradeDataForOwner.getString("matk");
    EquipStatFromData[8] = TradeDataForOwner.getString("wdef");
    EquipStatFromData[9] = TradeDataForOwner.getString("mdef");
    EquipStatFromData[10] = TradeDataForOwner.getString("acc");
    EquipStatFromData[11] = TradeDataForOwner.getString("avoid");
    EquipStatFromData[12] = TradeDataForOwner.getString("speed");
    EquipStatFromData[13] = TradeDataForOwner.getString("jump");
    EquipStatFromData[14] = TradeDataForOwner.getString("upgradeSlots");
    EquipStatFromData[15] = TradeDataForOwner.getString("limitBreak");
    EquipStatFromData[16] = TradeDataForOwner.getString("potential1");
    EquipStatFromData[17] = TradeDataForOwner.getString("potential2");
    EquipStatFromData[18] = TradeDataForOwner.getString("potential3");
    EquipStatFromData[19] = TradeDataForOwner.getString("potential4");
    EquipStatFromData[20] = TradeDataForOwner.getString("potential5");
    EquipStatFromData[21] = TradeDataForOwner.getString("potential6");
    EquipStatFromData[22] = TradeDataForOwner.getString("enhance");
    EquipStatFromData[23] = TradeDataForOwner.getString("reqLevel");
    EquipStatFromData[24] = TradeDataForOwner.getString("yggdrasilWisdom");
    EquipStatFromData[25] = TradeDataForOwner.getString("bossDamage");
    EquipStatFromData[26] = TradeDataForOwner.getString("ignorepDR");
    EquipStatFromData[27] = TradeDataForOwner.getString("totalDamage");
    EquipStatFromData[28] = TradeDataForOwner.getString("allStat");
    EquipStatFromData[29] = TradeDataForOwner.getString("karmaCount");
    EquipStatFromData[30] = TradeDataForOwner.getString("itemprice");
    EquipStatFromData[31] = TradeDataForOwner.getString("tradeType");
    //�������Բ���
    EquipStatFromData[32] = TradeDataForOwner.getString("hands");
    EquipStatFromData[33] = TradeDataForOwner.getString("ViciousHammer");
    EquipStatFromData[34] = TradeDataForOwner.getString("itemEXP");

    EquipStatFromData[35] = TradeDataForOwner.getString("sealedlevel");
    EquipStatFromData[36] = TradeDataForOwner.getString("sealedExp");
    EquipStatFromData[37] = TradeDataForOwner.getString("Owner");
    EquipStatFromData[38] = TradeDataForOwner.getString("level");
    EquipStatFromData[39] = TradeDataForOwner.getString("expiredate");
}


function getEquipStatFormData() {//�����ݿ�õ�װ������
    EquipStatFromData[0] = TradeData.getString("str"); //����
    EquipStatFromData[1] = TradeData.getString("dex"); //����
    EquipStatFromData[2] = TradeData.getString("ints"); //����
    EquipStatFromData[3] = TradeData.getString("luk"); //����
    EquipStatFromData[4] = TradeData.getString("hp");
    EquipStatFromData[5] = TradeData.getString("mp");
    EquipStatFromData[6] = TradeData.getString("watk");
    EquipStatFromData[7] = TradeData.getString("matk");
    EquipStatFromData[8] = TradeData.getString("wdef");
    EquipStatFromData[9] = TradeData.getString("mdef");
    EquipStatFromData[10] = TradeData.getString("acc");
    EquipStatFromData[11] = TradeData.getString("avoid");
    EquipStatFromData[12] = TradeData.getString("speed");
    EquipStatFromData[13] = TradeData.getString("jump");
    EquipStatFromData[14] = TradeData.getString("upgradeSlots");
    EquipStatFromData[15] = TradeData.getString("limitBreak");
    EquipStatFromData[16] = TradeData.getString("potential1");
    EquipStatFromData[17] = TradeData.getString("potential2");
    EquipStatFromData[18] = TradeData.getString("potential3");
    EquipStatFromData[19] = TradeData.getString("potential4");
    EquipStatFromData[20] = TradeData.getString("potential5");
    EquipStatFromData[21] = TradeData.getString("potential6");
    EquipStatFromData[22] = TradeData.getString("enhance");
    EquipStatFromData[23] = TradeData.getString("reqLevel");
    EquipStatFromData[24] = TradeData.getString("yggdrasilWisdom");
    EquipStatFromData[25] = TradeData.getString("bossDamage");
    EquipStatFromData[26] = TradeData.getString("ignorepDR");
    EquipStatFromData[27] = TradeData.getString("totalDamage");
    EquipStatFromData[28] = TradeData.getString("allStat");
    EquipStatFromData[29] = TradeData.getString("karmaCount");
    EquipStatFromData[30] = TradeData.getString("itemprice");
    EquipStatFromData[31] = TradeData.getString("tradeType");
    //�������Բ���
    EquipStatFromData[32] = TradeData.getString("hands");
    EquipStatFromData[33] = TradeData.getString("ViciousHammer");
    EquipStatFromData[34] = TradeData.getString("itemEXP");

    EquipStatFromData[35] = TradeData.getString("sealedlevel");
    EquipStatFromData[36] = TradeData.getString("sealedExp");
    EquipStatFromData[37] = TradeData.getString("Owner");
    EquipStatFromData[38] = TradeData.getString("level");
    EquipStatFromData[39] = TradeData.getString("expiredate");

}

function getEquipStatToArray() {//�õ�װ������
    EquipStat[0] = cm.getEquipBySlot(position).getStr(); //����
    EquipStat[1] = cm.getEquipBySlot(position).getDex(); //����
    EquipStat[2] = cm.getEquipBySlot(position).getInt(); //����
    EquipStat[3] = cm.getEquipBySlot(position).getLuk(); //����
    EquipStat[4] = cm.getEquipBySlot(position).getHp();
    EquipStat[5] = cm.getEquipBySlot(position).getMp();
    EquipStat[6] = cm.getEquipBySlot(position).getWatk();
    EquipStat[7] = cm.getEquipBySlot(position).getMatk();
    EquipStat[8] = cm.getEquipBySlot(position).getWdef();
    EquipStat[9] = cm.getEquipBySlot(position).getMdef();
    EquipStat[10] = cm.getEquipBySlot(position).getAcc();
    EquipStat[11] = cm.getEquipBySlot(position).getAvoid();
    EquipStat[12] = cm.getEquipBySlot(position).getSpeed();
    EquipStat[13] = cm.getEquipBySlot(position).getJump();
    EquipStat[14] = cm.getEquipBySlot(position).getUpgradeSlots();
    EquipStat[15] = cm.getEquipBySlot(position).getLimitBreak();
    EquipStat[16] = cm.getEquipBySlot(position).getPotential1();
    EquipStat[17] = cm.getEquipBySlot(position).getPotential2();
    EquipStat[18] = cm.getEquipBySlot(position).getPotential3();
    EquipStat[19] = cm.getEquipBySlot(position).getPotential4();
    EquipStat[20] = cm.getEquipBySlot(position).getPotential5();
    EquipStat[21] = cm.getEquipBySlot(position).getPotential6();
    EquipStat[22] = cm.getEquipBySlot(position).getEnhance();
    EquipStat[23] = cm.getEquipBySlot(position).getReqLevel();
    EquipStat[24] = cm.getEquipBySlot(position).getYggdrasilWisdom();
    EquipStat[25] = cm.getEquipBySlot(position).getBossDamage();
    EquipStat[26] = cm.getEquipBySlot(position).getIgnorePDR();
    EquipStat[27] = cm.getEquipBySlot(position).getTotalDamage();
    EquipStat[28] = cm.getEquipBySlot(position).getAllStat();
    // EquipStat[29] = cm.getEquipBySlot(1).getFinalStrike();
    EquipStat[29] = cm.getEquipBySlot(position).getKarmaCount();
    //�������Բ���
    EquipStat[30] = cm.getEquipBySlot(position).getHands();
    EquipStat[31] = cm.getEquipBySlot(position).getViciousHammer();
    EquipStat[32] = cm.getEquipBySlot(position).getItemEXP();

    EquipStat[33] = cm.getEquipBySlot(position).getSealedLevel();
    EquipStat[34] = cm.getEquipBySlot(position).getSealedExp();

    EquipStat[35] = cm.getEquipBySlot(position).getOwner();
    EquipStat[36] = cm.getEquipBySlot(position).getLevel();
    EquipStat[37] = cm.getEquipBySlot(position).getExpiration();
}


function setEquipStatRandom(i, v) {//����װ������
    switch (i) {
        case 0:
            toDrop.setStr(v);
            break;
        case 1:
            toDrop.setDex(v);
            break;
        case 2:
            toDrop.setInt(v);
            break;
        case 3:
            toDrop.setLuk(v);
            break;
        case 4:
            toDrop.setHp(v);
            break;
        case 5:
            toDrop.setMp(v);
            break;
        case 6:
            toDrop.setWatk(v);
            break;
        case 7:
            toDrop.setMatk(v);
            break;
        case 8:
            toDrop.setWdef(v);
            break;
        case 9:
            toDrop.setMdef(v);
            break;
        case 10:
            toDrop.setAcc(v);
            break;
        case 11:
            toDrop.setAvoid(v);
            break;
        case 12:
            toDrop.setSpeed(v);
            break;
        case 13:
            toDrop.setJump(v);
            break;
        case 14:
            toDrop.setUpgradeSlots(v);
            break;
        case 15:
            toDrop.setLimitBreak(v);
            break;
        case 16:
            toDrop.setPotential1(v);
            break;
        case 17:
            toDrop.setPotential2(v);
            break;
        case 18:
            toDrop.setPotential3(v);
            break;
        case 19:
            toDrop.setPotential4(v);
            break;
        case 20:
            toDrop.setPotential5(v);
            break;
        case 21:
            toDrop.setPotential6(v);
            break;
        case 22:
            toDrop.setEnhance(v);
            break;
        case 23:
            toDrop.setReqLevel(v);
            break;
        case 24:
            toDrop.setYggdrasilWisdom(v);
            break;
        case 25:
            toDrop.setBossDamage(v);
            break;
        case 26:
            toDrop.setIgnorePDR(v);
            break;
        case 27:
            toDrop.setTotalDamage(v);
            break;
        case 28:
            toDrop.setAllStat(v);
            break;
        case 29:
            toDrop.setKarmaCount(v);
            break;
        case 30:
            toDrop.setHands(v);
            break;
        case 31:
            toDrop.setViciousHammer(v);
            break;
        case 32:
            toDrop.setItemEXP(v);
            break;
        case 33:
            toDrop.setSealedLevel(v);
            break;
        case 34:
            toDrop.setSealedExp(v);
            break;
        case 35:
            toDrop.setOwner(v);
            break;
        case 36:
            toDrop.setLevel(v);
            break;
        case 37:
            toDrop.setExpiration(v);
            break;
    }
}

function setLog(tid) {
    var insertLog = cm.getConnection().prepareStatement("INSERT INTO cashtradesystemLog values (?,?,?,?,?,?,?,?)");
    insertLog.setString(1, tid);//����id
    insertLog.setString(2, TradeCid);//�����߽�ɫid
    insertLog.setString(3, cm.getPlayer().getId());//�����߽�ɫid
    insertLog.setString(4, cm.getPlayer().getName());//�����߽�ɫ����
    insertLog.setString(5, EquipStatFromData[31]);//����tid�ķ������� 0��� 1��ȯ 2���
    insertLog.setString(6, TradePrice);//�����ļ۸�
    insertLog.setString(7, TradeItem);//�����ĵ���
    insertLog.setString(8, null);//���������ڣ������ݿ��Զ�����
    insertLog.executeUpdate();
    insertLog.close();
}