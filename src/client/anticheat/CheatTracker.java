package client.anticheat;

import client.MapleCharacter;
import client.MapleCharacterUtil;
import client.skills.SkillFactory;
import constants.GameConstants;
import handling.world.WorldBroadcastService;

import java.awt.Point;
import java.lang.ref.WeakReference;
import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import org.apache.log4j.Logger;
import server.AutobanManager;
import server.Timer.CheatTimer;
import tools.FileoutputUtil;
import tools.MaplePacketCreator;
import tools.StringUtil;

public class CheatTracker {

    private ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private Lock rL = lock.readLock(), wL = lock.writeLock();
    private Map<CheatingOffense, CheatingOffenseEntry> offenses = new EnumMap<>(CheatingOffense.class);
    private WeakReference<MapleCharacter> chr;
    // For keeping track of speed attack hack.
    private long lastAttackTime = 0;
    private int lastAttackTickCount = 0;
    private byte Attack_tickResetCount = 0;
    private long Server_ClientAtkTickDiff = 0;
    private long lastDamage = 0;
    private long takingDamageSince;
    private int numSequentialDamage = 0;
    private long lastDamageTakenTime = 0;
    private byte numZeroDamageTaken = 0;
    private int numSequentialSummonAttack = 0;
    private long summonSummonTime = 0;
    private int numSameDamage = 0;
    private Point lastMonsterMove;
    private int monsterMoveCount;
    private int attacksWithoutHit = 0;
    private byte dropsPerSecond = 0;
    private long lastDropTime = 0;
    private byte msgsPerSecond = 0;
    private long lastMsgTime = 0;
    private ScheduledFuture<?> invalidationTask;
    private int gm_message = 0;
    private int lastTickCount = 0, tickSame = 0, inMapIimeCount = 0, lastPickupkCount = 0;
    private long lastSmegaTime = 0, lastBBSTime = 0, lastASmegaTime = 0, lastMZDTime = 0, lastCraftTime = 0, lastSaveTime = 0, lastLieDetectorTime = 0, lastPickupkTime = 0, lastlogonTime;
    //private int lastFamiliarTickCount = 0;
    //private byte Familiar_tickResetCount = 0;
    //private long Server_ClientFamiliarTickDiff = 0;
    private int numSequentialFamiliarAttack = 0;
    private long familiarSummonTime = 0;
    private static final Logger log = Logger.getLogger(CheatTracker.class);

    public CheatTracker(MapleCharacter chr) {
        start(chr);
    }

    /**
     * ??????????????????
     */
    public void checkAttack(int skillId, int tickcount) {
        int AtkDelay = GameConstants.getAttackDelay(skillId, skillId == 0 ? null : SkillFactory.getSkill(skillId));
        if ((tickcount - lastAttackTickCount) < AtkDelay) {
            // if (chr.get().isAdmin()) {
            //   chr.get().dropMessage(-5, "??????????????????1 ??????: " + skillId + " ??????: " + (tickcount - lastAttackTickCount) + " ??????: " + AtkDelay);
            //}
            //registerOffense(CheatingOffense.FASTATTACK, "??????????????????.");
        }
        //System.out.println("???????????? - checkAttack - " + inMapIimeCount);
        lastAttackTime = System.currentTimeMillis();
        if (chr.get() != null && lastAttackTime - chr.get().getChangeTime() > 600000) { //???????????????????????????10?????? ????????????????????????
            chr.get().setChangeTime(false);
            //System.out.println("???????????? - ????????????: " + !chr.get().isInTownMap() + " ???????????????: " + chr.get().getMap().getMobsSize() + " ?????????????????????: " + (chr.get().getEventInstance() != null));
            if (!chr.get().isInTownMap() && chr.get().getEventInstance() == null && chr.get().getMap().getMobsSize() >= 2) {
                inMapIimeCount++;
                if (inMapIimeCount >= 6) {
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.get().getName() + " ID: " + chr.get().getId() + " (?????? " + chr.get().getLevel() + ") ?????????: " + chr.get().getMapId() + " ??????????????????1?????????????????????????????????????????????"));
                }
                if (inMapIimeCount >= 8) {
                    inMapIimeCount = 0;
                    chr.get().startLieDetector(false);
                    System.out.println("???????????? - ???????????????.");
                    log.info("[??????] " + chr.get().getName() + " (?????? " + chr.get().getLevel() + ") ?????????: " + chr.get().getMapId() + " ?????????????????? 80 ???????????????????????????????????????");
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + chr.get().getName() + " ID: " + chr.get().getId() + " (?????? " + chr.get().getLevel() + ") ?????????: " + chr.get().getMapId() + " ?????????????????? 80 ???????????????????????????????????????"));
                }
            }
        }
        long STime_TC = lastAttackTime - tickcount; // hack = - more
        if (Server_ClientAtkTickDiff - STime_TC > 1000) { // 250 is the ping, TODO
            if (chr.get().isAdmin()) {
                chr.get().dropMessage(-5, "??????????????????2 ??????: " + skillId + " ??????: " + (Server_ClientAtkTickDiff - STime_TC));
            }
            registerOffense(CheatingOffense.FASTATTACK2, "??????????????????.");
        }
        // if speed hack, client tickcount values will be running at a faster pace
        // For lagging, it isn't an issue since TIME is running simotaniously, client
        // will be sending values of older time
        //System.out.println("Delay [" + skillId + "] = " + (tickcount - lastAttackTickCount) + ", " + (Server_ClientAtkTickDiff - STime_TC));
        Attack_tickResetCount++; // Without this, the difference will always be at 100
        if (Attack_tickResetCount >= (AtkDelay <= 200 ? 1 : 4)) {
            Attack_tickResetCount = 0;
            Server_ClientAtkTickDiff = STime_TC;
        }
        updateTick(tickcount);
        lastAttackTickCount = tickcount;
    }

    /*
     * ??????????????????????????????????????????
     */
    public void resetInMapIimeCount() {
        inMapIimeCount = 0;
    }

    /**
     * ???????????????PVP?????????????????? unfortunately PVP does not give a tick count
     */
    public void checkPVPAttack(int skillId) {
        int AtkDelay = GameConstants.getAttackDelay(skillId, skillId == 0 ? null : SkillFactory.getSkill(skillId));
        long STime_TC = System.currentTimeMillis() - lastAttackTime; // hack = - more
        if (STime_TC < AtkDelay) { // 250 is the ping, TODO
            registerOffense(CheatingOffense.FASTATTACK, "??????????????????.");
        }
        lastAttackTime = System.currentTimeMillis();
    }

    public long getLastAttack() {
        return lastAttackTime;
    }

    /**
     * ????????????????????????
     */
    public void checkTakeDamage(int damage) {
        numSequentialDamage++;
        lastDamageTakenTime = System.currentTimeMillis();

        // System.out.println("tb" + timeBetweenDamage);
        // System.out.println("ns" + numSequentialDamage);
        // System.out.println(timeBetweenDamage / 1500 + "(" + timeBetweenDamage / numSequentialDamage + ")");
        if (lastDamageTakenTime - takingDamageSince / 500 < numSequentialDamage) {
            registerOffense(CheatingOffense.FAST_TAKE_DAMAGE, "??????????????????.");
        }
        if (lastDamageTakenTime - takingDamageSince > 4500) {
            takingDamageSince = lastDamageTakenTime;
            numSequentialDamage = 0;
        }
        /*
         * (non-thieves) Min Miss Rate: 2% Max Miss Rate: 80% (thieves) Min MissRate: 5% Max Miss Rate: 95%
         */
        if (damage == 0) {
            numZeroDamageTaken++;
            if (numZeroDamageTaken >= 50) { // ???????????????50??????????????????
                numZeroDamageTaken = 0;
                registerOffense(CheatingOffense.HIGH_AVOID, "???????????????.");
            }
        } else if (damage != -1) {
            numZeroDamageTaken = 0;
        }
    }

    /**
     * ??????????????????????????????
     */
    public void resetTakeDamage() {
        numZeroDamageTaken = 0;
    }

    /**
     * ??????????????????????????????
     */
    public void checkSameDamage(long dmg, double expected) {
        if (dmg > 2000 && lastDamage == dmg && chr.get() != null && (chr.get().getLevel() < 190 || dmg > expected * 2)) {
            numSameDamage++;
            if (numSameDamage > 5) {
                registerOffense(CheatingOffense.SAME_DAMAGE, numSameDamage + " times, ???????????? " + dmg + ", ???????????? " + expected + " [??????: " + chr.get().getLevel() + ", ??????: " + chr.get().getJob() + "]");
                numSameDamage = 0;
            }
        } else {
            lastDamage = dmg;
            numSameDamage = 0;
        }
    }

    /*
     * ????????????????????????
     */
    public void checkHighDamage(int eachd, double maxDamagePerHit, int mobId, int skillId) {
        if (eachd > maxDamagePerHit && maxDamagePerHit > 2000 && chr.get() != null) {
            registerOffense(CheatingOffense.HIGH_DAMAGE, "[??????: " + eachd + ", ????????????: " + maxDamagePerHit + ", ??????ID: " + mobId + "] [??????: " + chr.get().getJob() + ", ??????: " + chr.get().getLevel() + ", ??????: " + skillId + "]");
            if (eachd > maxDamagePerHit * 2) {
                registerOffense(CheatingOffense.HIGH_DAMAGE_2, "[??????: " + eachd + ", ????????????: " + maxDamagePerHit + ", ??????ID: " + mobId + "] [??????: " + chr.get().getJob() + ", ??????: " + chr.get().getLevel() + ", ??????: " + skillId + "]");
            }
        }
    }

    /**
     * ??????????????????
     */
    public void checkMoveMonster(Point pos) {
        if (pos.equals(lastMonsterMove)) {
            monsterMoveCount++;
            if (monsterMoveCount > 10) {
                registerOffense(CheatingOffense.MOVE_MONSTERS, "?????? ??????: " + pos.x + ", " + pos.y);
                monsterMoveCount = 0;
            }
        } else {
            lastMonsterMove = pos;
            monsterMoveCount = 1;
        }
    }

    /**
     * ?????????????????????????????????
     */
    public void resetSummonAttack() {
        summonSummonTime = System.currentTimeMillis();
        numSequentialSummonAttack = 0;
    }

    /**
     * ???????????????????????????
     */
    public boolean checkSummonAttack() {
        numSequentialSummonAttack++;
        if ((System.currentTimeMillis() - summonSummonTime) / (1000 + 1) < numSequentialSummonAttack) {
            registerOffense(CheatingOffense.FAST_SUMMON_ATTACK, "???????????????????????????.");
            return false;
        }
        return true;
    }

    public void resetFamiliarAttack() {
        familiarSummonTime = System.currentTimeMillis();
        numSequentialFamiliarAttack = 0;
        //lastFamiliarTickCount = 0;
        //Familiar_tickResetCount = 0;
        //Server_ClientFamiliarTickDiff = 0;
    }

    public boolean checkFamiliarAttack(MapleCharacter chr) {
        /*
         * int tickdifference = (tickcount - lastFamiliarTickCount); if
         * (tickdifference < 500) {
         * chr.getCheatTracker().registerOffense(CheatingOffense.FAST_SUMMON_ATTACK);
         * } long STime_TC = System.currentTimeMillis() - tickcount; final
         * long S_C_Difference = Server_ClientFamiliarTickDiff - STime_TC; if
         * (S_C_Difference > 500) {
         * chr.getCheatTracker().registerOffense(CheatingOffense.FAST_SUMMON_ATTACK);
         * } Familiar_tickResetCount++; if (Familiar_tickResetCount > 4) {
         * Familiar_tickResetCount = 0; Server_ClientFamiliarTickDiff =
         * STime_TC; } lastFamiliarTickCount = tickcount;
         */
        numSequentialFamiliarAttack++;
        //estimated
        // System.out.println(numMPRegens + "/" + allowedRegens);
        if ((System.currentTimeMillis() - familiarSummonTime) / (600 + 1) < numSequentialFamiliarAttack) {
            registerOffense(CheatingOffense.FAST_SUMMON_ATTACK, "???????????????????????????.");
            return false;
        }
        return true;
    }

    /**
     * ??????????????????
     */
    public void checkPickup(int count, boolean pet) {
        if ((System.currentTimeMillis() - lastPickupkTime) < 1000) {
            lastPickupkCount++;
            if (lastPickupkCount >= count && chr.get() != null && !chr.get().isGM()) {
                log.info("[??????] " + chr.get().getName() + " (?????? " + chr.get().getLevel() + ") " + (pet ? "??????" : "??????") + "?????? checkPickup ??????: " + lastPickupkCount + " ??????????????????????????????");
                chr.get().getClient().disconnect(true, false);
                if (chr.get() != null && chr.get().getClient() != null && chr.get().getClient().getSession().isConnected()) {
                    chr.get().getClient().getSession().close(true);
                }
            }
        } else {
            lastPickupkCount = 0;
        }
        lastPickupkTime = System.currentTimeMillis();
    }

    /**
     * ??????????????????
     */
    public void checkDrop() {
        checkDrop(false);
    }

    /**
     * ??????????????????
     */
    public void checkDrop(boolean dc) {
        if ((System.currentTimeMillis() - lastDropTime) < 1000) {
            dropsPerSecond++;
            if (dropsPerSecond >= (dc ? 32 : 16) && chr.get() != null && !chr.get().isGM()) {
                if (dc) {
                    chr.get().getClient().disconnect(true, false);
                    if (chr.get().getClient().getSession().isConnected()) {
                        chr.get().getClient().getSession().close(true);
                    }
                    log.info("[??????] " + chr.get().getName() + " (?????? " + chr.get().getLevel() + ") checkDrop ??????: " + dropsPerSecond + " ??????????????????????????????");
                } else {
                    chr.get().getClient().setMonitored(true);
                }
            }
        } else {
            dropsPerSecond = 0;
        }
        lastDropTime = System.currentTimeMillis();
    }

    /**
     * ?????????????????????
     */
    public void checkMsg() { //ALL types of msg. caution with number of  msgsPerSecond
        if ((System.currentTimeMillis() - lastMsgTime) < 1000) { //luckily maplestory has auto-check for too much msging
            msgsPerSecond++;
            if (msgsPerSecond > 10 && chr.get() != null && !chr.get().isGM()) {
                chr.get().getClient().disconnect(true, false);
                if (chr.get().getClient().getSession().isConnected()) {
                    chr.get().getClient().getSession().close(true);
                }
                log.info("[??????] " + chr.get().getName() + " (?????? " + chr.get().getLevel() + ") checkMsg ??????: " + msgsPerSecond + " ??????????????????????????????");
            }
        } else {
            msgsPerSecond = 0;
        }
        lastMsgTime = System.currentTimeMillis();
    }

    public int getAttacksWithoutHit() {
        return attacksWithoutHit;
    }

    public void setAttacksWithoutHit(boolean increase) {
        if (increase) {
            this.attacksWithoutHit++;
        } else {
            this.attacksWithoutHit = 0;
        }
    }

    public void registerOffense(CheatingOffense offense) {
        registerOffense(offense, null);
    }

    public void registerOffense(CheatingOffense offense, String param) {
        MapleCharacter chrhardref = chr.get();
        if (chrhardref == null || !offense.isEnabled() || chrhardref.isGM()) {
            return;
        }
        CheatingOffenseEntry entry = null;
        rL.lock();
        try {
            entry = offenses.get(offense);
        } finally {
            rL.unlock();
        }
        if (entry != null && entry.isExpired()) {
            expireEntry(entry);
            entry = null;
            gm_message = 0;
        }
        if (entry == null) {
            entry = new CheatingOffenseEntry(offense, chrhardref.getId());
        }
        if (param != null) {
            entry.setParam(param);
        }
        entry.incrementCount();
        if (offense.shouldAutoban(entry.getCount())) {
            byte type = offense.getBanType();
            if (type == 1) {
                AutobanManager.getInstance().autoban(chrhardref.getClient(), StringUtil.makeEnumHumanReadable(offense.name()));
            } else if (type == 2) {
                chrhardref.getClient().disconnect(true, false);
                if (chrhardref.getClient().getSession().isConnected()) {
                    chrhardref.getClient().getSession().close(true);
                }
                log.info("[??????] " + chrhardref.getName() + " (??????:" + chrhardref.getLevel() + " ??????:" + chrhardref.getJob() + ") ???????????????????????????. ??????: " + StringUtil.makeEnumHumanReadable(offense.name()) + (param == null ? "" : (" - " + param)));
            }
            gm_message = 0;
            return;
        }
        wL.lock();
        try {
            offenses.put(offense, entry);
        } finally {
            wL.unlock();
        }
        switch (offense) {
            //case HIGH_DAMAGE_MAGIC:
            //case HIGH_DAMAGE_MAGIC_2:
            //case HIGH_DAMAGE:
            //case HIGH_DAMAGE_2:
            //case ATTACK_FARAWAY_MONSTER:
            //case ATTACK_FARAWAY_MONSTER_SUMMON:
            case SAME_DAMAGE:
                gm_message++;
                if (gm_message % 100 == 0) {
                    log.info("[??????] " + MapleCharacterUtil.makeMapleReadable(chrhardref.getName()) + " ID: " + chrhardref.getId() + " (?????? " + chrhardref.getLevel() + ") ??????????????????! " + StringUtil.makeEnumHumanReadable(offense.name()) + (param == null ? "" : (" - " + param)));
                    WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + MapleCharacterUtil.makeMapleReadable(chrhardref.getName()) + " ID: " + chrhardref.getId() + " (?????? " + chrhardref.getLevel() + ") ??????????????????! " + StringUtil.makeEnumHumanReadable(offense.name()) + (param == null ? "" : (" - " + param))));
                }
                if (gm_message >= 20 && chrhardref.getLevel() < (offense == CheatingOffense.SAME_DAMAGE ? 180 : 190)) {
                    Timestamp chrCreated = chrhardref.getChrCreated();
                    long time = System.currentTimeMillis();
                    if (chrCreated != null) {
                        time = chrCreated.getTime();
                    }
                    if (time + (15 * 24 * 60 * 60 * 1000) >= System.currentTimeMillis()) {
                        AutobanManager.getInstance().autoban(chrhardref.getClient(), StringUtil.makeEnumHumanReadable(offense.name()) + " over 500 times " + (param == null ? "" : (" - " + param)));
                    } else {
                        gm_message = 0;
                        WorldBroadcastService.getInstance().broadcastGMMessage(MaplePacketCreator.serverNotice(6, "[GM Message] " + MapleCharacterUtil.makeMapleReadable(chrhardref.getName()) + " ID: " + chrhardref.getId() + " (?????? " + chrhardref.getLevel() + ") ??????????????????! " + StringUtil.makeEnumHumanReadable(offense.name()) + (param == null ? "" : (" - " + param))));
                        FileoutputUtil.log(FileoutputUtil.Hacker_Log, "[GM Message] " + MapleCharacterUtil.makeMapleReadable(chrhardref.getName()) + " ID: " + chrhardref.getId() + " (?????? " + chrhardref.getLevel() + ") ??????????????????! " + StringUtil.makeEnumHumanReadable(offense.name()) + (param == null ? "" : (" - " + param)));
                    }
                }
                break;
        }
        CheatingOffensePersister.getInstance().persistEntry(entry);
    }

    public void updateTick(int newTick) {
        if (newTick <= lastTickCount) { //definitely packet spamming or the added feature in many PEs which is to generate random tick
            if (tickSame >= 30 && chr.get() != null && !chr.get().isGM()) {
                chr.get().getClient().disconnect(true, false);
                if (chr.get().getClient().getSession().isConnected()) {
                    chr.get().getClient().getSession().close(true);
                }
                log.info("[??????] " + chr.get().getName() + " (?????? " + chr.get().getLevel() + ") updateTick ??????: " + tickSame + " ??????????????????????????????");
            } else {
                tickSame++;
            }
        } else {
            tickSame = 0;
        }
        lastTickCount = newTick;
    }

    /**
     * ???????????????????????????????????????
     */
    public boolean canSmega() {
        if (lastSmegaTime > System.currentTimeMillis() && chr.get() != null && !chr.get().isGM()) {
            return false;
        }
        lastSmegaTime = System.currentTimeMillis();
        return true;
    }

    /**
     * ??????????????????????????????????????????
     */
    public boolean canAvatarSmega() {
        if (lastASmegaTime > System.currentTimeMillis() && chr.get() != null && !chr.get().isGM()) {
            return false;
        }
        lastASmegaTime = System.currentTimeMillis();
        return true;
    }

    /**
     * ??????????????????????????????BBS
     */
    public boolean canBBS() {
        if (lastBBSTime + 60000 > System.currentTimeMillis() && chr.get() != null && !chr.get().isGM()) {
            return false;
        }
        lastBBSTime = System.currentTimeMillis();
        return true;
    }

    /**
     * ???????????????????????????????????????
     */
    public boolean canMZD() {
        if (lastMZDTime > System.currentTimeMillis() && chr.get() != null && !chr.get().isGM()) {
            return false;
        }
        lastMZDTime = System.currentTimeMillis();
        return true;
    }

    /**
     * ???????????????????????????
     */
    public boolean canCraftMake() {
        if (lastCraftTime + 3000 > System.currentTimeMillis() && chr.get() != null && !chr.get().isGM()) {
            return false;
        }
        lastCraftTime = System.currentTimeMillis();
        return true;
    }

    /**
     * ????????????????????????????????? ????????? PLAYER_UPDATE ???????????? ??????3???????????? ???????????????????????????
     */
    public boolean canSaveDB() {
        if (lastSaveTime + 3 * 60 * 1000 > System.currentTimeMillis() && chr.get() != null) {
            return false;
        }
        lastSaveTime = System.currentTimeMillis();
        return true;
    }

    public int getlastSaveTime() {
        if (lastSaveTime <= 0) {
            lastSaveTime = System.currentTimeMillis();
        }
        int seconds = (int) (((lastSaveTime + (3 * 60 * 1000)) - System.currentTimeMillis()) / 1000);
        return seconds;
    }

    /**
     * ??????????????????????????????
     */
    public boolean canLieDetector() {
        if (lastLieDetectorTime + 5 * 60 * 1000 > System.currentTimeMillis() && chr.get() != null) {
            return false;
        }
        lastLieDetectorTime = System.currentTimeMillis();
        return true;
    }

    /**
     * ???????????????????????????
     */
    public long getLastlogonTime() {
        if (lastlogonTime <= 0 || chr.get() == null) {
            lastlogonTime = System.currentTimeMillis();
        }
        return lastlogonTime;
    }

    public void expireEntry(CheatingOffenseEntry coe) {
        wL.lock();
        try {
            offenses.remove(coe.getOffense());
        } finally {
            wL.unlock();
        }
    }

    public int getPoints() {
        int ret = 0;
        CheatingOffenseEntry[] offenses_copy;
        rL.lock();
        try {
            offenses_copy = offenses.values().toArray(new CheatingOffenseEntry[offenses.size()]);
        } finally {
            rL.unlock();
        }
        for (CheatingOffenseEntry entry : offenses_copy) {
            if (entry.isExpired()) {
                expireEntry(entry);
            } else {
                ret += entry.getPoints();
            }
        }
        return ret;
    }

    public Map<CheatingOffense, CheatingOffenseEntry> getOffenses() {
        return Collections.unmodifiableMap(offenses);
    }

    public String getSummary() {
        StringBuilder ret = new StringBuilder();
        List<CheatingOffenseEntry> offenseList = new ArrayList<>();
        rL.lock();
        try {
            for (CheatingOffenseEntry entry : offenses.values()) {
                if (!entry.isExpired()) {
                    offenseList.add(entry);
                }
            }
        } finally {
            rL.unlock();
        }
        Collections.sort(offenseList, new Comparator<CheatingOffenseEntry>() {

            @Override
            public int compare(CheatingOffenseEntry o1, CheatingOffenseEntry o2) {
                int thisVal = o1.getPoints();
                int anotherVal = o2.getPoints();
                return (thisVal < anotherVal ? 1 : (thisVal == anotherVal ? 0 : -1));
            }
        });
        int to = Math.min(offenseList.size(), 4);
        for (int x = 0; x < to; x++) {
            ret.append(StringUtil.makeEnumHumanReadable(offenseList.get(x).getOffense().name()));
            ret.append(": ");
            ret.append(offenseList.get(x).getCount());
            if (x != to - 1) {
                ret.append(" ");
            }
        }
        return ret.toString();
    }

    public void dispose() {
        if (invalidationTask != null) {
            invalidationTask.cancel(false);
        }
        invalidationTask = null;
        chr = new WeakReference<>(null);
    }

    public final void start(MapleCharacter chr) {
        this.chr = new WeakReference<>(chr);
        invalidationTask = CheatTimer.getInstance().register(new InvalidationTask(), 60000);
        takingDamageSince = System.currentTimeMillis();
        lastSaveTime = System.currentTimeMillis();
    }

    private class InvalidationTask implements Runnable {

        @Override
        public void run() {
            CheatingOffenseEntry[] offenses_copy;
            rL.lock();
            try {
                offenses_copy = offenses.values().toArray(new CheatingOffenseEntry[offenses.size()]);
            } finally {
                rL.unlock();
            }
            for (CheatingOffenseEntry offense : offenses_copy) {
                if (offense.isExpired()) {
                    expireEntry(offense);
                }
            }
            if (chr.get() == null) {
                dispose();
            }
        }
    }
}
