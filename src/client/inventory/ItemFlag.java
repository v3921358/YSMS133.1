package client.inventory;

public enum ItemFlag {

    LOCK(0x01), //锁定
    鞋子防滑(0x02), //鞋子防滑卷轴 - 给鞋子增加防滑功能.成功率:10%, 对强化次数没有影响
    披风防寒(0x04), //披风防寒卷轴 - 给披肩增加防寒功能.成功率:10%, 对强化次数没有影响
    UNTRADEABLE(0x08),
    KARMA_EQ(0x10),
    KARMA_USE(0x02),
    CHARM_EQUIPPED(0x20),
    ANDROID_ACTIVATED(0x40),
    CRAFTED(0x80),
    CRAFTED_USE(0x10),
    装备防爆(0x100), //防爆卷轴 - 保护物品的魔法盾。在装备物品上使用，可以在使用卷轴失败时防止装备物品损坏，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失，#c强化12星以上的物品无法使用。# \n可以和#c安全之盾、复原之盾#一起使用。
    幸运卷轴(0x200), //幸运日卷轴 - 使接下去使用的卷轴的成功率提高10%。潜能附加卷轴、强化卷轴无效
    KARMA_ACC_USE(0x400),
    KARMA_ACC(0x1000),
    保护升级次数(0x2000), //保护卷轴 - 保护物品的魔法盾。在装备物品上使用，可以在使用卷轴失败时防止装备物品#c可升级次数#减少，#c仅限1次#。但是使用卷轴成功时，防御效果也会消失。\n可以和#c安全之盾、复原之盾#一起使用。
    卷轴防护(0x4000); //卷轴防护卷轴 - 卷轴使用失败时，可以保护卷轴不消失的魔法防护卷轴. \n使用在装备道具上时 #c添加一次保护机会#，如果卷轴使用失败时#c使用的卷轴不会消失#。但是,卷轴使用成功时也会消耗保护效果。\n可以和#c保护卷轴,防爆卷轴#一起使用。
    private final int i;

    ItemFlag(int i) {
        this.i = i;
    }

    public int getValue() {
        return i;
    }

    public boolean check(int flag) {
        return (flag & i) == i;
    }
}
