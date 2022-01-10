/* 
 * 2430580 - "ÃÛºûµûÆï³è

"
 */
var period = 90;
var mountSkillId = 80001492;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}