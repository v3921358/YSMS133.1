package server;

import database.DatabaseConnection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * 初始化服务器配置，比如更新数据库格式等
 *
 * @author 车宏伟 创建日期 2016/4/23
 */
public class InitializeServer {

    /**
     * 补丁列表
     */
    enum UPDATE_PATCH {

        更新表格式_questinfo("ALTER TABLE `questinfo` ADD COLUMN `accountid`  int(11) NOT NULL DEFAULT 0 AFTER `questinfoid`"),
        更新表格式_data_signin_reward("ALTER TABLE `data_signin_reward` CHANGE COLUMN `level` `iscash`  tinyint(1) NULL DEFAULT 0 AFTER `expiredate`"),
        删除旧版签到记录表("DROP TABLE IF EXISTS `data_signin_log`"),;

        private String sql;

        public String getSQL() {
            return sql;
        }

        UPDATE_PATCH(String sql) {
            this.sql = sql;
        }
    }

    /**
     * 服务端初始化，应用数据库更改等
     *
     * @return
     */
    public static boolean Initial() {
        initializeSetting();
        return initializeUpdateLog() && initializeMySQL();
    }

    /**
     * 初始化设置 1、账号状态
     */
    private static void initializeSetting() {
        try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("UPDATE `accounts` SET `loggedin` = 0, `check` = 0")) {
            ps.executeUpdate();
        } catch (SQLException ex) {
            throw new RuntimeException("[EXCEPTION] Please check if the SQL server is active.");
        }
    }

    /**
     * 创建更新日志的记录表
     *
     * @return
     */
    private static boolean initializeUpdateLog() {
        if (!checkTableisExist()) {
            try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("CREATE TABLE `systemupdatelog` (`id`  int(11) NOT NULL AUTO_INCREMENT,`patchid`  tinyint(1) NOT NULL ,`lasttime`  timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP ,PRIMARY KEY (`id`))")) {
                ps.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return checkTableisExist();
    }

    /**
     * 查看更新日志记录表是否存在
     *
     * @return
     */
    private static boolean checkTableisExist() {
        boolean exist = false;
        try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SHOW TABLES LIKE 'systemupdatelog'"); ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                exist = true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return exist;
    }

    /**
     * 应用MySQL补丁
     *
     * @return
     */
    private static boolean initializeMySQL() {
        for (UPDATE_PATCH patch : UPDATE_PATCH.values()) {
            if (!checkIsAppliedSQLPatch(patch.ordinal())) {
                if (!applySQLPatch(patch.getSQL()) || !insertUpdateLog(patch.ordinal())) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 检查是否已应用补丁
     *
     * @param id
     * @return
     */
    private static boolean checkIsAppliedSQLPatch(int id) {
        try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT id FROM systemupdatelog WHERE patchid = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return true;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 插入补丁的更新记录
     *
     * @param patchid 补丁id
     * @return
     */
    private static boolean insertUpdateLog(int patchid) {
        try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("INSERT INTO systemupdatelog(id, patchid, lasttime) VALUES (DEFAULT, ?, CURRENT_TIMESTAMP)")) {
            ps.setInt(1, patchid);
            ps.executeUpdate();
            return true;
        } catch (SQLException ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private static boolean applySQLPatch(String sql) {
        try (PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement(sql)) {
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            if (e.getMessage().contains("Duplicate column name")) {
                return true;
            }
            e.printStackTrace();
            return false;
        }
    }
}
