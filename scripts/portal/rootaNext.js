function enter(pi) {
     if(pi.getPlayer().getMapId() == 105200110){
        pi.openNpc(1064013,2); //��ͨ���
     }else if(pi.getPlayer().getMapId() == 105200500){
        pi.openNpc(1064013,1); //���װ��
     }else if(pi.getPlayer().getMapId() == 105200200){
        pi.openNpc(1064012,2); //��ͨƤ����
     }else if(pi.getPlayer().getMapId() == 105200600){
        pi.openNpc(1064012,1); //����Ƥ����
     }else if(pi.getPlayer().getMapId() == 105200400){
        pi.openNpc(1064015,2); //��ͨ����
     }else if(pi.getPlayer().getMapId() == 105200800){
        pi.openNpc(1064015,1); //���ױ���
     }else if(pi.getPlayer().getMapId() == 105200300){
        pi.openNpc(1064014,2); //��ͨѪ��Ů��
     }else if(pi.getPlayer().getMapId() == 105200700){
        pi.openNpc(1064014,1); //����Ѫ��Ů��
     }
}