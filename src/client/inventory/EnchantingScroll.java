/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client.inventory;

import tools.data.output.MaplePacketLittleEndianWriter;

/**
 * @author shuleai
 */
public class EnchantingScroll {

    private static final EnchantingScroll instance = new EnchantingScroll();
    public final String name;
    public int watk, matk, str, dex, int_, luk, wdef, mdef, maxhp, maxmp, acc, avoid, jump, speed, succ, need, style, level;
    public int passoff;

    public EnchantingScroll() {
        this.name = "";
        this.watk = 0;
        this.matk = 0;
        this.str = 0;
        this.dex = 0;
        this.int_ = 0;
        this.luk = 0;
        this.wdef = 0;
        this.mdef = 0;
        this.maxhp = 0;
        this.maxmp = 0;
        this.acc = 0;
        this.avoid = 0;
        this.jump = 0;
        this.speed = 0;
        this.succ = 0;
        this.need = 0;
        this.style = 0;
        this.level = 0;
    }

    public EnchantingScroll(String name, int watk, int matk, int str, int dex, int int_, int luk, int wdef, int mdef, int maxhp, int maxmp, int acc, int avoid, int jump, int speed, int succ, int need, int style) {
        this.name = name;
        this.watk = watk;
        this.matk = matk;
        this.str = str;
        this.dex = dex;
        this.int_ = int_;
        this.luk = luk;
        this.wdef = wdef;
        this.mdef = mdef;
        this.maxhp = maxhp;
        this.maxmp = maxmp;
        this.acc = acc;
        this.avoid = avoid;
        this.jump = jump;
        this.speed = speed;
        this.succ = succ;
        this.need = need;
        this.style = style;
    }

    public static EnchantingScroll getInstance() {
        return instance;
    }

    public void writePacket(MaplePacketLittleEndianWriter mplew) {
        int mask = 0;
        int[] values = {
            watk,
            matk,
            str,
            dex,
            int_,
            luk,
            wdef,
            mdef,
            maxhp,
            maxmp,
            acc,
            avoid,
            jump,
            speed
        };

        for (int i = 0; i < values.length; i++) {
            if (values[i] > 0) {
                mask += (1 << i);
            }
        }
        mplew.writeInt(mask);
        for (int i = 0; i < values.length; i++) {
            if (values[i] > 0) {
                mplew.writeInt(values[i]);
            }
        }
    }
}
