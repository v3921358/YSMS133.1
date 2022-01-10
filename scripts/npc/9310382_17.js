var status;
var text;
var column = new Array("装备", "消耗", "设置", "其他", "商城");
var sel;


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else {
            cm.dispose();
            return;
        }

        if (status == 0) {
            text = "#d#e一键清除所有栏目道具，请谨慎使用，如若删除贵重物品，例如：#r暴君装备、150装备、160装备、VIP神秘盒子#d等、Gm一概不补偿，请操作之前看清楚，错删等、后果自负。#n\r\n\r\n";
            for (var i = 1; i <= 5; i++) {
                text += "#L" + i + "##r[谨慎操作] #b清理 #e#r" + column[i-1] + "栏 #n#b的所有道具#l\r\n";
            }
            cm.sendSimple(text);
        } else if (status == 1) {
            sel = selection;
            cm.sendYesNo("#r是否要清除" + column[sel-1] + "栏的所有道具？？？此操作不可逆！");
        } else if (status == 2) {
            cm.removeAllItem(sel);
            cm.sendOk("清除完毕");
            cm.dispose();
        }
    }
}