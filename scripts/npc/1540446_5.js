/*
 * ˹��11�س�������
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 */

function start() {
    if (cm.getSpace(4) < 1) {
        cm.playerMessage(-1, "������ո��㣬���顣");
    } else {
        var rand = Math.floor(Math.random() * 2)+1;
            cm.gainItem(4009159, rand);
            cm.playerMessage(-1, "��� �������� "+rand+"����");
    }
    cm.dispose();
}