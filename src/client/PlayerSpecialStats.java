/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import java.io.Serializable;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author PlayDK
 */
public class PlayerSpecialStats implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    private AtomicInteger forceCounter = new AtomicInteger(); //恶魔相关
    private HashMap<Integer, Integer> forceCounters = new HashMap<>();// 恶魔精气恢复
    private int cardStack; //幻影卡片
    private int morphCount; //狂龙变形值
    private long lastMorphLostTime; //狂龙变形值减少的时间
    private int powerCount; //尖兵电力也就是能量
    private boolean usePower; //是否正在使用尖兵能量
    private long lastRecoveryPowerTime; //尖兵能量恢复时间检测
    private boolean energyfull; //拳手能量检测是否满能量
    private int runningDark; //黑暗累计可以改变的次数
    private int runningDarkSlot; //黑暗点数
    private int runningLight; //光明累计可以改变的次数
    private int runningLightSlot; //光明点数
    private int trackFlames;
    private int arrowsMode; //三彩箭矢 模式
    private int deathPactCount; // 死亡契约
    private int moonCycle;
    private int jianqi;
    private int pp; //超能力者MP

    public void resetSpecialStats() {
        forceCounter.set(0);
        this.forceCounters.clear();
        this.cardStack = 0;
        this.morphCount = 0;
        this.lastMorphLostTime = System.currentTimeMillis();
        this.powerCount = 0;
        this.usePower = false;
        this.lastRecoveryPowerTime = System.currentTimeMillis();
        this.energyfull = false;
        this.runningDark = 0;
        this.runningDarkSlot = 0;
        this.runningLight = 0;
        this.runningLight = 0;
        this.runningLightSlot = 0;
        this.trackFlames = 1;
        this.deathPactCount = 0;
        this.moonCycle = 0;
        this.jianqi = 0;
        this.pp = 0;
    }

    /*
     * 恶魔相关
     */
    public int getForceCounter() {
        return forceCounter.get();
    }

    public void setForceCounter(int amount) {
        this.forceCounter.set(amount);
    }

    public void gainForceCounter() {
        this.forceCounter.incrementAndGet();
    }

    public void gainForceCounter(int amount) {
        this.forceCounter.addAndGet(amount);
    }

    public void addForceCounter(int df) {
        forceCounters.put(forceCounter.incrementAndGet(), df);
    }

    public int removeForceCounter(int oid) {
        if (forceCounters.containsKey(oid)) {
            return forceCounters.remove(oid);
        }
        return 0;
    }

    /*
     * 幻影卡片系统
     */
    public int getCardStack() {
        if (cardStack < 0) {
            cardStack = 0;
        }
        return cardStack;
    }

    public void setCardStack(int amount) {
        this.cardStack = amount;
    }

    public void gainCardStack() {
        this.cardStack++;
    }

    /*
     * 狂龙变形值
     */
    public int getMorphCount() {
        if (morphCount < 0) {
            morphCount = 0;
        }
        return morphCount;
    }

    public void setMorphCount(int amount) {
        this.morphCount = amount;
    }

    public void gainMorphCount() {
        this.morphCount++;
    }

    public void gainMorphCount(int amount) {
        this.morphCount += amount;
    }

    public long getLastMorphLostTime() {
        if (lastMorphLostTime <= 0) {
            lastMorphLostTime = System.currentTimeMillis();
        }
        return lastMorphLostTime;
    }

    public void prepareMorphLostTime() {
        this.lastMorphLostTime = System.currentTimeMillis();
    }

    /*
     * 尖兵能量
     */
    public int getPowerCount() {
        if (powerCount < 0) {
            powerCount = 0;
        }
        return powerCount;
    }

    public void setPowerCount(int amount) {
        this.powerCount = amount;
    }

    public boolean isUsePower() {
        return usePower;
    }

    public void changePower(boolean b) {
        this.usePower = b;
    }

    public int getDeathPactCount() {
        if (deathPactCount < 0) {
            deathPactCount = 0;
        }
        return deathPactCount;
    }

    public void setDeathPactCount(int amount) {
        this.deathPactCount = amount;
    }

    public void gainDeathPactCount(int count) {
        this.deathPactCount += count;
    }

    public long getLastRecoveryPowerTime() {
        if (lastRecoveryPowerTime <= 0) {
            lastRecoveryPowerTime = System.currentTimeMillis();
        }
        return lastRecoveryPowerTime;
    }

    public void prepareRecoveryPowerTime() {
        this.lastRecoveryPowerTime = System.currentTimeMillis();
    }

    /*
     * 拳手能量获得是否满
     */
    public boolean isEnergyfull() {
        return energyfull;
    }

    public void changeEnergyfull(boolean full) {
        this.energyfull = full;
    }

    /*
     * 处理夜光的 光明和黑暗
     */
    public int getLightTotal() {
        if (runningLightSlot < 0) {
            runningLightSlot = 0;
        }
        return runningLightSlot;
    }

    public void gainLightTotal(int amount) {
        this.runningLightSlot += amount;
    }

    public void setLightTotal(int amount) {
        this.runningLightSlot = amount;
    }

    public int getLightType() {
        if (runningLight < 0) {
            runningLight = 0;
        }
        return runningLight;
    }

    public void gainLightType(int amount) {
        this.runningLight += amount;
    }

    public void setLightType(int amount) {
        this.runningLight = amount;
    }

    public int getDarkTotal() {
        if (runningDarkSlot < 0) {
            runningDarkSlot = 0;
        }
        return runningDarkSlot;
    }

    public void gainDarkTotal(int amount) {
        this.runningDarkSlot += amount;
    }

    public void setDarkTotal(int amount) {
        this.runningDarkSlot = amount;
    }

    public int getDarkType() {
        if (runningDark < 0) {
            runningDark = 0;
        }
        return runningDark;
    }

    public void gainDarkType(int amount) {
        this.runningDark += amount;
    }

    public void setDarkType(int amount) {
        this.runningDark = amount;
    }

    public void gainTrackFlmes() {
        this.trackFlames++;
    }

    public void setTrackFlmes(int amount) {
        this.trackFlames = amount;
    }

    public int getTrackFlmes() {
        return trackFlames;
    }

    /*
     * 获取当前 三彩箭矢 的模式
     */
    public int getArrowsMode() {
        return arrowsMode;
    }

    /*
     * 设置 三彩箭矢 的模式
     */
    public void setArrowsMode(int mode) {
        this.arrowsMode = mode;
    }

    public int getMoonCycle() {
        moonCycle++;
        if (moonCycle > 1) {
            moonCycle = 0;
        }
        return moonCycle;
    }

    public void setJianQi(int jianqi) {
        this.jianqi = Math.min(1000, jianqi);
    }

    public void gainJianQi(int mode) {
        this.jianqi = Math.min(1000, jianqi + (mode == 1 ? 5 : 2));
    }

    public int getJianQi() {
        return jianqi;
    }

    public void setPP(int pp) {
        this.pp = Math.min(30, pp);
    }

    public void gainPP(int pp) {
        this.pp = Math.min(30, Math.max(0, this.pp + pp));
    }

    public int getPP() {
        return pp;
    }
}
