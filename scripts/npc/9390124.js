var status = 0;

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
        var selStr = "#r#e<ͨ�����յµ�·>#n\r\n#k���������ķ�ŭ,���˱��յ��ٴλ���.\r\n#b#L1#ʹ��#v4033981##t4033981#���ƶ������˱��յ¡�\r\n#L2#��ȡ#v4033981##t4033981#";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 1:
		if(cm.haveItem(4033981,1) && cm.getPlayer().getLevel() >= 200)
		    {
		    cm.gainItem(4033981,-1);
		    cm.warp(863010000);
		}else{
		    cm.sendOk("#e��ȷ����ĵȼ��Ƿ�ﵽ���ϵ�Ҫ��(200������)\r\n��ȷ���㱳���Ƿ���#v4033981##t4033981#��");
                    cm.dispose();
		}
            break;
        case 2:
		if(cm.getPlayerStat("GM") == 1 || (cm.getBossLog("Կ��") < 3 && cm.getSpace(3) > 1)){
		    cm.sendOk("��� #v4033981##t4033981# x1");
		    cm.gainItem(4033981,1,1);
		    cm.setBossLog("Կ��");
                    cm.dispose();
		} else {
		    cm.sendOk("ÿ��������ȡ3�Ρ�\r\n��ȷ���������������Ƿ���1�����Ͽ�λ��");
		}
            break;
        }
        cm.dispose();
    }
}