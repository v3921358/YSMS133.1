/* 
 * 2431390 - ���� ����˹�Ĳ�Ȯ ����
 */
var period = 90;
var mountSkillId = 10001136;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}