/* ?????̵? */

var status = -1;
var itemList = Array(
Array(1002846, 10000), //??????˿??????ñ
Array(1050152, 10000), //ˮ????(??)
Array(1051180, 10000), //ˮ????(Ů)
Array(1042104, 10000), //С??ҶT??
Array(1042105, 10000), //С??ҶT??
Array(1002845, 10000), //?ۺ??ö?ñ
Array(1052224, 10000), //??ݮbabyװ
Array(1702228, 10000), //?ɿ??㽶
Array(1002721, 10000), //??ë????
Array(1002568, 10000), //?ֹ???֯????
Array(1702155, 30000), //Ѥ???ʺ?
Array(1042142, 30000), //?ʺ???????
Array(1062093, 30000), //???????ж̿?
Array(1112904, 30000), //?ʺ??ǻ??ƽ?ָ
Array(1041142, 20000), //???ǵ???????
Array(1061148, 20000), //???Ƿ?ɫ??ȹ
Array(1702182, 20000), //??????????
Array(1002888, 10000), //˿??????(??ɫ)
Array(1002890, 10000), //˿??????(??ɫ)
Array(1052200, 10000), //??????ɫ?????׷?
Array(1702208, 10000), //????????
Array(1002863, 20000), //С???ܿɰ?ñ
Array(1052061, 20000), //??????????No.9
Array(1052059, 20000), //??????????No.14
Array(1003207, 20000), //???ܲ??ñ?ըͷ
Array(1702285, 20000), //??ɫ????????????
Array(1012131, 30000), //?ð׵???
Array(1702302, 10000), //????
Array(1072337, 20000), //ϲ??????Ь
Array(1112238, 30000), //ˮī????????ָ
Array(1112135, 30000), //ˮī????Ƭ??ָ
Array(1702261, 30000), //ӣ????
Array(1702091, 20000), //??????
Array(1702168, 20000), //????ʥ????
Array(1003051, 20000), //С????
Array(1003048, 20000), //ʥ??װ??ñ
Array(1002995, 10000), //?ʼҺ???ñ
Array(1003012, 20000), //?϶???ʽ
Array(1002876, 20000), //ʥ???췢??
Array(1002839, 20000), //?Ϲϰ???ñ
Array(1001048, 30000), //??????ñ
Array(1102225, 30000), //?϶?????
Array(1102217, 30000), //??β????
Array(1102157, 30000), //???ܼ???
Array(1051131, 30000), //ʥ??Ů???ӷ?
Array(1112916, 50000), //??į??????ָ
Array(1012179, 20000), //¹????
Array(1051152, 10000), //õ????????ȹ
Array(1112118, 10000), //??????Ƭ??ָ
Array(1112119, 10000), //????(Red) ??Ƭ??ָ
Array(1112120, 10000), //????(White) ??Ƭ??ָ
Array(1112228, 10000), //??????????ָ
Array(1112229, 10000), //????(Red)??????ָ
Array(1112230, 10000),  //????(White)??????ָ
Array(1112103, 10000),
Array(1050210, 10000),
Array(1112141, 10000),
Array(1112252, 10000),
Array(1112253, 10000),
Array(1112142, 10000),
//
Array(1051280, 10000),
Array(1052426, 10000),
Array(1051278, 10000),
Array(1050229, 10000),
Array(1050227, 10000),
Array(1051235, 10000),
Array(1052201, 10000),
Array(1050232, 10000),
Array(1051282, 10000),
Array(1052425, 10000),
Array(1052412, 10000),
Array(1102503, 10000),
Array(1052455, 10000),
Array(1052503, 10000),
Array(1051261, 10000),
Array(1050230, 10000),
Array(1050231, 10000),
Array(1051149, 10000),
Array(1051192, 10000),
Array(1051255, 10000),
Array(1051256, 10000),
Array(1112422, 10000),
Array(1112424, 10000),
Array(1112930, 10000),
Array(1112136, 10000),
Array(1112920, 14000),
Array(1702367, 14000),
Array(1702341, 14000),
Array(1322102, 14000),
Array(1702366, 14000),
Array(1702352, 14000),
Array(1302037, 14000),
Array(1302061, 14000),
Array(1302063, 14000),
Array(1302080, 14000),
Array(1302084, 14000),
Array(1302085, 14000),
Array(1302087, 14000),
Array(1302169, 14000),
Array(1322051, 14000),
Array(1332032, 14000),
Array(1332053, 14000),
Array(1372017, 14000),
Array(1372031, 14000),
Array(1402037, 14000),
Array(1402049, 14000),
Array(1402063, 14000),
Array(1422011, 14000),
Array(1432039, 14000),
Array(1432046, 14000),
Array(1442026, 14000),
Array(1442065, 14000),
Array(1442088, 14000),
Array(1472063, 14000),
Array(1702342, 14000),
Array(1702337, 14000),
Array(1702335, 14000),
Array(1702330, 14000),
Array(1702346, 14000),
Array(1702341, 14000),
Array(1702340, 14000),
Array(1702324, 14000),
Array(1322102, 14000),
Array(1412056, 14000),
Array(1402110, 14000),
Array(1702310, 14000),
Array(1702329, 14000),
Array(1702316, 14000),
Array(1702309, 14000),
Array(1102380, 14000),
Array(1102385, 14000),
Array(1102386, 14000),
Array(1102238, 14000),
Array(1102241, 14000),
Array(1102248, 14000),
Array(1102245, 14000),
Array(1102265, 14000),
Array(1102285, 14000),
Array(1102286, 14000),
Array(1102287, 14000),
Array(1102270, 14000),
Array(1102273, 14000),
Array(1102288, 14000),
Array(1102253, 14000),
Array(1102298, 14000),
Array(1102299, 14000),
Array(1102297, 14000),
Array(1102310, 14000),
Array(1102319, 14000),
Array(1102272, 14000),
Array(1102323, 14000),
Array(1102324, 14000),
Array(1102349, 14000),
Array(1102325, 14000),
Array(1102326, 14000),
Array(1102338, 14000),
Array(1102350, 14000),
Array(1102374, 14000),
Array(1102353, 14000),
Array(1102357, 14000),
Array(1003214, 14000),
Array(1003141, 14000),
Array(1003269, 14000),
Array(1003268, 14000),
Array(1003492, 14000),
Array(1003493, 14000),
Array(1003494, 14000),
Array(1003495, 14000),
Array(1003496, 14000),
Array(1003519, 14000),
Array(1003520, 14000),
Array(1002726, 14000),
Array(1002524, 14000),
Array(1002714, 14000),
Array(1002841, 14000),
Array(1003220, 14000),
Array(1003219, 14000),
Array(1003170, 14000),
Array(1003226, 14000),
Array(1003227, 14000),
Array(1000050, 14000),
Array(1003232, 14000),
Array(1001064, 14000),
Array(1001075, 14000),
Array(1003252, 14000),
Array(1003249, 14000),
Array(1001036, 14000),
Array(1002425, 14000),
Array(1002677, 14000),
Array(1002702, 14000),
Array(1002707, 14000),
Array(1002728, 14000),
Array(1002743, 14000),
Array(1002749, 14000),
Array(1002758, 14000),
Array(1002788, 14000),
Array(1002812, 14000),
Array(1002851, 14000),
Array(1002858, 14000),
Array(1002867, 14000),
Array(1002939, 14000),
Array(1002971, 14000),
Array(1002972, 14000),
Array(1002980, 14000),
Array(1002997, 14000),
Array(1002998, 14000),
Array(1003091, 14000),
Array(1003114, 14000),
Array(1003075, 14000),
Array(1000043, 14000),
Array(1003149, 14000),
Array(1002988, 14000),
Array(1003154, 14000),
Array(1003159, 14000),
Array(1003169, 14000),
Array(1003193, 14000),
Array(1003194, 14000),
Array(1003195, 14000),
Array(1003196, 14000),
Array(1003271, 14000),
Array(1003360, 14000),
Array(1003359, 14000),
Array(1003417, 14000),
Array(1112204, 14000),
Array(1003581, 15000),
Array(1042263, 15000),
Array(1062173, 10000),
Array(1072820, 10000),
Array(1702422, 15000),
Array(1112101, 10000),
Array(1112937, 15000),
Array(1012134, 10000),
Array(1112907, 15000),
Array(1112928, 15000),
Array(1050119, 15000),
Array(1042198, 15000),
Array(1062072, 15000),
Array(1002566, 15000),
Array(1112145, 15000),
Array(1112257, 15000),
Array(1112146, 15000),
Array(1112258, 15000),
Array(1112254, 15000),
Array(1112143, 15000),
Array(1102453, 50000), 
Array(1102450, 50000), 
Array(1102451, 50000), 
Array(1102452, 50000), 
Array(1102511, 50000), 
Array(1102385, 50000), 
Array(1102386, 50000), 
Array(1102487, 50000), 
Array(1082549, 15000),
Array(1082548, 15000),
Array(1072843, 15000),
Array(1072832, 15000),
Array(1062174, 15000),
Array(1042204, 15000),
Array(1012208, 15000),
Array(1012165, 15000),
Array(1012412, 15000),
Array(1012413, 15000),
Array(1702442, 15000),
Array(1702422, 15000),
Array(1702446, 15000),
Array(1702460, 15000),
Array(1702408, 15000),
Array(1702415, 15000),
Array(1702403, 15000),
Array(1702402, 15000),
Array(1702375, 15000),
Array(1702348, 15000),
Array(1003965, 15000),
Array(1003964, 15000),
Array(1003920, 15000),
Array(1003921, 15000),
Array(1003918, 15000),
Array(1003861, 15000),
Array(1003865, 15000),
Array(1003919, 15000),
Array(1102593, 15000),
Array(1102564, 15000),
Array(1102615, 15000),
Array(1052661, 15000),
Array(1042277, 15000),
Array(1060181, 15000),
Array(1052593, 15000),
Array(1052536, 15000),
Array(1050312, 15000),
Array(1042236, 15000),
Array(1042240, 15000),
Array(1062157, 15000),
Array(1042265, 15000),
Array(1042241, 15000),
Array(1062156, 15000),
Array(1042238, 15000),
Array(1040192, 15000),
Array(1041194, 15000),
Array(1003505, 15000),
Array(1003504, 15000),
Array(1061207, 15000)
//
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
        var selStr = "#fUI/UIWindow2.img/Quest/quest_info/summary_icon/summary#\r\n#fUI/UIWindow2.img/QuestAlarm/BtQ/normal/0#?װ???#r#h ##k???ã???ѡ????ϣ???????ĵ??ߣ?";
        for (var i = 0; i < itemList.length; i++) {
            selStr += "\r\n#L" + i + "##i" + itemList[i][0] + ":# #b#t" + itemList[i][0] + "##k   #r" + itemList[i][1]  + "#k????#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        var item = itemList[selection];
        if (item != null) {
            selectedItem = item[0];
            selectedCost = item[1];
            cm.sendYesNo("???Ƿ?????#i" + selectedItem + ":# #b#t" + selectedItem + "##k ??Ҫ #r" + selectedCost + "#k ??????");
        } else {
            cm.sendOk("???ִ???...");
            cm.dispose();
        }
    } else if (status == 2) {
        if (selectedCost <= 0 || selectedItem <= 0) {
            cm.sendOk("???????߳??ִ???...");
            cm.dispose();
            return;
        }
        if (cm.getPlayer().getCSPoints(1) >= selectedCost) {
            var gachaponItem = cm.gainGachaponItem(selectedItem, 1, "?????̵?", 3, true);
            if (gachaponItem != -1) {
                cm.gainNX( - selectedCost );
                cm.sendOk("??ϲ???ɹ?????#i" + selectedItem + ":# #b#t" + selectedItem + "##k??");
            } else {
                cm.sendOk("????ʧ?ܣ?????ȷ???ڱ?????????Ŀ???????Ƿ???һ?????ϵĿռ䡣");
            }
        } else {
            cm.sendOk("??û????ô????????\r\n\r\n????#i" + selectedItem + ":# #b#t" + selectedItem + "##k ??Ҫ #r" + selectedCost + "#k ??????");
        }
        cm.dispose();
    }
}