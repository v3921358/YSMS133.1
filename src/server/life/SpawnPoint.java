package server.life;

import client.skills.SkillFactory;
import client.status.MonsterStatus;
import client.status.MonsterStatusEffect;

import java.awt.Point;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import server.MapleCarnivalFactory;
import server.MapleCarnivalFactory.MCSkill;
import server.MapleStatEffect;
import server.maps.MapleMap;
import server.maps.MapleReactor;
import server.maps.MapleSummon;
import tools.MaplePacketCreator;

public class SpawnPoint extends Spawns {

    private MapleMonsterStats monster;
    private Point pos;
    private long nextPossibleSpawn;
    private int mobTime, carnival = -1, fh, f, id, level = -1;
    private AtomicInteger spawnedMonsters = new AtomicInteger(0);
    private String msg;
    private byte carnivalTeam;

    public SpawnPoint(MapleMonster monster, Point pos, int mobTime, byte carnivalTeam, String msg) {
        this.monster = monster.getStats();
        this.pos = pos;
        this.id = monster.getId();
        this.fh = monster.getFh();
        this.f = monster.getF();
        this.mobTime = (mobTime < 0 ? -1 : (mobTime * 1000));
        this.carnivalTeam = carnivalTeam;
        this.msg = msg;
        this.nextPossibleSpawn = System.currentTimeMillis();
    }

    public void setCarnival(int c) {
        this.carnival = c;
    }

    public void setLevel(int c) {
        this.level = c;
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
    public Point getPosition() {
        return pos;
    }

    @Override
    public MapleMonsterStats getMonster() {
        return monster;
    }

    @Override
    public byte getCarnivalTeam() {
        return carnivalTeam;
    }

    @Override
    public int getCarnivalId() {
        return carnival;
    }

    @Override
    public boolean shouldSpawn(long time) {
        if (mobTime < 0) {
            return false;
        }
        // regular spawnpoints should spawn a maximum of 3 monsters; immobile spawnpoints or spawnpoints with mobtime a
        // maximum of 1
        if (((mobTime != 0 || !monster.isMobile()) && spawnedMonsters.get() > 0) || spawnedMonsters.get() > 1) {
            return false;
        }
        return nextPossibleSpawn <= time;
    }

    @Override
    public MapleMonster spawnMonster(MapleMap map) {
        MapleMonster mob = new MapleMonster(id, monster);
        mob.setPosition(pos);
        mob.setCy(pos.y);
        mob.setRx0(pos.x - 50);
        mob.setRx1(pos.x + 50); //these dont matter for mobs
        mob.setFh(fh);
        mob.setF(f);
        mob.setCarnivalTeam(carnivalTeam);
        if (level > -1) {
            mob.changeLevel(level);
        }
        spawnedMonsters.incrementAndGet();
        mob.addListener(new MonsterListener() {

            @Override
            public void monsterKilled() {
                nextPossibleSpawn = System.currentTimeMillis();

                if (mobTime > 0) {
                    nextPossibleSpawn += mobTime;
                }
                spawnedMonsters.decrementAndGet();
            }
        });
        map.spawnMonster(mob, -2);
        if (carnivalTeam > -1) {
            for (MapleReactor r : map.getAllReactorsThreadsafe()) { //parsing through everytime a monster is spawned? not good idea
                if (r.getName().startsWith(String.valueOf(carnivalTeam)) && r.getReactorId() == (9980000 + carnivalTeam) && r.getState() < 5) {
                    int num = Integer.parseInt(r.getName().substring(1, 2)); //00, 01, etc
                    MCSkill skil = MapleCarnivalFactory.getInstance().getGuardian(num);
                    if (skil != null) {
                        skil.getSkill().applyEffect(null, mob, false);
                    }
                }
            }
        }
        for (MapleSummon s : map.getAllSummonsThreadsafe()) {
            if (s.getSkillId() == 35111005) { //加速器：EX-7 - 召唤固定型加速器EX-7，增加地图上所有怪物的移动速度，但降低其防御力。持续时间结束后，EX-7自动爆炸
                MapleStatEffect effect = SkillFactory.getSkill(s.getSkillId()).getEffect(s.getSkillLevel());
                for (Map.Entry<MonsterStatus, Integer> stat : effect.getMonsterStati().entrySet()) {
                    mob.applyStatus(s.getOwner(), new MonsterStatusEffect(stat.getKey(), stat.getValue(), s.getSkillId(), null, false, 0), false, effect.getDuration(), true, effect);
                }
                break;
            }
        }
        if (msg != null) {
            map.broadcastMessage(MaplePacketCreator.serverNotice(6, msg));
        }
        return mob;
    }

    @Override
    public int getMobTime() {
        return mobTime;
    }
}
