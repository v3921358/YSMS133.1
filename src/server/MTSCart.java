package server;

import client.inventory.Item;
import client.inventory.ItemLoader;
import client.inventory.MapleInventoryType;
import constants.ItemConstants;
import database.DatabaseConnection;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import tools.Pair;

public class MTSCart implements Serializable {

    private static final long serialVersionUID = 231541893513373578L;
    private int characterId, tab = 1, type = 0, page = 0;
    //tab; 1 = buy now, 2 = wanted, 3 = auction, 4 = cart
    //type = inventorytype; 0 = anything
    //page = whatever
    private List<Item> transfer = new ArrayList<>();
    private List<Integer> cart = new ArrayList<>();
    private List<Integer> notYetSold = new ArrayList<>(10);
    private List<Integer> currentViewingItems = new ArrayList<>();
    private int owedNX = 0;

    public MTSCart(int characterId) throws SQLException {
        this.characterId = characterId;
        for (Pair<Item, MapleInventoryType> item : ItemLoader.MTS_TRANSFER.loadItems(false, characterId).values()) {
            transfer.add(item.getLeft());
        }
        loadCart();
        loadNotYetSold();
    }

    public List<Item> getInventory() {
        return transfer;
    }

    public void addToInventory(Item item) {
        transfer.add(item);
    }

    public void removeFromInventory(Item item) {
        transfer.remove(item);
    }

    public List<Integer> getCart() {
        return cart;
    }

    public boolean addToCart(int car) {
        if (!cart.contains(car)) {
            cart.add(car);
            return true;
        }
        return false;
    }

    public void removeFromCart(int car) {
        for (int i = 0; i < cart.size(); i++) {
            if (cart.get(i) == car) {
                cart.remove(i);
            }
        }
    }

    public List<Integer> getNotYetSold() {
        return notYetSold;
    }

    public void addToNotYetSold(int car) {
        notYetSold.add(car);
    }

    public void removeFromNotYetSold(int car) {
        for (int i = 0; i < notYetSold.size(); i++) {
            if (notYetSold.get(i) == car) {
                notYetSold.remove(i);
            }
        }
    }

    public int getSetOwedNX() {
        int on = owedNX;
        owedNX = 0;
        return on;
    }

    public void increaseOwedNX(int newNX) {
        owedNX += newNX;
    }

    public void save() throws SQLException {
        List<Pair<Item, MapleInventoryType>> itemsWithType = new ArrayList<>();

        for (Item item : getInventory()) {
            itemsWithType.add(new Pair<>(item, ItemConstants.getInventoryType(item.getItemId())));
        }

        ItemLoader.MTS_TRANSFER.saveItems(itemsWithType, characterId);
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("DELETE FROM mts_cart WHERE characterid = ?");
        ps.setInt(1, characterId);
        ps.execute();
        ps.close();
        ps = con.prepareStatement("INSERT INTO mts_cart VALUES(DEFAULT, ?, ?)");
        ps.setInt(1, characterId);
        for (int i : cart) {
            ps.setInt(2, i);
            ps.executeUpdate();
        }
        if (owedNX > 0) {
            ps.setInt(2, -owedNX);
            ps.executeUpdate();
        }
        ps.close();
        //notYetSold shouldnt be saved here
    }

    public final void loadCart() throws SQLException {
        PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM mts_cart WHERE characterid = ?");
        ps.setInt(1, characterId);
        ResultSet rs = ps.executeQuery();
        int iId;
        while (rs.next()) {
            iId = rs.getInt("itemid");
            if (iId < 0) {
                owedNX -= iId;
            } else if (MTSStorage.getInstance().check(iId)) {
                cart.add(iId);
            }
        }
        rs.close();
        ps.close();
    }

    public final void loadNotYetSold() throws SQLException {
        PreparedStatement ps = DatabaseConnection.getConnection().prepareStatement("SELECT * FROM mts_items WHERE characterid = ?");
        ps.setInt(1, characterId);
        ResultSet rs = ps.executeQuery();
        int pId;
        while (rs.next()) {
            pId = rs.getInt("id");
            if (MTSStorage.getInstance().check(pId)) {
                notYetSold.add(pId);
            }
        }
        rs.close();
        ps.close();
    }

    public void changeInfo(int tab, int type, int page) {
        if (tab != this.tab || type != this.type) { //changed
            refreshCurrentView(tab, type);
        }
        this.tab = tab;
        this.type = type;
        this.page = page;
    }

    public int getTab() {
        return tab;
    }

    public int getType() {
        return type;
    }

    public int getPage() {
        return page;
    }

    public List<Integer> getCurrentViewPage() {
        List<Integer> ret = new ArrayList<>();
        int size = currentViewingItems.size() / 16 + (currentViewingItems.size() % 16 > 0 ? 1 : 0);
        if (page > size) {
            page = 0;
        }
        for (int i = page * 16; i < page * 16 + 16; i++) {
            if (currentViewingItems.size() > i) {
                ret.add(currentViewingItems.get(i));
            } else {
                break;
            }
        }
        return ret;
    }

    public List<Integer> getCurrentView() {
        return currentViewingItems;
    }

    public void refreshCurrentView() {
        refreshCurrentView(tab, type);
    }

    public void refreshCurrentView(int newTab, int newType) {
        currentViewingItems.clear();
        if (newTab == 1) {
            currentViewingItems = MTSStorage.getInstance().getBuyNow(newType);
        } else if (newTab == 4) {
            for (int i : cart) {
                if (newType == 0 || (ItemConstants.getInventoryType(i).getType() == newType)) {
                    currentViewingItems.add(i);
                }
            }
        }
    }

    public void changeCurrentView(List<Integer> items) {
        currentViewingItems.clear();
        currentViewingItems = items;
    }
}
