/* 
 * 2431390 - ���� èͷӥ ����
 */
var period = 90;
var mountSkillId = 30001069;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}