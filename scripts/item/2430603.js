/* 
 * 2430603 - ð����ʿ�Ÿ��ٵ糵3�콻��ȯ - ˫��������3����ʹ����˼���[ð����ʿ�Ÿ��ٵ糵]��
 */
var period = 3;
var mountSkillId = 80001038;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}