var status = 0;
var grade = Array(
	"★普通★",
	"★精致★",
	"★无暇★",
	"★灵动★",
	"★纯洁★"
);
var gradePrice = Array(20,40,80,240,600);
var itemSlot = Array(
	Array('武器', 1212063),
//	Array('副武器', 1)
	Array('帽子', 1003797),
	Array('披风', 1102275),
	Array('上衣',1042254),
	Array('裤子',1062166),
	Array('长袍',1052314),
	Array('手套',1082299),
	Array('鞋子',1072485)
);
var recordGrade = 0;
var recordSlot = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	//java.lang.System.out.println(mode +" "+status);
    if (mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
		var text = "你想要变的更强吗？在这里可以购买具有品级的合成副装。\r\n";
		text+="#r#L1#什么是合成副装？#l\r\n\r\n";
		text+="#r#L2#我要选购合成副装！#l\r\n";
		cm.sendSimple(text);
    } else if (status == 1) {
		if (selection==1) {
			var text="#d#e什么是合成副装？#n#k\r\n\t合成副装仅用于提升品级使用，您可以选择对应部位以及您需要的品级的合成副装，目前只出售的副装可以对140、150、160进行合成，所购买的装备均无任何属性，只做合成副装使用。\r\n";
			text+="\r\n#d#e合成副装的价格：#n#k\r\n";
			for(var key in grade) {
				text+="#b"+grade[key]+" #k售价：#r"+gradePrice[key]+"#b元宝\r\n";
			}
			cm.sendOk(text);
			cm.dispose();
		} else if (selection == 2) {
			var text = "请选择您想购买的品级：\r\n";
			for(var key in grade) {
				text+="#b#L"+key+"#"+grade[key]+"#l  ";
				if (!((key+1)%4))
					text+="\r\n";
			}
			cm.sendSimple(text);
		}
	} else if (status == 2) {
		recordGrade = selection;
		var text = "请选择您想购买的部位：\r\n";
		for(var key in itemSlot) {
			text+="#b#L"+key+"#"+itemSlot[key][0]+"#l  ";
			if (!((key+1)%4))
				text+="\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 3) {
		recordSlot = selection;
		var text = "您要购买的是#r["+grade[recordGrade]+"]#k的#b合成副装["+itemSlot[recordSlot][0]+"]#k，费用为#r"+gradePrice[recordGrade]+"#k元宝，是否继续？";
		cm.sendYesNo(text);
	} else if (status == 4) {
		if (cm.haveItem(4001485, gradePrice[recordGrade])) {
			if (cm.getSpace(1)<1)
			{
				cm.sendOk("装备栏位置不足，请整理后再进行购买。");
				cm.dispose();
				return;
			}
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(itemSlot[recordSlot][1])).copy();
			toDrop.setOwner(grade[recordGrade]);
			toDrop.setStr(0);
			toDrop.setDex(0);
			toDrop.setInt(0);
			toDrop.setLuk(0);
			toDrop.setHp(0);
			toDrop.setMp(0);
			toDrop.setWatk(0);
			toDrop.setMatk(0);
			toDrop.setWdef(0);
			toDrop.setMdef(0);
			toDrop.setAcc(0);
			toDrop.setAvoid(0);
			toDrop.setHands(0);
			toDrop.setSpeed(0);
			toDrop.setJump(0);
			toDrop.setUpgradeSlots(0);
			toDrop.setViciousHammer(0);
			toDrop.setLevel(0);
			toDrop.setState(0);
			toDrop.setEnhance(0);
			toDrop.setLimitBreak(0);
			cm.addFromDrop(cm.getC(), toDrop, false);
			cm.gainItem(4001485, -gradePrice[recordGrade]);
			cm.sendOk("购买成功");
			cm.dispose();
		} else {
			cm.sendOk("元宝不足,请使用余额兑换元宝，没有余额请充值后再来！");
			cm.dispose();
		}
	}
}