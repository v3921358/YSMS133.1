var status;
var text;
var basermb = 188;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else {
            cm.dispose();
            return;
        }


        if (status == 0) {
            text = "\t\t\t\t#r#e- 2015����ȫ���´���� -#k\r\n\r\n";
            text += "\t���ӭ���µ�һ�꣬��л��ҵ���飬����Ŀǰ���Ǹտ�������һ���£���Ϸ���ܻ�������������������֣����Ҳ������Ƶ�����Ϸ���½��Ȼ�����ϣ������ܹ��½⣬���ǻᾡ������ù���״̬�������Ƕ�һ�޶��Ŀ�������ţ��������������Ҹ��ྪϲ����л��ҵ�֧�֣�#rף������µ�һ�������彡�����������⣬����ƣ��ش����Ϻ��һ�ݣ�����Ц�ɣ�\r\n\r\n";
            text += "\r\n\r\n#L0##b��ȡ������#l\r\n";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (cm.getBossLogAcc("2015������") == -1) {
                cm.sendOk("���Ѿ���ȡ���������ˣ�ף����Ϸ��죬�������~");
                cm.dispose();
                return;
            }
			if (cm.getPlayer().getTotalOnlineTime() < 1000)
			{
				cm.sendOk("�ۼ�����ʱ�䲻��1000����,�޷���ȡ���.");
				cm.dispose();
				return;
			}
            cm.setBossLogAcc("2015������", -2);
            var randomrmb = Math.floor(Math.random() * 811 + basermb)
            //cm.gainRMB(randomrmb);
			cm.addHyPay(-randomrmb);
            cm.sendOk("��ϲ����ȡ��#r" + randomrmb + "#kԪ��ñҵȼۺ����ף����Ϸ��죡");
            cm.worldMessage(0x19, "[2015������] : ��ϲ " + cm.getName() + " ��ȡ���� " + randomrmb + " ��ñҵ�2015�����´������");
            cm.dispose();
        }
    }
}