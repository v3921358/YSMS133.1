/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��10��28�� 16:34:19
 �ű����ܣ���ս����
 */

var a = 0;
var selects;
var BossList = Array(
        Array("[��ͨ] ��ս������ͼ˹��", 220080000),
        Array("[��ͨ] �����ܡ��İ�ʨ����", 551030100),
        Array("[��/����] 1��2��Ϊ��ͨ������3��Ϊ����������", 211042200),
        Array("[��ͨ/����] 3��Ϊ���׺�������2��4��Ϊ��ͨ������", 240040700),
        Array("[��ͨ/����] 1��Ϊ��ͨƷ���ͣ�2��Ϊ����Ʒ����", 270050000),
        Array("[��ͨ] ��Ԫ��϶-�������ռ�̳", 272030000),
        Array("[��ͨ] ����Ů��-�������", 300030300),
		Array("[��ʿ��] Ů�� - ϣ��˹��ͥԺ", 271040000),
      //  Array("#r[̩̹��] ǿ�����,��С���(New~)", 703020000),
        Array("#r[�޴�����] ³����˹ - �Ĵ�����BOSS ��", 105200000),
        Array("[������ͼ] ��ʱ�����ͷȮ��ͼ", 240030104),
		//Array("[ǿ��BOSS] ��ͷȮ - Ѫ���ǳ��ࡣ", 510101100),
        Array("[����BOSS] �¼��� - ǧ���������ż���", 541020800),
        Array("[�ࡤ�װ�] ʨ����֮�� - �Ӽ�������", 211070000),
        Array("#d[ج�ε�����] �����ػ���֮�� - ���յ����(New~)", 863000100),
        Array("[ج�ε�����] �����Ǳ�ս�� - ���������˹(New~)", 401072000)
        )

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
            var text = "Ϊ�˸��������Ϸ����������Դ��͵�BOSS�Ĵ��͵㡣\r\n#b"
            for (var i = 0; i < BossList.length; i++) {
                text += "#L" + i + "# " + BossList[i][0] + "\r\n"
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo("�������������" + BossList[selects][0] + "��")
        } else if (a == 2) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(BossList[selects][1], 0)
            cm.dispose();
        }//a
    }//mode
}//f