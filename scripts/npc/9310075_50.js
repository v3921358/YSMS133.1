//_ÿ�ն�ʱ����������ȡ���

var status = -1;
var text;

var starttime = "2016-1-1 22:28:00";//�ÿ��ˢ�¿���ʱ��
var endtime = "2016-1-8 00:32:00";//�����ʱ��


var invtype = new Array("װ��", "����", "����", "����", "����");

var maxcount = 20;

var packages1 = new Array(
    Array(5062009, 100),
    Array(5062500, 100),
    Array(5750000, 100)
    );
var packages2 = new Array(
    Array(5062009, 50),
    Array(5062500, 50),
    Array(5250000, 50)
    );
var packages3 = new Array(
    Array(5062009, 10),
    Array(5062500, 10),
    Array(5750000, 10)
    );

function start() {
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

    var currdate = new Date();
    var define_starttime = new Date(Date.parse(starttime.replace(/-/g,"/")));
    var define_endtime =   new Date(Date.parse(endtime.replace(/-/g,"/")));

    if (currdate < define_starttime || currdate > define_endtime) {
        cm.sendOk("�ף���������������ޣ������˾�û����Ŷ\r\n\r\n�ǻʱ�䡭�� \r\n\r\n���ʼʱ�䣺#r" + starttime + "#k\r\n" + "�����ʱ�䣺#r" + endtime);
        cm.dispose();
        return;
    }

    if (status == 0) {
        cm.sendNext("�װ���������ã�������ÿ����ʱ��ȡ�����������\r\n\r\n����������������ڵ���������ȡŶ\r\n\r\n��������ڵ�����᲻���ڸ���,�����˿ɾ�û����Ŷ");
    } else if (status == 1) {
        var count = cm.getEventLogForDay("�����������");
        var packages = new Array();
        var gRMB = false;
        if (count >= 0 && count < 1) {
            packages = packages1;
            gRMB = true;
        } else if (count >= 1 && count < 10) {
            packages = packages2;
        } else if (count >= 10 && count < 20) {
            packages = packages3;
        } else {
            cm.sendOk("�ܱ�Ǹ��������Ѿ�������ϡ�");
            cm.dispose();
            return;
        }

        if (!checkSpace(packages)) {  //�����Ǽ������ģ����˻�ֱ����ʾ��ң���ִ�к���Ĳ�����������Ҫ��ʲô������Ӧ�ü����������
            return;
        }

        if (gRMB) {
            cm.gainRMB(100);
        }

        for (var i in packages) {
            cm.gainItem(packages[i][0], packages[i][1]);
        }
        cm.sendOk("��ȡ���");
        cm.setEventLogForDay("�����������");
        //cm.worldMessageEffect("[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1), 1, 10);
	cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));
	cm.worldSpouseMessage(0x23, "[�����������] ��ϲ" + cm.getName() + "�г�NPC�������ô���ȡ,�������������Ŀǰʣ�� " + (maxcount - count - 1));

        cm.dispose();
    }
}

function checkSpace(packages) {
    var haveSpace = 0;
    var needSpace = new Array(5);
    for (var i = 1; i <= 5; i++) {
        for (var j in packages) {
            needSpace[Math.floor(packages[j][0] / 1000000)] += 1;
        }
    }
    for (var i in needSpace) {
        if (cm.getSpace(i) < needSpace[i]) {
            haveSpace = i;
            break;
        }
    }
    if (haveSpace > 0) {
        cm.sendOk("����#b" + invtype[haveSpace] + "��#kʣ��ռ䲻��" + needSpace[haveSpace] + "��������һ�������ɡ�");
        cm.dispose();
        return false;
    }
    return true;
}