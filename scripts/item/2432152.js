/* 
 * 2430580 - ·ÉÐÐ´²Æï³è
 */
var period = 90;
var mountSkillId = 80001329;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}