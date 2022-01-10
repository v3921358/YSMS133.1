var icon = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var icon2 = "#fUI/Basic.img/BtMin2/normal/0#";
var typed=1;
var cost = 10;
var inventoryType=1;
var item=null;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	if (status == 0) {
		//expiredate
		var text="你好，在我这里可以进行装备次数增加，将装备可升级次数+1#k，（最高上限10次）使用前请将要升级的道具放在#e#d装备栏的第一格#n。\r\n#b";
		text+="#L1#"+icon2+" 使用说明#l\r\n";
		text+="#L2#"+icon2+" 开始升级#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1){
		if (selection == 1) {
			typed=1;
			status = -1;
			var text="将道具升级次数加一（最高上限10次），使用前请将要升级的道具放在装备栏的第一格，现金道具不可升级。升级将消耗点卷进行。";
			cm.sendSimple(text);
		} else if (selection == 2) {
			typed=2;
			item = cm.getInventory(1).getItem(1);
			if (item==null) {
				cm.sendOk("你确认你包裹的第一栏有装备存在？");
				cm.dispose();
				return;
			}
			//if (item.getOwner().indexOf("★")>=0) {
			//	cm.sendOk("提升过品级的装备无法升级。");
			//	cm.dispose();
			//	return;
			//}
			//cost = cost*cm.getReqLevel(item.getItemId())*135;
			cost=200000*1.5;
			var text="这将花费掉你#r"+cost+"#k的点卷为你的装备进行升级，还原前请注意以下几点：\r\n\r\n#r1.请确认需要升级砸卷次数的装备已经放置在装备栏的第一格\r\n2.砸卷次数升级是个不可逆的操作，无法进行恢复\r\n3.玩家所造成的失误不予以赔偿\r\n\r\n#k是否继续？";
			cm.sendYesNo(text);
		} 
 	}  else if (status == 2) {
		if (cm.getPlayer().getCSPoints(1) < cost) {
			cm.sendOk("你好像没有#r"+cost+"#k点卷。");
			cm.dispose();
			return;
		}
		//var item = cm.getInventory(1).getItem(1);
		
		if (cm.isCash(item.getItemId())) {
			cm.sendOk("只有非现金道具才能进行次数升级");
			cm.dispose();
			return;
		}
		var deleteQuantity = item.getQuantity();
		var ii = cm.getItemInfo();					
		var toDrop = ii.randomizeStats(ii.getEquipById(item.getItemId())).copy(); // 生成一个Equip类
		if((item.getUpgradeSlots()+item.getLevel())>=10)
		{
			cm.sendOk("最高可升级10次。");
			cm.dispose();
			return;
		}
				    toDrop.setOwner(item.getOwner());
					toDrop.setStr(item.getStr());
					toDrop.setDex(item.getDex());
					toDrop.setInt(item.getInt());
					toDrop.setLuk(item.getLuk());
					toDrop.setHp(item.getHp());
					toDrop.setMp(item.getMp());
					toDrop.setWatk(item.getWatk());
					toDrop.setMatk(item.getMatk());
					toDrop.setWdef(item.getWdef());
					toDrop.setMdef(item.getMdef());
					toDrop.setAcc(item.getAcc());
					toDrop.setAvoid(item.getAvoid());
					toDrop.setHands(item.getHands());
					toDrop.setSpeed(item.getSpeed());
					toDrop.setJump(item.getJump());
					toDrop.setUpgradeSlots(item.getUpgradeSlots());
					toDrop.setViciousHammer(item.getViciousHammer());
					toDrop.setLevel(item.getLevel());
					toDrop.setState(item.getState());
					toDrop.setEnhance(item.getEnhance());
					toDrop.setLimitBreak(item.getLimitBreak());
					toDrop.setPotential1(item.getPotential1());
					toDrop.setPotential2(item.getPotential2());
					toDrop.setPotential3(item.getPotential3()); 
					toDrop.setPotential4(item.getPotential4());
					toDrop.setPotential5(item.getPotential5());
					toDrop.setPotential6(item.getPotential6());
					toDrop.setExpiration(item.getExpiration()); 
					toDrop.setUpgradeSlots(item.getUpgradeSlots()+1);
		cm.removeSlot(1, 1, deleteQuantity);		
		
		
		//toDrop.setEnhance(5);
		cm.addFromDrop(cm.getC(), toDrop, false);
	
		//cm.gainNX(-cost);
		//cm.sendOk(item.getUpgradeSlots());
		cm.gainNX(-cost);
		cm.sendOk("次数升级成功了。");
		cm.worldSpouseMessage(0x20, "[我要变强] : 恭喜 " + cm.getChar().getName() + " 成功给装备增加了升级次数！！！.");
		cm.dispose();
	}
}
