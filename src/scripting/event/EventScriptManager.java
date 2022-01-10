package scripting.event;

import handling.channel.ChannelServer;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import javax.script.Invocable;
import javax.script.ScriptEngine;

import scripting.AbstractScriptManager;
import tools.FileoutputUtil;

/**
 * @author Matze
 */
public class EventScriptManager extends AbstractScriptManager {

    private final Map<String, EventEntry> events = new LinkedHashMap<>();
    private static final AtomicInteger runningInstanceMapId = new AtomicInteger(0);

    public static int getNewInstanceMapId() {
        return runningInstanceMapId.addAndGet(1);
    }

    public EventScriptManager(ChannelServer cserv, String[] scripts) {
        super();
        for (String script : scripts) {
            if (!script.equals("")) {
                Invocable iv = getInvocable("event/" + script + ".js", null);
                if (iv != null) {
                    events.put(script, new EventEntry(script, iv, new EventManager(cserv, iv, script)));
                }
            }
        }
    }

    public EventManager getEventManager(String event) {
        EventEntry entry = events.get(event);
        if (entry == null) {
            return null;
        }
        return entry.em;
    }

    public void init() {
        for (EventEntry entry : events.values()) {
            try {
                ((ScriptEngine) entry.iv).put("em", entry.em);
                entry.iv.invokeFunction("init", (Object) null);
            } catch (final Exception ex) {
                System.out.println("Error initiating event: " + entry.script + ":" + ex);
                FileoutputUtil.log(FileoutputUtil.Event_ScriptEx_Log, "Error initiating event: " + entry.script + ":" + ex);
            }
        }
    }

    public void cancel() {
        for (EventEntry entry : events.values()) {
            entry.em.cancel();
        }
    }
}
