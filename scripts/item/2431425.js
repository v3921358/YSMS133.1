/* 
 * 2430580 - �����ƶ����
 */
var period = 90;
var mountSkillId = 80011236;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}