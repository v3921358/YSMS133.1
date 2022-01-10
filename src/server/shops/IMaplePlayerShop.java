package server.shops;

import client.MapleCharacter;
import client.MapleClient;

import java.util.List;

import server.shops.AbstractPlayerStore.BoughtItem;
import tools.Pair;

public interface IMaplePlayerShop {

    byte HIRED_MERCHANT = 1;
    byte PLAYER_SHOP = 2;
    byte OMOK = 3;
    byte MATCH_CARD = 4;

    String getOwnerName();

    String getDescription();

    void setDescription(String desc);

    List<Pair<Byte, MapleCharacter>> getVisitors();

    List<MaplePlayerShopItem> getItems();

    boolean isOpen();

    boolean saveItems();

    boolean removeItem(int item);

    boolean isOwner(MapleCharacter chr);

    byte getShopType();

    byte getVisitorSlot(MapleCharacter visitor);

    byte getFreeSlot();

    int getItemId();

    long getMeso();

    int getOwnerId();

    int getOwnerAccId();

    void setOpen(boolean open);

    void setMeso(long meso);

    void addItem(MaplePlayerShopItem item);

    void removeFromSlot(int slot);

    void broadcastToVisitors(byte[] packet);

    void addVisitor(MapleCharacter visitor);

    void removeVisitor(MapleCharacter visitor);

    void removeAllVisitors(int error, int type);

    void buy(MapleClient c, int item, short quantity);

    void closeShop(boolean saveItems, boolean remove);

    String getPassword();

    int getMaxSize();

    int getSize();

    int getGameType();

    void update();

    void setAvailable(boolean b);

    boolean isAvailable();

    List<BoughtItem> getBoughtItems();

    List<Pair<String, Byte>> getMessages();

    int getMapId();

    int getChannel();
}
