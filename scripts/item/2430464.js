/* 
 * 2430464 - ������������������Ȩ -  ˫�������ʹ����˼���[��������������]��
 */
var period = -1;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}