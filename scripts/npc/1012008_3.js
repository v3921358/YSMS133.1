var ttt = "#fUI/UIWindow.img/Quest/icon9/0#";
var xxx = "#fUI/UIWindow.img/Quest/icon8/0#";
var sss = "#fUI/UIWindow.img/QuestIcon/3/0#";
var status = 0;
var cost = 100000;
var jilv = 0;
var costa;
var xx = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendOk("#b�õ�,�´��ټ�.");
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("#b�õ�,�´��ټ�.");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;
        if (status == 0) {
            var add = "��ӭ����#r�����"+cm.getChannelServer().getServerName()+"#k,�����Ǳ���#r�Ĳ���齱ϵͳ#k,";
            add += "һ��ǿ����Ϸ,��Ҫӵ����ȫ��Ĺ���,������ɫ���,ʱ��ȫ��,";
            add += "Ϊ������һ��ð��֮�ҵĸо�,ϲ�������Ѽǵô�������һ��Ŷ.\r\n\r\n ";
            add += "" + xxx + "-������ע���#e#b[��ע]#n#k\r\n ";
            add += "" + xxx + "-�ӱ��Ĳ��������������ʵ���,�������Ӹ��ʽ���.\r\n ";
            add += "" + xxx + "-��ǰ��עѺ��:#b<#e#r ð�ձҶĲ� #n#b>#b<#e#r " + cost + " ð�ձ�#n#b >#k\r\n "; //cm.getPlayer().player.GetMoney()
            add += "" + xxx + "-��ǰ��ӵ��ð�ձң�" + cm.getMeso() + ".#k\r\n";
            add += "#L0#" + ttt + "-[#r��ע#k]#l\r\n\r\n";
            add += "#L1#" + ttt + "-[#b1:1������#k]#l";
            add += "#L2#" + ttt + "-[#b1:2������#k]#l";
            add += "#L3#" + ttt + "-[#b1:3������#k]#l";
            cm.sendSimpleS(add, 2);
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendOk("#b�ɹ���ע#r2ð�ձ�#b,���ȷ����鿴.");
                cost = cost + 1000000;
                status = -1;
            } else if (selection == 1) {
                var add = "#b<#e#r ð�ձҶĲ� #n#b>\r\n\r\n";
                add += "" + ttt + "-��ѡ�����[#r����1:1#b].\r\n";
                add += "" + ttt + "-����ѺעΪ[#r" + cost + "ð�ձ�#b].\r\n";
                add += "" + ttt + "-���ʤ������ȡ[#r��������" + cost * 1 + "ð�ձ�#b]�Ľ���.\r\n";
                add += "" + ttt + "-���[#r��#b]��ʼ�Ĳ�,���[#r����#b]�����Ĳ�.";
                cm.sendYesNo(add);
                jilv = 1;
                xx = 0;
            } else if (selection == 2) {
                var add = "#b<#e#r ð�ձҶĲ� #n#b>\r\n\r\n";
                add += "" + ttt + "-��ѡ�����[#r����1:2#b].\r\n";
                add += "" + ttt + "-����ѺעΪ[#r" + cost + "ð�ձ�#b].\r\n";
                add += "" + ttt + "-���ʤ������ȡ[#r��������" + cost * 2 + "ð�ձ�#b]�Ľ���.\r\n";
                add += "" + ttt + "-���[#r��#b]��ʼ�Ĳ�,���[#r����#b]�����Ĳ�.";
                cm.sendYesNo(add);
                jilv = 2;
                xx = 0;
            } else if (selection == 3) {
                var add = "#b<#e#r ð�ձҶĲ� #n#b>\r\n\r\n";
                add += "" + ttt + "-��ѡ�����[#r����1:3#b].\r\n";
                add += "" + ttt + "-����ѺעΪ[#r" + cost + "ð�ձ�#b].\r\n";
                add += "" + ttt + "-���ʤ������ȡ[#r��������" + cost * 3 + "ð�ձ�#b]�Ľ���.\r\n";
                add += "" + ttt + "-���[#r��#b]��ʼ�Ĳ�,���[#r����#b]�����Ĳ�.";
                cm.sendYesNo(add);
                jilv = 3;
                xx = 0;
            }
        } else if (status == 2) {
            if (xx == 0) {
                if (jilv == 0) {} else if (jilv != 0) {
                    if (cm.getMeso() < cost) {
                        cm.sendOk("#b����ð�ձҲ���,���ܲμӶĲ�.....");
                        status = -1;
                    } else {
			//�����ε�1,2�д�,��������3,4��,��ô�񽱼��ʽ����
			//jiaru = GetRandomNum(0, jilv);
                        //if (jiaru == 0) {
                        jiaru = GetRandomNum(0, jilv*2);
                        if (jiaru == 2) {
                            costa = cost * jilv
                            cm.gainMeso(cost);
                            //cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x19, cm.getC().getChannel(), "[���ʹ���]" + " : ��ϲ��ң�" + cm.getPlayer().getName() + " ��ð�ձҲ�����Ӯ��" + costa + "ð�ձҡ�"));
                            cm.sendOk("#b��ϲ,���Ѿ����ȫʤ..."+jiaru);
                            status = -1;
                        } else {
                            cm.gainMeso(-cost);
                            cm.sendOk("#b���簡.������...."+jiaru);
                            status = -1;
                        }
                    }
                }
            }
        }
    }
}