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
public class ItemOptionTest {

    public static void main(String args[]) throws IOException {
        MapleDataProvider itemData = MapleDataProviderFactory.getDataProvider(new File(System.getProperty("wzpath") + "/Item.wz"));
        MapleData potsData = itemData.getData("ItemOption.img");
        List<Integer> optionId = new ArrayList<>();
        for (MapleData dat : potsData) {
            int id = Integer.parseInt(dat.getName());
            if (!optionId.contains(id)) {
                optionId.add(id);
            }
        }
        Collections.sort(optionId);
        for (Integer id : optionId) {
            FileoutputUtil.log("ItemOption.txt", id + "", true);
        }
    }
}
