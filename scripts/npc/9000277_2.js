/*
 * 菜菜制作 奇幻冒险岛工作室所有
 * 联系QQ：537050710
 * 欢迎定制各种脚本
 * OX问答副本  问题检查NPC
 */

var status = 0;
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
	"你爱薰衣草吗？\r\nO:我不爱薰衣草\tX:我爱薰衣草", //false,
        "你喜欢纯爱吗？\r\nO:非常喜欢\tX:喜欢", //true,
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

var em;

function start() {
    em = cm.getEventManager("OXEvent");
    if (em == null) {
        cm.sendOk("出现错误，请重新进入副本。");
    } else {
        var QuestionIndex = em.getProperty("question");
        if (QuestionIndex == null) {
            cm.sendOk("取回数据失败。");
        } else {
            CheckPlayerPosition(answers[parseInt(QuestionIndex)]);
        }
    }
}


function CheckPlayerPosition(answers) {//通过答案查看玩家的所站的位置是否正确
    var Xpos = cm.getPlayer().getTruePosition().getX();
    if (Xpos >= -562 && Xpos <= 150) {
        if (answers) {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("嗯……。回答错误，罚你出去！");
                cm.getNpcNotice(1540205, "真遗憾呢……！下次再接再厉吧！！", 10);//显示10秒
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        } else {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
            setEventPoints(20, cm.getPlayer().getId(), 1);
            cm.getPlayer().dropMessage(-1, "获取答题积分 x1！");
            cm.dispose();
        }
    } else if (Xpos >= -1500 && Xpos <= -802) {//O部分
        if (answers) {
            cm.showEffect(false, "quest/party/clear");
            cm.playSound(false, "Party1/Clear");
             setEventPoints(20, cm.getPlayer().getId(), 1);
            cm.getPlayer().dropMessage(-1, "获取答题积分 x1！");
            cm.dispose();
        } else {
            if (em.getProperty("OXEventState") > 5) {
                cm.warp(910000000, 0);//
                cm.sendOk("嗯……。回答错误，罚你出去！");
                cm.getNpcNotice(1540205, "真遗憾呢……！下次再接再厉吧！！", 10);//显示10秒
            } else {
                cm.showEffect(false, "quest/party/wrong_kor");
                cm.playSound(false, "Party1/Failed");
            }

            cm.dispose();
        }
    } else {//如果是咱在中立部分，就踢他出去这个
        if (em.getProperty("OXEventState") > 5) {
            cm.warp(910000000, 0);//
            cm.sendOk("嗯……。这是一个对或错的问题，你站中间是几个意思？");
            cm.getNpcNotice(1540205, "真遗憾呢……！下次再接再厉吧！！", 10);//显示10
        } else {
            cm.showEffect(false, "quest/party/wrong_kor");
            cm.playSound(false, "Party1/Failed");
            //cm.sendOk("嗯……。这是一个对或错的问题，你站中间是几个意思？");
        }
        cm.dispose();
    }
}



function DelEventPoints(Eventid, charid) {
    var delectData = cm.getConnection().prepareStatement("delete from EventTimes where eventid = " + Eventid + " and cid = " + charid + "");
    delectData.executeUpdate(); //删除数据
}

function getEventTimes(Eventid, charid) {//通过eventid来得到参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("times");//得到次数
    }
    return parseInt(i);
}

function getEventPoints(Eventid, charid) {//通过eventid来得到参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i = Times.getString("points");//得到点数
    }
    return parseInt(i);
}

function setEventPoints(Eventid, charid, points) {//通过eventid来给予参与这个活动的点数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, points);//points 点数
        insert.setString(6, getEventTimes(1, charid));//times 次数
        insert.setString(7, null);//
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set points = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventPoints(Eventid, charid) + points);
        update.executeUpdate();
    }
}

function setEventTimes(Eventid, charid, times) {//通过eventid来设置参与这个活动的次数
    var i = 0;
    var Times = cm.getConnection().prepareStatement("SELECT * FROM EventTimes where eventid = " + Eventid + " and cid = " + charid + "").executeQuery(); // 查询数据
    while (Times.next()) {
        i++;
    }
    if (i == 0) {//insert
        var insert = cm.getConnection().prepareStatement("INSERT INTO EventTimes VALUES(?,?,?,?,?,?,?)"); // 载入数据
        insert.setString(1, null); //载入记录ID
        insert.setString(2, Eventid); //载入活动ID
        insert.setString(3, cm.getPlayer().getId());//cid
        insert.setString(4, cm.getPlayer().getName());//cname
        insert.setString(5, getEventPoints(2, charid));//points 点数
        insert.setString(6, times);//times 次数
        insert.setString(7, null);//
        insert.executeUpdate(); //更新
    } else {//update
        var update = cm.getConnection().prepareStatement("update EventTimes set times = ? where eventid = " + Eventid + " and cid = " + charid + "");//更新为已使用
        update.setString(1, getEventTimes(Eventid, charid) + times);
        update.executeUpdate();
    }
}