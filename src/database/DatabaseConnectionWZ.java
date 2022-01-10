/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package database;

import com.mysql.jdbc.Statement;

import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Properties;

/**
 * @author PlayDK
 */
public class DatabaseConnectionWZ {

    private static final HashMap<Integer, DatabaseConnectionWZ.ConWrapper> connections = new HashMap<>();
    private static String dbDriver, dbUrl, dbUser, dbPass;
    private static boolean propsInited = false;
    private static Properties dbProps = new Properties();
    private static long connectionTimeOut = 5 * 60 * 1000; // 5 minutes
    public static final int CLOSE_CURRENT_RESULT = 1;

    private DatabaseConnectionWZ() {
    }

    /**
     * The constant indicating that the current <code>ResultSet</code> object
     * should not be closed when calling <code>getMoreResults</code>.
     *
     * @since 1.4
     */
    public static final int KEEP_CURRENT_RESULT = 2;
    /**
     * The constant indicating that all <code>ResultSet</code> objects that have
     * previously been kept open should be closed when calling
     * <code>getMoreResults</code>.
     *
     * @since 1.4
     */
    public static final int CLOSE_ALL_RESULTS = 3;
    /**
     * The constant indicating that a batch statement executed successfully but
     * that no count of the number of rows it affected is available.
     *
     * @since 1.4
     */
    public static final int SUCCESS_NO_INFO = -2;
    /**
     * The constant indicating that an error occured while executing a batch
     * statement.
     *
     * @since 1.4
     */
    public static final int EXECUTE_FAILED = -3;
    /**
     * The constant indicating that generated keys should be made available for
     * retrieval.
     *
     * @since 1.4
     */
    public static final int RETURN_GENERATED_KEYS = 1;
    /**
     * The constant indicating that generated keys should not be made available
     * for retrieval.
     *
     * @since 1.4
     */
    public static final int NO_GENERATED_KEYS = 2;

    public static Connection getConnection() {
        Thread cThread = Thread.currentThread();
        int threadID = (int) cThread.getId();
        DatabaseConnectionWZ.ConWrapper ret = connections.get(threadID);
        if (ret == null) {
            Connection retCon = connectToDB();
            ret = new DatabaseConnectionWZ.ConWrapper(retCon);
            ret.id = threadID;
            connections.put(threadID, ret);
            //System.out.println("[WZDB信息] 线程ID " + threadID + " 创建了一个新的数据库连接.");
        }
        return ret.getConnection();
    }

    private static long getWaitTimeout(Connection con) {
        Statement stmt = null;
        ResultSet rs = null;
        try {
            stmt = (Statement) con.createStatement();
            rs = stmt.executeQuery("SHOW VARIABLES LIKE 'wait_timeout'");
            if (rs.next()) {
                return Math.max(1000, rs.getInt(2) * 1000 - 1000);
            } else {
                return -1;
            }
        } catch (SQLException ex) {
            return -1;
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                } finally {
                    if (rs != null) {
                        try {
                            rs.close();
                        } catch (SQLException ex1) {
                        }
                    }
                }
            }
        }
    }

    private static Connection connectToDB() {
        if (!propsInited) {
            try {
                FileReader fR = new FileReader("db.properties");
                dbProps.load(fR);
                fR.close();
            } catch (IOException ex) {
                System.out.println("[WZDB信息] Unable to start server: Error reading from db.properties.");
            }
            dbDriver = dbProps.getProperty("driver");
            dbUrl = dbProps.getProperty("wzdburl");
            dbUser = dbProps.getProperty("user");
            dbPass = dbProps.getProperty("password");
            try {
                connectionTimeOut = Long.parseLong(dbProps.getProperty("timeout"));
            } catch (Exception e) {
                System.out.println("[WZDB信息] Cannot read Timeout Information, using default: " + connectionTimeOut + " ");
            }
        }
        try {
            Class.forName(dbDriver); // touch the MySQL driver
        } catch (ClassNotFoundException e) {
            System.out.println("[WZDB信息] Could not locate the JDBC mysql driver.");
        }
        try {
            Connection con = DriverManager.getConnection(dbUrl, dbUser, dbPass);
            if (!propsInited) {
                long timeout = getWaitTimeout(con);
                if (timeout == -1) {
                    //System.out.println("[WZDB信息] Failed to read Wait_Timeout, using " + connectionTimeOut + " instead.");
                } else {
                    connectionTimeOut = timeout;
                    //System.out.println("[WZDB信息] Database Timeout is: " + connectionTimeOut + " milliseconds.");
                }
                propsInited = true;
            }
            return con;
        } catch (SQLException e) {
            throw new DatabaseException(e);
        }
    }

    public static class ConWrapper {

        private long lastAccessTime = 0;
        private Connection connection;
        private int id;

        public ConWrapper(Connection con) {
            this.connection = con;
        }

        public Connection getConnection() {
            if (expiredConnection()) {
                System.out.println("[WZDB信息] 连接 " + id + " 已经超时.重新连接...");
                try { // Assume that the connection is stale
                    connection.close();
                } catch (Throwable err) {
                    // Who cares
                }
                this.connection = connectToDB();
            }
            lastAccessTime = System.currentTimeMillis(); // Record Access
            return this.connection;
        }

        /**
         * Returns whether this connection has expired
         *
         * @return
         */
        public boolean expiredConnection() {
            if (lastAccessTime == 0) {
                return false;
            }
            try {
                return System.currentTimeMillis() - lastAccessTime >= connectionTimeOut || connection.isClosed();
            } catch (Throwable ex) {
                return true;
            }
        }
    }

    public static void closeAll() throws SQLException {
        for (DatabaseConnectionWZ.ConWrapper con : connections.values()) {
            con.connection.close();
        }
        connections.clear();
    }
}
