var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;
var weaponId = null;
var weaponList = Array(
	1262016, //������ESP������������150������
	1212063, // ������ħ��ԴȪ��, // (������)
	1222058, // ��������ʹ���, // (������)
	1232057, // ����������ʹ��, // (������)
	1242060, // �����ɾ���֮��, // ³����˹��װ(����)ר������
	1242061, // �����ɾ���֮��, // ³����˹��װ(����)ר������
	1302275, // ����������֮��, // (������)
	1312153, // ������˫�����⸫, // (������)
	1412135, // ������ս�����⸫, // (������)
	1322203, // �����ɸ���ϴ�, // (������)
	1332225, // �����ɴ���ʿ�｣, // (������)
	1342082, // �����ɼ���֮��, // (������)
	1362090, // �����ɶ�������, // (������)
	1372177, // ������ħ����ȡ��, // (������)
	1382208, // ������ħ��֮��, // (������)
	1402196, // ���������֮��, // (������)
	1422140, // ���������紸, // (������)
	1432167, // �����ɹ���ǹ, // (������)
	1442223, // �����ɰ��¿��и�, // (������)
	1452205, // ������׷����, // (������)
	1462193, // �����ɷ�����, // (������)
	1472214, // ������Σ��֮��, // (������)
	1482168, // �����ɾ���֮צ, // (������)
	1492179, // ����������ǹ, // (������)
	1522094, // ������˫������, // (������)
	1532098, // ��������ҫ��, // (������)
	1252015, // �����ɱ�����ħ����, // (������)
	1542063, // - �����ɻʵ����� - (������)
	1552063  //- �����ɻ������� - (������)
);
var needItemList = Array(
	Array(4310030, 2000),
	Array(4310036, 5000),
	Array(4033356, 50),
	Array(4021012, 30),
	Array(4021011, 30),
	Array(4021010, 30),
	Array(4000082, 400),
	Array(4000124, 50),
	Array(4310015, 3),
	Array(4021019, 1)
);
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
            var selStr = "#d�������������150����������ѡ����Ҫ������װ����#n#k\r\n";    
			for(var key in weaponList) {
				var item = weaponList[key];
				selStr += "#r#L"+key+"#���� #b#z"+item+"# #r[�鿴����]\r\n";
			}
        	cm.sendSimple(selStr);	
		} else if (status == 1) {
			weaponId = selection;
			var text = "- #e#d#z"+weaponList[weaponId]+"#��Ҫ�Ĳ��ϣ�#n#k\r\n\r\n#b";
			for(var key in needItemList) {
				var itemName = cm.getItemName(needItemList[key][0]);
				text+=itemName;
				for(var i=0; i<=25-itemName.getBytes().length; i++)
				{
					text+=" ";
				}
				var currentItemQuantity = cm.getItemQuantity(needItemList[key][0]);
				var color="#g";
				if (currentItemQuantity<needItemList[key][1])
					color="#r";
				text+=color+currentItemQuantity+" / "+needItemList[key][1]+" ��#b\r\n";
			}
			text+="#k\r\n\r\n- #e#d������ʾ��#n#b���ǽ�����������񷵻���һҳ.#k";
			cm.sendYesNo(text);
		} else if (status == 2) {
			flag=true;
			for(var key in needItemList) {
				var itemId = needItemList[key][0];
				var itemQuantity = needItemList[key][1];
				if (!cm.haveItem(itemId, itemQuantity))
				{
					flag=false;
					break;
				}
			}
            if (flag) {
				if (cm.getSpace(1)<1) {
					cm.sendOk("װ�����ռ䲻�㣬�����������������");
					cm.dispose();
					return;
				}
				for(var key in needItemList) {
					var itemId = needItemList[key][0];
					var itemQuantity = needItemList[key][1];
					cm.gainItem(itemId, -itemQuantity);
				}
				cm.gainItem(weaponList[weaponId], 1);
				cm.sendOk("��ϲ���ϳ�#z"+weaponList[weaponId]+"#һ��.");
				cm.worldSpouseMessage(0x20, "[���񹫸�] : ��ϲ " + cm.getChar().getName() + " ������һ�� <"+cm.getItemName(weaponList[weaponId])+">.");
				cm.dispose();
			} else {
				cm.sendOk("���ϲ��㣬�޷����������");
				cm.dispose();
			}
		}
	}
}