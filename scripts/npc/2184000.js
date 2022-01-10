var status = 0;
var minLevel = 150;
var maxLevel = 255;
var minPartySize = 3;
var maxPartySize = 6;
var maxPlay = 2;
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
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("#e<�񻰶�������սϣ��>#n\r\n�ڽ������ϣ��֮���ˣ�����׼�����������׼�����ˣ��������ǵĶӳ�����̸��������\r\n#b#L0#����ִ���������#l\r\n#L3#��Ҫ�һ��񻰶�����#l\r\n#L1#������һ��˵����#l\r\n#L4##r��Ҫ���ѵ�����ô�����#b\r\n#L2#�����뿪���")
        } else if (status == 1) {
            if (selection == 0) {
				if (cm.getBossLog("�񻰸���") >= maxPlay) {
					cm.sendOk("�������Ѿ�������"+maxPlay+"�Σ������ٲ���ø����ˣ����������~");
					return;
				}
/*				if (cm.getEventCount("�񻰸���") >= maxPlay) {
					cm.sendOk("�������Ѿ�������"+maxPlay+"�Σ������ٲ���ø����ˣ����������~");
					return;
				}*/
				
                if (cm.getParty() == null) { // û�����
                    cm.sendOk("����Ӻ����̸����");
                    cm.dispose();
                } else if (!cm.isLeader()) { // ���Ƕӳ�
                    cm.sendOk("��жӳ�����̸����");
                    cm.dispose();
                } else {
                    var party = cm.getParty().getMembers();
                    var mapId = cm.getPlayer().getMapId();
                    var next = true;
                    var levelValid = 0;
                    var inMap = 0;
                    var it = party.iterator();
					var idx = Array();
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
						/*if (cPlayer.getBossLog("�񻰸���") >= maxPlay) {
							cm.sendOk("������������Ѿ�������"+maxPlay+"�Σ������ٲ���ø����ˣ�");
							return;
						}
						if (cPlayer.getEventCount("�񻰸���") >= maxPlay) {
							cm.sendOk("������������Ѿ�������"+maxPlay+"�Σ������ٲ���ø����ˣ�");
							return;
						}*/
						idx.push(cPlayer.getId());
                    }
					if (getBossLog(idx)>=maxPlay) {
						cm.sendOk("������������Ѿ�������ø���2�Σ��޷��ٽ��룬���޳�����ҡ�");
						cm.dispose();
						return;
					}
                    if (party.size() < minPartySize || party.size() > maxPartySize || inMap < minPartySize) {
                        next = false;
                    }
                    if (next) {
                        var em = cm.getEventManager("Shenhua");
                        //cm.worldMessage(cm.getChar().getName() + "   �������Ķ����������߳�101������ս����.��ȥ�Ŀ�ȥ��֯����ɣ�");
                        if (em == null) {
                            cm.sendOk("���������ڽ��赱�С�");
                        } else {
                            if (cm.getPlayerCount(262030100) == 0 && cm.getPlayerCount(262030200) == 0 && cm.getPlayerCount(262030300) == 0) {
                                em.startInstance(cm.getParty(), cm.getMap());
								cm.setPartyBossLog("�񻰸���");
								//cm.setPartyEventCount("�񻰸���");
                                cm.dispose();
                                return;
                            } else {
                                cm.sendOk("Ŀǰ��Ƶ���Ѿ���������ս���뻻��Ƶ�����½��롣");
                                cm.dispose();
                            }
                        }
                        cm.dispose();
                    } else {
                        cm.sendOk("��ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                        cm.dispose();
                    }
                } //�ж����
            } else if (selection == 1) {
                cm.sendOk("�񻰸����ܹ��������ؿ���ÿ��ɽ������θ���������������㹻��ϣ���ǻ��Զ�����ս���ġ��������ؿ���ϣ�����ܿ���#e#b���ر���#n#k�������д�˵�е�#b�񻰶�����������#k��#b�񻰶���#k�����Ĳ��ϣ����и�����������Ӻ�ʱװ��������������ͨ������ķ�ʽ��Ӯȡ����������ʱ������Ҫ��10��������������ѡ�񣬷��򽫻ᱻǿ�����ߡ�\r\n���븱��ǰ����ȷ��������Ա��\r\n\r\n#b1�����Ա����Ҫ" + minPartySize + "�����ϣ�" + maxPartySize + "�����¡�\r\n2�����Ա�ȼ�����Ҫ��" + minLevel + "�����ϡ�\r\n\r\n��#r�����Ȼ����, ��������,�ٵ�½ ������������ӡ�#k#b��");
                cm.dispose();
            } else if (selection == 2) {
                cm.warp(910000000, 0)
                cm.sendOk("�ҵ��Ÿ���ǿ����㡭��")
                cm.dispose();
            } else if (selection == 3) {
				if (cm.haveItem(4033924,5)) {
					if (cm.getSpace(1) > 1) {
						cm.gainItem(4033924, -5);
						cm.gainItem(1032205, 1);
						cm.sendOk("�ɹ��һ���1��#r�񻰶���#k");
					} else {
						cm.sendOk("�һ�ʧ�ܣ�װ�����������㣬���飡");
					}
					cm.dispose();
				} else {
					cm.sendOk("��û�м���5��#b�񻰶�����ͼ#k");
					cm.dispose();
				}
			} else if (selection == 4) {
				cm.sendYesNo("���Ƿ���Ҫ����#r2000#k������øø�����");
			}
        } else if (status == 2) {
			if (cm.getPlayer().getCSPoints(1) >= 2000) {
				cm.gainNX(1,-2000);
				cm.resetBossLog("�񻰸���");
				cm.sendOk("���óɹ���");
				cm.dispose();
			} else {
				cm.sendOk("��ĵ���������޷����á�");
				cm.dispose();
			}
		}
    }
}
function getBossLog(idx) {
	var idStr ="";
	for(var key in idx) {
		if (key==0)
			idStr+=idx[key];
		else
			idStr+=","+idx[key];
	}
	var sql = "SELECT max(count) as maxcount FROM bosslog where bossid = '�񻰸���' and characterid in (" + idStr + ") and to_days(time) = to_days(now());";
	//java.lang.System.out.println(sql);
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	bosslogSql = pstmt.executeQuery();
    if(bosslogSql.next()) {
    	return bosslogSql.getString("maxcount")*1;
    }
	bosslogSql.close();
	pstmt.close();
	//conn.close();
	return 0;
}