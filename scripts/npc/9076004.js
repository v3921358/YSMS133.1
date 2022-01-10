/*
	内容：个人排行榜
*/

var status = -1;
var db;
var player;
function start() {
	action(1, 0, 0);
	 db = new mChar(cm.getC());
}


var mChar = function(client) {

    this.db = cm.getConnection();
    //获取积分
    this.getFishIntegral = function(player) {
        var ps = this.db.prepareStatement("SELECT dyjf FROM `characters` WHERE `id` = ?");
        ps.setInt(1, player.getId());
        var rs = ps.executeQuery();
        var key = 0;
        if (!rs.next()) return false;
        key = rs.getInt(1);
        rs.close();
        ps.close();
        return (key == '' || key == null) ? 0 : key;
    }
    //增加积分
    this.updateFishIntegral = function(numbers, player) {
        if (this.getFishIntegral(player) == false) {
            //原来无积分
            var ps = this.db.prepareStatement("UPDATE `characters` SET dyjf = ? WHERE `id` = ?");
            ps.setInt(1, 0);
            ps.setInt(2, player.getId());
            ps.executeUpdate();
            ps.close();
        }
        var ps = this.db.prepareStatement("UPDATE `characters` SET dyjf = ? WHERE `id` = ?");
        ps.setInt(1, numbers + this.getFishIntegral(player));
        ps.setInt(2, player.getId());
        ps.executeUpdate();
        ps.close();
        return;
    };
    this.get_Ranks = function(numbers, player) {
        var ps = this.db.prepareStatement("SELECT `name`,`dyjf`  FROM characters ORDER BY dyjf DESC LIMIT 0,30");
        var rs = ps.executeQuery();
        var result = "钓鱼排行榜前 #r#e" + numbers + " #n#k 名玩家:\r\n\r\n";
        var i = 1;
        while (rs.next() && i <= numbers) {
            result += "#b第 " + i + " 名：" + rs.getString(1) + "\t\t\t积分：" + rs.getString(2) + ".";
            result += "\r\n";
            i++;
        }
        if (!i) {
            result += "\r\n#b抱歉，暂时无玩家排行.";
        }
        rs.close();
        ps.close();
        return result;
    };
    //debug
    this.debug = function(str) {
        org.slf4j.LoggerFactory.getLogger(this).info(str);
    };
};

function action(mode, type, selection) {
	player = cm.getPlayer();
	if (mode == 0) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		var text = "#e请选择要查询的榜单：#r\r\n";
		//text += "\t\t\t#L2#本月充值排行榜#l\r\n";
		text += "\t\t\t#L0#世界等级排行榜#l\r\n";
		text += "\t\t\t#L4#世界富豪排行榜#l\r\n";
		text += "\t\t\t#L5#种植高手排行榜#l\r\n";
		text += "\t\t\t#L1#魅力宝贝排行榜#l\r\n";
		text += "\t\t\t#L3#十大家族排行榜#l\r\n";
		//text += "\t\t\t#L7#钓鱼分数排行榜#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		if (selection == 0) {
			//var list = cm.getRankingTopInstance().getLevelRank().iterator();
			var conn = cm.getConnection();
			var sql = "select name,level,gender,reborns1 from characters where gm<=0 order by reborns1 desc, level desc, exp desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var result = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d★ 个人等级排行 ★#k#n\r\n\r\n";
			text += "\t#e名次#n\t#e玩家昵称#n\t\t\t#e等级#n\t\t\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!result.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// 填充名字空格
				text += result.getString("name");
				for (var j = 16 - result.getString("name").getBytes().length; j > 0 ; j--) {
					text += " ";
				}
				text += "\t " + result.getString("level");
				
				//text += "\t\t\t " + result.getString("reborns1")+"#k";

				text += "\r\n";
			}
			result.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 1) {
			var conn = cm.getConnection();
			var sql = "select name,fame,gender from characters where gm<=0 order by fame desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var list = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d★ 魅力宝贝排行 ★#k#n\r\n\r\n";
			text += "\t#e名次#n\t#e玩家昵称#n\t\t  #e人气#n\t\t  #e称号#n\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!list.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// 填充名字空格
				text += list.getString("name");
				for (var j = 16 - list.getString("name").getBytes().length; j > 0; j--) {
					text += " ";
				}

				// 填充人气度
				text += "\t " + list.getInt("fame");
				var famevalues = list.getInt("fame");
				var famelength = 0;
				while (famevalues > 0) {
					famevalues = Math.floor(famevalues/10);
					famelength += 1;
				}
				for (var j = 8 - famelength; j > 0; j--) {
					text += " ";
				}

				if (i == 1) {
					if (list.getInt("gender") == 0) {
						text += " ★世界偶像★#k";
					} else {
						text += " ★魅力宝贝★#k";
					}
				} else if (i == 2) {
					text += "\t #k";
				} else if (i == 3) {
					text += "\t #k";
				}
				text += "\r\n";
			}
			list.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 2) {
			cm.dispose();
			cm.openNpc(9310373, 1);
		} else if (selection == 3) {
			var conn = cm.getConnection();
			var sql = "select c.name as leadername, g.name from characters c, guilds g where g.leader=c.id order by g.gp desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var list = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d★ 十大家族排行 ★#k#n\r\n\r\n";
			text += "\t#e名次#n\t#e家族名称#n\t\t    #e族长#n\t\t\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!list.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// 填充名字空格
				text += list.getString("name");
				for (var j = 16 - list.getString("name").getBytes().length; j > 0; j--) {
					text += " ";
				}

				// 填充族长名称
				text += "\t " + list.getString("leadername");
				var leadername = list.getString("leadername");
				
				for (var j = 16 - list.getString("leadername").getBytes().length; j > 0; j--) {
					text += " ";
				}

				
					text += "\t #k";
				
				text += "\r\n";
			}
			list.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 4) {
			var conn = cm.getConnection();
			var sql = "select c.name, (c.meso+b.money*100000000) as totalmoney from characters c,bank b where b.charid=c.id order by totalmoney desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var list = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d★ 世界富豪排行 ★#k#n\r\n\r\n";
			text += "\t#e名次#n\t#e玩家昵称#n\t\t  #e资产#n\t\t  #e称号#n\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!list.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// 填充名字空格
				text += list.getString("name");
				for (var j = 16 - list.getString("name").getBytes().length; j > 0; j--) {
					text += " ";
				}

				// 填充资产
				var zc = "≌"+(list.getLong("totalmoney")/100000000).toFixed(2)+"亿";
				text += "  " + zc;
				var totalmoney = list.getLong("totalmoney");
				var totalmoneylength = 0;
				while (totalmoney > 0) {
					totalmoney = Math.floor(totalmoney/10);
					totalmoneylength += 1;
				}
				for (var j = 8 - totalmoneylength; j > 0; j--) {
					text += " ";
				}

				
				text += "#k\r\n";
			}
			list.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		} else if (selection == 5) {
			var conn = cm.getConnection();
			var sql = "select c.name,g.level from characters c, memory_garden g where c.gm<=0 and c.id=g.charid order by g.level desc, g.exp desc limit 10;";
			var pstmt = conn.prepareStatement(sql);
			var result = pstmt.executeQuery();
			var text = "\t\t\t\t#e#d★ 种植高手排行 ★#k#n\r\n\r\n";
			text += "\t#e名次#n\t#e玩家昵称#n\t\t#e花园等级#n\t\t #e称号#n\r\n";
			for (var i = 1; i <= 10; i++) {
				if (!result.next()) {
					break;
				}
				if (i == 1) {
					text += "#r";
				} else if (i == 2) {
					text += "#g";
				} else if (i == 3) {
					text += "#b";
				}
				text += "\t " + i + "\t\t ";
				
				// 填充名字空格
				text += result.getString("name");
				for (var j = 16 - result.getString("name").getBytes().length; j > 0 ; j--) {
					text += " ";
				}
				text += "\t " + result.getString("level");
				if (i == 1) {
					text += "\t\t ★天工开物★#k";
				} else if (i == 2) {
					text += "\t\t ★妙手回春★#k";
				} else if (i == 3) {
					text += "\t\t ★熟能生巧★#k";
				}
				text += "\r\n";
			}
			result.close();
			pstmt.close();
			cm.sendOkS(text, 3);
			cm.dispose();
		}else if(selection == 7){
			//cm.dispose();
			cm.openNpc(1511001,1);
			//cm.sendOkS(db.get_Ranks(30, player), 2);
            cm.dispose();
		}
	}
}