 var status = 0;
var random = java.lang.Math.floor(Math.random() * 4);
var eff = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var eff1 = "#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#";

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
        } else if (status == 0) {
        var selStr = "��ӭ���� ���� ð�յ�\r\n\r\n�������Ѿ���������Ϸ:#r"+cm.getGamePoints()+"#k����[Ҫ��������Ϸʱ����]\r\n\r\n��������Ϸ�����Ϣ:\r\n\�ǹ���#r"+cm.getPlayerPoints()+"#k	    �ֽ�:#r"+cm.getHyPay(1)+"#k\r\n��ȯ:#r" + cm.getPlayer().getCSPoints(1) + "#k#k	����ȯ:#r" + cm.getPlayer().getCSPoints(2) + "#k#k\r\n=============================================\r\n\r\n";
        selStr += "#L37##b���˱ص�.����������ǿװ��.�������ٳɳ�#l#k\r\n\r\n";
       //selStr += "#L7##n�ص��г�#l";
    
		//selStr += "#L5##r��ֵ���#l";
		selStr += "#L6##r���10��\t#l";
       		selStr += "#L0##r���ֽ���\t#l";
		selStr += "#L13##r����תְ#l\r\n\r\n\t";

		//selStr += "#L8##bѧϰ����#l";
		//selStr += "#L9##r�鿴����#l";
		//selStr += "#L10##b�����Ӷ#l";
		//selStr += "#L12##b��������#l\r\n\r\n";
		//selStr += "#L14##r���д��#l";
		//selStr += "#L15##r��������#l\r\n\r\n";
		//selStr += "#L16##bÿ�ո���#l\r\n\r\n";
   		 //selStr += "#L1##r�ר��#l";	
		//selStr += "#L2##b�����̵�#l";	
		//selStr += "#L3##n��ϵ�ͷ�#l";
		//selStr += "#L11##r���ܴ���#l";
		//selStr += "#L22##r���ֶһ�#l";
		//selStr += "#L23##r�����һ�#l";
		//selStr += "#L24##r���︴��#l";
		//selStr += "#L17##r����ʱ��#l\r\n\r\n";
		//selStr += "#L18##b��Ϸ�̵�#l";
		//selStr += "#L19##b��������#l";
		//selStr += "#L20##bRED-�̵�#l";
		//selStr += "#L21##bBOSS����#l\r\n\r\n";
		//selStr += "#L25##b�������#l";
		//selStr += "#L26##b�ٱ��齱#l";
        //selStr += "#L27##b�ֿ����#l"
        //selStr += "#L28##b������#l\r\n\r\n"
		//selStr += "#L29##b�˺�Ƥ��#l"
		//selStr += "#L30##b��Ʒ����#l"
		//selStr += "#L31##r����̳�#l"
		//selStr += "#L32##r�ȼ�����#l\r\n\r\n"
		//selStr += "#L33##r���ϵͳ#l"
		//selStr += "#L34##r��Աϵͳ#l"
		//selStr += "#L35##rð��֮��#l"
		//selStr += "#L36##r����н�#l\r\n\r\n"*/
		selStr += " "
        cm.sendSimple(selStr);
    } else if (status == 1) {
        switch (selection) {
        case 0:
			cm.dispose();
			cm.openNpc(9900005);	
            break;
        case 1:
			cm.dispose();
			cm.openNpc(9900001,3000);	
            break;
        case 2:
			cm.dispose();
			cm.openShop(11000);	
		cm.dispose();
            break;
        case 3:
         cm.dispose();
        cm.openWeb("http://jq.qq.com/?_wv=1027&k=cw8waW ");
	    cm.sendOk("��ʲô�������ֱ��QQ��ѯ");			
            break;
        case 4://�����Ӷ�̵�
            cm.dispose();
	    cm.openNpc(9201116);
            break;
        case 5://�ۻ���ֵ
            cm.dispose();
	    cm.openNpc(9310382,709);
            break;
        case 6://���10��
	if(cm.getPlayer().getLevel() <= 10){
		cm.gainExp( + 50000);
		cm.worldMessage("��ϲ�����"+ cm.getChar().getName() +"��10�����������ô���ȡ5W����");
		cm.sendOk("��ϲ����ȡ�ɹ�,10���¶�������������ȡ����");
		}else{
		cm.sendOk("��ĵȼ�����10");
	}
	cm.dispose();
            break;
        case 7://�ص��г�
            if (cm.getPlayer().getMapId() >= 910000000 && cm.getPlayer().getMapId() <= 910000022) {
                cm.sendOk("���Ѿ����г��ˣ�������ʲô��");
            } else {
                cm.saveReturnLocation("FREE_MARKET");
                cm.warp(910000000, "st00");
            }
            cm.dispose();		
            break;
        case 8://ѧ������
			cm.dispose();
			cm.openNpc(9270035, 1);
			break;			
        case 9://�鿴����
            cm.dispose();
            cm.openNpc(9010000, 1);            
			break;
		 case 10://�����Ӷ�̵�
		cm.dispose();
	    cm.openNpc(9030000);	
            break;
		 case 11://���ٴ���
		cm.dispose();
	    cm.openNpc(9270035);				
            break;
		case 12://��������
		cm.dispose();
	    cm.openNpc(9000178);	
            break;
		case 13://����תְ
			cm.dispose();
			cm.openNpc(9900003, 4);
			break;			
		case 14://���д��
			cm.dispose();
			cm.openNpc(9900002, 5);
			break;			
		case 15://��������
            cm.dispose();
			cm.openNpc(9900002,49);
            break;
		case 16://ÿ�ո���
            cm.dispose();
			cm.openNpc(9310058);
            break;
		case 17:
            cm.dispose();
			cm.openNpc(9900002,53);
            break;
		case 18://�ٻ���
			cm.dispose();
			cm.openNpc(1012121);
			break;			
        case 19:
			cm.dispose();
			cm.openNpc(9900004, 3);
            break;	
        case 20://RED�̵�
            cm.dispose();
            cm.openNpc(9900002, 50);
            break;	
        case 21://RED�̵�
            cm.dispose();
            cm.openNpc(9900004, 55);
            break;		
        case 22://RED�̵�
            cm.dispose();
            cm.openNpc(9900002, 43);
            break;	
        case 23://RED�̵�
            cm.dispose();
            cm.openNpc(9900001, 200);
            break;
        case 24://RED�̵�
            cm.dispose();
            cm.openNpc(1032102);
            break;
        case 25://RED�̵�
			cm.dispose();
			cm.sendOk("���������ѯ��\r\n@ranking ���� 1 20 ");
            break;	
        case 26://RED�̵�
			cm.dispose();
			cm.warp(749050400);
			break;
        case 27://RED�̵�
			cm.dispose();
			cm.openNpc(9030100);
            break;	
        case 28://RED�̵�
			cm.dispose();
			cm.openNpc(9073025);
            break;
        case 29://RED�̵�
			cm.dispose();
			cm.openNpc(9900002, 54);
            break;
        case 30://RED�̵�
			cm.dispose();
			cm.openNpc(9900002, 55);
            break;		
        case 31://RED�̵�
			cm.dispose();
			cm.openNpc(9900002, 2);
            break;	
        case 32://RED�̵�
			cm.dispose();
			cm.openNpc(9900002, 12);
            break;	
        case 33://RED�̵�
			cm.dispose();
			if (cm.getMapId() == 680000000) {
				cm.sendOk("���Ѿ��ڽ���ͼ��.");
			} else {
				cm.warp(680000000);
				cm.sendOk("�Ѿ����㴫�͵�����ͼ��\r\n��鿴���Ͻ�NPC�������.\r\n�������İ���.���������������!\r\nף���»����!!!");
				break;
			}		
        case 34://RED�̵�
			cm.dispose();
			cm.openNpc(9000111);
            break;	
        case 35://RED�̵�
			cm.dispose();
			cm.openNpc(9900002, 41);
            break;		
		case 36:
			cm.dispose();
			cm.openNpc(9900002, 8);
			break;	
		case 37:
         if (cm.getPlayer().getLevel() > 9 && cm.getBossLog("��װ��", 1) == 0 && cm.getPlayer().getLevel() < 31) { //cm.getPlayer().getLevel() > 9 && cm.getPlayer().getLevel() < 15) &&
			var ii = cm.getItemInfo();
			var toDrop = ii.randomizeStats(ii.getEquipById(1112919)).copy(); 
            toDrop.setStr(20); //װ������
			toDrop.setDex(15); //װ������
			toDrop.setInt(15); //װ������
			toDrop.setLuk(15); //װ������
			toDrop.setMatk(15); //������
			toDrop.setWatk(15); //ħ������
			toDrop.setSpeed(5); //�ƶ��ٶ�	
			toDrop.setHp(2000);//hp
			toDrop.setMp(2000);//mp
			toDrop.setJump(5); //��Ծ
			toDrop.setAcc(5); //������
			toDrop.setEnhance(25);//ǿ���ȼ�
			toDrop.setPotential1(40086);
			toDrop.setPotential2(30086);
			toDrop.setPotential3(30086);
			toDrop.setOwner("��������");
			cm.addFromDrop(cm.getC(), toDrop, false)	
			cm.setBossLog("��װ��", 1);
			cm.sendOk("��ǿװ���Ѿ���������.��л����֧��.");
            } else {
				cm.sendOk("#r������ʾ������ȡ����Ϊ10--30����\r\n\r\n#b���Ѿ���ȡ���ˣ����ߵȼ�����10��,���ߵȼ�������30��\r\n");
            }
            cm.dispose();
			break;				
		}
    }
}