/* 
 * 2430580 - ������ǧ
 */
var period = 90;
var mountSkillId = 80001241;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}