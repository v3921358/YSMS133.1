/* 
 * 2430580 -  •µÆ—©«¡∆Ô≥Ë7ÃÏ π”√»Ø
 */
var period = 7;
var mountSkillId = 80001022;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}