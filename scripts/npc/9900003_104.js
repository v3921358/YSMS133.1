/*
 ���ʱ�䣺2013��8��22�� 12:26:36
 �ű����ܣ�[HOTTIME]���ֲ²²£�
 */

var a = 0;
var randomNumber = Array();
var n1;
var n2;
var n3;
var itemData = Array(
        3010226, //�¹���������
        2022000, //��Ȫˮ
        1003154, //���˹��?�װ�ͷ��
        1003155, //�������?�װ�ͷ��
        1102275, //ʨ��ս������
        1402113, //ά���ذ�?�װ�����
        1452107, //����˹��?�װ���
        1452131, //���ְ�?�װ���
        1362020, //ŵ��˹��?�װ�����
        1332152, //˹����?�װ�ذ��
        1492103, //÷����?�װ���ǹ
        1522019, //����˹��?�װ�˫��ǹ
        1532039, //÷����?�װ�������
        1472143, //˹����?�װ���ȭ
        1382126, //�տ�˹��?�װ�����
        1462120, //���ְ�?�װ���
        1332126, //ŵ��˹��?�װ�ذ��
        1322136, //ά���ذ�?�װ�ս��
        1372102, //�տ�˹��?�װ�����
        1302149, //���˹��?�װ�����
        1442113, //���˹��?�װ����鿪ɽ��
        1432084, //���˹��?�װ�ǹ
        1312095, //���˹��?�װ�ս��
        1322139, //���˹��?�װ���
        1402131, //���˹��?�װ�����
        1432119, //���˹��?�װ�ǹ
        1242015, //������?�װ�����������
        1212016, //��˹��?�װ���ҫ˫ͷ��
        1222016, //÷����?�װ���ɫ���
        1302128, //���
        1042187, // - �ۺ�������
        1042174, // - ҰӪ��
        1042149, // - ������������
        1702371, // - ����
        1702382, // - ����������֦
        1702388, // - �ܱ����Ǹ������ɽ�
        1072437, // - PB����
        1072348, // - ������
        1003268, // - ���۰���ñ
        1003237, // - ʨ�ӱ���ñ
        1003038, // - SD����ͷ
        1102488, // - ���Ɑ����
        1102549, // - �ܼҵ�è��
        1102450 // - ��ʹ��â֮��
        )
var pass = true;
var correct = 0
var NumberPosition = Array();


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
            cm.dispose();
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            for (var i = 1; i < 5; i++) {
                if (cm.getSpace(i) < 5) {
                    pass = false;
                }
            }
            if (cm.getBossLog('���ֲ²²�') >= 5) {
                cm.sendOk("�Բ������ֲ²²»һ��ֻ�ܽ�����Ρ�")
                cm.dispose();
            } else {
                cm.sendSimple("�����ڴ���HOTTIMEʱ���ֵ��ˣ��װ���ð�ռң�������Ҫ��ʲô�أ�\r\n#b#L0# ��Ҫ�����ֲ²²»��\r\n#L1# ����һ�´˻��")
            }
        } else if (a == 1) {
            if (selection == 0) {//��Ҫ�����ֲ²²»��
                if (pass) {
                    cm.sendNextS("ϵͳ���������10�����֣���������׼����¼����10�����֡�\r\n#r -- �����һ����ʼ������\r\n #r-- ����ж϶Ի����μӻ�������Ʒ���黹��", 3)
                } else {
                    cm.sendOk("����������б������ճ�5�����ӡ�")
                    cm.dispose();
                }
            } else if (selection == 1) {//����һ�´˻��
                a = -1;
                cm.sendNext("#e���ֲ²²»��Ϸ����#n#d\r\n\r\n1��ϵͳ���������10�����֣����ҹ�ʾ��\r\n2����10�����ֽ������ң������ء�\r\n3����һᱻ������ʵ�N��������ʲô\r\n����ش���ȷ���ɵõ�������\r\n4�����һ����3�����ʵĻ��ᡣ#e\r\n\r\n5�������������5������ \r\n - �ش���ȷ1�Σ����������õ�1�����ߡ�\r\n - �ش���ȷ2�Σ����������õ�3�����ߡ�\r\n - �ش���ȷ3�Σ����������е��߶����ߣ�#n\r\n\r\n �μӻ��ʱ���м��������б����ո���5�����ϵĿռ䡣")
            }//selection
        } else if (a == 2) {
            var temp;
            var i = 0;
            while (i < 10) {
                temp = Math.floor(Math.random() * 40);
                if (checkid(temp)) {
                    randomNumber.push(temp)//���0~39
                    i++;
                }
            }
            var text = "��10�������������Ϊ��\r\n #r- ���������ıʼ�������������֣�\r\n\r\n#d";
            for (var i = 0; i < randomNumber.length; i++) {
                text += "��" + (i + 1) + "������Ϊ�� - " + randomNumber[i] + "\r\n"
            }
            cm.sendNextS(text, 3);
        } else if (a == 3) {
            cm.sendNextS("���ڴ�����10�����֣�������һ��������", 3)
        } else if (a == 4) {
            randomNumber.sort(function() {
                return 0.5 - Math.random()
            })//�������
            var temp = Math.floor(Math.random() * 10) + 1;
            var i = 0;
            while (i < 3) {
                temp = Math.floor(Math.random() * 10) + 1;
                //cm.sendY(temp)
                if (checkNumberPosition(temp)) {
                    NumberPosition.push(temp)//���1~10
                    i++;
                }
            }//���λ�������ֲ�
            cm.sendGetNumber("�������������" + NumberPosition[0] + "�����֣�\r\n #r-- ����ж϶Ի����μӻ�������Ʒ���黹��\r\n", 0, 0, 999)
        } else if (a == 5) {
            n1 = selection; //��¼��ҵ�һ������
            cm.sendGetNumber("�������������" + NumberPosition[1] + "�����֣�\r\n #r-- ����ж϶Ի����μӻ�������Ʒ���黹��\r\n", 0, 0, 999)
        } else if (a == 6) {
            n2 = selection;
            cm.sendGetNumber("�������������" + NumberPosition[2] + "�����֣�\r\n #r-- ����ж϶Ի����μӻ�������Ʒ���黹��\r\n", 0, 0, 999)
        } else if (a == 7) {
            n3 = selection;
            cm.sendNextS("�������������Ϊ��\r\n\r\n ��" + NumberPosition[0] + "������ -- " + n1 + "\r\n ��" + NumberPosition[1] + "������ -- " + n2 + "\r\n ��" + NumberPosition[2] + "������ -- " + n3 + ".", 3)
        } else if (a == 8) {
            var text = "�����������������\r\n �������Һ��10������Ϊ��\r\n\r\n#b";
            for (var i = 0; i < randomNumber.length; i++) {
                if (i == (NumberPosition[0] - 1)) {
                    text += "��" + (i + 1) + "������Ϊ�� - " + randomNumber[i] + " #r( ���Ĵ�Ϊ��" + n1 + ")#b\r\n"
                } else if (i == (NumberPosition[1] - 1)) {
                    text += "��" + (i + 1) + "������Ϊ�� - " + randomNumber[i] + " #r( ���Ĵ�Ϊ��" + n2 + ")#b\r\n"
                } else if (i == (NumberPosition[2] - 1)) {
                    text += "��" + (i + 1) + "������Ϊ�� - " + randomNumber[i] + " #r( ���Ĵ�Ϊ��" + n3 + ")#b\r\n"
                } else {
                    text += "��" + (i + 1) + "������Ϊ�� - " + randomNumber[i] + "\r\n"
                }
            }
            cm.sendNextS(text, 3);
        } else if (a == 9) {//�ж��Ƿ��Բ���
            if (randomNumber[NumberPosition[0]-1] == n1) {
                correct += 1;
            }
            if (randomNumber[NumberPosition[1]-1] == n2) {
                correct += 1;
            }
            if (randomNumber[NumberPosition[2]-1] == n3) {
                correct += 1;
            }
            var text = "ϵͳ�ж���һ�������" + correct + "�Ρ�\r\n\r\n���ڽ������������еĵ���(���5��)��\r\n\r\n#b"

            itemData.sort(function() {
                return 0.5 - Math.random()
            })//������ҵ��߳�
            for (var i = 0; i < 5; i++) {//��ǰ5��
                text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n"
            }
            cm.sendNextS(text + "#d\r\n\r\n - �ش���ȷ1�Σ����������õ�1�����ߡ�\r\n - �ش���ȷ2�Σ����������õ�3�����ߡ�\r\n - �ش���ȷ3�Σ����������е��߶����ߣ�", 3)
        } else if (a == 10) {
            if (correct == 0) {//û�ش���ȷ
                cm.sendOk("�Բ�����û�лش���ȷ��\r\n��ȡ��Ʒ�ı�Ҫ�����Ǳ������ٻش�һ����ȷ��")
                cm.dispose();
            } else if (correct == 3) {//ȫ���ش���ȷ
                var text = "��ϲ�㣡�ش�3��ȫ����ȷ���㽫��ȡ�����ڵ�������Ʒ��\r\n\r\n#b"
                for (var i = 0; i < 5; i++) {//��ǰ5��
                    text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n"
                }
                cm.sendNextS(text + "#d\r\n\r\n�����Ʊ���Ŷ��", 3);
            } else if (correct == 1) {//��ȷ1��
                cm.gainItem(itemData[0], 1)
                cm.sendOk("���ͳɹ��� ϲ����������ĵ�����")
                cm.dispose();
            } else if (correct == 2) {//2����ȷ
                var text = "��ϲ�㣡�ش���ȷ" + correct + "�Σ����չ����㽫��ȡ�����ڵģ�\r\n\r\n#b"
                for (var i = 0; i < 3; i++) {
                    text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n"
                }
                a = 11;
                cm.sendNextS(text + "#d\r\n\r\n�����Ʊ���Ŷ��", 3);
            } else {
                cm.sendOk("������͹���Ա��ϵ��\r\n������룺" + correct)
            }
            cm.setBossLog('���ֲ²²�')
        } else if (a == 11) {//ȫ����ȷ
            for (var i = 0; i < 5; i++) {//��ǰ5��
                cm.gainItem(itemData[i], 1);
            }
            cm.sendOk("���ͳɹ��� ϲ����������ĵ�����")
            cm.dispose();
        } else if (a == 12) {//2��
            for (var i = 0; i < 3; i++) {
                cm.gainItem(itemData[i], 1);
            }
            cm.sendOk("���ͳɹ��� ϲ����������ĵ�����")
            cm.dispose();
        }//a
    }//mode
}//f


function checkid(number) {//����Ƿ��ظ�
    var i = 0;
    while (randomNumber.length >= i) {
        if (randomNumber[i] == number) {
            return false;
        }
        i++;
    }
    return true;
}

function checkNumberPosition(number) {//����Ƿ��ظ�
    var i = 0;
    while (NumberPosition.length >= i) {
        if (NumberPosition[i] == number) {
            return false;
        }
        i++;
    }
    return true;
}