var aa ="#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";


var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time;
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE);//��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����
var RMB = 0;
var PayLogPoints = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        im.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (im.getMapId() == 180000001) {
            im.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            im.dispose();
        } 
    else if (status == 0) {
		var time = im.getPlayer().getTodayOnlineTime();
		RMB = im.getRMB();
		var selStr = "#r[��ء���ʾ]�� #e#b���ָ���ָ����#k#n\r\n";
		selStr += "#d����������ʱ��Ϊ�� #r" + time + "#k #d����  �ۼƳ�ֵ�� #r" + RMB + "#b Ԫ#k\r\n";
		selStr += "#b�������Ϊ�� #r"+ im.getHyPay(1) +"#b Ԫ  #bĿǰ��� #r" + im.getPlayer().getCSPoints(1) + "#k #b��\r\n";
		selStr += "#bĿǰ���þ�#r" + im.getPlayer().getCSPoints(2) + "#k #b�� ��ǰ�ƶ䣺#r"+im.getPlayerPoints()+"#k #b��\r\n\r\n";
		selStr += "#b#L0#"+ttt6+" 1). �����þ���߼�װ����#l\r\n";
		selStr += "#r#L1#"+ttt6+" 2). ��Red�ҹ������ľ��᡿#l\r\n";
		selStr += "#d#L2#"+ttt6+" 3). �������߱ҹ���߼�װ����#l\r\n";
		selStr += "#b#L4#"+ttt6+" 4). ���ƶ乺��ϡ�е����̵꡿#l\r\n";
		selStr += "#r#L3#"+ttt6+" 5). ��Ͷ�����VIP�����ر���#l\r\n";
		selStr += "#d#L6#"+ttt6+" 6). ��������Ҹ��ȼ�������#l\r\n";
		selStr += "#b#L5#"+ttt6+" 7). ���鿴����˵���顿#l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
		im.dispose();
		im.openNpc(9900003, 16);
		break;
	case 1:
		im.dispose();
		//im.openShop(20000);
		im.openNpc(9900003, 40);
		break; 
	case 2:;
		im.dispose();
		im.openNpc(9900003, 21);
		break; 
        case 3:
		im.dispose();
		im.openNpc(9900003, 17);
		break;
        case 4:
		im.dispose();
		im.openNpc(9310144, 26);
		break; 
        case 5:
		im.dispose();
		im.openNpc(9310060, 2433242);
		break;
        case 6:
		im.dispose();
		im.openNpc(9900003, 33);
		break;
        case 7:
	if (im.getBossLog("200������") < 1 && im.getLevel() > 199) {
		im.gainItem(5062000, 10);
		im.gainItem(5062002, 10);
		im.gainItem(5062010, 5);
		im.setBossLog("200������");
		im.sendOk("- #e#d�ɹ���ȡ 200 ���ĵȼ�������#n#k\r\n\r\n#r#i5062000# #z5062000# x 10\r\n#i5062010# #z5062010# x 5\r\n#i5062002# #z5062002# x 10");
		im.worldSpouseMessage(0x14,"��д���ҵ��š������ "+ im.getChar().getName() +" ��д���ҵ��Ŵ���ȡ��ÿ�� 200 ���ĵȼ�������");
		im.dispose();
	} else {
		im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ����\r\n2). �ȼ�����200,�޷���ȡ��\r\n\r\n#i5062000# #z5062000# x 10\r\n#i5062010# #z5062010# x 5\r\n#i5062002# #z5062002# x 10");
		im.dispose();
            }
		break;
        case 8:
		im.sendOk("- #e#dGmָ������ξ�����Դ��#n#k\r\n\r\n#b��Ը�⻨Ǯ��������Դ�Ⱦʹ�ּ�ȡһЩ����֮�����͹�ϲ����4���ַ�,�ַ���ȥ����ҡ�����֮����ħ���������߱�,��Ϊ��100���ĵȼ�������һ��105�ĸ���װ��,�����úþ���,��ҿ��Ե���ͨ����Ա���һ�����������������þ���Ʒ������������Ҳ��1����þ����þ���Թ���߼�װ��������֮�������������ǣ����Խ�����֮��ǿ��������Ҫ��װ���Ŀ�������������ſ���ǿ�����ǡ�");
		im.worldSpouseMessage(0x14,"��д���ҵ��š������ "+ im.getChar().getName() +" ��д���ҵ��Ų鿴��Gmָ����ξ�����Դ��");
		im.dispose();
		break;
        case 9:
		im.setBossLog("����6");
		im.sendOk("- #e#d�߼�װ������Դ��#n#k\r\n\r\n#b  ��Ϸ���ø߼�BOSSֱ�ӵ��䣬Ҳ����ʹ�� #r�����߱ҡ������˹�ҡ����յ±�#b �һ�����������������ɻ�õ��þ����ܵ�����þ���Ʒ������ʹ�õ��þ���Ҳ������ʹ�õ���򣬲�����Ҫ�����ֵ100�顣Ҳ����ʹ������ת�̺�����ת������ȡ�����߳�ֵ���͵�Ҳ�С�150������Ҳ����ͨ��������������Ҳ����ͨ��ÿ��ǩ�����ֶһ�\r\n140װ����Դ�������߱Ҷһ������˳齱��ϣ��˹Ů�ʣ�����\r\nƤ������Ѫ��Ů�����䡣\r\n");
		im.dispose();
		break;
        case 10:
		im.setBossLog("����7");
		im.sendOk("- #e#d�������������ϳ�����#n#k\r\n\r\n#b1). ǿ�ҵ���꾻ˮ��ʱ��֮ʯ����������𻨣� ��3��������Ů�ʣ�PB�������ȵ��䡣\r\n2). ��ʬ�����Ľ��������󶴽�ʬ����\r\n3). ս�״��������ڴ濨����������4��Ӱ��������\r\n4). ����֤��������������е���\r\n5). ��֮ʯ�����Ҫ��PB����\r\n6). ������������ϣ��˹Ů�ʵ���\r\n7). �˶������������ɶ�ɭ�ֱ���սͨ�ؽ���.\r\n");
		im.dispose();
		break;
        case 11:
		im.setBossLog("����8");
		im.sendOk("- #e#d������Դ��#n#k\r\n#b1). ͨ��ÿСʱ30��ʱ���̻�á�\r\n2). ͨ��ÿСʱ50�ִ����á�\r\n3). ͨ�����г��ݵ��á�\r\n4). ͨ����Ҷһ���û�ͨ����ֵ��á�\r\n- #e#d���þ����Դ��#n#k\r\n#b1). ͨ������Լ����������þ���Ʒ����á�\r\n2). ͨ��ÿСʱ50�ִ����á�\r\n3). ͨ���г��ݵ��Լ�Ѱ�������á�\r\n- #e#dð�ձҵ���Դ��#n#k\r\n#b1). ͨ����������á�\r\n2). ͨ������#r(���ͥԺ)#b��á�\r\n3). ͨ�����֮�佻��ӯ����");
		im.dispose();
		break;









}
    }
}
