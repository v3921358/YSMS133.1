var typed = 0;
var text = "";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	var em = cm.getEventManager("Mzhy");
	var eim = em.getInstance("Mzhy");
	if (status == 0 && mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }
	
	if (status==0) {
		if (em.getProperty("state")==1) {
			text="������ʲô�ط�������ô���������\r\n\r\n(ǰ��������ˣ���ȥ�������ɡ�)";
			cm.sendOkS(text, 3);
			cm.dispose();
		} else {
			text="�����Ǻ�ħ��ʦ�����һ���þ���磬������ҵ���ȷ�Ļ��ؿ������������߳������ػþ���\r\n#b#L0#�Ҹ���ô����#l";
			cm.sendSimple(text);
		}
	} else if (status == 1) {
		var text="#d#e<��������>#n#k\r\n";
		text+="\t�þ���繲��#r#e20��#n#k��ÿһ�㶼�к�ħ��ʦ����ͽ���أ�����Ҫ��ɱ��ͼ�����еĹ��ﲢ�ҵ�#e#bʱ����#n#k�������ء�\r\n";
		text+="\t���ع���#r����ѡ��#k������#b��ȷ�Ļ���#k�����ǰ��1��2��þ�������#r����Ļ���#k�㽫�ᵹ��1��2��þ�����ͣ����ԭ�ء����븱����ÿһ��Ļ��ض��ǹ̶��ģ�����һ��Ҫ�μ�ǰһ�εĻ��أ�С����ٲ�����\r\n"
		text+="\t������ͬ�Ļ�����Ҫ���Ĳ�ͬ��ɫ����ţ�ǣ������ͨ������ռ�������#b#eʱ����#n#kֱ�ӹ���\r\n";
		text+="\tͻ�Ƶ�20��þ�֮�󣬻��ܺ�ħ��ʦ���ܻ�÷��Ľ�����\r\n";
		text+="#d#e#L0#>>>>��������<<<<#l#n#k"
		cm.sendSimple(text);
	} else if (status == 2) {
		cm.dispose();
		cm.openNpc(9070010);
	}
}