/* 
 * 2430583 - ����3�콻��ȯ - ˫��������3����ʹ����˼���[����]��\nϰ��#c�������#���ܺ󣬻��ɼ�Ԧ���С�
 */
var period = 3;
var mountSkillId = 80001067;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}