/* 
 * 2430585 - ���3�콻��ȯ - #c˫��#ϰ����輼��[���]����ʹ��3�졣
 */
var period = 3;
var mountSkillId = 80001113;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}