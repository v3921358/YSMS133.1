/* 
 * 2430580 - ��è3�콻��ȯ - #c˫��#ϰ����輼��[��è]����ʹ��3�졣
 */
var period = 3;
var mountSkillId = 80001112;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}