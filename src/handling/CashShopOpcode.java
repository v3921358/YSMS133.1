/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling;

import constants.ServerConstants;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 * @author PlayDK
 */
public enum CashShopOpcode implements WritableIntValueHolder {

    加载道具栏(0x06),
    加载礼物(0x08),
    加载购物车(0x0A),
    更新购物车(0x0C),
    购买道具(0x0E),
    商城送礼(0x15),
    错误提示(0x16),
    扩充道具栏(0x17),
    扩充仓库(0x19),
    购买角色卡(0x2A),
    扩充项链(0x2F),
    商城到背包(0x21),
    背包到商城(0x23),
    删除道具(0x25),
    道具到期(0x27),
    换购道具(0x44),
    购买礼包(0x48),
    商城送礼包(0x4A),
    购买任务道具(0x4C),
    领奖卡提示(-2),
    注册商城(-2),
    打开箱子(-2),
    商城提示(-2),;
    private int code = -2;

    CashShopOpcode(int code) {
        this.code = code;
    }

    @Override
    public void setValue(short code) {
        this.code = code;
    }

    @Override
    public short getValue() {
        return (short) code;
    }

    public static Properties getDefaultProperties() throws IOException {
        Properties props = new Properties();
        FileInputStream fileInputStream = new FileInputStream("properties/cashops.properties");
        BufferedReader buff = new BufferedReader(new InputStreamReader(fileInputStream, "GBK"));
        props.load(buff);
        fileInputStream.close();
        buff.close();
        return props;
    }

    static {
        reloadValues();
    }

    public static void reloadValues() {
        try {
            if (ServerConstants.loadop) {
                Properties props = new Properties();
                InputStream inputStream = CashShopOpcode.class.getClassLoader().getResourceAsStream("cashops.properties");
                BufferedReader buff = new BufferedReader(new InputStreamReader(inputStream, "GBK"));
                props.load(buff);
                ExternalCodeTableGetter.populateValues(props, values());
                inputStream.close();
                buff.close();
            } else {
                File file = new File("properties/cashops.properties");
                if (file.exists()) {
                    ExternalCodeTableGetter.populateValues(getDefaultProperties(), values());
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("加载 cashops.properties 文件出现错误", e);
        }
    }
}
