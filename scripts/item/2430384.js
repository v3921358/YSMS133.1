function start() {
	
	var rand = Math.floor(Math.random() * 14);
	var item;
	var num;
	var name;
	
	if (rand <3){
		item = 1022097;
		num = 1;
		name = "���۾�";
	}else if (rand < 1){
		item = 1142216
		num = 1;
		name = "VIPѫ��"
	}else if (rand == 2){
		item = 1102207
		num = 1;
		name = "�������"
	}else if (rand == 3){
		item = 1122104
		num = 1;
		name = "���յ�׹"
	}else if (rand == 4){
		item = 1012191
		num = 1;
		name = "��Ӱ˫�����"
	}else if (rand == 5){
		item = 1002850
		num = 1;
		name = "ʥ��¹����ñ"
	}else if (rand == 11){
		item = 1112494
		num = 1;
		name = "�Ϲ����Ž�ָLV49"
	}else if (rand == 12){
		item = 2040121
		num = 1;
		name = "��Ӱ˫�����ܾ���"
	}else if (rand == 6){
		item = 1122143
		num = 1;
		name = "���ѵ�ð��֮��(սʿ)"
	}else if (rand == 7){
		item = 1122144
		num = 1;
		name = "���ѵ�ð��֮��(ħ��ʦ)"
	}else if (rand == 8){
		item = 1122145
		num = 1;
		name = "���ѵ�ð��֮��(������)"
	}else if (rand == 9){
		item = 1122146
		num = 1;
		name = "���ѵ�ð��֮��(����)"
	}else if (rand == 10){
		item = 1122147
		num = 1;
		name = "���ѵ�ð��֮��(����)"
	}else if (rand == 13){
		item = 2040212
		num = 1;
		name = "���۾�ר���������"
	}else{
		item = 2040212
		num = 1;
		name = "���۾�ר���������"
	}//rand
	if (it.gainItem(item,num)){
	it.remove(-1); //����1��ʹ�õ��������
	it.sendY("����ð�յ�7��������䣬��ȡ�� "+name+" "+num+"��")
	}
	it.dispose(); 
}