//���ֻ

var status = 0;
var currentRanking = 1;
var icon = "#fEffect/CharacterEff/1112904/0/0#";

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	java.lang.System.out.println(mode+"/"+status+"/"+selection+"/"+currentRanking);
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && (status == 0 || status == -1)) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var title = "#e#d���³�ֵ����#n#k";
			var selectName = "�鿴�������а�";
			if (selection == 1)
			{
				if (currentRanking == 1) {
					title = "#e#d���³�ֵ����#n#k"
					selectName = "�鿴�������а�";
					currentRanking = 0;
				}
				else
				{
					title = "#e#d���³�ֵ����#n#k"
					selectName = "�鿴�������а�";
					currentRanking = 1;
				}
			}
			var text =icon+icon+icon+icon+icon+icon+icon+icon+icon+icon+title+icon+icon+icon+icon+icon+icon+icon+icon+icon+icon+"\r\n";
			status=-1;
			text+="#b#L1#"+selectName+"#l#k\r\n\r\n";
			var sql = "";
			if (currentRanking == 1)
				sql = "SELECT c.name as charname, sum(p.rmb) as totalpay FROM accounts a, characters c, paylog p WHERE p.account = a.name and a.id = c.accountid and a.gm <=0 and c.id = (select id from characters where level=(select max(level) from characters where accountid = a.id) and accountid=a.id limit 1) and  DATE_FORMAT( p.paytime, '%Y%m' ) = DATE_FORMAT( CURDATE( ),'%Y%m') GROUP BY p.account ORDER BY totalpay desc limit 10;";
			else 
				sql = "SELECT c.name as charname, sum(p.rmb) as totalpay FROM accounts a, characters c, paylog p WHERE p.account = a.name and a.id = c.accountid and a.gm <=0 and c.id = (select id from characters where level=(select max(level) from characters where accountid = a.id) and accountid=a.id limit 1) and  date_format(p.paytime,'%Y-%m')=date_format(DATE_SUB(curdate(), INTERVAL 1 MONTH),'%Y-%m') GROUP BY p.account ORDER BY totalpay desc limit 10;";
			var conn = cm.getConnection();
			var pstmt = conn.prepareStatement(sql);
			var payRanking = pstmt.executeQuery();
			var charname="";
			var totalpay="";
			var i=0;
			while(payRanking.next()) {
				charname=payRanking.getString("charname");
				totalpay=payRanking.getString("totalpay");
				i++;
				var r=1;
				if (i<10)
					r="0"+i;
				else
					r=i;
				var lastShowTitle = "��"+totalpay;
				if (currentRanking == 1) {
					for(var n=1000; n<=1000000; n+=1000) {
						if ((totalpay*1)>n) {
							lastShowTitle="#r����"+n+"Ԫ";
						}
					}
				}
				var charnameLength = len(charname);
				var maxLength = 18;
				var space = "";
				for(var k = 0; k<maxLength-charnameLength; k++) {
					space+=" ";
				}
				switch(i) {
					case 1:
					case 2:
					case 3:
						charname = "#r"+charname+"#k";
						break;
					case 4:
					case 5:
					case 6:
						charname = "#b"+charname+"#k";
						break;
					case 7:
					case 8:
					case 9:
					case 10:
						charname = "#d"+charname+"#k";
						break;
					
				}
				text+="#g"+r+". #k"+charname+space+"#d#e��ֵ��#b#n"+lastShowTitle;
				text+="\r\n";
			}
			
			payRanking.close();
			pstmt.close();
			//conn.close();
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			cm.sendOk("лл");
			cm.dispose();
		}
   }
}
function len(s) { 
	var l = 0; 
	var a = s.split(""); 
	for (var i=0;i<a.length;i++) { 
		if (a[i].charCodeAt(0)<299) { 
			l++; 
		} else { 
			l+=2; 
		} 
	} 
	return l; 
}