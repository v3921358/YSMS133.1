/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package tools.programs;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author zisedk
 */
public class DecodeExe4J {

    public static void main(String args[]) throws IOException {
        FileInputStream fin = new FileInputStream(args[0]); // 需要解码的.exe文件
        FileOutputStream fout = new FileOutputStream(args[1]); //解码后保存的.exe文件
        BufferedInputStream bin = new BufferedInputStream(fin);
        BufferedOutputStream bout = new BufferedOutputStream(fout);
        int in = 0;
        do {
            in = bin.read();
            if (in == -1) {
                break;
            }
            in ^= 0x88;
            bout.write(in);
        } while (true);
        bin.close();
        fin.close();
        bout.close();
        fout.close();
    }
}
