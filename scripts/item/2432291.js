/* 
 * 2430580 - ª¨∞Â∆Ô≥Ë
 */
var period = 90;
var mountSkillId = 80001238;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}