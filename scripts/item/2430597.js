/* 
 * 2430597 - �ɴ�3�콻��ȯ - ˫��������3����ʹ����˼���[�ɴ�]��\nϰ��#c�������#���ܺ󣬻��ɼ�Ԧ���С�
 */
var period = 3;
var mountSkillId = 80001066;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}