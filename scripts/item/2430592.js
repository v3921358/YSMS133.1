/* 
 * 2430592 - ����˹�Ĳ�Ȯ3�콻��ȯ - ˫��������3����ʹ����˼���[����˹�Ĳ�Ȯ]��
 */
var period = 3;
var mountSkillId = 1136;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}