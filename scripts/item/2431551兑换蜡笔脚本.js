/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 2431551;
var selects;
var ItemArray = Array(
					   Array(3994417,50),
					   Array(3994418,60),
					   Array(3994419,70),
					   Array(3994420,80),
					   Array(3994421,90),
					   Array(3994422,100)
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
        im.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            im.dispose();
        } else if (a == 0) {
			var text = "#r[��ܰ��ʾ��]��#b����ǰ�� #r#z2431551# #bΪ�� #r" + im.getItemQuantity(2431551) + " #b��#k\r\n";
			for (var i = 0 ; i < ItemArray.length;i++){
				text += "#L"+i+"# #i"+ItemArray[i][0]+"#  #b#z"+ItemArray[i][0]+"# #b( ��Ҫ #r"+ItemArray[i][1]+"#k #b�� #r#z2431551# )\r\n"
			}
			im.sendSimple(text);
		}else if (a == 1){
			selects = selection;
			itemQuantity = ItemArray[selects][1];
			itemid = ItemArray[selects][0];
			im.sendYesNo("#b��ȷ��Ҫʹ�� #r"+itemQuantity+" #b�� #r#t"+ItemNeedId+"# #b���һ� #r#t"+itemid+"# #b��");
		}else if (a == 2){
			for (var i = 1 ; i < 5 ;i++){
				if (im.getSpace(i) <1){
					pass = false;
				}
			}
			if (pass){
			if (im.haveItem(ItemNeedId,itemQuantity)){
				im.gainItem(itemid,1);
				im.gainItem(ItemNeedId,-itemQuantity);
				im.sendOk("�һ��ɹ��ˣ�");
				im.worldSpouseMessage(0x23, "�����˽ڰ����ǡ������ "+ im.getChar().getName() +" �ɹ��һ���ϡ�е��ߡ�");
			}else{
				im.sendOk("�Բ�����û���㹻��#t"+ItemNeedId+"#");
			}
			
			}else{
				im.sendOk("�Բ��𣬱���װ����λ����,������\r\n -#r�������еı�����Ŀ�ڳ�һ��")
			}
			im.dispose();
		}
	}
}