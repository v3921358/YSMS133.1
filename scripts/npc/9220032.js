/*
 �ű����ܣ����ͥԺ���
 */

var a = 0;
var need;
var can = true;
var itemid;
var item = Array(
        Array(1003423, 500),
        Array(1102360, 500),
        Array(1042233, 500),
        Array(1082414, 500),
        Array(1062149, 500),
        Array(1072638, 500),
        Array(1003424, 700),
        Array(1102361, 700),
        Array(1042234, 700),
        Array(1082415, 700),
        Array(1062150, 700),
        Array(1072639, 700), //��Ҷ��ϵ����װ
        Array(3010412, 7200),
        Array(3010415, 7200),
        Array(3010504, 7200),
        Array(1102382, 8800),
        Array(1102383, 8800),
        Array(1142524, 12000),
		Array(1072732, 20000), // ����ϣ������սʿѥ // (������)
		Array(1072733, 20000), // ����ϣ������ʦѥ // (������)
		Array(1072734, 20000), // ����ϣ�����񹭼���ѥ // (������)
		Array(1072735, 20000), // ����ϣ���������ѥ // (������)
		Array(1072736, 20000), // ����ϣ�����񺣵�ѥ // (������)
        Array(1102476, 20000),
        Array(1102477, 20000),
        Array(1102478, 20000),
        Array(1102479, 20000),
        Array(1102480, 20000)
        )

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            if (cm.getMap().getId() == 706020000) {
                a = 10;
                cm.sendSimple("Ϊ�˱��������������ŵ,�һ��͸��㼸����Ҷ�����˱�.#b\r\n#L0# ��ȡ��Ҷ�����˱ң�����60������ȡ����Ȼ�ᱻT���ߣ���.")
            } else if (cm.getMap().getId() == 706020100) {//���ͥԺ���
                cm.sendSimple("���!��ӭ�������ͥԺ!����Ҫ��ʲô?#b\r\n#L0# ����֪�����ͥԺ�Ǹ����?#l\r\n#L1# ��������Ҷ�����˱ҶԻ�����.\r\n#L2# #e#r�������ͥԺ��#b#n")
            } else {
                a = 5;
                cm.sendNext("���!�����������Щ�������ŵ���Ҫ���������Ļ�԰������!�����������ͥԺ������!!")
            }
        } else if (a == 1) {
            if (selection == 0) {
                cm.sendNext("���ͥԺ���������Ļ�԰,���ǿɶ����ŵȴҪ���ҵĻ�԰������!")
            } else if (selection == 1) {
                var text = "��������Ҫ�Ի�ʲô��Ʒ?\r\n#b"
                for (var i = 0; i < item.length; i++) {
                    text += "#L" + i + "#  #i4032056# x " + item[i][1] + " :  #b#i" + item[i][0] + "##z" + item[i][0] + "##k#b\r\n"
                }
                a = 7;
                cm.sendSimple(text);
            } else if (selection == 2) {//�������ͥԺ
                a = 9;
                cm.sendYesNo("��ȷ���������ھͽ������ͥԺ��\r\n�����Ѿ��������ͥԺ" + cm.getBossLog('���ͥԺ') + "�Ρ�")
            }//selection
        } else if (a == 2) {
            cm.sendNext("��԰�����кܶ����Ķ���,�������10���ӵ�����,���æ�Ұ���ŵ����.�����;��,�һ���ͥԺ�з���һ��������,��ֻҪ����ͨ��������������,���ܻ�ȡ������ĵ�����!�����Ҹ���ı���!")
        } else if (a == 3) {
            cm.sendNext("�����ڵ���Ҷ�����˱ҿ��Ը��ҶԻ��ܶ����Ķ�����������������º��ҶԻ���ѡ��ڶ���ѡ��Ϳ��Կ������ԶԻ�ʲô��Ʒ�ˣ�")
        } else if (a == 4) {
            cm.sendNext("��������Ҫע����ǡ����ͥԺ��Ϊ����ŵʩ��ħ��������һ�����ֻ�ܽ���5�Ρ�")
        } else if (a == 5) {
            a = -1;
            cm.sendNext(" ���ܾ͵������ˣ������ʲô�����ġ������º��ҶԻ���")
        } else if (a == 6) {
            cm.sendNext("�����Ϲ�����,���ﻹ��һЩ�������ͥԺ�Ľ���,������֮�����ٸ�����!")
        } else if (a == 7) {
            cm.saveLocation("WORLDTOUR");
            cm.warp(706020100, 0);
            cm.dispose();
        } else if (a == 8) {
            itemid = item[selection][0];
            need = item[selection][1];
            cm.sendNext("��Ŀǰ������" + cm.itemQuantity(4032056) + "��#t4032056#��\r\n��ȷ����" + need + "��#t4032056#�Ի�1��#t" + itemid + "#��")
        } else if (a == 9) {
            for (var i = 1; i < 5; i++) {
                if (cm.getSpace(i) < 1) {
                    can = false;
                }
            }
            if (can) {
                if (cm.haveItem(4032056, need)) {
                    cm.gainItem(4032056, -need);
                    cm.gainItem(itemid, 1)
                    cm.sendOk("���ˣ��Ի��ɹ��ˡ�������ϲ����ϲ����������أ�")
                } else {
                    cm.sendOk("�����û���㹻��#t4032056#��")
                }
                cm.dispose();
            } else {
                cm.sendOk("�������еı������ڳ�һ���ո�")
                cm.dispose();
            }
        } else if (a == 10) {//�������ͥԺ
            if (cm.getParty() == null) { // û�����
                cm.sendOk("����Ӻ����̸����");
                cm.dispose();
            } else if (!cm.isLeader()) { // ���Ƕӳ�
                cm.sendOk("��жӳ�����̸����");
                cm.dispose();
            } else if (cm.getBossLog('���ͥԺ') >= 2) {
                cm.sendOk("�㲻�ܽ�ȥ�����ͥԺһ��ֻ�ܽ���2�Ρ�")
                cm.dispose();
            } else {
                var party = cm.getParty().getMembers().size();
                var mapId = cm.getPlayer().getMapId();
                if (party != 1) {
                    cm.sendOk("�Բ������ͥԺֻ��һ���˽�ȥ��\r\n�뿪��ֻ����һ���˵���ӡ�")
                    cm.dispose();
                } else {
                    var em = cm.getEventManager("SkyPark");
                    if (em == null) {
                        cm.sendOk("���������ڽ��赱�С�");
                    } else {
                        var prop = em.getProperty("started");
                        if (prop == "false" || prop == null) {
                            cm.setBossLog('���ͥԺ')
                            em.startInstance(cm.getParty(), cm.getMap());
                            cm.dispose();
                            return;
                        } else {
                            cm.sendOk("�Բ��𣬴�Ƶ���Ѿ����������ͥԺ�����ˡ�");
                            cm.dispose();
                        }
                    }
                }
            }
        } else if (a == 11) {
            var rand = Math.floor(Math.random() * 10);
            cm.gainItem(4032056, rand);
            cm.playerMessage(1, "����͸�����" + rand + "����Ҷ�����˱�\r\n��úñ���!!")
            cm.dispose();
        }//status
    }//mode
}//f