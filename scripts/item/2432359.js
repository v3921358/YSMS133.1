/* 
 * 2430580 - Ê¥ÌìÊ¹Ã×¿¨°£¶ûÆï³è
 */
var period = 90;
var mountSkillId = 80001445;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}