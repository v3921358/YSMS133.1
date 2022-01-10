status = -1;
position = Array();
itemCount = 0;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            im.sendOk("����ʹ����");
            im.dispose();
        }
        status--;
    }
    if (status == 0) {
        im.sendSimple("����Ϊ�����ϵĵ��߸�ħ���������ս������#b#L1#�淨˵��#l\r\n#L2#��ʼ��ħ#l\r\n");
    } else if (status == 1) {
		if (selection==1) {
			status=-1;
			var text="��ħ�ܹ����Ϊ�㴩�������ϵ�װ������#r1-3#k�������ֵ�ӳɣ��ܹ��ӳɵ�����ֵ��#b���������ǡ��ˡ�������ħ����������ħ��������ֵ���ر�ֵ��HP��MP#k����ħʱ�뱣֤���ϴ�����װ������15��������15������";
			cm.sendSimple(text);
		} else {
			for(var i = 1; i<=26; i++) {
				var item = im.getInventory(-1).getItem(-i);
				if (item!=null) {
					text +=i+":item:#v"+item.getItemId()+"#\r\n";
					position.push(item.getPosition());
					itemCount++;
				}
			}
			im.sendYesNo("�Ƿ������");
		}
	} else {
		var ii = im.getItemInfo();
		var pos = Math.floor(Math.random()*position.length);
		var item = im.getInventory(-1).getItem(position[pos]);
		var toDrop = item.copy();
		var attrName = "";
		var attr = Math.floor(Math.random()*12);
		var upgradeNum = Math.floor(Math.random()*3+1);
		switch(attr) {
			case 0:
				toDrop.setStr(item.getStr()+upgradeNum);
				attrName = "����";
				break;
			case 1:
				toDrop.setDex(item.getDex()+upgradeNum);
				attrName = "����";
				break;
			case 2:
				toDrop.setInt(item.getInt()+upgradeNum);
				attrName = "����";
				break;
			case 3:
				toDrop.setLuk(item.getLuk()+upgradeNum);
				attrName = "����";
				break;
			case 4:
				toDrop.setHp(item.getHp()+upgradeNum);
				attrName = "HP";
				break;
			case 5:
				toDrop.setMp(item.getMp()+upgradeNum);
				attrName = "MP";
				break;
			case 6:
				toDrop.setWatk(item.getWatk()+upgradeNum);
				attrName = "������";
				break;
			case 7:
				toDrop.setMatk(item.getMatk()+upgradeNum);
				attrName = "ħ����";
				break;
			case 8:
				toDrop.setWdef(item.getWdef()+upgradeNum);
				attrName = "������";
				break;
			case 9:
				toDrop.setMdef(item.getMdef()+upgradeNum);
				attrName = "ħ��������";
				break;
			case 10:
				toDrop.setAcc(item.getAcc()+upgradeNum);
				attrName = "����ֵ";
				break;
			case 11:
				toDrop.setAvoid(item.getAvoid()+upgradeNum);
				attrName = "�ر�ֵ";
				break;
		}
		im.removeSlot(-1, position[pos], 1)
		im.addFromDrop(im.getC(), toDrop, true);
		var text = "��ϲ�㣬�ɹ�ʹ#v"+item.getItemId()+"#������#r"+upgradeNum+"#k��#b"+attrName+"#k���ѽ�װ��ж����װ�����������д�����";
		im.sendOk(text);
		im.dispose();
	}
}