/* 
 * 2430580 - �������
 */
var period = 90;
var mountSkillId = 8000397;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}