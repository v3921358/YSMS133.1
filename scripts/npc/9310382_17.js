var status;
var text;
var column = new Array("װ��", "����", "����", "����", "�̳�");
var sel;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else {
            cm.dispose();
            return;
        }

        if (status == 0) {
            text = "#d#eһ�����������Ŀ���ߣ������ʹ�ã�����ɾ��������Ʒ�����磺#r����װ����150װ����160װ����VIP���غ���#d�ȡ�Gmһ�Ų������������֮ǰ���������ɾ�ȡ�����Ը���#n\r\n\r\n";
            for (var i = 1; i <= 5; i++) {
                text += "#L" + i + "##r[��������] #b���� #e#r" + column[i-1] + "�� #n#b�����е���#l\r\n";
            }
            cm.sendSimple(text);
        } else if (status == 1) {
            sel = selection;
            cm.sendYesNo("#r�Ƿ�Ҫ���" + column[sel-1] + "�������е��ߣ������˲��������棡");
        } else if (status == 2) {
            cm.removeAllItem(sel);
            cm.sendOk("������");
            cm.dispose();
        }
    }
}