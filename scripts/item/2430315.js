/* 
 * 2431390 - ���� ���ȵ�ħ���� ����
 */
var period = 90;
var mountSkillId = 20001118;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}