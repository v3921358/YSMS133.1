/* 
 * 2430580 - ʥ��ѩ�����7��ʹ��ȯ
 */
var period = 7;
var mountSkillId = 80001022;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}