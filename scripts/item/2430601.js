/* 
 * 2430601 - ʥ��������˹3�콻��ȯ - ˫���������3����ʹ����˼���[ʥ��������˹]��
 */
var period = 3;
var mountSkillId = 1042;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}