/* 
 * 2431390 - ���� ��ʿ��ս�� ����
 */
var period = 90;
var mountSkillId = 10001151;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}