/* 
 * 2430586 - ��ʿ��ս��3�콻��ȯ - ˫��������3����ʹ����˼���[��ʿ��ս��]��\nϰ��#c�������#���ܺ󣬻��ɼ�Ԧ���С�
 */
var period = 3;
var mountSkillId = 80001071;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}