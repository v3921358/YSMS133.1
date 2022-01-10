package tools.programs;

import database.DatabaseConnection;
import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;

public class DumpCashItemInfo {

    private final MapleDataProvider cash;
    protected boolean hadError = false;
    protected boolean update = false;
    protected int id = 0;
    public int number = 0;
    private Connection con = DatabaseConnection.getConnection();

    public DumpCashItemInfo(boolean update) throws Exception {
        this.update = update;
        this.cash = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Etc.wz"));
        if (cash == null) {
            hadError = true;
        }
    }

    public boolean isHadError() {
        return hadError;
    }

    public void dumpCashItemInfo() throws Exception {
        if (!hadError) {
            if (!update) {
                delete("DELETE FROM cashshop_commodity");
                System.out.println("Deleted cashshop_commodity successfully.");
            }
            System.out.println("Adding into cashshop_commodity.....");
            final List<MapleData> cccc = cash.getData("Commodity.img").getChildren();
            for (MapleData field : cccc) {
                final int ItemId = MapleDataTool.getIntConvert("ItemId", field, 0);
                final int SN = MapleDataTool.getIntConvert("SN", field, 0);
                final int Count = MapleDataTool.getIntConvert("Count", field, 1);
                final int Price = MapleDataTool.getIntConvert("Price", field, 0);
                final int onSale = MapleDataTool.getIntConvert("OnSale", field, 0);

                if (SN > 0) {
                    PreparedStatement ps;
                    try {
                        ps = con.prepareStatement("INSERT INTO cashshop_commodity (`itemid`, `sn`,  `sn_`, `count_`, `price`, `onSale`) VALUES (?, ?, ?, ?, ?, ?)");
                        ps.setInt(1, ItemId);
                        ps.setInt(2, SN);
                        ps.setInt(3, SN);
                        ps.setInt(4, Count);
                        ps.setInt(5, Price);
                        ps.setInt(6, onSale);
                        ps.executeUpdate();
                        ps.close();
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }
                    number++;
                    //System.out.println("Add CashInfo ID: " + ItemId + " SN: " + SN + " Number: " + number);
                }
            }
            System.out.println("number: " + number + " Done cashshop_commodity...");
        }
    }

    public void delete(String sql) throws Exception {
        PreparedStatement ps = con.prepareStatement(sql);
        ps.executeUpdate();
        ps.close();
    }

    public int currentId() {
        return id;
    }

    public int currentNumber() {
        return number;
    }

    public static void main(String[] args) {
        boolean hadError = false;
        boolean update = false;
        long startTime = System.currentTimeMillis();
        for (String file : args) {
            if (file.equalsIgnoreCase("-update")) {
                update = true;
            }
        }
        int currentItemId = 0;
        try {
            final DumpCashItemInfo dq = new DumpCashItemInfo(update);
            System.out.println("Dumping cashItemInfo");
            dq.dumpCashItemInfo();
            hadError |= dq.isHadError();
            currentItemId = dq.currentId();
        } catch (Exception e) {
            hadError = true;
            e.printStackTrace();
            System.out.println(currentItemId + " cashItemId.");
        }
        long endTime = System.currentTimeMillis();
        double elapsedSeconds = (endTime - startTime) / 1000.0;
        int elapsedSecs = (((int) elapsedSeconds) % 60);
        int elapsedMinutes = (int) (elapsedSeconds / 60.0);

        String withErrors = "";
        if (hadError) {
            withErrors = " with errors";
        }
        System.out.println("Finished" + withErrors + " in " + elapsedMinutes + " minutes " + elapsedSecs + " seconds");
    }
}
