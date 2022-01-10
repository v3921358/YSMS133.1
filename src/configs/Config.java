/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package configs;

import commons.configuration.ConfigurableProcessor;
import commons.utils.PropertiesUtils;

import java.util.Properties;

import org.apache.log4j.Logger;
import server.movement.MovementFactory;

/**
 * @author zisedk
 */
public class Config {

    private static final Logger log = Logger.getLogger(Config.class);

    /**
     * 加载配置文件
     */
    public static void load() {
        try {
            String config = "./config";
            Properties[] props = PropertiesUtils.loadAllFromDirectory(config);

//            log.info("加载: " + config + "/ServerConfig.properties");
            ConfigurableProcessor.process(ServerConfig.class, props);
//            log.info("加载: " + config + "/fishing.properties");
            ConfigurableProcessor.process(FishingConfig.class, props);
//            log.info("加载: " + config + "/movement.properties");
            ConfigurableProcessor.process(MovementConfig.class, props);

            ConfigurableProcessor.process(NebuliteConfig.class, props);

            MovementFactory.getInstance().initialize();
        } catch (Exception e) {
            log.error("加载配置文件出现错误.", e);
            throw new Error("加载配置文件出现错误.", e);
        }
    }
}
