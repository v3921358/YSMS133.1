/*
 ��о��������ƹ���������
 ���ʱ�䣺2013��8��31�� 12:39:02
 �ű����ܣ����ﰲ�����
 */

var a = 0;

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
            if (cm.getMap().getId() == 980010101 || cm.getMap().getId() == 180000000) {
                cm.sendOk("#e<���ﰲ�ؾ�����:ע������>#n\r\n#d\r\n\r\n#b1�����뾺�����󣬽�������ӵ�ʱ��������\r\n2���ڹ涨ʱ���ڣ�����Ĺ���Խ�࣬����ʱ��ý���Խ�ࡣ\r\n#e3������������壬�����п��µĹ�����֡�#n\r\n4������У�����������Ľ����ж���Ľ�����\r\n5���Ӿ�������ȡ�Ļ��֣����Դ��������һ�������");
            } else {
                cm.warp(910000000);
            }
            cm.dispose();
        }//a
    }//mode
}//f