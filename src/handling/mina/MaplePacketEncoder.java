package handling.mina;

import client.MapleClient;
import handling.SendPacketOpcode;

import java.util.concurrent.locks.Lock;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.session.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;
import server.ServerProperties;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.MapleAESOFB;
import tools.MapleLog;
import tools.StringUtil;
import tools.data.input.ByteArrayByteStream;
import tools.data.input.GenericLittleEndianAccessor;

public class MaplePacketEncoder implements ProtocolEncoder {

    @Override
    public void encode(IoSession session, Object message, ProtocolEncoderOutput out) throws Exception {
        MapleClient client = (MapleClient) session.getAttribute(MapleClient.CLIENT_KEY);

        if (client != null) {
            MapleAESOFB send_crypto = client.getSendCrypto();
            byte[] input = ((byte[]) message);
            if (ServerProperties.ShowPacket()) {
                int packetLen = input.length;
                int pHeader = readFirstShort(input);
                String pHeaderStr = Integer.toHexString(pHeader).toUpperCase();
                pHeaderStr = StringUtil.getLeftPaddedStr(pHeaderStr, '0', 4);
                String op = lookupRecv(pHeader);
                String Send = "Send " + op + " [" + pHeaderStr + "] (" + packetLen + ")";
                Send += client.getPlayer() != null ? " Recv to : " + client.getPlayer().getName() + "\r\n" : "\r\n";
                if (packetLen <= 50000) {
                    if (!ServerProperties.RecvPacket(op, pHeaderStr)) {
                        String RecvTo = Send + HexTool.toString(input) + "\r\n" + HexTool.toStringFromAscii(input);
                        //System.out.println(RecvTo + "\r\n");
                        MapleLog.getInstance().logWrite(11, RecvTo + "\r\n");
                        FileoutputUtil.packetLog(FileoutputUtil.PacketLog, RecvTo);
                        if (op.equals("GIVE_BUFF") || op.equals("CANCEL_BUFF")) {
                            FileoutputUtil.packetLog(FileoutputUtil.SkillBuff, RecvTo);
                        }
                    }
                } else {
                    System.out.println(Send + HexTool.toString(new byte[]{input[0], input[1]}) + "...\r\n");
                }
            }
            byte[] unencrypted = new byte[input.length];
            System.arraycopy(input, 0, unencrypted, 0, input.length); // Copy the input > "unencrypted"
            byte[] ret = new byte[unencrypted.length + 4]; // Create new bytes with length = "unencrypted" + 4
            Lock mutex = client.getLock();
            mutex.lock();
            try {
                byte[] header = send_crypto.getPacketHeader(unencrypted.length);
                //MapleCustomEncryption.encryptData(unencrypted); // Encrypting Data
                send_crypto.crypt(unencrypted); // Crypt it with IV
                System.arraycopy(header, 0, ret, 0, 4); // Copy the header > "Ret", first 4 bytes
            } finally {
                mutex.unlock();
            }
            System.arraycopy(unencrypted, 0, ret, 4, unencrypted.length); // Copy the unencrypted > "ret"
            out.write(IoBuffer.wrap(ret));
        } else { // no client object created yet, send unencrypted (hello) 这里是发送gethello 封包 无需加密
            out.write(IoBuffer.wrap(((byte[]) message)));
        }
    }

    @Override
    public void dispose(IoSession session) throws Exception {
        // nothing to do
    }

    private String lookupRecv(int val) {
        for (SendPacketOpcode op : SendPacketOpcode.values()) {
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
