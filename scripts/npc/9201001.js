/* NANA
��黶ӭ��Ա
*/
var status = 0;
var menu = "��ѡ�����ǵĽ�鷽ʽ#b\r\n\r\n#L1#��ʽ���";
var main = "����Ҫ��ʲô:#b\r\n#L1#���ڽ������(����)";

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
			cm.sendNext("�š��������ʲô�µĻ����������ҡ�����������㡣");
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple(main);
		} else if (status == 1) {
			if (selection == 0) { // �ƶ���������
				status = 3;
				cm.sendSimple(menu);
			} else if (selection == 1) { // ���ڽ������
				cm.sendNext("�ڵ���һ����µµ��Ϊ�ܼ�į�ɡ��������Ҹ������TA�������Һ��ˡ����������ң��ҿ��԰������͵����ĵط�������");
			}
		} else if (status == 2) { // ���ڽ������
			cm.sendNextPrev("�����ʽ��Ϊ���֣���ʽ���������Ϊ1��Ԫ����ʽ���Ϊ5��Ԫ������ֻ����ӳ��������ѡ������������ǵ�һ�����飡�����������");
		} else if (status == 3) { //���ڽ������
			cm.sendNextPrev("��ף�����ϵ����е���ף���������ҵ��Լ��మ����һ�룡Ŀǰ���״ֻ̬�������Խ�飬ͬ�Խ���ݲ����š�");
		} else if (status == 4) {
			cm.sendSimple(menu);
		} else if (status == 5) { //Menu
                        status == 4;
			if (selection == 0){//��ʽ���
                                          cm.sendOk("�Բ�����ʽ�����δ����");
                                          cm.dispose();
                                          }else if (selection == 1){
                                          cm.warp(680000000)
                                          
                                          }
		}
	}
}