package tools;

import constants.ServerConstants;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.util.Calendar;

public class GetMACAddress {

    public static String getOSName() {
        return System.getProperty("os.name").toLowerCase();
    }

    public static String getMACAddress() {
        String os = getOSName();
        String mac = null;
        if ((os.startsWith("windows")) || (os.startsWith("windows 7"))) {
            mac = getWindowsMACAddress();
        } else if (os.startsWith("linux")) {
            mac = getLinuxMACAddress();
        } else {
            mac = getUnixMACAddress();
        }
        return mac;
    }

    public static String getUnixMACAddress() {
        String mac = null;
        BufferedReader bufferedReader = null;
        Process process = null;
        try {
            process = Runtime.getRuntime().exec("ifconfig eth0");
            bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = null;
            int index = -1;
            while ((line = bufferedReader.readLine()) != null) {
                index = line.toLowerCase().indexOf("hwaddr");

                if (index != -1) {
                    mac = line.substring(index + "hwaddr".length() + 1).trim();
                }
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        } finally {
            try {
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            bufferedReader = null;
            process = null;
        }
        return mac;
    }

    public static String getLinuxMACAddress() {
        String mac = null;
        BufferedReader bufferedReader = null;
        Process process = null;
        try {
            process = Runtime.getRuntime().exec("ifconfig eth0");
            bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = null;
            int index = -1;
            while ((line = bufferedReader.readLine()) != null) {
                index = line.toLowerCase().indexOf("硬件地址");

                if (index != -1) {
                    mac = line.substring(index + 4).trim();
                }
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        } finally {
            try {
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            bufferedReader = null;
            process = null;
        }
        return mac;
    }

    public static String getWindowsMACAddress() {
        String mac = null;
        BufferedReader bufferedReader = null;
        Process process = null;
        try {
            process = Runtime.getRuntime().exec("ipconfig /all");
            bufferedReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = null;
            int index = -1;
            while ((line = bufferedReader.readLine()) != null) {
                index = line.toLowerCase().indexOf("硬件地址");
                if (index != -1) {
                    index = line.indexOf(":");
                    if (index == -1) {
                        break;
                    }
                    mac = line.substring(index + 1).trim();
                }
            }
        } catch (IOException e1) {
            e1.printStackTrace();
        } finally {
            try {
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            bufferedReader = null;
            process = null;
        }
        return mac;
    }

    public static void main(String[] argc) {
        String os = getOSName();
        System.out.println(os);
        System.out.println("今天是星期: " + Calendar.getInstance().get(7));
        if (os.startsWith("windows")) {
            String mac = getWindowsMACAddress();
            System.out.println("本地是windows:" + mac);
        } else if (os.startsWith("linux")) {
            String mac = getLinuxMACAddress();
            System.out.println("本地是Linux系统,MAC地址是:" + mac);
        } else {
            String mac = getUnixMACAddress();
            System.out.println("本地是Unix系统 MAC地址是:" + mac);
        }
    }

    public static String getMotherboardSN() {
        String result = "";
        try {
            File file = File.createTempFile("realhowto", ".vbs");
            file.deleteOnExit();
            FileWriter fw = new FileWriter(file);

            //String vbs = "Set objWMIService = GetObject(\"winmgmts:\\\\.\\root\\cimv2\")\nSet colItems = objWMIService.ExecQuery _ \n   (\"Select * from Win32_BaseBoard\") \nFor Each objItem in colItems \n    Wscript.Echo objItem.SerialNumber \n    exit for  ' do the first cpu only! \nNext \n";
            String vbs = "Set objWMIService = GetObject(\"winmgmts:\\\\.\\root\\cimv2\")\n"
                    + "Set colItems = objWMIService.ExecQuery _ \n"
                    + "   (\"Select * from Win32_BaseBoard\") \n"
                    + "For Each objItem in colItems \n"
                    + "    Wscript.Echo objItem.SerialNumber \n"
                    + "    exit for  ' do the first cpu only! \n" + "Next \n";

            fw.write(vbs);
            fw.close();
            Process p = Runtime.getRuntime().exec("cscript //NoLogo " + file.getPath());
            BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            while ((line = input.readLine()) != null) {
                result = result + line;
                //result = result + "-MAPLEWING";
            }
            ServerConstants.IsTrueMAC = true;

            input.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
//        ServerConstants.runs()
        return result.trim();
    }

    public static String getDiskCNumber() {
        String line = "";
        String HdSerial = "";//记录硬盘序列号

        try {
            Process proces = Runtime.getRuntime().exec("cmd /c dir c:");//获取命令行参数
            BufferedReader buffreader = new BufferedReader(new InputStreamReader(proces.getInputStream()));

            while ((line = buffreader.readLine()) != null) {
                if (line.indexOf("卷的序列号是 ") != -1) {  //读取参数并获取硬盘序列号
                    HdSerial = line.substring(line.indexOf("卷的序列号是 ")
                            + "卷的序列号是 ".length(), line.length());
                    break;
                }
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return HdSerial;
    }

    public static String getDiskDNumber() {
        String line = "";
        String HdSerial = "";//记录硬盘序列号

        try {
            Process proces = Runtime.getRuntime().exec("cmd /c dir d:");//获取命令行参数
            BufferedReader buffreader = new BufferedReader(new InputStreamReader(proces.getInputStream()));

            while ((line = buffreader.readLine()) != null) {
                if (line.indexOf("卷的序列号是 ") != -1) {  //读取参数并获取硬盘序列号
                    HdSerial = line.substring(line.indexOf("卷的序列号是 ")
                            + "卷的序列号是 ".length(), line.length());
                    break;
                }
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return HdSerial;
    }

    public static String getCPUSerial() {
        String result = "";
        try {
            File file = File.createTempFile("tmp", ".vbs");
            file.deleteOnExit();
            FileWriter fw = new java.io.FileWriter(file);
            String vbs = "Set objWMIService = GetObject(\"winmgmts:\\\\.\\root\\cimv2\")\n"
                    + "Set colItems = objWMIService.ExecQuery _ \n"
                    + "   (\"Select * from Win32_Processor\") \n"
                    + "For Each objItem in colItems \n"
                    + "    Wscript.Echo objItem.ProcessorId \n"
                    + "    exit for  ' do the first cpu only! \n" + "Next \n";
            // + "    exit for  \r\n" + "Next";
            fw.write(vbs);
            fw.close();
            Process p = Runtime.getRuntime().exec("cscript //NoLogo " + file.getPath());
            BufferedReader input = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            while ((line = input.readLine()) != null) {
                result += line;
            }
            input.close();
            file.delete();
        } catch (Exception e) {
            e.fillInStackTrace();
        }
        if (result.trim().length() < 1 || result == null) {
            result = "无CPU_ID被读取";
        }
        return result.trim();
    }
}

/* Location:           C:\Users\文炳\Desktop\CXFBY\114Maplewing.jar
 * Qualified Name:     tools.GetMACAddress
 * JD-Core Version:    0.6.2
 */
