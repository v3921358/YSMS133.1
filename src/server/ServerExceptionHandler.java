package server;

import java.rmi.RemoteException;
import java.sql.SQLException;

import org.apache.log4j.Logger;

public class ServerExceptionHandler {

    private static Logger log = Logger.getLogger(ServerExceptionHandler.class);

    public static void HandlerRemoteException(RemoteException exception) {
        log.error("异常类型 RemoteException：", exception);
    }

    public static void HandlerSqlException(SQLException exception) {
        log.error("异常类型 SQLException：", exception);
    }

    public static void HandlerException(Exception exception) {
        log.error("异常类型 " + exception.getClass().getName() + "：", exception);
    }
}
