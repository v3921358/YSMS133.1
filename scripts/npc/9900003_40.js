/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310088;
var selects;
var ItemArray = Array(
					   Array(1132242,60),
					   Array(1003946,60),
					   Array(1102612,60),
					   Array(1082540,60),
					   Array(1052647,60),
					   Array(1072853,60),
					   Array(1542074,70),
					   Array(1212079,70),
					   Array(1222074,70),
					   Array(1402210,70),
					   Array(1242080,70),
					   Array(1302289,70),
					   Array(1312165,70),
					   Array(1322215,70),
					   Array(1332238,70),
					   Array(1362101,70),
					   Array(1372188,70),
					  // Array(1382101,70),
					   Array(1382222,70),
					   Array(1412147,70),
					   Array(1422152,70),
					   Array(1432178,70),
					   Array(1442234,70),
					   Array(1452216,70),
					  // Array(1462093,70),
					   Array(1462204,70),
					   Array(1472226,70),
					   Array(1482179,70),
					  // Array(1492080,70),
					   Array(1492190,70),
					   Array(1522105,70),
					   Array(1532109,70),
					   Array(1252046,70),
					   Array(2043002,100),
					   Array(2043102,100),
					   Array(2043202,100),
					   Array(2043302,100),
					   Array(2043402,100),
					   Array(2043702,100),
					   Array(2043802,100),
					   Array(2044002,100),
					   Array(2044102,100),
					   Array(2044202,100),
					   Array(2044302,100),
					   Array(2044402,100),
					   Array(2044502,100),
					   Array(2044602,100),
					   Array(2044702,100),
					   Array(2044802,100),
					   Array(2044902,100),
					   Array(2044812,100),
					   Array(2045202,100),
					   Array(2046318,100),
					   Array(2046319,100),
					   Array(3010126,1000),
					   Array(3010127,1000),
					   Array(3010128,1000),
					   Array(3010129,1000),
					   Array(3010130,1000),
					   Array(3010131,1000),
					   Array(3010220,1000),
					   Array(3010221,1000),
					   Array(3010222,1000),
					   Array(3010223,1000),
					   Array(3010224,1000),
					   Array(3010624,1000),
					   Array(3010637,1000),
					   Array(3010622,1000),
					   Array(3010623,1000),
					   Array(3015000,1000),
					   Array(3015003,1000),
					   Array(3015004,1000),
					   Array(3015030,1000),
					   Array(3015031,1000),
					   Array(3010957,1000),
					   Array(3010503,1000),
					   Array(3010504,1000),
					   Array(3012009,1000),
					   Array(3010453,1000),
					   Array(3010454,1000),
					   Array(3010955,1000),
					   Array(3010845,1000),
					   Array(3015047,1000),
					   Array(1042315,3000),
					   Array(1073046,3000),
					   Array(1702476,3000),
					   Array(1702447,3000),
					   Array(1042346,3000),
					  // Array(1073074,3000),
					   Array(1702566,3000),
					   Array(1042189,3000),
					   Array(1702454,3000),
					   Array(1702121,3000),
					   Array(1052550,3000),
					   Array(1052587,3000),
					   Array(1003713,3000),
					   Array(1082493,3000)
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
			var text = "#r[��ء���ʾ��]��#b����ǰ��#z4310088#Ϊ�� #r" + cm.getItemQuantity(4310088) + " #b��\r\n";
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