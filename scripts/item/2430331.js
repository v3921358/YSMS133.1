/* 
 * 2431390 - ���� ���ľ�� ����
 */
var period = 90;
var mountSkillId = 30001025;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}