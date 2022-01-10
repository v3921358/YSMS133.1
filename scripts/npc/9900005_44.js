/*
 脚本功能：道具兑换
 */
 
var ItemNeedId = 4310156;//4310156 - 埃苏莱布斯币
var selects;
var ItemArray = Array(
Array(3015015,50),//
Array(3015016,50),//
Array(3015017,50),//
Array(3015018,50),//
Array(3015019,50),//
Array(3015020,50),//
Array(3015021,50),//
Array(3015022,50),//
Array(3015023,50),//
Array(3015024,50),//
Array(3015025,50),//
Array(3015026,50),//
Array(3015027,50),//
Array(3012027,50),//
Array(3015097,50),//
Array(3015096,50),//
Array(3015131,50),//
Array(3015132,50),//
Array(3015108,50),//
Array(3015089,50),//
Array(3015133,50),//
Array(3015143,50),//
Array(3015178,50),//
Array(3010661,50),//
Array(3010811,50),//
Array(3010206,50),//
Array(3015014,50),//
Array(3010070,50),//
Array(3010814,50),//
Array(3010936,100)//
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