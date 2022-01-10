var status = 0;
var icon1 = "#fEffect/CharacterEff/1082565/4/0#";
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var npcid = 9330065;

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
    if (status == 0) {
		var text = "��ã����ǻ�԰����ʹ�ߡ�\r\n";
		text+= "#b#L0#"+ icon2 +" �˽�ʲô�ǻ�԰��#l\r\n";
		text+= "#b#L2#"+ icon2 +" ��ȡ������ѻ���#l\r\n";
		text+= "#r#L1#"+ icon1 +" �����ҵĻ�԰#l\r\n";
		cm.sendSimple(text);
	} else if (status == 1) {
		switch(selection) {
			case 0:
				var text="\tÿ����ɫ������԰�����ȼ�Ϊ1��������ӵ��1�����裬�����ȼ�֮�����������԰���ӻ��裬��԰�����ȼ�����������ֲ�Ļ��֡�ÿ���ջ�ʱ���Ի����ֲ����ͻ��Ĳ���κεĻ�ֻҪ����һ��û�в�ժ�ͻ��ή��\r\n";
				text+="\tÿ�����Ϊ��ֲ�Ļ�����һ�ν�ˮ��ʩ�ʣ���ˮ����10����������Լ���1Сʱ������ɳ�ʱ�䣬ʩ������20����������Լ���2Сʱ������ɳ�ʱ�䡣";
				status-=2;
				cm.sendNext(text);
			break;
			case 1:
				cm.dispose();
				cm.openNpc(npcid, 100);
			break;
			case 2:
				if (cm.getBossLog("��԰����")==0) {
					cm.setBossLog("��԰����");
					//cm.gainPlayerEnergy(-cm.getPlayerEnergy());
					cm.gainPlayerEnergy(50);
					cm.sendOk("�ɹ���ȡ��50�����ֵ���������ֵ��ͨ������������#b<��ռ������>��<�����޺���>��<ɨ���ػ���>��<���찮����>#k��ȡ��");
					cm.dispose();
				} else {
					cm.sendOk("�������Ѿ���ȡ���˻���ֵ��");
					cm.dispose();
				}
				
		}
	}
}