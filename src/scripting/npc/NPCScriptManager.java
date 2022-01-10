package scripting.npc;

import client.MapleClient;

import java.util.Map;
import java.util.WeakHashMap;
import javax.script.Invocable;
import javax.script.ScriptEngine;

import scripting.AbstractScriptManager;
import tools.FileoutputUtil;

public class NPCScriptManager extends AbstractScriptManager {

    private static NPCScriptManager instance = new NPCScriptManager();
    private Map<MapleClient, NPCConversationManager> cms = new WeakHashMap<>();

    public synchronized static NPCScriptManager getInstance() {
        return instance;
    }

    public void start(MapleClient c, int npcId) {
        start(c, npcId, 0);
    }

    public void start(MapleClient c, int npcId, int npcMode) {
        try {
            if (cms.containsKey(c)) {
                dispose(c);
                return;
            }
            Invocable iv;
            if (npcMode == 0) {
                iv = getInvocable("npc/" + npcId + ".js", c, true);
            } else {
                iv = getInvocable("npc/" + npcId + "_" + npcMode + ".js", c, true);
            }
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "开始NPC对话 NPC：" + npcId + " 模式：" + npcMode);
            }
            ScriptEngine scriptengine = (ScriptEngine) iv;
            NPCConversationManager cm = new NPCConversationManager(c, npcId, npcMode, iv);
            if (iv == null || NPCScriptManager.getInstance() == null) {
                if (iv == null) {
                    cm.sendOk("对不起，我并没有被管理员设置可使用，如果您觉得我应该工作的，那就请您汇报给管理员.\r\n我的ID编号: #r" + npcId + "#k");
                }
                dispose(c);
                return;
            }
            cms.put(c, cm);
            scriptengine.put("cm", cm);
            c.getPlayer().setConversation(1);
            c.setClickedNPC();
            try {
                iv.invokeFunction("start");
            } catch (NoSuchMethodException nsme) {
                iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
            }
        } catch (Exception e) {
            System.err.println("执行NPC脚本出错 NPC ID : " + npcId + " 模式: " + npcMode + " 错误信息: " + e);
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "执行NPC脚本出错 NPC ID : " + npcId + " 模式: " + npcMode + ".\r\n错误信息: " + e);
            dispose(c);
            notice(c, npcId, npcMode);
        }
    }

    public void action(MapleClient c, byte mode, byte type, int selection) {
        if (mode != -1) {
            NPCConversationManager cm = cms.get(c);
            if (cm == null) {
                return;
            }
            try {
                if (cm.pendingDisposal) {
                    dispose(c);
                } else {
                    c.setClickedNPC();
                    cm.getIv().invokeFunction("action", mode, type, selection);
                }
            } catch (Exception e) {
                int npcId = cm.getNpc();
                int npcMode = cm.getNpcMode();
                System.err.println("执行NPC脚本出错 NPC ID : " + npcId + " 模式: " + npcMode + " 错误信息: " + e);
                FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "执行NPC脚本出错 NPC ID : " + npcId + " 模式: " + npcMode + ". \r\n错误信息: " + e);
                dispose(c);
                notice(c, npcId, npcMode);
            }
        }
    }

    public void dispose(MapleClient c) {
        NPCConversationManager npccm = cms.get(c);
        if (npccm != null) {
            cms.remove(c);
            if (npccm.getNpcMode() == 0) {
                c.removeScriptEngine("scripts/npc/" + npccm.getNpc() + ".js");
            } else {
                c.removeScriptEngine("scripts/npc/" + npccm.getNpc() + "_" + npccm.getNpcMode() + ".js");
            }
        }
        if (c.getPlayer() != null && c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(0);
        }
    }

    public void dispose(NPCConversationManager cm) {
        if (cm == null) {
            return;
        }
        MapleClient c = cm.getClient();
        cms.remove(c);
        if (cm.getNpcMode() == 0) {
            c.removeScriptEngine("scripts/npc/" + cm.getNpc() + ".js");
        } else {
            c.removeScriptEngine("scripts/npc/" + cm.getNpc() + "_" + cm.getNpcMode() + ".js");
        }
        if (c.getPlayer() != null && c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(0);
        }
    }

    public NPCConversationManager getCM(MapleClient c) {
        return cms.get(c);
    }

    private void notice(MapleClient c, int npcId, int npcMode) {
        c.getPlayer().dropMessage(1, "这个NPC脚本是错误的，请联系管理员修复它.NPCID: " + npcId + (npcMode > 0 ? " 模式:" + npcMode : ""));
    }
}
