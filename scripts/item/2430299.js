/* 
 * 2431390 - ���� ħ��ɨ�� ����
 */
var period = 90;
var mountSkillId = 10001149;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}