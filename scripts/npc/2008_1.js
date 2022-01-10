function start() {
cm.gainItem(3010145, 1);// 周年庆水晶枫叶椅子
			cm.gainItem(2430241, 1);//可爱新手礼物套装
                        cm.gainItem(2431090, 1);//拍卖箱子
                        cm.gainMeso(100000);
	var ii = cm.getItemInfo();					
	var toDrop = ii.randomizeStats(ii.getEquipById(1142144)).copy(); // 生成一个Equip类             
	toDrop.setStr(5); //装备力量
	toDrop.setDex(5); //装备敏捷
	toDrop.setInt(5); //装备智力
	toDrop.setLuk(5); //装备运气	
	toDrop.setHp(200);
	toDrop.setMp(200);
	toDrop.setMatk(5); //魔法攻击
	toDrop.setWatk(5); //物理攻击 
	//toDrop.setWdef(100);//物理防御
	//toDrop.setMdef(100);//魔法防御
	//toDrop.setAcc(20);//命中
	//toDrop.setAvoid(20);//回避
	//toDrop.setSpeed(20);//移动速度
	//toDrop.setJump(20);//跳跃
	toDrop.setEnhance(25);
	toDrop.setOwner("冬冬25星神器");
	cm.addFromDrop(cm.getC(), toDrop, false);
	cm.gainItem(2430241, 1);
	cm.gainItem(2431305, 1);
	cm.gainMeso(100000);
	cm.warp(50000, 0);
	cm.sendOk("#d欢迎来到 #r冬冬冒险岛#k #d,先来大概了解一下本服特色：\r\n\r\n#b· 本服为仿官方模式  经验10倍  金币10倍  爆率10倍\r\n· 主菜单在拍卖按钮(频道上面),和商城按钮 提供各种便捷服务\r\n· 拍卖处的游戏商店分类很多种，详情请看说明。\r\n· 各种特色组队副本以及BOSS副本。\r\n· 为帮助您能顺利成长,我们准备了新手礼包给您\r\n· 如果真心不会请加我们的玩家交流群：#e#r12345678#n#k");
	cm.worldSpouseMessage(0x15,"『彗星撞地球』：恭喜玩家 "+ cm.getChar().getName() +" 被彗星砸到了 冬冬冒险岛。热烈祝贺他(她)吧。");
	cm.worldSpouseMessage(0x15,"『彗星撞地球』：恭喜玩家 "+ cm.getChar().getName() +" 被彗星砸到了 冬冬冒险岛。热烈祝贺他(她)吧。");
	cm.worldSpouseMessage(0x15,"『彗星撞地球』：恭喜玩家 "+ cm.getChar().getName() +" 被彗星砸到了冬冬冒险岛。热烈祝贺他(她)吧。");
	cm.dispose();
}