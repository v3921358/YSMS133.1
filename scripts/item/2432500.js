/* 
 * 2430580 - ĞÂÄê¿ìÀÖÆï³è
 */
var period = 90;
var mountSkillId = 80001510;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}