var aa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var pet = null;
var theitems = Array();

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            //cm.sendOk("�õģ��´��ټ���");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            cm.sendSimple("     #d�ǹ��޾���������ս�������ޣ��Ӳ��޾���������������³³����������������????������������ʲô�أ��������������״�ʹ������� #e#r������#k#n �� #e#r#z5380000##k#n #d�����԰�\r\n\r\n#r#L0#"+aa+" 1). ���﾿��������������������#l\r\n#b#L1#"+aa+" 2). �޲��������������������޲��ޣ�#l\r\n#L2#"+aa+" 3). ���Ұ��Ѿ�������޵ĳ��︴��#l#k");
        } else if (status == 1) {
            if (selection == 0) {
                var currentpet = null;
                for (var i = 0; i < 3; i++) {
                    currentpet = cm.getPlayer().getSpawnPet(i);
                    if (currentpet != null && pet == null) {
                        if (currentpet.getSummoned() && currentpet.getPetItemId() > 5000028 && currentpet.getPetItemId() < 5001012 && currentpet.getLevel() >= 1) {
                            pet = currentpet;
                            break;
                        }
                    }
                }
                if (pet == null || !cm.haveItem(5380000, 1)) {
                    cm.sendOk("ʧ�ܣ�\r\n\r\n#b1). δ������\r\n2). #z5380000#������");
                    cm.dispose();
                } else {
                    var id = pet.getPetItemId();
                    var name = pet.getName();
                    var level = pet.getLevel();
                    var closeness = pet.getCloseness();
                    var fullness = pet.getFullness();
                    var slot = pet.getInventoryPosition();
                    var flag = pet.getFlags();
                    var rand = 0;
                    var after = id;
                    while (after == id) {
                        rand = 1 + Math.floor(Math.random() * 99);
                        if (rand >= 1 && rand <= 3) {
                            after = 5000030; //����
                        } else if (rand >= 4 && rand <= 6) {
                            after = 5000035; //����
                        } else if (rand >= 7 && rand <= 9) {
                            after = 5000032; //����
                        } else if (rand >= 10  && rand <= 13) {
                            after = 5000033; //����
                        } else if (rand >= 14  && rand <= 16) {
                            after = 5000309; //Ѫ��Ů��
                        } else if (rand >= 17  && rand <= 19) {
                            after = 5000310; //���
                        } else if (rand >= 20  && rand <= 23) {
                            after = 5000311; //Ƥ����
                        } else if (rand >= 24  && rand <= 26) {
                            after = 5000290; //��ʹ���
                        } else if (rand >= 27  && rand <= 29) {
                            after = 5000291; //��ʹ����
                        } else if (rand >= 30  && rand <= 33) {
                            after = 5000292; //��ʹ�׶�
                        } else if (rand >= 34  && rand <= 36) {
                            after = 5000293; //����³��
                        } else if (rand >= 37  && rand <= 39) {
                            after = 5000294; //����³��
                        } else if (rand >= 40  && rand <= 43) {
                            after = 5000295; //��ɫ³��
                        } else if (rand >= 44  && rand <= 46) {
                            after = 5000296; //��ħС��
                        } else if (rand >= 47  && rand <= 49) {
                            after = 5000297; //��ħС��
                        } else if (rand >= 50  && rand <= 53) {
                            after = 5000298; //��ħС��
                        } else if (rand >= 54  && rand <= 56) {
                            after = 5000324; //����˳���
                        } else if (rand >= 57  && rand <= 59) {
                            after = 5001009; //��������
                        } else if (rand >= 60  && rand <= 63) {
                            after = 5001010; //��������
                        } else if (rand >= 64  && rand <= 66) {
                            after = 5001011; //��������
						} else if (rand >= 67  && rand <= 69) {
							after = 5000330; //MINI���װ�
						} else if (rand >= 70  && rand <= 73) {
							after = 5000331; //MINI�¶���
						} else if (rand >= 74  && rand <= 76) {
							after = 5000332; //MINIϣ��
						} else if (rand >= 77  && rand <= 79) {
							after = 5000342; //С������ͷ
						} else if (rand >= 80  && rand <= 83) {
							after = 5000343; //С������ͷ
						} else if (rand >= 80  && rand <= 83) {
							after = 5000344; //С������ͷ
						} else if (rand >= 84  && rand <= 86) {
							after = 5000345; //���յ�
						} else if (rand >= 87  && rand <= 89) {
							after = 5000137; //�����С����
						} else if (rand >= 90  && rand <= 93) {
							after = 5000227; //С����
						} else if (rand >= 94  && rand <= 96) {
							after = 5000038; //��̫��
						} else if (rand >= 97  && rand <= 99) {
							after = 5000267; //������
                        }
                    }
                    if (name.equals(cm.getItemName(id))) {
                        name = cm.getItemName(after);
                    }
                    cm.getPlayer().unequipSpawnPet(pet, true, false);
                    cm.gainItem(5380000, -1);
                    cm.removeSlot(5, slot, 1);
                    cm.gainPet(after, name, level, closeness, fullness, 45, flag);
                    cm.getPlayer().spawnPet(slot);
                    cm.sendOk("����ǰ����#i" + id + "##t" + id + "# �Ѿ�������,  #i" + after + "# #t" + after + "#!");
                    cm.dispose();
                }
            } else if (selection == 1) {
                var currentpet = null;
                for (var i = 0; i < 3; i++) {
                    currentpet = cm.getPlayer().getSpawnPet(i);
                    if (currentpet != null && pet == null) {
                        if (currentpet.getSummoned() && currentpet.getPetItemId() > 5000047 && currentpet.getPetItemId() < 5000054 && currentpet.getLevel() >= 15) {
                            pet = currentpet;
                            break;
                        }
                    }
                }
                if (pet == null || !cm.haveItem(5380000, 1)) {
                    cm.sendOk("�������������� ������Ҫ�� #i5380000##t5380000#,  �Լ�����һֻ15�����ϵ� #g#i5000048##t5000048##k ��\r\n\r\n������������:\r\n\r\n#r#i5000049##t5000049##k, #b#i5000050##t5000050##k, #d#i5000051##t5000051##k, #d#i5000052##t5000052##k, �� #e#i5000053##t5000053##n");
                    cm.dispose();
                } else {
                    var id = pet.getPetItemId();
                    var name = pet.getName();
                    var level = pet.getLevel();
                    var closeness = pet.getCloseness();
                    var fullness = pet.getFullness();
                    var slot = pet.getInventoryPosition();
                    var flag = pet.getFlags();
                    var rand = 0;
                    var after = id;
                    while (after == id) {
                        rand = 1 + Math.floor(Math.random() * 9);
                        if (rand >= 1 && rand <= 2) {
                            after = 5000049;
                        } else if (rand >= 3 && rand <= 4) {
                            after = 5000050;
                        } else if (rand >= 5 && rand <= 6) {
                            after = 5000051;
                        } else if (rand >= 7 && rand <= 8) {
                            after = 5000052;
                        } else if (rand == 9) {
                            after = 5000053;
                        }
                    }
                    if (name.equals(cm.getItemName(id))) {
                        name = cm.getItemName(after);
                    }
                    cm.getPlayer().unequipSpawnPet(pet, true, false);
                    cm.gainItem(5380000, -1);
                    cm.removeSlot(5, slot, 1);
                    cm.gainPet(after, name, level, closeness, fullness, 45, flag);
                    cm.getPlayer().spawnPet(slot);
                    cm.sendOk("Your robo has now evolved!! It used to be a #i" + id + "##t" + id + "#, and now it's a #i" + after + "##t" + after + "#!");
                    cm.dispose();
                }
            } else if (selection == 2) { //�������	
                var inv = cm.getInventory(5);
                var pets = cm.getPlayer().getPets(); //includes non-summon
                for (var i = 0; i <= inv.getSlotLimit(); i++) {
                    var it = inv.getItem(i);
                    if (it != null && it.getItemId() >= 5000000 && it.getItemId() < 5010000 && it.getExpiration() > 0 && it.getExpiration() < cm.getCurrentTime()) {
                        theitems.push(it);
                    }
                }
                if (theitems.length <= 0) {
                    cm.sendOk("û�п���Ҫ����ĳ���.");
                    cm.dispose();
                } else {
                    var selStr = "��ѡ����Ҫ����ĳ��ע�⣺����Ҫ��#b#i5180000# #t5180000##k�Ҳ��ܰ���������#b\r\n";
                    for (var i = 0; i < theitems.length; i++) {
                        selStr += "\r\n#L" + i + "##i" + theitems[i].getItemId() + "##t" + theitems[i].getItemId() + "##l";
                    }
                    cm.sendSimple(selStr);
                }
            }
        } else if (status == 2) {
            if (theitems.length <= 0) {
                cm.sendOk("û�п���Ҫ����ĳ���.");
            } else if (!cm.haveItem(5180000, 1)) {
                cm.sendOk("������û�� #b#i5180000# #t5180000##k ��.");
            } else {
                theitems[selection].setExpiration(cm.getCurrentTime() + (45 * 24 * 60 * 60 * 1000));
                cm.getPlayer().fakeRelog();
                cm.sendOk("��ϲ���������ɹ�������ʹ��ʱ���ӳ�45�졣");
                cm.gainItem(5180000, -1);
            }
            cm.dispose();
        }
    }
}