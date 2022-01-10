/*

 完成时间：2014年12月28日 22:22:28
 脚本功能：物品数量提交排名
 */
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var time = new Date();
var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";

var hour = time.getHours(); //获得小时
var minute = time.getMinutes();//获得分钟
var second = time.getSeconds(); //获得秒
var itemid = 4310143;
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            //cm.sendOk("12月31日-1月2日00：00分开放全部怪物掉落。活动奖励将会在1月3日发放。");
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) { 
                cm.sendSimple("\t#b哇擦，游戏也可以赚钱啦，欢迎来到本冒险岛私服，在这里只需要耽误您每天那么几小时，只要击杀BOSS就有几率掉落 #r一元硬币#k #b拾取后可以提交给我，然后只需要您填写您银行卡号或者支付宝卡号就可以快速提取现金。100%真实，24小时内到账。\r\n\r\n\r\n#d您当前存款为：#r" +getQty()+ " #d元。距提现差： #r"+getQty()+" / 100 #d元。\r\n\r\n#b#L0#"+ttt6+" BOSS掉落币存取现金。#r(满100可提现)\r\n#L2#"+ttt6+" #b填写银行卡号或支付宝帐号信息。\r\n#L4#"+ttt6+" #b填写提取现金额。#r(24小时内到账)\r\n#L3#"+ttt6+" #b查看相关说明。#r(最终解释权归宝贝冒险岛)#k")
        } else if (status == 1) {
            if (selection == 0) {
		cm.sendGetText("你想提交多少个#b#t"+itemid+"##k ?");
            } else if (selection == 1) {//排名
                Ranking();//排名
                cm.dispose();
	    }
        } else if (status == 2) {
		var quantity = parseInt(cm.getText());
                if (quantity >  0&& quantity<= 9999){
		if (cm.haveItem(itemid,quantity)){
		var i =0;
		var DataBase = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM ItemQuantityRanking where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"").executeQuery();
		while(DataBase.next()){
			i++;
		}
		if(i == 0){//第一次
			var insert = DatabaseConnection.getConnection().prepareStatement("INSERT INTO ItemQuantityRanking (id,charid,charName,itemid,quantity) VALUES(?,?,?,?,?)"); // 载入数据
			insert.setString(1, null); //载入记录ID
                	insert.setString(2, cm.getPlayer().getId());
                	insert.setString(3, cm.getPlayer().getName());
                	insert.setString(4, itemid);
                	insert.setString(5, quantity);
                	insert.executeUpdate(); //更新
		}else{ //第n次
			var UpDateData = DatabaseConnection.getConnection().prepareStatement("update ItemQuantityRanking set quantity=? where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"")
    			UpDateData.setString(1, parseInt(getQty()) + quantity);
   			UpDateData.executeUpdate();//更新;
		}
		cm.sendOk("数据添加成功！\r\n目前您的存款为： "+getQty()+"\r\n\r\n#r满100元即可提现哟。#k");
		cm.gainItem(itemid,-quantity);
		cm.getC().getChannelServer().broadcastPacket(Packages.tools.MaplePacketCreator.serverNotice(0x03, cm.getC().getChannel(), "『我的收入』" + " : " + "恭喜" + cm.getChar().getName() + ",存入 "+quantity+" 元。目前总共存入了 "+getQty()+" 元。马上变成有钱人。"));
		}else{
			cm.sendOk("对不起，你没有足够的#t"+itemid+"#");
		}
}else{
       cm.sendOk("1以上9999以下数字可以输入。");

}
		cm.dispose();
        }
    }
}



function getQty() { //得到目前总数
    var Times = 0;
    var EventDataBase = DatabaseConnection.getConnection().prepareStatement("SELECT quantity FROM ItemQuantityRanking where charid = " + cm.getPlayer().getId() + " and itemid = "+itemid+"").executeQuery();
    while (EventDataBase.next()) {
        Times = EventDataBase.getString("quantity");
    }
    return Times;
}



function Ranking() {
    var Text = "排名如下：(1~10名次)\r\n\r\n#d"
    var RankDataBase = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM ItemQuantityRanking where itemid = "+itemid+" ORDER BY quantity DESC LIMIT 10").executeQuery();
    var i = 1;
    while (RankDataBase.next()) {
        Text += "#fUI/UIToolTip.img/Item/Equip/Star/Star# 名次:" + i + "\r\n角色名:" + RankDataBase.getString("charName") + "\r\n提交物品数:" + RankDataBase.getString("quantity") + "\r\n"
        Text += "~~~~~~~~~~~~~~~~~~~\r\n"
        i++;
    }
    cm.sendOk(Text);
}