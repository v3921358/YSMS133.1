/* 
 * ���� ������� 30��
 */
var period = 30;
var mountSkillId = 80001198;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}