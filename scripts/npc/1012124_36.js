/*
 �ű����ܣ��̵�
 */

var a = 0;
var icon = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n��Ϸ�̵꼯��������������Ҫ��������һ���̵�#b\r\n\r\n#L0# "+icon+" �ӻ��̵�#l #L1# "+icon+" �����̵� #L2# "+icon+" ����װ��\r\n#L4# "+icon+" �����ҵ� #L3# "+icon+" RED���̵�#L10# "+icon+" �����˹�ҵ�\r\n#L9# "+icon+" �˶��ҵ� #L8# "+icon+" ������� #L11# "+icon+" ���յ±ҵ�\r\n#L12# "+icon+" �������� #L13# "+icon+" â���̵� #L14# "+icon+" ����̳�\r\n#L15# "+icon+" ����̵� #L16# "+icon+" �����̳� ")
        } else if (a == 1) {
            if (selection == 0){
                cm.openShop(1012123);//shop�ֶβ���Ϊ0 �ӻ��̵�
        cm.dispose();
            } else if (selection == 1) {//�����̵�
                cm.openShop(1033003),
		cm.dispose();
            } else if (selection == 2) {//����װ��
                cm.openShop(1033001);
		cm.dispose();
            } else if (selection == 3) {//RED��
                cm.openShop(20000);
		cm.dispose();
            } else if (selection == 4) {//������
		cm.dispose();
		cm.openNpc(9900003, 21);
            } else if (selection == 5) {//��Ϸ����
		cm.dispose();
		cm.openNpc(9330079, 10);
            } else if (selection == 6) {//�����̵�
		cm.dispose();
		cm.openNpc(9330079, 16);
            } else if (selection == 7) {//���߾���
		cm.dispose();
                cm.openNpc(9330079, 154);
            } else if (selection == 8) {//�������
		cm.dispose();
                cm.openNpc(9330079, 26);
            } else if (selection == 9) {//�˶��ҵ�
		cm.dispose();
                cm.openShop(22200);
            } else if (selection == 10) {//�������̵�
		cm.dispose();
                cm.openShop(10001);
	    } else if (selection == 11) {//���յ±��̵�
		cm.dispose();
                cm.openShop(10002);
		} else if (selection == 12) {//��������
		cm.dispose();
                cm.openNpc(9330079, 41);
		} else if (selection == 13) {//â���������
		cm.dispose();
                cm.openNpc(9330079, 202);
		} else if (selection == 14) {//����̳�
		cm.dispose();
                cm.openNpc(9330079, 152);
		} else if (selection == 15) {//����̵�
		cm.dispose();
                cm.openNpc(9330079, 999);
		} else if (selection == 16) {//�����̳�
		cm.dispose();
                cm.openNpc(9330079, 27);
            } else {
                // 1012123 �ӻ��̵� x
                //10 �ͼ�����
                //11 50~60������
                //12 60~70������
                //20 �ͼ�����
                //21 50~60������
                //22 60~70������
                // 3 �������� 
                // 4 �����̵� x 
                // 1012125 �����̵�
                // 6 ��������
                cm.openShop(selection);
                cm.dispose();
            }
        } else if (a == 2) {
            switch (selection) {
                case 0://�ͼ�����
                    //cm.openShop(10)
                    cm.sendOk("��ʱδ���š�")
                    break;
                case 1://50~60������
                    cm.openShop(11)
                    break;
                case 2://60~70������
                    cm.openShop(12)
                    break;
                case 3://�ͼ�����
                    //cm.openShop(20)
                    cm.sendOk("��ʱδ���š�")
                    break;
                case 4://50~60������
                    cm.openShop(21)
                    break;
                case 5://60~70������
                    cm.openShop(22)
                    break;
            }
            cm.dispose();
        }//a
    }//mode
}//f