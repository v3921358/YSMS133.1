/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310143;//BOSS�Ҷһ�����
var selects;
var ItemArray = Array(
Array(2046958,1),//�Ϻӵĵ������� ���������� 1%
Array(2046959,1),//�Ϻӵĵ������� ħ������ 1%
Array(2616100,1),//�Ϻӵ�˫������ ���������� 1%
Array(2616102,1),//�Ϻӵ�˫������ ħ������ 1%
Array(2046960,50),//��ӵĵ������� ���������� 10%
Array(2046961,50),//��ӵĵ������� ħ������ 10%
Array(2616101,50),//��ӵ�˫������ ���������� 10%
Array(2616103,50),//��ӵ�˫������ ħ������ 10%
Array(2046825,50),//��ӵ���Ʒ �������� 10%
Array(2046826,50),//��ӵ���Ʒ �������� 10%
Array(2046827,50),//��ӵ���Ʒ �����Ծ��� 10%
Array(2046828,50),//��ӵ���Ʒ�������� 10%
Array(2043003,220),//���ֽ������سɾ�
Array(2043103,220),//���ָ������سɾ�
Array(2043203,220),//���ֶ��������سɾ�
Array(2043303,220),//�̽������سɾ�
Array(2043703,220),//���ȹ����سɾ�
Array(2043803,220),//���ȹ����سɾ�
Array(2044003,220),//˫�ֽ������سɾ�
Array(2044019,220),//˫�ֽ�ħ���سɾ�
Array(2044103,220),//˫�ָ������سɾ�
Array(2044203,220),//˫�ֶ��������سɾ�
Array(2044303,220),//ǹ�����سɾ�
Array(2044403,220),//ì�����سɾ�
Array(2044503,220),//�������سɾ�
Array(2044603,220),//�󹥻��سɾ�
Array(2044703,220),//ȭ�׹����سɾ�
Array(2044815,220),//ָ�ڹ����سɾ�
Array(2044908,220)//��ǹ�����سɾ�
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
			var text = "#r[��ܰ��ʾ]��#b����ǰ�� #r#z4310143# #bΪ�� #r" + cm.getItemQuantity(4310143) + " #b��\r\n[��ܰ��ʾ]��#r#z4310143# #bֻ�в���BOSS����#k\r\n#b��ѡ��#k\r\n";
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