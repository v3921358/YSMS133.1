var status = 0;
var yaoshi = 2;

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
        cm.sendSimple("#r#e<����˹Կ������>#n\r\n#kͨ��³����˹�޴������ڲ���Ҫ��Կ��.\r\n#b#L1#�����ȡ#v4033611#����Կ�ס�(2��)");//\r\n#L2#�����#v4033611#����Կ�ס�(15000���)
    } else if (status == 1) {
        switch (selection) {
        case 1:
		    if(cm.getBossLog("����Կ��") < yaoshi)
		    {
		    cm.gainItem(4033611,1);
		    cm.setBossLog("����Կ��");
		    }else{
			cm.sendOk("ÿ��ֻ�������ȡ#v4033611#����Կ�ף�2�Ρ�");
                    cm.dispose();
			}
            break;
        case 2:
		    if(cm.getPlayer().getCSPoints(1) >= 15000 && cm.getBossLog("����Կ��")<7)
		    {
		    cm.setBossLog("����Կ��");
		    cm.gainItem(4033611,1);
		    cm.gainNX( -15000);
		    }else{
			cm.sendOk("��ȷ���Ƿ��㹻15000���\r\n��ÿ�չ���Կ�״������ܳ���5��!");
                    cm.dispose();
}
            break;
        }
        cm.dispose();
    }
}