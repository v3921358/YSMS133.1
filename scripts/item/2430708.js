/* 
 * 2430708 - ����������15��ʹ��ȯ - ����������15��ʹ��ȯ.\r\n#c˫���������15����ʹ�ú��������＼��.#
 */
var period = 15;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}