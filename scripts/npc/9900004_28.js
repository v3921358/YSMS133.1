/*
 * ��ҷ�����װ װ�� ��̨ϵͳ
 * ���ð�յ�����������
 * �������ݿ� cashtradesystemStore
 */
var status = 0;
var tradetype;
var itemid;
var ItemPrice;
var insertItem = Array();//�洢����Ա����ĵ�������
var insertItemName = Array();//�洢����Ա����ĵ�����������

var aaa = "#fUI/UIWindow4/PQRank/rank/gold#";
var xxx = "#fUI/UIWindow.img/Shop/meso#";
var eff4 = "#fUI/Basic/BtHide3/mouseOver/0#";

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
        cm.sendGetNumber("��������Ҫ��ӵĵ���ID��", 0, 0, 2100000000);
    } else if (status == 1) {
        itemid = selection;
        insertItem.push(itemid)//itemid
        insertItemName.push("����ID")//��ע
        cm.sendGetNumber("����������", 0, 0, 30000);
    } else if (status == 2) {
        insertItem.push(selection)
        insertItemName.push("����")
        cm.sendGetNumber("����������", 0, 0, 30000)
    } else if (status == 3) {
        insertItem.push(selection)//dex
        insertItemName.push("����")
        cm.sendGetNumber("����������", 0, 0, 30000)
    } else if (status == 4) {
        insertItem.push(selection)//int
        insertItemName.push("����")
        cm.sendGetNumber("����������", 0, 0, 30000)
    } else if (status == 5) {
        insertItem.push(selection)//luk
        insertItemName.push("����")
        cm.sendGetNumber("������HP", 0, 0, 30000)
    } else if (status == 6) {
        insertItem.push(selection)//hp
        insertItemName.push("hp")
        cm.sendGetNumber("������MP", 0, 0, 30000)
    } else if (status == 7) {
        insertItem.push(selection)//mp
        insertItemName.push("mp")
        cm.sendGetNumber("#r��������������", 0, 0, 30000)
    } else if (status == 8) {
        insertItem.push(selection)//��������
        insertItemName.push("��������")
        cm.sendGetNumber("#r������ħ��������", 0, 0, 30000)
    } else if (status == 9) {
        insertItem.push(selection)//ħ��������
        insertItemName.push("ħ��������")
        cm.sendGetNumber("���������������", 0, 0, 30000)
    } else if (status == 10) {
        insertItem.push(selection)//���������
        insertItemName.push("���������")
        cm.sendGetNumber("ħ��������", 0, 0, 30000)
    } else if (status == 11) {
        insertItem.push(selection)//ħ��������
        insertItemName.push("ħ��������")
        cm.sendGetNumber("������������", 0, 0, 30000)
    } else if (status == 12) {
        insertItem.push(selection)//������
        insertItemName.push("������")
        cm.sendGetNumber("������ر���", 0, 0, 30000)
    } else if (status == 13) {
        insertItem.push(selection)//�ر���
        insertItemName.push("�ر���")
        cm.sendGetNumber("�ƶ��ٶ�", 0, 0, 30000)
    } else if (status == 14) {
        insertItem.push(selection)//�ƶ��ٶ�
        insertItemName.push("�ƶ��ٶ�")
        cm.sendGetNumber("��������Ծ��", 0, 0, 100)
    } else if (status == 15) {
        insertItem.push(selection)//��Ծ��
        insertItemName.push("��Ծ��")
        //cm.sendSimple("�Ƿ�����װ��?#b\r\n#L0#������#l\r\n#L1#����#l");
        cm.sendGetNumber("����������", 0, 0, 100);
    } else if (status == 16) {
        insertItem.push(selection)//��Ծ��
        insertItemName.push("����������");
        cm.sendGetNumber("ͻ������", 0, 0, 99999999);
    } else if (status == 17) {
        insertItem.push(selection)//ͻ������
        insertItemName.push("ͻ������");
        cm.sendGetNumber("Ǳ��1����ϸ��������Ҫ����֪д0��", 0, 0, 99999999);
    } else if (status == 18) {
        insertItem.push(selection)//Ǳ��
        insertItemName.push("Ǳ��1");
        cm.sendGetNumber("Ǳ��2����ϸ��������Ҫ����֪д0��", 0, 0, 99999999);
    } else if (status == 19) {
        insertItem.push(selection)//Ǳ��
        insertItemName.push("Ǳ��2");
        cm.sendGetNumber("Ǳ��3����ϸ��������Ҫ����֪д0��", 0, 0, 99999999);
    } else if (status == 20) {
        insertItem.push(selection)//Ǳ��
        insertItemName.push("Ǳ��3");
        cm.sendGetNumber("����Ǳ��1����ϸ��������Ҫ����֪д0��", 0, 0, 99999999);
    } else if (status == 21) {
        insertItem.push(selection)//Ǳ��
        insertItemName.push("����Ǳ��1");
        cm.sendGetNumber("����Ǳ��2����ϸ��������Ҫ����֪д0��", 0, 0, 99999999);
    } else if (status == 22) {
        insertItem.push(selection)//Ǳ��
        insertItemName.push("����Ǳ��2");
        cm.sendGetNumber("����Ǳ��3����ϸ��������Ҫ����֪д0��", 0, 0, 99999999);
    } else if (status == 23) {
        insertItem.push(selection)//Ǳ��
        insertItemName.push("����Ǳ��3");
        cm.sendGetNumber("�Ǽ�", 0, 0, 20);
    } else if (status == 24) {
        insertItem.push(selection)//�Ǽ�
        insertItemName.push("�Ǽ�");
        cm.sendGetNumber("Ҫ��ȼ�", 0, 0, 250);
    } else if (status == 25) {
        insertItem.push(selection)//Ҫ��ȼ�
        insertItemName.push("Ҫ��ȼ�");
        cm.sendGetNumber("����Ч�������д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 26) {
        insertItem.push(selection)//����Ч��
        insertItemName.push("����Ч��");
        cm.sendGetNumber("BOSS�ٷֱ��˺������д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 27) {
        insertItem.push(selection)//BOSS�ٷֱ��˺�
        insertItemName.push("BOSS�ٷֱ��˺�");
        cm.sendGetNumber("���˺��ٷֱȣ����д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 28) {
        insertItem.push(selection)//���˺��ٷֱ�
        insertItemName.push("���˺��ٷֱ�");
        cm.sendGetNumber("ȫ���Լӳɣ����д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 29) {
        insertItem.push(selection)//ȫ���Լӳ�
        insertItemName.push("ȫ���Լӳ�");
        cm.sendGetNumber("���ü������������д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 30) {
        insertItem.push(-1)//����������������
        insertItemName.push("���ü�������");
        cm.sendGetNumber("�ּ�", 0, 0, 30000);
    } else if (status == 31) {
        insertItem.push(selection)//�ּ�
        insertItemName.push("�ּ�");
        cm.sendGetNumber("���߾���ֵ�����д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 32) {
        insertItem.push(selection)//���߾���ֵ
        insertItemName.push("���߾���ֵ");
        cm.sendGetNumber("��ӡ���ߵȼ�", 0, 0, 3);
    } else if (status == 33) {
        insertItem.push(selection)//��ӡ���ߵȼ�
        insertItemName.push("��ӡ���ߵȼ�");
        cm.sendGetNumber("��ӡ���߾���ֵ�����д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 34) {
        insertItem.push(0)//��ӡ���߾���ֵ
        insertItemName.push("��ӡ���߾���ֵ");
        cm.sendGetText("��������Ȩ�ˣ�");
    } else if (status == 35) {
        insertItem.push(cm.getText())//��������Ȩ��
        insertItemName.push("��������Ȩ��");
        cm.sendGetNumber("�Ѿ��������������д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 36) {
        insertItem.push(selection)//�Ѿ���������
        insertItemName.push("�Ѿ���������");
        cm.sendGetNumber("���������д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 37) {
        insertItem.push(selection)//����
        insertItemName.push("����");
        cm.sendGetNumber("�����ٷֱȣ����д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 38) {
        insertItem.push(selection)//�����ٷֱ�
        insertItemName.push("�����ٷֱ�");
        cm.sendGetNumber("���Ӵ��������д0���ɣ���Ҫд������", 0, 0, 0);
    } else if (status == 39) {
        insertItem.push(selection)//���Ӵ���
        insertItemName.push("���Ӵ���");
        var text = "��ȷ��һ�������Ƶ�װ������:\r\n#b";
        for (var i = 0; i < insertItem.length; i++) {
            text += "" + insertItemName[i] + " : " + insertItem[i] + "\r\n"
        }
        text += insertItem.length + "\r\n#e#r��ȷ�����ϵ�װ��������ȷ��"
        cm.sendNextS(text, 3)
    } else if (status == 40) {
        cm.sendSimple("��ѡ���׵����ͣ�\r\n#L0# " + xxx + " #e#r ���#n#k#l    #L1# " + xxx + " #e#r ��ȯ#n#k#l    #L2# " + xxx + " #e#d ���#n#k#l");
    } else if (status == 41) {//�������ݿ�
        tradetype = selection;
        cm.sendGetNumber("����������Ҫ�����ļ۸�", 0, 0, 2100000000);
    } else if (status == 42) {
        ItemPrice = selection;
        var insertEquipData = cm.getConnection().prepareStatement("INSERT INTO cashtradesystem(id,cid,itemid,itemtype,tradeType,itemPrice,str,dex,ints,luk,hp,mp,watk,matk,wdef,mdef,acc,avoid,speed,jump,upgradeSlots,limitBreak,potential1,potential2,potential3,potential4,potential5,potential6,enhance,reqLevel,yggdrasilWisdom,bossDamage,totalDamage,allStat,karmaCount,hands,ItemEXP,sealedlevel,sealedExp,Owner,level,expiredate,ignorePDR,ViciousHammer) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"); // ��������
        insertEquipData.setString(1, null);//id�Զ�����
        insertEquipData.setString(2, -1);//���cid��-1���ǹ���Ա���ӵ�
        insertEquipData.setString(3, itemid);//
        insertEquipData.setString(4, 0);//itemtype
        insertEquipData.setString(5, tradetype);//tradeType
        insertEquipData.setString(6, selection);//itemPrice
        insertEquipData.setString(7, insertItem[1]);
        insertEquipData.setString(8, insertItem[2]);
        insertEquipData.setString(9, insertItem[3]);
        insertEquipData.setString(10, insertItem[4]);
        insertEquipData.setString(11, insertItem[5]);
        insertEquipData.setString(12, insertItem[6]);
        insertEquipData.setString(13, insertItem[7]);
        insertEquipData.setString(14, insertItem[8]);
        insertEquipData.setString(15, insertItem[9]);
        insertEquipData.setString(16, insertItem[10]);
        insertEquipData.setString(17, insertItem[11]);
        insertEquipData.setString(18, insertItem[12]);
        insertEquipData.setString(19, insertItem[13]);
        insertEquipData.setString(20, insertItem[14]);
        insertEquipData.setString(21, insertItem[15]);
        insertEquipData.setString(22, insertItem[16]);
        insertEquipData.setString(23, insertItem[17]);
        insertEquipData.setString(24, insertItem[18]);
        insertEquipData.setString(25, insertItem[19]);
        insertEquipData.setString(26, insertItem[20]);
        insertEquipData.setString(27, insertItem[21]);
        insertEquipData.setString(28, insertItem[22]);
        insertEquipData.setString(29, insertItem[23]);
        insertEquipData.setString(30, insertItem[24]);
        insertEquipData.setString(31, insertItem[25]);
        insertEquipData.setString(32, insertItem[26]);
        insertEquipData.setString(33, insertItem[27]);
        insertEquipData.setString(34, insertItem[28]);
        insertEquipData.setString(35, insertItem[29]);
        insertEquipData.setString(36, insertItem[30]);
        insertEquipData.setString(37, insertItem[31]);
        insertEquipData.setString(38, insertItem[32]);
        insertEquipData.setString(39, insertItem[33]);
        insertEquipData.setString(40, insertItem[34]);
        insertEquipData.setString(41, insertItem[35]);
        insertEquipData.setString(42, insertItem[36]);
        insertEquipData.setString(43, insertItem[37]);
        insertEquipData.setString(44, insertItem[38]);
        insertEquipData.executeUpdate(); //����
        cm.sendOk("��ϲ����ӳɹ���")
        cm.dispose();
    }
}
    