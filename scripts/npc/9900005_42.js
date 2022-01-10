/*
 脚本功能：兑换防具
 */
 
var ItemNeedId = 4310156;//4310156 - 埃苏莱布斯币
var selects;
var ItemArray = Array(
Array(1004422,100),//
Array(1004423,100),//
Array(1004424,100),//
Array(1004425,100),//
Array(1004426,100),//

Array(1052882,100),//
Array(1052887,100),//
Array(1052888,100),//
Array(1052889,100),//
Array(1052890,100),//

Array(1082636,100),//
Array(1082637,100),//
Array(1082638,100),//
Array(1082639,100),//
Array(1082640,100),//

Array(1073030,100),//
Array(1073032,100),//
Array(1073033,100),//
Array(1073034,100),//
Array(1073035,100),//

Array(1102775,100),//
Array(1102794,100),//
Array(1102795,100),//
Array(1102796,100),//
Array(1102797,100),//

Array(1152174,100),//
Array(1152176,100),//
Array(1152177,100),//
Array(1152178,100),//
Array(1152179,100)//

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
			var text = "#r[温馨提示]：#b您当前的 #r#z4310156# #b为： #r" + cm.getItemQuantity(4310156) + " #b个\r\n[温馨提示]：#r#z4310156# #b只有少数强大副本出#k\r\n#b请选择：#k\r\n";
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