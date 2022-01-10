/*
 �ű����ܣ�Ӣ������������ء�
 */

var rewards = Array(2022154, 3010283, 3010286, 3010057, 3010053, 3010059, 3010068, 3010078, 1302106, 1182010, 1190101, 5062002, 1032156, 3010071, 3010715, 3010718, 1112150, 1112262, 1102659, 1102554, 1102604, 1102588, 1102589, 1102546, 1102547, 1102548, 1102550, 1102532, 1102555, 1142210, 1142208, 1142189, 1032110, 1132104, 1122149, 1112662, 1012283, 1152046, 1152047, 1152048, 1152049, 5079001, 5079002, 3010099, 3010123, 3010124, 3010125, 3010126, 3010142);
var expires = Array(4, 7, 7);
var quantity = Array(5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 100, 100, 1, 1, 1, 1, 1, 1, 1);
var needed = Array(50, 200, 200, 200, 200, 200, 200, 200, 200, 300, 400, 500, 300, 200, 1000, 800,  500, 500, 300, 300, 300, 300, 300, 300, 300, 300, 300, 500, 300, 500, 400, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 200, 200, 200, 200, 200, 200);
var status = -1;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        for (var i = 3994059; i < 3994085; i++) {
            cm.givePartyItems(i, 0, true);
        }
    }
    switch (cm.getPlayer().getMapId()) {
        default:
            //event map
            if (status == 0) {
                cm.sendSimple("���~��������#bӢ���#k��Ģ����ʿ~#b\r\n\r\n#L0#ǰ��Ӣ��壡#l\r\n#L1#����ʹ��#z4033943#�һ���Ʒ��#l\r\n#L2#Ӣ�����һ��ʲô���ĵط���#l");
            } else if (status == 1) {
                if (selection == 0) {
                    cm.warp(702090400, 0); //ǰ��Ӣ����ͼ
                    cm.dispose();
                } else if (selection == 1) {
                    var selStr = "Ҳ������Ը��Ҷһ�����Ķ���\r\n\r\n#b";
                    for (var i = 0; i < rewards.length; i++) {
                        selStr += "#L" + i + "##z" + rewards[i] + "# x " + quantity[i] + " #r(" + needed[i] + " ӡ��)#b#l\r\n";
                    }
                    cm.sendSimple(selStr);
                } else if (selection == 2) {
                    cm.sendNext("�������Ӣ����һЩ�����̫���������������ܰɣ�#d\r\n\r\n1) Ӣ�����һ�����صĵط����������Ӳ�����ӱ�����5�˲��ܽ��롣 \r\n2) Ӣ�����������ͬ���Ѷȵȼ���#b�򵥡����ѡ�#d \r\n3) �����Ƶ�5�����ڣ��ռ�������𰸸��ϵ���ĸ�飬�����ǽ������ǵ���ӳ���������ӳ�ת����������\r\n4) �����Ƶ�ʱ���ڣ�����Լ����ش�������ֵ����⣬�ش��������ֵĽ���Ҳ��������ġ� \r\n5) ����ش���ȷ�Ļ���#b���������Ľ������ҵõ�һ��#z4033943#�������Ը�Ģ����ʿ��ȡ�ܶ�����Ķ�����\r\n#k#e6) �����Ķ���ȡ���ڴ𰸵�������");
                    cm.dispose();
                }
            } else if (status == 2) {
                if (!cm.haveItem(4033943, needed[selection])) {
                    cm.sendNext("�Բ�����û���㹻��#z4033943#��");
                } else if (!cm.canHold(rewards[selection], 1)) {
                    cm.sendNext("����ܻ�û��׼���ã�������ı����ڳ�һ���ո�");
                } else {
                    cm.gainItem(4033943, -needed[selection]);
                    if (expires[selection] > 0) {
                        cm.gainItemPeriod(rewards[selection], quantity[selection], expires[selection]);
                    } else {
                        cm.gainItem(rewards[selection], quantity[selection]);
                    }
                    cm.sendOk(" ��ӭ������")
                }
                cm.dispose();
            }
            break;
        case 702090400:
            if (status == 0) {
                cm.sendSimple("���~��������#bӢ���#k��Ģ����ʿ~#b\r\n\r\n#L0#ǰ��Ӣ��� - ��#l\r\n#L1#ǰ��Ӣ��� - һ��#l\r\n#L3#�뿪�����ͼ#l");
            } else if (status == 1) {
                if (selection == 0 || selection == 1 || selection == 2) {
                    var em = cm.getEventManager("English");
                    if (em == null) {
                        cm.sendOk("�˸���û�п��š�");
                        cm.dispose();
                        return;
                    }
                    if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
                        cm.sendOk("Ǳ������ط��Ļ�\r\n����Ҫ��ӣ���������Ķӳ����ҽ����ɡ�");
                    } else {
                        var party = cm.getPlayer().getParty().getMembers();
                        var mapId = cm.getPlayer().getMapId();
                        var next = true;
                        var size = 0;
                        var it = party.iterator();
                        while (it.hasNext()) {
                            var cPlayer = it.next();
                            var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
                            if (ccPlayer == null) {
                                next = false;
                                break;
                            }
                            size++;
                        }
                        if (next && size >= 1) {
                            if (em.getInstance("English" + selection) == null) {
                                em.startInstance("" + selection, cm.getPlayer());
                            } else {
                                cm.sendOk("�Ѿ������������������սӢ�������");
                            }
                        } else {
                            cm.sendOk("����е����г�Ա������ͬһ����ͼ��");
                        }
                    }
                } else if (selection == 3) {
                    cm.warp(910000000, 0);
                }
                cm.dispose();
            }
            break;
    }
}