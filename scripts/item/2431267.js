/* 
 * 2431390 - ���� ����Ա� ����
 */
var period = 90;
var mountSkillId = 80001228;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}