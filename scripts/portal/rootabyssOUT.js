/*
  ³����˹��ͼ���ص���ǰ�ĵ�ͼ
*/

function enter(pi) {
    var returnMap = pi.getSavedLocation("ROOT");
    pi.clearSavedLocation("ROOT");
    if (returnMap < 0) {
        returnMap = 105000000;;
    }
    pi.warp(returnMap);
    pi.playerMessage("��³����˹�ص�ԭ�����ڵĵط���");
}