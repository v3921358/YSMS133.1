/*
 脚本功能：道具兑换
 */
 
var ItemNeedId = 2431551;
var selects;
var ItemArray = Array(
					   Array(3994417,50),
					   Array(3994418,60),
					   Array(3994419,70),
					   Array(3994420,80),
					   Array(3994421,90),
					   Array(3994422,100)
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
        im.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            im.dispose();
        } else if (a == 0) {
			var text = "#r[温馨提示您]：#b您当前的 #r#z2431551# #b为： #r" + im.getItemQuantity(2431551) + " #b个#k\r\n";
			for (var i = 0 ; i < ItemArray.length;i++){
				text += "#L"+i+"# #i"+ItemArray[i][0]+"#  #b#z"+ItemArray[i][0]+"# #b( 需要 #r"+ItemArray[i][1]+"#k #b个 #r#z2431551# )\r\n"
			}
			im.sendSimple(text);
		}else if (a == 1){
			selects = selection;
			itemQuantity = ItemArray[selects][1];
			itemid = ItemArray[selects][0];
			im.sendYesNo("#b你确定要使用 #r"+itemQuantity+" #b个 #r#t"+ItemNeedId+"# #b来兑换 #r#t"+itemid+"# #b吗？");
		}else if (a == 2){
			for (var i = 1 ; i < 5 ;i++){
				if (im.getSpace(i) <1){
					pass = false;
				}
			}
			if (pass){
			if (im.haveItem(ItemNeedId,itemQuantity)){
				im.gainItem(itemid,1);
				im.gainItem(ItemNeedId,-itemQuantity);
				im.sendOk("兑换成功了！");
				im.worldSpouseMessage(0x23, "『情人节棒棒糖』：玩家 "+ im.getChar().getName() +" 成功兑换了稀有道具。");
			}else{
				im.sendOk("对不起，你没有足够的#t"+ItemNeedId+"#");
			}
			
			}else{
				im.sendOk("对不起，背包装备栏位已满,请清理。\r\n -#r请让所有的背包栏目腾出一格。")
			}
			im.dispose();
		}
	}
}