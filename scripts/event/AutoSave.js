/* 
 * �Զ������ɫ����
 */

var setupTask;

function init() {
    scheduleNew();
}

function scheduleNew() {
    setupTask = em.schedule("start", 1000 * 60 * 30); //10���ӱ���1��
}

function cancelSchedule() {
    setupTask.cancel(false);
}

function start() {
    scheduleNew();
    em.getChannelServer().saveAll();
}