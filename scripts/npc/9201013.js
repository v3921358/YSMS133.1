/*
	����: 		�������Ů
	��ͼ: 		�����
	����: 		����ԤԼ����
*/

var status = -1;
var mainmenu = "��ð�������������ð������Ǹ���ԤԼ������������Ů����Ҫ�Ұ�æ��\r\n\r\n#b#L0# ��ԤԼ������Ҫ��Щʲô��#l\r\n#L1# ����ԤԼ���ӻ���#l\r\n#L2# ����ԤԼ��������#l\r\n#L3# ����ԤԼ��������#l"

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple(mainmenu);
    } else if (status == 1) {
        if (selection == 0) {
            status = 2;
            cm.sendNext("��ԤԼ���񣬻���Ҫ����ȡ#b���ȯ#k��#b�����ָ#k�ȶ��������Ȼ����λ�Ƿ��మ���Ǳ�Ҫ�����ˡ������������Щ�������ͺ�#b����������2�����#k��ȥԤԼ����ɡ�ԤԼ֮����ü����йػ���ԤԼ����Ʒ�����Լǵ���#b�������ճ�2�����ϵĿռ�#k��");
        } else if (selection == 1) {
            cm.sendNext("�ݲ�֧��...");
            cm.dispose();
        } else if (selection == 2) {
            cm.sendNext("�ݲ�֧��...");
            cm.dispose();
        } else if (selection == 3) {
            cm.sendNext("�ݲ�֧��...");
            cm.dispose();
        }
    } else if (status == 2) {
        cm.sendNext("��ԤԼ���񣬻���Ҫ����ȡ#b���ȯ#k��#b�����ָ#k�ȶ��������Ȼ����λ�Ƿ��మ���Ǳ�Ҫ�����ˡ������������Щ�������ͺ�#b����������2�����#k��ȥԤԼ����ɡ�ԤԼ֮����ü����йػ���ԤԼ����Ʒ�����Լǵ���#b�������ճ�2�����ϵĿռ�#k��");
    } else if (status == 3) {
        cm.sendNextPrev("���ˣ�ԤԼ����֮���#b����ȡ��ԤԼ��Ҳ����ȡ�����顣#k�����������ؿ���֮������ԤԼ��");
        cm.dispose();
    }
}