/* 
 * 2430595 - ���̹��3�콻��ȯ - ˫��������3����ʹ����˼���[���̹��]��
 */
var period = 3;
var mountSkillId = 80001116;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}