importPackage(net.sf.odinms.client);
importPackage(net.sf.odinms.tools);
importPackage(net.sf.odinms.server);

var status = 0;
var fee = 0;
var chance = Math.floor(Math.random() * 4 + 1);
var typed = 0;

var compchoice;
var playerchoice;
var Frock = "#fUI/UIWindow.img/RpsGame/Frock#";
var Fpaper = "#fUI/UIWindow.img/RpsGame/Fpaper#";
var Fscissor = "#fUI/UIWindow.img/RpsGame/Fscissor#";
var rock = "#fUI/UIWindow.img/RpsGame/rock#";
var paper = "#fUI/UIWindow.img/RpsGame/paper#";
var scissor = "#fUI/UIWindow.img/RpsGame/scissor#";
var win = "#fUI/UIWindow.img/RpsGame/win#";
var lose = "#fUI/UIWindow.img/RpsGame/lose#";
var draw = "#fUI/UIWindow.img/RpsGame/draw#";
var spacing = "                                   ";
var beta = "#fUI/UIWindow.img/BetaEdition/BetaEdition#\r\n";
var winmatch = false;
var losematch = false
var drawmatch = false;
var cost = 1,000,000; //��Ҫ����Ǯ�棬�����.. �����Լ��ġ���
var winmesos = 1,500,000; //ӮǮ�������Լ���
var items = new Array(2000005); //�Դ����ƣ���Щ��������������Ӯ��������������д����Щ��������ӵģ�����Ҫ�Լ��ĵ����Ҳ�֪����û����Щ����..
var selectedType = -1;
var selectedItem = -1;
var map = 910000000;
var textedd = new Array("������Ϸף���ҵ���������", "ף������Ϸ���Ҹ�����", "������Ϸף���ҵ���������");

var types = new Array("ʥ��", "ף������", "���������������", "ȫ���������ݾ���", "Ь�������������", "���������������", "���׹����������", "���ֽ������������", "�̽������������", "����ħ���������", "����ħ���������", "˫�ֽ������������", "˫�ָ������������", "˫�ֶ��������������", "ǹ�����������", "ì�����������", "�������������", "�󹥻��������", "ȭ�׹����������");
var typesitem = new Array("4031454", "2340000", "2040303", "2040506", "2040709", "2040806", "2040807", "2043003", "2043303", "2043703", "2043803", "2044003", "2044103", "2044203", "2044303", "2044403", "2044503", "2044603", "2044703");
var typesitemcost = new Array("100", "541", "2000", "1400", "999", "888", "2000", "888", "1000", "888", "1200", "1250", "777", "730", "1300", "1210", "2600", "1200", "700");


var typeszq = new Array("1302063", "1302049", "1332021", "1302036", "1302037", "1302058", "1302065", "1302067", "1302071", "1302080", "1302001", "1312012", "1322006", "1322051", "1322053", "1372015", "1372017", "1372031", "1432009", "1432013", "1432045", "1432046", "1442046", "1402014", "5010062");
var typesitemzqcost = new Array("4999", "19999", "29999", "6999", "3888", "3888", "9288", "9999", "3666", "14150", "2999", "2999", "999", "19999", "8888", "999", "11199", "19999", "9999", "4999", "999", "8299", "4999", "29999", "29999");

var typeslb = new Array("5390000", "5390001", "5390002", "5072000");
var typesitemlbcost = new Array("200000", "200000", "200000", "2000000");


function start() {
    status = -1;

    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) { //ExitChat
        cm.dispose();

    } else if (mode == 0) { //No
        //cm.sendOk("�õ�,����������Ҫ��ʲô,�һ�������Ϊ������..");
        cm.dispose();

    } else { //Regular Talk
        if (mode == 1) status++;
        else status--;

        if (status == 0) {
            var text = "#L3##bʯͷ������[��������,����һ��]\r\n";
            text += "#L8#�Բ���[Ϊ���ܴ�,���ȥ��,�����]\r\n";
            //text +="#L9##b������[һ��ı��Ա�,holdס������]#k#l\r\n";
           // text += "#L24##b��Ϸ�ҹ�����Ʒ[����,ʥ��]#l\r\n";
            //text +="#L29##rʹ���г���Ϊ��ȡ��������#b[New]#k#l\r\n";
            //text += "#L26##rʹ��Ģ�����ƻ�ȡ�ϳ�����ʯ#b[New]#k#l\r\n";
           // text += "#L22##bʹ��ľ����Ʊ��ȡ���µ�װ[�̳�û�е�]#l\r\n";
            //text += "#L100##bʹ�÷�Ҷ��ȡGM��,ʥ��[ƽ�����ҲBT]#r[Hot]#k#l\r\n";
            //text +="#L12##bʹ��2��ľ����Ʊ��ȡʥ��[ת�����Ʒ]\r\n";
            //text += "#L25##bʹ������ֵ�һ���Ʒ[����,ħ��,����,ϡ�е�װ]#l\r\n";
           // text += "#d#L6#[��ȡ]ľ����Ʊ��1000��#l#L21##d[��ȡ]1000��ľ����Ʊ#l\r\n";
           // text += "#d#L27#[��ȡ]��Ҷ����Ӧ��Ϸ��#l#L28##d[��ȡ]��ֺ����Ӧ��Ϸ��#l\r\n";
            //text +="#L10##d[��ȡ]15E����ţ��Ʊ#l#L11#[��ȡ]��ţ��Ʊ��15E#l\r\n";
            //text +="#L13#[��ȡ]100��ֺ��1��#l #L14#[��ȡ]100��Ҷ��10��#k";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 6) {
                typed = 28;
                cm.sendGetText("��������Ҫ���һ�������#z4002002#=1000W��Ϸ��");
            } else if (selection == 21) {
                typed = 27;
                cm.sendGetText("��������Ҫ���һ�������1000W��Ϸ��=#z4002002#x1");
            } else if (selection == 27) {
                typed = 29;
                cm.sendGetText("��������Ҫ���һ���Ϸ�ҵ�����1��#z4001126#=20W��Ϸ��");
            } else if (selection == 28) {
                typed = 30;
                cm.sendGetText("��������Ҫ���һ���Ϸ�ҵ�����1��#z4000054#=10W��Ϸ��");
            } else if (selection == 29) {
                typed = 31;
                cm.sendGetText("��������Ҫ���һ��������ӵ�����1��#z2430692#=�г���Ϊ200��");
            } else if (selection == 22) {
                cm.dispose();
                cm.openNpc(9000041, 1);
            } else if (selection == 24) {
                cm.dispose();
                cm.openNpc(9000041, 2);
            } else if (selection == 25) {
                cm.dispose();
                cm.openNpc(9000041, 3);
            } else if (selection == 26) {
                cm.dispose();
                cm.openNpc(9000041, 4);
            } else if (selection == 100) {
                typed = 101;
                selStr = "#r\r\n���µľ���100%�ĳɹ����ʣ���������ΪGM���ᣬ�����������㹻�ķ�Ҷ�Ϳ������һ�ȡ#b";
                for (var i = 0; i < typesitem.length; i++) {
                    selStr += "\r\n#L" + i + "##z" + typesitem[i] + "##d��Ҫ#r[" + typesitemcost[i] + "��]#d��Ҷ#b";
                }
                cm.sendSimpleS(selStr, 2);
            } else if (selection == 7) {
                if (cm.getMeso() >= 1500000000) {
                    cm.sendOk("��ϲ���һ��ɹ���");
                    cm.gainItem(4002000, 1);
                    cm.gainMeso(-1500000000);
                    cm.dispose();
                } else {
                    cm.sendOk("�һ�ʧ�ܣ���û���㹻�Ľ�ҡ�");
                    cm.dispose();
                }
            } else if (selection == 8) {
                //var statup = new java.util.ArrayList();
                var p = cm.getChar();
                p.getStat().setHp(0,p);
                p.getStat().setMp(0,p);
                //statup.add(new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.HP, java.lang.Integer.valueOf(0)));
                //statup.add(new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.MP, java.lang.Integer.valueOf(0)));
                //p.getClient().getSession().write(net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup, p));
		var str = p.getStat().getStr();
		var dex =p.getStat().getDex();
		var _int =p.getStat().getInt();
		var luk = p.getStat().getLuk();
		cm.resetStats(str,dex,_int,luk);
                cm.worldMessage("���������ԡ���������" + cm.getChar().getName() + "���鳡ʧ�⣬���г�������ɱ����Ұ�ο��ο���ɡ�");
                cm.dispose();
            } else if (selection == 9) {
                if (cm.haveItem(4002000, 10) == true) {
                    cm.changeSex();
                    cm.sendOk("#b��ϲ�㣬�����ǳ��ĳɹ����۳�10����Ʊ\r\n#r�������ĸо��ǲ��Ǻ����ƣ���������������˾���˵�Լ������������˻�����Ů����.ȫ�������ҾͲ����ˣ����Ը���ȥ��.");
                    cm.gainItem(4002000, -10);
                    cm.dispose();
                } else {
                    cm.sendOk("�Բ�����û��10����ţ��Ʊ.Ŀǰ��������Ҫ��ţ����Ʊ.");
                    cm.dispose();
                }
            } else if (selection == 10) {
                if (cm.getMeso() >= 1500000000) {
                    cm.gainItem(4002000, 1); //��ţ��Ʊ
                    cm.gainMeso(-1500000000);
                    cm.sendOk("��ϲ���һ��ɹ���");
                    cm.dispose();
                } else {
                    cm.sendOk("�һ�ʧ�ܣ���û���㹻�Ľ�ҡ�");
                    cm.dispose();
                }
            } else if (selection == 11) {
                if (cm.getMeso() <= 600000000) {
                    if (cm.haveItem(4002000, 1)) {
                        cm.sendOk("��ϲ���һ��ɹ���");
                        cm.gainItem(4002000, -1); //ľ����Ʊ
                        cm.gainMeso(1500000000);
                        cm.dispose();
                    } else {
                        cm.sendOk("�һ�ʧ�ܣ���û��1����ţ��Ʊ��");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("�Բ���,Ǯ���ֻ�ܴ�21E,�����ϵ�Ǯ������6E!");
                    cm.dispose();
                }
            } else if (selection == 13) {
                if (cm.haveItem(4000054, 100)) {
                    cm.sendOk("��ϲ���һ��ɹ���");
                    cm.gainItem(4000054, -100); //��ֺ
                    cm.gainMeso(100000000);
                    cm.dispose();
                } else {
                    cm.sendOk("�һ�ʧ�ܣ���û��100�����˽�ֺ");
                    cm.dispose();
                }
            } else if (selection == 14) {
                if (cm.haveItem(4001126, 100)) {
                    cm.sendOk("��ϲ���һ��ɹ���");
                    cm.gainItem(4001126, -100); //ľ����Ʊ
                    cm.gainMeso(1000000000);
                    cm.dispose();
                } else {
                    cm.sendOk("�һ�ʧ�ܣ���û��100����Ҷ");
                    cm.dispose();
                }
            } else if (selection == 12) {
                typed = 5;
                cm.sendGetText("��������Ҫ���һ�ʥ��������!2��#v4002002#��һ��#v4031454#");
            } else if (selection == 1) {


            } else if (selection == 2) {
                typed = 2;
                cm.sendGetText("������ע���ٽ����?���Ӯ�˵Ļ����Ի��˫��������,�������������!");

            } else if (selection == 3) {
                if (cm.getMeso() >= 1000000) {
                    typed = 1;
                    cm.sendSimple("ע�⣬ʤ�������150W��Ϸ�ҽ�����ʧ����ʧȥ100W��Ϸ�ң���Ҫע����� ƽ��Ҳ����������Ŷ �۳�100W��Ϸ��...\r\n" + "#L0##fUI/UIWindow.img/RpsGame/Frock##l" + "#L1##fUI/UIWindow.img/RpsGame/Fpaper##l" + "#L2##fUI/UIWindow.img/RpsGame/Fscissor##l");
                } else {
                    cm.sendOk("�Բ���,��û��100W��Ϸ��!");
                    cm.dispose();
                }
            } else if (selection == 5) {
                typed = 5;
                var selStr = "����Ҫ��ս��Ķ������㹻ǿ����?����#e#r1��1#k#nPkϵͳ����Ա.�ҿ����ṩ���㵥����һ�������������ѽ���.��ô��?\r\n#e#bPs:(7-12)Ϊ1��1PK����#k#n";
                var pvproom = new Array("\r\n" + cm.getPvpRoom(map + 07, 07), cm.getPvpRoom(map + 08, 08) + "\r\n", cm.getPvpRoom(map + 09, 09), cm.getPvpRoom(map + 10, 10) + "\r\n", cm.getPvpRoom(map + 11, 11), cm.getPvpRoom(map + 12, 12));
                for (var i = 0; i < pvproom.length; i++) {
                    selStr += "" + pvproom[i] + "";
                }
                cm.sendSimple(selStr);
            }
        } else if (status == 2) {
            if (typed == 1) {
                if (selection == 0) {
                    playerchoice = "rock";
                } else if (selection == 1) {
                    playerchoice = "paper";
                } else if (selection == 2) {
                    playerchoice = "scissor";
                }
                var random = Math.floor(Math.random() * 4);
                if (random <= 1) {
                    compchoice = "rock";
                } else if (random <= 2) {
                    compchoice = "paper";
                } else if (random <= 4) {
                    compchoice = "scissor";
                }
                typed = 2;
                cm.sendNext("��εĽ����..."); //������Ը�
            } else if (typed == 44) {
                if (cm.haveItem(4000082, typesitemzqcost[selection]) == true) {
                    cm.gainItem(typeszq[selection], 1);
                    cm.gainItem(4000082, -typesitemzqcost[selection]);
                    cm.worldMessage("[�Ĳ�NPC]����ϲ~���:" + cm.getChar().getName() + "�ɹ�ʹ�ý���������һ���������~");
                    cm.sendOk("��ϲ�㣬��ȡ�ɹ�����ȥ�鿴һ�°�����.");
                    cm.dispose();
                } else {
                    cm.sendOk("�Բ�����û���㹻�Ľ���#v4000082#.");
                    cm.dispose();
                }
            } else if (typed == 45) {
                if (cm.haveItem(5200002, typesitemlbcost[selection]) == true) {
                    cm.gainItem(typeslb[selection], 3);
                    cm.gainItem(5200002, -typesitemlbcost[selection]);
                    cm.sendOk("��ϲ�㣬����ɹ�����ȥ�鿴һ�°�����.");
                    cm.dispose();
                } else {
                    cm.sendOk("�Բ�����û���㹻�Ľ����.");
                    cm.dispose();
                }
            } else if (typed == 101) {
                if (cm.haveItem(4001126, typesitemcost[selection]) == true) {
                    cm.gainItem(typesitem[selection], 1);
                    cm.gainItem(4001126, -typesitemcost[selection]);
                    cm.sendOk("��ϲ�㣬��ȡ�ɹ�����ȥ�鿴һ�°�����.");
                    cm.dispose();
                } else {
                    cm.sendOk("�Բ�����û���㹻�ķ�Ҷ.");
                    cm.dispose();
                }
            } else if (typed == 166) {
                cm.delRing(cm.getText());
            } else if (typed == 2) {
                fee = cm.getText();
                cm.sendYesNo("��ȷ��Ҫ��ע #r" + fee + "#k ð�ձ���?���ȼ������û����ô��ǮŶ!");
            } else if (typed == 5) {
                fee = cm.getText();
                if (fee < 0) {
                    cm.sendOk("�������������!");
                    cm.dispose();
                } else if (!cm.haveItem(4002002, fee * 2)) {
                    cm.sendOk("�һ�ʧ�ܣ���û��" + fee * 2 + "��ľ����Ʊ��");
                    cm.dispose();
                } else {
                    cm.gainItem(4002002, -fee * 2); //ľ����Ʊ
                    cm.gainItem(4031454, fee); //ʥ��
                    cm.sendOk("��ϲ���һ��ɹ���");
                    cm.dispose();
                }
            } else if (typed == 73) {
                typed = 74;
                cm.sendSimple("��ѡ����Ҫ�����Ľ�ָ���ͣ�\r\n #b#L0#��Ҷֿ�ѽ�ָ#l\r\n#L1#����ֿ�ѽ�ָ#l \r\n#L2#����ֿ�ѽ�ָ#l");
            } else if (typed == 27) {
                typed = 28;
                fee = cm.getText();
                fee1 = 10000000 * fee;
                cm.sendYesNo("��ȷ��Ҫ�һ� #r" + fee + "#k ��ľ����Ʊ��?\r\n����Ҫ������#r" + fee1 + "��Ϸ��");
            } else if (typed == 28) {
                typed = 29;
                fee = cm.getText();
                fee1 = 10000000 * fee;
                cm.sendYesNo("��ȷ��Ҫ�һ� #r" + fee1 + "#k ��Ϸ����?����Ҫ������#r" + fee + "ľ����Ʊ");
            } else if (typed == 29) {
                typed = 30;
                fee = cm.getText();
                fee1 = 200000 * fee;
                cm.sendYesNo("��ȷ��Ҫ�һ� #r" + fee1 + "#k ��Ϸ����?\r\n����Ҫ������#r" + fee + "��Ҷ");
            } else if (typed == 30) {
                typed = 31;
                fee = cm.getText();
                fee1 = 100000 * fee;
                cm.sendYesNo("��ȷ��Ҫ�һ� #r" + fee1 + "#k ��Ϸ����?\r\n����Ҫ������#r" + fee + "��ֺ");
            } else if (typed == 31) {
                typed = 32;
                fee = cm.getText();
                fee1 = 200 * fee;
                cm.sendYesNo("��ȷ��Ҫ�һ� #r" + fee + "#k ����������?\r\n����Ҫ������#r" + fee1 + "�г���Ϊ");
            } else if (typed == 26) {
                if (selection == 0) {
                    if (player.GetMoney() < 5000) {
                        cm.sendOk("��Ǹ��û��5000����޷���������\r\n������ֱ�ӵ����¼������Ĺ�����ˬ�ң�Ȼ����г�ֵ��ע���ֵʱ������������ߣ��ɹ��������ԱߵĴ�NPC������");
                        cm.dispose();
                    } else {
                        player.GainMoney(-5000);
                        cm.gainItem(4001129, 1);
                        cm.sendOk("��Ŷ������Ұ����Ǽ���ң���ϲ��ȡ�ɹ����۳�5000���.");
                        cm.dispose();
                    }
                } else if (selection == 3) {
                    if (cm.getMeso() >= 500000000) {
                        cm.sendOk("��ϲ��ϲ����ȡ�ɹ���");
                        cm.gainItem(4001129, 1);
                        cm.gainMeso(-500000000);
                        cm.dispose();
                    } else {
                        cm.sendNext("�Բ�����û��5E��Ϸ��");
                        cm.dispose();
                    }
                } else if (selection == 1) {
                    if (cm.haveItem(4000054, 30) == true) {
                        cm.sendOk("��ϲ��ϲ����ȡ�ɹ���");

                        cm.gainItem(4000054, -30);
                        cm.gainItem(4001129, 1);
                        cm.dispose();
                    } else {
                        typed = 230;
                        cm.sendNext("�Բ�����û���㹻�����˽�ֺ,����Ʒ��������#v4000054#.\r\n#r�����һ�����͵����˵�ͼ��ս����!");
                        //cm.dispose();
                    }
                } else if (selection == 2) {
                    cm.warp(211040800, 0);
                    cm.dispose();
                }


            }

        } else if (status == 3) {
            if (typed == 74) {
                if (selection == 0) {
                    if (cm.haveItem(5200002) == true) {
                        typed = 75;
                        cm.sendGetText("������Է������֣������򲻳��Է������֣���ô������Ҽ������Ȼ�������ִ��棬��ͰѶԺõ����ָ��ƺ��ˣ��ڵ����ﰴctrl+v��ճ������.\r\n#r���ѣ�����������ˣ�����Ǯ���ƣ���ȫ����.������Ѹ���");
                    } else {
                        cm.sendOk("�Բ�����û�н����.Ŀǰ��������Ҫһ��.");
                        cm.dispose();
                    }
                } else if (selection == 1) {
                    if (cm.haveItem(5200002) == true) {
                        typed = 76;
                        cm.sendGetText("������Է������֣������򲻳��Է������֣���ô������Ҽ������Ȼ�������ִ��棬��ͰѶԺõ����ָ��ƺ��ˣ��ڵ����ﰴctrl+v��ճ������.\r\n#r���ѣ�����������ˣ�����Ǯ���ƣ���ȫ����.������Ѹ���");
                    } else {
                        cm.sendOk("�Բ�����û�н����.Ŀǰ��������Ҫһ��.");
                        cm.dispose();
                    }
                } else if (selection == 2) {
                    if (cm.haveItem(5200002) == true) {
                        typed = 77;
                        cm.sendGetText("������Է������֣������򲻳��Է������֣���ô������Ҽ������Ȼ�������ִ��棬��ͰѶԺõ����ָ��ƺ��ˣ��ڵ����ﰴctrl+v��ճ������.\r\n#r���ѣ�����������ˣ�����Ǯ���ƣ���ȫ����.������Ѹ���");
                    } else {
                        cm.sendOk("�Բ�����û�н����.Ŀǰ��������Ҫһ��.");
                        cm.dispose();
                    }
                }
            } else if (typed == 28) {
                if (cm.getMeso() < fee1) {
                    cm.sendOk("��Ǹ����û�㹻��Ǯ��.");
                    cm.dispose();
                } else if (fee <= 0) {
                    cm.sendOk("������ó�������Ȼ���븺����һ��ȥ!");
                    cm.dispose();
                } else {
                    cm.gainMeso(-fee1);
                    cm.gainItem(4002002, fee);
                    cm.sendOk("�һ��ɹ�.");
                    cm.dispose();
                }
            } else if (typed == 29) {
                meso1 = cm.getChar().getMeso();
                if (fee <= 0 || fee > 210) {
                    cm.sendOk("������ó�������Ҫ����");
                    cm.dispose();
                } else if (cm.haveItem(4002002, fee) < true || (meso1 + fee1) > 2147483647) {
                    cm.sendOk("��Ǹ����û�㹻����ţ��Ʊ��\r\n������ı����Ѿ�װ������ô��Ǯ��");
                    cm.dispose();
                } else {
                    cm.gainMeso(+fee1);
                    cm.gainItem(4002002, -fee);
                    cm.sendOk("�һ��ɹ�.");
                    cm.dispose();
                }
            } else if (typed == 30) {
                meso1 = cm.getChar().getMeso();
                if (fee <= 0 || fee > 10500) {
                    cm.sendOk("������ó�������Ҫ����");
                    cm.dispose();
                } else if (cm.haveItem(4001126, fee) < true || (meso1 + fee1) > 2147483647) {
                    cm.sendOk("��Ǹ����û�㹻��#z4001126#��\r\n������ı����Ѿ�װ������ô��Ǯ��");
                    cm.dispose();
                } else {
                    cm.gainMeso(+fee1);
                    cm.gainItem(4001126, -fee);
                    cm.sendOk("�һ��ɹ�.");
                    cm.dispose();
                }
            } else if (typed == 31) {
                meso1 = cm.getChar().getMeso();
                if (fee <= 0 || fee > 21000) {
                    cm.sendOk("������ó�������Ҫ����");
                    cm.dispose();
                } else if (cm.haveItem(4000054, fee) < true || (meso1 + fee1) > 2147483647) {
                    cm.sendOk("��Ǹ����û�㹻��#z4000054#��\r\n������ı����Ѿ�װ������ô��Ǯ��");
                    cm.dispose();
                } else {
                    cm.gainMeso(+fee1);
                    cm.gainItem(4000054, -fee);
                    cm.sendOk("�һ��ɹ�.");
                    cm.dispose();
                }
            } else if (typed == 32) {
                meso1 = cm.getChar().getMeso();
                if (fee <= 0 || fee > 100) {
                    cm.sendOk("һ�����һ�100��");
                    cm.dispose();
                } else if (cm.getChar().getXw() > fee1 || cm.getSpace(2) > 1) {
                    cm.sendOk("��Ǹ����û�㹻���г���Ϊ\r\n������ı���û�ո�");
                    cm.dispose();
                } else {
                    cm.gainItem(2430692, +fee);
                    cm.getPlayer().setXw(cm.getPlayer().getXw() - fee1);
                    cm.sendOk("�һ��ɹ�.");
                    cm.dispose();
                }
            } else if (typed == 230) {
                cm.warp(211040800, 0);
                cm.dispose();
            } else if (typed == 2) {
                if (playerchoice == "rock" && compchoice == "rock") {
                    cm.sendOk(Frock + spacing + rock + draw);
                    drawmatch = true;
                    cm.gainMeso(-cost);
                } else if (playerchoice == "rock" && compchoice == "paper") {
                    cm.sendOk(Frock + spacing + paper + lose);
                    losematch = true;
                    cm.gainMeso(-cost);
                    cm.worldMessage("�����ֹ��桻����.������" + cm.getChar().getName() + "����ʯͷ���������ʧ���ˣ����һ��Ϊ������");
                } else if (playerchoice == "rock" && compchoice == "scissor") {
                    cm.sendOk(Frock + spacing + scissor + win);
                    winmatch = true;
                    cm.gainMeso(winmesos);
                    cm.worldMessage("�����ֹ��桻����ϲ" + cm.getChar().getName() + "����ʯͷ���������ʤ���ˣ�");
                    //cm.gainItem(items[Math.floor(Math.random() * items.length)],1);
                } else if (playerchoice == "paper" && compchoice == "rock") {
                    cm.sendOk(Fpaper + spacing + rock + win);
                    winmatch = true;
                    cm.gainMeso(winmesos);
                    //cm.gainItem(items[Math.floor(Math.random() * items.length)],1);
                    cm.worldMessage("�����ֹ��桻����ϲ" + cm.getChar().getName() + "����ʯͷ���������ʤ���ˣ�");
                } else if (playerchoice == "paper" && compchoice == "paper") {
                    cm.sendOk(Fpaper + spacing + paper + draw);
                    drawmatch = true;
                    cm.gainMeso(-cost);
                } else if (playerchoice == "paper" && compchoice == "scissor") {
                    cm.sendOk(Fpaper + spacing + scissor + lose);
                    losematch = true;
                    cm.gainMeso(-cost);
                    cm.worldMessage("�����ֹ��桻����.������" + cm.getChar().getName() + "����ʯͷ���������ʧ���ˣ����һ��Ϊ������");
                } else if (playerchoice == "scissor" && compchoice == "rock") {
                    cm.sendOk(Fscissor + spacing + rock + lose);
                    losematch = true;
                    cm.gainMeso(-cost);
                    cm.worldMessage("�����ֹ��桻����.������" + cm.getChar().getName() + "����ʯͷ���������ʧ���ˣ����һ��Ϊ������");
                } else if (playerchoice == "scissor" && compchoice == "paper") {
                    cm.sendOk(Fscissor + spacing + paper + win);
                    winmatch = true;
                    cm.gainMeso(winmesos);
                    cm.worldMessage("�����ֹ��桻����ϲ" + cm.getChar().getName() + "����ʯͷ���������ʤ���ˣ�");
                    //cm.gainItem(items[Math.floor(Math.random() * items.length)],1);
                } else if (playerchoice == "scissor" && compchoice == "scissor") {
                    cm.sendOk(Fscissor + spacing + scissor + draw);
                    drawmatch = true;
                    cm.gainMeso(-cost);
                } else {
                    cm.sendOk("������...");
                }

            } else {
                if (cm.getMeso() < fee) {
                    cm.sendOk("Ŷ�ǣ�������˼��û��ô��Ǯ�ˣ�ȥ׬��Ǯ�����ɣ���ɲ�����ѵ�!");
                    cm.dispose();
                } else if (cm.getMeso() >= 1050000000) {
                    cm.sendOk("�Բ���,��Ľ�Ҵ���10.5��,���Բ��ܲ��ڴ˴���ע!");
                    cm.dispose();
                } else if (cm.getText() < 0) {
                    cm.sendOk("������ó�������Ȼ���븺����һ��ȥ!");
                    cm.dispose();
                } else if (chance <= 1) {
                    cm.gainMeso(-fee);
                    cm.sendNext("Ŷ���������������ô��Ŷ�������� ����һ����!");
                    cm.worldMessage("���ĳ����桻����.������" + cm.getChar().getName() + "���ڶĳ�������⣬���һ��Ϊ�����ɣ�");
                    cm.dispose();
                }
                else if (chance == 2) {
                    cm.gainMeso(-fee);
                    cm.sendNext("Ŷ���������������ô��Ŷ�������� ����һ����!");
                    cm.worldMessage("���ĳ����桻����.������" + cm.getChar().getName() + "���ڶĳ�������⣬���һ��Ϊ�����ɣ�");
                    cm.dispose();
                }
                else if (chance == 3) {
                    cm.gainMeso(-fee);
                    cm.sendNext("Ŷ���������������ô��Ŷ�������� ����һ����!");
                    cm.worldMessage("���ĳ����桻����.������" + cm.getChar().getName() + "���ڶĳ�������⣬���һ��Ϊ�����ɣ�");
                    cm.dispose();
                }
                else if (chance >= 4) {
                    cm.gainMeso(fee * 1);
                    cm.sendNext("#r��������ϲ��#k! ��Ӯ��! ������������������һ�ѹ�!");
                    cm.worldMessage("���ĳ����桻����ϲ" + cm.getChar().getName() + "���ڶĳ�Ӯ�ô�����ң����һ��Ϊ��ף�ذɣ�");
                    cm.dispose();
                }
            }



        } else if (status == 4) {
            if (typed == 75) {
                cm.gainItem(5200002, -1);
                cm.makeRing(cm.getText(), 1112800);
                cm.sendOk("��ϲ�������ɹ�!");
                cm.dispose();
            } else if (typed == 76) {
                cm.gainItem(5200002, -1);
                cm.makeRing(cm.getText(), 1112801);
                cm.sendOk("��ϲ�������ɹ�!");
                cm.dispose();
            } else if (typed == 77) {
                cm.gainItem(5200002, -1);
                cm.makeRing(cm.getText(), 1112802);
                cm.sendOk("��ϲ�������ɹ�!");
                cm.dispose();
            } else {
                cm.dispose();
            }
        }

    }
}