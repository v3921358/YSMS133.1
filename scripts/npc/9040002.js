/*
 * 家族任务 - 介绍
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本 
 */
var status;
var selectedOption;

function start() {
    selectedOption = -1;
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (mode == 1 && status == 3) {
        status = 0;
    }
    if (status == 0) {
        cm.sendNext("你好~欢迎来到#m"+cm.getMapId()+"#！");
        cm.dispose();
    }
}