/* 
 * 2431390 - ���� �ڷ��� ����
 */
var period = 90;
var mountSkillId = 80001237;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}