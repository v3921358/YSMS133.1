/*

 �ű����ܣ�����ѫ�� ˫�����Ի������������ѫ��
 
 */

function start() {
    im.gainItem(2431174, -1);
    im.getPlayer().gainHonorExp(Math.floor(Math.random() * 1000) + 100);
    //im.worldMessage(0x18, "������������ : ��ϲ " + im.getChar().getName() + " ʹ�� <����ѫ��> �ɹ����������.");
    im.dispose();
}