/* 
 * 2430318 - ����90�콻��ȯ - ˫��������90����ʹ��[����]��輼�ܡ�
 */
var period = 90;
var mountSkillId = 10001121;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period, true);
    im.dispose();
}