package handling.world.party;

import handling.world.WrodlPartyService;

import java.util.concurrent.ScheduledFuture;

import server.Timer.EtcTimer;

public class PartySearch {

    private String name; //max 40
    private int partyId;
    private PartySearchType pst;
    private ScheduledFuture<?> removal;

    public PartySearch(String name, int partyId, PartySearchType pst) {
        this.name = name;
        this.partyId = partyId;
        this.pst = pst;
        scheduleRemoval();
    }

    public PartySearchType getType() {
        return pst;
    }

    public int getId() {
        return partyId;
    }

    public String getName() {
        return name;
    }

    public final void scheduleRemoval() {
        cancelRemoval();
        removal = EtcTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                String msg = "超出限制时间，组队广告已被删除。";
                if (pst.exped) {
                    msg = "超出限制时间，远征队广告已被删除。";
                }
                WrodlPartyService.getInstance().removeSearch(PartySearch.this, msg);
            }
        }, pst.timeLimit * 60 * 1000);
    }

    public void cancelRemoval() {
        if (removal != null) {
            removal.cancel(false);
            removal = null;
        }
    }
}
