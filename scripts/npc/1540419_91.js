var aaa = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";

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
            cm.sendSimple(""+aaa+"\r\n�װ���#r#h ##k���ã�����ѡ������Ҫ�Ĺ���:\r\n#r(1���ֽ��һ�1��#z4001485# = 1��#z4001485#�һ�1�ֽ��\r\n#k#l��������ٶһ�Ŷ!!!\r\n\r\n����ǰ�ֽ��Ϊ:#r " + cm.getRMB() + " #k��\r\n#z4001485#Ϊ:#r " + cm.getItemQuantity(4001485) + " #k��\r\n#b#L0#��Ҫ�һ�#z4001485##l\r\n#L1#��Ҫ�һ��ֽ��#l");
        } else if (status == 1) {
            if (cm.getPlayer() >= 1 && cm.getPlayer() <= 5) {
                cm.sendOk("GM���ܲ���һ�.");
                cm.dispose();
            }
            if (selection == 0) {
                if (cm.getRMB() == 0) {
                    cm.sendNext("�����ֽ�㲻�㣬�޷��һ�#z4001485#��");
                    status = -1;
                } else {
                    beauty = 1;
                    cm.sendGetNumber("�������ֽ��һ�#z4001485#������:\r\n�һ�����Ϊ 1 : 1\r\n", 1, 1, cm.getHyPay(1));
                }
            } else if (selection == 1) {
                if (cm.getItemQuantity(4001485) == 0) {
                    cm.sendNext("����#z4001485#���㣬�޷��һ��ֽ�㡣");
                    status = -1;
                } else {
                    beauty = 2;
                    cm.sendGetNumber("������#z4001485#�һ��ֽ�������:\r\n�һ�����Ϊ 1 : 1\r\n", 1, 1, cm.getItemQuantity(4001485));
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

                }else if (cm.getRMB() >= selection) {
                   // cm.gainRMB(selection);
		    cm.gainRMB(- 1 * selection);
                    cm.gainItem(4001485, selection);
                    cm.sendOk("���ɹ���#r " + (selection) + " #k��Ϊ#z4001485# #v4001485# x #r" + selection + " #k")
                } else {
                    cm.sendNext("������������������޷��һ�#z4001485#��");
                    cm.dispose();
                }
            } else if (beauty == 2) {
                if (cm.haveItem(4001485, selection)) {
                    cm.gainItem(4001485, -selection);
		    cm.gainRMB(selection);
                    //cm.gainRMB(- 1 * selection);
                    cm.sendOk("���ɹ���#z4001485# #v4001485# x #r" + selection + " #k��Ϊ#r " + (1 * selection) + " #k�ֽ�");
                } else {
                    cm.sendNext("������������������޷��һ��ֽ�㡣");
                    cm.dispose();
                }
            }
            status = -1;
        } else {
            cm.dispose();
        }
    }
}