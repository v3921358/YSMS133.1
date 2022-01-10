package tools;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class FileoutputUtil {

    // Logging output file
    private static final String FileData = getDateTimeStr();
    public static final String Acc_Stuck = "AccountStuck.log",
            PROCESS_ERROR = "Process_Error.txt",
            BAN_PLAYER_PROCESS = "Ban_Player_Process.txt",
            EXCEPTION_CAUGHT = "exceptionCaught.txt",
            BUY_VERIFY_ERROR = "Buy_VerifyError.txt",
            Login_Error = "Login_Error.log",
            PacketLog = "PacketLog.log",
            SkillsLog = "SkillsLog.log",
            SkillsDebug = "SkillsDebug.log",
            SkillBuff = "SkillBuffLog.log",
            AttackLog = "AttackLog.log",
            ClientError = "ClientError.log",
            PlayerSkills = "PlayerSkills.log",
            Zakum_Log = "Log_Zakum.log",
            Horntail_Log = "Log_Horntail.log",
            Pinkbean_Log = "Pinkbean.log",
            PacketEx_Log = "Packet_Except.log",
            Donator_Log = "Donator.log",
            Hacker_Log = "Hacker.log",
            Movement_Log = "Movement.log",
            SpecialMove_log = "SpecialMove.log",
            掉血错误 = "掉血错误.log",
            攻击出错 = "攻击出错.log",
            封包出错 = "封包出错.log",
            数据异常 = "数据异常.log",
            复制装备 = "复制装备.log",
            宠物说话 = "宠物说话.log",
            DAMAGE_PLAYER = "DAMAGE_PLAYER.log",
            在线统计 = "在线统计.txt",
            召唤兽错误 = "召唤兽错误.log",
            CommandEx_Log = "Command_Except.log";
    public static final String ScriptEx_Log = "log\\Script\\Script_Except.log",
            Event_ScriptEx_Log = "log\\Script\\Event_Script_Except.log",
            Item_ScriptEx_Log = "log\\Script\\Item_Script_Except.log",
            Map_ScriptEx_Log = "log\\Script\\Map_Script_Except.log",
            Portal_ScriptEx_Log = "log\\Script\\Portal_Script_Except.log",
            Reactor_ScriptEx_Log = "log\\Script\\Reactor_Script_Except.log",
            Quest_ScriptEx_Log = "log\\Script\\Quest_Script_Except.log";
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdfGMT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdf_ = new SimpleDateFormat("yyyy-MM-dd");
    private static final String FILE_PATH = "error/" + sdf_.format(Calendar.getInstance().getTime()) + "/";

    static {
        sdfGMT.setTimeZone(TimeZone.getTimeZone("GMT"));
    }

    //得到当前日期与时间的字符串序列
    public static String getDateTimeStr() {
        Calendar now = Calendar.getInstance();
        String time = "log\\" + now.get(Calendar.YEAR) + "" + ((now.get(Calendar.MONTH) + 1) > 10 ? (now.get(Calendar.MONTH) + 1) : "0" + (now.get(Calendar.MONTH) + 1)) + "" + (now.get(Calendar.DAY_OF_MONTH) > 10 ? now.get(Calendar.DAY_OF_MONTH) : "0" + now.get(Calendar.DAY_OF_MONTH)) + "" + (now.get(Calendar.HOUR_OF_DAY) > 10 ? now.get(Calendar.HOUR_OF_DAY) : "0" + now.get(Calendar.HOUR_OF_DAY)) + "" + (now.get(Calendar.MINUTE) > 10 ? now.get(Calendar.MINUTE) : "0" + now.get(Calendar.MINUTE)) + "" + (now.get(Calendar.SECOND) > 10 ? now.get(Calendar.SECOND) : "0" + now.get(Calendar.SECOND)) + "\\";
        return time;
    }

    public static void printError(String name, String msg) {
        FileOutputStream out = null;
        String file = FileData + FILE_PATH + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(msg.getBytes());
            String time = "\r\n------------------------ " + CurrentReadable_Time() + " ------------------------\r\n";
            out.write((time).getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void packetLog(String file, String msg) {
        file = FileData + file;
        FileOutputStream out = null;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(msg.getBytes());
            out.write(("\r\n\r\n").getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void log(String file, String msg) {
        log(file, msg, false);
    }

    public static void log(String file, String msg, boolean A) {
        file = FileData + file;
        FileOutputStream out = null;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(msg.getBytes());
            String rn = A ? "\r\n" : "\r\n------------------------ " + CurrentReadable_Time() + " ------------------------\r\n";
            out.write((rn).getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void hiredMerchLog(String file, String msg) {
        String newfile = FileData + "HiredMerch\\" + file + ".txt";
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(newfile, true);
            out.write(("[" + CurrentReadable_Time() + "] ").getBytes());
            out.write(msg.getBytes());
            out.write(("\r\n").getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void outputFileError(String file, Throwable t) {
        outputFileError(file, t, null);
    }

    public static void outputFileError(String file, Throwable t, String info) {
        file = FileData + file;
        FileOutputStream out = null;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write(("\r\n------------------------ " + CurrentReadable_Time() + " ------------------------\r\n").getBytes());
            if (info != null) {
                out.write((info + "\r\n").getBytes());
            }
            out.write(getString(t).getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static String CurrentReadable_Date() {
        return sdf_.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_Time() {
        return sdf.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_TimeGMT() {
        return sdfGMT.format(new Date());
    }

    public static void printError(String file, Throwable t, String info) {
        file = FileData + file;
        FileOutputStream out = null;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            out.write((info + "\r\n").getBytes());
            out.write(getString(t).getBytes());
            out.write("\r\n---------------------------------\r\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static String getString(final Throwable e) {
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            } catch (IOException ignore) {
            }
        }
        return retValue;
    }

    /*
     * 写出当前的机器码
     */
    public static void outputFileKey(String key) {
        String newfile = "机器码.txt";
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(newfile, true);
            out.write(("[" + CurrentReadable_Time() + "] ").getBytes());
            out.write(key.getBytes());
            out.write(("\r\n").getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }
}
