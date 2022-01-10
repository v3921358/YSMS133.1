package handling.mina;

import client.MapleClient;
import handling.RecvPacketOpcode;
import org.apache.log4j.Logger;
import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.codec.CumulativeProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
import server.ServerProperties;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MapleLog;
import tools.StringUtil;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericLittleEndianAccessor;

public class MaplePacketDecoder extends CumulativeProtocolDecoder {

    /**
     * Logger for this class.
     */
    private static final Logger log = Logger.getLogger(MaplePacketDecoder.class);
    public static final String DECODER_STATE_KEY = MaplePacketDecoder.class.getName() + ".STATE";

    public static class DecoderState {

        public int packetlength = -1;
    }

    @Override
    protected boolean doDecode(final IoSession session, IoBuffer in, ProtocolDecoderOutput out) throws Exception {
        DecoderState decoderState = (DecoderState) session.getAttribute(DECODER_STATE_KEY);
        /*
         * if (decoderState == null) {
         * decoderState = new DecoderState();
         * session.setAttribute(DECODER_STATE_KEY, decoderState);
         * }
         */

        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);
        if (decoderState.packetlength == -1) {
            if (in.remaining() >= 4) {
                int packetHeader = in.getInt();
                if (!client.getReceiveCrypto().checkPacket(packetHeader)) {
                    session.close(true);
                    return false;
                }
                decoderState.packetlength = MapleAESOFB.getPacketLength(packetHeader);
            } else {
                log.trace("decode... not enough data");
                return false;
            }
        }
        if (in.remaining() >= decoderState.packetlength) {
            byte decryptedPacket[] = new byte[decoderState.packetlength];
            in.get(decryptedPacket, 0, decoderState.packetlength);
            decoderState.packetlength = -1;
            client.getReceiveCrypto().crypt(decryptedPacket);
            //MapleCustomEncryption.decryptData(decryptedPacket);
            out.write(decryptedPacket);
            if (ServerProperties.ShowPacket()) {
                int packetLen = decryptedPacket.length;
                int pHeader = readFirstShort(decryptedPacket);
                String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
                pHeaderStr = StringUtil.getLeftPaddedStr(pHeaderStr, '0', 4);
                String op = lookupSend(pHeader);
                String Recv = "Recv " + op + " [" + pHeaderStr + "] (" + packetLen + ")";
                Recv += client.getPlayer() != null ? " From : " + client.getPlayer().getName() + "\r\n" : "\r\n";
                if (packetLen <= 6000) {
                    String RecvTo = Recv + HexTool.toString(decryptedPacket) + "\r\n" + HexTool.toStringFromAscii(decryptedPacket);
                    if (!ServerProperties.SendPacket(op, pHeaderStr)) {
                        //System.out.println(RecvTo + "\r\n");
                        MapleLog.getInstance().logWrite(13, RecvTo + "\r\n");
                        FileoutputUtil.packetLog(FileoutputUtil.PacketLog, RecvTo);
                        if (op.equals("CLOSE_RANGE_ATTACK") || op.equals("RANGED_ATTACK") || op.equals("MAGIC_ATTACK")) {
                            FileoutputUtil.packetLog(FileoutputUtil.AttackLog, RecvTo);
                        } else if (op.equals("SPECIAL_MOVE")) {
                            FileoutputUtil.packetLog(FileoutputUtil.SkillBuff, RecvTo);
                        }
                    }
                } else {
                    System.out.println(Recv + HexTool.toString(new byte[]{decryptedPacket[0], decryptedPacket[1]}) + "...\r\n");
                }
            }
            return true;
        } else {
            log.trace("decode... not enough data to decode (need +" + decoderState.packetlength + ")");
            return false;
        }
    }

    private String lookupSend(int val) {
        for (RecvPacketOpcode op : RecvPacketOpcode.values()) {
            if (op.getValue() == val) {
                return op.name();
            }
        }
        return "UNKNOWN";
    }

    private int readFirstShort(byte[] arr) {
        return new GenericLittleEndianAccessor(new ByteArrayByteStream(arr)).readShort();
    }
}
