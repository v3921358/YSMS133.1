/* 
 * 2430707 - ����������7��ʹ��ȯ - ����������7��ʹ��ȯ.\r\n#c˫���������7����ʹ�ú��������＼��.#
 */
var period = 7;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}