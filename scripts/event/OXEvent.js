/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * OX�ʴ𸱱�
 */
var questions = new Array(
        "һ���˴ӷɻ��ϵ�������Ϊʲôûˤ���أ�\r\nO:����\tX:��߷ɻ�", //true,
        "ʲô·��խ��\r\nO:ԩ��·խ\tX:����֮·", //true,
	"������򲻵�ʲô�飿\r\nO:֤��\tX:����", //false,
	"��ʲô����,���ػ�������\r\nO:����\tX:���˯", //false,
	"ʲô�Ʋ��ܺȣ�\r\nO:�ھ�\tX:���", //false,
	"��֪���Ͽ�˯����ʲô������\r\nO:ѧϰ����\tX:û�д������", //false,
        "��һ�����ж�ʮ���죿\r\nO:ÿ��\tX:����", //true,
	"ʲô���Ӵ粽���У�\r\nO:û�����ӵ����г�\tX:�糵", //false,
	"С���Ӳ�����ȴ����ģ����,Ϊʲô��\r\nO:С���Ǹ�����\tX:С��������ѧ��", //false,
        "ʲô��ʼ�ղ���ϴ�裿\r\nO:����\tX:Ӥ��", //true,
        "ʲô��ÿ��ÿ�춼�������������\r\nO:˯��\tX:��", //true,
        "������������������Ҷ�����һ���������������˲���һ������������ʲô��\r\nO:����\tX:����Ϸ", //true,
        "���ػ�������Ķ�����ʲô��\r\nO:���Ƿ\tX:����Ͳ", //true,
	"С���ڼ����˭��������\r\nO:����\tX:�Լ�", //false,
        "���ϡ��ƹϡ����ϡ��Ϲ϶��ܳԣ�ʲô�ϲ��ܳԣ�\r\nO:ɵ��\tX:ľ��", //true,
        "��һ��������ʷ�����ĸ�ʱ����\r\nO:����\tX:����", //true,
	"��һ���񻰼���\r\nO:���μ�\tX:ɽ����", //false,
	"��һ���ʵ��ǣ�\r\nO:�����ʵ�\tX:����", //false,
	"��һ���ֵ��ǣ�\r\nO:�����ʵ�\tX:˵�Ľ���", //false,
	"��һ��ʫ���ܼ��ǣ�\r\nO:��ʫ\tX:ʫ��", //false,
	"��һ����ٿ�ȫ���ǣ�\r\nO:�ٿ�ȫ��\tX:���ִ��", //false,
        "ð�յ���ʲô��Ϸ��\r\nO:��ͨ\tX:����", //true,
        "��������������������ʾ��\r\nO:ǰ��\tX:ͣ��", //true,
	"�������ϴ�����Ȼ�������н�����Ҫ�����ꣿ\r\nO:����500��\tX:����300��", //false,
        "�������������ǣ�\r\nO:Ѫ��\tX:����", //true,
	"��ͷ��Դ�����\r\nO:����\tX:�Ϸ�", //false,
        "������ǹ�������ȡ�ԣ�\r\nO:����\tX:����", //true,
	"�ഫ�ҹ��Ŵ������������衱�����ǣ�\r\nO:����\tX:�Է���", //false,
	"����Ϊʲô����ˢ�ɰ�ɫ��\r\nO:����\tX:���", //false,
        "���շ���ϰ�߽�ָ������ָ�ϱ�ʾ��\r\nO:������\tX:�ѻ�", //true,
        "�׳ơ��Ĳ��󡱵Ķ����ǣ�\r\nO:��¹\tX:����", //true,
        "����������̩�������ĸ����ң�\r\nO:ӡ��\tX:̩��", //true,
	"����ʱ��ʲôɢ�ȣ�\r\nO:Ƥ��\tX:��ͷ", //false,
	"���������������������ж��ٿ��ǣ�\r\nO:60\tX:50", //false,
        "���͵ľ�Ӫ��ʽ��ʲô��\r\nO:ȫ�򻯵�����Ӫ\tX:ȫ�򻯵�ֱӪ����", //true,
	"��ӡ��Ⱥ��λ�����\r\nO:̫ƽ������\tX:����������", //false,
	"������ʲô��\r\nO:��\tX:��", //false,
        "���ɢ����С�������кô���\r\nO:��\tX:û��", //true,
        "ȫ��������ʯ���������\r\nO:�Ĵ���ɽ\tX:�Ĵ���ü", //true,
        "С����ѧ�˸��У�����ѧ�˴�ѧ��������ƾ��ʲô��\r\nO:�Ը��Դ�\tX:��ѧ�ɲ�", //true,
	"����˵1+1����3��ȷ��\r\nO:��\tX:��", //false,
        "���ð�յ�������\r\nO:�ǳ�����\tX:����", //true,
	"ð�յ���ʦ�Ǽ���һת��\r\nO:10��\tX:8��", //false,
	"�㰮�����\r\nO:�Ҳ������\tX:�Ұ����", //false,
        "��ϲ�������\r\nO:�ǳ�ϲ��\tX:ϲ��", //true,
        "�����ƽ��й��������������\r\nO:Ҷ\tX:��", //true,
        "��������ߵ���ʽ����--����������ĸ����ң�\r\nO:������\tX:�й�", //true,
	"���������������ʯ�����ĸ����ң�\r\nO:����\tX:Ӣ��", //false,
	"�Ӻ�ʱ�𣬶����ͳ���߳ơ�������\r\nO:����\tX:��", //false,
        "ʲôʱ���ˮ���ȽϺã�\r\nO:��ǰʳ��\tX:����ʳ��", //true,
	"�й���·��Ʊһ���Ϊ���֣�\r\nO:����\tX:����", //false,
	"�й�����ս���У�����Ϊ�����տ��������й������ǣ�\r\nO:����ʯ\tX:�Ե���", //false,
	"�ɻ�Ʊͷ�Ȳյ�Ʊ��һ��Ϊ��ͨ��Ʊ�۵ģ�\r\nO:200%\tX:150%", //false,
        "���˿���ˣ��ѵ��ݻ��˻�ʹ��˿�ִ����ˣ�����ʱ�ᷢ�֣�\r\nO:�Ʊ�ԭ������\tX:�Ʊ�ԭ������", //true,
        "�������˴����ʲô�ط���\r\nO:�չ����䴦\tX:��ʪ������", //true,
        "���������ᣬ����Ʒ��ʱ������ζ�ģ�\r\nO:������\tX:������", //true,
	"���������ʼ������ʧ�ˣ��ʾֲ����⳥���Σ�\r\nO:�Һ���\tX:ƽ��", //false,
	"���庬ˮ���ٷֱ���ߵ������ǣ�\r\nO:��\tX:����", //false,
	"������ңԶ�ĵط������������裿\r\nO:�������\tX:�ຣ���", //false,
        "��ʿ��Ϊ������������ڣ�\r\nO:�س�\tX:�Ƴ�", //true,
        "������ָ�����������ҵ�ĳ������б�ҵ����\r\nO:1966-1968\tX:1986-1988", //true,
	"������ʲô�滭��ʽ�ļ�����\r\nO:ˮ�ʻ�\tX:����", //false,
	"��������������������裿\r\nO:����\tX:����", //false,
        "����������ˮ���ݸ��ã�\r\nO:��ˮ\tX:��ˮ", //true,
        "�������ֲ�ϵ�������й��˴��ϵ֮�У�\r\nO:����\tX:��", //true,
        "�ƹϲ�������������ʳ����䣿\r\nO:����\tX:����", // true,
        "�ƺ�¥��ʲô�ط���\r\nO:�人\tX:����", //true,
        "��������������ڼ�������\r\nO:����\tX:����", //false,
        "��Ӱ���߼��紫��������\r\nO:��������\tX:������", //true
        "���ɰ���\r\nO:�ɰ�\tX:�ǳ��ɰ�", //false
        "GTO������ʦ���������͵ģ�\r\nO:����\tX�����͵��Ӿ�", //false
        "ҹ���г�Զ������ʲôӰ�죿\r\nO:��������ä\tX:����Ӱ��", //true
        "��������С������ʲô��\r\nO:����\tX:С����", //true
        "�������ܵ�������ʲô��\r\nO:��Ǯ��\tX:����", //false
        "��г�Ÿ������ʱ���ܴﵽ���٣�\r\nO:300\tX:500", //false
        "���ն�����ʲô��\r\nO:����\tX:�ܳ�", //false
        "LOL��Ĵ�����ȫ����ʲô��\r\nO:��ʲ�о�\tX:�޵д���", //true
        "ð�յ���ֻ��ð�ռ�һ�ַ�ʦ��\r\nO:��\tX:����", //false
        "ʱ��100������������ƶ���Ҫ�����ͣ��\r\nO:40-45��\tX:50-60��", //true
        "LOL��Ķ�����ʹ��ʲô��\r\nO:����ʹ\tX:Ī����", //false
        "�ϻ�����ʲô�ද�\r\nO:è�ƶ���\tX:���ж���", //true
        "����Ϊʲô����ģ�\r\nO:������Ϊ��\tX:������Ϊ��", //true
        "һֱ��ģ����δ����Խ��Ϊɶ��\r\nO:̫����\tX:������ģ�²��˵�", //false
        "����?D?·�ɵ�үү��ʲô��\r\nO:����?D?����\tX:����?D?������", //true
        "����?D?·�ɸ�˭ѧ��İ�����\r\nO:���ź����\tX:ڤ������", //false
        "���������ǣ�\r\nO:ģ��\tX:�ձ�Ů��", //false
        "�й�����λ�����\r\nO:�Ĵ�\tX:����", //true
        "ë�󶫹��������\r\nO:��ɳ\tX:��̶", //false
        "��¡ˮ����԰�����\r\nO:����\tX:����" //true
        );
var answers = new Array(true, true, false, false, false, false, true, false, false, true, true, true, true, false, true, true, false, false, false, false, false, true, true, false, true, false, true, false, false, true, true, true, false, false, true, false, false, true, true, true, false, true, false, false, true, true, true, false, false, true, false, false, false, true, true, true, false, false, false, true, true, false, false, true, true, true, true, false, true, false, false, true, true, false, false, false, true, false, true, false, true, true, false, true, false, false, true, false, true);

var asked = new Array();//�ж��Ѿ��ش�ĸ���
var currentQuestion;
var eim;
var mapidPre = 910048000;//׼����ͼ
var mapid = 910048100;//���е�ͼ
var map;
var setupTask;
var setupTaskEvent;

function init() {
    scheduleNew();
    eim = em.newInstance("OXEvent")
    map = eim.getMapInstance(mapid);
    ResetProperty();
}

function ResetProperty() {
    em.setProperty("start", "0");
    em.setProperty("question", "0");
    em.setProperty("RightAnwser", "0");//�õ��������ȷ��
    asked = Array();
    //map.resetFully();
    //setupTaskEvent.cancel(true);
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 1;//1���Ӽ��һ��ʱ��
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}


function startEvent() {
    if (em.getProperty("start") == "1") {//�Ѿ������ú������ҽ����ˡ�
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();//������ͼû�ˣ��Զ��ͷſ�����ڵȴ���һ���˵Ľ��롣
            scheduleNew();
        } else {
            for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
                if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                    map.startMapEffect("������3���ӵ�ʱ��Ⱥ�������ң����Ժ�", 5121052);
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(180));//10��
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 4);//������ʾNPC
                }
            }
            em.broadcastServerMsg("[OX�����] OX������Ѿ���ʼ�ˣ����ڴ�Լ��3���ӵı���ʱ�䣬���ٶȵ�����������");
            em.setProperty("start", "2");//�ȴ�״̬
            setupTaskEvent = em.schedule("WatingStatus", 1000 * 60 * 3, eim);//3���Ӻ�������
        }
    } else if (em.getProperty("start") == "3") {//�ر����״̬
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();//������ͼû�ˣ��Զ��ͷſ�����ڵȴ���һ���˵Ľ��롣
            scheduleNew();
            cancelSchedule();
        }
    } else if (em.getProperty("start") == "4") {//�������״̬
        ResetProperty();//������ͼû�ˣ��Զ��ͷſ�����ڵȴ���һ���˵Ľ��롣
        scheduleNew();
    } else {
        ResetProperty();
        scheduleNew();
    }
}

function WatingStatus(eim) {
    if (em.getProperty("start") == "2") {//�ȴ�״̬
        em.setProperty("start", "3");//�ر���ڣ����������
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();
            scheduleNew();//�ٴ�ѭ��
        }
        if (eim.getMapFactory().getMap(mapid).getCharactersThreadsafe() != 0) {//�����ʼ�˵Ļ�
            setupTaskEvent = em.schedule("QuetionStart", 1000 * 10, eim);//10���������
            for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
                if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(10));//10��
                    //  eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "����10�����⣬������׼����");
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "����10�����⣬������׼����");
                }
            }
            // map.startMapEffect("����10�����⣬������׼����", 5121052);
        } else {
            ResetProperty();
            scheduleNew();//�ٴ�ѭ��
        }
    } else {
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();
            scheduleNew();//�ٴ�ѭ��
        }
    }
}

function QuetionStart(eim) {//�����������
    if (asked.length != 20) {
        currentQuestion = Math.floor(Math.random() * questions.length);
        asked.push(currentQuestion);
        em.setProperty("question", currentQuestion);//�õ������index
        for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 1);//������ʾNPC
            }
        }
        setupTaskEvent = em.schedule("AfterQuestion", 1000 * 15, eim);//15���������
        for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(15));//15��
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "����15��������⣡��վ����ȷ��λ�ã�");
                //    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "����15��������⣡��վ����ȷ��λ�ã�");
            }
        }
        //map.startMapEffect("����30��������⣡��վ����ȷ��λ�ã�", 5121052);
    } else {//�Ѿ��ش���20����Ŀ
        for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "��ϲ����ȫ����20�ʴ����!\r\n����ʵ϶Ի��뿪��ͼ��\r\n�ɸ��ʵ϶Ի��û��ֶһ�������");
            }
        }
        //9000308
        //eim.getMapInstance(mapid).spawnNpc(9000308, new java.awt.Point(-682, 394));
        em.setProperty("start", "4");//�������״̬
        scheduleNew();//�ٴ�ѭ��
    }
    em.setProperty("OXEventState", asked.length);
}

function AfterQuestion(eim) {//�����鲿��
    em.setProperty("question", currentQuestion);//�õ������index
    for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
        eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 2);//������NPC
    }
    for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
            //eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 2);//������NPC
            eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "����5����ٴγ��⣡");
            // eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "����5����ٴγ��⣡");
            eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(5));//5
        }//���ⱨ��
    }
    //map.startMapEffect("����10����ٴγ��⣡", 5121052);
    if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {//���ⱨ��
        setupTaskEvent = em.schedule("QuetionStart", 1000 * 5, eim);//5����ٴγ���
    } else {
        scheduleNew();//�ٴ�ѭ��
        ResetProperty();
    }
}