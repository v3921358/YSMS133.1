/*
	���ܣ������볡������ʾ
	���ڣ�2013-11-23
*/

var status = 0;
var text;
function start () {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == 0) {
            if (!cm.MissionStatus(cm.getPlayer().getId(), 10000, 0, 4)) {//�鿴����û
                cm.MissionMake(cm.getPlayer().getId(), 10000, 0, 0, 0, 0)
            }
            if (!cm.MissionStatus(cm.getPlayer().getId(), 10000, 0, 0) && cm.getLevel() <= 10) {//���û����ҽ�ɫ�ȼ�С�ڵ���10��
                cm.MissionFinish(cm.getPlayer().getId(), 10000);
var text = "#h0# ��ӭ����" + cm.getServerName() +" #k,��������˽�һ�±�����ɫ��\r\n\r\n";

				text += "�� #e#d����Ϊ�¹� �������ã�����50��  ���10��  ����5��\r\n";
				text += "�� #b#n��:Ϊʲô���F������ô��,����F������ô��?��:����F�ı��ʾ����˾��ĵĲ߻������,���Ǳ��ʸ߾ͺ���,���Ķ����Ͷ�.�벻Ҫ��һЩ����F�ɱ���˫��.\r\n";
				text += "�� #r���˵���������ť(��������@NPC),���г����NPC�����ṩ���ֱ�ݷ���\r\n";
				text += "�� #e#r���ֳ�����������:#v1142802##v1142310##v1003552##v1082433##v1052461##v1102441##v1072666##v1132154##v1152089##v2431402##v1002679##v1702224##v1050291##v1051357##v3010501##v1012057##v1022048##v1032024##v5150040##v5152053##v5150052##v5153015##v5152057##v5151036##v5211060##v5360015##v5060000##v2431092##v1102630##v2431402##v1112918#\r\n";
				text += "�� ����ȫְҵ���������еĹ��ﶼ���������#v4280000##v4280001##v2430112##v2028061##v2460003##v2290285##v2028062##v2028062##v4310088##v2431887##v2431174##v2431738##v2431738##v4310057##v4001832##v4310129##v4032579##v4032580##v4032581##v4032582##v4032583##v4032584##v4032585##v4032586##v4032587##v4000313##v4004000##v4004001##v4004002##v4004003##v4001244#\r\n";
				//text += "�� ����ת������,ÿ��ת���ɻ��ȫ����+5,ÿ�η����ɻ��ȫ����+100\r\n";
				text += "�� ���ַ¹ٷ����̸���Ȥζ������,������Ϸ����,ǿ���ĵȼ�����,���ֶ��и���-��˿.����.�ϰ��������\r\n";
				text += "\r\n\r\n���ྫ��,�����ڴ�!";
				cm.sendNextS(text, 1);
            }
		} else if (status == 1) {
			cm.sendNext("Ϊ��������˳���ɳ�,����׼���������������:" + "\r\n\r\n#t3010145# �� 1\r\n#t2430241# �� 1");
		} else if (status == 2) {
			cm.gainItem(3010145, 1);	// ������ˮ����Ҷ����
			cm.gainItem(2430154, 1);	// �������
			//cm.gainMeso(100000);
			//cm.warp(50000, 0);
			//cm.useItem(2003519);
			Operate(cm.getJob());
			text = "����ֱ��ȥ������ţ����10��,��ʼ���ð��֮�ð�~ \r\n�����ظ������NPC��������Ҫʹ��#r@ea#k�⿨��\r\n#r����Ҫ�����Ļ����Ե��������ť�鿴���˵���";
			cm.sendOk(text);
			cm.dispose();
		}
	}
}




function Operate(job) {
    switch (job) {
        case 6001://��������ʹ
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)
            cm.gainExp(100000)//����10��
            cm.gainItem(1222000, -1);//ɾ��ԭʼ����
            equip(1352600)//����������
            cm.changeJob(6500);
            cm.gainItem(2431305, 1);
            cm.sendY("���͸��� >>> ��������� һ�������Ը�����Ľ�ɫ�ȼ���ȡ��Ӧ�ĵ��ߣ�")
            break;
    }
}

function equip(itemId) {
    var item = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).findById(itemId);
    if (item == null) {
        cm.gainItem(itemId, 1);
    }
    var item2 = cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).findById(itemId);
    //������ұ�����û�������Ʒ,û�о͸����
    if (item2 != null) {
        var pos = item2.getPosition();
        Packages.server.MapleInventoryManipulator.equip(cm.getC(), pos, -10);
    }
}