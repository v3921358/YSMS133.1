/* 
 * 2430580 - �趯�����տ����
 */
var period = 90;
var mountSkillId = 80001533;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}