importPackage(net.sf.odinms.server.maps);

var status = 0;
var qty = -1;


//玩具组
var itemget = new Array(1092022, 1002743, 1102040, 1102041, 1102042, 1102043, 1302013, 1302021, 1302024, 1302049, 1312002, 1312012, 1322009, 1332032, 1332053, 1432013);
//图腾1
var itemtx = new Array(1202030, 1202034, 1202038, 1202026);

//图腾需要物品1
var needthingtx = new Array(

Array(Array(4031996, 1), Array(4007000, 50), Array(4001126, 100)),

Array(Array(4031996, 1), Array(4007000, 50), Array(4001126, 100)),

Array(Array(4031996, 1), Array(4007000, 50), Array(4001126, 100)),

Array(Array(4031996, 1), Array(4007000, 50), Array(4001126, 100))

);

//图腾2
var itemtx1 = new Array(1202029, 1202033, 1202037, 1202025);

//图腾需要物品2
var needthingtx1 = new Array(

Array(Array(4031995, 1), Array(4007001, 50), Array(4001126, 200)),

Array(Array(4031995, 1), Array(4007001, 50), Array(4001126, 200)),

Array(Array(4031995, 1), Array(4007001, 50), Array(4001126, 200)),

Array(Array(4031995, 1), Array(4007001, 50), Array(4001126, 200))

);

//图腾3
var itemtx2 = new Array(1202028, 1202032, 1202036, 1202024);

//图腾需要物品3
var needthingtx2 = new Array(

Array(Array(4031994, 1), Array(4007004, 50), Array(4001126, 300)),

Array(Array(4031994, 1), Array(4007004, 50), Array(4001126, 300)),

Array(Array(4031994, 1), Array(4007004, 50), Array(4001126, 300)),

Array(Array(4031994, 1), Array(4007004, 50), Array(4001126, 300))

);

//图腾4
var itemtx3 = new Array(1202000,1202001,1202002,1202003);

//图腾需要物品4
var needthingtx3 = new Array(

Array(Array(1202028, 1), Array(1202029, 1),Array(1202030, 1)),

Array(Array(1202032, 1), Array(1202033, 1),Array(1202034, 1)),

Array(Array(1202036, 1), Array(1202037, 1),Array(1202038, 1)),

Array(Array(1202024, 1), Array(1202025, 1),Array(1202026, 1))


);

//徽章1
var itemtx4 = new Array(1142393,1142409,1142340,1142345);

//徽章1需要物品4
var needthingtx4 = new Array(

Array(Array(1142503, 1), Array(1142504, 1),Array(1142496, 1)),

Array(Array(1142502, 1), Array(1142501, 1),Array(1142496, 1)),

Array(Array(1142500, 1), Array(1142574, 1),Array(1142496, 1)),

Array(Array(1142502, 1), Array(1142574, 1),Array(1142496, 1))


);


//装备1
var itemtx5 = new Array(1112428,1003540,1122197,1132152,1032142,1052460,1112738,1012319);

//装备1需要物品4
var needthingtx5 = new Array(

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007000, 88)),

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007000, 88)),

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007000, 88)),

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007001, 88)),

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007001, 88)),

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007001, 88)),

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007004, 88)),

Array(Array(1142393, 1), Array(1142409, 1),Array(1142340, 1),Array(1142345, 1),Array(1202000, 1),Array(1202001, 1),Array(1202002, 1),Array(1202003, 1),Array(4007004, 88))


);


//玩具组需要物品
var needthing = new Array(

Array(Array(4000169, 200), Array(4000188, 200), Array(4000187, 200), Array(4001126, 500), Array(4033220, 1)),

Array(Array(4032312, 300), Array(4000059, 300), Array(4000169, 400), Array(4000188, 500), Array(4000187, 300), Array(4001126, 1000), Array(4033220, 3)),

Array(Array(4000059, 300), Array(4000169, 300), Array(4000188, 300), Array(4000187, 300), Array(4001126, 800), Array(4033220, 2)),

Array(Array(4000059, 500), Array(4000169, 500), Array(4000188, 500), Array(4000187, 500), Array(4001126, 1500), Array(4033220, 5)),

Array(Array(4000059, 300), Array(4000169, 300), Array(4000188, 300), Array(4000187, 300), Array(4001126, 800), Array(4033220, 2)),

Array(Array(4000059, 300), Array(4000169, 300), Array(4000188, 300), Array(4000187, 300), Array(4001126, 800), Array(4033220, 2)),

Array(Array(4000169, 100), Array(4000188, 100), Array(4000187, 200), Array(4001126, 500), Array(4033220, 1)),

Array(Array(4000169, 100), Array(4000188, 150), Array(4000187, 200), Array(4001126, 500), Array(4033220, 1)),

Array(Array(4000169, 200), Array(4000188, 250), Array(4000187, 300), Array(4001126, 800), Array(4033220, 2)),

Array(Array(4032312, 300), Array(4000059, 500), Array(4000169, 300), Array(4000188, 300), Array(4001126, 1000), Array(4033220, 3)),

Array(Array(4000169, 100), Array(4000188, 100), Array(4000187, 100), Array(4001126, 500), Array(4033220, 1)),

Array(Array(4000169, 50), Array(4000188, 80), Array(4000187, 150), Array(4001126, 500), Array(4033220, 1)),

Array(Array(4000169, 50), Array(4000188, 50), Array(4000187, 70), Array(4001126, 500), Array(4033220, 1)),

Array(Array(4000169, 300), Array(4000188, 400), Array(4000187, 400), Array(4001126, 800), Array(4033220, 2)),

Array(Array(4000169, 330), Array(4000188, 280), Array(4000187, 350), Array(4001126, 1000), Array(4033220, 3)),

Array(Array(4000169, 300), Array(4000188, 300), Array(4000187, 450), Array(4001126, 800), Array(4033220, 2))

);





//卷轴组
var itemgetqc = new Array(
2340000, 2040807, 2040303, 2040506, 2040710, 2043003, 2043303, 2043703, 2043803, 2044003, 2044019, 2044303, 2044403, 2044503, 2044603, 2044703, 2044815, 2044908,2045202,2043411,2043610,2045212);

//卷轴需要物品Array(4004000,5),
var needthingqc = new Array(

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2040805, 1), Array(2040804, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2040302, 1), Array(2040301, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2040502, 1), Array(2040501, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2040705, 1), Array(2040704, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2043002, 1), Array(2043001, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2043302, 1), Array(2043301, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2043702, 1), Array(2043701, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2043802, 1), Array(2043801, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044002, 1), Array(2044001, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044014, 1), Array(2044012, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044302, 1), Array(2044301, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044402, 1), Array(2044401, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044502, 1), Array(2044501, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044602, 1), Array(2044601, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044702, 1), Array(2044701, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044802, 1), Array(2044801, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044902, 1), Array(2044901, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2044802, 1), Array(2044801, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2043302, 1), Array(2043301, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2043302, 1), Array(2043301, 1), Array(4033220, 1)),

Array(Array(4004000, 10), Array(4004001, 10), Array(4004002, 10), Array(4004003, 10), Array(2043302, 1), Array(2043301, 1), Array(4033220, 1)));






//椅子组
var itemgetyz = new Array(3010006, 3010007, 3010008, 3010009, 3010010, 3010016, 3010017, 3010018, 3010024, 3010025, 3010051, 3010052);

//椅子组需要物品
var needthingyz = new Array(

Array(Array(4000132, 100), Array(4000282, 130), Array(4003005, 200), Array(4001126, 400), Array(4033220, 1)),

Array(Array(4000132, 300), Array(4000282, 380), Array(4003005, 400), Array(4001126, 500), Array(4033220, 2)),

Array(Array(4000132, 300), Array(4000282, 380), Array(4003005, 400), Array(4001126, 500), Array(4033220, 2)),

Array(Array(4000132, 300), Array(4000282, 380), Array(4003005, 400), Array(4000471, 400), Array(4001126, 1000), Array(4033220, 3)),

Array(Array(4000132, 300), Array(4000282, 300), Array(4003005, 300), Array(4001126, 500), Array(4033220, 2)),

Array(Array(4000132, 300), Array(4000282, 300), Array(4003005, 300), Array(4001126, 500), Array(4033220, 2)),

Array(Array(4000132, 300), Array(4000282, 300), Array(4003005, 300), Array(4001126, 500), Array(4033220, 2)),

Array(Array(4000132, 150), Array(4000282, 200), Array(4003005, 200), Array(4001126, 400), Array(4033220, 1)),

Array(Array(4000132, 100), Array(4000282, 100), Array(4003005, 150), Array(4001126, 250), Array(4033220, 1)),

Array(Array(4000132, 150), Array(4000282, 200), Array(4003005, 200), Array(4001126, 400), Array(4033220, 2)),

Array(Array(4000132, 300), Array(4000282, 380), Array(4003005, 400), Array(4000471, 400), Array(4001126, 750), Array(4033220, 2)),

Array(Array(4000132, 300), Array(4000282, 380), Array(4003005, 400), Array(4000471, 400), Array(4001126, 750), Array(4033220, 2)));




//徽章组
var itemgethz = new Array(1142503, 1142504, 1142502, 1142501, 1142500, 1142574, 1142496);
//徽章组需要物品
var needthinghz = new Array(

Array(Array(4000132, 300), Array(4000059, 300), Array(4000169, 208), Array(4000188, 258), Array(4000187, 208), Array(4001126, 300), Array(4033220, 10)),

Array(Array(4000132, 300), Array(4000059, 300), Array(4000169, 208), Array(4000188, 258), Array(4000187, 208), Array(4001126, 300), Array(4033220, 10)),

Array(Array(4000132, 300), Array(4000059, 300), Array(4000169, 208), Array(4000188, 258), Array(4000187, 208), Array(4001126, 300), Array(4033220, 10)),

Array(Array(4000132, 300), Array(4000059, 300), Array(4000169, 208), Array(4000188, 258), Array(4000187, 208), Array(4001126, 300), Array(4033220, 10)),

Array(Array(4000132, 300), Array(4000059, 300), Array(4000169, 208), Array(4000188, 258), Array(4000187, 208), Array(4001126, 300), Array(4033220, 10)),

Array(Array(4000132, 300), Array(4000059, 300), Array(4000169, 208), Array(4000188, 258), Array(4000187, 208), Array(4001126, 300), Array(4033220, 10)),

Array(Array(4000132, 300), Array(4000059, 300), Array(4000169, 208), Array(4000188, 258), Array(4000187, 208), Array(4001126, 300), Array(4033220, 10))


);


function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 0 && mode == 0) {
            cm.sendOk("下次如果需要制作装备请来找我哦!");
            cm.dispose();
            return;
        }
        if (mode == 1) status++;
        else status--;



        if (status == 0) {
            cm.sendSimple("你想制作装备嘛?但是我不是每天都能按时工作,呼呼.但是做出来的装备可能发生意想不到的变化！嗯,比如说#b做出两件#k,但是也有一定几率发生失败。失误失误难免的嘛~\r\n#L118##e我想制作充值人民币800装备【火】\r\n   #v1112428##v1003540##v1122197##v1132152##v1032142##v1052460##v1112738##v1012319##b#l\r\n#L66##e我想制作徽章【火爆】#b#l\r\n\r\n#L0##b我想制作玩具#l     #L2#我想制作椅子#l\r\n#L60##e#r我想做全属性10-108徽章[新]#v1142393#↓↓#b#l\r\n#L23##e#r我想制作全属性10-50图腾[木]【火】#v1202030#↓↓#b#l\r\n#L24##e#r我想制作全属性20-50图腾[银]【火】#v1202029#↓↓还有#b#l\r\n#L25##e#r我想制作全属性30-50图腾[金]【火】#v1202028#↓↓#b#l\r\n#L26##e#r我想制作人物后面漂浮全属性带攻击的88-388图腾全属性带攻击[僵尸]【火】#v1202001##b#l");


        } else if (status == 1) {
            if (selection == 0) {
                status = 3;
                var smed = "";
                for (var i = 0; i < itemget.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemget[i] + "##l";
                }
                cm.sendSimple("以下是我能为你制作的玩具:" + smed);


            } else if (selection == 1) {
                status = 2;
                var smed = "";
                for (var i = 0; i < itemgetqc.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemgetqc[i] + "##l";
                }
                cm.sendSimple("以下是我能为你制作的卷轴:" + smed);

            } else if (selection == 66) {
                status = 67;
                var smed = "";
                for (var i = 0; i < itemgethz.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemgethz[i] + "##l";
                }
                cm.sendSimple("以下是我能为你制作的新徽章:" + smed);



            } else if (selection == 2) {
                status = 6;
                var smed = "";
                for (var i = 0; i < itemgetyz.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemgetyz[i] + "##l";
                }
                cm.sendSimple("以下是我能为你制作的椅子:\r\n椅子每周都会更新一批哟" + smed);
            } else if (selection == 23) {
                status = 28;
                var smed = "";
                for (var i = 0; i < itemtx.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemtx[i] + "##l";
                }
                cm.sendSimple("以下是我能为你制作的图腾:\r\n图腾制作出来属性为全属性(10~50)" + smed);
            } else if (selection == 24) {
                status = 33;
                var smed = "";
                for (var i = 0; i < itemtx1.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemtx1[i] + "##l";
                }
                cm.sendSimple("以下是我能为你制作的图腾:\r\n图腾制作出来属性为全属性(20~50)" + smed);
            } else if (selection == 25) {
                status = 36;
                var smed = "";
                for (var i = 0; i < itemtx2.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemtx2[i] + "##l";
                }
                cm.sendSimple("以下是我能为你制作的图腾:\r\n图腾制作出来属性为全属性(30~50)" + smed);
			    } else if (selection == 26) {
                status = 40;
                var smed = "";
                for (var i = 0; i < itemtx3.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemtx3[i] + "##l";
                }               
				cm.sendSimple("以下是我能为你制作人物漂浮的图腾:\r\n图腾制作出来属性为全属性唯一带攻击还没绝版哦抓紧时间(88~388)" + smed);
			} else if (selection == 60) {
                status = 61;
                var smed = "";
                for (var i = 0; i < itemtx4.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemtx4[i] + "##l";					
                }    
				cm.sendSimple("以下是我能为你制作独特的徽章:\r\n徽章制作出来属性为全属性唯一带攻击还没绝版哦抓紧时间(10~108)" + smed);
			    } else if (selection == 118) {
                status = 119;
                var smed = "";
                for (var i = 0; i < itemtx5.length; i++) {
                    smed += "\r\n#L" + i + "##b#z" + itemtx5[i] + "##l";
                }            
				cm.sendSimple("以下是我能为你制作充值800奖励:\r\n充值800奖励制作出来属性为全属性唯一带攻击还没绝版哦抓紧时间(888~1800)" + smed);
            }

        } else if (status == 2) {
            if (cm.getMeso() < 1500) {
                cm.sendNext("你金币好像不够吧？多赚点钱再来吧。你可以把你穿的衣服卖掉……或者在海边打猎，怪物会掉落金币……赚钱的办法很多呀！");
                cm.dispose();
            } else {
                cm.gainMeso(-1500);
                cm.getChar().saveLocation(SavedLocationType.FLORINA);
                cm.warp(110000000, 0);
                cm.dispose();
            }



        } else if (status == 3) {
            status = 5;
            var prompt = "";
            prompt += "#v" + itemgetqc[selection] + "##b#z" + itemgetqc[selection] + "##k制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingqc[selection].length; m++) {
                prompt += " #v" + needthingqc[selection][m][0] + "##z" + needthingqc[selection][m][0] + "# #b" + needthingqc[selection][m][1] + " #k个\r\n";
            }
            prompt += "\r\n#v4033220##z4033220#在每个小时的挑战粉扎掉落哟\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);

        } else if (status == 5) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthing[qty].length; i++) {
                if (!cm.haveItem(needthing[qty][i][0], needthing[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemgetqc[qty])) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间。";
            } else {
                for (var i = 0; i < needthing[qty].length; i++) {
                    cm.gainItem(needthing[qty][i][0], -needthing[qty][i][1]);
                }
                cm.gainItem(itemget[qty], 1);
                prompt += "成功换取#b:#z" + itemget[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();

            } else if (status == 29) {
            status = 30;
            var prompt = "";
            prompt += "#v" + itemtx[selection] + "##b#z" + itemtx[selection] + "##k10~50全属性制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingtx[selection].length; m++) {
                prompt += " #v" + needthingtx[selection][m][0] + "##z" + needthingtx[selection][m][0] + "# #b" + needthingtx[selection][m][1] + " #k个\r\n\r\n";
            }
            prompt += "100修为点(挂在市场每分钟增加)\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);

        } else if (status == 31) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingtx[qty].length; i++) {
                if (!cm.haveItem(needthingtx[qty][i][0], needthingtx[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemtx[qty]) || cm.getXw() < 100) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间和足够的修炼点";
            } else {
                for (var i = 0; i < needthingtx[qty].length; i++) {
                    cm.gainItem(needthingtx[qty][i][0], -needthingtx[qty][i][1]);
                }
                randxlslot = Math.floor(Math.random() * 8) + 18;
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(itemtx[qty]); //帽子
                var toDrop = ii.randomizeStats(ii.getEquipById(itemtx[qty])).copy(); // 生成一个Equip类
                toDrop.setStr(randxlslot); //装备力量
                toDrop.setDex(randxlslot); //装备敏捷
                toDrop.setInt(randxlslot); //装备智力
                toDrop.setLuk(randxlslot); //装备运气
                cm.setLock(toDrop);
                cm.getPlayer().getInventory(type).addItem(toDrop); //将这个装备放入包中
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包
                cm.setXw(cm.getXw() - 100);
                cm.worldMessage("『图腾系统』：恭喜" + cm.getChar().getName() + "，在市场凯茜处制作了图腾[木]");
                prompt += "成功换取#b:#z" + itemtx2[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();

        } else if (status == 34) {
            status = 35;
            var prompt = "";
            prompt += "#v" + itemtx1[selection] + "##b#z" + itemtx1[selection] + "##k20~50全属性制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingtx1[selection].length; m++) {
                prompt += " #v" + needthingtx1[selection][m][0] + "##z" + needthingtx1[selection][m][0] + "# #b" + needthingtx1[selection][m][1] + " #k个\r\n\r\n";
            }
            prompt += "200修为点(挂在市场每分钟增加)\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);

        } else if (status == 36) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingtx1[qty].length; i++) {
                if (!cm.haveItem(needthingtx1[qty][i][0], needthingtx1[qty][i][1])) {
                    complete = false;
                }
            }
			if (!complete || !cm.canHold(itemtx1[qty]) || cm.getXw() < 200) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间和足够的修炼点";
            } else {
                for (var i = 0; i < needthingtx1[qty].length; i++) {
                    cm.gainItem(needthingtx1[qty][i][0], -needthingtx1[qty][i][1]);
                }
                randxlslot = Math.floor(Math.random() * 12) + 25;
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(itemtx1[qty]); //帽子
                var toDrop = ii.randomizeStats(ii.getEquipById(itemtx1[qty])).copy(); // 生成一个Equip类
                toDrop.setStr(randxlslot); //装备力量
                toDrop.setDex(randxlslot); //装备敏捷
                toDrop.setInt(randxlslot); //装备智力
                toDrop.setLuk(randxlslot); //装备运气
                cm.setLock(toDrop);
                cm.getPlayer().getInventory(type).addItem(toDrop); //将这个装备放入包中
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包
                cm.setXw(cm.getXw() - 200);
                cm.worldMessage("『图腾系统』：恭喜" + cm.getChar().getName() + "，在市场凯茜处制作了图腾[银]");
                prompt += "成功换取#b:#z" + itemtx1[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();

        } else if (status == 37) {
            status = 38;
            var prompt = "";
            prompt += "#v" + itemtx2[selection] + "##b#z" + itemtx2[selection] + "##k30~50全属性制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingtx2[selection].length; m++) {
                prompt += " #v" + needthingtx2[selection][m][0] + "##z" + needthingtx2[selection][m][0] + "# #b" + needthingtx2[selection][m][1] + " #k个\r\n\r\n";
            }
            prompt += "300修为点(挂在市场每分钟增加)\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);

        } else if (status == 39) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingtx2[qty].length; i++) {
                if (!cm.haveItem(needthingtx2[qty][i][0], needthingtx2[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemtx2[qty]) || cm.getXw() < 300) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间和足够的修炼点";
            } else {
                for (var i = 0; i < needthingtx2[qty].length; i++) {
                    cm.gainItem(needthingtx2[qty][i][0], -needthingtx2[qty][i][1]);
                }
                randxlslot = Math.floor(Math.random() * 19) + 25;
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(itemtx2[qty]); //帽子
                var toDrop = ii.randomizeStats(ii.getEquipById(itemtx2[qty])).copy(); // 生成一个Equip类
                toDrop.setStr(randxlslot); //装备力量
                toDrop.setDex(randxlslot); //装备敏捷
                toDrop.setInt(randxlslot); //装备智力
                toDrop.setLuk(randxlslot); //装备运气
                cm.setLock(toDrop);
                cm.getPlayer().getInventory(type).addItem(toDrop); //将这个装备放入包中
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包
                cm.setXw(cm.getXw() - 300);
                cm.worldMessage("『图腾系统』：恭喜" + cm.getChar().getName() + "，在市场凯茜处制作了图腾[金]");
                prompt += "成功换取#b:#z" + itemtx2[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();
			
	    } else if (status == 41) {
            status = 42;
            var prompt = "";
            prompt += "#v" + itemtx3[selection] + "##b#z" + itemtx3[selection] + "##k88~388全属性制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingtx3[selection].length; m++) {
                prompt += " #v" + needthingtx3[selection][m][0] + "##z" + needthingtx3[selection][m][0] + "# #b" + needthingtx3[selection][m][1] + " #k个\r\n\r\n";
            }
            prompt += "1888修为点(挂在市场每分钟增加)\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);

        } else if (status == 43) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingtx3[qty].length; i++) {
                if (!cm.haveItem(needthingtx3[qty][i][0], needthingtx3[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemtx3[qty]) || cm.getXw() < 1888) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间和足够的修炼点";
            } else {
                for (var i = 0; i < needthingtx3[qty].length; i++) {
                    cm.gainItem(needthingtx3[qty][i][0], -needthingtx3[qty][i][1]);
                }
                randxlslot = Math.floor(Math.random() * 88) + 212;
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(itemtx3[qty]); //帽子
                var toDrop = ii.randomizeStats(ii.getEquipById(itemtx3[qty])).copy(); // 生成一个Equip类
                toDrop.setStr(randxlslot); //装备力量
                toDrop.setDex(randxlslot); //装备敏捷
                toDrop.setInt(randxlslot); //装备智力
                toDrop.setLuk(randxlslot); //装备运气
		toDrop.setMatk(randxlslot);//攻击
                toDrop.setWatk(randxlslot);//魔法攻击
                cm.setLock(toDrop);
                cm.getPlayer().getInventory(type).addItem(toDrop); //将这个装备放入包中
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包
                cm.setXw(cm.getXw() - 1888);
                cm.worldMessage("『僵尸图腾系统』：恭喜" + cm.getChar().getName() + "，在市场凯茜处制作了漂浮【僵尸图腾】");
                prompt += "成功换取#b:#z" + itemtx3[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();
			
		} else if (status == 62) {
            status = 63;
            var prompt = "";
            prompt += "#v" + itemtx4[selection] + "##b#z" + itemtx4[selection] + "##k10~108全属性制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingtx4[selection].length; m++) {
                prompt += " #v" + needthingtx4[selection][m][0] + "##z" + needthingtx4[selection][m][0] + "# #b" + needthingtx4[selection][m][1] + " #k个\r\n\r\n";
            }
            prompt += "1888修为点(挂在市场每分钟增加)\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);

        } else if (status == 64) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingtx4[qty].length; i++) {
                if (!cm.haveItem(needthingtx4[qty][i][0], needthingtx4[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemtx4[qty]) || cm.getXw() < 1888) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间和足够的修炼点";
            } else {
                for (var i = 0; i < needthingtx4[qty].length; i++) {
                    cm.gainItem(needthingtx4[qty][i][0], -needthingtx4[qty][i][1]);
                }
                randxlslot = Math.floor(Math.random() * 13) + 66;
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(itemtx4[qty]); //帽子
                var toDrop = ii.randomizeStats(ii.getEquipById(itemtx4[qty])).copy(); // 生成一个Equip类
                toDrop.setStr(randxlslot); //装备力量
                toDrop.setDex(randxlslot); //装备敏捷
                toDrop.setInt(randxlslot); //装备智力
                toDrop.setLuk(randxlslot); //装备运气
				toDrop.setMatk(randxlslot);
                toDrop.setWatk(randxlslot);
                cm.setLock(toDrop);
                cm.getPlayer().getInventory(type).addItem(toDrop); //将这个装备放入包中
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包
                cm.setXw(cm.getXw() - 1888);
                cm.worldMessage("『徽章全属性』：恭喜" + cm.getChar().getName() + "，在市场凯茜处制作了【全属性的徽章】");
                prompt += "成功换取#b:#z" + itemtx4[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();
			
			} else if (status == 120) {
            status = 121;
            var prompt = "";
            prompt += "#v" + itemtx5[selection] + "##b#z" + itemtx5[selection] + "##k888~1800全属性制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingtx5[selection].length; m++) {
                prompt += " #v" + needthingtx5[selection][m][0] + "##z" + needthingtx5[selection][m][0] + "# #b" + needthingtx5[selection][m][1] + " #k个\r\n\r\n";
            }
            prompt += "228888修为点(挂在市场每分钟增加)\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);

        } else if (status == 122) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingtx5[qty].length; i++) {
                if (!cm.haveItem(needthingtx5[qty][i][0], needthingtx5[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemtx5[qty]) || cm.getXw() < 228888) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间和足够的修炼点";
            } else {
                for (var i = 0; i < needthingtx5[qty].length; i++) {
                    cm.gainItem(needthingtx5[qty][i][0], -needthingtx5[qty][i][1]);
                }
                randxlslot = Math.floor(Math.random() * 888) + 888;
                var ii = Packages.server.MapleItemInformationProvider.getInstance();
                var type = Packages.constants.GameConstants.getInventoryType(itemtx5[qty]); //帽子
                var toDrop = ii.randomizeStats(ii.getEquipById(itemtx5[qty])).copy(); // 生成一个Equip类
                toDrop.setStr(randxlslot); //装备力量
                toDrop.setDex(randxlslot); //装备敏捷
                toDrop.setInt(randxlslot); //装备智力
                toDrop.setLuk(randxlslot); //装备运气
		toDrop.setMatk(randxlslot);
                toDrop.setWatk(randxlslot);
                cm.setLock(toDrop);
                cm.getPlayer().getInventory(type).addItem(toDrop); //将这个装备放入包中
                cm.getC().getSession().write(Packages.tools.MaplePacketCreator.addInventorySlot(type, toDrop)); //刷新背包
                cm.setXw(cm.getXw() - 228888);
                cm.worldMessage("『全属性充值RMB装备』：恭喜" + cm.getChar().getName() + "，在市场凯茜处制作了【充值RMB装备】");
                prompt += "成功换取#b:#z" + itemtx5[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();



        } else if (status == 4) {
            var prompt = "";
            prompt += "#v" + itemget[selection] + "##b#z" + itemget[selection] + "##k制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthing[selection].length; m++) {
                prompt += " #v" + needthing[selection][m][0] + "##z" + needthing[selection][m][0] + "# #b" + needthing[selection][m][1] + " #k个\r\n";
            }
            prompt += "\r\n#v4033220##z4033220#在每个小时的挑战粉扎掉落哟\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);



        } else if (status == 6) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingqc[qty].length; i++) {
                if (!cm.haveItem(needthingqc[qty][i][0], needthingqc[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemgetqc[qty])) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间。";
            } else {
                for (var i = 0; i < needthingqc[qty].length; i++) {
                    cm.gainItem(needthingqc[qty][i][0], -needthingqc[qty][i][1]);
                }
                cm.gainItem(itemgetqc[qty], 1);
                prompt += "成功换取#b:#z" + itemgetqc[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();


        } else if (status == 7) {
            var prompt = "";
            prompt += "#v" + itemgetyz[selection] + "##b#z" + itemgetyz[selection] + "##k制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthingyz[selection].length; m++) {
                prompt += " #v" + needthingyz[selection][m][0] + "##z" + needthingyz[selection][m][0] + "# #b" + needthingyz[selection][m][1] + " #k个\r\n";
            }
            prompt += "\r\n#v4033220##z4033220#在每个小时的挑战粉扎掉落哟\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);



        } else if (status == 8) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthingyz[qty].length; i++) {
                if (!cm.haveItem(needthingyz[qty][i][0], needthingyz[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemgetyz[qty])) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间。";
            } else {
                for (var i = 0; i < needthingyz[qty].length; i++) {
                    cm.gainItem(needthingyz[qty][i][0], -needthingyz[qty][i][1]);
                }
                cm.gainItem(itemgetyz[qty], 1);
                prompt += "成功换取#b:#z" + itemgetyz[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();



        } else if (status == 68) {
            var prompt = "";
            prompt += "#v" + itemgethz[selection] + "##b#z" + itemgethz[selection] + "##k制作需要：";
            prompt += "\r\n\r\n";
            for (var m = 0; m < needthinghz[selection].length; m++) {
                prompt += " #v" + needthinghz[selection][m][0] + "##z" + needthinghz[selection][m][0] + "# #b" + needthinghz[selection][m][1] + " #k个\r\n";
            }
            prompt += "\r\n#v4033220##z4033220#在每个小时的挑战粉扎掉落哟\r\n确定收集好了以上物品吗？";
            qty = selection;
            cm.sendYesNo(prompt);



        } else if (status == 69) {
            var prompt = "";
            var complete = true;
            for (var i = 0; i < needthinghz[qty].length; i++) {
                if (!cm.haveItem(needthinghz[qty][i][0], needthinghz[qty][i][1])) {
                    complete = false;
                }
            }
            if (!complete || !cm.canHold(itemgethz[qty])) {
                prompt += "请你确认有需要的物品或背包的其它窗口有空间。";
            } else {
                for (var i = 0; i < needthinghz[qty].length; i++) {
                    cm.gainItem(needthinghz[qty][i][0], -needthinghz[qty][i][1]);
                }
                cm.gainItem(itemgethz[qty], 1);
                prompt += "成功换取#b:#z" + itemgethz[qty] + "#.";
            }
            cm.sendOk(prompt);
            cm.dispose();


        }
    }
}