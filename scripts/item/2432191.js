/* 
 * 2430580 - Ë«·Ûºì·ÉÂíÆï³è
 */
var period = 90;
var mountSkillId = 80001196;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}