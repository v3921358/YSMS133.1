/* 
 * 2430578 - ֱ����3�콻��ȯ - ˫��������3����ʹ����˼���[ֱ����]��\nϰ��#c�������#���ܺ󣬻��ɼ�Ԧ���С�
 */
var period = 3; //��������
var mountSkillId = 1157; //����ID 

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}