package server.maps;

import client.MapleCharacter;
import client.MapleClient;

import java.awt.Point;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import server.MaplePortal;
import tools.MaplePacketCreator;
import tools.packet.PartyPacket;

public class MapleDoor extends MapleMapObject {

    private WeakReference<MapleCharacter> owner;
    private MapleMap town;
    private MaplePortal townPortal;
    private MapleMap target;
    private int skillId, ownerId;
    private Point targetPosition;
    public boolean first = true;

    public MapleDoor(MapleCharacter owner, Point targetPosition, int skillId) {
        super();
        this.owner = new WeakReference<>(owner);
        this.ownerId = owner.getId();
        this.target = owner.getMap();
        this.targetPosition = targetPosition;
        setPosition(this.targetPosition);
        this.town = this.target.getReturnMap();
        this.townPortal = getFreePortal();
        this.skillId = skillId;
    }

    public MapleDoor(MapleDoor origDoor) {
        super();
        this.owner = new WeakReference<>(origDoor.owner.get());
        this.town = origDoor.town;
        this.townPortal = origDoor.townPortal;
        this.target = origDoor.target;
        this.targetPosition = new Point(origDoor.targetPosition);
        this.skillId = origDoor.skillId;
        this.ownerId = origDoor.ownerId;
        setPosition(townPortal.getPosition());
    }

    public int getSkill() {
        return skillId;
    }

    public int getOwnerId() {
        return ownerId;
    }

    private MaplePortal getFreePortal() {
        List<MaplePortal> freePortals = new ArrayList<>();

        for (MaplePortal port : town.getPortals()) {
            if (port.getType() == 6) {
                freePortals.add(port);
            }
        }
        Collections.sort(freePortals, new Comparator<MaplePortal>() {

            @Override
            public int compare(MaplePortal o1, MaplePortal o2) {
                if (o1.getId() < o2.getId()) {
                    return -1;
                } else if (o1.getId() == o2.getId()) {
                    return 0;
                } else {
                    return 1;
                }
            }
        });
        for (MapleMapObject obj : town.getAllDoorsThreadsafe()) {
            MapleDoor door = (MapleDoor) obj;
            if (door.getOwner() != null && door.getOwner().getParty() != null && getOwner() != null && getOwner().getParty() != null && getOwner().getParty().getPartyId() == door.getOwner().getParty().getPartyId()) {
                return null;
            }
            freePortals.remove(door.getTownPortal());
        }
        if (freePortals.size() <= 0) {
            return null;
        }
        return freePortals.iterator().next();
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        if (getOwner() == null || target == null || client.getPlayer() == null) {
            return;
        }
        if (target.getId() == client.getPlayer().getMapId() || getOwnerId() == client.getPlayer().getId() || (getOwner() != null && getOwner().getParty() != null && client.getPlayer().getParty() != null && getOwner().getParty().getPartyId() == client.getPlayer().getParty().getPartyId())) {
            client.getSession().write(MaplePacketCreator.spawnDoor(getOwnerId(), getSkill(), target.getId() == client.getPlayer().getMapId() ? targetPosition : townPortal.getPosition(), target.getId() == client.getPlayer().getMapId() && first)); //spawnDoor always has same position.
            if (getOwner() != null && getOwner().getParty() != null && client.getPlayer().getParty() != null && (getOwnerId() == client.getPlayer().getId() || getOwner().getParty().getPartyId() == client.getPlayer().getParty().getPartyId())) {
                client.getSession().write(PartyPacket.partyPortal(town.getId(), target.getId(), skillId, target.getId() == client.getPlayer().getMapId() ? targetPosition : townPortal.getPosition(), first));
            }
            client.getSession().write(MaplePacketCreator.spawnPortal(town.getId(), target.getId(), skillId, target.getId() == client.getPlayer().getMapId() ? targetPosition : townPortal.getPosition()));
        }
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        if (client.getPlayer() == null || getOwner() == null || target == null) {
            return;
        }
        if (target.getId() == client.getPlayer().getMapId() || getOwnerId() == client.getPlayer().getId() || (getOwner() != null && getOwner().getParty() != null && client.getPlayer().getParty() != null && getOwner().getParty().getPartyId() == client.getPlayer().getParty().getPartyId())) {
            client.getSession().write(MaplePacketCreator.removeDoor(getOwnerId(), false));
            if (getOwner() != null && getOwner().getParty() != null && client.getPlayer().getParty() != null && (getOwnerId() == client.getPlayer().getId() || getOwner().getParty().getPartyId() == client.getPlayer().getParty().getPartyId())) {
                client.getSession().write(PartyPacket.partyPortal(999999999, 999999999, 0, new Point(-1, -1), false));
            }
            client.getSession().write(MaplePacketCreator.spawnPortal(999999999, 999999999, 0, null));
        }
    }

    public void warp(MapleCharacter chr, boolean toTown) {
        if (chr.getId() == getOwnerId() || (getOwner() != null && getOwner().getParty() != null && chr.getParty() != null && getOwner().getParty().getPartyId() == chr.getParty().getPartyId())) {
            if (!toTown) {
                chr.changeMap(target, target.findClosestPortal(targetPosition));
            } else {
                chr.changeMap(town, townPortal);
            }
        } else {
            chr.getClient().getSession().write(MaplePacketCreator.enableActions());
        }
    }

    public MapleCharacter getOwner() {
        return owner.get();
    }

    public MapleMap getTown() {
        return town;
    }

    public MaplePortal getTownPortal() {
        return townPortal;
    }

    public MapleMap getTarget() {
        return target;
    }

    public Point getTargetPosition() {
        return targetPosition;
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.DOOR;
    }
}
