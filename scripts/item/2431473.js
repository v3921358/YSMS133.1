/* 
 * 2430580 - ��Ʒ����һ���������(30��)
 */
var period = 30;
var mountSkillId = 80001774;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}