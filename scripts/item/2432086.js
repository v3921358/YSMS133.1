/* 
 * 2430580 - �������
 */
var period = 90;
var mountSkillId = 80001355;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}