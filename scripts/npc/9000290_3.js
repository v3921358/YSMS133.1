/*
 脚本功能：道具兑换
 */
 
var ItemNeedId = 4310119;//11周年纪念币150防具
var selects;
var ItemArray = Array(
Array(1102456,100),//天照的披风 - (无描述)     战士
Array(1102457,100),//大山祇神的披风 - (无描述) 法师
Array(1102458,100),//天钿女命的披风 - (无描述) 弓手
Array(1102459,100),//月夜见尊的披风 - (无描述) 飞侠
Array(1102460,100),//素盏呜尊的披风 - (无描述) 海盗

Array(1003601,100),//天照的头盔 - (无描述)
Array(1003602,100),
Array(1003603,100),
Array(1003604,100),
Array(1003605,100),

Array(1082472,100),//天照的手套 - (无描述)
Array(1082473,100),
Array(1082474,100),
Array(1082475,100),
Array(1082476,100),

Array(1052509,100),//天照的铠甲 - (无描述)
Array(1052510,100),
Array(1052511,100),
Array(1052512,100),
Array(1052513,100),

Array(1072711,100),//天照的鞋子 - (无描述)
Array(1072712,100),
Array(1072713,100),
Array(1072714,100),
Array(1072715,100),

Array(1132156,100),//天照的腰带 - (无描述)
Array(1132157,100),
Array(1132158,100),
Array(1132159,100),
Array(1132160,100),

Array(1152094,100),//天照的肩章 - (无描述)
Array(1152095,100),
Array(1152096,100),
Array(1152097,100),
Array(1152098,100)
);
var itemQuantity;
var itemid;
var pass = true;
 
function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			var text = "#r[温馨提示]：#b您当前的#z4310119#为： #r" + cm.getItemQuantity(4310119) + " #b个\r\n";
			for (var i = 0 ; i < ItemArray.length;i++){
				text += "#L"+i+"# #i"+ItemArray[i][0]+"#  #z"+ItemArray[i][0]+"# #k( 需要 #r"+ItemArray[i][1]+"#k 个)\r\n"
			}
			cm.sendSimple(text);
		}else if (a == 1){
			selects = selection;
			itemQuantity = ItemArray[selects][1];
			itemid = ItemArray[selects][0];
			cm.sendYesNo("你确定要使用"+itemQuantity+"个#t"+ItemNeedId+"#来兑换#t"+itemid+"#吗？");
		}else if (a == 2){
			for (var i = 1 ; i < 5 ;i++){
				if (cm.getSpace(i) <1){
					pass = false;
				}
			}
			if (pass){
			if (cm.haveItem(ItemNeedId,itemQuantity)){
				cm.gainItem(itemid,1);
				cm.gainItem(ItemNeedId,-itemQuantity);
				cm.sendOk("兑换成功了！");
			}else{
				cm.sendOk("对不起，你没有足够的#t"+ItemNeedId+"#");
			}
			
			}else{
				cm.sendOk("对不起，背包装备栏位已满,请清理。\r\n -#r请让所有的背包栏目腾出一格。")
			}
			cm.dispose();
		}
	}
}