/* �Ǳ��̵� - ˫�����߾��鿨 */

var status = -1;

var itemList = Array(
Array(5360015, 30000, 1), //˫�����ʿ�һ��Ȩ
//Array(5211060, 10, 2 * 60 * 60 * 1000), //�������鿨(2Сʱ) 
Array(5210004, 30000, 1), //˫������ֵ��һ��Ȩ(��)
Array(5210002, 30000, 1)  //˫������ֵ��һ��Ȩ(��)
);
var itemId = -1;
var points = -1;
var period = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1] + "#k�Ǳ�#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            itemId = item[0];
            points = item[1];
            period = item[2];
            cm.sendYesNo("���Ƿ���#i" + itemId + ":# #b#t" + itemId + "##k ��Ҫ #r" + points + "#k �Ǳң�");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (itemId <= 0 || points <= 0 || period <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
        //if (cm.getPlayer().getCSPoints(1) >= points) {
	if (cm.getRMB() >= points) {
            if (cm.haveItem(itemId)) {
                cm.sendOk("���Ѿ�ӵ��#i" + itemId + ":# #b#t" + itemId + "##k�����ظ�����");
            } else {
                cm.gainRMB( - points);
                cm.gainItemPeriod(itemId, 1, period);
                cm.sendOk("��ϲ���ɹ�����#i" + itemId + ":# #b#t" + itemId + "##k��");
            }
        } else {
            cm.sendOk("#b��Ǹ,��û����ô��  �Ǳ�,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n����#i" + itemId + ":# #b#t" + itemId + "##k ��Ҫ #r" + points + "#k �Ǳҡ�");
        }
        cm.dispose();
    }
}