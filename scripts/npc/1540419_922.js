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
		var text="��ã�����������Խ���װ���������ӣ���װ������������+1#k�����������10�Σ�ʹ��ǰ�뽫Ҫ�����ĵ��߷���#e#dװ�����ĵ�һ��#n��\r\n#b";
		text+="#L1#"+icon2+" ʹ��˵��#l\r\n";
		text+="#L2#"+icon2+" ��ʼ����#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1){
		if (selection == 1) {
			typed=1;
			status = -1;
			var text="����������������һ���������10�Σ���ʹ��ǰ�뽫Ҫ�����ĵ��߷���װ�����ĵ�һ���ֽ���߲������������������ĵ����С�";
			cm.sendSimple(text);
		} else if (selection == 2) {
			typed=2;
			item = cm.getInventory(1).getItem(1);
			if (item==null) {
				cm.sendOk("��ȷ��������ĵ�һ����װ�����ڣ�");
				cm.dispose();
				return;
			}
			//if (item.getOwner().indexOf("��")>=0) {
			//	cm.sendOk("������Ʒ����װ���޷�������");
			//	cm.dispose();
			//	return;
			//}
			//cost = cost*cm.getReqLevel(item.getItemId())*135;
			cost=200000*1.5;
			var text="�⽫���ѵ���#r"+cost+"#k�ĵ��Ϊ���װ��������������ԭǰ��ע�����¼��㣺\r\n\r\n#r1.��ȷ����Ҫ�����Ҿ������װ���Ѿ�������װ�����ĵ�һ��\r\n2.�Ҿ���������Ǹ�������Ĳ������޷����лָ�\r\n3.�������ɵ�ʧ�������⳥\r\n\r\n#k�Ƿ������";
			cm.sendYesNo(text);
		} 
 	}  else if (status == 2) {
		if (cm.getPlayer().getCSPoints(1) < cost) {
			cm.sendOk("�����û��#r"+cost+"#k���");
			cm.dispose();
			return;
		}
		//var item = cm.getInventory(1).getItem(1);
		
		if (cm.isCash(item.getItemId())) {
			cm.sendOk("ֻ�з��ֽ���߲��ܽ��д�������");
			cm.dispose();
			return;
		}
		var deleteQuantity = item.getQuantity();
		var ii = cm.getItemInfo();					
		var toDrop = ii.randomizeStats(ii.getEquipById(item.getItemId())).copy(); // ����һ��Equip��
		if((item.getUpgradeSlots()+item.getLevel())>=10)
		{
			cm.sendOk("��߿�����10�Ρ�");
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
		cm.sendOk("���������ɹ��ˡ�");
		cm.worldSpouseMessage(0x20, "[��Ҫ��ǿ] : ��ϲ " + cm.getChar().getName() + " �ɹ���װ����������������������.");
		cm.dispose();
	}
}
