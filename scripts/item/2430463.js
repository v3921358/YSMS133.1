/* 
 * 2430463 - ��������������(30��Ȩ) - ˫���������30����ʹ����˼���[��������������]�� 
 */
var period = 30;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}