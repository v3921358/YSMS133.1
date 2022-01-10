package server.maps;

import client.MapleCharacter;
import client.MapleClient;
import client.skills.Skill;
import client.skills.SkillFactory;
import constants.skills.*;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.concurrent.ScheduledFuture;

import server.MapleStatEffect;
import server.life.MapleMonster;
import server.life.MobSkill;
import tools.MaplePacketCreator;

/**
 * 表示冒险岛地图中所有具体烟幕效果的对象.例如侠盗职业的四转技能烟幕弹
 *
 * @author dongjak
 *
 */
public class MapleMist extends MapleMapObject {

    private Rectangle mistPosition;
    private MapleStatEffect source;
    private MobSkill skill;
    private boolean isMobMist, isPoisonMist, isRecoverMist;
    private int skillDelay, skilllevel, ownerId, mistType;
    private ScheduledFuture<?> schedule = null, poisonSchedule = null;
    private boolean isHolyFountain; //是否为神圣源泉
    private int healCount; //神圣源泉恢复的总次数
    private boolean isBurnAreas;

    public MapleMist(Rectangle mistPosition, MapleMonster mob, MobSkill skill) {
        this.mistPosition = mistPosition;
        this.ownerId = mob.getId();
        this.skill = skill;
        this.skilllevel = skill.getSkillLevel();
        this.isMobMist = true;
        this.isPoisonMist = true;
        this.isRecoverMist = false;
        this.mistType = 0;
        this.skillDelay = 0;
    }

    /*
     * 角色技能召唤的烟雾
     */
    public MapleMist(Rectangle mistPosition, MapleCharacter owner, MapleStatEffect source) {
        this.mistPosition = mistPosition;
        this.ownerId = owner.getId();
        this.source = source;
        this.skillDelay = 10;
        this.isMobMist = false;
        this.isPoisonMist = false;
        this.isRecoverMist = false;
        this.healCount = 0;
        this.isHolyFountain = false;
        this.skilllevel = owner.getTotalSkillLevel(SkillFactory.getSkill(source.getSourceId()));
        switch (source.getSourceId()) {
            case 主教.神圣源泉:
                this.mistType = 0;
                this.healCount = source.getY();
                this.isHolyFountain = true;
                break;
            case 隐士.模糊领域:
                this.mistType = 0;
                break;
            case 侠盗.烟幕弹:
                this.mistType = 3;
                this.skillDelay = 3;
                this.isPoisonMist = true;
                break;
            case 唤灵斗师.避难所:
                this.mistType = 3;
                break;
            case 1076:  //奥兹的火牢术屏障
            case 火毒.致命毒雾:
                this.mistType = 0;
                this.isPoisonMist = true;
                break;
            case 龙神.极光恢复:
                this.mistType = 0;
                this.isRecoverMist = true;
                break;
            case 隐月.束缚术:
                this.mistType = 0;
                break;
            case 炎术士.燃烧领域:
                this.isBurnAreas = true;
                this.skillDelay = 2;
                break;
            case 林之灵.火焰屁:
                this.mistType = 0;
                this.isPoisonMist = true;
                break;
        }
    }

    public MapleMist(Rectangle mistPosition, MapleCharacter owner) {
        this.mistPosition = mistPosition;
        this.ownerId = owner.getId();
        this.source = new MapleStatEffect();
        this.source.setSourceId(火毒.致命毒雾);
        this.skilllevel = 30;
        this.mistType = 0;
        this.isMobMist = false;
        this.isPoisonMist = false;
        this.skillDelay = 10;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.MIST;
    }

    @Override
    public Point getPosition() {
        return mistPosition.getLocation();
    }

    public Skill getSourceSkill() {
        return SkillFactory.getSkill(source.getSourceId());
    }

    public void setSchedule(ScheduledFuture<?> s) {
        this.schedule = s;
    }

    public ScheduledFuture<?> getSchedule() {
        return schedule;
    }

    public void setPoisonSchedule(ScheduledFuture<?> s) {
        this.poisonSchedule = s;
    }

    public ScheduledFuture<?> getPoisonSchedule() {
        return poisonSchedule;
    }

    /*
     * 是否为怪物召唤的烟雾
     */
    public boolean isMobMist() {
        return isMobMist;
    }

    /*
     * 是否为中毒效果的烟雾
     */
    public boolean isPoisonMist() {
        return isPoisonMist;
    }

    /*
     * 是否为恢复效果的烟雾
     */
    public boolean isRecoverMist() {
        return isRecoverMist;
    }

    /*
     * 是否为牧师的神圣源泉
     */
    public boolean isHolyFountain() {
        return isHolyFountain;
    }

    /*
     * 是否为炎术士燃烧领域
     */
    public boolean isBurnAreas() {
        return isBurnAreas;
    }

    public int getHealCount() {
        return isHolyFountain() ? healCount : 0;
    }

    public void setHealCount(int count) {
        healCount = count;
    }

    public int getMistType() {
        return mistType;
    }

    public int getSkillDelay() {
        return skillDelay;
    }

    public int getSkillLevel() {
        return skilllevel;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public MobSkill getMobSkill() {
        return this.skill;
    }

    public Rectangle getBox() {
        return mistPosition;
    }

    public MapleStatEffect getSource() {
        return source;
    }

    @Override
    public void setPosition(Point position) {
    }

    public byte[] fakeSpawnData(int level) {
        return MaplePacketCreator.spawnMist(this);
    }

    @Override
    public void sendSpawnData(MapleClient c) {
        c.getSession().write(MaplePacketCreator.spawnMist(this));
    }

    @Override
    public void sendDestroyData(MapleClient c) {
        c.getSession().write(MaplePacketCreator.removeMist(getObjectId(), false));
    }

    public boolean makeChanceResult() {
        return source.makeChanceResult();
    }
}
