/* 
 * 2431390 - ���� ����Ħ�� ����
 */
var period = 90;
var mountSkillId = 30011063;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}