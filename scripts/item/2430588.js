/* 
 * 2430588 - �����صİ���3�콻��ȯ - ˫��������3����ʹ����˼���[�����صİ���]��
 */
var period = 3;
var mountSkillId = 80001062;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}