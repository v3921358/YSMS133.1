/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310119;//11��������150����
var selects;
var ItemArray = Array(
Array(1102456,100),//���յ����� - (������)     սʿ
Array(1102457,100),//��ɽ�o������� - (������) ��ʦ
Array(1102458,100),//����Ů�������� - (������) ����
Array(1102459,100),//��ҹ��������� - (������) ����
Array(1102460,100),//��յ��������� - (������) ����

Array(1003601,100),//���յ�ͷ�� - (������)
Array(1003602,100),
Array(1003603,100),
Array(1003604,100),
Array(1003605,100),

Array(1082472,100),//���յ����� - (������)
Array(1082473,100),
Array(1082474,100),
Array(1082475,100),
Array(1082476,100),

Array(1052509,100),//���յ����� - (������)
Array(1052510,100),
Array(1052511,100),
Array(1052512,100),
Array(1052513,100),

Array(1072711,100),//���յ�Ь�� - (������)
Array(1072712,100),
Array(1072713,100),
Array(1072714,100),
Array(1072715,100),

Array(1132156,100),//���յ����� - (������)
Array(1132157,100),
Array(1132158,100),
Array(1132159,100),
Array(1132160,100),

Array(1152094,100),//���յļ��� - (������)
Array(1152095,100),
Array(1152096,100),
Array(1152097,100),
Array(1152098,100)
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