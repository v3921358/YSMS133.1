/* 
 * 2430580 - ���������������ʹ��ȯ1��
 */
var period = 1;
var mountSkillId = 80001410;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}