/*
 脚本功能：道具兑换
 */
 
var ItemNeedId = 4310097;//贝勒德币兑换道具
var selects;
var ItemArray = Array(
					   Array(1032220,20),//低级贝勒德耳环
					   Array(1032221,80),//中级贝勒德耳环
					   Array(1032222,150),//高级贝勒德耳环
					   Array(1032223,200),//最高级贝勒德耳环 
					   Array(1113072,20),//低级贝勒德戒指
					   Array(1113073,80),//中级贝勒德戒指
					   Array(1113074,150),//高级贝勒德戒指
					   Array(1113075,200),//最高级贝勒德戒指
					   Array(1122264,20),//低级贝勒德刻印吊坠
					   Array(1122265,80),//中级贝勒德刻印吊坠
					   Array(1122266,150),//高级贝勒德刻印吊坠
					   Array(1122267,200),//最高级贝勒德刻印吊坠
					   Array(1132243,20),//低级贝勒德刻印腰带
					   Array(1132244,80),//中级贝勒德刻印腰带
					   Array(1132245,150),//高级贝勒德刻印腰带
					   Array(1132246,200)//最高级贝勒德刻印腰带
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
			var text = "#b温馨提示：#r#z4310097##b只能通过击杀贝勒德获得#k\r\n#r[GM提示您]：#b您当前的#z4310097#为： #r" + cm.getItemQuantity(4310097) + " #b个\r\n";
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