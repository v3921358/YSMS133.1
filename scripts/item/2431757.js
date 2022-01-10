/* 
 * 2430580 - Æ®Æ®ÆøÇòÆï³è7
 */
var period = 7;
var mountSkillId = 80001285;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}