var status = 0;
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var gardenData = null;
var gardenFlowerPot = null;
var typed=-1;
var operationId = 0;
var buyFlower = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
	if (typed==5 && mode == 0) {
		status = 2;
		typed=0;
	}
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		/* ��԰��Ϣ */
		gardenData=getGardenInfo();
		var text = icon1+" #d���Ļ�԰�ȼ���#r["+gardenData['level']+"]#d ��\r\n";
		text+=icon1+" ���Ļ�����#r["+cm.getPlayerEnergy()+"]#d ��\r\n";
		text+=icon1+" ��԰����ֵ��#r["+gardenData['exp']+"/"+calcLevelUp(gardenData['level'])+"]#k\r\n\r\n";
		text+="#b#L0#"+icon2+" �չ˻���#l";
		text+="#b#L1#"+icon2+" ������԰#l";
		text+="#b#L2#"+icon2+" ��������#l";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == -1 && mode == 0)
			selection = typed;
		if (selection == -1 && mode != 0)
			selection = 0;
		switch(selection) {
			case 0:
				typed=0;
				gardenFlowerPot = getFlowerPot();
				var currentTimestamp = java.lang.System.currentTimeMillis();
				var text="\t\t\t\t\t#d#e�� �ҵĻ�԰ ��#n#k\r\n";
				for(var key in gardenFlowerPot) {
					var seedid = gardenFlowerPot[key]['seedid'];
					var flowerpotid = gardenFlowerPot[key]['id'];
					var expiration = gardenFlowerPot[key]['expiration'];
					if (seedid!=0) {
						var tips = "";
						var seconds = (expiration-currentTimestamp)/1000;
						if (seconds<=0)
							tips = "#g�����Ѿ�����#k";
						else
						{
							var DHM = toDHM(seconds);
							tips = "#bʣ�� "+DHM[0]+"��"+DHM[1]+"Сʱ"+DHM[2]+"��";
						}
						text+="#L"+flowerpotid+"#"+icon1+" #r[#t"+seedid+"#]#k "+tips+"#l\r\n";
					} else {
						text+="#L"+flowerpotid+"#"+icon1+" #b[����һ���յĻ��裬�������]\r\n";
					}
				}
				cm.sendOkS(text, 2);
			break;
			case 1:
				typed=1;
				cm.sendYesNo("������԰��Ҫ#r2000W#k������֮�󽫻���һ�����裬�Ƿ�������");
			break;
			case 2:
				typed=2;
				var text="#d#e���������ĵȼ����Թ�������ӣ�#n#k\r\n";
				var flowers = getFlowers();
				for(var key in flowers) {
					var tips = flowers[key][1]+"#n#b��";
					if (flowers[key][1]>gardenData['level'])
						tips = "(��Ҫ"+flowers[key][1]+"��)#n#b";
					text+="#b#L"+key+"##v"+flowers[key][0]+"# #t"+flowers[key][0]+"#���� #r#e"+tips+" (������"+flowers[key][4]+"~"+flowers[key][5]+")#l\r\n";
				}
				cm.sendOkS(text, 2);
			break;
		}
	} else if (status == 2) {
		if (typed==0) {
			var currentTimestamp = java.lang.System.currentTimeMillis();
			var flowerpotid = selection;
			operationId = flowerpotid;
			var seedid = gardenFlowerPot[flowerpotid]['seedid'];
			var expiration = gardenFlowerPot[flowerpotid]['expiration'];
			var text="\t\t\t\t\t#d#e�� �ҵĻ�԰ ��#n#k\r\n";
			if (seedid!=0 && seedid!=-1) {
				var seconds = (expiration-currentTimestamp)/1000;
				var flag=false;
				var tips = '';
				if (seconds<=0) {
					flag=true;
					var tips="#g�����Ѿ����죬���Բ�ժ#k";
				} else {
					var DHM = toDHM(seconds);
					tips = "#bʣ�� "+DHM[0]+"��"+DHM[1]+"Сʱ"+DHM[2]+"��#k";
				}
				text+="#r#t"+seedid+"##k\r\n";
				text+=tips+"\r\n";
				if (!flag)
					text+="#b#L0#"+icon2+"��ˮ#l\t#L1#"+icon2+"ʩ��#l\t#L2#"+icon2+"�ڳ�#l";
				else	
					text+="#b#L4#"+icon2+"��ժ��ʵ#l\t#L2#"+icon2+"�ڳ�#l";
				cm.sendOkS(text,2);
			} else {
				text+="#r����һ���յĻ��裬�����Խ������֡�\r\n";
				text+="#b#L5#"+icon2+"����#l";
				cm.sendOkS(text, 2);
			}
		} else if (typed==1) {
			status-=2;
			if (cm.getMeso() >= 20000000) {
				if (addFlowerPot()) {
					cm.gainMeso(-20000000);
					cm.sendOkS("�����ɹ���\r\n#L0##b"+icon2+"���ҷ���#l",2);
				} else {
					cm.sendOkS("����ʧ�ܣ����ĵȼ�������������Ѵﵽ���ֵ���޷���������������������԰�ȼ���\r\n#L0##b"+icon2+"���ҷ���#l",2);
				}
			} else {
				cm.sendOkS("��û����ô����Ϸ�ң�\r\n#L0##b"+icon2+"���ҷ���#l",2);
			}
		} else if (typed==2) {
			var flower = getFlowers();
			flower=flower[selection];
			buyFlower=flower;
			var ripeningTime = flower[3]*3600;
			var DHM = toDHM(ripeningTime);
			var text="\t\t\t\t\t#d#e�� ������Ϣ ��#n#k\r\n";
			text+=icon3+"#rƷ�֣�#b#v"+flower[0]+"##t"+flower[0]+"#����\r\n";
			text+=icon3+"#r������#b"+flower[4]+"~"+flower[5]+"\r\n";
			text+=icon3+"#r���ۣ�#b"+flower[2]+" ��Ϸ��\r\n";
			text+=icon3+"#r����ʱ�䣺#b"+DHM[0]+"��"+DHM[1]+"Сʱ"+DHM[2]+"��#k\r\n\r\n";
			text+=icon3+"#d#e��������Ҫ�����������#n#k\r\n";
			cm.sendGetNumber(text, 0, 1, 100);
			//cm.sendYesNo("���Ƿ�Ҫ����#r"+flower[2]+"#b��Ϸ��#k����#b#t"+flower[0]+"#����#k");
		}
	} else if (status == 3) {
		if (typed==2) {
			status-=3;
			var quantity = selection;
			var cost = buyFlower[2]*quantity;
			if (gardenData['level']<buyFlower[1]) {
				cm.sendOkS("���Ļ�԰�ȼ����㣬�޷���������ӡ�\r\n#L0##b"+icon2+"���ҷ���#l", 2);
			} else 
			if (cm.getMeso() >= cost) {
				cm.gainMeso(-cost);
				gainSeed(buyFlower[0], quantity);
				cm.sendOkS("����ɹ���\r\n#L0##b"+icon2+"���ҷ���#l", 2);
			} else {
				cm.sendOkS("��Ϸ�Ҳ��㣬����ʧ�ܣ�\r\n#L0##b"+icon2+"���ҷ���#l", 2);
			}
		} else {
			switch(selection) {
				//��ˮ����
				case 0:
					status-=3;
					if (cm.getBossLog("��԰��ˮ"+operationId)>0) {
						cm.sendOkS("�������񽽹�ˮ�ˣ����ܰ���������\r\n#L0##b"+icon2+"���ҷ���#l", 2);
					} else {
						if (cm.getPlayerEnergy()>10) {
							cm.setBossLog("��԰��ˮ"+operationId);
							cm.gainPlayerEnergy(-10);
							Operations(operationId, 0);
							cm.getPlayer().dropMessage(6,"������10�������������1Сʱ�ɳ�ʱ�䡣");
							cm.sendOkS("�ÿ��ģ������ֳ�����һ�㣡\r\n#L0##b"+icon2+"���ҷ���#l",2);
						} else {
							cm.sendOkS("����ˣ�û�л����ˣ�\r\n#L0##b"+icon2+"���ҷ���#l",2);
						}
					}
				break;
				//ʩ�ʲ���
				case 1:
					status-=3;
					if (cm.getBossLog("��԰ʩ��"+operationId)>0) {
						cm.sendOkS("��������ʩ�����ˣ����ܰ���������\r\n#L0##b"+icon2+"���ҷ���#l", 2);
					} else {
						if (cm.getPlayerEnergy()>20) {
							cm.setBossLog("��԰ʩ��"+operationId);
							cm.gainPlayerEnergy(-20);
							Operations(operationId, 1);
							cm.getPlayer().dropMessage(6,"������20�������������2Сʱ�ɳ�ʱ�䡣");
							cm.sendOkS("�ÿ��ģ������ֳ�����һ�㣡\r\n#L0##b"+icon2+"���ҷ���#l",2);
						} else {
							cm.sendOkS("����ˣ�û�л����ˣ�\r\n#L0##b"+icon2+"���ҷ���#l",2);
						}
					}
				break;
				//�ڳ�����
				case 2:
					status-=3;
					clearFlowerPot(operationId);
					cm.sendOkS("�ޣ��ں��ˣ������������µ����Ӱɣ�\r\n#L0##b"+icon2+"���ҷ���#l",2);
				break;
				//��ժ��ʵ
				case 4:
					status-=3;
					var currentTimestamp = java.lang.System.currentTimeMillis();
					var seedid = gardenFlowerPot[operationId]['seedid'];
					if (cm.getSpace(Math.floor(seedid/1000000))<2) {
						cm.sendOk("��İ����ռ���񲻹��أ�����һ��������ժ�ɣ�");
						cm.dispose();
						return;
					}
					var expiration = gardenFlowerPot[operationId]['expiration'];
					var seconds = (expiration-currentTimestamp)/1000;
					var flower = getFlower(seedid);
					var catchNum = Math.floor(Math.random()*(flower[5]-flower[4]+1)+flower[4]);
					var flowerLevel = flower[1];
					var cash = flowerLevel*20;
					if (seconds<=0) {
						cm.gainItem(seedid, catchNum);
						//��ջ���
						clearFlowerPot(operationId);
						//�õ�����
						var getExp = gainPlantExp(seedid);
						var levelStr="";
						if (getExp==-1) {
							levelStr="��԰�ȼ�������#r1#k����";
						} else {
							levelStr = "�õ���#r"+getExp+"#k�㻨԰����ֵ";
						}
						cm.gainNX(cash);
						cm.sendOkS("�ÿ��ģ����ڵ����ջ��ʵ�ļ��ڣ�\r\n�õ���#b"+catchNum+"#k��#v"+seedid+"##b#t"+seedid+"##k\r\n�õ���#r"+cash+"#k���\r\n"+levelStr+"\r\n#L0##b"+icon2+"���ҷ���#l", 2);
					} else {
						cm.sendOk("ɧ�꣬�����Ҫǿ�в�ժ��");
						cm.dispose();
					}
				break;
				case 5:
					var seeds = getSeeds();
					var text="#d#eѡ����Ҫ���µ����ӣ�#n#k\r\n"
					if (seeds!='' && seeds != null && seeds != Array()) {
						for(var key in seeds) {
							text+="#b#L"+seeds[key][0]+"#[#v"+seeds[key][0]+"##t"+seeds[key][0]+"#����] ������["+seeds[key][1]+"]��#l\r\n";
						}
						typed=5;
						cm.sendOkS(text, 2);
					} else {
						status-=3;
						text="��Ŷ������û�������ˡ���ȥ��һЩ��\r\n#L0##b"+icon2+"���ҷ���#l";
						cm.sendOkS(text, 2);
					}
				break;
			}
		}
	} else if (status == 4) {
		status-=4;
		plantFlower(selection, operationId);
		text="�ֺÿ�����쳤��ɣ�\r\n#L0##b"+icon2+"���ҷ���#l";
		cm.sendOkS(text, 2);
	}
}
/*
*	�Զ��庯��Ⱥ
*/
/*
	�õ�����
*/
function gainSeed(seedid, quantity) {
	if (quantity == null)
		quantity = 1;
	var charid = cm.getPlayer().getId();
	var sql = "SELECT * FROM memory_seedpackage WHERE charid = ? and seedid = ?";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, charid);
	pstmt.setInt(2, seedid);
	var data = pstmt.executeQuery();
	if (data.next()) {
		data.close();
		pstmt.close();
		sql = "UPDATE memory_seedpackage SET quantity=quantity+? WHERE charid=? AND seedid=?";
		pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, quantity);
		pstmt.setInt(2, charid);
		pstmt.setInt(3, seedid);
		pstmt.executeUpdate();
		pstmt.close(); 
	} else {
		sql = "INSERT INTO memory_seedpackage(charid, seedid, quantity) VALUES(?,?,?)";
		pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, charid);
		pstmt.setInt(2, seedid);
		pstmt.setInt(3, quantity);
		pstmt.executeUpdate();
		pstmt.close();
	}
	return true;
}
/*
	��ȡ��������
*/

function getSeeds() {
	var charid = cm.getPlayer().getId();
	var sql = "SELECT * FROM memory_seedpackage WHERE charid = ? and quantity>0 order by seedid desc";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, charid);
	var data = pstmt.executeQuery();
	var seeds = Array();
	while(data.next()) {
		seeds.push(Array(data.getString('seedid'),data.getString('quantity')));
	}
	return seeds;
}
/*
	�Ƿ���������
*/
function isAllowUpgrade() {
	var charid = cm.getPlayer().getId();
	var sql = "SELECT COUNT(id) as pn FROM memory_flowerpot WHERE charid = ?";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, charid);
	var rs=pstmt.executeQuery();
	var flag=true;
	if (rs.next())
	{
		var pn = rs.getInt('pn');
		if (pn<gardenData['level'] && pn<10) {
			flag=true;
		} else {
			flag=false;
		}
	}
	rs.close();
	pstmt.close();
	return flag;
}
/* �����ӻ��� */
function addFlowerPot() {
	var charid = cm.getPlayer().getId();
	var conn = cm.getConnection();
	var pstmt = null
	if (isAllowUpgrade()) {
		var sql = "INSERT INTO memory_flowerpot(charid, seedid, expiration) VALUES(?,NULL,-1)";
		pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, charid);
		pstmt.executeUpdate();
		pstmt.close();
		return true;
	} else {
		return false;
	}
}
/*
	�ֻ�
*/
function plantFlower(flowerid, flowerpotid) {
	var charid = cm.getPlayer().getId();
	var flower = getFlower(flowerid);
	var currentTimestamp = java.lang.System.currentTimeMillis();
	var expiration = flower[3]*3600*1000+currentTimestamp;
	var sql = "UPDATE memory_flowerpot p, memory_seedpackage s SET p.expiration=?, p.seedid=?, s.quantity=s.quantity-1 WHERE s.seedid=? and p.charid=s.charid and p.id=? and p.charid=?";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setLong(1, expiration);
	pstmt.setInt(2, flowerid);
	pstmt.setInt(3, flowerid);
	pstmt.setInt(4, flowerpotid);
	pstmt.setInt(5, charid);
	pstmt.executeUpdate();
	pstmt.close();
}

/*
	��ȡ����Ϣ
*/
function getFlowers() {
	return Array(
	//��ƷID���ȼ����۸񣬳���ʱ��(Сʱ),������Сֵ���������ֵ
		//�ָ���
		Array(2001532, 1, 150000, 10, 50,60), // ƻ�� - ��ɫƻ����\n�ָ�HPԼ30��
		Array(2001534, 1, 150000, 10, 50,60), // ���� - �������ĳ��ӡ�\n�ָ�MPԼ50��
		Array(2001535, 1, 150000, 10, 50,60), // ���� - �ǳ����ˮ����\n�ָ�MPԼ150��
		Array(2432392, 1, 1000000, 15, 3, 5), //����
		Array(4310088, 1, 1000000, 15, 15, 20), // - RED�� - ���С�RED�������ĺ�ɫǮ�ҡ�#c����RED�ر��̵������ڹ�����Ʒ��#
		Array(5050000, 2, 5000000, 18, 5, 8), //ϴ��
		Array(4310030, 2, 2000000, 18, 10, 15), // - �˶���� - �����ڴ�ׯ�е�NPC��³���ｻ���˶���װ����ר�þ���ȵ��˶���ҡ�
		//������
		Array(5121003, 3, 3000000, 22, 1, 2), // �μ��� - 15�����ڵ�ͼ�����н�ɫ����������+30��ħ��������+30����������Ҫ���͵���Ϣ��
		Array(5121004, 3, 3000000, 22, 1, 2), // �ɸ� - 15�����ڵ�ͼ�����н�ɫ����������+30��ħ��������+30����������Ҫ���͵���Ϣ��
		Array(5121005, 3, 3000000, 22, 1, 2), // ���� - 15�����ڵ�ͼ�����н�ɫ����������+30��ħ��������+30����������Ҫ���͵���Ϣ��
		Array(2432353, 4, 4000000, 24, 6, 10), //���ģ�ת������
		Array(5110000, 5, 3000000, 26, 1, 1), // �����ɿ���
		Array(2450020, 6, 6000000, 30, 1, 3), //
		Array(2614004, 6, 3000000, 33, 5,10), //ͻ��ʮ��֮ʯͷ
		//װ����������
		Array(4033356, 7, 3000000, 138, 1,1),
		Array(4000082, 7, 3000000, 58, 2, 5),
		Array(2431739, 8, 5000000, 38, 1, 2),
		Array(2450081, 9, 5000000, 52, 1, 2),
		//ħ����Ƭ
		Array(2430112, 11, 1000000,52, 5, 10),
		Array(2430481, 12, 1500000, 52, 5, 10),
		Array(2430915, 15, 1800000, 52, 5, 10),
		Array(2431893, 20, 3000000, 52, 5, 10)
	);
}

function getFlowerLevel(flowerid) {
	var flowers = getFlowers();
	for(var key in flowers) {
		if (flowers[key][0] == flowerid)
			return flowers[key][1];
	}
}

function getFlower(flowerid) {
	var flowers = getFlowers();
	for(var key in flowers) {
		if (flowers[key][0] == flowerid)
			return flowers[key];
	}
}

/*
	�����������
*/
function calcLevelUp(level) {
	var base = 10+level*level;
	return base;
}
/*
	�õ�����
*/
function gainPlantExp(flowerid) {
	var expNum=getFlowerLevel(flowerid)*10;
	var conn = cm.getConnection();
	var charid = cm.getPlayer().getId();
	var pstmt = null;
	if ((gardenData['exp']*1+expNum)>=calcLevelUp(gardenData['level'])) {
		var lastExp = (gardenData['exp']*1+expNum)-calcLevelUp(gardenData['level']);
		var sql = "UPDATE memory_garden SET exp=?, level=level+1 WHERE charid=?";
		pstmt = conn.prepareStatement(sql);
		pstmt.setLong(1, lastExp);
		pstmt.setInt(2, charid);
		pstmt.executeUpdate();
		pstmt.close();
		return -1;
	} else {
		var sql = "UPDATE memory_garden SET exp=exp+? WHERE charid=?";
		pstmt = conn.prepareStatement(sql);
		pstmt.setLong(1, expNum);
		pstmt.setInt(2, charid);
		pstmt.executeUpdate();
		pstmt.close();
		return expNum;
	}
	return 0;
}

/*
	�ڳ�����
*/
function clearFlowerPot(flowerpotid) {
	var charid = cm.getPlayer().getId();
	var sql = "UPDATE memory_flowerpot SET expiration=-1, seedid=NULL WHERE id=? and charid=?";
	cm.resetBossLog("��԰ʩ��"+flowerpotid);
	cm.resetBossLog("��԰��ˮ"+flowerpotid);
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, flowerpotid);
	pstmt.setInt(2, charid);
	pstmt.executeUpdate();
	pstmt.close();
}
/*
	��ˮʩ�ʲ���
*/
function Operations(flowerpotid, type) {
	var growUp = (type+1)*60*60*1000;
	var charid = cm.getPlayer().getId();
	var sql = "UPDATE memory_flowerpot SET expiration=expiration-? WHERE id=? and charid=?";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setLong(1, growUp);
	pstmt.setInt(2, flowerpotid);
	pstmt.setInt(3, charid);
	pstmt.executeUpdate();
	pstmt.close();
}

/*
	�õ���԰����
*/
function getGardenInfo() {
	var charid = cm.getPlayer().getId();
	var sql = "SELECT * FROM memory_garden WHERE charid = ? limit 1";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, charid);
	var data = pstmt.executeQuery();
	if (data.next()) {
		var info = Array();
		info['level']=data.getInt('level');
		info['exp']=data.getInt('exp');
		data.close();
		pstmt.close();
		return info;
	} else {
		sql = "INSERT INTO memory_garden(charid, level, exp) VALUES(?,1,0)";
		pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, charid);
		pstmt.executeUpdate();
		data.close();
		pstmt.close();
		return getGardenInfo();
	}
}

/*
	�õ���������
*/
function getFlowerPot() {
	var charid = cm.getPlayer().getId();
	var sql = "SELECT * FROM memory_flowerpot WHERE charid = ?";
	var conn = cm.getConnection();
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, charid);
	var data = pstmt.executeQuery();
	var result = Array();
	while (data.next()) {
		var info = Array();
		info['id']=data.getInt('id');
		info['seedid']=data.getInt('seedid');
		info['expiration']=data.getLong('expiration');
		result[info['id']]=info;
	}
	data.close();
	pstmt.close();
	if (result=="") {
		sql = "INSERT INTO memory_flowerpot(charid, seedid, expiration) VALUES(?,NULL,-1)";
		pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, charid);
		pstmt.executeUpdate();
		pstmt.close();
		return getFlowerPot();
	}
	return result;
}

/*
	ʱ��ת��
*/
function toDHM(seconds) {
	var days = Math.floor(seconds/86400);
	var hour = Math.floor(seconds%86400/3600);
	var minute = Math.floor(seconds%86400%3600/60);
	return Array(days,hour,minute);
}