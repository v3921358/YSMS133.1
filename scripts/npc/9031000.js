var status = -1;

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
        cm.sendNext("���˽�רҵ�����Ļ��������򵥵�˵��һ�¡�����������У�һ����#b��ҩ���ɿ�װ����������Ʒ������������#k5�����ˡ�Ϊ�����רҵ������Ч�������ǽ���Э��涨ÿ���˿���ѧϰ2��רҵ��������������涨�������ѡ��ѧϰ#r2��רҵ����#k��");
    } else if (status == 1) {
        cm.sendPrev("#b - ��ҩ + ������ - �ɿ� + װ������ - �ɿ� + ��Ʒ����#k\r\n\r\n��������3�ִ�����ѡ����ѡ��ѧϰ�Լ�ϲ���ļ�����");
        cm.dispose();
    }
}