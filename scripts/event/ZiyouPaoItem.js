/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * �����г��ۼƵ��� ����Ʒ
 */
var mapid = 910000000;//���е�ͼ
var map;
var setupTask;
var CharList = new Array();
var ItemNeedQty = 1000;//ȫ����Ҫ�ۼƵ���Ʒ����
var ItemList = Array(
Array(2430456, 999)//itemid,����  999Ϊ�ر� 
//Array(2431944, 999),//140��������
//Array(2431945, 999) //140��������


//Array(5062009, 900), //itemid,����  999Ϊ�ر�
//Array(5062500, 800),
//Array(2340000, 700)
        );
var ��ο���� = 5062009;
var PosList = Array(
        Array(528, 4, "�����г�1��"),
        Array(681, 4, "�����г�2��"),
        Array(825, 4, "�����г�3��"),
        Array(1024, 4, "�����г�4��"),
        Array(1195, 4, "�����г�5��"),
        Array(1349, 4, "�����г�6��"),
        Array(566, -266, "�����г�7��"),
        Array(708, -266, "�����г�8��"),
        Array(850, -266, "�����г�9��"),
        Array(1005, -266, "�����г�10��"),
        Array(1152, -266, "�����г�11��"),
        Array(1297, -266, "�����г�12��")
        );
var dropTimes = 0;

function init() {
    scheduleNew();
    eim = em.newInstance("ZiyouPaoItem")
    map = eim.getMapInstance(mapid);
    em.setProperty("state", "0");
    em.setProperty("dropstart", "false");
    em.setProperty("ItemNeedQty", "" + ItemNeedQty + "");
    dropTimes = 0;
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        //nextTime += 1000 * 20 * 1;//1���ӹ���һ�Ρ�
        nextTime += 1000 * 100 * 1;//5���ӹ���һ�Ρ�
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}


function startEvent() {
    scheduleNew();
    if (em.getProperty("state") == "" + ItemNeedQty + "" && dropTimes == 0) {//ȫ���ۼ��Ѿ��ﵽ������
        em.setProperty("state", "0"); //��ԭ
        em.setProperty("dropstart", "true");
        em.schedule("dropAction", 1000 * 30 * 1);
        em.broadcastServerMsg("[���˱���] ����30���Ӿͻ���1�������г�������ص㱩�����˱��䣬����׼�������𣿣�");
        em.broadcastServerMsg(5122015, "����30���Ӿͻ���1�������г�������ص㱩�����˱��䣬����׼�������𣿣�", true);
        if (em.getChannelServer() != null) {//��ֹ�ض˵�ʱ��һ��Ѵ�
            var allPlayers = em.getChannelServer().getPlayerStorage().getAllCharacters();
        }
        if (allPlayers != null) {
            allPlayers = allPlayers.iterator();
            while (allPlayers.hasNext()) {//ѭ��ÿһ�����
                var player = allPlayers.next();
                player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getPVPClock(3, 30));
                //eim.broadcastPlayerMsg(6, allPlayers.length);
            }
        }
    } else {
        if (dropTimes == 0) {
            em.broadcastServerMsg("[���˱���] ���ڻ��ʼ�ˣ�����1���г�NPC�������ô��ύ�ӹ����б�������Ʒ���Ҷ��ȫ���ۼƴﵽһ�������������������г�������ط�����������ĵ���Ŷ~~���һ����Ŭ���ɣ�");
            em.broadcastServerMsg("[���˱���] Ŀǰȫ������һ���ۼ��� " + em.getProperty("state") + "�������㡣");
        }

    }
}

function dropAction() {
    if (em.getChannelServer().getChannel() == 1) {//ֻ�ڵ�1Ƶ������
        if (dropTimes < 5) {//��������
            dropTimes++;
            var randPos = Math.floor(Math.random() * PosList.length); //�õ��������
            var randItemid = Math.floor(Math.random() * ItemList.length); //�õ��������
            var chance = Math.floor(Math.random() * 999);
            if (chance < ItemList[randItemid][1]) {//��������
                map.spawnAutoDrop(ItemList[randItemid][0], new java.awt.Point(PosList[randPos][0], PosList[randPos][1]));
                em.broadcastServerMsg("�ұ������������Ұɣ�");
            } else {//ÿ�У���ο����
                map.spawnAutoDrop(��ο����, new java.awt.Point(PosList[randPos][0], PosList[randPos][1]));
                em.broadcastServerMsg("�ұ������������Ұɣ�");
            }
            em.broadcastServerMsg("[���˱���] ��1�ߵ�" + PosList[randPos][2] + "�ſڱ��������˱��䡣���˶�������");
            em.broadcastServerMsg(5122015, "��1�ߵ�" + PosList[randPos][2] + "�ſڱ��������˱��䡣���˶�������", true);
            if (dropTimes != 5) {//��������
                em.broadcastServerMsg("[���˱���] ����30���Ӿͻ���1�������г�������ص㱩�����˱��䣬����׼�������𣿣�");
                if (em.getChannelServer() != null) {//��ֹ�ض˵�ʱ��һ��Ѵ�
                    var allPlayers = em.getChannelServer().getPlayerStorage().getAllCharacters();
                }
                if (allPlayers != null) {
                    allPlayers = allPlayers.iterator();
                    while (allPlayers.hasNext()) {//ѭ��ÿһ�����
                        var player = allPlayers.next();
                        player.getClient().getSession().write(Packages.tools.MaplePacketCreator.getPVPClock(3, 30));
                        //eim.broadcastPlayerMsg(6, allPlayers.length);
                    }
                }
                setupTask = em.schedule("dropAction", 1000 * 30 * 1);
            } else {
                dropTimes = 0;
                em.setProperty("dropstart", "false");
                em.broadcastServerMsg(5122015, "���ڻ���������������ռ����߽�����һ�εĻ�ɣ���", true);
                em.broadcastServerMsg("[���˱���] ���ڻ���������������ռ����߽�����һ�εĻ�ɣ���");
            }
        } else {
            dropTimes = 0;
        }
    }
}