/*
 �ű����ܣ����ﰲ�ؾ��������
 */
var status = 0;
var result = Array();
var resultAll = Array();
var aaa = Array();//����ò���resultAll���� �������ת
var em;
var eim;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            em = cm.getEventManager("AliantSystem");
            eim = em.getInstance("AliantSystem")
            if (em.getProperty("FriendlyTips") == "done" || cm.getPlayer().isGM()) {//�������ͳ�ƽ׶�
                text = "#e<���ﰲ�ؾ�����>#n\r\n#d�����������������������\r\n\r\n#b"
                for (var i = 0; i < parseInt(eim.getProperty("PlayerCount")); i++) {
                    result.push(eim.getPlayers().get(i).getName())//һά��������
                    result.push(eim.getKillCount(eim.getPlayers().get(i)))//��ά�����������
                    resultAll.push(result)//���ϳ�һ������
                    result = Array();
                }

                //ð�����򷨿�ʼ��ȡ���
                for (var i = 0; i < resultAll.length; i++) {
                    for (var j = 0; j < resultAll.length; j++) {
                        var temp;
                        if (resultAll[i][1] > resultAll[j][1]) {
                            temp = resultAll[j];
                            resultAll[j] = resultAll[i];
                            resultAll[i] = temp;
                        }
                    }
                }

                var sort;
                for (var i = 0; i < resultAll.length; i++) {
                    sort = i + 1;
                    text += "��" + sort + "����" + resultAll[i][0] + "  �������������" + resultAll[i][1] + "\r\n"
                    aaa.push(resultAll[i][0]);
                }
                text += "#b#L99# ֪������������ȡ�����뿪��ͼ��"
                cm.sendSimpleS(text, 9)
            } else {
                if (cm.getMapId() == 980010100) {//������ڵȴ���ͼ
                    cm.openNpc(2101017, 1);
                } else if (cm.getMapId() == 980010101) {//�������ս����ͼ
                    status = 1;
                    cm.sendSimple("���ﰲ�ؾ�������ʼ�ˣ�������ʲô�أ�#b\r\n#L0# �����뿪�����������!");
                }
            }
        } else if (status == 1) {
            var em = cm.getEventManager("AliantSystem");
            if (cm.MissionStatus(cm.getPlayer().getId(), 105, 0, 4) == false) {
                cm.MissionMake(cm.getPlayer().getId(), 105, 0, 0, 0, 999999)//��¼����������
            }
            var count = eim.getKillCount(cm.getPlayer());
            cm.warp(910000000, 0)
            em.setProperty("FriendlyTips", "0");
            cm.MissionAddMinNum(cm.getPlayer().getId(), 105, count)
            var text = "����˾�������" + count + "��\r\n���������������С����(������)#b[��������]#k���һ���Ʒ."

            if (sort != 1) {
                var sort = 0;
                for (var i = 0; i < 1; i++) {//ǰ1��
                    sort = i + 1;
                    if (aaa[i] == cm.getPlayer().getName()) {
                        text += "\r\n���������ڵ�" + sort + "������������100���������֡�"
                        cm.MissionAddMinNum(cm.getPlayer().getId(), 105, 100)//����100����������
                    }
                }
            }
            cm.sendOk(text);
            cm.worldMessage("[���ﰲ�ؾ�����] ��������" + cm.getChar().getName() + "  ��ҹ������" + cm.MissionGetMinNum(cm.getPlayer().getId(), 105, 999999) + "���������֡�");
            //cm.warp(910000000, 0);
            cm.dispose();
        } else if (status == 2) {
			if (selection == 0) {
				cm.warp(910000000, 0);
				cm.sendOk("�ðɣ��ټ�");
				cm.dispose();
			}
		}
    }
}