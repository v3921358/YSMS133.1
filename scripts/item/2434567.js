/* 
 * 2430580 - �����������90��Ȩ
 */
var period = 90;
var mountSkillId = 80001410;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}