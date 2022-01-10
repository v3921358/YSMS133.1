package client;

import java.util.concurrent.ScheduledFuture;

import server.MapleStatEffect;

public class MapleBuffStatValueHolder {

    public MapleStatEffect effect;
    public long startTime;
    public int value, localDuration, fromChrId;
    public ScheduledFuture<?> schedule;

    public MapleBuffStatValueHolder(MapleStatEffect effect, long startTime, ScheduledFuture<?> schedule, int value, int localDuration, int fromChrId) {
        super();
        this.effect = effect;
        this.startTime = startTime;
        this.schedule = schedule;
        this.value = value;
        this.localDuration = localDuration;
        this.fromChrId = fromChrId;
    }
}
