/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import database.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author 输了爱
 */
public final class MapleSigninStatus {

    private int day;
    private String lasttime;

    MapleSigninStatus(String questinfo) {
        if (questinfo.isEmpty()) {
            day = 0;
            lasttime = "";
        } else {
            String info[] = questinfo.split(";");
            for (String s : info) {
                if (s.contains("day")) {
                    day = Integer.valueOf(s.substring(s.indexOf("=") + 1));
                } else if (s.contains("date")) {
                    lasttime = s.substring(s.indexOf("=") + 1);
                }
            }
        }
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public String getLasttime() {
        return lasttime;
    }

    public void setLasttime(String lasttime) {
        this.lasttime = lasttime;
    }

    public void update() {
        day += 1;
        lasttime = getInitLastTime();
    }

    /**
     * 获得每日签到的初始化时间
     *
     * @return
     */
    public static final String getInitLastTime() {
        return new SimpleDateFormat("yyyyMMdd").format(new Date());
    }

    @Override
    public String toString() {
        return "count=1;day=" + day + ";date=" + lasttime;
    }

}
