/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package handling.world.guild;

import java.io.Serializable;

/**
 * @author PlayDK
 */
public class MapleBBSReply implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -2265803461100662983L;
    public int replyid, ownerID;
    public long timestamp;
    public String content;

    public MapleBBSReply(int replyid, int ownerID, String content, long timestamp) {
        this.ownerID = ownerID;
        this.replyid = replyid;
        this.content = content;
        this.timestamp = timestamp;
    }
}
