/* 
 * 2430580 - 和品克缤一起旅行骑宠(30天)
 */
var period = 30;
var mountSkillId = 80001774;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}