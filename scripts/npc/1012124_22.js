/* Joyce
	Event NPC
*/

var status = -1;
var maps = Array(
910001000, //���ص�ͼ - רҵ������ׯ&lt;���˽�>
230000000, //ˮ������ - ˮ������
260000000, //����֮· - ���ﰲ��
101000000, //ħ������ - ħ������
211000000, //���ص� - ����ѩ��
120030000, //�ƽ�̲ - ���߹���
130000200, //Ů��֮· - ʥ�ز�·
100000000, //���ִ� - ���ִ�
103000000, //�������� - ��������
222000000, //ʱ�侲ֹ֮�� - ͯ����
240000000, //��ľ�� - ��ľ��
104000000, //����� - �����
220000000, //��߳� - ��߳�
802000101, //���֮�� - ��ķ�� ���ڲ���
120000000, //ŵ����˹ - ŵ����˹��ͷ
221000000, //ʱ�侲ֹ֮�� - �����������
200000000, //���ص� - ���֮��
102000000, //��ʿ���� - ��ʿ����
300000000, //����ɭ�� - ����̩Ӫ��
801000000, //�Ѻʹ� - �Ѻʹ�
540000000, //�¼��� - ����������
541000000, //�¼��� - ������ͷ��
250000000, //���� - ����
251000000, //�ٲ��� - �ٲ���
551000000, //�������� - �ʰ��
550000000, //�������� - ��¡���� 
261000000, //ɯ��С�� - �������
541020000, //�¼��� - ��³�����
270000000, //ʱ����� - ������
682000000, //���ص�ͼ - �ֹ�լۡ�ⲿ
140000000, //��ѩ֮�� - ���
970010000, //���ص�ͼ - ����ɽ��
103040000, //�϶��㳡 - �϶��㳡����
555000000, //M�� - ��ɫʥ��ɽ��
310000000, //��ɫ֮����� - ���¶�˹̹
200100000, //����еĿ����� - ���������
211060000, //ʨ����֮�� - ����ԭҰ
310040300, //��· - ��ʯ·
701000000);//�Ϻ���̲
var pqMaps = Array(
541000300, //�¼��� - ����ͨ�� 3 �ȼ���85-100
220050300, //��߳� - ʱ��ͨ��
229000020, //�ֹ�լۡ - �ͷ�2
230040200, //ˮ������ - Σ��Ͽ��1
541010010, //�¼��� - ���鴬 2
551030100, //�������� - ��ɭ�������
240040500, //��ľ�� - ��֮��Ѩ���
800020110, //������ - ��Ұ������
105030500, //���������Ժ - ���ɼ�̳
102040200, //�ż������ - �ż�������Ӫ��
105100100, //�������� - ��Ժ����
211041100, //����ɭ��
270030500); //��ȴ֮·5

var head = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n";

var selectedMap = -1;
var selectedArea = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 2 || status == 0) {
            cm.dispose();
            return;
        }
        status--;
    }

    if (status == 0) {
        cm.sendSimple(head + "���� #r#h ##k ��ʲô��Ҫ�Ұ�æ���� \r\n#b#b#L2#ѧϰ����#l\r\n#L102#����SP��ʼ������#l");
    } else if (status == 1) {
		if (selection == 102)
		{
			if (cm.getMeso() >= 100000 && cm.canHold(2500000, 1)) {
				cm.gainMeso(- 100000);
				cm.gainItem(2500000, 1);
				cm.sendOk(head + "��ϲ��һ��ɹ� ���������Ŀ�鿴");
				cm.dispose();
				return;
			} else {
				cm.sendOk(head + "��û��10Wð�ձ�\r\n");
				cm.dispose();
				return;
			}
	    }else if (selection == 1) {
			cm.dispose();
			cm.openNpc(9270035,2);
        } else if (selection == 2) {
            status = 5;
            cm.sendSimple(head + "���� #r#h ##k ��ѡ����Ҫ��������Ŀ:\r\n#b#L1#Ⱥ�輼��#l\r\n#L4#��輼��#l\r\n#L5#ҹ�⼼��#k");
        } else if (selection == 3) {
            cm.sendSimple("���� #r#h ##k ��ѡ����Ҫ���͵���Ŀ:\r\n#b#L0#������#l\r\n#L1#��������(70����)#l\r\n#L2#��Ԫ����#l#k"); //\r\n#L3#���ɵ�ͼ#l
        } else if (selection == 5) {
            if (!cm.haveItem(4001168, 1)) { //���Ҷ
                cm.sendOk("�������ı����Ƿ��н��Ҷ�������.");
            } else {
                if (cm.removeItem(4001168)) {
                    cm.gainNX( +2800);
                    cm.sendOk("�һ��ɹ������ 2800 ���");
                } else {
                    cm.sendOk("����õ����Ƿ�����.");
                }
            }
            cm.dispose();
        } else if (selection == 6) {
            if (cm.getPlayer().getCSPoints(1) < 3000) {
                cm.sendOk("���ĵ������ 3000 ����һ����Ҷʧ�ܣ�");
            } else if (!cm.canHold(4001168, 1)) {
                cm.sendOk("�������ı����Ƿ����㹻�Ŀռ�.");
            } else {
                cm.gainItem(4001168, 1); //���Ҷ
                cm.gainNX( - 3000);
                cm.sendOk("�һ��ɹ�����ý��Ҷ1�����˵��߼�ֵ 3000 �����������߶һ��ɽ�����ǽ���ȡ200���������ѡ�");
            }
            cm.dispose();
        } else if (selection == 11) {
            cm.dispose();
            cm.openNpc(1012121);
        }
    } else if (status == 2) {
        var selStr = "��ѡ������Ŀ�ĵ�: #b";
        if (selection == 0) {
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# #l";
            }
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9010022);
            return;
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9070007);
            return;
        } else {
            for (var i = 0; i < pqMaps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + pqMaps[i] + "# #l";
            }
        }
        selectedArea = selection;
        cm.sendSimple(selStr);
    } else if (status == 3) {
        cm.sendYesNo("������������鶼�Ѿ��������˰��������Ҫ�ƶ��� #m" + (selectedArea == 0 ? maps[selection] : pqMaps[selection]) + "# ��");
        selectedMap = selection;
    } else if (status == 4) {
        if (selectedMap >= 0) {
            cm.warp(selectedArea == 0 ? maps[selectedMap] : pqMaps[selectedMap], 0);
        }
        cm.dispose();
    } else if (status == 6) {
        if (selection == 1) {
            if (cm.getPlayer().getSkillLevel(8) > 0 || cm.getPlayer().getSkillLevel(10000018) > 0 || cm.getPlayer().getSkillLevel(20000024) > 0 || cm.getPlayer().getSkillLevel(20011024) > 0) {
                cm.sendOk(head + "���Ѿ�ѧϰ��������ܡ�");
            } else {
                if (cm.getJob() == 2001 || (cm.getJob() >= 2200 && cm.getJob() <= 2218)) {
                    cm.teachSkill(20011024, 1, 0); // ���� - Ⱥ��
                } else if (cm.getJob() == 2000 || (cm.getJob() >= 2100 && cm.getJob() <= 2112)) {
                    cm.teachSkill(20000024, 1, 0); // ս�� - Ⱥ��
                } else if (cm.getJob() >= 1000 && cm.getJob() <= 1512) {
                    cm.teachSkill(10000018, 1, 0); // ��ʿ�� - Ⱥ��
                } else {
                    cm.teachSkill(8, 1, 0); // ð�ռ� - Ⱥ��
                }
                cm.sendOk(head + "��ϲ��ѧϰ���ܳɹ���");
            }
            cm.dispose();
        } else if (selection == 4) {
            /*���޼���  || cm.getPlayer().getSkillLevel(cm.getPlayer().getStat().getSkillByJob(1004, cm.getPlayer().getJob()))*/
            if (cm.getPlayer().getSkillLevel(80001000) > 0) {
                cm.sendOk(head + "���Ѿ�ѧϰ��������ܡ�");
            } else {
                if (cm.getJob() >= 3000) {
                    cm.sendOk(head + "�Բ��𣡸�ְҵ��ʱ�޷�ѧϰ������ܡ�");
                    cm.dispose();
                    return;
                }
cm.teachSkill(80001000 ,  1, 1);
                /*cm.teachSkill(cm.isGMS() ? 80001000 : cm.getPlayer().getStat().getSkillByJob(1004, cm.getPlayer().getJob()), 1, 1);*/
                cm.sendOk(head + "��ϲ��ѧϰ���ܳɹ���");
            }
            cm.dispose();
        } else if (selection == 5) {
	if(cm.getJob() == 2700 || cm.getJob() == 2710 || cm.getJob() == 2711 || cm.getJob() == 2712){
		cm.teachSkill(27000106,5,5);
		cm.teachSkill(27001100,20,20);
		cm.sendOk(head + "��ϲ������ѧϰ�ɹ�");
	} else {
		cm.sendOk(head + "�㲻���ڸ�ְҵȺ");
}
            cm.dispose();
        }
    }
}