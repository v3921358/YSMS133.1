status = -1;
var selectJob = Array("սʿ","ħ��ʦ","������","����","����");
var itemList = Array(
	//սʿ
	Array(
		//Array(1102476, 300), // ŵ�����Ǵ�˹���� // (������)
		//Array(1072737, 300), // ŵ�����Ǵ�˹ѥ // (������)
		//Array(1132169, 300), // ŵ�����Ǵ�˹���� // (������)
		Array(1082543, 220), // �������Ǵ�˹���� // (������)
		Array(1102481, 220), // �������Ǵ�˹���� // (������)
		Array(1072743, 220), // �������Ǵ�˹ѥ // (������)
		Array(1132174, 220), // �������Ǵ�˹���� // (������)
		Array(1122122, 220)
	),
	//ħ��ʦ
	Array(
		//Array(1102477, 300), // ŵ�ͺն�÷˹���� // (������)
		//Array(1072738, 300), // ŵ�ͺն�÷˹ѥ // (������)
		//Array(1132170, 300), // ŵ�ͺն�÷˹���� // (������)
		Array(1082544, 220), // �����ն�÷˹���� // (������)
		Array(1102482, 220), // �����ն�÷˹���� // (������)
		Array(1072744, 220), // �����ն�÷˹ѥ // (������)
		Array(1132175, 220), // �����ն�÷˹���� // (������)
		Array(1122123, 220)
	
	),
	//������
	Array(
		//Array(1102478, 300), // ŵ�Ϳ������� // (������)
		//Array(1072739, 300), // ŵ�Ϳ���ѥ // (������)
		//Array(1132171, 300), // ŵ�Ϳ������� // (������)
		Array(1082545, 220), // ������������ // (������)
		Array(1102483, 220), // ������������ // (������)
		Array(1072745, 220), // ��������ѥ // (������)
		Array(1132176, 220), // ������������ // (������)
		Array(1122124, 220)// -
	
	),
	//����
	Array(
		//Array(1102479, 300), // ŵ������������ // (������)
		//Array(1072740, 300), // ŵ��������ѥ // (������)
		//Array(1132172, 300), // ŵ������������ // (������)
		Array(1082546, 220), // �������������� // (������)
		Array(1102484, 220), // �������������� // (������)
		Array(1072746, 220), // ����������ѥ // (������)
		Array(1132177, 220),// �������������� // (������)
		Array(1122125, 220)//  - 
	
	),
	//����
	Array(
		//Array(1102480, 300), // ŵ�Ͱ���̩���� // (������)
		//Array(1072741, 300), // ŵ�Ͱ���̩ѥ // (������)
		//Array(1132173, 300), // ŵ�Ͱ���̩���� // (������)
		Array(1082547, 220), // ��������̩���� // (������)
		Array(1102485, 220), // ��������̩���� // (������)
		Array(1072747, 220), // ��������̩ѥ // (������)
		Array(1132178, 220),// ��������̩���� // (������)
		Array(1122126, 220)//  -
	)
);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
       if (mode == 0 && status == 0) {
			im.dispose();
			return;
		}
        status--;
    }
    if (status == 0) {
        var text = "";
		for(var i=0; i<selectJob.length; i++) {
			text+="#L"+i+"#"+selectJob[i]+"#l\t";
			if (!((i+1)%3)) {
				text+="\r\n\r\n";
			}
		}
		im.sendSimple("�����ӿ��Ի�ñ���װ������ð��֮�ģ���ѡ����Ҫ��ȡ��װ��ְҵ��\r\n#b"+text);
    } else if(status == 1) {
		var _itemList = itemList[selection];
		var chance = Math.floor(Math.random() * 220);
        var finalitem = Array();
        for (var i = 0; i < _itemList.length; i++) {
            if (_itemList[i][1] >= chance) {
                finalitem.push(_itemList[i]);
            }
        }
        if (finalitem.length != 0) {
            var item;
            var random = new java.util.Random();
            var finalchance = random.nextInt(finalitem.length);
            var itemId = finalitem[finalchance][0];
            var quantity = 1;
            var notice = 3;
            item = im.gainGachaponItem(itemId, quantity, "��װ����", notice);
            if (item != -1) {
			im.gainItem(2431996, -1);
                im.sendOk("������ #b#t" + item + "##k " + quantity + "����");
            } else {
                im.sendOk("����ȷ���ڱ�����װ�������ģ������������Ƿ���һ�����ϵĿռ䡣");
            }
            im.safeDispose();
        } else {
            im.sendOk("�������������ʲô��û���õ���");
            im.safeDispose();
        }
	}
}