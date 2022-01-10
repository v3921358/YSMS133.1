/* 
 * 2430580 - √Œª√≈‹≥µ∆Ô≥Ë
 */
var period = 1;
var mountSkillId = 80001563;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}