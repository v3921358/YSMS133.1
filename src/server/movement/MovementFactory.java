/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.movement;

import configs.MovementConfig;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author admin
 */
public class MovementFactory {

    protected Map<Integer, List<Byte>> movementIds = new HashMap<>(); //所有的移动ID [移动ID的类型] [移动的ID数据集合]

    private MovementFactory() {
    }

    public void initialize() {
        movementIds.clear();
        String[] movement = {
            MovementConfig.bounceMovement, //0 伤害反弹移动效果
            MovementConfig.absoluteLifeMovement, //1 正常移动移动效果
            MovementConfig.relativeLifeMovement, //2 类似疾驰移动效果
            MovementConfig.teleportMovement, //3 传送移动的效果
            MovementConfig.changeEquipMovement, //4 类似更换装备或者获得技能出现的移动效果
            MovementConfig.chairMovement, //5 类似角色坐在椅子出现的移动效果
            MovementConfig.aranMovement, //6 类似战神攻击出现的移动效果
            MovementConfig.jumpDownMovement, //7 角色向下跳出现的移动效果
            MovementConfig.staticLifeMovement, //8 将怪物从另外1个地方拉到另外1个地方出现的移动效果
            MovementConfig.unknownLifeMovement
        };
        String[] movementName = {
            "Bounce Movement",
            "Absolute Life Movement",
            "Relative Life Movement",
            "Teleport Movement",
            "Change Equip Movement",
            "Chair Movement",
            "Aran Movement",
            "Jump Down Movement",
            "Static Life Movement",
            "Unknown Movement"
        };
        List<Byte> allMoveIds = new LinkedList<>(); // 定义一个链表buffer
        for (int x = 0; x < movement.length; x++) {
            // 循环9次 加载 9个 类型的移动
            String[] movementString = movement[x].split(",");
            byte moveId;
            List<Byte> moveIds = new LinkedList<>();
            for (int i = 0; i < movementString.length; i++) {
                // 加载每个类型的解析
                String offset = movementString[i];
                if (offset.length() > 2 && offset.substring(0, 2).equals("0x")) {
                    moveId = Byte.parseByte(offset.substring(2), 16);
                } else {
                    moveId = Byte.parseByte(offset);
                }
                if (!allMoveIds.contains(moveId)) { // 检测是否有重复的移动 contains 包含
                    moveIds.add(moveId);
                    allMoveIds.add(moveId);
                } else {
                    System.err.println("加载移动ID出现重复ID: " + moveId + " 当前类型: " + movementName[x]);
                }
            }
            movementIds.put(x, moveIds);
//            System.err.println("加载: " + movementName[x] + " 完成.共: " + moveIds.size() + " 个移动ID.");
        }
    }

    public boolean isMovementById(int Id, byte moveId) {
        if (!movementIds.containsKey(Id)) {
            return false;
        }
        List<Byte> moveIds = movementIds.get(Id);
        return moveIds != null && moveIds.contains(moveId);
    }

    public boolean isBounceMovement(byte moveId) {
        return isMovementById(0, moveId);
    }

    public boolean isAbsoluteLifeMovement(byte moveId) {
        return isMovementById(1, moveId);
    }

    public boolean isRelativeLifeMovement(byte moveId) {
        return isMovementById(2, moveId);
    }

    public boolean isTeleportMovement(byte moveId) {
        return isMovementById(3, moveId);
    }

    public boolean isChangeEquipMovement(byte moveId) {
        return isMovementById(4, moveId);
    }

    public boolean isChairMovement(byte moveId) {
        return isMovementById(5, moveId);
    }

    public boolean isAranMovement(byte moveId) {
        return isMovementById(6, moveId);
    }

    public boolean isJumpDownMovement(byte moveId) {
        return isMovementById(7, moveId);
    }

    public boolean isStaticLifeMovement(byte moveId) {
        return isMovementById(8, moveId);
    }

    public static MovementFactory getInstance() {
        return SingletonHolder.instance;
    }

    private static class SingletonHolder {

        protected static final MovementFactory instance = new MovementFactory();
    }
}
