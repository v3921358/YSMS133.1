/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310156;//4310156 - ��������˹��
var selects;
var ItemArray = Array(
Array(1082543,200),//
Array(1082544,200),//
Array(1082545,200),//
Array(1082546,200),//
Array(1082547,200),//

Array(1132174,200),//
Array(1132175,200),//
Array(1132175,200),//
Array(1132177,200),//
Array(1132178,200),//

Array(1102481,200),//
Array(1102482,200),//
Array(1102483,200),//
Array(1102484,200),//
Array(1102485,200),//

Array(1072743,200),//
Array(1072744,200),//
Array(1072745,200),//
Array(1072746,200),//
Array(1072747,200)//

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