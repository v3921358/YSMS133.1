package handling.channel.handler;

import client.MapleCharacter;
import client.skills.Skill;
import client.skills.SkillFactory;
import constants.GameConstants;
import constants.skills.新手;

import java.awt.Point;
import java.util.List;

import server.MapleStatEffect;
import server.movement.LifeMovementFragment;
import tools.AttackPair;

public class AttackInfo {

    public int skillId, charge, lastAttackTickCount;
    public List<AttackPair> allDamage;
    public Point position; //角色的坐标
    public Point skillposition = null; //技能的坐标
    public int display;  //动作
    public int direction; //方向
    public int stance; //姿势
    public int maxDamageOver = 2100000000;  //最大攻击上限 默认: 999999
    public short starSlot, cashSlot; //飞镖子弹在背包的位置 现金道具飞镖子弹在背包的位置
    public byte skllv, numDamage, numAttacked, numAttackedAndDamage, speed, AOE, unk, zeroUnk, ef;
    public List<LifeMovementFragment> movei;
    public boolean real = true, move = false;
    public boolean isCloseRangeAttack = false; //是否近离攻击
    public boolean isRangedAttack = false; //是否远距离攻击
    public boolean isMagicAttack = false; //是否魔法攻击

    public MapleStatEffect getAttackEffect(MapleCharacter chr, int skillLevel, Skill theSkill) {
        if (GameConstants.isMulungSkill(skillId) || GameConstants.isPyramidSkill(skillId) || GameConstants.isInflationSkill(skillId) || skillId == 新手.升级特效 || GameConstants.is品克缤技能(skillId)) {
            skillLevel = 1;
        } else if (skillLevel <= 0) {
            return null;
        }
        if (GameConstants.isLinkedAttackSkill(skillId)) {
            Skill skillLink = SkillFactory.getSkill(skillId);
            return skillLink.getEffect(skillLevel);
        }
        if (chr.isAdmin()) {
           chr.dropMessage(-5, "技能ID: " + theSkill.getId() + " - " + theSkill.getName() + " 技能延时: " + theSkill.getAnimation() + " 解析延时: " + display);
        }
        return theSkill.getEffect(skillLevel);
    }
}
