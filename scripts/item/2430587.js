/* 
 * 2430587 - ���ȵ�ħ����3�콻��ȯ - ˫��������3����ʹ����˼���[���ȵ�ħ����]��
 */
var period = 3;
var mountSkillId = 80001058;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}