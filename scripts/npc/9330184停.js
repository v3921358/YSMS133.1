var status = 0;
var selStr;
var sel;
var selitem;
var psrw = new Array(1202001, 1202002, 1202003, 1202004);
var rand = Math.floor(Math.random() * psrw.length);

function start() {
    status = -1;
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
    if (status == 0) {
        cm.sendNext("请帮我清理掉这里的僵尸，我会给予你奖励的\r\n#r领取奖励请查看背包是否满,领取失败GM不负责#l");
    } else if (status == 1) {
        if (cm.getChar().getMap().getAllMonstersThreadsafe().size() == 0) {
            if (cm.getBossLog("清理僵尸", 1) == 0) {
                cm.setBossLog("清理僵尸", 1);
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(psrw[rand]); 
                var toDrop = ii.randomizeStats(ii.getEquipById(psrw[rand])).copy();
                toDrop.setStr(50); //装备力量
                toDrop.setDex(50); //装备敏捷
                toDrop.setInt(50); //装备智力
                toDrop.setLuk(50); //装备运气
                toDrop.setMatk(50); //物理攻击
                toDrop.setWatk(50); //魔法攻击
                cm.getPlayer().getInventory(type).addItem(toDrop); //将这个装备放入包中
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包
            }
            cm.sendOk("感谢你帮我清理掉僵尸，送你的僵尸图腾好用吗？请找酷米通关吧\r\n#r一个人只能领取一次，以后做副本将不再有#k");
        }
        cm.sendOk("你还没有清理掉僵尸吧？");
        cm.dispose();
    }
}