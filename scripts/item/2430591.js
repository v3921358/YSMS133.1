/* 
 * 2430591 - èͷӥ3�콻��ȯ - ˫��������3����ʹ����˼���[����]��\nϰ��#c�������#���ܺ󣬻��ɼ�Ԧ���С�
 */
var period = 3;
var mountSkillId = 80001051;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}