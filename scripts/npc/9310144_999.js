var status = 0;
var grade = Array(
	"����ͨ��",
	"�ﾫ�¡�",
	"����Ͼ��",
	"���鶯��",
	"�﴿���"
);
var gradePrice = Array(20,40,80,240,600);
var itemSlot = Array(
	Array('����', 1212063),
//	Array('������', 1)
	Array('ñ��', 1003797),
	Array('����', 1102275),
	Array('����',1042254),
	Array('����',1062166),
	Array('����',1052314),
	Array('����',1082299),
	Array('Ь��',1072485)
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
		var text = "����Ҫ��ĸ�ǿ����������Թ������Ʒ���ĺϳɸ�װ��\r\n";
		text+="#r#L1#ʲô�Ǻϳɸ�װ��#l\r\n\r\n";
		text+="#r#L2#��Ҫѡ���ϳɸ�װ��#l\r\n";
		cm.sendSimple(text);
    } else if (status == 1) {
		if (selection==1) {
			var text="#d#eʲô�Ǻϳɸ�װ��#n#k\r\n\t�ϳɸ�װ����������Ʒ��ʹ�ã�������ѡ���Ӧ��λ�Լ�����Ҫ��Ʒ���ĺϳɸ�װ��Ŀǰֻ���۵ĸ�װ���Զ�140��150��160���кϳɣ��������װ�������κ����ԣ�ֻ���ϳɸ�װʹ�á�\r\n";
			text+="\r\n#d#e�ϳɸ�װ�ļ۸�#n#k\r\n";
			for(var key in grade) {
				text+="#b"+grade[key]+" #k�ۼۣ�#r"+gradePrice[key]+"#bԪ��\r\n";
			}
			cm.sendOk(text);
			cm.dispose();
		} else if (selection == 2) {
			var text = "��ѡ�����빺���Ʒ����\r\n";
			for(var key in grade) {
				text+="#b#L"+key+"#"+grade[key]+"#l  ";
				if (!((key+1)%4))
					text+="\r\n";
			}
			cm.sendSimple(text);
		}
	} else if (status == 2) {
		recordGrade = selection;
		var text = "��ѡ�����빺��Ĳ�λ��\r\n";
		for(var key in itemSlot) {
			text+="#b#L"+key+"#"+itemSlot[key][0]+"#l  ";
			if (!((key+1)%4))
				text+="\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 3) {
		recordSlot = selection;
		var text = "��Ҫ�������#r["+grade[recordGrade]+"]#k��#b�ϳɸ�װ["+itemSlot[recordSlot][0]+"]#k������Ϊ#r"+gradePrice[recordGrade]+"#kԪ�����Ƿ������";
		cm.sendYesNo(text);
	} else if (status == 4) {
		if (cm.haveItem(4001485, gradePrice[recordGrade])) {
			if (cm.getSpace(1)<1)
			{
				cm.sendOk("װ����λ�ò��㣬��������ٽ��й���");
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
			cm.sendOk("����ɹ�");
			cm.dispose();
		} else {
			cm.sendOk("Ԫ������,��ʹ�����һ�Ԫ����û��������ֵ��������");
			cm.dispose();
		}
	}
}