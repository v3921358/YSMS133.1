/* 
 * 2430596 - ����������3�콻��ȯ - ˫��������3����ʹ����˼���[����������]��
 */
var period = 3;
var mountSkillId = 1053;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}