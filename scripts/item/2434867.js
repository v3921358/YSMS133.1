/* 
 * 2430580 - "ѩ�����90��ʹ��ȯ

"
 */
var period = 90;
var mountSkillId = 80001244;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}