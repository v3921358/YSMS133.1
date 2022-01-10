var status = -1;
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var uiFPaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";
var uiFRock = "#fUI/UIWindow.img/RpsGame/Frock#";
var uiFScissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var uiPaper = "#fUI/UIWindow.img/RpsGame/paper#";
var uiRock = "#fUI/UIWindow.img/RpsGame/rock#";
var uiScissor = "#fUI/UIWindow.img/RpsGame/scissor#";
var textArr = Array("����","����","��");
var FpictureArr=Array(uiFRock, uiFScissor, uiFPaper);
var pictureArr=Array(uiRock, uiScissor, uiPaper);
var postPoints = 0;
var typed=0;
var myHsc;
var lists = null;
var enemy = null;
var beDelete = Array();
var winPoints= 0;
function start() {
	
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 1) {
			status = 1;
			//return;
		} else {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		var text =head+"����������ƾ�Լ���ʵ��Ӯȡ����𣿿�����ȭ�ɣ�\r\n";
		text+="#L4##r[���]��ȭ��ս��˵��#l#b\r\n\r\n";
		text+="#L0#"+icon+" ��������ս#l\r\n";
		text+="#L1#"+icon+" �鿴��ս�б�#l\r\n";
		text+="#L2#"+icon+" �鿴�ҷ������ս#l\r\n";
		//text+="#L3#"+icon+" �����ҵ���ս#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		typed = selection;
		if (selection == 0) {
			var text = "��������ҪͶע�Ľ�";
			cm.sendGetNumber(text, 0, 5000, 99999);
		} else if (selection == 1) {
			var text = "";
			myHsc = new Hsc();
			lists = myHsc.list();
			if (lists == null) {
				cm.sendSimple("��ʱû�������˷�����ս��");
				status = -1;
			} else {
				typed = 999;
				text = "#d#e< ���ڻ��Ƚ����е���ս >#n#k\r\n";
				for(var key in lists) {
					var id = lists[key]['id'];
					var sponsorname = lists[key]['sponsorname'];
					var points = lists[key]['points'];
					text+="#L"+key+"##b[���"+id+"]#k ��ս��#r"+sponsorname+"#k��\t�ͽ�#r"+points+"#k��#l\r\n";
				}
				cm.sendSimple(text);
				//cm.dispose();
			}
		} else if (selection == 2) {
			typed = 888;
			var text = "#e#d����ս�����£�#n#k\r\n";
			myHsc = new Hsc();
			battles = myHsc.getMyBattles();
			if (battles==null) {
				cm.sendSimple("���޼�¼");
				status = -1;
				return ;
			}
			winPoints = 0;
			var bj = 0;
			for(var key in battles) {
				var id = battles[key]['id'];
				var sponsorname = battles[key]['sponsorname'];
				var points = battles[key]['points'];
				var challengername = battles[key]['challengername'];
				var spunchway = battles[key]['spunchway'];
				var cpunchway = battles[key]['cpunchway'];
				text+="#b[���"+id+"]#k ���ʡ�#r"+points+"#k��";
				beDelete.push(id);
				var result = spunchway - cpunchway;
				if (result == -1 || result == 2) {
					//win
					bj+=points;
					winPoints += points;
					text+="#b��Ӯ��#k";
				} else if (result == 0) {
					//tie
					bj+=points;
					text+="#d��ƽ��#k";
				} else {
					text+="#r���䡿#k"
				}
				text+="\r\n";
			}
			winPoints = Math.floor(winPoints*0.9)+bj;
			text+="��Ӯ�ĵ��"+winPoints+"�����#b#e��һ��#n#k��ȡ���\r\n";
			cm.sendSimple(text);
		} else if (selection == 3) {
			var text = "";
			myHsc = new Hsc();
			lists = myHsc.getMyList();
			if (lists == null) {
				cm.sendSimple("��ʱ���Գ��ص���ս��");
				status = -1;
			} else {
				typed = 777;
				text = "#d#e< ���������Ч��ս�б� >#n#k\r\n";
				winPoints = 0;
				beDelete = Array();
				for(var key in lists) {
					var id = lists[key]['id'];
					var sponsorname = lists[key]['sponsorname'];
					var points = lists[key]['points'];
					var spunchway = lists[key]['spunchway'];
					beDelete.push(id);
					winPoints+=points;
					text+="#L"+key+"##b[���"+id+"]#k \t�ͽ�#r"+points+"#k�� ���У���#b"+textArr[spunchway]+"#k��#l\r\n";
				}
				text+="\r\n���#b#e��һ��#n#k������������Ч��ս�б������Եõ�"+winPoints+"����粻�볷�أ�����#b�����Ի�#k";
				cm.sendSimple(text);
				//cm.dispose();
			}
		}else if (selection == 4) {
			var text = "#d#e<��������ս>#n#k\r\n";
			text+="\t���[#b"+icon+" ��������ս#k]���Է�������ս������Ҫ#r5000#k�����Ϊ�ͽ�����ѡ��#b���ӡ���������#k��Ϊ�����ȭ�У�������ɺ������ս��Ϣ�������б����ʽ��ʾ��#b#e��ս�б�#b#k\r\n";
			text+="#d#e<������ս>#n#k\r\n";
			text+="\t���[#b"+icon+" �鿴��ս�б�#k]���Խ�����ս����ս�б��л���ʾ�����˵Ľ�ɫ����������ͽ𣬵���б���Ŀ������ս������ѡ��#b���ӡ���������#k��Ϊ�����ȭ�У������Ӯ��ʤ��ʱ���Ի���ͽ��90%��Ϊ��������������ˣ���ʧȥ�ͽ��100%��\r\n";
			text+="#d#e<��ȡ�ͽ�>#n#k\r\n";
			text+="\t���[#b"+icon+" �鿴�ҷ������ս#k]���Կ��������������ս�ı������������ȡ��Ӧ���ͽ�\r\n";
			text+="#d#e<������ս>#n#k\r\n";
			text+="\t���[#b"+icon+" �����ҵ���ս#k]���Գ�������������δ���˲������ս��Ŀ�����ҷ���100%�ͽ�\r\n";
			cm.sendSimple(text);
			status = -1;
		}
	} else if (status == 2) {
		if (typed == 888 || typed == 777) {
			var text = "��ϲ�㣬�ɹ���ȡ��#r"+winPoints+"#k���";
			if (typed == 777)
			{
				text = "������ս�ɹ�����ȡ��#r"+winPoints+"#k���";
			}
			cm.gainNX(winPoints);
			myHsc = new Hsc();
			myHsc.del(beDelete);
			beDelete = Array();
			cm.sendOk(text);
			cm.dispose();
		} else {
			myHsc = new Hsc();
			var validCount = myHsc.checkValidCount();
			var text = "#d#e[�����µ���ս]#n#k\r\n��ѡ����Ҫ����ֳ���ȭ��\r\n";
			if (typed == 999) {
				enemy = lists[selection];
				points=enemy['points'];
				if (cm.getPlayer().getCSPoints(1) < points) {
					cm.sendSimple("��������Ҫ#r"+points+"#k����ſ���������ս��");
					status =-1;
					return;
				}
				text = "#d#e[������#b"+enemy['sponsorname']+"#d��ս]#n#k\r\n���ɣ�ѡһ��ȭ����ƴһƴ��\r\n";
			} else {
				if (validCount>=5) {
					cm.sendSimple("���Ѿ�������#r5#k����ս��δ��ᣬ�޷�����������ս��������ѡ��#b������ս#k����#b��ս����#k����Ȼ��Ҳ����ѡ��#r������ս#k���ջص��");
					status = -1;
					return;
				}
				postPoints = selection;
				if (cm.getPlayer().getCSPoints(1) < postPoints) {
					cm.sendSimple("��û��#r"+postPoints+"����޷�������ս#k��");
					status =-1;
					return;
				}
			}
			text+="#L0#"+uiFRock+"#l";
			text+="#L1#"+uiFScissor+"#l";
			text+="#L2#"+uiFPaper+"#l";
			cm.sendSimple(text);
		}
	} else if (status == 3) {
		if (typed == 999) {
			//��ս���
			myHsc = new Hsc();
			var myHand = selection;
			var id = enemy['id'];
			var enemyHand = enemy['spunchway'];
			var result =  myHand - enemyHand;
			var isSuccess = myHsc.update(id, myHand);
			if (!isSuccess) {
				cm.sendOk("�����Ѿ�����������һ���������һ����������ɡ�");
				cm.dispose();
				return;
			}
			var resultPic = FpictureArr[myHand]+" "+pictureArr[enemyHand];
			if (result == -1 || result == 2) {
				//win
				var points = Math.floor(enemy['points']*0.9);
				cm.gainNX(points);
				cm.sendOk("���Ǻ�ȭ����Ӯ��#r"+points+"#k��������ұ�����ս�ɣ���\r\n"+resultPic);
				cm.worldMessage(0x19, "[�ͽ�ȭ��] : ��ϲ " + cm.getName() + " Ӯȡ�� "+enemy['sponsorname']+" �� " + points + " ���");
				cm.dispose();
			} else if (result == 0) {
				//tie
				cm.sendOk("��~�����ƽ�֣������ұ�����ս�ɣ���\r\n"+resultPic);
				cm.dispose();
			} else {
				//lose
				var points = enemy['points'];
				cm.gainNX(-points);
				cm.sendOk("�����ˣ�����#r"+points+"#k�������ģ������ұ�����ս�ɣ���\r\n"+resultPic);
				cm.worldMessage(0x19, "[�ͽ�ȭ��] : ��ϲ " + enemy['sponsorname'] + " Ӯȡ�� "+cm.getName()+" �� " + points + " ���");
				cm.dispose();
			}
		} else if (typed == 0) {
			myHsc = new Hsc();
			var punchway = selection;
			cm.gainNX(-postPoints);
			if (myHsc.post(selection, postPoints)) {
				cm.worldMessage(0x19, "[�ͽ�ȭ��] : ��� " + cm.getName() + " ��" + postPoints + "���������ս��˭����֮һս����");
				cm.sendOk("����#r"+postPoints+"#k�����ͽ��ȭ�ɹ��������ĵȴ�������ս��");
				cm.dispose();
			} else {
				cm.sendOk("��ȭʧ�ܣ�����δ֪��������ϵ����Ա");
				cm.dispose();
			}
		}
	}
}

var Hsc = function() {
	this.db = cm.getConnection();
	
	//��������ս
	this.post = function(punchway, points) {
		var sql = "insert into memory_hsc(sponsor, spunchway, points, postedtime) values(?,?,?,?)";
		var pstmt = this.db.prepareStatement(sql);
		var currentTimeStamp = java.lang.System.currentTimeMillis();
		pstmt.setInt(1, cm.getPlayer().getId());
		pstmt.setInt(2, punchway);
		pstmt.setInt(3, points);
		pstmt.setLong(4, currentTimeStamp);
		var result = false;
		if (pstmt.executeUpdate()) {
			result = true;
		}
		pstmt.close();
		return result;
	}
	
	this.checkValidCount = function() {
		var sql = "select count(id) as validcount from memory_hsc where sponsor = ? and postedtime >= ? ";
		var pstmt = this.db.prepareStatement(sql);
		var currentTimeStamp = java.lang.System.currentTimeMillis();
		var endTimeStamp = currentTimeStamp-12*3600*1000;
		pstmt.setInt(1, cm.getPlayer().getId());
		pstmt.setLong(2, endTimeStamp);
		var rs = pstmt.executeQuery();
		var lists = Array();
		var count = 0;
		if (rs.next())
			count = rs.getInt("validcount");
		rs.close();
		pstmt.close();
		return count;
	}
	
	//��ȡ��Ч��ս�б�
	this.list = function(){
		//var sql = "select h.*, c1.name as sponsorname, c2.name as challengername from memory_hsc h, characters c1, characters c2 where sponsor != ? and postedtime >= ? and h.sponsor = c1.id and h.challenger=c2.id order by id desc";
		var sql = "select h.*, c.name as sponsorname from memory_hsc h, characters c where h.sponsor != ? and h.postedtime >= ? and h.sponsor = c.id and h.challenger=-1 order by rand() desc limit 50";
		var pstmt = this.db.prepareStatement(sql);
		var currentTimeStamp = java.lang.System.currentTimeMillis();
		var endTimeStamp = currentTimeStamp-12*3600*1000;
		pstmt.setInt(1, cm.getPlayer().getId());
		pstmt.setLong(2, endTimeStamp);
		var rs = pstmt.executeQuery();
		var lists = Array();
		while(rs.next()) {
			var data = Array();
			data['id']=rs.getInt("id");
			data['sponsor']=rs.getInt("sponsor");
			data['spunchway']=rs.getInt("spunchway");
			data['points']=rs.getInt("points");
			data['sponsorname']=rs.getString("sponsorname");
			//data['']
			lists.push(data);
		}
		rs.close();
		pstmt.close();
		if (lists.length>0)
			return lists;
		else
			return null;
	}
	
	//��ȡ�ҵ�δ�н������ս�б�
	this.getMyList = function(){
		var sql = "select h.*, c.name as sponsorname from memory_hsc h, characters c where h.sponsor = ? and h.sponsor = c.id and h.challenger=-1 order by rand() desc limit 50";
		var pstmt = this.db.prepareStatement(sql);
		var currentTimeStamp = java.lang.System.currentTimeMillis();
		var endTimeStamp = currentTimeStamp-12*3600*1000;
		pstmt.setInt(1, cm.getPlayer().getId());
		var rs = pstmt.executeQuery();
		var lists = Array();
		while(rs.next()) {
			var data = Array();
			data['id']=rs.getInt("id");
			data['sponsor']=rs.getInt("sponsor");
			data['spunchway']=rs.getInt("spunchway");
			data['points']=rs.getInt("points");
			data['sponsorname']=rs.getString("sponsorname");
			//data['']
			lists.push(data);
		}
		rs.close();
		pstmt.close();
		if (lists.length>0)
			return lists;
		else
			return null;
	}
	
	//����ս�����
	this.update = function(id,cpunchway) {
		var sql = "update memory_hsc set challenger = ?, cpunchway = ? where id = ? and challenger=-1";
		var pstmt = this.db.prepareStatement(sql);
		//var currentTimeStamp = java.lang.System.currentTimeMillis();
		pstmt.setInt(1, cm.getPlayer().getId());
		pstmt.setInt(2, cpunchway);
		pstmt.setInt(3, id);
		//pstmt.setLong(4, currentTimeStamp);
		var result = false;
		if (pstmt.executeUpdate()) {
			result = true;
		}
		pstmt.close();
		return result;
	}
	
	//��ȡ�ҵ�ս��
	this.getMyBattles = function(){
		var sql = "select h.*, c1.name as sponsorname, CASE h.challenger WHEN -1 then h.challenger ELSE c2.name end as challengername from memory_hsc h, characters c1, characters c2 where h.sponsor = ? and h.sponsor = c1.id and h.challenger=c2.id order by h.id desc";
		//var sql = "select h.*, c.name as sponsorname from memory_hsc h, characters c where h.sponsor != ? and h.postedtime >= ? and h.sponsor = c.id and h.challenger=-1 order by id desc";
		var pstmt = this.db.prepareStatement(sql);
		pstmt.setInt(1,cm.getPlayer().getId());
		var rs = pstmt.executeQuery();
		var lists = Array();
		while(rs.next()) {
			var data = Array();
			data['id']=rs.getInt("id");
			data['sponsor']=rs.getInt("sponsor");
			data['spunchway']=rs.getInt("spunchway");
			data['points']=rs.getInt("points");
			data['sponsorname']=rs.getString("sponsorname");
			data['challengername']=rs.getString("challengername")
			data['cpunchway']=rs.getString("cpunchway");
			lists.push(data);
		}
		rs.close();
		pstmt.close();
		if (lists.length>0)
			return lists;
		else
			return null;
	}
	
	//ɾ������
	this.del = function(ids) {
		var idStr = "";
		for(var key in ids) {
			ids[key]=parseInt(ids[key]);
			idStr+=ids[key]+",";
		}
		idStr=idStr.substring(0,idStr.length-1);
		var sql = "delete from memory_hsc where id in ("+idStr+") and sponsor = ?";
		var pstmt = this.db.prepareStatement(sql);
		//var currentTimeStamp = java.lang.System.currentTimeMillis();
		pstmt.setInt(1, cm.getPlayer().getId());
		//pstmt.setLong(4, currentTimeStamp);
		var result = false;
		if (pstmt.executeUpdate()) {
			result = true;
		}
		pstmt.close();
		return result;
	}
	
}