var a = 0;
var text;
var selects; //��¼��ҵ�ѡ��
var buynum = 0;
var typed = 0; // ��¼���ѡ�������
var itemlist = null;
var searchItemList = null;
var lastItemList = null;
var isSearch = false;
var typeList = Array(
	Array(0, "ñ��"),
	Array(1, "����"),
	Array(2, "��װ"),
	Array(3, "��ȹ"),
	Array(4, "Ь��"),
	Array(5, "����"),
	Array(6, "����"),
	Array(7, "����"),
	Array(8, "��ָ"),
	Array(999, "����")
);
function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
		} else if (a == 0) {
			text = "#h0#����ӭ����#e#r�����װ�̳�#n#k�������԰�ʱװ�����ƽ�������������ѡ�������������\r\n";
			text += "#d#e#L2014#��Ҫ��������#l#k#n\r\n\r\n"
			for(var i=0; i<typeList.length; i++) {
				text += "#b#L"+i+"#"+typeList[i][1]+"#l\t";
				if (!((i+1)%4))
					text +="\r\n";
			}
			cm.sendSimple(text);
        } else if (a == 1) {
			if (selection == 2014) {
				a = 0;
				cm.sendGetText("��������Ҫ�����ĵ�װ���ƣ����Խ���ģ����ѯ");
				isSearch=true;
			} else {
				typed = selection;
				if (isSearch) {
					searchItemList = getItemListByName(cm.getText());
					typed = 9;
					lastItemList = searchItemList;
					text = "#h0#,�������ġ�#r"+cm.getText()+"#k����Ʒ���£�\r\n\r\n#b";
				} else {
					if (itemlist == null)
						itemlist = getItemList();
					lastItemList = itemlist;
					text = "#h0#,������������һ�#e#b�����װ��"+typeList[typed][1]+"��#n#k����ѡ������Ҫ�������Ʒ��\r\n\r\n#b";
				}
				
				if (lastItemList.length<=0)
				{
					a = -1;
					text+="δ�ҵ���Ҫ�ҵ���Ʒ������ϵ����Ա������ӡ�";
				}
				for (var i=0; i<lastItemList.length; i++) {
					if (getItemType(lastItemList[i][0])!=typeList[typed][0] && !isSearch)
						continue;
					text += "#L" + (i) + "##i" + lastItemList[i] + ":##t" + lastItemList[i] + "# - #r"+lastItemList[i][1]+"#bѩ����  \r\n";
				}
				isSearch = false;
				cm.sendSimple(text);
			}
        } else if (a == 2) {
			selects = selection;
            buynum = 1;
            cm.sendYesNo("���빺��" + buynum + "��#r#i" + lastItemList[selects][0] + "##k��\r\n�㽫ʹ�õ�" + (buynum * lastItemList[selects][1]) + "ѩ���ҡ�");
        } else if (a == 3) {
			if (cm.getSpace(1)<1) {
				cm.sendOk('������λ����');
				cm.dispose();
				return;
			}
            if (cm.haveItem(4310014,buynum * lastItemList[selects][1])) {
                cm.gainItem(4310014, -buynum * lastItemList[selects][1]);
                cm.gainItem(lastItemList[selects][0], buynum);
                cm.sendOk("����ɹ��ˣ�");
                cm.dispose();
            } else {
                cm.sendOk("�Բ�����û���㹻��ѩ���ҡ�");
                cm.dispose();
            }
        }
    }//mode
}//f

//��ȡװ������
function getItemType(itemid) {
	var type = Math.floor(itemid/10000);
	switch (type) {
		case 100:
			return 0;  //ñ��
		case 104:
			return 1;  //����
		case 105:
			return 2;  //��װ
		case 106:
			return 3;  //��ȹ
		case 107:
			return 4;  //Ь��
		case 108: 
			return 5;  //����
		case 110:
			return 6;  //����
		case 111:
			return 8;  //��ָ
		default:
			if (type==120)
				return 999;
			if (type==135)
				return 999;
			var type=Math.floor(type/10);
			if (type==12 || type==13 || type==14 || type==15 || type==17) {
				return 7;  //����
			}
			return 999; 
	}
}

//��ȡ�̵��б�
function getItemList() {
	var conn = cm.getConnection();
	var sql = "select itemid, itemprice from npccashshop order by id desc, itemprice asc";
	var pstmt = conn.prepareStatement(sql);
	var rs = pstmt.executeQuery();
	var rsList = Array();
	while(rs.next())
	{
		rsList.push(Array(rs.getInt("itemid"), rs.getInt("itemprice")));
	}
	rs.close();
	pstmt.close();
	//conn.close();
	return rsList;
}
function getItemListByName(name) {
	var conn = cm.getConnection();
	name = name.replaceAll(".*([';]+|(--)+).*", " ");
	var sql = "select itemid, itemprice from npccashshop where itemname like '%"+name+"%' order by id desc, itemprice asc";
	var pstmt = conn.prepareStatement(sql);
	var rs = pstmt.executeQuery();
	var rsList = Array();
	while(rs.next())
	{
		rsList.push(Array(rs.getInt("itemid"), rs.getInt("itemprice")));
	}
	rs.close();
	pstmt.close();
	//conn.close();
	return rsList;
}