/* 
 * 2430462 - ��������������(7��Ȩ) -  ˫���������7����ʹ����˼���[��������������]�� 
 */
var period = 7;
var mountSkillId = 80001120;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period,true);
    im.dispose();
}