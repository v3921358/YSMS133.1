/*
 *			���㳡������Ա
 *
 */

var mChar = function(client) {

    this.db = Packages.database.DatabaseConnection.getConnection();
    //��ȡ����
    this.getFishIntegral = function(player) {
        var ps = this.db.prepareStatement("SELECT dyjf FROM `characters` WHERE `id` = ?");
        ps.setInt(1, player.getId());
        var rs = ps.executeQuery();
        var key = 0;
        if (!rs.next()) return false;
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
        var ps = this.db.prepareStatement("SELECT `name`,`dyjf`  FROM characters ORDER BY dyjf DESC LIMIT 0,30");
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

importPackage(net.sf.odinms.server);
importPackage(java.util);
importPackage(net.sf.odinms.client);
var status;
var price1 = 1 * 888888; //����۸� (ð�ձ�)
var price2 = 1; //�߼�����۸� (Ԫ��)
var price_st = -1;
var choose = -1;
var chooses = -1;
var str_name = '';
var num = -1;
var db;
var player;
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
        if (mode == 1) status++;
        else status--;
    }
    if (status == 0) {
        var str = "�ܸ����������ǵĵ��㳡����������Ҫʲô����\r\n#b(��ǰ�������: " + db.getFishIntegral(player) + " )#k\r\n";
        str += "#r#L6#�����ܻ��ʲô��#b#l\r\n";
        str += "#L0#�������#l\r\n";
        str += "#L1#�������#l\r\n";
        str += "#L2#�������#r���߼����5�����ʻ�úö�������#b#l\r\n";
        str += "#L3#ʹ�ø�����һ��ɻ���#b#L8#ʹ��#r#z2431690##b�һ�ϡ����Ʒ#b\r\n";
        str += "#L7#ÿ�µ������а��������#b";
        str += "#L4##b���α�����������#b#l\r\n";
        //str += "#L5#�˳����㳡#l\r\n";
        cm.sendSimple(str);
    } else if (status == 1) {
        choose = selection;
        if (selection == 0) {//�����
            cm.sendYesNo("����͵������� #v5340001# ,ʹ�õ���ͣ������ڵ��㳡�����Ŷ����Ȼ�����Ҳ�Ǳ�Ҫ�ģ�\r\n\r\n\r\n���Ƿ���Ҫ��\r\n\r\n�۸�#b 1E/��/��;");
        }
        if (selection == 1) {
            cm.sendGetText("����������� #v2300000# ,ÿ #b" + price1 + "/1��#k,����Ҫ(#b����������#k):");
        }
        if (selection == 2) {
            cm.sendGetText("�߼������������ #v2300001# ,������Ե���������Դ���������ջ���.\r\n ÿ " + price2 + "�ʺ��/1��.\r\n,����Ҫ(#b����������#k):");
        }
        if (selection == 3) {
            cm.sendNext("�ò����ǽ����е������㻻�ɻ���,�Ƿ������");
        }
        if (selection == 4) { //����
            cm.sendOkS(db.get_Ranks(30, player),2);
            cm.dispose();
        }
        if (selection == 5) {
            cm.sendNext("���Ҫ�˳����㳡��");
        }
        if (selection == 6) {
            cm.sendNext("������Ի�õĶ�����100-160��װ��������ϡ�����ӡ����ֱسɾ��ᡢ������ߡ�����ħ�����߼�ħ�����������ᡢ����ö���ȫ������.");
            cm.dispose();
        }
        if (selection == 7) {
            cm.sendNext("#e����������#nÿ�½��е�������������ǰ10�����������´���Ŷ��\r\n#r[ע�⣺ÿ�µ׽����������ͳ��,ÿ��1��ͳ�Ʒ���]\r\n#b��1��������100�ֽ�㡢180����ֵ��\r\n\r\n��2��-4��������50�ֽ�㡢88����ֵ��\r\n\r\n��5��-10��������20�ֽ�㡢58����ֵ��\r\n\r\n");
            cm.dispose();
        }
        if (selection == 8) {
            cm.dispose();
            cm.openNpc(9330110);
        }
    } else if (status == 2) {
        if (choose == 0) {
            if (cm.getMeso() >= 100000000 && cm.canHold(5340001)) {
                cm.gainMeso( - 100000000);
                cm.gainItem(5340001,1,1);
                cm.sendOk("�ɹ�����.");
            } else {
                cm.sendOk("ð�ձҲ���.");
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
            cm.sendYesNo("���� #b" + num + " #k�� �߼������Ҫ��#b" + (num * price2) + " �ʺ��.��");
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
                cm.gainMeso( - num * price1);
                cm.gainItem(2300000, num);
                cm.sendOk("����ɹ�.");
                cm.dispose();
            } else {
                cm.sendOk("ð�ձҲ���򱳰��ռ䲻��.");
                cm.dispose();
            }
        }
        if (choose == 2) {
            if (cm.getChar().getHyPay(1) >= num * price2 && cm.canHold(2300001)) {
                cm.addHyPay(num * price2,true);
                cm.gainItem(2300001, num);
                cm.sendOk("����ɹ�.");
                cm.dispose();
            } else {
                cm.sendOk("�ʺ�Ҳ���򱳰��ռ䲻��.");
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
    return (str == '') ? "��ʱ��.": str;
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