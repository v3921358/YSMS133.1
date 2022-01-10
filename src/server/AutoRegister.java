/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import database.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;

/**
 * @author PlayDK
 */
public class AutoRegister {

    /**
     * Logger for this class.
     */
    private static final Logger log = Logger.getLogger(AutoRegister.class);
    private static int ACCOUNTS_PER_IP = 6;

    public static boolean getAccountExists(String login) {
        boolean accountExists = false;
        try {
            PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT name FROM accounts WHERE name = ?");
            ps.setString(1, login);
            ResultSet rs = ps.executeQuery();
            if (rs.first()) {
                accountExists = true;
            }
            ps.close();
            rs.close();
        } catch (Exception ex) {
            log.error("AutoRegister Error!", ex);
        }
        return accountExists;
    }

    public static boolean createAccount(String login, String pwd, String eip) {
        boolean success = false;
        String sockAddr = eip.substring(1, eip.lastIndexOf(':'));
        try {
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ipc = con.prepareStatement("SELECT lastknownip FROM accounts WHERE lastknownip = ?");
            ipc.setString(1, sockAddr);
            ResultSet rs = ipc.executeQuery();
            if (!rs.first() || rs.last() && rs.getRow() < ACCOUNTS_PER_IP) {
                PreparedStatement ps = con.prepareStatement("INSERT INTO accounts (name, password, birthday, macs, lastknownip) VALUES (?, ?, ?, ?, ?)");
                ps.setString(1, login);
                ps.setString(2, pwd);
                ps.setString(3, "0000-00-00");
                ps.setString(4, "00-00-00-00-00-00");
                ps.setString(5, sockAddr);
                ps.executeUpdate();
                ps.close();
                success = true;
            }
            rs.close();
            ipc.close();
        } catch (SQLException ex) {
            log.error("Something bad with Autoregister.", ex);
        }
        return success;
    }
}
