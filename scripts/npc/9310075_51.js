var status = -1;
var text;

var starttime = "2016-1-1 22:30:00";
var endtime = "2016-1-1 23:00:00";

var sel;

var invtype = new Array("装备", "消耗", "设置", "其他", "特殊");

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    var currdate = new Date();
    var define_starttime = new Date(Date.parse(starttime.replace(/-/g,"/")));
    var define_endtime =   new Date(Date.parse(endtime.replace(/-/g,"/")));
    var packages = new Array();

    if (currdate < define_starttime || currdate > define_endtime) {
        cm.sendOk("\t\t\t#r神秘商店#k\r\n\r\n非活动时间…… \r\n\r\n活动开始时间：#r" + starttime + "#k\r\n" + "活动结束时间：#r" + endtime);
        cm.dispose();
        return;
    } else {
        packages = getShopItems();
        if (packages.length == 0) {
            cm.sendOk("当前没有可购买的道具。");
            cm.dispose();
            return;
        }
    }
    var bosslogstr = "每日限时神秘商店" + starttime.substring(0, 11);

    if (status == 0) {
        text = "\t\t\t#b每日限时神秘商店#k\r\n\r\n";
        for (var i in packages) {
            var item = packages[i];
            text += "#L" + i + "##i" + item[1] + "##z" + item[1] + "# (" + (Math.min(item[3] - cm.getBossLog(bosslogstr + item[0]), Math.max(item[2], item[3]))) + "/" + item[3] + ") 库存剩余: " + item[2] + " " + (item[4] != 0 ? "点券：" + item[4] : item[5] != 0 ? "金币：" + item[5] : "RMB：" + item[6]) + "\r\n";
        }
        cm.sendNext(text);
    } else if (status == 1) {

        sel = selection;
        var item = packages[selection];
        text = "商品详情：\r\n\r\n#i" + item[1] + "##z" + item[1] + "# (" + (Math.min(item[3] - cm.getBossLog(bosslogstr + item[0]), Math.max(item[2], item[3]))) + "/" + item[3] + ") 库存剩余: " + item[2] + " " + (item[4] != 0 ? "点券：" + item[4] : item[5] != 0 ? "金币：" + item[5] : "RMB：" + item[6]) + "\r\n\r\n请输入要购买的数量："
        cm.sendGetNumber(text, 1, 1, item[3]);
    } else if (status == 2) {
        packages = getShopItems();  //刷新数据
        var item = packages[sel];
        if (item[2] <= 0) {
            cm.sendOk("晚了一步，该物品已售罄……");
        } else if (selection > Math.min(item[3] - cm.getBossLogAcc(bosslogstr + item[0]), Math.max(item[2], item[3]))) {
            cm.sendOk("超过该物品可购买的数量，请重新输入");
        } else if (item[4] != 0 && cm.getNX(1) < item[4] * selection) {
            cm.sendOk("点券不足，购买失败。");
        } else if (item[5] != 0 && cm.getMeso() < item[5] * selection) {
            cm.sendOk("金币不足，购买失败。");
        } else if (item[6] != 0 && cm.getRMB() < item[6] * selection) {
            cm.sendOk("RMB不足，购买失败。");
        } else if (cm.getSpace(Math.floor(item[1] / 1000000)) < 1) {
            cm.sendOk("背包空间不足1格，购买失败。");
        } else {
            if (item[4] != 0) {
                cm.gainNX(1, -item[4] * selection);
            } else if (item[5] != 0) {
                cm.gainMeso(-item[5] * selection);
            } else {
                cm.gainRMB(-item[6] * selection);
            }
            cm.gainItem(item[1], selection);
			cm.setBossLogAcc(bosslogstr + item[0], selection);
            updateShopItem(item[0], selection);
            //cm.worldMessageEffect("[每日限时神秘商店] 恭喜 " + cm.getName() + " 在市场NPC流星妹妹处，每日限时神秘商店抢购到神秘道具，目前剩余 " + (item[2] - selection), 1, 10);
	cm.worldSpouseMessage(0x23, "[每日限时神秘商店] 恭喜" + cm.getName() + "在市场NPC流星妹妹处领取,每日限时神秘商店抢购到神秘道具，目前剩余 " + (item[2] - selection)); 
 	cm.worldSpouseMessage(0x23, "[每日限时神秘商店] 恭喜" + cm.getName() + "在市场NPC流星妹妹处领取,每日限时神秘商店抢购到神秘道具，目前剩余 " + (item[2] - selection)); 
	cm.worldSpouseMessage(0x23, "[每日限时神秘商店] 恭喜" + cm.getName() + "在市场NPC流星妹妹处领取,每日限时神秘商店抢购到神秘道具，目前剩余 " + (item[2] - selection)); 
	cm.worldSpouseMessage(0x23, "[每日限时神秘商店] 恭喜" + cm.getName() + "在市场NPC流星妹妹处领取,每日限时神秘商店抢购到神秘道具，目前剩余 " + (item[2] - selection)); 
	cm.worldSpouseMessage(0x23, "[每日限时神秘商店] 恭喜" + cm.getName() + "在市场NPC流星妹妹处领取,每日限时神秘商店抢购到神秘道具，目前剩余 " + (item[2] - selection)); 


          cm.sendOk("购买成功，祝你游戏愉快。");
        }
        cm.dispose();
    }
}

function getShopItems() {
    var ret = new Array();
    var ps = cm.getConnection().prepareStatement("SELECT * FROM data_discount_shop");
    var rs = ps.executeQuery();
    while (rs.next()) {
        ret.push(new Array(rs.getInt("id"), rs.getInt("itemid"), rs.getInt("inventory"), rs.getInt("buylimit"), rs.getInt("cash"), rs.getInt("meso"), rs.getInt("rmb")));
    }
    ps.close();
    rs.close();
    return ret;
}

function updateShopItem(id, quantity) {
    var ps = cm.getConnection().prepareStatement("UPDATE data_discount_shop SET inventory = inventory - ? WHERE id = ?");
    ps.setInt(1, quantity);
    ps.setInt(2, id);
    ps.executeUpdate();
    ps.close();
}