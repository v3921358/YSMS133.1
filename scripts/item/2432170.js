/* 
 * 2430580 - ����ʹͬ�����
 */
var period = 90;
var mountSkillId = 80001261;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}