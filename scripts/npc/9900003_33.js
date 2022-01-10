var status = 0;
var bossid = "�ȼ����";
var giftLevel = Array(120,150,200,250);
var giftContent = Array(
	//120
	Array(5062010, 10, 1),
	Array(5072000, 10, 1),  
	Array(2431741, 1, 1), 
	Array(2049116, 1, 1),
	Array(2433646, 1, 1),
	//150
	Array(2432836, 1, 2), 
	Array(5062010, 20, 2), 
	Array(2431741, 1, 2),
	Array(2433653, 1, 2), 
	Array(2614002, 1, 2),
	//200
	Array(3010592, 1, 3), 
	Array(1112915, 1, 3),
	Array(1142249, 1, 3),
	Array(1003722, 1, 3),
	Array(2433654, 2, 3),
	//250��
	Array(1132244, 1, 4),
	Array(1122265, 1, 4),
	Array(1032221, 1, 4),
	Array(1113073, 1, 4),
	Array(2433654, 3, 4)
)
var giftId = -1;
var giftToken = Array();
var gifts = null;
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
		var text = "";
		text += "#d�����ĵȼ��ﵽҪ��������������ȡһЩ�ܲ���ĵ��ߣ���ô������Ҫ��? �����ȿ����ɣ�\r\n\r\n";
		for(var key in giftLevel) {
			var tips = "";
			giftToken[key]=false;
			if (cm.getChar().getLevel()>=giftLevel[key]) {
				if (cm.getBossLog(bossid+key, 1) < 1) {
					tips = "(����ȡ)";
					giftToken[key]=true;
				} else {
					tips = "#g(����ȡ)#b";
				}
			} else {
				tips = "#r(�ȼ�����)#b";
			}
			text+="#b#L"+(parseInt(key)+1)+"#��ȡ #r#e"+giftLevel[key]+"#n#b ���ȼ���� "+tips+"#l#k\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		giftId = parseInt(selection);
		var text="#b��ȡ #r#e"+giftLevel[giftId-1]+"#n#b ������ɻ�����µ��ߣ�\r\n\r\n";
		gifts = getGift(giftId);
		for(var key in gifts) {
			var itemId = gifts[key][0];
			var itemQuantity = gifts[key][1];
			text+="#v"+itemId+"#  #b#z"+itemId+"##k #rx "+itemQuantity+"#k\r\n";
		}
		text+="\r\n- #e#d������ʾ��#k#n#d�������ȡ���ߣ���񷵻���һҳ��#k";
		cm.sendYesNo(text);
	} else if (status == 2) {
		if (giftId!=-1 && gifts != null) {
			if (cm.getSpace(1) < 8 || cm.getSpace(2) < 8 || cm.getSpace(3) < 8 || cm.getSpace(4) < 8 || cm.getSpace(5) < 8) {
				cm.sendOk("���ı����ռ䲻�㣬�뱣֤ÿ����λ����8��Ŀռ䣬�Ա�����ȡʧ�ܡ�");
				cm.dispose();
				return ;
			}
			if (giftToken[giftId-1]) {
				cm.setBossLog(bossid+(giftId-1),1,1);
				for(var key in gifts) {
					var itemId = gifts[key][0];
					var itemQuantity = gifts[key][1];
					cm.gainItem(itemId, itemQuantity);
				}
				cm.playerMessage(1, "��ϲ������ȡ�ɹ�����򿪰��������ɣ�");
				cm.dispose();
			} else {
				status = -1;
				cm.sendSimple("���Ѿ�����˸�������ߵȼ�δ�ﵽҪ���޷���ȡ��");
			}
		} else {
			cm.sendOk("��ȡ��������ϵ����Ա��");
			cm.dispose();
		}
	}
}
function getGift(id) {
	var lastGiftContent = Array();
	for (var key in giftContent) {
		if (giftContent[key][2]==id)
			lastGiftContent.push(giftContent[key]);
	}
	return lastGiftContent;
}