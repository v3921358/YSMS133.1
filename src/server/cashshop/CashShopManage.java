package server.cashshop;

import com.alee.global.StyleConstants;
import com.alee.laf.WebLookAndFeel;
import com.alee.laf.label.WebLabel;
import com.alee.laf.panel.WebPanel;

import javax.swing.*;
import javax.swing.plaf.FontUIResource;
import java.awt.*;

/**
 * Created by 车宏伟 on 2016/4/8.
 */
public class CashShopManage {

    private JTabbedPane tabbedPane1;
    private JPanel panel1;
    private JTabbedPane tabbedPane3;
    private JTabbedPane tabbedPane4;
    private JTabbedPane tabbedPane5;
    private JTabbedPane tabbedPane6;
    private JTabbedPane tabbedPane7;
    private JTabbedPane tabbedPane8;
    private JTabbedPane tabbedPane9;
    private JList list1;
    private JTextField textField1;
    private JList list2;
    private static JFrame frame;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(
                new Runnable() {
            @Override
            public void run() {
                WebLookAndFeel.globalControlFont = new FontUIResource("微软雅黑", 0, 12);
                WebLookAndFeel.install();

                frame = new JFrame("CashShopManage");
                CashShopManage cashShopManage = new CashShopManage();
                frame.setContentPane(cashShopManage.panel1);
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.pack();
                frame.setVisible(true);
                //cashShopManage.addPanel();
                final WebPanel panel = new WebPanel();
                panel.setUndecorated(false);
                panel.setLayout(new BorderLayout());
                panel.setWebColoredBackground(false);

                final WebPanel northPanel = new WebPanel();
                northPanel.setPaintSides(false, false, true, false);
                northPanel.add(new WebLabel("Decorated panel", WebLabel.CENTER));
                panel.add(northPanel, BorderLayout.NORTH);

                frame.getContentPane().add(panel);
            }
        }
        );

    }

    public void addPanel() {

//        DefaultListModel listModel = new DefaultListModel();
//        listModel.addElement("111111");
//        listModel.addElement("222222");
//        listModel.addElement("333333");
//        list2.setModel(listModel);
    }
}
