function start() {
        im.gainItem(2430241, -1);
		im.gainItem(3010025, 1);//  5周年枫叶纪念凳
		im.gainItem(3010100, 1);// 财神椅子
		im.gainItem(3010849, 1);// 最佳新人椅子
		im.gainItem(3010012, 1);// 剑士 宝座
		im.gainItem(3010018, 1);// 椰子树沙滩椅
		im.gainItem(3010075, 1);// 我为音乐狂
		im.gainItem(3010195, 1);// 无价之宝椅子
		im.gainItem(3010168, 1);// 友谊万岁椅子
		im.gainItem(2000005, 300);// 超级药水
		im.gainItem(1004480, 1);// 小淘气的飞行帽
		im.gainItem(1042347, 1);// 小淘气背心
		im.gainItem(1062229, 1);// 小淘气沙滩裤
		im.gainItem(1112134, 1);//小竹林名片戒指
		im.gainItem(1112237, 1);//小竹林聊天戒指
		im.gainItem(1702309, 1);//彩虹烟火棒
		im.gainItem(1082102, 1);//透明手套
		im.gainItem(1073058, 1);//小淘气鞋子
		im.gainItem(1102819, 1);//小淘气披风
		im.gainItem(5150040, 3);// 皇家理发
		im.gainItem(5152053, 3);// 皇家整容
		im.gainItem(5150052, 1);// 万能高级美发
		im.gainItem(5153015, 1);// 万能护肤
		im.gainItem(5152057, 1);// 万能高级整形
		im.gainItem(5211060, 1, 2 * 60 * 60 * 1000);// 三倍经验
		im.gainItem(5360015, 1, 2 * 60 * 60 * 1000);// 双爆
		//im.gainItem(5050000, 100);// 洗血的能力值
		im.gainItem(5072000, 10);// 高质地喇叭
		im.gainItem(5060000, 3);// 装备刻名 X3
		//im.gainItem(2431092, 1);//特殊超值礼包
		//im.gainItem(1112164, 1, 2 * 60 * 60 * 1000);//夏日甜心名片戒指 24小时
		//im.gainItem(1112276, 1, 2 * 60 * 60 * 1000);//夏日甜心聊天戒指 24小时
		//im.gainItem(1102630, 1, 1);// 浪漫四翼天使 24小时
		im.gainItem(1102709, 1, 1);// 双色糖果翅膀 1天
		im.gainItem(1112918, 1, 1);// 回归戒指 X1 24小时
		im.gainItem(1302063, 1);// 火刀
		im.sendOk("恭喜您获得 #r管理员送出的礼物#k 。");
		im.worldSpouseMessage(0x20,"『新手礼包』：恭喜玩家 "+ im.getChar().getName() +" 成功领取新手礼包。大家热烈祝贺吧。");
		im.dispose(); 
}
