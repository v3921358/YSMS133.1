/* 
 * ���� �޹�ˮţ ����
 */
var period = 90;
var mountSkillId = 10001123;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);//, period, true);
    im.dispose();
}