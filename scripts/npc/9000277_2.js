/*
 * �˲����� ���ð�յ�����������
 * ��ϵQQ��537050710
 * ��ӭ���Ƹ��ֽű�
 * OX�ʴ𸱱�  ������NPC
 */

var status = 0;
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
	"�㰮޹�²���\r\nO:�Ҳ���޹�²�\tX:�Ұ�޹�²�", //false,
        "��ϲ��������\r\nO:�ǳ�ϲ��\tX:ϲ��", //true,
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

var em;

function start() {
    em = cm.getEventManager("OXEvent");
    if (em == null) {
        cm.sendOk("���ִ��������½��븱����");
    } else {
        var QuestionIndex = em.getProperty("question");
        if (QuestionIndex == null) {
            cm.sendOk("ȡ������ʧ�ܡ�");
        } else {
            CheckPlayerPosition(answers[parseInt(QuestionIndex)]);
        }
    }
}


function CheckPlayerPosition(answers) {//ͨ���𰸲鿴��ҵ���վ��λ���Ƿ���ȷ
    var Xpos = cm.getPlayer().getTruePosition().getX();
    if (Xpos >= -562 && Xpos <= 150) {
        if (answers) {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("�š������ش���󣬷����ȥ��");
                cm.getNpcNotice(1540205, "���ź��ء������´��ٽ������ɣ���", 10);//��ʾ10��
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        } else {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
            setEventPoints(20, cm.getPlayer().getId(), 1);
            cm.getPlayer().dropMessage(-1, "��ȡ������� x1��");
            cm.dispose();
        }
    } else if (Xpos >= -1500 && Xpos <= -802) {//O����
        if (answers) {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
             setEventPoints(20, cm.getPlayer().getId(), 1);
            cm.getPlayer().dropMessage(-1, "��ȡ������� x1��");
            cm.dispose();
        } else {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("�š������ش���󣬷����ȥ��");
                cm.getNpcNotice(1540205, "���ź��ء������´��ٽ������ɣ���", 10);//��ʾ10��
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        }
    } else {//����������������֣���������ȥ���
        if (em.getProperty("OXEventState") > 5) {
            cm.warp(910000000, 0);//
            cm.sendOk("�š���������һ���Ի������⣬��վ�м��Ǽ�����˼��");
            cm.getNpcNotice(1540205, "���ź��ء������´��ٽ������ɣ���", 10);//��ʾ10
        } else {
            cm.showEffect(false, "quest/party/wrong_kor");
            cm.playSound(false, "Party1/Failed");
            //cm.sendOk("�š���������һ���Ի������⣬��վ�м��Ǽ�����˼��");
        }
        cm.dispose();
    }
}



function DelEventPoints(Eventid, charid) {
    var delectData = cm.getConnection().prepareStatement("delete from EventTimes where eventid = " + Eventid + " and cid = " + charid + "");
    delectData.executeUpdate(); //ɾ������
}

function getEventTimes(Eventid, charid) {//ͨ��eventid���õ����������Ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i = Times.getString("times");//�õ�����
    }
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//ͨ��eventid���õ����������ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i = Times.getString("points");//�õ�����
    }
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//ͨ��eventid��������������ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // ��������
        insert.setString(1, null); //�����¼ID
        insert.setString(2, Eventid); //����ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, points);//points ����
        insert.setString(6, getEventTimes(1, charid));//times ����
        insert.setString(7, null);//
        insert.executeUpdate(); //����
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//����Ϊ��ʹ��
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
    }
}

function setEventTimes(Eventid, charid, times) {//ͨ��eventid�����ò��������Ĵ���
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // ��ѯ����
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // ��������
        insert.setString(1, null); //�����¼ID
        insert.setString(2, Eventid); //����ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, getEventPoints(2, charid));//points ����
        insert.setString(6, times);//times ����
        insert.setString(7, null);//
        insert.executeUpdate(); //����
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//����Ϊ��ʹ��
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
    }
}