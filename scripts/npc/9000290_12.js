/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310196;
var selects;
var ItemArray = Array(
					   Array(2340000,1),
					   Array(2049700,1),
					   Array(2049122,5),
					   Array(2049750,5),
					   Array(2046008,5),
					   Array(2046009,5),
					   Array(2046108,5),
					   Array(2046109,5),
					   Array(2046220,5),
					   Array(2046311,5),
					   //Array(2613000,20),
					   //Array(2613001,20),
					  // Array(2612010,20),
					   //Array(1112915,10),
					  // Array(1112793,20),
					   Array(3010454,10),
					   Array(3010514,10),
					   Array(3010659,20),
					   Array(3010661,20),
					   Array(3010670,20),
					   Array(3010730,20),
					   Array(3010739,20),
					   Array(3010741,20),
					   Array(3010412,20),
					   Array(3010527,30),
					   Array(3010512,30)
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
			var text = "#r[GM��ʾ��]��#b����ǰ��#z4310196#Ϊ�� #r" + cm.getItemQuantity(4310196) + " #b��\r\n";
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