/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310097;//���յ±Ҷһ�����
var selects;
var ItemArray = Array(
					   Array(1032220,20),//�ͼ����յ¶���
					   Array(1032221,80),//�м����յ¶���
					   Array(1032222,150),//�߼����յ¶���
					   Array(1032223,200),//��߼����յ¶��� 
					   Array(1113072,20),//�ͼ����յ½�ָ
					   Array(1113073,80),//�м����յ½�ָ
					   Array(1113074,150),//�߼����յ½�ָ
					   Array(1113075,200),//��߼����յ½�ָ
					   Array(1122264,20),//�ͼ����յ¿�ӡ��׹
					   Array(1122265,80),//�м����յ¿�ӡ��׹
					   Array(1122266,150),//�߼����յ¿�ӡ��׹
					   Array(1122267,200),//��߼����յ¿�ӡ��׹
					   Array(1132243,20),//�ͼ����յ¿�ӡ����
					   Array(1132244,80),//�м����յ¿�ӡ����
					   Array(1132245,150),//�߼����յ¿�ӡ����
					   Array(1132246,200)//��߼����յ¿�ӡ����
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
			var text = "#b��ܰ��ʾ��#r#z4310097##bֻ��ͨ����ɱ���յ»��#k\r\n#r[GM��ʾ��]��#b����ǰ��#z4310097#Ϊ�� #r" + cm.getItemQuantity(4310097) + " #b��\r\n";
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
				cm.sendOk("�Բ��𣬱���װ����λ����,��������\r\n -#r�������еı�����Ŀ�ڳ�һ��")
			}
			cm.dispose();
		}
	}
}