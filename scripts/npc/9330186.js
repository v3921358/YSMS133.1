/* 
	��֮У԰���ִ���
*/
var questions = new Array(
"Ŀǰ����ð�յ���ͬ��ʢ��汾������", //�� true,
"���ǵ���ַ�ǲ���http://www.mxd598.com��", //�� false,
"����ð�յ���������ð�յ���", //�� true,
"���������еġ�����֮·����������ʵ����", //�� false,
"����ð�յ��е�����װ��������ͨ����Ϸ�л�ȡ��", //�� true,
"�����ʵ۵������ʥ����", //�� false,
"�����������Ǹ���������", //�� true,
"ŷ�����İ뵺����������", //�� false,
"�����ǲ���ֻ��10ֻ�֣�", //�� false,
"����ֹͣ���ǲ���1�����ڼ�40����������", //�� false,
"����BOSS�ǲ�����8ֻ��ָͷ��", //�� true,
"����ȼ�������250��ô��", //�� true,
"������ҪDƬ����������Ҫ������ô��", //�� false,
"ÿ����ÿ������Ĵ�������Ϊ6����ô��", //�� false,
"����ð�յ���Ϸ�У�Ǳ�ܾ�����ڹ����ã�����", //�� true,
"����ð�յ���Ϸ�У��峿֮¶�ǲ��ǲ�HP4000��", //�� �ǲ�MP false,
"����ð�յ���Ϸ�У������ǲ�����ţ���ģ�", //�� false,
"����ð�յ���Ϸ�е�����ȼ�������250��ô��", //�� true,
"����ð�յ��е��������ȫ�����﹦�ܣ���ô��", //�� false,
"����ð�յ����̳��ڵĵ�װ���ܽ��ף���ô��", //�� true,
"����ð�յ���Ϸ�У��������������п���תְ������", //�� false,
"����ð�յ���Ϸ�У���Ϸ����QȺ�ǲ��ǣ�730662��", //�� true,
"����ð�յ�Ŀǰû�п���ÿ��ǩ�����������", //�� false,
"���޻���������ÿ�쿪�ŵ��𣿣�", //�� false,
"ǿ����������ܱ�����", //�� true,
"���ֻ���������ܻ����", //�� false,
"160������װ���ܳ���", //�� false,
"150��װ���ܳ���", //�� false,
"��ʿ����ѩ����ɵ�е���ɵ��", //�� false,
"����ð�յ��Ƿ¹ٷ����÷���", //�� true,
"����ʱװ���ǵ�Ч����Ϊ��װ����ǿ��������");
var answers = new Array(true,true,true,true,true,true,true,false,false,false,true,true,false,true,true,false,false,true,false,true,false,true,false,true,true,false,false,false,true,true,true);
var rOutput = new Array("Ŀǰ����ð�յ���ͬ��ʢ��汾�ġ�", "����ð�յ�����ַ�ǣ�http://www.mxd598.com", "����ð�յ���Ŀǰ��˽���в��ϳ������¸Ľ���˽����", "ͨ������֮·���Խ����ƹ���ʱװ���ǵ�����ս����", "����ð�յ�������װ��������ͨ������򸱱����", "�����ʵ۵������ʥ�档", "�����������Ǹ���������", "ŷ�����İ뵺�Ǳ�ŷ", "����ֻ�а�ֻ�֡�", "����ֹͣ��һ�����ڿ�������60����������", "����BOSSֻ�а˸���ָͷ", "����ð�յ��У�����ȼ�������250����", "��ս������Ҫʹ�û�����ۣ���ս������ҪDƬ�ſ��ԡ�", "��ս��ͨ����ÿ������Ϊ�ĴΡ�", "����ð�յ��У�Ǳ�ܾ��ǿ��Դӹ����л�õġ�", "�峿֮¶ֻ�ܲ���MP4000�������ܲ���HP��", "��ţ�ǲ������ȵġ�", "����ȼ�����Ϊ250����", "��Ϸ�����ﲻ����ȫ�����﹦�ܡ�", "�̳��е���Ʒ�ǲ��ܽ��׵ġ�", "����ð�յ���Ϸ�У�����������NPC���п���תְ��", "����ð�յ��Ĺٷ�����Ⱥ�ǣ�489419824", "����ð�յ�Ŀǰ����������NPC�����Խ���ÿ��ǩ����", "���޻���������ÿ�쿪�ŵġ�", "����ð�յ��п����ڹ����л�ȡǿ�����ᡣ", "��ȯ����ֻ���������л�ã������Բμӻ���г��ݵ��л�á�", "��ɵ�ɣ�", "���㶼�𲻶ԣ�", "��һ�������������ò��ÿ���", "Ŀǰ����ð�յ����ϳ������£�ά������ѪҺ������", "ʱװ������Ϊ��װ�������ԣ������Ƿ�ս������");
var asked = new Array();
var currentQuestion;
var junk = new Array;
var junkWeap = new Array;
var goodEqWeap = new Array;
var useable = new Array;
var Rare = new Array;
var Select;
var openEvent = 0;

function start() {
	a = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (a == 3 && mode == 1) {
		a = 2;
		selection = 0;
	} else if (mode == 1 || (mode == 0 && type == 1)) a++;
	else {
		if (type == 12 && mode == 0) cm.sendOk("�б�������������������μӵĻ����Ը��ҶԻ���");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getParty() != null || cm.isLeader()) {
		if (a == 0) { //
			cm.sendNext("�μӿ��Դ��⣬#b���10������#k�Ϳ��Ի�ȡ������#b��Կ��Խ�����һ��#k��#r����˵Ļ��͵���������#k����������");
		} else if (a == 1) {
			cm.sendSimple("ͬѧ��׼���������Ǿ������ǿ�ʼ�ɣ�#b\r\n#L0# ��ʼ�μӿ��Դ��⡣");
		} else if (a == 2) {
			if (asked.length == 10) { //�ش���ɲ���
				cm.sendSimple("��ϲ�������������⡣�������ͷ�Բ����ҽ��䷢�������㡣#b\r\n\r\n1����ȡ����#v4001137#����ӡ�¡�\r\n2������Դ������ͬѧ��ͨ����һ�����ҡ�");
				cm.gainItem(4001137, 1);
				cm.dispose();
			} else {
				currentQuestion = -1;
				while (contains(currentQuestion) || currentQuestion == -1) {
					currentQuestion = Math.floor(Math.random() * questions.length);
				}
				asked.push(currentQuestion);
				cm.sendSimple("�� " + asked.length + " ��\r\n\r\n" + questions[currentQuestion] + "#b\r\n#L0# �ǡ�\r\n#L1# ��");
			} //ȫ���ش���ɣ��������ⲿ��
		} else if (a == 3) {
			var answer = selection == 0 ? true: false;
			//java.lang.System.out.println(answer+" "+answers[currentQuestion]+" "+currentQuestion);
			if (answers[currentQuestion] == answer) {
				cm.sendNext("��ϲ�㣬�ش���ȷ��#r\r\n\r\n" + rOutput[currentQuestion]);
			} else {
				cm.sendOk("���ź����ش����#b\r\n\r\n" + rOutput[currentQuestion] + "\r\n�ش����֮������¿�ʼ�ٴ����ˡ�");
				cm.dispose();
			}
		} //status
	} else {
		cm.sendOk("��ӳ������⣬���������ǵĴ���");
		cm.dispose();
	}
}

function contains(quest) {
	for (var i = 0; i < asked.length; i++) {
		if (asked[i] == quest) return true;
	}
	return false;
}