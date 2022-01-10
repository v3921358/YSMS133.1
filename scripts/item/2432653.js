/* 
 * 2430580 - 舞动的向日葵骑宠
 */
var period = 90;
var mountSkillId = 80001533;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}