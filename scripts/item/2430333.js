/* 
 * 2431390 - ���� �ϻ�ֻ�Ǵ�˵ ����
 */
var period = 90;
var mountSkillId = 20011034;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId);
    im.dispose();
}