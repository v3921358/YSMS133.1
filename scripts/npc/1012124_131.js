/*
 �ű����ܣ����߶һ�
 */
 
var ItemNeedId = 4310020;
var selects;
var ItemArray = Array(
Array(2430054, 50), //���л��� 30��
Array(2430055, 50),  //ŮŮ���� 30��
Array(2430057, 60),  //���� 30��
Array(2430072, 50), //�ϻ���˵ 7��
Array(2430293, 1000), //���� �ɴ� ����
Array(2430294, 100), //�ɴ� 90��
Array(2430295, 10000), //���� ���� ����
Array(2430296, 1000), //���� ���� 90��
Array(2430297, 2000), //���� ������ ����
Array(2430298, 200), //������ 90��
Array(2430299, 3000), //���� ħ��ɨ�� ����
Array(2430300, 300), //ħ��ɨ�� 90
Array(2430301, 4000), //���� ��� ����
Array(2430302, 400), //���� ��� 90��
Array(2430303, 5000), //���� ��ʿ��ս�� ����
Array(2430304, 500), //��ʿ��ս�� 90��
Array(2430305, 6000), //���� ���� ����
Array(2430306, 600), //���� 90��
Array(2430307, 8000), //���� ����� ����
Array(2430308, 800), //����� 90��
Array(2430309, 8000), //���� ͸������� ����
Array(2430310, 800), //͸������� 90��
Array(2430311, 1000), //���� èͷӥ ����
Array(2430312, 100), //èͷӥ 90��
Array(2430315, 500), //���� ���ȵ�ħ���� ����
Array(2430316, 50), //���ȵ�ħ���� 90��
Array(2430317, 3000), //���� ���� ����
Array(2430318, 300), //����90�콻��ȯ
Array(2430319, 3000), //С��� ����
Array(2430320, 300), //��С��� 90��
Array(2430321, 3000), //�޹�ˮţ ����
Array(2430325, 3000), //���� ά��ս�� ����
Array(2430326, 300), //ά��ս�� 90��
Array(2430327, 3000), //�򶹶������� ����
Array(2430328, 300), //�򶹶������� 90��
Array(2430329, 2000), //����Ħ�� ����
Array(2430330, 200), //����Ħ�� 90��
Array(2430331, 1000), //���ľ�� ����
Array(2430332, 100), //���ľ�� 90��
Array(2430333, 6000), //�ϻ�ֻ�Ǵ�˵ ����
Array(2430334, 600), //�ϻ�ֻ�Ǵ�˵ 90��
Array(2430335, 1000), //���� ����˹�Ĳ�Ȯ ����
Array(2430336, 100), //����˹�Ĳ�Ȯ 90��
Array(2430337, 3000), //���� ���� ����
Array(2430338, 300), //���� 90��
Array(2430339, 2000), //���� �ܳ� ����
Array(2430340, 200), //�ܳ� 90��
Array(2430341, 5000), //�����صİ��� ����
Array(2430342, 500), //�����صİ��� 90��
Array(2430343, 1000), //���� ������ ����
Array(2430344, 100) //������ 90��

//����Ϊ����ʹ�õ�
/*
Array(2432350, 10), //��ħ��ʦ��ѩԭ���1�콻��ȯ
Array(2430992, 50),  //�������7��ʹ��ȯ
Array(2430707, 50),  //����������7��ʹ��ȯ
Array(2430993, 0), //�������30��ʹ��ȯ
Array(2430521, 0), //С�������30��ʹ��ȯ
Array(2431914, 0), //С�������30��ʹ��ȯ
Array(2432328, 0), //Naverñ�����30��ʹ��ȯ
Array(2432099, 0), //�޴󹫼����30��ȯ
Array92431950, 0), //�޴󹫼����90��ȯ
Array(2430994, 0), //�������90��ʹ��ȯ
Array(2432029, 0), //��ʽս�����90��ȯ
Array(2432497, 0), //�������������ʹ��ȯ
Array(2430464, 0), //������������������Ȩ
Array(2432735, 0), //��è�������ȯ
Array(2432733, 0), //��ӥ���������ȯ
Array(2432487, 0), //LV�������ȯ 
Array(2432496, 0), //��ʨ�������ʹ��Ȩ
Array(2432518, 0), //���������������ʹ��ȯ
Array(2430534, 0), //�������Ȩʹ��ȯ
Array(2430938, 0), //��ɫƤ������ʹ��ȯ
Array(2430939, 0), //˫ǿ�������������ʹ��ȯ
Array(2430968, 0), //˫�ۺ��������ʹ��ȯ
Array(2431137, 0), //�����������ʹ��ȯ
Array(2431073, 0), //��������������ʹ��ȯ
Array(2431135, 0), //��������Ӱ�������ʹ��ȯ
Array(2431136, 0), //������鰢�����������ʹ��ȯ
Array(2431268, 0), //������ޱ�����ʹ��ȯ
Array(2431353, 0), //�ڷ����������ʹ��ȯ
Array(2431362, 0), //����ѩ������ʹ��ȯ
Array(2431423, 0), //������г��������ʹ��ȯ
Array(2431424, 0), //ѩ���������ʹ��ȯ
Array(2431425, 0), //�����������ʹ��ȯ
Array(2431426, 0), //�����������ʹ��ȯ
Array(2431473, 0), //��Ʒ����һ�������������ʹ��ȯ
Array(2431474, 0), //�Ͳ�������һ�������������ʹ��ȯ
Array(2434377, 0), //���볤���������ʹ��ȯ
Array(2434379, 0), //��ʿ�Ż����������ʹ��ȯ
Array(2434277, 0), //����¹�������ʹ��ȯ
Array(2432172, 0), //���������������ʹ��ȯ
Array(2432992, 0), //�ۺ����������ʹ��ȯ
Array(2433069, 0), //����̫�մ�����ʹ��ȯ
Array(2432806, 0), //�ٽ��������ȯ
Array(2432994, 0), //ϣ���������
Array(2432995, 0), //�����ܳ����
Array(2432996, 0), //�λ��ܳ����
Array(2432997, 0), //���ֻ������
Array(2432998, 0), //�����������
Array(2432999, 0), //��ͨ�������
Array(2433000, 0), //�߼��������
Array(2433001, 0), //��Ӣ�������
Array(2433002, 0), //��˵�������
Array(2433003, 0), //��ҫ�������
Array(2433051, 0), //è�����Ƴ�������Ä�
Array(2433053, 0), //����ʽ��ͧ������Ä�
Array(2431898, 0), //�������������ȯ
Array(2431915, 0), //�����ʵ�Ա����ʹ��ȯ
Array(2432003, 0), //ս����ͧ���ʹ��ȯ
Array(2432007, 0), //���Ӷ�֮ȭ���ʹ��ȯ
Array(2432030, 0), //ʯ����������ȯ
Array(2432031, 0), //�����������ȯ
Array(2432078, 0), //����Ȯ�������ȯ
Array(2432085, 0), //�����������ȯ
Array(2431883, 0), //ɳ���������ʹ��ȯ
Array(2431765, 0), //ҡҡľ�����ȯ
Array(2432015, 0), //���ɳ���������ʹ��ȯ
Array(2432149, 0), //���������������ʹ��ȯ
Array(2432151, 0), //���д��������ȯ
Array(2432309, 0), //�����������ʹ��ȯ
Array(2432216, 0), //��ʬ��������ȯ
Array(2432218, 0), //���ȵ�ħ�����������ȯ
Array(2432291, 0), //��������ʹ��ȯ
Array(2432293, 0), //�Ϲ���������ʹ��ȯ
Array(2432295, 0), //�����������ʹ��ȯ
Array(2432347, 0), //�Ϲ��غ�ѩԭ������轻��ȯ
Array(2432348, 0), //ϣ��˹��ѩԭ������轻��ȯ
Array(2432349, 0), //�¶�����ѩԭ������轻��ȯ
Array(2432351, 0), //ϣ����ѩԭ������轻��ȯ
Array(2432431, 0), //����ʿ�������ʹ��ȯ
Array(2432433, 0), //ħ��ɨ���������ʹ��ȯ
Array(2432449, 0), //��Ь�������ʹ��ȯ
Array(2432582, 0), //�ٵ��ˣ��������ʹ��ȯ
Array(2432498, 0), //���������������ʹ��ȯ
Array(2432500, 0), //��������������ʹ��ȯ
Array(2432645, 0), //ë¿�������ȯ
Array(2432653, 0), //�趯�����տ����
Array(2434127, 0), //�����е����������ȯ
Array(2433499, 0), //�¶���֮�������ȯ
Array(2433501, 0), //������֮�������ȯ
Array(2433735, 0), //���������������ȯ
Array(2433736, 0), //��������������ȯ
Array(2433809, 0), //�������������ȯ
Array(2433811, 0), //��ݮ�����������ȯ
Array(2433292, 0), //�����������ʹ��ȯ
Array(2433293, 0), //ѱ¹ѩ���������ʹ��ȯ
Array(2433497, 0), //������������ý���ȯ
Array(2433511, 0), //ϲ����������ý���ȯ
Array(2434084, 0), //��ɫ��ʹ������ý���ȯ
Array(2434142, 0), //�ǰ��տ����ʹ��ȯ
Array(2434143, 0), //��������ʹ��ȯ
Array(2434235, 0), //�����ƶ����
Array(2434236, 0), //���Ⱦ������
Array(2434037, 0), //�����ɫ�������ȯ
Array(2433836, 0), //�������
Array(2433058, 0), //����������ʽ��ͧ�ؾ��Ż�ȯ
Array(2433059, 0), //������Ǳˮͧ�ؾ��Ż�ȯ
Array(2433060, 0), //������ֱ�����ؾ��Ż�ȯ
Array(2433168, 0), //�������������ؾ��Ż�ȯ
Array(2433169, 0), //�����Զ�ľ���ؾ��Ż�ȯ
Array(2433170, 0), //����������ֱ�����ؾ��Ż�ȯ
Array(2433198, 0), //������è�亣�����ؾ��Ż�ȯ
Array(2433881, 0), //����������
Array(2434082, 0), //������⳵������ý���ȯ
Array(2434083, 500) //�������������ʹ��ȯ
*/


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
			var text = "#b��ܰ��ʾ��#r#z4310020##bֻ���ڹ��﹫԰�����#k\r\n#r[GM��ʾ��]��#b����ǰ��#z4310020#Ϊ�� #r" + cm.getItemQuantity(4310020) + " #b��\r\n";
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