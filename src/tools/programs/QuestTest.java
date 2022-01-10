/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.programs;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import tools.FileoutputUtil;

/**
 * @author PlayDK
 */
public class QuestTest {

    public static void main(String args[]) throws IOException {
        MapleDataProvider quest = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Quest.wz"));
        MapleData checkz = quest.getData("Check.img");
        MapleData actz = quest.getData("Act.img");
//        MapleData infoz = quest.getData("QuestInfo.img");
//        MapleData pinfoz = quest.getData("PQuest.img");
        List<String> RequirementType = new ArrayList<>();
        List<String> ActionType = new ArrayList<>();
        int id;
        for (MapleData qz : checkz.getChildren()) { //requirements first
            id = Integer.parseInt(qz.getName());
            for (int i = 0; i < 2; i++) {
                MapleData reqData = qz.getChildByPath(String.valueOf(i));
                if (reqData != null) { //0 = start
                    for (MapleData req : reqData.getChildren()) {
                        if (!RequirementType.contains(req.getName().toLowerCase())) {
                            RequirementType.add(req.getName().toLowerCase());
                        }
                    }
                }
                MapleData actData = actz.getChildByPath(id + "/" + i);
                if (actData != null) { //0 = start
                    for (MapleData act : actData.getChildren()) {
                        if (!ActionType.contains(act.getName().toLowerCase())) {
                            ActionType.add(act.getName().toLowerCase());
                        }
                    }
                }
            }
        }
        Collections.sort(RequirementType);
        for (String i : RequirementType) {
            FileoutputUtil.log("RequirementType.txt", i, true);
        }
        Collections.sort(ActionType);
        for (String i : ActionType) {
            FileoutputUtil.log("ActionType.txt", i, true);
        }
    }
}
