var status = 0;
var text;
var sel;
var credits;
var itemlist = new Array(
	// ���������ID��ȫ������ֵ
	Array(10, 1112915, 1),	//������ָ

	Array(100, 1142328, 10),	//VIPѫ��
	Array(100, 1112793, 10),	//����ָ��

	Array(500, 1112178, 20),	//�λ�ѩ����Ƭ��ָ
	Array(500, 1112290, 20),	//�λ�ѩ�������ָ
	Array(500, 1190300, 20),	//������Ҷ����

	Array(1000, 1112941, 40),	//�����Ľ�ָ
	Array(1000, 1112140, 40),	//����VIP��Ƭ��ָ
	Array(1000, 1112247, 40), 	//����VIP�����ָ
	Array(1000, 1190301, 40),	//��ɫ��Ҷ����

	Array(2000, 1112941, 70),	//�����Ľ�ָ
	Array(2000, 1112138, 70),       //��ʯVIP�����ָ
	Array(2000, 1112245, 70),       //��ʯVIP�����ָ
	Array(2000, 1190302, 70),	//ˮ����Ҷ����

	Array(3000, 1003719, 100),	//���׾���ñ
	Array(3000, 1112941, 100),	//�����Ľ�ָ
	Array(3000, 1112139, 100),	//�ƽ�VIP��Ƭ��ָ
	Array(3000, 1112246, 100)	//�ƽ�VIP�����ָ


	);
var hypay = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        im.dispose();
        return;
    } else {
        status++;
    }

    if (status == 0) {
    	credits = new Array();
    	for (var i in itemlist) {
    		var contain = false;
    		for (var j in credits) {
    			if (itemlist[i][0] == credits[j]) {
    				contain = true;
    			}
    		}
    		if (!contain) {
    			credits.push(itemlist[i][0]);
    		}
    	}
    	rmb = im.getRMB();
	//cm.getSevenDayPayLog(1);//��ʾ�����ֵ�ܽ��
	//" + im.getTotalRMB() + " //��ʾ��ǰ�ܽ��
    	text = "#g===============#k#e#r���СǮ�����#g===============#k#b\r\n\r\n�ۼƳ�ֵ��" + im.getTotalRMB() + "    �����ֵ��" + im.getSevenDayPayLog(1) + "   \r\n#r��ܰ��ʾ���׳����ֻ����ȡһ�Σ������Ч�����죬������Զ���ʧ��û����ȡ�������ге����\r\n#b��ѡ����鿴������\r\n#b";//\r\n���������ڵ��ʳ�ֵ1000Ԫ����160�����ղ���˹����һ��
    	for (var i in credits) {
    		text += "#L" + i + "#�鿴" + credits[i] + "Ԫ���\r\n";
    	}
    	im.sendSimple(text);
    } else if (status == 1) {
    	sel = selection;
    	text = "������ " + credits[sel] + " Ԫ�״γ�ֵ��������ݣ�\r\n\r\n#b��ȡ����������Զ���ʧ����ȷ��Ҫ��ȡ��\r\n#r";
		for (var i in itemlist) {
			if (itemlist[i][0] == credits[sel]) {
				text += "#i" + itemlist[i][1] + "# #z" + itemlist[i][1] + "# ȫ����+" + itemlist[i][2] + "\r\n";
			}
		}
		text += "\r\n#b#L0#��ȷ����ȡ�״γ�ֵ���#l";
		im.sendSimple(text);
    } else if (status == 2) {
    	//if (rmb < credits[sel]) {
	 if (im.getSevenDayPayLog(1).get(0) < credits[sel]) {
    		im.sendOk("�������ֵ�ܶ�� " + credits[sel] + " Ԫ�����ڽ����ֵ�㹻�Ľ��������ȡ������ѡ�������ճ�ֵ�����������ȡ\r\n\r\n#r����˵�����׳������ȡ����Ϊ�����ۼƳ�ֵ������ֵ��������7���ۼƽ��Ŷ��");
    		im.dispose();
    		return;
    	}
		im.gainItem(2430499, -1);
    	if (im.getBossLogAcc("�׳����" + credits[sel] + "Ԫ�׳����") == -1) {
    		im.sendOk("���Ѿ���ȡ���ý�����");
    		im.dispose();
    		return;
    	}
    	if (im.getSpace(1) < getSize(credits[sel])) {
    		im.sendOk("װ�����ռ䲻��" + getSize(credits[sel]) + "��");
    		im.dispose();
    		return;
    	}

		var ii = im.getItemInfo();
		for (var i in itemlist) {
			if (itemlist[i][0] == credits[sel]) {
				var itemid = itemlist[i][1];
				var stat = itemlist[i][2];
				var toDrop = ii.randomizeStats(ii.getEquipById(itemid)).copy();
				toDrop.setStr(stat);
				toDrop.setDex(stat);
				toDrop.setInt(stat);
				toDrop.setLuk(stat);
				toDrop.setWatk(stat);
				toDrop.setMatk(stat);
				im.addFromDrop(im.getC(), toDrop, true);
			}
		}
		im.setBossLogAcc("�׳����" + credits[sel] + "Ԫ�׳����", -2);
		im.sendOk("��ȡ�ɹ�");
		im.worldSpouseMessage(0x23,"���׳�����ʺ��䡻����� "+ im.getChar().getName() +" ��ȡ��" + credits[sel] + "Ԫ�״γ�ֵ�����");
		im.worldSpouseMessage(0x23,"���׳�����ʺ��䡻����� "+ im.getChar().getName() +" ��ȡ��" + credits[sel] + "Ԫ�״γ�ֵ�����");
		im.worldSpouseMessage(0x23,"���׳�����ʺ��䡻����� "+ im.getChar().getName() +" ��ȡ��" + credits[sel] + "Ԫ�״γ�ֵ�����");
		im.dispose();
    }
}

function getSize(edu) {
	var ret = 0;
	for (var i in itemlist) {
		if (itemlist[i][0] == edu) {
			ret++;
		}
	}
	return ret;
}
