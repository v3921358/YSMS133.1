var status = -1;
var who = "����"; //ָ����ɫ��
var attrsChinese = Array("����","����","����","����","ħ������","������","HP","MP","��ǿ������","ʣ��ǿ������","ǿ���ȼ�","BOSS�˺�[��Ǳ��]","���ӹ��������[��Ǳ��]","���˺�[��Ǳ��]","��������[��Ǳ��]","�˺�����ͻ��","װ������");
var toDrop = null;
var itemid = 0;
var ii = null;
function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
		//status--;
	}
	if (status == 0) {
		if (cm.getPlayer().getName() != who) {
			cm.sendOk("���޷�ʹ�øù��ܡ�");
			cm.dispose();
			return;
		}
		ii = cm.getItemInfo();
		cm.sendGetNumber("������Ҫ������װ��ID��",0,999999,1999999);
		status = 99;
	} else {
		var index = status%100;
		if (status == 100) {
			itemid = selection;
			if (cm.getItemName(itemid)==null)
			{
				status = -1;
				cm.sendSimple("�����ڵ�ID������������");
				return;
			}
			toDrop = ii.getEquipById(selection).copy();
		} else {
			var cVal = selection;
			if (attrsChinese[index-1] == "װ������")
				cVal = cm.getText();
			setAttr((index-1), cVal);
		}
		if (index>(attrsChinese.length-1)) {
			cm.addFromDrop(cm.getC(),toDrop,false);
			cm.sendOk("�������");
			cm.dispose();
			return;
		} else {
			if (attrsChinese[index] == "װ������") {
				cm.sendGetText("#i"+itemid+":#������װ��#r#e"+attrsChinese[index]+"#n#k��ֵ��");
			} else {
				var maxVal = 32767;
				if (attrsChinese[index]=="�˺�����ͻ��")
					maxVal = 2100000000;
				cm.sendGetNumber("#i"+itemid+":#������װ��#r#e"+attrsChinese[index]+"#n#k��ֵ��",0,0,maxVal);
			}
		}
	}
}
function setAttr(num,val) {
	switch(num) {
		case 0: 
			toDrop.setStr(val);
			break;
		case 1:
			toDrop.setDex(val);
			break;
		case 2:
			toDrop.setInt(val);
			break;
		case 3:
			toDrop.setLuk(val);
			break;
		case 4:
			toDrop.setMatk(val);
			break;
		case 5:
			toDrop.setWatk(val);
			break;
		case 6:
			toDrop.setHp(val);
			break;
		case 7:
			toDrop.setMp(val);
			break;
		case 8:
			toDrop.setLevel(val);
			break;
		case 9:
			toDrop.setUpgradeSlots(val);
		case 10:
			toDrop.setEnhance(val);
			break;
		case 11:
			toDrop.setBossDamage(val);
			break;
		case 12:
			toDrop.setIgnorePDR(val);
			break;
		case 13:
			toDrop.setTotalDamage(val);
			break;
		case 14:
			toDrop.setAllStat(val);
			break;
		case 15:
			toDrop.setLimitBreak(val);
			break;
		case 16:
			toDrop.setOwner(val);
			break;
		default:
			return null;
	}
}