/* 
 * 2430318 - ���� ���� ����
 */
var period = 90;
var mountSkillId = 10001121;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);//, period, true);
    im.dispose();
}