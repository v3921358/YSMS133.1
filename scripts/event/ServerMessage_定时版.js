var Message = new Array(
	"��ӭ��������������Ϸ��Ŀǰ��Ϸ����BUG�϶ࡣ��Ϸ���������ֵ��߻����������⡣",
	"��Ϸ�ڣ����еĶ�������Ҫ���Լ���Ŭ���õ���GM������κ�����κζ�����",
	"����ʹ���κηǷ����򣺱��ٳ���,����,�޵�,���MISS,����,�޸�WZ,���ٹ�ͼ,�޸Ĺ���״̬,�һ������,���������ŷ�IP��",
	"������Ϸ����ط�(BUG)����Ϸ©��ʱ.���һʱ���ύ�����߹���.�緢��BUG���ύ��������ϷBUG�Ƿ��������Ʒ�Ʋ������ڷ�Ŵ��������ύ�ش�BUG����ң����ǽ�������ȯ������",
	"ʹ�� @help ������Բ鿴�㵱ǰ��ʹ�õ������б�",
	"����޷���NPC���жԻ�����ʹ�� @ea ���",
	"��һЩ��ȥ�ĳ��е�ͼ���Ե����ߵĿ���ƶ����������ƶ��������г������˽ֵȵȵ�ͼ��",
	"��ҿ��Ե�רҵ������ͼѧϰ��������ܡ�",
	"�����ҿ����˵�ͼ������ʹ��@FM�ص��г�",
	"�Ͻ����˽��RMB�ȷ���Ϸ���ݽ���,˭������Ƿ�����,��һ���ṩ��ͼ�ٱ�,�����޳���öԷ�������Ʒ.�º�24Сʱ�ھٱ�Ҳ��.");

var setupTask;

function init() {
	scheduleNew();
}

function scheduleNew() {
	setupTask = em.schedule("start", 900000);
}

function cancelSchedule() {
	setupTask.cancel(false);
}

function start() {
	scheduleNew();
	var ca = java.util.Calendar.getInstance();
	var year = ca.get(java.util.Calendar.YEAR); //������
	var month = ca.get(java.util.Calendar.MONTH) + 1; //����·�
	var day = ca.get(java.util.Calendar.DATE); //��ȡ��
	var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
	var minute = ca.get(java.util.Calendar.MINUTE); //��÷���
	var second = ca.get(java.util.Calendar.SECOND); //�����
	var weekday = ca.get(java.util.Calendar.DAY_OF_WEEK);

	if (month == 1 && day == 1 && hour == 7 && minute == 10) {
		//em.broadcastServerMsg("[��������] " + Message[Math.floor(Math.random() * Message.length)]);
	}
}