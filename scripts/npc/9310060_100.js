/* ����̵� */

var status = 0;
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
	var myRmb = cm.getRMB();
    var selStr = "#d�װ���#r#h ##k���ã������������̳�\r\n\r\n";
		selStr += "#b" + icon1 + "����ǰ��#r" + myRmb + "#k#b     " + icon1 + "���ۼƳ�ֵ��#r" + cm.getTotalRMB() + "#k\r\n\r\n#e#b��ѡ��:#k\r\n";
		selStr += "#r#L0#" + icon1 + "150������#l	    #L1#" + icon1 + "150������#l       \r\n";
		selStr += "#r#L2#" + icon1 + "160������#l	    #L3#" + icon1 + "160������#l       \r\n";
		selStr += "#r#L4#" + icon1 + "���߾���#l	     #L5#" + icon1 + "ϡ����Ʒ#l       \r\n\r\n";
		selStr += "#b#L6#" + icon1 + "�ػ����[��δ����]#l\r\n";
		//selStr += "#L10##bϡ������#l	\t#L11#ϡ�����#l \t   #L12#ϡ�г���#l\r\n";
		//selStr += "#L13##r˫������#l		#L14#ϡ������#l \t   #L19#ǿ�����#l\r\n";
		//selStr += "#L17##r����װ��#l		#L18#���ĵ���#l \t   #L20#�������#l\r\n\r\n";
		//selStr += "#L21##b���߼��̵�#l	#L22##b��ʱ�Ż���Ʒ����һ�ڣ�#l	 \r\n";//#L20#�������#l
		//selStr += "#L22##r��ʱ�Ż���Ʒ����һ�ڣ�#l		 \r\n";//#L20#�������#l
		//selStr += "\r\n#L22##g�򿪱�����ֵ���ӡ�1Ԫ=1Ԫ��+2000���#l#k\r\n";
        //var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã�����ѡ������Ҫ�Ĺ���:\r\n(#r�뿴�ù���Ŷ.���˾�����!#k):\r\n#b#L0#˫������#l    #L7#���߾���#l\r\n#L8#����̵�#l #";

        cm.sendSimple(selStr);
    } else if (status == 1) {
		//����9330079������ֹͣʹ��
        switch (selection) {
        case 0:
            cm.dispose();
            cm.openNpc(1540211, 101); //150����
            break;
        case 1:
            cm.dispose();
            cm.openNpc(1540211, 102); //150����
            break;
        case 2:
            cm.dispose();
            cm.openNpc(1540211, 103); //160����
            break;
        case 3:
            cm.dispose();
            cm.openNpc(1540211, 104); //160����
            break;
        case 4:
            cm.dispose();
            cm.openNpc(1540211, 105); //���߾���
            break;
        case 5:
            cm.dispose();
            cm.openNpc(1540211, 106); //����ϡ����Ʒ
            break;
        case 6:
            cm.dispose();
            cm.openNpc(1540211, 107); //��ֵ���
            break;
	case 30:
            cm.dispose();
            cm.openWeb("http://www.libaopay.com/buy/?wid=59253");
	    cm.sendOk("�Ѿ�Ϊ����������վ��");
            break;
        }
    }
}