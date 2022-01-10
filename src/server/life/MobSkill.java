package server.life;

import client.MapleCharacter;
import client.MapleDisease;
import client.status.MonsterStatus;
import constants.GameConstants;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.*;

import server.ServerProperties;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleMist;
import tools.MaplePacketCreator;

public class MobSkill {

    private int skillId, skillLevel, mpCon, spawnEffect, hp, x, y;
    private long duration, cooltime;
    private float prop;
    //private short effect_delay;
    private short limit;
    private List<Integer> toSummon = new ArrayList<>();
    private Point lt, rb;
    private boolean summonOnce;

    public MobSkill(int skillId, int level) {
        this.skillId = skillId;
        this.skillLevel = level;
    }

    public void setOnce(boolean o) {
        this.summonOnce = o;
    }

    public boolean onlyOnce() {
        return summonOnce;
    }

    public void setMpCon(int mpCon) {
        this.mpCon = mpCon;
    }

    public void addSummons(List<Integer> toSummon) {
        this.toSummon = toSummon;
    }

    /*
     * public void setEffectDelay(short effect_delay) {
     * this.effect_delay = effect_delay;
     * }
     */
    public void setSpawnEffect(int spawnEffect) {
        this.spawnEffect = spawnEffect;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public void setCoolTime(long cooltime) {
        this.cooltime = cooltime;
    }

    public void setProp(float prop) {
        this.prop = prop;
    }

    public void setLtRb(Point lt, Point rb) {
        this.lt = lt;
        this.rb = rb;
    }

    public void setLimit(short limit) {
        this.limit = limit;
    }

    public boolean checkCurrentBuff(MapleCharacter player, MapleMonster monster) {
        boolean stop = false;
        switch (skillId) {
            case 100:
            case 110:
            case 150:
                stop = monster.isBuffed(MonsterStatus.物攻提升);
                break;
            case 101:
            case 111:
            case 151:
                stop = monster.isBuffed(MonsterStatus.魔攻提升);
                break;
            case 102:
            case 112:
            case 152:
                stop = monster.isBuffed(MonsterStatus.物防提升);
                break;
            case 103:
            case 113:
            case 153:
                stop = monster.isBuffed(MonsterStatus.魔防提升);
                break;
            //154-157, don't stop it
            case 140:
            case 141:
            case 142:
            case 143:
            case 144:
            case 145:
                stop = monster.isBuffed(MonsterStatus.免疫伤害) || monster.isBuffed(MonsterStatus.免疫魔攻) || monster.isBuffed(MonsterStatus.免疫物攻);
                break;
            case 200:
                stop = player.getMap().getNumMonsters() >= limit;
                break;
        }
        stop |= monster.isBuffed(MonsterStatus.魔击无效);
        return stop;
    }

    /*
     * 怪物BUFF解释
     * 100 = 物理攻击提高
     * 101 = 魔法攻击提高
     * 102 = 物理防御提高
     * 103 = 魔法防御提高
     * 104 = 致命攻击 难道就是血蓝为1？
     * 105 = 消费
     * 110 = 周边物理攻击提高
     * 111 = 周边魔法攻击提高
     * 112 = 周边物理防御提高
     * 113 = 周边魔法防御提高
     * 114 = HP恢复
     * 115 = 自己及周围移动速度变化
     * 120 = 封印
     * 121 = 黑暗
     * 122 = 虚弱
     * 123 = 晕眩
     * 124 = 诅咒
     * 125 = 中毒
     * 126 = 慢动作
     * 127 = 魔法无效
     * 128 = 诱惑
     * 129 = 逐出
     * 131 = 区域中毒
     * 133 = 不死化
     * 134 = 药水停止
     * 135 = 从不停止
     * 136 = 致盲
     * 137 = 中毒
     * 138 = 潜在能力无效
     * 140 = 物理防御
     * 141 = 魔法防御
     * 142 = 皮肤硬化
     * 143 = 物理反击免疫
     * 144 = 魔法反击免疫
     * 145 = 物理魔法反击免疫
     * 150 = PAD修改
     * 151 = MAD修改
     * 152 = PDD修改
     * 153 = MDD修改
     * 154 = ACC修改
     * 155 = EVA修改
     * 156 = Speed修改
     * 170 = 传送
     * 200 = 召唤
     */
    public void applyEffect(MapleCharacter player, MapleMonster monster, boolean skill) {
        MapleDisease disease = MapleDisease.getBySkill(skillId);
        Map<MonsterStatus, Integer> stats = new EnumMap<>(MonsterStatus.class);
        List<Integer> reflection = new LinkedList<>();

        switch (skillId) {
            case 100: //物理攻击提高
            case 110: //周边物理攻击提高
            case 150: //PAD修改
                stats.put(MonsterStatus.物攻提升, x);
                break;
            case 101: //魔法攻击提高
            case 111: //周边魔法攻击提高
            case 151: //MAD修改
                stats.put(MonsterStatus.魔攻提升, x);
                break;
            case 102: //物理防御提高
            case 112: //周边物理防御提高
            case 152: //PDD修改
                stats.put(MonsterStatus.物防提升, x);
                break;
            case 103: //魔法防御提高
            case 113: //周边魔法防御提高
            case 153: //MDD修改
                stats.put(MonsterStatus.魔防提升, x);
                break;
            case 154: //ACC修改
                stats.put(MonsterStatus.命中, x);
                break;
            case 155: //EVA修改
                stats.put(MonsterStatus.回避, x);
                break;
            case 115: //自己及周围移动速度变化
            case 156: //Speed修改
                stats.put(MonsterStatus.速度, x);
                break;
            case 157: //封印
                stats.put(MonsterStatus.封印, x);
                break;
            case 114: //HP恢复
                if (lt != null && rb != null && skill && monster != null) {
                    List<MapleMapObject> objects = getObjectsInRange(monster, MapleMapObjectType.MONSTER);
                    int hps = (getX() / 1000) * (int) (950 + 1050 * Math.random());
                    for (MapleMapObject mons : objects) {
                        ((MapleMonster) mons).heal(hps, getY(), true);
                    }
                } else if (monster != null) {
                    monster.heal(getX(), getY(), true);
                }
                break;
            case 105: //恢复 消费?
                if (lt != null && rb != null && skill && monster != null) {
                    List<MapleMapObject> objects = getObjectsInRange(monster, MapleMapObjectType.MONSTER);
                    for (MapleMapObject mons : objects) {
                        if (mons.getObjectId() != monster.getObjectId()) {
                            player.getMap().killMonster((MapleMonster) mons, player, true, false, (byte) 1, 0);
                            monster.heal(getX(), getY(), true);
                            break;
                        }
                    }
                } else if (monster != null) {
                    monster.heal(getX(), getY(), true);
                }
                break;
            case 127: //驱散玩家BUFF 魔法无效？
                if (lt != null && rb != null && skill && monster != null && player != null) {
                    for (MapleCharacter character : getPlayersInRange(monster, player)) {
                        character.dispel();
                    }
                } else if (player != null) {
                    player.dispel();
                }
                break;
            case 129: // 逐出?控制玩家?Banish
                if (monster != null && monster.getMap().getSquadByMap() == null) { //not pb/vonleon map
                    if (monster.getEventInstance() != null && monster.getEventInstance().getName().indexOf("BossQuest") != -1) {
                        break;
                    }
                    BanishInfo info = monster.getStats().getBanishInfo();
                    if (info != null) {
                        if (lt != null && rb != null && skill && player != null) {
                            for (MapleCharacter chr : getPlayersInRange(monster, player)) {
                                if (!chr.hasBlockedInventory()) {
                                    chr.changeMapBanish(info.getMap(), info.getPortal(), info.getMsg());
                                }
                            }
                        } else if (player != null && !player.hasBlockedInventory()) {
                            player.changeMapBanish(info.getMap(), info.getPortal(), info.getMsg());
                        }
                    }
                }
                break;
            case 131: // 区域中毒 乌贼怪 扎昆 驮狼雪人
                if (monster != null) {
                    monster.getMap().spawnMist(new MapleMist(calculateBoundingBox(monster.getTruePosition(), true), monster, this), x * 10, false);
                }
                break;
            case 140:
                stats.put(MonsterStatus.免疫物攻, x);
                break;
            case 141:
                stats.put(MonsterStatus.免疫魔攻, x);
                break;
            case 142:
                stats.put(MonsterStatus.免疫物攻, x);
                stats.put(MonsterStatus.免疫魔攻, x);
                //stats.put(MonsterStatus.免疫伤害, Integer.valueOf(x));
                break;
            case 143:
                stats.put(MonsterStatus.反射物攻, x);
                stats.put(MonsterStatus.免疫物攻, x);
                reflection.add(x);
                if (monster != null) {
                    monster.getMap().broadcastMessage(MaplePacketCreator.spouseMessage(0x0A, "[系统提示] 注意 " + monster.getStats().getName() + " 即将开启反射物攻状态。"));
                }
                break;
            case 144:
                stats.put(MonsterStatus.反射魔攻, x);
                stats.put(MonsterStatus.免疫魔攻, x);
                reflection.add(x);
                if (monster != null) {
                    monster.getMap().broadcastMessage(MaplePacketCreator.spouseMessage(0x0A, "[系统提示] 注意 " + monster.getStats().getName() + " 即将开启反射魔攻状态。"));
                }
                break;
            case 145:
                stats.put(MonsterStatus.反射物攻, x);
                stats.put(MonsterStatus.免疫物攻, x);
                stats.put(MonsterStatus.反射魔攻, x);
                stats.put(MonsterStatus.免疫魔攻, x);
                reflection.add(x);
                reflection.add(x);
                if (monster != null) {
                    monster.getMap().broadcastMessage(MaplePacketCreator.spouseMessage(0x0A, "[系统提示] 注意 " + monster.getStats().getName() + " 即将开启反射物攻和魔攻状态。"));
                }
                break;
            case 200: //召唤怪物
                if (monster == null) {
                    return;
                }
                for (Integer mobId : getSummons()) {
                    MapleMonster toSpawn;
                    try {
                        toSpawn = MapleLifeFactory.getMonster(GameConstants.getCustomSpawnID(monster.getId(), mobId));
                    } catch (RuntimeException e) { //monster doesn't exist
                        continue;
                    }
                    if (toSpawn == null) {
                        continue;
                    }
                    toSpawn.setPosition(monster.getTruePosition());
                    int ypos = (int) monster.getTruePosition().getY(), xpos = (int) monster.getTruePosition().getX();
                    switch (mobId) {
                        case 8500003: //小黑水雷 Pap bomb high
                            toSpawn.setFh((int) Math.ceil(Math.random() * 19.0));
                            ypos = -590;
                            break;
                        case 8500004: //大黑水雷 Pap bomb
                            //Spawn between -500 and 500 from the monsters X position
                            xpos = (int) (monster.getTruePosition().getX() + Math.ceil(Math.random() * 1000.0) - 500);
                            ypos = (int) monster.getTruePosition().getY();
                            break;
                        case 8510100: //嗜血单眼怪 Pianus bomb
                            if (Math.ceil(Math.random() * 5) == 1) {
                                ypos = 78;
                                xpos = (int) (0 + Math.ceil(Math.random() * 5)) + ((Math.ceil(Math.random() * 2) == 1) ? 180 : 0);
                            } else {
                                xpos = (int) (monster.getTruePosition().getX() + Math.ceil(Math.random() * 1000.0) - 500);
                            }
                            break;
                        case 8820007: //比恩宝宝 mini bean
                        case 8820107: //混沌比恩宝宝
                            continue;
                    }
                    // Get spawn coordinates (This fixes monster lock)
                    // TODO get map left and right wall.
                    switch (monster.getMap().getId()) {
                        case 220080001: //玩具城 - 时间塔的本源 Pap map
                            if (xpos < -890) {
                                xpos = (int) (-890 + Math.ceil(Math.random() * 150));
                            } else if (xpos > 230) {
                                xpos = (int) (230 - Math.ceil(Math.random() * 150));
                            }
                            break;
                        case 230040420: //水下世界 - 皮亚奴斯洞穴 Pianus map
                            if (xpos < -239) {
                                xpos = (int) (-239 + Math.ceil(Math.random() * 150));
                            } else if (xpos > 371) {
                                xpos = (int) (371 - Math.ceil(Math.random() * 150));
                            }
                            break;
                    }
                    monster.getMap().spawnMonsterWithEffect(toSpawn, getSpawnEffect(), monster.getMap().calcPointBelow(new Point(xpos, ypos - 1)));
                }
                break;
            default:
                if (disease == null && ServerProperties.ShowPacket()) {
                    System.out.println("未处理的怪物技能 skillid : " + skillId);
                }
                break;
        }
        if (stats.size() > 0 && monster != null) {
            if (lt != null && rb != null && skill) {
                for (MapleMapObject mons : getObjectsInRange(monster, MapleMapObjectType.MONSTER)) {
                    ((MapleMonster) mons).applyMonsterBuff(stats, getSkillId(), getDuration(), this, reflection);
                }
            } else {
                monster.applyMonsterBuff(stats, getSkillId(), getDuration(), this, reflection);
            }
        }
        if (disease != null && player != null) {
            if (lt != null && rb != null && skill && monster != null) {
                for (MapleCharacter chr : getPlayersInRange(monster, player)) {
                    chr.giveDebuff(disease, this);
                }
            } else {
                player.giveDebuff(disease, this);
            }
        }
        if (monster != null) {
            monster.setMp(monster.getMp() - getMpCon());
        }
    }

    public int getSkillId() {
        return skillId;
    }

    public int getSkillLevel() {
        return skillLevel;
    }

    public int getMpCon() {
        return mpCon;
    }

    public List<Integer> getSummons() {
        return Collections.unmodifiableList(toSummon);
    }

    /*
     * public short getEffectDelay() {
     * return effect_delay;
     * }
     */
    public int getSpawnEffect() {
        return spawnEffect;
    }

    public int getHP() {
        return hp;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public long getDuration() {
        return duration;
    }

    public long getCoolTime() {
        return cooltime;
    }

    public Point getLt() {
        return lt;
    }

    public Point getRb() {
        return rb;
    }

    public int getLimit() {
        return limit;
    }

    public boolean makeChanceResult() {
        return prop >= 1.0 || Math.random() < prop;
    }

    private Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft) {
        Point mylt, myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        Rectangle bounds = new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
        return bounds;
    }

    private List<MapleCharacter> getPlayersInRange(MapleMonster monster, MapleCharacter player) {
        Rectangle bounds = calculateBoundingBox(monster.getTruePosition(), monster.isFacingLeft());
        List<MapleCharacter> players = new ArrayList<>();
        players.add(player);
        return monster.getMap().getPlayersInRectAndInList(bounds, players);
    }

    private List<MapleMapObject> getObjectsInRange(MapleMonster monster, MapleMapObjectType objectType) {
        Rectangle bounds = calculateBoundingBox(monster.getTruePosition(), monster.isFacingLeft());
        List<MapleMapObjectType> objectTypes = new ArrayList<>();
        objectTypes.add(objectType);
        return monster.getMap().getMapObjectsInRect(bounds, objectTypes);
    }
}
