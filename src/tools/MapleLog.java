/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * @author zisedk
 */
public class MapleLog {

    private ReentrantReadWriteLock lock = new ReentrantReadWriteLock(true);
    private Lock logLock = lock.readLock();
    private int Green = 10; //绿色
    private int Blue = 11; //蓝色
    private int Red = 12; //红色
    private int Pink = 13; //粉色
    private int Yellow = 14; //黄色
    private int White = 15; //白色

    public static MapleLog getInstance() {
        return SingletonHolder.instance;
    }

    /**
     * 设置输出颜色 10 = 绿色 11 = 蓝色 12 = 红色 13 = 粉色 14 = 黄色 15 = 白色
     */
    public void logInfo(String msg) {
        logWrite(Yellow, msg);
    }

    public void logWarn(String msg) {
        logWrite(Red, msg);
    }

    public void logError(String msg) {
        logWrite(Pink, msg);
    }

    public void logWrite(int color, String msg) {
        logLock.lock();
        try {
//            Console.setColor(color);
            //System.out.print(label); //输入控制台后不换行
            System.out.println(msg); //输入控制台后换行
//            Console.setColor(White);
        } finally {
            logLock.unlock();
        }
    }

    private static class SingletonHolder {

        protected static final MapleLog instance = new MapleLog();
    }
}
