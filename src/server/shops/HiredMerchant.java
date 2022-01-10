package server.shops;

import client.MapleCharacter;
import client.MapleClient;
import client.inventory.Item;
import client.inventory.ItemFlag;
import constants.GameConstants;
import handling.channel.ChannelServer;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

import org.apache.log4j.Logger;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import server.Timer.EtcTimer;
import server.maps.MapleMapObjectType;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.packet.PlayerShopPacket;

public class HiredMerchant extends AbstractPlayerStore {

    public ScheduledFuture<?> schedule;
    private List<String> blacklist;
    private int storeid;
    private long start;
    private long lastChangeNameTime = 0; //改变雇佣商店名称的时间
    private static final Logger log = Logger.getLogger(HiredMerchant.class);

    public HiredMerchant(MapleCharacter owner, int itemId, String desc) {
        super(owner, itemId, desc, "", 6); //以前是3个人 V.100改为6个
        start = System.currentTimeMillis();
        blacklist = new LinkedList<>();
        this.schedule = EtcTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                if (getMCOwner() != null && getMCOwner().getPlayerShop() == HiredMerchant.this) {
                    getMCOwner().setPlayerShop(null);
                }
                removeAllVisitors(-1, -1);
                closeShop(true, true);
            }
        }, 1000 * 60 * 60 * 24);
    }

    @Override
    public byte getShopType() {
        return IMaplePlayerShop.HIRED_MERCHANT;
    }

    public void setStoreid(int storeid) {
        this.storeid = storeid;
    }

    public List<MaplePlayerShopItem> searchItem(int itemSearch) {
        List<MaplePlayerShopItem> itemz = new LinkedList<>();
        for (MaplePlayerShopItem item : items) {
            if (item.item.getItemId() == itemSearch && item.bundles > 0) {
                itemz.add(item);
            }
        }
        return itemz;
    }

    @Override
    public void buy(MapleClient c, int item, short quantity) {
        MaplePlayerShopItem pItem = items.get(item);
        Item shopItem = pItem.item;
        Item newItem = shopItem.copy();
        short perbundle = newItem.getQuantity();
        long theQuantity = (pItem.price * quantity);
        newItem.setQuantity((short) (quantity * perbundle));

        short flag = newItem.getFlag();

        if (ItemFlag.KARMA_EQ.check(flag)) {
            newItem.setFlag((short) (flag - ItemFlag.KARMA_EQ.getValue()));
        } else if (ItemFlag.KARMA_USE.check(flag)) {
            newItem.setFlag((short) (flag - ItemFlag.KARMA_USE.getValue()));
        }

        if (MapleInventoryManipulator.checkSpace(c, newItem.getItemId(), newItem.getQuantity(), newItem.getOwner())) {
            long gainmeso = getMeso() + theQuantity - GameConstants.EntrustedStoreTax(theQuantity);
            if (gainmeso > 0) {
                setMeso(gainmeso);
                pItem.bundles -= quantity; // Number remaining in the store
                MapleInventoryManipulator.addFromDrop(c, newItem, false);
                bought.add(new BoughtItem(newItem.getItemId(), quantity, theQuantity, c.getPlayer().getName()));
                c.getPlayer().gainMeso(-theQuantity, false);
                saveItems();
                MapleCharacter chr = getMCOwnerWorld();
                StringBuilder msg = new StringBuilder();
                MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
                msg.append("物品");
                msg.append(ii.getName(newItem.getItemId()));
                msg.append(" 通过精灵商人售出（");
                msg.append(perbundle).append("x").append(quantity);
                msg.append("）剩余数量：");
                msg.append(pItem.bundles).append(" 购买者：").append(c.getPlayer().getName());
                if (chr != null) {
                    chr.getClient().getSession().write(MaplePacketCreator.showRedNotice(msg.toString()));
                }
                FileoutputUtil.hiredMerchLog(chr != null ? chr.getName() : getOwnerName(), "雇佣商店卖出: " + newItem.getItemId() + " - " + msg.toString() + " 价格: " + theQuantity);
            } else {
                c.getPlayer().dropMessage(1, "金币不足.");
                c.getSession().write(MaplePacketCreator.enableActions());
            }
        } else {
            c.getPlayer().dropMessage(1, "背包已满.");
            c.getSession().write(MaplePacketCreator.enableActions());
        }
    }

    @Override
    public void closeShop(boolean saveItems, boolean remove) {
        if (schedule != null) {
            schedule.cancel(false);
        }
        if (saveItems) {
            saveItems();
            items.clear();
        }
        if (remove) {
            ChannelServer.getInstance(channel).removeMerchant(this);
            getMap().broadcastMessage(PlayerShopPacket.destroyHiredMerchant(getOwnerId()));
        }
        getMap().removeMapObject(this);
        schedule = null;
    }

    public int getTimeLeft() {
        return (int) (System.currentTimeMillis() - start);
    }

    public int getTimeLeft(boolean first) {
        if (first) {
            return (int) start;
        }
        return 60 * 60 * 24 - (int) (System.currentTimeMillis() - start) / 1000;
    }

    public int getStoreId() {
        return storeid;
    }

    /*
     * 检测是否能修改雇佣商店名称
     */
    public boolean canChangeName() {
        if (lastChangeNameTime + 60000 > System.currentTimeMillis()) {
            return false;
        }
        lastChangeNameTime = System.currentTimeMillis();
        return true;
    }

    public int getChangeNameTimeLeft() {
        int time = 60 - (int) (System.currentTimeMillis() - lastChangeNameTime) / 1000;
        return time > 0 ? time : 1;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.HIRED_MERCHANT;
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        if (isAvailable()) {
            client.getSession().write(PlayerShopPacket.destroyHiredMerchant(getOwnerId()));
        }
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (isAvailable()) {
            client.getSession().write(PlayerShopPacket.spawnHiredMerchant(this));
        }
    }

    public boolean isInBlackList(String bl) {
        return blacklist.contains(bl);
    }

    public void addBlackList(String bl) {
        blacklist.add(bl);
    }

    public void removeBlackList(String bl) {
        blacklist.remove(bl);
    }

    public void sendBlackList(MapleClient c) {
        c.getSession().write(PlayerShopPacket.MerchantBlackListView(blacklist));
    }

    public void sendVisitor(MapleClient c) {
        c.getSession().write(PlayerShopPacket.MerchantVisitorView(visitorsList));
    }
}
