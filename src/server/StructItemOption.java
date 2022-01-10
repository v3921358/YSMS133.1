/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import java.util.HashMap;
import java.util.Map;

/**
 * @author PlayDK
 */
public class StructItemOption {

    public static String[] types = {
        "incSTR", "incDEX", "incINT", "incLUK", "incACC", "incEVA", "incPAD", "incMAD", "incPDD", "incMDD", "incMHP", "incMMP",
        "incSTRr", "incDEXr", "incINTr", "incLUKr", "incACCr", "incEVAr", "incPADr", "incMADr", "incPDDr", "incMDDr", "incMHPr", "incMMPr",
        "incSTRlv", "incDEXlv", "incINTlv", "incLUKlv", "incPADlv", "incMADlv", //角色每10级增加属性
        "incSpeed", "incJump", "incCr", "incDAMr", "incTerR", "incAsrR", "incEXPr", "incMaxDamage",
        "HP", "MP", "RecoveryHP", "RecoveryMP", "level", "prop", "time",
        "ignoreTargetDEF", "ignoreDAM", "incAllskill", "ignoreDAMr", "RecoveryUP",
        "incCriticaldamageMin", "incCriticaldamageMax", "DAMreflect",
        "mpconReduce", "reduceCooltime", "incMesoProp", "incRewardProp", "boss", "attackType"};
    public int optionType, reqLevel, opID; // opID = nebulite Id or potential ID
    public String face; // angry, cheers, love, blaze, glitter
    public String opString; //potential string
    public Map<String, Integer> data = new HashMap<>();

    public int get(String type) {
        return data.get(type) != null ? data.get(type) : 0;
    }
    public boolean isBonus() {
        return opID > 10000 && opID / 1000 % 10 == 2;
    }

    @Override
    public String toString() { // I should read from the "string" value instead.
        StringBuilder ret = new StringBuilder();
        if (get("incMesoProp") > 0) {
            ret.append("金币获得量 : +");
            ret.append(get("incMesoProp"));
            ret.append("% ");
        }
        if (get("incRewardProp") > 0) {
            ret.append("物品获得概率 : +");
            ret.append(get("incRewardProp"));
            ret.append("% ");
        }
        if (get("incSTR") > 0) {
            ret.append("力量 : +");
            ret.append(get("incSTR"));
            ret.append(" ");
        }
        if (get("incDEX") > 0) {
            ret.append("敏捷 : +");
            ret.append(get("incDEX"));
            ret.append(" ");
        }
        if (get("incINT") > 0) {
            ret.append("智力 : +");
            ret.append(get("incINT"));
            ret.append(" ");
        }
        if (get("incLUK") > 0) {
            ret.append("运气 : +");
            ret.append(get("incLUK"));
            ret.append(" ");
        }
        if (get("incSTRr") > 0) {
            ret.append("力量 : +");
            ret.append(get("incSTRr"));
            ret.append("% ");
        }
        if (get("incDEXr") > 0) {
            ret.append("敏捷 : +");
            ret.append(get("incDEXr"));
            ret.append("% ");
        }
        if (get("incINTr") > 0) {
            ret.append("智力 : +");
            ret.append(get("incINTr"));
            ret.append("% ");
        }
        if (get("incLUKr") > 0) {
            ret.append("运气 : +");
            ret.append(get("incLUKr"));
            ret.append("% ");
        }
        return ret.toString();
    }
}
