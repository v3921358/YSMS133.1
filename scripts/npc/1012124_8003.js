var aaa ="#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
//"#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var status = 0;
var typed=0;
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
                        var selStr = head + "#b��ѡ����������#n#k\r\n";
                        selStr +="\r\n  - #e#r����ǰ�ñ�Ϊ #d" + cm.getHyPay(1) + "#k#r #e��#n#k\r\n";
                        selStr +="       #d����ǰ�ĵ��Ϊ��#r" + cm.getPlayer().getCSPoints(1) + " #d��#k\r\n\r\n\r\n";
			selStr +="#L2##b"+aaa+" ����ʵ����Ʒ���10W���/��[�������鿴]#l#k\r\n\r\n";
			//selStr +="#L3##b"+aaa+" ��������һ��Ȩ[�������鿴]#l#k\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo(head + "- #e#d��ӭ�����������һ��Ȩ��#n#k\r\n\r\n- #e#r��ʾ:#k#n  #rvip���غ��� 10Ԫ�ֽ�/��#k\r\n\r\n- #e#d���������Ȩ��#n#k\r\n\t\t#bÿ�տ�����3000���ҹ��ʡ�\r\n\t\t������ѡ���͡���ʹ�ÿ��ϴѪ���ܡ�\r\n\t\tÿ�մ���ħ�������֣��������齱\r\n\t\t��ݴ��ͣ��������飬˫������\r\n\t\t��������Ȩ���˫�����Լ�ר�𸱱���\r\n\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo(head + "- #e#d����ʵ����Ʒ���һ��Ȩ��#n#k\r\n\r\n- #e#r��ʾ:#k#n  #rvip���غ��� 100000���/��#k\r\n\r\n- #e#d������Ȩ��#n#k\r\n\t\t#bӵ��ȫ��������ʾ������������ɫ��\r\n- #e#d��ϸ˵����#n#k\r\n\t\t������۵���10�������ҷ�30�췵��4.5����30����ÿ���������������Լ�˫�����ʣ�����30���ڻ᷵����90���߼�����ħ������ʦ������ħ�����������ᡢף�����ᡣ���������Ѹ��������Լ�����ϴѪ����������ȡÿ�ս��\r\n\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo(head + "- #e#d��ӭ�����������һ��Ȩ��#n#k\r\n\r\n- #e#r��ʾ:#k#n  #rvip���غ��� 1200Ԫ�ֽ�/��#k\r\n\r\n- #e#d���������Ȩ��#n#k\r\n\t\t#bÿ�տ�����30���ҹ��ʡ�\r\n\t\t������ѡ���͡���ʹ�ÿ��ϴѪ���ܡ�\r\n\t\tÿ�մ���ħ�������֣��������齱\r\n\t\t��ݴ��ͣ��������飬˫������\r\n\t\t��������Ȩ���˫�����Լ�ר�𸱱���\r\n\r\n- #e#d������ʾ��#n#b���ǽ��й��򡣵�񷵻���һҳ.#k");
                        } else if (selection == 4) {
				typed=4;
				cm.sendYesNo("");	
			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getHyPay(1) >= 10) {
			cm.gainItem(2430865,1,1);
			cm.addHyPay(10);
			cm.sendOk(head + "��ϲ���ɹ�����һ���������.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �ɹ�������Ʒ���һ��Ȩ��", 5120012);
			cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " �ɹ�����һ����Ʒ���.");
			cm.dispose();
                } else {
			cm.sendOk(head + "ʧ�ܣ�\r\n\r\n#r1). �����������δ����,�޷��ظ�����.\r\n2). ��ֵ���δ�ﵽ����.\r\n3). ������������λ����,������.");
			cm.dispose();
				}
			} else if(typed==2){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getPlayer().getCSPoints(1) >= 100000) {
			cm.gainItem(2430865,1,30);
			cm.gainNX(1, -100000);
			cm.sendOk(head + "��ϲ���ɹ�����һ������Ʒ���.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �ɹ�������Ʒ���һ����Ȩ��", 5120012);
			cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " �ɹ�����һ����Ʒ���.");
			cm.dispose();
                } else {
			cm.sendOk(head + "ʧ�ܣ�\r\n\r\n#r1). ������Ʒ���δ����,�޷��ظ�����.\r\n2). ��ֵ���δ�ﵽ����.\r\n3). ������������λ����,������.");
			cm.dispose();
				}
			} else if(typed==3){
                if (cm.haveItem(2430865) < 1 && cm.getSpace(2) > 2 && cm.getHyPay(1) >= 1200) {
			cm.gainItem(2430865,1,365);
			cm.addHyPay(1200);
			cm.sendOk(head + "��ϲ���ɹ�����һ����Ʒ���.");
			cm.getMap().startMapEffect("��ϲ��� "+cm.getChar().getName()+" �ɹ�������Ʒ���һ��Ȩ��", 5120012);
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