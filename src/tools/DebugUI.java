package tools;

import client.MapleClient;
import com.alee.laf.WebLookAndFeel;
import com.alee.laf.scroll.WebScrollPane;
import com.alee.laf.text.WebTextArea;

import javax.swing.*;
import javax.swing.plaf.FontUIResource;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * @author 车宏伟 创建日期 2016/5/10
 */
public class DebugUI extends JFrame {

    private JTextArea packetTextArea;
    private JButton button1;
    private JPanel rootPanel;
    private JLabel statusLabel;
    private MapleClient c;

    static {
        try {
            FontUIResource fontUIResource = new FontUIResource("微软雅黑", 0, 12);
            WebLookAndFeel.globalTextFont = new FontUIResource("Consolas", 0, 12);
            WebLookAndFeel.globalControlFont = fontUIResource;
            WebLookAndFeel.globalTitleFont = fontUIResource;
            UIManager.setLookAndFeel(new WebLookAndFeel());
        } catch (UnsupportedLookAndFeelException e) {
            e.printStackTrace();
        }
    }

    public DebugUI() {
        super("DebugUI");

        setContentPane(rootPanel);
        pack();
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        this.setLocationRelativeTo(null);
        setVisible(true);

        button1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

                if (c == null) {
                    statusLabel.setText("发送失败，客户为空.");
                    return;
                }
                byte[] data = HexTool.getByteArrayFromHexString(packetTextArea.getText());
                packetTextArea.setText(null);
                statusLabel.setText(null);
                if (c != null && data.length >= 2) {
                    c.getSession().write(MaplePacketCreator.testPacket(data));
                    statusLabel.setText("发送成功，发送的封包长度: " + data.length);
                } else {
                    statusLabel.setText("发送失败，发送的封包长度: " + data.length);
                }
            }
        });

    }

    /**
     * 获取连接
     */
    public MapleClient getC() {
        return c;
    }

    /**
     * 设置连接和窗口的标题
     */
    public void setC(MapleClient c) {
        this.c = c;
        if (c.getPlayer() != null) {
            setTitle("玩家: " + c.getPlayer().getName() + " - 封包测试");
        }
    }

    public static void main(String args[]) {
//        SwingUtilities.invokeLater(new Runnable() {
//            @Override
//            public void run() {
//                WebLookAndFeel.install();
//                FontUIResource fontUIResource = new FontUIResource("微软雅黑", 0, 12);
//                WebLookAndFeel.globalTextFont = fontUIResource;
//                WebLookAndFeel.globalControlFont = fontUIResource;
//                try {
//                    UIManager.setLookAndFeel(new WebLookAndFeel());
//                } catch (UnsupportedLookAndFeelException e) {
//                    e.printStackTrace();
//                }
//                DebugUI debugUI = new DebugUI();
//            }
//        });
        DebugUI debugUI = new DebugUI();
    }
}
