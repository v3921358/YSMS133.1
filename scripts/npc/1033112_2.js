/*
 ���ʱ�䣺2013��8��11�� 13:05:43
 �ű����ܣ���½�ƶ�����
 */
 
 var wn1 = "#fEffect/CharacterEff/1082312/0/0#"; //  (����1)
var wn2 = "#fEffect/CharacterEff/1082312/2/0#"; // (����2)
var wn3 = "#fEffect/CharacterEff/1051384/3/0#"; //   (С��)
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
        921170009,
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
        Array(100040400, "�ʺ� 15 ~ 30�� �����"),
        Array(102030400, "�ʺ� 20�� ~ 40�� �����"),
		Array(102030000, "�ʺ� 30�� ~ 40�� �����"),
        Array(551000200, "�ʺ� 50�� ~ 70�� �����"),
        Array(600020300, "�ʺ� 70�� ~ 80�� �����"),
        Array(702010000, "�ʺ� 80�� ~ 90�� �����"),
        Array(220060000, "�ʺ� 90�� ~ 100�� �����"),
        Array(541010010, "�ʺ� 90�� ~ 100�� �����"),
        Array(220060200, "�ʺ� 100�� ~ 110�� �����"),
        Array(220060201, "�ʺ� 110�� ~ 120�� �����"),
		Array(251010402, "�ʺ� 120�� ~ 140�� �����"),
		Array(250010303, "�ʺ� 120�� ~ 140�� �����"),
        Array(240040510, "�ʺ� 120������ �����"),
        Array(270030100, "�ʺ� 150������ �����"),
        Array(703001200, "�ʺ� 160������ �����"),
		Array(273060300, "�ʺ� 180������ �����"),
		Array(273030000, "����Ͽ��-�ʺ�200������"),
		Array(273060000, "ԩ��֮�����-�ʺ�200������"),
		Array(271000200, "���ε���³֮��-�ʺ�200������"),
		Array(310070490, "��ɫ�����ڲ��Թ�7-�ʺ�230��")
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
	//Array(910130102,"�̿�����"),
        //Array(100000202,"��������"),
        //Array(220000006,"��߳�����"),
        Array(280020000,"��ɽ������"),
        Array(109040001,"��4�׶�"),
        Array(910130000,"�̿�����"),
		Array(911001200,"����ȼ�յĲֿ�1-2"),
       // Array(109030001,"��¥�ҳ���"),
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
            cm.sendSimple("\t\t#r���ܴ���#k" + (isopenvip ? "#r(VIP���)#b" : "" ) + "#b\r\n#L0#   �����ͼ��\r\n#L1#   ������ȥ����\r\n#L2#   ���ε�ͼ��\r\n#L3#   ����������ͼ��\r\n#L4#   ϴ������ͼ#i5150040#  #i5152053#��\r\n#L5#   ����ͼ��\r\n#L7#   ��#i4000286#ר�õ�ͼ��\r\n")//#L6#   ץ����ר�õ�ͼ��#L7#   ��#i4000286#ר�õ�ͼ��\r\n#L8#  ˢ���ר�õ�ͼ��
        } else if (a == 1) {
            var text = "��ѡ����Ҫ�����ĵط���\r\n#b"
            switch (selection) {
                case 0:
                    for (var i = 0; i < townmaps.length; i++) {
                        text += "#L" + i + "#   #m" + townmaps[i] + "# (���  500)\r\n"
                    }
                    MapType = 0
                    needMoney = true;
                    break;
                case 1:
                    for (var i = 0; i < monstermaps.length; i++) {
                        text += "#L" + i + "#   #m" + monstermaps[i][0] + "# (" + monstermaps[i][1] + ")\r\n"
                    }
                    MapType = 1
                    break;
                case 2:
                    for (var i = 0; i < lmaps.length; i++) {
                        text += "#L" + i + "#   #m" + lmaps[i] + "#  (���  500)\r\n"
                    }
                    MapType = 2
                    needMoney = true;
                    break;
                case 3:
                    for (var i = 0; i < tiaotiaomaps.length; i++) {
                        text += "#L" + i + "#   #m" + tiaotiaomaps[i] + "# (" + tiaotiaomaps[i][1] + ")\r\n"
                    }
                    MapType = 3
                    needMoney = true;
                    break;
				 case 4:

                    cm.warp(100000104);
					cm.dispose();
					return;
                    break;
					 case 5://����ͼ
		    cm.warp(700000000);

                    //cm.warp(680000000);
					cm.dispose();
					return;
                    break;
					 case 6:

                    cm.warp(931000500);
					cm.dispose();
					return;
                    break;
					
					 case 7:

                    cm.warp(250020000);
					cm.dispose();
					return;
                    break;
										
					 case 8:

                    cm.warp(240020400);
					cm.dispose();
					return;
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