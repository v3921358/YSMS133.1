/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310156;//4310156 - ��������˹��
var selects;
var ItemArray = Array(
Array(1212115,200),//
Array(1222109,200),
Array(1232109,200),
Array(1402251,200),
Array(1242116,200),
Array(1302333,200),
Array(1312199,200),
Array(1322250,200),
Array(1332274,200),
Array(1342101,200),
Array(1362135,200),
Array(1372222,200),
Array(1382259,200),
Array(1412177,200),
Array(1422184,200),
Array(1432214,200),
Array(1442268,200),
Array(1452252,200),
Array(1462239,200),
Array(1472261,200),
Array(1482216,200),
Array(1492231,200),
Array(1522138,200),
Array(1532144,200),
Array(1552110,200),
Array(1252093,200),
Array(1542108,200)

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
			var text = "#r[��ܰ��ʾ]��#b����ǰ�� #r#z4310156# #bΪ�� #r" + cm.getItemQuantity(4310156) + " #b��\r\n[��ܰ��ʾ]��#r#z4310156# #bֻ������ǿ�󸱱���#k\r\n#b��ѡ��#k\r\n";
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