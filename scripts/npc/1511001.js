/*
 *			���㳡������Ա
 *
 */


var mChar = function(client) {


    this.db = cm.getConnection();
    //��ȡ����
    this.getFishIntegral = function(player) {
        var ps = this.db.prepareStatement("SELECT dyjf FROM `characters` WHERE `id` = ?");
        ps.setInt(1, player.getId());
        var rs = ps.executeQuery();
        var key = 0;
        if (!rs.next())
            return false;
        key = rs.getInt(1);
        rs.close();
        ps.close();
        return (key == '' || key == null) ? 0 : key;
    }
    //���ӻ���
    this.updateFishIntegral = function(numbers, player) {
        if (this.getFishIntegral(player) == false) {
            //ԭ���޻���
            var ps = this.db.prepareStatement("UPDATE `characters` SET dyjf = ? WHERE `id` = ?");
            ps.setInt(1, 0);
            ps.setInt(2, player.getId());
            ps.executeUpdate();
            ps.close();
        }
        var ps = this.db.prepareStatement("UPDATE `characters` SET dyjf = ? WHERE `id` = ?");
        ps.setInt(1, numbers + this.getFishIntegral(player));
        ps.setInt(2, player.getId());
        ps.executeUpdate();
        ps.close();
        return;
    };
    this.get_Ranks = function(numbers, player) {
        var ps = this.db.prepareStatement("SELECT `name`,`dyjf`  FROM characters ORDER BY dyjf DESC LIMIT 0,20");
        var rs = ps.executeQuery();
        var result = "�������а�ǰ #r#e" + numbers + " #n#k �����:\r\n\r\n";
        var i = 1;
        while (rs.next() && i <= numbers) {
            result += "#b�� " + i + " ����" + rs.getString(1) + "\t\t\t���֣�" + rs.getString(2) + ".";
            result += "\r\n";
            i++;
        }
        if (!i) {
            result += "\r\n#b��Ǹ����ʱ���������.";
        }
        rs.close();
        ps.close();
        return result;
    };
    //debug
    this.debug = function(str) {
        org.slf4j.LoggerFactory.getLogger(this).info(str);
    };
};

//importPackage(net.sf.odinms.server);
//importPackage(java.util);
//importPackage(net.sf.odinms.client);
var status;
var price1 = 1 * 80000; //����۸� (ð�ձ�)
var price2 = 80; //�߼�����۸� (���)
var price_st = -1;
var choose = -1;
var chooses = -1;
var str_name = '';
var num = -1;
var db;
var player;
var str = 0
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
var icon = "#fUI/Basic.img/BtMin2/normal/0#";
var iconX = "#fEffect/CharacterEff/1112905/0/1#";
var iconStar = "#fEffect/CharacterEff/1112904/2/1#";
var icon1 = "#fEffect/CharacterEff/1042176/0/0#";
var iconHR = "#fEffect/CharacterEff/1082565/0/0#"
var icon2 = "#fEffect/CharacterEff/1082565/2/0#";
var icon3 = "#fEffect/CharacterEff/1082565/4/0#";
var icon4 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";
var icon5 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aaa = "#fUI/UIWindow/AriantMatch/characterIcon/5#";
var yun = "#fUI/UIWindow/Megaphone/2#";////��ɳ©
var yun2 = "#fUI/UIWindow/Quest/icon8/0#";////��ָ��
var yun8 = "#fUI/UIWindow/MonsterBook/arrowLeft/normal/0#";////����ָ��
var yun9 = "#fUI/UIWindow/MonsterBook/arrowRight/normal/0#";////����ָ��
var yun4 = "#fUI/UIWindow/Quest/reward#";////����
var ttt = "#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 = "#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 = "#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 = "#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 = "#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 = "#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //�ʹ�
var eff = "#fCharacter/Weapon/01702523.img/48/straight/0/effect#"; //�ʺ��
var eff1 = "#fEffect/CharacterEff/1112905/0/1#"; //
var epp = "#fEffect/CharacterEff/1082312/0/0#";  //�ʹ�
var epp1 = "#fEffect/CharacterEff/1082312/2/0#"; //�ʹ�1
var axx = "#fEffect/CharacterEff/1051294/0/0#";  //����
var xxx = "#fEffect/CharacterEff/1082565/2/0#"; //��ϵ
var ppp = "#fEffect/CharacterEff/1112907/4/0#"; //���� 
var epp3 = "#fEffect/CharacterEff/1112908/0/1#";  //�ʹ�3
var axx1 = "#fEffect/CharacterEff/1062114/1/0#";  //����
var zs = "#fEffect/CharacterEff/1112946/2/0#";  //שʯ��
var zs1 = "#fEffect/CharacterEff/1112946/1/1#";  //שʯ��
var dxxx = "#fEffect/CharacterEff/1102232/2/0#"; //��ϵ
var tz = "#fEffect/CharacterEff/1082565/2/0#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz88 = "#fEffect/CharacterEff/1112900/5/1#";  //������!
var yun1 = "#fUI/UIWindow/Quest/icon7/10#";////��ɫԲ
var tz9 = "#fEffect/CharacterEff/1112902/0/0#";  //����
var tz10 = "#fEffect/CharacterEff/1112903/0/0#";  //����
var tz11 = "#fEffect/CharacterEff/1112904/0/0#";  //����
var tz12 = "#fEffect/CharacterEff/1112924/0/0#";  //����
var tz13 = "#fEffect/CharacterEff/1112925/0/0#";  //����
var tz14 = "#fEffect/CharacterEff/1112926/0/0#";  //����
var tz15 = "#fEffect/CharacterEff/1112949/0/0#";  //��������
var tz16 = "#fEffect/CharacterEff/1112949/1/0#";  //��������
var tz17 = "#fEffect/CharacterEff/1112949/2/0#";  //��������
var tz18 = "#fEffect/CharacterEff/1112949/3/0#";  //��������
var tz19 = "#fEffect/CharacterEff/1112949/4/0#";  //��������
var tz20 = "#fEffect/CharacterEff/1114000/1/0#";  //���ǻ�
function start() {
    status = -1;
    db = new mChar(cm.getC());
    action(1, 0, 0);
}

function action(mode, type, selection) {
    player = cm.getPlayer();
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status >= 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
    }
    if (status == 0) {
       // var str ="#d" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "#k\r\n";

		var 	str = "\t�ܸ����������ǵĵ��㳡����������Ҫʲô����\r\n";
		//str +="#d" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "#k\r\n";
	str += "#r  ��ܰ��ʾ��������������֮�������г��Ϳ��Ե���#k\r\n";

        str += "#L6# " + tz11 + " #b�����ܻ��ʲô��   #l\r\n";
	//str += "#L22# " + tz11 + " #b������ר������#l\r\n";
        str += "#L21# " + tz11 + " #b���������뽱��#l\r\n";

        str += "#L3# " + tz11 + " #bС��һ�����\r\n";
	str += "#L16# " + tz11 + " #b���ֶһ�����\n\r\n";

        str += "#L1# " + tz11 + " #b������ͨ���#r(ÿ��==8W���)#l\r\n";
        str += "#L2# " + tz11 + " #b����߼����#r(ÿ��==60���þ�)#l\r\n";
        str += "#L0# " + tz11 + " #b������ͨ����#r(1��==8ǧ����/60��ÿ��)#l \r\n";
        str += "#L14# " + tz11 + " #b����߼����#r(1��==5���Ǳ�/30��ÿ��)#l\r\n";
	str += "#L9# " + tz11 + " #b������ͨ����#r(����=120���Ǳ�/60��ÿ��#l\r\n";
        str += "#L15# " + tz11 + " #b����߼����#r(����==280���Ǳ�/30��ÿ��)#l\r\n";


        //str += "#L7#" + tz11 + "ÿ�ܵ������а��������#b";
        //str += "\t\r\n";

        //str += "#L9#������ͨ���� ��60��ÿ�Σ�  #l\r\n";
        //str += "#L15#����߼���� ��30��/ÿ�Σ�  #l\r\n";
        if (cm.getChar().getMapId() == 741000201) {
            //	str += "#L10#����˫�����ʿ�(1��_1W���)#l\r\n";
            //	str += "#L11#����˫�����ʿ�(����_20W���)#l\r\n";
        }
        if (cm.getChar().getMapId() == 741000202) {
            //	str += "#L12#����˫������Ƶ��Ʊ(1��_1W���)#l\r\n";
            //	str += "#L13#����˫������Ƶ��Ʊ(����_20W���)#l\r\n";
            //	str += "#L14#����߼����(1��==10W���)#l\r\n";
           // 	str += "#L15#����߼����(����==300Ԫ�ֽ�)#l\r\n";
        }

        // str += "#L7#ÿ�µ������а��������#b";
        //str += "#L4##b���α�����������#b#l\r\n";
        // str += "#L888##r������ȡ�ϸ��µ��㽱��#b#l\r\n";
        //str += "#L5#�˳����㳡#l\r\n";
	//str +="\r\n#d" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "" + tz7 + "" + tz11 + "#k\r\n";

        cm.sendSimple(str);
    } else if (status == 1) {
        choose = selection;
        if (selection == 0) { //�����
            cm.sendYesNo("����͵������� #v5340000# ,ʹ�õ���ͣ������ڵ��㳡�������г������Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n������60�룬����ɹ�����60%������������޹ء�\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 8ǧ����/��/1��;");
        }
        if (selection == 9) { //�����
            cm.sendYesNo("����͵������� #v5340000# ,ʹ�õ���ͣ������ڵ��㳡�������г������Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n������60�룬����ɹ�����60%������������޹ء�\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 120���Ǳ�/��/����;");
        }
        if (selection == 10) { //��˫�����ʿ�
            cm.sendYesNo("˫�����ʿ��������� #v5360015# ,ʹ��˫�����ʿ��������ڸ߼����㳡�����Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 1W���/��/1��;");
        }
        if (selection == 11) { //��˫�����ʿ�
            cm.sendYesNo("˫�����ʿ��������� #v5360015# ,ʹ��˫�����ʿ��������ڸ߼����㳡�����Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 20W���/��/����;");
        }
        if (selection == 12) { //��˫������Ƶ��Ʊ
            cm.sendYesNo("˫������Ƶ��Ʊ�������� #v4110002# ,ʹ��˫������Ƶ��Ʊ�������ڼ��ٵ��㳡�����Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 1W���/��/1��;");
        }
        if (selection == 13) { //��˫������Ƶ��Ʊ
            cm.sendYesNo("˫������Ƶ��Ʊ�������� #v4110002# ,ʹ��˫������Ƶ��Ʊ�������ڼ��ٵ��㳡�����Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 20W���/��/����;");
        }
        if (selection == 14) { //��߼����
            cm.sendYesNo("�߼���͵������� #v5340001# ,ʹ�ø߼���ͣ������ڼ��ٵ��㳡��������г��������Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n������30�룬����ɹ�����80%������������޹ء�\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 5���Ǳ�/��/1��;");
        }
        if (selection == 15) { //��߼����
            cm.sendYesNo("�߼���͵������� #v5340001# ,ʹ�ø߼���ͣ������ڼ��ٵ��㳡��������г������Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n������30�룬����ɹ�����80%������������޹ء�\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 280���Ǳ�/��/����;");
        }
        if (selection == 1) {
            cm.sendGetText("����������� #v2300000# ,ÿ #b" + price1 + "/���1��#k,\r\n�ɵ���80-140��װ��Ŷ\r\nGM��ʾ��������๺��500�����๻�������и���\r\n\r\n����Ҫ(#b����������#k):");
        }
        if (selection == 2) {
            cm.sendGetText("�߼������������ #v2300001# ,������Ե���������Դ���������ջ���.\r\n �ɵ���80-160��װ������������װ��Ŷ\r\nÿ " + price2 + "���þ�/1��.\r\nGM��ʾ��������๺��500�����๻�������и���\r\n\r\n,����Ҫ(#b����������#k):");
        }
        if (selection == 3) {
            cm.sendNext("�ò����ǽ����е������㻻�ɻ���,�Ƿ������");
        }
        if (selection == 4) { //����
            cm.sendOkS(db.get_Ranks(20, player), 2);
            cm.dispose();
        }
        if (selection == 5) {
            cm.sendNext("���Ҫ�˳����㳡��");
        }
        if (selection == 6) {
            cm.sendNext("������Ի�õĶ�����1-150ȫ���Լ�Ʒװ��������ϡ�����ӡ����ֱسɾ��ᡢ������ߡ�������ħ��������ħ�����߼�ħ�����������ᡢ�������Ӵ�������ö���ȫ������.");
            cm.dispose();
        }
        if (selection == 7) {
            cm.sendNext("#e����������#nÿ�½��е�������������ǰ20�����������´���Ŷ��\r\n#r[ע�⣺ÿ�µ׽����������ͳ��,ÿ��1��ͳ�Ʒ���]\r\n#b��1��������8W�㽶�ҡ�8888��Ϊ�㡢520����ֵ��6�������������ӡ�3���������Ӵ���\r\n\r\n��2��-4��������5W�㽶�ҡ�5888��Ϊ�㡢333����ֵ��4�������������ӡ�2���������Ӵ���\r\n\r\n��5��-10��������3W�㽶�ҡ�3888��Ϊ�㡢222����ֵ��2�������������ӡ�1���������Ӵ���\r\n\r\n");
            cm.dispose();
        }
        if (selection == 888) {
            cm.dispose();
            cm.openNpc(9330110, 1);
        }
        if (selection == 16) {
            cm.dispose();
            cm.openNpc(9330110, 2);
        }
        if (selection == 8) {
            cm.dispose();
            cm.openNpc(9330110);
        }
        if (selection == 21) {
            cm.dispose();
            cm.openNpc(1511001, 1);
        }
        if (selection == 22) {
            cm.dispose();
            cm.openNpc(1511001, 2);
        }
    } else if (status == 2) {
        if (choose == 0) {//��ͨ��� 1��
            if (cm.getMeso() >= 80000000 && cm.canHold(5340000)) {
                cm.gainMeso(-80000000);
                cm.gainItem(5340000, 1, 1);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("ð�ձҲ���.");
            }
            cm.dispose();
        }
        if (choose == 9) {//��ͨ��� ����
            if (cm.getRMB() >= 800000 && cm.canHold(5340000)) {
                cm.gainItem(5340000, 1);
		cm.gainRMB(-800000);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("���ǱҲ���.���ֵ����������");
            }
            cm.dispose();
        }
        if (choose == 10) {//˫�����ʿ� 1��
            if (cm.getHyPay(1) >= 10000 && cm.canHold(5360015)) {
                cm.addHyPay(10000, true);
                cm.gainItem(5360015, 1, 1);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("��Ľ�Ҳ���1W.");
            }
            cm.dispose();
        }
        if (choose == 11) {//˫�����ʿ� ����
            if (cm.getHyPay(1) >= 200000 && cm.canHold(5360015)) {
                cm.addHyPay(200000, true);
                cm.gainItem(5360015, 1);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("��Ľ�Ҳ���20W.");
            }
            cm.dispose();
        }
        if (choose == 12) {//˫������Ƶ��Ʊ 1��
            if (cm.getHyPay(1) >= 10000 && cm.canHold(4110002)) {
                cm.addHyPay(10000, true);
                cm.gainItem(4110002, 1, 1);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("��Ľ�Ҳ���1W.");
            }
            cm.dispose();
        }
        if (choose == 13) {//˫������Ƶ��Ʊ ����
            if (cm.getHyPay(1) > 200000 && cm.canHold(4110002)) {
                cm.addHyPay(200000, true);
                cm.gainItem(4110002, 1);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("��Ľ�Ҳ���20W.");
            }
            cm.dispose();
        }
        if (choose == 14) {//�߼���� 1��
		if (cm.getRMB() > 50000 && cm.canHold(5340001)) {
           //if (cm.getNX(1) > 100000 && cm.canHold(5340001)) {
               // cm.getPlayer().modifyCSPoints(1, 100000, true);
		//cm.gainNX(1, -1000000);
		cm.gainRMB(-50000);
		//cm.gainItem(5340001, 1, 10);
                cm.gainItem(5340001, 1, 1);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("����ǱҲ���5�����ֵ����������.");
            }
            cm.dispose();
        }
        if (choose == 15) {//�߼���� ����
            if (cm.getRMB() > 2800000 && cm.canHold(5340001)) {
                //cm.getPlayer().modifyCSPoints(1, 1000000, true);

                cm.gainItem(5340001, 1);
		cm.gainRMB(-2800000);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("����ǱҲ���280�����ֵ����������.");
            }
            cm.dispose();
        }
        if (choose == 1) {
            num = parseInt(cm.getText());
            if (num < 0 || isNaN(num)) {
                cm.sendOk("����Ƿ�.");
                cm.dispose();
            }
            cm.sendYesNo("���� #b" + num + " #k�� �����Ҫ��#b" + (num * price1) + " ð�ձ�.��");
        }
        if (choose == 2) {
            num = parseInt(cm.getText());
            if (num < 0 || isNaN(num)) {
                cm.sendOk("����Ƿ�.");
                cm.dispose();
            }
            cm.sendYesNo("���� #b" + num + " #k�� �߼������Ҫ��#b" + (num * price2) + " ���.��");
        }
        if (choose == 3) {
            price_st = calculate();
            if (price_st) {

                cm.sendYesNo("�������£�\r\n" + calculate_text() + "\r\n\r\n#k���ƣ�#b " + price_st + "#k ����,�Ƿ�һ�?");
            } else {
                cm.sendOk("�㻹û��һ���Ʒ�.");
                cm.dispose();
            }
        }
        if (choose == 5) {
            cm.warp(910000000, 0);
            cm.dispose();
        }
    } else if (status == 3) {
        if (choose == 1) {
            if (cm.getMeso() >= num * price1 && cm.canHold(2300000)) {
                cm.gainMeso(-num * price1);
                cm.gainItem(2300000, num);
                cm.sendOk("����ɹ�.");
                cm.dispose();
            } else {
                cm.sendOk("ð�ձҲ���򱳰��ռ䲻��.");
                cm.dispose();
            }
        }
        if (choose == 2) {
            if (cm.getPlayer().getCSPoints(1) >= num * price2 && cm.canHold(2300001)) {
                cm.gainNX(2, -num * price2);
                cm.gainItem(2300001, num);
                cm.sendOk("����ɹ�.");
                cm.dispose();
            } else {
                cm.sendOk("���þ���򱳰��ռ䲻��.");
                cm.dispose();
            }
        }
        if (choose == 3) {
            db.updateFishIntegral(price_st, player);
            calculate_del();
            cm.sendOk("�ɹ����ӻ���.");
            cm.dispose();
        }
    }
}

var fish = [
//�ܵ��������㣬�۸�
    [4031627, 1], [4031628, 1], [4031630, 1], [4031631, 1], [4031633, 1], [4031634, 1], [4031635, 1], [4031636, 1], [4031637, 1], [4031638, 1], [4031639, 1], [4031640, 1], [4031641, 1], [4031642, 2], [4031643, 2], [4031644, 2], [4031645, 2], [4031646, 2], [4031647, 2], [4031648, 2]];

function calculate_text() {
    var str = '';
    for (var i = 0; i < fish.length; i++) {
        if (cm.itemQuantity(fish[i][0])) {
            str += "\t#b>>#z" + fish[i][0] + "# x " + cm.itemQuantity(fish[i][0]) + ",��ȡ��" + cm.itemQuantity(fish[i][0]) * fish[i][1] + " ����.\r\n";
        }
    }
    return (str == '') ? "��ʱ��." : str;
}
function calculate_del() {
    for (var i = 0; i < fish.length; i++) {
        cm.gainItem(fish[i][0], -cm.itemQuantity(fish[i][0]));
    }
    return true;
}
function calculate() {
    var count = 0;

    for (var i = 0; i < fish.length; i++) {
        count += cm.itemQuantity(fish[i][0]) * fish[i][1];
    }
    return count;
}
