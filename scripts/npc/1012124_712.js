
var status = 0;
var a1 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var a2 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

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
    if (cm.getMapId() == 180000001) {
            cm.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            cm.dispose();
        } 
    else if (status == 0) {
		var selStr = "#b���볢��һ������������� ��PK��ͼ�ǽ�ֹ��ҩ�ģ����������Ѫ�������ٽ��롣������ѡ���������ֵ�ͼ����PK��#k\r\n\r\n";
		selStr += "- #e��ѡ��#n\r\n";
		selStr += "#d#L0#"+a2+" ��սPKģʽ #r(��������ɶ�ȫ������Ա�˺�)#l#k\r\n";
		selStr += "#d#L1#"+a2+" ���PKģʽ #r(����������ɶ��Լ���Ա�˺�)#l#k\r\n";
		selStr += "#d#L2#"+a2+" ����PKģʽ #r(����������ɶ��Լ������˺�)#l#K\r\n";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
            cm.dispose();
            cm.warp(701000201, 0);
	cm.worldMessageEffect("[��ս����̨] ��ϲ " + cm.getChar().getName() + " �����˴���̨������˭~~��������ս��! ", 1, 10);

            cm.worldSpouseMessage(0x20, "����ս����̨�� : ��� " + cm.getChar().getName() + " �����˴���̨������˭~~��������ս��!");
            break;  
        case 1:
            cm.dispose();
            cm.warp(701000202, 0);
	cm.worldMessageEffect("[��Ӵ���̨] ��ϲ " + cm.getChar().getName() + " �����˴���̨�������ĸ����~~��������ս��! ", 1, 10);

            cm.worldSpouseMessage(0x20, "����Ӵ���̨�� : ��� " + cm.getChar().getName() + " �����˴���̨�������ĸ����~~��������ս��!");
            break;   
        case 2:
            cm.dispose();
            cm.warp(701000203, 0);
	cm.worldMessageEffect("[�������̨] ��ϲ " + cm.getChar().getName() + " �����˴���̨�������ĸ�����~~��������ս��! ", 1, 10);

            cm.worldSpouseMessage(0x20, "���������̨�� : ��� " + cm.getChar().getName() + " �����˴���̨�������ĸ�����~~��������ս��!");
            break;











}
    }
}
