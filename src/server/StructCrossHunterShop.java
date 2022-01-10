/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

/**
 * 十字猎人系统
 *
 * @author PlayDK
 */
public class StructCrossHunterShop {

    private int itemId, tokenPrice, potentialGrade;

    public StructCrossHunterShop(int itemId, int tokenPrice, int potentialGrade) {
        this.itemId = itemId;
        this.tokenPrice = tokenPrice;
        this.potentialGrade = potentialGrade;
    }

    public int getItemId() {
        return itemId;
    }

    public int getTokenPrice() {
        return tokenPrice;
    }

    public int getOptentialGrade() {
        return potentialGrade;
    }
}
