/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import handling.channel.ChannelServer;
import server.Timer.WorldTimer;

/**
 * @author PlayDK
 */
public class PlayMSEvent {

    public static void start() {
        System.out.println("服务端启用在线泡点1分钟1次.");
        WorldTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.AutoPaoDian(cserv.getAutoPaoDian());
                }
            }
        }, 1000 * 60);

        System.out.println("服务端启用自由市场自动加经验3分钟1次.");
        WorldTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.AutoGain(cserv.getAutoGain());
                }
            }
        }, 1000 * 60 * 3);

//        System.out.println("服务端启用自由市场自动加点卷10分钟1次.");
//        WorldTimer.getInstance().register(new Runnable() {
//
//            @Override
//            public void run() {
//                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
//                    cserv.AutoNx(cserv.getAutoNx());
//                }
//            }
//        }, 1000 * 60 * 10);
        System.out.println("所有定时活动已经启动完毕...");
    }
}
