var status = 0;
var typed = 0;
var myRmb;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			var conn = cm.getConnection();
			var sql = "select rmb from accounts where id = ?;";
			var pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, cm.getPlayer().getAccountID());
			var myRmbSql = pstmt.executeQuery();
			if (myRmbSql.next()) {
				myRmb = myRmbSql.getString("rmb");
			} else {
				myRmb = 0;
			}
			myRmbSql.close();
			pstmt.close();
			//conn.close();
			var text = "����ǰ���ֽ�Ϊ��#r"+myRmb+"#k Ԫ\r\n\r\n";
			text+="��������������ʹ���ֽ�һ�Ԫ�����ߵ���һ�#bԪ��#k�ı���Ϊ#r1:1#k���һ�#b���#k�ı���Ϊ#r1:1000#k\r\n";
			text+="#r* �һ�Ԫ��ǰ����ȷ�����İ������㹻�Ŀռ�#k\r\n";
			text+="#b#L1#�ֽ�һ�Ԫ��#l \r\n#L2#�ֽ�һ����#l \r\n";//#L3##rѩ���Ҷһ�Ԫ��#l\r\n#L4#ѩ���Ҷһ����ױ�#l\r\n#L5#���ױҶһ�ѩ����#l
			cm.sendSimple(text);
			//cm.dispose();
		} else if (status == 1) {
			if (selection == 1) {
				cm.sendGetText("#b���ֽ�һ�Ԫ���� 1:1#k\r\n\r\n����ǰ���ֽ�#r"+myRmb+"#kԪ����������Ҫ�һ���Ԫ��������");
				typed = 1;
			} else if (selection == 2) {
				cm.sendGetText("#b���ֽ�һ���� 1:1000#k\r\n\r\n����ǰ���ֽ�#r"+myRmb+"#kԪ����������Ҫ�һ���Ԫ��������");
				typed = 2;
			} else if (selection == 3){
				cm.sendGetText("#b��ѩ���Ҷһ�Ԫ���� 1:1#k\r\n\r\n����ǰ��#r"+cm.getItemQuantity(4310014)+"#k��#v4310014#ѩ���ң���������Ҫ�һ���������");
				typed = 3;
			} else if (selection == 4) {
				cm.sendGetText("#b��ѩ���Ҷһ����ױҡ� 1:1#k\r\n\r\n����ǰ��#r"+cm.getItemQuantity(4310014)+"#k��#v4310014#ѩ���ң���������Ҫ�һ���������");
				typed = 4;
			} else if (selection == 5) {
				cm.sendGetText("#b�����ױҶһ�ѩ���ҡ� 1:1#k\r\n\r\n����ǰ��#r"+cm.getItemQuantity(4000463)+"#k��#v4000463#���ױң���������Ҫ�һ���������");
				typed = 5;
			} 
			//cm.dispose();
		} else if (status == 2) {
			var ybNum = Math.floor(cm.getText()*1);
			if (isNaN(ybNum)){
				cm.sendOk("�ܱ�Ǹ������ֻ��Ϊ#r����#k��������ȷ�Ϻ��ѯ��");
				cm.dispose();
				return;
			}
			if (ybNum<=0) {
				cm.sendOk("���������0�����֣�");
				cm.dispose();
				return;
			}
			if (ybNum>10000) {
				cm.sendOk("ÿ���������10000���뷵����������");
				cm.dispose();
				return;
			}
			if (typed == 1) {
				var conn = cm.getConnection();
				var sql = "select rmb from accounts where id = ?;";
				var pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, cm.getPlayer().getAccountID());
				var myRmbSql = pstmt.executeQuery();
				if (myRmbSql.next()) {
					myRmb = myRmbSql.getString("rmb");
				} else {
					myRmb = 0;
				}
				myRmbSql.close();
				
				if (ybNum<=myRmb) {
					if (cm.getSpace(4) < 3) {
						cm.sendOk("���İ������ˣ��뱣֤������������3��λ��");
						cm.dispose();
						return;
					}
					cm.gainItem(4001485, ybNum);
					myRmb-=ybNum;
					pstmt = conn.prepareStatement("update accounts set rmb = rmb-"+ybNum+" where id = "+cm.getPlayer().getAccountID()+";");
					pstmt.executeUpdate();
					cm.sendOk("��ϲ���ɹ��һ���#r"+ybNum+"#k��Ԫ����");
					cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " ʹ���ֽ�ɹ��һ���"+ybNum+"��Ԫ��.");
					cm.finishActivity(120112);
					cm.dispose();
				} else {
					cm.sendOk("�����ֽ���������û����ô���أ�");
					cm.dispose();
				}
				pstmt.close();
				//conn.close();
			} else if (typed == 2) {
				var conn = cm.getConnection();
				var sql = "select rmb from accounts where id = ?;";
				var pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, cm.getPlayer().getAccountID());
				var myRmbSql = pstmt.executeQuery();
				if (myRmbSql.next()) {
					myRmb = myRmbSql.getString("rmb");
				} else {
					myRmb = 0;
				}
				myRmbSql.close();
				if (ybNum<=myRmb) {
					cm.gainNX(1, ybNum*1000);
					myRmb-=ybNum;
					pstmt = conn.prepareStatement("update accounts set rmb = rmb-"+ybNum+" where id = "+cm.getPlayer().getAccountID()+";");
					pstmt.executeUpdate();
					cm.sendOk("��ϲ���ɹ��һ���#r"+(ybNum*1000)+"#k���");
					cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " ʹ���ֽ�ɹ��һ���"+(ybNum*1000)+"���.");
					cm.finishActivity(120113);
					cm.dispose();
				} else {
					cm.sendOk("�����ֽ���������û����ô���أ�");
					cm.dispose();
				}
				pstmt.close();
				//conn.close();
			} else if (typed==3) {
				var conn = cm.getConnection();
				var sql = "select rmb from accounts where id = ?;";
				var pstmt = conn.prepareStatement(sql);
				pstmt.setString(1, cm.getPlayer().getAccountID());
				var myRmbSql = pstmt.executeQuery();
				if (myRmbSql.next()) {
					myRmb = myRmbSql.getString("rmb");
				} else {
					myRmb = 0;
				}
				myRmbSql.close();
				if (cm.haveItem(4001485, ybNum)) {
					pstmt = conn.prepareStatement("update accounts set rmb = rmb+"+ybNum+" where id = "+cm.getPlayer().getAccountID()+";");
					pstmt.executeUpdate();
					//cm.getConnection().prepareStatement().executeUpdate();
					myRmb+=ybNum;
					cm.gainItem(4001485, -ybNum);
					cm.sendOk("��ϲ���ɹ��һ���#r"+ybNum+"#kԪ�ֽ�");
					//cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " ʹ��Ԫ���ɹ��һ���"+(ybNum*500)+"���.");
					cm.dispose();
				} else {
					cm.sendOk("����Ԫ������������û����ô���أ�");
					cm.dispose();
				}
				pstmt.close();
				//conn.close();
			} else if (typed==4) {
				if (cm.haveItem(4310014, ybNum)) {
					if (cm.getSpace(4) < 3) {
						cm.sendOk("���İ������ˣ��뱣֤������������3��λ��");
						cm.dispose();
						return;
					}
					cm.gainItem(4310014, -ybNum);
					cm.gainItem(4000463, ybNum);
					cm.sendOk("��ϲ���ɹ��һ���#r"+ybNum+"#k��#v4000463#���ױҡ�");
					//cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " ʹ��Ԫ���ɹ��һ���"+(ybNum*500)+"���.");
					cm.dispose();
				} else {
					cm.sendOk("����ѩ���ҿ���������û����ô���أ�");
					cm.dispose();
				}
			} else if (typed==5) {
				if (cm.haveItem(4000463, ybNum)) {
					if (cm.getSpace(4) < 3) {
						cm.sendOk("���İ������ˣ��뱣֤������������3��λ��");
						cm.dispose();
						return;
					}
					cm.gainItem(4000463, -ybNum);
					cm.gainItem(4310014, ybNum);
					cm.sendOk("��ϲ���ɹ��һ���#r"+ybNum+"#k��#v4310014#ѩ���ҡ�");
					//cm.worldSpouseMessage(0x20, "[ϵͳ����] : ��ϲ " + cm.getChar().getName() + " ʹ��Ԫ���ɹ��һ���"+(ybNum*500)+"���.");
					cm.dispose();
				} else {
					cm.sendOk("���Ľ��ױҿ���������û����ô���أ�");
					cm.dispose();
				}
			}
		}
   }
}