/*
 ���ƣ����ⳬֵ���������
 ���ݣ�����1-150���ɳ����
 */

var giftMaxNum = 5;	// �������
var itemReward = new Array(// ����id����������������ȼ�
        // 1�����
        Array(1212063, 1), //������ħ��ԴȪ��
Array(1222058, 1, 1), //��������ʹ���
Array(1232057, 1, 1), //����������ʹ��
Array(1242060, 1, 1), //�����ɾ���֮��
Array(1302275, 1, 1), //����������֮��
Array(1312153, 1, 1), //������˫�����⸫
Array(1322203, 1, 1), //�����ɸ���ϴ�
Array(1332225, 1, 1), //�����ɴ���ʿ�｣
Array(1342082, 1, 1), //�����ɼ���֮��
Array(1362090, 1, 1), //�����ɶ�������
Array(1372177, 1, 1), //������ħ����ȡ��
Array(1382208, 1, 1), //������ħ��֮��
Array(1402196, 1, 1), //���������֮��
Array(1412135, 1, 1), //������ս�����⸫
Array(1422140, 1, 1), //���������紸
Array(1432167, 1, 1), //�����ɹ���ǹ
Array(1442223, 1, 1), //�����ɰ��¿��и�
Array(1452205, 1, 1), //������׷����
Array(1462193, 1, 1), //�����ɷ�����
Array(1472214, 1, 1), //������Σ��֮��
Array(1482168, 1, 1), //�����ɾ���֮צ
Array(1492179, 1, 1), //����������ǹ
Array(1522094, 1, 1), //������˫������
Array(1532098, 1, 1), //��������ҫ��
Array(1252015, 1, 1), //�����ɱ�����ħ����
        // 30�����
        Array(1002186, 1, 2),
        Array(1012057, 1, 2),
        Array(1022048, 1, 2),
        Array(1102039, 1, 2),
        Array(1302063, 1, 2),
        Array(1112252, 1, 2),
        Array(1112141, 1, 2),
        Array(2001556, 100, 2), // ���ΰٲ�ҩ
        Array(5062002, 20, 2),
        Array(5064000, 10, 2),
        Array(3012003, 1, 2),
        Array(3010037, 1, 2),
        Array(-1, 1000, 2),


        // 60�����
        Array(5150040, 3, 3),
        Array(5152053, 3, 3),
        Array(5060000, 3, 3),
        Array(5072000, 50, 3),
        Array(5390018, 20, 3),
       // Array(1112793, 1, 3),
        Array(2431528, 1, 3),
        Array(3010038, 1, 3),
        Array(-1, 2000, 3),

        // 100�����
        Array(1003946, 1, 4),//����ñ��
        Array(1082540, 1, 4),//��������
        Array(1102612, 1, 4),//��������
        Array(1052647, 1, 4),//����ս����
	//Array(2432068, 1, 4),//��������������
        Array(1072853, 1, 4),//����Ь��
        Array(4310088, 70, 4),//RED�ҿɶһ���������
        Array(1672000, 1, 4),//��������
        Array(5062500, 10, 4),//��ʦ��������ħ��
        Array(5064000, 10, 4),//��������
        Array(3010046, 1, 4),//������
        Array(-1, 5000, 4),//���þ�5000



        // 150�����
	Array(1132243, 1, 5),//�ͼ����յ¿�ӡ����
	Array(1122264, 1, 5),//�ͼ����յ¿�ӡ��׹
	Array(1032220, 1, 5), //�ͼ����յ¶���
	Array(1113072, 1, 5),//�ͼ����յ½�ָ
        Array(2049122, 1, 5),//����������
        Array(2049752, 1, 5),//S��Ǳ�ܾ��� 30%

        Array(3010583, 1, 5),//������
        Array(5050000, 100, 5),//ϴ���������
        //Array(1142787, 1, 5),//2014ʥ��������ѫ��
        Array(4310036, 500, 5),//�����߱�
        Array(5062500, 20, 5),//��ʦ��������ħ��
        Array(3015007, 1, 5),//��Ģ����ʥ����
        Array(-1, 10000, 5),//���þ�10000��
        Array(3010045, 1, 5)//��������
        );


function start() {
    var giftLevel = 1;
    var newItemReward = new Array();
    var playerLevel = im.getPlayer().getLevel();
    var openReqLevel = 0;
    var text = "";
    for (var i = 1; i <= 5; i++) {
        if (im.getBossLog("�������" + i,1) < 1) {
            giftLevel = i;
            break;
        }
    }

    switch (giftLevel) {
        case 1:
            openReqLevel = 1;
            break;
        case 2:
            openReqLevel = 30;
            break;
        case 3:
            openReqLevel = 60;
            break;
        case 4:
            openReqLevel = 100;
            break;
        case 5:
            openReqLevel = 150;
        default:
            break;
    }

    if (giftLevel > 1 && im.getPlayer().getTodayOnlineTime() < (giftLevel * 10)) {
        im.playerMessage(1, "����ʱ�䲻��" + (giftLevel * 10) + "���ӣ��޷������\r\n������ " + (giftLevel * 10 - im.getPlayer().getTodayOnlineTime()) + "����");
        im.dispose();
        return;
    }

    if (playerLevel < openReqLevel) {
        text = "�����ⳬֵ��������䡿\r\n(��" + openReqLevel + "�����ܴ�)\r\n�򿪺�ɻ��������Ʒ��\r\n\r\n";
        for (var i = 0; i < itemReward.length; i++) {
            if (itemReward[i][2] == giftLevel) {
                if (itemReward[i][0] == -1) {
                    text += "����ȯ " + itemReward[i][1] + " ��\r\n";
                } else {
                    text += im.getItemName(itemReward[i][0]) + " �� " + itemReward[i][1] + " ��\r\n";
                }
            }
        }
        im.playerMessage(1, text);
        im.dispose();
        return;
    }

    for (var i = 0; i < itemReward.length; i++) {
        if (itemReward[i][2] == giftLevel) {
            newItemReward.push(itemReward[i]);
        }
    }

    if (im.getInventory(2).isFull(newItemReward.length - 1)) {
        im.playerMessage(1, "�����ⳬֵ��������䡿\r\n(" + openReqLevel + "�����)\r\n\r\n�������ռ䲻�㣬��Ҫ " + newItemReward.length + " ��ռ䡣");
        im.dispose();
        return;
    } else if (im.getInventory(3).isFull(1)) {
        im.playerMessage(1, "�����ⳬֵ��������䡿\r\n(" + openReqLevel + "�����)\r\n\r\n�������ռ䲻�㣬��Ҫ 1 ��ռ䡣");
        im.dispose();
        return;
    }

    for (var i = 0; i < newItemReward.length; i++) {
        if (newItemReward[i][0] == -1) {
            im.getPlayer().modifyCSPoints(2, newItemReward[i][1]);
            text += "����ȯ " + newItemReward[i][1] + " ��\r\n";
            continue;
        }
        im.gainItem(newItemReward[i][0], newItemReward[i][1]);
        text += im.getItemName(newItemReward[i][0]) + " �� " + newItemReward[i][1] + " ��\r\n";
    }

    // ����Ѿ�����߼�������������ĵ�
    if (giftLevel == giftMaxNum) {
        im.gainItem(2431092, -1);
    }
    im.setBossLog("�������" + giftLevel, 1);
    im.playerMessage(1, "�����ⳬֵ��������䡿\r\n(" + openReqLevel + "�����)\r\n��ϲ���ѻ�ã�\r\n\r\n" + text);
    im.dispose();
}