var status = 0;
var typed=0;
var selStr;
var xold;
var xnew;
var itemtype=0;
var onesel=0;

var items1=new Array("1402220","1422158","1342090","1452226","1482189","1322223","1312173","1332247","1382231","1232084","1522113","1442242","1222084","1212089","1372195","1492199","1432187","1472235","1362109","1462213","1412152","1532118","1242090");
var items2=new Array("1072870","1003976","1052669","1082556","1022211","1132247","1122269","1032224","1152160","1012438","1102623");
var items3=new Array("1112663","1113075","1032223","1122267","1132246","1122143","1122144","1122145","1122146","1122147","1012174");
var items4=new Array("1112734","1202027","1202031","1202035","1202023");



function start() {
    cm.sendNext("#r��õ����߹�������ս��߹�������,��ֻҪ����������ͬ����Ʒ(������Ǳ�ܻ��Ҿ�)���Ϳ��Ժϳɸ��߼��ģ�����˵��һ�£�\r\n--------------------------------------------------#k\r\n�������#b������ͨ����.��ͼ��#k����ô�����Һ��ҽ�����һ������Ϊ��[#r �� #k]����.��ͼ�ڣ������϶�Ҫ#b����ͨ�ĸ�#kӴ\r\n--------------------------------------------------\r\n���������������Ϊ��[ #r��#k ]����.��ͼ�ڣ����Լ������Һϳ�����Ϊ��[ #r��#k ]����.��ͼ��.\r\n--------------------------------------------------\r\n#k�������׺ϳɵķ����˰ɣ�\r\n ������Ҳû��ϵ�������һ��������ʽ�ĺϳ�һ�ѿ���#rע�⣬���ֻ�ܺϳ���Ȼ��װ�����ӹ����Ե�װ���ϳɵĻ����Իᶪʧ��������ע��!!!");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
        } else
            status++;
        if (status == 1){
			cm.sendSimple("Ŀǰֻ������ͼ��/��ָ�ϳɣ�\r\n#rע�⣬���ֻ�ܺϳ���Ȼ��װ�����ӹ�����(�����ӹ�Ǳ��)��װ�������Ժϳɣ��ϳɵĻ�����Ը���������ע��!!!\r\n#b\r\n#L0#>>>>��ͨװ���ϳɢ���װ��#l\r\n#L1#>>>>����װ���ϳɢ���װ��#l\r\n#L2#>>>>����װ���ϳɢ���װ��#l\r\n#L3#>>>>����װ���ϳɢ���װ��#l\r\n#L4#>>>>����װ���ϳɢ���װ��#l\r\n#L5#>>>>����װ���ϳɢ���װ��#l\r\n#L6#>>>>����װ���ϳɢ���װ��#l\r\n#L7#>>>>����װ���ϳɢ���װ��#l\r\n#L8#>>>>����װ���ϳ��ռ�#l");
			
		}else if (status == 2){
			if(selection==0){
				xold=".";
				xnew="��";
			}else if(selection==1){
				xold="��";
				xnew="��";
			}else if(selection==2){
				xold="��";
				xnew="��";
			}else if(selection==3){
				xold="��";
				xnew="��";
			}else if(selection==4){
				xold="��";
				xnew="��";
			}else if(selection==5){
				xold="��";
				xnew="��";
			}else if(selection==6){
				xold="��";
				xnew="��";
			}else if(selection==7){
				xold="��";
				xnew="��";
			}else if(selection==8){
				xold="��";
				xnew="[�ռ�����]";
			}
			cm.sendSimple("��ѡ����Ҫ�ϳɵ����:\r\n#rע�⣬���ֻ�ܺϳ���Ȼ��װ�����ӹ����Ե�װ���ϳɵĻ����Իᶪʧ��������ע��!!!\r\n#b\r\n          #L4#ͼ��/��ָ�ϳ�#l");
		}else if (status == 3){
			selStr = " ��ѡ����Ҫ�ϳɵ�����.ÿ�ϳ�һ�������10��30����.\r\n";
			itemtype=selection;
			if(selection==1){
				for (var i = 0; i < items1.length; i++) {
					selStr += "\r\n#b#L" + i + "#�ϳ�[#d#z" +items1[i]+"##b]"+xnew+" ��Ҫ2�� #d#z"+items1[i]+"##b"+xold+"��#r[��ʼ�ϳ�]#l";
				}
			}
			if(selection==2){
				for (var i = 0; i < items2.length; i++) {
					selStr += "\r\n#b#L" + i + "#�ϳ�[#d#z" +items2[i]+"##b]"+xnew+" ��Ҫ2�� #d#z"+items2[i]+"##b"+xold+"��#r[��ʼ�ϳ�]#l";
				}
			}
			if(selection==3){
				for (var i = 0; i < items3.length; i++) {
					selStr += "\r\n#b#L" + i + "#�ϳ�[#d#z" +items3[i]+"##b]"+xnew+" ��Ҫ2�� #d#z"+items3[i]+"##b"+xold+"��#r[��ʼ�ϳ�]#l";
				}
			}
			if(selection==4){
				for (var i = 0; i < items4.length; i++) {
					selStr += "\r\n#b#L" + i + "#�ϳ�[#d#z" +items4[i]+"##b]"+xnew+" ��Ҫ2�� #d#z"+items4[i]+"##b"+xold+"��#r[��ʼ�ϳ�]#l";
				}
			}
			cm.sendSimple(selStr);
		}else if (status == 4){
			if(itemtype==1){
				onesel=items1[selection];//ѡ�����ƷID
			}
			if(itemtype==2){
				onesel=items2[selection];//ѡ�����ƷID
			}
			if(itemtype==3){
				onesel=items3[selection];//ѡ�����ƷID
			}
			if(itemtype==4){
				onesel=items4[selection];//ѡ�����ƷID
			}
			var inv = cm.getInventory(1);
			var it;
			var itemids;
			var checkitem=0;
			var itemsrc=0;
			var itemsrc2=0;
			for (var i = 0; i <= 96; i++) {
				it = inv.getItem(i);
				if (it != null) {
					itemids = it.getItemId();
					if(itemids==onesel){//����Ƿ���������Ʒ
						if(xold.equals(".")==true){
							if(it.getOwner().length()>0){
							}else{
								checkitem+=1;
								if(checkitem==1){
									itemsrc=i;
								}
								if(checkitem==2){
									itemsrc2=i;
									break;//����FOR
								}
							}
						}else if(it.getOwner().length()>0){//����Ƿ��мӸ��ǵ�
							if(it.getOwner().substring(0, 1).equals(xold)==true){//����Ƿ���ż��ǵ�����
								checkitem+=1;
								if(checkitem==1){
									itemsrc=i;
								}
								if(checkitem==2){
									itemsrc2=i;
									break;//����FOR
								}
							}
						}
					}
				}
			}
			if(checkitem==2){//��⵽��Ʒ����ʼ�ϳɳ���
				var itemd = cm.getInventory(1).getItem(itemsrc).copy();
				itemd.setOwner(xnew);
				var hwchancess= Math.floor(Math.random()*5+5);
				if(itemd.getMatk()!=1000){
					itemd.setMatk(itemd.getMatk()*1+hwchancess);
					itemd.setWatk(itemd.getWatk()*1+hwchancess);
					itemd.setStr(itemd.getStr()*1+hwchancess);
					itemd.setDex(itemd.getDex()*1+hwchancess);
					itemd.setInt(itemd.getInt()*1+hwchancess);
					itemd.setLuk(itemd.getLuk()*1+hwchancess);
				

				}
				var ii = cm.getItemInfo();
				cm.worldMessageYellow("��"+ cm.getChar().getName() +"��ͨ���г�NPC[˹�����] ͼ�ںϳ�ϵͳ�ϳɳɹ�~��ҹ�ϲ��~");
				cm.removeSlot(1, itemsrc, 1)
				cm.removeSlot(1, itemsrc2, 1)
				cm.addFromDrop(cm.getC(), itemd, false);
				cm.sendOk("��ϲ���ϳɳɹ�.\r\n�۳�����#r"+xold+"#v"+onesel+"##k.�ڸ���һ���µ�#r"+xnew+"#v"+onesel+"#.");
			}else{
				cm.sendOk("�Բ�����û������"+xold+"#v"+onesel+"#.���Ժϳ�"+xnew+"#v"+onesel+"#ʧ��.");
			}
			cm.dispose();
			return;
		}//end stats
    }
}