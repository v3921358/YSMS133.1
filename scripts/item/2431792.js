function start() {
        im.gainItem(2431792, -1);
		im.gainItem(2430865, 1, 30);//会员30天
		//im.gainItem(5211060, 1, 2 * 60 * 60 * 1000);// 三倍经验
		//im.gainItem(5360015, 1, 2 * 60 * 60 * 1000);// 双爆
		//im.gainItem(2000005, 300);// 超级药水
		//im.gainItem(5150040, 5);// 皇家理发
		//im.gainItem(5152053, 5);// 皇家整容
		//im.gainItem(5153015, 1);// 万能护肤
		//im.gainItem(5050000, 100);// 洗血的能力值
		//im.gainItem(5060000, 3);// 装备刻名 X3
		//im.gainItem(1112918, 1, 1);// 回归戒指 X1 24小时
		//im.gainItem(5072000, 10);// 高质地喇叭
		//im.gainItem(1702308, 1);//花枝芽
		//im.gainItem(1004636, 1);// 香蕉郊游帽
		//im.gainItem(1052762, 1);// 香蕉背带套装
		//im.gainItem(1072153, 1);// 透明鞋子
		//im.gainItem(1082102, 1);//透明手套
		//im.gainItem(1102039, 1);// 透明披风
		//im.gainItem(1012057, 1);// 透明面具
		//im.gainItem(1022048, 1);// 透明眼饰
		//im.gainItem(1032024, 1);// 透明耳环
		//im.gainItem(1112134, 1);//小竹林名片戒指
		//im.gainItem(1112237, 1);//小竹林聊天戒指
		//im.gainItem(1112196, 1, 1);//彩糖名片戒指
		//im.gainItem(1115009, 1, 1);//彩糖聊天戒指
		//im.gainItem(1102723, 1, 2 * 60 * 60 * 1000);//光明天使羽翼
		//im.gainItem(3010025, 1);//  5周年枫叶纪念凳
		//im.gainItem(3010100, 1);// 财神椅子
		//im.gainItem(3010849, 1);// 最佳新人椅子
		//im.gainItem(3010012, 1);// 剑士 宝座
		//im.gainItem(3010018, 1);// 椰子树沙滩椅
		//im.gainItem(3010075, 1);// 我为音乐狂
		//im.gainItem(3010195, 1);// 无价之宝椅子
		//im.gainItem(3010168, 1);// 友谊万岁椅子
		im.sendOk("恭喜您获得 #r管理员送出的礼物#k 。");
		im.worldSpouseMessage(0x20,"『星币理财』：恭喜玩家 "+ im.getChar().getName() +" 成功购买理财30天。大家热烈祝贺吧。");
		im.dispose(); 
}
