/* 
 * ���� ��ʿ��ս�� 90��
 */
var period = 90;
var mountSkillId = 10001151;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}