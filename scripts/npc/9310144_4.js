var status = -1;
var beauty = 0;
var tosend = 0;
var sl;

function start() {
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
        if (mode == 1) {
            status++;
        } else {
            if (status == 0) {
                cm.sendNext("�������Ҫ����н�Ļ�����ô���´������ң�");
                cm.dispose();
            }
            status--;
        }
        if (status == 0) {
            cm.sendSimple("#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã�����ѡ������Ҫ�Ĺ���:\r\n#r(���<-1000���/��--�н��Ϊ100���->#v4000463#��������)\r\n#k#l��������ٶһ�Ŷ!!!\r\n\r\n����ǰ���Ϊ:#r " + cm.getPlayer().getCSPoints(1) + " #k��\r\n��������Ϊ:#r " + cm.getItemQuantity(4000463) + " #k��\r\n#b#L0#��Ҫ�һ���Ʒ#l\r\n#L1#��Ҫ�һ����#l");
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM���ܲ���һ�.");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getPlayer().getCSPoints(1) / 1000 == 0) {
                    cm.sendNext("���ĵ���㣬�޷��һ��������ҡ�");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("��������һ��������ҵ�����:\r\n�һ�����Ϊ 1000 : 1\r\n", 1, 1, cm.getPlayer().getCSPoints(1) / 1000);
                }
            } else if (selection == 1) {
                if (cm.getItemQuantity(4000463) == 0) {
                    cm.sendNext("���Ĺ������Ҳ��㣬�޷��һ����");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("������������Ҷһ���������:\r\n�һ�����Ϊ 1 : 900\r\n", 1, 1, cm.getItemQuantity(4000463));
                }
            }
        } else if (status == 2) {
            if (beauty == 1) {
                if (selection <= 0) {
                    cm.sendOk("����Ķһ����ִ���.");
                    cm.dispose();
                }else if(selection>=200){
                    sl=(selection/200)+1;
                } else{
                    sl=3;
                }
                if (cm.getSpace(4) < sl) {
                    cm.sendOk("��ı������������ռ䲻��!��������"+sl+"���ռ�����.\r\n��������г���С���Ļ�����λ!\r\n�磺����<������7.5���ռ�����>��ô������Ҫ��8���ռ�!");
                    cm.dispose(); 

                }else if (cm.getPlayer().getCSPoints(1) >= selection * 1000) {
                    cm.gainNX( - selection * 1000);
                    cm.gainItem(4000463, selection);
					cm.finishActivity(120112);
                    cm.sendOk("���ɹ���#r " + (selection * 1000) + " #k���Ϊ��������#v4000463# x #r" + selection + " #k")
                } else {
                    cm.sendNext("������������������޷��һ��������ҡ�");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4000463, selection)) {
                    cm.gainItem(4000463, -selection);
                    cm.gainNX( + 900 * selection);
					cm.finishActivity(120113);
                    cm.sendOk("���ɹ�����������#v4000463# x #r" + selection + " #k��Ϊ#r " + (900 * selection) + " #k���");
                } else {
                    cm.sendNext("������������������޷��һ����");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}