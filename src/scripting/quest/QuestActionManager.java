/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.quest;

import client.MapleClient;

import javax.script.Invocable;

import scripting.npc.NPCConversationManager;
import server.quest.MapleQuest;
import tools.packet.EffectPacket;

/**
 * @author PlayDK
 */
public class QuestActionManager extends NPCConversationManager {

    private int quest;
    private boolean start;

    public QuestActionManager(MapleClient c, int npc, int quest, boolean start, Invocable iv) {
        super(c, npc, quest, iv);
        this.quest = quest;
        this.start = start;
    }

    public int getQuest() {
        return quest;
    }

    public boolean isStart() {
        return start;
    }

    @Override
    public void dispose() {
        QuestScriptManager.getInstance().dispose(this, getClient());
    }

    public void forceStartQuest() {
        MapleQuest.getInstance(quest).forceStart(getPlayer(), getNpc(), null);
    }

    public void forceStartQuest(String customData) {
        MapleQuest.getInstance(quest).forceStart(getPlayer(), getNpc(), customData);
    }

    public void forceCompleteQuest() {
        MapleQuest.getInstance(quest).forceComplete(getPlayer(), getNpc());
    }

    public String getQuestCustomData() {
        return c.getPlayer().getQuestNAdd(MapleQuest.getInstance(quest)).getCustomData();
    }

    public void setQuestCustomData(String customData) {
        c.getPlayer().getQuestNAdd(MapleQuest.getInstance(quest)).setCustomData(customData);
    }

    public void showCompleteQuestEffect() {
        c.getPlayer().getClient().getSession().write(EffectPacket.showSpecialEffect(0x0E)); // 任务完成
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), EffectPacket.showForeignEffect(c.getPlayer().getId(), 0x0E), false);
    }
}
