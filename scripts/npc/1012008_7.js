/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * OX�ʴ𸱱�  ���˰����NPC
 * 
 */

var status = 0;
var maxPlay = 50;
var em;
var emgate;
var Eventstatus;

function start() {
    status = -1;
    em = cm.getEventManager("OXEvent");
    emgate = cm.getEventManager("OXEventOpen");
    Eventstatus = "#r�ر�״̬��#k";
    if (em.getProperty("start") == "3") {//�Ѿ��ر������
        Eventstatus = "#e#r���ڽ����С�#n"
    }
    if (em.getProperty("start") == "1") {//
        Eventstatus = "#e#r��������С�#n"
    }
    if (em.getProperty("start") == "2") {//
        Eventstatus = "#e#r�ȴ��볡�С�#n"
    }
    if (em.getProperty("start") == "0") {//�Ѿ��ر������
        Eventstatus = "#e#r�ȴ��볡��#n"
    }
    if (emgate.getProperty("open") == "false") {//
        Eventstatus = "#e#r����Ա�ѹر���ڣ���ֹ���롣#n"
    }
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status >= 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getMap().getId() == 910048100) {
                if (cm.getPlayer().isGM()) {
                    cm.sendSimple("������ʲô�أ�\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n#b#L1# ����鿴����ܡ�\r\n#L2# ���������ս�뿪���#r#e\r\n#L3# �ر���ڣ�������Ա�ɼ���\r\n#L4# ������ڣ�������Ա�ɼ���");
                } else {
                    cm.sendSimple("������ʲô�أ�\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n#b#L1# ����鿴����ܡ�\r\n#L2# ���������ս�뿪���");
                }
            } else if (cm.getMap().getId() == 910048200) {
                cm.sendOk("���~");
                cm.dispose();
            } else {
                if (emgate.getProperty("open") == "false") {//�Ѿ��ر������
                    if (cm.getPlayer().isGM()) {
                        status = 2;
                        cm.sendYesNo("�𾴵Ĺ���Ա�����뿪��OX������������");
                    } else {
                        cm.sendOk("�Ѿ���ʼ�������ڲ��ǻʱ�䡣\r\n���Ժ����ԡ�");
                        cm.dispose();
                    }
                    return;
                }
                if (cm.getBossLog("OX�����") >= maxPlay) {
                    cm.sendOk("�������Ѿ�������" + maxPlay + "�Σ������ٲ���ø����ˣ����������~");
                    cm.dispose();
                    return;
                }
                if (cm.getPlayerCount(910048100) == 0 && (em.getProperty("start") == "3" || em.getProperty("start") == "4")) {//�Ѿ��ر������ ���������Ѿ�û���ˣ�����
                    em.setProperty("OXEventState", "0");
                    em.setProperty("start", "0");
                    em.setProperty("question", "0");
                    em.setProperty("RightAnwser", "0");//�õ��������ȷ��
                    cm.sendOk("�����´���Ŷ~~");
                    cm.dispose();
                    return;
                }
                if (em.getProperty("start") == "3") {//�Ѿ��ر������
                    cm.sendOk("�Ѿ���ʼ��OX����������Ժ�������");
                    cm.dispose();
                    return;
                }

                if (em == null) {
                    cm.sendOk("���ִ��������½��븱����");
                } else {
                    if (cm.getPlayer().isGM()) {
                        cm.sendSimple("#e#r[��ء���ʾ]��#n#b\r\n\t\t\t\t#e<OX�ʴ�>#n\r\n\r\n#dOX�������Ҫ��ʼ�������ڻ��м����ӵĵȴ�ʱ�䡭��\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n\r\n\r\n#b#L0#����μ�<OX�����>��#l\r\n#L1#�����˽�һ�¸û��˵����#l \r\n#L3# �رջ��ڣ�(GM�ɼ�)")

                    }
                    else if (em.getProperty("start") == "2" || em.getProperty("start") == "1") {//�ȴ�״̬
                        cm.sendSimple("#e#r[��ء���ʾ]��#n#b\r\n\t\t\t\t#e<OX�ʴ�>#n\r\n\r\n#dOX�������Ҫ��ʼ�������ڻ��м����ӵĵȴ�ʱ�䡭��\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n\r\n\r\n#b#L0#����μ�<OX�����>��#l\r\n#L1#�����˽�һ�¸û��˵����#l")
                    } else {//��һ���˽����
                        cm.sendSimple("#e#r[��ء���ʾ]��#n#b\r\n\t\t\t\t#e<OX�ʴ�>#n\r\n\r\n#dOX�������Ҫ��ʼ��������\r\nĿǰ�Ļ״̬��" + Eventstatus + "\r\n\r\n\r\n#b#L0#����ִ��<OX�����>��#l\r\n#L1#�����˽�һ�¸û��˵����#l")
                    }
                }
            }
        } else if (status == 1) {
            if (selection == 0) {
                if (em.getProperty("start") == "0") {
                    em.setProperty("start", "1");//���ÿ��أ��Ѿ����Խ����ˡ� ֮��һ������ʱ60�룬�Ⱥ�������ҽ���
                    cm.warp(910048100, "sp");
                    cm.setBossLog("OX�����");
                    cm.getMap().startMapEffect("������3���ӵ�ʱ��Ⱥ�������ң����Ժ�", 5121052);
                    cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������\r\n\r\n�����ͨ�����ҵĿ���Ļ�����������#i2432352# #t2432352# һ����");
                } else if (em.getProperty("start") == "1") {//����Ѿ�����
                    cm.warp(910048100, "sp");
                    cm.setBossLog("OX�����");
                    cm.getMap().startMapEffect("������3���ӵ�ʱ��Ⱥ�������ң����Ժ�", 5121052);
                    cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������\r\n\r\n�����ͨ�����ҵĿ���Ļ�����������#i2432352# #t2432352# һ����");
                } else {//�ȴ�״̬
                    cm.warp(910048100, "sp");
                    cm.setBossLog("OX�����");
                    cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������\r\n\r\n�����ͨ�����ҵĿ���Ļ���������#i2432352# #t2432352# һ����");
                    cm.getPlayer().dropMessage(1, "����Ͽ�ʼ����Ⱥ�������ң�");
                }
                // cm.getNpcNotice(1540104, "[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n#b�������ȵȺ�3��������ӭ���浽����ð�ռҰɣ�#k\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������", 9);//��ʾ180��Ļ����
                cm.safeDispose();
            } else if (selection == 1) {
                cm.sendOk("[��ӭ����OX�ʴ���]\r\n��Һã���ӭ�������\r\n�������ǽ��ش��ʮ���ʴ��⣬�����漰���ܶ෽�棬������ֻ�����ִ𰸣�#b#eO��ȷ��X����#n#k��\r\n��Ŀ���ֵ�ʱ��ѡ����ȷ�𰸣�վ����ȷ��λ�ðɣ�\r\n#e��վ���м��λ�ò��㣬���ᱻ��Ϊ����𰸣�\r\n#n#r ��ǰ5����Ŀ����ܵ�Ӱ�죬�����ں����Ļ����ᱻ����õ�ͼ��������")
                cm.safeDispose();
            } else if (selection == 2) {
                cm.sendYesNo("���Ҫ�뿪�����������Ͳ��ܺʹ��һ�������أ�");
            } else if (selection == 3) {
                emgate.setProperty("open", "false");
                cm.sendOk("�Ѿ��ر�����ڣ�");
                cm.spouseMessage(0x24, "[OX�����] ���ڹ���Ա�Ѿ��ر��˻��ڡ�");
                cm.worldBrodcastEffect(5121052, "[OX�����] ���ڹ���Ա�Ѿ��ر��˻��ڡ�");
                cm.dispose();
            } else if (selection == 4) {
                emgate.setProperty("open", "true");
                cm.sendOk("�Ѿ�������ڣ�");
                cm.spouseMessage(0x24, "[OX�����] ���ڹ���Ա�Ѿ������˻��ڡ�");
                cm.worldBrodcastEffect(5121052, "[OX�����] ���ڹ���Ա�Ѿ������˻��ڡ�");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.warp(910000000, 0);
            cm.dispose();
        } else if (status == 3) {
            emgate.setProperty("open", "true");
            cm.sendOk("�Ѿ���������ڣ�");
            cm.spouseMessage(0x24, "[OX�����] ����Ա�Ѿ������˻��ڣ������ٶȴ������г�NPC�������������ڽ���Ŷ��");
            cm.worldBrodcastEffect(5121052, "����Ա�Ѿ������˻��ڣ������ٶȴ������г�NPC�������������ڽ���Ŷ��");
            cm.dispose();
        }
    }
}