/* 
 * 2430580 - 天空自行车骑宠
 */
var period = 90;
var mountSkillId = 80001244;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}