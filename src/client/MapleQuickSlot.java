/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import database.DatabaseConnection;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * @author PlayDK
 */
public class MapleQuickSlot implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    private boolean changed = false;
    private List<Pair<Integer, Integer>> quickslot;

    public MapleQuickSlot() {
        quickslot = new ArrayList<>();
    }

    public MapleQuickSlot(List<Pair<Integer, Integer>> quickslots) {
        quickslot = quickslots;
    }

    public List<Pair<Integer, Integer>> Layout() {
        changed = true;
        return quickslot;
    }

    public void unchanged() {
        changed = false;
    }

    public void resetQuickSlot() {
        changed = true;
        quickslot.clear();
    }

    public void addQuickSlot(int index, int key) {
        changed = true;
        quickslot.add(new Pair<>(index, key));
    }

    public int getKeyByIndex(int index) {
        for (Pair<Integer, Integer> p : quickslot) {
            if (p.getLeft() == index) {
                return p.getRight();
            }
        }
        return -1;
    }

    public void writeData(MaplePacketLittleEndianWriter mplew) {
        mplew.write(quickslot.isEmpty() ? 0 : 1);
        if (quickslot.isEmpty()) {
            return;
        }
        Collections.sort(quickslot, new QuickSlotComparator());
        for (Pair<Integer, Integer> qs : quickslot) {
            mplew.writeInt(qs.getRight());
        }
    }

    public void saveQuickSlots(int charid) throws SQLException {
        if (!changed) {
            return;
        }
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("DELETE FROM quickslot WHERE characterid = ?");
        ps.setInt(1, charid);
        ps.execute();
        ps.close();
        if (quickslot.isEmpty()) {
            return;
        }
        boolean first = true;
        StringBuilder query = new StringBuilder();
        for (Pair<Integer, Integer> q : quickslot) {
            if (first) {
                first = false;
                query.append("INSERT INTO quickslot VALUES (");
            } else {
                query.append(",(");
            }
            query.append("DEFAULT,");
            query.append(charid).append(",");
            query.append(q.getLeft().intValue()).append(",");
            query.append(q.getRight().intValue()).append(")");
        }
        ps = con.prepareStatement(query.toString());
        ps.execute();
        ps.close();
    }

    public static class QuickSlotComparator implements Comparator<Pair<Integer, Integer>>, Serializable {

        /**
         *
         */
        private static final long serialVersionUID = -6300856806095371979L;

        @Override
        public int compare(Pair<Integer, Integer> p1, Pair<Integer, Integer> p2) {
            int val1index = p1.getLeft();
            int val2index = p2.getLeft();
            if (val1index > val2index) {
                return 1;
            } else if (val1index == val2index) {
                return 0;
            } else {
                return -1;
            }
        }
    }
}
