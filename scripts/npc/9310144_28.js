/*
 �ű����ܣ���������
 ����ʱ�䣺2015��5��15�� 
 */
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var a = 0;
var Text;
var PenItemId = 4033204;//ע���õ���ID ��ů��ë
var Level;
var NeededItem;
var GiveItem;
var Shuxing;
var aaa = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";


function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
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
            Text = "#r��ӭʹ�ó�����ϵͳ��#r#z4033204#ֻ��ͨ�����ѻ�ã�#k\r\n\r\n\t#b��ǰ�������У� #r[ " + cm.getItemQuantity("4033204") + " ] #b�� #r#t4033204##k\r\n\r\n";
            Level = Math.abs(cm.getBossLog('�������', 1));
            // cm.sendOk(Level)
            if (Level == 0) {
                Text += "#i1102729# #b��Ҫ��ע #r(" + Math.abs(cm.getBossLog('��ů��ë����')) + "/100)#k #b������������һ�� #i1102451#\r\n\r\n\t\t#d�ɼӳ�ȫ����+10��(����������������)\r\n\r\n"
            } else if (Level == 1) {
                Text += "#i1102451# #b��Ҫ��ע #r(" + Math.abs(cm.getBossLog('��ů��ë����')) + "/200)#k #b���������������� #i1102575#\r\n\r\n\t\t#d�ɼӳ�ȫ����+20��(����������������)\r\n\r\n"
            } else if (Level == 2) {
                Text += "#i1102575# #b��Ҫ��ע #r(" + Math.abs(cm.getBossLog('��ů��ë����')) + "/300)#k #b���������������� #i1102572#\r\n\r\n\t\t#d�ɼӳ�ȫ����+30��(����������������)\r\n\r\n"
            } else if (Level == 3) {
                Text += "#i1102572# #b��Ҫ��ע #r(" + Math.abs(cm.getBossLog('��ů��ë����')) + "/500)#k #b�������������Ľ� #i1102624#\r\n\r\n\t\t#d�ɼӳ�ȫ����+50��(����������������)\r\n\r\n"
            } else if (Level == 4) {
                Text += "#i1102624# #b��Ҫ��ע #r(" + Math.abs(cm.getBossLog('��ů��ë����')) + "/700)#k #b��������������� #i1102724#\r\n\r\n\t\t#d�ɼӳ�ȫ����+60��(����������������)\r\n\r\n"
            } else if (Level == 5) {
                Text += "#i1102724# #b��Ҫ��ע #r(" + Math.abs(cm.getBossLog('��ů��ë����')) + "/800)#k #b���������������� #i1102723#\r\n\r\n\t\t#d�ɼӳ�ȫ����+80��(����������������)\r\n\r\n"
            } else if (Level == 6) {
                Text += "#i1102723# #b��Ҫ��ע #r(" + Math.abs(cm.getBossLog('��ů��ë����')) + "/1000)#k #b�������������߽� #i1102798#\r\n\r\n\t\t#d�ɼӳ�ȫ����+100��(����������������)\r\n\r\n"
            } else {
                Text = "���Ѿ�ȫ����������ˡ�\r\nError!\r\n";
            }
            if (Text == "���Ѿ�ȫ����������ˡ�\r\nError!\r\n") {
                cm.sendOk("���Ѿ�ȫ����������ˡ�")
                cm.dispose();
            } else {
                Text += "#b#L0# " + aaa + " ��ע����#l #L1#  " + aaa + " ������#l #L2#  " + aaa + " ���׽���#l#k\r\n \r\n";
                cm.sendSimple(Text);
            }
        } else if (a == 1) {
            if (selection == 0) {
                cm.sendGetText("��������Ҫע�����ů��ë������");
            } else if (selection == 1) {//����
                NeededItem = EquipItemNeededAndGive(Level)[0];
                GiveItem = EquipItemNeededAndGive(Level)[1];
                Shuxing = EquipItemNeededAndGive(Level)[2];
                a = 2;
                cm.sendSimple("�˴κϳ���Ҫ����Ҫ��\r\n1��#i" + NeededItem + "# #t" + NeededItem + "# x1\r\n\r\n2����ע����" + getMax(Level) + "�㣬ĿǰΪ" + Math.abs(cm.getBossLog('��ů��ë����')) + "�㡣#b#e\r\n#L0# ����ҽ���������ף�");
            } else {//����
                cm.sendOk("\t\t#e#b������ȫ����Ԥ��#k#n\r\n\r\n\r\n#r#z1102451#            һ�� ȫ����+10\r\n#z1102575#          ���� ȫ����+20\r\n#z1102572#        ���� ȫ����+30\r\n#z1102624#          �Ľ� ȫ����+50\r\n#z1102724#            ��� ȫ����+60\r\n#z1102723#            ���� ȫ����+80\r\n#z1102798#              �߽� ȫ����+100");
                cm.dispose();
            }
        } else if (a == 2) {
            var quantity = cm.getText();
            //var rand = Math.floor(Math.random() * 3) + 1;
            if (quantity == null) {
                cm.sendOk("ʲô����������Ҫע�����ů��ë������");
                cm.dispose();
            }
            if (quantity > getMax(Level) - Math.abs(cm.getBossLog('��ů��ë����'))) {
                cm.sendOk("�Բ���������������ܳ���Ŀǰ����������ֵ" + getMax(Level) + "��" + Level);
                cm.dispose();
            } else {
                if (cm.haveItem(PenItemId, quantity)) {
                    for (var i = 0; i < quantity; i++) {
                        cm.setBossLog('��ů��ë����', 1);
                    }
                    cm.gainItem(PenItemId, -quantity);
                    if (Math.abs(cm.getBossLog('��ů��ë����')) >= getMax(Level)) {
                        cm.sendOk("���ѳɹ�ע����ů��ë���� " + quantity + " �㡣\r\n����ǰ��������Ҫ������ֵ������\r\n�����ѡ����н����ˣ�");			
			cm.worldSpouseMessage(0x20, "����ů��ë�� : ��� " + cm.getChar().getName() + "  �ɹ�������ע�� " + quantity + " ��������");
                        cm.dispose();
                    } else {
                        cm.sendOk("���ѳɹ�ע����ů��ë����" + quantity + "�㡣\r\n��Ŀǰ����ů��ë������: " + Math.abs(cm.getBossLog('��ů��ë����', 1)) + ".");
			cm.worldSpouseMessage(0x20, "����ů��ë�� : ��� " + cm.getChar().getName() + "  �ɹ�������ע�� " + quantity + " ��������");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("��ȷ�����ı����� #b#t" + PenItemId + "##k��");
                    cm.dispose();
                }
            }
        } else if (a == 3) {
            if (Math.abs(cm.getBossLog('��ů��ë����'), 1) >= getMax(Level) && cm.haveItem(NeededItem)) {
                if (cm.getEquipBySlot(1) == null || cm.getEquipBySlot(1).getItemId() != NeededItem) {
                    cm.sendOk("�뽫#b#t" + NeededItem + "##k����װ�����ĵ�һ����");
                    cm.dispose();
                } else if (Level != 0 && cm.getEquipBySlot(1).getOwner() != "��ů��ë" + (parseInt(Level)) + "��") {
                    cm.sendOk("ֻ�н��й����׵ĵ��߲��ܽ��ף�"+"��ů��ë" + (parseInt(Level)) + "��");
                    cm.dispose();
                } else {
                    MakeEquip();
                    cm.resetBossLog('��ů��ë����');//���
                    cm.setBossLog('�������', 1);//����1
		    cm.getMap().startMapEffect("ǿ������ "+cm.getChar().getName()+" ��������� " + (1+(parseInt(Level))) + " ���ˣ�", 5120008);
                    cm.worldSpouseMessage(0x20, "�������ס� : ��� " + cm.getChar().getName() + " �ĳ������ů��ë�Ĺ�ע�������� " + (1+(parseInt(Level))) + " ���ˣ�");
                    cm.sendOk("���׳ɹ�!");
                    cm.dispose();
                }
            } else {
                cm.sendOk("�㻹û����������Ҫ����Ʒ��");
                cm.dispose();
            }
        }//a
    }//mode
}//f

function EquipItemNeededAndGive(Level) {
    var Item = new Array();
    switch (Level) {
        case 0:
            Item.push(1102729);//����
            Item.push(1102451);//����
            Item.push(10);//ȫ����
            return Item;
            break;
        case 1:
            Item.push(1102451);//����
            Item.push(1102575);//����
            Item.push(20);//ȫ����
            return Item;
            break;
        case 2:
            Item.push(1102575);//����
            Item.push(1102572);//����
            Item.push(30);//ȫ����
            return Item;
            break;
        case 3:
            Item.push(1102572);//����
            Item.push(1102624);//����
            Item.push(50);//ȫ����
            return Item;
            break;
        case 4:
            Item.push(1102624);//����
            Item.push(1102724);//����
            Item.push(60);//ȫ����
            return Item;
            break;
        case 5:
            Item.push(1102724);//����
            Item.push(1102723);//����
            Item.push(80);//ȫ����
            return Item;
            break;
        case 6:
            Item.push(1102723);//����
            Item.push(1102798);//����
            Item.push(100);//ȫ����
            return Item;
            break;
        default:
            return 0;
            break;
    }
}
function getMax(Level) {
    switch (Level) {
        case 0:
            return 100;
            break;
        case 1:
            return 200;
            break;
        case 2:
            return 300;
            break;
        case 3:
            return 500;
            break;
        case 4:
            return 700;
            break;
        case 5:
            return 800;
            break;
        case 6:
            return 1000;
            break;
        default:
            return 55;
            break;
    }
}
function getEquipStatToArray() {//�õ�װ������
    EquipStat[0] = cm.getEquipBySlot(1).getStr();//����
    EquipStat[1] = cm.getEquipBySlot(1).getDex();//����
    EquipStat[2] = cm.getEquipBySlot(1).getInt();//����
    EquipStat[3] = cm.getEquipBySlot(1).getLuk();//����
    EquipStat[4] = cm.getEquipBySlot(1).getHp();
    EquipStat[5] = cm.getEquipBySlot(1).getMp();
    EquipStat[6] = cm.getEquipBySlot(1).getWatk();
    EquipStat[7] = cm.getEquipBySlot(1).getMatk();
    EquipStat[8] = cm.getEquipBySlot(1).getWdef();
    EquipStat[9] = cm.getEquipBySlot(1).getMdef();
    EquipStat[10] = cm.getEquipBySlot(1).getAcc();
    EquipStat[11] = cm.getEquipBySlot(1).getAvoid();
    EquipStat[12] = cm.getEquipBySlot(1).getSpeed();
    EquipStat[13] = cm.getEquipBySlot(1).getJump();
    EquipStat[14] = cm.getEquipBySlot(1).getUpgradeSlots();
    EquipStat[15] = cm.getEquipBySlot(1).getLimitBreak();
    EquipStat[16] = cm.getEquipBySlot(1).getPotential1();
    EquipStat[17] = cm.getEquipBySlot(1).getPotential2();
    EquipStat[18] = cm.getEquipBySlot(1).getPotential3();
    EquipStat[19] = cm.getEquipBySlot(1).getPotential4();
    EquipStat[20] = cm.getEquipBySlot(1).getPotential5();
    EquipStat[21] = cm.getEquipBySlot(1).getPotential6();
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
            toDrop.setOwner("��ů��ë" + (parseInt(Level + 1)) + "��");
            /*case 15:
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
             */
    }
}
function MakeEquip() {//����װ��
    var rand;
    var ii = cm.getItemInfo();
    toDrop = ii.randomizeStats(ii.getEquipById(GiveItem)).copy(); // ����һ��Equip��(�������װ��)
    for (var i = 0; i < 16; i++) {
        rand = Shuxing;//ȫ����10
        setEquipStatRandom(i, rand);
    }
    cm.removeSlot(1, 1, 1);//ɾ����ԭʼ����
    //inventoryType, deleteSlot, deleteQuantity
    //toDrop.setEquipOnlyId(cm.getItemInfo().getNextEquipOnlyId());
    cm.addFromDrop(cm.getC(), toDrop, false);
}