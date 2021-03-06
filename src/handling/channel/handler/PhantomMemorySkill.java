/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.channel.handler;

import client.skills.Skill;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.*;
import constants.JobConstants;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import tools.MaplePacketCreator;
import tools.data.input.LittleEndianAccessor;

/**
 * @author PlayDK
 */
public class PhantomMemorySkill {

    /*
     * 幻影装备复制技能
     */
    public static void MemorySkillChoose(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null || !JobConstants.is幻影(c.getPlayer().getJob())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int skillId = slea.readInt(); //当前角色的封印技能
        Skill skill = SkillFactory.getSkill(skillId);
        if (skill == null) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int teachId = slea.readInt(); //复制的技能
        Skill theskill = SkillFactory.getSkill(teachId);
        if (theskill == null && teachId != 0) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        if (c.getPlayer().getSkillLevel(skillId) > 0) {
            c.getPlayer().修改幻影装备技能(skillId, teachId);
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 幻影装备删除和获得复制技能
     */
    public static void MemorySkillChange(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null || !JobConstants.is幻影(c.getPlayer().getJob())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        int skillId = slea.readInt();
        int targetId = slea.readInt();
        byte type = slea.readByte();
        switch (type) {
            case 0: //选择复制的技能
                MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterById(targetId);
                if (target != null && target.getSkillLevel(skillId) > 0) {
                    int skillBook = SkillFactory.getIdFromSkillId(skillId);
                    if (skillBook > 0) {
                        c.getPlayer().幻影技能复制(skillBook, skillId, target.getSkillLevel(skillId));
                    } else {
                        c.getPlayer().dropMessage(1, "复制技能出现错误");
                    }
                } else {
                    c.getSession().write(MaplePacketCreator.幻影复制错误());
                }
                break;
            case 1: //删除复制的技能
                c.getPlayer().幻影删除技能(skillId);
                Skill skill = SkillFactory.getSkill(skillId);
                if (skill != null && skill.isBuffSkill()) {
                    c.getPlayer().cancelEffect(skill.getEffect(1), false, -1);
                }
                break;

        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }

    /*
     * 幻影装备封印之瞳获得技能列表
     */
    public static void MemorySkillObtain(LittleEndianAccessor slea, MapleClient c) {
        if (c.getPlayer() == null || c.getPlayer().getMap() == null || !JobConstants.is幻影(c.getPlayer().getJob())) {
            c.getSession().write(MaplePacketCreator.enableActions());
            return;
        }
        MapleCharacter target = c.getChannelServer().getPlayerStorage().getCharacterById(slea.readInt());
        if (target != null) {
            List<Integer> memorySkills = new LinkedList<>();
            Map<Skill, SkillEntry> skills = target.getSkills();
            for (Entry<Skill, SkillEntry> skill : skills.entrySet()) {
                if (SkillFactory.isMemorySkill(skill.getKey().getId()) && target.getSkillLevel(skill.getKey()) > 0) {
                    memorySkills.add(skill.getKey().getId());
                }
            }
            if (!memorySkills.isEmpty()) {
                c.getSession().write(MaplePacketCreator.封印之瞳(target, memorySkills));
            }
        }
        c.getSession().write(MaplePacketCreator.enableActions());
    }
}
