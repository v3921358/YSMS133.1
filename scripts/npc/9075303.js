var status = -1;

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			cm.dispose();
		}
		status--;
	}
	if (status == 0) {
		if (cm.getPlayer().getMapId() == 350060200) {
			cm.sendYesNo("?ұ???????Ѫ?????Ǳ????Ǵ?????????");
		} else {
			cm.sendOk("?Ǻǡ?");
			cm.safeDispose();
		}
	} else if (status == 1) {
		if ((cm.getSpace(1) > 1 || cm.getSpace(2) > 1 || cm.getSpace(3) > 1 || cm.getSpace(4) > 1)) {
			cm.gainNX(2, 10000);//???þ?
			cm.gainNX(1, 5000);//????
			cm.gainItem(4310156, 1);//???ձ?
			cm.gainItem(2049124, 1);//??????
			var item;
			var chance1 = Math.floor(Math.random() * 1000);
			if (chance1 < 50) {
				var itemList = new Array(5750000, 5062500, 5062009, 5062010, 2049116, 2049124);
				item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 5, "????÷????", 3);
			} else if (chance1 >= 50 && chance1 <= 100) {
				var itemList = new Array(4001485, 4001714, 4001715);
				item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 3, "????÷????", 3);
			} else if (chance1 > 100 && chance1 <= 200) {
				var itemList = new Array(
				/*140?????Ѿ?ȡ????ֱ?Ӹ????????ıسɾ????;??˾?
				1003172, // ʨ??ս??ͷ??
				1542015, 
				1102275, // ʨ??ս??????
				1082295, // ʨ??ս??????
				1052314, // ʨ??ս?????Ӽ?
				1072485, // ʨ??ս??Ь
				1003173, // ??β??ʦñ??
				1102276, // ??β??ʦ????
				1082296, // ??β??ʦ????
				1052315, // ??β??ʦ????
				1072486, // ??β??ʦЬ
				1003174, // ӥ???ڱ???ñ
				1102277, // ӥ???ڱ?????
				1082297, // ӥ???ڱ?????
				1052316, // ӥ???ڱ???
				1072487, // ӥ???ڱ?Ь
				1003175, // ??ѻ֮??׷????ñ
				1102278, // ??ѻ֮??????????
				1082298, // ??ѻ֮??׷????????
				1052317, // ??ѻ֮??׷???߿???
				1072488, // ??ѻ֮??׷????Ь
				1003176, // ???ݴ???ñ
				1102279, // ???ݴ???????
				1082299, // ???ݴ???????
				1052318, // ???ݴ???????
				1072489, // ???ݴ???Ь
				1432086, // ʨ?ĳ?ǹ
				1442116, // ʨ?ĳ?ì
				1322096, // ʨ??????
				1422066, // ʨ?ľ޴?
				1402095, // ʨ??ս??
				1412065, // ʨ??ս??
				1302152, // ʨ???䵶
				1312065, // ʨ???¸?
				1372084, // ??β????
				1382104, // ??β????
				1452111, // ӥ???ع?
				1462099, // ӥ??????
				1332130, // ??ѻ֮?꣨?̵???
				1472122, // ??ѻ֮??
				1342036, // ?????ǵ?
				1492085, // ????????
				1532018, // ????ӥצ
				1302016, // ???ݻ???
				1522018 // ??????ǹ
							*/
//?????سɾ?
2043003,
2043103,
2043203,
2043303,
2043703,
2043803,
2044003,
2044103,
2044203,
2044303,
2044403,
2044503,
2044603,
2044703,
2044815,
2044908,//?????سɾ?????
//??????
2340000,//ף????
5064000,//????????
2049132,//???˻???????30%
2049133,//???˻???????50%
2049135,//???????????????? 20%
2049137 //???????????????? 40%
				);
				item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "????÷????", 3);
			} else if (chance1 > 200 && chance1 <= 995) {//??????????90%???ң?????װ??????
				var itemList = new Array(
				
				1212077, // ?޽??ڼ?????, // (??????)
				1222072, // ?޽???ʹ????, // (??????)
				1232071, // ?޽?????ʹ??, // (??????)
				1402204, // ?޽??޽?, // (??????)
				1242076, // ?޽?????֮??, // (??????)
				1302285, // ?޽?ս??, // (??????)
				1312162, // ?޽?ս?????⸫, // (??????)
				1322213, // ?޽???ս????, // (??????)
				1332235, // ?޽?С??????, // (??????)
				1342084, // ?޽?С??, // (??????)
				1362099, // ?޽?????, // (??????)
				1372186, // ?޽?а????, // (??????)
				1382220, // ?޽?ս??????, // (??????)
				1412144, // ?޽?ս??, // (??????)
				1422149, // ?޽?ս??, // (??????)
				1432176, // ?޽?ս??֮ì, // (??????)
				1442232, // ?޽?????֮??, // (??????)
				1452214, // ?޽?ս????, // (??????)
				1462202, // ?޽???, // (??????)
				1472223, // ?޽????ּ?, // (??????)
				1482177, // ?޽?ʨ??ȭצ, // (??????)
				1492188, // ?޽??޾?֮ǹ, // (??????)
				1522103, // ?޽?ӥ??ǹ, // (??????)
				1532106, // ?޽?????, // (??????)
				1542075, // ?޽???ʿ??, // (??????)
				1252058, // ?޽?????ħ????, // (??????)
				1552075, // ?޽???, // (??????)
				1113055, // ?޽?֮??, // (??????)
				1032200, // ?޽?????, // (??????)
				1152154, // ?޽?????, // (??????)
//ñ??
1003797, //- ?߹?սʿͷ??, //- (??????)
1003798, //- ?߹?????ά??ñ, //- (??????)
1003799, //- ?߹?????????ñ, //- (??????)
1003800, //- ?߹??̿???ñ, //- (??????)
1003801, //- ?߹???????ñ, //- (??????)

//????
1042254, //- ӥ??սʿ????, //- (??????)
1042255, //- ӥ?۵?ά?泤??, //- (??????)
1042256, //- ӥ??????????, //- (??????)
1042257, //- ӥ?۴̿ͳ???, //- (??????)
1042258, //- ӥ????????????, //- (??????)

//????
1062165, //- ħ??ʦսʿ?̿?, //- (??????)
1062166, //- ħ??ʦ??ά???̿?, //- (??????)
1062167, //- ħ??ʦ?????̿?, //- (??????)
1062168, //- ħ??ʦ?̿Ͷ̿?, //- (??????)
1062169, //- ħ??ʦ?????߶̿?, //- (??????)

//150????
1212057,//, //- ????Ů????ѣ????,//, //- (??????)
1222052,//, //- ??յ?????ĺ?????,//, //- (??????)
1232072,//, //- ???յ???᰽?,//, //- (??????)
1242077,//, //- ??ҹ?????????׽?,//, //- (??????)
1242078,//, //- ??յ?????ĺ??׽?,//, //- (??????)
1252056,//, //- ????Ů??????????,//, //- (??????)
1302229,//, //- ???յĴ??ƽ?,//, //- (??????)
1312118,//, //- ???յ????¸?,//, //- (??????)
1322164,//, //- ???յĽ?????,//, //- (??????)
1332195,//, //- ??ҹ??????նɱ??,//, //- (??????)
1342071,//, //- ??ҹ??????ն????,//, //- (??????)
1362069,//, //- ??ҹ?????Ĳҹ???,//, //- (??????)
1372141,//, //- ????Ů????ȴ????,//, //- (??????)
1382170,//, //- ????Ů????ħ????,//, //- (??????)
1402153,//, //- ???յ????꽣,//, //- (??????)
1412106,//, //- ???յĹ??׸?,//, //- (??????)
1422109,//, //- ???յ?????????,//, //- (??????)
1432140,//, //- ???յķ?????,//, //- (??????)
1442184,//, //- ???յ???????ն,//, //- (??????)
1452172,//, //- ??ɽ?o???Ļ??깭,//, //- (??????)
1462161,//, //- ??ɽ?o???Ĵ?ͨ????,//, //- (??????)
1472181,//, //- ??ҹ?????Ĳ?ħȭ,//, //- (??????)
1482142,//, //- ??յ?????Ĳ?Ѫ??ǧ,//, //- (??????)
1492154,//, //- ??յ???????׼?ǹ,//, //- (??????)
1522073,//, //- ??ɽ?o??????????,//, //- (??????)
1532076,//, //- ??յ?????ĺ?????,//, //- (??????)
1542045,//, //- ???յĴ???,//, //- (??????)
1552045,//, //- ????Ů???ĳ໨????,//, //- (??????)

//150ñ??
1003601,//, //- ???յ?ͷ??,//, //- (??????)
1003602,//, //- ??ɽ?o????ñ??,//, //- (??????)
1003603,//, //- ????Ů????ñ??,//, //- (??????)
1003604,//, //- ??ҹ??????ñ??,//, //- (??????)
1003605,//, //- ??յ??????ͷ??,//, //- (??????)

//150?·?
1052509,//, //- ???յ?????,//, //- (??????)
1052510,//, //- ??ɽ?o????????,//, //- (??????)
1052511,//, //- ????Ů????????,//, //- (??????)
1052512,//, //- ??ҹ??????????,//, //- (??????)
1052513,//, //- ??յ??????????,//, //- (??????)
1052531,//, //- ??????????,//, //- (??????)

//150????
1082472,//, //- ???յ?????,//, //- (??????)
1082473,//, //- ??ɽ?o????????,//, //- (??????)
1082474,//, //- ????Ů????????,//, //- (??????)
1082475,//, //- ??ҹ??????????,//, //- (??????)
1082476,//, //- ??յ??????????,//, //- (??????)
1082442,//, //- ????????????,//, //- (??????)
1082443,//, //- ????֮?ֻ?,//, //- (??????)

//150Ь??
1072711,//, //- ???յ?Ь??,//, //- (??????)
1072712,//, //- ??ɽ?o????Ь??,//, //- (??????)
1072713,//, //- ????Ů????Ь??,//, //- (??????)
1072714,//, //- ??ҹ??????Ь??,//, //- (??????)
1072715,//, //- ??յ??????Ь??,//, //- (??????)

//150????
1102456,//, //- ???յ?????,//, //- (??????)
1102457,//, //- ??ɽ?o????????,//, //- (??????)
1102458,//, //- ????Ů????????,//, //- (??????)
1102459,//, //- ??ҹ??????????,//, //- (??????)
1102460,//, //- ??յ??????????,//, //- (??????)

//150????
1132156,//, //- ???յ?????,//, //- (??????)
1132157,//, //- ??ɽ?o????????,//, //- (??????)
1132158,//, //- ????Ů????????,//, //- (??????)
1132159,//, //- ??ҹ??????????,//, //- (??????)
1132160,//, //- ??յ??????????,//, //- (??????)

//150????
1152094,//, //- ???յļ???,//, //- (??????)
1152095,//, //- ??ɽ?o???ļ???,//, //- (??????)
1152096,//, //- ????Ů???ļ???,//, //- (??????)
1152097,//, //- ??ҹ?????ļ???,//, //- (??????)
1152098//, //- ??յ?????ļ???,//, //- (??????)
				);
				item = cm.gainGachaponItem(itemList[Math.floor(Math.random() * itemList.length)], 1, "????÷????", 3);
			} else {
				var itemList = new Array(5062002, 5062500, 5062009, 5062010, 2049116, 2049124);
				var itemid = itemList[Math.floor(Math.random() * itemList.length)];
				item = cm.gainGachaponItem(itemid, 1, "????÷????", 3);
			}
			if (item != -1) {
				cm.warp(910000000);
				cm.dispose();
			} else {
				cm.sendOk("????ȷ???ڱ?????װ??,????,???????????Ƿ???һ?????ϵĿռ??");
			}
		} else {
			cm.sendOk("xx????");
		}
		cm.safeDispose();
	}
}