/*��
 �ű����ܣ��������ӣ�תְ���ͣ�
 */


function start() {
    if (im.getSpace(1) >= 7 && im.getSpace(2) >= 4 && im.getLevel() >= 10) {
        im.gainItem(2431305, -1);
        Gift(im.getJob());
        im.playerMessage(-1, "�͸�����ߣ�����úñ��档");
	im.sendOk("�͸��������ע�����");
	im.dispose();
    } else {
        im.playerMessage(-1, "������ı�������ԣ,�ȼ��ﵽ10����ʹ�á�");
	im.sendOk("�����ȼ��ﵽ10��תְ����ʹ�ã�10����10���ģ�30���Ժ���30���ģ�70���Ժ���70�ģ�100���Ժ���100���� ����ѡ��ȼ�����ʹ��.���߱����ռ䲻��.");
	im.dispose();
    }
    im.dispose();
}

function Gift(job) {
    switch (job) {
        case 100://սʿ        
            im.gainItem(1302135, 1); //��ս֮���ֽ� - 10��
            im.gainItem(1312049, 1) //��ս֮���ָ� - 10��
            im.gainItem(1322077, 1); //��ս֮���ֶ��� - 10��
            break;
        case 1100://����ʿ
        case 5100://�׹���
            im.gainItem(1302135, 1); //��ս֮���ֽ� - 10�� 
            break;
        case 5110:
        case 110:
        case 1110:
        case 6110:
            im.gainItem(1402081, 1);//��ս֮˫�ֽ� - 25�� (������)
            break;
        case 1111:
        case 5111:
        case 111:
        case 6111:
            im.gainItem(1402084, 1);//��ս֮˫�ֽ� - 70�� (������)
            break;
        case 112:
        case 5112:
        case 1112:
        case 6112:
            im.gainItem(1402075, 1);
            break;
        case 120:
            im.gainItem(1402081, 1);
            im.gainItem(1412051, 1);
            break;
        case 121:
            im.gainItem(1402084, 1);
            im.gainItem(1412054, 1);
            break;
        case 122:
            im.gainItem(1422058, 1);
            break;
        case 130:
            im.gainItem(1432071, 1);
            im.gainItem(1442099, 1);
            break;
        case 131:
            im.gainItem(1432074, 1);
            break;
        case 132:
            im.gainItem(1432076, 1);
            break;
        case 1200:
        case 200:
            im.gainItem(1372043, 1);
            break;
        case 1210:
        case 210:
            im.gainItem(1382017, 1);
            break;
        case 1211:
        case 211:
            im.gainItem(1372069, 1);
            break;
        case 1212:
        case 212:
            im.gainItem(1382094, 1);
            break;
        case 220:
            im.gainItem(1382017, 1);
            break;
        case 221:
            im.gainItem(1372069, 1);
            break;
        case 222:
            im.gainItem(1382094, 1);
            break;
        case 230:
            im.gainItem(1382017, 1);
            break;
        case 231:
            im.gainItem(1372069, 1);
            break;
        case 232:
            im.gainItem(1382094, 1);
            break;
        case 1300:
        case 3300:
        case 300:
            im.gainItem(1452093, 1);
            im.gainItem(1462078, 1);
            im.gainItem(2060000, 1000); //��ʸ
            im.gainItem(2061000, 1000); //��ʸ
            break;
        case 1310:
        case 310:
            im.gainItem(1452096, 1);
            break;
        case 1311:
        case 311:
            im.gainItem(1452023, 1);
            break;
        case 1312:
        case 312:
            im.gainItem(1452101, 1);
            break;
        case 3310:
        case 320:
            im.gainItem(1462000, 1);
            break;
        case 3311:
        case 321:
            im.gainItem(1462008, 1);
            break;
        case 3312:
        case 322:
            im.gainItem(1462015, 1);
            break;
        case 1400:
        case 400:
            im.gainItem(1332063, 1); //�̵�
            im.gainItem(1472061, 1); //ȭ��
            break;
        case 1410:
        case 410:
            im.gainItem(1472008, 1);
            break;
        case 1411:
        case 411:
            im.gainItem(1472037, 1);
            break;
        case 1412:
        case 412:
            im.gainItem(1472053, 1);
            break;
        case 420:
            im.gainItem(1332012, 1);
            break;
        case 421:
            im.gainItem(1332036, 1);
            break;
        case 422:
            im.gainItem(1332052, 1);
            break;
        case 430://20
            im.gainItem(1342000, 1);
            im.gainItem(1332008, 1)
            break;
        case 431://30
            im.gainItem(1342001, 1);
            im.gainItem(1332009, 1);
            break;
        case 432://45
            im.gainItem(1342002, 1);
            im.gainItem(1332014, 1)
            break;
        case 433://60
            im.gainItem(1342004, 1);
            im.gainItem(1332015, 1);
            break;
        case 434://100
            im.gainItem(1342008, 1);
            im.gainItem(1332052, 1);
            break;
        case 1500:
            im.gainItem(1482066, 1)
            break;
        case 500:
            im.gainItem(1492066, 1);
            im.gainItem(1482066, 1);
            im.gainItem(2330000, 1000); //���ӵ�
            break;
        case 3500:
            im.gainItem(1492066, 1);
            break;
        case 1510:
        case 510:
            im.gainItem(1492069, 1);
            break;
        case 1511:
        case 511:
            im.gainItem(1492072, 1);
            break;
        case 1512:
        case 512:
            im.gainItem(1492074, 1);
            break;
        case 3510:
            im.gainItem(1492069, 1);
            break;
        case 520:
            im.gainItem(1492069, 1);
            break;
        case 3511:
            im.gainItem(1492072, 1);
            break;
        case 521:
            im.gainItem(1492072, 1);
            break;
        case 3512:
            im.gainItem(1492074, 1);
            break;
        case 522:
            im.gainItem(1492074, 1)
            break;//ð�ռҡ���ʿ�� ��еʦ �������� �������
        case 508://���Ĵ���
            im.gainItem(1492066, 1);
            im.gainItem(2330003, 1000); //���ӵ�
            break;
        case 570:
            im.gainItem(1492069, 1);
            break;
        case 571:
            im.gainItem(1492072, 1);
            break;
        case 572://���Ĵ��˽���
            im.gainItem(1492074, 1)
            break;
        case 2100:
            im.gainItem(1442096, 1);
            break;
        case 2110:
            im.gainItem(1442099, 1);
            break;
        case 2111:
            im.gainItem(1442102, 1);
            break;
        case 2112:
            im.gainItem(1442105, 1);
            break;//ս�񲿷����
        case 2300:
            im.gainItem(1522000, 1);
            im.gainItem(1352000, 1);
            break;
        case 2310:
            im.gainItem(1522004, 1);
            im.gainItem(1352001, 1);
            break;
        case 2311:
            im.gainItem(1522008, 1);
            im.gainItem(1352002, 1);
            break;
        case 2312:
            im.gainItem(1522012, 1);
            im.gainItem(1352003, 1);
            break;//˫�󲿷����
        case 2400:
            im.gainItem(1362000, 1);
            im.gainItem(1352100, 1);
            break;
        case 2410:
            im.gainItem(1362005, 1);
            im.gainItem(1352101, 1);
            break;
        case 2411:
            im.gainItem(1362009, 1);
            im.gainItem(1352102, 1);
            break;
        case 2412:
            im.gainItem(1362013, 1);
            im.gainItem(1352103, 1);
            break;//��Ӱ�������
        case 2700:
            im.gainItem(1212001, 1);
            break;
        case 2710:
            im.gainItem(1212002, 1);
            break;
        case 2711:
            im.gainItem(1212004, 1);
            break;
        case 2712:
            im.gainItem(1212007, 1);
            break;//TODO ҹ�ⲿ�� �Զ���������
        case 3100://��ħ����
            im.gainItem(1322122, 1);
            break;
        case 3110:
            im.gainItem(1322124, 1);
            break;
        case 3111:
            im.gainItem(1322126, 1);
            break;
        case 3112:
            im.gainItem(1322127, 1);
            break;
        case 3200://���鷨ʦ
            im.gainItem(1382085, 1);
            break;
        case 3210:
            im.gainItem(1382088, 1);
            break;
        case 3211:
            im.gainItem(1382091, 1);
            break;
        case 3212:
            im.gainItem(1382094, 1);
            break;
        case 3600://���
            im.gainItem(1242001, 1);
            break;
        case 3610:
            im.gainItem(1242002, 1);
            break;
        case 3611:
            im.gainItem(1242004, 1);
            break;
        case 3612:
            im.gainItem(1242008, 1);
            break;//�������
        case 6100://����սʿ
            im.gainItem(1402177, 1);
            break;
        case 6500:
            im.gainItem(1222001, 1);
            break;
        case 6510:
            im.gainItem(1222002, 1);
            break;
        case 6511:
            im.gainItem(1222004, 1);
            break;
        case 6512:
            im.gainItem(1222008, 1);
            break;
        case 3101:
            im.gainItem(1232001, 1);
            break;
        case 3120:
            im.gainItem(1232002, 1);
            break;
        case 3121:
            im.gainItem(1232004, 1);
            break;
        case 3122:
            im.gainItem(1232008, 1);
            break;
        case 501://������
            im.gainItem(1532045, 1);
            break;
        case 530:
            im.gainItem(1532049, 1);
            break;
        case 531:
            im.gainItem(1532053, 1);
            break;
        case 532:
            im.gainItem(1532057, 1);
            break;
		case 2500:
			im.gainItem(1482066, 1);
			im.gainItem(1353100, 1);
			break;
		case 2510:
			im.gainItem(1482069, 1);
			im.gainItem(1353101, 1);
			break;
		case 2511:
			im.gainItem(1482072, 1);
			im.gainItem(1353102, 1);
			break;
		case 2512:
			im.gainItem(1482074, 1);
			im.gainItem(1353103, 1);
			break;
    }
}
/*
 * 
 * <imgdir name="5620000">
<string name="name" value="˫���籩 20 ��ͨ"/>
<string name="desc" value="���ڡ���Ӱ˫����ְҵ��4תǰ����˳��תְ���ر���ᡣ��100%�ĸ��ʽ�#c˫���籩#����ߵȼ�������20������ʹ�ú�#c���ܵȼ�ֱ�����1��#��\nְҵ��˫���� \n����:���ܵȼ�5���� \n#cÿ����ɫֻ��ʹ��1��"/>
</imgdir>
<imgdir name="5620001">
<string name="name" value="��Ӱ��Ծն 20 ��ͨ"/>
<string name="desc" value="���ڡ���Ӱ˫����ְҵ��4תǰ����˳��תְ���ر���ᡣ��100%�ĸ��ʽ�#c��Ӱ��Ծն#����ߵȼ�������20������ʹ�ú�#c���ܵȼ�ֱ�����1��#��\nְҵ��Ѫ�� \n����:���ܵȼ�5���� \n#cÿ����ɫֻ��ʹ��1��"/>
</imgdir>
<imgdir name="5620002">
<string name="name" value="������� 20 ��ͨ"/>
<string name="desc" value="���ڡ���Ӱ˫����ְҵ��4תǰ����˳��תְ���ر���ᡣ��100%�ĸ��ʽ�#c�������#����ߵȼ�������20������ʹ�ú�#c���ܵȼ�ֱ�����1��#��\nְҵ��Ѫ�� \n����:���ܵȼ�10���� \n#cÿ����ɫֻ��ʹ��1��"/>
</imgdir>
<imgdir name="5620003">
<string name="name" value="Ӱ������ 20 ��ͨ"/>
<string name="desc" value="���ڡ���Ӱ˫����ְҵ��4תǰ����˳��תְ���ر���ᡣ��100%�ĸ��ʽ�#cӰ������#����ߵȼ�������20������ʹ�ú�#c���ܵȼ�ֱ�����1��#��\nְҵ��Ѫ�� \n����:���ܵȼ�10����\n#cÿ����ɫֻ��ʹ��1��"/>
</imgdir>
 */