/* 
 * 2430580 - ��Ь���
 */
var period = 90;
var mountSkillId = 80001484;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}