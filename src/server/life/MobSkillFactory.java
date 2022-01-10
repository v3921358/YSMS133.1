package server.life;

import java.awt.Point;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import tools.Pair;

public class MobSkillFactory {

    protected Map<Pair<Integer, Integer>, MobSkill> mobSkill;

    public static MobSkillFactory getInstance() {
        return SingletonHolder.instance;
    }

    private MobSkillFactory() {
        mobSkill = new HashMap<>();
        initialize();
    }

    /*
     * 加载怪物技能信息
     */
    private void initialize() {
        mobSkill.clear();
        MapleDataProvider dataSource = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Skill.wz"));
        MapleData skillRoot = dataSource.getData("MobSkill.img");
        for (MapleData skillData : skillRoot.getChildren()) {
            for (MapleData levelData : skillData.getChildByPath("level").getChildren()) {
                int skillId = Integer.parseInt(skillData.getName());
                int level = Integer.parseInt(levelData.getName());
                List<Integer> toSummon = new ArrayList<>();
                for (int i = 0; i <= 200; i++) { //暂时只循环200次 哪有召唤那么多的怪物 
                    if (levelData.getChildByPath(String.valueOf(i)) == null) {
                        break;
                    }
                    toSummon.add(MapleDataTool.getInt(levelData.getChildByPath(String.valueOf(i)), 0));
                }
                MapleData ltdata = levelData.getChildByPath("lt");
                Point lt = null;
                if (ltdata != null) {
                    lt = (Point) ltdata.getData();
                }
                MapleData rbdata = levelData.getChildByPath("rb");
                Point rb = null;
                if (rbdata != null) {
                    rb = (Point) rbdata.getData();
                }
                MobSkill ret = new MobSkill(skillId, level);
                ret.addSummons(toSummon);
                ret.setCoolTime(MapleDataTool.getInt("interval", levelData, 0) * 1000);
                ret.setDuration(MapleDataTool.getInt("time", levelData, 0) * 1000);
                ret.setHp(MapleDataTool.getInt("hp", levelData, 100));
                ret.setMpCon(MapleDataTool.getInt("mpCon", levelData, 0));
                ret.setSpawnEffect(MapleDataTool.getInt("summonEffect", levelData, 0));
                ret.setX(MapleDataTool.getInt("x", levelData, 1));
                ret.setY(MapleDataTool.getInt("y", levelData, 1));
                ret.setProp(MapleDataTool.getInt("prop", levelData, 100) / 100f);
                ret.setLimit((short) MapleDataTool.getInt("limit", levelData, 0));
                ret.setOnce(MapleDataTool.getInt("summonOnce", levelData, 0) > 0);
                ret.setLtRb(lt, rb);
                mobSkill.put(new Pair<>(skillId, level), ret);
            }
        }
        System.out.println("共加载 " + mobSkill.size() + " 个怪物技能信息...");
    }

    /*
     * 通过技能ID 和 等级 获取怪物的技能信息
     */
    public MobSkill getMobSkill(int skillId, int level) {
        return mobSkill.get(new Pair<>(skillId, level));
    }

    private static class SingletonHolder {

        protected static final MobSkillFactory instance = new MobSkillFactory();
    }
}
