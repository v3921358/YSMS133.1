/*
 ??о?????????ƹ?????????
 ????ʱ?䣺2013??8??21?? 20:51:15
 ?ű????ܣ?HOTTIME???ص????ӣ???ʾ???????ߣ?֮?????????? ????????ѡ??һ?????߲??????ͣ?
 */

var a = 0;
var luckyItem = Array();
var selectedItem;
var pass = true;
var needOnlineTime = 20;		//??Ҫ????ʱ??
var Allitem = Array(
        2001532, //ƻ??
        1482075, //һ??????֮?? ָ??
        1452104, //????????֮?͹?
        1312077, //??˵????ŭն
        1482076, //????????֮?? ָ??
        1312068, //ð?յ???ʯ??
        2040313, //????????????65%
        2040335, //????װ?????ݾ???65%
        2040337, //????װ??????????65%
        2040431, //????????????65%
        2040435, //????????????65%
        2040522, //ȫ?????????ݾ???65%
        2040528, //ȫ?????????˾???65%
        2040526, //ȫ??????????????65%
        2040540, //ȫ??????????????65%
        2040615, //??ȹ????????65%
        2040720, //Ь????Ծ????65%
        2040819, //???????ݾ???65%
        2040635, //??ȹ???ݾ???65%
        2040821, //???׹???????65%
        2040941, //????????????65%
        2041052, //????????????65%
        2040937, //????????????65%
        2041054, //???????ݾ???65%
        2041056, //???????˾???65%
        2043011, //???ֽ?????????65%
        2043106, //???ָ?????????65%
        2043206, //???ֶ???????????65%
        2043403, //????????????65%
        2043706, //????ħ??????65%
        2043306, //?̽?????????65%
        2043806, //????ħ??????65%
        2044006, //˫?ֽ?????????65%
        2044106, //˫?ָ?????????65%
        2044206, //˫?ֶ???????????65%
        2044218, //???ֶ??????о???65%
        2044306, //ǹ????????65%
        2044406, //ì????????65%
        2044506, //??????????65%
        2044606, //?󹥻?????65%
        2044706, //ȭ?׹???????65%
        2044811, //ȭ?׹???????65%
        2044813, //ָ?????о???65%
        2044906, //??ǹ????????65%
        2045206, //˫??ǹ??????????65%
        2049122, //50%??????
        2049118, //60%??????
        1322007, //Ƥ????????
        1322008, //007????
        1322009, //??Ͱ??
        1322010, //????????
        1322011, //????????
        1322012, //??ɫשͷ
        1322056, //??ɫ??????ӾȦ
        1322060, //???㾪????
        1322061, //??????????
        1322065, //ʥ????????ʹ????(???ֶ???)
        1322071, //?ɿ?????
        1332053, //Ұ???տ???
        1332057, //??Ҷ3????
        1332059, //??ɫ??????ӾȦ
        1332063, //?????????Ķ̽?
        1332066, //???ֹκ???
        1402006, //??ԭ֮??
        1402007, //???¾޵?
        1402008, //??????
        1402009, //ľ????
        1402010, //??????
        1402011, //?޼???
        1402012, //??????
        1402013, //???ս?
        1402015, //????ɽ??֮??
        3010079, //??èè????
        1442111, //????????֮??ì
        1442110, //ĩ??????֮??ì
        1432081, //????????֮??ǹ
        1422063, //????????֮??˫?ֶ???
        1412062, //????????֮??˫?ָ?
        1402090, //????????֮??˫?ֽ?
        1322090, //????????֮?͵??ֶ???
        1312062, //????????֮?͵??ָ?
        2045308, //???ڹ?????????65%


        // ???Ӳ???

        3010106,
//ѩ??ս??
//ս?????ѩ?ǡ?\nÿ10??HP??MP???ָ?50??

        3010107,
//?????ĵ?????
//????????ʱ??ÿ10???ָ?HP???????ĵ??ǡ???ֻ??????????ӵ?е????????ӡ?

        3010108,
//??????ǧ
//?????ζ?????ǧ?Ρ????????棬ÿ10??HP?ָ?40??MP?ָ?20??

        3010109,
//ů¯??
//???˸о???ů?????ӣ?ʹ?ú?ÿ10???ָ?HP 40??MP 20??

        3010110,
//???ʴ?????????
//???ŷǳ?????ů??ÿ10???ӻظ?HP??MP??50??

        3010111,
//????????
//??????????ӡ?????????ÿ10???ӿɻָ?HP50??MP30??

        3010112,
//????????
//?????????Ĺ???,?ʺ??͸????˵?????..\nÿ10???ӻָ?HP 50.

        3010113
//?Ļ귢????????
//ʹ?ú?ÿ10???ָ?HP 50??



        /*
         // ???ֲᲿ?֣?
         2290868,
         //Ӣ?۵????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿???????????Ӣ????????һ?????ֲᡣ
         2290869,
         //ʥ??ʿ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿???????????ʥ??ʿ??????һ?????ֲᡣ
         
         2290870,
         //????ʿ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ú???ʿ??????һ?????ֲᡣ
         
         2290871,
         //????ħ??ʦ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????û???ħ??ʦ??????һ?????ֲᡣ
         
         2290872,
         //????ħ??ʦ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ñ???ħ??ʦ??????һ?????ֲᡣ
         
         2290873,
         //???̵????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿?????????????????????һ?????ֲᡣ
         
         2290874,
         //?????ֵ????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿???????????????????????һ?????ֲᡣ
         
         2290875,
         //?????????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ü?????????һ?????ֲᡣ
         
         2290876,
         //?????????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿?????????????????????һ?????ֲᡣ
         
         2290877,
         //??ʿ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿?????????????ʿ??????һ?????ֲᡣ
         
         2290878,
         //??Ӱ˫???????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ð?Ӱ˫????????һ?????ֲᡣ
         
         2290879,
         //?????ӳ??????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ó????ӳ???????һ?????ֲᡣ
         
         2290880,
         //?????????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ô?????????һ?????ֲᡣ
         
         2290881,
         //?????ֵ????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????û???????????һ?????ֲᡣ
         
         2290882,
         //ս???????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿???????????ս????????һ?????ֲᡣ
         
         2290883,
         //?????????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿?????????????????????һ?????ֲᡣ
         
         2290884,
         //˫???????????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿???????????˫????????????һ?????ֲᡣ
         
         2290885,
         //??ħ???ֵ????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ö?ħ??????????һ?????ֲᡣ
         
         2290886,
         //???鶷ʦ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????û??鶷ʦ??????һ?????ֲᡣ
         
         2290887,
         //?????????????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ñ?????????????һ?????ֲᡣ
         
         2290888,
         //??еʦ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????û?еʦ??????һ?????ֲᡣ
         
         2290889,
         //??Ӱ?????????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????û?Ӱ??????һ?????ֲᡣ
         
         2290890,
         //ҹ?ⷨʦ?????ص????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿???????????ҹ?ⷨʦ??????һ?????ֲᡣ
         
         2290891,
         //????սʿ???????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ÿ???սʿ??????һ?????ֲᡣ
         
         2290892
         //????????ʹ???????ֲ?
         //δ֪?????????ֲᡣ˫???󣬿??????????ñ???????ʹ??????һ?????ֲᡣ
         */
        )

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
			if (cm.getPlayer().getTodayOnlineTime() < needOnlineTime) {
				cm.sendNextS("????ǰ????ʱ?䲻??#r" + needOnlineTime + "#k????,?޷??????û,\r\n??#r" + (needOnlineTime - cm.getPlayer().getTodayOnlineTime()) + "#k???Ӻ?????.", 3);
				cm.dispose();
				return;
			}
            if (cm.getBossLog('HOTTIME???ص?????') >= 1) {
                cm.sendNextS("?????㲻???ٲμ???????ˡ?\r\n???ص????ӻһ??ֻ?ܽ???һ?Ρ?", 3)
                cm.dispose();
                return;
            }
            for (var i = 1; i < 5; i++) {
                if (cm.getSpace(i) < 1) {
                    pass = false;
                }
            }
            if (pass) {
                var text = " #e?????ҿ?????ȡ??????ƷΪ??#n\r\n#r  - ????ϸ??????Ҫ??װ?????Ժ???????Ŀ¼??\r\n  - ????Ŀ¼???ĵ??߽????ʺ???????ʾ??\r\n  - ??ʱֻҪ????????Ҫ???ʺ????ӣ??Ϳ?????ȡ?????ˣ?\r\n\r\n#b";
                Allitem.sort(function() {
                    return 0.5 - Math.random()
                })//???????ҵ??߳?
                for (var i = 0; i < Allitem.length; i++) {
                    if (i % 5 == 0 && i % 3 == 0) {
                        luckyItem.push(Allitem[i]);//?ض????㲿?ּ??ص? ????ȡ????????
                    }
                }
                for (var i = 0; i < luckyItem.length; i++) {
                    text += "#i" + luckyItem[i] + "# #z" + luckyItem[i] + "#\r\n"
                }
                cm.sendNextS(text, 3)
                cm.setBossLog('HOTTIME???ص?????')
            } else {
                cm.sendOk("???????????б??????ճ?һ?????ӡ?")
                cm.dispose();
            }
        } else if (a == 1) {
            luckyItem.sort(function() {
                return 0.5 - Math.random()
            })//???????ҵ??߳?
            var text = "?????Ľ?Ʒ???????˿??ɵ????ӣ????ұ??????ˡ?\r\n?ף????????ĸ??أ?\r\n\r\n#b"
            for (var i = 0; i < luckyItem.length; i++) {
                text += "#L" + i + "##fUI/UIWindow.img/QuestIcon/5/0#    ?򿪱?֪??!#l\r\n"

            }
            cm.sendSimpleS(text, 3)
        } else if (a == 2) {
            var n = selection + 1
            var text = "?Ҹղ?ѡ?????ǵ?" + n + "??????.?????????????????ĵ????ܳ?????:\r\n - ??????һ????ȡ??Ʒ??\r\n\r\n#b"
            selectedItem = luckyItem[selection]
            for (var i = 0; i < luckyItem.length; i++) {
                if (selection == i) {
                    text += "#e#i" + luckyItem[i] + "#    #z" + luckyItem[i] + "#   (??ѡ???????? )\r\n#n"
                } else {
                    text += "#i" + luckyItem[i] + "#    #z" + luckyItem[i] + "#\r\n"
                }
            }
            cm.sendNextS(text, 3)
        } else if (a == 3) {
            cm.gainItem(selectedItem, 1);
            cm.sendOk("?ɹ????????ӣ??????͸????? #b#t" + selectedItem + "##k??")
            cm.dispose();
        }//a
    }//mode
}//f