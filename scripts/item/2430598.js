/* 
 * 2430598 - ������װ3�콻��ȯ - ˫��������3����ʹ��[������װ]��輼�ܡ�
 */
var period = 3;
var mountSkillId = 80001019;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}