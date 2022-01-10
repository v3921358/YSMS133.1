/*
 脚本功能：道具兑换
 */
 
var ItemNeedId = 4310143;//BOSS币兑换道具
var selects;
var ItemArray = Array(
Array(2046958,1),//紫河的单手武器 攻击力卷轴 1%
Array(2046959,1),//紫河的单手武器 魔力卷轴 1%
Array(2616100,1),//紫河的双手武器 攻击力卷轴 1%
Array(2616102,1),//紫河的双手武器 魔力卷轴 1%
Array(2046960,50),//红河的单手武器 攻击力卷轴 10%
Array(2046961,50),//红河的单手武器 魔力卷轴 10%
Array(2616101,50),//红河的双手武器 攻击力卷轴 10%
Array(2616103,50),//红河的双手武器 魔力卷轴 10%
Array(2046825,50),//红河的饰品 力量卷轴 10%
Array(2046826,50),//红河的饰品 智力卷轴 10%
Array(2046827,50),//红河的饰品 敏捷性卷轴 10%
Array(2046828,50),//红河的饰品运气卷轴 10%
Array(2043003,220),//单手剑攻击必成卷
Array(2043103,220),//单手斧攻击必成卷
Array(2043203,220),//单手钝器攻击必成卷
Array(2043303,220),//短剑攻击必成卷
Array(2043703,220),//短杖攻击必成卷
Array(2043803,220),//长杖攻击必成卷
Array(2044003,220),//双手剑攻击必成卷
Array(2044019,220),//双手剑魔力必成卷
Array(2044103,220),//双手斧攻击必成卷
Array(2044203,220),//双手钝器攻击必成卷
Array(2044303,220),//枪攻击必成卷
Array(2044403,220),//矛攻击必成卷
Array(2044503,220),//弓攻击必成卷
Array(2044603,220),//弩攻击必成卷
Array(2044703,220),//拳套攻击必成卷
Array(2044815,220),//指节攻击必成卷
Array(2044908,220)//短枪攻击必成卷
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
			var text = "#r[温馨提示]：#b您当前的 #r#z4310143# #b为： #r" + cm.getItemQuantity(4310143) + " #b个\r\n[温馨提示]：#r#z4310143# #b只有部分BOSS掉落#k\r\n#b请选择：#k\r\n";
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