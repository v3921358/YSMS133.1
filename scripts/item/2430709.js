/* 
 * 2430709 - ����������90��ʹ��ȯ - ����������90��ʹ��ȯ.\r\n#c˫���������90����ʹ�ú��������＼��.#
 */
var period = 90;
var mountSkillId = 80001142;

function start() {
    im.giveMountSkill(im.getItem(), mountSkillId, period);
    im.dispose();
}