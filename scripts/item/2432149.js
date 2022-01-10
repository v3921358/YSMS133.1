/* 
 * 2430580 - µ¾ÏãËÄÒçÆï³è
 */
var period = 90;
var mountSkillId = 80001398;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}