package server.life;

import handling.world.WorldBroadcastService;

import java.awt.Point;
import java.util.concurrent.atomic.AtomicBoolean;

import server.Randomizer;
import server.maps.MapleMap;
import tools.MaplePacketCreator;

public class SpawnPointAreaBoss extends Spawns {

    private MapleMonsterStats monster;
    private Point pos1;
    private Point pos2;
    private Point pos3;
    private long nextPossibleSpawn;
    private int mobTime, fh, f, id;
    private AtomicBoolean spawned = new AtomicBoolean(false);
    private String msg; //刷出时提示的公告信息
    private boolean sendWorldMsg = false; //是否全服提示公告

    public SpawnPointAreaBoss(MapleMonster monster, Point pos1, Point pos2, Point pos3, int mobTime, String msg, boolean shouldSpawn, boolean sendWorldMsg) {
        this.monster = monster.getStats();
        this.id = monster.getId();
        this.fh = monster.getFh();
        this.f = monster.getF();
        this.pos1 = pos1;
        this.pos2 = pos2;
        this.pos3 = pos3;
        this.mobTime = (mobTime < 0 ? -1 : (mobTime * 1000));
        this.msg = msg;
        this.sendWorldMsg = (msg != null && sendWorldMsg);
        this.nextPossibleSpawn = System.currentTimeMillis() + (shouldSpawn ? 0 : this.mobTime);
    }

    @Override
    public int getF() {
        return f;
    }

    @Override
    public int getFh() {
        return fh;
    }

    @Override
    public MapleMonsterStats getMonster() {
        return monster;
    }

    @Override
    public byte getCarnivalTeam() {
        return -1;
    }

    @Override
    public int getCarnivalId() {
        return -1;
    }

    @Override
    public boolean shouldSpawn(long time) {
        if (mobTime < 0 || spawned.get()) {
            return false;
        }
        return nextPossibleSpawn <= time;
    }

    @Override
    public Point getPosition() {
        int rand = Randomizer.nextInt(3);
        return rand == 0 ? pos1 : rand == 1 ? pos2 : pos3;
    }

    @Override
    public MapleMonster spawnMonster(MapleMap map) {
        Point pos = getPosition();
        MapleMonster mob = new MapleMonster(id, monster);
        mob.setPosition(pos);
        mob.setCy(pos.y);
        mob.setRx0(pos.x - 50);
        mob.setRx1(pos.x + 50); //these dont matter for mobs
        mob.setFh(fh);
        mob.setF(f);
        spawned.set(true);
        mob.addListener(new MonsterListener() {

            @Override
            public void monsterKilled() {
                nextPossibleSpawn = System.currentTimeMillis();

                if (mobTime > 0) {
                    nextPossibleSpawn += mobTime;
                }
                spawned.set(false);
            }
        });
        map.spawnMonster(mob, -2);
        /*
         * 怪物刷出来的公告提示
         */
        if (msg != null) {
            if (sendWorldMsg) {
                WorldBroadcastService.getInstance().broadcastMessage(MaplePacketCreator.spouseMessage(0x14, "[系统提示] " + msg));
            } else {
                map.broadcastMessage(MaplePacketCreator.serverNotice(6, msg));
            }
        }
        return mob;
    }

    @Override
    public int getMobTime() {
        return mobTime;
    }
}
