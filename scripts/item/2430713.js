/* 
 * 2430713 - ��������������ʹ��ȯ - ��������������ʹ��ȯ.\r\n#c˫�������������ʹ�ú��������＼��.#
 */
var period = -1;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}