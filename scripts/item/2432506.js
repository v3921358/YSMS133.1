var aaa ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa1 ="#fEffect/ItemEff/1048000/0/0#";//ƻ������
var aa2 ="#fEffect/ItemEff/1004139/effect/jump/0#";//��ͼ��
var aa5 ="#fEtc/EmotionEffect/oops/0#";//ˮ��Ч��
var aa8 ="#fEffect/ItemEff/1102420/effect/ladder/0#";//������Ч��
var aa9 ="#fEffect/ItemEff/1102491/effect/proneStab/0#";// ̫��Ч��
var aa0 ="#fEffect/CharacterEff/1112904/0/1#";//��ɫ��Ч��
var aa11 ="#fEffect/CharacterEff/1112904/2/0#";//��ɫ����Ч��
var aa12 ="#fEffect/CharacterEff/1112946/1/1#";//��ʯЧ��.
var aa13 ="#fEffect/CharacterEff/1112946/5/0#";//��ʯЧ��
var aa14 ="#fEffect/CharacterEff/1082565/2/0#";//����Ч��

var status = 0;
var typed=0;
var rmb = 0;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		im.dispose();
	} else {
		if (mode == 0 && status == 0) {
			im.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {//" + im.itemQuantity(4021012) + "
			var selStr = "  "+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+""+aa1+""+aa5+"\r\n";
			//selStr += "#d��ѡ����Ҫ��ְҵ����ѥ��װ����#n#k\r\n";
			selStr +="#b(PS����ѡ������ѥ��,ֻ��ʹ��һ��,ѡ��õ��߻���ʧ��)\r\n";
			selStr +="\t#L1##r"+aaa+" ѡ��սʿ#z1072743##i1072743##l\r\n"; 
			selStr +="\t#L2#"+aaa+" ѡ��ʦ#z1072744##i1072744##l\r\n";
			selStr +="\t#L3#"+aaa+" ѡ�񹭼��ֵ�#z1072745##i1072745##l\r\n";
			selStr +="\t#L4#"+aaa+" ѡ�������#z1072746##i1072746##l\r\n";
			selStr +="\t#L5#"+aaa+" ѡ�񺣵���#z1072747##i1072747##l\r\n";
			selStr +=" ";
			im.sendSimple(selStr);	
		} else if (status == 1) {
			if (selection == 1) {
				typed=1;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d��ȷ��ѡ��սʿ #r#z1072743# #d��?#n\r\n\r\n- #e#r��ʾ��#n#bһ������ѡ����ǲ��ܸ����ˡ�");
			} else if (selection == 2) {
				typed=2;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d��ȷ��ѡ��ħ��ʦ #r#z1072744# #d��?#n\r\n\r\n- #e#r��ʾ��#n#bһ������ѡ����ǲ��ܸ����ˡ�");
			} else if (selection == 3) {
				typed=3;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d��ȷ��ѡ�񹭼��� #r#z1072745# #d��?#n\r\n\r\n- #e#r��ʾ��#n#bһ������ѡ����ǲ��ܸ����ˡ�");
			} else if (selection == 4) {
				typed=4;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d��ȷ��ѡ����� #r#z1072746# #d��?#n\r\n\r\n- #e#r��ʾ��#n#bһ������ѡ����ǲ��ܸ����ˡ�");
			} else if (selection == 5) {
				typed=5;
				im.sendYesNo("\t\t\t"+aa2+"\r\n\r\n- #e#d��ȷ��ѡ�񺣵� #r#z1072747# #d��?#n\r\n\r\n- #e#r��ʾ��#n#bһ������ѡ����ǲ��ܸ����ˡ�");
			}
		} else if (status == 2) {
			if(typed==1){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072743, 1);
				im.sendOk("#b��ϲ����� #r#z1072743##b һ��.");
				im.worldSpouseMessage(0x15,  "������ѥ��ʹ��ȯ�� : [" + im.getChar().getName() + "] �����һ�� �������Ǵ�˹ѥ.");
				im.dispose();
				} else {
				im.sendOk("�����ռ䲻��");
				im.dispose();
				}
			} else if(typed==2){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072744, 1);
				im.sendOk("#b��ϲ����� #r#z1072744##b һ��.");
				im.worldSpouseMessage(0x15,  "������ѥ��ʹ��ȯ�� : [" + im.getChar().getName() + "] �����һ�� �����ն�÷˹ѥ.");
				im.dispose();
				} else {
				im.sendOk("�����ռ䲻��");
				im.dispose();
				}
			} else if(typed==3){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072745, 1);
				im.sendOk("#b��ϲ����� #r#z1072745##b һ��.");
				im.worldSpouseMessage(0x15,  "������ѥ��ʹ��ȯ�� : [" + im.getChar().getName() + "] �����һ�� ��������ѥ.");
				im.dispose();
				} else {
				im.sendOk("�����ռ䲻��");
				im.dispose();
				}
			} else if(typed==4){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072746, 1);
				im.sendOk("#b��ϲ����� #r#z1072746##b һ��.");
				im.worldSpouseMessage(0x15,  "������ѥ��ʹ��ȯ�� : [" + im.getChar().getName() + "] �����һ�� ����������ѥ.");
				im.dispose();
				} else {
				im.sendOk("�����ռ䲻��");
				im.dispose();
				}
			} else if(typed==5){
                if (im.haveItem(2432506, 1) && im.getSpace(1) >= 1) {
				im.gainItem(2432506,-1);
				im.gainItem(1072747, 1);
				im.sendOk("#b��ϲ����� #r#z1072747##b һ��.");
				im.worldSpouseMessage(0x15,  "������ѥ��ʹ��ȯ�� : [" + im.getChar().getName() + "] �����һ�� ��������̩ѥ.");
				im.dispose();
				} else {
				im.sendOk("�����ռ䲻��");
				im.dispose();
				}
			}
      }
   }
 }