/*function start(){
            cm.playerMessage(1, Math.ceil(0.9));
cm.dispose();
}*/

var z = "#e#r#fEffect/ItemEff/1112811/0/0#";

var status = 0;
var typed=0;

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
			cm.sendSimple("\t\t- #e#d�����������������#k#n\r\n\r\n\r\n\r\n#bĿǰ�����������������Ҫ������#r"+cm.getBossLog("�����ܼƳɳ�ֵ",1)+"#k#b / 1000 �� \r\n\r\n#r#L1#����������˵��#l            "+z+""+z+""+z+"\r\n\r\n#b#L2#[���һ������]#l         "+z+""+z+""+z+"\r\n#b#L3#[�����������]#l\r\n#b#L4#[��ҫһ������]#l         "+z+""+z+""+z+"");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendOk("\t\t- #e#d�����������������#k#n\r\n\r\n\r\n\r\n   #bͨ����������ɺ󡣿��Ի�ö������������������ӵ��150-160װ�����Լ�����ϵ��װ������߱��յ�ϵ��װ���������桤ð��֮�Ŀ��Ի��Ŷ��������Ҫ��������������ͨ�����Ｘ���Ե����ħ���򣬿�����ι�����Ӵ�� \r\n\r\n#rע���������ٳɳ�����С��飬����ʹ��RMB����ħ����");
                    	cm.dispose();
			} else if (selection == 2) {
			typed=3;
                    	cm.dispose();
			cm.openNpc(9073025, 100);
			} else if (selection == 3) {
			if(cm.getBossLog("�����ܼƳɳ�ֵ",1) >= 800){
			typed=4;
			cm.dispose();
			cm.openNpc(9073025, 101);
			} else {
			cm.dispose();
			cm.sendOk("������#b����������ʧ���ˡ�\r\n#r����������ĸ��������һ�û�дﵽ��ȫ���ȫʢ״̬��");
			}
			} else if (selection == 4) {
			if(cm.getBossLog("��ҫ") < 3){
			typed=5;
			cm.setBossLog("��ҫ");
			cm.dispose();
			cm.openNpc(9073025, 102);
			} else {
			cm.dispose();
			cm.sendOk("ÿ�������ҫ3��Ŷ��");
			}
		}
	   }
      }
}
