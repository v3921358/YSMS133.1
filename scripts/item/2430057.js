/* 
 * ���� ���� 30��
 */
var period = 30;
var mountSkillId = 10001033 ;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}