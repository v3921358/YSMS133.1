/*function start() {
	cm.dispose();
	//cm.openNpc(9900002, 8);
	cm.openNpc(9270035, 2);
}*/


var status = 0;
var ttt ="#fUI/UIWindow/Quest/icon2/7#";//"+ttt+"//����1
var ttt2 ="#fUI/UIWindow/Quest/icon6/7#";////����2
var ttt3 ="#fUI/UIWindow/Quest/icon3/6#";//"+ttt3+"//����Բ
var ttt4 ="#fUI/UIWindow/Quest/icon5/1#";//"+ttt4+"//����New
var ttt5 ="#fUI/UIWindow/Quest/icon0#";////����!
var ttt7 ="#fUI/Basic/BtHide3/mouseOver/0#";//"+ttt6+"//������Ա
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var aa ="#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#";
var hwtext=new Array("�˳���Ư��������Ư����","������ʧȥƤ�����Ŷ���ʲ�����������","�̲���������������'����'��","�㷢ŭһ���ӣ���ʧȥ60����Ҹ���","����������Ů�ˣ��Ӵ�ֻ�м����գ�û�ж����ա�","·����ƽһ���𣬺��������ǰ�ߡ�","�Ҹ��Ǹ��Ƚϼ���Ҫ�ж�����ײŸо��õ���","֪ʶ�����ڿ㣬������������Ҫ","��Ϊʧ�ܵĵ��ͣ���ʵ����̫�ɹ���","Ů��ϲ�����û��������ˣ�����ϲ�������˵�����","�����ˣ��������ٿ�","�������ᣬ��ʪ�����ҵ���","��δ���������ù�ȥ��ȥ","���Ժᵶ����Ц��Ц��֮��ȥ˯��","�����̸���飬̸������Ǯ","�µ���һ���˵Ŀ񻶣�����һȺ�˵Ĺµ�","�㲻�������õģ������������溰�浽","�Ҳ��ǲݴ�����ļ��������ⷢ","��İ�������ģ��ҵ���ȴ����ʱ��","�e�����ĵ�ʱ������ң���Ȼ�Ե����Ƕ����","�㲻�ǵ��ӻ�����Ҫ���Ƕ��Ž㿴","��ʹ����������������ҲҪ�ƻ���ľ","����ֻ����һ��Ƶ�� ��ɺ޵��ǻ�û�й��","�������ı��������ǻ�ı����Ҹ�","Ҫ������ʦ˵����������������Ȼ��������ӳ�ȥ","û����󡣬���Ҳ���į","���ǹ���ҿɳܣ��Ҹ������˷�ֽ","����û�������ֻ�к���ͽ��","����ô��Ǯ Ϊʲô���ù�����ĥ��","����˺͹����Ტ�ۣ����������ҳ�","���������������������ȥ","���������˻�ɴ ��Ҳ����������","����������ܸɵĻ��¶����˰ɣ�û������","������ֻ�������� 1 ��Ҳ���� 2 ��Ҳ����","���⳵˾����˾���е�ս��������Ү! ","˼���ж�Զ����͸��ҹ���Զ!","�������ı������ഺ����,�ഺ��ȴ���ڡ�","��򵥵ĳ����ؾ�:���ֺ�������Ҫ����~","������Ҳ��˵�����ǻ�ûʹ���˼���!","��Ҫ���ұ���,�����ú����","�Ҳ��Ǹ������� ���������������","���»�һ���ĵ��ˣ�������һ���Ķ���","�ϻ������� �㵱����HELLO KITTY��","��������߾��磺��ǽ������ǽ����","үү���Ǵ������߹����ġ���","������ǲ��ã����ʱ�����������綼û�ú�","ûʲô�¾Ͳ�Ҫ���ң������˸���Ҫ���ҡ�","���������������Ѿ����ˡ���","Ǯ���Խ�������ⶼ�������⡣","���ģ��ҵ��·������ˣ�","���Ա������������ʰ���","�����Ҳ�ţ������ɵ�˰ɣ�","���³�������׳������ûǮŮ���֡�","�����ǮҲ��һ�ִ�����Ըһ���ٴ�","���˸���ϴ�ƣ��������Ƶ��������Լ���","�úû��ţ���Ϊ���ǻ����ܾ�!","���ֲ���������ѧ�˼�ͺ����","������ţa��ţc֮���ǻ���","���±������ã�������û�á�","�����ҵ�����ô�࣬�����ϼ�? ","�㷢ȥ���٣�ͷм�����ڣ�","��ɫ��԰�ز�ס�����պ��ӳ�ǽ����","��������Ϊ���һ�ｵһ��","bmw�Ǳ����ң�msn��������","ŮΪ�ü�����,��Ϊ�ü���� ","����ʮ�����飬�����׶�԰�ȽϺû�");

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (cm.getMapId() == 180000001) {
            cm.sendOk("���ź�������ΪΥ���û����򱻽�ֹ��Ϸ���������������ϵ����Ա.")
            cm.dispose();
        } 
    else if (status == 0) {
		//var hwchance= Math.floor(Math.random()*hwtext.length);
		//var selStr = "#d��Ĭʱ��:"+hwtext[hwchance]+"#k\r\n\r\n";
		var selStr = ""+aa+"\r\n";
		selStr += "#b������齱������#r"+ cm.getChar().getBossLog("�������ǳ齱") +" #b��  �ۼƳ齱������ #r" + cm.getBossLog("�ۼ����ǳ齱", 1) + " #b��\r\n";
		selStr += "- #d#eʹ��2���ſڵ�����ת��,�齱��������ȡ��#n#k\r\n";
		selStr += "#rPS���ۼƳ齱ֻ����ȡһ��,�����ÿ�մﵽ��ȡ��#k\r\n\r\n";
		selStr += "#L0#"+ttt6+" #b1). ����齱 #r10#b �ο���ȡ #i5062009# x 50#k#l\r\n";
		selStr += "#L1#"+ttt6+" #b2). ����齱 #r30#b �ο���ȡ #i2049124# x 3#k#l\r\n";
		selStr += "#L2#"+ttt6+" #b3). ����齱 #r50#b �ο���ȡ #i4033204# x 30#k#l\r\n";
		selStr += "#L3#"+ttt6+" #b4). ����齱 #r100#b �ο���ȡ #i2430252# x 1#k#l\r\n";
		selStr += "#L4#"+ttt6+" #b5). ����齱 #r200#b �ο���ȡ #i2430252# x 3#k#l\r\n";
		selStr += "#L5#"+ttt6+" #d6). �ۼƳ齱 #r100#d �ο���ȡ #i4001006# x 120#k#l\r\n";
		selStr += "#L6#"+ttt6+" #d7). �ۼƳ齱 #r200#d �ο���ȡ #i1113038# x 1#k#l\r\n";
		selStr += "#L7#"+ttt6+" #d8). �ۼƳ齱 #r300#d �ο���ȡ #i2432069# x 1#k#l\r\n";
		selStr += "#L8#"+ttt6+" #d9). �ۼƳ齱 #r500#d �ο���ȡ #i2430865# x 30/��#k#l\r\n";
		selStr += "#L9#"+ttt6+"#d10). �ۼƳ齱 #r800#d �ο���ȡ #i3994417# x ��ɫ/��#k#l\r\n";
		selStr += "#L10#"+ttt6+"#d11). �ۼƳ齱 #r1000#d �ο���ȡ #i1112941# ����ר��#k#l\r\n ";
		cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
         if (cm.getBossLog("�������ǳ齱") >= 10 && cm.getBossLog("��10��") < 1 && cm.getSpace(5) > 1) {
		cm.gainItem(5062009, 50);
		cm.setBossLog("��10��");
		cm.sendOk(" #b�ɹ���ȡ�� #i5062009# #z5062009# x 50 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ�˵���齱 10 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b������齱����Ϊ��#r"+ cm.getBossLog("�������ǳ齱") +"#k #b�Σ�Ҫʹ������ת��10�β�����ȡ\r\n\r\n#r�����������Ѿ���ȡ�������������ԡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
        case 1:
	if (cm.getBossLog("�������ǳ齱") >= 30 && cm.getBossLog("��30��") < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2049124, 3);
		cm.setBossLog("��30��");
		cm.sendOk(" #b�ɹ���ȡ�� #i2049124# #z2049124# x 3 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ�˵���齱 30 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b������齱����Ϊ��#r"+ cm.getBossLog("�������ǳ齱") +"#k #b�Σ�Ҫʹ������ת��30�β�����ȡ\r\n\r\n#r�����������Ѿ���ȡ�������������ԡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 2:
	if (cm.getBossLog("�������ǳ齱") >= 50 && cm.getBossLog("��50��") < 1 && cm.getSpace(4) > 1) {
		cm.gainItem(4001006, 80);
		cm.setBossLog("��50��");
		cm.sendOk(" #b�ɹ���ȡ�� #i4001006# #z4001006# x 80 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ�˵���齱 50 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b������齱����Ϊ��#r"+ cm.getBossLog("�������ǳ齱") +"#k #b�Σ�Ҫʹ������ת��50�β�����ȡ\r\n\r\n#r�����������Ѿ���ȡ�������������ԡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 3:
	if (cm.getBossLog("�������ǳ齱") >= 100 && cm.getBossLog("��100��") < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2430252, 1);
		cm.setBossLog("��100��");
		cm.sendOk(" #b�ɹ���ȡ�� #i2430252# #z2430252# x 1 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ�˵���齱 100 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b������齱����Ϊ��#r"+ cm.getBossLog("�������ǳ齱") +"#k #b�Σ�Ҫʹ������ת��100�β�����ȡ\r\n\r\n#r�����������Ѿ���ȡ�������������ԡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 4:
	if (cm.getBossLog("�������ǳ齱") >= 200 && cm.getBossLog("��200��") < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2430252, 3);
		cm.setBossLog("��200��");
		cm.sendOk(" #b�ɹ���ȡ�� #i2430252# #z2430252# x 3 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ�˵���齱 200 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b������齱����Ϊ��#r"+ cm.getBossLog("�������ǳ齱") +"#k #b�Σ�Ҫʹ������ת��200�β�����ȡ\r\n\r\n#r�����������Ѿ���ȡ�������������ԡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 5:
	if (cm.getBossLog("�ۼ����ǳ齱") >= 100 && cm.getBossLog("�ۼ�100��", 1) < 1 && cm.getSpace(4) > 1) {
		cm.gainItem(4001006, 120);
		cm.setBossLog("�ۼ�100��", 1);
		cm.sendOk(" #b�ɹ���ȡ�� #i4001006# #z4001006# x 120 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ���ۼƳ齱 100 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b���ۼƳ齱����Ϊ��#r"+ cm.getBossLog("�ۼ����ǳ齱") +"#k #b�Σ�Ҫʹ������ת��100�β�����ȡ\r\n\r\n#r�������Ѿ���ȡ���������ظ�ʹ�øù����ˡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 6:
	if (cm.getBossLog("�ۼ����ǳ齱") >= 200 && cm.getBossLog("�ۼ�200��", 1) < 1 && cm.getSpace(1) > 1) {
		cm.gainItem(1113038, 1);
		cm.setBossLog("�ۼ�200��", 1);
		cm.sendOk(" #b�ɹ���ȡ�� #i1113038# #z1113038# x 1 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ���ۼƳ齱 200 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b���ۼƳ齱����Ϊ��#r"+ cm.getBossLog("�ۼ����ǳ齱") +"#k #b�Σ�Ҫʹ������ת��200�β�����ȡ\r\n\r\n#r�������Ѿ���ȡ���������ظ�ʹ�øù����ˡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 7:
	if (cm.getBossLog("�ۼ����ǳ齱") >= 300 && cm.getBossLog("�ۼ�300��", 1) < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2432069, 1);
		cm.setBossLog("�ۼ�300��", 1);
		cm.sendOk(" #b�ɹ���ȡ�� #i2432069# #z2432069# x 1 ����");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ���ۼƳ齱 300 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b���ۼƳ齱����Ϊ��#r"+ cm.getBossLog("�ۼ����ǳ齱") +"#k #b�Σ�Ҫʹ������ת��300�β�����ȡ\r\n\r\n#r�������Ѿ���ȡ���������ظ�ʹ�øù����ˡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 8:
	if (cm.getBossLog("�ۼ����ǳ齱") >= 500 && cm.getBossLog("�ۼ�500��", 1) < 1 && cm.haveItem(2430865) < 1 && cm.getSpace(2) > 1) {
		cm.gainItem(2430865, 1, 30);
		cm.setBossLog("���ƶ����", 1, 1);
		cm.resetBossLog("���ʮ��", 1);
		cm.setBossLog("�ۼ�500��", 1);
		cm.sendOk(" #b�ɹ���ȡ�� #i2430865# #z2430865# x 50 �졣");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ���ۼƳ齱 500 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b���ۼƳ齱����Ϊ��#r"+ cm.getBossLog("�ۼ����ǳ齱") +"#k #b�Σ�Ҫʹ������ת��500�β�����ȡ\r\n\r\n#r�������Ѿ���ȡ���������ظ�ʹ�øù����ˡ�\r\n\r\n��Ʒ���û�е��ڣ��޷��ٴ���ȡ��\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 9:
	if (cm.getBossLog("�ۼ����ǳ齱") >= 800 && cm.getBossLog("�ۼ�800��", 1) < 1 && cm.getSpace(3) > 6) {
		cm.gainItem(3994417, 1);
		cm.gainItem(3994418, 1);
		cm.gainItem(3994419, 1);
		cm.gainItem(3994420, 1);
		cm.gainItem(3994421, 1);
		cm.gainItem(3994422, 1);
		cm.setBossLog("�ۼ�800��", 1);
		cm.sendOk(" #b�ɹ���ȡ�ˣ�\r\n#i3994417# #z3994417# x 1\r\n#i3994418# #z3994418# x 1\r\n#i3994419# #z3994419# x 1\r\n#i3994420# #z3994420# x 1\r\n#i3994421# #z3994421# x 1\r\n#i3994422# #z3994422# x 1\r\n��");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ���ۼƳ齱 800 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b���ۼƳ齱����Ϊ��#r"+ cm.getBossLog("�ۼ����ǳ齱") +"#k #b�Σ�Ҫʹ������ת��800�β�����ȡ\r\n\r\n#r�������Ѿ���ȡ���������ظ�ʹ�øù����ˡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;
	case 10:
	if (cm.getBossLog("�ۼ����ǳ齱") >= 1000 && cm.getBossLog("�ۼ�1000��", 1) < 1 && cm.getSpace(1) > 1) {
		cm.setBossLog("�ۼ�1000��", 1);
		var ii = cm.getItemInfo();					
		var toDrop = ii.randomizeStats(ii.getEquipById(1112941)).copy(); // ����һ��Equip��             
		toDrop.setStr(100); //װ������
		toDrop.setDex(100); //װ������
		toDrop.setInt(100); //װ������
		toDrop.setLuk(100); //װ������
		toDrop.setMatk(100); //ħ������
		toDrop.setWatk(100); //������ 
		toDrop.setOwner("����ר��");
		cm.addFromDrop(cm.getC(),toDrop,false); 
		cm.sendOk(" #b�ɹ���ȡ��#i1112941# x 1��");
		cm.worldSpouseMessage(0x25, "������ת�̽����� : ��� " + cm.getChar().getName() + " ��ȡ���ۼƳ齱 1000 �εĽ�Ʒ.");
		cm.dispose();
	} else {
	    cm.sendOk(""+aa+"\r\n\r\n#b���ۼƳ齱����Ϊ��#r"+ cm.getBossLog("�ۼ����ǳ齱") +"#k #b�Σ�Ҫʹ������ת��1000�β�����ȡ\r\n\r\n#r�������Ѿ���ȡ���������ظ�ʹ�øù����ˡ�\r\n#d����������������������һ�¡�");
	    cm.dispose();
	}
            break;













}
    }
}
