/* 
 * 2430580 - "�ۺ������

"
 */
var period = 90;
var mountSkillId = 80001492;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}