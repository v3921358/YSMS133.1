/* Ms. Tan 
	Henesys Skin Change.
*/
var status = 0;
var skin = Array(0, 1, 2, 3, 4);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 0) {
        cm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        cm.sendNext("��ã���ӭ�������ִ廤�����ġ������ú���һ������������Ƥ����ֻҪ��#b���ܻ�Ա��#k�Ļ����ҾͿ��԰������Ҫ��Ϊ�㻤��Ƥ�������볢��һ����");
    } else if (status == 1) {
        cm.sendStyle("�����ǻ������Ŀ��ŵĻ�е�����Բ鿴�������Ч��������Ҫʲô����Ƥ���أ�����ѡһ�¡�", skin, 5153015);
    } else if (status == 2) {
        if (cm.setAvatar(5153015, skin[selection]) == 1) {
            cm.sendOk("�����,����������̾����·�ɫ��!");
                cm.worldSpouseMessage(0x25, "��ϴ������ : " + cm.getChar().getName() + " ����һ��ϴ������ʱ�н��ֳ���һλʱ�д��ˣ���ҿ���Χ�۰�.");
        } else {
            cm.sendOk("�š��������û�л���ȯ�����Բ���û�л���ȯ�Ļ����ҾͲ��ܰ��㻤��Ƥ����");
        }
        cm.dispose();
    }
}