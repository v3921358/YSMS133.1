/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310119;//11��������150����
var selects;
var ItemArray = Array(
Array(1212057,150),
Array(1222052,150),
Array(1232072,150),
Array(1242077,150),
Array(1252056,150),

Array(1302229,150),
Array(1312118,150),
Array(1322164,150),
Array(1332195,150),
Array(1342071,150),

Array(1362069,150),
Array(1372141,150),
Array(1382170,150),
Array(1402153,150),
Array(1412106,150),

Array(1422109,150),
Array(1432140,150),
Array(1442184,150),
Array(1452172,150),
Array(1462161,150),

Array(1472181,150),
Array(1482142,150),
Array(1492154,150),
Array(1522073,150),
Array(1532076,150),

Array(1542045,150),
Array(1552045,150)
);
var itemQuantity;
var itemid;
var pass = true;
 
function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			var text = "#r[��ܰ��ʾ]��#b����ǰ��#z4310119#Ϊ�� #r" + cm.getItemQuantity(4310119) + " #b��\r\n";
			for (var i = 0 ; i < ItemArray.length;i++){
				text += "#L"+i+"# #i"+ItemArray[i][0]+"#  #z"+ItemArray[i][0]+"# #k( ��Ҫ #r"+ItemArray[i][1]+"#k ��)\r\n"
			}
			cm.sendSimple(text);
		}else if (a == 1){
			selects = selection;
			itemQuantity = ItemArray[selects][1];
			itemid = ItemArray[selects][0];
			cm.sendYesNo("��ȷ��Ҫʹ��"+itemQuantity+"��#t"+ItemNeedId+"#���һ�#t"+itemid+"#��");
		}else if (a == 2){
			for (var i = 1 ; i < 5 ;i++){
				if (cm.getSpace(i) <1){
					pass = false;
				}
			}
			if (pass){
			if (cm.haveItem(ItemNeedId,itemQuantity)){
				cm.gainItem(itemid,1);
				cm.gainItem(ItemNeedId,-itemQuantity);
				cm.sendOk("�һ��ɹ��ˣ�");
			}else{
				cm.sendOk("�Բ�����û���㹻��#t"+ItemNeedId+"#");
			}
			
			}else{
				cm.sendOk("�Բ��𣬱���װ����λ����,������\r\n -#r�������еı�����Ŀ�ڳ�һ��")
			}
			cm.dispose();
		}
	}
}