/*  500元奖励 */

function start() {
	im.gainItem(2431275, -1);
	var ii = im.getItemInfo();
	var toDrop = ii.randomizeStats(ii.getEquipById(1112164)).copy(); // 生成一个Equip类                    
	toDrop.setStr(30); //装备力量
	toDrop.setDex(30); //装备敏捷
	toDrop.setInt(30); //装备智力
	toDrop.setLuk(30); //装备运气
	toDrop.setMatk(30); //物理攻击
	toDrop.setWatk(30); //魔法攻击 
	im.addFromDrop(im.getC(), toDrop, false);
	var ii = im.getItemInfo();
	var toDrop = ii.randomizeStats(ii.getEquipById(1112276)).copy(); // 生成一个Equip类                    
	toDrop.setStr(30); //装备力量
	toDrop.setDex(30); //装备敏捷
	toDrop.setInt(30); //装备智力
	toDrop.setLuk(30); //装备运气
	toDrop.setMatk(30); //物理攻击
	toDrop.setWatk(30); //魔法攻击 
	im.addFromDrop(im.getC(), toDrop, false);	
        im.dispose(); 
}