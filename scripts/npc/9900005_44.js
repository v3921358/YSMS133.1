/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310156;//4310156 - ��������˹��
var selects;
var ItemArray = Array(
Array(3015015,50),//
Array(3015016,50),//
Array(3015017,50),//
Array(3015018,50),//
Array(3015019,50),//
Array(3015020,50),//
Array(3015021,50),//
Array(3015022,50),//
Array(3015023,50),//
Array(3015024,50),//
Array(3015025,50),//
Array(3015026,50),//
Array(3015027,50),//
Array(3012027,50),//
Array(3015097,50),//
Array(3015096,50),//
Array(3015131,50),//
Array(3015132,50),//
Array(3015108,50),//
Array(3015089,50),//
Array(3015133,50),//
Array(3015143,50),//
Array(3015178,50),//
Array(3010661,50),//
Array(3010811,50),//
Array(3010206,50),//
Array(3015014,50),//
Array(3010070,50),//
Array(3010814,50),//
Array(3010936,100)//
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