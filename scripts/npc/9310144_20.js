/*
 �ű����ܣ��Ĳ�
 */

var a = 0;
var selects; //��¼��ҵ�ѡ��
var item = 4310036; //��ע����Ʒ
var SelectItem; //������ע������
var Beishu;
var rand; //�������
var Unsuccess = false;
var notice = false;

function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
            Unsuccess = false;
            var text = "\t\t#r���ֶ������������߱Ҵ򶹶���#l\r\n\r\n";
            //text += "#L0#�� ��   ~    �ݡ�#l     #L1# �� ��   ~    �᡿#l\r\n\r\n\r\n";
            //text += "#L2#��#l #L3#��#l #L4#��#l #L5#��#l #L6#��#l #L7#��#l #L8#��#l #L9#��#l #L10#��#l\r\n";
	    text += "#b��ģʽ#l\r\n";
            text += "#L0##i3600100##l #L1##i3600101##l #L2##i3600102##l\r\n\r\n";
	    text += "#b����ģʽ#l\r\n";
	    text += "#L10##i3600103##l #L20##i3600104##l #L30##i3600200##l #L40##i3600201##l #L50##i3600201##l\r\n\r\n";
	    text += "#L60##i3600202##l #L70##i3600203##l #L80##i3600003##l #L90##i3600004##l #L100##i3600005##l\r\n\r\n";
	    text += "\t\r\n\r\n";
            cm.sendSimple(text);
        } else if (a == 1) {
            if (cm.getSpace(4) < 10) {
                cm.sendOk("�Բ�����������������ڳ�10���ո����ϡ�")
                cm.dispose();
            } else {
                selects = selection;
                cm.sendGetNumber("��������Ҫ��ע��#b#z" + item + "##k����:\r\n#r -��ע���������رյ�NPC�����˻������߱ң�\r\n#r - Ͷע������Ϊ100��.", 1, 1, 100);
            }
        } else if (a == 2) {
            SelectItem = selection;
            if (cm.haveItem(item, SelectItem)) {//�����ע���������ϱ������������߱ҵ�����
                cm.gainItem(item, -SelectItem); //�۳������߱�
                rand = Math.floor(Math.random() * 100) + 1; //1~9
                if (selects == 0 || selects == 1) {
                    switch (selects) {
                        case 0://1~5
                            if (rand >= 1 && rand <= 30) {//1~20�������
                                text = "Ҫ���1-30��������������Ʒ������ #r"+ rand +"#k ����,���2��������\r\n�㽫���2���Ľ�����������һ����ȡ��";
                                SelectItem = SelectItem * 2; //��һ��
				cm.worldSpouseMessage(0x20, "[���ֶ�����]�� ��ϲ" + cm.getChar().getName() + ",�ڻ��ֶ��������˹���HP x 1.2���гɹ����2��������")
                                Beishu = 2;
                            } else {
                                text = "���ź���Ҫ���1-30����������û�д����߳��꣬Ŀǰ�� #r"+rand+"#k ��������";
                                Unsuccess = true;
                            }
                            break;
                        case 1://6~9
                            if (rand >= 70 && rand <= 100) {//1~5�������
                                text = "Ҫ���70-100��������������Ʒ������ #r"+ rand +"#k ����,���2�������� \r\n�㽫���2���Ľ�����������һ����ȡ��";
                                SelectItem = SelectItem * 2; //��һ��
				cm.worldSpouseMessage(0x20, "[���ֶ�����]�� ��ϲ" + cm.getChar().getName() + ",�ڻ��ֶ��������˹���HP x 1.5���гɹ����2��������")
                                Beishu = 2;
                            } else {
                                text = "���ź���Ҫ���70-100����������û�д����߳��꣬Ŀǰ�� #r"+rand+"#k ��������";
                                Unsuccess = true;
                            }
                            break;
               		case 2://6~9
                            if (rand >= 31 && rand <= 69) {//1~5�������
                                text = "Ҫ���30-70��������������Ʒ������ #r"+ rand +"#k ����,���2�������� \r\n�㽫���2���Ľ�����������һ����ȡ��";
                                SelectItem = SelectItem * 2; //��һ��
				cm.worldSpouseMessage(0x20, "[���ֶ�����]�� ��ϲ" + cm.getChar().getName() + ",�ڻ��ֶ��������˹���HP x 5���гɹ����2��������")
                                Beishu = 2;
                            } else {
                                text = "���ź���Ҫ���30-70����������û�д����߳��꣬Ŀǰ�� #r"+rand+"#k ��������";
                                Unsuccess = true;
                            }
                            break;
                    }
                } else {//�����������ѡ��
                    if (rand == (selects - 1)) {//������������һ��
                        text = "��ϲ�㣡��Ʒ��������\r\n�㽫���10���Ľ�����������һ����ȡ��"
                        SelectItem = SelectItem * 10;
                        Beishu = 10;
                        notice = true;
                    } else {
                        text = "���ź�����û�д����߳��ꡣ"
                        Unsuccess = true;
                    }
                }
                //cm.sendY(rand)
                if (Unsuccess) {
                    a = -1;
                }
                cm.sendNext(text);
            } else {//�����ע����������
                a = -1;
                cm.sendNext("�Բ����㱳������������߱�������������ע��������")
            }
        } else if (a == 3) {
            a = -1;
            cm.gainItem(item, SelectItem);
            cm.sendNext("����ȡ��" + Beishu + "���Ľ���!\r\n\r\n - �õ���" + SelectItem + "��#i" + item + "# #z" + item + "#")
            if (notice) {
                cm.worldSpouseMessage(0x20, "[���ֶ�����] :  ��ϲ" + cm.getChar().getName() + ",��<" + rand + "> �ɹ����10��������")
            }
        }//a
    }//mode
}//f