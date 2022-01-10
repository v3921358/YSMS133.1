package server.maps;

public enum SummonMovementType {

    不会移动(0), //octo etc
    跟随移动(1), //4th job mage
    自由移动(2), //reaper
    跟随并且随机移动打怪(3), //bowman summons 
    CIRCLE_STATIONARY(5), //gavi only
    未知效果(7),
    侍从(8),
    坐骑跟随(0x0B);
    //3, 6,7, etc is tele follow. idk any skills that use
    private int val;

    SummonMovementType(int val) {
        this.val = val;
    }

    public int getValue() {
        return val;
    }
}
