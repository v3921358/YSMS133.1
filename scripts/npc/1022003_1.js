var status = 0;
//��ѡ���װ���б�
var selectedList = Array();
//ɸѡ��ı���װ���б�
var newItemList = Array();
var itemBorder = "#fUI/UIWindow.img/Item/New/inventory/0#";
var itemMaster = "#fUI/UIWindow.img/Item/activeExpChairIcon#"
var itemIcon = "#fUI/Basic.img/Cursor/32/0#";
var numArr = Array(
	"#fUI/Basic.img/LevelNo/0#",
	"#fUI/Basic.img/LevelNo/1#",
	"#fUI/Basic.img/LevelNo/2#",
	"#fUI/Basic.img/LevelNo/3#",
	"#fUI/Basic.img/LevelNo/4#",
	"#fUI/Basic.img/LevelNo/5#",
	"#fUI/Basic.img/LevelNo/6#",
	"#fUI/Basic.img/LevelNo/7#",
	"#fUI/Basic.img/LevelNo/8#",
	"#fUI/Basic.img/LevelNo/9#"
);
var btnOk="#fUI/CashShop.img/CSCoupon/BtOK/normal/0#";
var btnOk_disabled="#fUI/CashShop.img/CSCoupon/BtOK/disabled/0#";
var startIcon = "#fUI/Basic.img/icon/arrow#";
//װ����˳��
var selectedPosition = 0;
//���λ
var step = 0;
//�ɹ���
var successRate = 0;
//����
var cost = 0;
var haveLuck = false;
var useLuck = false;
var sflag = false;
//װ���ȼ�
var grade = Array(
	"����ͨ��",
	"�ﾫ�¡�",
	"����Ͼ��",
	"���鶯��",
	"�﴿���",
	"��������",
	"����ʥ��"
);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
		if (haveLuck && mode == 0) {
			useLuck = false;
			status=0;
			mode = 1;
		} else if (haveLuck && mode == 1) {
			useLuck = true;
		}
        if (mode == 0 && status == 0) {
			cm.dispose();
            return;
        }
		if (mode == 0 && status == -1) {
			cm.dispose();
            return;
        }
		//���ӵ�лƽ��㣬���ҵ��˷�
		
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			if (step==1) {
				//�����װ��
				if (selectedPosition == 0)
					selectedList.splice(0,4);
				//���뵽��ѡװ���б�
				if (selection!=-1)
					selectedList[selectedPosition] = Array(selection, newItemList[selection]);
				//���ñ��
				step=0;
				//����ɹ���
				successRate = getSuccessRate();
				//�������
				cost = getCost();
			}
			var text = "#e��\t\t     �� "+itemIcon+"װ��ǿ�� ��   \t\t\t��#n\r\n\r\n";
			for (var i=0; i<5; i++) {
				if (selectedList[i]!=null)
					text+="#L"+i+"##v"+selectedList[i][1]+"##l";
				else
					if (i==0)
						text+="#L"+i+"#"+itemMaster+"#l";
					else
						text+="#L"+i+"#"+itemBorder+"#l";
			}
			text += "#e\r\n\r\n\r\n��\t\t\t\t\t\t\t\t\t\t\t��#n";
			//��ʾ�Ѿ�ѡ���װ����Ϣ
			if (selectedList.length >= 1) {
				text += "#k\r\n#e��\t\t     �� �Ѿ�ѡ���װ����Ϣ ��   \t\t��#n\r\n\r\n";
				for(var key in selectedList) {
					var item = cm.getInventory(1).getItem(selectedList[key][0]);
					var owner=item.getOwner();
					var flag=0;
					for(var i=0; i<grade.length; i++) {
						if (owner==grade[i])
							break;
						flag++;
					}
					if (flag>=grade.length) 
						owner = grade[0];
					var itemSeq = "��";
					if (key>=1)
						itemSeq = "#k��";
					var itemLevel = item.getLevel();
					var itemLevelStr = "";
					if (itemLevel != 0)
						itemLevelStr = " (+"+itemLevel+")";
					text+="\t"+itemSeq+": #r["+owner+"]#n Lv."+cm.getReqLevel(item.getItemId())+" #d#e"+cm.getItemName(item.getItemId())+"#n"+itemLevelStr+"\r\n";
				}
				text += "#e\r\n��\t\t\t\t\t\t\t\t\t\t\t��#n";
			}
			//��ʾ�����ĺϳɳɹ����Լ�����Ҫ�ķ���
			text += "\r\n#b"+startIcon+" ǿ���ɹ��ʣ�"+successRate+"%\t\t\t"+startIcon+" ������ã�"+cost+"���\r\n";
			//��ʾȷ����ť
			var lastBtn = btnOk_disabled;
			if (selectedList.length >= 2)  {
				lastBtn = btnOk;
			}
			text += "#k\t\t\t\t#L999##d#e"+lastBtn+"#l\r\n\r\n";
			//��������
			text += "#k\r\n#e��\t\t\t     �� �������� ��   \t\t\t��#n\r\n";
			text += "\t#b"+numArr[1]+" �ϳ�ǰ��������ϸ�Ķ��ϳ�˵����\r\n\t"+numArr[2]+" ��һ��λ��ѡ����Ҫ����Ʒ������װ����\r\n\t#r"+numArr[3]+" �����װ���䶯����װ����Ҫ����ѡ��\r\n\t"+numArr[4]+" ѡ��װ��ʱ��װ��������˳�������ݱ������˳��\r\n\t"+numArr[5]+" ѡ������󣬵����ȷ�ϡ�����װ���ϳ�#k";
			text += "#e\r\n��\t\t\t\t\t\t\t\t\t\t\t��#n";
			cm.sendSimple(text);
		} else if (status==1){
			//װ���ϳ��߼�����
			if (sflag)
				selection=999;
			if (selection == 999) {
				sflag=true;
				if (selectedList.length < 2) {
					cm.sendPrev("�޷��ϳɣ������ٷ���һ����װ��");
				} else {
					if (cm.haveItem(4000517) && !haveLuck) {
						status=0;
						haveLuck = true;
						cm.sendYesNo("���ı�����ӵ��#v4000517##b�ƽ���#k���ߣ��Ƿ�ʹ��#b�ƽ���#k���ɹ���������#b#e"+(successRate+15)+"%#n#k��\r\n\r\n#d#eѡ�������#r"+successRate+"%#d�ĳɹ��ʼ���ǿ����#n#k");
					} else {
						if (cm.getPlayer().getCSPoints(1)<cost) {
							cm.sendOk("���ĵ������");
							cm.dispose();
							return;
						}
						//��װ����Ϣ
						var masterItemId = selectedList[0][1];
						var masterItemPosition = selectedList[0][0];
						var masterItemReqLevel = cm.getReqLevel(masterItemId);
						//װ����������Ʒ��
						var nextGrade=Math.floor(getGrade(masterItemPosition))+1;
						if (nextGrade >= (grade.length)) {
							cm.sendOk("����װ���Ѿ��ﵽ���Ʒ�����޷��ٽ��кϳɡ�");
							cm.dispose();
							return;
						}
						//��Ծ
						cm.finishActivity(120114);
						//�۳�����
						cm.gainNX(1, -cost);
						//�ϳ�ʧ��
						var chance = Math.floor(Math.random()*100);
						successRate = (useLuck) ? successRate+15 : successRate;
						if (useLuck) {
							cm.gainItem(4000517, -1);
						}
						if (chance > successRate) {
							var indexof = 0;
							for(var key in selectedList) {
								if (key==0)
									continue;
								var breakRate = Math.floor(Math.random()*100);
								if (breakRate <= 50) {
									indexof++;
									cm.removeSlot(1, selectedList[key][0], 1);
								}
							}
							var text = "���ҵ��ǣ���װ��������~����Ŭ���ɣ�";
							if (indexof > 0)
								text = "#r"+indexof+"#k����װ����ʧ�ˣ�����ģ���������ӻ����أ�";
							cm.sendOk("�治�����ϳ�ʧ���ˡ�"+text);
							cm.dispose();
							return;
						}
						//�ϳɳɹ�����
						var item = cm.getInventory(1).getItem(masterItemPosition);
						var ii = cm.getItemInfo();
						var toDrop = item.copy();
						//װ����������������
						var atkPoints = nextGrade*Math.round((masterItemReqLevel/30));
						//����װ������
						toDrop.setOwner(grade[nextGrade]);
						toDrop.setStr(item.getStr()+nextGrade);
						toDrop.setDex(item.getDex()+nextGrade);
						toDrop.setInt(item.getInt()+nextGrade);
						toDrop.setLuk(item.getLuk()+nextGrade);
						toDrop.setWatk(item.getWatk()+atkPoints);
						toDrop.setMatk(item.getMatk()+atkPoints);
						for(var key in selectedList) {
							cm.removeSlot(1, selectedList[key][0], 1)
						}
						cm.addFromDrop(cm.getC(), toDrop, false);
						var text = "#b����#r+"+nextGrade+"\r\n";
						text += "#b����#r+"+nextGrade+"\r\n";
						text += "#b����#r+"+nextGrade+"\r\n";
						text += "#b����#r+"+nextGrade+"\r\n";
						text += "#b������#r+"+atkPoints+"\r\n";
						text += "#bħ����#r+"+atkPoints+"\r\n";
						cm.sendOk("#r#eǿ���ɹ���#n#k����ǿ��Ϊ����װ��#d[#v"+masterItemId+"#]#k������\r\n#k"+text);
						sflag=false;
						if (nextGrade>3)
							cm.worldMessageItem("[װ���ϳ�] : " + "��ϲ[" + cm.getPlayer().getName() + "]�ϳɳ� " + grade[nextGrade] + "�� "+cm.getItemName(masterItemId), toDrop);
							//cm.worldSpouseMessage(0x15, "[װ���ϳ�] : ��ϲ " + cm.getChar().getName() + " �ϳɳ� " + grade[nextGrade] + "�� "+cm.getItemName(masterItemId));
						cm.dispose();
					}
				}
			} else {
				//ѡ��װ������
				selectedPosition = selection;
				if (selectedPosition!=0 && selectedList[0]==null) {
					cm.sendPrev("����ѡ����װ����");
				} else {
					inventoryType = 1;
					var list = cm.getInventory(inventoryType).list();
					var itemList = list.iterator();
					text = "#e����ɸѡ������Ϊ���з���ǿ���ϳ�������#r��װ��#n\r\n\r\n#b";
					if (selectedPosition==0) {
						text="#e#d��ѡ����Ҫ����ǿ���ϳɵ�#r��װ����#n\r\n\r\n#b";
					}
					var indexof = 1;
					newItemList = Array();
					while (itemList.hasNext()) {
						var item = itemList.next();
						//�����ֽ�װ��
						if (cm.isCash(item.getItemId())) 
							continue;
						//���˲��ܲ���ϳɲ�λ
						if (getItemType(item.getItemId())==-1)
							continue; 
						//����С��135����װ��
						var getViceReqLevel = cm.getReqLevel(item.getItemId());
						if (getViceReqLevel < 135) 
							continue;
						//���˵ȼ���װ��
						if (selectedPosition != 0) {
							var getMasterReqLevel = cm.getReqLevel(selectedList[0][1]);
							var getMasterGrade = getGrade(selectedList[0][0]);
							var getViceGrade = getGrade(item.getPosition());
							if (getViceGrade < getMasterGrade)
								continue;
							var levelDifference = (getMasterReqLevel - getViceReqLevel);
							//���˵ȼ���
							if (levelDifference > 10 || levelDifference < -10)
								continue;
							var getMasterItemType = getItemType(selectedList[0][1]);
							//����Ʒ��
							var getViceItemType = getItemType(item.getItemId());
							if (getMasterItemType != getViceItemType)
								continue;
						}
						//������ѡװ��
						var flag=0;
						for(var key in selectedList) {
							if (item.getPosition() == selectedList[key][0])
							{
								flag = 1;
								break;
							}
						}
						if (flag==1)
							continue;
						newItemList[item.getPosition()]=item.getItemId();
					}
					for(var key in newItemList) {
						text += "#L" + key + "##v" + newItemList[key] + "#";
						if (indexof > 1 && indexof % 5 == 0) {
							text += "\r\n";
						}
						indexof++;
					}
					status = -1;
					step=1;
					if (newItemList.length <= 0) {
						text = "#rû�п��Խ��кϳɵĸ�װ��#k"
					}
					cm.sendSimple(text);
				}
			}
		}
    }
}
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
		default:
			if (type==120)
				return -1;
			if (type==135)
				return -1;
			var type=Math.floor(type/10);
			if (type==12 || type==13 || type==14 || type==15 || type==17) {
				return 7;  //����
			}
			return -1; 
	}
}
//����ɹ���
function getSuccessRate() {
	var count=0;
	for(var key in selectedList) {
		if (selectedList[key]!=null && selectedList[key] != "")
			count++;
	}
	switch(count) {
		case 2:
			return 24;
		case 3:
			return 36;
		case 4:
			return 58;
		case 5:
			return 85;
		default:
			return 0;
	}
}
//�������
function getCost() {
	//װ��������*��װ���ȼ�*Ʒ��+1
	var itemTotalReqLevel = 0;
	for (var i in selectedList) {
		//java.lang.System.out.println("xx:"+selectedList[i][1]);
		itemTotalReqLevel += cm.getReqLevel(selectedList[i][1])*1;
	}
	var baseCost = (itemTotalReqLevel)+cm.getReqLevel(selectedList[0][1])*(parseInt(getGrade(selectedList[0][0]))+1)*2;
	return baseCost;
}
//��ȡװ��Ʒ��
function getGrade(equipPosition) {
	if (equipPosition!=null) {
		var item = cm.getInventory(1).getItem(equipPosition);
		var itemGrade=item.getOwner();
		if (itemGrade == null || itemGrade == "")
			return 0;
		for(var k in grade) {
			if (itemGrade==grade[k])
				return k;
		}
	}
	return 0;
}