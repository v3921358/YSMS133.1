/* 
 * ���� ��ѩ�� 7��
 */
var period = 7;
var mountSkillId = 80001024 ;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}