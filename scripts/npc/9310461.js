/*
�������
�ҷ�ʱ�г���
*/
var status = 0;
var minLevel = 230;
var maxLevel = 255;
var minPartySize = 3;
var maxPartySize = 6;
var maxPierre1 = 2;

function start() {
    status = -1;
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
        if (mode == 1) status++;
        else status--;
		if(cm.getPlayer().getMapId() == 706041650){
        if (status == 0) {
            cm.sendSimple("#r#e<�����ﻢ��>#n\r\n����Ͷ�Ա��һ��Ŭ����������������������Ҫ��Ա��������ϣ�����#b������ӵĶӳ�#k������˵����\r\n       #e#L0#���뿪��#r#e<����#g�ﻢ��#b�ߡ�>#k������#l\r\n            #L1#������һ��˵����#l")
        } else if (status == 1) {
            if (selection == 0) {
				 if (cm.getPlayer().getCSPoints(1) < 5000||!cm.haveItem(4000286, 1000)) {
	                cm.sendOk("��Ǹ�𾴵����\r\n\r\n����� 5000 ����1000��#i4000286# �ſ���ս");
	                cm.dispose();
					return;
	           	 }
				
				
                if (cm.getParty() == null) { // û�����
                    cm.sendOk("����Ӻ����̸����");
                    cm.dispose();
                } else if (!cm.isLeader()) { // ���Ƕӳ�
                    cm.sendOk("�ӳ��������������������˵����");
                    cm.dispose();
                    } else  {
		if (cm.getBossLog("����") < maxPierre1){
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
                    while (it.hasNext()) {
                        var cPlayer = it.next();
                        if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
                            levelValid += 1;
                        } else {
                            next = false;
                        }
                        if (cPlayer.getMapid() == mapId) {
                            inMap += 1;
                        }
                    }
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Zch");
					   //var em = cm.getEventManager("Zch");
                        if (em == null) {
                            cm.sendOk("���������ڽ��赱�С�");
                        } else {
                            var prop = em.getProperty("state");
                            if (prop.equals("0") || prop == null) {
								
							  if (cm.getPlayer().getCSPoints(1) > 5000||cm.haveItem(4000286, 1000)) 
								{
									cm.gainNX(1, -5000); 
									cm.gainItem(4000286,-1000);
									em.startInstance(cm.getParty(), cm.getMap(), 140);
									cm.setBossLog("����");
									//cm.worldSpouseMessage(0x21, "��� " + cm.getChar().getName() + " ����TA��Զ���� ���� �Ի��������� Σ���ǣ���������");
		    						//cm.worldSpouseMessage(0x21, "��� " + cm.getChar().getName() + " ����TA��Զ���� ���� �Ի��������� Σ���ǣ���������");
		    						//cm.worldSpouseMessage(0x21, "��� " + cm.getChar().getName() + " ����TA��Զ���� ���� �Ի��������� Σ���ǣ���������");
		    						//cm.getMap().startMapEffect("��� " + cm.getChar().getName() + " ����TA��Զ���� ���� �Ի��������� Σ���ǣ���������", 5121000);//��Ӱ����
									cm.dispose();
									 return;
								}else
								{
									 cm.sendOk("��ĵ�����#i4000286#����Ŷ��");
									cm.dispose();
									
									return;
								}
								
								
                                
                               
                            } else {
                                cm.sendOk("�����Ѿ������ˣ����Եȣ���");
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                        cm.dispose();
                    }
                } else {
			cm.sendOk("�Բ���һ��ֻ�ܽ���2�Ρ�");
			cm.dispose();
			}
		} //�ж����
            } else if (selection == 1) {
                cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                cm.dispose();
            }
        } 
	} else if(cm.getPlayer().getMapId() == 703020100){
		cm.dispose();	
		cm.warp(703020000);
	}
    }
}