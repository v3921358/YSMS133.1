var status = 0;
var typed=0;
var j = java.lang.Math.floor(Math.random() * 10);

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
			cm.sendSimple("#k>�Ŀ�꣺#b<�ϳ�ð��֮��>#k\r\n\r\n>���������������ӡ�����ѡ����ѡ�ð��֮��\r\n\r\n#k>�ϳɸ��ʣ��ϳ��κ�һ��ð��֮�������ɹ�����Ϊ50%#k\r\n\r\n#b#L1#����ð��֮��#l		  #v1122019#\r\n#L2#��ӡ�ĳ���ð��֮��#l	#v1122024#\r\n#L3#���ѵĳ���ð��֮��#l	#v1122029#\r\n#L4#���ѵĳ���ð��֮��#l	#v1122034#");
		} else if (status == 1) {
			if (selection == 1) {
			cm.sendSimple("#k>�Ŀ�꣺#b<�ϳ�ð��֮��>#k\r\n\r\n>�����������ð��֮��\r\n#b#L1#ȫְҵ����ð��֮��#l");
			} else if (selection == 2) {
			typed=3;
			cm.sendSimple("#k>�Ŀ�꣺#b<�ϳ�ð��֮��>#k\r\n\r\n>���������ӡ�ĳ���ð��֮��\r\n#b			#L2#սʿ��ӡ�ĳ���ð��֮��#l\r\n#L3#��ʦ��ӡ�ĳ���ð��֮��#l #L4#���ַ�ӡ�ĳ���ð��֮��\r\n#L5#������ӡ�ĳ���ð��֮��#l #L6#������ӡ�ĳ���ð��֮��#l");
			} else if (selection == 3) {
			typed=4;
			cm.sendSimple("#k>�Ŀ�꣺#b<�ϳ�ð��֮��>#k\r\n\r\n>����������ѵĳ���ð��֮��\r\n#b			#L2#սʿ���ѵĳ���ð��֮��#l\r\n#L3#��ʦ���ѵĳ���ð��֮��#l #L4#�������ѵĳ���ð��֮��\r\n#L5#�������ѵĳ���ð��֮��#l #L6#�������ѵĳ���ð��֮��#l");
			} else if (selection == 4) {
			typed=5;
			cm.sendSimple("#k>�Ŀ�꣺#b<�ϳ�ð��֮��>#k\r\n\r\n>����������ѵĳ���ð��֮��\r\n#b			#L2#սʿ���ѵĳ���ð��֮��#l\r\n#L3#��ʦ���ѵĳ���ð��֮��#l #L4#���־��ѵĳ���ð��֮��\r\n#L5#�������ѵĳ���ð��֮��#l #L6#�������ѵĳ���ð��֮��#l");
			}
		} else if (status == 2) {
		if(selection == 1){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4001221) >=1 && cm.itemQuantity(4001222) >=1 && cm.itemQuantity(4001223) >=1 && cm.itemQuantity(4001224) >=1 && cm.itemQuantity(4001225) >=1 && cm.itemQuantity(4032177) >=1) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4001221, -1);
                    cm.gainItem(4001222, -1);
                    cm.gainItem(4001223, -1);
                    cm.gainItem(4001224, -1);
                    cm.gainItem(4001225, -1);
                    cm.gainItem(4032177, -1);
					if(j <= 4){
                    cm.gainItem(1122019, 1);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ���ȫְҵ����ð��֮�ģ���ҹ�ϲ��(��)��");
					} else {
		    		cm.worldMessage(cm.getChar().getName() + "�ϳ�ȫְҵ����ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) \r\n#i4001221#(#c4001221#/1) #i4001222#(#c4001222#/1) #i4001223#(#c4001223#/1) #i4001224#(#c4001224#/1) #i4001225#(#c4001225#/1) ");
                    cm.dispose();
		}
		}
		if (typed == 3) {
		if (selection == 2) {
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001226) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001226, -5);
					if(j <= 4){
                    cm.gainItem(1122024, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ���սʿְҵ��ӡ�ĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳ�սʿְҵ��ӡ�ĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001226#(#c4001226#/5)");
                    cm.dispose();
		}
		} else if(selection == 3){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001227) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001227, -5);
					if(j <= 4){
                    cm.gainItem(1122025, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ���ħ��ʦְҵ��ӡ�ĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳ�ħ��ʦְҵ��ӡ�ĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001227#(#c4001227#/5)");
                    cm.dispose();
		}
		} else if(selection == 4){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001228) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001228, -5);
					if(j <= 4){
                    cm.gainItem(1122026, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˹���ְҵ��ӡ�ĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɹ���ְҵ��ӡ�ĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c403277#/1) #i4001228#(#c4001228#/5)");
                    cm.dispose();
		}
		} else if(selection == 5){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001229) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001229, -5);
					if(j <= 4){
                    cm.gainItem(1122027, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˷���ְҵ��ӡ�ĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɷ���ְҵ��ӡ�ĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001229#(#c4001229#/5)");
                    cm.dispose();
		}
		} else if(selection == 6){
                if (cm.itemQuantity(4001220) >=1 && cm.itemQuantity(4032177) >=1 && cm.itemQuantity(4001230) >=5) {
                    cm.gainItem(4001220, -1);
                    cm.gainItem(4032177, -1);
                    cm.gainItem(4001230, -5);
					if(j <= 4){
                    cm.gainItem(1122028, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˺���ְҵ��ӡ�ĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɺ���ְҵ��ӡ�ĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001220#(#c4001220#/1) #i4032177#(#c4032177#/1) #i4001230#(#c4001230#/5)");
                    cm.dispose();
		}
		}
		}
		if (typed == 4) {
		if (selection == 2) {
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001226) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001226, -5);
					if(j <= 4){
                    cm.gainItem(1122029, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ���սʿְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳ�սʿְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001226#(#c4001226#/5)");
                    cm.dispose();
		}
		} else if(selection == 3){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001227) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001227, -5);
					if(j <= 4){
                    cm.gainItem(1122030, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ���ħ��ʦְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳ�ħ��ʦְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001227#(#c4001227#/5)");
                    cm.dispose();
		}
		} else if(selection == 4){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001228) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001228, -5);
					if(j <= 4){
                    cm.gainItem(1122031, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˹���ְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɹ���ְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001228#(#c4001228#/5)");
                    cm.dispose();
		}
		} else if(selection == 5){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001229) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001229, -5);
					if(j <= 4){
                    cm.gainItem(1122032, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˷���ְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɷ���ְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001229#(#c4001229#/5)");
                    cm.dispose();
		}
		} else if(selection == 6){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001230) >=5) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001230, -5);
					if(j <= 4){
                    cm.gainItem(1122033, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˺���ְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɺ���ְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001230#(#c4001230#/5)");
                    cm.dispose();
		}
		}
		}
		if (typed == 5) {
		if (selection == 2) {
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001558) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001558, -7);
					if(j <= 4){
                    cm.gainItem(1122034, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ���սʿְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳ�սʿְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001558#(#c4001558#/7)");
                    cm.dispose();
		}
		} else if(selection == 3){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001559) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001559, -7);
					if(j <= 4){
                    cm.gainItem(1122035, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ���ħ��ʦְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳ�ħ��ʦְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001559#(#c4001559#/7)");
                    cm.dispose();
		}
		} else if(selection == 4){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001560) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001560, -7);
					if(j <= 4){
                    cm.gainItem(1122036, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˹���ְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɹ���ְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001560#(#c4001560#/7)");
                    cm.dispose();
		}
		} else if(selection == 5){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001561) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001561, -7);
					if(j <= 4){
                    cm.gainItem(1122037, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˷���ְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɷ���ְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001561#(#c4001561#/7)");
                    cm.dispose();
		}
		} else if(selection == 6){
                if (cm.itemQuantity(4001563) >=1 && cm.itemQuantity(4033001) >=1 && cm.itemQuantity(4001562) >=7) {
                    cm.gainItem(4001563, -1);
                    cm.gainItem(4033001, -1);
                    cm.gainItem(4001562, -7);
					if(j <= 4){
                    cm.gainItem(1122038, 1,30);
		    		cm.worldMessage(cm.getChar().getName() + "�ɹ��ϳ��˺���ְҵ���ѵĳ���ð��֮�ģ���ҹ�ϲ��(��)��");
					}else{
		    		cm.worldMessage(cm.getChar().getName() + "�ϳɺ���ְҵ���ѵĳ���ð��֮��ʧ���ˣ����Ĭ����(��)��");
					}
                    cm.dispose();
                } else {
                    cm.sendOk("#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n #i4001563#(#c4001563#/1) #i4033001#(#c4033001#/1) #i4001562#(#c4001562#/7)");
                    cm.dispose();
		}
		}
			}
		}
	}
}