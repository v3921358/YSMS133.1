var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var status = 0;
var typed=0;
var rmb = 0;
var weaponId = null;
var weaponList = Array(
//սʿ
1432086, // ʨ�ĳ�ǹ, // (������)
1442116, // ʨ��ì
1302152, // ʨ���䵶, // (������)
1232014, // ʨ��ʹ������, // (������)
1322096, // ʨ�����׶�, // (������)
1402095, // ʨ��ս���䵶, // (������)
1542015, // ʨ�� ʨ������ ,// (������)

//˫��
1522018, // �������ǹ, // (������)
//˫��
1342036, // ����ǰ�Ӱ��, // (������)
//��ʦ
1262015, //��βESP������
1372084, // ��β�������, // (������)
1382104, // ��βս������, // (������)
1212014, // ��β�ڼ�����, // (������)
//����
1452111, // ӥ����Ϲ�, // (������)
1462099, // ӥ������, // (������)

//���
1242042, // ��ѻ֮��Ů����־֮��, // (������)
1332130, // ��ѻ֮��̵�, // (������)
1362019, // ��ѻ֮���������, // (������)
1472122, // ����ȫ��
//����
1482084, // ��ݾ�ӥצ, // (������)
1492085, // ����������, // (������)
1532018, // ��ݻ�����, // (������)
1222014, // �����꼳ȡ��, // (������)
1242014 // ���Ů����־֮��, // (������)
);
var needItemList = Array(
	Array(4310036, 3000),
	Array(4000021, 150),
	Array(4001241, 8),
	Array(4001242, 8),
	Array(4004000, 75),
	Array(4004001, 75),
	Array(4004002, 75),
	Array(4004003, 75)
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
            var selStr = "#d�������������140����������ѡ����Ҫ������װ����#n#k\r\n";    
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