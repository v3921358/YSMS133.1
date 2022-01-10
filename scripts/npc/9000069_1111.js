var icon = "#fUI/UIToolTip.img/Item/Equip/Star/Star#";
var icon2 = "#fUI/Basic.img/BtMin2/normal/0#";
var typed=1;
var cost = 1000;
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
		var text="��ã�����������Խ���װ����ԭ����װ���������Գ�ʼ���ɱ�׼ֵ����#b����Ǳ������#k��ʹ��ǰ�뽫Ҫ��ԭ�ĵ��߷���#e#dװ�����ĵ�һ��#n��\r\n#b";
		text+="#L1#"+icon2+" ʹ��˵��#l\r\n\r\n";
		text+="#L2#"+icon2+" ��ʼ��ԭ#l\r\n\r\n";
		cm.sendSimple(text);
	} else if (status == 1){
		if (selection == 1) {
			typed=1;
			status = -1;
			var text="�����߳�Ǳ��������������Գ�ʼ���ɱ�׼ֵ��ʹ��ǰ�뽫Ҫ��ԭ�ĵ��߷���װ�����ĵ�һ���ֽ���߲��ɻ�ԭ����ԭ�����ĵ����У���ͬ�ȼ����ĵĵ��������ͬ��";
			cm.sendSimple(text);
		} else if (selection == 2) {
			typed=2;
			item = cm.getInventory(1).getItem(1);
			if (item==null) {
				cm.sendOk("��ȷ��������ĵ�һ����װ�����ڣ�");
				cm.dispose();
				return;
			}
			if (item.getOwner().indexOf("��")>=0) {
				cm.sendOk("������Ʒ����װ���޷���ԭ��");
				cm.dispose();
				return;
			}
			cost = cost*cm.getReqLevel(item.getItemId())+10000;
			var text="�⽫���ѵ���#r"+cost+"#k�ĵ��Ϊ���װ�����л�ԭ����ԭǰ��ע�����¼��㣺\r\n\r\n#r1.��ȷ����Ҫ��ԭ��װ���Ѿ�������װ�����ĵ�һ��\r\n2.��ԭ�Ǹ�������Ĳ������޷����лָ�\r\n3.�������ɵ�ʧ�������⳥\r\n\r\n#k�Ƿ������";
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
			cm.sendOk("ֻ�з��ֽ���߲��ܽ��л�ԭ");
			cm.dispose();
			return;
		}
		var deleteQuantity = item.getQuantity();
		var ii = cm.getItemInfo();					
		var toDrop = ii.randomizeStats(ii.getEquipById(item.getItemId())).copy(); // ����һ��Equip��
		toDrop.setPotential1(item.getPotential1());
		toDrop.setPotential2(item.getPotential2());
		toDrop.setPotential3(item.getPotential3()); 
		toDrop.setPotential4(item.getPotential4());
		toDrop.setPotential5(item.getPotential5());
		toDrop.setPotential6(item.getPotential6());
		toDrop.setExpiration(item.getExpiration());                 
		cm.removeSlot(1, 1, deleteQuantity);
		cm.addFromDrop(cm.getC(), toDrop, false);
		cm.gainNX(-cost);
		cm.sendOk("��ԭ�ɹ��ˡ�");
		cm.dispose();
	}
}
