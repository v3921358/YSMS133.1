package handling.world.guild;

import tools.packet.GuildPacket;

public enum MapleGuildResponse {

    没有参加的家族(0x33), //没有参加的家族
    家族名重复(0x34),
    已经有家族(0x40), //已经有家族了    V.117.1修改 以前0x2E
    家族人数已满(0x41),
    找不到角色(0x42); //在当前频道找不到该角色  V.117.1修改 以前0x30
    private int value;

    MapleGuildResponse(int val) {
        value = val;
    }

    public int getValue() {
        return value;
    }

    public byte[] getPacket() {
        return GuildPacket.genericGuildMessage((byte) value);
    }
}
