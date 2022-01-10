package handling.channel;

import client.MapleCharacter;
import client.MapleCharacterUtil;
import handling.world.CharacterTransfer;
import handling.world.CheaterData;
import handling.world.WorldFindService;

import java.util.*;
import java.util.Map.Entry;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import server.Timer.PingTimer;
import server.WinStart;

public class PlayerStorage {

    private int channel;
    private final ReentrantReadWriteLock mutex = new ReentrantReadWriteLock();
    private final Lock readLock = mutex.readLock(), writeLock = mutex.writeLock();
    private final ReentrantReadWriteLock mutex2 = new ReentrantReadWriteLock();
    private final Lock connectcheckReadLock = mutex2.readLock(), pendingWriteLock = mutex2.writeLock();
    private final Map<String, MapleCharacter> nameToChar = new HashMap<>();
    private final Map<Integer, MapleCharacter> idToChar = new HashMap<>();
    private final Map<Integer, CharacterTransfer> PendingCharacter = new HashMap<>();

    public PlayerStorage(int channel) {
        this.channel = channel;
        PingTimer.getInstance().register(new PersistingTask(), 60 * 1000);
        PingTimer.getInstance().register(new ConnectChecker(), 10 * 1000); //10秒检测1次
    }

    public ArrayList<MapleCharacter> getAllCharacters() {
        readLock.lock();
        try {
            return new ArrayList<>(idToChar.values());
        } finally {
            readLock.unlock();
        }
    }

    /*
     * 注册角色到服务器上
     */
    public void registerPlayer(MapleCharacter chr) {
        writeLock.lock();
        try {
            nameToChar.put(chr.getName().toLowerCase(), chr);
            idToChar.put(chr.getId(), chr);
        } finally {
            writeLock.unlock();
        }
        WorldFindService.getInstance().register(chr.getId(), chr.getName(), channel);
    }

    /*
     * 注册临时角色信息到服务器上
     */
    public void registerPendingPlayer(CharacterTransfer chr, int playerId) {
        pendingWriteLock.lock();
        try {
            PendingCharacter.put(playerId, chr);//new Pair(System.currentTimeMillis(), chr));
        } finally {
            pendingWriteLock.unlock();
        }
    }

    /*
     * 通过 chr
     * 注销角色登记信息
     */
    public void deregisterPlayer(MapleCharacter chr) {
        writeLock.lock();
        try {
            nameToChar.remove(chr.getName().toLowerCase());
            idToChar.remove(chr.getId());
        } finally {
            writeLock.unlock();
        }
        WorldFindService.getInstance().forceDeregister(chr.getId(), chr.getName());
        if (WinStart.getInstance() != null) {
            WinStart.getInstance().updatePlayerList(chr, false);
        }
    }

    /*
     * 通过 角色ID 和 角色名字
     * 注销角色登记信息
     */
    public void deregisterPlayer(int idz, String namez) {
        writeLock.lock();
        try {
            nameToChar.remove(namez.toLowerCase());
            idToChar.remove(idz);
        } finally {
            writeLock.unlock();
        }
        WorldFindService.getInstance().forceDeregister(idz, namez);
    }

    /*
     * 通过 chr
     * 断开角色登记信息
     */
    public void disconnectPlayer(MapleCharacter chr) {
        writeLock.lock();
        try {
            nameToChar.remove(chr.getName().toLowerCase());
            idToChar.remove(chr.getId());
        } finally {
            writeLock.unlock();
        }
        WorldFindService.getInstance().forceDeregisterEx(chr.getId(), chr.getName());
    }

    public int pendingCharacterSize() {
        return PendingCharacter.size();
    }

    public void deregisterPendingPlayer(int charId) {
        pendingWriteLock.lock();
        try {
            PendingCharacter.remove(charId);
        } finally {
            pendingWriteLock.unlock();
        }
    }

    public CharacterTransfer getPendingCharacter(int charId) {
        pendingWriteLock.lock();
        try {
            return PendingCharacter.remove(charId);
        } finally {
            pendingWriteLock.unlock();
        }
    }

    public MapleCharacter getCharacterByName(String name) {
        readLock.lock();
        try {
            return nameToChar.get(name.toLowerCase());
        } finally {
            readLock.unlock();
        }
    }

    public MapleCharacter getCharacterById(int id) {
        readLock.lock();
        try {
            return idToChar.get(id);
        } finally {
            readLock.unlock();
        }
    }

    public int getConnectedClients() {
        return idToChar.size();
    }

    public List<CheaterData> getCheaters() {
        List<CheaterData> cheaters = new ArrayList<>();
        readLock.lock();
        try {
            final Iterator<MapleCharacter> itr = nameToChar.values().iterator();
            MapleCharacter chr;
            while (itr.hasNext()) {
                chr = itr.next();
                if (chr.getCheatTracker().getPoints() > 0) {
                    cheaters.add(new CheaterData(chr.getCheatTracker().getPoints(), MapleCharacterUtil.makeMapleReadable(chr.getName()) + " ID: " + chr.getId() + " (" + chr.getCheatTracker().getPoints() + ") " + chr.getCheatTracker().getSummary()));
                }
            }
        } finally {
            readLock.unlock();
        }
        return cheaters;
    }

    public List<CheaterData> getReports() {
        List<CheaterData> cheaters = new ArrayList<>();
        readLock.lock();
        try {
            final Iterator<MapleCharacter> itr = nameToChar.values().iterator();
            MapleCharacter chr;
            while (itr.hasNext()) {
                chr = itr.next();
                if (chr.getReportPoints() > 0) {
                    cheaters.add(new CheaterData(chr.getReportPoints(), MapleCharacterUtil.makeMapleReadable(chr.getName()) + " ID: " + chr.getId() + " (" + chr.getReportPoints() + ") " + chr.getReportSummary()));
                }
            }
        } finally {
            readLock.unlock();
        }
        return cheaters;
    }

    /*
     * 断开所有非GM角色连接
     */
    public void disconnectAll() {
        disconnectAll(false);
    }

    /*
     * 断开所有角色连接
     */
    public void disconnectAll(boolean checkGM) {
        writeLock.lock();
        try {
            Iterator<MapleCharacter> chrit = nameToChar.values().iterator();
            MapleCharacter chr;
            while (chrit.hasNext()) {
                chr = chrit.next();
                if (!chr.isGM() || !checkGM) {
                    chr.getClient().disconnect(false, false, true);
                    if (chr.getClient().getSession().isConnected()) {
                        chr.getClient().getSession().close(true);
                    }
                    WorldFindService.getInstance().forceDeregister(chr.getId(), chr.getName());
                    chrit.remove();
                }
            }
        } finally {
            writeLock.unlock();
        }
    }

    /*
     * 获取在线角色的名字
     */
    public String getOnlinePlayers(boolean byGM) {
        StringBuilder sb = new StringBuilder();
        if (byGM) {
            readLock.lock();
            try {
                Iterator<MapleCharacter> itr = nameToChar.values().iterator();
                while (itr.hasNext()) {
                    sb.append(MapleCharacterUtil.makeMapleReadable(itr.next().getName()));
                    sb.append(", ");
                }
            } finally {
                readLock.unlock();
            }
        } else {
            readLock.lock();
            try {
                Iterator<MapleCharacter> itr = nameToChar.values().iterator();
                MapleCharacter chr;
                while (itr.hasNext()) {
                    chr = itr.next();
                    if (!chr.isGM()) {
                        sb.append(MapleCharacterUtil.makeMapleReadable(chr.getName()));
                        sb.append(", ");
                    }
                }
            } finally {
                readLock.unlock();
            }
        }
        return sb.toString();
    }

    /*
     * 发送给当前频道在线玩家封包
     */
    public void broadcastPacket(byte[] data) {
        readLock.lock();
        try {
            Iterator<MapleCharacter> itr = nameToChar.values().iterator();
            while (itr.hasNext()) {
                itr.next().getClient().getSession().write(data);
            }
        } finally {
            readLock.unlock();
        }
    }

    /*
     * 发送给当前频道在线玩家喇叭的封包
     */
    public void broadcastSmegaPacket(byte[] data) {
        readLock.lock();
        try {
            Iterator<MapleCharacter> itr = nameToChar.values().iterator();
            MapleCharacter chr;
            while (itr.hasNext()) {
                chr = itr.next();
                if (chr.getClient().isLoggedIn() && chr.getSmega()) {
                    chr.getClient().getSession().write(data);
                }
            }
        } finally {
            readLock.unlock();
        }
    }

    /*
     * 发送给当前频道在线GM的封包
     */
    public void broadcastGMPacket(byte[] data) {
        readLock.lock();
        try {
            Iterator<MapleCharacter> itr = nameToChar.values().iterator();
            MapleCharacter chr;
            while (itr.hasNext()) {
                chr = itr.next();
                if (chr.getClient().isLoggedIn() && chr.isIntern()) {
                    chr.getClient().getSession().write(data);
                }
            }
        } finally {
            readLock.unlock();
        }
    }

    public class PersistingTask implements Runnable {

        @Override
        public void run() {
            pendingWriteLock.lock();
            try {
                long currenttime = System.currentTimeMillis();
                Iterator<Entry<Integer, CharacterTransfer>> itr = PendingCharacter.entrySet().iterator();
                while (itr.hasNext()) {
                    if (currenttime - itr.next().getValue().TranferTime > 40000) { // 40 sec
                        itr.remove();
                    }
                }
            } finally {
                pendingWriteLock.unlock();
            }
        }
    }

    private class ConnectChecker implements Runnable {

        @Override
        public void run() {
            connectcheckReadLock.lock();
            try {
                Iterator<MapleCharacter> chrit = nameToChar.values().iterator();
                Map<Integer, MapleCharacter> disconnectList = new LinkedHashMap<>();
                MapleCharacter player;
                while (chrit.hasNext()) {
                    player = chrit.next();
                    if (player != null && player.getClient().getSession().isClosing()) {
                        disconnectList.put(player.getId(), player);
                    }
                }
                Iterator<MapleCharacter> dcitr = disconnectList.values().iterator();
                while (dcitr.hasNext()) {
                    player = dcitr.next();
                    if (player != null) {
                        player.getClient().disconnect(false, false);
                        player.getClient().updateLoginState(0);
                        disconnectPlayer(player);
                        dcitr.remove();
                    }
                }
            } finally {
                connectcheckReadLock.unlock();
            }
        }
    }
}
