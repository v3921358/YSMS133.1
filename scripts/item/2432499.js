/* 
 * 2430580 - ·ÉÐ¬Æï³è
 */
var period = 90;
var mountSkillId = 80001484;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}