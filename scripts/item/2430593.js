/* 
 * 2430593 - ����3�콻��ȯ - ˫�����Դӵ�������3����ʹ����輼��[����]��\n����Ҽ���������������˴�ˡ�
 */
var period = 3;
var mountSkillId = 1115;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}