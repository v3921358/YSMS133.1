package client.anticheat;

public enum ReportType {

    Hacking(0, "hack"),
    Botting(1, "bot"),
    Scamming(2, "scam"),
    FakeGM(3, "fake"),
    //Harassment(4, "harass"),
    Advertising(5, "ad");
    public byte i;
    public String theId;

    ReportType(int i, String theId) {
        this.i = (byte) i;
        this.theId = theId;
    }

    public static ReportType getById(int z) {
        for (ReportType t : ReportType.values()) {
            if (t.i == z) {
                return t;
            }
        }
        return null;
    }

    public static ReportType getByString(String z) {
        for (ReportType t : ReportType.values()) {
            if (z.contains(t.theId)) {
                return t;
            }
        }
        return null;
    }
}
