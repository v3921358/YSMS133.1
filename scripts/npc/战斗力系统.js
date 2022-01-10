var status = -1;
var fighting = 0;

function start() {
	init();
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status >= 0) {
			cm.dispose();
			return;
		}
		status--;
	}
	if (status == 0) {
		//fighting = getMyFighting();
		cm.sendOk("您的战斗力为："+fighting);
		cm.dispose();
	}
}
//初始化 
function init() {
	fighting = getMyFighting();
	playerUpdate();
}
//更新战斗力
function playerUpdate() {
	newPlayer();
	var id = cm.getPlayer().getId();
	var conn = cm.getConnection();
	var sql = "update memory_fighting set fighting = ? where charid = ?";
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, fighting);
	pstmt.setInt(2, id);
	//pstmt.setInt(3, 0);
	pstmt.executeUpdate();
	pstmt.close();
}
//新增战斗力
function newPlayer() {
	if (!playerExists()) {
		var ranking = getMyRanking();
		var id = cm.getPlayer().getId();
		var conn = cm.getConnection();
		var sql = "insert into memory_fighting(charid, fighting, ranking) values(?,?,?);";
		var pstmt = conn.prepareStatement(sql);
		pstmt.setInt(1, id);
		pstmt.setInt(2, fighting);
		pstmt.setInt(3, ranking);
		pstmt.executeUpdate();
		pstmt.close();
	}
}
//计算排名
function getMyRanking() {
	var baseRanking = 1;
	var id = cm.getPlayer().getId();
	var conn = cm.getConnection();
	var sql = "select ranking,charid,fighting from memory_fighting order by ranking limit 100";
	var pstmt = conn.prepareStatement(sql);
	var result = pstmt.executeQuery();
	var preRanking = 1;
	var count = 0;
	var isDo = false;
	while(result.next()) {
		count++;
		var currentRanking = result.getInt("ranking");
		if (currentRanking-preRanking > 1) {
			if (fighting >= result.getInt("fighting")) {
				isDo = true;
				baseRanking = preRanking + 1;
				break;
			}
		}
		preRanking = currentRanking;
	}
	if (!isDo) 
		baseRanking = count+1;
	result.close();
	pstmt.close();
	return baseRanking;
}
//检查是否存在
function playerExists() {
	var flag = false;
	var id = cm.getPlayer().getId();
	var conn = cm.getConnection();
	var sql = "select count(id) as c from memory_fighting where charid = ?";
	var pstmt = conn.prepareStatement(sql);
	pstmt.setInt(1, id);
	var result = pstmt.executeQuery();
	if (result.next()) {
		if (result.getInt("c")>0)
			flag = true;
	}
	result.close();
	pstmt.close();
	return flag
}
//获得战斗力
function getMyFighting() {
	var position = -1;
	var inventoryType = -1;
	var list = cm.getInventory(inventoryType).list();
	var itemList = list.iterator();
	var baseAttr = 0;
	var watk=0;
	var matk=0;
	var wdef=0;
	var mdef=0;
	//var hp=0;
	var acc=0;
	var avoid=0;
	var limitBreak=0;
	var fighting = 0;
	while (itemList.hasNext()) {
		var item = itemList.next();
		baseAttr+=item.getStr()+item.getDex()+item.getLuk()+item.getInt();
		watk+=item.getWatk();
		matk+=item.getMatk();
		wdef+=item.getWdef();
		mdef+=item.getMdef();
		acc+=item.getAcc();
		avoid+=item.getAvoid();
		//hp+=item.getHp();
		limitBreak+=item.getLimitBreak();
		if (item.getPotential1()>0)
			fighting+=Math.floor(item.getPotential1()/100);
		if (item.getPotential2()>0)
			fighting+=Math.floor(item.getPotential2()/100);
		if (item.getPotential3()>0)
			fighting+=Math.floor(item.getPotential3()/100);
		if (item.getPotential4()>0)
			fighting+=Math.floor(item.getPotential4()/100);
		if (item.getPotential5()>0)
			fighting+=Math.floor(item.getPotential5()/100);
		if (item.getPotential6()>0)
			fighting+=Math.floor(item.getPotential6()/100);
			
	}
	var maxHp = cm.getPlayerStat('MAXHP');
	baseAttr += cm.getPlayerStat('STR')+cm.getPlayerStat('DEX')+cm.getPlayerStat('LUK')+cm.getPlayerStat('INT');
	fighting += baseAttr*5+(watk+matk)*50+(wdef+mdef)*20+acc*10+avoid*10+cm.getLevel()*40+maxHp/100;
	fighting = Math.floor(fighting);
	return fighting;
}
//获取战力排行榜
function getRanking() {
	var baseRanking = 1;
	var id = cm.getPlayer().getId();
	var conn = cm.getConnection();
	var sql = "select m.fighting, c.name from memory_fighting m, characters c where c.id=m.charid order by m.ranking limit 100";
	var pstmt = conn.prepareStatement(sql);
	var result = pstmt.executeQuery();
	var preRanking = 1;
	var count = 0;
	var rankingArr = Array();
	while(result.next()) {
		rankingArr.push(Array(result.getString("name"), result.getInt("fighting")));
	}
	result.close();
	pstmt.close();
	return rankingArr;
}