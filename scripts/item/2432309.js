/* 
 * 2432309 - ���� ���� ����
 */
var period = -1;
var mountSkillId = 80001404;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);//, true);
    im.dispose();
}