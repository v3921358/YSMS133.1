/* 
 * 2430589 - ħ��ɨ��3�콻��ȯ - ˫��������3����ʹ����˼���[ħ��ɨ��]��\nϰ��#c�������#���ܺ󣬻��ɼ�Ԧ���С�
 */
var period = 3;
var mountSkillId = 80001069;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}