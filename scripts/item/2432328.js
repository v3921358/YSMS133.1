/* 
 * 2430580 - Naverñ�����
 */
var period = 30;
var mountSkillId = 80001435;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}