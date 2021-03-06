/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.packet;

import client.MapleClient;
import client.MapleEnumClass;
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.MaplePet;
import handling.SendPacketOpcode;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import server.shop.MapleShop;
import server.ServerProperties;
import server.life.MapleHideNpc;
import server.life.MapleNPC;
import server.life.PlayerNPC;
import server.shop.MapleShopResponse;
import tools.HexTool;
import tools.Pair;
import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * @author admin
 */
public class NPCPacket {

    private static final Logger log = Logger.getLogger(NPCPacket.class);

    // InitialQuiz 
    public static final int InitialQuizRes_Request = 0x0;
    public static final int InitialQuizRes_Fail = 0x1;
    // InitialSpeedQuiz 
    public static final int TypeSpeedQuizNpc = 0x0;
    public static final int TypeSpeedQuizMob = 0x1;
    public static final int TypeSpeedQuizItem = 0x2;
    // SpeakerTypeID 
    public static final int NoESC = 0x1;
    public static final int NpcReplacedByUser = 0x2;
    public static final int NpcReplayedByNpc = 0x4;
    public static final int FlipImage = 0x8;

    public static byte[] sendNpcHide(List<MapleHideNpc> hide) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_HIDE.getValue());
        mplew.write(hide.size());
        for (MapleHideNpc h : hide) {
            mplew.writeInt(h.getNpcId());
        }
        return mplew.getPacket();
    }

    public static byte[] spawnNPC(MapleNPC life, boolean show) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_NPC.getValue());
        mplew.writeInt(life.getObjectId());
        mplew.writeInt(life.getId());
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getCy());
        mplew.write(life.getF() == 1 ? 0 : 1);
        mplew.writeShort(life.getFh());
        mplew.writeShort(life.getRx0());
        mplew.writeShort(life.getRx1());
        mplew.write(show ? 1 : 0);
        mplew.writeInt(0); //?????? V.114 ??????
        mplew.writeZeroBytes(5);
        mplew.writeInt(-1);
        mplew.writeZeroBytes(7);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] removeNPC(int objectid) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.REMOVE_NPC.getValue());
        mplew.writeInt(objectid);

        return mplew.getPacket();
    }

    public static byte[] removeNPCController(int objectid, boolean miniMap) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_NPC_REQUEST_CONTROLLER.getValue());
        mplew.writeBool(miniMap);
        mplew.writeInt(objectid);

        return mplew.getPacket();
    }

    public static byte[] spawnNPCRequestController(MapleNPC life, boolean MiniMap) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.SPAWN_NPC_REQUEST_CONTROLLER.getValue());
        mplew.write(1);
        mplew.writeInt(life.getObjectId());
        mplew.writeInt(life.getId());
        mplew.writeShort(life.getPosition().x);
        mplew.writeShort(life.getCy());
        mplew.write(life.getF() == 1 ? 0 : 1);
        mplew.writeShort(life.getFh());
        mplew.writeShort(life.getRx0());
        mplew.writeShort(life.getRx1());
        mplew.write(MiniMap ? 1 : 0);
        mplew.writeInt(0); //?????? V.114 ??????
        mplew.writeZeroBytes(5);
        mplew.writeInt(-1);
        mplew.writeZeroBytes(7);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] spawnPlayerNPC(PlayerNPC npc) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.PLAYER_NPC.getValue());
        mplew.write(npc.getF() == 1 ? 0 : 1);
        mplew.writeInt(npc.getId());
        mplew.writeMapleAsciiString(npc.getName());
        mplew.write(npc.getGender());
        mplew.write(npc.getSkin());
        mplew.writeInt(npc.getFace());
        mplew.writeInt(0); //job lol
        mplew.write(0);
        mplew.writeInt(npc.getHair());
        Map<Byte, Integer> equip = npc.getEquips();
        Map<Byte, Integer> myEquip = new LinkedHashMap<>();
        Map<Byte, Integer> maskedEquip = new LinkedHashMap<>();
        for (Map.Entry<Byte, Integer> position : equip.entrySet()) {
            byte pos = (byte) (position.getKey() * -1);
            if (pos < 100 && myEquip.get(pos) == null) {
                myEquip.put(pos, position.getValue());
            } else if (pos > 100 && pos != 111) { // don't ask. o.o
                pos = (byte) (pos - 100);
                if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, myEquip.get(pos));
                }
                myEquip.put(pos, position.getValue());
            } else if (myEquip.get(pos) != null) {
                maskedEquip.put(pos, position.getValue());
            }
        }
        for (Map.Entry<Byte, Integer> entry : myEquip.entrySet()) {
            mplew.write(entry.getKey());
            mplew.writeInt(entry.getValue());
        }
        mplew.write(0xFF);
        for (Map.Entry<Byte, Integer> entry : maskedEquip.entrySet()) {
            mplew.write(entry.getKey());
            mplew.writeInt(entry.getValue());
        }
        mplew.write(0xFF);
        Integer cWeapon = equip.get((byte) -111);
        if (cWeapon != null) {
            mplew.writeInt(cWeapon);
        } else {
            mplew.writeInt(0);
        }
        for (int i = 0; i < 3; i++) {
            mplew.writeInt(npc.getPet(i));
        }

        return mplew.getPacket();
    }

    /**
     * Makes any NPC in the game scriptable.
     *
     * @param npcId - The NPC's ID, found in WZ files/MCDB
     * @param description - If the NPC has quests, this will be the text of the
     * menu item
     * @return
     */
    public static byte[] setNPCScriptable(List<Pair<Integer, String>> npcs) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_SCRIPTABLE.getValue());
        mplew.write(npcs.size());
        for (Pair<Integer, String> s : npcs) {
            mplew.writeInt(s.left);
            mplew.writeMapleAsciiString(s.right);
            mplew.writeInt(0); // start time
            mplew.writeInt(Integer.MAX_VALUE); // end time
        }
        return mplew.getPacket();
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, npc, false);
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type, int diffNpc) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, diffNpc, false);
    }

    public static byte[] getPlayerTalk(int npc, byte msgType, String talk, String endBytes, byte type) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, npc, true);
    }

    public static byte[] getPlayerTalk(int npc, byte msgType, String talk, String endBytes, byte type, int diffNpc) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, diffNpc, true);
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type, int diffNpc, boolean player) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(player ? 0x03 : 0x04);
        mplew.writeInt(npc);
        mplew.write(player ? 1 : 0); //V.112.1??????
        if (player) {
            mplew.writeInt(0);
        }
        mplew.write(msgType);
        mplew.writeShort(type); // mask; 1 = no ESC, 2 = playerspeaks, 4 = diff NPC 8 = something, ty KDMS
        if ((type & 0x4) != 0) {
            mplew.writeInt(diffNpc);
        }
        mplew.writeMapleAsciiString(talk);
        mplew.write(HexTool.getByteArrayFromHexString(endBytes));
        if (!endBytes.isEmpty()) {
            mplew.writeInt(0);
        }

        return mplew.getPacket();
    }

    public static byte[] OnSay(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, String sText, boolean bPrev, boolean bNext) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.Say.getMsgType());
        mplew.write(bParam);
        if ((bParam & 0x4) > 0) {
            mplew.writeInt(nSpeakerTemplateID);
        }
        mplew.writeMapleAsciiString(sText);
        mplew.writeBool(bPrev);
        mplew.writeBool(bNext);
        return mplew.getPacket();
    }

    public static byte[] OnSayImage(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, List<String> asPath) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.SayImage.getMsgType());
        mplew.write(bParam);
        mplew.write(asPath.size());
        for (String sPath : asPath) {
            mplew.writeMapleAsciiString(sPath);//CUtilDlgEx::AddImageList(v8, sPath); 
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskYesNo(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, String sText) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskYesNo.getMsgType());
        mplew.write(bParam);//(bParam & 0x6) 
        mplew.writeMapleAsciiString(sText);
        return mplew.getPacket();
    }

    public static byte[] OnAskAccept(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, String sText) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskAccept.getMsgType());
        mplew.write(bParam);
        mplew.writeMapleAsciiString(sText);
        return mplew.getPacket();
    }

    public static byte[] OnAskText(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, String sMsg, String sMsgDefault, int nLenMin, int nLenMax) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskText.getMsgType());
        mplew.write(bParam);//(bParam & 0x6) 
        mplew.writeMapleAsciiString(sMsg);
        mplew.writeMapleAsciiString(sMsgDefault);
        mplew.writeShort(nLenMin);
        mplew.writeShort(nLenMax);
        return mplew.getPacket();
    }

    public static byte[] OnAskBoxText(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, String sMsg, String sMsgDefault, int nCol, int nLine) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskBoxText.getMsgType());
        mplew.write(bParam);//(bParam & 0x6) 
        mplew.writeMapleAsciiString(sMsg);
        mplew.writeMapleAsciiString(sMsgDefault);
        mplew.writeShort(nCol);
        mplew.writeShort(nLine);
        return mplew.getPacket();
    }

    public static byte[] OnAskNumber(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, String sMsg, int nDef, int nMin, int nMax) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskNumber.getMsgType());
        mplew.write(bParam);//(bParam & 0x6) 
        mplew.writeMapleAsciiString(sMsg);
        mplew.writeInt(nDef);
        mplew.writeInt(nMin);
        mplew.writeInt(nMax);
        return mplew.getPacket();
    }

    public static byte[] OnAskMenu(int nSpeakerTypeID, int nSpeakerTemplateID, byte bParam, String sMsg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskMenu.getMsgType());
        mplew.write(bParam);//(bParam & 0x6) 
        mplew.writeMapleAsciiString(sMsg);
        return mplew.getPacket();
    }

    public static byte[] OnAskAvatar(int nSpeakerTypeID, int nSpeakerTemplateID, String sMsg, int[] anCanadite) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskAvatar.getMsgType());
        mplew.write(0);
        mplew.writeMapleAsciiString(sMsg);
        mplew.write(anCanadite.length);
        for (int nCanadite : anCanadite) {
            mplew.writeInt(nCanadite);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskMembershopAvatar(int nSpeakerTypeID, int nSpeakerTemplateID, String sMsg, int[] aCanadite) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskMemberShopAvatar.getMsgType());
        mplew.write(0);
        mplew.writeMapleAsciiString(sMsg);
        mplew.write(aCanadite.length);
        for (int nCanadite : aCanadite) {
            mplew.writeInt(nCanadite);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskPet(int nSpeakerTypeID, int nSpeakerTemplateID, String sMsg, List<MaplePet> apPet) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskPet.getMsgType());
        mplew.write(0);
        mplew.writeMapleAsciiString(sMsg);
        mplew.write(apPet.size());
        for (MaplePet pPet : apPet) {
            if (pPet != null) {
                mplew.writeLong(pPet.getUniqueId());
                mplew.write(pPet.getSummonedValue());
            }
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskPetAll(int nSpeakerTypeID, int nSpeakerTemplateID, String sMsg, List<MaplePet> apPet, boolean bExceptionExist) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskPetAll.getMsgType());
        mplew.write(0);
        mplew.writeMapleAsciiString(sMsg);
        mplew.write(apPet.size());
        mplew.writeBool(bExceptionExist);
        for (MaplePet pPet : apPet) {
            if (pPet != null) {
                mplew.writeLong(pPet.getUniqueId());
                mplew.write(pPet.getSummonedValue());
            }
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskQuiz(int nSpeakerTypeID, int nSpeakerTemplateID, int nResCode, String sTitle, String sProblemText, String sHintText, int nMinInput, int nMaxInput, int tRemainInitialQuiz) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskQuiz.getMsgType());
        mplew.write(0);
        mplew.write(nResCode);
        if (nResCode == InitialQuizRes_Request) {
            mplew.writeMapleAsciiString(sTitle);
            mplew.writeMapleAsciiString(sProblemText);
            mplew.writeMapleAsciiString(sHintText);
            mplew.writeShort(nMinInput);
            mplew.writeShort(nMaxInput);
            mplew.writeInt(tRemainInitialQuiz);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskSpeedQuiz(int nSpeakerTypeID, int nSpeakerTemplateID, int nResCode, int nType, int dwAnswer, int nCorrect, int nRemain, int tRemainInitialQuiz) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskSpeedQuiz.getMsgType());
        mplew.write(0);
        mplew.write(nResCode);
        if (nResCode == InitialQuizRes_Request) {
            mplew.writeInt(nType);
            mplew.writeInt(dwAnswer);
            mplew.writeInt(nCorrect);
            mplew.writeInt(nRemain);
            mplew.writeInt(tRemainInitialQuiz);
        }
        return mplew.getPacket();
    }

    public static byte[] OnAskSlideMenu(int nSpeakerTypeID, int nSpeakerTemplateID, boolean bSlideDlgEX, int nIndex, String sMsg) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();
        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(nSpeakerTypeID);
        mplew.writeInt(nSpeakerTemplateID);
        mplew.write(MapleEnumClass.ScriptMessageType.AskSlideMenu.getMsgType());
        mplew.write(0);
        mplew.writeInt(bSlideDlgEX ? 1 : 0);
        mplew.writeInt(nIndex);
        mplew.writeMapleAsciiString(sMsg);
        return mplew.getPacket();
    }

    public static byte[] getMapSelection(int npcid, byte msgType, String sel) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(0x04);
        mplew.writeInt(npcid);
        mplew.write(0); //V.112.1??????
        mplew.writeShort(msgType); //V.114?????? ?????? 0x11 ?????? 0x10
        mplew.write(0); //V.119.1??????
        mplew.writeInt(npcid == 3000012 ? 5 : npcid == 9010000 ? 3 : npcid == 2083006 ? 1 : 0);
        mplew.writeInt(npcid == 9010022 ? 1 : 0);
        mplew.writeMapleAsciiString(sel);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalkStyle(int npc, String talk, int styles[], int card, boolean android) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(0x04);
        mplew.writeInt(npc);
        mplew.write(0); //V.112.1??????
        mplew.writeShort(android ? 0x0A : 0x09);  //V.114???????????? android 0x0B ?????? 0x0A
        mplew.write(0); //V.119.1??????
        if (!android) {
            mplew.writeShort(0); //V.114 ?????? ??????1??? 0
        }
        mplew.writeMapleAsciiString(talk);
        mplew.write(styles.length);
        for (int i = 0; i < styles.length; i++) {
            mplew.writeInt(styles[i]);
        }
        mplew.writeInt(card);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalkNum(int npc, byte msgType, String talk, int def, int min, int max) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(0x04);
        mplew.writeInt(npc);
        mplew.write(0); //V.112.1??????
        mplew.writeShort(msgType);
        mplew.write(0); //V.119.1??????
        mplew.writeMapleAsciiString(talk);
        mplew.writeInt(def);
        mplew.writeInt(min);
        mplew.writeInt(max);

        return mplew.getPacket();
    }

    public static byte[] getNPCTalkText(int npc, byte msgType, String talk) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(0x04);
        mplew.writeInt(npc);
        mplew.write(0); //V.112.1??????
        mplew.writeShort(msgType);
        mplew.write(0); //V.119.1??????
        mplew.writeMapleAsciiString(talk);
        mplew.writeInt(0x00);
        mplew.writeInt(0x00);

        return mplew.getPacket();
    }

    public static byte[] getEvanTutorial(String data) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        mplew.write(8);
        mplew.writeInt(0); //NpcID
        mplew.write(0);
        mplew.write(1);
        mplew.write(1);
        mplew.write(0);
        mplew.write(1);
        mplew.writeMapleAsciiString(data);

        return mplew.getPacket();
    }

    /*
     * ??????1?????????
     */
    public static byte[] getNPCShop(int shopId, MapleShop shop, MapleClient c) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_NPC_SHOP.getValue());
        mplew.write(0); //V.117.1?????? ??????
        mplew.writeInt(shop.getShopItemId()); //???????????????????????????????????????????????? ????????????ID
        mplew.writeInt(shopId); //??????ID ????????????NpcId
        PacketHelper.addShopInfo(mplew, shop, c);

        return mplew.getPacket();
    }

    /*
     * ??????????????????
     */
    public static byte[] confirmShopTransaction(MapleShopResponse code, MapleShop shop, MapleClient c, int indexBought) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.CONFIRM_SHOP_TRANSACTION.getValue());
        mplew.write(code.getValue());
        switch (code) {
            case ??????????????????: //???????????? [9B 02] [00] [00 00] ?????????????????????????????? [9B 02] [00] [01] [00 00 00 00]
            case ??????????????????: //????????????????????????????????????????????????[9B 02] [04] [00 00]
                mplew.write(indexBought >= 0 ? 1 : 0); //????????????????????????
                if (indexBought >= 0) {
                    mplew.writeShort(indexBought); //??????????????????????????? ????????? 0 ??????
                    mplew.writeInt(0);
                } else {
                    mplew.write(0); //[9B 02] [00] [00] [01] [85 84 1E 00 = 2000005 ??????ID] ??????????????????
                }
                mplew.writeInt(0);
                break;
            case ??????????????????: //????????????
                mplew.writeInt(shop.getShopItemId()); //???????????????????????????????????????????????? ????????????ID
                mplew.writeInt(shop.getNpcId());
                PacketHelper.addShopInfo(mplew, shop, c);
                break;
            case ??????????????????: //????????????????????? V.112?????? ?????? 0x0A
            case ??????????????????: //??????????????????????????????????????? V.112?????? ??????0x0C
                break;
            case ??????????????????: //??????????????????????????????.???????????????
                mplew.write(0);
                mplew.write(0);
                break;
            default:
                System.err.println("????????????????????????: " + code);
                break;
        }

        return mplew.getPacket();
    }

    /*
     * ????????????
     */
    public static byte[] takeOutStorage(byte slots, MapleInventoryType type, Collection<Item> items) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x09);
        mplew.write(slots);
        mplew.writeLong(type.getBitfieldEncoding());
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.addItemInfo(mplew, item);
        }

        return mplew.getPacket();
    }

    /*
     * ????????????
     * 0x0A = ?????????????????????????????????????????????
     * 0x0B = ????????????
     * ????????????
     * 0x10 = ????????????
     * 0x11 = ????????????
     */
    public static byte[] getStorageError(byte op) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(op);

        return mplew.getPacket();
    }

    /*
     * ??????????????????
     */
    public static byte[] storeStorage(byte slots, MapleInventoryType type, Collection<Item> items) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x0D);
        mplew.write(slots);
        mplew.writeLong(type.getBitfieldEncoding());
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.addItemInfo(mplew, item);
        }

        return mplew.getPacket();
    }

    /*
     * ??????????????????
     */
    public static byte[] arrangeStorage(byte slots, Collection<Item> items, boolean changed) {
        if (ServerProperties.ShowPacket()) {
            log.info("??????: " + new Throwable().getStackTrace()[0]);
        }
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x0F);
        mplew.write(slots);
        mplew.writeLong(0x7C); //4 | 8 | 10 | 20 | 40
        /*
         * ?????????????????????
         * ????????????
         * ????????????
         * ????????????
         * ????????????
         * ????????????
         */
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.addItemInfo(mplew, item);
        }
        mplew.writeInt(0x00);

        return mplew.getPacket();
    }

    /*
     * ??????????????????
     */
    public static byte[] mesoStorage(byte slots, long meso) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x13);
        mplew.write(slots);
        mplew.writeLong(0x02);
        mplew.writeLong(meso);

        return mplew.getPacket();
    }

    /*
     * ????????????
     */
    public static byte[] getStorage(int npcId, byte slots, Collection<Item> items, long meso) {
        MaplePacketLittleEndianWriter mplew = new MaplePacketLittleEndianWriter();

        mplew.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        mplew.write(0x16);
        mplew.writeInt(npcId);
        mplew.write(slots);
        mplew.writeLong(0x7E);
        mplew.writeLong(meso);
        /*
         * ?????????????????????
         * ????????????
         * ????????????
         * ????????????
         * ????????????
         * ????????????
         */
        mplew.write(items.size());
        for (Item item : items) {
            PacketHelper.addItemInfo(mplew, item);
        }
        mplew.writeInt(0x00);

        return mplew.getPacket();
    }
}
