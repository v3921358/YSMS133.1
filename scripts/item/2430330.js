/* 
 * ���� ����Ħ�� 90��
 */
var period = 90;
var mountSkillId = 30011063;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}