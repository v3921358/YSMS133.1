/* 
 * 2431390 - ���� ����Ѳ�߳� ����
 */
var period = 90;
var mountSkillId = 80001078;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}