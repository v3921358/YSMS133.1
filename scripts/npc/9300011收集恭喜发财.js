var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var tz7 = "#fEffect/CharacterEff/1112900/3/1#";  //������
var tz8 = "#fEffect/CharacterEff/1112900/4/1#";  //������
var tz1 = "#fEffect/CharacterEff/1082565/4/0#";  //���ӷ�
var mf = new Array(5062000,5062002,5062500,5062002,2340000,5062000,5064000,5062000,5062000,5062010,5062002,5062002);
var chance = Math.floor(Math.random()*mf.length);
var chance1 = Math.floor(Math.random()*1000+1999000);
var chance2 = Math.floor(Math.random()*9+990);
var chance3 = Math.floor(Math.random()*2);

var status = 0;
var typed=0;
var rmb = 0;

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
		else
			status--;
		if (status == 0) {
			var ii = cm.getItemInfo();
			var selStr = "#r#e" + tz1+ "�����lؔ" + tz1+ "#n#k��#b����GM�����������Ӵ�������ռ�#k\r\n" + tz7 + "#d��ǰ������ӵ��#k\r\n#i4034251# x #r" + cm.getItemQuantity("4034251") + "#k    #i4034252# x #r" + cm.getItemQuantity("4034252") + "#k    #i4034253# x #r" + cm.getItemQuantity("4034253") + "#k    #i4034254# x #r" + cm.getItemQuantity("4034254") + "#k\r\n";

			selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n";

			selStr +="#L1##b"+tz8+" #r#i4034251# + #i4034252# #b�һ� #rħ������#l#k\r\n";
			selStr +="#L2##b"+tz8+" #r#i4034253# + #i4034254# #b�һ� #r�������#l#k\r\n";
			selStr +="#L3##b"+tz8+" #r#i4034251# + #i4034252# + #i4034253# + #i4034254# #b�һ� #r������þ�#l#k\r\n";
			selStr +="\r\n#d" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "" + tz7 + "" + tz8 + "#k\r\n";

			//selStr +=" \r\n\r\n";
                        cm.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\r\n\r\n\t\t#i4034251# x #r" + cm.getItemQuantity("4034251") + "#k\t\t\t#i4034252# x #r" + cm.getItemQuantity("4034252") + "#k\r\n\r\n- #d����������������Ʒ��\r\n#i5062000# #i5062002# #i5062500# #i2340000# #i5064000# #i2049168# #i2040805# #i2047904#\r\n#i2049116# #i2049705# #i2049752# #i2049417#");
			} else if (selection == 2) {
				typed=2;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\r\n\r\n\t\t#i4034253# x #r" + cm.getItemQuantity("4034253") + "#k\t\t\t#i4034254# x #r" + cm.getItemQuantity("4034254") + "#k\r\n\r\n- #d�������������£�\r\n\r\n\t#r 1,900,000 - 2,000,000 #b���#k");
                        } else if (selection == 3) {
				typed=3;
				cm.sendYesNo("- #d��ǰ������ӵ�У�#k\r\n\r\n#i4034253# x #r" + cm.getItemQuantity("4034253") + "#k\t#i4034254# x #r" + cm.getItemQuantity("4034254") + "#k\t#i4034253# x #r" + cm.getItemQuantity("4034253") + "#k\t#i4034254# x #r" + cm.getItemQuantity("4034254") + "#k\r\n\r\n- #d�������������£�\r\n\r\n\t#r 1000 #b������þ�#k");

			}
		} else if (status == 2) {
			if(typed==1){
                if (cm.haveItem(4034251, 200) && cm.haveItem(4034252, 200) && cm.getSpace(2) >= 1 && cm.getSpace(5) >= 1) {
			cm.gainItem(4034251, -200);
			cm.gainItem(4034252, -200);
			cm.gainItem(mf[chance],20);
			cm.sendOk("��ϲ���������� #r#z"+mf[chance]+"##k 20��.");
			cm.worldSpouseMessage(0x20, "����.��.�l.ؔ�� : ��ϲ " + cm.getChar().getName() + " �ڲ��񴦻���� " + ii.getName(mf[chance]) + " 20��.");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i4034251# = #r" + cm.getItemQuantity("4034251") + " / 200 ��#k\t\t#i4034252# = #r" + cm.getItemQuantity("4034252") + " / 200 ��#k\r\n\r\n\t\t#r�������ı������������顣#k\r\n\r\n- #e#d��ʾ��#n#K#b���й�����м��ʵ��䡣��ȥ�ռ���ɺ����һ���#k");
			cm.dispose();
				}
			}else if(typed==2){
                if (cm.haveItem(4034253, 200) && cm.haveItem(4034254, 200) && cm.getMeso() <= 1900000000) {
			cm.gainItem(4034253, -200);
			cm.gainItem(4034254, -200);
			cm.gainMeso(chance1);
			cm.sendOk("��ϲ���������� #r"+chance1+"#k ���.");
			cm.worldSpouseMessage(0x20, "����.��.�l.ؔ�� : ��ϲ " + cm.getChar().getName() + " �ڲ��񴦻���� " + chance1 + " ���.");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n\t#i4034253# = #r" + cm.getItemQuantity("4034253") + " / 200 ��#k\t\t#i4034254# = #r" + cm.getItemQuantity("4034254") + " / 200 ��#k\r\n\r\n\t\t#r�������ı�����װ������ô��Ǯ�����ֿ�����ԡ�#k\r\n\r\n- #e#d��ʾ��#n#K#b���й�����м��ʵ��䡣��ȥ�ռ���ɺ����һ���#k");
			cm.dispose();
				}
			}else if(typed==3){
                if (cm.haveItem(4034251, 200) && cm.haveItem(4034252, 200) && cm.haveItem(4034253, 200) && cm.haveItem(4034254, 200)) {
			cm.gainItem(4034251, -200);
			cm.gainItem(4034252, -200);
			cm.gainItem(4034253, -200);
			cm.gainItem(4034254, -200);
			cm.gainNX(chance3,chance2);
			cm.sendOk("��ϲ���������� #r"+chance2+"#k ������þ�.");
			cm.worldSpouseMessage(0x20, "����.��.�l.ؔ�� : ��ϲ " + cm.getChar().getName() + " �ڲ��񴦻���� " + chance2 + " ������þ�.");
			cm.dispose();
				} else {
			cm.sendOk("#d�һ�ʧ�ܣ�#k\r\n\r\n\r\n#i4034253# = #r" + cm.getItemQuantity("4034253") + " / 200 ��#k\t#i4034254# = #r" + cm.getItemQuantity("4034254") + " / 200 ��\r\n#i4034253# = #r" + cm.getItemQuantity("4034253") + " / 200 ��#k\t#i4034254# = #r" + cm.getItemQuantity("4034254") + " / 200 ��#k\r\n\r\n- #e#d��ʾ��#n#K#b���й�����м��ʵ��䡣��ȥ�ռ���ɺ����һ���#k");
			cm.dispose();
				}
			}
		}
	}
   }