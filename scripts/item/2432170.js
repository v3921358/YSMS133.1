/* 
 * 2430580 - 与天使同在骑宠
 */
var period = 90;
var mountSkillId = 80001261;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}