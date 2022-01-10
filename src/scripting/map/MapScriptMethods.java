/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package scripting.map;

import client.MapleClient;
import client.MapleQuestStatus;

import java.awt.Point;

import scripting.AbstractPlayerInteraction;
import server.MapleItemInformationProvider;
import server.life.MapleLifeFactory;
import server.life.MapleMonster;
import server.life.OverrideMonsterStats;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import server.quest.MedalQuest;
import tools.MaplePacketCreator;
import tools.packet.EffectPacket;
import tools.packet.UIPacket;

/**
 * @author PlayDK
 */
public class MapScriptMethods extends AbstractPlayerInteraction {

    public MapScriptMethods(MapleClient c) {
        super(c);
    }

    public void displayAranIntro() {
        String data = null;
        switch (c.getPlayer().getMapId()) {
            case 914090010:
                data = "Effect/Direction1.img/aranTutorial/Scene0";
                break;
            case 914090011:
                data = "Effect/Direction1.img/aranTutorial/Scene1" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                break;
            case 914090012:
                data = "Effect/Direction1.img/aranTutorial/Scene2" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                break;
            case 914090013:
                data = "Effect/Direction1.img/aranTutorial/Scene3";
                break;
            case 914090100:
                data = "Effect/Direction1.img/aranTutorial/HandedPoleArm" + (c.getPlayer().getGender() == 0 ? "0" : "1");
                break;
            case 914090200:
                data = "Effect/Direction1.img/aranTutorial/Maha";
                break;
        }
        if (data != null) {
            showIntro(c, data);
        }
    }

    private void showIntro(MapleClient c, String data) {
        c.getSession().write(UIPacket.IntroDisableUI(true));
        c.getSession().write(UIPacket.IntroLock(true));
        c.getSession().write(EffectPacket.ShowWZEffect(data));
    }

    public void startMapEffect(MapleClient c, String data, int itemId) {
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        if (!ii.itemExists(itemId)) {
            c.getPlayer().dropMessage(5, "地图效果触发 道具: " + itemId + " 不存在.");
            return;
        } else if (!ii.isFloatCashItem(itemId)) {
            c.getPlayer().dropMessage(5, "地图效果触发 道具: " + itemId + " 不具有漂浮公告的效果.");
            return;
        }
        c.getPlayer().getMap().startMapEffect(data, itemId);
    }

    public void explorationPoint() {
        if (c.getPlayer().getMapId() == 104000000) {
            c.getSession().write(UIPacket.IntroDisableUI(false));
            c.getSession().write(UIPacket.IntroLock(false));
            c.getSession().write(MaplePacketCreator.enableActions());
            c.getSession().write(UIPacket.MapNameDisplay(c.getPlayer().getMapId()));
        }
        //c.getPlayer().dropMessage(-11, "当前地图信息: ID " + c.getPlayer().getMapId() + " 名字 " + c.getPlayer().getMap().getMapName());
        MedalQuest m = null;
        for (MedalQuest mq : MedalQuest.values()) {
            for (int i : mq.maps) {
                if (c.getPlayer().getMapId() == i) {
                    m = mq;
                    break;
                }
            }
        }
        if (m != null && c.getPlayer().getLevel() >= m.level && c.getPlayer().getQuestStatus(m.questid) != 2) {
            if (c.getPlayer().getQuestStatus(m.lquestid) != 1) {
                MapleQuest.getInstance(m.lquestid).forceStart(c.getPlayer(), 0, "0");
            }
            if (c.getPlayer().getQuestStatus(m.questid) != 1) {
                MapleQuest.getInstance(m.questid).forceStart(c.getPlayer(), 0, null);
                StringBuilder sb = new StringBuilder("enter=");
                for (int i = 0; i < m.maps.length; i++) {
                    sb.append("0");
                }
                c.getPlayer().updateInfoQuest(m.questid - 2005, sb.toString());
                MapleQuest.getInstance(m.questid - 1995).forceStart(c.getPlayer(), 0, "0");
            }
            String quest = c.getPlayer().getInfoQuest(m.questid - 2005);
            if (quest.length() != m.maps.length + 6) { //enter= is 6
                StringBuilder sb = new StringBuilder("enter=");
                for (int i = 0; i < m.maps.length; i++) {
                    sb.append("0");
                }
                quest = sb.toString();
                c.getPlayer().updateInfoQuest(m.questid - 2005, quest);
            }
            MapleQuestStatus stat = c.getPlayer().getQuestNAdd(MapleQuest.getInstance(m.questid - 1995));
            if (stat.getCustomData() == null) { //just a check.
                stat.setCustomData("0");
            }
            int number = Integer.parseInt(stat.getCustomData());
            StringBuilder sb = new StringBuilder("enter=");
            boolean changedd = false;
            for (int i = 0; i < m.maps.length; i++) {
                boolean changed = false;
                if (c.getPlayer().getMapId() == m.maps[i]) {
                    if (quest.substring(i + 6, i + 7).equals("0")) {
                        sb.append("1");
                        changed = true;
                        changedd = true;
                    }
                }
                if (!changed) {
                    sb.append(quest.substring(i + 6, i + 7));
                }
            }
            if (changedd) {
                number++;
                c.getPlayer().updateInfoQuest(m.questid - 2005, sb.toString());
                MapleQuest.getInstance(m.questid - 1995).forceStart(c.getPlayer(), 0, String.valueOf(number));
                c.getPlayer().dropMessage(-1, "探险了 " + number + "/" + m.maps.length + " 个地区");
                c.getPlayer().dropMessage(-1, "正在挑战称号 - " + String.valueOf(m) + "");
                c.getSession().write(MaplePacketCreator.showQuestMsg("正在挑战称号 - " + String.valueOf(m) + "。" + number + "/" + m.maps.length + " 完成"));
            }
        }
    }

    public void reloadWitchTower() {
        MapleMap map = c.getPlayer().getMap();
        map.killAllMonsters(false);
        int level = c.getPlayer().getLevel();
        int mob;
        if (level <= 10) {
            mob = 9300367; //魔女的玩具熊
        } else if (level <= 20) {
            mob = 9300368; //魔女的玩具熊
        } else if (level <= 30) {
            mob = 9300369; //魔女的玩具熊
        } else if (level <= 40) {
            mob = 9300370; //魔女的玩具熊
        } else if (level <= 50) {
            mob = 9300371; //魔女的玩具熊
        } else if (level <= 60) {
            mob = 9300372; //魔女的玩具熊
        } else if (level <= 70) {
            mob = 9300373; //魔女的玩具熊
        } else if (level <= 80) {
            mob = 9300374; //魔女的玩具熊
        } else if (level <= 90) {
            mob = 9300375; //魔女的玩具熊
        } else if (level <= 100) {
            mob = 9300376; //魔女的玩具熊
        } else {
            mob = 9300377; //魔女的玩具熊
        }
        MapleMonster theMob = MapleLifeFactory.getMonster(mob);
        OverrideMonsterStats oms = new OverrideMonsterStats();
        oms.setOMp(theMob.getMobMaxMp());
        oms.setOExp(theMob.getMobExp());
        oms.setOHp((long) Math.ceil(theMob.getMobMaxHp() * (level / 5.0)));
        theMob.setOverrideStats(oms);
        map.spawnMonsterOnGroundBelow(theMob, new Point(-60, 184));
    }

    public void sendMapNameDisplay(boolean enabled) {
        if (enabled) {
            c.getSession().write(UIPacket.IntroDisableUI(false));
            c.getSession().write(UIPacket.IntroLock(false));
        }
        c.getSession().write(UIPacket.MapNameDisplay(c.getPlayer().getMapId()));
    }

    public void handlePinkBeanStart() {
        MapleMap map = c.getPlayer().getMap();
        map.resetFully();
        if (!map.containsNPC(2141000)) {
            map.spawnNpc(2141000, new Point(-190, -42));
        }
    }
}
