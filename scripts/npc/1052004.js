/* Denma the Owner
	Henesys VIP Eye Change.
*/
var status = -1;
var facetype;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("��~�����!�������#b#t5152057##k���ҿ���Ϊ���������������");
    } else if (status == 1) {
        var face = cm.getPlayerStat("FACE");
        if (cm.getPlayerStat("GENDER") == 0) {
            facetype = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20012, 20014];
        } else {
            facetype = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21012, 21014];
        }
        for (var i = 0; i < facetype.length; i++) {
            facetype[i] = facetype[i] + face % 1000 - (face % 100);
        }
        cm.askAvatar("������������ݻ�Ȼһ�¡�������������ݱ�һ���� ֻ��Ҫ#b���ܻ�Ա��#k�Ϳ��Ը�������������.��ô��~������ѡһ������Ҫ������~", facetype, 5152057);
    } else if (status == 2) {
        if (cm.setAvatar(5152057, facetype[selection]) == 1) {
            cm.sendOk("����,���������һ���ϲ�����������!");
                cm.worldSpouseMessage(0x25, "��ϴ������ : ��ϲ " + cm.getChar().getName() + " ����һ��ϴ������ʱ�н��ֳ���һλʱ�д��ˣ���ҿ���Χ�۰�.");
        } else {
            cm.sendOk("�š�������϶�û������ҽԺ�Ļ�Ա��������������˼�����û��Ա�����Ҳ��ܸ�����������");
        }
        cm.dispose();
    }
}