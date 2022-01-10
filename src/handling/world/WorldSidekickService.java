/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.world;

import client.MapleCharacter;
import handling.channel.ChannelServer;
import handling.world.sidekick.MapleSidekick;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * @author PlayDK
 */
public class WorldSidekickService {

    private Map<Integer, MapleSidekick> sidekickList;
    private ReentrantReadWriteLock lock;

    public static WorldSidekickService getInstance() {
        return SingletonHolder.instance;
    }

    private WorldSidekickService() {
        lock = new ReentrantReadWriteLock();
        sidekickList = new LinkedHashMap<>();
        for (MapleSidekick sidekick : MapleSidekick.loadAll()) {
            if (sidekick.getId() >= 0) {
                sidekickList.put(sidekick.getId(), sidekick);
            }
        }
        System.out.println("[世界帮助服务] 已经启动...");
    }

    public void addLoadedSidekick(MapleSidekick sidekick) {
        if (sidekick.getId() >= 0) {
            sidekickList.put(sidekick.getId(), sidekick);
        }
    }

    public int createSidekick(int leaderId, int leaderId2) {
        return MapleSidekick.create(leaderId, leaderId2);
    }

    public void eraseSidekick(int id) {
        lock.writeLock().lock();
        try {
            MapleSidekick ms = sidekickList.remove(id);
            if (ms != null) {
                erasePlayer(ms.getCharacter(0).getId());
                erasePlayer(ms.getCharacter(1).getId());
            }
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void erasePlayer(int targetId) {
        int ch = WorldFindService.getInstance().findChannel(targetId);
        if (ch < 0) {
            return;
        }
        MapleCharacter player = ChannelServer.getInstance(ch).getPlayerStorage().getCharacterById(targetId);
        if (player != null) {
            player.setSidekick(null);
        }
    }

    public MapleSidekick getSidekick(int id) {
        MapleSidekick ret = null;
        lock.readLock().lock();
        try {
            ret = sidekickList.get(id);
        } finally {
            lock.readLock().unlock();
        }
        if (ret == null) {
            lock.writeLock().lock();
            try {
                ret = new MapleSidekick(id);
                if (ret == null || ret.getId() < 0) { //failed to load
                    return null;
                }
                sidekickList.put(id, ret);
            } finally {
                lock.writeLock().unlock();
            }
        }
        return ret; //doesn't exist?
    }

    public MapleSidekick getSidekickByChr(int id) {
        lock.readLock().lock();
        try {
            for (MapleSidekick sidekick : sidekickList.values()) {
                if (sidekick.getCharacter(0).getId() == id || sidekick.getCharacter(1).getId() == id) {
                    return sidekick;
                }
            }
        } finally {
            lock.readLock().unlock();
        }
        return null;
    }

    private static class SingletonHolder {

        protected static final WorldSidekickService instance = new WorldSidekickService();
    }
}
