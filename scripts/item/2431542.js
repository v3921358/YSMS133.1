/* 
 * 2430580 - �������
 */
var period = 90;
var mountSkillId = 80001246;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}