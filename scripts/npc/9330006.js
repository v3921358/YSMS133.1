var status = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("- #e#d���ð�յ�����ָ��(��2ҳ):#k#n\r\n\r\n#b1):#r������ʹ����һ��Ǯ����ţb,ֻҪ�����㹻��ʱ���Լ��㹻�Ľ��,����ͨ���г�����̳Ǵ�������Ʒ,\r\n#b2):#rװ��֮�����ͨ����ֵ�����ǿ����ʹ�õ�ħ���Ȼ�ħ����,ħ������Զһ�װ���Լ�һЩ��Ʒ\r\n#b3):#rÿ��ǩ������ÿ��ǩ������,�������Զһ�һϵ�����.���д�PB����\r\n#b4):#r������ÿ��������������,��������,���к�������,ֻ��ÿ�����ɵ��һ��\r\n#b5):#r�����¹ٷ�Ӣ���,ӡ�µĸ���ȡ���ڵ��ʵ�����,ӡ�¿��Զһ�һЩ���,����,�Լ�װ��\r\n#b6):#rÿ��19��,��Ϯ�ƽ�,���ֺö��������Ե���.");
		} else if (status == 1) {
            cm.sendPrev("\r\n#b7):#rÿ��20��,�����������պ�������Ͳ�ͣ,�涨��ʱ����ֻ�������.\r\n#b8):#rͨ�����������Ի������ѫ��,ѫ��˫��ʹ�ú���Ի������,�����ȼ����������������\r\n#b9):#rͨ�����������Ի������֮��RED,˫��ʹ�ú����Ի��RED��,�����г�RED���̵깺����Ʒ\r\n#b10):#r��boss�����Ե�������,����Ҽ������г�������̵깺����Ʒ\r\n#b11):#r��������һԪ,���Ի���׳�����.���������뵽�г�����鿴\r\n#b12):#r�������������ǵĹٷ�����Ⱥ:2335015,���ס���ǵ���վ��www.65465.cn");
		} else if (status == 3) {
			cm.dispose();
		}
	}
}