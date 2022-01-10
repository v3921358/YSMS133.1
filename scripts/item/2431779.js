/* 
 * 2430580 - Ò¡Ò¡Ä¾ÂíÆï³è
 */
var period = 90;
var mountSkillId = 80001290;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}