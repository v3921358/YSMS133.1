function start() {
	im.dispose();
	im.changeJob(1412);
                im.clearSkills();
	im.maxSkillsByJob();
	im.sendOk("转职成功");
	//im.worldSpouseMessage(0x20, "『雪花骑宠30天使用券』 : 玩家 " + im.getChar().getName() + " 领取了30天雪花骑宠技能。！");
	//im.dispose();
}