var icon = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var icon2 = "#fUI/Basic.img/BtMin2/normal/0#";
var typed=1;
var cost = Array(20000000,100000,50000);

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
		/*
		if (cm.getPlayer().getName() != "���췲") {
			cm.sendOk("�㲻�����췲���޷������ҡ�");
			cm.dispose();
			return;
		}*/
		var text="��ã�����#b#eʱװ���Ѵ�ʦ#n#k�����������ʱװ���ӳ���������ã��мǣ�������Ҫ���ѵĵ�װ�ŵ�װ������#r��һ��#k�Ϳ����ˣ������ҾͿ���Ϊ������ˡ�\r\n#b";
		text+="#L1#"+icon+" ʹ��˵�����ؿ���#l\r\n";
		text+="#L2#"+icon2+" ��Ϸ�Ҿ���ʱװ #rx"+cost[0]+"/��#b#l\r\n";
		text+="#L3#"+icon2+" ����ȯ����ʱװ #rx"+cost[1]+"/��#b#l\r\n";
		text+="#L4#"+icon2+" ������ʱװ #rx"+cost[2]+"/��#l\r\n";
		text+="#L5#"+icon2+" һ���񼶾��� #r#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1){
		if (selection == 1) {
			typed=1;
			var text="����ҵĵȼ��ﵽ#e#r120#n#k��ʱ����ʹ��ʱװ����ϵͳ��ʱװ����ϵͳ�ܹ�Ϊ��ĵ�װ����һ����#b���������ݡ���������������������ħ����������ֵ#k��Ŀǰ����ʹ����Ϸ�ҡ����ѩ���Ҽ����װ��ÿ�־��ѵķ�ʽ����������Ч������ͬ��\r\n"+icon+" ʹ��#r��Ϸ��#k���ѵ�װֻ��Ϊ��װ����#b���������ݡ�����������#k���ĸ�����ֵ����������ֵ��Ϊ#r1#k\r\n"+icon+" ʹ��#b���#k���ѵ�װ����Ϊ��װ����������������ֵ�������������#r1-3#k��\r\n"+icon+" ʹ��#bѩ����#k���ܹ��������#r2-6#k�㣬���м��ʲ���ȫ����#b+15#k��#r�񼶾���#k\r\n\r\n#r#e(*) ���Ѻ�ĵ�װ�����ظ�����";
			cm.sendPrev(text);
		} else if (selection == 2) {
			typed=2;
			var text="�⽫���ѵ���#r"+cost[0]+"#k����Ϸ��Ϊ��ĵ�װ���ѣ���ȷ�����Ѿ�������Ҫ���ѵĵ�װ�ŵ���#e#bװ�����ĵ�һ��#n#k\r\n\r\n#r(*) ע�⣺�����ĵ�װ�Ѿ��߱����ڱ����ε����ԣ�Ҳͬ���ᱻ����Ϊ�õ��ε����ԣ����Ƿ�Ҫ������";
			cm.sendYesNo(text);
		} else if (selection == 3) {
			typed=3
			var text="�⽫���ѵ���#r"+cost[1]+"#k����ȯΪ��ĵ�װ���ѣ���ȷ�����Ѿ�������Ҫ���ѵĵ�װ�ŵ���#e#bװ�����ĵ�һ��#n#k\r\n\r\n#r(*) ע�⣺�����ĵ�װ�Ѿ��߱����ڱ����ε����ԣ�Ҳͬ���ᱻ����Ϊ�õ��ε����ԣ����Ƿ�Ҫ������";
			cm.sendYesNo(text);
		} else if (selection == 4) {
			typed=4
			var text="�⽫���ѵ���#r"+cost[2]+"#k���Ϊ��ĵ�װ���ѣ���ȷ�����Ѿ�������Ҫ���ѵĵ�װ�ŵ���#e#bװ�����ĵ�һ��#n#k\r\n\r\n#r(*) ע�⣺�����ĵ�װ�Ѿ��߱����ڱ����ε����ԣ�Ҳͬ���ᱻ����Ϊ�õ��ε����ԣ����Ƿ�Ҫ������";
			cm.sendYesNo(text);
		} else if (selection == 5) {
			typed=5
			var text="#e#r�˲�����һֱ�۳���ȯֱ����װ�����񼶾��ѣ����Ҳ�������ֹͣ���������㣬���һ�δ�����񼶾��ѣ������Ž���ֹͣ��#n#k\r\n��ȷ�����Ѿ�������Ҫ���ѵĵ�װ�ŵ���#e#bװ�����ĵ�һ��#n#k\r\n\r\n#r(*) ע�⣺�����ĵ�װ�Ѿ��߱����ڱ����ε����ԣ�Ҳͬ���ᱻ����Ϊ�õ��ε����ԣ����Ƿ�Ҫ������";
			cm.sendYesNo(text);
		}
 	} else if (status == 2){
		if (cm.getLevel() < 120) {
			cm.sendOk("�ȼ��ﵽ120����Ӣ�۲ſ���ʹ�ô�ϵͳ");
			cm.dispose();
			return;
		}
		var equip = cm.getInventory(1).getItem(1);
		if (equip==null) {
			cm.sendOk("��ȷ��������ĵ�һ����װ�����ڣ�");
			cm.dispose();
			return;
		}
			var itemid = equip.getItemId();
		if (!cm.isCash(itemid)) {
			cm.sendOk("��ȷ��������ĵ�һ�����ֽ������");
			cm.dispose();
			return;
		}
		var ii = cm.getItemInfo();					
		var toDrop = ii.randomizeStats(ii.getEquipById(itemid)).copy(); // ����һ��Equip��                    
		//cm.sendOk("�õġ�ôô��");//cm.dispose();
		var _Str=1;
		var _Dex=1;
		var _Int=1;
		var _Luk=1;
		switch(typed) {
			case 2:
				if (cm.getMeso()<cost[0]) {
					cm.sendOk("��û����ô����Ϸ���أ����꣡");
					cm.dispose();
					return;
				}
				cm.gainMeso(-cost[0]);
				toDrop.setStr(_Str); //װ������
				toDrop.setDex(_Dex); //װ������
				toDrop.setInt(_Int); //װ������
				toDrop.setLuk(_Luk); //װ������
				//toDrop.setMatk(_Matk); //������
				//toDrop.setWatk(_Watk); //ħ������ 
				//toDrop.setAcc(_Acc); //
				toDrop.setOwner("��������");
				cm.removeItem(1, 1, 1);
				cm.addFromDrop(cm.getC(), toDrop, false);
			break;
			case 3:
				if (cm.getPlayer().getCSPoints(2)<cost[1]) {
					cm.sendOk("��û����ô�����ȯ�أ����꣡");
					cm.dispose();
					return;
				}
				cm.gainNX(2, -cost[1]);
				_Str = getVal(3);
				_Dex = getVal(3);
				_Int = getVal(3);
				_Luk = getVal(3);
				_Matk = getVal(3);
				_Watk = getVal(3);
				_Acc = getVal(3);
				toDrop.setStr(_Str); //װ������
				toDrop.setDex(_Dex); //װ������
				toDrop.setInt(_Int); //װ������
				toDrop.setLuk(_Luk); //װ������
				toDrop.setMatk(_Matk); //������
				toDrop.setWatk(_Watk); //ħ������ 
				toDrop.setAcc(_Acc); //
				toDrop.setOwner("�м�����");
				cm.removeItem(1, 1, 1);
				cm.addFromDrop(cm.getC(), toDrop, false);
			break;
			case 4:
				if (cm.getPlayer().getCSPoints(1)< cost[2]) {
					cm.sendOk("��û����ô���ȯ�أ����꣡");
					cm.dispose();
					return;
				}
				var superRate = Math.floor(Math.random()*30);
				var owner = "�߼�����";
				cm.gainNX(1, -cost[2]);
				if (superRate == 5) {
					owner = "�񼶾���";
					_Str = 15;
					_Dex = 15;
					_Int = 15;
					_Luk = 15;
					_Matk = 15;
					_Watk = 15;
					_Acc = 15;
					cm.worldSpouseMessage(0x15, "[ϵͳ����] : �����������ţ���ҡ�" + cm.getChar().getName() + "��������һ��ʱװ�񼶾��ѣ����ף����(��)�ɣ�");
				} else {
					_Str = getMinAndMax(2,6);
					_Dex = getMinAndMax(2,6);
					_Int = getMinAndMax(2,6);
					_Luk = getMinAndMax(2,6);
					_Matk = getMinAndMax(2,6);
					_Watk = getMinAndMax(2,6);
					_Acc = getMinAndMax(2,6);
				}
				toDrop.setStr(_Str); //װ������
				toDrop.setDex(_Dex); //װ������
				toDrop.setInt(_Int); //װ������
				toDrop.setLuk(_Luk); //װ������
				toDrop.setMatk(_Matk); //������
				toDrop.setWatk(_Watk); //ħ������ 
				toDrop.setAcc(_Acc); //
				toDrop.setOwner(owner);
				toDrop.setExpiration(equip.getExpiration());
				cm.removeItem(1, 1, 1);
				cm.addFromDrop(cm.getC(), toDrop, false);
			break;
			case 5:
				if (cm.getPlayer().getCSPoints(1)<cost[2]) {
					cm.sendOk("��û����ô�����أ����꣡");
					cm.dispose();
					return;
				}
				_Str = getMinAndMax(2,6);
				_Dex = getMinAndMax(2,6);
				_Int = getMinAndMax(2,6);
				_Luk = getMinAndMax(2,6);
				_Matk = getMinAndMax(2,6);
				_Watk = getMinAndMax(2,6);
				_Acc = getMinAndMax(2,6);
				var owner = "�߼�����";
				var count=0;
				var isGod = false;
				var MAXTIMES = Math.floor((cm.getPlayer().getCSPoints(1)*1)/cost[2]);
				for (var i = 0; i<MAXTIMES; i++) {
					var superRate = Math.floor(Math.random()*50);
					count++;
					if (superRate == 5) {
						owner = "�񼶾���";
						_Str = 15;
						_Dex = 15;
						_Int = 15;
						_Luk = 15;
						_Matk = 15;
						_Watk = 15;
						_Acc = 15;
						isGod = true;
						cm.worldSpouseMessage(0x15, "[ϵͳ����] : ��ҡ�" + cm.getChar().getName() + "��ʹ��һ�����ѽ�ʱװ�������񼶾��ѣ�������"+((count)*cost[2])+"���");
						break;
					}
				}
				cm.gainNX(1, -cost[2]*(count));
				toDrop.setStr(_Str); //װ������
				toDrop.setDex(_Dex); //װ������
				toDrop.setInt(_Int); //װ������
				toDrop.setLuk(_Luk); //װ������
				toDrop.setMatk(_Matk); //������
				toDrop.setWatk(_Watk); //ħ������ 
				toDrop.setAcc(_Acc); //
				toDrop.setOwner(owner);
				toDrop.setExpiration(equip.getExpiration());
				cm.removeItem(1, 1, 1);
				cm.addFromDrop(cm.getC(), toDrop, false);
				var str= (isGod) ? "�������񼶾���" : "��ϧû�г����񼶾���";
				cm.sendOk("������ "+((count+1)*cost[2])+" ���#r"+str+"#k����#e#bװ����#n#k��һ���ɡ�");
				cm.dispose();
				return;
			break;
			
		}
		cm.sendOk("��������ˣ���#e#bװ����#n#k��һ���ɡ�");
		cm.dispose();
	}
}

function getVal(maxVal) {
	return Math.floor(Math.random()*(maxVal))+1;
}
function getMinAndMax(minVal, maxVal) {
	return Math.floor(Math.random()*(maxVal-minVal+1))+minVal;
}