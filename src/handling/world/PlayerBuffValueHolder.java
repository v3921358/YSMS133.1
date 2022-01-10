package handling.world;

import client.MapleBuffStat;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import server.MapleStatEffect;
import tools.Pair;

/*
 * 角色BUFF的具体信息
 */
public class PlayerBuffValueHolder implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    public long startTime;
    public int localDuration, fromChrId;
    public MapleStatEffect effect;
    public ArrayList<Pair<MapleBuffStat, Integer>> statup;

    public PlayerBuffValueHolder(long startTime, MapleStatEffect effect, ArrayList<Pair<MapleBuffStat, Integer>> statup, int localDuration, int fromChrId) {
        this.startTime = startTime;
        this.effect = effect;
        this.statup = statup;
        this.localDuration = localDuration;
        this.fromChrId = fromChrId;
    }

    public PlayerBuffValueHolder(long startTime, MapleStatEffect effect, List<Pair<MapleBuffStat, Integer>> statup) {
        this.startTime = startTime;
        this.effect = effect;
        this.statup = (ArrayList<Pair<MapleBuffStat, Integer>>) statup;
    }
}
