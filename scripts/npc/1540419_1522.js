/* ����̳� - ñ�� */

var status = -1;
var itemList = Array(
// -----�۸�Ϊ 10000 ��� --------
//130�汾��װñ��

Array(1000087, 10000),//��ɫ������ͷ��
Array(1001108, 10000),//�ۺ������ͷ��
Array(1004472, 10000),//���Ǵ�˵ñ��
Array(1004403, 10000),//��������
Array(1004094, 10000),//���ɿ������ӷ���
Array(1003867, 10000),//����̫��ñ
Array(1004635, 10000),//ë�߱�֯ñ
Array(1003387, 10000),//����ë��ñ
Array(1004642, 10000),//�۹��ñ��
Array(1004568, 10000),//��������ñ
Array(1004544, 10000),//���Ⱥ�è����ñ
Array(1004708, 10000),//ů����ñ��
Array(1004706, 10000),//��������ñ
Array(1004641, 10000),//�������Ȼ�
Array(1004411, 10000),//��ݮ����
Array(1004709, 10000),//������ñ
Array(1004710, 10000),//������ñ
Array(1004658, 10000),//˪��¹��
Array(1004657, 10000),//��¶¹��
Array(1004656, 10000),//����¹��
Array(1004655, 10000),//����¹��
Array(1004632, 10000),//����С�ݷ���
Array(1004631, 10000),//���Ȼ�������
Array(1004630, 10000),//���Ȼ��ŷ���
Array(1004629, 10000),//����С������
Array(1004628, 10000),//����СҶ�ӷ���
Array(1004602, 10000),//ũ��Ĺ屦
Array(1004601, 10000),//С���ñ��
Array(1004590, 10000),//��ݮ��ʯͷ��
Array(1004589, 10000),//����è����
Array(1004580, 10000),//����ѧԺ������Ʒ
Array(1004571, 10000),//�����ű���ñ
Array(1004570, 10000),//��ɫ����ñ
Array(1004569, 10000),//�ʺ绨��ñ��
Array(1004543, 10000),//����ͷ��
Array(1004533, 10000),//��������Ϸ��
Array(1004525, 10000),//����
Array(1004508, 10000),//Ů�ʵ�����
Array(1004512, 10000),//���Ʒ����ñ��
Array(1004506, 10000),//��ɫ�ö�����
Array(1004505, 10000),//�ۺ�ӣ��˿��
Array(1004504, 10000),//���廨��ñ��
Array(1004501, 10000),//��������
Array(1004490, 10000),//��̶���
Array(1004489, 10000),//���÷���
Array(1004488, 10000),//����֮˿��
Array(1004486, 10000),//��֮����
Array(1004478, 10000),//BOYñ
Array(1004471, 10000),//ˮ��������˿��
Array(1004469, 10000),//��������
Array(1004467, 10000),//�ش��Ŀ���ñ
Array(1004455, 10000),//��ɫ���ӹܼ�ñ
Array(1004454, 10000),//��ѩ����ñ
Array(1004453, 10000),//ѩ�ñ���ñ
Array(1004450, 10000),//ʮ��֮��
Array(1004448, 10000),//��ɫ����ñ
Array(1004199, 10000),//���ѷ���
Array(1004181, 10000),//�ǹ�����˿������
Array(1004175, 10000),//��ʹ����
//�������ϰ汾
Array(1002299, 10000), //ҡ��ñ
Array(1003241, 10000), //ҡ������ñ
Array(1004156, 10000), //�������ǵ���
Array(1004157, 10000), //�������ĵ���
Array(1004026, 10000), //��è�ޱ�ñ
Array(1004029, 10000), //�������ޱ�ñ
Array(1004124, 10000), //����С��ݮñ
Array(1004125, 10000), //�質����ñ
Array(1003955, 10000), //����õ��
Array(1004193, 10000), //��ֳ��ñ
Array(1000043, 10000), //ʥ����װ��ñ-�к�
Array(1000050, 10000), //����ѩˮ��
Array(1001076, 10000), //ӣ��ѩˮ��
Array(1003955, 10000), //����õ��
Array(1000062, 10000), //���Ӻ��ܲ�����ñ(��)
Array(1001089, 10000), //���Ӻ��ܲ�����ñ(��)
Array(1003892, 10000), //��Ҷ��ʯ
Array(1003588, 10000), //��߷���ñ��
Array(1004112, 10000), //�ɰ���ֽñ
Array(1003862, 10000), //С��˿��
Array(1004092, 10000), //С���Թ�ñ
Array(1004110, 10000), //��ɫ���㷢��
Array(1004111, 10000), //��ɫ���㷢��
Array(1004126, 10000), //�����ܶ�ñ
Array(1004137, 10000), //������ñ
Array(1004190, 10000), //΢Ц���ɶ���
Array(1004200, 10000), //�����ò�ñ
Array(1004203, 10000), //�����˵�����
Array(1004204, 10000), //��ɫС��������֯ñ
Array(1004205, 10000), //��ɫС��������֯ñ
Array(1004211, 10000), //�������޶�
Array(1004295, 10000), //���ַ���С��ñ
Array(1004296, 10000), //�ȶ�����С��ñ
Array(1004180, 10000), //��Ƥñ��
Array(1004298, 10000), //̩����Ȯñ(��)
Array(1004299, 10000), //̩����Ȯñ(��)
Array(1004332, 10000), //�Ұ�С��
Array(1004094, 10000), //���ɿ������ӷ���
// -----�۸�Ϊ 8000 ��� --------
Array(1004393, 8000), //������װ
Array(1004394, 8000), //������װ
Array(1004395, 8000), //������װ
Array(1004396, 8000), //��������װ
Array(1004398, 8000), //ſſ����
Array(1004399, 8000), //ſſ����
Array(1004400, 8000), //ſſ����
Array(1004401, 8000), //ſſ������
Array(1004402, 8000), //ſſ�����;���
Array(1003909, 8000), //�����մ�ñ
Array(1004413, 8000), //�ǹ����ڵ�ѱ¹��
Array(1004397, 8000), //��ɨͷ��
Array(1004191, 8000), //�ۺ���ʹ���ñ
Array(1004196, 8000), //�糵ͷ��
Array(1004171, 8000), //��תľ��ñ
Array(1004164, 8000), //˿��ͷ��
Array(1004165, 8000), //õ����ҫ
Array(1004166, 8000), //��ɫ�����ᷢ��
Array(1004167, 8000), //��ɫ����ñ
Array(1004168, 8000), //����è��ñ
Array(1004169, 8000), //��ζ�ɰ���ñ
Array(1004170, 8000), //��쵿ɰ��İŷ�ñ
Array(1004187, 8000), //С����ñ��
Array(1004188, 8000), //��ѩ��ñ��
Array(1004185, 8000), //��ɫĢ��ñ
Array(1004186, 8000), //�׺����ʨñ��
Array(1004189, 8000), //�����ñ��
Array(1004158, 8000), //�����ɶԷ���
Array(1002495, 8000), //������ë��ñ
Array(1003883, 8000), //������˿������ñ
Array(1004114, 8000), //��ӣ����ñ
Array(1003596, 8000), //�����ڰ���ñ
Array(1003859, 8000), //������������
Array(1003945, 8000), //������������
Array(1003953, 8000), //��֮��ͷ��
Array(1003919, 8000), //��������ñ
Array(1003865, 8000), //�ǹ�Ʈ��ñ��
Array(1003920, 8000), //�����Ĳ�ñ
Array(1003934, 8000), //Ӱ�Ӷ���
Array(1003460, 8000), //�����ɿ���ñ��
Array(1001068, 8000), //���ų��ٷ�-Ů��
Array(1000045, 8000), //���ų��ٷ�-�п�
// -----�۸�Ϊ 5000 ��� --------
Array(1003968, 5000), //С��������żñ
Array(1003967, 5000), //�ɿ���ñ��
Array(1004025, 5000), //��èèñ��
Array(1004033, 5000), //��èèñ��
Array(1002796, 5000), //�ɰ�С����ñ��
Array(1004081, 5000), //�����ñ
Array(1003840, 5000), //��Ӱ��ʿñ��
Array(1003802, 5000), //С�����̶�ñ��
Array(1003803, 5000), //С�����ƶ�ñ��
Array(1003796, 5000), //���۱����ñ
Array(1003753, 5000), //���ñ
Array(1004000, 5000), //�ڰ�С��ħñ��
Array(1003776, 5000), //�����װ�ñ
Array(1003539, 5000), //��ɫ��ʹñ
Array(1003516, 5000), //С�۷�ñ��
Array(1003509, 5000), //ʱ���㳦ñ
Array(1003530, 5000), //����ţ��ñ
Array(1003506, 5000), //����ս��ͷ��
Array(1003005, 5000), //��Ҷ������ͷ��
Array(1003649, 5000), //����ս��(����)
Array(1003650, 5000), //Ѫ��ս��(����)
Array(1003651, 5000), //Ӱ��ͷ��(����)
Array(1003652, 5000), //��ʥħ��ñ(����)
Array(1003653, 5000), //����ͷ��(����)
Array(1003273, 5000), //[�ɶ�]�ڷ�ñ
Array(1003274, 5000), //[�ɶ�]��ɫñ��
Array(1003275, 5000), //[�ɶ�]�ɰ�ţͷñ
Array(1004158, 5000), //�����ɶԷ���
Array(1004162, 5000), //��è����
Array(1001049, 5000), //�����޷���
Array(1000027, 5000), //��ͯñ
Array(1001039, 5000), //��Ůñ
Array(1002976, 5000), //Ů��ͷ��
Array(1003147, 5000), //����Ů��ͷ��
Array(1002943, 5000), //ˮ��ñ
Array(1003044, 5000), //С��ñ��
Array(1003853, 5000), //Blavy��ʹ֮��
Array(1003760, 5000), //è�����
Array(1003759, 5000), //���д�è��ñ
Array(1003505, 5000), //������
Array(1003504, 5000), //������
Array(1003761, 5000), //ʥ����ʹñ
Array(1004095, 5000), //�����߶���
Array(1003730, 5000), //è��������ñ��
Array(1003508, 5000), //������ñ��
Array(1002890, 5000), //˿����������ɫ��
Array(1002888, 5000), //˿����������ɫ��
Array(1003207, 5000), //���ܲ��ñ�ըͷ
Array(1003269, 5000), //��������ñ
Array(1003268, 5000), //���۰���ñ
Array(1003492, 5000), //���ɵ�����˾
Array(1003493, 5000), //������������˾
Array(1003494, 5000), //Q��������˾
Array(1003495, 5000), //��������˾
Array(1003496, 5000), //ѽ����Ϻ��˾
Array(1003249, 5000), //8���������ƾ�
Array(1003250, 5000), //8���������챦ʯ
Array(1003251, 5000), //8����������ˮ��
Array(1003252, 5000), //8����������ˮ��
Array(1003253, 5000), //8������������ɫ
Array(1003254, 5000), //8��������ϣ����
Array(1003255, 5000), //8����������ɫ
Array(1003256, 5000), //8����������ɫ
Array(1003965, 5000), //С����żñ
Array(1002422, 5000), //����ǹ�ñ
Array(1004028, 5000), //��è�ޱ�ñ
Array(1003779, 5000), //����˿����ñ
Array(1003714, 5000), //��������
Array(1003935, 5000), //���Ⱥ�����
Array(1004162, 5000), //��è����
Array(1002479, 5000), //ѩ��ñ
Array(1002526, 5000), //�׹�ñ��
Array(1002599, 5000), //�ƽ��
Array(1002720, 5000), //¹��ʥ��ñ
Array(1002734, 5000), //��ʨͷ
Array(1003536, 5000), //¶���ñ��
Array(1002960, 5000), //��ɫ����
Array(1003458, 5000), //éɽ��ʿñ
Array(1004014, 5000), //��׼�о�, �úý⿪��������
Array(1004039, 5000), //���»�ñ
Array(1001092, 5000), //���»���
Array(1000070, 5000), //�ıİ���ñ
Array(1000072, 5000), //��ɫǮ����
Array(1001097, 5000), //���α���ñ
Array(1000029, 5000), //������ɴ
Array(1000035, 5000), //�����ñ
Array(1004113, 5000), //��ʬ�������ɴ
Array(1000011, 5000), //�̻��ֿ�
Array(1001080, 5000), //���ֿܸ�
Array(1001079, 5000), //���Ǹֿ�
Array(1000026, 5000), //ʥ���к���ñ
Array(1001036, 5000), //ʥ��Ů����ñ
Array(1001063, 5000), //����ʥ��ñ
Array(1000006, 5000), //��ʽŮ����
Array(1000037, 5000), //��ʽ�з���
Array(1000060, 5000), //�������
Array(1000046, 5000), //�������ٷ�-�п�
Array(1001069, 5000), //�������ٷ�-Ů��
Array(1004192, 5000), //���������
Array(1003014, 5000), //ŮŮ����ñ
Array(1003015, 5000), //���л���ñ
Array(1001030, 5000), //������
Array(1001075, 5000), //ʥ��֮��
Array(1001095, 5000), //�ۺ�Ǯ����
Array(1000072, 5000), //��ɫǮ����
Array(1002203, 5000), //����ñ
Array(1002204, 5000), //����ñ
Array(1002205, 5000), //����ñ
Array(1002206, 5000), //����ñ
Array(1002224, 5000), //�ϻ����
Array(1002293, 5000), //��ɫ˯ñ
Array(1002294, 5000), //��ɫ˯ñ
Array(1003743, 5000), //��������ñ
Array(1004123, 5000), //ʱ��СԲñ
Array(1004140, 5000), //���ų�˹�����
Array(1004141, 5000), //���ų����װ����
Array(1004142, 5000), //���ų�³ϣ�����
Array(1004144, 5000), //���ų��ࡤ�װ����
Array(1004145, 5000), //���ų������������
Array(1004146, 5000), //���ų��¶������
Array(1004147, 5000), //���ų��������
Array(1004148, 5000), //���ų�ϣ�����
Array(1004139, 5000), //������ñ
Array(1004136, 5000), //δ����ʹñ
Array(1003078, 5000), //�������
Array(1002672, 5000), //����ñ
Array(1002673, 5000), //����ñ
Array(1002674, 5000), //ͭ��ñ
Array(1002700, 5000), //�̶��۹�Ӥ
Array(1002701, 5000), //�̶����Ӥ
Array(1002696, 5000), //�źŵ�ñ
Array(1002703, 5000), //����۹�Ӥ
Array(1002705, 5000), //������Ӥ
Array(1002704, 5000), //�ƶ��۹�Ӥ
Array(1002706, 5000), //�ƶ����Ӥ
Array(1002607, 5000), //�˽�ñ
Array(1002592, 5000), //��ʥͷ��
Array(1002568, 5000), //�ֹ���֯����
Array(1003001, 5000), //������ʿͷ��
Array(1002558, 5000), //����ñ
Array(1002499, 5000), //�׻�ñ
Array(1002493, 5000), //����ñ
Array(1003756, 5000), //����ñ
Array(1002536, 5000), //��ٵ�
Array(1002542, 5000), //����ͷ
Array(1002548, 5000), //����ͷ
Array(1002549, 5000), //��èͷ
Array(1002823, 5000), //�׶�ͷ��
Array(1002456, 5000), //ˮƿ��ñ
Array(1002457, 5000), //˫����ñ
Array(1002458, 5000), //������ñ
Array(1002459, 5000), //��ţ��ñ
Array(1002460, 5000), //˫����ñ
Array(1002461, 5000), //��з��ñ
Array(1002462, 5000), //ʨ����ñ
Array(1002463, 5000), //��Ů��ñ
Array(1002464, 5000), //�����ñ
Array(1002465, 5000), //��Ы��ñ
Array(1002466, 5000), //������ñ
Array(1002467, 5000), //ɽ����ñ
Array(1002367, 5000), //��ʹ֮��
Array(1002552, 5000), //����ñ��
Array(1001061, 5000), //����ɯ�׼ٷ�
Array(1001064, 5000), //��ҫGirlñ��
Array(1000044, 5000), //��ҫBoyñ��
Array(1000074, 5000), //���α���ñ
Array(1001097, 5000), //���α���ñ
Array(1002322, 5000), //��Ϻñ
Array(1003227, 5000), //����ñ��
Array(1002877, 5000), //ţţ����ñ��
Array(1003519, 5000) //ϼ���ñ
);
var selectedItem = -1;
var selectedCost = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] / 1 + " #k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1] / 1;
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + " #k �����");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "����̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem + "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("��û����ô������\r\n\r\n����#i" + selectedItem + ":# #b#t" + selectedItem + "##k ��Ҫ #r" + selectedCost + "#k �����");
        }
        cm.dispose();
    }
}