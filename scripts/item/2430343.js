/* 
 * 2431390 - ���� ������ ����
 */
var period = 90;
var mountSkillId = 30001027;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}