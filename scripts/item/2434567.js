/* 
 * 2430580 - ÍÃÍÃÉÍÔÂÆï³è90ÌìÈ¨
 */
var period = 90;
var mountSkillId = 80001410;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}