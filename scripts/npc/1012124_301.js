/*
 ���ʱ�䣺2013��8��11�� 13:05:43
 �ű����ܣ���½�ƶ�����
 */
var isopenvip = false;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var tiaotiaomaps = Array(
        Array(100000202,"��������#r[300���]#b"),
        Array(220000006,"��߳�����#r[300���]#b"),
        Array(280020000,"��ɽ������#r[500���]#b"),
        //Array(109040001,"��4�׶�"),
        Array(910130000,"�̿�����#r[500���]#b"),
        //Array(109030001,"��¥�ҳ���"),
        Array(109040001,"�ߵص�1�׶�#r[500���]#b"),
        Array(910360000,"����B1#r[1000���]#b"),
        Array(910360100,"����B2#r[1000���]#b"),
        Array(910360200,"����B3#r[1000���]#b")
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
            var text = "��ѡ����Ҫ��ս�ĵ�ͼ��\r\n#b\r\n#rÿ��������ͼÿ�տ������1�Σ����ҵȼ��ﵽ180�����н�����#b\r\n"
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