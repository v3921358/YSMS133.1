/* ³����˹ */

var selType;
var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status >= 0) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        cm.sendSimple("#e<³����˹>#n\r\n����³����˹������ʲô������#b\r\n#L0#��³����˹ȥ��#l\r\n#L2#�˽��й�³����˹�����顣#l");
    } else if (status == 1) {
        selType = selection;
        if (selType == 0) { //��³����˹ȥ
            cm.sendNext("�õģ������������޵����������͵�³����˹����³����˹����ͨ�����ڻص��������ڵĵط���ף����ˡ�");
        } else {
            cm.sendNext("³����˹ԭ����������Ϊ�˻ָ��ںͺ�ħ��ʦ��ս�������ĵ�������������˯�ĵط������ǲ���ǰ��³����˹��һȺ����������ħ����ռ�죬����������ӡ���˾޴�������");
        }
    } else if (status == 2) {
        if (selType == 0) { //��³����˹ȥ
            cm.saveReturnLocation("ROOT");
            cm.warp(105200000, 0);
        } else {
            cm.sendPrev("����³����˹�����˺ڰ�����Ϣ�����ӵ��������������������˵�������ġ��������������ڰ�������ʴ֮ǰ���������ӡ�ػ��ߣ��⿪�������ķ�ӡ���ȳ���������");
        }
        cm.dispose();
    }
}