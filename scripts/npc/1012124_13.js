/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��10��28�� 16:34:19
 �ű����ܣ���ս����
 */

var a = 0;
var selects;
var head = "";//#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n
var BossList = Array(
        Array("[�ͼ�] ���ӣ������޴Ρ�", 220080000),
        Array("[�ͼ�] ������/�İ�ʨ���������޴Ρ�", 551030100),
        Array("2Ƶ��������/3Ƶ����������.����4/����3��", 211042200),
        Array("3Ƶ�����׺�����/2��4Ƶ���򵥺���������4/����3��", 240040700),
        Array("1Ƶ����Ʒ����/2Ƶ������Ʒ���͡���1/����1��", 270050000),
       // Array("[��ͨ] ��Ԫ��϶-�������ռ�̳", 272030000),
        Array("[�ͼ�]����Ů�������޴Ρ�", 300030300),
		Array("#r[�߼�]Ů�ʡ�ÿ��1�Ρ�", 271040000),
        //Array("#r[̩̹��] ǿ�����,��С���(New~)", 703020000),
        Array("#r[�߼�]  �Ĵ�����BOSS��ƾԿ�׽��롿 ��", 105200000),
       // Array("[ǿ��BOSS] ��ͷȮ - Ѫ���ǳ��ࡣ", 510101100),
        Array("[�߼�] ǧ���������ż������޴Ρ�", 541020800),
        Array("[�߼�] ʨ����֮�� ��ÿ��1�Ρ�", 211070000),
        Array("#d[ج�μ�] ���˱��յ¡�ÿ��2�Ρ�", 863000100),
        Array("[ج�μ�]  ���������˹��ÿ��2�Ρ�", 401072000)
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
            var text = head + "Ϊ�˸��������Ϸ����������Դ��͵�BOSS�Ĵ��͵㡣\r\n#b"
            for (var i = 0; i < BossList.length; i++) {
                text += "#L" + i + "# " + BossList[i][0] + "\r\n"
            }
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo(head + "�������������" + BossList[selects][0] + "��")
        } else if (a == 2) {
            cm.saveLocation("MULUNG_TC");
            cm.warp(BossList[selects][1], 0)
            cm.dispose();
        }//a
    }//mode
}//f