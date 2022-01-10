/* 
 * 2430580 - 堕天使路西法骑宠
 */
var period = 90;
var mountSkillId = 80001447;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}