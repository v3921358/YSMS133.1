/* 
 * 2431390 - ���� ��������Ӱ ����
 */
var period = 90;
var mountSkillId = 80001223;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}