function enter(pi) {
   if(pi.getPlayer().getMapId() == 744000008 && pi.getPlayer().getParty() != null && pi.haveItem(4001137) && pi.isLeader()){
        pi.warpParty(744000014); //�����
        pi.gainItem(4001137,-1);
        pi.playPortalSE();
    } else {
	if(pi.getPlayer().getMapId() == 744000008){
        pi.playerMessage(5, "��ȷ�����Ƿ���ɿ��Դ��⣡");
	}
}
    if(pi.getPlayer().getMapId() == 744000014 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410183) && pi.isLeader()){
        pi.warpParty(744000013); //�ս���
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000013 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410182) && pi.isLeader()){
        pi.warpParty(744000015); //�ֶӲ�
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000015 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410184) && pi.isLeader()){
        pi.warpParty(744000003); //У����
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000003 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410178) && pi.isLeader()){
        pi.warpParty(744000002); //�ֿ�
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000002 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410179) && pi.isLeader()){
        pi.warpParty(744000006); //�����Ľ���
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000006 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410147) && !pi.haveMonster(9410148) && !pi.haveMonster(9410149) && !pi.haveMonster(9410150) && !pi.haveMonster(9410151) && pi.isLeader()){
        pi.warpParty(744000007); //ǰ;��̸��
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000007 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410171) && pi.isLeader()){
        pi.warpParty(744000004); //������
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000004 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410177) && pi.isLeader()){
        pi.warpParty(744000010); //������
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000010 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410180) && pi.isLeader()){
        pi.warpParty(744000009); //������
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000009 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410187) && !pi.haveMonster(9410188) && !pi.haveMonster(9410189)  && pi.isLeader()){
        pi.warpParty(744000011); //��ѧʵ����
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000011 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410190) && pi.isLeader()){
        pi.warpParty(744000012); //ͼ����
        pi.playPortalSE();
    } else if(pi.getPlayer().getMapId() == 744000012 && pi.getPlayer().getParty() != null && !pi.haveMonster(9410181) && pi.isLeader()){
        pi.warpParty(744000001); //�ݶ�
        pi.playPortalSE();
    } else {
	if(pi.getPlayer().getMapId() != 744000008){
        pi.playerMessage(5, "��ȷ�ϵ�ǰ��ͼ�Ƿ񻹴��ڹ��");
	}
    }
}