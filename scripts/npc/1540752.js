/*
 * ˹��11�س������� ���ƹ���
 * Event�еĺ������ڸ��ӣ�ֱ����ת��NPC����
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 */
//������
var l = "#fUI/mapleBingo.img/mapleBingo/Gage/leftGage#";
var m = "#fUI/mapleBingo.img/mapleBingo/Gage/middleGage#";
var r = "#fUI/mapleBingo.img/mapleBingo/Gage/rightGage#";

var status = 0;
var typed;

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
            var em = cm.getEventManager("siwu");
            var eim = em.getInstance("siwu")
            if (eim == null) {
                cm.warp(910000000, 0);
                cm.dispose();
            } else {
                if (em.getProperty("state") == "100") {
                    cm.sendPlayerToNpc("��ߺ���ûʲô���ˣ����ǰ����һ����ͼ�ɣ�");
                    cm.dispose();
                } else {
                    var PartyPoint = 0;
                    for (var i = 0; i < eim.getPlayerCount(); i++) {
                        PartyPoint += parseInt(eim.getKillCount(eim.getPlayers().get(i)));//��ӵ����ļӵ�һ��
                    }
                    if (PartyPoint >= 314) {
                        clear();//ͨ��Ч��
                        em.setProperty("state", "100");//����
                        cm.sendPlayerToNpc("����ֵ�����ռ����ˣ���������һ����ͼ�ɡ�\r\n��#r�����Ͻ��ߣ�����Ϳ��Ե�����һ����ͼ���ء�������")
                        cm.dispose();
                    } else {
                        var text = "#e���Ƹ��޷��ƶ�������������������#n\r\n#r�ҿ���Ҫȥ����һ�¹�����#e�ɼ�����#n������#b\r\n\r\n\r\n>>>>>>>>>> Ŀǰ������������(����ռ��һ��) <<<<<<<<<<<<\r\n" + l;
                        for (var i = 0; i < PartyPoint; i++) {//��������һ�иպ�314
                            text += m;
                        }
                        text += r;
                        cm.sendPlayerToNpc(text);
                        cm.dispose();
                    }
                }
            }
        }
    }
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}