/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��8��22�� 15:18:33
 ����ʱ�䣺2014��8��7�� 16:23:21
 �ű����ܣ�����ϵͳ
 ���ڿ�����һ�� ��ҼӼ�ʱ������� ֮��������ݿ�

BUG:  
     ���һ�����ظ����ۣ�ǰ��ĳ��ۼ۸� �ز������������ʧ�ܵ�ʱ�� ֻ�ܷ������һ�γ��۵Ľ����ĳɹ��Ļ�Ҳ������ȡǰ�����ĵļ۸�
 */



//
//   ʱ����Ʋ���
var time = new Date();
var day = time.getDay();
switch (day) {
    case 0:
        var d = "������";
        break;
    case 1:
        var d = "����һ";
        break;
    case 2:
        var d = "���ڶ�";
        break;
    case 3:
        var d = "������";
        break;
    case 4:
        var d = "������";
        break;
    case 5:
        var d = "������";
        break;
    case 6:
        var d = "������";
        break;
    default:
}
var year = time.getFullYear();
var month = time.getMonth();
var date = time.getDate();
var hour = time.getHours();
var min = time.getMinutes();
var sec = time.getSeconds();
if (hour > 12) {
    hour -= 12;
    var apm = "����";
} else {
    var apm = "����";
}
if (hour < 10) {
    hour = "0" + hour;
}
if (min < 10) {
    min = "0" + min;
}
if (sec < 10) {
    sec = "0" + sec;
}
//ʱ����Ʋ��ֽ���




var a = 0;
var meso;
var Char;
var BuyType = 0;
var PaiMaiIdOnly;
//0 ð�ձ�
//1 ��ȯ
//2 �Զ��� ����
var pass = true;
var MaxPrice = 0
var CharStatus;
var itemid;

/*
 Status:
 -1 Ĭ��
 0  ������
 1  �����Ľ�ɫ
 2  ����ʧ�ܣ��ȴ������Ʒ
 3  ���ĳɹ���
 */
//��ȡ���ֵı���
var PaiMaiIdOnlyArray = Array();
var boughtArray = Array();
var ItemArray = Array();
var member = Array();
var Allmember = Array();
var insertItem = Array();
var insertItemAll = Array();
var ItemDataBase;
var linkItem;
var toDrop;


function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    ItemDataBase = cm.getConnection().prepareStatement("SELECT * FROM PaiMaiNpc WHERE Bought = 0 LIMIT 1").executeQuery(); //��ѯ�������ݿ�  δ�����ɹ��ĵ��߶���ʾ
    var insert = cm.getConnection().prepareStatement("INSERT INTO PaiMaiNpcRecord(id,PaiMaiId,CharName,Price,PriceType,Status,Date,CharId) VALUES(?,?,?,?,?,?,?,?)"); // ��������
    var Record = cm.getConnection().prepareStatement("SELECT * FROM PaiMaiNpcRecord").executeQuery();
    var RecordMax = cm.getConnection().prepareStatement("select PaiMaiId,CharName,Price,status from PaiMaiNpcRecord where Price=(select max(Price) from PaiMaiNpcRecord)").executeQuery(); //ȡ���
    // var UpDateData = cm.getDataSelectFromDB("update PaiMaiNpc set Bought=? where Bought=0 LIMIT 1")
// - ���ӹ��ܣ���ȡ�����ɹ��ĵ���֮��ı�����
    var ItemDataHistory = cm.getConnection().prepareStatement("SELECT * FROM PaiMaiNpc WHERE Bought = 1").executeQuery(); //��ѯ��ʷ������¼
    var ItemDataHistory2 = cm.getConnection().prepareStatement("SELECT * FROM PaiMaiNpc").executeQuery(); //��ѯ��ʷ������¼
    var insertPaiMai = cm.getConnection().prepareStatement("INSERT INTO PaiMaiNpc(PaiMaiId,Bought,itemid,itemName,upgradeslots,level,str,dex,int,luk,hp,mp,watk,matk,wdef,mdef,acc,avoid,hands,speed,jump,locked,vicious,jd_level,jd_xlevel,jd_times,jd_v1,jd_v2,jd_v3,ItemLevel,ItemExp,ItemSkill,Durability,pvpWatk,hpR,mpR) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"); // ��������
    
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            var text = "��ӭ���������̵ꡣ\r\n������������þ��ĵķ�ʽ���һЩ���صĵ��ߣ�#b\r\n\r\n"
            text += "#L0# �鿴���ܡ�\r\n"
            text += "#r#L1# ����鿴���������ĵ��ߡ�\r\n#b"
            text += "#L2# �鿴��ʷ������\r\n"
            text += "#L3# �鿴�ҵ�������¼��\r\n"
            text += "#L4# ��ȡ�Ӽ�ʱ����Ľ��&��ȯ��\r\n"
            text += "#L5# ��ȡ�����ɹ����ߡ�\r\n"
            // if (cm.getChar().isGM()) {// ֻ�й���Ա���д�ѡ���̨���ã�
            //    text += "#L99##r [����Աϵͳ����] ��̨���á�"
            // }
            cm.sendSimple(text)
        } else if (a == 1) {
            if (selection == 0) {//�鿴���ܡ�
                a = -1;
                cm.sendNext("#e<�����̵����>#n#d\r\n\r\n - ���������У��Ӽۼ۸�����߿��Ի�þ��ĵĵ��ߡ�\r\n - ���ĳɹ��󣬱���ȵ�ϵͳˢ��ʱ�����ܵ�����NPC��ȡ���ĵĵ��ߡ�\r\n - ����Ӽ۵Ľ�ɫ�������ύ�Զ��ľ��ļ۸�NPC��\r\n - ����ʧ�ܵĵ��񣬿���ϵͳˢ�º󣬵�����NPC�����Ϸ�һ��ߵ�ȯ��\r\n - ϵͳˢ��ʱ��Ϊÿ�յ�0�㡣")
            } else if (selection == 1) {//����鿴���������ĵ��ߡ�
                var i = 0;
                var string = "#e<���������ĵ�����>��#n#d\r\n\r\n�Ӽ۳ɹ�ʱ�����뽫���ĵļ۸��ύ������ϵͳ���ܡ�#b\r\n#L0# #e��Ҫ�Ӽ������������ߣ�#l#n\r\n\r\n\r\n#b"
                while (ItemDataBase.next()) {
                    PaiMaiIdOnly = ItemDataBase.getString("PaiMaiId");
                    string += "#i" + ItemDataBase.getString("itemid") + "#   #t" + ItemDataBase.getString("itemid") + "#\r\n\r\n";
                    for (var i = 0; i < 16; i++) {
                        string += "#d" + getEquipStatInfomation(i) + "\r\n"
                    }
                    i++;
                }
                var x = 0;
                while (RecordMax.next()) {//�õ���߼۸�
                    if (RecordMax.getString("PaiMaiId") == PaiMaiIdOnly) {
                        MaxPrice = RecordMax.getString("Price");
                    }
                    x++;
                }
                if (x == 0) {
                    insert.setString(1, null); //�����¼ID
                    insert.setString(2, PaiMaiIdOnly); //��������ID
                    insert.setString(3, "��ֹ����"); //��������  ��������� ��֤����ϵͳ�ӵ� ��ֹ����
                    insert.setString(4, 0); //����Ӽ۵ļ۸�
                    insert.setString(5, BuyType);
                    insert.setString(6, 0); //���ڽ���
                    insert.setString(7, "" + year + "-" + month + "-" + date + "  " + d + " " + apm + "" + hour + ":" + min + ":" + sec + "");
                    insert.setString(8, 0); //����ID
                    insert.executeUpdate(); //����
                }
                if (i != 0) {
                    cm.sendSimple(string); //��ʾ�����ĵ��ߡ�
                } else {
                    cm.sendOk("�Բ���������ʱû�������ĵ��ߡ�");
                    cm.dispose();
                }
            } else if (selection == 2) {//�鿴��ʷ����
                var i = 0;
                var text = "Ŀǰ" + cm.getServerName() + "һ��������������\r\n\r\n#b"
                while (ItemDataHistory2.next()) {// �õ���ʷ��������ѶϢ
                    if (ItemDataHistory2.getString("Bought") > 2) {
                        text += "��" + ItemDataHistory2.getString("paimaiid") + "��\r\n�������ƣ�#i" + ItemDataHistory2.getString("itemid") + "#  #t" + ItemDataHistory2.getString("itemid") + "# \r\n=======================================\r\n\r\n"
                    }
                }
                cm.sendOk(text)
                cm.dispose();
            } else if (selection == 3) {//�鿴�ҵ�������¼
                var text = "�������ҵ�������¼��\r\n#b"
                var i = 0;
                var Pricetype;
                while (Record.next()) {//�õ���¼����
                    if (Record.getString("CharName") == cm.getPlayer().getName()) {
                        if (Record.getString("PriceType") == 0) {
                            Pricetype = "���"
                        } else {
                            Pricetype = "��ȯ"
                        }
                        text += "��" + Record.getString("paimaiid") + "��\r\n���ۣ�" + Record.getString("Price") + "\r\n�������ͣ�" + Pricetype + "\r\n������ʱ�䣺" + Record.getString("Date") + "\r\n==================================\r\n"
                        i++;
                    }
                }
                if (i == 0) {
                    cm.sendOk("��ʱû������������¼��")
                } else {
                    cm.sendNextS(text, 3)
                }
                cm.dispose();
            } else if (selection == 4) {//��ȡ�Ӽ�ʱ����Ľ��&��ȯ��
                var i = 0;
                while (Record.next()) {//�õ���¼����
                    if (Record.getString("Status") == 0 && Record.getString("CharName") == cm.getPlayer().getName()) {//����Լ��������ڽ���
                        member.push(Record.getString("paimaiid"))//������Ҹ�����ȡ������ID
                        member.push(Record.getString("price"))//������ҵļ۸�
                        member.push(Record.getString("PriceType"))//������ҵļ۸����� 0 ��� 1��ȯ
                        member.push(Record.getString("CharName"))//�����������
                        member.push(Record.getString("Status"))//�����������״̬
                        Allmember.push(member);
                        i++;
                    }
                }
                var BoughtData;
                for (var i = 0; i < Allmember.length; i++) {
                    BoughtData = cm.getConnection().prepareStatement("SELECT * FROM PaiMaiNpc WHERE paimaiid = " + Allmember[i][0] + "").executeQuery();
                    while (BoughtData.next()) {
                        if (BoughtData.getString("bought") != 0) {
                            boughtArray.push(true)
                        } else {
                            boughtArray.push(false)
                        }
                    }
                }
                var text = "��������ص���Ʒ��:\r\n#b"
                for (var i = 0; i < Allmember.length; i++) {
                    if (Allmember[i][2] == 0) {//����ǽ��
                        text += "#L" + i + "# #r[������" + Allmember[i][0] + "��]#b   " + Allmember[i][1] + "[���]";
                    } else if (Allmember[i][2] == 1) {
                        text += "#L" + i + "# #r[������" + Allmember[i][0] + "��]#b   " + Allmember[i][1] + "[��ȯ]";
                    }
                }
                while (RecordMax.next()) {//�õ���߼۸�
                    if (RecordMax.getString("PaiMaiId") == PaiMaiIdOnly) {
                        MaxPrice = RecordMax.getString("Price");
                    }
                    x++;
                }
                if (i == 0) {
                    cm.sendOk("�Բ���,����������û�з�������ȡ�ĵ���.")
                    cm.dispose();
                } else {
                    a = 5;
                    cm.sendSimple(text);
                }
            } else if (selection == 5) {//��ȡ�����ɹ��ĵ���
                while (Record.next()) {///��ȡ��������ID 
                    if (Record.getString("Status") == 1 && Record.getString("CharName") == cm.getPlayer().getName()) {
                        PaiMaiIdOnlyArray.push(Record.getString("PaiMaiId"));
                    }
                }//�õ�������ȡ������
                var text = "Ŀǰ�������ȡ�ĵ����У�\r\n#b"
                var i = 0
                while (ItemDataHistory.next()) {// �õ�����ȡ�ĵ���ID
                    if (ItemDataHistory.getString("PaiMaiId") == PaiMaiIdOnlyArray[i]) {
                        ItemArray.push(ItemDataHistory.getString("itemid")); //�������� ��������
                        i++;
                    }
                }
                for (var i = 0; i < ItemArray.length; i++) {//��ʽ���
                    member.push(PaiMaiIdOnlyArray[i])
                    member.push(ItemArray[i])
                    Allmember.push(member)//2ά����
                    text += "#L" + Allmember[i][1] + "#  ��" + Allmember[i][0] + "��  #t" + Allmember[i][1] + "#\r\n"
                }
                if (i == 0 || PaiMaiIdOnlyArray.length == 0) {
                    cm.sendOk("�Բ���Ŀǰû����������ȡ�ĵ��ߡ�");
                    cm.dispose();
                } else {
                    a = 4;
                    cm.sendSimple(text);
                }
            } else if (selection == 99) {//����Ա��̨
                a = 99;
                cm.sendSimple("�װ��Ĺ���Ա������������ʲô��\r\n#b#L0# ��������������ݡ�\r\n#L2# �鿴������¼(�ɲ鿴������Ҿ��ļ�¼)��")
            }
        } else if (a == 2) {//���۲��ֿ�ʼ
             while (RecordMax.next()) {//�õ���߼۸�
                    if (RecordMax.getString("PaiMaiId") == PaiMaiIdOnly) {
                        MaxPrice = RecordMax.getString("Price");
                    }
                }
            cm.sendGetNumber("��������Ҫ�Ӽ۵ļ۸�\r\n < Ŀǰ�������۸�Ϊ��" + MaxPrice + " > \r\n ���������" + MaxPrice + "", MaxPrice, MaxPrice, 2100000000)
        } else if (a == 3) {
            meso = selection;
            if (meso == 0) {
                cm.sendOk("0���ϵ����ֿ������롣")
                cm.dispose();
            } else {
                cm.sendNext("����ҪΪ�˵��߼Ӽۣ�#b" + selection + "#k�����\r\n#r - �Ӽ۳ɹ������Ľ�ҽ��ᱻ�۳���\r\n������ϴ��мӼۣ����μӼ۵ļ۸�Ϊ������Ͷע-�ϴ�Ͷע��")
            }
        } else if (a == 4) {
            var MineLastPrice=0;
            var PaimaiMinePrice = cm.getConnection().prepareStatement("SELECT * FROM paimainpcrecord WHERE paimaiid = "+PaiMaiIdOnly+"").executeQuery(); 
            while (PaimaiMinePrice.next()) {
                if(PaimaiMinePrice.getString("CharName") ==  cm.getPlayer().getName()){
                    MineLastPrice = PaimaiMinePrice.getString("Price");
                }
            }
            if (cm.getMeso() < meso-MineLastPrice) {
                cm.sendOk("��ȷ����Ľ���㹻�˴μӼ۵ļ۸�")
            } else {
                while (Record.next()) {
                    if (Record.getString("Price") >= (meso-MineLastPrice) && PaiMaiIdOnly == Record.getString("PaiMaiId")) {
                        pass = false;
                    }
                    i++;
                }
                if (pass) {
                    cm.gainMeso(-(meso-MineLastPrice));
                    var delectData;
                    delectData = cm.getConnection().prepareStatement("delete from paimainpcrecord where CharId = " + cm.getPlayer().getId() + " and paimaiid = " + PaiMaiIdOnly + "")
                    delectData.executeUpdate(); //ÿһ�ζ�ɾ����ǰ��
                    insert.setString(1, null); //�����¼ID
                    insert.setString(2, PaiMaiIdOnly); //��������ID
                    insert.setString(3, cm.getPlayer().getName()); //��������
                    insert.setString(4, meso); //����Ӽ۵ļ۸�
                    insert.setString(5, BuyType);
                    insert.setString(6, 0); //���ڽ���
                    insert.setString(7, "" + year + "-" + month + "-" + date + "- " + d + " " + apm + "" + hour + ":" + min + ":" + sec + "");
                    insert.setString(8, cm.getPlayer().getId()); //����ID
                    insert.executeUpdate(); //����
                    ////cm.sendY("delete from paimainpcrecord where CharId = " + cm.getPlayer().getId() + " and paimaiid = " + PaiMaiIdOnly + "")
                    cm.sendOk("�Ӽ۳ɹ���ϵͳ�Ѿ������ľ�������¼�������С�\r\nÿ�յ�0�㣬����ϵͳ����ˢ�¡������ʱ���ľ��ļ۸�������ߣ���;��ĳɹ�����")
                } else {
                    cm.sendOk("�Բ��𣬼Ӽ۵ļ۸��ܱ�ǰ��Ӽ۵ĵ͡�")
                }
            }
            cm.dispose();
        } else if (a == 5) {//��ȡ���ĳɹ����߲���
            var ii = cm.getItemInfo();
            toDrop = ii.randomizeStats(ii.getEquipById(selection)).copy(); // ����һ��Equip��(�������װ��)
            if (cm.getSpace(1) < 1) { //�ж�װ�����Ƿ��пո�
                cm.sendOk("��ȷ�����װ�����Ƿ��пո�.�㵱ǰװ��ֻ��" + cm.getSpace(1) + "���ո�!");
                cm.dispose();
                return;
            }
            linkItem = cm.getConnection().prepareStatement("SELECT * FROM PaiMaiNpc WHERE Bought = 1").executeQuery();
            //cm.getC().dropMessage(selection);//
            while (linkItem.next()) {// �õ�����ȡ������
                if (linkItem.getString("itemid") == selection) {
                    for (var i = 0; i < 16; i++) {
                        setEquipStat(i, getEquipStatToMakeWeapon(i));//Error
                    }
                }
            }
            toDrop.setEquipOnlyId(im.getNextEquipOnlyId());
            //cm.getChar().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).addItem(toDrop); //�����װ���������
            //cm.setLock(toDrop); //����װ��
            //cm.getChar().getClient().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(Packages.client.inventory.MapleInventoryType.EQUIP, toDrop)); //ˢ�±���
            im.addFromDrop(im.getC(), toDrop, false);
            //�������ݲ���
            var UpDateBought;
            var UpDateStatus;
            for (var i = 0; i < Allmember.length; i++) {
                UpDateBought = cm.getConnection().prepareStatement("update paimainpc set Bought=? where PaiMaiId = " + Allmember[i][0] + "")
                UpDateBought.setString(1, cm.getPlayer().getId())//���ĳɹ������ֶα�ɽ�ɫID
                UpDateStatus = cm.getConnection().prepareStatement("update paimainpcrecord set status=? where PaiMaiId = " + Allmember[i][0] + " and Status = 1")
                UpDateStatus.setString(1, 3)//���ĳɹ�״̬���3
                UpDateBought.executeUpdate(); //����;
                UpDateStatus.executeUpdate(); //����;
            }
            cm.sendOk("��ȡ���ˡ�")
            cm.dispose();
        } else if (a == 6) {//��ص���
            for (var i = 0; i < boughtArray.length; i++) {
                if (boughtArray[i] == false) {
                    pass = false;
                }
            }//�õ����������Ƿ���ȡ��������
            if (pass) {
                if (Allmember[selection][4] != 0) {
                    cm.sendOk("Ŀǰ��ʱû���������ݡ�")
                } else if (Allmember[selection][2] == 0) {//����ǽ��
                    cm.gainMeso(Allmember[selection][1]);
                    cm.sendOk("�Ѿ���صĽ�ҡ�")
                } else if (Allmember[i][2] == 1) {//����ǵ�ȯ
                    cm.sendOk("���޵�ȯ���ס�")
                }
                var UpDateStatus;
                for (var i = 0; i < Allmember.length; i++) {
                    UpDateStatus = cm.getConnection().prepareStatement("update paimainpcrecord set status=? where PaiMaiId = " + Allmember[selection][0] + " and CharId =  " + cm.getPlayer().getId() + "")
                    UpDateStatus.setString(1, 2)//����ʧ��״̬���2
                    UpDateStatus.executeUpdate(); //����;
                }
                cm.dispose();
            } else {
                cm.sendNext("��ѡ�е�����������ʱ��û�н�����")
                cm.dispose();
            }
        } else if (a == 100) {//���������������
            if (selection == 0) {
                cm.sendGetNumber("��������Ҫ��ӵĵ���ID��", 0, 0, 2100000000)
            } else {
                var text = "������������������¼�������Ե�����в�����\r\n"
                while (ItemDataHistory2.next()) {//�õ���ʷ��¼
                    text += " #L" + ItemDataHistory2.getString("paimaiid") + "# ��" + ItemDataHistory2.getString("paimaiid") + "��  " + ItemDataHistory2.getString("itemid") + ""
                }
                a = 200;
                cm.sendSimple(text);
            }
        } else if (a == 101) {
            //cm.sendY(selection)
            cm.sendGetNumber("���������ID�����֣�һ��Ҫ��ʵ����", 0, 0, 2100000000)
            insertItem.push("ϵͳ�趨")//PaimaiId
            insertItem.push("����ID")//PaimaiId

////cm.sendY(insertItemAll[0][2])


            insertItem.push(0)//bought
            insertItem.push("����״̬")//bought



            insertItem.push(selection)//itemid
            insertItem.push("����ID")//itemid

        } else if (a == 102) {
            //cm.sendY(selection)

            insertItem.push(selection)//itemName
            insertItem.push("��������")//itemName

            cm.sendGetNumber("��������", 0, 0, 100);
        } else if (a == 103) {
            //cm.sendY(selection)

            insertItem.push(selection)//��������
            insertItem.push("����������")

            cm.sendGetNumber("���ߵȼ�", 0, 0, 5)
        } else if (a == 104) {

            //cm.sendY(selection)
            insertItem.push(selection)//level
            insertItem.push("���ߵȼ�")

            cm.sendGetNumber("����������", 0, 0, 30000)
        } else if (a == 105) {

            insertItem.push(selection)//str
            insertItem.push("����")

            cm.sendGetNumber("����������", 0, 0, 30000)
        } else if (a == 106) {

            insertItem.push(selection)//dex
            insertItem.push("����")

            cm.sendGetNumber("����������", 0, 0, 30000)
        } else if (a == 107) {

            insertItem.push(selection)//int
            insertItem.push("����")

            cm.sendGetNumber("����������", 0, 0, 30000)
        } else if (a == 108) {

            insertItem.push(selection)//luk
            insertItem.push("����")

            cm.sendGetNumber("������HP", 0, 0, 30000)
        } else if (a == 109) {

            insertItem.push(selection)//hp
            insertItem.push("hp")

            cm.sendGetNumber("������MP", 0, 0, 30000)
        } else if (a == 110) {
            insertItem.push(selection)//mp
            insertItem.push("mp")

            cm.sendGetNumber("#r��������������#", 0, 0, 30000)
        } else if (a == 111) {
            insertItem.push(selection)//��������
            insertItem.push("��������")

            cm.sendGetNumber("#r������ħ��������(һ�������������ͬ)#", 0, 0, 30000)
        } else if (a == 112) {
            insertItem.push(selection)//ħ��������
            insertItem.push("ħ��������")

            cm.sendGetNumber("���������������", 0, 0, 30000)
        } else if (a == 113) {
            insertItem.push(selection)//���������
            insertItem.push("���������")

            cm.sendGetNumber("ħ��������", 0, 0, 30000)
        } else if (a == 114) {
            insertItem.push(selection)//ħ��������
            insertItem.push("ħ��������")

            cm.sendGetNumber("������������", 0, 0, 30000)
        } else if (a == 115) {
            insertItem.push(selection)//������
            insertItem.push("������")

            cm.sendGetNumber("������ر���", 0, 0, 30000)
        } else if (a == 116) {
            insertItem.push(selection)//�ر���
            insertItem.push("�ر���")

            cm.sendGetNumber("�������ּ�", 0, 0, 30000)
        } else if (a == 117) {
            insertItem.push(selection)//�ּ�
            insertItem.push("�ּ�")

            cm.sendGetNumber("�������ƶ��ٶ�", 0, 0, 100)
        } else if (a == 118) {
            insertItem.push(selection)//�ƶ��ٶ�
            insertItem.push("�ƶ��ٶ�")
            cm.sendGetNumber("��������Ծ��", 0, 0, 100)
        } else if (a == 119) {
            insertItem.push(selection)//��Ծ��
            insertItem.push("��Ծ��")

            cm.sendGetNumber("�Ƿ�����װ��?\r\n0 - ������\r\n1 - ����", 0, 0, 1)
        } else if (a == 120) {
            insertItem.push(selection)//����
            insertItem.push("�Ƿ�����װ��?")

            cm.sendGetNumber("vicious", 0, 0, 0);
        } else if (a == 121) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("vicious")

            cm.sendGetNumber("jd_level", 0, 0, 0)
        } else if (a == 122) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("jd_level")

            cm.sendGetNumber("jd_xlevel", 0, 0, 0)
        } else if (a == 123) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("jd_xlevel")

            cm.sendGetNumber("jd_times", 0, 0, 0)
        } else if (a == 124) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("jd_times")

            cm.sendGetNumber("jd_v1", 0, 0, 0)
        } else if (a == 125) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("jd_v1")

            cm.sendGetNumber("jd_v2", 0, 0, 0)
        } else if (a == 126) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("jd_v2")

            cm.sendGetNumber("jd_v3", 0, 0, 0)
        } else if (a == 127) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("jd_v3")

            cm.sendGetNumber("ItemLevel", 0, 0, 0)
        } else if (a == 128) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("ItemLevel")

            cm.sendGetNumber("ItemExp", 0, 0, 0)
        } else if (a == 129) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("ItemExp")

            cm.sendGetNumber("ItemSkill", 0, 0, 0)
        } else if (a == 130) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("ItemSkill")

            cm.sendGetNumber("Durability", 0, 0, 0)
        } else if (a == 131) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("Durability")

            cm.sendGetNumber("pvpWatk", 0, 0, 0)
        } else if (a == 132) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("pvpWatk")

            cm.sendGetNumber("hpR", 0, 0, 0)
        } else if (a == 133) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("hpR")

            cm.sendGetNumber("mpR", 0, 0, 0)
        } else if (a == 134) {
            insertItem.push(selection)//δ֪ ֱ����һ��
            insertItem.push("mpR")

            //cm.sendY(insertItemAll.length)
            var text = "��ȷ��һ�¸ղŵ�����:\r\n#b";
            for (var i = 0; i < insertItem.length; i++) {
                if (i % 2 == 0) {
                    if (i != 0) {
                        text += "" + insertItem[i - 1] + " : " + insertItem[i - 2] + "\r\n"
                    }
                }
            }
            cm.sendNextS(text, 3)
        } else if (a == 135) {
            cm.sendNext("ȷ������Ҫ�� #i" + insertItem[4] + "#  #t" + insertItem[4] + "# ��ӵ����ݿ�����")
        } else if (a == 136) {
            for (var i = 0; i < insertItem.length; i++) {
                if (i % 2 != 0) {
                    if (i != 0) {
                        insertItemAll.push(insertItem[i - 1])
                    }
                }
            }//������������

            for (var i = 0; insertItemAll.length; i++) {
                insertPaiMai.setString(i + 1, insertItemAll[i])
                //cm.sendY(insertItemAll[i])
            }
            insertPaiMai.executeUpdate(); //����
            cm.sendOk("�Ѿ��������������뵽���ݿ��С�\r\n���������δ��������Ч��\r\nÿ�������ĵ�����Զֻ��һ��\r\n�����ǰ���������������ܽ�����һ��������\r\n�������ڲ鿴������ɾ��������")
            cm.dispose();
        } else if (a == 201) {
            var text = "һ����������Ҳ�����ڵ�����(��ѡ����ǵ�" + selection + "��)��\r\n#b"
            var i = 0;
            while (Record.next()) {//�õ���ʷѶϢ
                if (Record.getString("paimaiid") == selection) {
                    text += "������֣�" + Record.getString("CharName") + " \r\n���ۣ�" + Record.getString("Price") + "\r\n����ʱ�䣺" + Record.getString("Date") + "\r\n================================\r\n"
                    i++;
                }
            }
            if (i == 0) {
                cm.sendOk("û�в鵽���ڵ���Ҿ�����Ϣ��")
            } else {
                cm.sendOk(text)
            }
            cm.dispose();
        }//a
    }//mode
}//


function getEquipStatInfomation(i) {
    switch (i) {
        case 0:
            return "������" + ItemDataBase.getString("str")//����
        case 1:
            return "���ݣ�" + ItemDataBase.getString("dex")//����
        case 2:
            return "������" + ItemDataBase.getString("int")//����
        case 3:
            return "������" + ItemDataBase.getString("luk")//����
        case 4:
            return "HP��" + ItemDataBase.getString("hp")
        case 5:
            return "MP��" + ItemDataBase.getString("mp")
        case 6:
            return "����������" + ItemDataBase.getString("watk")
        case 7:
            return "ħ����������" + ItemDataBase.getString("matk")
        case 8:
            return "�����������" + ItemDataBase.getString("wdef")
        case 9:
            return "ħ����������" + ItemDataBase.getString("mdef")
        case 10:
            return "�ر��ʣ�" + ItemDataBase.getString("avoid")
        case 11:
            return "�ּ���" + ItemDataBase.getString("hands")
        case 12:
            return "�ƶ��ٶȣ�" + ItemDataBase.getString("speed")
        case 13:
            return "��Ծ����" + ItemDataBase.getString("jump")
        case 14:
            return ItemDataBase.getString("locked") == 0 ? "�Ƿ���������������&���ף�����" : "�Ƿ���������������&���ף�����"
        case 15:
            return "����������" + ItemDataBase.getString("upgradeslots")
    }
}

function getEquipStatToMakeWeapon(i) {
    switch (i) {
        case 0:
            return linkItem.getString("str")//����
        case 1:
            return linkItem.getString("dex")//����
        case 2:
            return linkItem.getString("int")//����
        case 3:
            return linkItem.getString("luk")//����
        case 4:
            return linkItem.getString("hp")
        case 5:
            return linkItem.getString("mp")
        case 6:
            return linkItem.getString("watk")
        case 7:
            return linkItem.getString("matk")
        case 8:
            return linkItem.getString("wdef")
        case 9:
            return linkItem.getString("mdef")
        case 10:
            return linkItem.getString("avoid")
        case 11:
            return linkItem.getString("hands")
        case 12:
            return linkItem.getString("speed")
        case 13:
            return linkItem.getString("jump")
        case 14:
            return linkItem.getString("upgradeslots")
        case 15:
            return "����ϵͳ"
    }
}

function setEquipStat(i, v) {//����װ������
    //linkItem = cm.getDataSelectFromDB("SELECT * FROM PaiMaiNpc WHERE Bought = 1");
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
            toDrop.setOwner("����ϵͳ");
            break;
    }
}