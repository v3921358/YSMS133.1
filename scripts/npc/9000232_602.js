/*
������֮����С��Ϸ

���ߣ����˰�
���ڣ�2011��1��22��

*/


var passwords = new Array(4);
var str;
var selectn1;
var selectn2;
var selectn3;
var selectn4;
var selectlog;
var postrue = 0;
var seltrue = 0;
var stars = "";
var unlock = 9;
var unlocklog = new Array("");
var str_unlocklog = "";

function start() {
	a = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1){
	  cm.dispose();
	}else{
	  if(mode == 1)
		a++;
	  else
		a = -1;
	if (a == -1){
      cm.dispose();
	  
    }else if (a == 0){
      cm.sendYesNo("\t\t\t\t\t- ����С��Ϸ -\r\n\r\n�������������ĸ����ظ���������ɣ��ڶԻ���������ѡ����ȷ�����֣��������ͻᱻ�򿪣�����������������0~9����ɣ������ĸ�����֮�䲻���ظ���\r\n\r\n#r#e�����飺#n#k\r\n������ʼ��Ϸ��NPC����������룬��һ���9�β¶���������Ļ��ᣬ��Ұ�����ʾ����ѡ��4�����֣������λ�������룬ȷ��֮���õ���ʾ��\r\n\r\n#r��#k��ʾ�ж��ٸ��𰸣�������ȷ��λ����ȷ\r\n#r��#k��ʾ�ж��ٸ��𰸣�������ȷ��λ�ò���ȷ\r\n\r\n#r#eע�����#n\r\n����ر���NPC�Ի�����ô�ٴε��NPC��ʼ��Ϸ�����ı䡣");
      for (var i = 0; i<4; i++) 
      {
        passwords[i] = Math.floor(Math.random()*10);
        for (var j = 0; j < i; j++) {
          if (passwords[j] == passwords[i]) {
            i--;
            break;
          }
        }
      }
	  }else if (a == 1){
		  var fa = "";
		  if (cm.getChar().getName() == "����ð�յ�") {
		  	fa=passwords[0]+""+passwords[1]+""+passwords[2]+""+passwords[3]
		  }
      str = fa+"��ѡ���һλ����\r\n\r\n";
      postrue = seltrue = 0;
      for (var i = 0; i < 10; i++) {
        str += "#L" + i + "#" + i;
      }
      str += "#l\r\n\r\n\r\n��ѡ������֣�\r\n#nʣ�������#r" + unlock + "#k\r\n��¼��\r\n";
      cm.sendSimple(str + str_unlocklog);
	  }else if (a == 2){
      str = "��ѡ��ڶ�λ����\r\n\r\n";
      selectn1 = selection;
      for (var i = 0; i < 10; i++) {
        if (i != selectn1)
          str += "#L" + i + "#" + i;
      }
      str += "#l";
      selectlog = "\r\n\r\n\r\n��ѡ������֣�#r" + selectn1;
      selectlog += "\r\n#kʣ�������#r" + unlock + "#k\r\n��¼��\r\n";
      cm.sendSimple(str + selectlog + str_unlocklog);
	  }else if (a == 3){
      str = "��ѡ�����λ����\r\n\r\n";
      selectn2 = selection;
      for (var i = 0; i < 10; i++) {
        if (i != selectn1 && i != selectn2)
          str += "#L" + i + "#" + i;
      }
      str += "#l";
      selectlog = "\r\n\r\n\r\n��ѡ������֣�#r" + selectn1 + " " + selectn2;
      selectlog += "\r\n#kʣ�������#r" + unlock + "#k\r\n��¼��\r\n";
      cm.sendSimple(str + selectlog + str_unlocklog);
	  }else if (a == 4){
      str = "��ѡ�����λ����\r\n\r\n";
      selectn3 = selection;
      for (var i = 0; i < 10; i++) {
        if (i != selectn1 && i != selectn2 && i != selectn3)
          str += "#L" + i + "#" + i;
      }
      str += "#l";
      selectlog = "\r\n\r\n\r\n��ѡ������֣�#r" + selectn1 + " " + selectn2 + " " + selectn3;
      selectlog += "\r\n#kʣ�������#r" + unlock + "#k\r\n��¼��\r\n";
      cm.sendSimple(str + selectlog + str_unlocklog);
	  }else if (a == 5){
      selectn4 = selection;
      selectlog = "\t\t\t\tȷ�����������ֿ���ô? #r\r\n\r\n\t\t\t\t\t   " + selectn1 + " " + selectn2 + " " + selectn3 + " " + selectn4;
      selectlog += "\r\n#kʣ�������#r" + unlock + "#k\r\n��¼��\r\n";
      cm.sendYesNo(selectlog + str_unlocklog);
    }else if (a == 6){
      for (var i=0; i<4; i++){
        if (passwords[i] == selectn1) {
          if (i == 0)
            postrue += 1;
          else
            seltrue += 1;
        } else if (passwords[i] == selectn2) {
          if (i == 1)
            postrue += 1;
          else
            seltrue += 1;
        } else if (passwords[i] == selectn3) {
          if (i == 2)
            postrue += 1;
          else
            seltrue += 1;
        } else if (passwords[i] == selectn4) {
          if (i == 3)
            postrue += 1;
          else
            seltrue += 1;
        }     
      }
      
      unlocklog.push("" + selectn1 + selectn2 + selectn3 + selectn4 + "��#r" + postrue + "��  " + seltrue + "��#k\r\n");
      str_unlocklog = "";
      for (var i = 0; i < unlocklog.length; i++)
        str_unlocklog += unlocklog[i];
      if (postrue == 4) {
        cm.sendNext("��ϲ��,�����ɹ�!������#r1000���þ�#k\r\n\r\n���ļ�¼��\r\n" + str_unlocklog);
		cm.channelMessage(0x18, "��������Ϸ��" + " : " + "[" + cm.getChar().getName() + "]�ɹ������������1000���þ�");
		cm.gainNX(2, 1000);
      } else {
        unlock -= 1;
        if (unlock > 0)
          a = 0;
        cm.sendNext("���ź�,����ʧ��!");
      }
    }else if (a == 7){
      if (postrue != 4) {
        cm.sendOk("���Ŀ��������Ѿ�������~\r\n\r\n��ȷ����Ϊ��" + passwords + "\r\n���ļ�¼��\r\n" + str_unlocklog);
        cm.dispose();
      } else {
        cm.sendOk("��ӭ��������ս~");
        cm.dispose();
      }
      
	  }//status
	}
}