/* 160��������˹�̵� */

var status = -1;
var itemList = Array(
Array(1212115, 368), //
Array(1222109, 368), //
Array(1232109, 368), //
Array(1242116, 368), //
Array(1402251, 368), //
Array(1302333, 368), //
Array(1312199, 368), //
Array(1322250, 368), //
Array(1332274, 368), //
Array(1342101, 368), //
Array(1362135, 368), //
Array(1372222, 368), //
Array(1382259, 368), //
Array(1412177, 368), //
Array(1422184, 368), //
Array(1432214, 368), //
Array(1442268, 368), //
Array(1452252, 368), //
Array(1462239, 368), //
Array(1472261, 368), //
Array(1482216, 368), //
Array(1492231, 368), //
Array(1522138, 368), //
Array(1532144, 368), //
Array(1552110, 368), //
Array(1252093, 368), //
Array(1542108, 368), //

//����
Array(1004422, 198), //
Array(1004423, 198), //
Array(1004424, 198), //
Array(1004425, 198), //
Array(1004426, 198), //

Array(1052882, 198), //
Array(1052887, 198), //
Array(1052888, 198), //
Array(1052889, 198), //
Array(1052890, 198), //

Array(1082636, 198), //
Array(1082637, 198), //
Array(1082638, 198), //
Array(1082639, 198), //
Array(1082640, 198), //

Array(1073030, 198), //
Array(1073032, 198), //
Array(1073033, 198), //
Array(1073034, 198), //
Array(1073035, 198), //

Array(1102775, 198), //
Array(1102794, 198), //
Array(1102795, 198), //
Array(1102796, 198), //
Array(1102797, 198), //

Array(1152174, 198), //
Array(1152176, 198), //
Array(1152177, 198), //
Array(1152178, 198), //
Array(1152179, 198) //

);
var selectedItem = -1;
var selectedCost = -1;

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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r \n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#�װ���#r#h ##k���ã���ѡ����ϣ������ĵ��ߣ�";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] +  "##k   #r" + itemList[i][1]  + "#k���#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("���Ƿ���#i" + selectedItem + ":# #b#t" + selectedItem + "##k �� Ҫ #r" + selectedCost + "#k ��");
        } else {
            cm.sendOk("���ִ���...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("������߳��ִ���...");
            cm.dispose();
            return;
        }
        if (cm.getRMB() >= selectedCost  && cm.getSevenDayPayLog(1).get(0) >= 0) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "����̵�", 3, true);
            if (gachaponItem != -1) {
                cm.gainRMB(-selectedCost);
                cm.sendOk("��ϲ���ɹ�����#i" + selectedItem + ":# #b#t" + selectedItem +  "##k��");
            } else {
                cm.sendOk("����ʧ�ܣ�����ȷ���ڱ���������Ŀ�������Ƿ���һ�����ϵĿռ䡣");
            }
        } else {
            cm.sendOk("#b��Ǹ,��û����ô�����,���޷�����.\r\n\r\n\t#r ���ǵķ�����Ҳ����Ҫ�ʽ���ά��,���������Ǳ�ʾ�����Ǹ��.������ͨ������������ȡ������������.лл���ĺ���.\r\n\r\n#b����#i" + selectedItem + ":# #r#t" + selectedItem + "##k #b��Ҫ  #r" + selectedCost + "#k #b��");
        }
        cm.dispose();
    }
}