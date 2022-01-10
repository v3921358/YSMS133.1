/*
 脚本功能：道具兑换
 */
 
var ItemNeedId = 4310119;//11周年纪念币150防具
var selects;
var ItemArray = Array(
Array(1212057,150),
Array(1222052,150),
Array(1232072,150),
Array(1242077,150),
Array(1252056,150),

Array(1302229,150),
Array(1312118,150),
Array(1322164,150),
Array(1332195,150),
Array(1342071,150),

Array(1362069,150),
Array(1372141,150),
Array(1382170,150),
Array(1402153,150),
Array(1412106,150),

Array(1422109,150),
Array(1432140,150),
Array(1442184,150),
Array(1452172,150),
Array(1462161,150),

Array(1472181,150),
Array(1482142,150),
Array(1492154,150),
Array(1522073,150),
Array(1532076,150),

Array(1542045,150),
Array(1552045,150)
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