/* 
CherryMS LoveMXD
*/
var status = 0;
var mainmenu = "������ʲô�أ�\r\n#L0##b��Ҫ��ô����#l\r\n#L1#��Ҫ��ô���#l\r\n#L2#���ֲ��ڱ���ͼ��ô�죿#l\r\n#L3#���ֶԷ���������ô�죿#l\r\n#L4#�ÿ���ô����ģ�#l\r\n#L5#�����Ҫ�����ʽ��#l\r\n#L6#������Ҫһ��һŮ��#l\r\n#L7#������������ô����\r\n#L8#��Ҫ��ô���÷ÿ����룿#l#k";

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.dispose();
		return;
	} else if (status == 2 && mode == 0) {
		cm.sendNext("�������ʲô��Ҫ�����Ļ���ʱ�����������ҡ��Һ�����Ϊ����");
	}
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendSimple(mainmenu);
	} else if (status == 1) {
		if (selection == 0) { // ��Ҫ��ô����
			status = -1;
			cm.sendNext("����Ļ�������ҵ�#b#p9201013##k�����ɫ���á���#b#p9201014##k�Ի��ɹ����ж�����ʽ��");
		} else if (selection == 1) { // ��Ҫ��ô���
			cm.sendNext("������ʽ������Ϳ��Ե�#p9201002#������ʥ����á�");
		} else if (selection == 2) { // ���ֲ��ڱ���ͼ��ô�죿
			status = 5;
			cm.sendNext("���㲻�õ��ġ�ֻҪ�öԷ��������һ���ĵ�ͼ�Ϳ����ˡ�");
		} else if (selection == 3) { 
			status = 8;
			cm.sendNext("���㲻�õ��ġ�ֻҪ�öԷ��������һ����Ƶ���Ϳ����ˡ�");
		} else if (selection == 4) { 
			status = 11;
			cm.sendNext("Ϊ�˲��������Ľ�����գ��ÿ��Ǳ���Ҫ�������ķÿ�������ܽ���ġ�");
		} else if (selection == 5) { 
			status = 14;
			cm.sendNext("����ǲ���Ҫ�����ʽ�ġ������ں��ڵĽ������������Ǳ���Ҫ����ӵ���ʽ���������");
		} else if (selection == 6) { 
			status = -1;
			cm.sendNext("����Ǳ���Ҫһ��һŮ�ġ����У�ŮŮ�����ʽ���ں����Ƴ���");
cm.dispose();
		} else if (selection == 7) {
			status = -1;
			cm.sendNext("Ϊ���õ���������ӵĽ�����ա�����������ڳﱸ���С�");
		}else if (selection == 8){//��Ҫ��ô���÷ÿ����룿
                                         cm.sendNext("��#b#p9201013##k���������ķÿ����롣")
cm.dispose();
}
	} else if (status == 2) { // ��Ҫ��ô���
		cm.sendNextPrev("������#p9201014#�Ի��鿴�ÿ����������ڹ涨�ڱ���Ҫ��5λ�ÿͲ���������顣");
	} else if (status == 3) { //��Ҫ��ô���
		cm.sendNextPrev("�ÿ���������һ���������ں�#p9201002#�Ի����Ϳ��Խ���ˡ�");
	} else if (status == 4) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 5) {
		cm.sendNext("���మ������Ӧ����һ�����𣿣�");
	} else if (status == 6) { // ���ֲ��ڱ���ͼ��ô�죿
		cm.sendNextPrev("���మ������Ӧ����һ��ǼǶ��鲻���𣿣�");
	} else if (status == 7) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 8) { 
		cm.dispose();
	} else if (status == 9) { 
		cm.sendNextPrev("���మ������Ӧ����һ�����𣿣�");
	} else if (status == 10) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 11) {
		cm.sendNext("Ϊ�˲��������Ľ�����գ��ÿ��Ǳ���Ҫ�������ķÿ�������ܽ���ġ�");
	} else if (status == 12) {
		cm.sendNextPrev("������Ҫ��һ�챻���Ų��Ǻ�ɨ����");
	} else if (status == 13) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 14) { 
		cm.dispose();
	} else if (status == 15) { 
		cm.sendNextPrev("���ǡ��ڶ�������Ҫ����Է��Ľ�ɫ������ܵǼǳɹ���");
	} else if (status == 16) { 
		cm.sendNextPrev("�������׵Ľ�鷽ʽ���Ǻܺ���");
	} else if (status == 17) { 
		cm.sendNextPrev("���ˣ������м�ͥ����ϵͳ�����һ�������Ľ���������������ĳ���ƶ���������ܻ��ۼ�ͥ���顣");
	} else if (status == 18) {
		status = 0;
		cm.sendSimple(mainmenu);
	} else if (status == 19) {
		cm.sendNext("����Ǳ���Ҫһ��һŮ�ġ����У�ŮŮ�����ʽ���ں����Ƴ���");
	} 
	}
}
