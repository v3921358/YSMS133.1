/*
 脚本功能：物品回收
 */
importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);

var ttt6 ="#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var hwtext=new Array("人长得漂亮不如活得漂亮！","当裤子失去皮带，才懂得什麽叫做依赖。","烟不听话，所以我们'抽烟'。","你发怒一分钟，便失去60秒的幸福。","当男人遇见女人，从此只有纪念日，没有独立日。","路见不平一声吼，吼完继续往前走。","幸福是个比较级，要有东西垫底才感觉得到。","知识就像内裤，看不见但很重要","作为失败的典型，你实在是太成功了","女人喜欢长得坏坏的男人，不是喜欢长坏了的男人","跌倒了，爬起来再哭","你若流泪，先湿的是我的心","让未来到来，让过去过去","我自横刀向天笑，笑完之后去睡觉","别跟我谈感情，谈感情伤钱","孤单是一个人的狂欢，狂欢是一群人的孤单","姐不是收破烂的，做不到让你随喊随到","我不是草船，你的贱别往我这发","你的矮是终身的，我的胖却是暂时的","別在无聊的时候來找我，不然显得我是多余的","姐不是电视机，不要老是盯着姐看","即使你已名花有主、我也要移花接木","心里只有你一个频道 最可恨的是还没有广告","给你最大的报复，就是活的比你幸福","要不是老师说不能乱扔垃圾，不然我早把你扔出去","没有癞蛤蟆，天鹅也会寂寞","我是光棍我可耻，我给国家浪费纸","人生没有如果，只有后果和结果","你那么有钱 为什么不让鬼来推磨？","别把人和狗相提并论，狗最起码忠诚","生活嘛，就是生下来，活下去","当你披上了婚纱 我也披上了袈裟","趁着年轻把能干的坏事都干了吧，没几年了","我人生只会两件事 1 这也不会 2 那也不会","出租车司机，司机中的战斗机，噢耶! ","思想有多远，你就给我滚多远!","人生最大的悲哀是青春不在,青春痘却还在。","最简单的长寿秘决:保持呼吸，不要断气~","打死我也不说，你们还没使美人计呢!","不要和我比懒,我懒得和你比","我不是个随便的人 我随便起来不是人","不怕虎一样的敌人，就怕猪一样的队友","老虎不发威 你当我是HELLO KITTY！","吃自助最高境界：扶墙进，扶墙出。","爷爷都是从孙子走过来的……","夏天就是不好，穷的时候我连西北风都没得喝","没什么事就不要找我，有事了更不要找我。","我想早恋，可是已经晚了……","钱可以解决的问题都不是问题。","天哪，我的衣服又瘦了！","不吃饱哪有力气减肥啊？","连广告也信，读书读傻了吧？","人怕出名猪怕壮，男怕没钱女怕胖。","如果有钱也是一种错，我情愿一错再错","命运负责洗牌，但是玩牌的是我们自己！","好好活着，因为我们会死很久!","人又不聪明，还学人家秃顶！","我总在牛a与牛c之间徘徊。","不怕被人利用，就怕你没用。","鄙视我的人这么多，你算老几? ","秀发去无踪，头屑更出众！","春色满园关不住，我诱红杏出墙来。","问世间情为何物？一物降一物","bmw是别摸我，msn是摸死你","女为悦己者容,男为悦己者穷！ ","念了十几年书，还是幼儿园比较好混");
var ReturnPrice30 = 3000;//每件装备金币
var ReturnPrice51 = 5000;//每件装备金币
var ReturnPrice81 = 8000;//每件装备金币
var ReturnPrice111 = 10000;//每件装备金币
var ReturnPrice131 = 50000;//每件装备金币
//var ReturnPrice140 = 1000000;
//var ReturnPrice145 = 1200000;
//var ReturnPrice150 = 20000;
//var ReturnPrice160 = 10000;
var deleteSlot;
var deleteQuantity;
var nx = 0;
var ExcuteArray = Array();
var Item30 = Array(//这里添加30-50装备
1212002,
1212036

);//30-50级结束

var Item51 = Array(//这里添加51-80装备
1212003,
1212029

);//51-80级结束


var Item81 = Array(//这里添加81-110装备
1212006,
1212022

);//81-110级结束

var Item111 = Array(//这里添加111-130装备
//LEV: 113,
1372047,
1372048,


//LEV: 115,
1302108,
1302109,
1312040,
1312041,
1322062,
1322066,
1322067,
1332082,
1332083,
1382060,
1382063,
1382064,
1402054,
1402055,
1412036,
1412037,
1412040,
1422040,
1422041,
1432051,
1432052,
1432056,
1442068,
1442072,
1442073,
1442119,
1442120,
1452060,
1452063,
1452064,
1462057,
1462058,
1472078,
1472079,
1482035,
1482036,
1492031,
1002801,
1003579,
1003628,
1003661,
1003662,
1042243,
1052489,
1052490,
1052534,
1072679,
1072690,
1072691,
1072753,
1082246,
1082445,
1082447,
1082456,
1082457,
1112688,
1102206,
1102256,
1012331,
1012332,
1022148,
1032129,
1032156,
1122185,
1122208,
1132135,
1132182,
1142676,
1142677,
1142678,
1142679,
1152076,


//LEV: 117,
1112759,
1032158,
1122212,
1132185,
1152106,


//LEV: 118,
1372044,
1372045,
1372187,
1052156,
1052161,
1102207,


//LEV: 120,
1212011,
1212012,
1212015,
1212035,
1212052,
1212078,
1212099,
1212117,
1222011,
1222012,
1222015,
1222035,
1222048,
1222073,
1222093,
1222111,
1232011,
1232012,
1232015,
1232035,
1232073,
1232093,
1232111,
1242011,
1242012,
1242015,
1242035,
1242047,
1242079,
1242100,
1242118,
1252011,
1252012,
1252016,
1252020,
1252084,
1262009,
1262013,
1302081,
1302086,
1302149,
1302193,
1302200,
1302213,
1302288,
1302313,
1302336,
1312037,
1312038,
1312095,
1312099,
1312106,
1312112,
1312163,
1312183,
1312201,
1322060,
1322061,
1322135,
1322139,
1322146,
1322151,
1322214,
1322234,
1322253,
1332073,
1332074,
1332075,
1332076,
1332077,
1332126,
1332170,
1332177,
1332187,
1332188,
1332236,
1332258,
1332277,
1342011,
1342012,
1342059,
1342066,
1342098,
1342103,
1352803,
1362016,
1362017,
1362020,
1362061,
1362100,
1362119,
1362137,
1372080,
1372119,
1372126,
1372132,
1372205,
1372225,
1382057,
1382059,
1382102,
1382145,
1382152,
1382159,
1382221,
1382243,
1382263,
1402046,
1402047,
1402049,
1402091,
1402131,
1402138,
1402143,
1402184,
1402209,
1402234,
1402253,
1412033,
1412034,
1412094,
1412100,
1412145,
1412162,
1412180,
1422037,
1422038,
1422097,
1422103,
1422150,
1422169,
1422187,
1432047,
1432049,
1432084,
1432119,
1432126,
1432133,
1432177,
1432198,
1432216,
1422002,
1442063,
1442067,
1442087,
1442088,
1442113,
1442156,
1442164,
1442169,
1442171,
1442233,
1442252,
1442270,
1442057,
1452059,
1452107,
1452149,
1452156,
1452163,
1452215,
1452236,
1452255,
1462050,
1462051,
1462053,
1462094,
1462139,
1462146,
1462153,
1462203,
1462223,
1462241,
1472068,
1472071,
1472072,
1472118,
1472161,
1472168,
1472175,
1472224,
1472245,
1472263,
1482023,
1482024,
1482080,
1482122,
1482129,
1482136,
1482178,
1482200,
1482218,
1492023,
1492025,
1492047,
1492081,
1492122,
1492129,
1492136,
1492148,
1492189,
1492210,
1492233,
1522015,
1522016,
1522019,
1522056,
1522063,
1522067,
1522104,
1522122,
1522140,
1532015,
1532016,
1532019,
1532060,
1532067,
1532071,
1532107,
1532128,
1532146,
1542011,
1542012,
1542013,
1542014,
1542040,
1542057,
1542099,
1552011,
1552012,
1552013,
1552014,
1552057,
1552100,
1552104,
1562003,
1572003,
1002776,
1002777,
1002778,
1002779,
1002780,
1002790,
1002791,
1002792,
1002793,
1002794,
1003107,
1003154,
1003155,
1003156,
1003157,
1003158,
1003557,
1003689,
1003690,
1003691,
1003911,
1003938,
1004161,
1004214,
1004215,
1004216,
1004217,
1004218,
1004219,
1004220,
1004221,
1004222,
1004223,
1004549,
1050253,
1051309,
1052155,
1052157,
1052158,
1052159,
1052160,
1052162,
1052163,
1052164,
1052299,
1052300,
1052301,
1052302,
1052303,
1052466,
1052482,
1052545,
1052546,
1052547,
1052632,
1052633,
1052645,
1052784,
1052785,
1052786,
1052787,
1052788,
1052789,
1052790,
1052791,
1052792,
1052793,
1052952,
1071029,
1071029,
1072356,
1072357,
1072358,
1072359,
1072361,
1072362,
1072363,
1072364,
1072365,
1072471,
1072472,
1072473,
1072474,
1072475,
1072671,
1072687,
1072695,
1072696,
1072697,
1072776,
1072867,
1072952,
1072953,
1072954,
1072955,
1072956,
1072957,
1072958,
1072959,
1072960,
1072961,
1073077,
1082234,
1082235,
1082236,
1082237,
1082238,
1082239,
1082240,
1082241,
1082242,
1082243,
1082285,
1082286,
1082287,
1082288,
1082289,
1082392,
1082393,
1082394,
1082437,
1082453,
1082490,
1082491,
1082492,
1082535,
1082593,
1082594,
1082595,
1082596,
1082597,
1082598,
1082599,
1082600,
1082601,
1082602,
1082658,
1112574,
1112575,
1112576,
1112577,
1112578,
1112589,
1112673,
1112679,
1112782,
1112783,
1112784,
1112792,
1113072,
1113210,
1113226,
1102172,
1102262,
1102263,
1102264,
1102265,
1102266,
1102498,
1102499,
1102500,
1102556,
1102594,
1102606,
1102840,
1012213,
1012219,
1012225,
1012231,
1012237,
1012314,
1012339,
1012340,
1012341,
1012373,
1012535,
1012545,
1022155,
1022156,
1022157,
1022255,
1032031,
1032162,
1032163,
1032164,
1032220,
1032258,
1122000,
1122076,
1122076,
1122080,
1122090,
1122094,
1122098,
1122102,
1122106,
1122216,
1122217,
1122218,
1122248,
1122254,
1122264,
1122278,
1122312,
1122322,
1122336,
1132052,
1132062,
1132072,
1132082,
1132094,
1132095,
1132096,
1132097,
1132098,
1132114,
1132115,
1132187,
1132188,
1132189,
1132232,
1132243,
1132289,
1132294,
1142157,
1142354,
1142385,
1142394,
1142513,
1142531,
1142532,
1142533,
1142540,
1142804,
1152038,
1152039,
1152040,
1152041,
1152093,
1152114,
1152115,
1152116,
1152138,
1152170,
1152192,
1162034,
1162037,
1162039,
1162040,
1162041,
1162042,
1162043,
1162044,
1162045,
1162046,
1182175,
1092041,
1092042,
1092049,
1092057,
1092058,
1092059,


//LEV: 123,
1382173,


//LEV: 125,
1212016,
1212017,
1212018,
1222016,
1222017,
1222018,
1232016,
1232017,
1232018,
1242016,
1242017,
1242018,
1242051,
1252017,
1252018,
1252022,
1302173,
1302174,
1302175,
1312072,
1312073,
1312096,
1322107,
1322108,
1322136,
1332148,
1332149,
1332150,
1332151,
1332152,
1342040,
1342041,
1362021,
1362022,
1362023,
1372078,
1372100,
1372101,
1372102,
1382124,
1382125,
1382126,
1402111,
1402112,
1402113,
1412071,
1412072,
1422073,
1422074,
1432099,
1432100,
1432101,
1442136,
1442137,
1442138,
1452129,
1452130,
1452131,
1462118,
1462119,
1462120,
1472141,
1472142,
1472143,
1482102,
1482103,
1482104,
1492101,
1492102,
1492103,
1522020,
1522021,
1522022,
1532037,
1532038,
1532039,
1542033,
1542034,
1542035,
1552033,
1552034,
1552035,
1003280,
1003281,
1003282,
1003283,
1003284,
1003285,
1003286,
1003287,
1003288,
1003289,
1003290,
1003291,
1003292,
1003293,
1003294,
1003629,
1003663,
1003664,
1003665,
1003858,
1052374,
1052375,
1052376,
1052377,
1052378,
1052379,
1052380,
1052381,
1052382,
1052383,
1052384,
1052385,
1052386,
1052387,
1052388,
1052491,
1052492,
1052493,
1052535,
1072544,
1072545,
1072546,
1072547,
1072548,
1072549,
1072550,
1072551,
1072552,
1072553,
1072554,
1072555,
1072556,
1072557,
1072558,
1072692,
1072693,
1072694,
1072754,
1082328,
1082329,
1082330,
1082331,
1082332,
1082333,
1082334,
1082335,
1082336,
1082337,
1082338,
1082339,
1082340,
1082341,
1082342,
1082446,
1082458,
1082459,
1082460,
1102311,
1102312,
1102313,
1102314,
1102315,
1102316,
1102489,
1022175,
1032102,
1032103,
1032104,
1032108,
1032196,
1032197,
1032198,
1032199,
1132105,
1132106,
1132107,
1132108,
1132109,
1142409,
1092092,
1092093,
1092094,


//LEV: 126,
1112760,
1032159,
1122213,
1132186,
1152107,


//LEV: 127,
1302147,
1312062,
1322090,
1332120,
1332125,
1342033,
1382099,
1402090,
1412062,
1422063,
1432081,
1442111,
1452106,
1462091,
1472117,
1482079,
1492079,
1112439,
1032084,
1132040,
1092074,
1092079,
1092084,


//LEV: 130,
1212013,
1212034,
1212043,
1212060,
1212100,
1212102,
1222013,
1222034,
1222043,
1222055,
1222094,
1222096,
1232013,
1232034,
1232040,
1232055,
1232094,
1232096,
1242013,
1242034,
1242043,
1242045,
1242046,
1242052,
1242057,
1242058,
1242101,
1242103,
1252013,
1252019,
1252030,
1252059,
1252085,
1252087,
1262010,
1262014,
1302153,
1302207,
1302228,
1302264,
1302292,
1302314,
1302316,
1312066,
1312110,
1312117,
1312150,
1312168,
1312184,
1312186,
1322097,
1322150,
1322163,
1322199,
1322218,
1322235,
1322237,
1332131,
1332184,
1332194,
1332222,
1332241,
1332259,
1332261,
1342035,
1342064,
1342080,
1342099,
1362018,
1362056,
1362068,
1362087,
1362120,
1362122,
1372039,
1372040,
1372041,
1372042,
1372085,
1372130,
1372140,
1372174,
1372191,
1372206,
1372208,
1382105,
1382158,
1382169,
1382206,
1382225,
1382244,
1382246,
1402096,
1402142,
1402152,
1402191,
1402213,
1402235,
1402237,
1412066,
1412099,
1412105,
1412132,
1412150,
1412163,
1412179,
1422067,
1422102,
1422108,
1422136,
1422155,
1422170,
1422186,
1432087,
1432131,
1432139,
1432164,
1432181,
1432199,
1432201,
1442117,
1442170,
1442183,
1442219,
1442237,
1442253,
1442255,
1452112,
1452162,
1452171,
1452202,
1452219,
1452237,
1452239,
1462100,
1462152,
1462160,
1462190,
1462207,
1462224,
1462226,
1472123,
1472174,
1472180,
1472211,
1472229,
1472246,
1472248,
1482085,
1482135,
1482141,
1482165,
1482182,
1482201,
1482203,
1492086,
1492135,
1492153,
1492176,
1492193,
1492211,
1492213,
1522017,
1522064,
1522072,
1522091,
1522123,
1522125,
1532017,
1532068,
1532075,
1532095,
1532129,
1532131,
1542016,
1542039,
1542100,
1542102,
1552016,
1552039,
1552101,
1552103,
1562004,
1572004,
1003177,
1003178,
1003179,
1003180,
1003181,
1003448,
1003444,
1003445,
1003446,
1003447,
1003589,
1003590,
1003591,
1003592,
1003593,
1003770,
1003771,
1003772,
1003773,
1003774,
1003947,
1004224,
1004225,
1004226,
1004227,
1004228,
1004234,
1004235,
1004236,
1004237,
1004238,
1052319,
1052320,
1052321,
1052322,
1052323,
1052429,
1052430,
1052431,
1052432,
1052433,
1052498,
1052499,
1052500,
1052501,
1052502,
1052580,
1052581,
1052582,
1052583,
1052584,
1052794,
1052795,
1052796,
1052797,
1052798,
1052804,
1052805,
1052806,
1052807,
1052808,
1072490,
1072491,
1072492,
1072493,
1072494,
1072641,
1072642,
1072643,
1072644,
1072645,
1072703,
1072704,
1072705,
1072706,
1072707,
1072786,
1072787,
1072788,
1072789,
1072790,
1072962,
1072963,
1072964,
1072965,
1072966,
1072972,
1072973,
1072974,
1072975,
1072976,
1082300,
1082301,
1082302,
1082303,
1082304,
1082416,
1082417,
1082418,
1082419,
1082420,
1082466,
1082467,
1082468,
1082469,
1082470,
1082506,
1082507,
1082508,
1082509,
1082510,
1082603,
1082604,
1082605,
1082606,
1082607,
1082613,
1082614,
1082615,
1082616,
1082617,
1112579,
1112580,
1112581,
1112582,
1112584,
1112590,
1112662,
1112712,
1113016,
1113069,
1113071,
1113073,
1113094,
1113170,
1102280,
1102281,
1102282,
1102283,
1102284,
1102362,
1102363,
1102364,
1102365,
1102366,
1102445,
1102446,
1102447,
1102448,
1102449,
1102514,
1102515,
1102516,
1102517,
1102518,
1102713,
1102714,
1102715,
1102716,
1102717,
1012172,
1012214,
1012220,
1012226,
1012232,
1012238,
1012239,
1012252,
1012283,
1012406,
1012407,
1012408,
1012409,
1012410,
1032088,
1032089,
1032090,
1032091,
1032093,
1032110,
1032136,
1032218,
1032221,
1032241,
1122091,
1122095,
1122099,
1122103,
1122104,
1122148,
1122149,
1122261,
1122265,
1132053,
1132063,
1132073,
1132083,
1132085,
1132104,
1132141,
1132216,
1132244,
1142372,
1142541,
1142619,
1142871,
1142872,
1142873,
1142877,
1152046,
1152047,
1152048,
1152049,
1152079,
1152125,
1152135,
1152149,
1152150,
1152151,
1152152,
1182068,
1182087,
1092087,
1092088,
1092089

);//111-130级结束

var Item131 = Array(//这里添加131-139装备
//LEV: 135,
1212044,
1212072,
1212084,
1222044,
1222067,
1222079,
1232041,
1232064,
1232079,
1242044,
1242069,
1242070,
1242085,
1242086,
1252031,
1252062,
1252063,
1302070,
1302224,
1302248,
1312115,
1312125,
1312142,
1322100,
1322161,
1322181,
1332192,
1332205,
1332214,
1342070,
1342075,
1342079,
1362074,
1362081,
1362104,
1372137,
1372161,
1372168,
1382167,
1382192,
1382199,
1402150,
1402172,
1402185,
1412103,
1412122,
1412126,
1422106,
1422124,
1422129,
1432137,
1432150,
1432158,
1442181,
1442202,
1442209,
1452168,
1452189,
1452196,
1462157,
1462177,
1462184,
1472178,
1472197,
1472205,
1482139,
1482151,
1482159,
1492149,
1492162,
1492170,
1522078,
1522085,
1522108,
1532081,
1532089,
1532113,
1542060,
1552060

);//131-139级结束









/*
var Item140 = Array(
1152108,
1003172,
1102275,
1082295,
1052314,
1072485,
1232014,
1302152,
1312065,
1322096,
1402095,
1412065,
1422066,
1432086,
1442116,
1152110,
1003173,
1102276,
1082296,
1052315,
1072486,
1212014,
1372084,
1382104,
1152111,
1003174,
1102277,
1082297,
1052316,
1072487,
1452111,
1462099,
1522018,
1152112,
1003175,
1102278,
1082298,
1052317,
1072488,
1242042,
1332130,
1362019,
1472122,
1152113,
1003176,
1102279,
1082299,
1052318,
1072489,
1222014,
1242014,
1482084,
1492085,
1532018,
1003719,
1003720,
1003721,
1003722
);
var Item150 = Array(
1212063,
1222058,
1232057,
1242060,
1242061,
1302275,
1312153,
1322203,
1332225,
1342082,
1362090,
1372177,
1382208,
1402196,
1412135,
1422140,
1432167,
1442223,
1452205,
1462193,
1472214,
1482168,
1492179,
1522094,
1532098,
1252015,
1003797,
1003798,
1003799,
1003800,
1003801,
1042254,
1042255,
1042256,
1042257,
1042258,
1062165,
1062166,
1062167,
1062168,
1062169,
1132174,
1132175,
1132176,
1132177,
1132178,
1102481,
1102482,
1102483,
1102484,
1102485,
1082543,
1082544,
1082545,
1082546,
1082547,
1072743,
1072744,
1072745,
1072746,
1072747,
1132246,
1122267,
1032223,
1032223
);
var Item160 = Array(
1012438,
1022211,
1032224,
1122269,
1132247,
1152160,
1003976,
1102623,
1082556,
1052669,
1072870,
1212089,
1222084,
1232084,
1242090,
1302297,
1312173,
1322223,
1332247,
1342090,
1362109,
1372195,
1382231,
1402220,
1412152,
1422158,
1432187,
1442242,
1452226,
1462213,
1472235,
1482189,
1492199,
1522113,
1532118,
1252033

);*/
var returnType = -1;
			var count = 0;


function start() {
    a = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1)
            a++;
        else
            a--;
        if (a == -1) {
            cm.dispose();
        } else if (a == 0) {
			var hwchance= Math.floor(Math.random()*hwtext.length);
			var selStr = "#r幽默时刻:"+hwtext[hwchance]+"#k\r\n";
			selStr += "#d欢迎使用装备回收系统，请选择您需要的来进行回收。每回收一件装备可以获得相当不错的#r金币#d奖励。#k#n\r\n";
			//selStr += "#rPS:回收150装备可获得20000点卷奖励。回收160可获得10000点卷奖励。#k\r\n\r\n";
			selStr += "#bPS:回收装备不可逆，请慎重选择，重要装备请先存仓库。#k\r\n";
			selStr += "#bPS:回收装备不可逆，请慎重选择，重要装备请先存仓库。#k\r\n";
			selStr += "#r重要提示：嫌便宜的勿使用该功能，偷懒是需要付出代价的。#k\r\n";
			selStr += "#r重要提示：嫌便宜的勿使用该功能，偷懒是需要付出代价的。#k\r\n";

			//selStr += "#b#L0#"+ttt6+" 一键回收背包里140装备#k#l\r\n";
			//selStr += "#b#L1#"+ttt6+" 一键回收背包里150装备#k#l\r\n";
			//selStr += "#b#L2#"+ttt6+" 一键回收背包里160装备#k#l\r\n";
			selStr += "#b#L3#"+ttt6+" 一键回收背包里30-50装备#k#l\r\n";
			selStr += "#b#L4#"+ttt6+" 一键回收背包里51-80装备#k#l\r\n";
			selStr += "#b#L5#"+ttt6+" 一键回收背包里81-110装备#k#l\r\n";
			selStr += "#b#L6#"+ttt6+" 一键回收背包里111-130装备#k#l\r\n";
			selStr += "#b#L7#"+ttt6+" 一键回收背包里131-139装备#k#l\r\n";

			cm.sendSimple(selStr);
			//cm.sendSimple("123\r\n#L0# 回收140\r\n#L1# 回收150 \r\n#L2# 回收160")
		} else if (a == 1) {
			var text = "\t\t#e- 请选择要回收的道具 -#n\r\n\r\n#b";
			var itemList = cm.getInventory(1).list().iterator();
			var indexof = 0;
			var pass= false;
			returnType = selection;
			while (itemList.hasNext()) {
				var item = itemList.next();
            			/*if (returnType == 0){
					for (var i =0;i < Item140.length;i++){
						if (item.getItemId() == Item140[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 1){
					for (var i =0;i < Item150.length;i++){
						if (item.getItemId() == Item150[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 2){
					for (var i =0;i < Item160.length;i++){
						if (item.getItemId() == Item160[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}*/

//
				 if (returnType == 3){//30-50
					for (var i =0;i < Item30.length;i++){
						if (item.getItemId() == Item30[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 4){//51-80
					for (var i =0;i < Item51.length;i++){
						if (item.getItemId() == Item51[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 5){//81-110
					for (var i =0;i < Item81.length;i++){
						if (item.getItemId() == Item81[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 6){//111-130
					for (var i =0;i < Item111.length;i++){
						if (item.getItemId() == Item111[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}
				}else if (returnType == 7){//131-139
					for (var i =0;i < Item131.length;i++){
						if (item.getItemId() == Item131[i]){
							text += "#L"+item.getPosition()+"#  #v" + item.getItemId() + "#  #t" + item.getItemId() + "#\r\n";
							ExcuteArray.push(item.getItemId());
							count ++;
							pass = true;
						}
					}




				}
			}
			text += "\r\n#r#e#L1000# 全部回收！";
			if (pass){
			cm.sendSimple(text);
			}else{
				cm.sendOk("- #e#bGM警告：#n#k\r\n\r\n\t#r您这是坑爹呢，明明没有我想要的还来换，没见过您这么坑的。请获得后再来找我。请不要再坑我。#k");
				cm.dispose();
			}
		}else if (a == 2){
			if (selection != 1000){
				var item = cm.getInventory(1).getItem(selection);
        		deleteSlot = selection;
        		deleteQuantity = item.getQuantity();
        		text = "确定要回收#r#v" + item.getItemId() + "# #z" + item.getItemId() + "#   " + deleteQuantity + "个 #k吗？";
				cm.sendYesNo(text);
			}else{
				a = 3;
				cm.sendYesNo("#e你真的确定要回收掉所有的装备吗？！\r\n此操作不可逆请再次确认！")
			}
		}else if (a == 3){


			 	 if (returnType == 3){//30-50
				 nx = ReturnPrice30;
			 }else if (returnType == 4){//51-80
				 nx = ReturnPrice51;
			 }else if (returnType == 5){//81-110
				 nx = ReturnPrice81;
			 }else if (returnType == 6){//111-130
				 nx = ReturnPrice111;
			 }else if (returnType == 7){//131-139
				 nx = ReturnPrice131;


			 }
			 cm.removeSlot(1, deleteSlot, deleteQuantity);
			 //cm.gainNX(nx);
			cm.gainMeso(nx);
			 cm.sendOk("回收装备成功！一共获得了"+nx+"金币");
			 //cm.worldSpouseMessage(0x20, "『装备回收』 : 玩家 " + cm.getChar().getName() + "  回收装备成功获得 "+nx+" 金币！");
			 cm.dispose();
		}else if (a == 4){
			var text = "123\r\n"
			for (var i = 0; i < ExcuteArray.length;i++){
				cm.gainItem(ExcuteArray[i],-1);
			}
			/*if (returnType == 0){
				 nx = ReturnPrice140;
			 }else if (returnType == 1){
				 nx = ReturnPrice150;
			 }else if (returnType == 2){
				 nx = ReturnPrice160;*/

			  if (returnType == 3){//30-50
				 nx = ReturnPrice30;
			 }else if (returnType == 4){//51-80
				 nx = ReturnPrice50;
			 }else if (returnType == 5){//81-110
				 nx = ReturnPrice80;
			 }else if (returnType == 6){//111-130
				 nx = ReturnPrice111;
			 }else if (returnType == 7){//131-139
				 nx = ReturnPrice131;
			 }
			 nx = nx * count;
			cm.sendOk("回收所有装备成功！一共获得了"+nx+"金币");
			//cm.worldSpouseMessage(0x20, "『装备回收』 : 玩家 " + cm.getChar().getName() + "  回收装备成功获得 "+nx+" 金币！");
			//cm.gainNX(nx);
			cm.gainMeso(nx);
			cm.dispose();
		}//a
	}
}