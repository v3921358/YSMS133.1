/* 
 * 2431390 - ���� ��� ����
 */
var period = 90;
var mountSkillId = 10001150;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}