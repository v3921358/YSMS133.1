/* 
 * 2430602 - ����Ħ��3�콻��ȯ - ˫��������3����ʹ����˼���[����Ħ��]��
 */
var period = 3;
var mountSkillId = 1063;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}