/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

/**
 * @author PlayDK
 */
public class ScriptedItem {

    private boolean runOnPickup;
    private int npc;
    private String script;

    public ScriptedItem(int npc, String script, boolean rop) {
        this.npc = npc;
        this.script = script;
        this.runOnPickup = rop;
    }

    public int getNpc() {
        return npc;
    }

    public String getScript() {
        return script;
    }

    public boolean runOnPickup() {
        return runOnPickup;
    }
}
