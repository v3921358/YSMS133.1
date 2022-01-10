/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import java.util.ArrayList;
import java.util.List;

/**
 * @author PlayDK
 */
public class StructAndroid {

    public int type; //智能机器人的ID类型
    public int gender; //性别
    public List<Integer> skin = new ArrayList<>(); //皮肤
    public List<Integer> face = new ArrayList<>(); //脸型
    public List<Integer> hair = new ArrayList<>(); //发型
}
