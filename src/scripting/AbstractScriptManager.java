package scripting;

import client.MapleClient;
import constants.ServerConstants;
import handling.mina.MapleCustomEncryption;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import scripting.item.ItemScriptManager;
import scripting.npc.NPCScriptManager;
import scripting.quest.QuestScriptManager;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;

/**
 * @author Matze
 */
public abstract class AbstractScriptManager {

    private ScriptEngineManager sem;

    protected AbstractScriptManager() {
        sem = new ScriptEngineManager();
    }

    protected Invocable getInvocable(String path, MapleClient c) {
        return getInvocable(path, c, false);
    }

    protected Invocable getInvocable(String path, MapleClient c, boolean npc) {
        FileInputStream scriptFile_in = null;
        ByteArrayOutputStream out = null;
        try {
            path = "scripts/" + path;
            ScriptEngine engine = null;
            if (c != null) {
                engine = c.getScriptEngine(path);
            }
            if (engine == null) {
                File scriptFile = new File(path);
                if (!scriptFile.exists()) {
                    return null;
                }
//                InputStreamReader scriptFile = null;
//                try {
//                    scriptFile = new InputStreamReader(getClass().getClassLoader().getResourceAsStream(path), "gbk");
//                } catch (Exception ex) {
//                    File scriptFile_folder = new File(path);
//                    if (!scriptFile_folder.exists()) {
//                        return null;
//                    }
//                    scriptFile = new InputStreamReader(new FileInputStream(scriptFile_folder), "gbk");
//                }
                engine = sem.getEngineByName("javascript");
                if (c != null) {
                    c.setScriptEngine(path, engine);
                }
                scriptFile_in = new FileInputStream(scriptFile);
                int fileLength = scriptFile_in.available();
                out = new ByteArrayOutputStream();
                byte[] buffer = new byte[fileLength];
                byte[] decrypt;
                scriptFile_in.read(buffer);
                out.write(buffer);
//                MapleCustomEncryption.encryptData(buffer);
//                System.err.println(new String(buffer, "GBK"));
//                FileOutputStream outs = null;
//                String file = "C:\\Users\\shuleai\\Desktop\\1.js";
//                File outputFile = new File(file);
//                if (outputFile.getParentFile() != null) {
//                    outputFile.getParentFile().mkdirs();
//                }
//                
//                outs = new FileOutputStream(file, true);
//                outs.write(buffer);
//                outs.close();

                //脚本解密
                boolean isEncryption = buffer[0] == '#';
                String script;
                if (isEncryption) {
                    List<String> authList = new LinkedList<>();
                    decrypt = Arrays.copyOfRange(buffer, 1, fileLength);
                    MapleCustomEncryption.decryptData(decrypt);
                    script = new String(decrypt, "GBK");
                    String keystr = script.substring(0, script.indexOf("#"));
                    authList.addAll(Arrays.asList(keystr.split("\\|")));
                    boolean check = false;
                    for (String key : authList) {
                        if (key.contains(ServerConstants.服务器授权)) {
                            check = true;
                        }
                    }
                    script = script.substring(keystr.length() + 1, script.length() - 1);
                    if (!check && c != null && c.getPlayer() != null) {
                        c.getPlayer().dropMessage(1, "该NPC未授权本服使用，请联系管理员(GM)。");
                        c.removeClickedNPC();
                        NPCScriptManager.getInstance().dispose(c);
                        ItemScriptManager.getInstance().dispose(c);
                        QuestScriptManager.getInstance().dispose(c);
                        c.getSession().write(MaplePacketCreator.enableActions());
                        return null;
                    }
                } else {
                    script = new String(buffer, "GBK");
                }

                engine.eval(script);
//                engine.eval(new InputStreamReader(scriptFile_in, "gbk"));
            } else if (c != null && npc) {
                c.getPlayer().dropMessage(-1, "您当前已经和1个NPC对话了. 如果不是请输入 @ea 命令进行解卡。");
            }
            return (Invocable) engine;
        } catch (IOException | ScriptException e) {
            System.err.println("Error executing script. Path: " + path + "\r\nException " + e);
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing script. Path: " + path + "\r\nException " + e);
            return null;
        } finally {
            try {
                if (scriptFile_in != null) {
                    scriptFile_in.close();
                }
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
                System.err.println("Error close script. Path: " + path + "\r\nException " + ignore);
            }
        }
    }
}
