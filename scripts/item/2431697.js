/* 
 * 2430580 - �۷�С������
 */
var period = 90;
var mountSkillId = 80001166;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}