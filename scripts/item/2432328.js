/* 
 * 2430580 - NaverÃ±×ÓÆï³è
 */
var period = 30;
var mountSkillId = 80001435;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}