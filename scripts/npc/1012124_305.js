/*
 ���ʱ�䣺2013��8��11�� 13:05:43
 �ű����ܣ���½�ƶ�����
 */
var isopenvip = false;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var tiaotiaomaps = Array(
        Array(500000000,"ˮ���г�"),
        Array(702000000,"��ɽ��"),
        Array(700000000,"���������"),
        Array(600000000,"��Ҷ��"),
        Array(540000000,"����������"),
        Array(800000000,"�Ŵ�����"),
        Array(701000000,"�Ϻ���̲"),
        Array(702100000,"���۱���"),
        Array(550000000,"��¡����")

        ); 

var a = 0;
var selects = 0;
var MapType;

function start() {
    a = -1;
    action(1, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else {
			cm.dispose();
			return;
        }
        if (a == -1) {
            cm.dispose();
		}
        if (a == 0) {
            var text = "��ѡ����Ҫ���͵ĵ�ͼ��#b\r\n\r\n"
           for (var i = 0; i < tiaotiaomaps.length; i++) {
                       text += "#L" + i + "# "+icon+" #m" + tiaotiaomaps[i][0] + "# (" + tiaotiaomaps[i][1] + ")\r\n"
                    }
                    MapType = 3
                    needMoney = true;
            cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo("������������������ȷ��Ҫȥ����Ҫȥ�ĵط�����");
        } else if (a == 2) {
			cm.warp(tiaotiaomaps[selects][0],0);
            cm.dispose();
        }//a
    }//mode
}//f