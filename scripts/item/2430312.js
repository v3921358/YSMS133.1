/* 
 * ���� èͷӥ 90��
 */
var period = 90;
var mountSkillId = 30001069;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}