/* 
 * 2431390 - ���� ����� ����
 */
var period = 90;
var mountSkillId = 20001153;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}