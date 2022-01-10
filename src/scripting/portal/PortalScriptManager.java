package scripting.portal;

import client.MapleClient;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import javax.script.*;

import server.MaplePortal;
import tools.FileoutputUtil;

public class PortalScriptManager {

    private static final PortalScriptManager instance = new PortalScriptManager();
    private final Map<String, PortalScript> scripts = new HashMap<>();
    private final static ScriptEngineFactory sef = new ScriptEngineManager().getEngineByName("javascript").getFactory();

    public synchronized static PortalScriptManager getInstance() {
        return instance;
    }

    private PortalScript getPortalScript(String scriptName) {
        if (scripts.containsKey(scriptName)) {
            return scripts.get(scriptName);
        }
        File scriptFile = new File("scripts/portal/" + scriptName + ".js");
        if (!scriptFile.exists()) {
            return null;
        }
        ScriptEngine portal = sef.getScriptEngine();
        try {
            CompiledScript compiled = ((Compilable) portal).compile(new InputStreamReader(new FileInputStream(scriptFile), "gbk"));
            compiled.eval();
        } catch (Exception e) {
            System.err.println("请检查Portal为:(" + scriptName + ".js)的文件." + e);
            FileoutputUtil.log(FileoutputUtil.Portal_ScriptEx_Log, "请检查Portal为:(" + scriptName + ".js)的文件. " + e);
        }
        PortalScript script = ((Invocable) portal).getInterface(PortalScript.class);
        scripts.put(scriptName, script);
        return script;
    }

    public void executePortalScript(MaplePortal portal, MapleClient c) {
        PortalScript script = getPortalScript(portal.getScriptName());
        if (script != null) {
            try {
                script.enter(new PortalPlayerInteraction(c, portal));
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(5, "执行Portal为:(" + portal.getScriptName() + ".js)的文件 在地图 " + c.getPlayer().getMapId() + " - " + c.getPlayer().getMap().getMapName());
                }
            } catch (Exception e) {
                if (c.getPlayer().isAdmin()) {
                    c.getPlayer().dropMessage(5, "执行地图脚本过程中发生错误.请检查Portal为:( " + portal.getScriptName() + ".js)的文件." + e);
                }
                FileoutputUtil.log(FileoutputUtil.Portal_ScriptEx_Log, "执行地图脚本过程中发生错误.请检查Portal为:( " + portal.getScriptName() + ".js)的文件.\r\n错误信息:" + e);
            }
        } else {
            if (c.getPlayer().isAdmin()) {
                c.getPlayer().dropMessage(5, "未找到Portal为:(" + portal.getScriptName() + ".js)的文件 在地图 " + c.getPlayer().getMapId() + " - " + c.getPlayer().getMap().getMapName());
            }
            FileoutputUtil.log(FileoutputUtil.Portal_ScriptEx_Log, "执行地图脚本过程中发生错误.未找到Portal为:(" + portal.getScriptName() + ".js)的文件 在地图 " + c.getPlayer().getMapId() + " - " + c.getPlayer().getMap().getMapName());
        }
    }

    public void clearScripts() {
        scripts.clear();
    }
}
