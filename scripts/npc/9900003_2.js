/*
 ���ʱ�䣺2013��8��11�� 13:05:43
 �ű����ܣ���½�ƶ�����
 */
var isopenvip = false;
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var townmaps = Array(
		910001000,
        104000000,
        100000000,
        101000000,
        102000000,
        103000000,
        120000000,
        105000000,
        200000000,
        211000000,
        550000000,
        230000000,
        222000000,
        220000000,
        701000000,
        250000000,
        702000000,
        260000000,
        600000000,
        240000000,
        261000000,
        221000000,
        251000000,
        300000000,
        270000000,
        702100000,
        800000000,
        130000000,
        310000000);
var monstermaps = Array(
        Array(50000, "�ʺ� 1�� ~ 10�� �����"),
        Array(100010100, "�ʺ� 3�� ~ 10�� �����"),
        Array(101020100, "�ʺ� 8�� ~ 15�� �����"),
        Array(102030000, "�ʺ� 15�� ~ 20�� �����"),
        Array(102030400, "�ʺ� 20�� ~ 40�� �����"),
        Array(551000200, "�ʺ� 50�� ~ 70�� �����"),
        Array(600020300, "�ʺ� 70�� ~ 80�� �����"),
        Array(702010000, "�ʺ� 80�� ~ 90�� �����"),
        Array(220060000, "�ʺ� 90�� ~ 100�� �����"),
        Array(541010010, "�ʺ� 90�� ~ 100�� �����"),
        Array(220060200, "�ʺ� 100�� ~ 110�� �����"),
        Array(220060201, "�ʺ� 110�� ~ 120�� �����"),
        Array(240040510, "�ʺ� 120������ �����"),
        Array(270030100, "�ʺ� 150������ �����"),
        Array(703001200, "�ʺ� 160������ �����")
        );

var lmaps = Array(500000000,
        702000000,
        700000000,
        600000000,
        540000000,
        800000000,
        701000000,
        702100000,
        550000000
        );//���ε�ͼ����

var tiaotiaomaps = Array(
        //Array(100000202,"��������"),
        //Array(220000006,"��߳�����"),
        Array(280020000,"��ɽ������"),
        Array(109040001,"��4�׶�"),
        Array(910130000,"�̿�����"),
        Array(109030001,"��¥�ҳ���"),
        Array(109040001,"�ߵص�1�׶�"),
        Array(910360000,"����B1"),
        Array(910360100,"����B2"),
        Array(910360200,"����B3")
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
            cm.sendSimple("#h0#������������ӵ������ط���" + (isopenvip ? "#r(VIP���)#b" : "" ) + "\r\n#L0# "+icon+" �����ͼ��\r\n#L1# "+icon+" ������ȥ����\r\n#L2# "+icon+" ���ε�ͼ��\r\n#L3# "+icon+" ����������ͼ��")
        } else if (a == 1) {
            var text = "��ѡ����Ҫ�����ĵط���\r\n#b"
            switch (selection) {
                case 0:
                    for (var i = 0; i < townmaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + townmaps[i] + "# (���  500)\r\n"
                    }
                    MapType = 0
                    needMoney = true;
                    break;
                case 1:
                    for (var i = 0; i < monstermaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + monstermaps[i][0] + "# (" + monstermaps[i][1] + ")\r\n"
                    }
                    MapType = 1
                    break;
                case 2:
                    for (var i = 0; i < lmaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + lmaps[i] + "#  (���  500)\r\n"
                    }
                    MapType = 2
                    needMoney = true;
                    break;
                case 3:
                    for (var i = 0; i < tiaotiaomaps.length; i++) {
                        text += "#L" + i + "# "+icon+" #m" + tiaotiaomaps[i] + "# (" + tiaotiaomaps[i][1] + ")\r\n"
                    }
                    MapType = 3
                    needMoney = true;
                    break;
            }
            cm.sendSimple(text);
        } else if (a == 2) {
            selects = selection;
            cm.sendYesNo("������������������ȷ��Ҫȥ����Ҫȥ�ĵط�����");
        } else if (a == 3) {
            if (cm.getVip() == 0 || !isopenvip) {
				if (cm.getMeso() < 500) {
					cm.sendOk("�Բ�����Ľ�Ҳ��㡣\r\n��Ҫ500��Ҳ��ܽ��С�");
					cm.dispose();
					return;
				} else {
					cm.gainMeso(-500);
				}
			}

			switch (MapType) {
				case 0:
					cm.warp(townmaps[selects]);
					break;
				case 1:
					cm.warp(monstermaps[selects][0]);
					break;
				case 2:
					cm.warp(lmaps[selects]);
					break;
				case 3:
					cm.warp(tiaotiaomaps[selects][0]);
					break;
			}

            cm.dispose();
        }//a
    }//mode
}//f