/*
	�ű�����: 		NPC
	���ڵ�ͼ:		���ǵ�
	�ű�����:		��𽹬��ͼ�뿪NPC
*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == -1) {
            cm.dispose();
        } else if (status == 0) {
            cm.sendSimple("ף��λϲ����Ե���帣�ĺ����������ӣ�#b\r\n#L0# �����ˣ��뵽������д���͡�")
        } else if (status == 1) {
            cm.warp(700000200)
            cm.dispose();
        }
    }
}