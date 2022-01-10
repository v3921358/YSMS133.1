/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.programs;

import java.io.IOException;
import java.util.Calendar;

import server.Timer.EventTimer;

/**
 * @author zisedk
 */
public class TimerTest {

    /*
     * 时间定时工具测试
     */
    public static void main(String args[]) throws IOException {
        System.out.println("启动定时器...");
        EventTimer.getInstance().start();
        long oneDay = 24 * 60 * 60 * 1000; //连续执行任务的周期
        //设置执行时间
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int day = calendar.get(Calendar.DAY_OF_MONTH); //每天
        //定制每天的18:30:00执行
        calendar.set(year, month, day, 17, 15, 00);
        long initDelay = calendar.getTimeInMillis() - System.currentTimeMillis(); //首次执行任务的间隔
        System.out.println("下次执行的时间间隔: " + initDelay);
        initDelay = initDelay > 0 ? initDelay : oneDay + initDelay;
        System.out.println("最终下次执行的时间间隔: " + initDelay);
        /*
         * EchoServer = 执行的命令
         * oneDay = 连续执行之间的周期
         * initDelay = 首次执行的延迟时间
         */
        EventTimer.getInstance().register(new EchoServer(), oneDay, initDelay);
    }

    public static class EchoServer implements Runnable {

        @Override
        public void run() {
            System.out.println("This is a echo server. The current time is " + System.currentTimeMillis() + ".");
        }
    }
}
