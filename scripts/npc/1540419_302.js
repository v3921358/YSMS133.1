/*
 ���ʱ�䣺2013��8��11�� 13:05:43
 �ű����ܣ���½�ƶ�����
 */
var isopenvip = false;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";

var monstermaps = Array(
        Array(50000, "�ʺ� 1�� ~ 10�� �����"),
        Array(100010100, "�ʺ� 3�� ~ 10�� �����"),
        Array(101020100, "�ʺ� 8�� ~ 15�� �����"),
        Array(102030000, "�ʺ� 15�� ~ 20�� �����"),
        Array(102030400, "�ʺ� 20�� ~ 30�� �����"),
        Array(551000200, "�ʺ� 30�� ~ 50�� �����"),
        Array(600020300, "�ʺ� 50�� ~ 80�� �����"),
        Array(702010000, "�ʺ� 80�� ~ 90�� �����"),
        Array(220060000, "�ʺ� 90�� ~ 100�� �����"),
        Array(541010010, "�ʺ� 90�� ~ 100�� �����"),
        Array(220060200, "�ʺ� 100�� ~ 110�� �����"),
        Array(220060201, "�ʺ� 110�� ~ 120�� �����"),
        Array(240040510, "�ʺ� 120������ �����"),
        Array(270030100, "�ʺ� 150������ �����"),
        Array(703001200, "�ʺ� 160������ �����")
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
        } else if (a == 0) {

            var text = "��ѡ����Ҫ�����ĵط���\r\n#b"

                    for (var i = 0; i < monstermaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + monstermaps[i][0] + "# (" + monstermaps[i][1] + ")\r\n"
                    }
                    MapType = 3
                    needMoney = true;
                    cm.sendSimple(text);
        } else if (a == 1) {
            selects = selection;
            cm.sendYesNo("������������������ȷ��Ҫȥ����Ҫȥ�ĵط�����");
        } else if (a == 2) {

					cm.warp(monstermaps[selects][0]);


            cm.dispose();
        }//a
    }//mode
}//f