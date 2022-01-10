package provider;

/**
 * @author Matze
 */
public class MapleDataEntry implements MapleDataEntity {

    private String name;
    private int size;
    private int checksum;
    private int offset;
    private MapleDataEntity parent;

    public MapleDataEntry(String name, int size, int checksum, MapleDataEntity parent) {
        super();
        this.name = name;
        this.size = size;
        this.checksum = checksum;
        this.parent = parent;
    }

    @Override
    public String getName() {
        return name;
    }

    public int getSize() {
        return size;
    }

    public int getChecksum() {
        return checksum;
    }

    public int getOffset() {
        return offset;
    }

    @Override
    public MapleDataEntity getParent() {
        return parent;
    }
}
