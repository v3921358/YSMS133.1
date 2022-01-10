/*
 副本：
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(4310150, 250), //
	Array(2049752, 350), //S级潜能卷轴 30%
	Array(4310150, 450), //
	Array(2433646, 300),  //
	Array(2022956, 500),  //火红玫瑰
	Array(5062009, 200),  //终极魔方
	Array(5062010, 600),  //终极魔方
	Array(1112663, 240),  //白天使的祝福
	Array(2430471, 550),  //终极魔方
	Array(2430471, 550),  //终极魔方
	Array(2430471, 550),  //终极魔方
	Array(2340000, 550),  //
	Array(5072000, 550),  //
	Array(1112586, 210),  //白天使的祝福
	Array(5073000, 550),  //
	Array(5074000, 550),  //
	Array(2049135, 300),
	Array(2049122, 100),
	Array(5010110, 50),
	Array(1212014, 100), //龙尾黑甲凶灵
	Array(1232014, 100), //狮心痛苦命运
	Array(1242014, 100), //鲨齿女王意志之剑
	Array(1302152, 100), //狮心弯刀
	Array(1312065, 100), //狮心勇士斧
	Array(1322096, 100), //狮心震雷钉
	Array(1332030, 100), //渡鸦之魂短刀
	Array(1342036, 100), //精灵角暗影刀
	Array(1362019, 100), //渡鸦之魂真红手杖
	Array(1372084, 100), //龙尾精灵短杖
	Array(1382104, 100), //龙尾战斗长杖
	Array(1342095, 100), //狮心战斗弯刀
	Array(1432086, 100), //狮心长枪
	Array(1442116, 100), //狮心矛
	Array(1462099, 100), //鹰翼重弩
	Array(1472122, 100), //渡鸦之魂钢铁拳套
	Array(1452111, 100), //鹰翼组合弓
	Array(1482084, 100), //鲨齿巨鹰爪
	Array(1492085, 100), //鲨齿锐利手铳
	Array(1522018, 100), //龙翼巨弩枪
	Array(1003712, 100), //狮心战斗头盔
	Array(1003713, 100), //龙尾法师帽子
	Array(1003714, 100), //鹰翼哨兵便帽
	Array(1003715, 100), //渡鸦之魂追踪者帽
	Array(1003716, 100), //鲨齿船长帽
	Array(1052314, 100), //狮心战斗锁子甲
	Array(1052315, 100), //龙尾法师长袍
	Array(1052316, 100), //鹰翼哨兵服
	Array(1052317, 100), //渡鸦之魂追踪者盔
	Array(1052318, 100), //鲨齿船长外套
	Array(1072485, 100), //狮心战斗鞋
	Array(1072486, 100), //龙尾法师鞋
	Array(1072487, 100), //鹰翼哨兵鞋
	Array(1072488, 100), //渡鸦之魂追踪者鞋
	Array(1072489, 100), //鲨齿船长鞋
	Array(1082295, 100), //狮心战斗护腕
	Array(1082296, 100), //龙尾法师手套
	Array(1082297, 100), //鹰翼哨兵手套
	Array(1082298, 100), //渡鸦之魂追踪者手套
	Array(1082299, 100), //鲨齿船长手套
	Array(1102275, 100), //狮心战斗披风
	Array(1102276, 100), //龙尾法师披风
	Array(1102277, 100), //鹰翼哨兵披风
	Array(1102278, 100), //渡鸦之魂猎人披风
	Array(1102279, 100), //鲨齿船长披风
	Array(1152110, 100), //龙尾法师护肩
	Array(1152111, 100), //鹰翼哨兵护肩
	Array(1152112, 100), //渡鸦之魂猎人护肩
	Array(1152113, 100), //鲨齿船长护肩
	Array(1152108, 100), //狮心战斗护肩
	Array(1232040, 290), // 豪华阿加雷斯猩红黄道剑
	Array(1302228, 290), // 豪华阿加雷斯拳刃
	Array(1322163, 290), // 豪华阿加雷斯锤
	Array(1402152, 290), // 豪华阿加雷斯双手剑
	Array(1422108, 290), // 豪华阿加雷斯大槌
	Array(1432139, 290), // 豪华阿加雷斯之矛
	Array(1442183, 290), // 豪华阿加雷斯之矛
	Array(1332194, 290), // 豪华赫尔巴斯猎手
	Array(1362068, 290), // 豪华赫尔巴斯手杖         
	Array(1472180, 290), // 豪华赫尔巴斯手套
	Array(1212043, 290), // 豪华艾里格斯双头杖
	Array(1372140, 290), // 豪华艾里格斯短杖
	Array(1382169, 290), // 豪华艾里格斯笞鞭
	Array(1252030, 290), // 豪华艾里格斯猫梳魔法棒
	Array(1452171, 290), // 豪华伊布斯长弓
	Array(1462160, 290), // 豪华伊布斯弩
	Array(1522072, 290), // 豪华伊布斯双弩枪
	Array(1222043, 290), // 豪华维帕尔血月
	Array(1242046, 290), // 豪华维帕尔狮蝎剑
	Array(1482141, 290), // 豪华维帕尔指节手套
	Array(1492153, 290), // 豪华维帕尔之鹰
	Array(1532075, 290), // 豪华维帕尔火炮
	Array(1003589, 290), // 豪华阿加雷斯头箍
	Array(1003592, 290), // 豪华赫尔巴斯头箍
	Array(1003590, 290), // 豪华艾里格斯头箍
	Array(1003591, 290), // 豪华伊布斯头箍
	Array(1003593, 290), // 豪华维帕尔头箍
	Array(1052498, 290), // 豪华阿加雷斯锁子甲
	Array(1052501, 290), // 豪华赫尔巴斯锁子甲
	Array(1052499, 290), // 豪华艾里格斯锁子甲
	Array(1052500, 290), // 豪华伊布斯锁子甲
	Array(1052502, 290), // 豪华维帕尔锁子甲
	Array(1102445, 290), // 豪华阿加雷斯披风
	Array(1102448, 290), // 豪华赫尔巴斯披风
	Array(1102446, 290), // 豪华艾里格斯披风
	Array(1102447, 290), // 豪华伊布斯披风
	Array(1102449, 290), // 豪华维帕尔披风
	Array(1082466, 290), // 豪华阿加雷斯手套
	Array(1082469, 290), // 豪华赫尔巴斯手套
	Array(1082467, 290), // 豪华艾里格斯手套
	Array(1082468, 290), // 豪华伊布斯手套
	Array(1082470, 290), // 豪华维帕尔手套
	Array(1072703, 290), // 豪华阿加雷斯靴
	Array(1072706, 290), // 豪华赫尔巴斯靴
	Array(1072704, 290), // 豪华艾里格斯靴
	Array(1072705, 290), // 豪华伊布斯靴
	Array(1072707, 290), // 豪华维帕尔靴
	Array(1012478, 100), // - 凝聚之力结晶石
	Array(1022231, 100), //1022231 - 绚蓝水印脸饰
	Array(1022232, 100), //1022232 - 布莱克缤瞳印
	Array(1182087, 100), //1182087 - 水晶幸运徽章
	Array(1152170, 100), // 1152170 - 皇家黑色金属护肩
	Array(1132272, 100), // 1132272 - 黄金四叶草腰带
	Array(1122150, 100), // 1122150 - 统治者吊坠
	Array(1122254, 100), // 1122254 - 毒蛇终结者吊坠
	Array(1122076, 100), // 1122076 - 进阶黑暗龙王项链
	Array(1122000, 100), // 1122000 - 黑龙项环
	Array(1032241, 100), // 1032241 - 魅惑耳环
	Array(1032136, 100), // 1032136 - 地狱火焰
	Array(1113149, 100), // 1113149 - 银花戒指
	Array(1112191, 80), //
	Array(1115004, 80), //
	Array(1112190, 80), //
	Array(1115003, 80), //
	Array(1112959, 80), //
	Array(1112181, 80), //
	Array(1112294, 80), //
	Array(1112183, 80), //
	Array(1112296, 80), //
	Array(5010044, 80), //
	Array(3010895, 100), // 阿卡伊勒童话书椅子, 100), // 感觉和阿卡伊勒的关系好像变得亲近一些的椅子。每10秒HP恢复100，MP恢复50。
	Array(3010896, 100), // 我的女皇椅子, 100), // 可以感觉到女王的火热人气的椅子。每10秒HP恢复100，MP恢复50。
	Array(3010897, 100), // 生日快乐，恶魔, 100), // 坐在椅子上的恶魔猎手的表情感觉很奇怪。每10秒HP恢复100，MP恢复50。
	Array(3010898, 100), // 迷你神兽椅子, 100), // 坐在迷你神兽椅子上时，每10秒HP恢复50，MP恢复50。
	Array(3010899, 100), // 摆钟椅子, 100), // 坐在钟摆椅子上时，每10秒HP恢复50，MP恢复50。
	Array(3010900, 100), // 宝石枫叶椅子, 100), // 用宝石做成的闪亮枫叶椅子。坐下后每10秒恢复HP 40, MP 20。
	Array(3010901, 100), // 热情的红色药水椅子, 100), // 和其他药水椅子相比，可以更快地恢复HP的红色药水椅子。每10秒HP恢复110，MP恢复50。
	Array(3010902, 100), // 新鲜的蓝色药水椅子, 100), // 和其他药水椅子相比，可以更快地恢复MP的蓝色药水椅子。每10秒HP恢复100，MP恢复60。
	Array(3010903, 100), // 兔子椅子, 100), // 坐在上面，每10秒HP恢复100，MP恢复50的兔子椅子。
	Array(3010904, 100), // 椰子树沙滩椅, 100), // 放在阿里安特凉爽的椰子树下的沙滩椅。坐在上面，每10秒HP恢复40，MP恢复20。
	//Array(3010905, 50), // 柿子树鞦韆, 100), // 吊挂在挂满成熟柿子的柿子树上的鞦韆。
	Array(3010906, 50), // 云朵洗手间椅子, 100), // 装修豪华的洗手间。里面一切应有尽有。每10秒HP恢复100，MP恢复50。
	Array(3010907, 50), // 公沙沙兔靠垫, 100), // 靠着可爱的公沙沙兔坐着，每10秒HP恢复60。
	Array(3010908, 50), // 海蓝天鹅绒沙发, 100), // 奢华的海蓝色天鹅绒沙发。坐在上面，每10秒HP恢复60。
	Array(3010909, 50), // 红色设计师椅子, 100), // 采用明亮红色的设计师椅子。坐在上面，每10秒HP恢复60。
	//Array(3010910, 50), // 艾莉珍椅子, 100), // 可以成为可爱的少女艾莉珍的好朋友。每10秒HP恢复50，MP恢复50。
	Array(3010911, 100), // 红帽月妙抱枕椅, 100), // 坐在抱枕椅上就可以看到戴著红色帽子的可爱月妙的才艺。
	Array(3010912, 100), // 蓝帽月妙抱枕椅, 100), // 坐在抱枕椅上就可以看到戴著蓝色帽子的可爱月妙的才艺。
	Array(3010913, 100), // 扇子月妙抱枕椅, 100), // 坐在抱枕椅上就可以观赏拿著扇子走绳索的月妙的才艺。
	Array(3010914, 100), // 太平萧月妙抱枕椅, 100), // 坐在抱枕椅上就可以观赏史出浑身力量演奏的月妙。
	Array(3010915, 100), // 恶灵附身的娃娃椅子, 100), // 恶灵附身的娃娃椅子。坐在上面，每10秒HP恢复50。
	Array(3010916, 100), // 粉红沙滩遮阳伞, 100), // 让人想起凉爽的大海的粉红色沙滩遮阳伞。坐在上面，每10秒HP恢复60。
	Array(3010917, 100), // 红色龙椅, 100), // 有严肃的火龙相伴的椅子。每10秒HP恢复50，MP恢复50。
	Array(3010918, 100), // 蓝色龙椅, 100), // 有严苛的青龙相伴的椅子。每10秒HP恢复50，MP恢复50。
	Array(3010919, 100), // 精灵王座, 100), // 为精灵之王制作的椅子。每10秒HP恢复100，MP恢复50。
	Array(3010920, 100), // 水晶月亮, 100), // 怪盗幻影专用椅子，坐下去后每10秒都能恢复HP。
	Array(3010921, 100), // 彩蛋篮子, 100), // 篮子中塞满五彩缤纷的彩蛋!\n每10秒钟恢复HP40,MP40.
	Array(3010922, 100), // 悠长假期(红色), 100), // 坐在上面可享受悠闲的红色悠长假期,每10秒钟恢复MP 20.
	Array(3010923, 100), // 10周年椅子, 100), // 为纪念冒险岛10周年而制作的巨无霸椅子。每10秒钟，HP和MP各恢复50.
	//Array(3010936, 50), // 青蛙跳楼机, 100), // 由中国玩家“小术”设计的可同时乘坐多人的青蛙跳楼机椅子。坐下时，每10秒中，可恢复HP，MP各500。
	//Array(3010894, 10), // 一杯咖啡的悠闲, 100), // 享受一杯咖啡的浓郁的香味。坐下时，每10秒中，可恢复HP，MP各50。
	Array(3010747, 10), // 和风纸鸢椅子, 100), // 充满和风的纸鸢椅子。坐下时，每10秒中，可恢复HP，MP各50。
	Array(3010748, 10), // 日式拉面椅, 100), // 浓郁的日式传统拉面，香气四溢。坐下时，每10秒中，可恢复HP，MP各50。
	Array(3010750, 100), // 焦糖布丁椅子, 100), // 软软的焦糖布丁，香甜可口。坐下时，每10秒中，可恢复HP，MP各50。
	Array(3010795, 10), // 森林中休息处(椅子), 100), // 可以在宁静的森林中休息的椅子。坐上时，每10秒恢复HP、MP500。
	Array(3010794, 20), // 抖动的舌头椅子, 100), // 抖动的舌头椅子，坐在上面随时可能被丑陋的怪物吃掉哦。坐上时，每10秒恢复HP、MP500。
	Array(3010799, 50), // 坟墓幽灵椅子, 100), // 坐在椅子上，将化身为游走在坟墓中的幽灵。坐上时，每10秒恢复HP、MP500。
	Array(3010714, 20), // 堆王冠, 100), // 由5个不同颜色的王冠一层层堆积起来的椅子。坐上时，每10秒恢复HP、MP500。
	Array(3010732, 20), // 翅膀自行车椅子, 100), // 坐上时，每10秒恢复HP、MP500。
	Array(3012019, 100), // 爱琴海椅子, 100), // 由中国玩家“小术”设计的双人椅子。在浪漫的爱情海，和喜欢的人一起坐在圣爱殿堂中，感受幸福与甜蜜。两人靠近后坐下会出现爱琴海圣爱殿堂的浪漫特效。坐上时，每10秒恢复HP、MP500。
	Array(3010813, 100), // 爱情水晶球的回忆, 100), // 由中国玩家“小术”设计的椅子。装满了满满幸福甜蜜回忆的爱情水晶球。坐上时，每10秒恢复HP、MP500。
	Array(3012020, 100), // 紫藤花吊篮椅, 100), // 由中国冒险岛玩家“小术”设计的情侣椅子，两个人坐一起时产生漂亮的背景效果，每5秒恢复HP/MP 500
	//Array(3010820, 10), // 迷你玩具别墅椅子, 100), // 想休息的时候，就到我的别墅来。每10秒，HP恢复500，MP恢复500。
	//Array(3010806, 10), // 桃樱芳菲椅, 100), // 百花齐放，惬意悠悠。每10秒钟恢复HP50、MP50。
	//Array(3010780, 10), // 旋转木马, 100), // 承载着梦想的木马，带你驶向幸福的彼岸。坐上时，每10秒恢复HP、MP100。
	//Array(3010779, 10), // 金马祥云轿, 100), // 由中国玩家“小术”设计。金马祥云轿，腾云驾雾来报到。象征马年吉祥如意的椅子。坐上时，每10秒恢复HP、MP500。
	//Array(3010781, 20), // 马上有你, 100), // 和好朋友小马马坐在一起。坐上时，每10秒恢复HP、MP500。
	//Array(3010788, 20), // 巨无霸年夜饭, 100), // 由中国玩家“小术”设计。农历除夕，在鞭炮声中围座在一起，共同辞旧迎新一起享受美味的巨无霸团圆饭。坐上时，每秒恢复HP、MP各500。
	//Array(3010783, 10), // 蓝色邦尼屋, 100), // 欢迎来到邦尼快乐的家～每10秒HP恢复50，MP恢复50。
	//Array(3010797, 100), // 新娘春节椅子, 100), // 和双弩精灵新娘一起迎接春节的到来。每10秒HP恢复50，MP恢复50。
	//Array(3010798, 100), // 焰火椅子, 100), // 两边有焰火绽放的高级椅子。可能稍微有点危险……每10秒HP恢复50，MP恢复50。
	//Array(3010800, 100), // 小学生月妙拜年椅子, 100), // 感觉好像得给钱才行，但是不仅不扣减金币，还会每10秒HP恢复50，MP恢复50。
	//Array(3010801, 100), // 学龄前月妙拜年椅子, 100), // 感觉好像得给钱才行，但是不仅不扣减金币，还会每10秒HP恢复50，MP恢复50。
	//Array(3010802, 100), // 中学生月妙拜年椅子, 100), // 感觉好像得给钱才行，但是不仅不扣减金币，还会每10秒HP恢复50，MP恢复50。
	//Array(3010803, 100), // 高3月妙拜年椅子, 100), // 感觉好像得给钱才行，但是不仅不扣减金币，还会每10秒HP恢复50，MP恢复50。
	//Array(3010804, 100), // 军人月妙拜年椅子, 100), // 到了一定的年纪，得接受军人的拜年。每10秒HP恢复50，MP恢复50。
	//Array(3010810, 100), // 火车旅行椅, 100), // 坐着火车去旅行吧！坐下时，每10秒中，可恢复HP，MP各50。
	//Array(3010811, 100), // 嫩芽椅, 100), // 可以感觉到春天绿色的气息。坐在嫩芽上，感受春天的情趣吧。每10秒HP恢复50，MP恢复50。
	//Array(3010812, 100), // 旋转木马椅, 100), // 快乐的游乐园。坐在旋转木马上，度过快乐的时光。每10秒HP恢复50，MP恢复50。
	//Array(3010814, 100), // 粉丝抱枕椅子, 100), // 粉丝抱枕椅子，坐下时，每10秒中，可恢复HP，MP各50。
	//Array(3010815, 100), // 单身部队海报椅, 100), // 肉麻的炫耀只会让我们变得更强。我们是无敌的单身部队！\r\n#c每10秒HP/MP恢复50
	//Array(3010835, 100), // 爱情水晶球记忆椅, 100), // 沉浸在甜蜜的爱情回忆中吧。每10秒HP恢复50，MP恢复50。\n中国冒险岛玩家[小术]设计的椅子。
	//Array(3010844, 100), // 麻辣教室椅子, 100), // 我就是我，谁也不能阻拦我！坐下时，每10秒中，可恢复HP，MP各50。
	//Array(3010851, 100), // 夏日沁饮椅子, 100), // 炎炎夏日，只有它才能让你清凉舒爽。坐下时，每10秒中，可恢复HP，MP各50。
	Array(3010852, 100), // 鲜花椅, 100), // 和春天盛开的美丽鲜花在一起。每10秒HP恢复50，MP恢复50。
	//Array(3010854, 100), // 神秘怪物共聚一堂！, 100), // 揭开神秘面纱的怪物们和太古蘑菇一起庆祝11周年。每10秒HP恢复50，MP恢复50。
	//Array(3010789, 100), // 爆竹声声, 100), // 爆竹声声迎新年！坐在上面的话，每10秒回复200点HP、200点MP
	//Array(3010606, 100), // 未上色的名画椅子, 100), // 这幅空的画布，呼唤你为它涂上绚丽的色彩。坐在上面时，每10秒HP恢复10点，MP恢复10点。
	//Array(3010608, 100), // 完美的名画椅子, 100), // 天啊，看看这幅杰作！这线条和这色彩，如此炫目，如此令人惊叹！坐在上面时，每10秒HP恢复50点，MP恢复50点。
	Array(1072337, 100), // 喜洋洋拖鞋, 100), // (无描述)
	Array(1112254, 100), // 豪华珍珠聊天戒指, 100), // 由中国冒险岛玩家小术设计，在海底珍珠玲珑光芒的环绕下轻松愉快的聊天吧。
	Array(1112143, 100), // 豪华珍珠名片戒指, 100), // 由中国冒险岛玩家小术设计，在海底珍珠玲珑光芒的环绕下展示自己的昵称吧。
	Array(1112118, 100), // 可乐名片戒指, 100), // 角色造型下面，以可口可乐颜色作为底色，以白色字体显示角色名称。
	Array(1112119, 100), // 可乐(Red) 名片戒指, 100), // 角色造型下面，以可口可乐颜色作为底色，以白色字体显示角色名称。
	Array(1112120, 100), // 可乐(White) 名片戒指, 100), // 角色造型下面，以可口可乐颜色作为底色，以红色字体显示角色名称。
	Array(1112228, 100), // 可乐聊天戒指, 100), // 角色对话的时候，聊天窗会变成可口可乐样子
	Array(1112229, 100), // 可乐(Red)聊天戒指, 100), // 角色对话的时候，聊天窗会变成类似可口可乐样子
	Array(1112230, 100), // 可乐(White)聊天戒指, 100), // 角色对话的时候，聊天窗会变成类似可口可乐样子
	Array(1002524, 100), // 可乐帽, 100), // (无描述)
	Array(1702533, 100), // 奶兔立拍得, 100), // 由中国玩家“小术”设计的奶兔立拍得。\n可以装备在#c所有武器#上的武器。
	Array(1702020, 100), // 棒棒糖, 100), // 可装备在#c/单手剑/单手斧/单手钝器/短杖/长杖/短刀/魔法棒/的主武器#上。
	Array(1702459, 100), // 棉花糖武器, 100), // 攻击时可以看到羊形态的棉花糖。可装备在#c所有的主武器#上。
	Array(1702302, 100), // 杯具, 100), // 可装备在#c除了/手炮/双弩枪/以外的主武器#上。
	Array(1042285, 100), // 拼色点点T恤, 100), // (无描述)
	Array(1042204, 100), // 汉堡T恤, 100), // (无描述)
	Array(1112103, 100), // 嫩黄名片戒指, 100), // 在角色的下面出来黄底黑字角色名。
	Array(1112253, 100), // 木乃伊对话框戒指, 100), // 角色对话时, 显示绷带对话框。
	Array(1112142, 100), // 木乃伊名片戒指, 100), // 在角色下面的绷带上显示角色名。
	Array(1112135, 100), // 水墨花名片戒指, 100), // 在角色脚底下，用以水墨画背景用白色的字体显示角色名字。
	Array(1112238, 100), // 水墨花聊天戒指, 100), // 角色在聊天时，会出现水墨画对话框。
	Array(4001006, 350),  //火焰羽毛
	Array(1112915, 290),  //蓝调戒指
	Array(3010678, 150),  //海加顿之安息
	Array(3010680, 150),  //童话中的宫殿
	Array(2433654, 350),  //星星500个交换券
	Array(2433285, 350),  //
	Array(4033356, 300)  //正义火种
);
function init() {
    em.setProperty("state", "0");
}


function setup(level, leaderid) {
    var eim = em.newInstance("ZChaosPQ4");
    eim.setInstanceMap(321110000).resetPQ(level);
    eim.setInstanceMap(321111000).resetPQ(level);
    eim.setInstanceMap(321112000).resetPQ(level);
    eim.setInstanceMap(321113000).resetPQ(level);
    eim.setInstanceMap(321114000).resetPQ(level);
    eim.setInstanceMap(321115000).resetPQ(level);
    eim.setInstanceMap(321116000).resetPQ(level);
    var map = eim.setInstanceMap(321116000);
    map.resetFully();
    map.killAllMonsters(true);
    map.respawn(false);
	mobid = 9390866;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*100);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	var mapForMob = eim.getMapInstance(321116000);
	mapForMob.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-16, 392));
	var map2 = eim.getMapInstance(321110000);
	mobid = 9300700;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*3);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map2.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-136, 392));
	var map3 = eim.getMapInstance(321111000);
	mobid = 9300701;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*4);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map3.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-153, 392));
	var map4 = eim.getMapInstance(321111000);
	mobid = 9300702;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*4);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map4.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1311, 212));
	var map5 = eim.getMapInstance(321112000);
	mobid = 9300704;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*5);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map5.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-214, 392));
	var map6 = eim.getMapInstance(321112000);
	mobid = 9300705;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*5);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map6.spawnMonsterOnGroundBelow(mob, new java.awt.Point(292, -58));
	var map7 = eim.getMapInstance(321113000);
	mobid = 9300706;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*6);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map7.spawnMonsterOnGroundBelow(mob, new java.awt.Point(367, -268));
	var map8 = eim.getMapInstance(321114000);
	mobid = 9300707;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*10);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map8.spawnMonsterOnGroundBelow(mob, new java.awt.Point(620, 392));
	var map9 = eim.getMapInstance(321115000);
	mobid = 9300703;
    mob = em.getMonster(mobid);
	modified = em.newMonsterStats();
	modified.setOHp(mob.getMobMaxHp()*20);
	modified.setOMp(mob.getMobMaxMp()*999);
	mob.setOverrideStats(modified);
	map9.spawnMonsterOnGroundBelow(mob, new java.awt.Point(-117, 272));
    eim.startEventTimer(1000 * 60 * 10);
    em.setProperty("state", "1");
    return eim;
}


function playerEntry(eim, player) {
    var map = eim.getMapInstance(0);
    player.dropMessage(6, "[米纳尔森林] 进入到了挑战地图，请小心行事。");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[米纳尔森林] 真遗憾！已超过限定挑战时间，本次挑战失败！别气馁，期待更加强大的您前来挑战~");
    eim.disposeIfPlayerBelow(100, 910000000);
}

function cancelSchedule() {
}


function playerDead(eim, player) {
}




function playerRevive(eim, player) {
    var map = em.getMapFactory().getMap(910000000);
    if (map != null) {
        player.changeMap(map, map.getPortal(0));
    }
    eim.disposeIfPlayerBelow(100, 910000000);
    return false;
}


function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 321110000:
		case 321111000:
		case 321112000:
		case 321113000:
		case 321114000:
		case 321115000:
		case 321116000:
            return;
    }
	
    player.dropMessage(6, "[米纳尔森林] 已退出挑战。");
    eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 0) {
        eim.disposeIfPlayerBelow(100, 910000000);
    }
}


function playerExit(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
}



function playerDisconnected(eim, player) {
	eim.unregisterPlayer(player);
    if (eim.getPlayerCount() <= 1) {
        eim.disposeIfPlayerBelow(100, 910000000);
		if (setupTask!=null)
			setupTask.cancel(true);
        eim.dispose();
    }
    return 0;
}


function monsterValue(eim, mobid) {
    return 1;
}


function monsterKilled(eim, player, cp) {
}


function allMonstersDead(eim) {
    if (em.getProperty("state").equals("1")) {
		eim.setProperty("giftcount","0");
		roll(eim);
		eim.startEventTimer(1000 * 60 * 5);
		eim.broadcastPlayerMsg(6, "[米纳尔森林保卫战] 10秒后开启宝箱，掷点时请勿进行其他操作，并且需要在10秒钟内做出需求选择，否则将会被强制下线。");
		var map = eim.getMapInstance(321116000);
		map.startMapEffect("[米纳尔森林保卫战] 已通关，10秒后将开出宝箱。", 5120031);
	}
}

function roll(eim) {
	MaxRandom = 0;
	var count = eim.getProperty("giftcount");
	var rewardPlayer = null;
	//第二次开始,统计上一次ROLL点玩家结果，并发放奖励。
	if ((count*1)>=1) {
		for (var i = 0; i < eim.getPlayerCount(); i++) {
			var charName = eim.getPlayers().get(i).getName();
			var charId = eim.getPlayers().get(i).getId();
			//推送ROLL点信息
			for (var j = 0; j < eim.getPlayerCount(); j++) {
				var notice =  "[米纳尔森林保卫战] 玩家 "+charName+" 掷出了 "+eim.getProperty("charid_"+charId)+"点";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[米纳尔森林保卫战] 玩家 "+charName+" 放弃了掷点";
				}
				eim.getPlayers().get(j).dropMessage(6,notice);
			}
			//不断重置最大值
			if ((eim.getProperty("charid_"+charId)*1)>MaxRandom) {
				MaxRandom = eim.getProperty("charid_"+charId);
				//置换玩家名称
				eim.setProperty("rewardplayer", charName);
				//置换玩家ID
				eim.setProperty("rewardplayerid", charId);
			} 
   		}
		for (var j = 0; j < eim.getPlayerCount(); j++) {
			//操作NPC 发放奖励
			eim.getPlayers().get(j).openNpc(1052008, 1111);
		}
	}
	for (var j = 0; j < eim.getPlayerCount(); j++) {
		//重置所有玩家ROLL点点数为零
		eim.setProperty("charid_"+eim.getPlayers().get(j).getId(),"0");
	}
	//次数+1
	eim.setProperty("giftcount", (count*1+1));
	//重新读入次数
	count = eim.getProperty("giftcount");
	count = (count*1);
	//退出战场
	if ((count*1)>6) {
		EndThisBattle(eim);
		return;
	}
	//创建几率
	var chance = Math.floor(Math.random()*600);
	//最终物品列表
	var finalItemList = Array();
	for(var m=0; m<itemList.length; m++) {
		if (itemList[m][1] >= chance) {
			finalItemList.push(itemList[m][0]);
		}
	}
	var currentItem = finalItemList[Math.floor(Math.random()*finalItemList.length)];
	switch(count) {
		case 8:
		case 9:
		case 10:
			currentItem = 5062010;
		break;
	}
	eim.setProperty("rewarditem", currentItem);
	//延迟10秒打开ROLL点NPC
	setupTask = em.schedule("openRollNpc", 1000 * 5 * 1, eim);
}

function openRollNpc(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
		eim.getPlayers().get(i).openNpc(1052008);
    }
	//10秒后继续ROLL点
	setupTask = em.schedule("roll", 1000 * 5 * 1, eim);
}

function EndThisBattle(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[米纳尔森林保卫战] 挑战成功！");
    }
	//em.broadcastYellowMsg("[米纳尔森林保卫战] 挑战结束");
    em.setProperty("state", "done");
    eim.disposeIfPlayerBelow(100, 910000000);
	if (setupTask!=null)
		setupTask.cancel(true);
	eim.dispose();
}

function monsterDamaged(eim, player, mobid, damage) {
}

function cancelSchedule() {
	if (setupTask!=null)
		setupTask.cancel(true);
}

function leftParty(eim, player) {
    eim.disposeIfPlayerBelow(100, 910000000);
}


function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 910000000);
}


function onMapLoad(eim, player) {
}

function monsterDrop(eim, player, mob) {
}