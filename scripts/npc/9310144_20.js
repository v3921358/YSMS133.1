/*
 脚本功能：赌博
 */

var a = 0;
var selects; //记录玩家的选项
var item = 4310036; //下注的物品
var SelectItem; //记载下注的数量
var Beishu;
var rand; //随机变量
var Unsuccess = false;
var notice = false;

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
            Unsuccess = false;
            var text = "\t\t#r欢乐豆豆机（征服者币打豆豆）#l\r\n\r\n";
            //text += "#L0#【 ①   ~    ⑤】#l     #L1# 【 ⑥   ~    ⑨】#l\r\n\r\n\r\n";
            //text += "#L2#①#l #L3#②#l #L4#③#l #L5#④#l #L6#⑤#l #L7#⑥#l #L8#⑦#l #L9#⑧#l #L10#⑨#l\r\n";
	    text += "#b简单模式#l\r\n";
            text += "#L0##i3600100##l #L1##i3600101##l #L2##i3600102##l\r\n\r\n";
	    text += "#b困难模式#l\r\n";
	    text += "#L10##i3600103##l #L20##i3600104##l #L30##i3600200##l #L40##i3600201##l #L50##i3600201##l\r\n\r\n";
	    text += "#L60##i3600202##l #L70##i3600203##l #L80##i3600003##l #L90##i3600004##l #L100##i3600005##l\r\n\r\n";
	    text += "\t\r\n\r\n";
            cm.sendSimple(text);
        } else if (a == 1) {
            if (cm.getSpace(4) < 10) {
                cm.sendOk("对不起，请让你的其他栏腾出10个空格以上。")
                cm.dispose();
            } else {
                selects = selection;
                cm.sendGetNumber("请输入你要下注的#b#z" + item + "##k数量:\r\n#r -下注后如果意外关闭掉NPC将不退还征服者币！\r\n#r - 投注的上限为100个.", 1, 1, 100);
            }
        } else if (a == 2) {
            SelectItem = selection;
            if (cm.haveItem(item, SelectItem)) {//如果下注的数量符合背包里面征服者币的数量
                cm.gainItem(item, -SelectItem); //扣除征服者币
                rand = Math.floor(Math.random() * 100) + 1; //1~9
                if (selects == 0 || selects == 1) {
                    switch (selects) {
                        case 0://1~5
                            if (rand >= 1 && rand <= 30) {//1~20随机的数
                                text = "要求打到1-30个豆豆，本次人品爆发打到 #r"+ rand +"#k 豆豆,获得2倍奖励。\r\n你将获得2倍的奖励！请点击下一步获取。";
                                SelectItem = SelectItem * 2; //翻一倍
				cm.worldSpouseMessage(0x20, "[欢乐豆豆机]： 恭喜" + cm.getChar().getName() + ",在欢乐豆豆机击退怪物HP x 1.2倍中成功获得2倍奖励。")
                                Beishu = 2;
                            } else {
                                text = "很遗憾，要求打到1-30个豆豆，你没有达标或者超标，目前打到 #r"+rand+"#k 豆豆。！";
                                Unsuccess = true;
                            }
                            break;
                        case 1://6~9
                            if (rand >= 70 && rand <= 100) {//1~5随机的数
                                text = "要求打到70-100个豆豆，本次人品爆发打到 #r"+ rand +"#k 豆豆,获得2倍奖励。 \r\n你将获得2倍的奖励！请点击下一步获取。";
                                SelectItem = SelectItem * 2; //翻一倍
				cm.worldSpouseMessage(0x20, "[欢乐豆豆机]： 恭喜" + cm.getChar().getName() + ",在欢乐豆豆机击退怪物HP x 1.5倍中成功获得2倍奖励。")
                                Beishu = 2;
                            } else {
                                text = "很遗憾，要求打到70-100个豆豆，你没有达标或者超标，目前打到 #r"+rand+"#k 豆豆。！";
                                Unsuccess = true;
                            }
                            break;
               		case 2://6~9
                            if (rand >= 31 && rand <= 69) {//1~5随机的数
                                text = "要求打到30-70个豆豆，本次人品爆发打到 #r"+ rand +"#k 豆豆,获得2倍奖励。 \r\n你将获得2倍的奖励！请点击下一步获取。";
                                SelectItem = SelectItem * 2; //翻一倍
				cm.worldSpouseMessage(0x20, "[欢乐豆豆机]： 恭喜" + cm.getChar().getName() + ",在欢乐豆豆机击退怪物HP x 5倍中成功获得2倍奖励。")
                                Beishu = 2;
                            } else {
                                text = "很遗憾，要求打到30-70个豆豆，你没有达标或者超标，目前打到 #r"+rand+"#k 豆豆。！";
                                Unsuccess = true;
                            }
                            break;
                    }
                } else {//如果是其他的选项
                    if (rand == (selects - 1)) {//如果随机到的数一样
                        text = "恭喜你！人品爆发！！\r\n你将获得10倍的奖励！请点击下一步获取。"
                        SelectItem = SelectItem * 10;
                        Beishu = 10;
                        notice = true;
                    } else {
                        text = "很遗憾，你没有达标或者超标。"
                        Unsuccess = true;
                    }
                }
                //cm.sendY(rand)
                if (Unsuccess) {
                    a = -1;
                }
                cm.sendNext(text);
            } else {//如果下注的数量不够
                a = -1;
                cm.sendNext("对不起，你背包里面的征服者币数量不够你下注的数量。")
            }
        } else if (a == 3) {
            a = -1;
            cm.gainItem(item, SelectItem);
            cm.sendNext("您获取了" + Beishu + "倍的奖励!\r\n\r\n - 得到了" + SelectItem + "个#i" + item + "# #z" + item + "#")
            if (notice) {
                cm.worldSpouseMessage(0x20, "[欢乐豆豆机] :  恭喜" + cm.getChar().getName() + ",打到<" + rand + "> 成功获得10倍奖励。")
            }
        }//a
    }//mode
}//f