/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package client.skills;

/**
 * @author PlayDK
 */
public class SpecialBuffInfo {

    public int buffid;
    public int value;
    public int bufflength;
    public long time;

    public SpecialBuffInfo(int buffid, int value, int bufflength, long time) {
        this.buffid = buffid;
        this.value = value;
        this.bufflength = bufflength;
        this.time = time;
    }
}
