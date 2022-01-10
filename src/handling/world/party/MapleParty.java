package handling.world.party;

import java.io.Serializable;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

/*
 * 组队
 */
public class MapleParty implements Serializable {

    private static final long serialVersionUID = 9179541993413738569L;
    private MaplePartyCharacter leader;
    private List<MaplePartyCharacter> members = new LinkedList<>();
    private int partyId, expeditionLink = -1;
    private boolean disbanded = false;
    private String name = ""; //队伍的名字
    private boolean hidden = false; //是否隐藏队伍信息

    public MapleParty(int partyId, MaplePartyCharacter chrfor, String partyName, boolean isHidden) {
        this.leader = chrfor;
        this.members.add(this.leader);
        this.partyId = partyId;
        this.name = partyName;
        this.hidden = isHidden;
    }

    public MapleParty(int partyId, MaplePartyCharacter chrfor, int expeditionLink) {
        this.leader = chrfor;
        this.members.add(this.leader);
        this.partyId = partyId;
        this.expeditionLink = expeditionLink;
        this.name = "";
        this.hidden = false;
    }

    /*
     * 是否在队伍中有这个角色
     */
    public boolean containsMembers(MaplePartyCharacter member) {
        return members.contains(member);
    }

    /*
     * 添加队伍成员
     */
    public void addMember(MaplePartyCharacter member) {
        members.add(member);
    }

    /*
     * 移除队伍成员
     */
    public void removeMember(MaplePartyCharacter member) {
        members.remove(member);
    }

    /*
     * 更新队伍成员
     */
    public void updateMember(MaplePartyCharacter member) {
        for (int i = 0; i < members.size(); i++) {
            MaplePartyCharacter chr = members.get(i);
            if (chr.equals(member)) {
                members.set(i, member);
            }
        }
    }

    /*
     * 通过角色ID获取1个队伍成员的信息
     */
    public MaplePartyCharacter getMemberById(int chrId) {
        for (MaplePartyCharacter chr : members) {
            if (chr.getId() == chrId) {
                return chr;
            }
        }
        return null;
    }

    /*
     * 通过位置获取队伍成员信息
     */
    public MaplePartyCharacter getMemberByIndex(int index) {
        return members.get(index);
    }

    /*
     * 队伍成员全部信息
     */
    public Collection<MaplePartyCharacter> getMembers() {
        return new LinkedList<>(members);
    }

    /*
     * 队伍的ID
     */
    public int getPartyId() {
        return partyId;
    }

    /*
     * 设置队伍的ID
     */
    public void setPartyId(int id) {
        this.partyId = id;
    }

    /*
     * 获取队长信息
     */
    public MaplePartyCharacter getLeader() {
        return leader;
    }

    /*
     * 设置新的队长
     */
    public void setLeader(MaplePartyCharacter nLeader) {
        leader = nLeader;
    }

    /*
     * 队伍在远征中的队伍ID
     */
    public int getExpeditionId() {
        return expeditionLink;
    }

    @Override
    public int hashCode() {
        int prime = 31;
        int result = 1;
        result = prime * result + partyId;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        MapleParty other = (MapleParty) obj;
        return partyId == other.partyId;
    }

    /*
     * 队伍是否解散
     */
    public boolean isDisbanded() {
        return disbanded;
    }

    /*
     * 解散队伍
     */
    public void disband() {
        this.disbanded = true;
    }

    /*
     * 队伍的名字
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*
     * 队伍是否隐藏
     */
    public boolean isHidden() {
        return hidden;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }
}
