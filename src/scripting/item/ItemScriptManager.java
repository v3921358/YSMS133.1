/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.item;

import client.MapleClient;

import java.util.Map;
import java.util.WeakHashMap;
import javax.script.Invocable;
import javax.script.ScriptEngine;

import scripting.AbstractScriptManager;
import tools.FileoutputUtil;

/**
 * @author PlayDK
 */
public class ItemScriptManager extends AbstractScriptManager {

    private static ItemScriptManager instance = new ItemScriptManager();
    private Map<MapleClient, ItemActionManager> ims = new WeakHashMap<>();

    public synchronized static ItemScriptManager getInstance() {
        return instance;
    }

    public void start(MapleClient c, int npc, int itemId) {
        try {
            if (ims.containsKey(c)) {
                dispose(c);
                return;
            }
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "开始道具脚本 NPC：" + npc + " ItemId：" + itemId);
            }
            Invocable iv = getInvocable("item/" + itemId + ".js", c, true);
            ScriptEngine scriptengine = (ScriptEngine) iv;
            ItemActionManager im = new ItemActionManager(c, npc, itemId, iv);
            if (iv == null) {
                im.sendOk("对不起，我并没有被管理员设置可使用，如果您觉得我应该工作的，那就请您汇报给管理员.\r\n我的信息: #b#i" + itemId + ":##t" + itemId + "##k ID: " + itemId);
                dispose(c);
                return;
            }
            ims.put(c, im);
            scriptengine.put("im", im);
            scriptengine.put("it", im);
            c.getPlayer().setConversation(1);
            c.setClickedNPC();
            try {
                iv.invokeFunction("start");
            } catch (NoSuchMethodException nsme) {
                iv.invokeFunction("action", (byte) 1, (byte) 0, 0);
            }
        } catch (Exception e) {
            System.err.println("执行道具脚本失败 道具ID: (" + itemId + ")..NPCID: " + npc + ":" + e);
            FileoutputUtil.log(FileoutputUtil.Item_ScriptEx_Log, "执行道具脚本失败 道具ID: (" + itemId + ")..NPCID: " + npc + ". \r\n错误信息: " + e);
            dispose(c);
            notice(c, itemId);
        }
    }

    public void action(MapleClient c, byte mode, byte type, int selection) {
        if (mode != -1) {
            ItemActionManager im = ims.get(c);
            if (im == null) {
                return;
            }
            try {
                if (im.pendingDisposal) {
                    dispose(c);
                } else {
                    c.setClickedNPC();
                    im.getIv().invokeFunction("action", mode, type, selection);
                }
            } catch (Exception e) {
                int npcId = im.getNpc();
                int itemId = im.getItemId();
                System.err.println("执行NPC脚本出错 NPC ID : " + npcId + " 道具ID: " + itemId + " 错误信息: " + e);
                FileoutputUtil.log(FileoutputUtil.Item_ScriptEx_Log, "执行NPC脚本出错 NPC ID : " + npcId + " 道具ID: " + itemId + ". \r\n错误信息: " + e);
                dispose(c);
                notice(c, itemId);
            }
        }
    }

    public void dispose(MapleClient c) {
        ItemActionManager im = ims.get(c);
        if (im != null) {
            ims.remove(c);
            c.removeScriptEngine("scripts/item/" + im.getItemId() + ".js");
        }
        if (c.getPlayer() != null && c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(0);
        }
    }

    public void dispose(ItemActionManager im, MapleClient c) {
        if (im != null) {
            ims.remove(c);
            c.removeScriptEngine("scripts/item/" + im.getItemId() + ".js");
        }
        if (c.getPlayer() != null && c.getPlayer().getConversation() == 1) {
            c.getPlayer().setConversation(0);
        }
    }

    public ItemActionManager getIM(MapleClient c) {
        return ims.get(c);
    }

    private void notice(MapleClient c, int itemId) {
        c.getPlayer().dropMessage(1, "这个道具脚本是错误的，请联系管理员修复它.道具ID: " + itemId);
    }
}
