/*
	NPC Name: 		Hera
	Map(s): 		Towns
	Description: 		Wedding Village Entrance
*/

var status = -1;

function start() {
    cm.sendSimple("��~�������Ǹ������ӣ�������̫������~���㲻��������������˰�����������İ��ⶼ���ʵ���������~��\r\n #b#L0# �������ȥ (ר������������ª������Ʊ)#l");
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (status == 0 && mode == 0) {
        cm.sendOk("���ȻҪ������ô�õĻ��᣿������ĺ���~���㲻���ǻ�û�����İ����˰ɣ�û����������İ����ˣ���ô�����ô��������Ϣ���������أ���");
        cm.dispose();
        return;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendYesNo("��ȥ�������û�У�������רΪ���м򵥿ɰ��Ļ�����½��ĵط�~����˵�����ﻹ�ܺ��İ����˽���ء��㲻��������̫~���������������ȥ����ҿ��������ȥ����ô����Ҫȥһ����");
    } else if (status == 1) {
        cm.sendNext("�����˺���ȷ�ľ��������ȥ�����ú����ܰ�����Ϣ��~��������ʱ�򣬻���ص������ͷ��ĵ�ȥ��~");
    } else if (status == 2) {
        cm.saveLocation("AMORIA");
        cm.warp(680000000, 0);
        cm.dispose();
    }
}