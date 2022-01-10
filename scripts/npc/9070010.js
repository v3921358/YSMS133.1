var typed = 0;
var floorIdx = 0;
var C = "";
var itemList = Array(4000019,4000000,4000016);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	var em = cm.getEventManager("Mzhy");
	var eim = em.getInstance("Mzhy");
	if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	if (status==0) {
		if(em.getProperty("state")==1) {
			em.setProperty("state", 2);
			cm.dispose();
			cm.openNpc(9070010, 2);
			return ;
		}
		var text="";
		if (cm.getMap(931050410).getAllMonstersThreadsafe().size()==0) {
			floorIdx = parseInt(eim.getProperty("currentFloor"))-1;
			//�������
			if (floorIdx == 19) {
				cm.setBossLog("��֮����");
				var times = eim.getTimeLeft();
				var totalTime = 60 * 1000 * 30;
				var spendTime = totalTime - times;
				var minute = Math.floor(spendTime/(60*1000));
				var second = Math.floor(spendTime%(60*1000)/1000);
				cm.warp(910000000);
				var giftList = Array(
					Array(4001839, 5),
					Array(5062002, 5),
					Array(5062500, 5),
					Array(5064000, 2),
					Array(2340000, 2)
				);
				text = "��ʹ����"+minute+"��"+second+"��ͨ�ء���������\r\n";
				for(var key in giftList) {
					var itemid = giftList[key][0];
					var itemquantity = giftList[key][1];
					text+="#b#v"+itemid+"##t"+itemid+"# #rx"+itemquantity+"#k\r\n";
					cm.gainItem(itemid,itemquantity);
				}
				cm.worldSpouseMessage(0x17,"[��֮����] : ��"+ cm.getChar().getName() +"��������<"+minute+"��"+second+"��>�ɹ�ͨ�أ���ô���������  ");
				cm.sendOk(text);
				cm.dispose();
			} else {
				text+="���ǵ�#r#e"+(floorIdx+1)+"#n#k���#bʱ����#k����ѡ����һ�����س��������þ���\r\n";
				text+="#d#L0##v4000019#��������[ʣ��"+cm.getItemQuantity(4000019)+"��]\r\n";
				text+="#b#L1##v4000000#��������[ʣ��"+cm.getItemQuantity(4000000)+"��]\r\n";
				text+="#r#L2##v4000016#��������[ʣ��"+cm.getItemQuantity(4000016)+"��]\r\n";
				text+="\r\n";
				text+="#L4##d#e������ţ��#n#k#l #L3##d#e������ս#n#k#l";
				cm.sendSimple(text);
			}
		} else {
			cm.sendOk("�ҵ���ʿ�����ܺ�ħ��ʦ����ͽ���ܿ������أ�սʤ���ǰɣ�");
			cm.dispose();
		}
	} else if (status == 1) {
		var sel = selection;
		if (sel > 2) {
			if (sel == 4) {
				//������ţ��
				C="������ţ��";
				cm.sendSimple("���빺��ʲô��ɫ����ţ���أ�500�������20��~\r\n#b#L0#����#v4000019#��ɫ��ţ��#l\r\n#L1#����#v4000000#��ɫ��ţ��#l\r\n#L2#����#v4000016#��ɫ��ţ��#l");
			} else if (sel == 3) {
				//������ս
				C="������ս";
				cm.sendYesNo("�����Ҫǿ���뿪��֮�����������Ļ�ʲô������û�С�");
			}
		} else {
			C="��������";
			if (!cm.haveItem(itemList[sel])) {
				cm.sendOk("���#v"+itemList[sel]+"#�����������޷������˻��ء�");
				cm.dispose();
				return;
			}
			cm.gainItem(itemList[sel], -1);
			var routes = Array();
			var route = eim.getProperty("floor"+floorIdx);
			routes = route.split(",");
			var lastRoute = 1*routes[sel];
			if (cm.getPlayer().getName() == "����Ա����") {
				lastRoute = 25;
			}
			
			if ((floorIdx+lastRoute)<=0) {
				lastRoute = 0;
			}
			if ((floorIdx+lastRoute)>=20) {
				lastRoute = 19-floorIdx;
			}
			var tips = "";
			var lastFloor = floorIdx+1+lastRoute;
			if (lastRoute>0) {
				tips = "�ţ�������ã������˵�"+(lastFloor)+"��þ���";
			} else if (lastRoute == 0) {
				tips = "��~�����ڵ�"+(lastFloor)+"��þ�����";
			} else {
				tips = "�����ˣ��ص��˵�"+(lastFloor)+"��þ���";
			}
			eim.setProperty("currentFloor", lastFloor);
			var map = eim.getMapInstance(0);
			cm.getPlayer().changeMap(map, map.getPortal(2));
			cm.getPlayer().dropMessage(1, tips);
			cm.dispose();
		}
	} else if (status == 2) {
		if (C=="������ս") {
			cm.getPlayer().dropMessage(1, "���ڻص�����ʵ���硭��");
			cm.warp(910000000);
			cm.dispose();
		} else if (C=="������ţ��") {
			if (cm.getMeso()<5000000) {
				cm.sendOk("Ǯ������~");
				cm.dispose();
				return;
			}
			cm.sendOk("����ɹ���");
			cm.gainItem(itemList[selection], 20);
			cm.gainMeso(-5000000);
			cm.dispose();
		}
	}
}