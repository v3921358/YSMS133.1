/*
 ������
 */
var mobid;
var mob;
var modified;
var MaxRandom;
var setupTask;
var itemList=Array(
	Array(4310150, 250), //
	Array(2049752, 350), //S��Ǳ�ܾ��� 30%
	Array(4310150, 450), //
	Array(2433646, 300),  //
	Array(2022956, 500),  //���õ��
	Array(5062009, 200),  //�ռ�ħ��
	Array(5062010, 600),  //�ռ�ħ��
	Array(1112663, 240),  //����ʹ��ף��
	Array(2430471, 550),  //�ռ�ħ��
	Array(2430471, 550),  //�ռ�ħ��
	Array(2430471, 550),  //�ռ�ħ��
	Array(2340000, 550),  //
	Array(5072000, 550),  //
	Array(1112586, 210),  //����ʹ��ף��
	Array(5073000, 550),  //
	Array(5074000, 550),  //
	Array(2049135, 300),
	Array(2049122, 100),
	Array(5010110, 50),
	Array(1212014, 100), //��β�ڼ�����
	Array(1232014, 100), //ʨ��ʹ������
	Array(1242014, 100), //���Ů����־֮��
	Array(1302152, 100), //ʨ���䵶
	Array(1312065, 100), //ʨ����ʿ��
	Array(1322096, 100), //ʨ�����׶�
	Array(1332030, 100), //��ѻ֮��̵�
	Array(1342036, 100), //����ǰ�Ӱ��
	Array(1362019, 100), //��ѻ֮���������
	Array(1372084, 100), //��β�������
	Array(1382104, 100), //��βս������
	Array(1342095, 100), //ʨ��ս���䵶
	Array(1432086, 100), //ʨ�ĳ�ǹ
	Array(1442116, 100), //ʨ��ì
	Array(1462099, 100), //ӥ������
	Array(1472122, 100), //��ѻ֮�����ȭ��
	Array(1452111, 100), //ӥ����Ϲ�
	Array(1482084, 100), //��ݾ�ӥצ
	Array(1492085, 100), //����������
	Array(1522018, 100), //��������ǹ
	Array(1003712, 100), //ʨ��ս��ͷ��
	Array(1003713, 100), //��β��ʦñ��
	Array(1003714, 100), //ӥ���ڱ���ñ
	Array(1003715, 100), //��ѻ֮��׷����ñ
	Array(1003716, 100), //��ݴ���ñ
	Array(1052314, 100), //ʨ��ս�����Ӽ�
	Array(1052315, 100), //��β��ʦ����
	Array(1052316, 100), //ӥ���ڱ���
	Array(1052317, 100), //��ѻ֮��׷���߿�
	Array(1052318, 100), //��ݴ�������
	Array(1072485, 100), //ʨ��ս��Ь
	Array(1072486, 100), //��β��ʦЬ
	Array(1072487, 100), //ӥ���ڱ�Ь
	Array(1072488, 100), //��ѻ֮��׷����Ь
	Array(1072489, 100), //��ݴ���Ь
	Array(1082295, 100), //ʨ��ս������
	Array(1082296, 100), //��β��ʦ����
	Array(1082297, 100), //ӥ���ڱ�����
	Array(1082298, 100), //��ѻ֮��׷��������
	Array(1082299, 100), //��ݴ�������
	Array(1102275, 100), //ʨ��ս������
	Array(1102276, 100), //��β��ʦ����
	Array(1102277, 100), //ӥ���ڱ�����
	Array(1102278, 100), //��ѻ֮����������
	Array(1102279, 100), //��ݴ�������
	Array(1152110, 100), //��β��ʦ����
	Array(1152111, 100), //ӥ���ڱ�����
	Array(1152112, 100), //��ѻ֮�����˻���
	Array(1152113, 100), //��ݴ�������
	Array(1152108, 100), //ʨ��ս������
	Array(1232040, 290), // ����������˹�ɺ�Ƶ���
	Array(1302228, 290), // ����������˹ȭ��
	Array(1322163, 290), // ����������˹��
	Array(1402152, 290), // ����������˹˫�ֽ�
	Array(1422108, 290), // ����������˹���
	Array(1432139, 290), // ����������˹֮ì
	Array(1442183, 290), // ����������˹֮ì
	Array(1332194, 290), // �����ն���˹����
	Array(1362068, 290), // �����ն���˹����         
	Array(1472180, 290), // �����ն���˹����
	Array(1212043, 290), // ���������˹˫ͷ��
	Array(1372140, 290), // ���������˹����
	Array(1382169, 290), // ���������˹�ױ�
	Array(1252030, 290), // ���������˹è��ħ����
	Array(1452171, 290), // ��������˹����
	Array(1462160, 290), // ��������˹��
	Array(1522072, 290), // ��������˹˫��ǹ
	Array(1222043, 290), // ����ά����Ѫ��
	Array(1242046, 290), // ����ά����ʨЫ��
	Array(1482141, 290), // ����ά����ָ������
	Array(1492153, 290), // ����ά����֮ӥ
	Array(1532075, 290), // ����ά��������
	Array(1003589, 290), // ����������˹ͷ��
	Array(1003592, 290), // �����ն���˹ͷ��
	Array(1003590, 290), // ���������˹ͷ��
	Array(1003591, 290), // ��������˹ͷ��
	Array(1003593, 290), // ����ά����ͷ��
	Array(1052498, 290), // ����������˹���Ӽ�
	Array(1052501, 290), // �����ն���˹���Ӽ�
	Array(1052499, 290), // ���������˹���Ӽ�
	Array(1052500, 290), // ��������˹���Ӽ�
	Array(1052502, 290), // ����ά�������Ӽ�
	Array(1102445, 290), // ����������˹����
	Array(1102448, 290), // �����ն���˹����
	Array(1102446, 290), // ���������˹����
	Array(1102447, 290), // ��������˹����
	Array(1102449, 290), // ����ά��������
	Array(1082466, 290), // ����������˹����
	Array(1082469, 290), // �����ն���˹����
	Array(1082467, 290), // ���������˹����
	Array(1082468, 290), // ��������˹����
	Array(1082470, 290), // ����ά��������
	Array(1072703, 290), // ����������˹ѥ
	Array(1072706, 290), // �����ն���˹ѥ
	Array(1072704, 290), // ���������˹ѥ
	Array(1072705, 290), // ��������˹ѥ
	Array(1072707, 290), // ����ά����ѥ
	Array(1012478, 100), // - ����֮���ᾧʯ
	Array(1022231, 100), //1022231 - Ѥ��ˮӡ����
	Array(1022232, 100), //1022232 - ��������ͫӡ
	Array(1182087, 100), //1182087 - ˮ�����˻���
	Array(1152170, 100), // 1152170 - �ʼҺ�ɫ��������
	Array(1132272, 100), // 1132272 - �ƽ���Ҷ������
	Array(1122150, 100), // 1122150 - ͳ���ߵ�׹
	Array(1122254, 100), // 1122254 - �����ս��ߵ�׹
	Array(1122076, 100), // 1122076 - ���׺ڰ���������
	Array(1122000, 100), // 1122000 - �����
	Array(1032241, 100), // 1032241 - �Ȼ����
	Array(1032136, 100), // 1032136 - ��������
	Array(1113149, 100), // 1113149 - ������ָ
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
	Array(3010895, 100), // ��������ͯ��������, 100), // �о��Ͱ������յĹ�ϵ�������׽�һЩ�����ӡ�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010896, 100), // �ҵ�Ů������, 100), // ���Ըо���Ů���Ļ������������ӡ�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010897, 100), // ���տ��֣���ħ, 100), // ���������ϵĶ�ħ���ֵı���о�����֡�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010898, 100), // ������������, 100), // ������������������ʱ��ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010899, 100), // ��������, 100), // �����Ӱ�������ʱ��ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010900, 100), // ��ʯ��Ҷ����, 100), // �ñ�ʯ���ɵ�������Ҷ���ӡ����º�ÿ10��ָ�HP 40, MP 20��
	Array(3010901, 100), // ����ĺ�ɫҩˮ����, 100), // ������ҩˮ������ȣ����Ը���ػָ�HP�ĺ�ɫҩˮ���ӡ�ÿ10��HP�ָ�110��MP�ָ�50��
	Array(3010902, 100), // ���ʵ���ɫҩˮ����, 100), // ������ҩˮ������ȣ����Ը���ػָ�MP����ɫҩˮ���ӡ�ÿ10��HP�ָ�100��MP�ָ�60��
	Array(3010903, 100), // ��������, 100), // �������棬ÿ10��HP�ָ�100��MP�ָ�50���������ӡ�
	Array(3010904, 100), // Ҭ����ɳ̲��, 100), // ���ڰ��ﰲ����ˬ��Ҭ�����µ�ɳ̲�Ρ��������棬ÿ10��HP�ָ�40��MP�ָ�20��
	//Array(3010905, 50), // �������F�a, 100), // �����ڹ����������ӵ��������ϵ��F�a��
	Array(3010906, 50), // �ƶ�ϴ�ּ�����, 100), // װ�޺�����ϴ�ּ䡣����һ��Ӧ�о��С�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010907, 50), // ��ɳɳ�ÿ���, 100), // ���ſɰ��Ĺ�ɳɳ�����ţ�ÿ10��HP�ָ�60��
	Array(3010908, 50), // ���������ɳ��, 100), // �ݻ��ĺ���ɫ�����ɳ�����������棬ÿ10��HP�ָ�60��
	Array(3010909, 50), // ��ɫ���ʦ����, 100), // ����������ɫ�����ʦ���ӡ��������棬ÿ10��HP�ָ�60��
	//Array(3010910, 50), // ����������, 100), // ���Գ�Ϊ�ɰ�����Ů������ĺ����ѡ�ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010911, 100), // ��ñ�������, 100), // ���ڱ������ϾͿ��Կ���������ɫñ�ӵĿɰ�����Ĳ��ա�
	Array(3010912, 100), // ��ñ�������, 100), // ���ڱ������ϾͿ��Կ���������ɫñ�ӵĿɰ�����Ĳ��ա�
	Array(3010913, 100), // �����������, 100), // ���ڱ������ϾͿ��Թ�����������������������Ĳ��ա�
	Array(3010914, 100), // ̫ƽ���������, 100), // ���ڱ������ϾͿ��Թ���ʷ������������������
	Array(3010915, 100), // ���鸽������������, 100), // ���鸽�����������ӡ��������棬ÿ10��HP�ָ�50��
	Array(3010916, 100), // �ۺ�ɳ̲����ɡ, 100), // ����������ˬ�Ĵ󺣵ķۺ�ɫɳ̲����ɡ���������棬ÿ10��HP�ָ�60��
	Array(3010917, 100), // ��ɫ����, 100), // ������Ļ����������ӡ�ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010918, 100), // ��ɫ����, 100), // ���Ͽ��������������ӡ�ÿ10��HP�ָ�50��MP�ָ�50��
	Array(3010919, 100), // ��������, 100), // Ϊ����֮�����������ӡ�ÿ10��HP�ָ�100��MP�ָ�50��
	Array(3010920, 100), // ˮ������, 100), // �ֵ���Ӱר�����ӣ�����ȥ��ÿ10�붼�ָܻ�HP��
	Array(3010921, 100), // �ʵ�����, 100), // ��������������ͷ׵Ĳʵ�!\nÿ10���ӻָ�HP40,MP40.
	Array(3010922, 100), // �Ƴ�����(��ɫ), 100), // ����������������еĺ�ɫ�Ƴ�����,ÿ10���ӻָ�MP 20.
	Array(3010923, 100), // 10��������, 100), // Ϊ����ð�յ�10����������ľ��ް����ӡ�ÿ10���ӣ�HP��MP���ָ�50.
	//Array(3010936, 50), // ������¥��, 100), // ���й���ҡ�С������ƵĿ�ͬʱ�������˵�������¥�����ӡ�����ʱ��ÿ10���У��ɻָ�HP��MP��500��
	//Array(3010894, 10), // һ�����ȵ�����, 100), // ����һ�����ȵ�Ũ������ζ������ʱ��ÿ10���У��ɻָ�HP��MP��50��
	Array(3010747, 10), // �ͷ�ֽ�����, 100), // �����ͷ��ֽ����ӡ�����ʱ��ÿ10���У��ɻָ�HP��MP��50��
	Array(3010748, 10), // ��ʽ������, 100), // Ũ������ʽ��ͳ���棬�������硣����ʱ��ÿ10���У��ɻָ�HP��MP��50��
	Array(3010750, 100), // ���ǲ�������, 100), // �����Ľ��ǲ���������ɿڡ�����ʱ��ÿ10���У��ɻָ�HP��MP��50��
	Array(3010795, 10), // ɭ������Ϣ��(����), 100), // ������������ɭ������Ϣ�����ӡ�����ʱ��ÿ10��ָ�HP��MP500��
	Array(3010794, 20), // ��������ͷ����, 100), // ��������ͷ���ӣ�����������ʱ���ܱ���ª�Ĺ���Ե�Ŷ������ʱ��ÿ10��ָ�HP��MP500��
	Array(3010799, 50), // ��Ĺ��������, 100), // ���������ϣ�������Ϊ�����ڷ�Ĺ�е����顣����ʱ��ÿ10��ָ�HP��MP500��
	Array(3010714, 20), // ������, 100), // ��5����ͬ��ɫ������һ���ѻ����������ӡ�����ʱ��ÿ10��ָ�HP��MP500��
	Array(3010732, 20), // ������г�����, 100), // ����ʱ��ÿ10��ָ�HP��MP500��
	Array(3012019, 100), // ���ٺ�����, 100), // ���й���ҡ�С������Ƶ�˫�����ӡ��������İ��麣����ϲ������һ������ʥ�������У������Ҹ������ۡ����˿��������»���ְ��ٺ�ʥ�����õ�������Ч������ʱ��ÿ10��ָ�HP��MP500��
	Array(3010813, 100), // ����ˮ����Ļ���, 100), // ���й���ҡ�С������Ƶ����ӡ�װ���������Ҹ����ۻ���İ���ˮ��������ʱ��ÿ10��ָ�HP��MP500��
	Array(3012020, 100), // ���ٻ�������, 100), // ���й�ð�յ���ҡ�С������Ƶ��������ӣ���������һ��ʱ����Ư���ı���Ч����ÿ5��ָ�HP/MP 500
	//Array(3010820, 10), // ������߱�������, 100), // ����Ϣ��ʱ�򣬾͵��ҵı�������ÿ10�룬HP�ָ�500��MP�ָ�500��
	//Array(3010806, 10), // ��ӣ������, 100), // �ٻ���ţ�������ơ�ÿ10���ӻָ�HP50��MP50��
	//Array(3010780, 10), // ��תľ��, 100), // �����������ľ��������ʻ���Ҹ��ı˰�������ʱ��ÿ10��ָ�HP��MP100��
	//Array(3010779, 10), // �������ƽ�, 100), // ���й���ҡ�С������ơ��������ƽΣ����Ƽ������������������꼪����������ӡ�����ʱ��ÿ10��ָ�HP��MP500��
	//Array(3010781, 20), // ��������, 100), // �ͺ�����С��������һ������ʱ��ÿ10��ָ�HP��MP500��
	//Array(3010788, 20), // ���ް���ҹ��, 100), // ���й���ҡ�С������ơ�ũ����Ϧ���ڱ�������Χ����һ�𣬹�ͬ�Ǿ�ӭ��һ��������ζ�ľ��ް���Բ��������ʱ��ÿ��ָ�HP��MP��500��
	//Array(3010783, 10), // ��ɫ������, 100), // ��ӭ����������ֵļҡ�ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010797, 100), // ���ﴺ������, 100), // ��˫��������һ��ӭ�Ӵ��ڵĵ�����ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010798, 100), // �������, 100), // ������������ŵĸ߼����ӡ�������΢�е�Σ�ա���ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010800, 100), // Сѧ�������������, 100), // �о�����ø�Ǯ���У����ǲ������ۼ���ң�����ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010801, 100), // ѧ��ǰ�����������, 100), // �о�����ø�Ǯ���У����ǲ������ۼ���ң�����ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010802, 100), // ��ѧ�������������, 100), // �о�����ø�Ǯ���У����ǲ������ۼ���ң�����ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010803, 100), // ��3�����������, 100), // �о�����ø�Ǯ���У����ǲ������ۼ���ң�����ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010804, 100), // ���������������, 100), // ����һ������ͣ��ý��ܾ��˵İ��ꡣÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010810, 100), // ��������, 100), // ���Ż�ȥ���аɣ�����ʱ��ÿ10���У��ɻָ�HP��MP��50��
	//Array(3010811, 100), // ��ѿ��, 100), // ���Ըо���������ɫ����Ϣ��������ѿ�ϣ����ܴ������Ȥ�ɡ�ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010812, 100), // ��תľ����, 100), // ���ֵ�����԰��������תľ���ϣ��ȹ����ֵ�ʱ�⡣ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010814, 100), // ��˿��������, 100), // ��˿�������ӣ�����ʱ��ÿ10���У��ɻָ�HP��MP��50��
	//Array(3010815, 100), // �������Ӻ�����, 100), // �������ҫֻ�������Ǳ�ø�ǿ���������޵еĵ������ӣ�\r\n#cÿ10��HP/MP�ָ�50
	//Array(3010835, 100), // ����ˮ���������, 100), // ���������۵İ�������аɡ�ÿ10��HP�ָ�50��MP�ָ�50��\n�й�ð�յ����[С��]��Ƶ����ӡ�
	//Array(3010844, 100), // ������������, 100), // �Ҿ����ң�˭Ҳ���������ң�����ʱ��ÿ10���У��ɻָ�HP��MP��50��
	//Array(3010851, 100), // ������������, 100), // �������գ�ֻ������������������ˬ������ʱ��ÿ10���У��ɻָ�HP��MP��50��
	Array(3010852, 100), // �ʻ���, 100), // �ʹ���ʢ���������ʻ���һ��ÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010854, 100), // ���ع��ﹲ��һ�ã�, 100), // �ҿ�������ɴ�Ĺ����Ǻ�̫��Ģ��һ����ף11���ꡣÿ10��HP�ָ�50��MP�ָ�50��
	//Array(3010789, 100), // ��������, 100), // ��������ӭ���꣡��������Ļ���ÿ10��ظ�200��HP��200��MP
	//Array(3010606, 100), // δ��ɫ����������, 100), // ����յĻ�����������Ϊ��Ϳ��Ѥ����ɫ�ʡ���������ʱ��ÿ10��HP�ָ�10�㣬MP�ָ�10�㡣
	//Array(3010608, 100), // ��������������, 100), // �찡�������������������������ɫ�ʣ������Ŀ��������˾�̾����������ʱ��ÿ10��HP�ָ�50�㣬MP�ָ�50�㡣
	Array(1072337, 100), // ϲ������Ь, 100), // (������)
	Array(1112254, 100), // �������������ָ, 100), // ���й�ð�յ����С����ƣ��ں������������â�Ļ�����������������ɡ�
	Array(1112143, 100), // ����������Ƭ��ָ, 100), // ���й�ð�յ����С����ƣ��ں������������â�Ļ�����չʾ�Լ����ǳưɡ�
	Array(1112118, 100), // ������Ƭ��ָ, 100), // ��ɫ�������棬�Կɿڿ�����ɫ��Ϊ��ɫ���԰�ɫ������ʾ��ɫ���ơ�
	Array(1112119, 100), // ����(Red) ��Ƭ��ָ, 100), // ��ɫ�������棬�Կɿڿ�����ɫ��Ϊ��ɫ���԰�ɫ������ʾ��ɫ���ơ�
	Array(1112120, 100), // ����(White) ��Ƭ��ָ, 100), // ��ɫ�������棬�Կɿڿ�����ɫ��Ϊ��ɫ���Ժ�ɫ������ʾ��ɫ���ơ�
	Array(1112228, 100), // ���������ָ, 100), // ��ɫ�Ի���ʱ�����촰���ɿɿڿ�������
	Array(1112229, 100), // ����(Red)�����ָ, 100), // ��ɫ�Ի���ʱ�����촰�������ƿɿڿ�������
	Array(1112230, 100), // ����(White)�����ָ, 100), // ��ɫ�Ի���ʱ�����촰�������ƿɿڿ�������
	Array(1002524, 100), // ����ñ, 100), // (������)
	Array(1702533, 100), // �������ĵ�, 100), // ���й���ҡ�С������Ƶ��������ĵá�\n����װ����#c��������#�ϵ�������
	Array(1702020, 100), // ������, 100), // ��װ����#c/���ֽ�/���ָ�/���ֶ���/����/����/�̵�/ħ����/��������#�ϡ�
	Array(1702459, 100), // �޻�������, 100), // ����ʱ���Կ�������̬���޻��ǡ���װ����#c���е�������#�ϡ�
	Array(1702302, 100), // ����, 100), // ��װ����#c����/����/˫��ǹ/�����������#�ϡ�
	Array(1042285, 100), // ƴɫ���T��, 100), // (������)
	Array(1042204, 100), // ����T��, 100), // (������)
	Array(1112103, 100), // �ۻ���Ƭ��ָ, 100), // �ڽ�ɫ����������Ƶ׺��ֽ�ɫ����
	Array(1112253, 100), // ľ�����Ի����ָ, 100), // ��ɫ�Ի�ʱ, ��ʾ�����Ի���
	Array(1112142, 100), // ľ������Ƭ��ָ, 100), // �ڽ�ɫ����ı�������ʾ��ɫ����
	Array(1112135, 100), // ˮī����Ƭ��ָ, 100), // �ڽ�ɫ�ŵ��£�����ˮī�������ð�ɫ��������ʾ��ɫ���֡�
	Array(1112238, 100), // ˮī�������ָ, 100), // ��ɫ������ʱ�������ˮī���Ի���
	Array(4001006, 350),  //������ë
	Array(1112915, 290),  //������ָ
	Array(3010678, 150),  //���Ӷ�֮��Ϣ
	Array(3010680, 150),  //ͯ���еĹ���
	Array(2433654, 350),  //����500������ȯ
	Array(2433285, 350),  //
	Array(4033356, 300)  //�������
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
    player.dropMessage(6, "[���ɶ�ɭ��] ���뵽����ս��ͼ����С�����¡�");
    player.changeMap(map, map.getPortal(0));
}


function scheduledTimeout(eim) {
    eim.broadcastPlayerMsg(1, "[���ɶ�ɭ��] ���ź����ѳ����޶���սʱ�䣬������սʧ�ܣ������٣��ڴ�����ǿ�����ǰ����ս~");
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
	
    player.dropMessage(6, "[���ɶ�ɭ��] ���˳���ս��");
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
		eim.broadcastPlayerMsg(6, "[���ɶ�ɭ�ֱ���ս] 10��������䣬����ʱ�����������������������Ҫ��10��������������ѡ�񣬷��򽫻ᱻǿ�����ߡ�");
		var map = eim.getMapInstance(321116000);
		map.startMapEffect("[���ɶ�ɭ�ֱ���ս] ��ͨ�أ�10��󽫿������䡣", 5120031);
	}
}

function roll(eim) {
	MaxRandom = 0;
	var count = eim.getProperty("giftcount");
	var rewardPlayer = null;
	//�ڶ��ο�ʼ,ͳ����һ��ROLL����ҽ���������Ž�����
	if ((count*1)>=1) {
		for (var i = 0; i < eim.getPlayerCount(); i++) {
			var charName = eim.getPlayers().get(i).getName();
			var charId = eim.getPlayers().get(i).getId();
			//����ROLL����Ϣ
			for (var j = 0; j < eim.getPlayerCount(); j++) {
				var notice =  "[���ɶ�ɭ�ֱ���ս] ��� "+charName+" ������ "+eim.getProperty("charid_"+charId)+"��";
				if ((eim.getProperty("charid_"+charId)*1)==0) {
					notice =  "[���ɶ�ɭ�ֱ���ս] ��� "+charName+" ����������";
				}
				eim.getPlayers().get(j).dropMessage(6,notice);
			}
			//�����������ֵ
			if ((eim.getProperty("charid_"+charId)*1)>MaxRandom) {
				MaxRandom = eim.getProperty("charid_"+charId);
				//�û��������
				eim.setProperty("rewardplayer", charName);
				//�û����ID
				eim.setProperty("rewardplayerid", charId);
			} 
   		}
		for (var j = 0; j < eim.getPlayerCount(); j++) {
			//����NPC ���Ž���
			eim.getPlayers().get(j).openNpc(1052008, 1111);
		}
	}
	for (var j = 0; j < eim.getPlayerCount(); j++) {
		//�����������ROLL�����Ϊ��
		eim.setProperty("charid_"+eim.getPlayers().get(j).getId(),"0");
	}
	//����+1
	eim.setProperty("giftcount", (count*1+1));
	//���¶������
	count = eim.getProperty("giftcount");
	count = (count*1);
	//�˳�ս��
	if ((count*1)>6) {
		EndThisBattle(eim);
		return;
	}
	//��������
	var chance = Math.floor(Math.random()*600);
	//������Ʒ�б�
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
	//�ӳ�10���ROLL��NPC
	setupTask = em.schedule("openRollNpc", 1000 * 5 * 1, eim);
}

function openRollNpc(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
		eim.getPlayers().get(i).openNpc(1052008);
    }
	//10������ROLL��
	setupTask = em.schedule("roll", 1000 * 5 * 1, eim);
}

function EndThisBattle(eim) {
	for (var i = 0; i < eim.getPlayerCount(); i++) {
        eim.getPlayers().get(i).dropMessage(1, "[���ɶ�ɭ�ֱ���ս] ��ս�ɹ���");
    }
	//em.broadcastYellowMsg("[���ɶ�ɭ�ֱ���ս] ��ս����");
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