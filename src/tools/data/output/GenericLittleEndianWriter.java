package tools.data.output;

import java.awt.Point;
import java.awt.Rectangle;
import java.io.ByteArrayOutputStream;
import java.nio.charset.Charset;

import tools.HexTool;

/**
 * Provides a generic writer of a little-endian sequence of bytes.
 *
 * @author Frz
 * @version 1.0
 * @since Revision 323
 */
public class GenericLittleEndianWriter implements LittleEndianWriter {

    private static final Charset ASCII = Charset.forName("GBK"); // ISO-8859-1, UTF-8
    private ByteOutputStream bos;

    /**
     * Class constructor - Protected to prevent instantiation with no arguments.
     */
    protected GenericLittleEndianWriter() {
        // Blah!
    }

    /**
     * Sets the byte-output stream for this instance of the object.
     *
     * @param bos The new output stream to set.
     */
    protected void setByteOutputStream(ByteOutputStream bos) {
        this.bos = bos;
    }

    /**
     * Class constructor - only this one can be used.
     *
     * @param bos The stream to wrap this objecr around.
     */
    public GenericLittleEndianWriter(ByteOutputStream bos) {
        this.bos = bos;
    }

    /**
     * Write the number of zero bytes
     */
    @Override
    public void writeZeroBytes(int i) {
        for (int x = 0; x < i; x++) {
            bos.writeByte((byte) 0);
        }
    }

    /**
     * Write an array of bytes to the stream.
     *
     * @param b The bytes to write.
     */
    @Override
    public void write(byte[] b) {
        for (int x = 0; x < b.length; x++) {
            bos.writeByte(b[x]);
        }
    }

    /**
     * Write a byte to the stream.
     *
     * @param b The byte to write.
     */
    @Override
    public void write(byte b) {
        bos.writeByte(b);
    }

    /**
     * Write a byte in integer form to the sequence.
     *
     * @param b The byte as an Integer to write.
     */
    @Override
    public void write(int b) {
        bos.writeByte((byte) b);
    }

    /**
     * Write a short integer to the stream.
     *
     * @param i The short integer to write.
     */
    @Override
    public void writeShort(short i) {
        bos.writeByte((byte) (i & 0xFF));
        bos.writeByte((byte) ((i >>> 8) & 0xFF));
    }

    /**
     * Write a int integer to the sequence.
     *
     * @param i The int integer to write.
     */
    @Override
    public void writeShort(int i) {
        bos.writeByte((byte) (i & 0xFF));
        bos.writeByte((byte) ((i >>> 8) & 0xFF));
    }

    /**
     * Writes an integer to the stream.
     *
     * @param i The integer to write.
     */
    @Override
    public void writeInt(int i) {
        bos.writeByte((byte) (i & 0xFF));
        bos.writeByte((byte) ((i >>> 8) & 0xFF));
        bos.writeByte((byte) ((i >>> 16) & 0xFF));
        bos.writeByte((byte) ((i >>> 24) & 0xFF));
    }

    @Override
    public void writeReversedInt(long l) {
        bos.writeByte((byte) ((l >>> 32) & 0xFF));
        bos.writeByte((byte) ((l >>> 40) & 0xFF));
        bos.writeByte((byte) ((l >>> 48) & 0xFF));
        bos.writeByte((byte) ((l >>> 56) & 0xFF));
    }

    /**
     * Writes an ASCII string the the stream.
     *
     * @param s The ASCII string to write.
     */
    @Override
    public void writeAsciiString(String s) {
        write(s.getBytes(ASCII));
    }

    /**
     * Writes a null-terminated ASCII string to the sequence.
     *
     * @param s The ASCII string to write.
     * @param max
     */
    @Override
    public void writeAsciiString(String s, int max) {
        write(s.getBytes(ASCII));
        for (int i = s.getBytes(ASCII).length; i < max; i++) {
            write(0);
        }
    }

    /**
     * Writes a Maple Name ASCII string to the sequence.
     *
     * @param s The ASCII string to write.
     */
    @Override
    public void writeMapleNameString(String s) {
        if (s.getBytes().length > 12) {
            s = s.substring(0, 12);
        }
        writeAsciiString(s);
        for (int x = s.getBytes().length; x < 12; x++) {
            write(0);
        }
    }

    /**
     * Writes a maple-convention ASCII string to the stream.
     *
     * @param s The ASCII string to use maple-convention to write.
     */
    @Override
    public void writeMapleAsciiString(String s) {
        writeShort((short) s.getBytes(ASCII).length);
        writeAsciiString(s);
    }

    @Override
    public void writeMapleAsciiString(String s, int max) {
        writeShort((short) max);
        if (s.getBytes().length > max) {
            s = HexTool.getSubstring(s, 1, max);
        }
        writeAsciiString(s);
        for (int x = s.getBytes().length; x < max; x++) {
            write(0);
        }
    }

    /**
     * Writes a 2D 4 byte position information
     *
     * @param s The Point position to write.
     */
    @Override
    public void writePos(Point s) {
        writeShort(s.x);
        writeShort(s.y);
    }

    /**
     * Writes a 4 int 16 byte Rectangle information
     *
     * @param s The Rectangle to write.
     */
    @Override
    public void writeRect(Rectangle s) {
        writeInt(s.x);
        writeInt(s.y);
        writeInt(s.x + s.width);
        writeInt(s.y + s.height);
        writeInt(0);
        writeShort(s.x + s.width / 2);
        writeShort(s.y + s.height / 2);
    }

    /**
     * Write a long integer to the stream.
     *
     * @param l The long integer to write.
     */
    @Override
    public void writeLong(long l) {
        bos.writeByte((byte) (l & 0xFF));
        bos.writeByte((byte) ((l >>> 8) & 0xFF));
        bos.writeByte((byte) ((l >>> 16) & 0xFF));
        bos.writeByte((byte) ((l >>> 24) & 0xFF));
        bos.writeByte((byte) ((l >>> 32) & 0xFF));
        bos.writeByte((byte) ((l >>> 40) & 0xFF));
        bos.writeByte((byte) ((l >>> 48) & 0xFF));
        bos.writeByte((byte) ((l >>> 56) & 0xFF));
    }

    @Override
    public void writeReversedLong(long l) {
        bos.writeByte((byte) ((l >>> 32) & 0xFF));
        bos.writeByte((byte) ((l >>> 40) & 0xFF));
        bos.writeByte((byte) ((l >>> 48) & 0xFF));
        bos.writeByte((byte) ((l >>> 56) & 0xFF));
        bos.writeByte((byte) (l & 0xFF));
        bos.writeByte((byte) ((l >>> 8) & 0xFF));
        bos.writeByte((byte) ((l >>> 16) & 0xFF));
        bos.writeByte((byte) ((l >>> 24) & 0xFF));
    }

    /**
     * 写入布尔值 true ? 1 : 0
     *
     * @param b The boolean to write.
     */
    @Override
    public void writeBool(boolean b) {
        write(b ? 1 : 0);
    }

    /**
     * 写入反向布尔值 true ? 0 : 1
     *
     * @param b The boolean to write.
     */
    @Override
    public void writeReversedBool(boolean b) {
        write(b ? 0 : 1);
    }

    @Override
    public final void writeHexString(final String s) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int nexti = 0;
        int nextb = 0;
        boolean highoc = true;
        outer:
        for (;;) {
            int number = -1;
            while (number == -1) {
                if (nexti == s.length()) {
                    break outer;
                }
                char chr = s.charAt(nexti);
                if (chr >= '0' && chr <= '9') {
                    number = chr - '0';
                } else if (chr >= 'a' && chr <= 'f') {
                    number = chr - 'a' + 10;
                } else if (chr >= 'A' && chr <= 'F') {
                    number = chr - 'A' + 10;
                } else {
                    number = -1;
                }
                nexti++;
            }
            if (highoc) {
                nextb = number << 4;
                highoc = false;
            } else {
                nextb |= number;
                highoc = true;
                baos.write(nextb);
            }
        }
        write(baos.toByteArray());
    }
}
