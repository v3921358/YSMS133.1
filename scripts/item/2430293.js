/* 
 * 2431390 - ���� �ɴ� ����
 */
var period = 90;
var mountSkillId = 10001146;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}