/*
 �ű����ܣ�Ӣ������������ء�
 */

var status = -1;
var letter = Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
var item;
var count = Array();//���㴢��

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("��ã�����Ӣ���Ĵ���������\r\n#b#L0#��Ҫ�ش����⡣#l\r\n#L1#�뿪Ӣ��塣#l");
    } else if (status == 1) {
        if (selection == 0) {
            var letters = cm.getPlayer().getEventInstance().getProperty("answer");//�õ���
            var needed = Array(letters.length);//�õ��𰸵����鳤�ȣ�1�����кܶ���ĸ��
            var done = 0;
            if (!cm.isLeader() || cm.getPlayer().getEventInstance() == null) {
                cm.sendOk("���������ӳ�����̸����");
            } else {
                // ������ĸ��Ҫ��ʼ
                for (var i = 0; i < letters.length(); i++) {
                    for (var x = 0; x < letter.length; x++) {
                        if (letters.substring(i, i + 1).equals(letter[x])) {//��Դ𰸵���ID
                            needed[i] = 3994059 + x;//������Ҫ��Ʒ������
                            //cm.playerMessage(needed[i]);//����Ա������
                            //cm.gainItem(needed[i], 1)
                            break;
                        }
                    }
                }
                //����������� �ظ���Ӣ����ĸ �����жϣ��Ѵ������ص�done Ȼ���������done���ʹ������ά���Ƚ� ���һ�� ��ͨ��
                for (var i = 0; i < needed.length; i++) {
                    var num = 0;
                    for (var x = 0; x < needed.length; x++) {
                        if (needed[x] == needed[i]) {
                            num++;//ÿ����ĸ�ĸ���
                        }
                    }
                    //��ʼ�ж���Ʒ done�Ǽ����Ƿ񸽺��������
                    if (cm.haveItem(needed[i], num)) {//�����ɫ�����ID�Ļ���done++
                        done++;
                    }
                    count.push(parseInt((cm.itemQuantity(needed[i]) / num)));//�������õĴ���������֮����ð�ݷ�������
                }
                //ð�����򷨿�ʼ��ȡ��С������Ӧ��������
                for (var i = 0; i < count.length; i++) {
                    for (var j = 0; j < count.length; j++) {
                        var temp;
                        if (count[i] < count[j]) {
                            temp = count[j];
                            count[j] = count[i];
                            count[i] = temp;
                        }
                    }
                }
                item = count[0];//��С������
                var lettersNot = 0;
                for (var i = 3994059; i < 3994085; i++) {
                    var aa = 0;
                    for (var x = 0; x < needed.length; x++) {
                        if (needed[x] == i) {
                            aa++;
                            break;
                        }
                    }
                    if (num == 0 && cm.haveItem(i, 1)) { //�����ĸ���ڴ����飬��������߽�ɫӵ��
                        lettersNot++;
                    }
                }
                if (lettersNot > 0) {
                    cm.playerMessage("�����ϵ�Ӣ����ĸ�����ϴ𰸵�Ҫ�������ԣ�");
                    cm.showEffect(true, "englishSchool/wrong/wrong_kor");
                    cm.playSound(true, "Party1/Failed");
					cm.dispose();
                } else if (done != needed.length) {
                    cm.playerMessage("��û�и�����ǲ���û���ù�����Ҫ�ĵ��ʣ���");
                    cm.showEffect(true, "quest/party/wrong_kor");
                    cm.playSound(true, "Party1/Failed");
					cm.dispose();
                } else { //�����ȷ
                    cm.sendSimple("������~����ô�ѵ���Ŀ�㶼�ش���ȷ�ˣ�#b\r\n#L0# ��ȡ�����˳�Ӣ��塣");
                }
            }
        } else if (selection == 1) {
            for (var i = 3994059; i < 3994085; i++) {
                cm.removeAll(i);
            }
            cm.warp(702090400, 0);
            cm.dispose();
        }
    } else if (status == 2) {
        for (var i = 3994059; i < 3994085; i++) {
            cm.givePartyItems(i, 0, true);
        }//ɾ�������ĸ��Ʒ
        cm.givePartyItems(4033943, item);
        cm.warpParty(702090400, 0);
    }
}