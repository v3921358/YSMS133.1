/* 
 * ���� ά��ս�� 7��
 */
var period = 7;
var mountSkillId = 10001129;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}