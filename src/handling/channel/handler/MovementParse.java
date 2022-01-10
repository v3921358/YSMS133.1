package handling.channel.handler;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import server.maps.AnimatedMapleMapObject;
import server.movement.*;
import tools.FileoutputUtil;
import tools.HexTool;
import tools.data.input.LittleEndianAccessor;

public class MovementParse {

    /**
     * Logger for this class.
     */
    private static Logger log = Logger.getLogger(MovementParse.class);

    /*
     * 1 = 玩家移动
     * 2 = 怪物移动
     * 3 = 宠物移动
     * 4 = 召唤兽移动
     * 5 = 龙神龙龙移动
     * 6 = 玩家攻击怪物移动
     * 7 = 小白移动
     */
    public static List<LifeMovementFragment> parseMovement(LittleEndianAccessor lea, int kind) {
        List<LifeMovementFragment> res = new ArrayList<>();
        byte numCommands = lea.readByte(); //循环次数
        MovementFactory movement = MovementFactory.getInstance();
        String packet = lea.toString(true);
        for (byte i = 0; i < numCommands; i++) {
            byte command = lea.readByte(); //移动类型
            if (movement.isMovementById(0, command)) { // -1
                short xpos = lea.readShort();
                short ypos = lea.readShort();
                short unk = lea.readShort();
                short fh = lea.readShort(); // 是什么高度
                byte newstate = lea.readByte(); // 状态姿势
                short duration = lea.readShort();
                BounceMovement bm = new BounceMovement(command, new Point(xpos, ypos), duration, newstate);
                bm.setFH(fh);
                bm.setUnk(unk);
                res.add(bm);
            } else if (movement.isMovementById(1, command)) { //0x00 0x08
                short xpos = lea.readShort();
                short ypos = lea.readShort();
                short xwobble = lea.readShort();
                short ywobble = lea.readShort();
                short fh = lea.readShort();
                short xoffset = lea.readShort();
                short yoffset = lea.readShort();
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                AbsoluteLifeMovement alm = new AbsoluteLifeMovement(command, new Point(xpos, ypos), duration, newstate);
                alm.setNewFH(fh);
                alm.setPixelsPerSecond(new Point(xwobble, ywobble));
                alm.setOffset(new Point(xoffset, yoffset));
                res.add(alm);
            } else if (movement.isMovementById(2, command)) { //0x01 0x02 0x17
                short xmod = lea.readShort();
                short ymod = lea.readShort();
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                RelativeLifeMovement rlm = new RelativeLifeMovement(command, new Point(xmod, ymod), duration, newstate);
                res.add(rlm);
            } else if (movement.isMovementById(3, command)) { //0x04 0x05
                short xpos = lea.readShort();
                short ypos = lea.readShort();
                short fh = lea.readShort();
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                TeleportMovement tm = new TeleportMovement(command, new Point(xpos, ypos), duration, newstate);
                tm.setFh(fh);
                res.add(tm);
            } else if (movement.isMovementById(4, command)) { //0x0C
                res.add(new ChangeEquipSpecialAwesome(command, lea.readByte()));
            } else if (movement.isMovementById(5, command)) { //0x03 0x0B 0x0E
                short xpos = lea.readShort();
                short ypos = lea.readShort();
                short fh = lea.readShort();
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                ChairMovement cm = new ChairMovement(command, new Point(xpos, ypos), duration, newstate);
                cm.setNewFH(fh);
                res.add(cm);
            } else if (movement.isMovementById(6, command)) { //0x13 0x1B 0x28
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                AranMovement am = new AranMovement(command, new Point(0, 0), duration, newstate);
                res.add(am);
            } else if (movement.isMovementById(7, command)) { //0x0F
                short xpos = lea.readShort();
                short ypos = lea.readShort();
                short xwobble = lea.readShort();
                short ywobble = lea.readShort();
                short unk = lea.readShort();
                short fh = lea.readShort();
                short xoffset = lea.readShort();
                short yoffset = lea.readShort();
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                JumpDownMovement jdm = new JumpDownMovement(command, new Point(xpos, ypos), duration, newstate);
                jdm.setUnk(unk);
                jdm.setPixelsPerSecond(new Point(xwobble, ywobble));
                jdm.setOffset(new Point(xoffset, yoffset));
                jdm.setFH(fh);
                res.add(jdm);
            } else if (movement.isMovementById(8, command)) { //0x37 0x42
                short xpos = lea.readShort();
                short ypos = lea.readShort();
                short xwobble = lea.readShort();
                short ywobble = lea.readShort();
                short fh = lea.readShort();
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                StaticLifeMovement slm = new StaticLifeMovement(command, new Point(xpos, ypos), duration, newstate);
                slm.setPixelsPerSecond(new Point(xwobble, ywobble));
                slm.setNewFH(fh);
                res.add(slm);
            } else if (movement.isMovementById(9, command)) { //0x16
                short xpos = lea.readShort();
                short ypos = lea.readShort();
                short xwobble = lea.readShort();
                short ywobble = lea.readShort();
                byte newstate = lea.readByte();
                short duration = lea.readShort();
                lea.skip(1);
                UnknownMovement um = new UnknownMovement(command, new Point(xpos, ypos), duration, newstate);
                um.setPixelsPerSecond(new Point(xwobble, ywobble));
                res.add(um);
            } else {
                log.warn("未知的移动类型: 0x" + HexTool.toString(command) + " - ( " + command + " )");
                FileoutputUtil.log(FileoutputUtil.Movement_Log, getKindName(kind) + "未知移动封包 剩余次数: " + (numCommands - res.size()) + " 移动类型: 0x" + HexTool.toString(command) + ", 封包: " + packet);
                return null;
            }
        }
        double skip = lea.readByteAsInt();
        skip = Math.ceil(skip / 2);
        lea.skip((int) skip);
        if (numCommands != res.size()) {
            FileoutputUtil.log(FileoutputUtil.Movement_Log, getKindName(kind) + " 循环次数[" + numCommands + "]和实际上获取的循环次数[" + res.size() + "]不符" + packet);
            return null;
        }
        return res;
    }

    public static void updatePosition(List<LifeMovementFragment> movement, AnimatedMapleMapObject target, int yoffset) {
        if (movement == null) {
            return;
        }
        for (LifeMovementFragment move : movement) {
            if (move instanceof LifeMovement) {
                if (move instanceof AbsoluteLifeMovement) {
                    Point position = move.getPosition();
                    position.y += yoffset;
                    target.setPosition(position);
                }
                target.setStance(((LifeMovement) move).getNewstate());
            }
        }
    }

    public static String getKindName(int kind) {
        String moveMsg;
        switch (kind) {
            case 1:
                moveMsg = "玩家";
                break;
            case 2:
                moveMsg = "怪物";
                break;
            case 3:
                moveMsg = "宠物";
                break;
            case 4:
                moveMsg = "召唤兽";
                break;
            case 5:
                moveMsg = "龙龙";
                break;
            case 6:
                moveMsg = "攻击怪物";
                break;
            case 7:
                moveMsg = "小白";
                break;
            default:
                moveMsg = "未知kind";
                break;
        }
        return moveMsg;
    }
}
