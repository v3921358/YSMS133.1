/* 
 * 2430580 - 兔兔赏月骑宠永久使用券1天
 */
var period = 1;
var mountSkillId = 80001410;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}