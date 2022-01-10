function enter(pi) {

    var em = pi.getEventManager("siwu");
    var eim = em.getInstance("siwu")
    if (em.getProperty("state") == "1") {
        var map = eim.getMapInstance(350050200);
        for (var i = 0; i < eim.getPlayerCount(); i++) {
            eim.getPlayers().get(i).changeMap(map, map.getPortal(0))
        }
        pi.playerMessage(6, "swpq1next");
    } else {
        pi.warp(350050200, 0)
    }
}