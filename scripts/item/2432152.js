/* 
 * 2430580 - ���д����
 */
var period = 90;
var mountSkillId = 80001329;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}