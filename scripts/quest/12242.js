/**
 *	��ʥ������Ұ����Ϣ
 *	ѯ�ʿ���ʹ����ʥ������֮ʯ�ĵ���
 */

var status = -1;
var selStr01 = "\r\n#e<ʯ����Ժ>\r\n���Ƽ��ȼ�#n   Lv.15 ~ Lv.29\r\n#e��λ��    #n   ������ / ���ִ��ϱ�\r\n#e���ƶ�·��#n   ���ִ�>����ɽ��>�߳�С��>����������>ʯ����Ժ���\r\n#i3800202#\r\n";
var selStr02 = "\r\n#e<Ħ��¥>\r\n���Ƽ��ȼ�#n   Lv.30 ~ Lv.34\r\n#e��λ��    #n   ������ / Ģ��֮�� - Ħ��¥\r\n#e���ƶ�·��#n   ���ִ�>..>Ģ��ɭ��С��>..>��ǽ����>��ǽ��Χ>Ħ��¥\r\n#i3800205#\r\n";
var selStr03 = "\r\n#e<�϶��㳡>\r\n���Ƽ��ȼ�#n   Lv.35 ~ Lv.42\r\n#e��λ��    #n   ������ / �϶��㳡 1��~8��\r\n#e���ƶ�·��#n   �϶�>������Ʊ��>..��������..>�϶��㳡վ>�϶��㳡����>�϶��㳡1��~8��\r\n#i3800203#\r\n";
var selStr04 = "\r\n#e<ʪ��>\r\n���Ƽ��ȼ�#n   Lv.40 ~ Lv.45\r\n#e��λ��    #n   ������ / ����֮�Ƕ���\r\n#e���ƶ�·��#n   ����·��>����֮��>ʪ��\r\n#i3800204#\r\n";
var selStr05 = "\r\n#e<���嶴Ѩ>\r\n���Ƽ��ȼ�#n   Lv.43 ~ Lv.50\r\n#e��λ��    #n   ������ / ����֮�� ʪ�ض���\r\n#e���ƶ�·��#n   ����·��>����֮��>ʪ��>���嶴Ѩ\r\n#i3800218#\r\n";
var selStr06 = "\r\n#e<�������ʥ��>\r\n���Ƽ��ȼ�#n   Lv.45 ~ Lv.50\r\n#e��λ��    #n    ������ / ����֮�Ƕ�Ѩ�\r\n#e���ƶ�·��#n   ����·��>����֮��>ʪ��>���嶴Ѩ>�������ʥ��\r\n#i3800219#\r\n";
var selStr07 = "\r\n#e<������>\r\n���Ƽ��ȼ�#n   Lv.50 ~ Lv.62\r\n#e��λ��    #n   ���ص� / ����ѩ�� / ���֮�Ǳ���\r\n#e���ƶ�·��#n   ���֮��>���֮�ǹ�԰>..��NPC������ѷ��..>������\r\n#i3800207#\r\n";
var selStr08 = "\r\n#e<���֮��ͥԺ>\r\n���Ƽ��ȼ�#n   Lv.50 ~ Lv.55\r\n#e��λ��    #n   ���ص� / ����ѩ�� / ���֮�Ƕ���\r\n#e���ƶ�·��#n   ����·��>..����ͧ��..>���֮��>�Ʋʹ�԰1>��ɫͥԺ��ͨ��>��ɫͥԺ1>��ɫͥԺ2\r\n#i3800206#\r\n";
var selStr09 = "\r\n#e<��ɽ>\r\n���Ƽ��ȼ�#n   Lv.50 ~ Lv.64\r\n#e��λ��    #n   ���ص� / ʱ�侲ֹ֮�� / ͯ���嶫��\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>��߳�>������˹��>ͯ����>��ɽ\r\n#i3800208#";
var selStr10 = "\r\n#e<³˹Τ����ԭ>\r\n���Ƽ��ȼ�#n   Lv.67 ~ Lv.75\r\n#e��λ��    #n   ���ص� / ʱ�侲ֹ֮�� / ���������������\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>��߳�>�����>�����������>���Ƶ���>³˹Τ����ԭ\r\n#i3800209#\r\n";
var selStr11 = "\r\n#e<�����ɽ>\r\n���Ƽ��ȼ�#n   Lv.65 ~ Lv.82\r\n#e��λ��    #n   ���¶�˹̹��������ɽ\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>���¶�˹̹>���¶�˹̹ɢ��·>ǰ����ɽ��·1>ǰ����ɽ��·2>�����ɽ\r\n#i3800210#\r\n";
var selStr12 = "\r\n#e<����֮·>\r\n���Ƽ��ȼ�#n   Lv.71 ~ Lv.84\r\n#e��λ��    #n   ���ص� / �����ɳĮ / ���ﰲ�ر���\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>���ﰲ��>����֮·��������Ƿ���\r\n#i3800211#\r\n";
var selStr13 = "\r\n#e<����������>\r\n���Ƽ��ȼ�#n   Lv.77 ~ Lv.83\r\n#e��λ��    #n   ���ص� / �����Ժ / ���궫��\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>����>������Ժ>����������\r\n#i3800213#\r\n";
var selStr14 = "\r\n#e<���������о���>\r\n���Ƽ��ȼ�#n   Lv.79 ~ Lv.95\r\n#e��λ��    #n   ���ص� / �����ɳĮ / ������ǵ���\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>���ﰲ��>���ﰲ�ر�����>..�����⳵�����գ�..>ɳ���ش�1>�������>�������ذ칫��>���������о���\r\n#i3800212#\r\n";
var selStr15 = "\r\n#e<����Ӻ������ϳ�>\r\n���Ƽ��ȼ�#n   Lv.94 ~ Lv.112\r\n#e��λ��    #n   ���ص� / �����Ժ / �ٲ��ø���\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>����>������Ժ>..�����⳵���ף�..>�ٲ���>ҩ�ݵ�>�۹���>������ʪ��>����Ӻ������ϳ�\r\n#i3800214#\r\n";
var selStr16 = "\r\n#e<������ɭ��>\r\n���Ƽ��ȼ�#n   Lv.113 ~ Lv.121\r\n#e�� ��ġ    #n   ���ø��� / �̳����� / ������ ����\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>��ľ��>��ľ������ɭ��>���ɶ�ɭ�����߾���>��Ƣ��ɭ��>������ɭ��\r\n#i3800215#\r\n";
var selStr17 = "\r\n#e<������ɭ��>\r\n���Ƽ��ȼ�#n   Lv.115 ~ Lv.121\r\n#e��λ��    #n   ��Ԫ֮�� / �ƽ���Ժ\r\n#e���ƶ�·��#n   ������ׯ>..����Ԫ֮����..>�ƽ���Ժ>������ɭ��\r\n#i3800281#\r\n";
var selStr18 = "\r\n#e<����>\r\n���Ƽ��ȼ�#n   Lv.122 ~ Lv.142\r\n#e��λ��    #n   ���ص� / ���ɶ�ɭ�� / ɭ�ֲ������\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>��ľ��>..>���ɶ�ɭ��>..>ɭ�ֲ��>����\r\n#i3800216#\r\n";
var selStr19 = "\r\n#e<׷��֮·>\r\n���Ƽ��ȼ�#n   Lv.140 ~ Lv.150\r\n#e��λ��    #n   ���ص� / ʱ����� / ���ɶ�ɭ����Ժ\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>��ľ��>..��������..>ʱ��������>������>..>׷��֮·\r\n#i3800231#\r\n";
var selStr20 = "\r\n#e<���֮·>\r\n���Ƽ��ȼ�#n   Lv.150 ~ Lv.160\r\n#e��λ��    #n   ���ص� / ʱ����� / ���ɶ�ɭ������\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>��ľ��>..��������..>ʱ��������>������>..>׷��֮·>..>���֮·\r\n#i3800217#\r\n";
var selStr21 = "\r\n#e<��ȴ֮·>\r\n���Ƽ��ȼ�#n   Lv.160 ~ Lv.200\r\n#e��λ��    #n   ���ص� / ʱ����� / ���ɶ�ɭ������\r\n#e���ƶ�·��#n   ���֮��>..����ͧ��..>��ľ��>..��������..>ʱ��������>������>..>׷��֮·>..>���֮·..>��ȴ֮·\r\n#i3800280#";

function start(mode, type, selection) {
    if (status == 0 && mode == 0) {
        qm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendSimple("����������ָ��ͨ�����ԣ�������#b#t4001527##kָ���ĵ�������ʲô�ܰ�æ����\r\n#b#L0#�鿴�����ҵȼ��Ĵ��Գ�#l\r\n#L1#�鿴ȫ�����Գ�#l\r\n#L2#�����Ի�#l");
    } else if (status == 1) {
        switch (selection) {
        case 0:
            var selStr = "���ո����ȼ����Ƽ��Ĵ��Գ����������ˡ�\r\n#b����[W]����鿴�����ͼ��#k\r\n"; //\r\n#b�����Ƽ��Ĵ��Գ����ԵĻ����ɻ�ð����˹�����#e��������#n����
            if (qm.getLevel() >= 15 && qm.getLevel() <= 29) {
                selStr += selStr01;
            }
            if (qm.getLevel() >= 30 && qm.getLevel() <= 34) {
                selStr += selStr02;
            }
            if (qm.getLevel() >= 35 && qm.getLevel() <= 42) {
                selStr += selStr03;
            }
            if (qm.getLevel() >= 40 && qm.getLevel() <= 45) {
                selStr += selStr04;
            }
            if (qm.getLevel() >= 43 && qm.getLevel() <= 50) {
                selStr += selStr05;
            }
            if (qm.getLevel() >= 45 && qm.getLevel() <= 50) {
                selStr += selStr06;
            }
            if (qm.getLevel() >= 50 && qm.getLevel() <= 62) {
                selStr += selStr07;
            }
            if (qm.getLevel() >= 50 && qm.getLevel() <= 55) {
                selStr += selStr08;
            }
            if (qm.getLevel() >= 50 && qm.getLevel() <= 64) {
                selStr += selStr09;
            }
            if (qm.getLevel() >= 67 && qm.getLevel() <= 75) {
                selStr += selStr10;
            }
            if (qm.getLevel() >= 65 && qm.getLevel() <= 82) {
                selStr += selStr11;
            }
            if (qm.getLevel() >= 71 && qm.getLevel() <= 84) {
                selStr += selStr12;
            }
            if (qm.getLevel() >= 77 && qm.getLevel() <= 83) {
                selStr += selStr13;
            }
            if (qm.getLevel() >= 79 && qm.getLevel() <= 95) {
                selStr += selStr14;
            }
            if (qm.getLevel() >= 94 && qm.getLevel() <= 112) {
                selStr += selStr15;
            }
            if (qm.getLevel() >= 113 && qm.getLevel() <= 121) {
                selStr += selStr16;
            }
            if (qm.getLevel() >= 115 && qm.getLevel() <= 121) {
                selStr += selStr17;
            }
            if (qm.getLevel() >= 122 && qm.getLevel() <= 142) {
                selStr += selStr18;
            }
            if (qm.getLevel() >= 140 && qm.getLevel() <= 150) {
                selStr += selStr19;
            }
            if (qm.getLevel() >= 150 && qm.getLevel() <= 160) {
                selStr += selStr20;
            }
            if (qm.getLevel() >= 160 && qm.getLevel() <= 200) {
                selStr += selStr21;
            }
            status = -1;
            qm.sendNext(selStr);
            break;
        case 1:
            var selStr = "���ո����ȼ����Ƽ��Ĵ��Գ����������ˡ�\r\n#b����[W]����鿴�����ͼ��#k\r\n"; 
            if (qm.getLevel() >= 0) {
                selStr += selStr01;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr02;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr03;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr04;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr05;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr06;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr07;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr08;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr09;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr10;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr11;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr12;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr13;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr14;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr15;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr16;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr17;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr18;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr19;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr20;
            }
            if (qm.getLevel() >= 0) {
                selStr += selStr21;
            }
            status = -1;
            qm.sendNext(selStr);
            break;
        case 2:
            qm.dispose();
            break;
        }
    }
}