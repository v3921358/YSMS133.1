/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��10��28�� 16:34:19
 �ű����ܣ���ս����
 */

var a = 0;
var selects;
var BossList = Array(
        Array("#k#n[��] 1-5����ս���ӣ�", 220080000),
        Array("[��] 1-5����ս�����ܡ��İ�ʨ����", 551030100),
        Array("[��] 1-5����ս-�������ռ�̳!", 272030000),
        Array("[��] 1����սŮ��-�������!", 300030300),
        //Array("[��] 1-5����ս-ǧ���������ż���", 541020800),
        Array("[��] 2-4����ս-ʨ����!", 211070000),
        Array("[����] 2��Ϊ��ͨ��3��Ϊ����������#k#b\r\n", 211042200),


        Array("[������]   3/5�߽���2/4��Ϊ��ͨ!", 240040700),
        Array("[Ʒ����]   1/2����ͨ3/4��Ϊ����!", 270050000),
	Array("[Ů��]     1Ƶ��Ů�� - ϣ��˹��ͥԺ!��", 271040000),
       // Array("[̩̹��] ǿ�����,��С���(New~)", 703020000),
        Array("[�Ĵ�����] 1-5Ƶ�� - �Ĵ�����BOSS! \r\n", 105200000),


        Array("#k#r[����] 3/6��  - ���˱��յ�", 863000100),
        Array("[����] 4/5�� - ���������˹", 401072000),
	Array("[����] 4/5�� - ��ɫ�����ռ�˹��", 350020120)
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
            var text = "Ϊ���������������Ϸ����������Դ��͵�BOSS�Ĵ��͵㡣\r\n#r������ʾ��#k\r\n#n��ɫ�����ʺ������������Ƽ�1-30W���\r\n#b��ɫ����Ƚ��Ѵ��Ƽ�30W-100W���\r\n#r��ɫ����Ѫ���ǳ��࣬�Ƽ�100-200W���\r\n��ѡ��:\r\n#b"
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