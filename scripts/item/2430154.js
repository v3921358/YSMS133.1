
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
		var selStr = "#r[��ʾ]�� #e#b��ӭʹ������˵���飺#k#n\r\n";
		//selStr += "#d����������ʱ��Ϊ�� #r" + time + "#k #d����  �ۼƳ�ֵ�� #r" + RMB + "#b Ԫ#k\r\n";
		//selStr += "#b�������Ϊ�� #r"+ im.getPay(1) +"#b Ԫ  #bĿǰ��� #r" + im.getPlayer().getCSPoints(1) + "#k #b��\r\n";
		//selStr += "#bĿǰ���þ�#r" + im.getPlayer().getCSPoints(2) + "#k #b�� ��ǰ�ƶ䣺#r"+im.getPlayerPoints()+"#k #b��\r\n\r\n";
		selStr += "#b#L5#"+ttt6+" 1). �����ֱؿ����������淨��#l\r\n";
		selStr += "#r#L0#"+ttt6+" 2). ���Ҹ���α�ǿ��������#l\r\n";
		selStr += "#d#L2#"+ttt6+" 3). ���Ҹ���ο��������ȼ���#l\r\n";
		selStr += "#b#L1#"+ttt6+" 4). ��������ֵ��ʲô�ô���#l\r\n";
		selStr += "#r#L3#"+ttt6+" 5). �����뱾����ҽ���Ⱥ��#l\r\n";
		//selStr += "#d#L4#"+ttt6+" 6). ������ӵ����Щ��ɫ����#l\r\n";
		//selStr += "#b#L6#"+ttt4+" 7). #e#b�򿪳�ֵ#n#b(����1:1000���)#k#l\r\n";		
		//selStr += "#r#L8#"+ttt6+" 7). ��Ϊ���ҵĳ����޷���ȡ��Ʒ��#l\r\n";
		selStr += "#d#L9#"+ttt6+" 6). ������Ǯ�߼�װ������Դ��#l\r\n";
		selStr += "#b#L10#"+ttt6+" 7). ��������150���������ϳ�����#l\r\n";
		selStr += "#r#L11#"+ttt6+" 8). ����Ϸ�ҵ���Լ����þ���Դ��#l\r\n";
		selStr += "#d#L8#"+ttt6+" 9). ��Gmָ������ξ�����Դ��#l\r\n";
		selStr += "#b#L7#"+ttt6+"10). ����ȡ210��ÿ�ս�����#l\r\n";
		im.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
	case 0:
		im.setBossLog("����2");
		im.sendOk("- #e#d��α�ǿ��������#n#k\r\n\r\n#b���ȿ���ͨ�� #r������ֵ��������� #b�򿪵ȼ�100�������� 105����װ��һ�ס�150����ȡ�ͼ����յ�����1�ף�Ȼ��ͨ����������߱ң������ֽ�㹺��150װ����Ȼ��ͨ��ʹ�� #rħ�� #b���ı�װ��Ǳ�ܣ�Ǳ���Ƽ���#rȫ����+20%�����˺�+12%��������+12%��BOSS�˺�+40%�ȵ� #bȻ�󻹿���ͨ��ʹ��#r�������#b�����װ������,������ʹ�� #r�߼�װ��ǿ������ #b������װ���Ǽ������⻹����ʹ�� #rһ��Ǳ�� #b������װ�����ԡ������Ƕ������������кܴ�����ġ����⣬����һЩ�����ĵط�����������ǵ���ҽ���Ⱥ��#r466126007#b ���н���\r\n\r\n#r˵����(һ��Ǳ��ֻ�Ե���Ա��ҿ��ţ��۸񰺹󣬲�������Ҵ���ʹ��)#k");
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" �Ա������˽�鿴����α�ǿ��˵���顣");	
		im.dispose();
		break;
	case 1:
		im.setBossLog("����4");
		im.sendOk("- #e#d������ֵ�ô���#n#k\r\n\r\n#b�������������ڣ��г�NPC�ʵϣ�����ȡ�׳����,�����ֵ100Ԫ,������ȡ1-100Ԫ��ֵ����.(�൱�ڰ������ܶ�����).�������� #r����>- ��ֵ���� - �ۼƳ�ֵ���� #b���в鿴��ֵ���͡�\r\n\r\n#r˵�����׳����ֻ����7�죬����7��֮��������#k");
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" �Ա������˽�鿴�������ĺô���");	
		im.dispose();
		break; 
	case 2:
		im.setBossLog("����3");
		im.sendOk("- #e#d��ο��������ȼ���#n#k\r\n\r\n#d1-100������ͨ�����ܴ��ͣ����յȼ��Ƽ��ط�����������100��֮�����ͨ����������С�ձ�������������������ȼ����˺󣬿���ͨ��������������boss�������ȼ���");	
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" �Ա������˽�鿴����ο��������ȼ���");
		im.dispose();
		break; 
        case 3:
		im.setBossLog("����5");
		im.sendOk("\t\t#b#e��ҽ���Ⱥ��#r466126007#k#n\r\n\r\n- #e#d��Ⱥ�ô���#k#n\r\n\r\n#d1). ����ӵ��һЩ���»������QQȺ�﷢���.\r\n#b2). ������������boss������������չ�װ���ȵ�.\r\n#r3). Gm���л����Ϸά�����ڵ�һʱ���˽�.\r\n#b4). ����ж���Ϸ���˽�Ŀ��Լ�ʱ����.\r\n#d5). Ⱥ��Ծ�ȼ�����������Ⱥ��Ծ����Lv.3������ȡ5000���\r\nȺ��Ծ������Lv.4������ȡ1����Ⱥ��Ծ������Lv.5������ȡ1��5���Ⱥ��Ծ������Lv.6������ȡ2����");
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" �Ա������˽�鿴�˼�����ҽ���Ⱥ�ĺô���");
		im.dispose();
		break;
        case 4:
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" �Ա������˽��¼�������������������");
		im.dispose();
		im.openWeb("http://www.cca15.com/help/");
		break; 
        case 5:
		im.setBossLog("����1", 1);
		im.sendOk("#g1). #e#d�ʣ�#k#n#b�����ĳ���ָ������Щ��\r\n    #d#e��#n#r�̳ǰ�ť���Դ�����NPC���̳ǡ�@fm �����г� @ea ������� @fh �������� @help �鿴����������������������@help����鿴��GM�����ﲻ������ˡ�#k\r\n#g2). #e#d�ʣ�#k#n#bΪ���Ҵ����ֻ�е� 1 HP��\r\n    #d#e��#n#r�����д���ı�ʶ��ʾΪ��Ҫ��֮���Ĳſ��Դ�Ķ���\r\n#g3). #e#d�ʣ�#k#n#b��֮��������ۼ���λ�ã�\r\n    #d#e��#n#rͨ�����������䣬Ҳ����ͨ��һЩ������á�������ͨ����ֵ�����Լ���ֵ����\r\n#g4). #e#d�ʣ�#k#n#bΪ���ҵĳ����޷���ȡ��Ʒ��\r\n    #d#e��#n#r��װ������Ĭ����E������һ�³����ѡ�ϳ����ȡ���߼��ܣ����Ｔ�ɼ�ȡ��Ʒ�ˡ�");
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" �Ա������˽�鿴���淨���ܡ�");
		im.dispose();
		//im.openWeb("http://www.cca15.com/help/");
		break;
        case 6:
		im.dispose();
		im.openWeb("http://www.libaopay.com/buy/?wid=60889");
		break;
        case 7:
	if (im.getBossLog("210������") < 1 && im.getLevel() > 209) {
		im.gainItem(4001839, 1000);//����
		im.gainItem(5062500, 50);
		im.gainItem(5062010, 50);
		im.setBossLog("210������");
		im.sendOk("- #e#d�ɹ���ȡ 210 ���ĵȼ�������#n#k\r\n\r\n#r#i4001839# #z4001839# x 1000\r\n#i5062010# #z5062010# x 50\r\n#i5062500# #z5062500# x 50");
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" ��д���ҵ��Ŵ���ȡ��ÿ�� 210 ���ĵȼ�������");
		im.dispose();
	} else {
		im.sendOk("ʧ�ܣ�\r\n\r\n#r1). ���Ѿ���ȡ����\r\n2). �ȼ�����210,�޷���ȡ��\r\n\r\n#i4001839# #z4001839# x 1000\r\n#i5062010# #z5062010# x 50\r\n#i5062500# #z5062500# x 50");
		im.dispose();
            }
		break;
        case 8:
		im.sendOk("- #e#dGmָ������ξ�����Դ��#n#k\r\n\r\n#b��Ը�⻨Ǯ��������Դ�Ⱦʹ�ּ�ȡһЩ����֮�����͹�ϲ����4���ַ�,�ַ���ȥ����ҡ�����֮����ħ���������߱�,��Ϊ��100���ĵȼ�������һ��105�ĸ���װ��,�����úþ���,��ҿ��Ե��г���ʹMM���һ�����������������þ���Ʒ������������Ҳ��1����þ����þ���Թ���߼�װ��������֮�������������ǣ����Խ�����֮��ǿ��������Ҫ��װ���Ŀ�������������ſ���ǿ�����ǡ�");
		im.worldSpouseMessage(0x14,"��������֤�须����� "+ im.getChar().getName() +" ��д���ҵ��Ų鿴��Gmָ����ξ�����Դ��");
		im.dispose();
		break;
        case 9:
		im.setBossLog("����6");
		im.sendOk("- #e#d�߼�װ������Դ��#n#k\r\n\r\n#b GM��ʾ�����װ������BOOS�͸�����ã�³����˹������ʱֻ��ͨ���ֽ��� ��Ϸ���ø߼�BOSSֱ�ӵ��䣬Ҳ����ʹ�� #r�����߱ҡ������˹�ҡ����յ±�#b �һ�����������������ɻ�õ��þ����ܵ�����þ���Ʒ����Ҳ������ʹ�õ�����ٲ���װ����Ҳ����ʹ������ת������ȡ�����߳�ֵ���͵�Ҳ�С�150������Ҳ����ͨ��������������Ҳ����ͨ��ÿ��ǩ�����ֶһ�\r\n140װ����Դ�������߱Ҷһ������˳齱��ϣ��˹Ů�ʣ�����\r\nƤ������Ѫ��Ů�����䡣\r\n");
		im.dispose();
		break;
        case 10:
		im.setBossLog("����7");
		im.sendOk("- #e#d�������������ϳ�����#n#k\r\n\r\n#b1). ǿ�ҵ���꾻ˮ��ʱ��֮ʯ����������𻨣� ��3��������Ů�ʣ�PB�������ȵ��䡣\r\n2). ��ʬ�����Ľ��������󶴽�ʬ����\r\n3). ս�״��������ڴ濨����������4��Ӱ��������\r\n4). ����֤��������������е���\r\n5). ��֮ʯ�����Ҫ��PB����\r\n6). ������������ϣ��˹Ů�ʵ���\r\n7). �˶������������ɶ�ɭ�ֱ���սͨ�ؽ���.\r\n");
		im.dispose();
		break;
        case 11:
		im.setBossLog("����8");
		im.sendOk("- #e#d������Դ��#n#k\r\n#b1). ͨ��ÿСʱ35��ʱ���̻�á�\r\n2). ͨ��ÿСʱ40�ִ����á�\r\n3). ͨ�����г��ݵ��á�\r\n4). ͨ����Ҷһ���û�ͨ����ֵ��á�\r\n5). ͨ����¥��á�\r\n- #e#d���þ����Դ��#n#k\r\n#b1). ͨ������Լ����������þ���Ʒ����á�\r\n2). ͨ��ÿСʱ40�ִ����á�\r\n3). ͨ���г��ݵ��Լ�Ѱ�������á�\r\n4). ͨ����¥��á�\r\n- #e#dð�ձҵ���Դ��#n#k\r\n#b1). ͨ����������á�\r\n2). ͨ�����֮�佻��ӯ����");
		im.dispose();
		break;









}
    }
}
