/* 
 * 2430318 - ���� С��� ����
 */
var period = 90;
var mountSkillId = 10001122;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}