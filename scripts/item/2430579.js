/* 
 * 2430579 - GO��ð��3�콻��ȯ - #c˫��#ϰ����輼��[GO��ð��]����ʹ��3�졣
 */
var period = 3;
var mountSkillId = 80001114;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}