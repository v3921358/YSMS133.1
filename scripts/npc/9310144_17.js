var aaa = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed = 0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			//cm.sendOk(head + "#d֪ͨ�����������15���Ǽۣ���ԭ�ȵ�3/�졢80/�¡�500/���Ϊ10/�졢240/�¡�1200/�ꡣ\r\n���ܸĶ���ÿ�����ѹ������Ϊ��ȡ�����������ר������þ�����ÿ����ȡר������ף����x100������ף����x100. ÿ�ճ齱��x5. ������װ���ȵȻ��𲽿��š�");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			//rmb = cm.getPlayer().updateRMB();

			var selStr = "#e#b����ǰ�ڱ���������ʱ�䣺 #r" + cm.getPlayer().getTodayOnlineTime() + " #b���ӡ�\r\n";
			selStr += "#b����ǰ������ #r" + cm.getRMB() + " #k#bԪ#k  #b�ۼ���#r" + cm.getTotalRMB() + " #k#bԪ\r\n#k#b��ǰ���: #r" + cm.getNX(1) + " #b�� ���þ�: #r" + cm.getNX(2) + " #b��#n\r\n\r\n";
			selStr += "#bVIP��Աÿ�¿������ܼ�ֵ1280Ԫ�ĸ���������#k\r\n#b����ֵ260Ԫ�������Ա��ֻ�������͸��������\r\n���ĵ���ڣ���û�п�����Ա���ǰ��͸����ģ�\r\n";
			//selStr +="#L1##r"+aaa+" ��������10Ԫ��/һ��Ȩ [�������鿴]#l#k\r\n"
			//selStr +="#L2##r"+aaa+" ��������150Ԫ��/10��Ȩ [�������鿴]#l#k\r\n"
			//selStr +="#L3##r"+aaa+" ����ʵ����Ʒ���10W���/1��Ȩ [�������鿴]#l#k\r\n";
			selStr += "#L4##r" + aaa + " ��������260���/30��Ȩ [�������鿴]#l#k\r\n\t";
			//selStr +="#L5##r"+aaa+" ��������1200Ԫ��/һ��Ȩ [�������鿴]#l#k\r\n";
			cm.sendSimple(selStr);
		} else if (status == 1) {
			if (selection == 1) {
				typed = 1;
				cm.sendYesNo(head + "- #e#d��ӭ�����������һ��Ȩ��#n#k\r\n- #e#r��ʾ:#k#n  #r#z2430865# 10Ԫ��/1��#k\r\n- #e#d���������Ȩ��#n#k\r\n\t\t#bӵ��ȫ��������ʾ������������ɫ��\r\n- #e#d��ϸ˵����#n#k\r\n\t\t������۵���10��Ԫ�������ҵ��������ȡ [6666]���, ��24Сʱ�����������������Լ�˫�����ʣ����ҵ����ڿ�����ȡ20��[�߼�����ħ������ʦ������ħ�����������ᡢף������]�����������Ѹ��������Լ�����ϴѪ����������ȡÿ�ս��. ��Ա�����̵�,��Ա�Ż��ƹ�,��Ա���н�һ����\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
			} else if (selection == 2) {
				typed = 2;
				cm.sendYesNo(head + "- #e#d����ʵ����Ʒ���ʮ��Ȩ��#n#k\r\n- #e#r��ʾ:#k#n  #r#z2430865# 150Ԫ��/10��#k\r\n- #e#d���������Ȩ��#n#k\r\n\t\t#bӵ��ȫ��������ʾ������������ɫ��\r\n- #e#d��ϸ˵����#n#k\r\n\t\t������۵���150��Ԫ��������ÿ�������ȡ [10000] ���, ��10�����������������Լ�˫�����ʣ�ÿ����ȡ20��[�߼�����ħ������ʦ������ħ�����������ᡢף������]����Ѹ�����������Ⱦɫ�Լ�����ϴѪ����ȡÿ�ս��. ��Ʒװ�������̵�,������ϡ�����ӣ����Ǯׯ��ȡԪ����\r\n#r������Ƶ��ڵİ��͸���ҵģ��Ķ������ж�#k\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
			} else if (selection == 3) {
				typed = 3;
				cm.sendYesNo(head + "- #e#d����ʵ����Ʒ���һ��Ȩ��#n#k\r\n- #e#r��ʾ:#k#n  #r#z2430865# 500000���/30��#k\r\n- #e#d���������Ȩ��#n#k\r\n\t\t#bӵ��ȫ��������ʾ������������ɫ��\r\n- #e#d��ϸ˵����#n#k\r\n\t\t������۵���50��������ÿ�������ȡ 6666 ���, ��30����ÿ���������������Լ�˫�����ʣ�����ÿ�������ȡ20��[�߼�����ħ������ʦ������ħ�����������ᡢף������]�����������Ѹ������������Լ�����ϴѪ����������ȡÿ�ս��. ��Ա�����̵�,��Ա�Ż��ƹ�,��Ա���н�һ����\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
			} else if (selection == 4) {
				typed = 4;
				cm.sendYesNo(head + "#e#d����ʵ����Ʒ���һ��Ȩ��#n#k\r\n- #e#r��ʾ:#k#n  #r#z2430865# 260���/30��#k\r\n- #e#d���������Ȩ��#n#k\r\n\t\t#bӵ��ȫ��������ʾ������������ɫ��\r\n- #e#d��ϸ˵����#n#k\r\n\t\t������۵���260������ÿ�������ȡ [10000] ���, ��30�����������������Լ�˫�����ʣ�ÿ����ȡ20��[�߼�����ħ������ʦ������ħ�����������ᡢף������]����Ѹ�����������Ⱦɫ�Լ�����ϴѪ����ȡÿ�ս��. ������ϡ�����ӣ����Ǯׯ��ȡ����\r\n#r������Ƶ��ڵİ��͸���ҵģ��Ķ������ж�#k\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
			} else if (selection == 5) {
				typed = 5;
				cm.sendYesNo(head + "- #e#d��ӭ�����������һ��Ȩ��#n#k\r\n- #e#r��ʾ:#k#n  #r#z2430865# 1200Ԫ��/365��#k\r\n- #e#d���������Ȩ��#n#k\r\n\t\t#bӵ��ȫ��������ʾ������������ɫ��\r\n- #e#d��ϸ˵����#n#k\r\n\t\t������۵���1200Ԫ��������ÿ�������ȡ 6666 ���, ��365����ÿ���������������Լ�˫�����ʣ�����365������ÿ�������ȡ20��[�߼�����ħ������ʦ������ħ�����������ᡢף������]�����������Ѹ��������Լ�����ϴѪ����������ȡÿ�ս��. ��Ա�����̵�,��Ա�Ż��ƹ�,��Ա���н�һ����\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
			} else if (selection == 6) {
				typed = 6;
				cm.sendYesNo("");
			}
		} else if (status == 2) {
			if (typed == 1) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 10) {
					cm.gainItem(2430865, 1, 1);
					cm.gainRMB(-10);
					cm.sendOk(head + "��ϲ���ɹ�����һ���������.");
					cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�������Ʒ���һ��Ȩ��", 5120012);
					cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " �ɹ�����һ����Ʒ���.");
					cm.dispose();
				} else {
					cm.sendOk(head + "ʧ�ܣ�\r\n\r\n#r1). �����������δ����,�޷��ظ�����.\r\n2). ��ֵ���δ�ﵽ����.\r\n3). ������������λ����,������.");
					cm.dispose();
				}
			} else if (typed == 2) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 150) {
					cm.gainItem(2430865, 1, 10);
					cm.gainRMB(-150);
					cm.sendOk(head + "��ϲ���ɹ�����10���������.");
					cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�������Ʒ���10��Ȩ��", 5120012);
					cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " �ɹ�����10����Ʒ���.");
					cm.dispose();
				} else {
					cm.sendOk(head + "ʧ�ܣ�\r\n\r\n#r1). �����������δ����,�޷��ظ�����.\r\n2). �����ֵ���δ�ﵽ����.\r\n3). ������������λ����,������.");
					cm.dispose();
				}
			} else if (typed == 3) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getNX(1) >= 1000000) {
					cm.gainItem(2430865, 1, 30);
					cm.gainNX(1, -1000000);
					cm.sendOk(head + "��ϲ���ɹ�����һ������Ʒ���.");
					cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�������Ʒ���һ����Ȩ��", 5120012);
					cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " �ɹ�����һ����Ʒ���.");
					cm.dispose();
				} else {
					cm.sendOk(head + "ʧ�ܣ�\r\n\r\n#r1). ������Ʒ���δ����,�޷��ظ�����.\r\n2). ��ֵ���δ�ﵽ����.\r\n3). ������������λ����,������.");
					cm.dispose();
				}
			} else if (typed == 4) { //�����Ա30��
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 260) {
					cm.gainItem(2430865, 1, 30);
					cm.gainRMB(-260);
					//cm.gainNX(1, -1000000);
					cm.sendOk(head + "��ϲ���ɹ�����30���������.");
					cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�������Ʒ�����ʮ��Ȩ��", 5120012);
					cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " �ɹ�������ʮ����Ʒ���.");
					cm.dispose();
				} else {
					cm.sendOk(head + "ʧ�ܣ�\r\n\r\n#r1). �����������δ����,�޷��ظ�����.\r\n2). �����ֵ���δ�ﵽ����.\r\n3). ������������λ����,������.");
					cm.dispose();
				}
			} else if (typed == 5) {
				if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getRMB() >= 1200) {
					cm.gainItem(2430865, 1, 365);
					cm.gainRMB(-1200);
					cm.sendOk(head + "��ϲ���ɹ�����һ����Ʒ���.");
					cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " �ɹ�������Ʒ���һ��Ȩ��", 5120012);
					cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " �ɹ�����һ����Ʒ���.");
					cm.dispose();
				} else {
					cm.sendOk(head + "ʧ�ܣ�\r\n\r\n#r1). �����������δ����,�޷��ظ�����.\r\n2). ��ֵ���δ�ﵽ����.\r\n3). ������������λ����,������.");
					cm.dispose();
				}
			}
		}
	}
}