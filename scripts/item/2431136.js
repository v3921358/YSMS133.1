/* 
 * 2431390 - ���� ������鰢���� ����
 */
var period = 90;
var mountSkillId = 80001224;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}