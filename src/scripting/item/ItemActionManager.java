/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.item;

import client.MapleClient;

import javax.script.Invocable;

import scripting.npc.NPCConversationManager;

/**
 * @author PlayDK
 */
public class ItemActionManager extends NPCConversationManager {

    private int itemId;

    /**
     * @param c
     * @param npc
     * @param itemId
     * @param iv
     */
    public ItemActionManager(MapleClient c, int npc, int itemId, Invocable iv) {
        super(c, npc, itemId, iv);
        this.itemId = itemId;
    }

    /**
     * @return
     */
    public int getItem() {
        return itemId;
    }

    /**
     * @return
     */
    public int getItemId() {
        return itemId;
    }

    /**
     *
     */
    @Override
    public void dispose() {
        ItemScriptManager.getInstance().dispose(this, getClient());
    }

    public void remove(int quantity) {
        if (quantity <= 0) {
            quantity = 1;
        }
        this.gainItem(itemId, (short) -quantity);
    }
}
