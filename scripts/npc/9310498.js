importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var time = new Date();
var hour = time.getHours(); //���Сʱ
var minute = time.getMinutes(); //��÷���
var second = time.getSeconds(); //�����
var Year = time.getFullYear();
var month = time.getMonth() + 1; //��ȡ��ǰ�·�(0-11,0����1��)
var dates = time.getDate(); //��ȡ��ǰ��(1-31)
var status = -1;
var rand = 0;
var InsertData = false;
var nx = false;
var nxx = false;
var RMB = 0;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        var RankDataBase = cm.getConnection().prepareStatement("SELECT * FROM Activity0512 ORDER BY id desc LIMIT 5").executeQuery();
        var text = ""
        var i = 1;
        text += "#d#e���³��д���Ϣ��#k#n#r(2���Ǳҳ�1��,ÿ��һ�η�#r500���)#k\r\n\r\n-----------------------------------------------\r\n"
        while (RankDataBase.next()) {
            text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# #r" + RankDataBase.getString("charName") + "#k �� #b" + RankDataBase.getString("time") + "#k ���� #r" + RankDataBase.getString("itemid") + "#k"
            text += "\r\n"
            i++;
        }
        text += "-----------------------------------------------\r\n#L0##b���Ǳҳ齱��#l  #L1##d����Ʒչ����#l #L2##r�������콱��#l#k \r\n\r\n \r\n"//�ɳ� #r" + parseInt(cm.getRMB() / needprice) + " #b�Ρ�#l
        cm.sendSimple(text);

    } else if (status == 1) {
        if (selection == 0) {
				var needprice = 20000;
				//var ii = cm.getItemInfo();
            if (cm.getRMB() >= needprice) {
                var item;
                var itemListAdcanced = Array(
                        3010853, //�Ļ�ŭ������
                        3015130, //����Ӥ���Ƴ�
                        3015131, //�޴����������
                        3015132, //������ɳ����
                        3015108, //ӣ����������
						3015075, //����Ȼ����
						3016000, //�������ΰ�����
                        3015089, //ѵ��ʦͥԺ����
                        3015135, //������������
                        3015015, //����������
                        3015016, //��ţ������
                        3015017, //˫��������
                        3015018, //˫��������
                        3015019, //��з������
                        3015020, //ʨ��������
                        3015021, //���������
                        3015022, //��Ы������
                        3015023, //��Ů������
                        3015024, //����������
                        3015025, //ɽ��������
                        3015026, //ˮƿ������
                        3015027, //������ī������
                        3015096, //���������������
                        3012027, //��������������
                       // 3015051, //���ްԹ��ʾ���
                        //3015002, //�߲�Ħ����
                        3010832, //̫������
                        1102481, //�������Ǵ�˹���� - (������)
			1202083, //�桤����ͼ�� - (������)
                        1102482, //�����ն�÷˹���� - (������)
			1202084, //������ͼ�� - (������)
                        1102483, //������������ - (������)
			1202085, //��������ͼ�� - (������)
                        1102484, //�������������� - (������)
			1202086, //ͭ������ͼ�� - (������)
                        1102485, //��������̩���� - (������)
			1190300, //������Ҷ����
                       // 1082543, //�������Ǵ�˹���� - (������)
			1190301, //��ɫ��Ҷ���� - (������)
                       // 1082544, //�����ն�÷˹���� - (������)
			1190302, //ˮ����Ҷ���� - (������)
                       // 1082545, //������������ - (������)
			1182021, //ð�յ�ѧУͭ���� - (������)
                       // 1082546, //�������������� - (������)
			1182022, //ð�յ�ѧУ������ - (������)
                      //  1082547, //��������̩���� - (������)
			1182023, //ð�յ�ѧУ����� - (������)
                       // 1072743, //�������Ǵ�˹ѥ - (������)
			1182019, //�²ʺ���� - �̺��Ųʺ�����������Ļ��¡�
                        //1072744, //�����ն�÷˹ѥ - (������)
                       // 1072745, //��������ѥ - (������)
                        //1072746, //����������ѥ - (������)
                        //1072747, //��������̩ѥ - (������)
                        //1132174, //�������Ǵ�˹���� - (������)
                        //1132175, //�����ն�÷˹���� - (������)
                        //1132176, //������������ - (������)
                        //1132177, //�������������� - (������)
                        //1132178, //��������̩���� - (������)
                       // 1142742, //ð�յ�����
                        1112793, //����ָ��
                        //2431938, //������������
                        1122122, //�桤����ð��֮��
                        1122123, //�桤����ð��֮��
                        1122124, //�桤����ð��֮��
                        1122125, //�桤����ð��֮��
                        1122126, //�桤����ð��֮��
                        1122266, //�߼����յ¿�ӡ��׹
                       // 1122267, //��߼����յ¿�ӡ��׹
                        1113074, //�߼����յ½�ָ
                       // 1113075, //��߼����յ½�ָ 
                        1132245, //�߼����յ¿�ӡ���� 
                      //  1132246, //��߼����յ¿�ӡ����
                        1032222 //�߼����յ¶���           
                       // 1032223, //��߼����յ¶���
                      //  1032219//����֮�񻰶���
                        );
                var itemListNormal = new Array(
                        5062000,
                        5062002,
			5062009,
                        5064000,
                        2049704,
			5062009,
			2049119,
			2431762,
                        2040057,
			5062009,
			2049116,
			2047978,
			5062009,
                        2040058,
                        2040059,
			5062009,
			4034151,
			5062009,
			4001006,
			5062009,
			5062009,
			5062009,
			2340000,
			4001839,
			5062009,
			2046856,
			2046863,
			5062009,
			2049131,
			5062009,
			5062009,
			2431762,
			2046870,
			5062009,
			2049100,
			2049116,
			5062009,
                        2040060,
			5062009,
			2049168,
			5062009,
                        2040061,
			5062009,
                        2040062,
                        4310088,
                        4310036,
			5062009,
                        5072000,
			5062009,
                        5073000,
			5062009,
                        5074000,
			5062009,
                        5076000,
			5062009,
                        5390000,
			5062009,
                        5390001,
			5062009,
                        5390002,
			5062009,
                        5390002,
                        5390003,
			5062009,
                        5390005,
                        5390006,
                        5150040
                        );
                var xxx = Math.floor(Math.random() * 300);
                if (xxx == 10) {//100��֮1�ļ���=1
                    rand = Math.floor(Math.random() * itemListAdcanced.length);
                    item = cm.gainGachaponItem(itemListAdcanced[rand], 1, " ����ת�� ");
                    InsertData = true;
                } else if (xxx == 100) {//��ȯ
                    cm.gainNX(1, 100000);
                    InsertData = true;
                    nx = true;
                } else if (xxx == 199) {//����ȯ
                    cm.gainNX(2, 100000);
                    InsertData = true;
                    nxx = true;
                } else {
                    rand = Math.floor(Math.random() * itemListNormal.length);
                    item = itemListNormal[rand];
                    cm.gainItem(item, 1); //ֱ�Ӹ�����Ʒ �����档
                }
                if (item == -1) {
                    cm.sendOk("�Բ�����ı����Ѿ����ˡ�");
                    cm.dispose();
                } else {
					cm.gainRMB(-needprice);
                    //cm.addHyPay(1);
		    cm.gainNX(1, 500);
		    cm.setBossLog("�������ǳ齱");
		    cm.setBossLog("�ۼ����ǳ齱", 1);
                    if (nx) {
                        var insert = cm.getConnection().prepareStatement("INSERT INTO Activity0512 (id,itemid,charid,charName,time) VALUES(?,?,?,?,?)"); // ��������
                        insert.setString(1, null); //�����¼ID
                        insert.setString(2, "100,000 ��ȯ"); //�����¼ID
                        insert.setString(3, cm.getPlayer().getId());
                        insert.setString(4, cm.getPlayer().getName());
                        insert.setString(5, Year + "-" + month + "-" + dates + "");
                        insert.executeUpdate(); //����
                        cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " ����������� 100,000 ��ȯ��", 5120012);
                        cm.worldSpouseMessage(0x23,  "���ռ��󽱡� :  ��ϲ" + cm.getChar().getName() + ",����������� 100,000 ��ȯ��");
                        cm.sendOk("��ϲ�������˳齱�л���� #b100,000 ����ȯ#k.");
                        cm.safeDispose();
                    } else if (nxx) {
                        var insert = cm.getConnection().prepareStatement("INSERT INTO Activity0512 (id,itemid,charid,charName,time) VALUES(?,?,?,?,?)"); // ��������
                        insert.setString(1, null); //�����¼ID
                        insert.setString(2, "100,000 ���þ�"); //�����¼ID
                        insert.setString(3, cm.getPlayer().getId());
                        insert.setString(4, cm.getPlayer().getName());
                        insert.setString(5, Year + "-" + month + "-" + dates + "");
                        insert.executeUpdate(); //����
                        cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " ����������� 100,000 ���þ�", 5120012);
                        cm.worldSpouseMessage(0x23, "���ռ��󽱡� :  ��ϲ" + cm.getChar().getName() + ",�����������100,000 ����ȯ��");
                        cm.sendOk("��ϲ�������˳齱�л���� #b100,000 ������ȯ#k.");
                        cm.safeDispose();
                    } else {
                        if (InsertData) {
                            var insert = cm.getConnection().prepareStatement("INSERT INTO Activity0512 (id,itemid,charid,charName,time) VALUES(?,?,?,?,?)"); // ��������
                            insert.setString(1, null); //�����¼ID
                            insert.setString(2, "#t" + item + "#"); //�����¼ID
                            insert.setString(3, cm.getPlayer().getId());
                            insert.setString(4, cm.getPlayer().getName());
                            insert.setString(5, Year + "-" + month + "-" + dates + "");
                            insert.executeUpdate(); //����
							cm.getMap().startMapEffect("��ϲ��� " + cm.getChar().getName() + " ������������ռ��� " + ii.getName(item) + "��", 5120012);
                        }
                        cm.sendOk("��ϲ�����л���� #b#t" + item + "##k.������ #r500#k ���");
                        cm.safeDispose();
                    }

                }
            } else {
                cm.sendOk("��û�� 2���Ǳң��Ǳ����ֵ��á�");//��ʱ�رա�������Ʒ�С�
                cm.safeDispose();
            }
        } else if (selection == 1) {
            cm.sendOk("#b�ռ���ͼƬ���ͣ����ҳ��к��������ҳ���Ϲ�����\r\n���Գ��� #r���100,000   ���þ�100,000#k #b�Լ����У�#k\r\n#i3010853##i3015130##i3015131##i3015132##i3015108##i3015089##i3015135##i3015015##i3015016##i3015017##i3015018##i3015019##i3015020##i3015021##i3015022##i3015023##i3015024##i3015025##i3015026##i3015027##i3015096##i3012027##i3015051##i3015002##i3010832##i1102481##i1102482##i1102483##i1102484##i1102485##i1082543##i1082544##i1082545##i1082546##i1082547##i1072743##i1072744##i1072745##i1072746##i1072747##i1132174##i1132175##i1132176##i1132177##i1132178##i1142742##i1112793##i2431938##i1032219#");
            cm.dispose();
        } else if (selection == 2) {
			//cm.sendOk("��ʱ��������޸����š������֪ͨ��")
            cm.dispose();
			cm.openNpc(9310498, 1);
        }
    }
}