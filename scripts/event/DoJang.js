/*
	���ݣ��°����긱��
	��ע��
		
*/
var layersTotal = 25;
var mobs = new Array(			// ����������ID����������ǿ����
										// ��һ��		������ţ
										new Array(1, 1, 100100, 10, 30000),		//Lv1 - ��ţ 15
										new Array(1, 1, 100101, 10, 30000),		//Lv2 - ����ţ 20
										new Array(1, 1, 130101, 10, 24000),			//Lv5 - ����ţ 50
										new Array(1, 1, 4250000, 10, 30),			//Lv98 - ̦޺��ţ 61000
										new Array(1, 1, 9400908, 10, 30),			//Lv105 - а��̦޺��ţ 75000
										new Array(1, 1, 9400827, 10, 30),			//Lv71 - �ڰ�̦޺��ţ 10000

										// �ڶ���		Բһ������µ���
										new Array(2, 1, 2600200, 10, 3),			//Lv122 - ��Ģ�� 447770
										new Array(2, 1, 2600201, 10, 3),			//Lv122 - �ܴ����Ģ�� 447770
										new Array(2, 1, 2600202, 10, 3),			//Lv122 - ��Ģ�� 447770
										new Array(2, 1, 2600203, 10, 3),			//Lv122 - ��Ģ�� 447770
										new Array(2, 1, 5250000, 10, 15),			//Lv102 - ̦޺Ģ�� 69000
										new Array(2, 2, 2600208, 5, 3),				//Lv122 - Ģ���� 2725000

										// ������		�ܵ�����
										new Array(3, 1, 100005, 7, 1500),			//Lv4 - ľ�� 35
										new Array(3, 1, 1110101, 7, 1500),			//Lv10 - ��ľ�� 125
										new Array(3, 1, 1130100, 7, 1500),			//Lv12 - ��ľ�� 175
										new Array(3, 1, 1140100, 7, 1500),			//Lv16 - ��ľ�� 275
										new Array(3, 1, 1140130, 7, 1500),			//Lv17 - ���ĵĹ�ľ�� 300
										new Array(3, 1, 2130100, 7, 1500),			//Lv14 - �ڸ�ľ�� 225
										new Array(3, 1, 9300246, 7, 150),			//Lv62 - ̦޺ľ�� 6300
										new Array(3, 1, 9800052, 7, 3),			//Lv117 - ̦޺ľ�� 1485000

										// ���Ĳ�		��ֵ�Ģ���㲻Ҫ��
										new Array(4, 1, 2600204, 10, 3),			//Lv122 - ��Ģ�� 447770
										new Array(4, 1, 2600205, 10, 3),			//Lv122 - ��������Ģ�� 447770
										new Array(4, 1, 5250000, 10, 15),			//Lv102 - ̦޺Ģ�� 69000
										new Array(4, 1, 9391001, 10, 15),			//Lv135 - ����Ģ���� 160000
										new Array(4, 2, 9400205, 10, 30),			//Lv90 - ��Ģ���� 200000
										new Array(4, 1, 9800053, 10, 3),			//Lv119 - ̦޺Ģ�� 1545000

										// �����		�ſ���ŮĢ��~
										new Array(5, 1, 2600206, 10, 6),			//Lv122 - ��ʬĢ�� 447770
										new Array(5, 1, 2600207, 10, 6),			//Lv122 - �����Ľ�ʬĢ�� 447770
										new Array(5, 2, 2600208, 5, 6),				//Lv122 - Ģ���� 2725000
										new Array(5, 2, 9400205, 5, 75),			//Lv90 - ��Ģ���� 200000
										new Array(5, 1, 9500441, 5, 3),			//Lv120 - ����Ģ�� 1605000
										new Array(5, 2, 9300436, 5, 750),			//Lv66 - ��ʬĢ���� 20000
										new Array(5, 1, 9400829, 5, 300),			//Lv73 - �ڰ�̦޺Ģ�� 13000
										new Array(5, 1, 9300692, 1, 30),			//Lv1 - �»�100������Ģ�� 35
										new Array(5, 2, 9500609, 1, 3000),			//Lv10 - ��ʥ��ˮ���� 7100
										new Array(5, 1, 9100008, 2, 3),				//����������ţ �ɺ���ͨ�� 930000
										new Array(5, 1, 9100000, 2, 3),				//����ˮ�� �ɺ���ͨ�� 930000

										//////////////////////////////////////////////////////////////////

										//���߲�		ˮ���������
										new Array(7, 1, 100006, 3, 3000),				//Lv7 - ��ˮ�� 80
										new Array(7, 1, 1210103, 3, 3000),			//Lv10 - ��ˮ�� 125
										new Array(7, 1, 9300027, 3, 1500),			//Lv23 - ��ħˮ�� 465
										new Array(7, 1, 7120103, 3, 6),			//Lv120 - ��ˮ�� 105000
										new Array(7, 1, 7120104, 3, 6),			//Lv120 - ��ˮ�� 105000
										new Array(7, 1, 7120105, 3, 6),			//Lv120 - ��ˮ�� 105000
										new Array(7, 1, 9391000, 3, 6),			//Lv135 - �ֵ�ˮ�� 160000
										new Array(7, 1, 2600215, 3, 3),				//Lv126 - Ҭ����ˮ�� 517049
										new Array(7, 1, 2600216, 3, 3),				//Lv126 - �ϱ���ˮ�� 517049
										new Array(7, 1, 2600217, 3, 3),				//Lv126 - ��ɫ��ӾȦˮ�� 517049
										new Array(7, 1, 2600218, 3, 3),				//Lv126 - Ϻˮ�� 517049
										new Array(7, 1, 2600219, 3, 3),				//Lv126 - ����ˮ�� 517049
										new Array(7, 1, 2600220, 3, 3),				//Lv126 - ��������ˮ�� 517049
										new Array(7, 1, 2600221, 3, 3),				//Lv126 - ��������ˮ�� 517049
										new Array(7, 2, 2600222, 3, 6),				//Lv126 - ������ˮ�� 2950000

										//�ڰ˲�		����֮��
										new Array(8, 1, 8210000, 7, 3),			//Lv115 - ��������� 95000
										new Array(8, 1, 9300297, 7, 1.5),			//Lv125 - ��ɫ����� 9500000
										new Array(8, 1, 9300234, 7, 150),			//Lv32 - ���� 1100
										new Array(8, 1, 9300235, 7, 150),			//Lv52 - ������ 3400
										new Array(8, 1, 9300114, 7, 150),			//Lv63 - �Ϻ������µ�������� 8040
										new Array(8, 1, 9300120, 7, 150),			//Lv65 - �Ϻ����ɶ��������� 9000
										new Array(8, 1, 9300123, 7, 150),			//Lv65 - �Ϻ������������ 9000
										new Array(8, 1, 2600322, 7, 3),			//Lv139 - ���� 959867
										new Array(8, 2, 6220000, 3, 3000),			//Lv25 - ��� 5250

										//�ھŲ�		��������Ϯ
										new Array(9, 1, 8141000, 5, 15),			//Lv119 - ���� 103000
										new Array(9, 1, 8141100, 5, 15),			//Lv122 - ������ 109000
										new Array(9, 1, 8145008, 10, 15),			//Lv134 - ������ 155000
										new Array(9, 2, 8220003, 2, 15),				//Lv145 - ���� 2100000
										new Array(9, 2, 2600326, 2, 6),				//Lv139 - �Ϻ��� 4500000

										//��ʮ��		��ɱ�ŵ���ı
										new Array(10, 1, 9390813, 5, 9),			//Lv157 - ѩ�� 300000
										new Array(10, 1, 9390814, 5, 9),			//Lv158 - �ڰ��� 310000
										new Array(10, 1, 9390818, 5, 9),			//Lv160 - ��ɱ�Ŵ̿� 660000
										new Array(10, 1, 9390819, 5, 9),			//Lv162 - ��ɱ��ս���� 700000
										new Array(10, 1, 9390820, 5, 9),			//Lv163 - ��ɱ�Ŷ�ħѵ��ʦ 720000
										new Array(10, 1, 9390821, 5, 9),			//Lv162 - ����С��ħ 700000
										new Array(10, 1, 9390822, 2, 9),			//Lv165 - ��ɱ��ͷͷ����˹ 1175000
										new Array(10, 1, 9390833, 5, 9),			//Lv160 - ���ɵ������� 660000

										//��ʮһ��	�󺽺�ʱ��I
										new Array(11, 2, 9700037, 2, 3),			//Lv62 - ���鴬���� 4000000
										new Array(11, 2, 9420513, 5, 3),			//Lv100 - ���鴬�� 2000000
										new Array(11, 2, 9400589, 1, 1.5),			//Lv120 - �������� 240000000
										new Array(11, 2, 2600222, 1, 3),			//Lv126 - ������ˮ�� 2950000
										new Array(11, 3, 9500487, 1, 3),			//Lv150 - �������Ͷ����� 11750000
										new Array(11, 3, 9800156, 1, 3),			//Lv134 - �Ϻ��� 6200000

										//////////////////////////////////////////////////////////

										//��ʮ����	ϲ�������̫��
										new Array(13, 1, 9600003, 5, 900),			//Lv45 - ���� 2400
										new Array(13, 1, 9600004, 5, 900),			//Lv50 - ɽ�� 3000
										new Array(13, 1, 9600005, 5, 900),			//Lv55 - ��ɽ�� 4000
										new Array(13, 1, 9600008, 5, 900),			//Lv57 - ������ 4600
										new Array(13, 1, 2600014, 5, 15),			//Lv104 - ��ħ���� 217920
										new Array(13, 1, 9810001, 5, 30),			//Lv114 - а������ 93000
										new Array(13, 2, 9300481, 2, 3),			//Lv117 - �������� 4950000
										new Array(13, 2, 9300624, 2, 15),			//Lv115 - Ѫ�����ӳ� 525000

										//��ʮ�Ĳ�	�������ǻ���ڽ��족���������Ǵ�ս��

										new Array(14, 2, 2500821, 2, 3),			//Lv90 - ��ħѪ�� 16666667
										new Array(14, 2, 2500241, 2, 3),			//Lv90 - ��ħѪ�� 16666667
										new Array(14, 2, 2500701, 2, 3),			//Lv90 - ��ħ���� 16666667
										new Array(14, 2, 2500850, 5, 3),			//Lv50 - ��ħѪ�� 5000000
										new Array(14, 2, 8870003, 5, 3),			//Lv115 - Ѫ�� 525000

										//��ʮ���	ʯͷ��
										new Array(15, 1, 2600209, 10, 15),			//Lv124 - ʯͷ�� 479546
										new Array(15, 1, 2600210, 10, 15),			//Lv124 - ��ʯͷ�� 479546
										new Array(15, 1, 2600211, 10, 15),			//Lv124 - ����ʯͷ�� 479546
										new Array(15, 1, 2600212, 10, 15),			//Lv124 - ������ʯͷ�� 479546
										new Array(15, 1, 2600213, 10, 15),			//Lv124 - �����ʯͷ�� 479546
										new Array(15, 1, 2600214, 10, 15),			//Lv124 - ����ʯͷ�� 2825000

										//��ʮ����	ʮ�˽�����
										new Array(16, 1, 9600021, 18, 150),			//Lv130 - �޻����� 135000
										new Array(16, 1, 9600022, 18, 150),			//Lv125 - �޻����� 115000
										new Array(16, 1, 9600019, 18, 150),			//Lv130 - С���� 135000
										new Array(16, 1, 9600020, 18, 150),			//Lv120 - Сͭ�� 105000

										//��ʮ�߲�	߳������
										new Array(17, 3, 9600025, 3, 5),			//Lv150 - ������ɮ 80000000
										new Array(17, 2, 9600024, 10, 125),			//Lv125 - ���� 115000

										////////////////////////////////////////////////////////

										//��ʮ�Ų�	���������г��
										new Array(19, 1, 2600609, 5, 15),			//Lv164 - ������ 2746619
										new Array(19, 1, 8200000, 5, 150),			//Lv136 - ʱ��֮�� 165000
										new Array(19, 2, 9800071, 5, 90),			//Lv153 - ʱ������ 3900000
										new Array(19, 3, 9300513, 3, 30),			//Lv125 - ������ͼ˹������ 8000000

										//�ڶ�ʮ��	������һ�в���һ�ű�������
										new Array(20, 1, 2600907, 5, 6),			//Lv140 - �����Ĳ��� 7400000
										new Array(20, 1, 2600906, 5, 6),			//Lv140 - �����ķ�ŭ 7400000
										new Array(20, 1, 2600908, 5, 6),			//Lv140 - �����Ŀ��� 7400000
										new Array(20, 1, 2600909, 5, 6),			//Lv140 - �����Ĺ¶� 7400000
										new Array(20, 1, 2600905, 5, 6),			//Lv140 - �����Ŀֲ� 7400000

										//�ڶ�ʮһ�� ���������ǿ������Ѻ�ȫ����146���������������������š�
										new Array(21, 1, 8147012, 20, 15),			//Lv157 - �Ʒ� 15000000
										new Array(21, 1, 8147013, 10, 15),			//Lv158 - ���Ʒ� 15500000
										new Array(21, 2, 8147014, 5, 15),			//Lv159 - �Ʒ佫�� 16000000
										new Array(21, 3, 8220012, 1, 30),			//Lv137 - ����ħŮŷ���� 14453128

										//�ڶ�ʮ���� ֩�����⴫����ѡ����������
										new Array(22, 1, 9100005, 2, 3),			//Lv200 - ������֩��
										new Array(22, 1, 9100006, 2, 3),			//Lv200 - ������֩��
										new Array(22, 2, 2600414, 10, 300),			//Lv146 - ��֩�� 1264891
										new Array(22, 1, 2230103, 10, 3000),		//Lv55 - ��֩�� 4000
										new Array(22, 1, 2230104, 10, 3000),		//Lv56 - ��֩�� 4300
										new Array(22, 3, 8800400, 1, 9),			//Lv165 - ֩��Ů�� 57000000

										//�ڶ�ʮ���� ��սֲ��ͽ�ʬ����
										new Array(23, 1, 9390642, 8, 30),			//Lv150 - ��ɫ����� 1410000
										new Array(23, 1, 9390644, 8, 30),			//Lv150 - ��ɫ����� 1410000
										new Array(23, 1, 9390646, 8, 30),			//Lv150 - ��������� 1410000
										new Array(23, 2, 8147003, 8, 75),			//Lv155 - ������ 560000
										new Array(23, 2, 8147004, 8, 75),			//Lv156 - �ڰ������� 580000
										new Array(23, 2, 9800088, 8, 3),			//Lv176 - ��ɽ��ʬ 7350000

										/////////////////////////////////////////////////////////////////

										//�ڶ�ʮ��� ��������
										new Array(25, 2, 9390845, 5, 15),			//Lv152 - �����Զ���ʿ 12500000
										new Array(25, 2, 9390844, 5, 15),			//Lv151 - �����Զ๭���� 12000000
										new Array(25, 2, 9390846, 5, 15),			//Lv148 - �����Զ��սʿ 10500000
										new Array(25, 2, 9390843, 5, 15),			//Lv147 - �����Զ�սʿ 10000000

										//�ڶ�ʮ���� ���Ǿ����ƽ��
										new Array(26, 2, 9400424, 20, 45),			//Lv160 - 糺���ʿ 330000
										new Array(26, 2, 9400425, 10, 60),			//Lv160 - �ƽ�������� 330000
										new Array(26, 3, 9400439, 1, 3),			//Lv170 - Ѫ�潫�� 500000000

										//�ڶ�ʮ�߲� ׷��֮·
										new Array(27, 1, 2600706, 8, 75),			//Lv176 - ��ڵļ�˾ 4189194
										new Array(27, 1, 2600709, 8, 75),			//Lv176 - ��ڵ��ػ��ӳ� 4189194
										new Array(27, 1, 2600702, 8, 75),			//Lv173 - ׷������ 3799785
										new Array(27, 1, 2600708, 8, 75),			//Lv176 - ��ڵ��ػ��� 4189194
										new Array(27, 1, 2600707, 8, 75),			//Lv176 - ��ڵ���� 4189194
										new Array(27, 1, 2600703, 8, 75),			//Lv173 - ׷����ػ��� 3799785

										//�ڶ�ʮ�˲� ��ʽ��ʿ������
										new Array(28, 1, 8610005, 3, 300),			//Lv168 - ��ʽ��ʿA 410000
										new Array(28, 1, 8610006, 3, 300),			//Lv170 - ��ʽ��ʿB 430000
										new Array(28, 1, 8610007, 3, 300),			//Lv172 - ��ʽ��ʿC 450000
										new Array(28, 1, 8610008, 3, 300),			//Lv174 - ��ʽ��ʿD 470000
										new Array(28, 1, 8610009, 3, 300),			//Lv176 - ��ʽ��ʿE 490000

										//�ڶ�ʮ�Ų� �߼���ʿ������
										new Array(29, 1, 8610010, 3, 850),			//Lv177 - �߼���ʿA 500000
										new Array(29, 1, 8610011, 3, 850),			//Lv179 - �߼���ʿB 520000
										new Array(29, 1, 8610012, 3, 850),			//Lv180 - �߼���ʿC 530000
										new Array(29, 1, 8610013, 3, 850),			//Lv182 - �߼���ʿD 570000
										new Array(29, 1, 8610014, 3, 850)			//Lv184 - �߼���ʿE 610000
										);

var superMob = new Array(9300216, 9100000, 9100008, 9300692, 9100005, 9100006);

var layersTip = new Array(
						"������ţ",
						"Ģ����",
						"֦��Ҷï",
						"��ֵ�Ģ���㲻Ҫ��",
						"�ſ���ŮĢ��~",
						"ˮ���������",
						"����֮��",
						"��������Ϯ",
						"��ɱ�ŵ���ı",
						"��������",
						"ϲ�������̫��",
						"�����ǻ���ڽ��족���������Ǵ�ս��",
						"ʯͷ��",
						"ʮ�˽�����",
						"߳������",
						"���������г��",
						"������һ�в���һ�ű�������",
						"���������ǿ������Ѻ�ȫ����146���������������������š�",
						"֩�����⴫����ѡ����������",
						"��սֲ��ͽ�ʬ",
						"��������",
						"���Ǿ����ƽ��",
						"׷��֮·",
						"��ʽ��ʿ������",
						"�߼���ʿ������"
						);

var dropItems = new Array(
new Array(1, 2022431, 100000),		// - �����������ҩˮ - HP��MP�ָ�50%�������HP��MP����99,999ʱ��HP��MP�ָ�49,999��
new Array(1, 2022432, 5000),		// - �����������ҩˮ - HP��MPȫ���ָ��������HP��MP����99,999ʱ��HP��MP�ָ�99,999��
new Array(1, 2022433, 25000),		// - ���������������ҩ - ���Իָ������쳣״̬��
new Array(1, 4001620, 10000),
new Array(1, 4001713, 10000),		//���ӽ�10���Ǯ			
new Array(1, 4001714, 5000)		//���ӽ�100���Ǯ					
);

var dropItemsAdvanced = 2430069; // ��ĸ������

var status = 0;
var text = "";
var baseMapId = 925060000;
var party = new Array();
var mobCount = 0;

function init() {
	for (var i = 0; i < mobs.length; i++) {
		mobCount += mobs[i][3];
	}
}

function setup() {
	// ���ø���
	// ��ʼ��������ͼ
	
}

function playerEntry(eim, player) {
	var exp = Math.floor(51250052 / mobCount);
	eim.setProperty("exp", exp.toString());
}

function changedMap(eim, player, mapid) {
	if (mapid < 925060100 || mapid > 925064700) {	// �������긱����ͼ��
		eim.dispose();
		return;
	}
	
	var maps = eim.getObjectProperty("maps");
	if (maps == null) {
		java.lang.System.out.println("maps��ȡʧ��");
		eim.dispose();
		return;
	}

	for (var i = 0; i < 48; i++) {
		var map = maps[i];
		if (map[0] == mapid) {
			spawnMonster(eim, player, map[1]);
			showMapEffect(map[1]);
			break;
		}
	}
}

function spawnMonster(eim, player, map) {
	var newMobs = new Array();
	var layers = (map.getId() - baseMapId) / 100;
	var exp = parseInt(eim.getProperty("exp")) * (layers / layersTotal) * 0.1;
	for (var i = 0; i < mobs.length; i++) {
		if (layers == mobs[i][0]) {
			newMobs.push(mobs[i]);
		}
	}
	for (var i = 0; i < newMobs.length; i++) {
		for (var j = 0; j < newMobs[i][3]; j++) {
			var monster = em.getMonster(newMobs[i][2]);
			if (monster == null){
				continue;
			}
			var monsterStats = em.getOverrideMonsterStats(Math.floor(monster.getMobMaxHp() * newMobs[i][4]), monster.getMobMaxMp(), exp * newMobs[i][1]);
			var pointX = Math.floor(Math.random() * 900) - 450;
			monster.disableSpawnRevives();
			monster.disableDrops();
			monster.setOverrideStats(monsterStats);
			em.spawnDoJangMonster(map, monster, pointX);
			var isSuperMob = false;
			for (var z = 0; z < superMob.length; z++) {
				if (monster.getId() == superMob[z]) {
					isSuperMob = true;
				}
			}
			if (!isSuperMob) {
				eim.registerMonster(monster);
			}
		}
	}
}

function showMapEffect(map) {	// ��ʾ��ͼ��Ч
	var layers = (map.getId() - baseMapId) / 100;
	var showTip;
	if (layers % 6 == 0) {
		showTip = "������С�����ˣ���Ȼ�ܵ����Խ����Խ�����ѣ����ں�������ü���";
	} else {
		layers -= Math.floor(layers / 6);
		showTip = layersTip[layers-1];
	}
	map.startMapEffect(showTip, 5120024);
}

function monsterValue(eim, mobid) {
	return 1;
}

function monsterDrop(eim, player, mob) {
	var monsterLv = 1;
	var mobid = mob.getId();
	var map = player.getMap();
	for (var i = 0; i < mobs.length; i++) {
		if (mobid == mobs[i][2]) {
			monsterLv = mobs[i][1] > monsterLv ? mobs[i][1] : monsterLv;
		}
	}
	
	var toDrop = new Array();
	// ��������Ʒ���������
	for (var i = 0; i < dropItems.length; i++) {
		var chance = Math.floor(Math.random() * 999999);
		if (chance < dropItems[i][2] * monsterLv && monsterLv >= dropItems[i][0]) {
			toDrop.push(new Array(dropItems[i][1], Math.floor(Math.random() * monsterLv) + 1));
		}
	}

	if (eim.getMobs().size() == 1) {
		switch ((map.getId() % 10000) / 100) {
		case 17:	// 17�㽱��һ��װ������
			toDrop.push(new Array(dropItemsAdvanced, 2));
			break;
		case 29:	// 29�㽱������װ������
			toDrop.push(new Array(dropItemsAdvanced, 3));
			break;
		}
	}

	for (var i = 0; i < toDrop.length; i++) {
		map.spawnMobDrop(em.newItem(toDrop[i][0], 0, toDrop[i][1]), mob.getPosition(), mob, player, 0, 0);
	}
}

function allMonstersDead(eim) {
	// ɱ����������
	eim.getPlayers().get(0).getMap().killAllMonsters(true);
	eim.environmentChange("Dojang/clear", 5);
	eim.environmentChange("dojang/end/clear", 4);
}

function playerExit(eim, player) {
	eim.dispose();
}
function playerDisconnected(eim, player) {playerExit(eim, player); return 0;}
function playerRevive(eim, player) {playerExit(eim, player); return false;}
function playerDead(eim, player) {playerExit(eim, player); }
function scheduledTimeout(eim) {}
function monsterKilled(eim, player, cp) {}
function monsterDamaged(eim, player, mobid, damage) {}
function leftParty(eim, player) {}
function disbandParty(eim) {}
function onMapLoad(eim, player) {}