/*
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * OX问答副本
 */
var questions = new Array(
        "一个人从飞机上掉下来，为什么没摔死呢？\r\nO:做梦\tX:玩具飞机", //true,
        "什么路最窄？\r\nO:冤家路窄\tX:地狱之路", //true,
	"书店里买不到什么书？\r\nO:证书\tX:遗书", //false,
	"打什么东西,不必花力气？\r\nO:打气\tX:打瞌睡", //false,
	"什么酒不能喝？\r\nO:汾酒\tX:碘酒", //false,
	"你知道上课睡觉有什么不好吗？\r\nO:学习不好\tX:没有床上舒服", //false,
        "哪一个月有二十八天？\r\nO:每月\tX:二月", //true,
	"什么车子寸步难行？\r\nO:没有轮子的自行车\tX:风车", //false,
	"小明从不念书却得了模范生,为什么？\r\nO:小明是富二代\tX:小明是聋哑学生", //false,
        "什么人始终不敢洗澡？\r\nO:泥人\tX:婴儿", //true,
        "什么事每人每天都必须认真的做？\r\nO:睡觉\tX:玩", //true,
        "你能做，我能做，大家都做；一个人能做，两个人不能一起做。这是做什么？\r\nO:做梦\tX:做游戏", //true,
        "不必花力气打的东西是什么？\r\nO:打哈欠\tX:打气筒", //true,
	"小华在家里，和谁长得最像？\r\nO:父亲\tX:自己", //false,
        "冬瓜、黄瓜、西瓜、南瓜都能吃，什么瓜不能吃？\r\nO:傻瓜\tX:木瓜", //true,
        "第一部编年体史书是哪个时代？\r\nO:春秋\tX:三国", //true,
	"第一部神话集？\r\nO:西游记\tX:山海经", //false,
	"第一部词典是？\r\nO:康熙词典\tX:尔雅", //false,
	"第一部字典是？\r\nO:康熙词典\tX:说文解字", //false,
	"第一部诗歌总集是？\r\nO:古诗\tX:诗经", //false,
	"第一部大百科全书是？\r\nO:百科全书\tX:永乐大点", //false,
        "冒险岛是什么游戏？\r\nO:卡通\tX:动漫", //true,
        "火车连续发出两声长鸣表示？\r\nO:前进\tX:停留", //true,
	"废弃塑料袋在自然界中自行降解需要多少年？\r\nO:至少500年\tX:至少300年", //false,
        "燕窝中最珍贵的是？\r\nO:血燕\tX:官燕", //true,
	"馒头起源于哪里？\r\nO:北方\tX:南方", //false,
        "最初“糖果”的糖取自？\r\nO:蜂蜜\tX:甘蔗", //true,
	"相传我国古代能作“掌上舞”的人是？\r\nO:貂蝉\tX:赵飞燕", //false,
	"树干为什么常常刷成白色？\r\nO:防寒\tX:灭菌", //false,
        "按照风俗习惯戒指带在中指上表示？\r\nO:恋爱中\tX:已婚", //true,
        "俗称“四不象”的动物是？\r\nO:麋鹿\tX:大象", //true,
        "举世闻名的泰姬陵在哪个国家？\r\nO:印度\tX:泰国", //true,
	"狗热时用什么散热？\r\nO:皮肤\tX:舌头", //false,
	"现在美国国旗星条旗上有多少颗星？\r\nO:60\tX:50", //false,
        "麦当劳的经营方式是什么？\r\nO:全球化的特许经营\tX:全球化的直营连锁", //true,
	"西印度群岛位于哪里？\r\nO:太平洋西部\tX:大西洋西部", //false,
	"竹子是什么？\r\nO:树\tX:草", //false,
        "光脚散步对小儿发育有好处吗？\r\nO:有\tX:没有", //true,
        "全世界最大的石佛像在哪里？\r\nO:四川乐山\tX:四川峨眉", //true,
        "小明自学了高中，又自学了大学，他的文凭是什么？\r\nO:自高自大\tX:自学成才", //true,
	"有人说1+1等于3正确吗？\r\nO:错\tX:对", //false,
        "点点冒险岛好玩吗？\r\nO:非常好玩\tX:好玩", //true,
	"冒险岛牧师是几级一转？\r\nO:10级\tX:8级", //false,
	"你爱点点吗？\r\nO:我不爱点点\tX:我爱点点", //false,
        "你喜欢点点吗？\r\nO:非常喜欢\tX:喜欢", //true,
        "仙人掌进行光合作用是依靠？\r\nO:叶\tX:花", //true,
        "世界上最高的立式佛像--巴米杨佛在哪个国家？\r\nO:阿富汗\tX:中国", //true,
	"世界上最大最贵的钻石藏在哪个国家？\r\nO:美国\tX:英国", //false,
	"从何时起，对最高统治者称“王”？\r\nO:三国\tX:商", //false,
        "什么时间吃水果比较好？\r\nO:饭前食用\tX:饭后食用", //true,
	"中国铁路车票一般分为几种？\r\nO:四种\tX:三种", //false,
	"中国抗日战争中，最早为抗击日寇牺牲的中国将领是？\r\nO:蒋介石\tX:赵登禹", //false,
	"飞机票头等舱的票价一般为普通舱票价的？\r\nO:200%\tX:150%", //false,
        "电灯丝断了，把灯泡晃了晃使灯丝又搭上了，再用时会发现？\r\nO:灯比原来亮了\tX:灯比原来暗了", //true,
        "土豆不宜存放在什么地方？\r\nO:日光照射处\tX:潮湿阴暗处", //true,
        "下面哪种酸，人在品尝时不是酸味的？\r\nO:单宁酸\tX:琥珀酸", //true,
	"下列哪种邮件如果丢失了，邮局不负赔偿责任？\r\nO:挂号信\tX:平信", //false,
	"人体含水量百分比最高的器官是？\r\nO:肝\tX:眼球", //false,
	"《在那遥远的地方》是哪里的民歌？\r\nO:陕西民歌\tX:青海民歌", //false,
        "博士作为官名最早出现在？\r\nO:秦朝\tX:唐朝", //true,
        "老三届指的是哪三年毕业的初、高中毕业生？\r\nO:1966-1968\tX:1986-1988", //true,
	"工笔是什么绘画形式的技法？\r\nO:水彩画\tX:国画", //false,
	"铁观音是哪里出产的名茶？\r\nO:安徽\tX:福建", //false,
        "蜂蜜用那种水冲泡更好？\r\nO:温水\tX:冰水", //true,
        "以下哪种菜系不属于中国八大菜系之列？\r\nO:鄂菜\tX:皖", //true,
        "黄瓜不宜与下列哪种食物搭配？\r\nO:番茄\tX:鸡蛋", // true,
        "黄鹤楼在什么地方？\r\nO:武汉\tX:广州", //true,
        "东方明珠是世界第几高塔？\r\nO:第四\tX:第六", //false,
        "火影忍者疾风传主角名字\r\nO:漩涡鸣人\tX:大蛇丸", //true
        "点点可爱吗？\r\nO:可爱\tX:非常可爱", //false
        "GTO麻辣教师是哪种类型的？\r\nO:动漫\tX动漫和电视剧", //false
        "夜间行车远光会造成什么影响？\r\nO:短暂性致盲\tX:毫无影响", //true
        "世界上最小的鸟是什么鸟？\r\nO:蜂鸟\tX:小燕子", //true
        "世界上跑得最快的是什么？\r\nO:金钱豹\tX:鸵鸟", //false
        "和谐号高铁最高时速能达到多少？\r\nO:300\tX:500", //false
        "阿苏顿马丁是什么？\r\nO:人名\tX:跑车", //false
        "LOL里的大龙叫全名叫什么？\r\nO:纳什男爵\tX:无敌大龙", //true
        "冒险岛里只有冒险家一种法师吗？\r\nO:是\tX:不是", //false
        "时速100码的汽车紧急制动需要多久能停？\r\nO:40-45秒\tX:50-60秒", //true
        "LOL里的堕落天使叫什么？\r\nO:堕天使\tX:莫甘娜", //false
        "老虎属于什么类动物？\r\nO:猫科动物\tX:爬行动物", //true
        "花儿为什么是香的？\r\nO:那是因为我\tX:那是因为你", //true
        "一直被模范从未被超越是为啥？\r\nO:太给力\tX:哥是你模仿不了的", //false
        "蒙奇?D?路飞的爷爷叫什么？\r\nO:蒙奇?D?卡普\tX:蒙奇?D?多拉格", //true
        "蒙奇?D?路飞跟谁学会的霸气？\r\nO:博雅汉库克\tX:冥王雷利", //false
        "泷泽萝拉是？\r\nO:模特\tX:日本女优", //false
        "中国死海位于哪里？\r\nO:四川\tX:重庆", //true
        "毛泽东故乡在哪里？\r\nO:长沙\tX:湘潭", //false
        "长隆水上乐园在哪里？\r\nO:广州\tX:深圳" //true
        );
var answers = new Array(true, true, false, false, false, false, true, false, false, true, true, true, true, false, true, true, false, false, false, false, false, true, true, false, true, false, true, false, false, true, true, true, false, false, true, false, false, true, true, true, false, true, false, false, true, true, true, false, false, true, false, false, false, true, true, true, false, false, false, true, true, false, false, true, true, true, true, false, true, false, false, true, true, false, false, false, true, false, true, false, true, true, false, true, false, false, true, false, true);

var asked = new Array();//判断已经回答的个数
var currentQuestion;
var eim;
var mapidPre = 910048000;//准备地图
var mapid = 910048100;//进行地图
var map;
var setupTask;
var setupTaskEvent;

function init() {
    scheduleNew();
    eim = em.newInstance("OXEvent")
    map = eim.getMapInstance(mapid);
    ResetProperty();
}

function ResetProperty() {
    em.setProperty("start", "0");
    em.setProperty("question", "0");
    em.setProperty("RightAnwser", "0");//得到问题的正确答案
    asked = Array();
    //map.resetFully();
    //setupTaskEvent.cancel(true);
}

function scheduleNew() {
    var cal = java.util.Calendar.getInstance();
    cal.set(java.util.Calendar.HOUR, 0);
    cal.set(java.util.Calendar.MINUTE, 0);
    cal.set(java.util.Calendar.SECOND, 0);
    var nextTime = cal.getTimeInMillis();
    while (nextTime <= java.lang.System.currentTimeMillis()) {
        nextTime += 1000 * 60 * 1;//1分钟检查一次时间
    }
    setupTask = em.scheduleAtTimestamp("startEvent", nextTime);
}

function cancelSchedule() {
    setupTask.cancel(true);
}


function startEvent() {
    if (em.getProperty("start") == "1") {//已经可以让后面的玩家进来了。
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();//如果活动地图没人，自动释放开启入口等待下一个人的进入。
            scheduleNew();
        } else {
            for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
                if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                    map.startMapEffect("现在有3分钟的时间等候其它玩家，请稍后！", 5121052);
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(180));//10秒
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 4);//问题显示NPC
                }
            }
            em.broadcastServerMsg("[OX宾果活动] OX宾果活动已经开始了，现在大约有3分钟的报名时间，请速度到拍卖报到！");
            em.setProperty("start", "2");//等待状态
            setupTaskEvent = em.schedule("WatingStatus", 1000 * 60 * 3, eim);//3分钟后检查问题
        }
    } else if (em.getProperty("start") == "3") {//关闭入口状态
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();//如果活动地图没人，自动释放开启入口等待下一个人的进入。
            scheduleNew();
            cancelSchedule();
        }
    } else if (em.getProperty("start") == "4") {//任务完成状态
        ResetProperty();//如果活动地图没人，自动释放开启入口等待下一个人的进入。
        scheduleNew();
    } else {
        ResetProperty();
        scheduleNew();
    }
}

function WatingStatus(eim) {
    if (em.getProperty("start") == "2") {//等待状态
        em.setProperty("start", "3");//关闭入口，不允许进入
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();
            scheduleNew();//再次循环
        }
        if (eim.getMapFactory().getMap(mapid).getCharactersThreadsafe() != 0) {//如果开始了的话
            setupTaskEvent = em.schedule("QuetionStart", 1000 * 10, eim);//10秒后检查问题
            for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
                if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(10));//10秒
                    //  eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "将在10秒后出题，请做好准备！");
                    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "将在10秒后出题，请做好准备！");
                }
            }
            // map.startMapEffect("将在10秒后出题，请做好准备！", 5121052);
        } else {
            ResetProperty();
            scheduleNew();//再次循环
        }
    } else {
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() == 0) {
            ResetProperty();
            scheduleNew();//再次循环
        }
    }
}

function QuetionStart(eim) {//问题提出部分
    if (asked.length != 20) {
        currentQuestion = Math.floor(Math.random() * questions.length);
        asked.push(currentQuestion);
        em.setProperty("question", currentQuestion);//得到问题的index
        for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 1);//问题显示NPC
            }
        }
        setupTaskEvent = em.schedule("AfterQuestion", 1000 * 15, eim);//15秒后检查问题
        for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(15));//15秒
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "将在15秒后检查问题！请站好正确的位置！");
                //    eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "将在15秒后检查问题！请站好正确的位置！");
            }
        }
        //map.startMapEffect("将在30秒后检查问题！请站好正确的位置！", 5121052);
    } else {//已经回答了20道题目
        for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
            if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
                eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "恭喜你获得全部的20问答积分!\r\n请跟甘迪对话离开地图！\r\n可跟甘迪对话用积分兑换奖励！");
            }
        }
        //9000308
        //eim.getMapInstance(mapid).spawnNpc(9000308, new java.awt.Point(-682, 394));
        em.setProperty("start", "4");//任务完成状态
        scheduleNew();//再次循环
    }
    em.setProperty("OXEventState", asked.length);
}

function AfterQuestion(eim) {//问题检查部分
    em.setProperty("question", currentQuestion);//得到问题的index
    for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
        eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 2);//问题检查NPC
    }
    for (var i = 0; i < eim.getMapFactory().getMap(mapid).getCharactersSize(); i++) {
        if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {
            //eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).openNpc(9000277, 2);//问题检查NPC
            eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(6, "将在5秒后再次出题！");
            // eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).dropMessage(1, "将在5秒后再次出题！");
            eim.getMapFactory().getMap(mapid).getCharactersThreadsafe().get(i).getClient().getSession().write(Packages.tools.MaplePacketCreator.getClock(5));//5
        }//避免报错
    }
    //map.startMapEffect("将在10秒后再次出题！", 5121052);
    if (eim.getMapFactory().getMap(mapid).getCharactersSize() != 0) {//避免报错
        setupTaskEvent = em.schedule("QuetionStart", 1000 * 5, eim);//5秒后再次出题
    } else {
        scheduleNew();//再次循环
        ResetProperty();
    }
}